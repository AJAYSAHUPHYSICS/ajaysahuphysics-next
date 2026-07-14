// ─────────────────────────────────────────────────────────────────
// Formula Sheet — Availability Slugs (lightweight)
//
// This module lists ONLY the chapter slugs that have a formula sheet.
// It contains NO formula content, so client components that merely need
// to know "does a formula sheet exist for this chapter?" can import this
// instead of the full registry — keeping heavy formula data out of the
// client bundle.
//
// KEEP IN SYNC with index.ts. A build-time guard (see index.ts bottom)
// asserts these match, so a forgotten entry fails the build, not prod.
// ─────────────────────────────────────────────────────────────────

export const formulaSheetSlugSet: ReadonlySet<string> = new Set([
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
  "electric-charges-and-fields",
  "electrostatic-potential-and-capacitance",
  "current-electricity",
  "moving-charges-and-magnetism",
  "magnetism-and-matter",
  "electromagnetic-induction",
]);

/** True if a formula sheet exists for this chapter slug. No content loaded. */
export function hasFormulaSheet(slug: string): boolean {
  return formulaSheetSlugSet.has(slug);
}
