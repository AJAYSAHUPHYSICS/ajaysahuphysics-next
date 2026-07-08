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
import { thermalPropertiesFormulaSheet } from "./thermal-properties-of-matter";
import { thermodynamicsFormulaSheet } from "./thermodynamics";
import { kineticTheoryFormulaSheet } from "./kinetic-theory-of-gases";
import { oscillationsFormulaSheet } from "./oscillations";
import { wavesFormulaSheet } from "./waves";
import { electricChargesAndFieldsFormulaSheet } from "./electric-charges-and-fields";
import { electrostaticPotentialAndCapacitanceFormulaSheet } from "./electrostatic-potential-and-capacitance";
import { currentElectricityFormulaSheet } from "./current-electricity";
import { movingChargesAndMagnetismFormulaSheet } from "./moving-charges-and-magnetism";
import { magnetismAndMatterFormulaSheet } from "./magnetism-and-matter";
import { basicMathematicsAndVectorsFormulaSheet } from "./basic-mathematics-and-vectors";
import { physicalWorldAndMeasurementFormulaSheet } from "./physical-world-and-measurement";
import { circularMotionFormulaSheet } from "./circular-motion";

export const formulaSheetRegistry: FormulaSheetRegistry = {
  kinematics: kinematicsFormulaSheet,
  "laws-of-motion": lawsOfMotionFormulaSheet,
  "work-energy-and-power": workEnergyAndPowerFormulaSheet,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsFormulaSheet,
  "system-of-particles-and-rotational-motion": rotationalMotionFormulaSheet,
  gravitation: gravitationFormulaSheet,
  "mechanical-properties-of-solids": solidsFormulaSheet,
  "mechanical-properties-of-fluids": fluidsFormulaSheet,
  "thermal-properties-of-matter": thermalPropertiesFormulaSheet,
  thermodynamics: thermodynamicsFormulaSheet,
  "kinetic-theory-of-gases": kineticTheoryFormulaSheet,
  oscillations: oscillationsFormulaSheet,
  waves: wavesFormulaSheet,
  "electric-charges-and-fields": electricChargesAndFieldsFormulaSheet,
  "electrostatic-potential-and-capacitance": electrostaticPotentialAndCapacitanceFormulaSheet,
  "current-electricity": currentElectricityFormulaSheet,
  "moving-charges-and-magnetism": movingChargesAndMagnetismFormulaSheet,
  "magnetism-and-matter": magnetismAndMatterFormulaSheet,
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsFormulaSheet,
  "physical-world-and-measurement": physicalWorldAndMeasurementFormulaSheet,
  "circular-motion": circularMotionFormulaSheet,
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

// ── Build-time drift guard ───────────────────────────────────────
// Ensures slugs.ts (lightweight availability) matches the real registry.
// Runs at module load during build; a mismatch throws and fails CI,
// so the two sources can never silently diverge.
import { formulaSheetSlugSet } from "./slugs";
{
  const registryKeys = Object.keys(formulaSheetRegistry);
  const missingInSlugs = registryKeys.filter((k) => !formulaSheetSlugSet.has(k));
  const extraInSlugs = [...formulaSheetSlugSet].filter(
    (k) => !(k in formulaSheetRegistry)
  );
  if (missingInSlugs.length || extraInSlugs.length) {
    throw new Error(
      `formula-sheet slugs.ts is out of sync with index.ts. ` +
        `Missing in slugs: [${missingInSlugs}]. Extra in slugs: [${extraInSlugs}].`
    );
  }
}
