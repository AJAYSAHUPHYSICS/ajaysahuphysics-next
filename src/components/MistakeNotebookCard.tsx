"use client";

import Link from "next/link";
import { setMistakeResolved, type Mistake } from "@/lib/mistakes";
import EmptyState from "./EmptyState";

/** Receives the already-read mistakes list as a prop — DashboardClient
 * reads it once via useSyncExternalStore and shares it with this,
 * ChapterAccuracyList, ConceptAnalysisCard, and ReattemptListCard,
 * rather than each subscribing to localStorage separately. Re-renders
 * automatically when setMistakeResolved() below notifies that shared
 * subscription. */
export default function MistakeNotebookCard({ mistakes }: { mistakes: Mistake[] }) {
  if (mistakes.length === 0) {
    return (
      <EmptyState
        icon="revision"
        title="No mistakes logged yet"
        description="Got a DPP or PYQ question wrong? Add it to your Mistake Notebook from the answer reveal — this is where you'll track and revisit them."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  const unresolved = mistakes.filter((m) => m.resolvedAt === null);
  const resolved = mistakes.filter((m) => m.resolvedAt !== null);

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Stat value={mistakes.length} label="Total mistakes" />
        <Stat value={unresolved.length} label="Unresolved" />
        <Stat value={resolved.length} label="Resolved" />
      </div>

      <h4 className="font-semibold text-navy text-sm mb-2.5">Latest mistakes</h4>
      <ul className="space-y-2">
        {mistakes.slice(0, 5).map((m) => (
          <li key={m.id} className="flex items-center justify-between gap-3 rounded-md border border-navy/10 px-4 py-3">
            <Link
              href={`/class-${m.cls}/${m.slug}`}
              className="min-w-0 text-sm text-navy hover:text-gold-deep transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
            >
              <span className="block font-semibold truncate">{m.conceptTag}</span>
              <span className="block text-xs text-slate/60 mt-0.5">
                {m.chapterName} &middot; {m.resourceType.toUpperCase()}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMistakeResolved(m.id, m.resolvedAt === null)}
              aria-pressed={m.resolvedAt !== null}
              className={`shrink-0 text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                m.resolvedAt
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-navy/15 text-navy/60 hover:border-gold hover:text-gold-deep"
              }`}
            >
              {m.resolvedAt ? "Resolved" : "Mark resolved"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-3xl font-display text-navy">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate/60 mt-1">{label}</p>
    </div>
  );
}
