import type { ChapterShortNotes } from "./kinematics-short";
import { kinematicsShortNotes } from "./kinematics-short";
import { lawsOfMotionShortNotes } from "./laws-of-motion-short";
import { workEnergyAndPowerShortNotes } from "./work-energy-and-power-short";
import { rotationalMotionShortNotes } from "./rotational-motion-short";
import { gravitationShortNotes } from "./gravitation-short";
import { mechanicalPropertiesOfSolidsShortNotes } from "./mechanical-properties-of-solids-short";

export const shortNotesRegistry: Record<string, ChapterShortNotes> = {
  kinematics: kinematicsShortNotes,
  "laws-of-motion": lawsOfMotionShortNotes,
  "work-energy-and-power": workEnergyAndPowerShortNotes,
  "system-of-particles-and-rotational-motion": rotationalMotionShortNotes,
  gravitation: gravitationShortNotes,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsShortNotes,
};

export function getChapterShortNotes(slug: string): ChapterShortNotes | undefined {
  return shortNotesRegistry[slug];
}
