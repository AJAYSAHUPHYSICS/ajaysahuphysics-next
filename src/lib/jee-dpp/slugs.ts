// ─────────────────────────────────────────────────────────────────
// JEE DPP — Availability Slugs (lightweight)
//
// This module lists ONLY the chapter slugs that have a Cengage-sourced
// JEE DPP. It contains NO question content, so client components that
// merely need to know "does this chapter have a JEE DPP?" can import
// this instead of the full registry — keeping heavy DPP content out of
// the client bundle.
//
// KEEP IN SYNC with index.ts. A build-time guard (see index.ts bottom)
// asserts these match, so a forgotten entry fails the build, not prod.
// ─────────────────────────────────────────────────────────────────

export const jeeDppSlugSet: ReadonlySet<string> = new Set([
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

/** True if a JEE DPP exists for this chapter slug. No content loaded. */
export function hasJeeDpp(slug: string): boolean {
  return jeeDppSlugSet.has(slug);
}
