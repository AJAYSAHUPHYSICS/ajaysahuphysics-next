import { isChapterResourcePublic, type ChapterResource } from "./publication";

// ─────────────────────────────────────────────────────────────────
// Study-link guard (client-safe)
//
// Planner and recommendation features must never send a student to a
// resource page whose content is withheld (it only shows a "being
// rebuilt" notice). Paths that aren't chapter resource pages (chapter
// overviews, #revision-rounds anchors, hubs) are always allowed.
//
// Students' own records (bookmarks, recently viewed, continue studying)
// are NOT filtered: those are their data and keep working as before.
// ─────────────────────────────────────────────────────────────────

const RESOURCE_PATH = /^\/class-(?:11|12)\/([a-z0-9-]+)\/(notes|short-notes|formula-sheet|dpp|jee-notes|jee-dpp|pyq)\/?(?:[?#].*)?$/;

/** The chapter resource a path points to, or null if it isn't a resource page. */
export function resourceOfPath(path: string): { slug: string; resource: ChapterResource } | null {
  const m = RESOURCE_PATH.exec(path);
  return m ? { slug: m[1], resource: m[2] as ChapterResource } : null;
}

/** False only for a chapter resource page whose content is currently withheld. */
export function isAvailableStudyPath(path: string): boolean {
  const r = resourceOfPath(path);
  return r ? isChapterResourcePublic(r.resource, r.slug) : true;
}
