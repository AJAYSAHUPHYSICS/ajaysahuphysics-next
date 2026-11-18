// ─────────────────────────────────────────────────────────────────
// Hub-page marketing claims (shared by the unit test and the post-build check)
//
// While learning content is withheld, hub pages must not say or imply that
// notes, formula sheets, practice questions or PYQs can be used now.
// ─────────────────────────────────────────────────────────────────

export const HUB_PAGES = ["notes", "dpp", "formula-sheet", "pyq", "jee", "neet", "class-11", "class-12"] as const;

/** Phrases that claimed availability before the rebuild (case-insensitive). */
export const AVAILABILITY_CLAIMS: readonly RegExp[] = [
  /download notes/i,
  /typed, chapter-wise notes built/i,
  /every chapter is covered/i,
  /covered chapter by chapter with/i,
  /start practicing/i,
  /\bcomplete (jee|neet)\b/i,
  /every derived result in one place/i,
  /one-page formula sheets/i,
  /practice exactly what/i,
  /real questions previously asked/i,
  /practice is built to/i,
  /focused practice and previous year/i,
  /notes, practice questions, and pyqs for class/i,
  // Homepage, footer and site-wide defaults (Phase 2A overnight audit).
  /browse free notes/i,
  /everything you need to prepare/i,
  /built around what actually shows up/i,
  /notes, practice questions, and pyqs are\s+organized/i,
  /chapter-wise notes, formula\s+sheets, daily practice problems, and previous year questions/i,
  // Videos page (overnight run 2).
  /alongside the notes, practice questions, and pyqs/i,
];

/** The approved site-wide social-preview description (owner-approved 2026-11-19). */
export const APPROVED_SITE_OG_DESCRIPTION =
  "Physics learning resources for Class 11, Class 12, JEE and NEET — being rebuilt with independently authored content and openly licensed sources.";

export function availabilityClaims(text: string): string[] {
  return AVAILABILITY_CLAIMS.filter((re) => re.test(text)).map((re) => re.source);
}
