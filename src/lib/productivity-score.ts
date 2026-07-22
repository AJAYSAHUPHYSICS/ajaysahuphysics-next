// ─────────────────────────────────────────────────────────────────
// Productivity Score (pure function, no storage of its own)
//
// One 0-100 score combining four signals that are all already
// computed elsewhere on the dashboard: exam-readiness.ts's completion
// and revision percentages, chapter-accuracy.ts's per-chapter scores
// (averaged, standing in for "mistakes"), and the existing
// StreakState (standing in for "consistency"). No new counting.
// ─────────────────────────────────────────────────────────────────

import type { ExamReadiness } from "./exam-readiness";
import type { ChapterAccuracy } from "./chapter-accuracy";
import type { StreakState } from "./study-streak";

export type ProductivityTier = "excellent" | "good" | "average" | "needs-work";

export type ProductivityScore = {
  overall: number; // 0-100
  completion: number;
  revision: number;
  accuracy: number;
  consistency: number;
  tier: ProductivityTier | null;
};

const WEIGHTS = { completion: 0.3, revision: 0.25, accuracy: 0.25, consistency: 0.2 };

const TIER_LABEL: Record<ProductivityTier, string> = {
  excellent: "Excellent",
  good: "Good",
  average: "Average",
  "needs-work": "Needs Work",
};

export function productivityTierLabel(tier: ProductivityTier): string {
  return TIER_LABEL[tier];
}

export function computeProductivityScore(
  readiness: ExamReadiness,
  chapterAccuracies: ChapterAccuracy[],
  streak: StreakState
): ProductivityScore {
  const graded = chapterAccuracies.filter(
    (a): a is ChapterAccuracy & { score: number } => a.score !== null
  );
  const accuracy =
    graded.length > 0 ? Math.round(graded.reduce((sum, a) => sum + a.score, 0) / graded.length) : 0;

  // Consistency: current streak weighted most heavily (it reflects
  // right-now behaviour), longest streak gives partial credit for a
  // strong past habit even after a streak has since broken.
  const consistency = Math.max(
    0,
    Math.min(100, Math.round(streak.current * 10 + Math.min(streak.longest, 10) * 2))
  );

  if (readiness.tier === null && graded.length === 0 && streak.longest === 0) {
    return { overall: 0, completion: 0, revision: 0, accuracy: 0, consistency: 0, tier: null };
  }

  const overall = Math.round(
    readiness.completion * WEIGHTS.completion +
      readiness.revision * WEIGHTS.revision +
      accuracy * WEIGHTS.accuracy +
      consistency * WEIGHTS.consistency
  );

  const tier: ProductivityTier =
    overall >= 85 ? "excellent" : overall >= 65 ? "good" : overall >= 40 ? "average" : "needs-work";

  return { overall, completion: readiness.completion, revision: readiness.revision, accuracy, consistency, tier };
}
