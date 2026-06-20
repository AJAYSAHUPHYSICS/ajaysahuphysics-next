import type { ChapterNotes } from "./kinematics";
import { kinematicsNotes } from "./kinematics";
import { lawsOfMotionNotes } from "./laws-of-motion";
import { workEnergyAndPowerNotes } from "./work-energy-and-power";
import { rotationalMotionNotes } from "./rotational-motion";
import { gravitationNotes } from "./gravitation";

// Add one line per chapter as real notes content is written.
// Any chapter slug NOT in this registry automatically shows "Coming Soon".
export const notesRegistry: Record<string, ChapterNotes> = {
  kinematics: kinematicsNotes,
  "laws-of-motion": lawsOfMotionNotes,
  "work-energy-and-power": workEnergyAndPowerNotes,
  "system-of-particles-and-rotational-motion": rotationalMotionNotes,
  gravitation: gravitationNotes,
};

export function getChapterNotes(slug: string): ChapterNotes | undefined {
  return notesRegistry[slug];
}
