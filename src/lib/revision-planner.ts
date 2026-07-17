// ─────────────────────────────────────────────────────────────────
// Revision Planner (pure function)
//
// Builds a short, prioritized "revise today" list from four existing
// signals — no new storage, just a combination of what checklist.ts,
// revision.ts, bookmarks.ts, and recently-viewed-resources.ts already
// track. Priority order (highest first): revisions gone stale, then
// bookmarked chapters, then recently viewed ones, then anything still
// unfinished — filling remaining slots only, so the list stays short
// and doesn't just become "every incomplete chapter".
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry } from "./revision";
import type { Bookmark } from "./bookmarks";
import type { RecentResource } from "./recently-viewed-resources";
import { computeChapterProgress } from "./chapter-progress";

export type RevisionPlanItem = {
  cls: "11" | "12";
  slug: string;
  name: string;
  path: string;
  reasons: string[];
};

const DEFAULT_STALE_DAYS = 7;
const DEFAULT_LIMIT = 6;
const DAY_MS = 24 * 60 * 60 * 1000;

export function buildRevisionPlan(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>,
  bookmarks: Bookmark[],
  recentResources: RecentResource[],
  options?: { staleDays?: number; limit?: number; now?: number }
): RevisionPlanItem[] {
  const staleDays = options?.staleDays ?? DEFAULT_STALE_DAYS;
  const limit = options?.limit ?? DEFAULT_LIMIT;
  const now = options?.now ?? Date.now();

  const chapterMap = new Map(chapters.map((c) => [`${c.cls}:${c.slug}`, c]));
  const reasonsByKey = new Map<string, string[]>();

  const addReason = (key: string, reason: string) => {
    if (!chapterMap.has(key)) return;
    const list = reasonsByKey.get(key) ?? [];
    if (!list.includes(reason)) list.push(reason);
    reasonsByKey.set(key, list);
  };

  // 1. Revisions gone stale — the strongest spaced-repetition signal.
  for (const ch of chapters) {
    const key = `${ch.cls}:${ch.slug}`;
    const entries = revisionEntries[key] ?? [];
    if (entries.length === 0) continue;
    const lastRevisedAt = Math.max(...entries.map((e) => e.completedAt));
    if (now - lastRevisedAt > staleDays * DAY_MS) {
      addReason(key, "Revision is due");
    }
  }

  // 2. Bookmarked chapters/resources.
  for (const b of bookmarks) {
    addReason(`${b.cls}:${b.slug}`, "Bookmarked");
  }

  // 3. Recently viewed resources.
  for (const r of recentResources) {
    addReason(`${r.cls}:${r.slug}`, "Recently viewed");
  }

  // 4. Unfinished chapters — lowest priority, only fills remaining slots,
  // in canonical chapter order so it's predictable rather than random.
  for (const ch of chapters) {
    if (reasonsByKey.size >= limit * 2) break; // enough candidates already
    const key = `${ch.cls}:${ch.slug}`;
    if (ch.availableChecklist.length === 0) continue;
    const state = checklists[key] ?? {};
    const entries = revisionEntries[key] ?? [];
    const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);
    if (progress.percent < 100) {
      addReason(key, "Unfinished");
    }
  }

  // Assemble in signal-priority order, then cap to `limit`.
  const ordered: RevisionPlanItem[] = [];
  const seen = new Set<string>();
  const pushIfNew = (key: string) => {
    if (seen.has(key) || ordered.length >= limit) return;
    const ch = chapterMap.get(key);
    const reasons = reasonsByKey.get(key);
    if (!ch || !reasons) return;
    seen.add(key);
    ordered.push({ cls: ch.cls, slug: ch.slug, name: ch.name, path: `/class-${ch.cls}/${ch.slug}`, reasons });
  };

  for (const key of reasonsByKey.keys()) pushIfNew(key);

  return ordered;
}
