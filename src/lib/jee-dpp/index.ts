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

// ── Build-time drift guard ───────────────────────────────────────
// Ensures slugs.ts (lightweight availability) matches the real registry.
// Runs at module load during build; a mismatch throws and fails CI,
// so the two sources can never silently diverge.
import { jeeDppSlugSet } from "./slugs";
{
  const registryKeys = Object.keys(jeeDppRegistry);
  const missingInSlugs = registryKeys.filter((k) => !jeeDppSlugSet.has(k));
  const extraInSlugs = [...jeeDppSlugSet].filter((k) => !(k in jeeDppRegistry));
  if (missingInSlugs.length || extraInSlugs.length) {
    throw new Error(
      `jee-dpp slugs.ts is out of sync with index.ts. ` +
        `Missing in slugs: [${missingInSlugs}]. Extra in slugs: [${extraInSlugs}].`
    );
  }
}
