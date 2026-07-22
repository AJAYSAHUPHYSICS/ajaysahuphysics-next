import type { ProgressForecast } from "@/lib/progress-forecast";

function daysLabel(days: number | null): string {
  if (days === null) return "Not enough data yet";
  if (days === 0) return "Done";
  return `~${days} day${days === 1 ? "" : "s"} at current pace`;
}

/** Plain, no client JS — receives an already-computed ProgressForecast. */
export default function ProgressForecastCard({ forecast }: { forecast: ProgressForecast }) {
  const entries = [forecast.chaptersRemaining, ...forecast.resourceForecasts].filter((e) => e.total > 0);

  if (entries.length === 0) {
    return (
      <p className="text-sm text-slate">
        Add content progress on any chapter and your remaining work will forecast here.
      </p>
    );
  }

  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {entries.map((entry) => (
        <div key={entry.label} className="rounded-md border border-navy/10 px-4 py-3.5 bg-white">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate/60">{entry.label}</dt>
          <dd className="text-lg font-display text-navy mt-1">
            {entry.remaining}/{entry.total}
          </dd>
          <dd className="text-xs text-slate/60 mt-0.5">{daysLabel(entry.estimatedDays)}</dd>
        </div>
      ))}
    </dl>
  );
}
