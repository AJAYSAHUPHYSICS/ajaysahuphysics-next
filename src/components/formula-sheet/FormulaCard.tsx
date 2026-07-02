"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Formula } from "@/lib/formula-sheet";
import ExamTagPill from "./ExamTagPill";
import { DifficultyBadge, FrequencyBadge } from "./DifficultyBadge";
import FormulaVariablesTable from "./FormulaVariablesTable";

function examStatsLine(f: Formula): string | null {
  const s = f.examStats;
  if (!s) return null;
  const parts: string[] = [];
  if (s.jeeMain) parts.push(`JEE Main ×${s.jeeMain}`);
  if (s.jeeAdvanced) parts.push(`JEE Adv ×${s.jeeAdvanced}`);
  if (s.neet) parts.push(`NEET ×${s.neet}`);
  if (s.mhtCet) parts.push(`MHT-CET ×${s.mhtCet}`);
  return parts.length ? parts.join(" · ") : null;
}

export default function FormulaCard({ formula }: { formula: Formula }) {
  const [showDerivation, setShowDerivation] = useState(false);
  const derivationId = useId();
  const stats = examStatsLine(formula);

  return (
    <article
      id={formula.id}
      aria-labelledby={`${formula.id}-label`}
      className="rounded-lg border border-navy/10 bg-white p-5 sm:p-6 scroll-mt-24 print:break-inside-avoid print:border-navy/30"
    >
      {/* Expression */}
      <p className="font-mono text-lg sm:text-xl text-navy font-semibold tracking-tight">
        {formula.expression}
      </p>

      {/* Name + badges */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <h4
          id={`${formula.id}-label`}
          className="font-display text-base text-navy"
        >
          {formula.label}
        </h4>
        <span className="flex flex-wrap items-center gap-1.5 print:hidden">
          <DifficultyBadge level={formula.difficulty} />
          <FrequencyBadge level={formula.frequency} />
          {formula.examTags.map((t) => (
            <ExamTagPill key={t} tag={t} />
          ))}
        </span>
      </div>

      {formula.derivedFrom ? (
        <p className="mt-1.5 text-xs text-slate/80 italic">
          {formula.derivedFrom}
        </p>
      ) : null}

      {/* Variables */}
      <div className="mt-4">
        <FormulaVariablesTable variables={formula.variables} />
      </div>

      {/* Conditions */}
      {formula.conditions?.length ? (
        <div className="mt-4 rounded-md bg-navy/[0.03] border border-navy/10 px-3.5 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-navy/60 mb-1">
            Valid when
          </p>
          <ul className="list-disc pl-4 space-y-0.5">
            {formula.conditions.map((c) => (
              <li key={c} className="text-sm text-slate leading-relaxed">
                {c}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Common mistakes */}
      {formula.commonMistakes?.length ? (
        <div className="mt-3 rounded-md bg-red-50/60 border border-red-100 px-3.5 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-red-700/80 mb-1">
            Common mistakes
          </p>
          <ul className="list-disc pl-4 space-y-0.5">
            {formula.commonMistakes.map((m) => (
              <li key={m} className="text-sm text-red-900/80 leading-relaxed">
                {m}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Derivation (expandable) */}
      {formula.derivation ? (
        <div className="mt-3 print:hidden">
          <button
            type="button"
            onClick={() => setShowDerivation((s) => !s)}
            aria-expanded={showDerivation}
            aria-controls={derivationId}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep hover:text-navy transition-colors"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
              className={`transition-transform ${showDerivation ? "rotate-90" : ""}`}
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
            {showDerivation ? "Hide derivation" : "Show derivation"}
            {formula.derivation.askedInBoards ? (
              <span className="text-[11px] font-medium text-slate/70">
                (asked in Boards)
              </span>
            ) : null}
          </button>
          {showDerivation ? (
            <ol
              id={derivationId}
              className="mt-2.5 space-y-2 border-l-2 border-gold/40 pl-4"
            >
              <li className="text-sm text-slate">
                <span className="font-semibold text-navy/80">Start: </span>
                {formula.derivation.startsFrom}
              </li>
              {formula.derivation.steps.map((step, i) => (
                <li key={i} className="text-sm text-slate leading-relaxed">
                  {step.statement}
                  {step.expression ? (
                    <span className="block font-mono text-navy mt-0.5">
                      {step.expression}
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      ) : null}

      {/* Footer: stats + concept link */}
      {(stats || formula.conceptLink) && (
        <div className="mt-4 pt-3 border-t border-navy/5 flex flex-wrap items-center justify-between gap-2 print:hidden">
          {stats ? (
            <p className="text-xs text-slate/70">
              Past appearances: {stats}
            </p>
          ) : (
            <span />
          )}
          {formula.conceptLink ? (
            <Link
              href={`/class-11/${formula.conceptLink.chapterSlug}#notes`}
              className="text-xs font-semibold text-gold-deep hover:text-navy transition-colors"
            >
              Read the concept →
            </Link>
          ) : null}
        </div>
      )}
    </article>
  );
}
