// ─────────────────────────────────────────────────────────────────
// Revision Tracker (client-side only, localStorage)
//
// Per-chapter completion for 3 fixed revision rounds, each with a
// completion timestamp — the timestamp powers "old revisions" / "never
// revised" detection in weak-chapters.ts and revision-planner.ts (M10).
// Keyed the same way as checklist.ts ("{cls}:{slug}") for consistency.
//
// Storage internally moved from a plain RevisionRound[] to a
// {round, completedAt}[] to carry that timestamp — readAll() migrates
// the old plain-number-array shape transparently, so nothing already
// saved on a returning visitor's device is lost.
// ─────────────────────────────────────────────────────────────────

import { createNotifier } from "./local-store-events";
import { recordActivity } from "./study-streak";
import { logActivity } from "./activity-log";

const STORAGE_KEY = "atlas:revision";
const { subscribe, notify } = createNotifier();
export const subscribeToRevision = subscribe;

export const REVISION_ROUNDS = [1, 2, 3] as const;
export type RevisionRound = (typeof REVISION_ROUNDS)[number];

export type RevisionEntry = { round: RevisionRound; completedAt: number };

type RevisionMap = Record<string, RevisionRound[]>;
type RevisionEntryMap = Record<string, RevisionEntry[]>;

function chapterKey(cls: "11" | "12", slug: string): string {
  return `${cls}:${slug}`;
}

function isValidRound(n: unknown): n is RevisionRound {
  return typeof n === "number" && (REVISION_ROUNDS as readonly number[]).includes(n);
}

/** Reads the stored map, migrating the legacy `number[]` shape (round
 * numbers with no timestamp) to `{round, completedAt}[]` on the fly. */
function readEntries(): RevisionEntryMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    const map: RevisionEntryMap = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (!Array.isArray(value)) continue;
      const entries: RevisionEntry[] = value
        .map((v): RevisionEntry | null => {
          if (isValidRound(v)) return { round: v, completedAt: 0 }; // legacy shape, no known date
          if (v && typeof v === "object" && isValidRound((v as RevisionEntry).round)) {
            const completedAt = (v as RevisionEntry).completedAt;
            return {
              round: (v as RevisionEntry).round,
              completedAt: typeof completedAt === "number" ? completedAt : 0,
            };
          }
          return null;
        })
        .filter((e): e is RevisionEntry => e !== null);
      map[key] = entries;
    }
    return map;
  } catch {
    return {};
  }
}

function writeEntries(map: RevisionEntryMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    notify();
  } catch {
    // Never worth breaking the page for a nice-to-have.
  }
}

/** Full entries (with timestamps) for every chapter — safe during SSG (returns {}). */
export function getAllRevisionEntries(): RevisionEntryMap {
  return readEntries();
}

/** Entries (with timestamps) for one chapter. */
export function getRevisionEntries(cls: "11" | "12", slug: string): RevisionEntry[] {
  return readEntries()[chapterKey(cls, slug)] ?? [];
}

/** Most recent revision timestamp for a chapter, or null if never revised. */
export function getLastRevisedAt(cls: "11" | "12", slug: string): number | null {
  const entries = getRevisionEntries(cls, slug);
  if (entries.length === 0) return null;
  return Math.max(...entries.map((e) => e.completedAt));
}

// ── Backward-compatible plain-round-number API (unchanged contract) ──

/** Safe to call during SSG (returns {}). */
export function getAllRevision(): RevisionMap {
  const entries = readEntries();
  const map: RevisionMap = {};
  for (const [key, list] of Object.entries(entries)) {
    map[key] = list.map((e) => e.round).sort();
  }
  return map;
}

/** Completed round numbers for a chapter, e.g. [1, 2]. */
export function getCompletedRounds(cls: "11" | "12", slug: string): RevisionRound[] {
  return getRevisionEntries(cls, slug)
    .map((e) => e.round)
    .sort();
}

export function setRevisionRound(
  cls: "11" | "12",
  slug: string,
  round: RevisionRound,
  done: boolean
): void {
  if (typeof window === "undefined") return;
  const map = readEntries();
  const key = chapterKey(cls, slug);
  const existing = map[key] ?? [];

  map[key] = done
    ? [...existing.filter((e) => e.round !== round), { round, completedAt: Date.now() }]
    : existing.filter((e) => e.round !== round);

  writeEntries(map);
  if (done) {
    recordActivity();
    logActivity({ type: "revision-completed", cls, slug, label: `Revision ${round}` });
  }
}

/** Total revision rounds completed across every chapter — used by the dashboard. */
export function totalRevisionRounds(map: RevisionMap): number {
  return Object.values(map).reduce((sum, rounds) => sum + rounds.length, 0);
}
