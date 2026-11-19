// ─────────────────────────────────────────────────────────────────
// Pure helpers for the study-tool pages (/dashboard/bookmarks, /mistakes,
// /revision, /activity). No storage access: callers pass in what the
// existing stores return, so every rule here is unit-tested.
// Everything is computed from the student's own data on this device.
// ─────────────────────────────────────────────────────────────────
import type { Bookmark, BookmarkType } from "./bookmarks";
import type { Mistake, MistakeCategory } from "./mistakes";
import type { RevisionEntry } from "./revision";
import type { ActivityEvent } from "./activity-log";
import { bucketForDueInfo, getRevisionDueInfo, type RevisionBucket, type RevisionDueInfo } from "./spaced-revision";

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/\p{M}/gu, "").trim();

// ── Bookmarks ─────────────────────────────────────────────────────────
export type BookmarkFilter = { cls?: "11" | "12" | "all"; type?: BookmarkType | "all"; query?: string; sort?: "newest" | "oldest" | "chapter" };

export function filterBookmarks(list: readonly Bookmark[], f: BookmarkFilter = {}): Bookmark[] {
  const q = norm(f.query ?? "");
  const out = list.filter(
    (b) =>
      (!f.cls || f.cls === "all" || b.cls === f.cls) &&
      (!f.type || f.type === "all" || b.type === f.type) &&
      (!q || norm(`${b.chapterName} ${b.label}`).includes(q)),
  );
  const sort = f.sort ?? "newest";
  return out.sort((a, b) =>
    sort === "oldest" ? a.bookmarkedAt - b.bookmarkedAt : sort === "chapter" ? a.cls.localeCompare(b.cls) || a.chapterName.localeCompare(b.chapterName) || a.label.localeCompare(b.label) : b.bookmarkedAt - a.bookmarkedAt,
  );
}

// ── Mistakes ──────────────────────────────────────────────────────────
export type MistakeFilter = { status?: "open" | "resolved" | "all"; cls?: "11" | "12" | "all"; slug?: string; category?: MistakeCategory | "none" | "all"; query?: string };

export function filterMistakes(list: readonly Mistake[], f: MistakeFilter = {}): Mistake[] {
  const q = norm(f.query ?? "");
  return list
    .filter(
      (m) =>
        (!f.status || f.status === "all" || (f.status === "open" ? m.resolvedAt === null : m.resolvedAt !== null)) &&
        (!f.cls || f.cls === "all" || m.cls === f.cls) &&
        (!f.slug || f.slug === "all" || m.slug === f.slug) &&
        (!f.category || f.category === "all" || (f.category === "none" ? !m.category : m.category === f.category)) &&
        (!q || norm(`${m.chapterName} ${m.conceptTag} ${m.note}`).includes(q)),
    )
    .sort((a, b) => b.createdAt - a.createdAt);
}

/** Identity of the question a mistake belongs to; null when it wasn't logged against a specific question. */
export const questionKey = (m: Pick<Mistake, "cls" | "slug" | "resourceType" | "questionId">) => (m.questionId ? `${m.cls}/${m.slug}/${m.resourceType}#${m.questionId}` : null);

/** Questions the student got wrong more than once: key → number of mistakes. */
export function repeatedQuestions(list: readonly Mistake[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const m of list) {
    const k = questionKey(m);
    if (k) counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return new Map([...counts].filter(([, n]) => n > 1));
}

export function mistakeSummary(list: readonly Mistake[]) {
  const byCategory: Record<string, number> = {};
  const byChapter = new Map<string, { cls: "11" | "12"; slug: string; chapterName: string; open: number; total: number }>();
  for (const m of list) {
    byCategory[m.category ?? "none"] = (byCategory[m.category ?? "none"] ?? 0) + 1;
    const k = `${m.cls}:${m.slug}`;
    const row = byChapter.get(k) ?? { cls: m.cls, slug: m.slug, chapterName: m.chapterName, open: 0, total: 0 };
    row.total++;
    if (m.resolvedAt === null) row.open++;
    byChapter.set(k, row);
  }
  return {
    total: list.length,
    open: list.filter((m) => m.resolvedAt === null).length,
    resolved: list.filter((m) => m.resolvedAt !== null).length,
    repeatedQuestions: repeatedQuestions(list).size,
    byCategory,
    chapters: [...byChapter.values()].sort((a, b) => b.open - a.open || b.total - a.total || a.chapterName.localeCompare(b.chapterName)),
  };
}

// ── Revision ──────────────────────────────────────────────────────────
export type RevisionRow = { cls: "11" | "12"; slug: string; name: string; rounds: (1 | 2 | 3)[]; entries: RevisionEntry[]; due: RevisionDueInfo; bucket: RevisionBucket };
const BUCKET_ORDER: RevisionBucket[] = ["overdue", "due-today", "due-soon", "recently-revised", "never-revised"];

/**
 * One row per chapter, using the existing deterministic schedule
 * (spaced-revision.ts: next review 1, 7 or 30 days after rounds 1, 2, 3).
 * Sorted most urgent first; chapters never revised last.
 */
export function revisionOverview(entries: Record<string, RevisionEntry[]>, chapters: readonly { cls: "11" | "12"; slug: string; name: string }[], now: number): RevisionRow[] {
  return chapters
    .map((c) => {
      const e = entries[`${c.cls}:${c.slug}`] ?? [];
      const due = getRevisionDueInfo(e, now);
      return { ...c, entries: e, rounds: [...new Set(e.map((x) => x.round))].sort() as (1 | 2 | 3)[], due, bucket: bucketForDueInfo(due) };
    })
    .sort((a, b) => BUCKET_ORDER.indexOf(a.bucket) - BUCKET_ORDER.indexOf(b.bucket) || (a.due.daysUntilDue ?? 1e9) - (b.due.daysUntilDue ?? 1e9) || a.name.localeCompare(b.name));
}

// ── Activity calendar ─────────────────────────────────────────────────
/** The student's LOCAL calendar day (same convention as the streak store). */
export function localDayKey(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export type ActivityDay = { date: string; count: number };

/** Last `days` local days (oldest first), each with its number of logged actions. A day counts once however many actions it has. */
export function activityDays(events: readonly ActivityEvent[], days: number, now: number): ActivityDay[] {
  const counts = new Map<string, number>();
  for (const e of events) counts.set(localDayKey(e.at), (counts.get(localDayKey(e.at)) ?? 0) + 1);
  const out: ActivityDay[] = [];
  const cursor = new Date(now);
  cursor.setHours(12, 0, 0, 0); // midday avoids DST edge cases when stepping days
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(cursor);
    d.setDate(cursor.getDate() - i);
    const key = localDayKey(d.getTime());
    out.push({ date: key, count: counts.get(key) ?? 0 });
  }
  return out;
}

export function activitySummary(daysList: readonly ActivityDay[]) {
  let best = 0;
  let run = 0;
  for (const d of daysList) {
    run = d.count > 0 ? run + 1 : 0;
    best = Math.max(best, run);
  }
  const last7 = daysList.slice(-7);
  return { activeDays: daysList.filter((d) => d.count > 0).length, bestRunInWindow: best, activeThisWeek: last7.filter((d) => d.count > 0).length, actionsThisWeek: last7.reduce((n, d) => n + d.count, 0) };
}
