import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StudyNav from "@/components/study/StudyNav";
import DashboardClient from "@/components/DashboardClient";
import { dashboardChapterMeta } from "@/lib/dashboard-chapter-meta";
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
        {/* The dashboard's revision analysis cards (moved here from the overview, owner decision 2026-11-20). */}
        <div className="mt-10">
          <DashboardClient chapters={dashboardChapterMeta()} view="revision" />
        </div>
      </div>
    </main>
  );
}
