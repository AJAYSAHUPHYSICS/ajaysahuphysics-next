"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { MISTAKE_CATEGORIES, getMistakes, setMistakeResolved, subscribeToMistakes, updateMistake, type Mistake, type MistakeCategory } from "@/lib/mistakes";
import { filterMistakes, mistakeSummary, questionKey, repeatedQuestions, type MistakeFilter } from "@/lib/study-tools";
import { studyButton, studyCard, studySelect } from "@/components/study/StudyNav";

const EMPTY: Mistake[] = [];
const categoryLabel = (c?: string) => MISTAKE_CATEGORIES.find((x) => x.key === c)?.label ?? "Uncategorised";

function MistakeRow({ m, repeats }: { m: Mistake; repeats: number }) {
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState(m.note);
  return (
    <li className={studyCard}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-navy">{m.conceptTag || "Mistake"} <span className="font-normal text-slate">· {m.chapterName} ({m.resourceType.toUpperCase()}{m.questionId ? ` · question ${/^[0-9]+$/.test(m.questionId) ? Number(m.questionId) + 1 : m.questionId}` : ""})</span></p>
          <p className="mt-0.5 text-xs text-slate">
            Logged {new Date(m.createdAt).toLocaleDateString()} · {m.difficulty}
            {m.resolvedAt ? ` · resolved ${new Date(m.resolvedAt).toLocaleDateString()}` : " · open"}
            {repeats > 1 ? <strong className="text-gold-deep"> · got wrong {repeats} times</strong> : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="sr-only" htmlFor={`cat-${m.id}`}>Category</label>
          <select id={`cat-${m.id}`} value={m.category ?? ""} onChange={(e) => updateMistake(m.id, { category: (e.target.value || null) as MistakeCategory | null })} className={studySelect}>
            <option value="">Uncategorised</option>
            {MISTAKE_CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          <button type="button" className={studyButton} onClick={() => setMistakeResolved(m.id, m.resolvedAt === null)}>{m.resolvedAt === null ? "Mark resolved" : "Reopen"}</button>
          <button type="button" className={studyButton} onClick={() => setEditing(!editing)} aria-expanded={editing}>{editing ? "Close" : "My explanation"}</button>
        </div>
      </div>
      {m.note && !editing ? <p className="mt-3 whitespace-pre-wrap text-sm text-navy/90">{m.note}</p> : null}
      {editing ? (
        <div className="mt-3">
          <label htmlFor={`note-${m.id}`} className="text-sm text-slate">What went wrong, in your own words</label>
          <textarea id={`note-${m.id}`} value={note} maxLength={2000} rows={3} onChange={(e) => setNote(e.target.value)} className={`mt-1 w-full ${studySelect}`} />
          <button type="button" className={`mt-2 ${studyButton}`} onClick={() => { updateMistake(m.id, { note }); setEditing(false); }}>Save</button>
        </div>
      ) : null}
    </li>
  );
}

export default function MistakesClient() {
  const all = useSyncExternalStore(subscribeToMistakes, getMistakes, () => EMPTY);
  const [f, setF] = useState<MistakeFilter>({ status: "open", cls: "all", slug: "all", category: "all", query: "" });
  const shown = useMemo(() => filterMistakes(all, f), [all, f]);
  const summary = useMemo(() => mistakeSummary(all), [all]);
  const repeats = useMemo(() => {
    const r = repeatedQuestions(all);
    return (m: Mistake) => r.get(questionKey(m) ?? "") ?? 0;
  }, [all]);
  const chapters = summary.chapters;

  if (all.length === 0) {
    return (
      <div className={studyCard}>
        <h2 className="font-display text-xl text-navy">No mistakes recorded</h2>
        <p className="mt-2 text-slate">When you get a practice question wrong, use “Add to mistakes” on that question. Practice questions are being rebuilt; your mistake notebook will fill up as new questions are published. Everything stays in this browser.</p>
        <Link href="/dashboard" className="mt-4 inline-flex rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-light focus-visible:outline-2 focus-visible:outline-gold">Back to my progress</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {[["Open", summary.open], ["Resolved", summary.resolved], ["Total", summary.total], ["Repeated questions", summary.repeatedQuestions]].map(([label, n]) => (
          <div key={label} className={studyCard}><p className="text-xs uppercase tracking-wide text-slate">{label}</p><p className="mt-1 font-display text-2xl text-navy">{n}</p></div>
        ))}
      </div>
      <div className={`${studyCard} grid gap-3 sm:grid-cols-5`}>
        <label className="text-sm text-slate sm:col-span-2">Search<input type="search" value={f.query} onChange={(e) => setF({ ...f, query: e.target.value })} placeholder="Concept, chapter or note" className={`mt-1 w-full ${studySelect}`} /></label>
        <label className="text-sm text-slate">Status<select value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as MistakeFilter["status"] })} className={`mt-1 w-full ${studySelect}`}><option value="open">Open</option><option value="resolved">Resolved</option><option value="all">All</option></select></label>
        <label className="text-sm text-slate">Chapter<select value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })} className={`mt-1 w-full ${studySelect}`}><option value="all">All chapters</option>{chapters.map((c) => <option key={`${c.cls}:${c.slug}`} value={c.slug}>{c.chapterName} (Class {c.cls})</option>)}</select></label>
        <label className="text-sm text-slate">Category<select value={f.category} onChange={(e) => setF({ ...f, category: e.target.value as MistakeFilter["category"] })} className={`mt-1 w-full ${studySelect}`}><option value="all">All</option><option value="none">Uncategorised</option>{MISTAKE_CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}</select></label>
      </div>
      {Object.keys(summary.byCategory).length > 1 || !summary.byCategory.none ? (
        <p className="text-sm text-slate">By category: {Object.entries(summary.byCategory).map(([k, n]) => `${categoryLabel(k === "none" ? undefined : k)} ${n}`).join(" · ")}</p>
      ) : null}
      <p className="text-sm text-slate" aria-live="polite">{shown.length} shown</p>
      <ul className="space-y-2">{shown.map((m) => <MistakeRow key={m.id} m={m} repeats={repeats(m)} />)}</ul>
    </div>
  );
}
