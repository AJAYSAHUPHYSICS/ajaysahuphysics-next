import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ClassExamPicker from "@/components/ClassExamPicker";

export const metadata: Metadata = {
  title: "Class 12 Physics",
  description:
    "Class 12 Physics chapters, notes, formula sheets, DPPs, and PYQs — covering electrostatics, current electricity, optics, and modern physics.",
};

export default function Class12Page() {
  return (
    <div>
      <PageHero
        eyebrow="Class 12 Physics"
        title="The chapters that carry the most weight in JEE and NEET."
        description="Electrostatics, current electricity, optics, and modern physics — covered chapter by chapter with notes, formula sheets, DPPs, and PYQs."
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <ClassExamPicker cls="12" />
        </div>
      </section>
    </div>
  );
}
