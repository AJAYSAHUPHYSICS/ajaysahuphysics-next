// ─────────────────────────────────────────────────────────────────
// Goal Progress (pure function, no storage of its own)
//
// "How close am I to this goal?" for each of the 8 fixed goal types —
// built entirely from counts resource-stats.ts, chapter-progress.ts,
// and revision.ts already produce. No new completion logic: Notes/
// Formula Sheet/DPP/PYQ reuse getResourceCompletionBreakdown() as-is;
// the three revision-round goals reuse the same completed-rounds
// arrays revision.ts already stores; "Complete all chapters" reuses
// studyStatus() from chapter-progress.ts.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry, RevisionRound } from "./revision";
import { REVISION_ROUNDS } from "./revision";
import { getResourceCompletionBreakdown } from "./resource-stats";
import { computeChapterProgress, studyStatus } from "./chapter-progress";
import type { GoalType } from "./goal-types";

export type GoalProgress = {
  type: GoalType;
  completed: number;
  total: number;
  /** 0-100. Null total (no applicable chapters yet) reads as 0%. */
  percent: number;
};

const ROUND_BY_GOAL: Partial<Record<GoalType, RevisionRound>> = {
  revision1: 1,
  revision2: 2,
  revision3: 3,
};

function percentOf(completed: number, total: number): number {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

export function computeGoalProgress(
  type: GoalType,
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>
): GoalProgress {
  if (type === "notes" || type === "formulaSheet" || type === "dpp" || type === "pyq") {
    const breakdown = getResourceCompletionBreakdown(chapters, checklists);
    const entry = breakdown.find((b) => b.key === type);
    const completed = entry?.completed ?? 0;
    const total = entry?.total ?? 0;
    return { type, completed, total, percent: percentOf(completed, total) };
  }

  const round = ROUND_BY_GOAL[type];
  if (round !== undefined) {
    let completed = 0;
    let total = 0;
    for (const ch of chapters) {
      if (ch.availableChecklist.length === 0) continue; // nothing to revise yet
      total += 1;
      const entries = revisionEntries[`${ch.cls}:${ch.slug}`] ?? [];
      if (entries.some((e) => e.round === round)) completed += 1;
    }
    return { type, completed, total, percent: percentOf(completed, total) };
  }

  // "allChapters" — every available resource checked off (mirrors
  // studyStatus()'s "completed"/"mastered" tiers, not just "started").
  let completed = 0;
  let total = 0;
  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue;
    total += 1;
    const key = `${ch.cls}:${ch.slug}`;
    const state = checklists[key] ?? {};
    const entries = revisionEntries[key] ?? [];
    const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);
    const status = studyStatus(progress);
    if (status === "completed" || status === "mastered") completed += 1;
  }
  return { type: "allChapters", completed, total, percent: percentOf(completed, total) };
}

export function computeAllGoalProgress(
  types: GoalType[],
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>
): GoalProgress[] {
  return types.map((t) => computeGoalProgress(t, chapters, checklists, revisionEntries));
}

/** Every chapter with content still missing round `round` — used by
 * daily-targets.ts to map an M15 "overdue-revision" task onto the
 * correct revision-round goal without re-deriving completion state. */
export function nextIncompleteRound(entries: RevisionEntry[]): RevisionRound | null {
  const completed = new Set(entries.map((e) => e.round));
  for (const round of REVISION_ROUNDS) {
    if (!completed.has(round)) return round;
  }
  return null; // all 3 rounds already done
}
