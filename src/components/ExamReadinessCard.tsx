import ProgressBar from "./ProgressBar";
import { examReadinessTierLabel, type ExamReadiness } from "@/lib/exam-readiness";

const TIER_STYLE: Record<string, string> = {
  excellent: "text-green-700",
  good: "text-gold-deep",
  average: "text-amber-700",
  "needs-work": "text-red-700",
};

/** Plain, no client JS — receives an already-computed ExamReadiness. */
export default function ExamReadinessCard({ readiness }: { readiness: ExamReadiness }) {
  if (readiness.tier === null) {
    return (
      <p className="text-sm text-slate">
        Complete a chapter&apos;s resources or mark a revision round to see your exam readiness here.
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className={`text-2xl font-display font-semibold ${TIER_STYLE[readiness.tier]}`}>
          {examReadinessTierLabel(readiness.tier)}
        </span>
        <span className="text-lg font-semibold text-navy">{readiness.overall}/100</span>
      </div>
      <ProgressBar percent={readiness.overall} label="Overall exam readiness" />

      <div className="mt-6 space-y-4">
        <BreakdownBar label="Completion" percent={readiness.completion} />
        <BreakdownBar label="Revision" percent={readiness.revision} />
        <BreakdownBar label="Practice" percent={readiness.practice} />
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
      <ProgressBar percent={percent} size="sm" label={`${label} contribution to exam readiness`} />
    </div>
  );
}
