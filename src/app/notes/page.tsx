import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ExamTabs from "@/components/ExamTabs";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Chapter-wise physics notes for Class 11, Class 12, JEE and NEET, being rebuilt from openly licensed resources and independently written material.",
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
        title="Chapter-wise notes, being rebuilt."
        description="We're rebuilding the notes for every Class 11 and Class 12 chapter from openly licensed educational resources and material written independently by AjaySahuPhysics. Chapters appear below as they're reviewed; the rest are marked Coming soon."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <ExamTabs resourceLabel="Notes" resourceType="notes" />
        </div>
      </section>
    </div>
  );
}
