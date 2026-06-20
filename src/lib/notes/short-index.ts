import type { ChapterShortNotes } from "./kinematics-short";
import { kinematicsShortNotes } from "./kinematics-short";
import { lawsOfMotionShortNotes } from "./laws-of-motion-short";

export const shortNotesRegistry: Record<string, ChapterShortNotes> = {
  kinematics: kinematicsShortNotes,
  "laws-of-motion": lawsOfMotionShortNotes,
};

export function getChapterShortNotes(slug: string): ChapterShortNotes | undefined {
  return shortNotesRegistry[slug];
}
