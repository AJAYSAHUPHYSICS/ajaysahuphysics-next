import type { ChapterShortNotes } from "@/lib/notes/kinematics-short";

export default function ShortNotesDisplay({
  notes,
}: {
  notes: ChapterShortNotes;
}) {
  return (
    <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
      <p className="text-sm text-slate mb-7">
        Condensed revision points for {notes.chapterName} — for quick
        recall before exams, not a substitute for the full notes.
      </p>
      <div className="space-y-6">
        {notes.groups.map((group) => (
          <div key={group.heading}>
            <h3 className="font-display text-base text-navy mb-2.5 pb-1.5 border-b border-gold/30">
              {group.heading}
            </h3>
            <ul className="space-y-1.5">
              {group.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span className="text-slate leading-snug font-mono text-[13.5px]">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
