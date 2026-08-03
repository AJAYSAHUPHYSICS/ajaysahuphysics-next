// ─────────────────────────────────────────────────────────────────
// Popular Resources (for GlobalSearch's empty state)
//
// This is a static-export site with no backend and no cross-visitor
// analytics accessible at runtime (GA4 data isn't queryable from the
// client) — so there is no real "popular across all students" signal
// to draw from. Rather than fake one with a hardcoded list, this pulls
// from the best real data actually available, in priority order:
//
//   1. This visitor's own recently-visited resources — genuine usage
//      data already tracked by recently-viewed-resources.ts and reused
//      (not duplicated) from the dashboard's Smart Recommendations.
//   2. First-time visitors with no history yet: chapters with the most
//      available resources — a real, derived-from-index signal (which
//      chapters are most complete), not an arbitrary curated list.
// ─────────────────────────────────────────────────────────────────

import { searchIndex } from "./search-index";
import { getRecentlyViewedResources } from "./recently-viewed-resources";

export type PopularItem = {
  key: string;
  title: string;
  subtitle: string;
  path: string;
};

export type PopularResourcesResult = {
  items: PopularItem[];
  /** "history" when personalized to this visitor's own activity,
   * "derived" when falling back to the index-derived default — lets the
   * UI label the section honestly ("Frequently Visited" vs "Popular
   * Resources") instead of implying cross-visitor popularity either way. */
  source: "history" | "derived";
};

export function getPopularResources(limit: number): PopularResourcesResult {
  const recent = getRecentlyViewedResources();
  if (recent.length > 0) {
    return {
      source: "history",
      items: recent.slice(0, limit).map((r) => ({
        key: `${r.cls}:${r.slug}:${r.resourceKey}`,
        title: r.resourceLabel,
        subtitle: r.chapterName,
        path: r.path,
      })),
    };
  }

  const items = [...searchIndex]
    .filter((e) => e.resources.length > 0)
    .sort((a, b) => b.resources.length - a.resources.length || a.name.localeCompare(b.name))
    .slice(0, limit)
    .map((e) => ({
      key: `${e.cls}:${e.slug}`,
      title: e.name,
      subtitle: `Class ${e.cls} \u00b7 ${e.resources.length} resource${e.resources.length === 1 ? "" : "s"}`,
      path: `/class-${e.cls}/${e.slug}`,
    }));
  return { source: "derived", items };
}
