import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StudyNav from "@/components/study/StudyNav";
import BookmarksClient from "./BookmarksClient";

export const metadata: Metadata = {
  title: "Bookmarks | My progress",
  description: "Search, filter and tidy up what you've bookmarked. Saved in this browser.",
  alternates: { canonical: "/dashboard/bookmarks" },
  robots: { index: false, follow: true },
};

export default function BookmarksPage() {
  return (
    <main className="bg-ivory">
      <PageHero eyebrow="My progress" title="Saved chapters and resources" description="Search, filter and tidy up what you've bookmarked. Saved in this browser." />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <StudyNav current="/dashboard/bookmarks" />
        <BookmarksClient />
      </div>
    </main>
  );
}
