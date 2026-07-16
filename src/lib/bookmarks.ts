// ─────────────────────────────────────────────────────────────────
// Bookmarks (client-side only, localStorage)
//
// Lets a student bookmark a chapter itself, or any specific resource
// within it (Notes, Short Notes, Formula Sheet, DPP, PYQ). No backend —
// same guarded-localStorage, pub-sub-for-reactivity pattern as the
// other ATLAS modules.
// ─────────────────────────────────────────────────────────────────

import { createNotifier } from "./local-store-events";
import { recordActivity } from "./study-streak";

const STORAGE_KEY = "atlas:bookmarks";
const MAX_ENTRIES = 300;
const { subscribe, notify } = createNotifier();
export const subscribeToBookmarks = subscribe;

export type BookmarkType =
  | "chapter"
  | "notes"
  | "jee-notes"
  | "short-notes"
  | "formula-sheet"
  | "dpp"
  | "jee-dpp"
  | "pyq";

export type Bookmark = {
  id: string;
  cls: "11" | "12";
  slug: string;
  type: BookmarkType;
  chapterName: string;
  /** Display label, e.g. "Kinematics" for a chapter, "Notes" for a resource. */
  label: string;
  path: string;
  bookmarkedAt: number;
};

export function makeBookmarkId(cls: "11" | "12", slug: string, type: BookmarkType): string {
  return `${cls}:${slug}:${type}`;
}

function readAll(): Bookmark[] {
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

function writeAll(bookmarks: Bookmark[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    notify();
  } catch {
    // Never worth breaking the page for a nice-to-have.
  }
}

/** All bookmarks, most recent first — safe to call during SSG (returns []). */
export function getBookmarks(): Bookmark[] {
  return readAll().sort((a, b) => b.bookmarkedAt - a.bookmarkedAt);
}

export function isBookmarked(id: string): boolean {
  return readAll().some((b) => b.id === id);
}

/** Adds or removes a bookmark. Returns the resulting bookmarked state. */
export function toggleBookmark(entry: Omit<Bookmark, "id" | "bookmarkedAt">): boolean {
  const id = makeBookmarkId(entry.cls, entry.slug, entry.type);
  const existing = readAll();
  const already = existing.some((b) => b.id === id);

  if (already) {
    writeAll(existing.filter((b) => b.id !== id));
    return false;
  }

  const next = [{ ...entry, id, bookmarkedAt: Date.now() }, ...existing].slice(0, MAX_ENTRIES);
  writeAll(next);
  recordActivity();
  return true;
}
