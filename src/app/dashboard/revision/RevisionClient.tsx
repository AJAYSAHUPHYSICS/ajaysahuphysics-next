"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { REVISION_ROUNDS, getAllRevisionEntries, setRevisionRound, subscribeToRevision } from "@/lib/revision";
import { allChapters } from "@/lib/chapters";
import { revisionOverview, type RevisionRow } from "@/lib/study-tools";
import { studyButton, studyCard, studySelect } from "@/components/study/StudyNav";
import { useClientNow } from "@/lib/use-client-now";

const EMPTY = {};
const BUCKET_LABEL: Record<RevisionRow["bucket"], string> = { overdue: "Overdue", "due-today": "Due today", "due-soon": "Due soon", "recently-revised": "Revised recently", "never-revised": "Not revised yet" };

function dueText(r: RevisionRow): string {
  if (r.due.daysUntilDue === null) return "Start with round 1";
  if (r.due.daysUntilDue < 0) return `${-r.due.daysUntilDue} day${r.due.daysUntilDue === -1 ? "" : "s"} overdue`;
  if (r.due.daysUntilDue === 0) return "Due today";
  return `Next in ${r.due.daysUntilDue} day${r.due.daysUntilDue === 1 ? "" : "s"}`;
}

export default function RevisionClient() {
  const entries = useSyncExternalStore(subscribeToRevision, getAllRevisionEntries, () => EMPTY);
  // null until hydration ends (M1). Until then the page shows what the server
  // prerendered: no saved entries, which doesn't depend on the date.
  const now = useClientNow();
  const [view, setView] = useState<"due" | "all" | "11" | "12">("due");
  const rows = useMemo(() => revisionOverview(now === null ? EMPTY : entries, allChapters.map((c) => ({ cls: c.cls, slug: c.slug, name: c.name })), now ?? 0), [entries, now]);
  const shown = rows.filter((r) => (view === "due" ? r.bucket === "overdue" || r.bucket === "due-today" || r.bucket === "due-soon" : view === "all" ? true : r.cls === view));
  const completed = rows.reduce((n, r) => n + r.rounds.length, 0);
  const history = rows.flatMap((r) => r.entries.filter((e) => e.completedAt > 0).map((e) => ({ ...e, name: r.name, cls: r.cls }))).sort((a, b) => b.completedAt - a.completedAt).slice(0, 15);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className={studyCard}><p className="text-xs uppercase tracking-wide text-slate">Rounds completed</p><p className="mt-1 font-display text-2xl text-navy">{completed} <span className="text-base text-slate">of {rows.length * 3}</span></p></div>
        <div className={studyCard}><p className="text-xs uppercase tracking-wide text-slate">Due or overdue</p><p className="mt-1 font-display text-2xl text-navy">{rows.filter((r) => r.bucket === "overdue" || r.bucket === "due-today").length}</p></div>
        <div className={studyCard}><p className="text-xs uppercase tracking-wide text-slate">Chapters started</p><p className="mt-1 font-display text-2xl text-navy">{rows.filter((r) => r.rounds.length > 0).length}</p></div>
      </div>
      <p className="text-sm text-slate">Schedule: after round 1, review again in 1 day; after round 2, in 7 days; after round 3, in 30 days.</p>
      <label className="block text-sm text-slate">Show
        <select value={view} onChange={(e) => setView(e.target.value as typeof view)} className={`ml-2 ${studySelect}`}><option value="due">Due soon or overdue</option><option value="all">All chapters</option><option value="11">Class 11</option><option value="12">Class 12</option></select>
      </label>
      {shown.length === 0 ? <div className={studyCard}><p className="text-slate">{view === "due" ? "Nothing is due. Mark a revision round on any chapter to start its schedule." : "No chapters."}</p></div> : null}
      <ul className="space-y-2">
        {shown.map((r) => (
          <li key={`${r.cls}:${r.slug}`} className={`${studyCard} flex flex-wrap items-center justify-between gap-3`}>
            <div>
              <Link href={`/class-${r.cls}/${r.slug}`} className="font-semibold text-navy hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-gold rounded">{r.name}</Link>
              <p className="text-xs text-slate">Class {r.cls} · {BUCKET_LABEL[r.bucket]} · {dueText(r)}</p>
            </div>
            <div className="flex gap-2" role="group" aria-label={`Revision rounds for ${r.name}`}>
              {REVISION_ROUNDS.map((round) => {
                const done = r.rounds.includes(round);
                return (
                  <button key={round} type="button" aria-pressed={done} className={`${studyButton} ${done ? "bg-navy text-white border-navy" : ""}`} onClick={() => setRevisionRound(r.cls, r.slug, round, !done)}>
                    Round {round}{done ? " ✓" : ""}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
      {history.length ? (
        <section className={studyCard} aria-labelledby="rev-history">
          <h2 id="rev-history" className="font-display text-lg text-navy">Recent revision history</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate">{history.map((h) => <li key={`${h.name}-${h.round}-${h.completedAt}`}>{new Date(h.completedAt).toLocaleDateString()}: {h.name} (Class {h.cls}), round {h.round}</li>)}</ul>
        </section>
      ) : null}
    </div>
  );
}
