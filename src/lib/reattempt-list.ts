// ─────────────────────────────────────────────────────────────────
// Reattempt List — "Practice Again" (pure function)
//
// Priority: unresolved mistakes only, oldest first, hardest as the
// tiebreak. Capped at 10. No new data — just a filter and a sort over
// mistakes.ts's records.
// ─────────────────────────────────────────────────────────────────

import type { Difficulty } from "./formula-sheet";
import type { Mistake } from "./mistakes";

const DIFFICULTY_RANK: Record<Difficulty, number> = { hard: 3, medium: 2, easy: 1 };
const DEFAULT_LIMIT = 10;

export function getReattemptList(mistakes: Mistake[], limit: number = DEFAULT_LIMIT): Mistake[] {
  return mistakes
    .filter((m) => m.resolvedAt === null)
    .sort((a, b) => {
      if (a.createdAt !== b.createdAt) return a.createdAt - b.createdAt; // oldest first
      return DIFFICULTY_RANK[b.difficulty] - DIFFICULTY_RANK[a.difficulty]; // hardest first tiebreak
    })
    .slice(0, limit);
}
