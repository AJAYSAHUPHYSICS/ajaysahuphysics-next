import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PyqExamPicker from "@/components/PyqExamPicker";

export const metadata: Metadata = {
  title: "PYQ — Previous Year Questions",
  description:
    "Chapter-wise Previous Year Questions (PYQ) for JEE Main, JEE Advanced, and NEET physics.",
};

export default function PyqPage() {
  return (
    <div>
      <PageHero
        eyebrow="PYQ Hub"
        title="Previous Year Questions, sorted by chapter."
        description="JEE Main, JEE Advanced, and NEET questions from past years, organized chapter-wise so you can practice exactly what's been asked before."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <PyqExamPicker />
        </div>
      </section>
    </div>
  );
}
