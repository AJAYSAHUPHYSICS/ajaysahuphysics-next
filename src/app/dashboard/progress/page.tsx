import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import DashboardClient from "@/components/DashboardClient";
import StudyNav from "@/components/study/StudyNav";
import { dashboardChapterMeta } from "@/lib/dashboard-chapter-meta";

export const metadata: Metadata = {
  title: "Progress & goals",
  description: "Exam readiness, study goals, targets, forecasts and every chapter's progress, saved on this device.",
  alternates: { canonical: "/dashboard/progress" },
  robots: { index: false, follow: true },
};

export default function ProgressPage() {
  return (
    <div>
      <PageHero eyebrow="My progress" title="Progress & goals" description="Exam readiness, goals and targets, recommendations, forecasts, and every chapter's progress." />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <StudyNav current="/dashboard/progress" />
          <DashboardClient chapters={dashboardChapterMeta()} view="progress" />
        </div>
      </section>
    </div>
  );
}
