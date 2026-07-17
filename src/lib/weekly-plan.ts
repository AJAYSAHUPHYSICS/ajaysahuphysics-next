// ─────────────────────────────────────────────────────────────────
// Weekly Plan (pure function, nothing persisted)
//
// Projects the next 7 days by reusing spaced-revision's due-date math
// for chapters with a revision schedule, then fills any light days
// with in-progress chapters as catch-up suggestions. Recomputed fresh
// on every render — there is no "weekly plan" storage key.
// ─────────────────────────────────────────────────────────────────

import type { ChapterMeta } from "./chapter-meta";
import type { ChapterChecklistState } from "./checklist";
import type { RevisionEntry } from "./revision";
import { getRevisionDueInfo } from "./spaced-revision";
import { computeChapterProgress } from "./chapter-progress";

export type WeeklyDayEntry = { cls: "11" | "12"; slug: string; name: string; reason: string };
export type WeeklyDayPlan = { label: string; chapters: WeeklyDayEntry[] };

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MAX_PER_DAY = 3;

function dayLabel(offset: number, now: number): string {
  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";
  return WEEKDAY_NAMES[new Date(now + offset * DAY_MS).getDay()];
}

export function buildWeeklyPlan(
  chapters: ChapterMeta[],
  checklists: Record<string, ChapterChecklistState>,
  revisionEntries: Record<string, RevisionEntry[]>,
  now: number = Date.now()
): WeeklyDayPlan[] {
  const days: WeeklyDayPlan[] = Array.from({ length: 7 }, (_, i) => ({
    label: dayLabel(i, now),
    chapters: [],
  }));

  const catchUpCandidates: WeeklyDayEntry[] = [];

  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue;
    const key = `${ch.cls}:${ch.slug}`;
    const entries = revisionEntries[key] ?? [];

    if (entries.length > 0) {
      const info = getRevisionDueInfo(entries, now);
      if (info.daysUntilDue !== null && info.daysUntilDue >= 0 && info.daysUntilDue <= 6) {
        const day = days[info.daysUntilDue];
        if (day.chapters.length < MAX_PER_DAY) {
          day.chapters.push({ cls: ch.cls, slug: ch.slug, name: ch.name, reason: "Revision due" });
        }
        continue;
      }
    }

    const state = checklists[key] ?? {};
    const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);
    if (progress.percent > 0 && progress.percent < 100) {
      catchUpCandidates.push({ cls: ch.cls, slug: ch.slug, name: ch.name, reason: "Catch up" });
    }
  }

  // Round-robin fill any days under capacity with catch-up chapters.
  let dayIdx = 0;
  for (const candidate of catchUpCandidates) {
    let attempts = 0;
    while (days[dayIdx % 7].chapters.length >= MAX_PER_DAY && attempts < 7) {
      dayIdx++;
      attempts++;
    }
    if (attempts >= 7) break; // every day is full
    days[dayIdx % 7].chapters.push(candidate);
    dayIdx++;
  }

  return days;
}
