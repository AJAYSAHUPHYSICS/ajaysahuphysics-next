// ─────────────────────────────────────────────────────────────────
// Chapter Content — Type Definitions
//
// Rich, chapter-specific enrichment content: introductions, study
// strategy, related-chapter cross-links, and FAQs. This supports the
// long-form "learn about this chapter" section on each chapter's
// Overview page — distinct from:
//   - chapter-overviews.ts   (a short 2-3 sentence blurb)
//   - notes/ pyq/ dpp/ formula-sheet/  (the actual study material)
//
// Kept in its own directory, separate from the content registries, per
// Project ATLAS convention: registries hold exam-facing study material;
// this holds editorial/explanatory content ABOUT that material.
//
// Populated incrementally by subject cluster (see index.ts for the
// cluster file list and merge order). Every field below is required
// unless explicitly marked optional, so a chapter is either fully
// enriched or not present in the registry at all — no partially-filled,
// thin entries.
// ─────────────────────────────────────────────────────────────────

/** A single genuine, non-filler FAQ entry. */
export type ChapterFaq = {
  question: string;
  answer: string;
};

/** A cross-link to a chapter with a real physics/curriculum dependency — not just a neighbouring chapter number. */
export type RelatedChapter = {
  slug: string;
  /** Why this chapter is actually related — the specific dependency or shared concept. */
  reason: string;
};

export type ChapterContent = {
  /** 150-250 word introduction: what the chapter covers, in a consistent teaching voice. */
  introduction: string;

  /** Why this chapter matters — its role in the broader syllabus and in NEET/JEE specifically. */
  whyItMatters: string;

  /** Chapters or specific skills a student should already have before starting this one. */
  prerequisites: string[];

  /** Specific, genuine error patterns students make in this chapter — not generic advice. */
  commonMistakes: string[];

  /** Recommended approach/order for working through this chapter's sub-topics. */
  studyStrategy: string;

  /** How to revise this chapter efficiently once first studied. */
  revisionStrategy: string;

  /** How to approach this chapter's Previous Year Questions specifically. */
  pyqStrategy: string;

  /** How to approach this chapter's Daily Practice Problems specifically. */
  dppStrategy: string;

  /** Chapters with a genuine physics/curriculum dependency on or with this one. */
  relatedChapters: RelatedChapter[];

  /** Genuine, chapter-specific FAQs — no filler or SEO-only questions. */
  faqs: ChapterFaq[];

  /** Optional: brief, factual note on how this chapter tends to be weighted across NEET/JEE Main/JEE Advanced. */
  examWeightageNotes?: string;

  /** Optional: short, high-value tips that don't fit neatly into the other fields. */
  importantTips?: string[];
};
