import type { Recommendation } from "@/lib/goal-recommendations";

/** Plain, no client JS — receives an already-built recommendation list. */
export default function SmartRecommendationsCard({ recommendations }: { recommendations: Recommendation[] }) {
  if (recommendations.length === 0) {
    return (
      <p className="text-sm text-slate">
        Track a goal above and this will fill in with coaching based on your pace and revision schedule.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {recommendations.map((r) => (
        <li key={r.message} className="rounded-md border border-navy/10 px-4 py-3.5 bg-white">
          <p className="text-sm font-semibold text-navy">{r.message}</p>
          <p className="text-xs text-slate/60 mt-1">{r.reason}</p>
        </li>
      ))}
    </ul>
  );
}
