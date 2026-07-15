// ─────────────────────────────────────────────────────────────────
// DPP — Availability Slugs (lightweight)
//
// This module lists ONLY the chapter slugs that have a DPP. It contains
// NO question content, so client components that merely need to know
// "does this chapter have a DPP?" can import this instead of the full
// registry — keeping heavy DPP content out of the client bundle.
//
// KEEP IN SYNC with index.ts. A build-time guard (see index.ts bottom)
// asserts these match, so a forgotten entry fails the build, not prod.
// ─────────────────────────────────────────────────────────────────

export const dppSlugSet: ReadonlySet<string> = new Set([
  "basic-mathematics-and-vectors",
  "physical-world-and-measurement",
  "kinematics",
  "laws-of-motion",
  "work-energy-and-power",
  "centre-of-mass-and-collisions",
  "system-of-particles-and-rotational-motion",
  "gravitation",
  "mechanical-properties-of-solids",
  "mechanical-properties-of-fluids",
  "thermal-properties-of-matter",
  "thermodynamics",
  "kinetic-theory-of-gases",
  "oscillations",
  "waves",
  "circular-motion",
  "electric-charges-and-fields",
  "electrostatic-potential-and-capacitance",
  "current-electricity",
  "moving-charges-and-magnetism",
  "magnetism-and-matter",
  "electromagnetic-induction",
  "alternating-current",
  "electromagnetic-waves",
  "ray-optics-and-optical-instruments",
  "wave-optics",
  "dual-nature-of-radiation-and-matter",
  "atoms",
  "nuclei",
  "semiconductor-electronics",
]);

/** True if a DPP exists for this chapter slug. No content loaded. */
export function hasDpp(slug: string): boolean {
  return dppSlugSet.has(slug);
}
