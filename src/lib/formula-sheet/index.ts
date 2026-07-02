// ─────────────────────────────────────────────────────────────────
// Formula Sheet Registry
// One import + one entry per chapter. Nothing else changes when a
// new chapter is added.
// ─────────────────────────────────────────────────────────────────

import type { ChapterFormulaSheet, FormulaSheetRegistry } from "./types";
import { kinematicsFormulaSheet } from "./kinematics";

export const formulaSheetRegistry: FormulaSheetRegistry = {
  kinematics: kinematicsFormulaSheet,
};

/** Look up a chapter's formula sheet by its chapters.ts slug. */
export function getChapterFormulaSheet(
  slug: string
): ChapterFormulaSheet | undefined {
  return formulaSheetRegistry[slug];
}

/** All chapter slugs that currently have a formula sheet. */
export function formulaSheetSlugs(): string[] {
  return Object.keys(formulaSheetRegistry);
}

// Re-export all types so consumers import from one place.
export type {
  ChapterFormulaSheet,
  FormulaSheetRegistry,
  Formula,
  FormulaTopicGroup,
  FormulaVariable,
  Derivation,
  DerivationStep,
  ConceptLink,
  ExamStats,
  ExamTag,
  Difficulty,
  Frequency,
} from "./types";
