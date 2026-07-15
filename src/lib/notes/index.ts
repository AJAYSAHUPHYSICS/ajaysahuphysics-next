import type { ChapterNotes } from "./kinematics";
import { basicMathematicsAndVectorsNotes } from "./basic-mathematics-and-vectors";
import { physicalWorldAndMeasurementNotes } from "./physical-world-and-measurement";
import { kinematicsNotes } from "./kinematics";
import { lawsOfMotionNotes } from "./laws-of-motion";
import { workEnergyAndPowerNotes } from "./work-energy-and-power";
import { centreOfMassAndCollisionsNotes } from "./centre-of-mass-and-collisions";
import { rotationalMotionNotes } from "./rotational-motion";
import { gravitationNotes } from "./gravitation";
import { mechanicalPropertiesOfSolidsNotes } from "./mechanical-properties-of-solids";
import { mechanicalPropertiesOfFluidsNotes } from "./mechanical-properties-of-fluids";
import { thermalPropertiesOfMatterNotes } from "./thermal-properties-of-matter";
import { thermodynamicsNotes } from "./thermodynamics";
import { kineticTheoryOfGasesNotes } from "./kinetic-theory-of-gases";
import { oscillationsNotes } from "./oscillations";
import { wavesNotes } from "./waves";
import { circularMotionNotes } from "./circular-motion";
import { electricChargesAndFieldsNotes } from "./electric-charges-and-fields";
import { electrostaticPotentialAndCapacitanceNotes } from "./electrostatic-potential-and-capacitance";
import { currentElectricityNotes } from "./current-electricity";
import { movingChargesAndMagnetismNotes } from "./moving-charges-and-magnetism";
import { magnetismAndMatterNotes } from "./magnetism-and-matter";
import { electromagneticInductionNotes } from "./electromagnetic-induction";
import { alternatingCurrentNotes } from "./alternating-current";
import { electromagneticWavesNotes } from "./electromagnetic-waves";
import { rayOpticsAndOpticalInstrumentsNotes } from "./ray-optics-and-optical-instruments";
import { waveOpticsNotes } from "./wave-optics";
import { dualNatureOfRadiationAndMatterNotes } from "./dual-nature-of-radiation-and-matter";
import { atomsNotes } from "./atoms";
import { nucleiNotes } from "./nuclei";
import { semiconductorElectronicsNotes } from "./semiconductor-electronics";

// Add one line per chapter as real notes content is written.
// Any chapter slug NOT in this registry automatically shows "Coming Soon".
export const notesRegistry: Record<string, ChapterNotes> = {
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsNotes,
  "physical-world-and-measurement": physicalWorldAndMeasurementNotes,
  kinematics: kinematicsNotes,
  "laws-of-motion": lawsOfMotionNotes,
  "work-energy-and-power": workEnergyAndPowerNotes,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsNotes,
  "system-of-particles-and-rotational-motion": rotationalMotionNotes,
  gravitation: gravitationNotes,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsNotes,
  "mechanical-properties-of-fluids": mechanicalPropertiesOfFluidsNotes,
  "thermal-properties-of-matter": thermalPropertiesOfMatterNotes,
  thermodynamics: thermodynamicsNotes,
  "kinetic-theory-of-gases": kineticTheoryOfGasesNotes,
  oscillations: oscillationsNotes,
  waves: wavesNotes,
  "circular-motion": circularMotionNotes,
  "electric-charges-and-fields": electricChargesAndFieldsNotes,
  "electrostatic-potential-and-capacitance": electrostaticPotentialAndCapacitanceNotes,
  "current-electricity": currentElectricityNotes,
  "moving-charges-and-magnetism": movingChargesAndMagnetismNotes,
  "magnetism-and-matter": magnetismAndMatterNotes,
  "electromagnetic-induction": electromagneticInductionNotes,
  "alternating-current": alternatingCurrentNotes,
  "electromagnetic-waves": electromagneticWavesNotes,
  "ray-optics-and-optical-instruments": rayOpticsAndOpticalInstrumentsNotes,
  "wave-optics": waveOpticsNotes,
  "dual-nature-of-radiation-and-matter": dualNatureOfRadiationAndMatterNotes,
  atoms: atomsNotes,
  "nuclei": nucleiNotes,
  "semiconductor-electronics": semiconductorElectronicsNotes,
};

export function getChapterNotes(slug: string): ChapterNotes | undefined {
  return notesRegistry[slug];
}

// ── Build-time drift guard ───────────────────────────────────────
// Ensures slugs.ts (lightweight availability) matches the real registry.
// Runs at module load during build; a mismatch throws and fails CI,
// so the two sources can never silently diverge.
import { notesSlugSet } from "./slugs";
{
  const registryKeys = Object.keys(notesRegistry);
  const missingInSlugs = registryKeys.filter((k) => !notesSlugSet.has(k));
  const extraInSlugs = [...notesSlugSet].filter((k) => !(k in notesRegistry));
  if (missingInSlugs.length || extraInSlugs.length) {
    throw new Error(
      `notes slugs.ts is out of sync with index.ts. ` +
        `Missing in slugs: [${missingInSlugs}]. Extra in slugs: [${extraInSlugs}].`
    );
  }
}
