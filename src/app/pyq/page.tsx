import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PyqExamPicker from "@/components/PyqExamPicker";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "PYQ — Previous Year Questions",
  description:
    "Chapter-wise Previous Year Questions (PYQ) for JEE Main, JEE Advanced and NEET physics, being rebuilt from official exam papers.",
  alternates: { canonical: "/pyq" },
};

export default function PyqPage() {
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "PYQ", path: "/pyq" },
        ])}
      />
      <PageHero
        eyebrow="PYQ Hub"
        title="Previous Year Questions, sorted by chapter."
        description="We're rebuilding this section from official exam papers. A question appears here only once it has been checked against the official paper and the right to reproduce it has been confirmed, with a solution written independently by AjaySahuPhysics. Chapters appear below as they're reviewed; the rest are marked Coming soon."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <PyqExamPicker />
        </div>
      </section>
    </div>
  );
}
