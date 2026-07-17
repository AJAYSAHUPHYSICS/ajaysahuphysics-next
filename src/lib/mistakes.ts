// ─────────────────────────────────────────────────────────────────
// Mistake Notebook (client-side only, localStorage)
//
// Lets a student log a mistake made on a DPP or PYQ question, with an
// optional question id, a concept tag, a difficulty, and a short note.
// Chapters are identified the same way as every other ATLAS module —
// cls + slug, no separate chapter id invented here. Difficulty reuses
// the exact vocabulary already established by the formula sheet's
// DifficultyBadge, rather than a new easy/medium/hard union.
//
// Mistakes are never deleted automatically (Task 7) — resolving one
// just records resolvedAt; the record stays for history.
// ─────────────────────────────────────────────────────────────────

import type { Difficulty } from "./formula-sheet";
import { createNotifier } from "./local-store-events";
import { recordActivity } from "./study-streak";
import { logActivity } from "./activity-log";

const STORAGE_KEY = "atlas:mistakes";
const MAX_ENTRIES = 500;
const { subscribe, notify } = createNotifier();
export const subscribeToMistakes = subscribe;

export type MistakeResourceType = "dpp" | "pyq";

export type Mistake = {
  id: string;
  cls: "11" | "12";
  slug: string;
  chapterName: string;
  resourceType: MistakeResourceType;
  /** Optional — the question's number/index within its resource, if the
   * mistake was logged from a specific question rather than generally. */
  questionId?: string;
  conceptTag: string;
  difficulty: Difficulty;
  note: string;
  createdAt: number;
  /** Null while unresolved. Set once, never cleared automatically. */
  resolvedAt: number | null;
};

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readAll(): Mistake[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(mistakes: Mistake[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakes));
    notify();
  } catch {
    // Never worth breaking the page for a nice-to-have.
  }
}

/** All mistakes, most recent first — safe during SSG (returns []). */
export function getMistakes(): Mistake[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function addMistake(entry: {
  cls: "11" | "12";
  slug: string;
  chapterName: string;
  resourceType: MistakeResourceType;
  questionId?: string;
  conceptTag: string;
  difficulty: Difficulty;
  note: string;
}): void {
  if (typeof window === "undefined") return;
  const mistake: Mistake = { ...entry, id: newId(), createdAt: Date.now(), resolvedAt: null };
  const next = [mistake, ...readAll()].slice(0, MAX_ENTRIES);
  writeAll(next);
  recordActivity();
  logActivity({
    type: "mistake-logged",
    cls: entry.cls,
    slug: entry.slug,
    label: entry.conceptTag,
  });
}

/** Marks a mistake resolved or unresolved. The record itself is never
 * deleted — only resolvedAt changes. */
export function setMistakeResolved(id: string, resolved: boolean): void {
  if (typeof window === "undefined") return;
  const all = readAll();
  const target = all.find((m) => m.id === id);
  const next = all.map((m) => (m.id === id ? { ...m, resolvedAt: resolved ? Date.now() : null } : m));
  writeAll(next);
  if (resolved && target) {
    recordActivity();
    logActivity({ type: "mistake-resolved", cls: target.cls, slug: target.slug, label: target.conceptTag });
  }
}
