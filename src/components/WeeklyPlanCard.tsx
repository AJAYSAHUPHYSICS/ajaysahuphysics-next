"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { WeeklyDayPlan } from "@/lib/weekly-plan";

const noSubscribe = () => () => {};

/**
 * Day heading that is safe to prerender. The dashboard is a static export,
 * so its HTML is rendered on the BUILD day while the browser hydrates it on
 * a later one. Weekday names ("Saturday") would then differ between the
 * two and React reports a hydration error (#418). The prerender and the
 * hydration pass therefore use offset labels ("In 2 days"), and the real
 * weekday name is shown as soon as the page is running in the browser.
 */
export function dayHeading(index: number, label: string, inBrowser: boolean): string {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  return inBrowser ? label : `In ${index} days`;
}

/** Receives an already-built 7-day plan. */
export default function WeeklyPlanCard({ days }: { days: WeeklyDayPlan[] }) {
  // false during the prerender and hydration, true afterwards.
  const inBrowser = useSyncExternalStore(noSubscribe, () => true, () => false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {days.map((day, i) => (
        <div key={i} className="rounded-md border border-navy/10 bg-ivory p-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate/60 mb-2">{dayHeading(i, day.label, inBrowser)}</p>
          {day.chapters.length === 0 ? (
            <p className="text-xs text-slate/40">Nothing scheduled</p>
          ) : (
            <ul className="space-y-1.5">
              {day.chapters.map((c) => (
                <li key={`${c.cls}-${c.slug}`}>
                  <Link
                    href={`/class-${c.cls}/${c.slug}`}
                    className="block text-xs font-medium text-navy hover:text-gold-deep transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded truncate"
                    title={c.name}
                  >
                    {c.name}
                    <span className="block text-[11px] text-slate/50 font-normal">{c.reason}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
