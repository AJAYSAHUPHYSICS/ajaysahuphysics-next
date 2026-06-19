import type { ChapterNotes } from "./kinematics";
import { kinematicsNotes } from "./kinematics";

// Add one line per chapter as real notes content is written.
// Any chapter slug NOT in this registry automatically shows "Coming Soon".
export const notesRegistry: Record<string, ChapterNotes> = {
  kinematics: kinematicsNotes,
};

export function getChapterNotes(slug: string): ChapterNotes | undefined {
  return notesRegistry[slug];
}
