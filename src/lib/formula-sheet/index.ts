// ─────────────────────────────────────────────────────────────────
// Formula Sheet Registry
// One import + one entry per chapter. Nothing else changes when a
// new chapter is added.
// ─────────────────────────────────────────────────────────────────

import type { ChapterFormulaSheet, FormulaSheetRegistry } from "./types";
import { kinematicsFormulaSheet } from "./kinematics";
import { lawsOfMotionFormulaSheet } from "./laws-of-motion";
import { workEnergyAndPowerFormulaSheet } from "./work-energy-and-power";
import { centreOfMassAndCollisionsFormulaSheet } from "./centre-of-mass-and-collisions";
import { rotationalMotionFormulaSheet } from "./system-of-particles-and-rotational-motion";
import { gravitationFormulaSheet } from "./gravitation";
import { solidsFormulaSheet } from "./mechanical-properties-of-solids";
import { fluidsFormulaSheet } from "./mechanical-properties-of-fluids";

export const formulaSheetRegistry: FormulaSheetRegistry = {
  kinematics: kinematicsFormulaSheet,
  "laws-of-motion": lawsOfMotionFormulaSheet,
  "work-energy-and-power": workEnergyAndPowerFormulaSheet,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsFormulaSheet,
  "system-of-particles-and-rotational-motion": rotationalMotionFormulaSheet,
  gravitation: gravitationFormulaSheet,
  "mechanical-properties-of-solids": solidsFormulaSheet,
  "mechanical-properties-of-fluids": fluidsFormulaSheet,
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
