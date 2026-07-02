// ─────────────────────────────────────────────────────────────────
// Formula Sheet System — Core Type Definitions
// Project Atlas · Ajay Sahu Physics
// Version 1.0.0
// ─────────────────────────────────────────────────────────────────

// ── Exam & Classification Tags ───────────────────────────────────

export type ExamTag =
  | "jee-main"
  | "jee-advanced"
  | "neet"
  | "mht-cet"
  | "boards";

export type Difficulty = "easy" | "medium" | "hard";

/** How often this formula is directly used in exam questions. */
export type Frequency = "very-high" | "high" | "medium" | "low";

// ── Variable Definition ──────────────────────────────────────────

export interface FormulaVariable {
  /** Symbol as written in the expression, e.g. "v" */
  symbol: string;
  /** Human-readable name, e.g. "final velocity" */
  name: string;
  /** SI unit, e.g. "m/s". Use "dimensionless" when applicable. */
  unit: string;
  /** Dimensional formula, e.g. "[LT⁻¹]" */
  dimension: string;
  /** Optional clarification, e.g. "measured from the point of projection" */
  notes?: string;
}

// ── Exam Occurrence Statistics ───────────────────────────────────

/**
 * Approximate count of direct appearances in past papers.
 * Used for "asked N times in JEE Main" badges and priority sorting.
 * Omit a key when data is not yet compiled for that exam.
 */
export interface ExamStats {
  jeeMain?: number;
  jeeAdvanced?: number;
  neet?: number;
  mhtCet?: number;
}

// ── Derivation Support ───────────────────────────────────────────

export interface DerivationStep {
  /** One logical step, e.g. "Integrate a = dv/dt with constant a" */
  statement: string;
  /** Optional intermediate expression at this step */
  expression?: string;
}

export interface Derivation {
  /** Starting point, e.g. "Definition of acceleration: a = dv/dt" */
  startsFrom: string;
  steps: DerivationStep[];
  /** Whether exams have asked to reproduce this derivation (boards mostly) */
  askedInBoards?: boolean;
}

// ── Concept Linking ──────────────────────────────────────────────

/**
 * Connects a formula to the notes system and related concepts,
 * enabling "read the concept" deep links and future AI context.
 */
export interface ConceptLink {
  /** Chapter slug in chapters.ts, e.g. "kinematics" */
  chapterSlug: string;
  /** Heading text of the matching section in that chapter's notes */
  sectionHeading?: string;
  /** Free-text concept name for AI/search, e.g. "uniformly accelerated motion" */
  concept: string;
}

// ── Single Formula ───────────────────────────────────────────────

export interface Formula {
  /** Globally unique slug, e.g. "kinematics-first-equation-of-motion" */
  id: string;
  /** Plain-text expression, e.g. "v = u + at" */
  expression: string;
  /** Optional LaTeX form for a future math renderer */
  expressionLatex?: string;
  /** Short display name, e.g. "First equation of motion" */
  label: string;
  /** One-line origin note, e.g. "From the definition of constant acceleration" */
  derivedFrom?: string;
  /** Full step-by-step derivation (optional; key formulas only) */
  derivation?: Derivation;
  variables: FormulaVariable[];
  /** Validity conditions, e.g. ["Constant acceleration only"] */
  conditions?: string[];
  commonMistakes?: string[];
  /** Chapters/topics where this formula is reused, e.g. ["laws-of-motion"] */
  usedIn?: string[];
  /** Link to the notes section explaining the underlying concept */
  conceptLink?: ConceptLink;
  examTags: ExamTag[];
  /** How frequently exams use this formula directly */
  frequency: Frequency;
  /** Per-exam appearance counts (approximate, from PYQ analysis) */
  examStats?: ExamStats;
  difficulty: Difficulty;
  /** true → shown in the quick-revision strip */
  isKeyFormula: boolean;
  /** false → excluded from generated PDF */
  pdfInclude: boolean;
  /** Extra search terms, e.g. ["SUVAT", "equations of motion"] */
  searchKeywords?: string[];
}

// ── Topic Group ──────────────────────────────────────────────────

export interface FormulaTopicGroup {
  /** Unique within the chapter, e.g. "kinematics-projectile-motion" */
  id: string;
  /** Display heading, e.g. "Projectile Motion" */
  title: string;
  /** 1–2 lines of context shown under the heading */
  intro?: string;
  formulas: Formula[];
  importantObservations?: string[];
  /** Exam-specific guidance, e.g. "JEE Advanced combines this with relative motion" */
  examNotes?: string;
}

// ── Chapter Formula Sheet ────────────────────────────────────────

export interface ChapterFormulaSheet {
  /** Must exactly match the slug in src/lib/chapters.ts */
  chapterSlug: string;
  chapterName: string;
  className: "11" | "12";
  /** Semver for cache-busting and AI diff tracking, e.g. "1.0.0" */
  version: string;
  /** ISO date, e.g. "2026-07-02" */
  lastUpdated: string;
  topicGroups: FormulaTopicGroup[];
  /** Which exams this chapter is part of */
  examCoverage: ExamTag[];
  /** Formula ids surfaced in the compact quick-revision strip, in order */
  quickRevisionIds: string[];
}

// ── Registry ─────────────────────────────────────────────────────

export type FormulaSheetRegistry = Record<string, ChapterFormulaSheet>;
