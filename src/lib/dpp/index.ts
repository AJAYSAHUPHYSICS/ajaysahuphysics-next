import type { ChapterDpp } from "./kinematics";
import { basicMathematicsAndVectorsDpp } from "./basic-mathematics-and-vectors";
import { centreOfMassAndCollisionsDpp } from "./centre-of-mass-and-collisions";
import { kinematicsDpp } from "./kinematics";
import { lawsOfMotionDpp } from "./laws-of-motion";
import { workEnergyAndPowerDpp } from "./work-energy-and-power";
import { rotationalMotionDpp } from "./rotational-motion";
import { gravitationDpp } from "./gravitation";
import { mechanicalPropertiesOfSolidsDpp } from "./mechanical-properties-of-solids";
import { mechanicalPropertiesOfFluidsDpp } from "./mechanical-properties-of-fluids";
import { thermalPropertiesOfMatterDpp } from "./thermal-properties-of-matter";
import { thermodynamicsDpp } from "./thermodynamics";
import { kineticTheoryOfGasesDpp } from "./kinetic-theory-of-gases";
import { wavesDpp } from "./waves";
import { oscillationsDpp } from "./oscillations";
import { alternatingCurrentDpp } from "./alternating-current";
import { atomsDpp } from "./atoms";

export const dppRegistry: Record<string, ChapterDpp> = {
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsDpp,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsDpp,
  kinematics: kinematicsDpp,
  "laws-of-motion": lawsOfMotionDpp,
  "work-energy-and-power": workEnergyAndPowerDpp,
  "system-of-particles-and-rotational-motion": rotationalMotionDpp,
  gravitation: gravitationDpp,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsDpp,
  "mechanical-properties-of-fluids": mechanicalPropertiesOfFluidsDpp,
  "thermal-properties-of-matter": thermalPropertiesOfMatterDpp,
  thermodynamics: thermodynamicsDpp,
  "kinetic-theory-of-gases": kineticTheoryOfGasesDpp,
  waves: wavesDpp,
  oscillations: oscillationsDpp,
  "alternating-current": alternatingCurrentDpp,
  atoms: atomsDpp,
};

export function getChapterDpp(slug: string): ChapterDpp | undefined {
  return dppRegistry[slug];
}
