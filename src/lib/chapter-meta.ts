import type { ChecklistItemKey } from "./checklist";

/** Small, serializable per-chapter summary computed server-side (it needs
 * resourceRegistry and chapter-content, which must never reach the client
 * bundle directly) and passed down to every M9/M10 client component that
 * needs cross-chapter context — the dashboard, weak-chapters, the revision
 * planner. */
export type ChapterMeta = {
  cls: "11" | "12";
  slug: string;
  name: string;
  number: number;
  availableChecklist: ChecklistItemKey[];
  relatedChapters: { slug: string; reason: string }[];
};
