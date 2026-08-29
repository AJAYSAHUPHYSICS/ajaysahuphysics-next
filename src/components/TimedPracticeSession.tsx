"use client";

import { useEffect, useRef, useState } from "react";
import PracticeTimer from "./PracticeTimer";

// Kept intentionally minimal so both PyqDisplay (PyqQuestion) and
// DppDisplay (DppQuestion) can map their existing question shape into this
// one shared type — no separate question database, per M19 scope.
export type TimedQuestion = {
  key: string;
  tag?: string;
  question: string;
  options: string[];
  correctIndex: number;
  solution: string;
};

const SECONDS_PER_QUESTION = 45;

type Answer = { selectedIndex: number | null; correct: boolean };

function formatElapsed(ms: number) {
  const totalSeconds = Math.round(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function TimedPracticeSession({
  questions,
  chapterName,
  resourceLabel,
  onExit,
}: {
  questions: TimedQuestion[];
  chapterName: string;
  resourceLabel: string;
  onExit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const [finished, setFinished] = useState(false);
  const startedAtRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);

  const current = questions[index];
  const revealed = answers[index] !== undefined;

  // Set once on mount rather than as a useRef initial value, since calling
  // Date.now() directly during render is an impure operation.
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  // Single interval owned here. Cleared on every dependency change and on
  // unmount, so navigating away or restarting mid-question can never leave
  // a stray timer running in the background.
  useEffect(() => {
    if (finished || revealed || !current) return;
    if (secondsLeft <= 0) {
      // Deferred via setTimeout so this isn't a synchronous setState call
      // inside the effect body itself.
      const id = setTimeout(() => {
        setAnswers((prev) => {
          const next = [...prev];
          next[index] = { selectedIndex: null, correct: false };
          return next;
        });
      }, 0);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft, revealed, finished, current, index]);

  function selectOption(optIndex: number) {
    if (revealed || !current) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = { selectedIndex: optIndex, correct: optIndex === current.correctIndex };
      return next;
    });
  }

  function goNext() {
    if (index + 1 >= questions.length) {
      setElapsedMs(Date.now() - (startedAtRef.current ?? Date.now()));
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSecondsLeft(SECONDS_PER_QUESTION);
  }

  function restart() {
    setIndex(0);
    setAnswers([]);
    setSecondsLeft(SECONDS_PER_QUESTION);
    setFinished(false);
    startedAtRef.current = Date.now();
    setElapsedMs(0);
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-navy/15 bg-white p-8 text-center">
        <p className="text-slate text-sm">
          No questions available for a timed session yet.
        </p>
        <button
          type="button"
          onClick={onExit}
          className="mt-3 text-xs font-semibold text-gold-deep hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
        >
          Back to normal practice
        </button>
      </div>
    );
  }

  if (finished) {
    const correctCount = answers.filter((a) => a.correct).length;
    const unansweredCount = answers.filter((a) => a.selectedIndex === null).length;
    const incorrectCount = questions.length - correctCount - unansweredCount;
    const accuracy = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="rounded-lg border border-navy/10 bg-white p-6 sm:p-8">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-gold-deep bg-gold/10 rounded-full px-2.5 py-0.5 mb-3">
          Session complete
        </span>
        <h3 className="font-display text-2xl text-navy">
          {correctCount} / {questions.length} correct
        </h3>
        <p className="text-sm text-slate mt-1">
          Timed practice on {chapterName} ({resourceLabel})
        </p>

        <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <dt className="text-xs text-slate uppercase tracking-wide">Correct</dt>
            <dd className="text-lg font-semibold text-green-700">{correctCount}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate uppercase tracking-wide">Incorrect</dt>
            <dd className="text-lg font-semibold text-red-600">{incorrectCount}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate uppercase tracking-wide">Unanswered</dt>
            <dd className="text-lg font-semibold text-navy">{unansweredCount}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate uppercase tracking-wide">Accuracy</dt>
            <dd className="text-lg font-semibold text-navy">{accuracy}%</dd>
          </div>
        </dl>

        <p className="text-xs text-slate mt-4">
          Questions attempted: {questions.length - unansweredCount} / {questions.length} · Time taken: {formatElapsed(elapsedMs)}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={restart}
            className="text-sm font-semibold text-white bg-navy hover:bg-navy-light transition-colors rounded-md px-4 py-2 focus-visible:outline-2 focus-visible:outline-gold"
          >
            Restart timed practice
          </button>
          <button
            type="button"
            onClick={onExit}
            className="text-sm font-semibold text-gold-deep hover:text-navy transition-colors rounded-md px-4 py-2 border border-navy/15 focus-visible:outline-2 focus-visible:outline-gold"
          >
            Back to normal practice
          </button>
        </div>
      </div>
    );
  }

  const answer = answers[index];

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <p className="text-sm text-slate">
          Question {index + 1} of {questions.length}
        </p>
        <p className="text-sm font-semibold text-navy">
          Score: {answers.filter((a) => a.correct).length}
        </p>
      </div>

      <div className="mb-4">
        <PracticeTimer secondsLeft={Math.max(0, secondsLeft)} totalSeconds={SECONDS_PER_QUESTION} />
      </div>

      <div className="rounded-lg border border-navy/10 bg-white p-5 sm:p-6">
        {current.tag ? (
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-gold-deep bg-gold/10 rounded-full px-2.5 py-0.5 mb-2.5">
            {current.tag}
          </span>
        ) : null}
        <p className="text-navy font-medium leading-relaxed">{current.question}</p>

        <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {current.options.map((opt, i) => {
            const isCorrect = i === current.correctIndex;
            const isChosen = answer?.selectedIndex === i;
            let style = "border-navy/15 text-slate hover:border-gold/60";
            let markerLabel = "";
            if (revealed && isCorrect) {
              style = "border-green-600 bg-green-50 text-green-800";
              markerLabel = " (Correct answer)";
            } else if (revealed && isChosen && !isCorrect) {
              style = "border-red-400 bg-red-50 text-red-700";
              markerLabel = " (Your answer, incorrect)";
            }
            return (
              <button
                key={opt}
                type="button"
                disabled={revealed}
                onClick={() => selectOption(i)}
                className={`text-left text-sm rounded-md border px-3 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:cursor-default ${style}`}
              >
                {opt}
                <span className="sr-only">{markerLabel}</span>
              </button>
            );
          })}
        </div>

        {revealed ? (
          <div className="mt-3.5">
            <p
              className={`text-sm font-semibold ${
                answer?.correct ? "text-green-700" : "text-red-600"
              }`}
            >
              {answer?.selectedIndex === null
                ? "Time's up — no answer selected."
                : answer?.correct
                  ? "Correct!"
                  : "Incorrect."}
            </p>
            <p className="text-sm text-slate leading-relaxed bg-ivory rounded-md p-3 border border-gold/20 mt-2">
              <span className="font-semibold text-gold-deep">Solution: </span>
              {current.solution}
            </p>
            <button
              type="button"
              onClick={goNext}
              className="mt-3 text-sm font-semibold text-white bg-navy hover:bg-navy-light transition-colors rounded-md px-4 py-2 focus-visible:outline-2 focus-visible:outline-gold"
            >
              {index + 1 >= questions.length ? "See results" : "Next question"}
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={onExit}
          className="text-xs font-semibold text-slate hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
        >
          End session and return to normal practice
        </button>
      </div>
    </div>
  );
}
