// ─────────────────────────────────────────────────────────────────
// Study Checklist (client-side only, localStorage)
//
// Per-chapter completion tracking for the four resource types a
// chapter can have. Keyed by "{cls}:{slug}" so Class 11 and Class 12
// chapters that happen to share a slug never collide.
// ─────────────────────────────────────────────────────────────────

import { createNotifier } from "./local-store-events";
import { recordActivity } from "./study-streak";

const STORAGE_KEY = "atlas:checklist";
const { subscribe, notify } = createNotifier();
export const subscribeToChecklist = subscribe;

export type ChecklistItemKey = "notes" | "formulaSheet" | "dpp" | "pyq";

export const CHECKLIST_ITEMS: { key: ChecklistItemKey; label: string }[] = [
  { key: "notes", label: "Notes completed" },
  { key: "formulaSheet", label: "Formula Sheet revised" },
  { key: "dpp", label: "DPP completed" },
  { key: "pyq", label: "PYQs solved" },
];

export type ChapterChecklistState = Partial<Record<ChecklistItemKey, boolean>>;
type ChecklistMap = Record<string, ChapterChecklistState>;

function chapterKey(cls: "11" | "12", slug: string): string {
  return `${cls}:${slug}`;
}

function readAll(): ChecklistMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Safe to call during SSG (returns {}). */
export function getAllChecklists(): ChecklistMap {
  return readAll();
}

export function getChapterChecklist(cls: "11" | "12", slug: string): ChapterChecklistState {
  return readAll()[chapterKey(cls, slug)] ?? {};
}

export function setChecklistItem(
  cls: "11" | "12",
  slug: string,
  item: ChecklistItemKey,
  done: boolean
): void {
  if (typeof window === "undefined") return;
  try {
    const all = readAll();
    const key = chapterKey(cls, slug);
    all[key] = { ...all[key], [item]: done };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    notify();
    if (done) recordActivity();
  } catch {
    // Never worth breaking the page for a nice-to-have.
  }
}

/** Number of the 4 checklist items marked done for a chapter (0-4). */
export function countCompleted(state: ChapterChecklistState): number {
  return CHECKLIST_ITEMS.filter((item) => state[item.key]).length;
}
