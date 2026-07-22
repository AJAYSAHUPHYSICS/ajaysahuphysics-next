import ProgressBar from "./ProgressBar";
import { GOAL_LABEL, GOAL_TYPES, type GoalType } from "@/lib/goal-types";
import type { GoalProgress } from "@/lib/goal-progress";
import { forecastStatusLabel, type GoalForecast } from "@/lib/goal-forecast";

const STATUS_STYLE: Record<GoalForecast["status"], string> = {
  complete: "text-green-700 bg-green-50 border-green-200",
  ahead: "text-green-700 bg-green-50 border-green-200",
  "on-track": "text-gold-deep bg-gold/5 border-gold/30",
  behind: "text-amber-700 bg-amber-50 border-amber-200",
  "no-data": "text-slate/60 bg-navy/5 border-navy/10",
};

export type GoalRow = {
  type: GoalType;
  active: boolean;
  progress: GoalProgress;
  forecast: GoalForecast | null;
};

/** Client-interactive via the onToggle callback passed down from
 * DashboardClient (which already owns the "use client" boundary) —
 * same pattern as the inline bookmark Remove button there. */
export default function GoalsCard({
  rows,
  onToggle,
}: {
  rows: GoalRow[];
  onToggle: (type: GoalType) => void;
}) {
  const byType = new Map(rows.map((r) => [r.type, r]));

  return (
    <div className="space-y-3">
      {GOAL_TYPES.map((type) => {
        const row = byType.get(type);
        if (!row) return null;
        return (
          <div
            key={type}
            className={`rounded-md border px-4 py-3.5 ${
              row.active ? "border-gold/40 bg-white" : "border-navy/10 bg-ivory"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy">{GOAL_LABEL[type]}</p>
                {row.active && (
                  <p className="text-xs text-slate/60 mt-0.5">
                    {row.progress.completed}/{row.progress.total} done &middot; {row.progress.percent}%
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {row.active && row.forecast && (
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLE[row.forecast.status]}`}
                  >
                    {forecastStatusLabel(row.forecast.status)}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onToggle(type)}
                  className={`text-xs font-semibold rounded-full px-3 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                    row.active
                      ? "text-slate/60 border border-navy/15 hover:border-navy/30"
                      : "text-white bg-navy hover:bg-navy-light"
                  }`}
                >
                  {row.active ? "Stop tracking" : "Track this goal"}
                </button>
              </div>
            </div>
            {row.active && row.progress.total > 0 && (
              <div className="mt-3">
                <ProgressBar percent={row.progress.percent} size="sm" label={`${GOAL_LABEL[type]} progress`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
