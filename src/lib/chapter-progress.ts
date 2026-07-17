// ─────────────────────────────────────────────────────────────────
// Chapter Completion Score (pure functions, no storage of its own)
//
// Combines two existing M9 signals — the 4-item study checklist
// (Notes / Formula Sheet / DPP / PYQ) and the 3 revision rounds —
// into a single 0-100 completion percentage per chapter. Deliberately
// has no localStorage access itself: callers pass in already-read
// checklist/revision state, keeping this module trivially testable
// and reusable from both the chapter page and the dashboard.
// ─────────────────────────────────────────────────────────────────

import { countCompleted, type ChapterChecklistState, type ChecklistItemKey } from "./checklist";
import { REVISION_ROUNDS } from "./revision";

export type ChapterProgress = {
  completedResources: number;
  totalResources: number;
  completedRounds: number;
  totalRounds: number;
  /** 0-100. Resources and revision rounds are weighted as equal units,
   * so a chapter with all 4 resources done and 0/3 revisions sits at
   * 4/7 ≈ 57%, not 100% — revision is treated as part of "done". */
  percent: number;
};

export function computeChapterProgress(
  availableChecklist: ChecklistItemKey[],
  checklistState: ChapterChecklistState,
  completedRounds: number
): ChapterProgress {
  const totalResources = availableChecklist.length;
  const completedResources = countCompleted(checklistState);
  const totalRounds = REVISION_ROUNDS.length;

  const totalUnits = totalResources + totalRounds;
  const doneUnits = completedResources + completedRounds;
  const percent = totalUnits > 0 ? Math.round((doneUnits / totalUnits) * 100) : 0;

  return { completedResources, totalResources, completedRounds, totalRounds, percent };
}

export function progressStatus(percent: number): "not-started" | "in-progress" | "complete" {
  if (percent >= 100) return "complete";
  if (percent > 0) return "in-progress";
  return "not-started";
}
