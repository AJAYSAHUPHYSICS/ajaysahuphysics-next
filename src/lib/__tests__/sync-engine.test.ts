import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ADAPTERS, fromQuestionRef, mistakesAdapter, toQuestionRef, type Row, type Storage } from "@/lib/sync/adapters";
import { readMeta, syncOnce, unlinkDevice, type RemoteStore } from "@/lib/sync/engine";
import { fingerprint, stableStringify, threeWayMerge } from "@/lib/sync/merge";
import { CLOUD_SYNC_ENABLED, LOCAL_ONLY_KEYS, SYNCED_KEYS, SYNC_META_KEY } from "@/lib/sync/policy";
import { supabaseRemote } from "@/lib/sync/supabase-remote";

// ─────────────────────────────────────────────────────────────────
// Sync engine tests: two simulated devices and an in-memory cloud that
// behaves like the database (keyed upserts, tombstones). Local data uses
// the EXISTING storage formats exactly as students' devices hold them.
// ─────────────────────────────────────────────────────────────────

const U1 = "user-1";
const U2 = "user-2";
const M1 = "3f1c2b9a-1d2e-4f3a-8b4c-5d6e7f8a9b0c";
const M2 = "9a8b7c6d-5e4f-4a3b-9c2d-1e0f9a8b7c6d";
const day = 86_400_000;
const T0 = Date.UTC(2026, 10, 1);

class MemStorage implements Storage {
  data = new Map<string, string>();
  reads: string[] = [];
  constructor(init: Record<string, unknown> = {}) {
    for (const [k, v] of Object.entries(init)) this.data.set(k, typeof v === "string" ? v : JSON.stringify(v));
  }
  getItem(k: string) {
    this.reads.push(k);
    return this.data.has(k) ? this.data.get(k)! : null;
  }
  setItem(k: string, v: string) {
    this.data.set(k, v);
  }
  removeItem(k: string) {
    this.data.delete(k);
  }
  json(k: string) {
    return JSON.parse(this.data.get(k) ?? "null");
  }
}

/** In-memory cloud for ONE student: per-table rows keyed exactly like the database primary keys. */
class MemCloud implements RemoteStore {
  tables = new Map<string, Map<string, Row>>();
  failPushAfter = Infinity;
  failPull = false;
  pushes = 0;
  pulls = 0;
  /** What public.sync_allowed() answers (a function, to simulate errors or non-boolean values). */
  allowed: () => Promise<unknown> = async () => true;
  /** Simulates the verified-email SELECT policy: RLS hides every row and refuses every write. */
  hidden = false;
  /** profiles.cloud_generation: replaced whenever the database deletes the copy outright. */
  generation: string | null = "gen-1";
  /** Test hook: runs after each pull (e.g. a withdrawal committing mid-sync). */
  afterPull: (table: string) => void = () => {};
  async cloudGeneration() {
    return this.generation;
  }
  /** What withdraw_cloud_copies() does: every row hard-deleted (no tombstones), a new generation. */
  withdrawAll(nextGeneration: string) {
    this.tables.clear();
    this.generation = nextGeneration;
  }
  private keyOf(table: string, r: Row) {
    return ADAPTERS.find((a) => a.table === table)!.rowKey(r);
  }
  async syncAllowed() {
    return (await this.allowed()) as boolean;
  }
  async pull(table: string) {
    this.pulls++;
    if (this.failPull) throw new Error("network down");
    if (this.hidden) return [];
    const rows = [...(this.tables.get(table)?.values() ?? [])].map((r) => ({ ...r }));
    this.afterPull(table);
    return rows;
  }
  async push(table: string, rows: Row[]) {
    if (this.hidden) throw new Error("new row violates row-level security policy");
    if (this.pushes >= this.failPushAfter) throw new Error("connection reset");
    this.pushes++;
    const t = this.tables.get(table) ?? new Map<string, Row>();
    for (const r of rows) t.set(this.keyOf(table, r), { ...r });
    this.tables.set(table, t);
  }
  live(table: string) {
    return [...(this.tables.get(table)?.values() ?? [])].filter((r) => !r.deleted_at && r.done !== false);
  }
}

const device = () =>
  new MemStorage({
    "atlas:bookmarks": [{ id: "11:kinematics:chapter", cls: "11", slug: "kinematics", type: "chapter", chapterName: "Kinematics", label: "Kinematics", path: "/class-11/kinematics", bookmarkedAt: T0 }],
    "atlas:checklist": { "11:kinematics": { notes: true, dpp: false }, "12:atoms": { formulaSheet: true } },
    "atlas:revision": { "11:kinematics": [1, { round: 2, completedAt: T0 + day }] }, // legacy + current shape
    "atlas:mistakes": [
      { id: M1, cls: "12", slug: "atoms", chapterName: "Atoms", resourceType: "pyq", questionId: "17", conceptTag: "Bohr model", difficulty: "medium", note: "mixed up n and l", createdAt: T0, resolvedAt: null },
      { id: "1763000000000-k3j2h", cls: "11", slug: "kinematics", chapterName: "Kinematics", resourceType: "dpp", conceptTag: "x", difficulty: "easy", note: "old-browser id", createdAt: T0 - day, resolvedAt: null },
    ],
    "atlas:goals": { "daily-dpp": T0 },
    "atlas:study-streak": { current: 3, longest: 7, lastActiveDate: "2026-11-03" },
    "atlas:activity-log": [{ type: "chapter-visited", cls: "11", slug: "kinematics", label: "Kinematics", at: T0 }],
    "atlas:recent-searches": ["private search"],
    "atlas:reading-progress": { "/class-11/kinematics/notes/": { pct: 40, updatedAt: T0 } },
  });
const run = (storage: MemStorage, remote: RemoteStore, userId = U1, extra: object = {}) => syncOnce({ storage, remote, userId, enabled: true, confirmLink: true, now: () => T0, ...extra });

describe("launch gate and account linking", () => {
  it("is off in code until the owner authorises launch, and then touches nothing", async () => {
    expect(CLOUD_SYNC_ENABLED).toBe(false);
    const s = device();
    const before = new Map(s.data);
    const cloud = new MemCloud();
    expect(await syncOnce({ storage: s, remote: cloud, userId: U1 })).toEqual({ status: "disabled" });
    expect(s.data).toEqual(before);
    expect(cloud.tables.size).toBe(0);
    expect(s.data.has(SYNC_META_KEY)).toBe(false);
  });

  it("asks before linking a device that already has progress, and never merges into another account", async () => {
    const s = device();
    const cloud = new MemCloud();
    const r = await syncOnce({ storage: s, remote: cloud, userId: U1, enabled: true });
    expect(r.status).toBe("needs-link-confirmation");
    expect(cloud.tables.size).toBe(0);
    expect((await run(s, cloud)).status).toBe("ok");
    expect(readMeta(s)?.accountId).toBe(U1);
    // Same device, different account: refused until the student unlinks it.
    expect((await syncOnce({ storage: s, remote: new MemCloud(), userId: U2, enabled: true, confirmLink: true })).status).toBe("linked-to-another-account");
    unlinkDevice(s);
    expect(readMeta(s)).toBeNull();
    // Unlinking keeps every local record.
    expect(s.json("atlas:bookmarks")).toHaveLength(1);
  });
});

describe("local data is preserved", () => {
  it("the first sync uploads progress and leaves every local key byte-identical", async () => {
    const s = device();
    const before = new Map(s.data);
    const cloud = new MemCloud();
    const r = await run(s, cloud);
    expect(r).toMatchObject({ status: "ok", changedLocal: 0, conflicts: 0 });
    for (const [k, v] of before) expect(s.data.get(k), k).toBe(v);
    expect(cloud.live("bookmarks")).toHaveLength(1);
    expect(cloud.live("checklist_items")).toHaveLength(2); // dpp:false isn't a completion
    expect(cloud.live("revision_rounds")).toHaveLength(2);
    expect(cloud.live("mistakes")).toHaveLength(1); // the old-browser id stays local-only
    expect(cloud.live("goals")).toHaveLength(1);
    expect(cloud.live("streaks")).toHaveLength(1);
  });

  it("never reads the local-only stores", async () => {
    const s = device();
    await run(s, new MemCloud());
    for (const k of LOCAL_ONLY_KEYS) expect(s.reads, k).not.toContain(k);
    expect(new Set(s.reads)).toEqual(new Set([...SYNCED_KEYS, SYNC_META_KEY]));
  });

  it("keeps entries it can't sync (non-UUID mistakes, malformed rows, unticked items, unknown keys) when it rewrites a store", async () => {
    const s = device();
    s.setItem("atlas:bookmarks", JSON.stringify([...s.json("atlas:bookmarks"), { id: 42, junk: true }]));
    s.setItem("atlas:goals", JSON.stringify({ ...s.json("atlas:goals"), "Not A Goal!": "x" }));
    const cloud = new MemCloud();
    await run(s, cloud);
    // Another device adds things, forcing every store on this device to be rewritten.
    const other = new MemStorage();
    await run(other, cloud);
    const bm = other.json("atlas:bookmarks");
    other.setItem("atlas:bookmarks", JSON.stringify([...bm, { ...bm[0], id: "12:atoms:chapter", cls: "12", slug: "atoms", chapterName: "Atoms", label: "Atoms", path: "/class-12/atoms", bookmarkedAt: T0 + day }]));
    other.setItem("atlas:goals", JSON.stringify({ ...other.json("atlas:goals"), "weekly-revision": T0 + day }));
    const m = other.json("atlas:mistakes");
    other.setItem("atlas:mistakes", JSON.stringify([{ ...m[0], resolvedAt: T0 + 2 * day }]));
    other.setItem("atlas:checklist", JSON.stringify({ ...other.json("atlas:checklist"), "11:gravitation": { pyq: true } }));
    await run(other, cloud);
    await run(s, cloud);
    expect(s.json("atlas:bookmarks").some((b: { id: unknown }) => b.id === 42)).toBe(true);
    expect(s.json("atlas:bookmarks")).toHaveLength(3);
    expect(s.json("atlas:goals")["Not A Goal!"]).toBe("x");
    expect(s.json("atlas:mistakes").find((x: { id: string }) => x.id === "1763000000000-k3j2h")?.note).toBe("old-browser id");
    expect(s.json("atlas:mistakes").find((x: { id: string }) => x.id === M1).resolvedAt).toBe(T0 + 2 * day);
    expect(s.json("atlas:checklist")["11:kinematics"].dpp).toBe(false);
    expect(s.json("atlas:checklist")["11:gravitation"].pyq).toBe(true);
    // The local-only stores are never touched.
    expect(s.json("atlas:recent-searches")).toEqual(["private search"]);
  });

  it("doesn't overwrite a store the student changed during the sync", async () => {
    const s = device();
    const cloud = new MemCloud();
    await run(s, cloud);
    const other = new MemStorage();
    await run(other, cloud);
    other.setItem("atlas:goals", JSON.stringify({ "daily-dpp": T0, "weekly-revision": T0 + day }));
    await run(other, cloud);
    // Device s changes its goals between the engine's read and write.
    const realPull = cloud.pull.bind(cloud);
    let injected = false;
    cloud.pull = async (t) => {
      if (t === "streaks" && !injected) {
        injected = true;
        s.setItem("atlas:goals", JSON.stringify({ "daily-dpp": T0, "student-made-this": T0 + 3 * day }));
      }
      return realPull(t);
    };
    const r = await run(s, cloud);
    expect(r.status === "ok" && r.skippedStores).toContain("atlas:goals");
    expect(s.json("atlas:goals")["student-made-this"]).toBe(T0 + 3 * day);
    cloud.pull = realPull;
    await run(s, cloud);
    expect(Object.keys(s.json("atlas:goals")).sort()).toEqual(["daily-dpp", "student-made-this", "weekly-revision"]);
  });
});

describe("two devices, one account", () => {
  it("a second device receives the progress in the app's own formats", async () => {
    const cloud = new MemCloud();
    await run(device(), cloud);
    const d2 = new MemStorage();
    expect((await run(d2, cloud)).status).toBe("ok");
    expect(d2.json("atlas:bookmarks")[0]).toMatchObject({ id: "11:kinematics:chapter", bookmarkedAt: T0 });
    expect(d2.json("atlas:checklist")).toEqual({ "11:kinematics": { notes: true }, "12:atoms": { formulaSheet: true } });
    expect(d2.json("atlas:revision")).toEqual({ "11:kinematics": [{ round: 1, completedAt: 0 }, { round: 2, completedAt: T0 + day }] });
    expect(d2.json("atlas:mistakes")[0]).toMatchObject({ id: M1, questionId: "17", resolvedAt: null, note: "mixed up n and l" });
    expect(d2.json("atlas:goals")).toEqual({ "daily-dpp": T0 });
    expect(d2.json("atlas:study-streak")).toEqual({ current: 3, longest: 7, lastActiveDate: "2026-11-03" });
  });

  it("propagates edits, deletions and resolutions both ways; repeat syncs change nothing", async () => {
    const cloud = new MemCloud();
    const d1 = device();
    await run(d1, cloud);
    const d2 = new MemStorage();
    await run(d2, cloud);
    // d1 removes the bookmark; d2 resolves the mistake and unticks notes.
    d1.setItem("atlas:bookmarks", "[]");
    const m = d2.json("atlas:mistakes");
    d2.setItem("atlas:mistakes", JSON.stringify([{ ...m[0], resolvedAt: T0 + 5 * day }]));
    d2.setItem("atlas:checklist", JSON.stringify({ "11:kinematics": { notes: false }, "12:atoms": { formulaSheet: true } }));
    await run(d1, cloud);
    await run(d2, cloud);
    await run(d1, cloud);
    for (const d of [d1, d2]) {
      expect(d.json("atlas:bookmarks")).toEqual([]);
      expect(d.json("atlas:mistakes").find((x: { id: string }) => x.id === M1).resolvedAt).toBe(T0 + 5 * day);
      expect(d.json("atlas:checklist")["11:kinematics"].notes).toBe(false);
    }
    // Reopening a resolved mistake propagates too (no "resolved wins" stickiness).
    const m1 = d1.json("atlas:mistakes");
    d1.setItem("atlas:mistakes", JSON.stringify(m1.map((x: { id: string }) => (x.id === M1 ? { ...x, resolvedAt: null } : x))));
    await run(d1, cloud);
    await run(d2, cloud);
    expect(d2.json("atlas:mistakes").find((x: { id: string }) => x.id === M1).resolvedAt).toBeNull();
    // Converged: further passes push and change nothing.
    for (const d of [d1, d2]) expect(await run(d, cloud)).toMatchObject({ status: "ok", pushed: 0, deletedRemote: 0, changedLocal: 0 });
  });

  it("an edit beats a concurrent deletion, and concurrent note edits keep both texts", async () => {
    const cloud = new MemCloud();
    const d1 = device();
    await run(d1, cloud);
    const d2 = new MemStorage();
    await run(d2, cloud);
    // d1 deletes the mistake while d2 edits its note.
    d1.setItem("atlas:mistakes", JSON.stringify(d1.json("atlas:mistakes").filter((x: { id: string }) => x.id !== M1)));
    const m = d2.json("atlas:mistakes");
    d2.setItem("atlas:mistakes", JSON.stringify([{ ...m[0], note: "edited on phone" }]));
    await run(d2, cloud);
    await run(d1, cloud);
    expect(d1.json("atlas:mistakes").find((x: { id: string }) => x.id === M1)?.note).toBe("edited on phone");
    // Both edit the same note before syncing.
    const a = d1.json("atlas:mistakes");
    d1.setItem("atlas:mistakes", JSON.stringify(a.map((x: { id: string }) => (x.id === M1 ? { ...x, note: "laptop version" } : x))));
    const b = d2.json("atlas:mistakes");
    d2.setItem("atlas:mistakes", JSON.stringify(b.map((x: { id: string }) => (x.id === M1 ? { ...x, note: "phone version" } : x))));
    await run(d1, cloud);
    const r = await run(d2, cloud);
    expect(r.status === "ok" && r.conflicts).toBe(1);
    const note = d2.json("atlas:mistakes").find((x: { id: string }) => x.id === M1).note;
    expect(note).toContain("phone version");
    expect(note).toContain("laptop version");
  });

  it("merges streaks without losing the best run", async () => {
    const cloud = new MemCloud();
    const d1 = device();
    await run(d1, cloud);
    const d2 = new MemStorage();
    await run(d2, cloud);
    d1.setItem("atlas:study-streak", JSON.stringify({ current: 9, longest: 9, lastActiveDate: "2026-11-09" }));
    d2.setItem("atlas:study-streak", JSON.stringify({ current: 1, longest: 7, lastActiveDate: "2026-11-12" }));
    await run(d1, cloud);
    await run(d2, cloud);
    expect(d2.json("atlas:study-streak")).toEqual({ current: 1, longest: 9, lastActiveDate: "2026-11-12" });
  });
});

describe("a cloud copy deleted outright (withdrawal, then re-consent): owner review B1", () => {
  const SYNCED = ["atlas:bookmarks", "atlas:checklist", "atlas:revision", "atlas:mistakes", "atlas:goals", "atlas:study-streak"];
  /** Device B synced earlier, so its base lists every record; then the student withdrew on device A. */
  async function staleDeviceB() {
    const cloud = new MemCloud();
    const b = device();
    expect((await run(b, cloud)).status).toBe("ok");
    expect(Object.keys(readMeta(b)!.base["atlas:bookmarks"])).toHaveLength(1);
    const before = new Map(b.data);
    cloud.withdrawAll("gen-2"); // withdraw_cloud_copies(): rows gone, no tombstones, new generation
    return { cloud, b, before };
  }

  it("device B with an old base asks before linking again, and changes nothing until confirmed", async () => {
    const { cloud, b, before } = await staleDeviceB();
    const r = await syncOnce({ storage: b, remote: cloud, userId: U1, enabled: true, now: () => T0 });
    expect(r).toEqual({ status: "needs-link-confirmation", localRecords: expect.any(Number), reason: "cloud-copy-replaced" });
    expect(b.data).toEqual(before);
    expect(cloud.tables.size).toBe(0);
  });

  it("confirmed: keeps EVERY local record (byte-identical) and re-uploads it", async () => {
    const { cloud, b, before } = await staleDeviceB();
    const r = await run(b, cloud);
    expect(r).toMatchObject({ status: "ok", deletedRemote: 0, changedLocal: 0 });
    for (const k of SYNCED) expect(b.data.get(k), k).toBe(before.get(k));
    expect(cloud.live("bookmarks")).toHaveLength(1);
    expect(cloud.live("checklist_items")).toHaveLength(2);
    expect(cloud.live("revision_rounds")).toHaveLength(2);
    expect(cloud.live("mistakes")).toHaveLength(1);
    expect(cloud.live("goals")).toHaveLength(1);
    expect(cloud.live("streaks")).toHaveLength(1);
    expect(readMeta(b)?.cloudGeneration).toBe("gen-2");
  });

  it("when another device re-uploaded first, B keeps its own records and combines with the new copy", async () => {
    const { cloud, b, before } = await staleDeviceB();
    const a = new MemStorage({ "atlas:goals": { "weekly-pyq": T0 + day } }); // device A, after re-consent
    expect((await run(a, cloud)).status).toBe("ok");
    expect((await run(b, cloud)).status).toBe("ok");
    expect(b.json("atlas:bookmarks")).toEqual(JSON.parse(before.get("atlas:bookmarks")!));
    expect(b.json("atlas:mistakes")).toEqual(JSON.parse(before.get("atlas:mistakes")!));
    expect(b.json("atlas:goals")).toEqual({ "daily-dpp": T0, "weekly-pyq": T0 + day });
    expect(cloud.live("goals")).toHaveLength(2);
  });

  it("a sync record written before generations existed is treated as another generation", async () => {
    const { cloud, b, before } = await staleDeviceB();
    const meta = readMeta(b)!;
    delete meta.cloudGeneration;
    b.setItem(SYNC_META_KEY, JSON.stringify(meta));
    expect((await syncOnce({ storage: b, remote: cloud, userId: U1, enabled: true })).status).toBe("needs-link-confirmation");
    expect((await run(b, cloud)).status).toBe("ok");
    for (const k of SYNCED) expect(b.data.get(k), k).toBe(before.get(k));
  });

  it("a withdrawal committing DURING the pull: the pass stops and writes nothing anywhere", async () => {
    const cloud = new MemCloud();
    const b = device();
    await run(b, cloud);
    const before = new Map(b.data);
    const pushes = cloud.pushes;
    cloud.afterPull = (t) => { if (t === "checklist_items") cloud.withdrawAll("gen-3"); };
    const r = await run(b, cloud);
    // Stopped either by the generation re-check or, where present, by the missing-records check (M1).
    expect(["error", "cloud-incomplete"]).toContain(r.status);
    expect(b.data).toEqual(before);
    expect(cloud.pushes).toBe(pushes);
  });

  it("a withdrawal committing right AFTER the last pull: the generation re-check stops the pass", async () => {
    const cloud = new MemCloud();
    const b = device();
    await run(b, cloud);
    b.setItem("atlas:goals", JSON.stringify({ "daily-dpp": T0, "weekly-pyq": T0 })); // something to push
    const before = new Map(b.data);
    const pushes = cloud.pushes;
    cloud.afterPull = (t) => { if (t === "streaks") cloud.withdrawAll("gen-4"); }; // every pull saw the old copy
    const r = await run(b, cloud);
    expect(r).toEqual({ status: "error", stage: "pull", message: "the cloud copy changed during this sync" });
    expect(b.data).toEqual(before);
    expect(cloud.pushes).toBe(pushes);
  });

  it("no profile (no generation): an error, nothing read into the device or written", async () => {
    const cloud = new MemCloud();
    cloud.generation = null;
    const b = device();
    const before = new Map(b.data);
    expect((await run(b, cloud)).status).toBe("error");
    expect(b.data).toEqual(before);
    expect(cloud.tables.size).toBe(0);
  });
});

describe("offline, failures and retries", () => {
  it("a pull failure changes nothing on the device", async () => {
    const s = device();
    const before = new Map(s.data);
    const cloud = new MemCloud();
    cloud.failPull = true;
    expect(await run(s, cloud)).toMatchObject({ status: "error", stage: "pull" });
    expect(s.data).toEqual(before);
  });

  it("an interrupted upload leaves the device untouched and the retry converges without duplicates", async () => {
    const s = device();
    const before = new Map(s.data);
    const cloud = new MemCloud();
    cloud.failPushAfter = 2;
    expect(await run(s, cloud)).toMatchObject({ status: "error", stage: "push" });
    expect(s.data).toEqual(before);
    cloud.failPushAfter = Infinity;
    expect((await run(s, cloud)).status).toBe("ok");
    expect((await run(s, cloud)) as object).toMatchObject({ pushed: 0, changedLocal: 0 });
    expect(cloud.live("bookmarks")).toHaveLength(1);
    expect(cloud.live("mistakes")).toHaveLength(1);
  });
});

describe("question identity", () => {
  it("namespaces legacy positions so a rebuilt question can never inherit an old mistake", () => {
    const legacy = toQuestionRef({ questionId: "17", resourceType: "pyq", cls: "12", slug: "atoms" });
    expect(legacy).toBe("legacy:pyq:12/atoms#17");
    expect(fromQuestionRef(legacy)).toBe("17");
    expect(toQuestionRef({ questionId: "pyq-neet-2024-x1-q17", resourceType: "pyq", cls: "12", slug: "atoms" })).toBe("pyq-neet-2024-x1-q17");
    expect(legacy).not.toBe("pyq-neet-2024-x1-q17");
    expect(toQuestionRef({ questionId: "../17", resourceType: "pyq", cls: "12", slug: "atoms" })).toBeNull();
    expect(toQuestionRef({ questionId: undefined, resourceType: "dpp", cls: "11", slug: "kinematics" })).toBeNull();
  });

  it("every cloud question_ref the adapter produces matches the database CHECK constraint", () => {
    const sql = readFileSync(path.resolve(__dirname, "..", "..", "..", "supabase", "migrations", readdirSync(path.resolve(__dirname, "..", "..", "..", "supabase", "migrations"))[0]), "utf8");
    const pattern = /question_ref ~ '(\^[^']+\$)'/.exec(sql)![1];
    const re = new RegExp(pattern);
    for (const q of ["17", "0", "99999", "q-c11-units-0001", "pyq-neet-2024-x1-q12"]) {
      const ref = toQuestionRef({ questionId: q, resourceType: "pyq", cls: "12", slug: "atoms" });
      expect(ref && re.test(ref), `${q} → ${ref}`).toBe(true);
    }
    const row = mistakesAdapter.toRow({ id: M2, cls: "11", slug: "kinematics", chapterName: "K", resourceType: "dpp", questionId: "3", conceptTag: "c", difficulty: "easy", note: "", createdAt: T0, resolvedAt: null });
    expect(re.test(String(row.question_ref))).toBe(true);
  });
});

describe("merge core", () => {
  it("fingerprints are order-independent and change with content", () => {
    expect(stableStringify({ b: 1, a: [2, { d: 1, c: 0 }] })).toBe('{"a":[2,{"c":0,"d":1}],"b":1}');
    expect(fingerprint({ a: 1, b: 2 })).toBe(fingerprint({ b: 2, a: 1 }));
    expect(fingerprint({ a: 1 })).not.toBe(fingerprint({ a: 2 }));
  });

  it("covers every base/local/remote combination deterministically", () => {
    const f = (v: number) => fingerprint(v);
    const out = threeWayMerge<number>({
      base: new Map([["same", f(1)], ["localEdit", f(1)], ["remoteEdit", f(1)], ["localDel", f(1)], ["remoteDel", f(1)], ["bothDel", f(1)], ["editVsDel", f(1)]]),
      local: new Map([["same", 1], ["localEdit", 2], ["remoteEdit", 1], ["remoteDel", 1], ["editVsDel", 5], ["newLocal", 7], ["firstBoth", 3]]),
      remote: new Map([["same", 1], ["localEdit", 1], ["remoteEdit", 9], ["localDel", 1], ["newRemote", 8], ["firstBoth", 4]]),
      remoteDeleted: new Set(["remoteDel", "bothDel", "editVsDel"]),
      combine: (l, r) => Math.max(l, r),
    });
    expect(Object.fromEntries(out.merged)).toEqual({ same: 1, localEdit: 2, remoteEdit: 9, editVsDel: 5, newLocal: 7, newRemote: 8, firstBoth: 4 });
    // firstBoth merges to 4, which the cloud already holds, so it is not pushed.
    expect([...out.push.keys()].sort()).toEqual(["editVsDel", "localEdit", "newLocal"]);
    expect([...out.deleteRemote]).toEqual(["localDel"]);
    expect([...out.changedLocal].sort()).toEqual(["firstBoth", "newRemote", "remoteDel", "remoteEdit"].sort());
    expect(out.conflicts).toEqual(["firstBoth"]);
  });
});

// ─────────────────────────────────────────────────────────────────
// M1 (PR #25 review): an account that synced while verified, and then reads
// as unverified. The verified-email SELECT policy hides its cloud rows, and
// that absence must never be read as "deleted in the cloud".
// ─────────────────────────────────────────────────────────────────
describe("M1: an account that becomes unverified after syncing keeps its device progress", () => {
  const STUDY_KEYS = ["atlas:bookmarks", "atlas:checklist", "atlas:revision", "atlas:mistakes", "atlas:goals", "atlas:study-streak"];
  const snapshot = (s: MemStorage) => new Map(s.data);
  /** A device that has synced once while the account was verified (base recorded), and a cloud holding its rows. */
  async function syncedWhileVerified() {
    const s = device();
    const cloud = new MemCloud();
    expect((await run(s, cloud)).status).toBe("ok");
    expect(Object.keys(readMeta(s)!.base["atlas:bookmarks"] ?? {})).toHaveLength(1); // the base remembers the synced bookmark
    return { s, cloud };
  }
  const expectStudyDataIntact = (s: MemStorage) => {
    expect(s.json("atlas:bookmarks")).toHaveLength(1);
    expect(s.json("atlas:bookmarks")[0].id).toBe("11:kinematics:chapter");
    expect(s.json("atlas:mistakes").map((m: { id: string }) => m.id)).toEqual([M1, "1763000000000-k3j2h"]);
    expect(s.json("atlas:goals")).toEqual({ "daily-dpp": T0 });
    expect(s.json("atlas:checklist")).toEqual({ "11:kinematics": { notes: true, dpp: false }, "12:atoms": { formulaSheet: true } });
    expect(s.json("atlas:revision")["11:kinematics"]).toHaveLength(2);
    expect(s.json("atlas:study-streak")).toEqual({ current: 3, longest: 7, lastActiveDate: "2026-11-03" });
  };

  it("the exact M1 scenario: sync_allowed() is false and the rows are hidden → refused before any read; nothing changes", async () => {
    const { s, cloud } = await syncedWhileVerified();
    const before = snapshot(s);
    const pullsBefore = cloud.pulls;
    cloud.allowed = async () => false; // email no longer verified: sync_allowed() answers false
    cloud.hidden = true; //               and the SELECT policy hides the rows
    expect(await run(s, cloud)).toEqual({ status: "not-allowed" });
    expect(cloud.pulls).toBe(pullsBefore); // nothing was even read
    expect(s.data).toEqual(before); //       every key byte-identical, sync meta included
    expectStudyDataIntact(s);
  });

  it("defence in depth: even if the gate wrongly said yes, hidden rows are never read as deletions (bookmarks, mistakes, goals, checklist ticks kept)", async () => {
    const { s, cloud } = await syncedWhileVerified();
    const before = snapshot(s);
    cloud.hidden = true; // allowed() still answers true
    const r = await run(s, cloud);
    expect(r.status).toBe("cloud-incomplete");
    expect(s.data).toEqual(before);
    expectStudyDataIntact(s);
    // Before the fix this pass returned "ok" and deleted 8 local records (the bookmark, the synced
    // mistake, the goal, both checklist ticks and more). Assert the absence of every deletion explicitly:
    for (const k of STUDY_KEYS) expect(s.data.get(k), k).toBe(before.get(k));
  });

  it("a partial answer (one previously synced row missing, e.g. a truncated response) is refused too; nothing is pushed or changed", async () => {
    const { s, cloud } = await syncedWhileVerified();
    cloud.tables.get("mistakes")!.clear(); // a synced mistake vanished from the answer without a tombstone
    const before = snapshot(s);
    const pushes = cloud.pushes;
    expect(await run(s, cloud)).toMatchObject({ status: "cloud-incomplete", table: "mistakes", missing: 1 });
    expect(cloud.pushes).toBe(pushes);
    expect(s.data).toEqual(before);
    expectStudyDataIntact(s);
  });

  it("only an explicit true lets a sync run: errors, null, undefined, 'true' and 1 all refuse before any read", async () => {
    for (const answer of [async () => { throw new Error("rpc failed"); }, async () => null, async () => undefined, async () => "true", async () => 1, async () => ({ ok: true })]) {
      const s = device();
      const cloud = new MemCloud();
      cloud.allowed = answer;
      const before = snapshot(s);
      expect(await run(s, cloud)).toEqual({ status: "not-allowed" });
      expect(cloud.pulls).toBe(0);
      expect(cloud.tables.size).toBe(0);
      expect(s.data).toEqual(before);
    }
  });

  it("an unverified account that never synced: refused, and no link confirmation is asked for", async () => {
    const s = device();
    const cloud = new MemCloud();
    cloud.allowed = async () => false;
    expect(await syncOnce({ storage: s, remote: cloud, userId: U1, enabled: true })).toEqual({ status: "not-allowed" });
    expect(s.data.has(SYNC_META_KEY)).toBe(false);
  });

  it("once the address is verified again, sync resumes with nothing lost on either side", async () => {
    const { s, cloud } = await syncedWhileVerified();
    cloud.allowed = async () => false;
    cloud.hidden = true;
    expect((await run(s, cloud)).status).toBe("not-allowed");
    cloud.allowed = async () => true;
    cloud.hidden = false;
    expect(await run(s, cloud)).toMatchObject({ status: "ok", pushed: 0, deletedRemote: 0, changedLocal: 0 });
    expectStudyDataIntact(s);
    expect(cloud.live("bookmarks")).toHaveLength(1);
  });

  it("real deletions still propagate: a tombstone (not an absence) removes the record on the other device", async () => {
    const { s: d1, cloud } = await syncedWhileVerified();
    const d2 = new MemStorage();
    expect((await run(d2, cloud)).status).toBe("ok");
    d1.setItem("atlas:bookmarks", "[]");
    expect((await run(d1, cloud)).status).toBe("ok"); // pushes a tombstone
    expect((await run(d2, cloud)).status).toBe("ok");
    expect(d2.json("atlas:bookmarks")).toEqual([]);
  });
});

describe("supabaseRemote.syncAllowed", () => {
  const fake = (result: { data?: unknown; error?: unknown } | Error) =>
    ({ rpc: async (fn: string) => { expect(fn).toBe("sync_allowed"); if (result instanceof Error) throw result; return result; } }) as unknown as Parameters<typeof supabaseRemote>[0];
  it("is true only for an explicit boolean true without an error", async () => {
    expect(await supabaseRemote(fake({ data: true, error: null }), U1).syncAllowed()).toBe(true);
    for (const r of [{ data: false, error: null }, { data: null, error: null }, { data: "true", error: null }, { data: true, error: { message: "denied" } }, { data: 1, error: null }])
      expect(await supabaseRemote(fake(r), U1).syncAllowed(), JSON.stringify(r)).toBe(false);
  });
  it("a thrown network error rejects, and the engine treats that as not allowed", async () => {
    const remote = supabaseRemote(fake(new Error("offline")), U1);
    await expect(remote.syncAllowed()).rejects.toThrow("offline");
    const s = device();
    expect(await syncOnce({ storage: s, remote, userId: U1, enabled: true, confirmLink: true })).toEqual({ status: "not-allowed" });
  });
});

describe("source guarantees", () => {
  it("sync code never removes or resets a study key, and never names a local-only key outside the policy", () => {
    const dir = path.resolve(__dirname, "..", "sync");
    for (const f of readdirSync(dir)) {
      const src = readFileSync(path.join(dir, f), "utf8");
      expect(src, f).not.toMatch(/localStorage\.(removeItem|clear)/);
      if (f !== "policy.ts") for (const k of LOCAL_ONLY_KEYS) expect(src, `${f} mentions ${k}`).not.toContain(k);
    }
  });
});
