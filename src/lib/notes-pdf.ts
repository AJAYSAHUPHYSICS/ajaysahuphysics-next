// ─────────────────────────────────────────────────────────────────
// Notes PDF availability (BUILD TIME ONLY)
//
// Each chapter's Notes page offers a "Download PDF" link to
// /notes-pdf/class-{cls}/{slug}.pdf. That link must only appear when
// the file really exists in public/, otherwise students get a 404
// (audit finding B-1 / P1-4).
//
// The check reads the filesystem, so this module may ONLY be imported
// from server components (the static [resource] pages), never from a
// "use client" file. It runs once per page during `next build`.
//
// Restoring a missing PDF needs no code change: add the file under
// public/notes-pdf/class-{cls}/ and rebuild; the link reappears.
// Missing files are tracked in docs/MISSING_ASSETS.md.
// ─────────────────────────────────────────────────────────────────

import { existsSync } from "node:fs";
import path from "node:path";

/** Same slug shape used by every chapter in chapters.ts. Anything else
 * (e.g. "../", empty, uppercase) is rejected before touching the disk. */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const DEFAULT_PUBLIC_DIR = path.join(process.cwd(), "public");

/** Public URL of a chapter's notes PDF (whether or not the file exists). */
export function notesPdfHref(cls: "11" | "12", slug: string): string {
  return `/notes-pdf/class-${cls}/${slug}.pdf`;
}

/** True if public/notes-pdf/class-{cls}/{slug}.pdf exists. `publicDir`
 * is overridable for tests only. */
export function hasNotesPdf(
  cls: "11" | "12",
  slug: string,
  publicDir: string = DEFAULT_PUBLIC_DIR
): boolean {
  if (cls !== "11" && cls !== "12") return false;
  if (!SLUG_PATTERN.test(slug)) return false;
  return existsSync(path.join(publicDir, "notes-pdf", `class-${cls}`, `${slug}.pdf`));
}
