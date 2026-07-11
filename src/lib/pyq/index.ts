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
import { physicalWorldAndMeasurementPyq } from "./physical-world-and-measurement";
import { circularMotionPyq } from "./circular-motion";
import { currentElectricityPyq } from "./current-electricity";
import { electrostaticPotentialAndCapacitancePyq } from "./electrostatic-potential-and-capacitance";
import { movingChargesAndMagnetismPyq } from "./moving-charges-and-magnetism";
import { magnetismAndMatterPyq } from "./magnetism-and-matter";
import { electromagneticInductionPyq } from "./electromagnetic-induction";
import { alternatingCurrentPyq } from "./alternating-current";

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
  "physical-world-and-measurement": physicalWorldAndMeasurementPyq,
  "circular-motion": circularMotionPyq,
  "current-electricity": currentElectricityPyq,
  "electrostatic-potential-and-capacitance": electrostaticPotentialAndCapacitancePyq,
  "moving-charges-and-magnetism": movingChargesAndMagnetismPyq,
  "magnetism-and-matter": magnetismAndMatterPyq,
  "electromagnetic-induction": electromagneticInductionPyq,
  "alternating-current": alternatingCurrentPyq,
};

export function getChapterPyq(slug: string): ChapterPyq | undefined {
  return pyqRegistry[slug];
}
