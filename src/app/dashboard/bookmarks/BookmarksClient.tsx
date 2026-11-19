"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { getBookmarks, subscribeToBookmarks, toggleBookmark, type Bookmark, type BookmarkType } from "@/lib/bookmarks";
import { filterBookmarks, type BookmarkFilter } from "@/lib/study-tools";
import { isAvailableStudyPath } from "@/lib/content-policy/resource-links";
import { studyButton, studyCard, studySelect } from "@/components/study/StudyNav";

const EMPTY: Bookmark[] = [];
const TYPES: { key: BookmarkType | "all"; label: string }[] = [
  { key: "all", label: "All types" }, { key: "chapter", label: "Chapters" }, { key: "notes", label: "Notes" }, { key: "short-notes", label: "Short notes" },
  { key: "formula-sheet", label: "Formula sheets" }, { key: "dpp", label: "DPP" }, { key: "jee-notes", label: "JEE notes" }, { key: "jee-dpp", label: "JEE DPP" }, { key: "pyq", label: "PYQ" },
];

const isChapterPath = (p: string) => /^\/class-1[12]\/[a-z0-9-]+\/?$/.test(p);

export default function BookmarksClient() {
  const all = useSyncExternalStore(subscribeToBookmarks, getBookmarks, () => EMPTY);
  const [f, setF] = useState<BookmarkFilter>({ cls: "all", type: "all", query: "", sort: "newest" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const shown = useMemo(() => filterBookmarks(all, f), [all, f]);

  const remove = (b: Bookmark) => toggleBookmark({ cls: b.cls, slug: b.slug, type: b.type, chapterName: b.chapterName, label: b.label, path: b.path });
  function removeSelected() {
    for (const b of all) if (selected.has(b.id)) remove(b);
    setSelected(new Set());
  }

  if (all.length === 0) {
    return (
      <div className={studyCard}>
        <h2 className="font-display text-xl text-navy">No bookmarks yet</h2>
        <p className="mt-2 text-slate">Use the bookmark button on any chapter page to save it here. Bookmarks stay in this browser.</p>
        <Link href="/class-11" className="mt-4 inline-flex rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-light focus-visible:outline-2 focus-visible:outline-gold">Browse Class 11 chapters</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className={`${studyCard} grid gap-3 sm:grid-cols-4`}>
        <label className="text-sm text-slate sm:col-span-2">Search<input type="search" value={f.query} onChange={(e) => setF({ ...f, query: e.target.value })} placeholder="Chapter or resource" className={`mt-1 w-full ${studySelect}`} /></label>
        <label className="text-sm text-slate">Class<select value={f.cls} onChange={(e) => setF({ ...f, cls: e.target.value as BookmarkFilter["cls"] })} className={`mt-1 w-full ${studySelect}`}><option value="all">Both</option><option value="11">Class 11</option><option value="12">Class 12</option></select></label>
        <label className="text-sm text-slate">Sort<select value={f.sort} onChange={(e) => setF({ ...f, sort: e.target.value as BookmarkFilter["sort"] })} className={`mt-1 w-full ${studySelect}`}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="chapter">By chapter</option></select></label>
        <label className="text-sm text-slate sm:col-span-2">Type<select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value as BookmarkFilter["type"] })} className={`mt-1 w-full ${studySelect}`}>{TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}</select></label>
        <div className="flex items-end gap-2 sm:col-span-2">
          <button type="button" className={studyButton} disabled={selected.size === 0} onClick={removeSelected}>Remove selected ({selected.size})</button>
          <button type="button" className={studyButton} onClick={() => setSelected(new Set(shown.map((b) => b.id)))}>Select shown</button>
        </div>
      </div>

      <p className="text-sm text-slate" aria-live="polite">{shown.length} of {all.length} bookmarks</p>
      <ul className="space-y-2">
        {shown.map((b) => {
          const linkable = isChapterPath(b.path) || isAvailableStudyPath(b.path);
          return (
            <li key={b.id} className={`${studyCard} flex flex-wrap items-center gap-3`}>
              <input type="checkbox" aria-label={`Select ${b.chapterName} ${b.label}`} checked={selected.has(b.id)} onChange={(e) => { const s = new Set(selected); if (e.target.checked) s.add(b.id); else s.delete(b.id); setSelected(s); }} />
              <div className="min-w-0 flex-1">
                {linkable ? <Link href={b.path} className="font-semibold text-navy hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-gold rounded">{b.chapterName} · {b.label}</Link> : <span className="font-semibold text-navy">{b.chapterName} · {b.label}</span>}
                <p className="text-xs text-slate">Class {b.cls} · saved {new Date(b.bookmarkedAt).toLocaleDateString()}{linkable ? "" : " · this resource is being rebuilt"}</p>
              </div>
              <button type="button" className={studyButton} onClick={() => remove(b)}>Remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
