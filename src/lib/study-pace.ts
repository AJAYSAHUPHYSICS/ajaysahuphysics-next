// ─────────────────────────────────────────────────────────────────
// Study Pace (pure function, no storage of its own)
//
// One shared "how many completions per day, recently" helper — reused
// by goal-forecast.ts (target date) and, indirectly through it, by
// goal-recommendations.ts. Reads only the activity-log entries
// checklist.ts and revision.ts already write; adds no new logging.
//
// Matching is by the exact label those two modules already log
// ("Notes completed", "Revision 2", etc.) — no parallel completion
// concept, just a filter over existing log text.
// ─────────────────────────────────────────────────────────────────

import { filterLastDays, type ActivityEvent } from "./activity-log";
import type { GoalType } from "./goal-types";

const GOAL_LOG_LABEL: Partial<Record<GoalType, string>> = {
  notes: "Notes completed",
  formulaSheet: "Formula Sheet revised",
  dpp: "DPP completed",
  pyq: "PYQs solved",
  revision1: "Revision 1",
  revision2: "Revision 2",
  revision3: "Revision 3",
};

export type GoalPace = {
  /** Completions per day, averaged over the window. */
  perDay: number;
  windowDays: number;
  sampleCount: number;
};

const DEFAULT_WINDOW_DAYS = 14;

/** "allChapters" has no single log label — any resource or revision
 * completion is progress toward it, so pace is a general activity-rate
 * proxy rather than a literal chapters-per-day count. Documented here
 * rather than silently approximated elsewhere. */
function matchesGoal(event: ActivityEvent, type: GoalType): boolean {
  if (type === "allChapters") {
    return event.type === "resource-completed" || event.type === "revision-completed";
  }
  return event.label === GOAL_LOG_LABEL[type];
}

export function computeGoalPace(
  type: GoalType,
  events: ActivityEvent[],
  windowDays: number = DEFAULT_WINDOW_DAYS,
  now: number = Date.now()
): GoalPace {
  const windowed = filterLastDays(events, windowDays, now);
  const sampleCount = windowed.filter((e) => matchesGoal(e, type)).length;
  const effectiveWindow = Math.max(1, windowDays);
  return { perDay: sampleCount / effectiveWindow, windowDays: effectiveWindow, sampleCount };
}
