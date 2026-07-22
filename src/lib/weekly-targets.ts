// ─────────────────────────────────────────────────────────────────
// Weekly Targets (pure function, nothing persisted)
//
// Like weekly-plan.ts (M15 Task 6), recomputed fresh on every render
// with no storage key of its own. Deliberately does not re-select
// chapters the way weekly-plan.ts's day-by-day layout does — a
// student's active goals aren't chapter-scoped, so there's nothing
// for a second selection to disagree with. Instead this scales the
// same canonical study-pace.ts rate goal-forecast.ts uses, over 7
// days, capped at what's actually left.
// ─────────────────────────────────────────────────────────────────

import type { ActivityEvent } from "./activity-log";
import { computeGoalPace } from "./study-pace";
import { GOAL_UNIT_LABEL, GOAL_VERB, type GoalType } from "./goal-types";

export type WeeklyTarget = { type: GoalType; count: number; message: string };

const RECENT_WINDOW_DAYS = 7;
const WEEK_DAYS = 7;

function buildMessage(type: GoalType, count: number): string {
  const unit = GOAL_UNIT_LABEL[type];
  return `${GOAL_VERB[type]} ${count} ${count === 1 ? unit.singular : unit.plural} this week`;
}

export function buildWeeklyTargets(
  activeGoals: GoalType[],
  events: ActivityEvent[],
  goalRemaining: Partial<Record<GoalType, number>>,
  now: number = Date.now()
): WeeklyTarget[] {
  const targets: WeeklyTarget[] = [];
  for (const type of activeGoals) {
    const remaining = goalRemaining[type] ?? 0;
    if (remaining <= 0) continue; // goal already complete

    const pace = computeGoalPace(type, events, RECENT_WINDOW_DAYS, now);
    // A pace of zero still nudges toward at least 1/week rather than
    // suggesting nothing — but never more than what's actually left.
    const projected = Math.max(1, Math.round(pace.perDay * WEEK_DAYS));
    const count = Math.min(remaining, projected);

    targets.push({ type, count, message: buildMessage(type, count) });
  }
  return targets;
}
