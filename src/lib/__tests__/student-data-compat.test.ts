import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

// ─────────────────────────────────────────────────────────────────
// Student-data compatibility (Phase 2A content rebuild)
//
// Withholding and rebuilding learning content must never touch what is
// saved on students' devices. These tests pin down:
//   1. The exact set of 11 localStorage keys and the module that owns each
//      (a renamed or new key fails here and must be a deliberate change).
//   2. Reading progress (the one store not covered by storage-safety.test.ts)
//      reads its existing format unchanged and only ever moves forward.
//   3. The content-policy, rebuilt-content and build-check code never reads
//      or writes localStorage.
//   4. Saved mistakes for withheld chapters are returned unchanged: the
//      store never filters or rewrites them because content is withheld.
// ─────────────────────────────────────────────────────────────────

const SRC = path.resolve(__dirname, "..", "..");

/** The keys on students' devices today, and the module that defines each. Never change casually. */
const FROZEN_KEYS: Record<string, string> = {
  "atlas:activity-log": "lib/activity-log.ts",
  "atlas:bookmarks": "lib/bookmarks.ts",
  "atlas:checklist": "lib/checklist.ts",
  "atlas:goals": "lib/study-goals.ts",
  "atlas:mistakes": "lib/mistakes.ts",
  "atlas:reading-progress": "lib/reading-progress.ts",
  "atlas:recent-searches": "lib/recent-searches.ts",
  "atlas:recently-viewed": "lib/recently-viewed.ts",
  "atlas:recently-viewed-resources": "lib/recently-viewed-resources.ts",
  "atlas:revision": "lib/revision.ts",
  "atlas:study-streak": "lib/study-streak.ts",
};

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) return f === "__tests__" ? [] : sourceFiles(p);
    return /\.(ts|tsx)$/.test(f) ? [p] : [];
  });
}

describe("localStorage keys are unchanged", () => {
  it("application code defines exactly the 11 known atlas:* keys, each in its own module", () => {
    const found = new Map<string, string[]>();
    for (const f of sourceFiles(SRC)) {
      for (const m of readFileSync(f, "utf8").matchAll(/["'`](atlas:[a-z0-9:-]+)["'`]/g)) {
        const rel = path.relative(SRC, f).split(path.sep).join("/");
        found.set(m[1], [...(found.get(m[1]) ?? []), rel]);
      }
    }
    expect([...found.keys()].sort()).toEqual(Object.keys(FROZEN_KEYS).sort());
    for (const [key, owner] of Object.entries(FROZEN_KEYS)) expect(found.get(key), key).toEqual([owner]);
  });

  it("content-policy, rebuilt-content and build-check code never touches localStorage", () => {
    const dirs = ["lib/content-policy", "lib/content-v2", "build-checks"].map((d) => path.join(SRC, d));
    const offenders = dirs.flatMap(sourceFiles).filter((f) => /localStorage|sessionStorage|safeGetItem|indexedDB/.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});

type Store = Map<string, string>;
function installMemoryStorage(store: Store) {
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (k: string) => (store.has(k) ? (store.get(k) as string) : null),
      setItem: (k: string, v: string) => void store.set(k, String(v)),
      removeItem: (k: string) => void store.delete(k),
    },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("reading progress keeps its stored format", () => {
  const existing = {
    "/class-11/kinematics/notes/": { pct: 62, updatedAt: 1_763_000_000_000 },
    "/class-12/atoms/notes/": { pct: 15, updatedAt: 1_763_100_000_000 },
  };

  it("reads existing entries exactly, including pages that are now withheld", async () => {
    const store: Store = new Map([["atlas:reading-progress", JSON.stringify(existing)]]);
    installMemoryStorage(store);
    const { getReadingProgress } = await import("@/lib/reading-progress");
    expect(getReadingProgress("/class-11/kinematics/notes/")).toBe(62);
    expect(getReadingProgress("/class-12/atoms/notes/")).toBe(15);
    expect(getReadingProgress("/class-11/never-visited/")).toBe(0);
  });

  it("only moves forward and keeps the other entries in the same shape", async () => {
    const store: Store = new Map([["atlas:reading-progress", JSON.stringify(existing)]]);
    installMemoryStorage(store);
    const { setReadingProgress } = await import("@/lib/reading-progress");
    setReadingProgress("/class-11/kinematics/notes/", 40); // backwards: ignored
    expect(JSON.parse(store.get("atlas:reading-progress")!)).toEqual(existing);
    setReadingProgress("/class-11/kinematics/notes/", 80);
    const after = JSON.parse(store.get("atlas:reading-progress")!);
    expect(after["/class-11/kinematics/notes/"].pct).toBe(80);
    expect(Object.keys(after["/class-11/kinematics/notes/"]).sort()).toEqual(["pct", "updatedAt"]);
    expect(after["/class-12/atoms/notes/"]).toEqual(existing["/class-12/atoms/notes/"]);
  });

  it("treats a corrupt value as empty without overwriting it on read", async () => {
    const store: Store = new Map([["atlas:reading-progress", "{not json"]]);
    installMemoryStorage(store);
    const { getReadingProgress } = await import("@/lib/reading-progress");
    expect(getReadingProgress("/class-11/kinematics/notes/")).toBe(0);
    expect(store.get("atlas:reading-progress")).toBe("{not json");
  });
});

describe("saved mistakes for withheld content are preserved", () => {
  it("returns PYQ and DPP mistakes for withheld chapters unchanged (same ids, questionIds and notes)", async () => {
    const saved = [
      { id: "m-1", cls: "12", slug: "atoms", chapterName: "Atoms", resourceType: "pyq", questionId: "17", conceptTag: "Bohr model", difficulty: "medium", note: "student note", createdAt: 1_763_000_000_000, resolvedAt: null },
      { id: "m-2", cls: "11", slug: "kinematics", chapterName: "Kinematics", resourceType: "dpp", conceptTag: "projectile", difficulty: "hard", note: "", createdAt: 1_763_100_000_000, resolvedAt: 1_763_200_000_000 },
    ];
    const raw = JSON.stringify(saved);
    const store: Store = new Map([["atlas:mistakes", raw]]);
    installMemoryStorage(store);
    const { getMistakes } = await import("@/lib/mistakes");
    const got = getMistakes();
    expect(got).toHaveLength(2);
    expect([...got].sort((a, b) => a.id.localeCompare(b.id))).toEqual(saved);
    // Reading never rewrites what is stored.
    expect(store.get("atlas:mistakes")).toBe(raw);
  });
});
