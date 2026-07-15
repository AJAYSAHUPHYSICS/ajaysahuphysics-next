import type { ChapterContent } from "./types";
import { mechanicsContent } from "./mechanics";
import { propertiesOfMatterContent } from "./properties-of-matter";
import { thermodynamicsClusterContent } from "./thermodynamics-cluster";
import { oscillationsAndWavesContent } from "./oscillations-and-waves";

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
  ...propertiesOfMatterContent,
  ...thermodynamicsClusterContent,
  ...oscillationsAndWavesContent,
};

export function getChapterContent(slug: string): ChapterContent | undefined {
  return chapterContentRegistry[slug];
}

export type { ChapterContent, ChapterFaq, RelatedChapter } from "./types";
