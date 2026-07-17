import ProgressBar from "./ProgressBar";
import { tierLabel, type RevisionHealth } from "@/lib/revision-health";

const TIER_STYLE: Record<string, string> = {
  excellent: "text-green-700",
  good: "text-gold-deep",
  "needs-attention": "text-amber-700",
  critical: "text-red-700",
};

/** Plain, no client JS — receives an already-computed RevisionHealth. */
export default function RevisionHealthCard({ health }: { health: RevisionHealth }) {
  if (health.tier === null) {
    return (
      <p className="text-sm text-slate">
        Complete a chapter&apos;s resources or mark a revision round to see your revision health here.
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className={`text-lg font-display font-semibold ${TIER_STYLE[health.tier]}`}>
          {tierLabel(health.tier)}
        </span>
        <span className="text-sm text-slate/60">{health.score}/100</span>
      </div>
      <ProgressBar percent={health.score} label="Revision health score" />
      <dl className="grid grid-cols-3 gap-4 mt-5">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate/60">Overdue</dt>
          <dd className="text-sm font-semibold text-navy mt-0.5">{health.overdueCount}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate/60">Never revised</dt>
          <dd className="text-sm font-semibold text-navy mt-0.5">{health.neverRevisedCount}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate/60">Mastered</dt>
          <dd className="text-sm font-semibold text-navy mt-0.5">{health.masteredCount}</dd>
        </div>
      </dl>
    </div>
  );
}
