// ─────────────────────────────────────────────────────────────────
// JEE Notes / JEE DPP publication policy (Phase 2A, Task 2)
//
// Lightweight and client-safe: holds chapter slugs and statuses only,
// never note or question content, so hub tabs and global search can
// import it.
//
// Every chapter of the JEE Notes and JEE DPP registries is recorded as
// derived from third-party coaching material. That is the only
// provenance on record for these resources (it covers the whole set),
// so all 11 + 11 chapters are withheld. The data files are not edited
// or deleted, so the material can be compared and replaced later.
//
// A chapter becomes public again only when its content has been
// replaced with material written independently by AjaySahuPhysics and
// reviewed: set its status to "original-reviewed" in the same change
// that replaces the content. Being available online elsewhere never
// clears a chapter.
// ─────────────────────────────────────────────────────────────────

export type JeeContentStatus =
  /** Recorded as derived from third-party material: never shown. */
  | "withheld-third-party"
  /** Replaced with independently written, reviewed content: may be shown. */
  | "original-reviewed";

const ALL_WITHHELD: Readonly<Record<string, JeeContentStatus>> = {
  "basic-mathematics-and-vectors": "withheld-third-party",
  "physical-world-and-measurement": "withheld-third-party",
  kinematics: "withheld-third-party",
  "laws-of-motion": "withheld-third-party",
  "work-energy-and-power": "withheld-third-party",
  "centre-of-mass-and-collisions": "withheld-third-party",
  "system-of-particles-and-rotational-motion": "withheld-third-party",
  gravitation: "withheld-third-party",
  "mechanical-properties-of-solids": "withheld-third-party",
  "mechanical-properties-of-fluids": "withheld-third-party",
  "circular-motion": "withheld-third-party",
};

/** Status of each chapter's JEE Notes. Must list every chapter in the JEE Notes registry (tested). */
export const jeeNotesStatus: Readonly<Record<string, JeeContentStatus>> = { ...ALL_WITHHELD };

/** Status of each chapter's JEE DPP. Must list every chapter in the JEE DPP registry (tested). */
export const jeeDppStatus: Readonly<Record<string, JeeContentStatus>> = { ...ALL_WITHHELD };

/** True only if this chapter's JEE Notes may be shown. Unknown chapters are never public. */
export function isJeeNotesPublic(slug: string): boolean {
  return jeeNotesStatus[slug] === "original-reviewed";
}

/** True only if this chapter's JEE DPP may be shown. Unknown chapters are never public. */
export function isJeeDppPublic(slug: string): boolean {
  return jeeDppStatus[slug] === "original-reviewed";
}
