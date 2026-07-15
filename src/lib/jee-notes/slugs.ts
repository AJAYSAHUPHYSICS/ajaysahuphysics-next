// ─────────────────────────────────────────────────────────────────
// JEE Notes — Availability Slugs (lightweight)
//
// This module lists ONLY the chapter slugs that have Cengage-sourced JEE
// notes. It contains NO note content, so client components that merely
// need to know "does this chapter have JEE notes?" can import this
// instead of the full registry — keeping heavy notes content out of the
// client bundle.
//
// KEEP IN SYNC with index.ts. A build-time guard (see index.ts bottom)
// asserts these match, so a forgotten entry fails the build, not prod.
// ─────────────────────────────────────────────────────────────────

export const jeeNotesSlugSet: ReadonlySet<string> = new Set([
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
  "circular-motion",
]);

/** True if JEE notes exist for this chapter slug. No content loaded. */
export function hasJeeNotes(slug: string): boolean {
  return jeeNotesSlugSet.has(slug);
}
