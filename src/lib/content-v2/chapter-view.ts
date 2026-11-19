import type { ChapterNotes } from "@/lib/notes/kinematics";
import type { ChapterShortNotes } from "@/lib/notes/kinematics-short";
import type { ChapterDpp } from "@/lib/dpp/kinematics";
import type { ChecklistItemKey } from "@/lib/checklist";
import type { ChapterFormulaSheet, ExamTag } from "@/lib/formula-sheet/types";
import { formulaSheetPublicationGaps, type ChapterPackage, type Formula, type Level, type PracticeQuestion } from "./chapter-package";

// ─────────────────────────────────────────────────────────────────
// Chapter view model + adapters (renderer prototype; NOT wired to routes)
//
// One canonical ChapterPackage → every page type is a VIEW of it:
//   notes, short notes, formula sheet, solved examples, DPP, practice,
//   revision checklist, progress slots.
// Formulas exist once (formulaSheet) and are resolved by ID wherever they
// are referenced. Adapters turn a package into the data shapes the
// existing, tested display components already accept, so rebuilt chapters
// can reuse them, and DPP questions keep their stable `number`, which is
// exactly what DppDisplay saves as a mistake's questionId (no storage
// format change).
//
// Pure functions only. Nothing here imports a draft or renders on the site.
// ─────────────────────────────────────────────────────────────────

export type ResolvedSection = {
  id: string;
  anchor: string;
  heading: string;
  body: string;
  points: string[];
  formulas: Formula[];
};

export type ChapterView = {
  id: string;
  title: string;
  overview: { summary: string; learningOutcomes: string[] };
  sections: ResolvedSection[];
  shortNotesBySection: { sectionId: string | null; heading: string; points: string[] }[];
  formulaSheet: Formula[];
  solvedExamples: (ChapterPackage["solvedExamples"][number] & { formulas: Formula[] })[];
  dpp: PracticeQuestion[];
  practiceByLevel: Record<Level, PracticeQuestion[]>;
  revisionChecklist: string[];
  /** The four existing checklist slots this chapter supports (unchanged progress maths). */
  progressSlots: ChecklistItemKey[];
};

function formulaIndex(pkg: ChapterPackage): Map<string, Formula> {
  return new Map(pkg.formulaSheet.map((f) => [f.id, f]));
}

function resolve(index: Map<string, Formula>, refs: string[] | undefined, where: string): Formula[] {
  return (refs ?? []).map((id) => {
    const f = index.get(id);
    if (!f) throw new Error(`${where}: unknown formula "${id}"`);
    return f;
  });
}

/** Builds the full, read-only view model for a chapter package. */
export function buildChapterView(pkg: ChapterPackage): ChapterView {
  const index = formulaIndex(pkg);
  const headingOf = new Map(pkg.notes.map((n) => [n.id, n.heading]));

  const groups = new Map<string | null, string[]>();
  for (const s of pkg.shortNotes) {
    const key = s.ref ?? null;
    groups.set(key, [...(groups.get(key) ?? []), s.text]);
  }

  const practiceByLevel: Record<Level, PracticeQuestion[]> = { board: [], neet: [], "jee-main": [], "jee-advanced": [] };
  for (const q of pkg.examPractice) practiceByLevel[q.level].push(q);

  const progressSlots: ChecklistItemKey[] = [];
  if (pkg.notes.length > 0) progressSlots.push("notes");
  if (pkg.formulaSheet.length > 0) progressSlots.push("formulaSheet");
  if (pkg.dpp.length > 0) progressSlots.push("dpp");
  if (pkg.pyqs.length > 0) progressSlots.push("pyq");

  return {
    id: pkg.id,
    title: pkg.title,
    overview: { summary: pkg.overview.summary, learningOutcomes: [...pkg.overview.learningOutcomes] },
    sections: pkg.notes.map((n) => ({
      id: n.id,
      anchor: `#${n.id}`,
      heading: n.heading,
      body: n.body,
      points: [...(n.points ?? [])],
      formulas: resolve(index, n.formulaRefs, n.id),
    })),
    shortNotesBySection: [...groups].map(([sectionId, points]) => ({
      sectionId,
      heading: sectionId ? (headingOf.get(sectionId) ?? "Quick revision") : "Quick revision",
      points,
    })),
    formulaSheet: [...pkg.formulaSheet],
    solvedExamples: pkg.solvedExamples.map((e) => ({ ...e, formulas: resolve(index, e.formulaRefs, e.id) })),
    dpp: [...pkg.dpp].sort((a, b) => a.number - b.number),
    practiceByLevel,
    revisionChecklist: pkg.revisionChecklist.map((r) => r.text),
    progressSlots,
  };
}

// ── Adapters to the existing display components ──────────────────

/**
 * For NotesDisplay. Formulas come from the formula sheet by reference. When
 * the package has parts (e.g. Kinematics), a heading-only divider section
 * introduces each part, so NotesDisplay needs no change.
 */
export function toLegacyNotes(pkg: ChapterPackage): ChapterNotes {
  const view = buildChapterView(pkg);
  const byId = new Map(view.sections.map((s) => [s.id, s]));
  const toLegacySection = (s: ResolvedSection) => ({
    heading: s.heading,
    body: s.body,
    ...(s.points.length ? { bullets: s.points } : {}),
    ...(s.formulas.length ? { formula: s.formulas.map((f) => ({ label: f.label, expression: f.expression })) } : {}),
  });
  const sections = pkg.parts?.length
    ? pkg.parts.flatMap((p) => [{ heading: p.title }, ...p.sectionIds.map((id) => toLegacySection(byId.get(id)!))])
    : view.sections.map(toLegacySection);
  return { chapterName: pkg.title, className: pkg.cls, intro: pkg.overview.summary, sections };
}

/** For ShortNotesDisplay: short notes grouped under the section they summarise. */
export function toLegacyShortNotes(pkg: ChapterPackage): ChapterShortNotes {
  return {
    chapterName: pkg.title,
    className: pkg.cls,
    groups: buildChapterView(pkg).shortNotesBySection.map((g) => ({ heading: g.heading, points: g.points })),
  };
}

/**
 * For DppDisplay. `number` is carried over unchanged: DppDisplay saves a
 * mistake as questionId = String(number), the existing storage format.
 */
export function toLegacyDpp(pkg: ChapterPackage, questions: PracticeQuestion[] = pkg.dpp): ChapterDpp {
  return {
    chapterName: pkg.title,
    className: pkg.cls,
    questions: [...questions]
      .sort((a, b) => a.number - b.number)
      .map((q) => ({ number: q.number, question: q.question, options: [...q.options], correctIndex: q.correctIndex, solution: q.solution })),
  };
}

/**
 * For FormulaSheetDisplay. Topic groups are built by resolving canonical
 * formula IDs (no formula record is duplicated in the package). Returns
 * null, never defaults, while any required editorial field is missing:
 * see formulaSheetPublicationGaps().
 */
export function toLegacyFormulaSheet(pkg: ChapterPackage): ChapterFormulaSheet | null {
  if (formulaSheetPublicationGaps(pkg).length > 0) return null;
  const index = formulaIndex(pkg);
  const toLegacy = (f: Formula) => ({
    id: f.id,
    label: f.label,
    expression: f.expression,
    ...(f.derivedFrom ? { derivedFrom: f.derivedFrom } : {}),
    variables: f.variables.map((v) => ({ symbol: v.symbol, name: v.name, unit: v.unit, dimension: v.dimension! })),
    ...(f.conditions ? { conditions: f.conditions } : {}),
    ...(f.commonMistakes ? { commonMistakes: f.commonMistakes } : {}),
    examTags: [...f.examTags!] as ExamTag[],
    frequency: f.frequency!,
    difficulty: f.difficulty!,
    isKeyFormula: f.isKeyFormula!,
    pdfInclude: f.pdfInclude!,
  });
  const examCoverage = [...new Set(pkg.formulaSheet.flatMap((f) => f.examTags ?? []))] as ExamTag[];
  return {
    chapterSlug: pkg.slug,
    chapterName: pkg.title,
    className: pkg.cls,
    version: pkg.version!,
    lastUpdated: pkg.lastUpdated!,
    topicGroups: pkg.formulaGroups!.map((g) => ({
      id: g.id,
      title: g.title,
      ...(g.intro ? { intro: g.intro } : {}),
      formulas: g.formulaIds.map((id) => toLegacy(resolve(index, [id], g.id)[0])),
    })),
    examCoverage,
    quickRevisionIds: [...(pkg.quickRevisionFormulaIds ?? [])],
  };
}

/** Notes sections grouped into the package's parts (e.g. Kinematics' two parts), in order. */
export function sectionsByPart(pkg: ChapterPackage): { id: string; title: string; sectionIds: string[] }[] {
  if (!pkg.parts || pkg.parts.length === 0) return [{ id: "all", title: pkg.title, sectionIds: pkg.notes.map((n) => n.id) }];
  return pkg.parts.map((p) => ({ id: p.id, title: p.title, sectionIds: [...p.sectionIds] }));
}
