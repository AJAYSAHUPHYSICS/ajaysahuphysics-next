import type { ChapterPyq } from "./kinematics";
import { kinematicsPyq } from "./kinematics";
import { lawsOfMotionPyq } from "./laws-of-motion";

export const pyqRegistry: Record<string, ChapterPyq> = {
  kinematics: kinematicsPyq,
  "laws-of-motion": lawsOfMotionPyq,
};

export function getChapterPyq(slug: string): ChapterPyq | undefined {
  return pyqRegistry[slug];
}
