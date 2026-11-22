import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StudyNav from "@/components/study/StudyNav";
import DashboardClient from "@/components/DashboardClient";
import { dashboardChapterMeta } from "@/lib/dashboard-chapter-meta";
import MistakesClient from "./MistakesClient";

export const metadata: Metadata = {
  title: "Mistakes | My progress",
  description: "Categorise what went wrong, add your own explanation, and resolve or reopen each one.",
  alternates: { canonical: "/dashboard/mistakes" },
  robots: { index: false, follow: true },
};

export default function MistakesPage() {
  return (
    <main className="bg-ivory">
      <PageHero eyebrow="My progress" title="Your mistake notebook" description="Categorise what went wrong, add your own explanation, and resolve or reopen each one." />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <StudyNav current="/dashboard/mistakes" />
        <MistakesClient />
        {/* The dashboard's mistakes analysis cards (moved here from the overview, owner decision 2026-11-20). */}
        <div className="mt-10">
          <DashboardClient chapters={dashboardChapterMeta()} view="mistakes" />
        </div>
      </div>
    </main>
  );
}
