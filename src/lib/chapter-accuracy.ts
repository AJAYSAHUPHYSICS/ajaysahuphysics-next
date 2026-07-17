// ─────────────────────────────────────────────────────────────────
// Chapter Accuracy (pure function)
//
// One score per chapter that has DPP or PYQ content, built from
// mistakes logged against it — not a new "solved" counter, since the
// existing checklist already tracks whether DPP/PYQ practice was done
// at all; this only asks how clean that practice was.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { Mistake } from "./mistakes";

export type AccuracyTier = "excellent" | "good" | "average" | "needs-practice";

export type ChapterAccuracy = {
  cls: "11" | "12";
  slug: string;
  name: string;
  score: number | null; // null = not enough data to grade
  tier: AccuracyTier | null;
  unresolvedCount: number;
  resolvedCount: number;
};

const TIER_LABEL: Record<AccuracyTier, string> = {
  excellent: "Excellent",
  good: "Good",
  average: "Average",
  "needs-practice": "Needs Practice",
};

export function accuracyTierLabel(tier: AccuracyTier): string {
  return TIER_LABEL[tier];
}

export function computeChapterAccuracy(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  mistakes: Mistake[]
): ChapterAccuracy[] {
  const mistakesByChapter = new Map<string, Mistake[]>();
  for (const m of mistakes) {
    const key = `${m.cls}:${m.slug}`;
    const list = mistakesByChapter.get(key) ?? [];
    list.push(m);
    mistakesByChapter.set(key, list);
  }

  return chapters
    .filter((ch) => ch.availableChecklist.includes("dpp") || ch.availableChecklist.includes("pyq"))
    .map((ch) => {
      const key = `${ch.cls}:${ch.slug}`;
      const chapterMistakes = mistakesByChapter.get(key) ?? [];
      const unresolvedCount = chapterMistakes.filter((m) => m.resolvedAt === null).length;
      const resolvedCount = chapterMistakes.filter((m) => m.resolvedAt !== null).length;
      const state = checklists[key] ?? {};
      const practiced = !!(state.dpp || state.pyq);

      if (!practiced && chapterMistakes.length === 0) {
        return { cls: ch.cls, slug: ch.slug, name: ch.name, score: null, tier: null, unresolvedCount, resolvedCount };
      }

      let score = 100;
      score -= unresolvedCount * 10;
      score -= resolvedCount * 3;
      score = Math.max(0, Math.min(100, score));

      const tier: AccuracyTier =
        score >= 85 ? "excellent" : score >= 65 ? "good" : score >= 40 ? "average" : "needs-practice";

      return { cls: ch.cls, slug: ch.slug, name: ch.name, score, tier, unresolvedCount, resolvedCount };
    });
}
