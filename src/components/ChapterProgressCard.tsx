"use client";

import BookmarkButton from "./BookmarkButton";
import ChapterChecklist from "./ChapterChecklist";
import RevisionTracker from "./RevisionTracker";
import type { ChecklistItemKey } from "@/lib/checklist";

/**
 * Bundles the three M9 per-chapter progress widgets (bookmark, study
 * checklist, revision tracker) into a single card, mirroring how
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
  return (
    <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
      <div className="flex items-start justify-between gap-4 mb-5">
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
