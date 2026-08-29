"use client";

// Presentational only — the parent (TimedPracticeSession) owns the actual
// countdown interval. Keeping this component "dumb" means there is exactly
// one place a leaking interval could ever occur (the parent), not two.

export default function PracticeTimer({
  secondsLeft,
  totalSeconds,
}: {
  secondsLeft: number;
  totalSeconds: number;
}) {
  const pct = Math.max(0, Math.min(100, (secondsLeft / totalSeconds) * 100));
  const isLow = secondsLeft <= 10;

  // Screen readers get a throttled announcement (every 10s, plus the final
  // 5s countdown) instead of a live region firing every single second,
  // which would otherwise be unusable noise for assistive tech.
  const announce = secondsLeft <= 5 || secondsLeft % 10 === 0;

  return (
    <div role="timer" aria-label="Time remaining for this question">
      <div className="flex items-center justify-between text-xs font-semibold mb-1">
        <span className={isLow ? "text-red-600" : "text-slate"}>
          Time left
        </span>
        <span className={isLow ? "text-red-600" : "text-navy"}>
          {secondsLeft}s
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-navy/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${
            isLow ? "bg-red-500" : "bg-gold"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="sr-only" aria-live="polite">
        {announce ? `${secondsLeft} seconds remaining` : ""}
      </span>
    </div>
  );
}
