"use client";

import { useState } from "react";
import { estimateReadingMinutes } from "@/lib/reading-time";
import ReadingTimeBadge from "./ReadingTimeBadge";

export type WorkedExample = {
  title: string;
  problem: string;
  solutionSteps: string[];
  answer: string;
};

export type ChapterJeeNotes = {
  chapterName: string;
  className: "11" | "12";
  intro: string;
  examples: WorkedExample[];
};

export default function JeeNotesDisplay({ notes }: { notes: ChapterJeeNotes }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const minutes = estimateReadingMinutes(
    notes.intro,
    notes.examples.map((ex) => ex.problem),
    notes.examples.flatMap((ex) => ex.solutionSteps),
    notes.examples.map((ex) => ex.answer)
  );

  return (
    <div>
      <div className="mb-4">
        <ReadingTimeBadge minutes={minutes} />
      </div>
      <p className="text-sm text-slate mb-6">{notes.intro}</p>
      <div className="space-y-5">
        {notes.examples.map((ex, idx) => {
          const isRevealed = !!revealed[idx];
          return (
            <div
              key={ex.title}
              className="rounded-lg border border-navy/10 bg-white p-5 sm:p-6"
            >
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-gold-deep bg-gold/10 rounded-full px-2.5 py-0.5 mb-2.5">
                {ex.title}
              </span>
              <p className="text-navy font-medium leading-relaxed">
                {ex.problem}
              </p>

              {isRevealed ? (
                <div className="mt-3.5 space-y-2">
                  <ol className="space-y-1.5 list-decimal list-inside">
                    {ex.solutionSteps.map((step, i) => (
                      <li key={i} className="text-sm text-slate leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p className="text-sm leading-relaxed bg-ivory rounded-md p-3 border border-gold/20">
                    <span className="font-semibold text-gold-deep">
                      Answer:{" "}
                    </span>
                    <span className="text-navy font-semibold">{ex.answer}</span>
                  </p>
                </div>
              ) : (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => setRevealed((r) => ({ ...r, [idx]: true }))}
                    className="text-xs font-semibold text-gold-deep hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded px-1 py-2 -mx-1"
                  >
                    Show solution
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
