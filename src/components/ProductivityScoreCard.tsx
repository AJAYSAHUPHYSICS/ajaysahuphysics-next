import ProgressBar from "./ProgressBar";
import { productivityTierLabel, type ProductivityScore } from "@/lib/productivity-score";

const TIER_STYLE: Record<string, string> = {
  excellent: "text-green-700",
  good: "text-gold-deep",
  average: "text-amber-700",
  "needs-work": "text-red-700",
};

/** Plain, no client JS — receives an already-computed ProductivityScore.
 * Same overall-score + breakdown-bars layout as ExamReadinessCard.tsx. */
export default function ProductivityScoreCard({ score }: { score: ProductivityScore }) {
  if (score.tier === null) {
    return (
      <p className="text-sm text-slate">
        Complete a chapter&apos;s resources or mark a revision round to see your productivity score here.
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className={`text-2xl font-display font-semibold ${TIER_STYLE[score.tier]}`}>
          {productivityTierLabel(score.tier)}
        </span>
        <span className="text-lg font-semibold text-navy">{score.overall}/100</span>
      </div>
      <ProgressBar percent={score.overall} label="Overall productivity score" />

      <div className="mt-6 space-y-4">
        <BreakdownBar label="Completion" percent={score.completion} />
        <BreakdownBar label="Revision" percent={score.revision} />
        <BreakdownBar label="Accuracy" percent={score.accuracy} />
        <BreakdownBar label="Consistency" percent={score.consistency} />
      </div>
    </div>
  );
}

function BreakdownBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-semibold text-navy">{label}</span>
        <span className="text-xs text-slate/60">{percent}%</span>
      </div>
      <ProgressBar percent={percent} size="sm" label={`${label} contribution to productivity score`} />
    </div>
  );
}
