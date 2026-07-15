import type { ChapterDpp } from "./kinematics";
import { basicMathematicsAndVectorsDpp } from "./basic-mathematics-and-vectors";
import { physicalWorldAndMeasurementDpp } from "./physical-world-and-measurement";
import { kinematicsDpp } from "./kinematics";
import { lawsOfMotionDpp } from "./laws-of-motion";
import { workEnergyAndPowerDpp } from "./work-energy-and-power";
import { centreOfMassAndCollisionsDpp } from "./centre-of-mass-and-collisions";
import { rotationalMotionDpp } from "./rotational-motion";
import { gravitationDpp } from "./gravitation";
import { mechanicalPropertiesOfSolidsDpp } from "./mechanical-properties-of-solids";
import { mechanicalPropertiesOfFluidsDpp } from "./mechanical-properties-of-fluids";
import { thermalPropertiesOfMatterDpp } from "./thermal-properties-of-matter";
import { thermodynamicsDpp } from "./thermodynamics";
import { kineticTheoryOfGasesDpp } from "./kinetic-theory-of-gases";
import { oscillationsDpp } from "./oscillations";
import { wavesDpp } from "./waves";
import { circularMotionDpp } from "./circular-motion";
import { electricChargesAndFieldsDpp } from "./electric-charges-and-fields";
import { electrostaticPotentialAndCapacitanceDpp } from "./electrostatic-potential-and-capacitance";
import { currentElectricityDpp } from "./current-electricity";
import { movingChargesAndMagnetismDpp } from "./moving-charges-and-magnetism";
import { magnetismAndMatterDpp } from "./magnetism-and-matter";
import { electromagneticInductionDpp } from "./electromagnetic-induction";
import { alternatingCurrentDpp } from "./alternating-current";
import { electromagneticWavesDpp } from "./electromagnetic-waves";
import { rayOpticsAndOpticalInstrumentsDpp } from "./ray-optics-and-optical-instruments";
import { waveOpticsDpp } from "./wave-optics";
import { dualNatureOfRadiationAndMatterDpp } from "./dual-nature-of-radiation-and-matter";
import { atomsDpp } from "./atoms";
import { nucleiDpp } from "./nuclei";
import { semiconductorElectronicsDpp } from "./semiconductor-electronics";

export const dppRegistry: Record<string, ChapterDpp> = {
  "basic-mathematics-and-vectors": basicMathematicsAndVectorsDpp,
  "physical-world-and-measurement": physicalWorldAndMeasurementDpp,
  kinematics: kinematicsDpp,
  "laws-of-motion": lawsOfMotionDpp,
  "work-energy-and-power": workEnergyAndPowerDpp,
  "centre-of-mass-and-collisions": centreOfMassAndCollisionsDpp,
  "system-of-particles-and-rotational-motion": rotationalMotionDpp,
  gravitation: gravitationDpp,
  "mechanical-properties-of-solids": mechanicalPropertiesOfSolidsDpp,
  "mechanical-properties-of-fluids": mechanicalPropertiesOfFluidsDpp,
  "thermal-properties-of-matter": thermalPropertiesOfMatterDpp,
  thermodynamics: thermodynamicsDpp,
  "kinetic-theory-of-gases": kineticTheoryOfGasesDpp,
  oscillations: oscillationsDpp,
  waves: wavesDpp,
  "circular-motion": circularMotionDpp,
  "electric-charges-and-fields": electricChargesAndFieldsDpp,
  "electrostatic-potential-and-capacitance": electrostaticPotentialAndCapacitanceDpp,
  "current-electricity": currentElectricityDpp,
  "moving-charges-and-magnetism": movingChargesAndMagnetismDpp,
  "magnetism-and-matter": magnetismAndMatterDpp,
  "electromagnetic-induction": electromagneticInductionDpp,
  "alternating-current": alternatingCurrentDpp,
  "electromagnetic-waves": electromagneticWavesDpp,
  "ray-optics-and-optical-instruments": rayOpticsAndOpticalInstrumentsDpp,
  "wave-optics": waveOpticsDpp,
  "dual-nature-of-radiation-and-matter": dualNatureOfRadiationAndMatterDpp,
  atoms: atomsDpp,
  "nuclei": nucleiDpp,
  "semiconductor-electronics": semiconductorElectronicsDpp,
};

export function getChapterDpp(slug: string): ChapterDpp | undefined {
  return dppRegistry[slug];
}

// ── Build-time drift guard ───────────────────────────────────────
// Ensures slugs.ts (lightweight availability) matches the real registry.
// Runs at module load during build; a mismatch throws and fails CI,
// so the two sources can never silently diverge.
import { dppSlugSet } from "./slugs";
{
  const registryKeys = Object.keys(dppRegistry);
  const missingInSlugs = registryKeys.filter((k) => !dppSlugSet.has(k));
  const extraInSlugs = [...dppSlugSet].filter((k) => !(k in dppRegistry));
  if (missingInSlugs.length || extraInSlugs.length) {
    throw new Error(
      `dpp slugs.ts is out of sync with index.ts. ` +
        `Missing in slugs: [${missingInSlugs}]. Extra in slugs: [${extraInSlugs}].`
    );
  }
}
