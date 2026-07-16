"use client";

import { useSyncExternalStore } from "react";
import {
  REVISION_ROUNDS,
  getCompletedRounds,
  setRevisionRound,
  subscribeToRevision,
} from "@/lib/revision";

const EMPTY: number[] = [];
const getServerSnapshot = () => EMPTY;

export default function RevisionTracker({ cls, slug }: { cls: "11" | "12"; slug: string }) {
  const completed = useSyncExternalStore(
    subscribeToRevision,
    () => getCompletedRounds(cls, slug),
    getServerSnapshot
  );

  return (
    <div className="flex flex-wrap gap-2">
      {REVISION_ROUNDS.map((round) => {
        const done = completed.includes(round);
        return (
          <button
            key={round}
            type="button"
            aria-pressed={done}
            onClick={() => setRevisionRound(cls, slug, round, !done)}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
              done
                ? "border-gold bg-gold/10 text-gold-deep"
                : "border-navy/15 text-navy/60 hover:border-gold hover:text-gold-deep"
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-flex items-center justify-center w-4 h-4 rounded-full border ${
                done ? "bg-gold-deep border-gold-deep text-white" : "border-navy/30"
              }`}
            >
              {done && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </span>
            Revision {round}
          </button>
        );
      })}
    </div>
  );
}
