// ─────────────────────────────────────────────────────────────────
// Study Insights (pure function)
//
// Turns numbers revision-health.ts already computed into short,
// deterministic sentences. No randomness, no new counting — every
// insight here is a direct restatement of an existing count or tier.
// ─────────────────────────────────────────────────────────────────

import { tierLabel, type RevisionHealth } from "./revision-health";

export function buildStudyInsights(health: RevisionHealth): string[] {
  const insights: string[] = [];

  if (health.masteredCount > 0) {
    insights.push(`You've mastered ${health.masteredCount} chapter${health.masteredCount === 1 ? "" : "s"}.`);
  }

  if (health.overdueCount > 0) {
    insights.push(
      `${health.overdueCount === 1 ? "Only 1 chapter is" : `Only ${health.overdueCount} chapters are`} overdue.`
    );
  } else if (health.tier !== null) {
    insights.push("No chapters are overdue right now.");
  }

  if (health.tier !== null) {
    insights.push(`Your revision health is ${tierLabel(health.tier)}.`);
  }

  return insights;
}
