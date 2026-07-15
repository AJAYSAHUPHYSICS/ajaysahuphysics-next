import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";
import { physicalWorldAndMeasurementJeeNotes } from "./physical-world-and-measurement";
import { circularMotionJeeNotes } from "./circular-motion";
import { basicMathematicsAndVectorsJeeNotes } from "./basic-mathematics-and-vectors";
import { kinematicsJeeNotes } from "./kinematics";
import { lawsOfMotionJeeNotes } from "./laws-of-motion";
import { workEnergyAndPowerJeeNotes } from "./work-energy-and-power";
import { centreOfMassAndCollisionsJeeNotes } from "./centre-of-mass-and-collisions";
import { rotationalMotionJeeNotes } from "./rotational-motion";
import { gravitationJeeNotes } from "./gravitation";
import { mechanicalPropertiesOfSolidsJeeNotes } from "./mechanical-properties-of-solids";
import { mechanicalPropertiesOfFluidsJeeNotes } from "./mechanical-properties-of-fluids";

export const jeeNotesRegistry: Record<string, ChapterJeeNotes> = {
  "physical-world-and-measurement": physicalWorldAndMeasurementJeeNotes,
  "circular-motion": circularMotionJeeNotes,
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsJeeNotes,
  kinematics: kinematicsJeeNotes,
  "laws-of-motion": lawsOfMotionJeeNotes,
  "work-energy-and-power": workEnergyAndPowerJeeNotes,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsJeeNotes,
  "system-of-particles-and-rotational-motion": rotationalMotionJeeNotes,
  gravitation: gravitationJeeNotes,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsJeeNotes,
  "mechanical-properties-of-fluids": mechanicalPropertiesOfFluidsJeeNotes,
};

export function getChapterJeeNotes(slug: string): ChapterJeeNotes | undefined {
  return jeeNotesRegistry[slug];
}

// ── Build-time drift guard ───────────────────────────────────────
// Ensures slugs.ts (lightweight availability) matches the real registry.
// Runs at module load during build; a mismatch throws and fails CI,
// so the two sources can never silently diverge.
import { jeeNotesSlugSet } from "./slugs";
{
  const registryKeys = Object.keys(jeeNotesRegistry);
  const missingInSlugs = registryKeys.filter((k) => !jeeNotesSlugSet.has(k));
  const extraInSlugs = [...jeeNotesSlugSet].filter((k) => !(k in jeeNotesRegistry));
  if (missingInSlugs.length || extraInSlugs.length) {
    throw new Error(
      `jee-notes slugs.ts is out of sync with index.ts. ` +
        `Missing in slugs: [${missingInSlugs}]. Extra in slugs: [${extraInSlugs}].`
    );
  }
}
