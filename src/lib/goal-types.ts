// ─────────────────────────────────────────────────────────────────
// Shared Study Goal types — split out the same way study-plan-types.ts
// is split from study-plan.ts, so any module needing just the type
// union (study-goals.ts, goal-progress.ts, cards) doesn't have to
// import the heavier computation modules.
// ─────────────────────────────────────────────────────────────────

export type GoalType =
  | "notes"
  | "formulaSheet"
  | "dpp"
  | "pyq"
  | "revision1"
  | "revision2"
  | "revision3"
  | "allChapters";

export const GOAL_TYPES: GoalType[] = [
  "notes",
  "formulaSheet",
  "dpp",
  "pyq",
  "revision1",
  "revision2",
  "revision3",
  "allChapters",
];

export const GOAL_LABEL: Record<GoalType, string> = {
  notes: "Finish all Notes",
  formulaSheet: "Complete Formula Sheets",
  dpp: "Complete all DPP",
  pyq: "Complete all PYQ",
  revision1: "Finish Revision Round 1",
  revision2: "Finish Revision Round 2",
  revision3: "Finish Revision Round 3",
  allChapters: "Complete all chapters",
};

/** Short noun used in generated target sentences, e.g. "Finish 2 DPP". */
export const GOAL_UNIT_LABEL: Record<GoalType, { singular: string; plural: string }> = {
  notes: { singular: "Notes chapter", plural: "Notes chapters" },
  formulaSheet: { singular: "Formula Sheet", plural: "Formula Sheets" },
  dpp: { singular: "DPP", plural: "DPP" },
  pyq: { singular: "PYQ", plural: "PYQ" },
  revision1: { singular: "chapter", plural: "chapters" },
  revision2: { singular: "chapter", plural: "chapters" },
  revision3: { singular: "chapter", plural: "chapters" },
  allChapters: { singular: "chapter", plural: "chapters" },
};

/** Verb used in generated target sentences — "Finish 2 DPP",
 * "Complete 1 PYQ", "Revise 3 chapters" (M16 Task 3's own examples). */
export const GOAL_VERB: Record<GoalType, string> = {
  notes: "Complete",
  formulaSheet: "Complete",
  dpp: "Finish",
  pyq: "Complete",
  revision1: "Revise",
  revision2: "Revise",
  revision3: "Revise",
  allChapters: "Revise",
};

/** The activity-log event type each goal's pace should be measured
 * against (study-pace.ts). Notes/Formula Sheet/DPP/PYQ all log as
 * "resource-completed"; the three revision goals share
 * "revision-completed" (study-pace filters further by chapter when
 * it needs round-specificity); allChapters tracks whichever of the
 * two moves a chapter across the finish line. */
export const GOAL_ACTIVITY_TYPE: Record<GoalType, "resource-completed" | "revision-completed" | "both"> = {
  notes: "resource-completed",
  formulaSheet: "resource-completed",
  dpp: "resource-completed",
  pyq: "resource-completed",
  revision1: "revision-completed",
  revision2: "revision-completed",
  revision3: "revision-completed",
  allChapters: "both",
};
