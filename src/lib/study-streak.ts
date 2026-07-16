// ─────────────────────────────────────────────────────────────────
// Study Streak (client-side only, localStorage)
//
// Tracks consecutive calendar days with recorded study activity.
// "Activity" is recorded by other ATLAS modules (checklist, revision,
// bookmarks, resource visits) via recordActivity() — this module has
// no opinion on what counts, it just owns the streak math.
//
// Dates are local calendar days (not UTC), since a streak should
// match the student's own day, not a server timezone.
// ─────────────────────────────────────────────────────────────────

import { createNotifier } from "./local-store-events";

const STORAGE_KEY = "atlas:study-streak";
const { subscribe, notify } = createNotifier();
export const subscribeToStreak = subscribe;

export type StreakState = {
  current: number;
  longest: number;
  lastActiveDate: string | null; // "YYYY-MM-DD", local calendar day
};

const EMPTY_STREAK: StreakState = { current: 0, longest: 0, lastActiveDate: null };

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function todayKey(): string {
  return dateKey(new Date());
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dateKey(d);
}

function read(): StreakState {
  if (typeof window === "undefined") return EMPTY_STREAK;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STREAK;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return EMPTY_STREAK;
    return {
      current: typeof parsed.current === "number" ? parsed.current : 0,
      longest: typeof parsed.longest === "number" ? parsed.longest : 0,
      lastActiveDate: typeof parsed.lastActiveDate === "string" ? parsed.lastActiveDate : null,
    };
  } catch {
    return EMPTY_STREAK;
  }
}

/** Current streak snapshot — safe to call during SSG (returns the empty state). */
export function getStreak(): StreakState {
  return read();
}

/**
 * Records study activity for "today". If the student was last active
 * yesterday, the streak extends; if today is already recorded, this
 * is a no-op; otherwise (a gap of 2+ days, or first-ever activity)
 * the streak resets to 1.
 */
export function recordActivity(): void {
  if (typeof window === "undefined") return;
  try {
    const state = read();
    const today = todayKey();
    if (state.lastActiveDate === today) return;

    const extending = state.lastActiveDate === yesterdayKey();
    const current = extending ? state.current + 1 : 1;
    const next: StreakState = {
      current,
      longest: Math.max(state.longest, current),
      lastActiveDate: today,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    notify();
  } catch {
    // A missed streak update is never worth breaking the page for.
  }
}
