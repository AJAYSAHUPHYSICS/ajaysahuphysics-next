import type { ChapterDpp } from "../dpp/kinematics";
import { physicalWorldAndMeasurementJeeDpp } from "./physical-world-and-measurement";
import { circularMotionJeeDpp } from "./circular-motion";
import { basicMathematicsAndVectorsJeeDpp } from "./basic-mathematics-and-vectors";
import { kinematicsJeeDpp } from "./kinematics";
import { lawsOfMotionJeeDpp } from "./laws-of-motion";
import { workEnergyAndPowerJeeDpp } from "./work-energy-and-power";
import { centreOfMassAndCollisionsJeeDpp } from "./centre-of-mass-and-collisions";
import { rotationalMotionJeeDpp } from "./rotational-motion";
import { gravitationJeeDpp } from "./gravitation";
import { mechanicalPropertiesOfSolidsJeeDpp } from "./mechanical-properties-of-solids";
import { mechanicalPropertiesOfFluidsJeeDpp } from "./mechanical-properties-of-fluids";

export const jeeDppRegistry: Record<string, ChapterDpp> = {
  "physical-world-and-measurement": physicalWorldAndMeasurementJeeDpp,
  "circular-motion": circularMotionJeeDpp,
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsJeeDpp,
  kinematics: kinematicsJeeDpp,
  "laws-of-motion": lawsOfMotionJeeDpp,
  "work-energy-and-power": workEnergyAndPowerJeeDpp,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsJeeDpp,
  "system-of-particles-and-rotational-motion": rotationalMotionJeeDpp,
  gravitation: gravitationJeeDpp,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsJeeDpp,
  "mechanical-properties-of-fluids": mechanicalPropertiesOfFluidsJeeDpp,
};

export function getChapterJeeDpp(slug: string): ChapterDpp | undefined {
  return jeeDppRegistry[slug];
}
