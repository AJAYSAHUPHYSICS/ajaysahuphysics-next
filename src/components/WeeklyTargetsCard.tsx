import type { WeeklyTarget } from "@/lib/weekly-targets";

/** Plain, no client JS — receives an already-built target list. */
export default function WeeklyTargetsCard({ targets }: { targets: WeeklyTarget[] }) {
  if (targets.length === 0) {
    return (
      <p className="text-sm text-slate">
        Track a goal above to see a rolling 7-day target based on your recent pace.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {targets.map((t) => (
        <li
          key={t.type}
          className="flex items-center gap-3 rounded-md border border-navy/10 px-4 py-3 bg-white"
        >
          <span aria-hidden="true" className="shrink-0 w-1.5 h-1.5 rounded-full bg-navy" />
          <span className="text-sm font-semibold text-navy">{t.message}</span>
        </li>
      ))}
    </ul>
  );
}
