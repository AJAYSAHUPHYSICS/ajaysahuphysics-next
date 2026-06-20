import type { ChapterPyq } from "./kinematics";
import { kinematicsPyq } from "./kinematics";

export const pyqRegistry: Record<string, ChapterPyq> = {
  kinematics: kinematicsPyq,
};

export function getChapterPyq(slug: string): ChapterPyq | undefined {
  return pyqRegistry[slug];
}
