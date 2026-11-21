"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { getActivityLog, type ActivityEvent } from "@/lib/activity-log";
import { getStreak, subscribeToStreak, type StreakState } from "@/lib/study-streak";
import { activityDays, activitySummary } from "@/lib/study-tools";
import { studyCard } from "@/components/study/StudyNav";

const EMPTY_LOG: ActivityEvent[] = [];
const EMPTY_STREAK: StreakState = { current: 0, longest: 0, lastActiveDate: null };
const noSubscribe = () => () => {};
const LABEL: Record<ActivityEvent["type"], string> = {
  "resource-completed": "Completed", "chapter-visited": "Opened chapter", "revision-completed": "Revised", "bookmark-added": "Bookmarked", "mistake-logged": "Logged a mistake", "mistake-resolved": "Resolved a mistake",
};

export default function ActivityClient() {
  // The activity log is kept only in this browser (30 days) and never leaves it.
  const log = useSyncExternalStore(noSubscribe, getActivityLog, () => EMPTY_LOG);
  const streak = useSyncExternalStore(subscribeToStreak, getStreak, () => EMPTY_STREAK);
  const [now] = useState(() => Date.now());
  const days = useMemo(() => activityDays(log, 28, now), [log, now]);
  const summary = activitySummary(days);
  const max = Math.max(1, ...days.map((d) => d.count));

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {[["Current streak", `${streak.current} day${streak.current === 1 ? "" : "s"}`], ["Longest streak", `${streak.longest} day${streak.longest === 1 ? "" : "s"}`], ["Active days (4 weeks)", summary.activeDays], ["Actions this week", summary.actionsThisWeek]].map(([label, v]) => (
          <div key={label} className={studyCard}><p className="text-xs uppercase tracking-wide text-slate">{label}</p><p className="mt-1 font-display text-2xl text-navy">{v}</p></div>
        ))}
      </div>
      <p className="text-sm text-slate">A day counts towards your streak when you open a study resource, tick a checklist item, complete a revision round, add a bookmark, or record or resolve a mistake. Days follow your device&apos;s local time.</p>

      <section className={studyCard} aria-labelledby="act-cal">
        <h2 id="act-cal" className="font-display text-lg text-navy">Last 4 weeks</h2>
        <ol className="mt-3 grid grid-cols-7 gap-1.5" aria-label="Activity per day, oldest first">
          {days.map((d) => (
            <li key={d.date} title={`${d.date}: ${d.count} action${d.count === 1 ? "" : "s"}`} className="aspect-square rounded" style={{ backgroundColor: d.count ? `rgba(184, 134, 11, ${0.25 + 0.75 * (d.count / max)})` : "rgba(15, 32, 64, 0.06)" }}>
              <span className="sr-only">{d.date}: {d.count} actions</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={studyCard} aria-labelledby="act-timeline">
        <h2 id="act-timeline" className="font-display text-lg text-navy">Timeline</h2>
        {log.length === 0 ? <p className="mt-2 text-slate">No activity in the last 30 days yet.</p> : (
          <ul className="mt-2 divide-y divide-navy/5 text-sm">
            {log.slice(0, 60).map((e, i) => (
              <li key={`${e.at}-${i}`} className="flex justify-between gap-3 py-2">
                <span className="text-navy">{LABEL[e.type] ?? e.type}: {e.label} <span className="text-slate">(Class {e.cls})</span></span>
                <time className="shrink-0 text-slate" dateTime={new Date(e.at).toISOString()}>{new Date(e.at).toLocaleString()}</time>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-slate">Your activity history stays in this browser only and is never uploaded.</p>
      </section>
    </div>
  );
}
