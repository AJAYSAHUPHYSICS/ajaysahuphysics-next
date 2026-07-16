import type { ChapterNotes } from "@/lib/notes/kinematics";
import { slugify } from "@/lib/slugify";
import { estimateReadingMinutes } from "@/lib/reading-time";
import ReadingTimeBadge from "./ReadingTimeBadge";
import TableOfContents from "./TableOfContents";

export default function NotesDisplay({ notes }: { notes: ChapterNotes }) {
  const minutes = estimateReadingMinutes(
    notes.intro,
    notes.sections.map((s) => s.body ?? ""),
    notes.sections.flatMap((s) => s.bullets ?? [])
  );
  const tocItems = notes.sections.map((s) => ({
    id: slugify(s.heading),
    label: s.heading,
  }));

  return (
    <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
      <div className="mb-4">
        <ReadingTimeBadge minutes={minutes} />
      </div>

      <p className="text-slate leading-relaxed mb-6 text-[15px]">
        {notes.intro}
      </p>

      <TableOfContents items={tocItems} />

      <div className="space-y-8">
        {notes.sections.map((section) => (
          <div key={section.heading} id={slugify(section.heading)} className="scroll-mt-24">
            <h3 className="font-display text-lg text-navy mb-2.5">
              {section.heading}
            </h3>
            {section.body && (
              <p className="text-slate leading-relaxed text-[15px] mb-3">
                {section.body}
              </p>
            )}
            {section.formula && (
              <div className="bg-ivory border border-gold/30 rounded-md p-4 mb-3 space-y-1.5">
                {section.formula.map((f) => (
                  <div
                    key={f.expression}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-gold-deep shrink-0">
                      {f.label}
                    </span>
                    <span className="font-mono text-navy text-[15px]">
                      {f.expression}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {section.bullets && (
              <ul className="space-y-2">
                {section.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[15px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="text-slate leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
