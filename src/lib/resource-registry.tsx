import { Suspense, type ReactNode } from "react";
import NotesDisplay from "@/components/NotesDisplay";
import ShortNotesDisplay from "@/components/ShortNotesDisplay";
import DppDisplay from "@/components/DppDisplay";
import PyqDisplay from "@/components/PyqDisplay";
import JeeNotesDisplay from "@/components/JeeNotesDisplay";
import FormulaSheetDisplay from "@/components/formula-sheet/FormulaSheetDisplay";
import { getChapterNotes } from "@/lib/notes";
import { getChapterShortNotes } from "@/lib/notes/short-index";
import { getChapterDpp } from "@/lib/dpp";
import { getChapterPyq } from "@/lib/pyq";
import { getChapterJeeNotes } from "@/lib/jee-notes";
import { getChapterJeeDpp } from "@/lib/jee-dpp";
import { getChapterFormulaSheet } from "@/lib/formula-sheet";

// ─────────────────────────────────────────────────────────────────
// Resource Registry
//
// Single source of truth for every chapter "resource" (Notes, Formula
// Sheet, DPP, PYQ, ...). Adding a brand-new resource type in future
// (Videos, AI Tutor, Revision Mode) means adding ONE entry here — the
// dynamic [resource] route, the sub-nav, generateStaticParams, and
// generateMetadata all read from this file and need no other change.
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
  hasData: (slug: string) => boolean;
  render: (slug: string) => ReactNode | null;
  /** Unique, content-derived meta description for this chapter+resource. */
  describe: (chapterName: string, slug: string) => string;
};

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

export const resourceRegistry: Record<ResourceKey, ResourceDef> = {
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
    describe: (chapterName) =>
      `JEE-focused notes and worked examples for ${chapterName}, drawn from Cengage-level problem sets.`,
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
      return dpp ? <DppDisplay dpp={dpp} /> : null;
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
      return dpp ? <DppDisplay dpp={dpp} /> : null;
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
      // PyqDisplay reads the `?exam=` filter itself via useSearchParams
      // (e.g. a link from the NEET/JEE hub's exam tabs), which requires a
      // Suspense boundary per Next.js App Router rules.
      return (
        <Suspense fallback={<div className="text-sm text-slate">Loading questions…</div>}>
          <PyqDisplay pyq={pyq} />
        </Suspense>
      );
    },
    describe: (chapterName, slug) => {
      const pyq = getChapterPyq(slug);
      return pyq
        ? `${pyq.questions.length} previous year questions on ${chapterName} from JEE Main, JEE Advanced, and NEET.`
        : `Previous year questions for ${chapterName}.`;
    },
  },
};
