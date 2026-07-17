// ─────────────────────────────────────────────────────────────────
// Weak Chapters (pure functions)
//
// Flags chapters worth a student's attention, in three distinct ways.
// A chapter with zero content available (no Notes/Formula
// Sheet/DPP/PYQ yet) is excluded from every category — there's
// nothing to have completed, revised, or solved yet, so flagging it
// would just be noise, not a real signal.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import { computeChapterProgress } from "./chapter-progress";

export type WeakChapterEntry = {
  cls: "11" | "12";
  slug: string;
  name: string;
  detail: string;
};

export type WeakChapters = {
  incomplete: WeakChapterEntry[];
  neverRevised: WeakChapterEntry[];
  pyqNotSolved: WeakChapterEntry[];
};

export function getWeakChapters(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  completedRoundsByChapter: Record<string, number>
): WeakChapters {
  const incomplete: WeakChapterEntry[] = [];
  const neverRevised: WeakChapterEntry[] = [];
  const pyqNotSolved: WeakChapterEntry[] = [];

  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue; // nothing to study yet

    const key = `${ch.cls}:${ch.slug}`;
    const state = checklists[key] ?? {};
    const completedRounds = completedRoundsByChapter[key] ?? 0;
    const progress = computeChapterProgress(ch.availableChecklist, state, completedRounds);

    if (progress.percent < 100) {
      incomplete.push({
        cls: ch.cls,
        slug: ch.slug,
        name: ch.name,
        detail: `${progress.percent}% complete`,
      });
    }

    if (completedRounds === 0) {
      neverRevised.push({ cls: ch.cls, slug: ch.slug, name: ch.name, detail: "No revision rounds yet" });
    }

    if (ch.availableChecklist.includes("pyq") && !state.pyq) {
      pyqNotSolved.push({ cls: ch.cls, slug: ch.slug, name: ch.name, detail: "PYQs not marked solved" });
    }
  }

  return { incomplete, neverRevised, pyqNotSolved };
}
