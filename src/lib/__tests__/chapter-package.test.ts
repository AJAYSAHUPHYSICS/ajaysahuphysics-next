import { describe, expect, it } from "vitest";
import {
  formulaSheetPublicationGaps,
  isCalendarDate,
  isSafeAssetPath,
  isSameIdentity,
  normaliseIdentity,
  publicationReadiness,
  validateChapterPackage,
  type ChapterPackage,
  type Provenance,
} from "@/lib/content-v2/chapter-package";
import { isPackageServable } from "@/lib/content-v2/rebuilt-packages";
import { approved as approvedSynthetic, syntheticPackage } from "./fixtures/synthetic-packages";

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
    sources: [{ id: "R-900", title: "Placeholder source", url: "https://example.org", licence: "CC-BY-4.0", status: "verified", attribution: "Placeholder by Example, CC BY 4.0", evidence: { url: "https://example.org/licence", verifiedOn: "2026-11-19", licenceText: "Placeholder licence text.", commercialUse: "permitted" } }],
    overview: { summary: "Placeholder summary", learningOutcomes: ["Placeholder outcome"], provenance: original() },
    notes: [{ id: "n1", heading: "Placeholder", body: "Placeholder body", provenance: original() }],
    shortNotes: [],
    formulaSheet: [],
    solvedExamples: [],
    dpp: [{ id: "q1", number: 1, level: "board", label: "Practice question", question: "Placeholder?", options: ["a", "b", "c", "d"], correctIndex: 0, solution: "Placeholder", difficulty: "easy", provenance: original() }],
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
    const errs = validateChapterPackage(pkg({ sources: [{ id: "R-900", title: "t", url: "https://example.org", licence: "CC-BY-SA-4.0", status: "pending", attribution: "x", evidence: { url: "https://example.org/licence", verifiedOn: "2026-11-19", licenceText: "Placeholder licence text.", commercialUse: "permitted" } }] }));
    expect(errs.join("\n")).toMatch(/only "verified"/);
    expect(errs.join("\n")).toMatch(/ShareAlike/);
    expect(validateChapterPackage(pkg({ sources: [{ id: "R-900", title: "t", url: "https://example.org", licence: "CC-BY-SA-4.0", status: "verified", attribution: "x", evidence: { url: "https://example.org/licence", verifiedOn: "2026-11-19", licenceText: "Placeholder licence text.", commercialUse: "permitted" } }] }), { allowShareAlike: true })).toEqual([]);
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
      const errs = validateChapterPackage(pkg({ sources: [{ id: "R-900", title: "t", url: "https://example.org", licence: licence as never, status: "verified", attribution: "x", evidence: { url: "https://example.org/licence", verifiedOn: "2026-11-19", licenceText: "Placeholder licence text.", commercialUse: "permitted" } }] }));
      expect(errs.join()).toMatch(/not allowed/);
    }
  });

  it("requires a named, dated, independent reviewer for any approval", () => {
    const withReview = (review: Provenance["review"]) =>
      validateChapterPackage(pkg({ status: "in-review", notes: [{ id: "n1", heading: "h", body: "b", provenance: { ...original(false), review } }] })).join();
    expect(withReview({ reviewer: null, status: "approved" })).toMatch(/without a named reviewer/);
    expect(withReview({ reviewer: "R", status: "approved" })).toMatch(/no valid date/);
    expect(withReview({ reviewer: "R", date: "18 Nov 2026", status: "approved" })).toMatch(/no valid date/);
    expect(withReview({ reviewer: "ajaysahuphysics", date: "2026-11-18", status: "approved" })).toMatch(/independent/);
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
    expect(validateChapterPackage(pkg({ solvedExamples: [{ ...e, answerUnit: "m", difficulty: "easy" }] }))).toEqual([]);
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
      verification: { status: "verified" as const, by: "Placeholder Verifier", on: "2026-11-18" },
      rights: { status: "pending-legal-review" as const },
    };
    expect(validateChapterPackage(pkg({ pyqs: [pyq] })).join()).toMatch(/rights not cleared/);
    expect(validateChapterPackage(pkg({ pyqs: [{ ...pyq, rights: { status: "cleared" as const, basis: "placeholder legal opinion ref" } }] }))).toEqual([]);
    expect(validateChapterPackage(pkg({ pyqs: [{ ...pyq, rights: { status: "cleared" }, source: { ...pyq.source, url: "https://coaching.example.com/paper.pdf" } }] })).join()).toMatch(/not an official exam domain/);
  });
});

describe("publication rules added in Phase 2A completion", () => {
  const src = () => pkg().sources[0];

  it("requires confirmed commercial-use permission in the licence evidence to publish", () => {
    const e = src().evidence!;
    expect(validateChapterPackage(pkg({ sources: [{ ...src(), evidence: { ...e, commercialUse: undefined } }] })).join()).toMatch(/commercial use must be confirmed/);
    expect(validateChapterPackage(pkg({ sources: [{ ...src(), evidence: { ...e, commercialUse: "unclear" } }] })).join()).toMatch(/only sources that permit commercial use/);
    // Even a draft may not rely on a source whose licence forbids commercial use.
    expect(validateChapterPackage(pkg({ status: "drafting", sources: [{ ...src(), evidence: { ...e, commercialUse: "not-permitted" } }] })).join()).toMatch(/only sources that permit commercial use/);
  });

  it("requires real http(s) URLs and a title for sources and evidence", () => {
    expect(validateChapterPackage(pkg({ sources: [{ ...src(), url: "example.org/page" }] })).join()).toMatch(/not a valid http\(s\) URL/);
    expect(validateChapterPackage(pkg({ sources: [{ ...src(), title: " " }] })).join()).toMatch(/has no title/);
    expect(validateChapterPackage(pkg({ sources: [{ ...src(), evidence: { ...src().evidence!, url: "javascript:alert(1)" } }] })).join()).toMatch(/licence evidence/);
    expect(validateChapterPackage(pkg({ sources: [{ ...src(), evidence: { ...src().evidence!, verifiedOn: "2026-02-31x" } }] })).join()).toMatch(/licence evidence/);
  });

  it("requires a reviewed difficulty on examples and questions to publish (optional while drafting)", () => {
    const q = pkg().dpp[0];
    const noDifficulty = { ...q, difficulty: undefined };
    expect(validateChapterPackage(pkg({ dpp: [noDifficulty] })).join()).toMatch(/difficulty missing/);
    expect(validateChapterPackage(pkg({ status: "in-review", dpp: [noDifficulty] }))).toEqual([]);
    expect(validateChapterPackage(pkg({ dpp: [{ ...q, difficulty: "extreme" as never }] })).join()).toMatch(/not easy, medium or hard/);
    const e = { id: "e1", level: "board" as const, problem: "p", steps: ["s"], answer: "5", answerUnit: "m", provenance: original() };
    expect(validateChapterPackage(pkg({ solvedExamples: [e] })).join()).toMatch(/example e1: difficulty missing/);
  });

  it("serves diagrams only from the site itself, with unique ids and alt text", () => {
    const fig = { id: "fig-1", src: "/content/diagrams/c11/fig-1.svg", alt: "Placeholder diagram", provenance: original() };
    const withFigs = (figures: typeof fig[]) => validateChapterPackage(pkg({ notes: [{ id: "n1", heading: "h", body: "b", figures, provenance: original() }] })).join();
    expect(withFigs([fig])).toBe("");
    expect(withFigs([{ ...fig, src: "https://upload.example.org/fig.svg" }])).toMatch(/site-served path/);
    expect(withFigs([{ ...fig, src: "//cdn.example.org/fig.svg" }])).toMatch(/site-served path/);
    expect(withFigs([{ ...fig, src: "data:image/svg+xml;base64,AAAA" }])).toMatch(/site-served path/);
    expect(withFigs([fig, { ...fig }])).toMatch(/duplicate id fig-1/);
    expect(withFigs([{ ...fig, provenance: original(false) }])).toMatch(/figure fig-1: not approved/);
  });

  it("rejects empty text in outcomes, short notes, checklist items and experiments", () => {
    expect(validateChapterPackage(pkg({ overview: { summary: "s", learningOutcomes: ["ok", " "], provenance: original() } })).join()).toMatch(/empty learning outcome/);
    expect(validateChapterPackage(pkg({ shortNotes: [{ id: "sn1", text: "", provenance: original() }] })).join()).toMatch(/short note sn1: text missing/);
    expect(validateChapterPackage(pkg({ revisionChecklist: [{ id: "r1", text: " ", provenance: original() }] })).join()).toMatch(/revision r1: text missing/);
    const ex = { id: "x1", title: "Placeholder experiment", aim: "Placeholder aim", method: ["step"], provenance: original() };
    expect(validateChapterPackage(pkg({ experiments: [ex] }))).toEqual([]);
    expect(validateChapterPackage(pkg({ experiments: [{ ...ex, method: [] }] })).join()).toMatch(/every method step/);
    expect(validateChapterPackage(pkg({ experiments: [{ ...ex, simulation: { registryId: "R-900", url: "not a url" } }] })).join()).toMatch(/simulation URL/);
  });

  it("rejects a formula listed twice in the quick-revision strip", () => {
    const f = { id: "f1", label: "l", expression: "x = vt", variables: [{ symbol: "v", name: "speed", unit: "m s⁻¹" }], provenance: original() };
    expect(validateChapterPackage(pkg({ status: "in-review", formulaSheet: [f], quickRevisionFormulaIds: ["f1", "f1"] })).join()).toMatch(/lists a formula twice/);
  });

  it("requires PYQ verification and rights records to be complete, and solution review to be independent", () => {
    const base = {
      id: "neet-2024-x-q1", exam: "neet" as const, year: 2024, paper: { code: "X" }, officialNumber: 1, question: "Placeholder", answer: "a",
      solution: { text: "s", author: "AjaySahuPhysics", review: { reviewer: "Placeholder Reviewer", date: "2026-11-18", status: "approved" as const } },
      source: { kind: "official-paper" as const, url: "https://exams.nta.ac.in/NEET/paper.pdf", retrievedOn: "2026-11-18", fileSha256: "a".repeat(64) },
      verification: { status: "verified" as const, by: "Placeholder Verifier", on: "2026-11-18" },
      rights: { status: "cleared" as const, basis: "placeholder legal opinion ref" },
    };
    expect(validateChapterPackage(pkg({ pyqs: [base] }))).toEqual([]);
    expect(validateChapterPackage(pkg({ status: "in-review", pyqs: [{ ...base, verification: { status: "verified" as const } }] })).join()).toMatch(/name who verified it and when/);
    expect(validateChapterPackage(pkg({ status: "in-review", pyqs: [{ ...base, rights: { status: "cleared" as const } }] })).join()).toMatch(/record its basis/);
    expect(validateChapterPackage(pkg({ pyqs: [{ ...base, solution: { ...base.solution, review: { ...base.solution.review, reviewer: "AjaySahuPhysics" } } }] })).join()).toMatch(/solution: reviewer must be independent/);
    expect(validateChapterPackage(pkg({ status: "in-review", pyqs: [{ ...base, source: { ...base.source, retrievedOn: "" } }] })).join()).toMatch(/retrievedOn/);
  });

  it("requires AI assistance to be declared on every block to publish", () => {
    const p = { ...original(), aiAssisted: undefined as unknown as boolean };
    expect(validateChapterPackage(pkg({ notes: [{ id: "n1", heading: "h", body: "b", provenance: p }] })).join()).toMatch(/AI-assistance must be declared/);
  });

  it("publicationReadiness lists every blocker for a draft without changing it", () => {
    const draft = pkg({ status: "in-review", notes: [{ id: "n1", heading: "h", body: "b", provenance: original(false) }] });
    const snapshot = JSON.stringify(draft);
    expect(validateChapterPackage(draft)).toEqual([]);
    expect(publicationReadiness(draft).join()).toMatch(/notes n1: not approved by a reviewer/);
    expect(JSON.stringify(draft)).toBe(snapshot);
    expect(draft.status).toBe("in-review");
    expect(publicationReadiness(pkg())).toEqual([]);
  });
});

describe("code-review fixes: reviewer identity, asset paths, dates, blank text", () => {
  const BS = "\\"; // one backslash

  describe("H-1: reviewer independence", () => {
    it("normalises names: trailing annotations, case, spacing, punctuation and accents", () => {
      expect(normaliseIdentity("AjaySahuPhysics (draft)")).toBe("ajaysahuphysics");
      expect(normaliseIdentity("  ajay-sahu physics  ")).toBe("ajaysahuphysics");
      expect(normaliseIdentity("AJAY SAHU (Editor) (v2)")).toBe("ajaysahu");
      expect(normaliseIdentity("Ajay Sahu.")).toBe("ajaysahu");
      expect(normaliseIdentity("Dr. Renée Kumar")).toBe("drreneekumar");
      expect(normaliseIdentity("()")).toBe("");
    });

    it("treats decorated names and every author alias as the same identity", () => {
      for (const [reviewer, author] of [
        ["AjaySahuPhysics", "AjaySahuPhysics (draft)"],
        ["Ajay Sahu", "AjaySahuPhysics (draft)"],
        ["ajay sahu physics", "AjaySahuPhysics"],
        ["AJAY-SAHU (Editor)", "Ajay Sahu Physics"],
        ["Priya Sharma (independent)", "priya sharma"],
      ]) expect(isSameIdentity(reviewer, author), `${reviewer} vs ${author}`).toBe(true);
      // Genuinely different people are independent, including the owner reviewing a guest author.
      expect(isSameIdentity("Priya Sharma", "AjaySahuPhysics (draft)")).toBe(false);
      expect(isSameIdentity("Ajay Sahu", "Guest Author")).toBe(false);
      expect(isSameIdentity("Ajay Sahu", "")).toBe(false);
    });

    it("rejects decorated self-review and alias self-review in a package", () => {
      const reviewedBy = (reviewer: string, author = "AjaySahuPhysics (draft)") =>
        validateChapterPackage(pkg({ notes: [{ id: "n1", heading: "h", body: "b", provenance: { ...original(), author, review: { reviewer, date: "2026-11-19", status: "approved" } } }] })).join();
      for (const r of ["AjaySahuPhysics", "Ajay Sahu", "ajay sahu physics", "AjaySahuPhysics (reviewer)", "AJAY-SAHU"]) expect(reviewedBy(r), r).toMatch(/notes n1: reviewer must be independent/);
      expect(reviewedBy("Priya Sharma")).toBe("");
      // A reviewer that normalises to nothing is not a named reviewer.
      expect(reviewedBy("( )")).toMatch(/approved without a named reviewer/);
      expect(reviewedBy("---")).toMatch(/approved without a named reviewer/);
    });

    it("rejects decorated self-review of a PYQ solution", () => {
      const q = {
        id: "neet-2024-x-q1", exam: "neet" as const, year: 2024, paper: { code: "X" }, officialNumber: 1, question: "Placeholder", answer: "a",
        solution: { text: "s", author: "AjaySahuPhysics (draft)", review: { reviewer: "Ajay Sahu", date: "2026-11-18", status: "approved" as const } },
        source: { kind: "official-paper" as const, url: "https://exams.nta.ac.in/NEET/paper.pdf", retrievedOn: "2026-11-18", fileSha256: "a".repeat(64) },
        verification: { status: "verified" as const, by: "Placeholder Verifier", on: "2026-11-18" },
        rights: { status: "cleared" as const, basis: "placeholder legal opinion ref" },
      };
      expect(validateChapterPackage(pkg({ pyqs: [q] })).join()).toMatch(/solution: reviewer must be independent/);
    });

    it("keeps a decorated self-reviewed package off the site (gate fails closed)", () => {
      const ok = approvedSynthetic(syntheticPackage("physical-world-and-measurement"));
      expect(isPackageServable(ok, "notes")).toBe(true);
      const self = { ...ok, notes: ok.notes.map((n) => ({ ...n, provenance: { ...n.provenance, author: "AjaySahuPhysics (draft)", review: { reviewer: "AjaySahuPhysics", date: "2026-11-19", status: "approved" as const } } })) };
      expect(isPackageServable(self, "notes")).toBe(false);
    });
  });

  describe("M-1: diagram paths", () => {
    it("accepts only root-relative image paths with plain segments", () => {
      for (const ok of ["/content/diagrams/c11/fig-1.svg", "/og/class-11/kinematics.png", "/a_b/c.d-e.webp", "/x.jpeg", "/x.avif"]) expect(isSafeAssetPath(ok), ok).toBe(true);
    });

    it("rejects external, protocol-relative, backslash, whitespace, traversal and other unsafe forms", () => {
      const bad = [
        "", "https://cdn.example.org/x.svg", "http://cdn.example.org/x.svg", "//cdn.example.org/x.svg",
        `${BS}${BS}cdn.example.org/x.svg`, `/${BS}cdn.example.org/x.svg`, `${BS}/cdn.example.org/x.svg`, `/content${BS}x.svg`,
        " //cdn.example.org/x.svg", "\t//cdn.example.org/x.svg", " /content/x.svg", "/content/x.svg ", "/content/a b.svg", "/content/x.svg\n",
        "/../x.svg", "/content/../x.svg", "/./x.svg", "/content/./x.svg", "/content//x.svg", "/%2e%2e/x.svg", "/content/%20x.svg",
        "/x.svg?v=1", "/x.svg#frag", "data:image/svg+xml;base64,AAAA", "javascript:alert(1)", "file:///C:/x.svg", "C:/x.svg",
        "x.svg", "content/x.svg", "../x.svg", "/content/x.html", "/content/x", "/.hidden.svg", "/-x.svg",
      ];
      for (const s of bad) expect(isSafeAssetPath(s), JSON.stringify(s)).toBe(false);
    });

    it("the validator rejects a figure with any unsafe src", () => {
      const withSrc = (src: string) => validateChapterPackage(pkg({ notes: [{ id: "n1", heading: "h", body: "b", figures: [{ id: "fig-1", src, alt: "Placeholder diagram", provenance: original() }], provenance: original() }] })).join();
      expect(withSrc("/content/diagrams/c11/fig-1.svg")).toBe("");
      for (const s of [`${BS}${BS}cdn.example.org/x.svg`, " //cdn.example.org/x.svg", "/content/../secret.svg"]) expect(withSrc(s), JSON.stringify(s)).toMatch(/site-served path/);
    });
  });

  describe("M-2: strict calendar dates", () => {
    it("accepts real YYYY-MM-DD dates only", () => {
      for (const ok of ["2026-11-19", "2024-02-29", "2026-12-31", "2026-01-01"]) expect(isCalendarDate(ok), ok).toBe(true);
      for (const bad of ["2026-02-30", "2026-02-31", "2026-04-31", "2025-02-29", "2026-13-01", "2026-00-10", "2026-11-00", "2026-11-19T00:00", " 2026-11-19", "2026-11-19 ", "2026/11/19", "19-11-2026", "0999-01-01", "", undefined]) {
        expect(isCalendarDate(bad), JSON.stringify(bad)).toBe(false);
      }
    });

    it("every date field in a package uses the strict check", () => {
      const IMPOSSIBLE = "2026-02-30";
      // Approval date on a block.
      expect(validateChapterPackage(pkg({ notes: [{ id: "n1", heading: "h", body: "b", provenance: { ...original(), review: { reviewer: "R", date: IMPOSSIBLE, status: "approved" } } }] })).join()).toMatch(/no valid date/);
      // Licence evidence date.
      const s = pkg().sources[0];
      expect(validateChapterPackage(pkg({ sources: [{ ...s, evidence: { ...s.evidence!, verifiedOn: IMPOSSIBLE } }] })).join()).toMatch(/licence evidence/);
      // PYQ dates: retrieval, verification and solution approval.
      const q = {
        id: "neet-2024-x-q1", exam: "neet" as const, year: 2024, paper: { code: "X" }, officialNumber: 1, question: "Placeholder", answer: "a",
        solution: { text: "s", author: "AjaySahuPhysics", review: { reviewer: "Placeholder Reviewer", date: "2026-11-18", status: "approved" as const } },
        source: { kind: "official-paper" as const, url: "https://exams.nta.ac.in/NEET/paper.pdf", retrievedOn: "2026-11-18", fileSha256: "a".repeat(64) },
        verification: { status: "verified" as const, by: "Placeholder Verifier", on: "2026-11-18" },
        rights: { status: "cleared" as const, basis: "placeholder legal opinion ref" },
      };
      expect(validateChapterPackage(pkg({ pyqs: [q] }))).toEqual([]);
      expect(validateChapterPackage(pkg({ pyqs: [{ ...q, source: { ...q.source, retrievedOn: IMPOSSIBLE } }] })).join()).toMatch(/retrievedOn/);
      expect(validateChapterPackage(pkg({ pyqs: [{ ...q, verification: { ...q.verification, on: IMPOSSIBLE } }] })).join()).toMatch(/name who verified it and when/);
      expect(validateChapterPackage(pkg({ pyqs: [{ ...q, solution: { ...q.solution, review: { ...q.solution.review, date: IMPOSSIBLE } } }] })).join()).toMatch(/solution: approval has no valid date/);
      // Formula-sheet lastUpdated.
      const f = { id: "f1", label: "l", expression: "x = vt", variables: [{ symbol: "v", name: "speed", unit: "m s⁻¹", dimension: "[L T⁻¹]" }], examTags: ["boards" as const], difficulty: "easy" as const, frequency: "low" as const, isKeyFormula: false, pdfInclude: true, provenance: original() };
      const sheet = pkg({ formulaSheet: [f], formulaGroups: [{ id: "g1", title: "g", formulaIds: ["f1"] }], version: "1.0.0", lastUpdated: "2026-11-19" });
      expect(formulaSheetPublicationGaps(sheet)).toEqual([]);
      expect(formulaSheetPublicationGaps({ ...sheet, lastUpdated: IMPOSSIBLE }).join()).toMatch(/lastUpdated/);
    });
  });

  describe("L-1: blank text inside blocks", () => {
    it("rejects blank solved-example steps, note points and formula labels", () => {
      const e = { id: "e1", level: "board" as const, problem: "p", steps: ["step one", " "], answer: "5", answerUnit: "m", difficulty: "easy" as const, provenance: original() };
      expect(validateChapterPackage(pkg({ solvedExamples: [e] })).join()).toMatch(/example e1: empty solution step/);
      expect(validateChapterPackage(pkg({ solvedExamples: [{ ...e, steps: ["step one"] }] }))).toEqual([]);
      expect(validateChapterPackage(pkg({ notes: [{ id: "n1", heading: "h", body: "b", points: ["ok", ""], provenance: original() }] })).join()).toMatch(/notes n1: empty point/);
      const f = { id: "f1", label: " ", expression: "x = vt", variables: [{ symbol: "v", name: "speed", unit: "m s⁻¹" }], provenance: original() };
      expect(validateChapterPackage(pkg({ status: "in-review", formulaSheet: [f] })).join()).toMatch(/formula f1: label missing/);
    });
  });
});
