import { afterEach, describe, expect, it, vi } from "vitest";
import type { Bookmark } from "@/lib/bookmarks";
import type { Mistake } from "@/lib/mistakes";
import { activityDays, activitySummary, filterBookmarks, filterMistakes, localDayKey, mistakeSummary, questionKey, repeatedQuestions, revisionOverview } from "@/lib/study-tools";

const day = 86_400_000;
const NOW = new Date(2026, 10, 20, 15, 0, 0).getTime(); // local time

const bm = (over: Partial<Bookmark>): Bookmark => ({ id: "x", cls: "11", slug: "kinematics", type: "chapter", chapterName: "Kinematics", label: "Kinematics", path: "/class-11/kinematics", bookmarkedAt: NOW, ...over });
const mk = (over: Partial<Mistake>): Mistake => ({ id: "m", cls: "11", slug: "kinematics", chapterName: "Kinematics", resourceType: "dpp", conceptTag: "projectile", difficulty: "medium", note: "", createdAt: NOW, resolvedAt: null, ...over });

describe("bookmarks", () => {
  const list = [
    bm({ id: "a", bookmarkedAt: NOW - 2 * day }),
    bm({ id: "b", cls: "12", slug: "atoms", chapterName: "Atoms", label: "Notes", type: "notes", bookmarkedAt: NOW }),
    bm({ id: "c", cls: "12", slug: "nuclei", chapterName: "Nuclei", label: "Nuclei", bookmarkedAt: NOW - day }),
  ];
  it("filters by class and type, searches names (case and accent-insensitive), sorts", () => {
    expect(filterBookmarks(list).map((b) => b.id)).toEqual(["b", "c", "a"]);
    expect(filterBookmarks(list, { sort: "oldest" }).map((b) => b.id)).toEqual(["a", "c", "b"]);
    expect(filterBookmarks(list, { sort: "chapter" }).map((b) => b.id)).toEqual(["a", "b", "c"]);
    expect(filterBookmarks(list, { cls: "12" }).map((b) => b.id)).toEqual(["b", "c"]);
    expect(filterBookmarks(list, { type: "notes" }).map((b) => b.id)).toEqual(["b"]);
    expect(filterBookmarks(list, { query: "  NUCL " }).map((b) => b.id)).toEqual(["c"]);
    expect(filterBookmarks(list, { query: "zzz" })).toEqual([]);
  });
  it("never mutates the stored array", () => {
    const copy = JSON.stringify(list);
    filterBookmarks(list, { sort: "oldest" });
    expect(JSON.stringify(list)).toBe(copy);
  });
});

describe("mistakes", () => {
  const list = [
    mk({ id: "1", questionId: "4", category: "calculation", createdAt: NOW - 3 * day }),
    mk({ id: "2", questionId: "4", category: "conceptual", resolvedAt: NOW, createdAt: NOW - day, note: "Forgot the sign of g" }),
    mk({ id: "3", cls: "12", slug: "atoms", chapterName: "Atoms", resourceType: "pyq", questionId: "4", createdAt: NOW }),
    mk({ id: "4", questionId: undefined, conceptTag: "graphs", createdAt: NOW - 2 * day }),
  ];
  it("filters by status, class, chapter, category (including uncategorised) and text", () => {
    expect(filterMistakes(list, { status: "open" }).map((m) => m.id)).toEqual(["3", "4", "1"]);
    expect(filterMistakes(list, { status: "resolved" }).map((m) => m.id)).toEqual(["2"]);
    expect(filterMistakes(list, { cls: "12" }).map((m) => m.id)).toEqual(["3"]);
    expect(filterMistakes(list, { slug: "kinematics", category: "none" }).map((m) => m.id)).toEqual(["4"]);
    expect(filterMistakes(list, { category: "conceptual" }).map((m) => m.id)).toEqual(["2"]);
    expect(filterMistakes(list, { query: "sign of g" }).map((m) => m.id)).toEqual(["2"]);
  });
  it("counts a question as repeated only when the SAME question (class, chapter, resource, number) went wrong again", () => {
    // "#4" in Kinematics DPP twice = repeated; "#4" in Atoms PYQ is a different question; no-question mistakes never count.
    expect([...repeatedQuestions(list)]).toEqual([["11/kinematics/dpp#4", 2]]);
    expect(questionKey(mk({ questionId: undefined }))).toBeNull();
  });
  it("summarises without inventing anything", () => {
    const s = mistakeSummary(list);
    expect(s).toMatchObject({ total: 4, open: 3, resolved: 1, repeatedQuestions: 1, byCategory: { calculation: 1, conceptual: 1, none: 2 } });
    expect(s.chapters[0]).toMatchObject({ slug: "kinematics", open: 2, total: 3 });
    expect(mistakeSummary([])).toMatchObject({ total: 0, open: 0, resolved: 0, repeatedQuestions: 0, chapters: [] });
  });
});

describe("revision overview (deterministic 1/7/30-day schedule)", () => {
  const chapters = [
    { cls: "11" as const, slug: "kinematics", name: "Kinematics" },
    { cls: "11" as const, slug: "gravitation", name: "Gravitation" },
    { cls: "12" as const, slug: "atoms", name: "Atoms" },
  ];
  it("orders chapters most urgent first and computes due dates from the last round", () => {
    const rows = revisionOverview(
      {
        "11:kinematics": [{ round: 1, completedAt: NOW - 3 * day }], // due 1 day after → overdue
        "12:atoms": [{ round: 1, completedAt: NOW - 3 * day }, { round: 2, completedAt: NOW - day }], // due 7 days after round 2
      },
      chapters,
      NOW,
    );
    expect(rows.map((r) => [r.slug, r.bucket])).toEqual([["kinematics", "overdue"], ["atoms", rows[1].bucket], ["gravitation", "never-revised"]]);
    expect(rows[0].due.daysUntilDue).toBeLessThan(0);
    expect(rows[1].rounds).toEqual([1, 2]);
    expect(rows[1].due.nextDueAt).toBe(NOW - day + 7 * day);
    expect(rows[2].due.nextDueAt).toBeNull();
  });
});

describe("activity calendar uses local days", () => {
  afterEach(() => vi.useRealTimers());
  it("puts 23:59 and 00:01 on different days, counts a busy day once, and returns exactly N days", () => {
    const lateNight = new Date(2026, 10, 19, 23, 59).getTime();
    const justAfter = new Date(2026, 10, 20, 0, 1).getTime();
    expect(localDayKey(lateNight)).toBe("2026-11-19");
    expect(localDayKey(justAfter)).toBe("2026-11-20");
    const events = [lateNight, justAfter, justAfter + 60_000, NOW - 3 * day].map((at) => ({ type: "chapter-visited" as const, cls: "11" as const, slug: "k", label: "K", at }));
    const days = activityDays(events, 7, NOW);
    expect(days).toHaveLength(7);
    expect(days[6]).toEqual({ date: "2026-11-20", count: 2 });
    expect(days[5]).toEqual({ date: "2026-11-19", count: 1 });
    expect(days.map((d) => d.date)).toEqual([...new Set(days.map((d) => d.date))]); // no duplicate days
    expect(activitySummary(days)).toEqual({ activeDays: 3, bestRunInWindow: 2, activeThisWeek: 3, actionsThisWeek: 4 });
  });
  it("an empty history gives zero, not fabricated, activity", () => {
    expect(activitySummary(activityDays([], 30, NOW))).toEqual({ activeDays: 0, bestRunInWindow: 0, activeThisWeek: 0, actionsThisWeek: 0 });
  });
});

describe("mistake store: categories, explanations and reopening (existing format preserved)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });
  it("updates only the note or category, ignores unknown categories, and reopens cleanly", async () => {
    const old = { id: "m-old", cls: "12", slug: "atoms", chapterName: "Atoms", resourceType: "pyq", questionId: "17", conceptTag: "Bohr", difficulty: "medium", note: "", createdAt: 1_763_000_000_000, resolvedAt: null };
    const store = new Map<string, string>([["atlas:mistakes", JSON.stringify([old])]]);
    vi.stubGlobal("window", { localStorage: { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v), removeItem: (k: string) => void store.delete(k) } });
    const mod = await import("@/lib/mistakes");
    // An old record without a category is still valid and readable.
    expect(mod.getMistakes()[0]).toEqual(old);
    mod.updateMistake("m-old", { category: "formula", note: "Used E = hν instead of the energy-level formula" });
    let m = JSON.parse(store.get("atlas:mistakes")!)[0];
    expect(m).toEqual({ ...old, category: "formula", note: "Used E = hν instead of the energy-level formula" });
    mod.updateMistake("m-old", { category: "not-a-category" as never });
    expect(JSON.parse(store.get("atlas:mistakes")!)[0].category).toBe("formula");
    mod.updateMistake("m-old", { category: null });
    m = JSON.parse(store.get("atlas:mistakes")!)[0];
    expect("category" in m).toBe(false);
    mod.setMistakeResolved("m-old", true);
    expect(JSON.parse(store.get("atlas:mistakes")!)[0].resolvedAt).toEqual(expect.any(Number));
    mod.setMistakeResolved("m-old", false);
    expect(JSON.parse(store.get("atlas:mistakes")!)[0].resolvedAt).toBeNull();
    mod.updateMistake("nope", { note: "x" });
    expect(JSON.parse(store.get("atlas:mistakes")!)).toHaveLength(1);
  });
});
