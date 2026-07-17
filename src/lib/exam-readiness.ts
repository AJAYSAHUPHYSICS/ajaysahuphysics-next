// ─────────────────────────────────────────────────────────────────
// Exam Readiness Score (pure function, no storage of its own)
//
// One 0-100 score for "how ready is this student for the exam right
// now", broken into three named contributions the dashboard displays
// as bars (M13 Task 4):
//   - Completion: average Notes/Formula Sheet/DPP/PYQ completion,
//     reusing resource-stats.getResourceCompletionBreakdown() as-is.
//   - Revision: rounds completed vs. possible, penalized for overdue
//     revisions — reusing revision-health.computeRevisionHealth() for
//     both the overdue count and the "started" definition.
//   - Practice: DPP + PYQ completion specifically (the two resource
//     types that are actual practice, not reading).
//
// No new counting logic — every number here comes from an existing
// helper; this module only combines and weights them.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry } from "./revision";
import { REVISION_ROUNDS } from "./revision";
import { getResourceCompletionBreakdown } from "./resource-stats";
import { computeRevisionHealth } from "./revision-health";

export type ExamReadinessTier = "excellent" | "good" | "average" | "needs-work";

export type ExamReadiness = {
  completion: number; // 0-100
  revision: number; // 0-100
  practice: number; // 0-100
  overall: number; // 0-100
  tier: ExamReadinessTier | null; // null when there's no data to grade yet
};

const WEIGHTS = { completion: 0.4, revision: 0.3, practice: 0.3 };

const TIER_LABEL: Record<ExamReadinessTier, string> = {
  excellent: "Excellent",
  good: "Good",
  average: "Average",
  "needs-work": "Needs Work",
};

export function examReadinessTierLabel(tier: ExamReadinessTier): string {
  return TIER_LABEL[tier];
}

function ratioPercent(completed: number, total: number): number | null {
  return total > 0 ? (completed / total) * 100 : null;
}

export function computeExamReadiness(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>
): ExamReadiness {
  const breakdown = getResourceCompletionBreakdown(chapters, checklists);
  const byKey = Object.fromEntries(breakdown.map((b) => [b.key, b]));

  // Completion: average across whichever of the 4 resource types this
  // student's chapters actually have.
  const completionRatios = breakdown
    .map((b) => ratioPercent(b.completed, b.total))
    .filter((r): r is number => r !== null);
  const completion =
    completionRatios.length > 0
      ? Math.round(completionRatios.reduce((a, b) => a + b, 0) / completionRatios.length)
      : 0;

  // Practice: DPP + PYQ specifically.
  const practiceRatios = [byKey.dpp, byKey.pyq]
    .filter((b): b is NonNullable<typeof b> => !!b)
    .map((b) => ratioPercent(b.completed, b.total))
    .filter((r): r is number => r !== null);
  const practice =
    practiceRatios.length > 0
      ? Math.round(practiceRatios.reduce((a, b) => a + b, 0) / practiceRatios.length)
      : 0;

  // Revision: rounds completed vs. possible across every chapter with
  // content, penalized for overdue revisions (reusing revision-health's
  // overdue count rather than recomputing it).
  let roundsPossible = 0;
  let roundsDone = 0;
  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue;
    roundsPossible += REVISION_ROUNDS.length;
    roundsDone += revisionEntries[`${ch.cls}:${ch.slug}`]?.length ?? 0;
  }
  const health = computeRevisionHealth(chapters, checklists, revisionEntries);
  const revisionRatio = roundsPossible > 0 ? (roundsDone / roundsPossible) * 100 : 0;
  const revision = Math.max(0, Math.min(100, Math.round(revisionRatio - health.overdueCount * 3)));

  const hasAnyContent = chapters.some((ch) => ch.availableChecklist.length > 0);
  if (!hasAnyContent || health.tier === null) {
    return { completion, revision, practice, overall: 0, tier: null };
  }

  const overall = Math.round(
    completion * WEIGHTS.completion + revision * WEIGHTS.revision + practice * WEIGHTS.practice
  );

  const tier: ExamReadinessTier =
    overall >= 85 ? "excellent" : overall >= 65 ? "good" : overall >= 40 ? "average" : "needs-work";

  return { completion, revision, practice, overall, tier };
}
