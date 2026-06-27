"use client";

import { useEffect, useState } from "react";
import type { ChapterPyq, PyqQuestion } from "@/lib/pyq/kinematics";

type ExamFilter = "jee-main" | "jee-advanced" | "neet" | null;

const FILTER_LABEL: Record<Exclude<ExamFilter, null>, string> = {
  "jee-main": "JEE Main",
  "jee-advanced": "JEE Advanced",
  neet: "NEET",
};

function QuestionCard({
  q,
  idx,
  revealed,
  selected,
  setRevealed,
  setSelected,
}: {
  q: PyqQuestion;
  idx: number;
  revealed: Record<number, boolean>;
  selected: Record<number, number>;
  setRevealed: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  setSelected: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}) {
  const isRevealed = !!revealed[idx];
  const chosen = selected[idx];
  return (
    <div className="rounded-lg border border-navy/10 bg-white p-5 sm:p-6">
      <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-gold-deep bg-gold/10 rounded-full px-2.5 py-0.5 mb-2.5">
        {q.exam}
      </span>
      <p className="text-navy font-medium leading-relaxed">{q.question}</p>

      <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isChosen = chosen === i;
          let style = "border-navy/15 text-slate hover:border-gold/60";
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
            <span className="font-semibold text-gold-deep">Solution: </span>
            {q.solution}
          </p>
        </div>
      ) : (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setRevealed((r) => ({ ...r, [idx]: true }))}
            className="text-xs font-semibold text-gold-deep hover:text-navy transition-colors"
          >
            Show answer
          </button>
        </div>
      )}
    </div>
  );
}

function matchesFilter(q: PyqQuestion, filter: Exclude<ExamFilter, null>) {
  if (filter === "neet") return !q.examType;
  return q.examType === filter;
}

export default function PyqDisplay({ pyq }: { pyq: ChapterPyq }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [examFilter, setExamFilter] = useState<ExamFilter>(null);

  // A link like /class-11/kinematics#pyq:neet (from the NEET hub) or
  // #pyq:jee-main / #pyq:jee-advanced (from the PYQ hub's exam tabs) should
  // show ONLY that exam's questions here — not every section mixed together.
  // Landing on this tab any other way (e.g. browsing the chapter directly)
  // keeps showing the full grouped view.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const [, filterPart] = hash.split(":");
    if (filterPart === "jee-main" || filterPart === "jee-advanced" || filterPart === "neet") {
      setExamFilter(filterPart);
    }
  }, []);

  if (examFilter) {
    const filtered = pyq.questions
      .map((q, idx) => ({ q, idx }))
      .filter(({ q }) => matchesFilter(q, examFilter));

    return (
      <div>
        <p className="text-sm text-slate mb-6">
          {filtered.length} {FILTER_LABEL[examFilter]} PYQ
          {filtered.length === 1 ? "" : "s"} on {pyq.chapterName}, rewritten
          here in original wording with the same tested concept.
        </p>
        {filtered.length > 0 ? (
          <div className="space-y-5">
            {filtered.map(({ q, idx }) => (
              <QuestionCard
                key={`${q.exam}-${idx}`}
                q={q}
                idx={idx}
                revealed={revealed}
                selected={selected}
                setRevealed={setRevealed}
                setSelected={setSelected}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-navy/15 bg-white p-8 text-center">
            <p className="text-slate text-sm">
              {FILTER_LABEL[examFilter]} PYQs for {pyq.chapterName} are being
              prepared.
            </p>
          </div>
        )}
      </div>
    );
  }

  const hasExamTypeSplit = pyq.questions.some((q) => q.examType);

  if (!hasExamTypeSplit) {
    return (
      <div>
        <p className="text-sm text-slate mb-6">
          {pyq.questions.length} real questions previously asked in NEET/AIPMT
          exams on {pyq.chapterName}, rewritten here in original wording with
          the same tested concept.
        </p>
        <div className="space-y-5">
          {pyq.questions.map((q, idx) => (
            <QuestionCard
              key={`${q.exam}-${idx}`}
              q={q}
              idx={idx}
              revealed={revealed}
              selected={selected}
              setRevealed={setRevealed}
              setSelected={setSelected}
            />
          ))}
        </div>
      </div>
    );
  }

  const jeeMain = pyq.questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => q.examType === "jee-main");
  const jeeAdvanced = pyq.questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => q.examType === "jee-advanced");
  const others = pyq.questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => !q.examType);

  return (
    <div>
      <p className="text-sm text-slate mb-6">
        {pyq.questions.length} previous year questions on {pyq.chapterName},
        rewritten here in original wording with the same tested concept —
        grouped by exam.
      </p>

      <div className="space-y-10">
        {jeeMain.length > 0 && (
          <div>
            <h3 className="font-display text-lg text-navy mb-1">
              JEE Main PYQs
            </h3>
            <p className="text-xs text-slate/70 mb-4">
              {jeeMain.length} question{jeeMain.length > 1 ? "s" : ""}
            </p>
            <div className="space-y-5">
              {jeeMain.map(({ q, idx }) => (
                <QuestionCard
                  key={`${q.exam}-${idx}`}
                  q={q}
                  idx={idx}
                  revealed={revealed}
                  selected={selected}
                  setRevealed={setRevealed}
                  setSelected={setSelected}
                />
              ))}
            </div>
          </div>
        )}

        {jeeAdvanced.length > 0 && (
          <div>
            <h3 className="font-display text-lg text-navy mb-1">
              JEE Advanced PYQs
            </h3>
            <p className="text-xs text-slate/70 mb-4">
              {jeeAdvanced.length} question{jeeAdvanced.length > 1 ? "s" : ""}
            </p>
            <div className="space-y-5">
              {jeeAdvanced.map(({ q, idx }) => (
                <QuestionCard
                  key={`${q.exam}-${idx}`}
                  q={q}
                  idx={idx}
                  revealed={revealed}
                  selected={selected}
                  setRevealed={setRevealed}
                  setSelected={setSelected}
                />
              ))}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div>
            <h3 className="font-display text-lg text-navy mb-1">
              NEET / Other PYQs
            </h3>
            <p className="text-xs text-slate/70 mb-4">
              {others.length} question{others.length > 1 ? "s" : ""}
            </p>
            <div className="space-y-5">
              {others.map(({ q, idx }) => (
                <QuestionCard
                  key={`${q.exam}-${idx}`}
                  q={q}
                  idx={idx}
                  revealed={revealed}
                  selected={selected}
                  setRevealed={setRevealed}
                  setSelected={setSelected}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
