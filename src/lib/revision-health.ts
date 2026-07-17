// ─────────────────────────────────────────────────────────────────
// Revision Health Score (pure function, no storage of its own)
//
// One deterministic score summarizing how well-maintained a student's
// revision habit is, built entirely from counts computeChapterProgress()
// and getRevisionDueInfo() already produce — no new completion logic,
// just a weighted combination of existing signals.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry } from "./revision";
import { computeChapterProgress, studyStatus } from "./chapter-progress";
import { getRevisionDueInfo, bucketForDueInfo } from "./spaced-revision";

export type RevisionHealthTier = "excellent" | "good" | "needs-attention" | "critical";

export type RevisionHealth = {
  score: number; // 0-100
  /** Null when the student hasn't engaged with any chapter yet — a
   * health tier would be meaningless without any data to grade. */
  tier: RevisionHealthTier | null;
  overdueCount: number;
  neverRevisedCount: number;
  masteredCount: number;
};

const TIER_LABEL: Record<RevisionHealthTier, string> = {
  excellent: "Excellent",
  good: "Good",
  "needs-attention": "Needs Attention",
  critical: "Critical",
};

export function tierLabel(tier: RevisionHealthTier): string {
  return TIER_LABEL[tier];
}

export function computeRevisionHealth(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>,
  now: number = Date.now()
): RevisionHealth {
  let overdueCount = 0;
  let neverRevisedCount = 0;
  let masteredCount = 0;
  let engagedCount = 0;

  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue; // nothing to have revised yet

    const key = `${ch.cls}:${ch.slug}`;
    const state = checklists[key] ?? {};
    const entries = revisionEntries[key] ?? [];
    const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);

    if (progress.completedResources === 0 && progress.completedRounds === 0) continue; // not started
    engagedCount += 1;

    if (studyStatus(progress) === "mastered") masteredCount += 1;

    const bucket = bucketForDueInfo(getRevisionDueInfo(entries, now));
    if (bucket === "overdue") overdueCount += 1;
    if (bucket === "never-revised") neverRevisedCount += 1;
  }

  if (engagedCount === 0) {
    return { score: 0, tier: null, overdueCount, neverRevisedCount, masteredCount };
  }

  let score = 100;
  score -= overdueCount * 8;
  score -= neverRevisedCount * 3;
  score += Math.min(masteredCount * 4, 20);
  score = Math.max(0, Math.min(100, score));

  const tier: RevisionHealthTier =
    score >= 80 ? "excellent" : score >= 55 ? "good" : score >= 30 ? "needs-attention" : "critical";

  return { score, tier, overdueCount, neverRevisedCount, masteredCount };
}
