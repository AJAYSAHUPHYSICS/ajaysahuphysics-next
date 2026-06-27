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
  setRevealed,
}: {
  q: PyqQuestion;
  idx: number;
  revealed: Record<number, boolean>;
  setRevealed: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) {
  const isRevealed = !!revealed[idx];
  return (
    <div className="rounded-lg border border-navy/10 bg-white p-5 sm:p-6">
      <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-gold-deep bg-gold/10 rounded-full px-2.5 py-0.5 mb-2.5">
        {q.exam}
      </span>
      <p className="text-navy font-medium leading-relaxed">{q.question}</p>

      {isRevealed ? (
        <div className="mt-3.5">
          <p className="text-sm text-slate leading-relaxed bg-ivory rounded-md p-3 border border-gold/20">
            <span className="font-semibold text-gold-deep">
              Answer: {q.options[q.correctIndex]}
              {". "}
            </span>
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
                setRevealed={setRevealed}
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
              setRevealed={setRevealed}
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
                  setRevealed={setRevealed}
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
                  setRevealed={setRevealed}
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
                  setRevealed={setRevealed}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
