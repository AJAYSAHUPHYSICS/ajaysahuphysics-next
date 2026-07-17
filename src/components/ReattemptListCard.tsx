"use client";

import Link from "next/link";
import { setMistakeResolved, type Mistake } from "@/lib/mistakes";
import { formatRelativeTime } from "@/lib/format-relative-time";
import EmptyState from "./EmptyState";

const DIFFICULTY_LABEL: Record<string, string> = { easy: "Easy", medium: "Medium", hard: "Hard" };

/** Receives an already-built reattempt list (getReattemptList()) —
 * only the resolve button needs client interactivity. */
export default function ReattemptListCard({ items }: { items: Mistake[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon="check"
        title="Nothing to practice again"
        description="Every logged mistake is resolved right now. New mistakes you log will show up here, oldest and hardest first."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((m) => (
        <li key={m.id} className="flex items-center justify-between gap-3 rounded-md border border-navy/10 px-4 py-3">
          <Link
            href={`/class-${m.cls}/${m.slug}/${m.resourceType}`}
            className="min-w-0 text-sm text-navy hover:text-gold-deep transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
          >
            <span className="block font-semibold truncate">{m.conceptTag}</span>
            <span className="block text-xs text-slate/60 mt-0.5">
              {m.chapterName} &middot; {m.resourceType.toUpperCase()} &middot;{" "}
              {DIFFICULTY_LABEL[m.difficulty]} &middot; logged {formatRelativeTime(m.createdAt)}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMistakeResolved(m.id, true)}
            className="shrink-0 text-xs font-semibold rounded-full px-3 py-1.5 border border-navy/15 text-navy/60 hover:border-gold hover:text-gold-deep transition-colors focus-visible:outline-2 focus-visible:outline-gold"
          >
            Mark resolved
          </button>
        </li>
      ))}
    </ul>
  );
}
