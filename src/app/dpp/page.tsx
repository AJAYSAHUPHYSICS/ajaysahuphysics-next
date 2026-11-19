import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ExamTabs from "@/components/ExamTabs";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Practice Questions",
  description:
    "Chapter-wise physics practice questions for Class 11, Class 12, JEE and NEET, being written independently by AjaySahuPhysics.",
  alternates: { canonical: "/dpp" },
};

export default function DppPage() {
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Practice Questions", path: "/dpp" },
        ])}
      />
      <PageHero
        eyebrow="Practice Questions Hub"
        title="Practice Questions, chapter by chapter."
        description="We're writing new practice questions, with independently written solutions, for every chapter. Chapters appear below as they're reviewed; the rest are marked Coming soon."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <ExamTabs resourceLabel="Practice Questions" resourceType="dpp" />
        </div>
      </section>
    </div>
  );
}
