import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ClassExamPicker from "@/components/ClassExamPicker";
import ChapterGrid from "@/components/ChapterGrid";
import { class11Chapters } from "@/lib/chapters";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Class 11 Physics",
  description:
    "Class 11 Physics chapters, notes, formula sheets, Practice Questions, and PYQs — covering mechanics, thermodynamics, oscillations, and waves.",
  alternates: { canonical: "/class-11" },
};

export default function Class11Page() {
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Class 11", path: "/class-11" },
        ])}
      />
      <PageHero
        eyebrow="Class 11 Physics"
        title="The foundation chapters that decide how easy Class 12 feels."
        description="Mechanics, thermodynamics, oscillations, and waves — covered chapter by chapter with notes, formula sheets, Practice Questions, and PYQs."
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <ClassExamPicker cls="11" />

          <details className="mt-10 group">
            <summary className="cursor-pointer text-sm font-semibold text-navy/60 hover:text-gold-deep transition-colors marker:content-none">
              Just want to browse every chapter directly?{" "}
              <span className="text-gold-deep group-open:hidden">Show all &rarr;</span>
            </summary>
            <div className="mt-6">
              <ChapterGrid
                chapters={class11Chapters}
                resourceLabel="chapter"
                linkToChapterPage
              />
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
