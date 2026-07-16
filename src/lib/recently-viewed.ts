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

const STORAGE_KEY = "atlas:recently-viewed";
const MAX_ENTRIES = 5;

export type RecentChapter = {
  slug: string;
  cls: "11" | "12";
  name: string;
  visitedAt: number;
};

export function getRecentlyViewed(): RecentChapter[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
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
  } catch {
    // localStorage can throw in private-browsing/quota-exceeded edge cases —
    // recently-viewed is a nice-to-have, never worth breaking the page for.
  }
}
