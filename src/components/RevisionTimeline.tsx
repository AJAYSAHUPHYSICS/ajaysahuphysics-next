import Link from "next/link";
import { getRevisionDueInfo, bucketForDueInfo, type RevisionBucket } from "@/lib/spaced-revision";
import { computeChapterProgress } from "@/lib/chapter-progress";
import type { ChapterMeta } from "@/lib/chapter-meta";
import type { ChapterChecklistState } from "@/lib/checklist";
import type { RevisionEntry } from "@/lib/revision";
import EmptyState from "./EmptyState";

type Row = { ch: ChapterMeta; bucket: RevisionBucket; daysUntilDue: number | null };

const BUCKET_ORDER: RevisionBucket[] = ["overdue", "due-today", "due-soon", "never-revised", "recently-revised"];
const BUCKET_LABEL: Record<RevisionBucket, string> = {
  overdue: "Overdue",
  "due-today": "Due Today",
  "due-soon": "Due Soon",
  "never-revised": "Never Revised",
  "recently-revised": "Recently Revised",
};
const BUCKET_STYLE: Record<RevisionBucket, string> = {
  overdue: "border-red-200 bg-red-50",
  "due-today": "border-gold/40 bg-gold/5",
  "due-soon": "border-navy/10 bg-white",
  "never-revised": "border-navy/10 bg-white",
  "recently-revised": "border-green-200 bg-green-50",
};

function dueDetail(row: Row): string {
  if (row.bucket === "never-revised") return "No revision rounds yet";
  if (row.daysUntilDue === null) return "";
  if (row.daysUntilDue < 0) return `${Math.abs(row.daysUntilDue)}d overdue`;
  if (row.daysUntilDue === 0) return "Due today";
  return `Due in ${row.daysUntilDue}d`;
}

/** Plain, no client JS needed — every input is already-read data passed
 * down from DashboardClient, this only groups and renders it. */
export default function RevisionTimeline({
  chapters,
  checklists,
  revisionEntries,
}: {
  chapters: ChapterMeta[];
  checklists: Record<string, ChapterChecklistState>;
  revisionEntries: Record<string, RevisionEntry[]>;
}) {
  const rows: Row[] = [];

  for (const ch of chapters) {
    if (ch.availableChecklist.length === 0) continue; // nothing to revise yet
    const key = `${ch.cls}:${ch.slug}`;
    const state = checklists[key] ?? {};
    const entries = revisionEntries[key] ?? [];
    const progress = computeChapterProgress(ch.availableChecklist, state, entries.length);
    if (progress.completedResources === 0 && progress.completedRounds === 0) continue; // not started

    const info = getRevisionDueInfo(entries);
    rows.push({ ch, bucket: bucketForDueInfo(info), daysUntilDue: info.daysUntilDue });
  }

  const grouped = BUCKET_ORDER.map((bucket) => ({
    bucket,
    rows: rows.filter((r) => r.bucket === bucket),
  })).filter((g) => g.rows.length > 0);

  if (grouped.length === 0) {
    return (
      <EmptyState
        icon="revision"
        title="Your revision timeline is empty"
        description="Complete a chapter's resources and mark a revision round — this timeline will group your chapters by when they're next due."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {grouped.map(({ bucket, rows: bucketRows }) => (
        <div key={bucket} className={`rounded-md border p-4 ${BUCKET_STYLE[bucket]}`}>
          <h4 className="font-semibold text-navy text-sm mb-2.5">
            {BUCKET_LABEL[bucket]} <span className="text-slate/50 font-normal">({bucketRows.length})</span>
          </h4>
          <ul className="space-y-1.5">
            {bucketRows.slice(0, 6).map((row) => (
              <li key={`${row.ch.cls}-${row.ch.slug}`}>
                <Link
                  href={`/class-${row.ch.cls}/${row.ch.slug}`}
                  className="flex items-center justify-between gap-2 text-sm text-navy hover:text-gold-deep transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
                >
                  <span className="truncate">{row.ch.name}</span>
                  <span className="shrink-0 text-xs text-slate/50">{dueDetail(row)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
