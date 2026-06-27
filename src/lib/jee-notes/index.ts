import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";
import { physicalWorldAndMeasurementJeeNotes } from "./physical-world-and-measurement";
import { circularMotionJeeNotes } from "./circular-motion";
import { basicMathematicsAndVectorsJeeNotes } from "./basic-mathematics-and-vectors";
import { kinematicsJeeNotes } from "./kinematics";
import { lawsOfMotionJeeNotes } from "./laws-of-motion";
import { workEnergyAndPowerJeeNotes } from "./work-energy-and-power";

export const jeeNotesRegistry: Record<string, ChapterJeeNotes> = {
  "physical-world-and-measurement": physicalWorldAndMeasurementJeeNotes,
  "circular-motion": circularMotionJeeNotes,
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsJeeNotes,
  kinematics: kinematicsJeeNotes,
  "laws-of-motion": lawsOfMotionJeeNotes,
  "work-energy-and-power": workEnergyAndPowerJeeNotes,
};

export function getChapterJeeNotes(slug: string): ChapterJeeNotes | undefined {
  return jeeNotesRegistry[slug];
}
