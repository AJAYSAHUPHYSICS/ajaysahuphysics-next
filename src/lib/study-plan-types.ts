// ─────────────────────────────────────────────────────────────────
// Shared Study Plan types — split from study-plan.ts so study-time.ts
// (and anything else needing just the category union) doesn't have to
// import the whole planner algorithm.
// ─────────────────────────────────────────────────────────────────

export type StudyTaskCategory =
  | "overdue-revision"
  | "unresolved-mistakes"
  | "weak-chapter"
  | "incomplete-pyq"
  | "incomplete-dpp"
  | "formula-sheet"
  | "notes"
  | "bookmark";

export type StudyTask = {
  cls: "11" | "12";
  slug: string;
  chapterName: string;
  category: StudyTaskCategory;
  /** Why this task is here — M15 Task 8's requirement that every
   * recommendation explains itself. */
  reason: string;
  path: string;
  estimatedMinutes: number;
};
