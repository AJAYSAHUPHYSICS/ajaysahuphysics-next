// ─────────────────────────────────────────────────────────────────
// Spaced Revision Scheduling (pure functions, no storage of its own)
//
// Recommends *when* a chapter's next revision is due, using the round
// timestamps revision.ts already stores. Round 1 → revisit after 1 day,
// Round 2 → after 7 days, Round 3 → after 30 days — the interval always
// follows from the *last completed* round, since that's the most recent
// thing the student actually reviewed.
//
// This module only computes a recommendation. It never marks a round
// complete, writes to storage, or decides pass/fail — a student always
// marks their own revision rounds via RevisionTracker.tsx.
// ─────────────────────────────────────────────────────────────────

import type { RevisionEntry, RevisionRound } from "./revision";

const INTERVAL_DAYS: Record<RevisionRound, number> = { 1: 1, 2: 7, 3: 30 };
const DAY_MS = 24 * 60 * 60 * 1000;

export type RevisionDueInfo = {
  lastRevisedAt: number | null;
  lastRound: RevisionRound | null;
  /** When the next revision is recommended, or null if never revised
   * (there's no prior round to base an interval on). */
  nextDueAt: number | null;
  /** Negative = overdue by that many days. Null if never revised. */
  daysUntilDue: number | null;
};

export function getRevisionDueInfo(entries: RevisionEntry[], now: number = Date.now()): RevisionDueInfo {
  if (entries.length === 0) {
    return { lastRevisedAt: null, lastRound: null, nextDueAt: null, daysUntilDue: null };
  }

  const latest = entries.reduce((a, b) => (a.completedAt > b.completedAt ? a : b));
  const nextDueAt = latest.completedAt + INTERVAL_DAYS[latest.round] * DAY_MS;
  const daysUntilDue = Math.floor((nextDueAt - now) / DAY_MS);

  return { lastRevisedAt: latest.completedAt, lastRound: latest.round, nextDueAt, daysUntilDue };
}

export type RevisionBucket = "overdue" | "due-today" | "due-soon" | "recently-revised" | "never-revised";

/** Groups a chapter into one of the M12 Task 1 timeline buckets. A
 * chapter with zero revision rounds has no interval to compute from,
 * so it's its own bucket rather than being force-fit into "overdue". */
export function bucketForDueInfo(info: RevisionDueInfo): RevisionBucket {
  if (info.nextDueAt === null || info.daysUntilDue === null) return "never-revised";
  if (info.daysUntilDue < 0) return "overdue";
  if (info.daysUntilDue === 0) return "due-today";
  if (info.daysUntilDue <= 3) return "due-soon";
  return "recently-revised";
}
