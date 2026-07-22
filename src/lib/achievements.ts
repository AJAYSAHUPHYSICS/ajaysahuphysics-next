// ─────────────────────────────────────────────────────────────────
// Achievements (pure function)
//
// Same computed-badge pattern as milestones.ts — every stat here is
// already counted elsewhere on the dashboard (chaptersCompleted,
// revisionCount, masteredCount, resource-stats' breakdown, the
// existing StreakState). This module only defines a distinct set of
// named thresholds and checks them; it never recounts anything.
// ─────────────────────────────────────────────────────────────────

import type { ResourceCompletionEntry } from "./resource-stats";
import type { StreakState } from "./study-streak";

export type AchievementStats = {
  chaptersCompleted: number;
  revisionCount: number;
  masteredCount: number;
  resourceBreakdown: ResourceCompletionEntry[];
  streak: StreakState;
};

export type Achievement = { id: string; label: string; achieved: boolean };

function fullyDone(breakdown: ResourceCompletionEntry[], key: string): boolean {
  const entry = breakdown.find((b) => b.key === key);
  return !!entry && entry.total > 0 && entry.completed === entry.total;
}

const ACHIEVEMENT_DEFS: { id: string; label: string; check: (s: AchievementStats) => boolean }[] = [
  { id: "first-chapter-complete", label: "First Chapter Complete", check: (s) => s.chaptersCompleted >= 1 },
  { id: "10-chapters-complete", label: "10 Chapters Complete", check: (s) => s.chaptersCompleted >= 10 },
  { id: "revision-expert", label: "Revision Expert", check: (s) => s.revisionCount >= 50 },
  { id: "pyq-master", label: "PYQ Master", check: (s) => fullyDone(s.resourceBreakdown, "pyq") },
  { id: "formula-champion", label: "Formula Champion", check: (s) => fullyDone(s.resourceBreakdown, "formulaSheet") },
  { id: "consistency-hero", label: "Consistency Hero", check: (s) => s.streak.longest >= 7 },
  { id: "mastered-10-chapters", label: "Mastered 10 Chapters", check: (s) => s.masteredCount >= 10 },
];

export function getAchievements(stats: AchievementStats): Achievement[] {
  return ACHIEVEMENT_DEFS.map((def) => ({ id: def.id, label: def.label, achieved: def.check(stats) }));
}
