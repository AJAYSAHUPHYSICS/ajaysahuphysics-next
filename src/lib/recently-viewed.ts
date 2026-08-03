// ─────────────────────────────────────────────────────────────────
// Recently Viewed Chapters (client-side only, localStorage)
//
// No backend, no database, no auth — just a small, capped list kept
// in the browser. Powers two features that share this one data
// source rather than tracking visits twice:
//   - ContinueLearning.tsx (homepage "continue where you left off")
//   - GlobalSearch.tsx (quick shortcuts in the empty-query state)
//
// Safe to import from anywhere: every function guards on
// `typeof window` so it never touches localStorage during SSG.
// ─────────────────────────────────────────────────────────────────

import { logActivity } from "./activity-log";

const STORAGE_KEY = "atlas:recently-viewed";
const MAX_ENTRIES = 5;

export type RecentChapter = {
  slug: string;
  cls: "11" | "12";
  name: string;
  visitedAt: number;
};

// getRecentlyViewed is called directly as a useSyncExternalStore snapshot
// (see ContinueLearning.tsx). React compares snapshots by reference, so
// this must return the SAME array reference across calls whenever the
// underlying localStorage value hasn't changed — otherwise React sees a
// "new" value on every check and re-renders forever.
let recentlyViewedCache: RecentChapter[] = [];
let recentlyViewedCacheRaw: string | null = null;

/** Returns a stable (cached) reference when the underlying data hasn't
 * changed, so it's safe to use directly as a useSyncExternalStore snapshot. */
export function getRecentlyViewed(): RecentChapter[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === recentlyViewedCacheRaw) return recentlyViewedCache;
  recentlyViewedCacheRaw = raw;
  try {
    if (!raw) {
      recentlyViewedCache = [];
      return recentlyViewedCache;
    }
    const parsed = JSON.parse(raw);
    recentlyViewedCache = Array.isArray(parsed) ? parsed : [];
    return recentlyViewedCache;
  } catch {
    recentlyViewedCache = [];
    return recentlyViewedCache;
  }
}

export function recordChapterVisit(chapter: Omit<RecentChapter, "visitedAt">): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getRecentlyViewed().filter((c) => c.slug !== chapter.slug);
    const updated = [{ ...chapter, visitedAt: Date.now() }, ...existing].slice(
      0,
      MAX_ENTRIES
    );
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    logActivity({ type: "chapter-visited", cls: chapter.cls, slug: chapter.slug, label: chapter.name });
  } catch {
    // localStorage can throw in private-browsing/quota-exceeded edge cases —
    // recently-viewed is a nice-to-have, never worth breaking the page for.
  }
}
