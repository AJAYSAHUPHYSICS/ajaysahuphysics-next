import Link from "next/link";
import { computeChapterProgress, studyStatus } from "@/lib/chapter-progress";
import { formatRelativeTime } from "@/lib/format-relative-time";
import type { ChapterMeta } from "@/lib/chapter-meta";
import type { ChapterChecklistState } from "@/lib/checklist";
import type { RevisionEntry } from "@/lib/revision";
import EmptyState from "./EmptyState";

/** Plain, no client JS — receives already-read checklist/revision data
 * from DashboardClient rather than subscribing to localStorage itself. */
export default function MasteredLibrary({
  chapters,
  checklists,
  revisionEntries,
}: {
  chapters: ChapterMeta[];
  checklists: Record<string, ChapterChecklistState>;
  revisionEntries: Record<string, RevisionEntry[]>;
}) {
  const mastered = chapters
    .filter((ch) => ch.availableChecklist.length > 0)
    .map((ch) => {
      const key = `${ch.cls}:${ch.slug}`;
      const state = checklists[key] ?? {};
      const entries = revisionEntries[key] ?? [];
      const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);
      const lastRevisedAt = entries.length > 0 ? Math.max(...entries.map((e) => e.completedAt)) : null;
      return { ch, progress, lastRevisedAt };
    })
    .filter((row) => studyStatus(row.progress) === "mastered")
    .sort((a, b) => (b.lastRevisedAt ?? 0) - (a.lastRevisedAt ?? 0));

  if (mastered.length === 0) {
    return (
      <EmptyState
        icon="trophy"
        title="No mastered chapters yet"
        description="A chapter is Mastered once every resource (Notes, Formula Sheet, DPP, PYQ) and all 3 revision rounds are complete. Keep going!"
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {mastered.map(({ ch, progress, lastRevisedAt }) => (
        <li key={`${ch.cls}-${ch.slug}`}>
          <Link
            href={`/class-${ch.cls}/${ch.slug}`}
            className="flex items-center justify-between gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 hover:border-green-400 transition-colors focus-visible:outline-2 focus-visible:outline-gold"
          >
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-navy truncate">{ch.name}</span>
              <span className="block text-xs text-slate/60 mt-0.5">
                {progress.percent}% &middot; {progress.completedRounds}/{progress.totalRounds} revisions
                {lastRevisedAt && ` · revised ${formatRelativeTime(lastRevisedAt)}`}
              </span>
            </span>
            <span className="shrink-0 text-xs font-semibold text-green-700">Open &rarr;</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
