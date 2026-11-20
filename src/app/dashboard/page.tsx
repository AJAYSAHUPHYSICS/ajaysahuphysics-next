import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import PageHero from "@/components/PageHero";
import DashboardClient from "@/components/DashboardClient";
import StudyNav from "@/components/study/StudyNav";
import { dashboardChapterMeta } from "@/lib/dashboard-chapter-meta";

// A personal, client-populated page with no unique server-rendered
// content per visitor — kept out of the crawl index the same way any
// account/utility page would be, so it never competes with the site's
// actual study content in search results.
export const metadata: Metadata = {
  title: "My Progress",
  description: "Your bookmarks, study checklist, revision tracker, and study streak.",
  alternates: { canonical: "/dashboard" },
  robots: { index: false, follow: true },
};

export default function DashboardPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "My Progress", path: "/dashboard" }])} />
      <PageHero
        eyebrow="My Progress"
        title="Everything you're tracking, in one place."
        description="What to continue, what's due for revision, today's plan, mistakes to retry and your streak — saved on this device, no account needed."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <StudyNav current="/dashboard" />
          <DashboardClient chapters={dashboardChapterMeta()} view="overview" />
        </div>
      </section>
    </div>
  );
}
