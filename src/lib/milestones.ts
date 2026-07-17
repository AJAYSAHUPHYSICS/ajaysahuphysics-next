// ─────────────────────────────────────────────────────────────────
// Milestones (pure function)
//
// Every count here is already computed elsewhere on the dashboard
// (chaptersCompleted, masteredCount from revision-health,
// resourcesCompleted, revisionCount) — this module only defines the
// fixed thresholds and checks them, no new counting.
// ─────────────────────────────────────────────────────────────────

export type MilestoneStats = {
  chaptersCompleted: number;
  masteredCount: number;
  resourcesCompleted: number;
  revisionCount: number;
};

export type Milestone = { id: string; label: string; achieved: boolean };

const MILESTONE_DEFS: { id: string; label: string; check: (s: MilestoneStats) => boolean }[] = [
  { id: "first-chapter", label: "First completed chapter", check: (s) => s.chaptersCompleted >= 1 },
  { id: "50-resources", label: "50 resources completed", check: (s) => s.resourcesCompleted >= 50 },
  { id: "100-revisions", label: "100 revisions", check: (s) => s.revisionCount >= 100 },
  { id: "10-mastered", label: "10 mastered chapters", check: (s) => s.masteredCount >= 10 },
];

export function getMilestones(stats: MilestoneStats): Milestone[] {
  return MILESTONE_DEFS.map((def) => ({ id: def.id, label: def.label, achieved: def.check(stats) }));
}
