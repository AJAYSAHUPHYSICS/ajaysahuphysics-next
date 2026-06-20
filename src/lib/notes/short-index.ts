import type { ChapterShortNotes } from "./kinematics-short";
import { kinematicsShortNotes } from "./kinematics-short";

export const shortNotesRegistry: Record<string, ChapterShortNotes> = {
  kinematics: kinematicsShortNotes,
};

export function getChapterShortNotes(slug: string): ChapterShortNotes | undefined {
  return shortNotesRegistry[slug];
}
