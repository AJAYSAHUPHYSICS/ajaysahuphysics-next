// ─────────────────────────────────────────────────────────────────
// STAGING verification suite. Run ONLY against the staging project:
//
//   STAGING_SUPABASE_URL=https://<staging-ref>.supabase.co \
//   STAGING_CONFIRM_REF=<staging-ref> \
//   STAGING_SUPABASE_ANON_KEY=... STAGING_SUPABASE_SERVICE_ROLE_KEY=... \
//   npm run test:staging
//
// Prerequisites (supabase/README.md): the migration is applied, and the
// delete-account function is deployed with its secrets.
//
// It uses synthetic accounts only (atlas-staging-<run>-a/b@example.com,
// created with the admin API, so no email is sent), sets
// adult_sync_permitted='true' IN STAGING for the run (the previous value is
// restored afterwards), and deletes every account it creates.
// Evidence (no keys, no tokens) is written to staging-evidence/<run>.json,
// which is git-ignored.
//
// Not covered here (needs a real inbox; see the manual checklist in
// supabase/README.md): confirmation and reset emails, and the browser PKCE
// callback.
// ─────────────────────────────────────────────────────────────────
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { MESSAGES, signInErrorMessage } from "@/lib/auth/auth-policy";
import type { Storage } from "@/lib/sync/adapters";
import { readMeta, syncOnce, type RemoteStore } from "@/lib/sync/engine";
import { LOCAL_ONLY_KEYS } from "@/lib/sync/policy";
import { supabaseRemote } from "@/lib/sync/supabase-remote";
import { redact, stagingTarget } from "./guard.mjs";

const T = stagingTarget(process.env);
const RUN = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14) + "-" + randomBytes(2).toString("hex");
const evidence: { step: string; ok: boolean; detail?: unknown }[] = [];
const record = (step: string, ok: boolean, detail?: unknown) => evidence.push({ step, ok, detail: detail === undefined ? undefined : JSON.parse(redact(JSON.stringify(detail), T)) });

const noSession = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
const admin = createClient(T.url, T.serviceKey, noSession);
const anon = createClient(T.url, T.anonKey, noSession);

type Student = { id: string; email: string; password: string; client: SupabaseClient };
const created: string[] = [];
let originalAdultSwitch: string | null = null;
let consentVersion = "";

class MemStorage implements Storage {
  data = new Map<string, string>();
  constructor(init: Record<string, unknown> = {}) {
    for (const [k, v] of Object.entries(init)) this.data.set(k, typeof v === "string" ? v : JSON.stringify(v));
  }
  getItem(k: string) {
    return this.data.get(k) ?? null;
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

async function makeStudent(tag: string): Promise<Student> {
  const email = `atlas-staging-${RUN}-${tag}@example.com`;
  const password = randomBytes(18).toString("base64url");
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error || !data.user) throw new Error(`createUser ${tag}: ${error?.message}`);
  created.push(data.user.id);
  const client = createClient(T.url, T.anonKey, noSession);
  const { error: e2 } = await client.auth.signInWithPassword({ email, password, options: T.captchaToken ? { captchaToken: T.captchaToken } : undefined });
  if (e2) throw new Error(`sign in ${tag}: ${e2.message}`);
  return { id: data.user.id, email, password, client };
}

async function optIn(s: Student) {
  const { error: pe } = await s.client.from("profiles").insert({ age_band: "18-plus" });
  if (pe) throw new Error(`profile: ${pe.message}`);
  for (const kind of ["terms", "privacy", "cloud-sync"]) {
    const { error } = await s.client.from("consents").insert({ kind, version: consentVersion, granted: true });
    if (error) throw new Error(`consent ${kind}: ${error.message}`);
  }
}

const count = async (table: string, userId: string, live = false) => {
  let q = admin.from(table).select("*", { count: "exact", head: true }).eq("user_id", userId);
  if (live && table !== "checklist_items" && table !== "streaks") q = q.is("deleted_at", null);
  const { count: n, error } = await q;
  if (error) throw new Error(`count ${table}: ${error.message}`);
  return n ?? 0;
};
const STUDY_TABLES = ["bookmarks", "checklist_items", "revision_rounds", "mistakes", "goals", "streaks"];

const T0 = Date.UTC(2026, 10, 1);
const M1 = randomUUID();
const deviceData = () => ({
  "atlas:bookmarks": [{ id: "11:kinematics:chapter", cls: "11", slug: "kinematics", type: "chapter", chapterName: "Kinematics", label: "Kinematics", path: "/class-11/kinematics", bookmarkedAt: T0 }],
  "atlas:checklist": { "11:kinematics": { notes: true, dpp: false } },
  "atlas:revision": { "11:kinematics": [1, { round: 2, completedAt: T0 + 86_400_000 }] },
  "atlas:mistakes": [{ id: M1, cls: "12", slug: "atoms", chapterName: "Atoms", resourceType: "pyq", questionId: "17", conceptTag: "Bohr model", difficulty: "medium", note: "mixed up n and l", createdAt: T0, resolvedAt: null, category: "conceptual" }],
  "atlas:goals": { "daily-dpp": T0 },
  "atlas:study-streak": { current: 3, longest: 7, lastActiveDate: "2026-11-03" },
  // Local-only stores: must never reach the server.
  "atlas:activity-log": [{ type: "chapter-visited", cls: "11", slug: "kinematics", label: "SENTINEL-ACTIVITY", at: T0 }],
  "atlas:recent-searches": ["SENTINEL-SEARCH"],
  "atlas:reading-progress": { "/class-11/kinematics/notes/": { pct: 40, updatedAt: T0 } },
});
const sync = (s: Student, storage: Storage, remote: RemoteStore = supabaseRemote(s.client, s.id), confirmLink = true) => syncOnce({ remote, userId: s.id, storage, enabled: true, confirmLink });

let A: Student;
let B: Student;
const deviceA1 = new MemStorage(deviceData());
const deviceA2 = new MemStorage();

beforeAll(async () => {
  const { data, error } = await admin.from("app_config").select("key,value");
  if (error) throw new Error(`app_config not readable; is the migration applied? ${error.message}`);
  const cfg = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  consentVersion = cfg.consent_version;
  originalAdultSwitch = cfg.adult_sync_permitted ?? null;
  record("target", true, { ref: T.ref, run: RUN, config: cfg });
  A = await makeStudent("a");
  B = await makeStudent("b");
  record("synthetic accounts created", true, { a: A.id, b: B.id });
});

afterAll(async () => {
  for (const id of created) {
    await admin.rpc("purge_user_data", { target: id });
    const { error } = await admin.auth.admin.deleteUser(id);
    record(`cleanup ${id}`, !error || /not found/i.test(error.message), error?.message);
  }
  if (originalAdultSwitch !== null) {
    const { error } = await admin.from("app_config").update({ value: originalAdultSwitch }).eq("key", "adult_sync_permitted");
    record("adult_sync_permitted restored", !error, { value: originalAdultSwitch, error: error?.message });
  }
  mkdirSync("staging-evidence", { recursive: true });
  const file = path.join("staging-evidence", `${RUN}.json`);
  writeFileSync(file, JSON.stringify({ run: RUN, ref: T.ref, at: new Date().toISOString(), steps: evidence }, null, 2));
  console.log(`staging evidence: ${file} (${evidence.filter((e) => e.ok).length}/${evidence.length} ok)`);
});

describe("anonymous visitors", () => {
  it("cannot read or write any student table or call the data functions", async () => {
    for (const t of [...STUDY_TABLES, "profiles", "consents", "app_config", "deletion_requests", "deletion_log"]) {
      const { data, error } = await anon.from(t).select("*").limit(1);
      expect(error || (data ?? []).length === 0, t).toBeTruthy();
      expect((data ?? []).length, t).toBe(0);
    }
    const ins = await anon.from("bookmarks").insert({ bookmark_id: "x", cls: "11", slug: "kinematics", type: "chapter", chapter_name: "K", label: "K", path: "/class-11/kinematics", bookmarked_at: new Date().toISOString() });
    expect(ins.error).toBeTruthy();
    for (const fn of ["export_my_data", "enable_sync", "request_account_deletion"]) expect((await anon.rpc(fn)).error, fn).toBeTruthy();
    record("anon denied", true);
  });
});

describe("authentication behaviour", () => {
  it("wrong password and unknown email give the same generic message", async () => {
    const c = createClient(T.url, T.anonKey, noSession);
    const opts = T.captchaToken ? { captchaToken: T.captchaToken } : undefined;
    const wrong = await c.auth.signInWithPassword({ email: A.email, password: "definitely-wrong-123", options: opts });
    const unknown = await c.auth.signInWithPassword({ email: `nobody-${RUN}@example.com`, password: "definitely-wrong-123", options: opts });
    expect(wrong.error && unknown.error).toBeTruthy();
    expect(signInErrorMessage(wrong.error)).toBe(MESSAGES.signInFailed);
    expect(signInErrorMessage(unknown.error)).toBe(signInErrorMessage(wrong.error));
    record("generic sign-in errors", true, { wrong: wrong.error?.status, unknown: unknown.error?.status });
  });

  it("CAPTCHA (when staging has it on): a request without a token is rejected with the CAPTCHA message", async () => {
    if (!T.captchaToken) {
      record("captcha", true, "skipped: STAGING_TURNSTILE_TEST_TOKEN not set");
      return;
    }
    const c = createClient(T.url, T.anonKey, noSession);
    const r = await c.auth.signInWithPassword({ email: A.email, password: A.password });
    expect(r.error).toBeTruthy();
    expect(signInErrorMessage(r.error)).toBe(MESSAGES.captcha);
    record("captcha rejection", true, { status: r.error?.status, code: (r.error as { code?: string })?.code });
  });

  it("sessions refresh, and an invalid token is refused", async () => {
    const { data, error } = await A.client.auth.refreshSession();
    expect(error).toBeNull();
    expect(data.session?.user.id).toBe(A.id);
    const bad = await anon.auth.getUser("not-a-real-token");
    expect(bad.error).toBeTruthy();
    record("session refresh / invalid token", true);
  });
});

describe("consent gate (database-side)", () => {
  it("blocks study uploads until the student opts in and the owner's switch allows it", async () => {
    const before = await A.client.from("bookmarks").insert({ bookmark_id: "pre", cls: "11", slug: "kinematics", type: "chapter", chapter_name: "K", label: "K", path: "/class-11/kinematics", bookmarked_at: new Date().toISOString() });
    expect(before.error).toBeTruthy();
    expect((await A.client.rpc("enable_sync")).data).toBe("no-profile");
    await optIn(A);
    await optIn(B);
    const blocked = (await A.client.rpc("enable_sync")).data;
    record("enable_sync with switch as configured", true, { result: blocked, switch: originalAdultSwitch });
    if (originalAdultSwitch !== "true") expect(blocked).toBe("not-available-yet");
    // STAGING ONLY: allow adult sync for this run (restored in afterAll).
    const { error } = await admin.from("app_config").update({ value: "true" }).eq("key", "adult_sync_permitted");
    expect(error).toBeNull();
    expect((await A.client.rpc("enable_sync")).data).toBe("enabled");
    expect((await B.client.rpc("enable_sync")).data).toBe("enabled");
    record("consent gate", true);
  });

  it("a student can't record parental consent or switch sync on directly", async () => {
    const pc = await B.client.from("consents").insert({ kind: "parental", version: consentVersion, granted: true, method: "parent-verified" });
    expect(pc.error).toBeTruthy();
    await B.client.from("profiles").update({ sync_enabled: false }).eq("user_id", B.id);
    const up = await B.client.from("profiles").update({ age_band: "under-18" }).eq("user_id", B.id);
    expect(up.error).toBeNull();
    const { data: p } = await admin.from("profiles").select("sync_enabled").eq("user_id", B.id).single();
    expect(p?.sync_enabled).toBe(false); // declaring under-18 switches sync off
    expect((await B.client.rpc("enable_sync")).data).toBe("not-available-for-under-18");
    const direct = await B.client.from("profiles").update({ sync_enabled: true }).eq("user_id", B.id);
    const { data: p2 } = await admin.from("profiles").select("sync_enabled").eq("user_id", B.id).single();
    expect(Boolean(direct.error) || p2?.sync_enabled === false).toBe(true);
    await B.client.from("profiles").update({ age_band: "18-plus" }).eq("user_id", B.id);
    expect((await B.client.rpc("enable_sync")).data).toBe("enabled");
    record("minor and direct-switch protections", true);
  });
});

describe("server-side validation and limits", () => {
  it("rejects malformed rows", async () => {
    const now = new Date().toISOString();
    const bad: [string, Record<string, unknown>][] = [
      ["bookmarks", { bookmark_id: "x1", cls: "13", slug: "kinematics", type: "chapter", chapter_name: "K", label: "K", path: "/class-11/kinematics", bookmarked_at: now }],
      ["bookmarks", { bookmark_id: "x2", cls: "11", slug: "../etc", type: "chapter", chapter_name: "K", label: "K", path: "/class-11/kinematics", bookmarked_at: now }],
      ["mistakes", { id: randomUUID(), cls: "11", slug: "kinematics", chapter_name: "K", resource_type: "dpp", question_ref: "legacy:dpp:11/kinematics#17; drop", concept_tag: "", difficulty: "easy", created_at: now }],
      ["mistakes", { id: randomUUID(), cls: "11", slug: "kinematics", chapter_name: "K", resource_type: "dpp", concept_tag: "", difficulty: "easy", note: "x".repeat(2001), created_at: now }],
    ];
    for (const [t, row] of bad) expect((await A.client.from(t).insert(row)).error, JSON.stringify(row).slice(0, 80)).toBeTruthy();
    record("validation", true, { rejected: bad.length });
  });

  it("enforces per-student row limits (goals: 50)", async () => {
    const rows = Array.from({ length: 50 }, (_, i) => ({ goal_type: `cap-test-${i}`, activated_at: new Date().toISOString() }));
    expect((await B.client.from("goals").insert(rows)).error).toBeNull();
    expect((await B.client.from("goals").insert({ goal_type: "cap-test-50", activated_at: new Date().toISOString() })).error).toBeTruthy();
    // At the limit, re-uploading (upserting) existing rows and tombstoning still work (audit M-1).
    const again = rows.map((r, i) => ({ ...r, deleted_at: i === 0 ? new Date().toISOString() : null }));
    const up = await B.client.from("goals").upsert(again, { onConflict: "user_id,goal_type" });
    expect(up.error).toBeNull();
    expect(await count("goals", B.id)).toBe(50);
    // The server key can't delete student rows directly (least privilege); purge_user_data removes them at the end.
    const del = await admin.from("goals").delete().eq("user_id", B.id).like("goal_type", "cap-test-%");
    expect(del.error).toBeTruthy();
    record("row cap + upsert at limit", true, { serverDeleteRefused: del.error?.code });
  });
});

describe("live gate (audit H-1): checked on every write", () => {
  // A third synthetic student, so A's and B's sync expectations stay exact.
  let C: Student;
  const goal = (g: string) => C.client.from("goals").insert({ goal_type: g, activated_at: new Date().toISOString() });
  beforeAll(async () => {
    C = await makeStudent("c");
    await optIn(C);
    expect((await C.client.rpc("enable_sync")).data).toBe("enabled");
  });

  it("the owner's kill switch stops an already-enabled student at once", async () => {
    expect((await goal("before-kill")).error).toBeNull();
    expect((await admin.from("app_config").update({ value: "false" }).eq("key", "adult_sync_permitted")).error).toBeNull();
    expect((await goal("during-kill")).error).toBeTruthy();
    expect((await admin.from("app_config").update({ value: "true" }).eq("key", "adult_sync_permitted")).error).toBeNull();
    expect((await goal("after-kill")).error).toBeNull();
    record("kill switch", true);
  });

  it("withdrawing cloud-sync consent blocks writes until consent is given again", async () => {
    expect((await C.client.from("consents").insert({ kind: "cloud-sync", version: consentVersion, granted: false })).error).toBeNull();
    expect((await goal("after-withdrawal")).error).toBeTruthy();
    expect((await C.client.from("consents").insert({ kind: "cloud-sync", version: consentVersion, granted: true })).error).toBeNull();
    expect((await goal("after-regrant")).error).toBeNull();
    record("consent withdrawal", true);
  });

  it("protected profile columns can't be written by the student", async () => {
    for (const patch of [{ sync_enabled: false }, { deletion_requested_at: new Date().toISOString() }, { created_at: new Date().toISOString() }]) {
      expect((await C.client.from("profiles").update(patch).eq("user_id", C.id)).error, JSON.stringify(patch)).toBeTruthy();
    }
    record("protected profile columns", true);
  });
});

describe("sync with real Supabase (two devices, existing local formats)", () => {
  it("first sync uploads; local stores stay byte-identical; local-only stores never leave the device", async () => {
    const before = new Map(deviceA1.data);
    const r = await sync(A, deviceA1);
    expect(r.status).toBe("ok");
    for (const [k, v] of before) expect(deviceA1.data.get(k), k).toBe(v);
    expect(await count("bookmarks", A.id, true)).toBe(1);
    expect(await count("revision_rounds", A.id, true)).toBe(2);
    expect(await count("mistakes", A.id, true)).toBe(1);
    expect(await count("goals", A.id, true)).toBe(1);
    expect(await count("streaks", A.id)).toBe(1);
    const exported = JSON.stringify((await A.client.rpc("export_my_data")).data);
    for (const s of ["SENTINEL-ACTIVITY", "SENTINEL-SEARCH", "reading-progress"]) expect(exported).not.toContain(s);
    expect(LOCAL_ONLY_KEYS.length).toBeGreaterThan(0);
    record("first sync", true, r);
  });

  it("repeated sync creates no duplicates", async () => {
    const counts = await Promise.all(STUDY_TABLES.map((t) => count(t, A.id)));
    const r = await sync(A, deviceA1);
    expect(r).toMatchObject({ status: "ok", pushed: 0 });
    expect(await Promise.all(STUDY_TABLES.map((t) => count(t, A.id)))).toEqual(counts);
    record("repeat sync idempotent", true, r);
  });

  it("a second device receives the progress", async () => {
    const r = await sync(A, deviceA2, undefined, false); // empty device: no link confirmation needed
    expect(r.status).toBe("ok");
    expect(deviceA2.json("atlas:bookmarks")).toHaveLength(1);
    expect(deviceA2.json("atlas:mistakes")[0]).toMatchObject({ id: M1, note: "mixed up n and l", category: "conceptual" });
    expect(readMeta(deviceA2)?.accountId).toBe(A.id);
    record("second device", true, r);
  });

  it("concurrent edits to the same note keep both texts; deletions propagate", async () => {
    const edit = (d: MemStorage, note: string) => d.setItem("atlas:mistakes", JSON.stringify(d.json("atlas:mistakes").map((m: { id: string }) => (m.id === M1 ? { ...m, note } : m))));
    edit(deviceA1, "device one note");
    edit(deviceA2, "device two note");
    expect((await sync(A, deviceA1)).status).toBe("ok");
    expect((await sync(A, deviceA2)).status).toBe("ok");
    expect((await sync(A, deviceA1)).status).toBe("ok");
    for (const d of [deviceA1, deviceA2]) {
      const note = d.json("atlas:mistakes").find((m: { id: string }) => m.id === M1).note as string;
      expect(note).toContain("device one note");
      expect(note).toContain("device two note");
    }
    deviceA1.setItem("atlas:bookmarks", "[]");
    expect((await sync(A, deviceA1)).status).toBe("ok");
    const { data: tomb } = await admin.from("bookmarks").select("deleted_at").eq("user_id", A.id).single();
    expect(tomb?.deleted_at).toBeTruthy();
    expect((await sync(A, deviceA2)).status).toBe("ok");
    expect(deviceA2.json("atlas:bookmarks")).toEqual([]);
    record("conflict + tombstone", true);
  });

  it("an interrupted upload leaves the device untouched and the next sync converges", async () => {
    deviceA1.setItem("atlas:goals", JSON.stringify({ ...deviceA1.json("atlas:goals"), "weekly-revision": T0 }));
    const before = new Map(deviceA1.data);
    const real = supabaseRemote(A.client, A.id);
    const flaky: RemoteStore = { syncAllowed: real.syncAllowed, cloudGeneration: real.cloudGeneration, pull: real.pull, push: async () => { throw new Error("network interrupted"); } };
    const r = await sync(A, deviceA1, flaky);
    expect(r.status).toBe("error");
    expect(deviceA1.data).toEqual(before);
    expect((await sync(A, deviceA1)).status).toBe("ok");
    expect(await count("goals", A.id, true)).toBe(2);
    record("network interruption", true, r);
  });

  it("a device linked to A refuses to sync into B", async () => {
    expect((await sync(B, deviceA1)).status).toBe("linked-to-another-account");
    record("account switching", true);
  });

  it("large dataset: 600 bookmarks and 300 mistakes sync without loss or duplicates", async () => {
    const big = new MemStorage({
      "atlas:bookmarks": Array.from({ length: 600 }, (_, i) => ({ id: `11:kinematics:bm-${i}`, cls: "11", slug: "kinematics", type: "notes", chapterName: "Kinematics", label: `Note ${i}`, path: "/class-11/kinematics/notes", bookmarkedAt: T0 + i })),
      "atlas:mistakes": Array.from({ length: 300 }, (_, i) => ({ id: randomUUID(), cls: "11", slug: "kinematics", chapterName: "Kinematics", resourceType: "dpp", conceptTag: `c${i}`, difficulty: "easy", note: "", createdAt: T0 + i, resolvedAt: null })),
    });
    const t0 = Date.now();
    expect((await sync(B, big)).status).toBe("ok");
    const ms = Date.now() - t0;
    expect(await count("bookmarks", B.id, true)).toBe(600);
    expect(await count("mistakes", B.id, true)).toBe(300);
    expect((await sync(B, big)).status).toBe("ok");
    expect(await count("bookmarks", B.id)).toBe(600);
    record("large dataset", true, { firstSyncMs: ms });
  });
});

describe("account isolation (A vs B)", () => {
  it("B cannot read, change, insert as, or delete A's records", async () => {
    expect((await B.client.from("mistakes").select("*").eq("user_id", A.id)).data ?? []).toHaveLength(0);
    expect((await B.client.from("profiles").select("*").eq("user_id", A.id)).data ?? []).toHaveLength(0);
    expect((await B.client.from("consents").select("*").eq("user_id", A.id)).data ?? []).toHaveLength(0);
    await B.client.from("mistakes").update({ note: "hacked" }).eq("user_id", A.id);
    const { data: still } = await admin.from("mistakes").select("note").eq("user_id", A.id).eq("id", M1).single();
    expect(still?.note).not.toContain("hacked");
    const forged = await B.client.from("goals").insert({ user_id: A.id, goal_type: "forged", activated_at: new Date().toISOString() });
    expect(forged.error).toBeTruthy();
    const del = await B.client.from("mistakes").delete().eq("user_id", A.id);
    expect(Boolean(del.error) || (await count("mistakes", A.id)) === 1).toBe(true);
    expect(await count("mistakes", A.id)).toBe(1);
    const exportB = JSON.stringify((await B.client.rpc("export_my_data")).data);
    expect(exportB).not.toContain(A.id);
    expect(exportB).not.toContain(M1);
    record("cross-account isolation", true);
  });
});

describe("export and deletion", () => {
  it("export contains the student's own data in a documented shape", async () => {
    const { data, error } = await A.client.rpc("export_my_data");
    expect(error).toBeNull();
    for (const k of ["exportedAt", "profile", "consents", "bookmarks", "checklistItems", "revisionRounds", "mistakes", "goals", "streak", "deletionRequest"]) expect(data, k).toHaveProperty(k);
    expect(data.profile.user_id).toBe(A.id);
    expect(data.consents.length).toBeGreaterThanOrEqual(3);
    expect(JSON.stringify(data)).not.toContain(B.id);
    record("export", true, { keys: Object.keys(data), mistakes: data.mistakes.length });
  });

  it("deletion: request stops uploads, the function removes every row and the auth user, and is retry-safe", async () => {
    const at = await A.client.rpc("request_account_deletion");
    expect(at.error).toBeNull();
    expect((await A.client.rpc("enable_sync")).data).toBe("deletion-pending");
    expect((await A.client.from("goals").insert({ goal_type: "after-request", activated_at: new Date().toISOString() })).error).toBeTruthy();
    const token = (await A.client.auth.getSession()).data.session!.access_token;
    const call = (bearer: string) => fetch(`${T.url}/functions/v1/delete-account`, { method: "POST", headers: { Authorization: `Bearer ${bearer}`, apikey: T.anonKey } });
    const res = await call(token);
    const body = await res.json();
    expect(res.status, JSON.stringify(body)).toBe(200);
    expect(body.status).toBe("deleted");
    for (const t of [...STUDY_TABLES, "profiles", "consents", "deletion_requests"]) expect(await count(t, A.id), t).toBe(0);
    const { data: u } = await admin.auth.admin.getUserById(A.id);
    expect(u?.user ?? null).toBeNull();
    const hash = createHash("sha256").update(A.id).digest("hex");
    const { data: log } = await admin.from("deletion_log").select("user_hash,rows_deleted").eq("user_hash", hash);
    expect(log?.length).toBeGreaterThanOrEqual(1);
    const again = await call(token);
    expect([200, 401]).toContain(again.status); // the user no longer exists; never a 5xx
    const noAuth = await fetch(`${T.url}/functions/v1/delete-account`, { method: "POST", headers: { apikey: T.anonKey } });
    expect(noAuth.status).toBe(401);
    record("deletion", true, { first: body, retryStatus: again.status, logEntries: log?.length });
  });

  it("the sweep endpoint refuses a wrong secret", async () => {
    const wrong = await fetch(`${T.url}/functions/v1/delete-account?sweep=1`, { method: "POST", headers: { apikey: T.anonKey, "x-atlas-sweep-secret": "wrong" } });
    expect(wrong.status).toBe(401);
    if (T.sweepSecret) {
      const ok = await fetch(`${T.url}/functions/v1/delete-account?sweep=1`, { method: "POST", headers: { apikey: T.anonKey, "x-atlas-sweep-secret": T.sweepSecret } });
      expect(ok.status).toBe(200);
      record("sweep", true, await ok.json());
    } else record("sweep", true, "wrong secret refused; STAGING_SWEEP_SECRET not set, so the success path was not tested");
  });

  it("B is unaffected by A's deletion", async () => {
    expect(await count("bookmarks", B.id, true)).toBe(600);
    expect(await count("mistakes", B.id, true)).toBe(300);
    const fresh = new MemStorage();
    expect((await sync(B, fresh, undefined, false)).status).toBe("ok");
    expect(fresh.json("atlas:bookmarks")).toHaveLength(600);
    record("other account unaffected", true);
  });
});

