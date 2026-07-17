import Link from "next/link";
import type { DailyStudyPlan } from "@/lib/study-plan";
import { studyLoadLabel } from "@/lib/study-plan";
import EmptyState from "./EmptyState";

const LOAD_STYLE: Record<string, string> = {
  light: "text-green-700 bg-green-50 border-green-200",
  moderate: "text-gold-deep bg-gold/5 border-gold/30",
  heavy: "text-amber-700 bg-amber-50 border-amber-200",
  "very-heavy": "text-red-700 bg-red-50 border-red-200",
};

const CATEGORY_LABEL: Record<string, string> = {
  "overdue-revision": "Revision",
  "unresolved-mistakes": "Mistakes",
  "weak-chapter": "Weak chapter",
  "incomplete-pyq": "PYQ",
  "incomplete-dpp": "DPP",
  "formula-sheet": "Formula Sheet",
  notes: "Notes",
  bookmark: "Bookmark",
};

/** Plain, no client JS — receives an already-built DailyStudyPlan. */
export default function DailyStudyPlanCard({ plan }: { plan: DailyStudyPlan }) {
  if (plan.tasks.length === 0) {
    return (
      <EmptyState
        icon="check"
        title="Nothing planned for today"
        description="No overdue revisions, mistakes, or unfinished resources right now — a great time to start a new chapter."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate/60">Today&apos;s Study Time</p>
          <p className="text-2xl font-display text-navy mt-0.5">{plan.totalMinutes} min</p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border ${LOAD_STYLE[plan.load]}`}>
          {studyLoadLabel(plan.load)} load
        </span>
      </div>

      <ol className="space-y-2">
        {plan.tasks.map((task, i) => (
          <li key={`${task.cls}-${task.slug}-${task.category}`}>
            <Link
              href={task.path}
              className="flex items-center gap-3 rounded-md border border-navy/10 px-4 py-3 hover:border-gold hover:bg-ivory transition-colors focus-visible:outline-2 focus-visible:outline-gold"
            >
              <span
                aria-hidden="true"
                className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white text-xs font-bold"
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-navy truncate">{task.chapterName}</span>
                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-gold-deep bg-gold/10 rounded-full px-2 py-0.5">
                    {CATEGORY_LABEL[task.category]}
                  </span>
                </span>
                <span className="block text-xs text-slate/60 mt-0.5">{task.reason}</span>
              </span>
              <span className="shrink-0 text-xs font-semibold text-slate/60">{task.estimatedMinutes} min</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
