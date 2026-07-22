// ─────────────────────────────────────────────────────────────────
// Study Goals (client-side only, localStorage)
//
// Owns exactly one thing: which of the 8 fixed goal types (M16 Task 1)
// a student has chosen to track, and when each was activated. All
// progress/forecast/target computation for an active goal lives in
// goal-progress.ts, goal-forecast.ts, etc. — this module has no
// opinion on "how close am I", only "am I tracking this at all".
//
// Same guarded-localStorage, pub-sub-for-reactivity pattern as
// bookmarks.ts / checklist.ts / study-streak.ts.
// ─────────────────────────────────────────────────────────────────

import { createNotifier } from "./local-store-events";
import { GOAL_TYPES, type GoalType } from "./goal-types";

const STORAGE_KEY = "atlas:goals";
const { subscribe, notify } = createNotifier();
export const subscribeToGoals = subscribe;

export type ActiveGoal = { type: GoalType; activatedAt: number };
type GoalMap = Partial<Record<GoalType, number>>; // type -> activatedAt

function isValidGoalType(v: unknown): v is GoalType {
  return typeof v === "string" && (GOAL_TYPES as string[]).includes(v);
}

function readAll(): GoalMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const map: GoalMap = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (isValidGoalType(key) && typeof value === "number") map[key] = value;
    }
    return map;
  } catch {
    return {};
  }
}

function writeAll(map: GoalMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    notify();
  } catch {
    // A missed goal-activation write is never worth breaking the page for.
  }
}

/** All active goals, most recently activated first — safe during SSG (returns []). */
export function getActiveGoals(): ActiveGoal[] {
  const map = readAll();
  return (Object.entries(map) as [GoalType, number][])
    .map(([type, activatedAt]) => ({ type, activatedAt }))
    .sort((a, b) => b.activatedAt - a.activatedAt);
}

export function isGoalActive(type: GoalType): boolean {
  return readAll()[type] !== undefined;
}

/** Adds or removes a goal from tracking. Returns the resulting active state. */
export function toggleGoal(type: GoalType): boolean {
  const map = readAll();
  const already = map[type] !== undefined;

  if (already) {
    const next = { ...map };
    delete next[type];
    writeAll(next);
    return false;
  }

  writeAll({ ...map, [type]: Date.now() });
  return true;
}
