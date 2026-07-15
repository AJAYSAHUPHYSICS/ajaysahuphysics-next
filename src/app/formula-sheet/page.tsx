import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ExamTabs from "@/components/ExamTabs";

export const metadata: Metadata = {
  title: "Formula Sheet",
  description:
    "Chapter-wise physics formula sheets for Class 11, Class 12, JEE Main, JEE Advanced, and NEET — every derived result in one place.",
  alternates: { canonical: "/formula-sheet" },
};

export default function FormulaSheetPage() {
  return (
    <div>
      <PageHero
        eyebrow="Formula Sheet Hub"
        title="Every formula, organized by chapter."
        description="One-page formula sheets for fast last-minute revision, covering every chapter across JEE and NEET physics."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <ExamTabs resourceLabel="Formula Sheet" resourceType="formula-sheet" />
        </div>
      </section>
    </div>
  );
}
