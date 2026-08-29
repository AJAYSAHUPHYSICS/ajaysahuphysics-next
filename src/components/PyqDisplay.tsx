"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { ChapterPyq, PyqQuestion } from "@/lib/pyq/kinematics";
import AddMistakeButton from "./AddMistakeButton";
import TimedPracticeSession, { type TimedQuestion } from "./TimedPracticeSession";

export type ExamFilter = "jee-main" | "jee-advanced" | "neet" | null;

const FILTER_LABEL: Record<Exclude<ExamFilter, null>, string> = {
  "jee-main": "JEE Main",
  "jee-advanced": "JEE Advanced",
  neet: "NEET",
};

function QuestionCard({
  q,
  idx,
  cls,
  slug,
  chapterName,
  revealed,
  selected,
  setRevealed,
  setSelected,
}: {
  q: PyqQuestion;
  idx: number;
  cls: "11" | "12";
  slug: string;
  chapterName: string;
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
              className={`text-left text-sm rounded-md border px-3 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-gold ${style}`}
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
          <AddMistakeButton
            cls={cls}
            slug={slug}
            chapterName={chapterName}
            resourceType="pyq"
            questionId={String(idx)}
          />
        </div>
      ) : (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setRevealed((r) => ({ ...r, [idx]: true }))}
            className="text-xs font-semibold text-gold-deep hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
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

export default function PyqDisplay({ pyq, slug }: { pyq: ChapterPyq; slug: string }) {
  const searchParams = useSearchParams();
  const examParam = searchParams.get("exam");
  const initialExamFilter: ExamFilter =
    examParam === "jee-main" || examParam === "jee-advanced" || examParam === "neet"
      ? examParam
      : null;

  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [examFilter, setExamFilter] = useState<ExamFilter>(initialExamFilter);
  const [mode, setMode] = useState<"normal" | "timed">("normal");

  const cardProps = { cls: pyq.className, slug, chapterName: pyq.chapterName };

  // Timed mode respects the active exam filter (JEE Main / JEE Advanced /
  // NEET) so a student practicing one exam's questions stays within that
  // set. With no filter active, it falls back to the full question list,
  // matching the previous behavior.
  if (mode === "timed") {
    const sourceQuestions = examFilter
      ? pyq.questions
          .map((q, idx) => ({ q, idx }))
          .filter(({ q }) => matchesFilter(q, examFilter))
      : pyq.questions.map((q, idx) => ({ q, idx }));

    const timedQuestions: TimedQuestion[] = sourceQuestions.map(({ q, idx }) => ({
      key: String(idx),
      tag: q.exam,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      solution: q.solution,
    }));
    return (
      <TimedPracticeSession
        questions={timedQuestions}
        chapterName={pyq.chapterName}
        resourceLabel="PYQ"
        onExit={() => setMode("normal")}
      />
    );
  }

  const timedToggle = (
    <button
      type="button"
      onClick={() => setMode("timed")}
      className="shrink-0 text-xs font-semibold text-white bg-navy hover:bg-navy-light transition-colors rounded-md px-3 py-1.5 focus-visible:outline-2 focus-visible:outline-gold"
    >
      Start Timed Practice
    </button>
  );

  if (examFilter) {
    const filtered = pyq.questions
      .map((q, idx) => ({ q, idx }))
      .filter(({ q }) => matchesFilter(q, examFilter));

    return (
      <div>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <p className="text-sm text-slate">
            {filtered.length} {FILTER_LABEL[examFilter]} PYQ
            {filtered.length === 1 ? "" : "s"} on {pyq.chapterName}, rewritten
            here in original wording with the same tested concept.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setExamFilter(null)}
              className="text-xs font-semibold text-gold-deep hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
            >
              View all exams
            </button>
            {timedToggle}
          </div>
        </div>
        {filtered.length > 0 ? (
          <div className="space-y-5">
            {filtered.map(({ q, idx }) => (
              <QuestionCard
                key={`${q.exam}-${idx}`}
                q={q}
                idx={idx}
                {...cardProps}
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
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <p className="text-sm text-slate">
            {pyq.questions.length} real questions previously asked in
            NEET/AIPMT exams on {pyq.chapterName}, rewritten here in original
            wording with the same tested concept.
          </p>
          {timedToggle}
        </div>
        <div className="space-y-5">
          {pyq.questions.map((q, idx) => (
            <QuestionCard
              key={`${q.exam}-${idx}`}
              q={q}
              idx={idx}
              {...cardProps}
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
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <p className="text-sm text-slate">
          {pyq.questions.length} previous year questions on {pyq.chapterName},
          rewritten here in original wording with the same tested concept —
          grouped by exam.
        </p>
        {timedToggle}
      </div>

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
                  {...cardProps}
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
                  {...cardProps}
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
                  {...cardProps}
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
