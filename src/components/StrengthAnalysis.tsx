import Link from "next/link";
import type { StrengthAnalysis as StrengthAnalysisData } from "@/lib/chapter-strength";
import EmptyState from "./EmptyState";

/** Plain, no client JS — receives already-ranked chapter lists. */
export default function StrengthAnalysis({ analysis }: { analysis: StrengthAnalysisData }) {
  if (analysis.strongest.length === 0 && analysis.needsImprovement.length === 0) {
    return (
      <EmptyState
        icon="chapters"
        title="Not enough data yet"
        description="Start a chapter's resources and this will rank your strongest and weakest chapters by completion."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <RankedGroup title="Strongest Chapters" chapters={analysis.strongest} tone="green" />
      <RankedGroup title="Needs Improvement" chapters={analysis.needsImprovement} tone="amber" />
    </div>
  );
}

function RankedGroup({
  title,
  chapters,
  tone,
}: {
  title: string;
  chapters: StrengthAnalysisData["strongest"];
  tone: "green" | "amber";
}) {
  const valueColor = tone === "green" ? "text-green-700" : "text-amber-700";

  return (
    <div>
      <h4 className="font-semibold text-navy text-sm mb-2.5">{title}</h4>
      {chapters.length === 0 ? (
        <p className="text-xs text-slate/50">Not enough data yet.</p>
      ) : (
        <ul className="space-y-1.5">
          {chapters.map((c) => (
            <li key={`${c.cls}-${c.slug}`}>
              <Link
                href={`/class-${c.cls}/${c.slug}`}
                className="flex items-center justify-between gap-2 text-sm text-navy hover:text-gold-deep transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
              >
                <span className="truncate">{c.name}</span>
                <span className={`shrink-0 text-xs font-semibold ${valueColor}`}>{c.progress.percent}%</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
