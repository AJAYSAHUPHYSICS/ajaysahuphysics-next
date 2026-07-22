// ─────────────────────────────────────────────────────────────────
// Progress Forecast (pure function, no storage of its own)
//
// "Chapters remaining", "resources remaining", "revisions remaining"
// — reuses resource-gaps.ts's counts exactly as computed for the
// existing Resource Gaps card, and chapter-progress.ts's percent for
// the chapters-remaining count. The only new number here is estimated
// days, from study-pace.ts's shared rate helper.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry } from "./revision";
import type { ActivityEvent } from "./activity-log";
import { filterLastDays } from "./activity-log";
import { getResourceGaps } from "./resource-gaps";
import { computeChapterProgress } from "./chapter-progress";
import { computeGoalPace } from "./study-pace";

export type ForecastEntry = {
  label: string;
  remaining: number;
  total: number;
  /** Null when there's no pace data yet to project from. */
  estimatedDays: number | null;
};

export type ProgressForecast = {
  chaptersRemaining: ForecastEntry;
  resourceForecasts: ForecastEntry[]; // Notes / Formula Sheets / DPP / PYQ / Revision
};

const PACE_WINDOW_DAYS = 14;

const GAP_LABEL_TO_GOAL: Record<string, "notes" | "formulaSheet" | "dpp" | "pyq"> = {
  "Notes remaining": "notes",
  "Formula Sheets remaining": "formulaSheet",
  "DPP remaining": "dpp",
  "PYQ remaining": "pyq",
};

function daysFromPace(remaining: number, perDay: number): number | null {
  if (remaining <= 0) return 0;
  if (perDay <= 0) return null;
  return Math.ceil(remaining / perDay);
}

export function computeProgressForecast(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>,
  events: ActivityEvent[],
  now: number = Date.now()
): ProgressForecast {
  const gaps = getResourceGaps(chapters, checklists, revisionEntries);

  const resourceForecasts: ForecastEntry[] = gaps.map((gap) => {
    if (gap.label === "Revision remaining") {
      const windowed = filterLastDays(events, PACE_WINDOW_DAYS, now);
      const perDay = windowed.filter((e) => e.type === "revision-completed").length / PACE_WINDOW_DAYS;
      return { ...gap, estimatedDays: daysFromPace(gap.remaining, perDay) };
    }
    const goal = GAP_LABEL_TO_GOAL[gap.label];
    const perDay = goal ? computeGoalPace(goal, events, PACE_WINDOW_DAYS, now).perDay : 0;
    return { ...gap, estimatedDays: daysFromPace(gap.remaining, perDay) };
  });

  // Chapters remaining — same "not yet at 100%" definition weak-chapters.ts
  // and the M9 dashboard's "Continue Studying" section already use.
  let chaptersRemaining = 0;
  let chaptersTotal = 0;
  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue;
    chaptersTotal += 1;
    const key = `${ch.cls}:${ch.slug}`;
    const state = checklists[key] ?? {};
    const entries = revisionEntries[key] ?? [];
    const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);
    if (progress.percent < 100) chaptersRemaining += 1;
  }

  const windowed = filterLastDays(events, PACE_WINDOW_DAYS, now);
  const overallPerDay =
    windowed.filter((e) => e.type === "resource-completed" || e.type === "revision-completed").length /
    PACE_WINDOW_DAYS;
  // Chapters-per-day is approximated from overall activity divided by a
  // typical chapter's total units (4 resources + 3 revision rounds) —
  // a rough proxy, not a re-derivation of any existing per-chapter count.
  const chapterPace = overallPerDay / 7;

  return {
    chaptersRemaining: {
      label: "Chapters remaining",
      remaining: chaptersRemaining,
      total: chaptersTotal,
      estimatedDays: daysFromPace(chaptersRemaining, chapterPace),
    },
    resourceForecasts,
  };
}
