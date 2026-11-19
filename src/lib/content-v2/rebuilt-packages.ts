import { isRebuiltResourcePublic, type RebuiltResource } from "@/lib/content-policy/publication";
import { formulaSheetPublicationGaps, validateChapterPackage, type ChapterPackage } from "./chapter-package";

// ─────────────────────────────────────────────────────────────────
// Rebuilt content packages, by existing route slug (server-side only).
//
// PUBLIC INFRASTRUCTURE ONLY. This repository is public, so unpublished
// learning drafts are NOT kept here: they live in a private store outside
// the repository and are never imported by this code. This registry is
// therefore EMPTY until a chapter is approved for publication.
//
// Process for introducing a chapter (each step separately approved):
//   1. Independent academic review completes in the private store; every
//      block carries a named, dated, independent approval.
//   2. The package file is added to this repository (it becomes public at
//      this point, by design) and registered below.
//   3. Its publication switches in REBUILT_PUBLICATION are turned on in
//      the same reviewed change.
//
// A package is served for a chapter resource only when ALL gates pass:
//   1. its publication switch is on (REBUILT_PUBLICATION; all off);
//   2. the package status is "published";
//   3. validateChapterPackage() reports no errors (named, independent,
//      dated approvals; licence evidence; references; structure);
//   4. the package actually has valid content for that resource.
// Any exception while checking counts as a failure (fail closed).
// ─────────────────────────────────────────────────────────────────

export const REBUILT_PACKAGES: Readonly<Record<string, ChapterPackage>> = {};

/** Does the package contain valid content to show for this resource? */
export function packageHasResource(pkg: ChapterPackage, resource: RebuiltResource): boolean {
  switch (resource) {
    case "notes":
      return Array.isArray(pkg.notes) && pkg.notes.length > 0;
    case "short-notes":
      return Array.isArray(pkg.shortNotes) && pkg.shortNotes.length > 0;
    case "dpp":
      return Array.isArray(pkg.dpp) && pkg.dpp.length > 0;
    case "formula-sheet":
      return Array.isArray(pkg.formulaSheet) && pkg.formulaSheet.length > 0 && formulaSheetPublicationGaps(pkg).length === 0;
    default:
      return false;
  }
}

/** Gates 2–4 for a package. Fails closed: malformed data or any thrown error means "not servable". */
export function isPackageServable(pkg: ChapterPackage | undefined | null, resource: RebuiltResource): boolean {
  if (!pkg) return false;
  try {
    return pkg.status === "published" && validateChapterPackage(pkg).length === 0 && packageHasResource(pkg, resource);
  } catch {
    return false;
  }
}

/** All four gates, with the switch and package supplied explicitly (pure; used by tests and by the live lookup). */
export function resolveServablePackage(
  switchOn: boolean,
  pkg: ChapterPackage | undefined | null,
  resource: RebuiltResource
): ChapterPackage | null {
  if (switchOn !== true) return null;
  return pkg && isPackageServable(pkg, resource) ? pkg : null;
}

/** The package to render for a chapter resource, or null (all four gates, live switches and registry). */
export function getServableRebuiltPackage(resource: RebuiltResource, slug: string): ChapterPackage | null {
  return resolveServablePackage(isRebuiltResourcePublic(resource, slug), REBUILT_PACKAGES[slug], resource);
}
