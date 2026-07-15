import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ExamTabs from "@/components/ExamTabs";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Practice Questions",
  description:
    "Chapter-wise Practice Questions for Class 11, Class 12, JEE Main, JEE Advanced, and NEET physics.",
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
        description="Consistent daily practice is what turns concepts into exam-ready speed. Pick a chapter to start practicing."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <ExamTabs resourceLabel="Practice Questions" resourceType="dpp" />
        </div>
      </section>
    </div>
  );
}
