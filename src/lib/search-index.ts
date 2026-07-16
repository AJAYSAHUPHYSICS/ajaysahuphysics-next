import { allChapters } from "./chapters";
import { hasNotes } from "./notes/slugs";
import { hasShortNotes } from "./notes/short-slugs";
import { hasFormulaSheet } from "./formula-sheet/slugs";
import { hasDpp } from "./dpp/slugs";
import { hasPyqFor } from "./pyq/availability";
import { hasJeeNotes } from "./jee-notes/slugs";
import { hasJeeDpp } from "./jee-dpp/slugs";

// ─────────────────────────────────────────────────────────────────
// Site-wide Search Index (lightweight, static)
//
// Built once, at module load, from the same lightweight availability
// helpers used elsewhere to keep heavy content out of client bundles
// (see src/lib/notes/slugs.ts and friends). This module holds ONLY
// slugs, names, and hrefs — never note/DPP/PYQ text — so it is safe
// to import directly into a client component: the entire index for
// all 30 chapters is a small, fixed-size array, nowhere near the
// scale of the full content registries.
//
// This is the single source of truth for the global search feature.
// Do not duplicate this list elsewhere — extend it here if a new
// resource type is added to the site.
// ─────────────────────────────────────────────────────────────────

export type SearchResource = {
  key: string;
  label: string;
  href: string;
};

export type SearchEntry = {
  slug: string;
  name: string;
  cls: "11" | "12";
  /** This site covers a single subject; kept as an explicit field (rather
   * than hardcoded in the UI) so search can match on it, and so a future
   * multi-subject site would only need to change this one line. */
  subject: "Physics";
  resources: SearchResource[];
};

function buildResources(cls: "11" | "12", slug: string): SearchResource[] {
  const base = `/class-${cls}/${slug}`;
  const resources: SearchResource[] = [];
  if (hasNotes(slug)) resources.push({ key: "notes", label: "Notes", href: `${base}/notes` });
  if (hasShortNotes(slug))
    resources.push({ key: "short-notes", label: "Short Notes", href: `${base}/short-notes` });
  if (hasFormulaSheet(slug))
    resources.push({ key: "formula-sheet", label: "Formula Sheet", href: `${base}/formula-sheet` });
  if (hasDpp(slug)) resources.push({ key: "dpp", label: "DPP", href: `${base}/dpp` });
  if (hasPyqFor(slug, "neet") || hasPyqFor(slug, "jee-main") || hasPyqFor(slug, "jee-advanced"))
    resources.push({ key: "pyq", label: "PYQ", href: `${base}/pyq` });
  if (hasJeeNotes(slug))
    resources.push({ key: "jee-notes", label: "JEE Notes", href: `${base}/jee-notes` });
  if (hasJeeDpp(slug))
    resources.push({ key: "jee-dpp", label: "JEE DPP", href: `${base}/jee-dpp` });
  return resources;
}

export const searchIndex: SearchEntry[] = allChapters.map((chapter) => ({
  slug: chapter.slug,
  name: chapter.name,
  cls: chapter.cls,
  subject: "Physics",
  resources: buildResources(chapter.cls, chapter.slug),
}));
