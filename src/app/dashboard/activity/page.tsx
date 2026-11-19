import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StudyNav from "@/components/study/StudyNav";
import ActivityClient from "./ActivityClient";

export const metadata: Metadata = {
  title: "Activity | My progress",
  description: "Your streak, the last four weeks, and a timeline of what you've done.",
  alternates: { canonical: "/dashboard/activity" },
  robots: { index: false, follow: true },
};

export default function ActivityPage() {
  return (
    <main className="bg-ivory">
      <PageHero eyebrow="My progress" title="Your study activity" description="Your streak, the last four weeks, and a timeline of what you've done." />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <StudyNav current="/dashboard/activity" />
        <ActivityClient />
      </div>
    </main>
  );
}
