import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ExamTabs from "@/components/ExamTabs";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Chapter-wise typed physics notes for Class 11, Class 12, JEE Main, JEE Advanced, and NEET.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Notes", path: "/notes" },
        ])}
      />
      <PageHero
        eyebrow="Notes Hub"
        title="Typed, chapter-wise notes built for revision."
        description="Every chapter from Class 11 and Class 12 physics, organized by exam. Pick a chapter below to download notes or get notified when they're ready."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <ExamTabs resourceLabel="Notes" resourceType="notes" />
        </div>
      </section>
    </div>
  );
}
