import type { Metadata } from "next";
import { allChapters } from "@/lib/chapters";
import { resourceRegistry } from "@/lib/resource-registry";
import { getChapterContent } from "@/lib/chapter-content";
import type { ChecklistItemKey } from "@/lib/checklist";
import type { ChapterMeta } from "@/lib/chapter-meta";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import PageHero from "@/components/PageHero";
import DashboardClient from "@/components/DashboardClient";

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
  // Computed server-side so the heavy content registries (resourceRegistry,
  // chapter-content) never ship to the client — only the small, serializable
  // summary each chapter needs for the dashboard.
  const chapters: ChapterMeta[] = allChapters.map((ch) => {
    const availableChecklist: ChecklistItemKey[] = [
      resourceRegistry.notes.hasData(ch.slug) ? ("notes" as const) : null,
      resourceRegistry["formula-sheet"].hasData(ch.slug) ? ("formulaSheet" as const) : null,
      resourceRegistry.dpp.hasData(ch.slug) ? ("dpp" as const) : null,
      resourceRegistry.pyq.hasData(ch.slug) ? ("pyq" as const) : null,
    ].filter((item): item is ChecklistItemKey => item !== null);

    const content = getChapterContent(ch.slug);

    return {
      cls: ch.cls,
      slug: ch.slug,
      name: ch.name,
      number: ch.number,
      availableChecklist,
      relatedChapters: content?.relatedChapters.map((r) => ({ slug: r.slug, reason: r.reason })) ?? [],
    };
  });

  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "My Progress", path: "/dashboard" }])} />
      <PageHero
        eyebrow="My Progress"
        title="Everything you're tracking, in one place."
        description="Bookmarks, your study checklist, revision rounds, and your study streak — saved on this device, no account needed."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <DashboardClient chapters={chapters} />
        </div>
      </section>
    </div>
  );
}
