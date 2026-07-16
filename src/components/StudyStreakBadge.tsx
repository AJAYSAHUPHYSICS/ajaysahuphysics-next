"use client";

import { useSyncExternalStore } from "react";
import { getStreak, subscribeToStreak, type StreakState } from "@/lib/study-streak";

const EMPTY: StreakState = { current: 0, longest: 0, lastActiveDate: null };
const getServerSnapshot = () => EMPTY;

export default function StudyStreakBadge({ compact = false }: { compact?: boolean }) {
  const streak = useSyncExternalStore(subscribeToStreak, getStreak, getServerSnapshot);

  if (streak.current === 0 && streak.longest === 0) {
    return compact ? null : (
      <p className="text-sm text-slate/70">
        Mark a chapter&apos;s notes, DPP, or PYQ complete to start your study streak.
      </p>
    );
  }

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
        <span aria-hidden="true">🔥</span>
        {streak.current} day{streak.current === 1 ? "" : "s"}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-6">
      <div>
        <p className="text-3xl font-display text-navy">
          <span aria-hidden="true">🔥</span> {streak.current}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate/60 mt-1">
          Current streak
        </p>
      </div>
      <div>
        <p className="text-3xl font-display text-navy">{streak.longest}</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate/60 mt-1">
          Longest streak
        </p>
      </div>
    </div>
  );
}
