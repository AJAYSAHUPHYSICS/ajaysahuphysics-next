import { describe, expect, it } from "vitest";
import { validateChapterPackage, type ChapterPackage, type Provenance } from "@/lib/content-v2/chapter-package";

// Template rules for rebuilt chapters, exercised on placeholder data only
// (no physics content is created by this test).

const approved = { reviewer: "Reviewer", date: "2026-11-18", status: "approved" as const };
const original = (review = true): Provenance => ({ origin: "original", sources: [], author: "AjaySahuPhysics", aiAssisted: false, ...(review ? { review: approved } : {}) });

function pkg(overrides: Partial<ChapterPackage> = {}): ChapterPackage {
  return {
    schemaVersion: 1,
    id: "c11-placeholder",
    cls: "11",
    slug: "physical-world-and-measurement",
    title: "Placeholder",
    syllabus: { checkedAgainst: ["official syllabus PDF"] },
    status: "published",
    sources: [{ id: "R-900", title: "Placeholder source", url: "https://example.org", licence: "CC-BY-4.0", status: "verified", attribution: "Placeholder by Example, CC BY 4.0", evidence: { url: "https://example.org/licence", verifiedOn: "2026-11-19", licenceText: "Placeholder licence text." } }],
    overview: { summary: "Placeholder summary", learningOutcomes: ["Placeholder outcome"], provenance: original() },
    notes: [{ id: "n1", heading: "Placeholder", body: "Placeholder body", provenance: original() }],
    shortNotes: [],
    formulaSheet: [],
    solvedExamples: [],
    dpp: [{ id: "q1", number: 1, level: "board", label: "Practice question", question: "Placeholder?", options: ["a", "b", "c", "d"], correctIndex: 0, solution: "Placeholder", provenance: original() }],
    examPractice: [],
    experiments: [],
    revisionChecklist: [{ id: "r1", text: "Placeholder item", provenance: original() }],
    pyqs: [],
    ...overrides,
  };
}

describe("chapter package validator", () => {
  it("accepts a valid published package", () => {
    expect(validateChapterPackage(pkg())).toEqual([]);
  });

  it("rejects sources that aren't verified, and ShareAlike without owner approval", () => {
    const errs = validateChapterPackage(pkg({ sources: [{ id: "R-900", title: "t", url: "https://example.org", licence: "CC-BY-SA-4.0", status: "pending", attribution: "x", evidence: { url: "https://example.org/licence", verifiedOn: "2026-11-19", licenceText: "Placeholder licence text." } }] }));
    expect(errs.join("\n")).toMatch(/only "verified"/);
    expect(errs.join("\n")).toMatch(/ShareAlike/);
    expect(validateChapterPackage(pkg({ sources: [{ id: "R-900", title: "t", url: "https://example.org", licence: "CC-BY-SA-4.0", status: "verified", attribution: "x", evidence: { url: "https://example.org/licence", verifiedOn: "2026-11-19", licenceText: "Placeholder licence text." } }] }), { allowShareAlike: true })).toEqual([]);
  });

  it("requires adapted content to name its sources and changes", () => {
    const errs = validateChapterPackage(pkg({ notes: [{ id: "n1", heading: "h", body: "b", provenance: { origin: "adapted", sources: [], author: "A", aiAssisted: false, review: approved } }] }));
    expect(errs).toEqual(expect.arrayContaining([expect.stringMatching(/must name its sources/), expect.stringMatching(/describe its changes/)]));
    expect(validateChapterPackage(pkg({ notes: [{ id: "n1", heading: "h", body: "b", provenance: { origin: "adapted", sources: ["R-404"], author: "A", aiAssisted: false, changes: "c", review: approved } }] })).join()).toMatch(/unknown source R-404/);
  });

  it("blocks publishing unreviewed content", () => {
    expect(validateChapterPackage(pkg({ notes: [{ id: "n1", heading: "h", body: "b", provenance: original(false) }] })).join()).toMatch(/not approved/);
    expect(validateChapterPackage(pkg({ status: "drafting", notes: [{ id: "n1", heading: "h", body: "b", provenance: original(false) }] }))).toEqual([]);
  });

  it("keeps practice-question numbers stable and unique, and never exam-labelled", () => {
    const q = pkg().dpp[0];
    expect(validateChapterPackage(pkg({ dpp: [q, { ...q, id: "q2" }] })).join()).toMatch(/duplicate number 1/);
    expect(validateChapterPackage(pkg({ dpp: [{ ...q, question: "As asked in NEET 2019, find…" }] })).join()).toMatch(/exam\/year label/);
  });

  it("rejects non-commercial, no-derivatives or unknown licences at runtime", () => {
    for (const licence of ["CC-BY-NC-4.0", "CC-BY-NC-SA-4.0", "CC-BY-ND-4.0", "ALL-RIGHTS-RESERVED"]) {
      const errs = validateChapterPackage(pkg({ sources: [{ id: "R-900", title: "t", url: "https://example.org", licence: licence as never, status: "verified", attribution: "x", evidence: { url: "https://example.org/licence", verifiedOn: "2026-11-19", licenceText: "Placeholder licence text." } }] }));
      expect(errs.join()).toMatch(/not allowed/);
    }
  });

  it("requires a named, dated, independent reviewer for any approval", () => {
    const withReview = (review: Provenance["review"]) =>
      validateChapterPackage(pkg({ status: "in-review", notes: [{ id: "n1", heading: "h", body: "b", provenance: { ...original(false), review } }] })).join();
    expect(withReview({ reviewer: null, status: "approved" })).toMatch(/without a named reviewer/);
    expect(withReview({ reviewer: "R", status: "approved" })).toMatch(/no date/);
    expect(withReview({ reviewer: "AjaySahuPhysics", date: "2026-11-18", status: "approved" })).toMatch(/independent/);
    // A pending review with no reviewer is fine for a draft, but blocks publication.
    expect(withReview({ reviewer: null, status: "pending" })).toBe("");
    expect(validateChapterPackage(pkg({ notes: [{ id: "n1", heading: "h", body: "b", provenance: { ...original(false), review: { reviewer: null, status: "pending" } } }] })).join()).toMatch(/not approved/);
  });

  it("rejects practice questions presented as PYQs, or with mismatched level labels", () => {
    const q = pkg().dpp[0];
    expect(validateChapterPackage(pkg({ dpp: [{ ...q, question: "This PYQ asks: find x." }] })).join()).toMatch(/presented as PYQs/);
    expect(validateChapterPackage(pkg({ dpp: [{ ...q, question: "A previous year question: find x." }] })).join()).toMatch(/presented as PYQs/);
    expect(validateChapterPackage(pkg({ dpp: [{ ...q, level: "board", label: "NEET-style practice question" }] })).join()).toMatch(/doesn't match level/);
    expect(validateChapterPackage(pkg({ dpp: [{ ...q, level: "neet", label: "NEET-style practice question" }] }))).toEqual([]);
  });

  it("rejects identical options, wrong option counts and duplicate questions", () => {
    const q = pkg().dpp[0];
    expect(validateChapterPackage(pkg({ dpp: [{ ...q, options: ["a", "b", "B", "d"] }] })).join()).toMatch(/identical/);
    expect(validateChapterPackage(pkg({ dpp: [{ ...q, options: ["a", "b", "c"] }] })).join()).toMatch(/exactly 4/);
    expect(validateChapterPackage(pkg({ dpp: [q, { ...q, id: "q2", number: 2 }] })).join()).toMatch(/duplicate question text/);
  });

  it("requires units on formulas and solved-example answers, and structure", () => {
    const f = { id: "f1", label: "l", expression: "x = vt", variables: [{ symbol: "v", name: "speed", unit: "" }], provenance: original() };
    expect(validateChapterPackage(pkg({ formulaSheet: [f] })).join()).toMatch(/has no unit/);
    const e = { id: "e1", level: "board" as const, problem: "p", steps: ["s"], answer: "5", answerUnit: "", provenance: original() };
    expect(validateChapterPackage(pkg({ solvedExamples: [e] })).join()).toMatch(/answer unit missing/);
    expect(validateChapterPackage(pkg({ solvedExamples: [{ ...e, answerUnit: "m" }] }))).toEqual([]);
    expect(validateChapterPackage(pkg({ revisionChecklist: [] })).join()).toMatch(/revision checklist is empty/);
    expect(validateChapterPackage(pkg({ overview: { summary: "s", learningOutcomes: [], provenance: original() } })).join()).toMatch(/no learning outcomes/);
    expect(validateChapterPackage(pkg({ id: "Bad ID" })).join()).toMatch(/lowercase-hyphenated/);
  });

  it("requires licence evidence (url, date, licence text) on every source before publication", () => {
    const base = pkg();
    const noEvidence = { ...base, sources: [{ ...base.sources[0], evidence: undefined }] };
    expect(validateChapterPackage(noEvidence).join()).toMatch(/licence evidence/);
    expect(validateChapterPackage({ ...noEvidence, status: "in-review" })).toEqual([]);
    const badDate = { ...base, sources: [{ ...base.sources[0], evidence: { ...base.sources[0].evidence!, verifiedOn: "19/11/2026" } }] };
    expect(validateChapterPackage(badDate).join()).toMatch(/licence evidence/);
  });

  it("gates PYQs on an official source, verification and cleared rights", () => {
    const pyq = {
      id: "neet-2024-x-q1",
      exam: "neet" as const,
      year: 2024,
      paper: { code: "X" },
      officialNumber: 1,
      question: "Placeholder",
      answer: "a",
      solution: { text: "s", author: "AjaySahuPhysics", review: approved },
      source: { kind: "official-paper" as const, url: "https://exams.nta.ac.in/NEET/paper.pdf", retrievedOn: "2026-11-18", fileSha256: "a".repeat(64) },
      verification: { status: "verified" as const },
      rights: { status: "pending-legal-review" as const },
    };
    expect(validateChapterPackage(pkg({ pyqs: [pyq] })).join()).toMatch(/rights not cleared/);
    expect(validateChapterPackage(pkg({ pyqs: [{ ...pyq, rights: { status: "cleared" } }] }))).toEqual([]);
    expect(validateChapterPackage(pkg({ pyqs: [{ ...pyq, rights: { status: "cleared" }, source: { ...pyq.source, url: "https://coaching.example.com/paper.pdf" } }] })).join()).toMatch(/not an official exam domain/);
  });
});
