import type { ChapterContent } from "./types";
import { mechanicsContent } from "./mechanics";

// ─────────────────────────────────────────────────────────────────
// Merge order matches Project ATLAS Milestone M7's build-out order:
// Mechanics → Properties of Matter → Thermodynamics → Oscillations &
// Waves → Electrostatics → Current Electricity → Magnetism → EMI & AC
// → Optics → Modern Physics → Semiconductor Physics.
//
// Each cluster file is added here only once it's complete — this
// registry is allowed to be a subset of the full 30 chapters while
// the build-out is in progress. Consumers must treat a missing slug
// as "no enrichment content yet available for this chapter" and
// degrade gracefully (see getChapterContent below).
// ─────────────────────────────────────────────────────────────────

export const chapterContentRegistry: Record<string, ChapterContent> = {
  ...mechanicsContent,
};

export function getChapterContent(slug: string): ChapterContent | undefined {
  return chapterContentRegistry[slug];
}

export type { ChapterContent, ChapterFaq, RelatedChapter } from "./types";
