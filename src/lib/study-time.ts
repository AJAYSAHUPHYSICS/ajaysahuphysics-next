// ─────────────────────────────────────────────────────────────────
// Study Time Estimates (pure lookup, no storage)
//
// Fixed per-task-type duration estimates, shared by the daily and
// weekly planners so "25 min for Notes" means the same thing in both.
// ─────────────────────────────────────────────────────────────────

import type { StudyTaskCategory } from "./study-plan-types";

export const TASK_DURATION_MINUTES: Record<StudyTaskCategory, number> = {
  "overdue-revision": 15,
  "unresolved-mistakes": 15,
  "weak-chapter": 20,
  "incomplete-pyq": 40,
  "incomplete-dpp": 30,
  "formula-sheet": 10,
  notes: 25,
  bookmark: 20,
};

export function sumEstimatedMinutes(tasks: { estimatedMinutes: number }[]): number {
  return tasks.reduce((sum, t) => sum + t.estimatedMinutes, 0);
}
