import type { FormulaTopicGroup } from "@/lib/formula-sheet";
import FormulaCard from "./FormulaCard";

export default function FormulaTopicGroupBlock({
  group,
}: {
  group: FormulaTopicGroup;
}) {
  return (
    <section aria-labelledby={`${group.id}-heading`} className="print:break-inside-avoid-page">
      <div className="mb-4">
        <h3
          id={`${group.id}-heading`}
          className="font-display text-xl sm:text-2xl text-navy scroll-mt-24"
        >
          {group.title}
        </h3>
        <div className="gold-rule mt-2" aria-hidden="true" />
        {group.intro ? (
          <p className="mt-2.5 text-sm text-slate leading-relaxed max-w-2xl">
            {group.intro}
          </p>
        ) : null}
      </div>

      <div className="space-y-4">
        {group.formulas.map((f) => (
          <FormulaCard key={f.id} formula={f} />
        ))}
      </div>

      {group.importantObservations?.length ? (
        <div className="mt-4 rounded-lg border border-gold/30 bg-gold/[0.06] p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-deep mb-1.5">
            Worth remembering
          </p>
          <ul className="list-disc pl-4 space-y-1">
            {group.importantObservations.map((o) => (
              <li key={o} className="text-sm text-navy/80 leading-relaxed">
                {o}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {group.examNotes ? (
        <p className="mt-3 text-sm text-slate italic border-l-2 border-navy/15 pl-3">
          {group.examNotes}
        </p>
      ) : null}
    </section>
  );
}
