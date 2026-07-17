// ─────────────────────────────────────────────────────────────────
// Mistake Notebook Insights (pure function)
//
// Same deterministic-sentence approach as study-insights.ts, applied
// to mistake data instead of revision health. Kept as its own function
// (rather than overloading buildStudyInsights' signature) but rendered
// alongside it on the dashboard — same section, two sources.
// ─────────────────────────────────────────────────────────────────

import type { Mistake } from "./mistakes";
import type { ChapterAccuracy } from "./chapter-accuracy";

export function buildMistakeInsights(mistakes: Mistake[], accuracies: ChapterAccuracy[]): string[] {
  const insights: string[] = [];

  const resolvedCount = mistakes.filter((m) => m.resolvedAt !== null).length;
  if (resolvedCount > 0) {
    insights.push(`You resolved ${resolvedCount} mistake${resolvedCount === 1 ? "" : "s"}.`);
  }

  const countsByChapter = new Map<string, { name: string; count: number }>();
  for (const m of mistakes) {
    const key = `${m.cls}:${m.slug}`;
    const entry = countsByChapter.get(key) ?? { name: m.chapterName, count: 0 };
    entry.count += 1;
    countsByChapter.set(key, entry);
  }
  const highest = Array.from(countsByChapter.values()).sort((a, b) => b.count - a.count)[0];
  if (highest && highest.count > 0) {
    insights.push(`${highest.name} has the highest mistake count.`);
  }

  // "Accuracy improved": a chapter where every logged mistake has since
  // been resolved — the cleanest deterministic proxy for improvement
  // without needing a time-series of past scores.
  const improved = accuracies
    .filter((a) => a.resolvedCount > 0 && a.unresolvedCount === 0)
    .sort((a, b) => b.resolvedCount - a.resolvedCount)[0];
  if (improved) {
    insights.push(`Your ${improved.name} accuracy improved.`);
  }

  return insights;
}
