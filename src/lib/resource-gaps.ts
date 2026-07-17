// ─────────────────────────────────────────────────────────────────
// Resource Gaps (pure function)
//
// "Remaining" is just total-minus-completed on top of
// resource-stats.getResourceCompletionBreakdown() and the same
// rounds-possible/rounds-done counting exam-readiness.ts uses — no
// new counting introduced here.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry } from "./revision";
import { REVISION_ROUNDS } from "./revision";
import { getResourceCompletionBreakdown } from "./resource-stats";

export type ResourceGap = { label: string; remaining: number; total: number };

const CLEAN_LABEL: Record<string, string> = {
  "Notes completed": "Notes",
  "Formula Sheet revised": "Formula Sheets",
  "DPP completed": "DPP",
  "PYQs solved": "PYQ",
};

export function getResourceGaps(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>
): ResourceGap[] {
  const breakdown = getResourceCompletionBreakdown(chapters, checklists);
  const gaps: ResourceGap[] = breakdown
    .filter((b) => b.total > 0)
    .map((b) => ({
      label: `${CLEAN_LABEL[b.label] ?? b.label} remaining`,
      remaining: b.total - b.completed,
      total: b.total,
    }));

  let roundsPossible = 0;
  let roundsDone = 0;
  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue;
    roundsPossible += REVISION_ROUNDS.length;
    roundsDone += revisionEntries[`${ch.cls}:${ch.slug}`]?.length ?? 0;
  }
  if (roundsPossible > 0) {
    gaps.push({ label: "Revision remaining", remaining: roundsPossible - roundsDone, total: roundsPossible });
  }

  return gaps;
}
