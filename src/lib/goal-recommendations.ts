// ─────────────────────────────────────────────────────────────────
// Smart Recommendations (pure function)
//
// Deterministic coaching sentences built entirely from goal-forecast.ts's
// status per active goal and revision-health.ts's overdue count — no
// randomness, no new counting. Every recommendation carries its own
// `reason` field (M16 Task 8's explicit requirement that every
// recommendation explain itself), mirroring study-plan-types.ts's
// StudyTask.reason convention from M15.
// ─────────────────────────────────────────────────────────────────

import type { GoalForecast } from "./goal-forecast";
import type { GoalProgress } from "./goal-progress";
import type { RevisionHealth } from "./revision-health";
import { GOAL_LABEL, type GoalType } from "./goal-types";

export type Recommendation = { message: string; reason: string };

export function buildGoalRecommendations(
  activeGoals: GoalType[],
  progressByGoal: Partial<Record<GoalType, GoalProgress>>,
  forecastByGoal: Partial<Record<GoalType, GoalForecast>>,
  health: RevisionHealth
): Recommendation[] {
  const recs: Recommendation[] = [];

  for (const type of activeGoals) {
    const forecast = forecastByGoal[type];
    const progress = progressByGoal[type];
    if (!forecast || !progress) continue;
    if (forecast.status === "complete") continue; // nothing to recommend for a finished goal

    const remaining = progress.total - progress.completed;

    if (forecast.status === "ahead") {
      recs.push({
        message: `You're ahead of your weekly goal for "${GOAL_LABEL[type]}".`,
        reason: "Your recent pace is well above your usual rate for this goal.",
      });
    } else if (forecast.status === "behind" && remaining > 0) {
      recs.push({
        message: `Complete ${remaining} more to stay on track for "${GOAL_LABEL[type]}".`,
        reason: "Your recent pace has slowed compared to your usual rate for this goal.",
      });
    } else if (forecast.status === "no-data") {
      recs.push({
        message: `Log some progress on "${GOAL_LABEL[type]}" to get a target date.`,
        reason: "No completions have been logged yet for this goal, so a forecast isn't possible.",
      });
    }
  }

  if (health.tier !== null && health.overdueCount > 0) {
    recs.push({
      message: `Revision is becoming overdue for ${health.overdueCount} chapter${
        health.overdueCount === 1 ? "" : "s"
      }.`,
      reason: `${health.overdueCount} chapter${
        health.overdueCount === 1 ? " is" : "s are"
      } past its scheduled revision date.`,
    });
  }

  return recs;
}
