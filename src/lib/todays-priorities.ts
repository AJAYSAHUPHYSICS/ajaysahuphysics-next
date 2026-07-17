// ─────────────────────────────────────────────────────────────────
// Recommended Today (pure function)
//
// A fixed-priority, deterministic list — up to 5 chapters — built by
// walking existing signals in order and stopping once full. Each
// chapter appears at most once (tagged with the first, highest-
// priority reason it matched), so five slots means five distinct
// chapters to act on today, not one chapter repeated five ways.
//
// Priority: overdue revision > weak chapter > unfinished DPP >
// unfinished PYQ > bookmarked chapter.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry } from "./revision";
import type { Bookmark } from "./bookmarks";
import { getRevisionDueInfo, bucketForDueInfo } from "./spaced-revision";
import { getWeakChapters } from "./weak-chapters";

export type PriorityItem = {
  cls: "11" | "12";
  slug: string;
  name: string;
  path: string;
  reason: string;
};

const DEFAULT_LIMIT = 5;

export function buildTodaysPriorities(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>,
  bookmarks: Bookmark[],
  limit: number = DEFAULT_LIMIT
): PriorityItem[] {
  const chapterMap = new Map(chapters.map((c) => [`${c.cls}:${c.slug}`, c]));
  const items: PriorityItem[] = [];
  const seen = new Set<string>();

  const add = (key: string, path: string, reason: string) => {
    if (seen.has(key) || items.length >= limit) return;
    const ch = chapterMap.get(key);
    if (!ch) return;
    seen.add(key);
    items.push({ cls: ch.cls, slug: ch.slug, name: ch.name, path, reason });
  };

  // 1. Overdue revision.
  for (const ch of chapters) {
    if (items.length >= limit) break;
    const key = `${ch.cls}:${ch.slug}`;
    const entries = revisionEntries[key] ?? [];
    if (entries.length === 0) continue;
    if (bucketForDueInfo(getRevisionDueInfo(entries)) === "overdue") {
      add(key, `/class-${ch.cls}/${ch.slug}#revision-rounds`, "Revision overdue");
    }
  }

  // 2. Weak chapter (incomplete).
  if (items.length < limit) {
    const weak = getWeakChapters(
      chapters,
      checklists,
      Object.fromEntries(Object.entries(revisionEntries).map(([k, v]) => [k, v.length]))
    );
    for (const e of weak.incomplete) {
      if (items.length >= limit) break;
      add(`${e.cls}:${e.slug}`, `/class-${e.cls}/${e.slug}`, "Weak chapter");
    }
  }

  // 3. Unfinished DPP.
  if (items.length < limit) {
    for (const ch of chapters) {
      if (items.length >= limit) break;
      if (!ch.availableChecklist.includes("dpp")) continue;
      const key = `${ch.cls}:${ch.slug}`;
      if (!checklists[key]?.dpp) add(key, `/class-${ch.cls}/${ch.slug}/dpp`, "DPP unfinished");
    }
  }

  // 4. Unfinished PYQ.
  if (items.length < limit) {
    for (const ch of chapters) {
      if (items.length >= limit) break;
      if (!ch.availableChecklist.includes("pyq")) continue;
      const key = `${ch.cls}:${ch.slug}`;
      if (!checklists[key]?.pyq) add(key, `/class-${ch.cls}/${ch.slug}/pyq`, "PYQ unfinished");
    }
  }

  // 5. Bookmarked chapter.
  if (items.length < limit) {
    for (const b of bookmarks) {
      if (items.length >= limit) break;
      add(`${b.cls}:${b.slug}`, b.path, "Bookmarked");
    }
  }

  return items;
}
