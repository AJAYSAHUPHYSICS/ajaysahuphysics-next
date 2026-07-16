import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { class11Chapters, getChapterBySlug } from "@/lib/chapters";
import { getChapterOverview } from "@/lib/chapter-overviews";
import { getChapterContent } from "@/lib/chapter-content";
import { JsonLd, breadcrumbJsonLd, learningResourceJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { RESOURCE_ORDER, resourceRegistry } from "@/lib/resource-registry";
import type { ChecklistItemKey } from "@/lib/checklist";
import ChapterContentSections from "@/components/ChapterContentSections";
import ChapterProgressCard from "@/components/ChapterProgressCard";
import RecordChapterVisit from "@/components/RecordChapterVisit";

type Params = { slug: string };

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
  const description = `Notes, formula sheet, practice questions, and PYQ for ${chapter.name}, a Class 11 Physics chapter for JEE and NEET.`;
  const path = `/class-11/${chapter.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const chapter = getChapterBySlug("11", slug);
  if (!chapter) notFound();

  const overview = getChapterOverview(chapter.slug);
  const content = getChapterContent(chapter.slug);
  const path = `/class-11/${chapter.slug}`;

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
          description: `Overview of ${chapter.name}, a Class 11 Physics chapter for JEE and NEET, with links to notes, formula sheet, practice questions, and previous year questions.`,
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
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {RESOURCE_ORDER.filter((key) =>
            resourceRegistry[key].hasData(chapter.slug)
          ).map((key) => {
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
      </div>

      <ChapterProgressCard
        cls={chapter.cls}
        slug={chapter.slug}
        chapterName={chapter.name}
        path={path}
        availableChecklist={availableChecklist}
      />

      {content && (
        <ChapterContentSections content={content} chapterName={chapter.name} />
      )}
    </div>
  );
}
