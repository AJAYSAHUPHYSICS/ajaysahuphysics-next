import { describe, expect, it } from "vitest";
import { pyqRegistry, getChapterPyq } from "@/lib/pyq";
import { hasPyqFor, pyqAvailability } from "@/lib/pyq/availability";
import { allChapters } from "@/lib/chapters";
import type { ChapterPyq, PyqQuestion } from "@/lib/pyq/kinematics";
import {
  isPublishablePyq,
  isRetiredExamLabel,
  publicPyqExamAvailability,
  publicPyqView,
  pyqQuestionId,
  type GovernedPyqQuestion,
} from "@/lib/content-policy/pyq-publication";
import { publicPyqAvailability } from "@/lib/content-policy/public-pyq-availability";

const VERIFIED = { status: "verified" as const, sourceUrl: "https://example.invalid/paper.pdf" };
const CLEARED = { status: "cleared" as const };

function q(exam: string, extra: Partial<GovernedPyqQuestion> = {}): GovernedPyqQuestion {
  return { exam, question: `Q ${exam}`, options: ["a", "b", "c", "d"], correctIndex: 0, solution: "s", ...extra } as GovernedPyqQuestion;
}

const allLegacy = Object.entries(pyqRegistry).flatMap(([slug, ch]) =>
  ch.questions.map((question, index) => ({ slug, index, question }))
);

describe("PYQ publication policy", () => {
  it("withholds every one of the 1,180 legacy records", () => {
    expect(allLegacy).toHaveLength(1180);
    expect(allLegacy.filter((r) => isPublishablePyq(r.question))).toEqual([]);
    for (const ch of Object.values(pyqRegistry)) {
      expect(publicPyqView(ch).pyq.questions).toHaveLength(0);
    }
  });

  it("requires BOTH verification and separate rights clearance", () => {
    expect(isPublishablePyq(q("NEET 2024"))).toBe(false);
    expect(isPublishablePyq(q("NEET 2024", { verification: VERIFIED }))).toBe(false);
    expect(isPublishablePyq(q("NEET 2024", { rights: CLEARED }))).toBe(false);
    expect(isPublishablePyq(q("NEET 2024", { verification: VERIFIED, rights: { status: "pending-legal-review" } }))).toBe(false);
    expect(isPublishablePyq(q("NEET 2024", { verification: { status: "pending" }, rights: CLEARED }))).toBe(false);
    expect(isPublishablePyq(q("NEET 2024", { verification: VERIFIED, rights: CLEARED }))).toBe(true);
  });

  it("never publishes AIIMS-labelled questions, even if verified and cleared", () => {
    for (const label of ["AIIMS 2018", "aiims 2012", "NEET / AIIMS 2016"]) {
      expect(isRetiredExamLabel(label)).toBe(true);
      expect(isPublishablePyq(q(label, { verification: VERIFIED, rights: CLEARED }))).toBe(false);
    }
    expect(isRetiredExamLabel("NEET 2024")).toBe(false);
    const aiimsLegacy = allLegacy.filter((r) => /aiims/i.test(r.question.exam));
    expect(aiimsLegacy).toHaveLength(380);
    expect(aiimsLegacy.every((r) => isRetiredExamLabel(r.question.exam))).toBe(true);
  });
});

describe("student progress preservation", () => {
  const chapter: ChapterPyq = {
    chapterName: "Test",
    className: "11",
    questions: [
      q("NEET 2020"), // 0 withheld
      q("NEET 2021", { verification: VERIFIED, rights: CLEARED }), // 1
      q("AIIMS 2018", { verification: VERIFIED, rights: CLEARED }), // 2 withheld
      q("JEE Main 2023", { examType: "jee-main", verification: VERIFIED, rights: CLEARED }), // 3
    ] as PyqQuestion[],
  };

  it("keeps each visible question's ORIGINAL position as its mistake ID", () => {
    const view = publicPyqView(chapter);
    expect(view.pyq.questions.map((x) => x.exam)).toEqual(["NEET 2021", "JEE Main 2023"]);
    expect(view.questionIds).toEqual(["1", "3"]);
    expect(view.pyq.questions.map((_, i) => pyqQuestionId(view.questionIds, i))).toEqual(["1", "3"]);
  });

  it("does not mutate the legacy chapter data", () => {
    publicPyqView(chapter);
    expect(chapter.questions).toHaveLength(4);
  });

  it("falls back to the list index (pre-Phase-2A format) without questionIds", () => {
    expect(pyqQuestionId(undefined, 4)).toBe("4");
    expect(pyqQuestionId([], 2)).toBe("2");
  });

  it("computes exam availability from publishable questions only", () => {
    expect(publicPyqExamAvailability(chapter)).toEqual({ neet: true, jeeMain: true, jeeAdvanced: false });
  });

  it("keeps PYQ data for every chapter that had it, so routes and the checklist are unchanged", () => {
    const withPyq = allChapters.filter((c) => getChapterPyq(c.slug));
    expect(withPyq).toHaveLength(30);
    expect(Object.keys(pyqAvailability).sort()).toEqual(Object.keys(pyqRegistry).sort());
  });
});

describe("public availability map", () => {
  it("matches the map recomputed from the registry and the policy (drift guard)", () => {
    const computed: Record<string, ReturnType<typeof publicPyqExamAvailability>> = {};
    for (const [slug, ch] of Object.entries(pyqRegistry)) {
      const a = publicPyqExamAvailability(ch);
      if (a.neet || a.jeeMain || a.jeeAdvanced) computed[slug] = a;
    }
    expect(publicPyqAvailability).toEqual(computed);
  });

  it("advertises no PYQs in hubs or search while everything is withheld", () => {
    for (const slug of Object.keys(pyqRegistry)) {
      for (const exam of ["neet", "jee-main", "jee-advanced"] as const) {
        expect(hasPyqFor(slug, exam)).toBe(false);
      }
    }
  });
});
