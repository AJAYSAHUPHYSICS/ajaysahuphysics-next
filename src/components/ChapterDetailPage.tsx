"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Chapter } from "@/lib/chapters";
import { getAdjacentChapters } from "@/lib/chapters";

type ResourceCard = {
  label: string;
  desc: string;
};

function resourcesFor(chapter: Chapter): ResourceCard[] {
  return [
    {
      label: "Notes",
      desc: `Typed, chapter-wise notes for ${chapter.name}.`,
    },
    {
      label: "Formula Sheet",
      desc: `Every derived result for ${chapter.name} in one place.`,
    },
    {
      label: "DPP",
      desc: `Daily Practice Problems to build speed on ${chapter.name}.`,
    },
    {
      label: "PYQ",
      desc: `Previous Year Questions asked from ${chapter.name}.`,
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
  const [selected, setSelected] = useState<ResourceCard | null>(null);
  const { prev, next } = getAdjacentChapters(className, chapter.slug);

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
              <button
                key={r.label}
                type="button"
                onClick={() => setSelected(r)}
                className="group text-left bg-white rounded-lg border border-navy/10 p-6 hover:border-gold hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-gold"
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
              </button>
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
              <span aria-hidden="true">&larr;</span> Back to Class {className}{" "}
              chapters
            </Link>
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/60 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg max-w-sm w-full p-7 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-gold-deep font-display text-xl mb-4">
              !
            </span>
            <h3 className="font-display text-xl text-navy">Coming soon</h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              {selected.label} for <strong>{chapter.name}</strong> is being
              prepared. Message Ajay Sir on WhatsApp to get notified the
              moment it&apos;s ready.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <WhatsAppButton
                message={`Hi Ajay Sir, please notify me when ${selected.label} for "${chapter.name}" (Class ${className}) is ready.`}
                className="w-full"
              >
                Notify me on WhatsApp
              </WhatsAppButton>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-sm text-slate hover:text-navy py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
