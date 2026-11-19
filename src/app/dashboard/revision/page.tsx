import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StudyNav from "@/components/study/StudyNav";
import RevisionClient from "./RevisionClient";

export const metadata: Metadata = {
  title: "Revision | My progress",
  description: "See what's due, mark revision rounds, and review your history.",
  alternates: { canonical: "/dashboard/revision" },
  robots: { index: false, follow: true },
};

export default function RevisionPage() {
  return (
    <main className="bg-ivory">
      <PageHero eyebrow="My progress" title="Revision planner" description="See what's due, mark revision rounds, and review your history." />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <StudyNav current="/dashboard/revision" />
        <RevisionClient />
      </div>
    </main>
  );
}
