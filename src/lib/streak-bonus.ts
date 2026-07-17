// ─────────────────────────────────────────────────────────────────
// Study Streak Bonus (pure function)
//
// Reuses study-streak.ts's StreakState as-is — no separate streak
// concept invented. Active streak -> encouragement. Broken streak
// (had one before, has none now) -> recommend the chapter closest to
// done, reusing chapter-progress, as the easiest realistic win to
// restart momentum with.
// ─────────────────────────────────────────────────────────────────

import type { StreakState } from "./study-streak";
import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry } from "./revision";
import { computeChapterProgress } from "./chapter-progress";

export type StreakBonus =
  | { kind: "encouragement"; message: string }
  | { kind: "restart"; message: string; cls: "11" | "12"; slug: string; name: string; path: string };

export function getStreakBonus(
  streak: StreakState,
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>
): StreakBonus | null {
  if (streak.current > 0) {
    return {
      kind: "encouragement",
      message: `You're on a ${streak.current}-day streak — keep it going!`,
    };
  }

  if (streak.longest === 0) return null; // never had a streak to break

  let best: { cls: "11" | "12"; slug: string; name: string; percent: number } | null = null;
  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue;
    const key = `${ch.cls}:${ch.slug}`;
    const state = checklists[key] ?? {};
    const entries = revisionEntries[key] ?? [];
    const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);
    if (progress.percent >= 100 || progress.percent === 0) continue; // already done, or no head start
    if (!best || progress.percent > best.percent) {
      best = { cls: ch.cls, slug: ch.slug, name: ch.name, percent: progress.percent };
    }
  }

  if (!best) return null;

  return {
    kind: "restart",
    message: `Your streak broke — ${best.name} is ${best.percent}% done, the quickest win to get moving again.`,
    cls: best.cls,
    slug: best.slug,
    name: best.name,
    path: `/class-${best.cls}/${best.slug}`,
  };
}
