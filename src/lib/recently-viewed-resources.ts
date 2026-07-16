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

export function getRecentlyViewedResources(): RecentResource[] {
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
