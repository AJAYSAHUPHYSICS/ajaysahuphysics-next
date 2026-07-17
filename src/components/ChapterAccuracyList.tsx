import Link from "next/link";
import { accuracyTierLabel, type AccuracyTier, type ChapterAccuracy } from "@/lib/chapter-accuracy";
import EmptyState from "./EmptyState";

type GradedAccuracy = ChapterAccuracy & { score: number; tier: AccuracyTier };

const TIER_STYLE: Record<AccuracyTier, string> = {
  excellent: "text-green-700 bg-green-50 border-green-200",
  good: "text-gold-deep bg-gold/5 border-gold/30",
  average: "text-amber-700 bg-amber-50 border-amber-200",
  "needs-practice": "text-red-700 bg-red-50 border-red-200",
};

/** Plain, no client JS — receives already-computed accuracy scores. */
export default function ChapterAccuracyList({ accuracies }: { accuracies: ChapterAccuracy[] }) {
  const graded = accuracies
    .filter((a): a is GradedAccuracy => a.tier !== null && a.score !== null)
    .sort((a, b) => b.score - a.score);

  if (graded.length === 0) {
    return (
      <EmptyState
        icon="chapters"
        title="No accuracy data yet"
        description="Mark a chapter's DPP or PYQ as done, or log a mistake, and its accuracy score will show up here."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {graded.map((a) => (
        <li key={`${a.cls}-${a.slug}`}>
          <Link
            href={`/class-${a.cls}/${a.slug}`}
            className="flex items-center justify-between gap-3 rounded-md border border-navy/10 px-4 py-3 hover:border-gold hover:bg-ivory transition-colors focus-visible:outline-2 focus-visible:outline-gold"
          >
            <span className="min-w-0 text-sm font-semibold text-navy truncate">{a.name}</span>
            <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${TIER_STYLE[a.tier]}`}>
              {accuracyTierLabel(a.tier)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
