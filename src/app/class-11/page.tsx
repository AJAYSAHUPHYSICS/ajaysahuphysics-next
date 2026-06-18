import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ChapterGrid from "@/components/ChapterGrid";
import { class11Chapters } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Class 11 Physics",
  description:
    "Class 11 Physics chapters, notes, formula sheets, DPPs, and PYQs — covering mechanics, thermodynamics, oscillations, and waves.",
};

const resourceLinks = [
  { label: "Class 11 Notes", href: "/notes" },
  { label: "Class 11 Formula Sheet", href: "/formula-sheet" },
  { label: "Class 11 DPP", href: "/dpp" },
  { label: "Class 11 PYQ", href: "/pyq" },
];

export default function Class11Page() {
  return (
    <div>
      <PageHero
        eyebrow="Class 11 Physics"
        title="The foundation chapters that decide how easy Class 12 feels."
        description="Mechanics, thermodynamics, oscillations, and waves — covered chapter by chapter with notes, formula sheets, DPPs, and PYQs."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-wrap gap-3">
            {resourceLinks.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-navy/15 text-navy/70 hover:border-gold hover:text-gold-deep transition-colors"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="gold-rule mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl text-navy mb-10">
            Chapters
          </h2>
          <ChapterGrid
            chapters={class11Chapters}
            resourceLabel="Resources"
            linkToChapterPage
          />
        </div>
      </section>
    </div>
  );
}
