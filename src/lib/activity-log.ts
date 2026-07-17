// ─────────────────────────────────────────────────────────────────
// Activity Log (client-side only, localStorage)
//
// A minimal timestamped event log that existing write functions
// (checklist.setChecklistItem, revision.setRevisionRound,
// bookmarks.toggleBookmark, recently-viewed.recordChapterVisit) call
// into when something noteworthy happens. This module owns none of
// the "is this done?" logic — checklist.ts, revision.ts, and
// bookmarks.ts remain the single source of truth for that. All this
// does is remember *when* a completion/visit/bookmark event fired, so
// "Today's Activity" (M11 Task 2) can be answered without re-deriving
// completion state or reading localStorage a second time per feature.
// ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "atlas:activity-log";
const MAX_ENTRIES = 400;
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // prune anything older than 30 days

export type ActivityEventType =
  | "resource-completed"
  | "chapter-visited"
  | "revision-completed"
  | "bookmark-added";

export type ActivityEvent = {
  type: ActivityEventType;
  cls: "11" | "12";
  slug: string;
  label: string;
  at: number;
};

function readAll(): ActivityEvent[] {
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

/** Full log, most recent first — safe during SSG (returns []). */
export function getActivityLog(): ActivityEvent[] {
  return readAll();
}

function startOfTodayLocal(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Filters an already-read log down to today's events (local calendar
 * day) — pure, no storage access, so a caller that already has the
 * full log (e.g. for Revision History) never has to read localStorage
 * a second time just to get today's subset. */
export function filterToday(events: ActivityEvent[]): ActivityEvent[] {
  const start = startOfTodayLocal();
  return events.filter((e) => e.at >= start);
}

/** Just today's events (local calendar day) — the input M11 Task 2
 * needs. Prefer filterToday(getActivityLog()) if the full log is
 * already being read elsewhere on the same page. */
export function getTodayActivity(): ActivityEvent[] {
  return filterToday(readAll());
}

export function logActivity(event: Omit<ActivityEvent, "at">): void {
  if (typeof window === "undefined") return;
  try {
    const cutoff = Date.now() - MAX_AGE_MS;
    const next = [{ ...event, at: Date.now() }, ...readAll().filter((e) => e.at >= cutoff)].slice(
      0,
      MAX_ENTRIES
    );
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // A missed log entry is never worth breaking the page for.
  }
}
