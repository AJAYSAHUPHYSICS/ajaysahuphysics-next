import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ClassExamPicker from "@/components/ClassExamPicker";
import ChapterGrid from "@/components/ChapterGrid";
import { class12Chapters } from "@/lib/chapters";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Class 12 Physics",
  description:
    "Class 12 Physics chapters, notes, formula sheets, Practice Questions, and PYQs — covering electrostatics, current electricity, optics, and modern physics.",
  alternates: { canonical: "/class-12" },
};

export default function Class12Page() {
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Class 12", path: "/class-12" },
        ])}
      />
      <PageHero
        eyebrow="Class 12 Physics"
        title="The chapters that carry the most weight in JEE and NEET."
        description="Electrostatics, current electricity, optics, and modern physics — covered chapter by chapter with notes, formula sheets, Practice Questions, and PYQs."
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <ClassExamPicker cls="12" />

          <details className="mt-10 group">
            <summary className="cursor-pointer text-sm font-semibold text-navy/60 hover:text-gold-deep transition-colors marker:content-none">
              Just want to browse every chapter directly?{" "}
              <span className="text-gold-deep group-open:hidden">Show all &rarr;</span>
            </summary>
            <div className="mt-6">
              <ChapterGrid
                chapters={class12Chapters}
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
