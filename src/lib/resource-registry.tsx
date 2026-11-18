import { Suspense, type ReactNode } from "react";
import NotesDisplay from "@/components/NotesDisplay";
import ShortNotesDisplay from "@/components/ShortNotesDisplay";
import DppDisplay from "@/components/DppDisplay";
import PyqDisplay from "@/components/PyqDisplay";
import JeeNotesDisplay from "@/components/JeeNotesDisplay";
import FormulaSheetDisplay from "@/components/formula-sheet/FormulaSheetDisplay";
import ContentRebuildingNotice from "@/components/ContentRebuildingNotice";
import { getChapterNotes } from "@/lib/notes";
import { getChapterShortNotes } from "@/lib/notes/short-index";
import { getChapterDpp } from "@/lib/dpp";
import { getChapterPyq } from "@/lib/pyq";
import { getChapterJeeNotes } from "@/lib/jee-notes";
import { getChapterJeeDpp } from "@/lib/jee-dpp";
import { getChapterFormulaSheet } from "@/lib/formula-sheet";
import { allChapters } from "@/lib/chapters";
import { publicPyqView } from "@/lib/content-policy/pyq-publication";
import { REBUILDING_COPY, isLegacyChapterResourcePublic, isRebuiltResourcePublic, type RebuiltResource } from "@/lib/content-policy/publication";
import PackageAttribution from "@/components/PackageAttribution";
import type { ChapterPackage } from "@/lib/content-v2/chapter-package";
import { toLegacyDpp, toLegacyFormulaSheet, toLegacyNotes, toLegacyShortNotes } from "@/lib/content-v2/chapter-view";
import { getServableRebuiltPackage } from "@/lib/content-v2/rebuilt-packages";

// ─────────────────────────────────────────────────────────────────
// Resource Registry
//
// Single source of truth for every chapter "resource" (Notes, Formula
// Sheet, DPP, PYQ, ...). The dynamic [resource] route, the sub-nav,
// generateStaticParams, generateMetadata and the sitemap all read from
// this file.
//
// Every entry is wrapped by `governed()`, which applies the central
// content-publication policy (src/lib/content-policy/publication.ts):
// while a resource is withheld its page keeps its URL but shows only a
// "being rebuilt" notice, is noindexed, left out of the sitemap and not
// linked from chapter pages. The legacy renderers below are reached only
// when the policy allows it.
// ─────────────────────────────────────────────────────────────────

export type ResourceKey =
  | "notes"
  | "jee-notes"
  | "short-notes"
  | "formula-sheet"
  | "dpp"
  | "jee-dpp"
  | "pyq";

export type ResourceDef = {
  key: ResourceKey;
  label: string;
  /** Compact noun for <title> tags — keeps titles within SEO-safe length. */
  titleNoun: string;
  /** Noun used in generated titles/descriptions, e.g. "formula sheet". */
  seoNoun: string;
  /** schema.org LearningResource `learningResourceType` value. */
  learningResourceType: string;
  /**
   * True if the chapter has this resource's page at all. Drives route
   * generation and the chapter checklist slot, so it must NOT change when
   * content is withheld (that would break URLs and shift students' progress).
   */
  hasData: (slug: string) => boolean;
  render: (slug: string) => ReactNode | null;
  /** Unique meta description for this chapter+resource. */
  describe: (chapterName: string, slug: string) => string;
  /** Whether the page's content is public (set by `governed()`). */
  isPublic: (slug: string) => boolean;
};

type LegacyDef = Omit<ResourceDef, "isPublic">;

/** Indexability of a chapter resource page: it exists and its content is public. */
export function isResourceIndexable(def: ResourceDef, slug: string): boolean {
  return def.hasData(slug) && def.isPublic(slug);
}

/**
 * Whether the chapter sub-nav and overview should link to this page. The
 * route itself still exists whenever `hasData` is true (bookmarks and
 * continue-learning links keep working); this only controls advertising.
 */
export function isResourceLinked(def: ResourceDef, slug: string): boolean {
  return isResourceIndexable(def, slug);
}

/** Class of a chapter slug (slugs are unique across both classes). */
function chapterClassOf(slug: string): "11" | "12" | undefined {
  return allChapters.find((c) => c.slug === slug)?.cls;
}

function chapterNameOf(slug: string): string {
  return allChapters.find((c) => c.slug === slug)?.name ?? "this chapter";
}

const REBUILT_KEYS: readonly ResourceKey[] = ["notes", "short-notes", "formula-sheet", "dpp"];

/** The rebuilt package to serve for this resource, or null (switch + status + validator + content gates). */
function servableRebuilt(key: ResourceKey, slug: string): ChapterPackage | null {
  return REBUILT_KEYS.includes(key) ? getServableRebuiltPackage(key as RebuiltResource, slug) : null;
}

/**
 * Renders a rebuilt package through the existing display components, with
 * attribution. Fails closed: if an adapter throws on malformed data, the
 * result is null and the caller shows the rebuilding notice.
 */
export function renderRebuiltResource(key: RebuiltResource, pkg: ChapterPackage, slug: string): ReactNode | null {
  let body: ReactNode = null;
  try {
    if (key === "notes") body = <NotesDisplay notes={toLegacyNotes(pkg)} />;
    else if (key === "short-notes") body = <ShortNotesDisplay notes={toLegacyShortNotes(pkg)} />;
    else if (key === "dpp") body = <DppDisplay dpp={toLegacyDpp(pkg)} slug={slug} />;
    else if (key === "formula-sheet") {
      const sheet = toLegacyFormulaSheet(pkg);
      body = sheet ? <FormulaSheetDisplay sheet={sheet} /> : null;
    }
  } catch {
    return null;
  }
  return body ? (
    <>
      {body}
      <PackageAttribution pkg={pkg} />
    </>
  ) : null;
}

export type RenderDecision = "rebuilt" | "legacy" | "notice";

/**
 * The single rule for what a resource page shows (pure; exhaustively tested).
 * Once a rebuilt switch is on for a resource, legacy content can NEVER be
 * shown for it: either the servable package or the rebuilding notice.
 */
export function decideRendering(input: { rebuiltSwitchOn: boolean; servable: boolean; legacyPublic: boolean }): RenderDecision {
  if (input.rebuiltSwitchOn) return input.servable ? "rebuilt" : "notice";
  return input.legacyPublic ? "legacy" : "notice";
}

/**
 * Applies the central publication policy to a resource definition, using
 * decideRendering(): rebuilt package, legacy content (only if every legacy
 * gate passes: never today), or the rebuilding notice.
 */
function governed(def: LegacyDef): ResourceDef {
  const copy = REBUILDING_COPY[def.key];
  const decide = (slug: string): { decision: RenderDecision; pkg: ChapterPackage | null } => {
    const pkg = servableRebuilt(def.key, slug);
    const decision = decideRendering({
      rebuiltSwitchOn: REBUILT_KEYS.includes(def.key) && isRebuiltResourcePublic(def.key, slug),
      servable: pkg !== null,
      legacyPublic: isLegacyChapterResourcePublic(def.key, slug),
    });
    return { decision, pkg };
  };
  const isPublic = (slug: string) => decide(slug).decision !== "notice";
  const notice = (slug: string) => {
    const cls = chapterClassOf(slug);
    if (!cls) return null;
    const chapterName = chapterNameOf(slug);
    return (
      <ContentRebuildingNotice cls={cls} slug={slug} chapterName={chapterName} heading={copy.heading} body={copy.body(chapterName)} />
    );
  };
  return {
    ...def,
    isPublic,
    render: (slug) => {
      if (!def.hasData(slug)) return null;
      const { decision, pkg } = decide(slug);
      if (decision === "rebuilt" && pkg) return renderRebuiltResource(def.key as RebuiltResource, pkg, slug) ?? notice(slug);
      if (decision === "legacy") return def.render(slug);
      return notice(slug);
    },
    describe: (chapterName, slug) => {
      const { decision } = decide(slug);
      if (decision === "rebuilt") return `${def.label} for ${chapterName}, written independently and reviewed for AjaySahuPhysics.`;
      if (decision === "legacy") return def.describe(chapterName, slug);
      return copy.describe(chapterName);
    },
  };
}

/** True if any resource page of this chapter currently shows public content. */
export function chapterHasPublicResource(slug: string): boolean {
  return RESOURCE_ORDER.some((key) => isResourceIndexable(resourceRegistry[key], slug));
}

/** Display order — matches the resource tab order used across the site. */
export const RESOURCE_ORDER: ResourceKey[] = [
  "notes",
  "jee-notes",
  "short-notes",
  "formula-sheet",
  "dpp",
  "jee-dpp",
  "pyq",
];

const legacyDefs: Record<ResourceKey, LegacyDef> = {
  notes: {
    key: "notes",
    label: "Notes",
    titleNoun: "Notes",
    seoNoun: "notes",
    learningResourceType: "Lecture Notes",
    hasData: (slug) => !!getChapterNotes(slug),
    render: (slug) => {
      const notes = getChapterNotes(slug);
      return notes ? <NotesDisplay notes={notes} /> : null;
    },
    describe: (chapterName) =>
      `Complete typed notes for ${chapterName} — every section explained with worked formulas, for JEE and NEET Physics.`,
  },
  "jee-notes": {
    key: "jee-notes",
    label: "JEE Notes",
    titleNoun: "JEE Notes",
    seoNoun: "JEE notes",
    learningResourceType: "Lecture Notes",
    hasData: (slug) => !!getChapterJeeNotes(slug),
    render: (slug) => {
      const notes = getChapterJeeNotes(slug);
      return notes ? <JeeNotesDisplay notes={notes} /> : null;
    },
    describe: (chapterName) => `JEE-focused notes and worked examples for ${chapterName}.`,
  },
  "short-notes": {
    key: "short-notes",
    label: "Short Notes",
    titleNoun: "Short Notes",
    seoNoun: "short notes",
    learningResourceType: "Lecture Notes",
    hasData: (slug) => !!getChapterShortNotes(slug),
    render: (slug) => {
      const notes = getChapterShortNotes(slug);
      return notes ? <ShortNotesDisplay notes={notes} /> : null;
    },
    describe: (chapterName) =>
      `Condensed revision points for ${chapterName} — fast last-minute recall before exams.`,
  },
  "formula-sheet": {
    key: "formula-sheet",
    label: "Formula Sheet",
    titleNoun: "Formulas",
    seoNoun: "formula sheet",
    learningResourceType: "Formula Sheet",
    hasData: (slug) => !!getChapterFormulaSheet(slug),
    render: (slug) => {
      const sheet = getChapterFormulaSheet(slug);
      return sheet ? <FormulaSheetDisplay sheet={sheet} /> : null;
    },
    describe: (chapterName, slug) => {
      const sheet = getChapterFormulaSheet(slug);
      if (!sheet) return `Formula sheet for ${chapterName}, for JEE and NEET Physics.`;
      const count = sheet.topicGroups.reduce((n, g) => n + g.formulas.length, 0);
      return `${count} formulas across ${sheet.topicGroups.length} topics for ${chapterName} — every derived result, condition, and common mistake in one place.`;
    },
  },
  dpp: {
    key: "dpp",
    label: "Practice Questions",
    titleNoun: "DPP",
    seoNoun: "practice questions",
    learningResourceType: "Practice Problems",
    hasData: (slug) => !!getChapterDpp(slug),
    render: (slug) => {
      const dpp = getChapterDpp(slug);
      return dpp ? <DppDisplay dpp={dpp} slug={slug} /> : null;
    },
    describe: (chapterName, slug) => {
      const dpp = getChapterDpp(slug);
      return dpp
        ? `${dpp.questions.length} daily practice problems on ${chapterName} with instant answer reveal.`
        : `Daily practice problems for ${chapterName}.`;
    },
  },
  "jee-dpp": {
    key: "jee-dpp",
    label: "JEE Practice Questions",
    titleNoun: "JEE DPP",
    seoNoun: "JEE practice questions",
    learningResourceType: "Practice Problems",
    hasData: (slug) => !!getChapterJeeDpp(slug),
    render: (slug) => {
      const dpp = getChapterJeeDpp(slug);
      return dpp ? <DppDisplay dpp={dpp} slug={slug} /> : null;
    },
    describe: (chapterName, slug) => {
      const dpp = getChapterJeeDpp(slug);
      return dpp
        ? `${dpp.questions.length} JEE-level practice problems for ${chapterName}.`
        : `JEE-level practice problems for ${chapterName}.`;
    },
  },
  pyq: {
    key: "pyq",
    label: "PYQ",
    titleNoun: "PYQ",
    seoNoun: "previous year questions",
    learningResourceType: "Practice Problems",
    hasData: (slug) => !!getChapterPyq(slug),
    render: (slug) => {
      const pyq = getChapterPyq(slug);
      if (!pyq) return null;
      // Even when published, only verified + rights-cleared questions are
      // shown, each keeping its original position as its mistake ID.
      const view = publicPyqView(pyq);
      // PyqDisplay reads the `?exam=` filter itself via useSearchParams,
      // which requires a Suspense boundary per Next.js App Router rules.
      return (
        <Suspense fallback={<div className="text-sm text-slate">Loading questions…</div>}>
          <PyqDisplay pyq={view.pyq} slug={slug} questionIds={view.questionIds} />
        </Suspense>
      );
    },
    describe: (chapterName, slug) => {
      const pyq = getChapterPyq(slug);
      const published = pyq ? publicPyqView(pyq).pyq.questions.length : 0;
      return `${published} verified previous year questions on ${chapterName}, with independently written solutions.`;
    },
  },
};

export const resourceRegistry: Record<ResourceKey, ResourceDef> = Object.fromEntries(
  RESOURCE_ORDER.map((key) => [key, governed(legacyDefs[key])])
) as Record<ResourceKey, ResourceDef>;
