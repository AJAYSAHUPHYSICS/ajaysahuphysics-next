// ─────────────────────────────────────────────────────────────────
// Recently Viewed Resources (client-side only, localStorage)
//
// Distinct from recently-viewed.ts, which tracks chapter-level visits
// for the homepage's "Continue Learning" strip. This tracks visits to
// specific resources (Notes, DPP, PYQ, ...) within a chapter, feeding
// Smart Recommendations on the dashboard. Also records study-streak
// activity, since opening a resource is a genuine study action.
// ─────────────────────────────────────────────────────────────────

import { recordActivity } from "./study-streak";

const STORAGE_KEY = "atlas:recently-viewed-resources";
const MAX_ENTRIES = 8;

export type RecentResource = {
  cls: "11" | "12";
  slug: string;
  resourceKey: string;
  chapterName: string;
  resourceLabel: string;
  path: string;
  visitedAt: number;
};

// getRecentlyViewedResources is called directly as a useSyncExternalStore
// snapshot (see DashboardClient.tsx). React compares snapshots by
// reference, so this must return the SAME array reference across calls
// whenever the underlying localStorage value hasn't changed — otherwise
// React sees a "new" value on every check and re-renders forever.
let recentResourcesCache: RecentResource[] = [];
let recentResourcesCacheRaw: string | null = null;

export function getRecentlyViewedResources(): RecentResource[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === recentResourcesCacheRaw) return recentResourcesCache;
  recentResourcesCacheRaw = raw;
  try {
    if (!raw) {
      recentResourcesCache = [];
      return recentResourcesCache;
    }
    const parsed = JSON.parse(raw);
    recentResourcesCache = Array.isArray(parsed) ? parsed : [];
    return recentResourcesCache;
  } catch {
    recentResourcesCache = [];
    return recentResourcesCache;
  }
}

export function recordResourceVisit(entry: Omit<RecentResource, "visitedAt">): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getRecentlyViewedResources().filter(
      (r) => !(r.slug === entry.slug && r.cls === entry.cls && r.resourceKey === entry.resourceKey)
    );
    const updated = [{ ...entry, visitedAt: Date.now() }, ...existing].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    recordActivity();
  } catch {
    // Never worth breaking the page for a nice-to-have.
  }
}
