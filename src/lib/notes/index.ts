import type { ChapterNotes } from "./kinematics";
import { kinematicsNotes } from "./kinematics";
import { lawsOfMotionNotes } from "./laws-of-motion";
import { workEnergyAndPowerNotes } from "./work-energy-and-power";
import { rotationalMotionNotes } from "./rotational-motion";
import { gravitationNotes } from "./gravitation";
import { mechanicalPropertiesOfSolidsNotes } from "./mechanical-properties-of-solids";
import { mechanicalPropertiesOfFluidsNotes } from "./mechanical-properties-of-fluids";
import { thermalPropertiesOfMatterNotes } from "./thermal-properties-of-matter";
import { thermodynamicsNotes } from "./thermodynamics";

// Add one line per chapter as real notes content is written.
// Any chapter slug NOT in this registry automatically shows "Coming Soon".
export const notesRegistry: Record<string, ChapterNotes> = {
  kinematics: kinematicsNotes,
  "laws-of-motion": lawsOfMotionNotes,
  "work-energy-and-power": workEnergyAndPowerNotes,
  "system-of-particles-and-rotational-motion": rotationalMotionNotes,
  gravitation: gravitationNotes,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsNotes,
  "mechanical-properties-of-fluids": mechanicalPropertiesOfFluidsNotes,
  "thermal-properties-of-matter": thermalPropertiesOfMatterNotes,
  thermodynamics: thermodynamicsNotes,
};

export function getChapterNotes(slug: string): ChapterNotes | undefined {
  return notesRegistry[slug];
}
