import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { class11Chapters, getChapterBySlug } from "@/lib/chapters";
import { getChapterOverview } from "@/lib/chapter-overviews";
import { getChapterContent } from "@/lib/chapter-content";
import { JsonLd, breadcrumbJsonLd, learningResourceJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { RESOURCE_ORDER, resourceRegistry, isResourceLinked, chapterHasPublicResource } from "@/lib/resource-registry";
import { isLegacyContentPublic } from "@/lib/content-policy/publication";
import { chapterSocialMetadata } from "@/lib/social-metadata";
import type { ChecklistItemKey } from "@/lib/checklist";
import ChapterContentSections from "@/components/ChapterContentSections";
import ChapterProgressCard from "@/components/ChapterProgressCard";
import RecordChapterVisit from "@/components/RecordChapterVisit";

type Params = { slug: string };

const CHECKLIST_RESOURCE = {
  notes: "notes",
  formulaSheet: "formula-sheet",
  dpp: "dpp",
  pyq: "pyq",
} as const satisfies Record<ChecklistItemKey, (typeof RESOURCE_ORDER)[number]>;

export function generateStaticParams(): Params[] {
  return class11Chapters.map((ch) => ({ slug: ch.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug("11", slug);
  if (!chapter) return {};

  const title = `${chapter.name} — Class 11`;
  const hasPublic = chapterHasPublicResource(chapter.slug);
  const description = hasPublic
    ? `Notes, formula sheet, practice questions, and PYQ for ${chapter.name}, a Class 11 Physics chapter for JEE and NEET.`
    : `${chapter.name}, a Class 11 Physics chapter for JEE and NEET. Learning resources for this chapter are being rebuilt.`;
  const path = `/class-11/${chapter.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    ...chapterSocialMetadata({ cls: "11", slug: chapter.slug, chapterName: chapter.name, title, description, path }),
    // While every learning resource is withheld the page is thin, so it is
    // kept out of search results and the sitemap (it stays live for students).
    ...(hasPublic ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const chapter = getChapterBySlug("11", slug);
  if (!chapter) notFound();

  // Legacy chapter guidance (overview summary, tips, mistakes, strategy,
  // FAQs) is withheld by the central publication policy.
  const guidancePublic = isLegacyContentPublic("chapter-guidance");
  const overview = guidancePublic
    ? getChapterOverview(chapter.slug)
    : `${chapter.name} is chapter ${chapter.number} of Class 11 Physics on AjaySahuPhysics.`;
  const content = guidancePublic ? getChapterContent(chapter.slug) : undefined;
  const path = `/class-11/${chapter.slug}`;
  const linkedResources = RESOURCE_ORDER.filter((key) =>
    isResourceLinked(resourceRegistry[key], chapter.slug)
  );

  const availableChecklist: ChecklistItemKey[] = [
    resourceRegistry.notes.hasData(chapter.slug) ? ("notes" as const) : null,
    resourceRegistry["formula-sheet"].hasData(chapter.slug) ? ("formulaSheet" as const) : null,
    resourceRegistry.dpp.hasData(chapter.slug) ? ("dpp" as const) : null,
    resourceRegistry.pyq.hasData(chapter.slug) ? ("pyq" as const) : null,
  ].filter((item): item is ChecklistItemKey => item !== null);

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Class 11", path: "/class-11" },
          { name: chapter.name, path },
        ])}
      />
      <JsonLd
        data={learningResourceJsonLd({
          name: `${chapter.name} — Class 11 Physics Overview`,
          description:
            linkedResources.length > 0
              ? `Overview of ${chapter.name}, a Class 11 Physics chapter for JEE and NEET, with links to notes, formula sheet, practice questions, and previous year questions.`
              : `Overview of ${chapter.name}, a Class 11 Physics chapter for JEE and NEET.`,
          path,
          learningResourceType: "Syllabus",
          educationalLevel: "11",
          chapterName: chapter.name,
        })}
      />
      {content && content.faqs.length > 0 && <JsonLd data={faqPageJsonLd(content.faqs)} />}
      <RecordChapterVisit slug={chapter.slug} cls={chapter.cls} name={chapter.name} />
      <h2 className="font-display text-2xl text-navy mb-4">
        {chapter.name} Overview
      </h2>

      <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
        <h3 className="font-display text-xl text-navy mb-3">
          About this chapter
        </h3>
        <p className="text-slate leading-relaxed">{overview}</p>
      </div>

      <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
        <h3 className="font-display text-xl text-navy mb-3">
          Study {chapter.name}
        </h3>
        {linkedResources.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {linkedResources.map((key) => {
              const def = resourceRegistry[key];
              return (
                <li key={key}>
                  <Link
                    href={`${path}/${key}`}
                    className="text-slate hover:text-gold-deep transition-colors"
                  >
                    {chapter.name} {def.seoNoun}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-slate leading-relaxed">
            We&apos;re rebuilding every learning resource for {chapter.name} from
            openly licensed educational resources and material written
            independently by AjaySahuPhysics. New notes, practice questions and
            formula sheets will appear here once they&apos;ve been reviewed. Your
            checklist and saved progress are kept.
          </p>
        )}
      </div>

      <ChapterProgressCard
        cls={chapter.cls}
        slug={chapter.slug}
        chapterName={chapter.name}
        path={path}
        availableChecklist={availableChecklist}
        linkedChecklist={availableChecklist.filter((item) =>
          isResourceLinked(resourceRegistry[CHECKLIST_RESOURCE[item]], chapter.slug)
        )}
      />

      {content && (
        <ChapterContentSections content={content} chapterName={chapter.name} />
      )}
    </div>
  );
}
