import { afterEach, describe, expect, it, vi } from "vitest";

// ─────────────────────────────────────────────────────────────────
// Storage safety tests (Phase 1B, audit finding B-2 / P2-4)
//
// Every localStorage-backed store exposes snapshot getters that React
// calls during render via useSyncExternalStore. These tests pin down
// three things for each of the 10 affected stores:
//
//   1. Blocked storage never throws: an empty value comes back instead
//      (getItem throwing, or the window.localStorage accessor itself
//      throwing, as some browsers do when site data is blocked).
//   2. Existing student data is read exactly as before, in the formats
//      already stored on devices (including the legacy revision shape).
//   3. Snapshot caching is unchanged: the same reference while storage
//      is unchanged, a new snapshot after it changes.
//
// Each store keeps module-level caches, so modules are re-imported
// fresh for every test (vi.resetModules in afterEach).
// ─────────────────────────────────────────────────────────────────

type Store = Map<string, string>;

function memoryStorage(store: Store) {
  return {
    getItem: (key: string) => (store.has(key) ? (store.get(key) as string) : null),
    setItem: (key: string, value: string) => {
      store.set(key, String(value));
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  };
}

function securityError(): Error {
  const err = new Error("The operation is insecure.");
  err.name = "SecurityError";
  return err;
}

/** Storage object whose every method throws (blocked or disabled storage). */
function throwingStorage() {
  const fail = () => {
    throw securityError();
  };
  return { getItem: fail, setItem: fail, removeItem: fail };
}

function installStorage(storage: unknown) {
  vi.stubGlobal("window", { localStorage: storage });
}

/** window whose localStorage accessor itself throws (e.g. Chrome with site data blocked). */
function installThrowingAccessor() {
  const win = {};
  Object.defineProperty(win, "localStorage", {
    get() {
      throw securityError();
    },
  });
  vi.stubGlobal("window", win);
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  vi.resetModules();
});

// ── The 10 snapshot getters ──────────────────────────────────────

type ReadCase = {
  name: string;
  key: string;
  read: () => Promise<unknown>;
  empty: unknown;
  /** JSON as already stored on students' devices. */
  seed: string;
  /** What the getter returns for `seed` today. */
  expected: unknown;
};

const readCases: ReadCase[] = [
  {
    name: "activity-log › getActivityLog",
    key: "atlas:activity-log",
    read: async () => (await import("@/lib/activity-log")).getActivityLog(),
    empty: [],
    seed: JSON.stringify([
      { type: "chapter-visited", cls: "11", slug: "kinematics", label: "Kinematics", at: 1700000000000 },
    ]),
    expected: [{ type: "chapter-visited", cls: "11", slug: "kinematics", label: "Kinematics", at: 1700000000000 }],
  },
  {
    name: "bookmarks › getBookmarks",
    key: "atlas:bookmarks",
    read: async () => (await import("@/lib/bookmarks")).getBookmarks(),
    empty: [],
    seed: JSON.stringify([
      { id: "11:kinematics:notes", cls: "11", slug: "kinematics", type: "notes", chapterName: "Kinematics", label: "Kinematics — Notes", path: "/class-11/kinematics/notes", bookmarkedAt: 100 },
      { id: "12:atoms:chapter", cls: "12", slug: "atoms", type: "chapter", chapterName: "Atoms", label: "Atoms", path: "/class-12/atoms", bookmarkedAt: 200 },
    ]),
    // Most recent first.
    expected: [
      { id: "12:atoms:chapter", cls: "12", slug: "atoms", type: "chapter", chapterName: "Atoms", label: "Atoms", path: "/class-12/atoms", bookmarkedAt: 200 },
      { id: "11:kinematics:notes", cls: "11", slug: "kinematics", type: "notes", chapterName: "Kinematics", label: "Kinematics — Notes", path: "/class-11/kinematics/notes", bookmarkedAt: 100 },
    ],
  },
  {
    name: "checklist › getAllChecklists",
    key: "atlas:checklist",
    read: async () => (await import("@/lib/checklist")).getAllChecklists(),
    empty: {},
    seed: JSON.stringify({ "11:kinematics": { notes: true, dpp: true }, "12:atoms": { pyq: false } }),
    expected: { "11:kinematics": { notes: true, dpp: true }, "12:atoms": { pyq: false } },
  },
  {
    name: "mistakes › getMistakes",
    key: "atlas:mistakes",
    read: async () => (await import("@/lib/mistakes")).getMistakes(),
    empty: [],
    seed: JSON.stringify([
      { id: "a", cls: "11", slug: "kinematics", chapterName: "Kinematics", resourceType: "dpp", conceptTag: "Projectile", difficulty: "medium", note: "sign error", createdAt: 10, resolvedAt: null },
      { id: "b", cls: "12", slug: "atoms", chapterName: "Atoms", resourceType: "pyq", questionId: "3", conceptTag: "Bohr", difficulty: "hard", note: "", createdAt: 20, resolvedAt: 30 },
    ]),
    // Most recent first.
    expected: [
      { id: "b", cls: "12", slug: "atoms", chapterName: "Atoms", resourceType: "pyq", questionId: "3", conceptTag: "Bohr", difficulty: "hard", note: "", createdAt: 20, resolvedAt: 30 },
      { id: "a", cls: "11", slug: "kinematics", chapterName: "Kinematics", resourceType: "dpp", conceptTag: "Projectile", difficulty: "medium", note: "sign error", createdAt: 10, resolvedAt: null },
    ],
  },
  {
    name: "recent-searches › getRecentSearches",
    key: "atlas:recent-searches",
    read: async () => (await import("@/lib/recent-searches")).getRecentSearches(),
    empty: [],
    seed: JSON.stringify(["kinematics", "optics", 5]),
    // Non-string entries are dropped (existing behaviour).
    expected: ["kinematics", "optics"],
  },
  {
    name: "recently-viewed-resources › getRecentlyViewedResources",
    key: "atlas:recently-viewed-resources",
    read: async () => (await import("@/lib/recently-viewed-resources")).getRecentlyViewedResources(),
    empty: [],
    seed: JSON.stringify([
      { cls: "11", slug: "kinematics", resourceKey: "dpp", chapterName: "Kinematics", resourceLabel: "Practice Questions", path: "/class-11/kinematics/dpp", visitedAt: 5 },
    ]),
    expected: [
      { cls: "11", slug: "kinematics", resourceKey: "dpp", chapterName: "Kinematics", resourceLabel: "Practice Questions", path: "/class-11/kinematics/dpp", visitedAt: 5 },
    ],
  },
  {
    name: "recently-viewed › getRecentlyViewed",
    key: "atlas:recently-viewed",
    read: async () => (await import("@/lib/recently-viewed")).getRecentlyViewed(),
    empty: [],
    seed: JSON.stringify([{ slug: "atoms", cls: "12", name: "Atoms", visitedAt: 7 }]),
    expected: [{ slug: "atoms", cls: "12", name: "Atoms", visitedAt: 7 }],
  },
  {
    name: "revision › getAllRevisionEntries",
    key: "atlas:revision",
    read: async () => (await import("@/lib/revision")).getAllRevisionEntries(),
    empty: {},
    // Mixes the legacy shape (plain round numbers), the current shape,
    // and an invalid round, exactly as older devices may hold it.
    seed: JSON.stringify({
      "11:kinematics": [1, 2],
      "12:atoms": [{ round: 3, completedAt: 1700 }],
      "12:nuclei": [9],
    }),
    expected: {
      "11:kinematics": [
        { round: 1, completedAt: 0 },
        { round: 2, completedAt: 0 },
      ],
      "12:atoms": [{ round: 3, completedAt: 1700 }],
      "12:nuclei": [],
    },
  },
  {
    name: "study-goals › getActiveGoals",
    key: "atlas:goals",
    read: async () => (await import("@/lib/study-goals")).getActiveGoals(),
    empty: [],
    seed: JSON.stringify({ dpp: 100, pyq: 200, notAGoal: 5 }),
    // Unknown goal types dropped; most recently activated first.
    expected: [
      { type: "pyq", activatedAt: 200 },
      { type: "dpp", activatedAt: 100 },
    ],
  },
  {
    name: "study-streak › getStreak",
    key: "atlas:study-streak",
    read: async () => (await import("@/lib/study-streak")).getStreak(),
    empty: { current: 0, longest: 0, lastActiveDate: null },
    seed: JSON.stringify({ current: 3, longest: 5, lastActiveDate: "2026-11-12" }),
    expected: { current: 3, longest: 5, lastActiveDate: "2026-11-12" },
  },
];

describe.each(readCases)("$name", (c) => {
  it("returns the empty value instead of throwing when getItem throws", async () => {
    installStorage(throwingStorage());
    await expect(c.read()).resolves.toEqual(c.empty);
  });

  it("returns the empty value instead of throwing when the localStorage accessor throws", async () => {
    installThrowingAccessor();
    await expect(c.read()).resolves.toEqual(c.empty);
  });

  it("returns a stable reference while storage stays blocked (no render loop)", async () => {
    installStorage(throwingStorage());
    const first = await c.read();
    expect(await c.read()).toBe(first);
  });

  it("reads existing data in its current stored format", async () => {
    installStorage(memoryStorage(new Map([[c.key, c.seed]])));
    expect(await c.read()).toEqual(c.expected);
  });

  it("returns the same reference while storage is unchanged", async () => {
    installStorage(memoryStorage(new Map([[c.key, c.seed]])));
    const first = await c.read();
    expect(await c.read()).toBe(first);
  });

  it("returns a new snapshot after the stored value changes", async () => {
    const store: Store = new Map([[c.key, c.seed]]);
    installStorage(memoryStorage(store));
    const first = await c.read();
    store.delete(c.key);
    const second = await c.read();
    expect(second).not.toBe(first);
    expect(second).toEqual(c.empty);
  });

  it("treats corrupt JSON as empty (unchanged behaviour)", async () => {
    installStorage(memoryStorage(new Map([[c.key, "{not json"]])));
    expect(await c.read()).toEqual(c.empty);
  });

  it("returns the empty value during static rendering (no window)", async () => {
    expect(await c.read()).toEqual(c.empty);
  });
});

describe("checklist › getChapterChecklist", () => {
  it("returns a stable empty object when storage is blocked", async () => {
    installStorage(throwingStorage());
    const { getChapterChecklist } = await import("@/lib/checklist");
    const first = getChapterChecklist("11", "kinematics");
    expect(first).toEqual({});
    expect(getChapterChecklist("11", "kinematics")).toBe(first);
  });
});

describe("revision › per-chapter getters", () => {
  it("do not throw when storage is blocked", async () => {
    installThrowingAccessor();
    const revision = await import("@/lib/revision");
    expect(revision.getRevisionEntries("11", "kinematics")).toEqual([]);
    expect(revision.getCompletedRounds("11", "kinematics")).toEqual([]);
    expect(revision.getLastRevisedAt("11", "kinematics")).toBeNull();
    expect(revision.getAllRevision()).toEqual({});
  });

  it("keep the legacy shape readable through the round-number API", async () => {
    installStorage(memoryStorage(new Map([["atlas:revision", JSON.stringify({ "11:kinematics": [2, 1] })]])));
    const revision = await import("@/lib/revision");
    expect(revision.getCompletedRounds("11", "kinematics")).toEqual([1, 2]);
    expect(revision.getAllRevision()).toEqual({ "11:kinematics": [1, 2] });
  });
});

// ── Write paths must never throw when storage is blocked ─────────

describe("write paths with blocked storage", () => {
  const writes: [string, () => Promise<unknown>][] = [
    ["toggleBookmark", async () => (await import("@/lib/bookmarks")).toggleBookmark({ cls: "11", slug: "kinematics", type: "notes", chapterName: "Kinematics", label: "Notes", path: "/class-11/kinematics/notes" })],
    ["setChecklistItem", async () => (await import("@/lib/checklist")).setChecklistItem("11", "kinematics", "notes", true)],
    ["setRevisionRound", async () => (await import("@/lib/revision")).setRevisionRound("11", "kinematics", 1, true)],
    ["addMistake", async () => (await import("@/lib/mistakes")).addMistake({ cls: "11", slug: "kinematics", chapterName: "Kinematics", resourceType: "dpp", conceptTag: "x", difficulty: "easy", note: "" })],
    ["setMistakeResolved", async () => (await import("@/lib/mistakes")).setMistakeResolved("a", true)],
    ["toggleGoal", async () => (await import("@/lib/study-goals")).toggleGoal("dpp")],
    ["recordActivity", async () => (await import("@/lib/study-streak")).recordActivity()],
    ["logActivity", async () => (await import("@/lib/activity-log")).logActivity({ type: "chapter-visited", cls: "11", slug: "kinematics", label: "Kinematics" })],
    ["recordChapterVisit", async () => (await import("@/lib/recently-viewed")).recordChapterVisit({ slug: "kinematics", cls: "11", name: "Kinematics" })],
    ["recordResourceVisit", async () => (await import("@/lib/recently-viewed-resources")).recordResourceVisit({ cls: "11", slug: "kinematics", resourceKey: "dpp", chapterName: "Kinematics", resourceLabel: "Practice Questions", path: "/class-11/kinematics/dpp" })],
    ["recordRecentSearch", async () => (await import("@/lib/recent-searches")).recordRecentSearch("optics")],
  ];

  describe.each(writes)("%s", (_name, write) => {
    it("does not throw when getItem/setItem throw", async () => {
      installStorage(throwingStorage());
      await expect(write()).resolves.not.toThrow();
    });

    it("does not throw when the localStorage accessor throws", async () => {
      installThrowingAccessor();
      await expect(write()).resolves.not.toThrow();
    });
  });
});

// ── Keys and stored formats are unchanged ────────────────────────

describe("stored keys and formats are preserved", () => {
  it("writes the same keys and shapes as before", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 13, 10, 0, 0));
    const now = Date.now();
    const store: Store = new Map();
    installStorage(memoryStorage(store));

    const { setChecklistItem } = await import("@/lib/checklist");
    const { setRevisionRound } = await import("@/lib/revision");
    const { toggleGoal } = await import("@/lib/study-goals");
    setChecklistItem("11", "kinematics", "notes", true);
    setRevisionRound("12", "atoms", 2, true);
    toggleGoal("pyq");

    expect([...store.keys()].sort()).toEqual([
      "atlas:activity-log",
      "atlas:checklist",
      "atlas:goals",
      "atlas:revision",
      "atlas:study-streak",
    ]);
    expect(JSON.parse(store.get("atlas:checklist") as string)).toEqual({ "11:kinematics": { notes: true } });
    expect(JSON.parse(store.get("atlas:revision") as string)).toEqual({ "12:atoms": [{ round: 2, completedAt: now }] });
    expect(JSON.parse(store.get("atlas:goals") as string)).toEqual({ pyq: now });
    expect(JSON.parse(store.get("atlas:study-streak") as string)).toEqual({ current: 1, longest: 1, lastActiveDate: "2026-11-13" });
    expect(JSON.parse(store.get("atlas:activity-log") as string)).toEqual([
      { type: "revision-completed", cls: "12", slug: "atoms", label: "Revision 2", at: now },
      { type: "resource-completed", cls: "11", slug: "kinematics", label: "Notes completed", at: now },
    ]);
  });
});
