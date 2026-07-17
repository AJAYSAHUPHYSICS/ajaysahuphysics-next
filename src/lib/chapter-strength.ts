// ─────────────────────────────────────────────────────────────────
// Strength Analysis (pure function)
//
// Ranks chapters by the same completion percentage computeChapterProgress()
// already produces — no separate "strength" metric invented, just a
// sort. Chapters with zero progress are excluded from both ends: they
// aren't "strongest" (nothing done) and listing them as "needs
// improvement" would just duplicate weak-chapters.ts's already-covered
// "not started" chapters.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry } from "./revision";
import { computeChapterProgress, type ChapterProgress } from "./chapter-progress";

export type RankedChapter = {
  cls: "11" | "12";
  slug: string;
  name: string;
  progress: ChapterProgress;
};

export type StrengthAnalysis = {
  strongest: RankedChapter[];
  needsImprovement: RankedChapter[];
};

export function getStrengthAnalysis(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>,
  limit: number = 5
): StrengthAnalysis {
  const started: RankedChapter[] = [];

  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue;
    const key = `${ch.cls}:${ch.slug}`;
    const state = checklists[key] ?? {};
    const entries = revisionEntries[key] ?? [];
    const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);
    if (progress.completedResources === 0 && progress.completedRounds === 0) continue; // not started

    started.push({ cls: ch.cls, slug: ch.slug, name: ch.name, progress });
  }

  const strongest = [...started].sort((a, b) => b.progress.percent - a.progress.percent).slice(0, limit);
  const needsImprovement = [...started]
    .sort((a, b) => a.progress.percent - b.progress.percent)
    .slice(0, limit);

  return { strongest, needsImprovement };
}
