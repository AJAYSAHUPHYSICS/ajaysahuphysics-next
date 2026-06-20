import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppButton from "@/components/WhatsAppButton";
import Tabs, { type TabDef } from "@/components/Tabs";
import ComingSoonTab from "@/components/ComingSoonTab";
import NotesDisplay from "@/components/NotesDisplay";
import ShortNotesDisplay from "@/components/ShortNotesDisplay";
import DppDisplay from "@/components/DppDisplay";
import PyqDisplay from "@/components/PyqDisplay";
import type { Chapter } from "@/lib/chapters";
import { getAdjacentChapters } from "@/lib/chapters";
import { getChapterOverview } from "@/lib/chapter-overviews";
import { getChapterNotes } from "@/lib/notes";
import { getChapterShortNotes } from "@/lib/notes/short-index";
import { getChapterDpp } from "@/lib/dpp";
import { getChapterPyq } from "@/lib/pyq";

export default function ChapterDetailPage({
  chapter,
  className,
}: {
  chapter: Chapter;
  className: "11" | "12";
}) {
  const classHref = className === "11" ? "/class-11" : "/class-12";
  const classLabel = `Class ${className}`;
  const { prev, next } = getAdjacentChapters(className, chapter.slug);
  const overview = getChapterOverview(chapter.slug);

  const resourceTabs: { key: string; label: string }[] = [
    { key: "notes", label: "Notes" },
    { key: "short-notes", label: "Short Notes" },
    { key: "formula-sheet", label: "Formula Sheet" },
    { key: "dpp", label: "DPP" },
    { key: "pyq", label: "PYQ" },
    { key: "videos", label: "Videos" },
  ];

  const chapterNotes = getChapterNotes(chapter.slug);
  const chapterShortNotes = getChapterShortNotes(chapter.slug);
  const chapterDpp = getChapterDpp(chapter.slug);
  const chapterPyq = getChapterPyq(chapter.slug);

  const tabs: TabDef[] = [
    {
      key: "overview",
      label: "Overview",
      content: (
        <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
          <h3 className="font-display text-xl text-navy mb-3">
            About this chapter
          </h3>
          <p className="text-slate leading-relaxed">{overview}</p>
        </div>
      ),
    },
    ...resourceTabs.map((t) => {
      if (t.key === "notes" && chapterNotes) {
        return {
          key: t.key,
          label: t.label,
          content: (
            <div>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <p className="text-sm text-slate">
                  Typed notes for {chapter.name}.
                </p>
                <a
                  href={`/notes-pdf/class-${className}/${chapter.slug}.pdf`}
                  download
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep hover:text-navy transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                  </svg>
                  Download PDF
                </a>
              </div>
              <NotesDisplay notes={chapterNotes} />
            </div>
          ),
        };
      }
      if (t.key === "short-notes" && chapterShortNotes) {
        return {
          key: t.key,
          label: t.label,
          content: <ShortNotesDisplay notes={chapterShortNotes} />,
        };
      }
      if (t.key === "dpp" && chapterDpp) {
        return {
          key: t.key,
          label: t.label,
          content: <DppDisplay dpp={chapterDpp} />,
        };
      }
      if (t.key === "pyq" && chapterPyq) {
        return {
          key: t.key,
          label: t.label,
          content: <PyqDisplay pyq={chapterPyq} />,
        };
      }
      return {
        key: t.key,
        label: t.label,
        content: (
          <ComingSoonTab
            resourceLabel={t.label}
            chapterName={chapter.name}
            classLabel={classLabel}
          />
        ),
      };
    }),
  ];

  return (
    <div>
      <section className="physics-grid bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: classLabel, href: classHref },
              { label: chapter.name },
            ]}
          />
          <p className="mt-6 text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            {classLabel} &middot; Chapter {chapter.number}
          </p>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl">
            {chapter.name}
          </h1>
          <p className="mt-5 text-white/70 max-w-2xl text-base sm:text-lg leading-relaxed">
            Overview, notes, short notes, formula sheet, daily practice
            problems, previous year questions, and videos for this chapter —
            all in one place.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Tabs tabs={tabs} defaultKey="overview" />

          <div className="mt-12 rounded-lg bg-navy text-white p-8 sm:p-10 physics-grid text-center">
            <h3 className="font-display text-2xl">
              Stuck on a concept in {chapter.name}?
            </h3>
            <p className="mt-2 text-white/70 max-w-md mx-auto">
              Message Ajay Sir directly on WhatsApp for doubt support on this
              chapter.
            </p>
            <div className="mt-6 flex justify-center">
              <WhatsAppButton
                message={`Hi Ajay Sir, I have a doubt in ${classLabel} - ${chapter.name}.`}
              >
                Ask a doubt
              </WhatsAppButton>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/class-${className}/${prev.slug}`}
                className="group flex flex-col rounded-lg border border-navy/10 bg-white p-5 hover:border-gold hover:shadow-lg transition-all"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate/60 flex items-center gap-1">
                  <span aria-hidden="true">&larr;</span> Previous chapter
                </span>
                <span className="mt-2 font-display text-lg text-navy group-hover:text-gold-deep transition-colors">
                  {prev.number}. {prev.name}
                </span>
              </Link>
            ) : (
              <div className="rounded-lg border border-dashed border-navy/10 p-5 flex flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate/40">
                  This is the first chapter
                </span>
              </div>
            )}

            {next ? (
              <Link
                href={`/class-${className}/${next.slug}`}
                className="group flex flex-col rounded-lg border border-navy/10 bg-white p-5 text-right hover:border-gold hover:shadow-lg transition-all"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate/60 flex items-center justify-end gap-1">
                  Next chapter <span aria-hidden="true">&rarr;</span>
                </span>
                <span className="mt-2 font-display text-lg text-navy group-hover:text-gold-deep transition-colors">
                  {next.number}. {next.name}
                </span>
              </Link>
            ) : (
              <div className="rounded-lg border border-dashed border-navy/10 p-5 flex flex-col justify-center text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate/40">
                  This is the last chapter
                </span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link
              href={classHref}
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold-deep transition-colors"
            >
              <span aria-hidden="true">&larr;</span> Back to {classLabel}{" "}
              chapters
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
