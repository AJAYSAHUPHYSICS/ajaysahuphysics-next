// ─────────────────────────────────────────────────────────────────
// Daily Targets (pure function, nothing persisted)
//
// Deliberately does NOT re-select which chapters need attention today
// — that's already M15's job (study-plan.ts's buildDailyStudyPlan,
// which ranks by urgency and balances by subject). This module only
// buckets that already-ranked task list by which active goal each
// task counts toward, so "Finish 2 DPP" always means 2 of today's
// *actual* planned tasks, not a second independent selection that
// could disagree with the planner.
// ─────────────────────────────────────────────────────────────────

import type { DailyStudyPlan, StudyTask, StudyTaskCategory } from "./study-plan";
import type { RevisionEntry } from "./revision";
import { nextIncompleteRound } from "./goal-progress";
import { GOAL_UNIT_LABEL, GOAL_VERB, type GoalType } from "./goal-types";

export type DailyTarget = {
  type: GoalType;
  count: number;
  message: string;
};

const CATEGORY_TO_GOAL: Partial<Record<StudyTaskCategory, GoalType>> = {
  "incomplete-pyq": "pyq",
  "incomplete-dpp": "dpp",
  "formula-sheet": "formulaSheet",
  notes: "notes",
};

const REVISION_GOAL_BY_ROUND: Record<1 | 2 | 3, GoalType> = {
  1: "revision1",
  2: "revision2",
  3: "revision3",
};

function goalForTask(task: StudyTask, revisionEntries: Record<string, RevisionEntry[]>): GoalType | null {
  if (task.category === "overdue-revision") {
    const key = `${task.cls}:${task.slug}`;
    const round = nextIncompleteRound(revisionEntries[key] ?? []);
    return round !== null ? REVISION_GOAL_BY_ROUND[round] : null;
  }
  return CATEGORY_TO_GOAL[task.category] ?? null;
}

function buildMessage(type: GoalType, count: number): string {
  const unit = GOAL_UNIT_LABEL[type];
  return `${GOAL_VERB[type]} ${count} ${count === 1 ? unit.singular : unit.plural}`;
}

export function buildDailyTargets(
  activeGoals: GoalType[],
  plan: DailyStudyPlan,
  revisionEntries: Record<string, RevisionEntry[]>,
  goalRemaining: Partial<Record<GoalType, number>>
): DailyTarget[] {
  const activeSet = new Set(activeGoals);
  const counts = new Map<GoalType, number>();
  const chaptersTouched = new Set<string>();

  for (const task of plan.tasks) {
    chaptersTouched.add(`${task.cls}:${task.slug}`);
    const goal = goalForTask(task, revisionEntries);
    if (goal && activeSet.has(goal)) {
      counts.set(goal, (counts.get(goal) ?? 0) + 1);
    }
  }

  // "allChapters" isn't a single task category — it's advanced by any
  // chapter today's plan touches at all.
  if (activeSet.has("allChapters")) {
    counts.set("allChapters", chaptersTouched.size);
  }

  const targets: DailyTarget[] = [];
  for (const type of activeGoals) {
    const remaining = goalRemaining[type] ?? 0;
    if (remaining <= 0) continue; // goal already complete
    const count = Math.min(counts.get(type) ?? 0, remaining);
    if (count <= 0) continue; // nothing in today's plan advances this goal right now
    targets.push({ type, count, message: buildMessage(type, count) });
  }
  return targets;
}
