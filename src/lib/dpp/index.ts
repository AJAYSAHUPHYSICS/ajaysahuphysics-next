import type { ChapterDpp } from "./kinematics";
import { kinematicsDpp } from "./kinematics";
import { lawsOfMotionDpp } from "./laws-of-motion";

export const dppRegistry: Record<string, ChapterDpp> = {
  kinematics: kinematicsDpp,
  "laws-of-motion": lawsOfMotionDpp,
};

export function getChapterDpp(slug: string): ChapterDpp | undefined {
  return dppRegistry[slug];
}
