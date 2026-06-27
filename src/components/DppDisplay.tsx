"use client";

import { useState } from "react";
import type { ChapterDpp } from "@/lib/dpp/kinematics";

export default function DppDisplay({ dpp }: { dpp: ChapterDpp }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const toggleReveal = (n: number) =>
    setRevealed((r) => ({ ...r, [n]: !r[n] }));

  return (
    <div>
      <p className="text-sm text-slate mb-6">
        {dpp.questions.length} questions on {dpp.chapterName}. Try each one
        before checking the answer.
      </p>
      <div className="space-y-5">
        {dpp.questions.map((q) => {
          const isRevealed = !!revealed[q.number];
          return (
            <div
              key={q.number}
              className="rounded-lg border border-navy/10 bg-white p-5 sm:p-6"
            >
              <div className="flex gap-3">
                <span className="font-display text-gold-deep shrink-0">
                  Q{q.number}.
                </span>
                <p className="text-navy font-medium leading-relaxed">
                  {q.question}
                </p>
              </div>

              {isRevealed ? (
                <div className="mt-3.5 pl-7">
                  <p className="text-sm text-slate leading-relaxed bg-ivory rounded-md p-3 border border-gold/20">
                    <span className="font-semibold text-gold-deep">
                      Answer: {q.options[q.correctIndex]}
                      {". "}
                    </span>
                    {q.solution}
                  </p>
                </div>
              ) : (
                <div className="mt-3 pl-7">
                  <button
                    type="button"
                    onClick={() => toggleReveal(q.number)}
                    className="text-xs font-semibold text-gold-deep hover:text-navy transition-colors"
                  >
                    Show answer
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
