"use client";

import { useState } from "react";
import type { ChapterPyq } from "@/lib/pyq/kinematics";

export default function PyqDisplay({ pyq }: { pyq: ChapterPyq }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState<Record<number, number>>({});

  return (
    <div>
      <p className="text-sm text-slate mb-6">
        {pyq.questions.length} real questions previously asked in NEET/AIPMT
        exams on {pyq.chapterName}, rewritten here in original wording with
        the same tested concept.
      </p>
      <div className="space-y-5">
        {pyq.questions.map((q, idx) => {
          const isRevealed = !!revealed[idx];
          const chosen = selected[idx];
          return (
            <div
              key={`${q.exam}-${idx}`}
              className="rounded-lg border border-navy/10 bg-white p-5 sm:p-6"
            >
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-gold-deep bg-gold/10 rounded-full px-2.5 py-0.5 mb-2.5">
                {q.exam}
              </span>
              <p className="text-navy font-medium leading-relaxed">
                {q.question}
              </p>

              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                        setSelected((s) => ({ ...s, [idx]: i }));
                        setRevealed((r) => ({ ...r, [idx]: true }));
                      }}
                      className={`text-left text-sm rounded-md border px-3 py-2 transition-colors ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isRevealed ? (
                <div className="mt-3.5">
                  <p className="text-sm text-slate leading-relaxed bg-ivory rounded-md p-3 border border-gold/20">
                    <span className="font-semibold text-gold-deep">
                      Solution:{" "}
                    </span>
                    {q.solution}
                  </p>
                </div>
              ) : (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() =>
                      setRevealed((r) => ({ ...r, [idx]: true }))
                    }
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
