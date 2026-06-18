import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Chapter } from "@/lib/chapters";

type ResourceLink = {
  label: string;
  desc: string;
  href: string;
};

function resourcesFor(chapter: Chapter): ResourceLink[] {
  return [
    {
      label: "Notes",
      desc: `Typed, chapter-wise notes for ${chapter.name}.`,
      href: "/notes",
    },
    {
      label: "Formula Sheet",
      desc: `Every derived result for ${chapter.name} in one place.`,
      href: "/formula-sheet",
    },
    {
      label: "DPP",
      desc: `Daily Practice Problems to build speed on ${chapter.name}.`,
      href: "/dpp",
    },
    {
      label: "PYQ",
      desc: `Previous Year Questions asked from ${chapter.name}.`,
      href: "/pyq",
    },
  ];
}

export default function ChapterDetailPage({
  chapter,
  className,
}: {
  chapter: Chapter;
  className: "11" | "12";
}) {
  const resources = resourcesFor(chapter);
  const classHref = className === "11" ? "/class-11" : "/class-12";

  return (
    <div>
      <section className="physics-grid bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: `Class ${className}`, href: classHref },
              { label: chapter.name },
            ]}
          />
          <p className="mt-6 text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Class {className} &middot; Chapter {chapter.number}
          </p>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl">
            {chapter.name}
          </h1>
          <p className="mt-5 text-white/70 max-w-2xl text-base sm:text-lg leading-relaxed">
            Notes, formula sheet, daily practice problems, and previous year
            questions for this chapter — all in one place.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl text-navy mb-10">
            Resources for this chapter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {resources.map((r) => (
              <Link
                key={r.label}
                href={r.href}
                className="group bg-white rounded-lg border border-navy/10 p-6 hover:border-gold hover:shadow-lg transition-all"
              >
                <h3 className="font-display text-xl text-navy group-hover:text-gold-deep transition-colors">
                  {r.label}
                </h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">
                  {r.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep">
                  Open <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>

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
                message={`Hi Ajay Sir, I have a doubt in Class ${className} - ${chapter.name}.`}
              >
                Ask a doubt
              </WhatsAppButton>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={classHref}
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold-deep transition-colors"
            >
              <span aria-hidden="true">&larr;</span> Back to Class {className}{" "}
              chapters
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
