import type { ConceptStat } from "@/lib/concept-analysis";
import EmptyState from "./EmptyState";

/** Plain, no client JS — receives already-ranked concept stats. */
export default function ConceptAnalysisCard({ concepts }: { concepts: ConceptStat[] }) {
  if (concepts.length === 0) {
    return (
      <EmptyState
        icon="revision"
        title="No concepts tracked yet"
        description="Every mistake you log gets a concept tag — once you've logged a few, the concepts needing the most revision will show up here."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  const maxCount = Math.max(...concepts.map((c) => c.unresolvedCount || c.totalCount));

  return (
    <ul className="space-y-3">
      {concepts.map((c) => {
        const value = c.unresolvedCount > 0 ? c.unresolvedCount : c.totalCount;
        const widthPct = maxCount > 0 ? Math.max(8, Math.round((value / maxCount) * 100)) : 0;
        return (
          <li key={c.concept}>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-sm font-semibold text-navy">{c.concept}</span>
              <span className="text-xs text-slate/60">
                {c.unresolvedCount > 0
                  ? `${c.unresolvedCount} unresolved`
                  : `${c.totalCount} resolved`}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-navy/10 overflow-hidden">
              <div
                className={`h-full rounded-full ${c.unresolvedCount > 0 ? "bg-red-400" : "bg-green-500"}`}
                style={{ width: `${widthPct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
