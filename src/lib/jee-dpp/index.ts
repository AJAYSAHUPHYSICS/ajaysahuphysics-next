import type { ChapterDpp } from "../dpp/kinematics";
import { physicalWorldAndMeasurementJeeDpp } from "./physical-world-and-measurement";
import { circularMotionJeeDpp } from "./circular-motion";
import { basicMathematicsAndVectorsJeeDpp } from "./basic-mathematics-and-vectors";
import { kinematicsJeeDpp } from "./kinematics";
import { lawsOfMotionJeeDpp } from "./laws-of-motion";
import { workEnergyAndPowerJeeDpp } from "./work-energy-and-power";

export const jeeDppRegistry: Record<string, ChapterDpp> = {
  "physical-world-and-measurement": physicalWorldAndMeasurementJeeDpp,
  "circular-motion": circularMotionJeeDpp,
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsJeeDpp,
  kinematics: kinematicsJeeDpp,
  "laws-of-motion": lawsOfMotionJeeDpp,
  "work-energy-and-power": workEnergyAndPowerJeeDpp,
};

export function getChapterJeeDpp(slug: string): ChapterDpp | undefined {
  return jeeDppRegistry[slug];
}
