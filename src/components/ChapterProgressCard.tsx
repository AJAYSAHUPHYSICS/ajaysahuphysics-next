"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import ChapterChecklist from "./ChapterChecklist";
import RevisionTracker from "./RevisionTracker";
import ProgressBar from "./ProgressBar";
import StudyStatusBadge from "./StudyStatusBadge";
import {
  getChapterChecklist,
  subscribeToChecklist,
  type ChapterChecklistState,
  type ChecklistItemKey,
} from "@/lib/checklist";
import { getRevisionEntries, subscribeToRevision } from "@/lib/revision";
import { isBookmarked, makeBookmarkId, subscribeToBookmarks } from "@/lib/bookmarks";
import { computeChapterProgress, studyStatus } from "@/lib/chapter-progress";
import { getNextStep } from "@/lib/next-step";

const EMPTY_CHECKLIST: ChapterChecklistState = {};
const getServerChecklist = () => EMPTY_CHECKLIST;
const EMPTY_REVISION: ReturnType<typeof getRevisionEntries> = [];
const getServerRevision = () => EMPTY_REVISION;
const getServerFalse = () => false;

const RESOURCE_URL_SEGMENT: Record<ChecklistItemKey, string> = {
  notes: "notes",
  formulaSheet: "formula-sheet",
  dpp: "dpp",
  pyq: "pyq",
};

const REVISION_ANCHOR_ID = "revision-rounds";

/**
 * Bundles the M9 per-chapter progress widgets (bookmark, study
 * checklist, revision tracker) with the M10 completion score and
 * chapter statistics, and the M11 study-status badge and Recommended
 * Next Step (Tasks 3 & 4), into a single card — one set of
 * checklist/revision/bookmark subscriptions shared by every section
 * here, rather than each feature re-reading localStorage on its own.
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

  const completedRounds = revisionEntries.map((e) => e.round);
  const progress = computeChapterProgress(availableChecklist, checklistState, completedRounds.length);
  const status = studyStatus(progress);
  const nextStep = getNextStep(availableChecklist, checklistState, completedRounds);

  return (
    <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-xl text-navy">Track your progress</h3>
          <StudyStatusBadge status={status} />
        </div>
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
          {status === "mastered" && (
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
        <StatItem term="Status" value={status === "mastered" ? "Mastered" : status === "completed" ? "Completed" : status === "in-progress" ? "In progress" : "Not started"} />
      </dl>

      {/* Task 3 — Recommended Next Step */}
      <div className="mb-6 rounded-md bg-ivory border border-navy/10 px-4 py-3.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate/60 mb-1.5">
          Recommended next step
        </p>
        {nextStep.kind === "mastered" ? (
          <p className="text-sm font-semibold text-green-700">
            {nextStep.justCompleted && `✓ ${nextStep.justCompleted} completed — `}Chapter Mastered
          </p>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-navy">
              {nextStep.justCompleted && (
                <span className="text-green-700 font-medium">✓ {nextStep.justCompleted} completed</span>
              )}
              {nextStep.justCompleted && " → "}
              <span className="font-semibold">{nextStep.label}</span>
            </p>
            {nextStep.kind === "resource" ? (
              <Link
                href={`${path}/${RESOURCE_URL_SEGMENT[nextStep.key]}`}
                className="text-sm font-semibold text-gold-deep hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
              >
                Continue &rarr;
              </Link>
            ) : (
              <a
                href={`#${REVISION_ANCHOR_ID}`}
                className="text-sm font-semibold text-gold-deep hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
              >
                Start revision &rarr;
              </a>
            )}
          </div>
        )}
      </div>

      {availableChecklist.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-navy text-sm mb-2.5">Study checklist</h4>
          <ChapterChecklist cls={cls} slug={slug} available={availableChecklist} />
        </div>
      )}

      <div id={REVISION_ANCHOR_ID} className="scroll-mt-24">
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
