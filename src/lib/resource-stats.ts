// ─────────────────────────────────────────────────────────────────
// Resource Completion Breakdown (pure function)
//
// Tracks completion separately per resource type (Notes, Formula
// Sheet, DPP, PYQ) across every chapter — distinct from the combined
// per-chapter percentage in chapter-progress.ts. Powers the dashboard's
// completion chart (M10 Task 4/6).
// ─────────────────────────────────────────────────────────────────

import { CHECKLIST_ITEMS, type ChapterChecklistState, type ChecklistItemKey } from "./checklist";
import type { ChapterMeta } from "./chapter-meta";

export type ResourceCompletionEntry = {
  key: ChecklistItemKey;
  label: string;
  completed: number;
  total: number;
};

export function getResourceCompletionBreakdown(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>
): ResourceCompletionEntry[] {
  return CHECKLIST_ITEMS.map((item) => {
    let total = 0;
    let completed = 0;

    for (const ch of chapters) {
      if (!ch.availableChecklist.includes(item.key)) continue;
      total += 1;
      const state = checklists[`${ch.cls}:${ch.slug}`];
      if (state?.[item.key]) completed += 1;
    }

    return { key: item.key, label: item.label, completed, total };
  });
}
