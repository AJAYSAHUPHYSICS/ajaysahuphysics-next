import type { ChapterDpp } from "./kinematics";
import { kinematicsDpp } from "./kinematics";

export const dppRegistry: Record<string, ChapterDpp> = {
  kinematics: kinematicsDpp,
};

export function getChapterDpp(slug: string): ChapterDpp | undefined {
  return dppRegistry[slug];
}
