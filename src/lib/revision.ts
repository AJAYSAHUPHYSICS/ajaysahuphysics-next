// ─────────────────────────────────────────────────────────────────
// Revision Tracker (client-side only, localStorage)
//
// Per-chapter completion for 3 fixed revision rounds. Keyed the same
// way as checklist.ts ("{cls}:{slug}") for consistency.
// ─────────────────────────────────────────────────────────────────

import { createNotifier } from "./local-store-events";
import { recordActivity } from "./study-streak";

const STORAGE_KEY = "atlas:revision";
const { subscribe, notify } = createNotifier();
export const subscribeToRevision = subscribe;

export const REVISION_ROUNDS = [1, 2, 3] as const;
export type RevisionRound = (typeof REVISION_ROUNDS)[number];

type RevisionMap = Record<string, RevisionRound[]>;

function chapterKey(cls: "11" | "12", slug: string): string {
  return `${cls}:${slug}`;
}

function readAll(): RevisionMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Safe to call during SSG (returns {}). */
export function getAllRevision(): RevisionMap {
  return readAll();
}

/** Completed round numbers for a chapter, e.g. [1, 2]. */
export function getCompletedRounds(cls: "11" | "12", slug: string): RevisionRound[] {
  return readAll()[chapterKey(cls, slug)] ?? [];
}

export function setRevisionRound(
  cls: "11" | "12",
  slug: string,
  round: RevisionRound,
  done: boolean
): void {
  if (typeof window === "undefined") return;
  try {
    const all = readAll();
    const key = chapterKey(cls, slug);
    const existing = all[key] ?? [];
    all[key] = done
      ? Array.from(new Set([...existing, round])).sort()
      : existing.filter((r) => r !== round);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    notify();
    if (done) recordActivity();
  } catch {
    // Never worth breaking the page for a nice-to-have.
  }
}

/** Total revision rounds completed across every chapter — used by the dashboard. */
export function totalRevisionRounds(map: RevisionMap): number {
  return Object.values(map).reduce((sum, rounds) => sum + rounds.length, 0);
}
