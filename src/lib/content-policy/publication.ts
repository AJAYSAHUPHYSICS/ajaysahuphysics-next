import { isJeeDppPublic, isJeeNotesPublic } from "./jee-publication";
import { publicPyqAvailability } from "./public-pyq-availability";

// ─────────────────────────────────────────────────────────────────
// Central content-publication policy (open-source migration, Phase A)
//
// THE single place that decides whether learning content may reach a
// student-facing page, a hub, search, the sitemap or a download.
// Lightweight and client-safe: no content is imported here.
//
// Owner decision (2026-11-18): every piece of LEGACY learning content is
// withheld while the platform is rebuilt from properly licensed open
// educational resources and independently written material. Legacy
// source files are kept (not deleted) but are never rendered.
//
// The `false` literal type below is deliberate: re-enabling a legacy
// source needs a code change that the type checker and the tests will
// flag, not a one-character edit. New content enters through the
// rebuilt-content packages (see docs/content/CHAPTER_TEMPLATE.md), each
// with recorded sources, licences and review, never through this switch.
// ─────────────────────────────────────────────────────────────────

/** Every legacy learning-content source on the site. */
export const LEGACY_CONTENT_SOURCES = [
  "notes",
  "short-notes",
  "formula-sheet",
  "dpp",
  "jee-notes",
  "jee-dpp",
  "pyq",
  /** Downloadable notes PDFs (removed from public/ and from the repository tree). */
  "notes-pdf",
  /** Chapter-page guidance: overview summary, prerequisites, tips, common mistakes, strategy, FAQs, related-chapter explanations. */
  "chapter-guidance",
] as const;

export type LegacyContentSource = (typeof LEGACY_CONTENT_SOURCES)[number];

const LEGACY_PUBLICATION: { readonly [K in LegacyContentSource]: false } = {
  notes: false,
  "short-notes": false,
  "formula-sheet": false,
  dpp: false,
  "jee-notes": false,
  "jee-dpp": false,
  pyq: false,
  "notes-pdf": false,
  "chapter-guidance": false,
};

/** Whether a legacy source may be shown at all. Currently false for every source. */
export function isLegacyContentPublic(source: LegacyContentSource): boolean {
  return LEGACY_PUBLICATION[source];
}

/** Chapter resource pages (the [resource] routes). */
export type ChapterResource = "notes" | "short-notes" | "formula-sheet" | "dpp" | "jee-notes" | "jee-dpp" | "pyq";

/** Resources a rebuilt content package can render. */
export type RebuiltResource = "notes" | "short-notes" | "formula-sheet" | "dpp";

/**
 * Publication switches for REBUILT content packages (src/lib/content-v2).
 * One switch per chapter and resource. ALL are false: no rebuilt chapter is
 * published. Turning one on is a separate, reviewed change, and the server
 * renders a package only if, in addition, the package's status is
 * "published" and validateChapterPackage() reports no errors (tested).
 */
export const REBUILT_PUBLICATION: Readonly<Record<string, Readonly<Record<RebuiltResource, boolean>>>> = {
  "physical-world-and-measurement": { notes: false, "short-notes": false, "formula-sheet": false, dpp: false },
  kinematics: { notes: false, "short-notes": false, "formula-sheet": false, dpp: false },
};

const REBUILT_RESOURCES: readonly string[] = ["notes", "short-notes", "formula-sheet", "dpp"];

/** Whether the rebuilt package for this chapter resource is switched on (client-safe). */
export function isRebuiltResourcePublic(resource: ChapterResource, slug: string): boolean {
  if (!REBUILT_RESOURCES.includes(resource)) return false;
  return REBUILT_PUBLICATION[slug]?.[resource as RebuiltResource] === true;
}

/** Whether the LEGACY content of a chapter resource may be shown (always false now). */
export function isLegacyChapterResourcePublic(resource: ChapterResource, slug: string): boolean {
  if (!isLegacyContentPublic(resource)) return false;
  if (resource === "jee-notes") return isJeeNotesPublic(slug);
  if (resource === "jee-dpp") return isJeeDppPublic(slug);
  if (resource === "pyq") {
    const a = publicPyqAvailability[slug];
    return !!a && (a.neet || a.jeeMain || a.jeeAdvanced);
  }
  return true;
}

/**
 * Whether a chapter's resource page may show content (and therefore be
 * linked, indexed and listed in search): either its rebuilt package is
 * switched on, or its legacy content passes every legacy gate.
 */
export function isChapterResourcePublic(resource: ChapterResource, slug: string): boolean {
  return isRebuiltResourcePublic(resource, slug) || isLegacyChapterResourcePublic(resource, slug);
}

/** Student-facing wording for a withheld resource page. No source names, no counts. */
export const REBUILDING_COPY: Readonly<
  Record<ChapterResource, { heading: string; body: (chapterName: string) => string; describe: (chapterName: string) => string }>
> = {
  notes: {
    heading: "Notes are being rebuilt",
    body: (c) => `We're rebuilding the notes for ${c} from openly licensed educational resources and material written independently by AjaySahuPhysics. They'll appear here once they've been written, checked and reviewed.`,
    describe: (c) => `Notes for ${c} are being rebuilt from openly licensed resources and independently written material.`,
  },
  "short-notes": {
    heading: "Short notes are being rebuilt",
    body: (c) => `We're rebuilding the short revision notes for ${c} alongside the new chapter notes. They'll appear here once they've been reviewed.`,
    describe: (c) => `Short revision notes for ${c} are being rebuilt with the new chapter notes.`,
  },
  "formula-sheet": {
    heading: "The formula sheet is being rebuilt",
    body: (c) => `We're rebuilding the formula sheet for ${c}, with every formula checked and its sources recorded. It'll appear here once it's been reviewed.`,
    describe: (c) => `The formula sheet for ${c} is being rebuilt and checked.`,
  },
  dpp: {
    heading: "Practice questions are being rebuilt",
    body: (c) => `We're writing new practice questions for ${c}, with solutions written independently by AjaySahuPhysics. They'll appear here once they've been reviewed.`,
    describe: (c) => `Practice questions for ${c} are being rewritten independently by AjaySahuPhysics.`,
  },
  "jee-notes": {
    heading: "JEE worked examples are being rewritten",
    body: (c) => `We're replacing the JEE worked examples for ${c} with new examples written independently by AjaySahuPhysics. They'll appear here once they've been written and reviewed.`,
    describe: (c) => `JEE worked examples for ${c} are being rewritten independently by AjaySahuPhysics.`,
  },
  "jee-dpp": {
    heading: "JEE practice questions are being rewritten",
    body: (c) => `We're replacing the JEE practice questions for ${c} with new questions and solutions written independently by AjaySahuPhysics. They'll appear here once they've been written and reviewed.`,
    describe: (c) => `JEE practice questions for ${c} are being rewritten independently by AjaySahuPhysics.`,
  },
  pyq: {
    heading: "Previous year questions are being rebuilt",
    body: (c) => `We're rebuilding the previous year questions for ${c}. A question will only appear here once it has been checked against the official exam paper and the right to reproduce it has been confirmed, with a solution written independently by AjaySahuPhysics.`,
    describe: (c) => `Previous year questions for ${c} are being rebuilt from official exam papers and independently verified.`,
  },
};
