import type { StudyStatus } from "@/lib/chapter-progress";

const STYLES: Record<StudyStatus, string> = {
  "not-started": "bg-navy/5 text-slate/70 border-navy/10",
  "in-progress": "bg-gold/10 text-gold-deep border-gold/30",
  completed: "bg-navy/10 text-navy border-navy/20",
  mastered: "bg-green-50 text-green-700 border-green-200",
};

const LABELS: Record<StudyStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
  mastered: "Mastered",
};

/** Plain presentational badge — no "use client" needed, safe from server or client. */
export default function StudyStatusBadge({ status }: { status: StudyStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${STYLES[status]}`}
    >
      {status === "mastered" && <span aria-hidden="true">&#9733;</span>}
      {LABELS[status]}
    </span>
  );
}
