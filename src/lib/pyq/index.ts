import type { ChapterPyq } from "./kinematics";
import { basicMathematicsAndVectorsPyq } from "./basic-mathematics-and-vectors";
import { centreOfMassAndCollisionsPyq } from "./centre-of-mass-and-collisions";
import { kinematicsPyq } from "./kinematics";
import { lawsOfMotionPyq } from "./laws-of-motion";
import { workEnergyAndPowerPyq } from "./work-energy-and-power";
import { rotationalMotionPyq } from "./rotational-motion";
import { gravitationPyq } from "./gravitation";
import { mechanicalPropertiesOfSolidsPyq } from "./mechanical-properties-of-solids";
import { mechanicalPropertiesOfFluidsPyq } from "./mechanical-properties-of-fluids";
import { thermalPropertiesOfMatterPyq } from "./thermal-properties-of-matter";
import { thermodynamicsPyq } from "./thermodynamics";
import { physicalWorldAndMeasurementPyq } from "./physical-world-and-measurement";
import { circularMotionPyq } from "./circular-motion";
import { currentElectricityPyq } from "./current-electricity";
import { electricChargesAndFieldsPyq } from "./electric-charges-and-fields";
import { electrostaticPotentialAndCapacitancePyq } from "./electrostatic-potential-and-capacitance";
import { movingChargesAndMagnetismPyq } from "./moving-charges-and-magnetism";
import { magnetismAndMatterPyq } from "./magnetism-and-matter";
import { electromagneticInductionPyq } from "./electromagnetic-induction";
import { alternatingCurrentPyq } from "./alternating-current";
import { electromagneticWavesPyq } from "./electromagnetic-waves";
import { rayOpticsAndOpticalInstrumentsPyq } from "./ray-optics-and-optical-instruments";
import { waveOpticsPyq } from "./wave-optics";
import { dualNatureOfRadiationAndMatterPyq } from "./dual-nature-of-radiation-and-matter";
import { atomsPyq } from "./atoms";
import { nucleiPyq } from "./nuclei";
import { semiconductorElectronicsPyq } from "./semiconductor-electronics";

export const pyqRegistry: Record<string, ChapterPyq> = {
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsPyq,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsPyq,
  kinematics: kinematicsPyq,
  "laws-of-motion": lawsOfMotionPyq,
  "work-energy-and-power": workEnergyAndPowerPyq,
  "system-of-particles-and-rotational-motion": rotationalMotionPyq,
  gravitation: gravitationPyq,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsPyq,
  "mechanical-properties-of-fluids": mechanicalPropertiesOfFluidsPyq,
  "thermal-properties-of-matter": thermalPropertiesOfMatterPyq,
  thermodynamics: thermodynamicsPyq,
  "physical-world-and-measurement": physicalWorldAndMeasurementPyq,
  "circular-motion": circularMotionPyq,
  "current-electricity": currentElectricityPyq,
  "electric-charges-and-fields": electricChargesAndFieldsPyq,
  "electrostatic-potential-and-capacitance": electrostaticPotentialAndCapacitancePyq,
  "moving-charges-and-magnetism": movingChargesAndMagnetismPyq,
  "magnetism-and-matter": magnetismAndMatterPyq,
  "electromagnetic-induction": electromagneticInductionPyq,
  "alternating-current": alternatingCurrentPyq,
  "electromagnetic-waves": electromagneticWavesPyq,
  "ray-optics-and-optical-instruments": rayOpticsAndOpticalInstrumentsPyq,
  "wave-optics": waveOpticsPyq,
  "dual-nature-of-radiation-and-matter": dualNatureOfRadiationAndMatterPyq,
  atoms: atomsPyq,
  nuclei: nucleiPyq,
  "semiconductor-electronics": semiconductorElectronicsPyq,
};

export function getChapterPyq(slug: string): ChapterPyq | undefined {
  return pyqRegistry[slug];
}
