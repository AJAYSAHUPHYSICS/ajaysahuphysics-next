// ─────────────────────────────────────────────────────────────────
// Concept Analysis (pure function)
//
// Groups mistakes by the concept tag the student entered when logging
// them, ranked by how many are still unresolved — the concepts that
// most need revision, not just the most-logged ones.
// ─────────────────────────────────────────────────────────────────

import type { Mistake } from "./mistakes";

export type ConceptStat = { concept: string; unresolvedCount: number; totalCount: number };

export function getTopConcepts(mistakes: Mistake[], limit: number = 5): ConceptStat[] {
  const map = new Map<string, { unresolved: number; total: number }>();

  for (const m of mistakes) {
    const entry = map.get(m.conceptTag) ?? { unresolved: 0, total: 0 };
    entry.total += 1;
    if (m.resolvedAt === null) entry.unresolved += 1;
    map.set(m.conceptTag, entry);
  }

  return Array.from(map.entries())
    .map(([concept, v]) => ({ concept, unresolvedCount: v.unresolved, totalCount: v.total }))
    .sort((a, b) => b.unresolvedCount - a.unresolvedCount || b.totalCount - a.totalCount)
    .slice(0, limit);
}
