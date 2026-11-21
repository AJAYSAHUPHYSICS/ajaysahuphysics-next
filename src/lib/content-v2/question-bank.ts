// ─────────────────────────────────────────────────────────────────
// Question bank architecture (rebuilt content; NOT wired to the site)
//
// Two strictly separate kinds of question:
//   • OriginalQuestion: written by AjaySahuPhysics, labelled as practice,
//     NEVER carrying an exam/year label.
//   • GenuinePyq: a question that actually appeared in an official paper,
//     publishable ONLY when authenticity is verified against the official
//     paper AND reproduction rights are cleared AND the independently
//     written solution is approved.
// DPP sets are selections of original question IDs (never PYQs).
// No legacy PYQ is migrated into this bank.
// ─────────────────────────────────────────────────────────────────

import { isCalendarDate, isSameIdentity, normaliseIdentity } from "./chapter-package";

export type Difficulty = "easy" | "medium" | "hard";
export type ExamStyle = "board" | "neet" | "jee-main" | "jee-advanced";
export type QuestionFormat =
  | "single-correct"
  | "multi-correct"
  | "integer"
  | "numerical"
  | "assertion-reason"
  | "short-answer"
  | "long-answer";

export type QuestionReview = { reviewer: string | null; date?: string; status: "pending" | "approved" | "changes-requested" };

export type Answer =
  | { kind: "options"; correctIndices: number[] }
  | { kind: "integer"; value: number }
  | { kind: "numerical"; value: number; tolerance: number; unit: string }
  | { kind: "text"; modelAnswer: string };

export type OriginalQuestion = {
  kind: "original";
  /** Stable forever, e.g. "q-c11-units-0007". Retire, never reuse. */
  id: string;
  chapterId: string;
  topicIds: string[];
  difficulty: Difficulty;
  examStyle: ExamStyle;
  format: QuestionFormat;
  question: string;
  options?: string[];
  answer: Answer;
  solution: string;
  author: string;
  review: QuestionReview;
  status: "draft" | "in-review" | "approved" | "retired";
};

export type GenuinePyq = {
  kind: "pyq";
  /** e.g. "pyq-neet-2024-code-q12". Never a legacy array position. */
  id: string;
  chapterId: string;
  topicIds: string[];
  exam: "neet" | "jee-main" | "jee-advanced" | "cbse";
  year: number;
  paper: { session?: string; shift?: string; date?: string; code?: string; paperNo?: 1 | 2 };
  /** Number in the OFFICIAL paper (never a coaching book's numbering). */
  officialQuestionNumber: number;
  format: QuestionFormat;
  question: string;
  options?: string[];
  answer: Answer;
  source: { kind: "official-paper" | "official-answer-key"; url: string; retrievedOn: string; fileSha256: string };
  authenticity: { status: "pending" | "verified" | "rejected"; verifiedBy?: string; verifiedOn?: string; method?: string };
  rights: { status: "pending-legal-review" | "cleared" | "refused"; basis?: string; documentRef?: string };
  solution: { text: string; author: string; review: QuestionReview };
  status: "draft" | "in-review" | "approved" | "retired";
};

export type DppSet = { id: string; chapterId: string; title: string; questionIds: string[] };

export type QuestionBank = { originals: OriginalQuestion[]; pyqs: GenuinePyq[]; dppSets: DppSet[] };

/** Official domains for PYQ sources (PYQ policy §2). */
export const OFFICIAL_PYQ_DOMAINS = ["nta.ac.in", "nta.nic.in", "jeeadv.ac.in", "cbseacademic.nic.in", "cbse.gov.in"] as const;

/** Years each exam actually ran under that name (prevents impossible labels). */
export const EXAM_CALENDAR: Record<GenuinePyq["exam"], (year: number) => boolean> = {
  neet: (y) => y === 2013 || (y >= 2016 && y <= 2100),
  "jee-main": (y) => y >= 2013 && y <= 2100,
  "jee-advanced": (y) => y >= 2013 && y <= 2100,
  cbse: (y) => y >= 1990 && y <= 2100,
};

const ORIGINAL_ID = /^q-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PYQ_ID = /^pyq-(neet|jee-main|jee-advanced|cbse)-(19|20)\d\d(?:-[a-z0-9]+)+$/;
const EXAM_YEAR = /\b(neet|aipmt|aiims|jee|iit)\b[^.]{0,20}\b(19|20)\d\d\b/i;
const PYQ_WORDING = /\bpyqs?\b|previous[- ]year|past[- ]paper|asked in (the )?(neet|jee|aipmt|aiims|cbse)/i;
const blank = (s?: string | null) => !s || !s.trim();

function checkAnswer(id: string, format: QuestionFormat, options: string[] | undefined, a: Answer, errors: string[]) {
  const mcq = format === "single-correct" || format === "multi-correct" || format === "assertion-reason";
  if (mcq) {
    if (!options || options.length !== 4) errors.push(`${id}: ${format} needs exactly 4 options`);
    else if (new Set(options.map((o) => o.trim().toLowerCase())).size !== 4) errors.push(`${id}: options must be distinct`);
    if (a.kind !== "options") errors.push(`${id}: ${format} needs an options answer`);
    else {
      if (a.correctIndices.some((i) => !Number.isInteger(i) || i < 0 || i > 3)) errors.push(`${id}: answer index out of range`);
      if (new Set(a.correctIndices).size !== a.correctIndices.length) errors.push(`${id}: duplicate answer index`);
      if ((format === "single-correct" || format === "assertion-reason") && a.correctIndices.length !== 1) errors.push(`${id}: ${format} must have exactly one correct option`);
      if (format === "multi-correct" && a.correctIndices.length < 1) errors.push(`${id}: multi-correct needs at least one correct option`);
    }
  }
  if (format === "integer" && (a.kind !== "integer" || !Number.isInteger(a.value))) errors.push(`${id}: integer format needs an integer answer`);
  if (format === "numerical") {
    if (a.kind !== "numerical") errors.push(`${id}: numerical format needs a numerical answer`);
    else {
      if (!Number.isFinite(a.value) || !(a.tolerance >= 0)) errors.push(`${id}: numerical answer needs a value and a non-negative tolerance`);
      if (blank(a.unit)) errors.push(`${id}: numerical answer needs a unit (or "dimensionless")`);
    }
  }
  if ((format === "short-answer" || format === "long-answer") && (a.kind !== "text" || blank(a.modelAnswer))) errors.push(`${id}: ${format} needs a model answer`);
}

function checkReview(id: string, r: QuestionReview, author: string, errors: string[]) {
  if (r.status === "approved") {
    const reviewer = typeof r.reviewer === "string" ? r.reviewer : "";
    if (normaliseIdentity(reviewer) === "") errors.push(`${id}: approved without a named reviewer`);
    if (!isCalendarDate(r.date)) errors.push(`${id}: approval has no valid date (YYYY-MM-DD)`);
    if (isSameIdentity(reviewer, author ?? "")) errors.push(`${id}: reviewer must be independent of the author`);
  }
}

/** True only for a PYQ that may be shown to students. */
export function isPyqPublishable(q: GenuinePyq): boolean {
  return (
    q.status === "approved" &&
    q.authenticity.status === "verified" &&
    q.rights.status === "cleared" &&
    q.solution.review.status === "approved"
  );
}

export function isOriginalPublishable(q: OriginalQuestion): boolean {
  return q.status === "approved" && q.review.status === "approved";
}

/** Every rule violation in a bank (empty = valid). */
export function validateQuestionBank(bank: QuestionBank): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const dup = (id: string) => {
    if (ids.has(id)) errors.push(`duplicate id ${id}`);
    ids.add(id);
  };

  for (const q of bank.originals) {
    dup(q.id);
    if (!ORIGINAL_ID.test(q.id)) errors.push(`${q.id}: original question IDs look like "q-…"`);
    if (blank(q.question) || blank(q.solution)) errors.push(`${q.id}: question and solution are required`);
    if (q.topicIds.length === 0) errors.push(`${q.id}: at least one topic is required`);
    if (EXAM_YEAR.test(q.question) || PYQ_WORDING.test(q.question)) errors.push(`${q.id}: an original question must not be presented as a PYQ`);
    checkAnswer(q.id, q.format, q.options, q.answer, errors);
    if (blank(q.author)) errors.push(`${q.id}: author missing`);
    checkReview(q.id, q.review, q.author, errors);
    if (q.status === "approved" && q.review.status !== "approved") errors.push(`${q.id}: status approved but review is ${q.review.status}`);
  }

  for (const q of bank.pyqs) {
    dup(q.id);
    if (!PYQ_ID.test(q.id)) errors.push(`${q.id}: PYQ IDs look like "pyq-<exam>-<year>-…"`);
    if (/^\d+$/.test(q.id) || /#\d+$/.test(q.id)) errors.push(`${q.id}: legacy positional IDs are not allowed`);
    if (!EXAM_CALENDAR[q.exam](q.year)) errors.push(`${q.id}: ${q.exam} did not run in ${q.year}`);
    if (!PYQ_ID.test(q.id) || !q.id.startsWith(`pyq-${q.exam}-${q.year}`)) errors.push(`${q.id}: ID must start with pyq-${q.exam}-${q.year}`);
    if (!Number.isInteger(q.officialQuestionNumber) || q.officialQuestionNumber < 1) errors.push(`${q.id}: official question number required`);
    let host = "";
    try {
      host = new URL(q.source.url).hostname;
    } catch {
      errors.push(`${q.id}: source URL invalid`);
    }
    if (host && !OFFICIAL_PYQ_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`))) errors.push(`${q.id}: source is not an official exam domain`);
    if (!/^[0-9a-f]{64}$/.test(q.source.fileSha256)) errors.push(`${q.id}: official file SHA-256 missing`);
    checkAnswer(q.id, q.format, q.options, q.answer, errors);
    if (blank(q.solution.text) || blank(q.solution.author)) errors.push(`${q.id}: an independently written solution is required`);
    checkReview(q.id, q.solution.review, q.solution.author, errors);
    if (!isCalendarDate(q.source.retrievedOn)) errors.push(`${q.id}: source retrievedOn (YYYY-MM-DD) missing`);
    if (q.authenticity.status === "verified" && (blank(q.authenticity.verifiedBy) || !isCalendarDate(q.authenticity.verifiedOn))) errors.push(`${q.id}: verification needs who and when (YYYY-MM-DD)`);
    if (q.rights.status === "cleared" && blank(q.rights.basis)) errors.push(`${q.id}: rights clearance needs a recorded basis`);
    if (q.status === "approved" && !isPyqPublishable(q)) errors.push(`${q.id}: approved PYQs must be verified, rights-cleared and have an approved solution`);
  }

  // Duplicate question text. The legacy banks had copies (e.g. one question
  // in two chapters), which the ID rules can't catch. Two live originals
  // must not share a text, and an original must not reuse a PYQ's text.
  // Two PYQs may: real exams do repeat questions across years.
  const textKey = (s: string) => s.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
  const pyqByText = new Map(bank.pyqs.filter((q) => !blank(q.question)).map((q) => [textKey(q.question), q.id]));
  const originalByText = new Map<string, string>();
  for (const q of bank.originals) {
    if (q.status === "retired" || blank(q.question)) continue;
    const k = textKey(q.question);
    const other = originalByText.get(k);
    if (other) errors.push(`${q.id}: same question text as ${other}`);
    else originalByText.set(k, q.id);
    const copied = pyqByText.get(k);
    if (copied) errors.push(`${q.id}: an original question must not reuse the text of PYQ ${copied}`);
  }

  const originals = new Map(bank.originals.map((q) => [q.id, q]));
  const pyqIds = new Set(bank.pyqs.map((q) => q.id));
  for (const set of bank.dppSets) {
    if (new Set(set.questionIds).size !== set.questionIds.length) errors.push(`${set.id}: a question appears twice`);
    for (const id of set.questionIds) {
      if (pyqIds.has(id)) errors.push(`${set.id}: DPP sets may only contain original questions (found PYQ ${id})`);
      else if (!originals.has(id)) errors.push(`${set.id}: unknown question ${id}`);
      else if (originals.get(id)!.status === "retired") errors.push(`${set.id}: retired question ${id}`);
    }
  }
  return errors;
}
