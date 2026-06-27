import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ClassExamPicker from "@/components/ClassExamPicker";

export const metadata: Metadata = {
  title: "Class 11 Physics",
  description:
    "Class 11 Physics chapters, notes, formula sheets, Practice Questions, and PYQs — covering mechanics, thermodynamics, oscillations, and waves.",
};

export default function Class11Page() {
  return (
    <div>
      <PageHero
        eyebrow="Class 11 Physics"
        title="The foundation chapters that decide how easy Class 12 feels."
        description="Mechanics, thermodynamics, oscillations, and waves — covered chapter by chapter with notes, formula sheets, Practice Questions, and PYQs."
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <ClassExamPicker cls="11" />
        </div>
      </section>
    </div>
  );
}
