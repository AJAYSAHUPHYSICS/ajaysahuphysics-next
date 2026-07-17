"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProgressBar from "./ProgressBar";
import { computeChapterProgress, progressStatus } from "@/lib/chapter-progress";
import { makeBookmarkId } from "@/lib/bookmarks";
import type { ChapterMeta } from "@/lib/chapter-meta";
import type { ChapterChecklistState } from "@/lib/checklist";
import type { RevisionEntry } from "@/lib/revision";

type SortKey = "number" | "name" | "completion";
type FilterKey = "all" | "11" | "12" | "not-started" | "in-progress" | "complete";

const FILTER_OPTIONS: { value: FilterKey; label: string }[] = [
  { value: "all", label: "All chapters" },
  { value: "11", label: "Class 11 only" },
  { value: "12", label: "Class 12 only" },
  { value: "not-started", label: "Not started" },
  { value: "in-progress", label: "In progress" },
  { value: "complete", label: "Complete" },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "number", label: "Sort: Chapter order" },
  { value: "name", label: "Sort: Name (A-Z)" },
  { value: "completion", label: "Sort: Completion %" },
];

export default function ChapterList({
  chapters,
  checklists,
  revisionEntries,
  bookmarkedIds,
}: {
  chapters: ChapterMeta[];
  checklists: Record<string, ChapterChecklistState>;
  revisionEntries: Record<string, RevisionEntry[]>;
  bookmarkedIds: Set<string>;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("number");
  const [filter, setFilter] = useState<FilterKey>("all");

  const rows = useMemo(() => {
    const computed = chapters.map((ch) => {
      const key = `${ch.cls}:${ch.slug}`;
      const state = checklists[key] ?? {};
      const rounds = revisionEntries[key]?.length ?? 0;
      const progress = computeChapterProgress(ch.availableChecklist, state, rounds);
      const status = progressStatus(progress.percent);
      const bookmarked = bookmarkedIds.has(makeBookmarkId(ch.cls, ch.slug, "chapter"));
      return { ch, progress, status, bookmarked };
    });

    const filtered = computed.filter((row) => {
      if (filter === "all") return true;
      if (filter === "11" || filter === "12") return row.ch.cls === filter;
      return row.status === filter;
    });

    return [...filtered].sort((a, b) => {
      if (sortKey === "name") return a.ch.name.localeCompare(b.ch.name);
      if (sortKey === "completion") return b.progress.percent - a.progress.percent;
      if (a.ch.cls !== b.ch.cls) return a.ch.cls.localeCompare(b.ch.cls);
      return a.ch.number - b.ch.number;
    });
  }, [chapters, checklists, revisionEntries, bookmarkedIds, filter, sortKey]);

  return (
    <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="font-display text-xl text-navy">All chapters</h3>
        <div className="flex flex-wrap gap-2">
          <label className="sr-only" htmlFor="chapter-filter">
            Filter chapters
          </label>
          <select
            id="chapter-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterKey)}
            className="text-sm rounded-md border border-navy/15 bg-white px-3 py-2 text-navy focus-visible:outline-2 focus-visible:outline-gold"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="chapter-sort">
            Sort chapters
          </label>
          <select
            id="chapter-sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="text-sm rounded-md border border-navy/15 bg-white px-3 py-2 text-navy focus-visible:outline-2 focus-visible:outline-gold"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-slate">No chapters match this filter.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map(({ ch, progress, bookmarked }) => (
            <li key={`${ch.cls}-${ch.slug}`}>
              <Link
                href={`/class-${ch.cls}/${ch.slug}`}
                className="flex items-center gap-4 rounded-md border border-navy/10 px-4 py-3 hover:border-gold hover:bg-ivory transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-navy truncate">{ch.name}</span>
                    <span className="shrink-0 text-xs text-slate/50">Class {ch.cls}</span>
                    {bookmarked && (
                      <span aria-label="Bookmarked" title="Bookmarked" className="shrink-0 text-gold-deep">
                        &#9733;
                      </span>
                    )}
                  </div>
                  <ProgressBar percent={progress.percent} size="sm" label={`${ch.name} completion`} />
                </div>
                <span className="shrink-0 text-sm font-semibold text-navy w-12 text-right">
                  {progress.percent}%
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
