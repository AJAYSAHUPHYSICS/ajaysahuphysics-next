"use client";

import { useState } from "react";
import type { ChapterDpp } from "@/lib/dpp/kinematics";

export default function DppDisplay({ dpp }: { dpp: ChapterDpp }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState<Record<number, number>>({});

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
          const chosen = selected[q.number];
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

              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.correctIndex;
                  const isChosen = chosen === i;
                  let style =
                    "border-navy/15 text-slate hover:border-gold/60";
                  if (isRevealed && isCorrect) {
                    style = "border-green-600 bg-green-50 text-green-800";
                  } else if (isRevealed && isChosen && !isCorrect) {
                    style = "border-red-400 bg-red-50 text-red-700";
                  } else if (isChosen) {
                    style = "border-navy text-navy";
                  }
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelected((s) => ({ ...s, [q.number]: i }));
                        setRevealed((r) => ({ ...r, [q.number]: true }));
                      }}
                      className={`text-left text-sm rounded-md border px-3 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-gold ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isRevealed ? (
                <div className="mt-3.5 pl-7">
                  <p className="text-sm text-slate leading-relaxed bg-ivory rounded-md p-3 border border-gold/20">
                    <span className="font-semibold text-gold-deep">
                      Solution:{" "}
                    </span>
                    {q.solution}
                  </p>
                </div>
              ) : (
                <div className="mt-3 pl-7">
                  <button
                    type="button"
                    onClick={() => toggleReveal(q.number)}
                    className="text-xs font-semibold text-gold-deep hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
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
