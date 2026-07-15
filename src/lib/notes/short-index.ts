import type { ChapterShortNotes } from "./kinematics-short";
import { basicMathematicsAndVectorsShortNotes } from "./basic-mathematics-and-vectors-short";
import { physicalWorldAndMeasurementShortNotes } from "./physical-world-and-measurement-short";
import { kinematicsShortNotes } from "./kinematics-short";
import { lawsOfMotionShortNotes } from "./laws-of-motion-short";
import { workEnergyAndPowerShortNotes } from "./work-energy-and-power-short";
import { centreOfMassAndCollisionsShortNotes } from "./centre-of-mass-and-collisions-short";
import { rotationalMotionShortNotes } from "./rotational-motion-short";
import { gravitationShortNotes } from "./gravitation-short";
import { mechanicalPropertiesOfSolidsShortNotes } from "./mechanical-properties-of-solids-short";
import { mechanicalPropertiesOfFluidsShortNotes } from "./mechanical-properties-of-fluids-short";
import { thermalPropertiesOfMatterShortNotes } from "./thermal-properties-of-matter-short";
import { thermodynamicsShortNotes } from "./thermodynamics-short";
import { kineticTheoryOfGasesShortNotes } from "./kinetic-theory-of-gases-short";
import { oscillationsShortNotes } from "./oscillations-short";
import { wavesShortNotes } from "./waves-short";
import { circularMotionShortNotes } from "./circular-motion-short";
import { electricChargesAndFieldsShortNotes } from "./electric-charges-and-fields-short";
import { electrostaticPotentialAndCapacitanceShortNotes } from "./electrostatic-potential-and-capacitance-short";
import { currentElectricityShortNotes } from "./current-electricity-short";
import { movingChargesAndMagnetismShortNotes } from "./moving-charges-and-magnetism-short";
import { magnetismAndMatterShortNotes } from "./magnetism-and-matter-short";
import { electromagneticInductionShortNotes } from "./electromagnetic-induction-short";
import { alternatingCurrentShortNotes } from "./alternating-current-short";
import { electromagneticWavesShortNotes } from "./electromagnetic-waves-short";
import { rayOpticsAndOpticalInstrumentsShortNotes } from "./ray-optics-and-optical-instruments-short";
import { waveOpticsShortNotes } from "./wave-optics-short";
import { dualNatureOfRadiationAndMatterShortNotes } from "./dual-nature-of-radiation-and-matter-short";
import { atomsShortNotes } from "./atoms-short";
import { nucleiShortNotes } from "./nuclei-short";
import { semiconductorElectronicsShortNotes } from "./semiconductor-electronics-short";

export const shortNotesRegistry: Record<string, ChapterShortNotes> = {
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsShortNotes,
  "physical-world-and-measurement": physicalWorldAndMeasurementShortNotes,
  kinematics: kinematicsShortNotes,
  "laws-of-motion": lawsOfMotionShortNotes,
  "work-energy-and-power": workEnergyAndPowerShortNotes,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsShortNotes,
  "system-of-particles-and-rotational-motion": rotationalMotionShortNotes,
  gravitation: gravitationShortNotes,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsShortNotes,
  "mechanical-properties-of-fluids": mechanicalPropertiesOfFluidsShortNotes,
  "thermal-properties-of-matter": thermalPropertiesOfMatterShortNotes,
  thermodynamics: thermodynamicsShortNotes,
  "kinetic-theory-of-gases": kineticTheoryOfGasesShortNotes,
  oscillations: oscillationsShortNotes,
  waves: wavesShortNotes,
  "circular-motion": circularMotionShortNotes,
  "electric-charges-and-fields": electricChargesAndFieldsShortNotes,
  "electrostatic-potential-and-capacitance": electrostaticPotentialAndCapacitanceShortNotes,
  "current-electricity": currentElectricityShortNotes,
  "moving-charges-and-magnetism": movingChargesAndMagnetismShortNotes,
  "magnetism-and-matter": magnetismAndMatterShortNotes,
  "electromagnetic-induction": electromagneticInductionShortNotes,
  "alternating-current": alternatingCurrentShortNotes,
  "electromagnetic-waves": electromagneticWavesShortNotes,
  "ray-optics-and-optical-instruments": rayOpticsAndOpticalInstrumentsShortNotes,
  "wave-optics": waveOpticsShortNotes,
  "dual-nature-of-radiation-and-matter": dualNatureOfRadiationAndMatterShortNotes,
  atoms: atomsShortNotes,
  "nuclei": nucleiShortNotes,
  "semiconductor-electronics": semiconductorElectronicsShortNotes,
};

export function getChapterShortNotes(slug: string): ChapterShortNotes | undefined {
  return shortNotesRegistry[slug];
}
