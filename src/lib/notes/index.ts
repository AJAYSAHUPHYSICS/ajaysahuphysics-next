import type { ChapterNotes } from "./kinematics";
import { basicMathematicsAndVectorsNotes } from "./basic-mathematics-and-vectors";
import { centreOfMassAndCollisionsNotes } from "./centre-of-mass-and-collisions";
import { kinematicsNotes } from "./kinematics";
import { lawsOfMotionNotes } from "./laws-of-motion";
import { workEnergyAndPowerNotes } from "./work-energy-and-power";
import { rotationalMotionNotes } from "./rotational-motion";
import { gravitationNotes } from "./gravitation";
import { mechanicalPropertiesOfSolidsNotes } from "./mechanical-properties-of-solids";
import { mechanicalPropertiesOfFluidsNotes } from "./mechanical-properties-of-fluids";
import { thermalPropertiesOfMatterNotes } from "./thermal-properties-of-matter";
import { thermodynamicsNotes } from "./thermodynamics";
import { kineticTheoryOfGasesNotes } from "./kinetic-theory-of-gases";
import { wavesNotes } from "./waves";
import { oscillationsNotes } from "./oscillations";
import { alternatingCurrentNotes } from "./alternating-current";
import { atomsNotes } from "./atoms";
import { currentElectricityNotes } from "./current-electricity";
import { electricChargesAndFieldsNotes } from "./electric-charges-and-fields";
import { electrostaticPotentialAndCapacitanceNotes } from "./electrostatic-potential-and-capacitance";
import { movingChargesAndMagnetismNotes } from "./moving-charges-and-magnetism";
import { magnetismAndMatterNotes } from "./magnetism-and-matter";
import { electromagneticWavesNotes } from "./electromagnetic-waves";
import { rayOpticsAndOpticalInstrumentsNotes } from "./ray-optics-and-optical-instruments";
import { dualNatureOfRadiationAndMatterNotes } from "./dual-nature-of-radiation-and-matter";
import { nucleiNotes } from "./nuclei";

// Add one line per chapter as real notes content is written.
// Any chapter slug NOT in this registry automatically shows "Coming Soon".
export const notesRegistry: Record<string, ChapterNotes> = {
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsNotes,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsNotes,
  kinematics: kinematicsNotes,
  "laws-of-motion": lawsOfMotionNotes,
  "work-energy-and-power": workEnergyAndPowerNotes,
  "system-of-particles-and-rotational-motion": rotationalMotionNotes,
  gravitation: gravitationNotes,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsNotes,
  "mechanical-properties-of-fluids": mechanicalPropertiesOfFluidsNotes,
  "thermal-properties-of-matter": thermalPropertiesOfMatterNotes,
  thermodynamics: thermodynamicsNotes,
  "kinetic-theory-of-gases": kineticTheoryOfGasesNotes,
  waves: wavesNotes,
  oscillations: oscillationsNotes,
  "alternating-current": alternatingCurrentNotes,
  atoms: atomsNotes,
  "current-electricity": currentElectricityNotes,
  "electric-charges-and-fields": electricChargesAndFieldsNotes,
  "electrostatic-potential-and-capacitance": electrostaticPotentialAndCapacitanceNotes,
  "moving-charges-and-magnetism": movingChargesAndMagnetismNotes,
  "magnetism-and-matter": magnetismAndMatterNotes,
  "electromagnetic-waves": electromagneticWavesNotes,
  "ray-optics-and-optical-instruments": rayOpticsAndOpticalInstrumentsNotes,
  "dual-nature-of-radiation-and-matter": dualNatureOfRadiationAndMatterNotes,
  "nuclei": nucleiNotes,
};

export function getChapterNotes(slug: string): ChapterNotes | undefined {
  return notesRegistry[slug];
}
