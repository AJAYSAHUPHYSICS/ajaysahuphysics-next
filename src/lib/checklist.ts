// ─────────────────────────────────────────────────────────────────
// Study Checklist (client-side only, localStorage)
//
// Per-chapter completion tracking for the four resource types a
// chapter can have. Keyed by "{cls}:{slug}" so Class 11 and Class 12
// chapters that happen to share a slug never collide.
// ─────────────────────────────────────────────────────────────────

import { createNotifier } from "./local-store-events";
import { recordActivity } from "./study-streak";
import { logActivity } from "./activity-log";

const STORAGE_KEY = "atlas:checklist";
const { subscribe, notify } = createNotifier();
export const subscribeToChecklist = subscribe;

export type ChecklistItemKey = "notes" | "formulaSheet" | "dpp" | "pyq";

/** Maps a resource-registry key (as used in recently-viewed-resources.ts
 * and bookmarks.ts) to its corresponding checklist item, where one
 * exists. "short-notes", "jee-notes", and "jee-dpp" have no checklist
 * item — they're supplementary, not part of the 4-item core checklist. */
export const RESOURCE_KEY_TO_CHECKLIST_ITEM: Partial<Record<string, ChecklistItemKey>> = {
  notes: "notes",
  "formula-sheet": "formulaSheet",
  dpp: "dpp",
  pyq: "pyq",
};

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
    if (done) {
      recordActivity();
      const itemLabel = CHECKLIST_ITEMS.find((i) => i.key === item)?.label ?? item;
      logActivity({ type: "resource-completed", cls, slug, label: itemLabel });
    }
  } catch {
    // Never worth breaking the page for a nice-to-have.
  }
}

/** Number of the 4 checklist items marked done for a chapter (0-4). */
export function countCompleted(state: ChapterChecklistState): number {
  return CHECKLIST_ITEMS.filter((item) => state[item.key]).length;
}
