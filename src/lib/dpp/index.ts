import type { ChapterDpp } from "./kinematics";
import { kinematicsDpp } from "./kinematics";
import { lawsOfMotionDpp } from "./laws-of-motion";
import { workEnergyAndPowerDpp } from "./work-energy-and-power";
import { rotationalMotionDpp } from "./rotational-motion";
import { gravitationDpp } from "./gravitation";
import { mechanicalPropertiesOfSolidsDpp } from "./mechanical-properties-of-solids";

export const dppRegistry: Record<string, ChapterDpp> = {
  kinematics: kinematicsDpp,
  "laws-of-motion": lawsOfMotionDpp,
  "work-energy-and-power": workEnergyAndPowerDpp,
  "system-of-particles-and-rotational-motion": rotationalMotionDpp,
  gravitation: gravitationDpp,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsDpp,
};

export function getChapterDpp(slug: string): ChapterDpp | undefined {
  return dppRegistry[slug];
}
