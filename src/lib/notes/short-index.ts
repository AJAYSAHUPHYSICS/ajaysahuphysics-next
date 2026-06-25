import type { ChapterShortNotes } from "./kinematics-short";
import { basicMathematicsAndVectorsShortNotes } from "./basic-mathematics-and-vectors-short";
import { centreOfMassAndCollisionsShortNotes } from "./centre-of-mass-and-collisions-short";
import { kinematicsShortNotes } from "./kinematics-short";
import { lawsOfMotionShortNotes } from "./laws-of-motion-short";
import { workEnergyAndPowerShortNotes } from "./work-energy-and-power-short";
import { rotationalMotionShortNotes } from "./rotational-motion-short";
import { gravitationShortNotes } from "./gravitation-short";
import { mechanicalPropertiesOfSolidsShortNotes } from "./mechanical-properties-of-solids-short";
import { mechanicalPropertiesOfFluidsShortNotes } from "./mechanical-properties-of-fluids-short";
import { thermalPropertiesOfMatterShortNotes } from "./thermal-properties-of-matter-short";
import { thermodynamicsShortNotes } from "./thermodynamics-short";
import { kineticTheoryOfGasesShortNotes } from "./kinetic-theory-of-gases-short";
import { wavesShortNotes } from "./waves-short";
import { oscillationsShortNotes } from "./oscillations-short";
import { alternatingCurrentShortNotes } from "./alternating-current-short";
import { atomsShortNotes } from "./atoms-short";
import { currentElectricityShortNotes } from "./current-electricity-short";
import { electricChargesAndFieldsShortNotes } from "./electric-charges-and-fields-short";

export const shortNotesRegistry: Record<string, ChapterShortNotes> = {
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsShortNotes,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsShortNotes,
  kinematics: kinematicsShortNotes,
  "laws-of-motion": lawsOfMotionShortNotes,
  "work-energy-and-power": workEnergyAndPowerShortNotes,
  "system-of-particles-and-rotational-motion": rotationalMotionShortNotes,
  gravitation: gravitationShortNotes,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsShortNotes,
  "mechanical-properties-of-fluids": mechanicalPropertiesOfFluidsShortNotes,
  "thermal-properties-of-matter": thermalPropertiesOfMatterShortNotes,
  thermodynamics: thermodynamicsShortNotes,
  "kinetic-theory-of-gases": kineticTheoryOfGasesShortNotes,
  waves: wavesShortNotes,
  oscillations: oscillationsShortNotes,
  "alternating-current": alternatingCurrentShortNotes,
  atoms: atomsShortNotes,
  "current-electricity": currentElectricityShortNotes,
  "electric-charges-and-fields": electricChargesAndFieldsShortNotes,
};

export function getChapterShortNotes(slug: string): ChapterShortNotes | undefined {
  return shortNotesRegistry[slug];
}
