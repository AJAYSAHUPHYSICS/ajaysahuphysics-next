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
};

export function getChapterPyq(slug: string): ChapterPyq | undefined {
  return pyqRegistry[slug];
}
