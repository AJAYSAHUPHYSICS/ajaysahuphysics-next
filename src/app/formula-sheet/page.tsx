import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ExamTabs from "@/components/ExamTabs";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Formula Sheet",
  description:
    "Chapter-wise physics formula sheets for Class 11, Class 12, JEE and NEET, being rebuilt with every formula checked and its sources recorded.",
  alternates: { canonical: "/formula-sheet" },
};

export default function FormulaSheetPage() {
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Formula Sheet", path: "/formula-sheet" },
        ])}
      />
      <PageHero
        eyebrow="Formula Sheet Hub"
        title="Formula sheets, organized by chapter."
        description="We're rebuilding the formula sheets for every chapter, with each formula checked and its sources recorded. Chapters appear below as they're reviewed; the rest are marked Coming soon."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <ExamTabs resourceLabel="Formula Sheet" resourceType="formula-sheet" />
        </div>
      </section>
    </div>
  );
}
