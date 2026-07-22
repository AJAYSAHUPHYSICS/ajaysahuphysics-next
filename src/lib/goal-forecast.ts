// ─────────────────────────────────────────────────────────────────
// Target Date Forecast (pure function, no storage of its own)
//
// Estimates when an active goal will be finished from recent study
// pace (study-pace.ts), and whether that pace is accelerating,
// steady, or slowing relative to the student's own baseline since
// activating the goal — reusing goal-progress.ts's completed/total
// counts as-is, no re-derivation of "done".
// ─────────────────────────────────────────────────────────────────

import type { ActivityEvent } from "./activity-log";
import { computeGoalPace } from "./study-pace";
import type { GoalProgress } from "./goal-progress";

export type GoalForecastStatus = "complete" | "ahead" | "on-track" | "behind" | "no-data";

export type GoalForecast = {
  status: GoalForecastStatus;
  /** Estimated completion timestamp, or null when there isn't enough
   * pace data yet to project one. */
  estimatedCompletionAt: number | null;
  daysRemaining: number | null;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const RECENT_WINDOW_DAYS = 7;
const BASELINE_WINDOW_DAYS = 30;
const AHEAD_RATIO = 1.2;
const BEHIND_RATIO = 0.8;

export function computeGoalForecast(
  progress: GoalProgress,
  activatedAt: number,
  events: ActivityEvent[],
  now: number = Date.now()
): GoalForecast {
  const remaining = progress.total - progress.completed;
  if (progress.total === 0 || remaining <= 0) {
    return { status: "complete", estimatedCompletionAt: null, daysRemaining: 0 };
  }

  const recent = computeGoalPace(progress.type, events, RECENT_WINDOW_DAYS, now);
  const daysSinceActivation = Math.max(1, Math.round((now - activatedAt) / DAY_MS));
  const baseline = computeGoalPace(
    progress.type,
    events,
    Math.min(daysSinceActivation, BASELINE_WINDOW_DAYS),
    now
  );

  if (recent.sampleCount === 0 && baseline.sampleCount === 0) {
    return { status: "no-data", estimatedCompletionAt: null, daysRemaining: null };
  }

  // Prefer the recent rate for the actual projection (it reflects how
  // the student is doing right now); fall back to baseline only if
  // there's been no activity in the recent window at all.
  const effectivePace = recent.perDay > 0 ? recent.perDay : baseline.perDay;
  const daysRemaining = effectivePace > 0 ? Math.ceil(remaining / effectivePace) : null;
  const estimatedCompletionAt = daysRemaining !== null ? now + daysRemaining * DAY_MS : null;

  let status: GoalForecastStatus = "on-track";
  if (baseline.perDay > 0) {
    if (recent.perDay >= baseline.perDay * AHEAD_RATIO) status = "ahead";
    else if (recent.perDay <= baseline.perDay * BEHIND_RATIO) status = "behind";
  } else if (recent.perDay > 0) {
    status = "ahead"; // any recent pace beats a zero baseline
  }

  return { status, estimatedCompletionAt, daysRemaining };
}

const STATUS_LABEL: Record<GoalForecastStatus, string> = {
  complete: "Complete",
  ahead: "Ahead",
  "on-track": "On track",
  behind: "Behind",
  "no-data": "Not enough data yet",
};

export function forecastStatusLabel(status: GoalForecastStatus): string {
  return STATUS_LABEL[status];
}
