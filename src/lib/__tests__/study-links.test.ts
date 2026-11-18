import { Fragment, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { allChapters } from "@/lib/chapters";
import type { ChapterMeta } from "@/lib/chapter-meta";
import type { Bookmark } from "@/lib/bookmarks";
import type { Mistake } from "@/lib/mistakes";
import { isAvailableStudyPath, resourceOfPath } from "@/lib/content-policy/resource-links";
import { buildDailyStudyPlan } from "@/lib/study-plan";
import { buildTodaysPriorities } from "@/lib/todays-priorities";
import ReattemptListCard from "@/components/ReattemptListCard";

// ─────────────────────────────────────────────────────────────────
// Dashboard planner and recommendations never send students to a
// withheld resource page. Student data itself is untouched.
// ─────────────────────────────────────────────────────────────────

const RESOURCE_KEYS = ["notes", "short-notes", "formula-sheet", "dpp", "jee-notes", "jee-dpp", "pyq"];

// Every chapter exactly as the dashboard builds it: all four checklist slots available.
const chapters: ChapterMeta[] = allChapters.map((c) => ({
  cls: c.cls,
  slug: c.slug,
  name: c.name,
  number: c.number,
  availableChecklist: ["notes", "formulaSheet", "dpp", "pyq"],
  relatedChapters: [],
}));

const kin = allChapters.find((c) => c.slug === "kinematics")!;
const bookmarks: Bookmark[] = [
  { id: "11:kinematics:pyq", cls: "11", slug: "kinematics", type: "pyq", chapterName: "Kinematics", label: "Kinematics — PYQ", path: "/class-11/kinematics/pyq", bookmarkedAt: 2 },
  { id: "11:kinematics:chapter", cls: "11", slug: "kinematics", type: "chapter", chapterName: "Kinematics", label: "Kinematics", path: "/class-11/kinematics", bookmarkedAt: 1 },
];
const mistake = (over: Partial<Mistake> = {}): Mistake => ({
  id: "m1", cls: "11", slug: "kinematics", chapterName: kin.name, resourceType: "dpp", questionId: "3",
  conceptTag: "Relative velocity", difficulty: "hard", note: "", createdAt: 1, resolvedAt: null, ...over,
});

describe("study-link guard", () => {
  it("recognises chapter resource paths, with or without trailing slash, query or hash", () => {
    expect(resourceOfPath("/class-11/kinematics/pyq")).toEqual({ slug: "kinematics", resource: "pyq" });
    expect(resourceOfPath("/class-12/atoms/formula-sheet/")).toEqual({ slug: "atoms", resource: "formula-sheet" });
    expect(resourceOfPath("/class-11/kinematics/pyq?exam=neet")).toEqual({ slug: "kinematics", resource: "pyq" });
    expect(resourceOfPath("/class-11/kinematics")).toBeNull();
    expect(resourceOfPath("/class-11/kinematics#revision-rounds")).toBeNull();
    expect(resourceOfPath("/notes")).toBeNull();
  });

  it("blocks every withheld resource page and allows everything else", () => {
    for (const c of allChapters) {
      for (const k of RESOURCE_KEYS) expect(isAvailableStudyPath(`/class-${c.cls}/${c.slug}/${k}`)).toBe(false);
      expect(isAvailableStudyPath(`/class-${c.cls}/${c.slug}`)).toBe(true);
      expect(isAvailableStudyPath(`/class-${c.cls}/${c.slug}#revision-rounds`)).toBe(true);
    }
    expect(isAvailableStudyPath("/dashboard")).toBe(true);
  });
});

describe("daily study plan", () => {
  // A student who has started every chapter, has an unresolved mistake and bookmarks.
  const checklists = Object.fromEntries(chapters.map((c) => [`${c.cls}:${c.slug}`, { notes: true }]));
  const plan = buildDailyStudyPlan(chapters, checklists, {}, [mistake()], bookmarks, 1_700_000_000_000);

  it("still produces a plan", () => {
    expect(plan.tasks.length).toBeGreaterThan(0);
  });

  it("never links a task to a withheld resource page", () => {
    for (const t of plan.tasks) expect(isAvailableStudyPath(t.path)).toBe(true);
    for (const cat of ["incomplete-pyq", "incomplete-dpp", "formula-sheet", "notes", "unresolved-mistakes"]) {
      expect(plan.tasks.some((t) => t.category === cat)).toBe(false);
    }
  });

  it("keeps chapter-level tasks (weak chapters, chapter bookmarks)", () => {
    expect(plan.tasks.every((t) => /^\/class-1[12]\/[a-z0-9-]+(#[a-z-]+)?$/.test(t.path))).toBe(true);
    expect(plan.tasks.some((t) => t.category === "weak-chapter")).toBe(true);
  });

  it("a fresh student gets no resource tasks at all (none are available)", () => {
    const fresh = buildDailyStudyPlan(chapters, {}, {}, [], [], 1_700_000_000_000);
    for (const t of fresh.tasks) expect(isAvailableStudyPath(t.path)).toBe(true);
  });
});

describe("Recommended Today", () => {
  it("never recommends a withheld resource page", () => {
    const items = buildTodaysPriorities(chapters, {}, {}, bookmarks, 30);
    for (const i of items) expect(isAvailableStudyPath(i.path)).toBe(true);
    // The chapter bookmark is still recommended; the PYQ bookmark is not.
    expect(items.map((i) => i.path)).toContain("/class-11/kinematics");
    expect(items.map((i) => i.path)).not.toContain("/class-11/kinematics/pyq");
  });
});

describe("re-attempt list", () => {
  const html = renderToStaticMarkup(createElement(Fragment, null, createElement(ReattemptListCard, { items: [mistake()] })));

  it("still shows the saved mistake and its resolve button", () => {
    expect(html).toContain("Relative velocity");
    expect(html).toContain("Mark resolved");
  });

  it("doesn't link to the withheld practice page, and says why", () => {
    expect(html).not.toContain('href="/class-11/kinematics/dpp"');
    expect(html).toContain("being rebuilt");
  });
});
