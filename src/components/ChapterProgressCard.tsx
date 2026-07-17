"use client";

import { useSyncExternalStore } from "react";
import BookmarkButton from "./BookmarkButton";
import ChapterChecklist from "./ChapterChecklist";
import RevisionTracker from "./RevisionTracker";
import ProgressBar from "./ProgressBar";
import {
  getChapterChecklist,
  subscribeToChecklist,
  type ChapterChecklistState,
  type ChecklistItemKey,
} from "@/lib/checklist";
import { getRevisionEntries, subscribeToRevision } from "@/lib/revision";
import { isBookmarked, makeBookmarkId, subscribeToBookmarks } from "@/lib/bookmarks";
import { computeChapterProgress } from "@/lib/chapter-progress";

const EMPTY_CHECKLIST: ChapterChecklistState = {};
const getServerChecklist = () => EMPTY_CHECKLIST;
const EMPTY_REVISION: ReturnType<typeof getRevisionEntries> = [];
const getServerRevision = () => EMPTY_REVISION;
const getServerFalse = () => false;

/**
 * Bundles the M9 per-chapter progress widgets (bookmark, study
 * checklist, revision tracker) with the M10 completion score and
 * chapter statistics (Tasks 1 & 5) into a single card, mirroring how
 * ChapterContentSections bundles the M7 enrichment sections. Kept as
 * one client component so the chapter overview `page.tsx` files stay
 * server components with a single import.
 */
export default function ChapterProgressCard({
  cls,
  slug,
  chapterName,
  path,
  availableChecklist,
}: {
  cls: "11" | "12";
  slug: string;
  chapterName: string;
  path: string;
  availableChecklist: ChecklistItemKey[];
}) {
  const checklistState = useSyncExternalStore(
    subscribeToChecklist,
    () => getChapterChecklist(cls, slug),
    getServerChecklist
  );
  const revisionEntries = useSyncExternalStore(
    subscribeToRevision,
    () => getRevisionEntries(cls, slug),
    getServerRevision
  );
  const bookmarked = useSyncExternalStore(
    subscribeToBookmarks,
    () => isBookmarked(makeBookmarkId(cls, slug, "chapter")),
    getServerFalse
  );

  const progress = computeChapterProgress(availableChecklist, checklistState, revisionEntries.length);

  return (
    <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="font-display text-xl text-navy">Track your progress</h3>
        <BookmarkButton
          cls={cls}
          slug={slug}
          type="chapter"
          chapterName={chapterName}
          label={chapterName}
          path={path}
        />
      </div>

      {/* Task 1 — completion score, shown visually */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-sm font-semibold text-navy">{progress.percent}% complete</span>
          {progress.percent >= 100 && (
            <span className="text-xs font-semibold text-green-700">Fully revised &check;</span>
          )}
        </div>
        <ProgressBar percent={progress.percent} label={`${chapterName} completion`} />
      </div>

      {/* Task 5 — chapter statistics */}
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-navy/10">
        <StatItem term="Resources" value={`${progress.completedResources}/${progress.totalResources}`} />
        <StatItem term="Revisions" value={`${progress.completedRounds}/${progress.totalRounds}`} />
        <StatItem term="Bookmarked" value={bookmarked ? "Yes" : "No"} />
        <StatItem term="Status" value={progress.percent >= 100 ? "Complete" : progress.percent > 0 ? "In progress" : "Not started"} />
      </dl>

      {availableChecklist.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-navy text-sm mb-2.5">Study checklist</h4>
          <ChapterChecklist cls={cls} slug={slug} available={availableChecklist} />
        </div>
      )}

      <div>
        <h4 className="font-semibold text-navy text-sm mb-2.5">Revision rounds</h4>
        <RevisionTracker cls={cls} slug={slug} />
      </div>
    </div>
  );
}

function StatItem({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate/60">{term}</dt>
      <dd className="text-sm font-semibold text-navy mt-0.5">{value}</dd>
    </div>
  );
}
