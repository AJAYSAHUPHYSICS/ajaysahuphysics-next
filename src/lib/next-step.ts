// ─────────────────────────────────────────────────────────────────
// Recommended Next Step (pure function, no storage of its own)
//
// Walks the same fixed sequence chapter-progress.ts already scores —
// Notes → Formula Sheet → DPP → PYQ → Revision 1 → 2 → 3 → Mastered —
// and returns the single next thing to do. Only ever looks at
// availableChecklist / checklistState / completedRounds, the exact
// inputs computeChapterProgress() takes, so "what's done" is never
// re-derived, only walked in order.
// ─────────────────────────────────────────────────────────────────

import type { ChapterChecklistState, ChecklistItemKey } from "./checklist";
import { CHECKLIST_ITEMS } from "./checklist";
import { REVISION_ROUNDS, type RevisionRound } from "./revision";

export type NextStep =
  | { kind: "resource"; key: ChecklistItemKey; label: string; justCompleted: string | null }
  | { kind: "revision"; round: RevisionRound; label: string; justCompleted: string | null }
  | { kind: "mastered"; justCompleted: string | null };

const RESOURCE_STEP_LABEL: Record<ChecklistItemKey, string> = {
  notes: "Notes",
  formulaSheet: "Formula Sheet",
  dpp: "DPP",
  pyq: "PYQ",
};

export function getNextStep(
  availableChecklist: ChecklistItemKey[],
  checklistState: ChapterChecklistState,
  completedRounds: RevisionRound[]
): NextStep {
  // Walk the resources in their fixed pedagogical order (only the ones
  // this chapter actually has), then the 3 revision rounds.
  const orderedResources = CHECKLIST_ITEMS.map((i) => i.key).filter((key) =>
    availableChecklist.includes(key)
  );

  let justCompleted: string | null = null;

  for (const key of orderedResources) {
    if (!checklistState[key]) {
      return { kind: "resource", key, label: RESOURCE_STEP_LABEL[key], justCompleted };
    }
    justCompleted = RESOURCE_STEP_LABEL[key];
  }

  for (const round of REVISION_ROUNDS) {
    if (!completedRounds.includes(round)) {
      return { kind: "revision", round, label: `Revision Round ${round}`, justCompleted };
    }
    justCompleted = `Revision Round ${round}`;
  }

  return { kind: "mastered", justCompleted };
}
