import { describe, expect, it } from "vitest";
import {
  isOriginalPublishable,
  isPyqPublishable,
  validateQuestionBank,
  type GenuinePyq,
  type OriginalQuestion,
  type QuestionBank,
} from "@/lib/content-v2/question-bank";

// Placeholder data only: no real exam question text is created here.

const approved = { reviewer: "Independent Reviewer", date: "2026-11-19", status: "approved" as const };
const original = (over: Partial<OriginalQuestion> = {}): OriginalQuestion => ({
  kind: "original", id: "q-c11-units-0001", chapterId: "c11-units-and-measurements", topicIds: ["errors"],
  difficulty: "medium", examStyle: "neet", format: "single-correct", question: "Placeholder question?",
  options: ["a", "b", "c", "d"], answer: { kind: "options", correctIndices: [1] }, solution: "Placeholder solution.",
  author: "AjaySahuPhysics", review: approved, status: "approved", ...over,
});
const pyq = (over: Partial<GenuinePyq> = {}): GenuinePyq => ({
  kind: "pyq", id: "pyq-neet-2024-x1-q12", chapterId: "c11-units-and-measurements", topicIds: ["errors"],
  exam: "neet", year: 2024, paper: { code: "X1" }, officialQuestionNumber: 12, format: "single-correct",
  question: "Placeholder", options: ["a", "b", "c", "d"], answer: { kind: "options", correctIndices: [0] },
  source: { kind: "official-paper", url: "https://exams.nta.ac.in/NEET/paper.pdf", retrievedOn: "2026-11-19", fileSha256: "b".repeat(64) },
  authenticity: { status: "verified", verifiedBy: "Verifier", verifiedOn: "2026-11-19", method: "word-for-word against official PDF" },
  rights: { status: "cleared", basis: "written legal opinion ref LO-1" },
  solution: { text: "Independent solution.", author: "AjaySahuPhysics", review: approved },
  status: "approved", ...over,
});
const bank = (over: Partial<QuestionBank> = {}): QuestionBank => ({ originals: [original()], pyqs: [pyq()], dppSets: [], ...over });

describe("question bank: original practice questions", () => {
  it("accepts a valid bank", () => {
    expect(validateQuestionBank(bank())).toEqual([]);
    expect(isOriginalPublishable(original())).toBe(true);
  });

  it("never lets an original question be presented as a PYQ", () => {
    for (const text of ["This PYQ asks…", "From NEET 2019: find x.", "A previous-year question.", "As asked in JEE Main: find x."]) {
      expect(validateQuestionBank(bank({ originals: [original({ question: text })] })).join()).toMatch(/must not be presented as a PYQ/);
    }
  });

  it("checks answer shape per format", () => {
    expect(validateQuestionBank(bank({ originals: [original({ answer: { kind: "options", correctIndices: [0, 1] } })] })).join()).toMatch(/exactly one correct/);
    expect(validateQuestionBank(bank({ originals: [original({ format: "multi-correct", answer: { kind: "options", correctIndices: [0, 2] } })] }))).toEqual([]);
    expect(validateQuestionBank(bank({ originals: [original({ format: "numerical", options: undefined, answer: { kind: "numerical", value: 9.87, tolerance: 0.05, unit: "" } })] })).join()).toMatch(/needs a unit/);
    expect(validateQuestionBank(bank({ originals: [original({ format: "integer", options: undefined, answer: { kind: "integer", value: 2.5 } })] })).join()).toMatch(/integer answer/);
    expect(validateQuestionBank(bank({ originals: [original({ options: ["a", "a", "c", "d"] })] })).join()).toMatch(/distinct/);
  });

  it("requires a named, dated, independent reviewer before approval", () => {
    expect(validateQuestionBank(bank({ originals: [original({ review: { reviewer: null, status: "approved" } })] })).join()).toMatch(/named reviewer/);
    expect(validateQuestionBank(bank({ originals: [original({ review: { reviewer: "AjaySahuPhysics", date: "2026-11-19", status: "approved" } })] })).join()).toMatch(/independent/);
    const pending = original({ review: { reviewer: null, status: "pending" }, status: "in-review" });
    expect(validateQuestionBank(bank({ originals: [pending] }))).toEqual([]);
    expect(isOriginalPublishable(pending)).toBe(false);
  });
});

describe("question bank: genuine PYQs", () => {
  it("is publishable only when verified, rights-cleared and with an approved solution", () => {
    expect(isPyqPublishable(pyq())).toBe(true);
    expect(isPyqPublishable(pyq({ rights: { status: "pending-legal-review" } }))).toBe(false);
    expect(isPyqPublishable(pyq({ authenticity: { status: "pending" } }))).toBe(false);
    expect(isPyqPublishable(pyq({ solution: { text: "s", author: "A", review: { reviewer: null, status: "pending" } } }))).toBe(false);
    expect(validateQuestionBank(bank({ pyqs: [pyq({ rights: { status: "pending-legal-review" } })] })).join()).toMatch(/approved PYQs must be verified, rights-cleared/);
    // Pending PYQs may sit in the bank as drafts.
    expect(validateQuestionBank(bank({ pyqs: [pyq({ status: "draft", rights: { status: "pending-legal-review" } })] }))).toEqual([]);
  });

  it("rejects non-official sources, missing file hashes and exams that didn't run", () => {
    expect(validateQuestionBank(bank({ pyqs: [pyq({ source: { ...pyq().source, url: "https://coaching.example.com/neet.pdf" } })] })).join()).toMatch(/not an official exam domain/);
    expect(validateQuestionBank(bank({ pyqs: [pyq({ source: { ...pyq().source, fileSha256: "" } })] })).join()).toMatch(/SHA-256/);
    expect(validateQuestionBank(bank({ pyqs: [pyq({ id: "pyq-neet-2015-x-q1", year: 2015 })] })).join()).toMatch(/neet did not run in 2015/);
    expect(validateQuestionBank(bank({ pyqs: [pyq({ id: "pyq-jee-main-2012-x-q1", exam: "jee-main", year: 2012 })] })).join()).toMatch(/did not run in 2012/);
  });

  it("rejects legacy positional IDs and IDs that don't match the exam and year", () => {
    expect(validateQuestionBank(bank({ pyqs: [pyq({ id: "12" })] })).join()).toMatch(/legacy positional IDs/);
    expect(validateQuestionBank(bank({ pyqs: [pyq({ id: "pyq-neet-2023-x-q1" })] })).join()).toMatch(/must start with pyq-neet-2024/);
  });

  it("requires a recorded basis for rights clearance and who/when for verification", () => {
    expect(validateQuestionBank(bank({ pyqs: [pyq({ rights: { status: "cleared" } })] })).join()).toMatch(/recorded basis/);
    expect(validateQuestionBank(bank({ pyqs: [pyq({ authenticity: { status: "verified" } })] })).join()).toMatch(/who and when/);
  });

  it("rejects decorated and alias self-review, for originals and PYQ solutions (shared identity rule)", () => {
    const self = { reviewer: "Ajay Sahu", date: "2026-11-19", status: "approved" as const };
    expect(validateQuestionBank(bank({ originals: [original({ author: "AjaySahuPhysics (draft)", review: self })] })).join()).toMatch(/reviewer must be independent/);
    expect(validateQuestionBank(bank({ originals: [original({ author: "ajaysahuphysics", review: { ...self, reviewer: "AjaySahuPhysics (editor)" } })] })).join()).toMatch(/reviewer must be independent/);
    expect(validateQuestionBank(bank({ pyqs: [pyq({ solution: { text: "Independent solution.", author: "AjaySahuPhysics (draft)", review: self } })] })).join()).toMatch(/reviewer must be independent/);
    expect(validateQuestionBank(bank({ originals: [original({ review: { ...self, reviewer: "( )" } })] })).join()).toMatch(/approved without a named reviewer/);
    expect(validateQuestionBank(bank())).toEqual([]);
  });

  it("rejects impossible dates in approvals, retrieval and verification", () => {
    const IMPOSSIBLE = "2026-02-30";
    expect(validateQuestionBank(bank({ originals: [original({ review: { reviewer: "Independent Reviewer", date: IMPOSSIBLE, status: "approved" } })] })).join()).toMatch(/no valid date/);
    const p = pyq();
    expect(validateQuestionBank(bank({ pyqs: [pyq({ source: { ...p.source, retrievedOn: IMPOSSIBLE } })] })).join()).toMatch(/retrievedOn/);
    expect(validateQuestionBank(bank({ pyqs: [pyq({ authenticity: { ...p.authenticity, verifiedOn: IMPOSSIBLE } })] })).join()).toMatch(/who and when/);
  });
});

describe("DPP sets", () => {
  it("are selections of original questions only", () => {
    const set = { id: "dpp-c11-units-1", chapterId: "c11-units-and-measurements", title: "DPP 1", questionIds: ["q-c11-units-0001"] };
    expect(validateQuestionBank(bank({ dppSets: [set] }))).toEqual([]);
    expect(validateQuestionBank(bank({ dppSets: [{ ...set, questionIds: ["pyq-neet-2024-x1-q12"] }] })).join()).toMatch(/only contain original questions/);
    expect(validateQuestionBank(bank({ dppSets: [{ ...set, questionIds: ["q-missing"] }] })).join()).toMatch(/unknown question/);
    expect(validateQuestionBank(bank({ dppSets: [{ ...set, questionIds: ["q-c11-units-0001", "q-c11-units-0001"] }] })).join()).toMatch(/appears twice/);
    expect(validateQuestionBank(bank({ originals: [original({ status: "retired" })], dppSets: [set] })).join()).toMatch(/retired question/);
  });

  it("IDs are unique across the whole bank", () => {
    expect(validateQuestionBank(bank({ originals: [original(), original()] })).join()).toMatch(/duplicate id/);
  });
});

describe("duplicate question text", () => {
  const second = (question: string, over: Partial<OriginalQuestion> = {}) => original({ id: "q-c11-units-0002", question, ...over });

  it("rejects two live originals with the same text, ignoring case and spacing", () => {
    expect(validateQuestionBank(bank({ originals: [original(), second("  placeholder   QUESTION? ")] })).join()).toMatch(/q-c11-units-0002: same question text as q-c11-units-0001/);
  });

  it("allows a retired original to share text with its replacement", () => {
    expect(validateQuestionBank(bank({ originals: [original(), second("Placeholder question?", { status: "retired" })] }))).toEqual([]);
  });

  it("rejects an original that reuses a PYQ's text", () => {
    expect(validateQuestionBank(bank({ originals: [original({ question: "Placeholder" })] })).join()).toMatch(/must not reuse the text of PYQ pyq-neet-2024-x1-q12/);
  });

  it("allows the same question in two genuine papers (exams repeat questions)", () => {
    const repeat = pyq({ id: "pyq-neet-2025-x1-q3", year: 2025, officialQuestionNumber: 3 });
    expect(validateQuestionBank(bank({ pyqs: [pyq(), repeat] }))).toEqual([]);
  });
});
