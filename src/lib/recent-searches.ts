// ─────────────────────────────────────────────────────────────────
// Recent Searches (client-side only, localStorage)
//
// Distinct from recently-viewed.ts (chapter visits) and
// recently-viewed-resources.ts (resource visits) — this tracks the
// search QUERY strings a student has actually run in GlobalSearch, so
// they can rerun a past search with one click instead of retyping it.
//
// Same guarded-localStorage, pub-sub-for-reactivity pattern as every
// other ATLAS module (bookmarks.ts, study-streak.ts, etc).
// ─────────────────────────────────────────────────────────────────

import { createNotifier } from "./local-store-events";

const STORAGE_KEY = "atlas:recent-searches";
const MAX_ENTRIES = 10;
const { subscribe, notify } = createNotifier();
export const subscribeToRecentSearches = subscribe;

// getRecentSearches is used directly as a useSyncExternalStore snapshot
// (see GlobalSearch.tsx). React compares snapshots by reference, so this
// must return the SAME array reference across calls whenever the
// underlying localStorage value hasn't changed — the exact pattern every
// other ATLAS snapshot function in this codebase already follows.
let cache: string[] = [];
let cacheRaw: string | null = null;

function readAll(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cacheRaw) return cache;
  cacheRaw = raw;
  try {
    if (!raw) {
      cache = [];
      return cache;
    }
    const parsed = JSON.parse(raw);
    cache = Array.isArray(parsed) ? parsed.filter((q): q is string => typeof q === "string") : [];
    return cache;
  } catch {
    cache = [];
    return cache;
  }
}

/** Most recent first — safe to call during SSG (returns []). */
export function getRecentSearches(): string[] {
  return readAll();
}

/** Records a query as "executed". Called once a query has settled (the
 * same debounce point GlobalSearch already uses for its GA4 search
 * event) rather than on every keystroke, so a search only lands here
 * once the student has actually paused on it — not mid-typing.
 * Ignores empty/whitespace-only queries, deduplicates case-insensitively
 * (most recent occurrence wins position), capped at MAX_ENTRIES. */
export function recordRecentSearch(query: string): void {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (!trimmed) return;
  try {
    const existing = readAll().filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
    const next = [trimmed, ...existing].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    notify();
  } catch {
    // A missed recent-search write is never worth breaking the page for.
  }
}
