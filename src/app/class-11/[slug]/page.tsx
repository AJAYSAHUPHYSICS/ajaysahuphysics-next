import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { class11Chapters, getChapterBySlug } from "@/lib/chapters";
import { getChapterOverview } from "@/lib/chapter-overviews";
import { getChapterContent } from "@/lib/chapter-content";
import { JsonLd, breadcrumbJsonLd, learningResourceJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { RESOURCE_ORDER, resourceRegistry } from "@/lib/resource-registry";
import RelatedChaptersList from "@/components/RelatedChaptersList";
import ChapterFaqAccordion from "@/components/ChapterFaqAccordion";

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
      {content && <JsonLd data={faqPageJsonLd(content.faqs)} />}
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

      {content && (
        <>
          <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h3 className="font-display text-xl text-navy mb-3">
              Introduction to {chapter.name}
            </h3>
            <p className="text-slate leading-relaxed">{content.introduction}</p>
            <p className="mt-3 text-slate leading-relaxed">{content.whyItMatters}</p>
          </div>

          <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h3 className="font-display text-xl text-navy mb-4">
              How to Study {chapter.name}
            </h3>

            {content.prerequisites.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-navy mb-1">Prerequisites</h4>
                <p className="text-sm text-slate leading-relaxed">
                  {content.prerequisites.join(" · ")}
                </p>
              </div>
            )}

            <div className="mb-4">
              <h4 className="font-semibold text-navy mb-1">Recommended approach</h4>
              <p className="text-sm text-slate leading-relaxed">{content.studyStrategy}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-navy mb-1">Common mistakes</h4>
              <ul className="list-disc pl-5 space-y-1">
                {content.commonMistakes.map((mistake) => (
                  <li key={mistake} className="text-sm text-slate leading-relaxed">
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-navy mb-1">Revision strategy</h4>
              <p className="text-sm text-slate leading-relaxed">{content.revisionStrategy}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-navy mb-1">PYQ strategy</h4>
              <p className="text-sm text-slate leading-relaxed">{content.pyqStrategy}</p>
            </div>

            <div className={content.examWeightageNotes || content.importantTips ? "mb-4" : ""}>
              <h4 className="font-semibold text-navy mb-1">DPP strategy</h4>
              <p className="text-sm text-slate leading-relaxed">{content.dppStrategy}</p>
            </div>

            {content.examWeightageNotes && (
              <div className={content.importantTips ? "mb-4" : ""}>
                <h4 className="font-semibold text-navy mb-1">Exam weightage</h4>
                <p className="text-sm text-slate leading-relaxed">
                  {content.examWeightageNotes}
                </p>
              </div>
            )}

            {content.importantTips && (
              <div>
                <h4 className="font-semibold text-navy mb-1">Important tips</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {content.importantTips.map((tip) => (
                    <li key={tip} className="text-sm text-slate leading-relaxed">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h3 className="font-display text-xl text-navy mb-4">Related Chapters</h3>
            <RelatedChaptersList relatedChapters={content.relatedChapters} />
          </div>

          <div className="mt-6 rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
            <h3 className="font-display text-xl text-navy mb-2">
              Frequently Asked Questions
            </h3>
            <ChapterFaqAccordion faqs={content.faqs} />
          </div>
        </>
      )}
    </div>
  );
}
