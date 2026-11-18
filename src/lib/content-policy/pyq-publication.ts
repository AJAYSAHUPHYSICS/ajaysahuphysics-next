import type { ChapterPyq, PyqQuestion } from "@/lib/pyq/kinematics";

// ─────────────────────────────────────────────────────────────────
// PYQ publication policy (Phase 2A)
//
// Decides which previous-year questions may be shown to students.
// A question is publishable ONLY when ALL of these hold:
//   1. it has been verified against the official exam paper
//      (`verification.status === "verified"`);
//   2. the right to reproduce it has been established separately
//      (`rights.status === "cleared"`). A paper being publicly
//      available does NOT clear this;
//   3. its exam label is not a retired category (AIIMS: the AIIMS MBBS
//      entrance never had officially released papers).
//
// None of the existing (legacy) records carries verification or
// rights data, so every one of them is withheld. That covers the
// questions recorded as derived from coaching material, those with no recorded
// source, and all AIIMS-labelled questions, without editing or
// reordering a single legacy record.
//
// The legacy data files are never filtered in place. Callers use
// `publicPyqView()`, which keeps each question's ORIGINAL position as
// its identifier. Students' saved mistakes store that position
// (`questionId`), so it must never shift.
// ─────────────────────────────────────────────────────────────────

export type PyqVerification = {
  status: "verified" | "pending" | "rejected";
  /** Official paper URL the question was checked against. Never invented. */
  sourceUrl?: string;
  verifiedBy?: string;
  verifiedOn?: string;
};

export type PyqRights = {
  status: "cleared" | "pending-legal-review";
  notes?: string;
};

/** A PYQ record that may carry governance data. Legacy records have neither field. */
export type GovernedPyqQuestion = PyqQuestion & {
  verification?: PyqVerification;
  rights?: PyqRights;
};

/** Exam labels that are retired and must never be shown. */
export const RETIRED_EXAM_LABEL_PATTERNS: readonly RegExp[] = [/\baiims\b/i];

export function isRetiredExamLabel(label: string): boolean {
  return RETIRED_EXAM_LABEL_PATTERNS.some((re) => re.test(label));
}

export function isPublishablePyq(q: GovernedPyqQuestion): boolean {
  return (
    q.verification?.status === "verified" &&
    q.rights?.status === "cleared" &&
    !isRetiredExamLabel(q.exam)
  );
}

export type PublicPyqView = {
  /** Only the publishable questions, in their original relative order. */
  pyq: ChapterPyq;
  /** questionIds[i] is the ORIGINAL position of pyq.questions[i], as a string. */
  questionIds: string[];
};

/** Filters a chapter's PYQs to the publishable ones, keeping original positions as IDs. */
export function publicPyqView(pyq: ChapterPyq): PublicPyqView {
  const kept = pyq.questions
    .map((q, originalIndex) => ({ q: q as GovernedPyqQuestion, originalIndex }))
    .filter(({ q }) => isPublishablePyq(q));
  return {
    pyq: { ...pyq, questions: kept.map(({ q }) => q) },
    questionIds: kept.map(({ originalIndex }) => String(originalIndex)),
  };
}

/**
 * The identifier saved with a PYQ mistake for the question at `idx` of a
 * (possibly filtered) list: its original position when `questionIds` is
 * given, otherwise `idx` itself (the pre-Phase-2A behaviour, correct only
 * for an unfiltered list). The stored format is unchanged: a numeric string.
 */
export function pyqQuestionId(questionIds: readonly string[] | undefined, idx: number): string {
  return questionIds?.[idx] ?? String(idx);
}

export type PyqExamAvailability = { neet: boolean; jeeMain: boolean; jeeAdvanced: boolean };

/** Which exam groups have at least one publishable question (NEET = no examType). */
export function publicPyqExamAvailability(pyq: ChapterPyq): PyqExamAvailability {
  const qs = publicPyqView(pyq).pyq.questions;
  return {
    neet: qs.some((q) => !q.examType),
    jeeMain: qs.some((q) => q.examType === "jee-main"),
    jeeAdvanced: qs.some((q) => q.examType === "jee-advanced"),
  };
}
