import type { ChapterPyq } from "./kinematics";
import { kinematicsPyq } from "./kinematics";
import { lawsOfMotionPyq } from "./laws-of-motion";
import { workEnergyAndPowerPyq } from "./work-energy-and-power";
import { rotationalMotionPyq } from "./rotational-motion";

export const pyqRegistry: Record<string, ChapterPyq> = {
  kinematics: kinematicsPyq,
  "laws-of-motion": lawsOfMotionPyq,
  "work-energy-and-power": workEnergyAndPowerPyq,
  "system-of-particles-and-rotational-motion": rotationalMotionPyq,
};

export function getChapterPyq(slug: string): ChapterPyq | undefined {
  return pyqRegistry[slug];
}
