import Link from "next/link";
import type { WeeklyDayPlan } from "@/lib/weekly-plan";

/** Plain, no client JS — receives an already-built 7-day plan. */
export default function WeeklyPlanCard({ days }: { days: WeeklyDayPlan[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {days.map((day) => (
        <div key={day.label} className="rounded-md border border-navy/10 bg-ivory p-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate/60 mb-2">{day.label}</p>
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
