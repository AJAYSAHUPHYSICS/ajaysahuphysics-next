import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { class12Chapters, getChapterBySlug } from "@/lib/chapters";
import { getChapterOverview } from "@/lib/chapter-overviews";
import { JsonLd, breadcrumbJsonLd, learningResourceJsonLd } from "@/lib/jsonld";
import { RESOURCE_ORDER, resourceRegistry } from "@/lib/resource-registry";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return class12Chapters.map((ch) => ({ slug: ch.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug("12", slug);
  if (!chapter) return {};

  const title = `${chapter.name} — Class 12`;
  const description = `Notes, formula sheet, practice questions, and PYQ for ${chapter.name}, a Class 12 Physics chapter for JEE and NEET.`;
  const path = `/class-12/${chapter.slug}`;

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
  const chapter = getChapterBySlug("12", slug);
  if (!chapter) notFound();

  const overview = getChapterOverview(chapter.slug);
  const path = `/class-12/${chapter.slug}`;

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Class 12", path: "/class-12" },
          { name: chapter.name, path },
        ])}
      />
      <JsonLd
        data={learningResourceJsonLd({
          name: `${chapter.name} — Class 12 Physics Overview`,
          description: `Overview of ${chapter.name}, a Class 12 Physics chapter for JEE and NEET, with links to notes, formula sheet, practice questions, and previous year questions.`,
          path,
          learningResourceType: "Syllabus",
          educationalLevel: "12",
          chapterName: chapter.name,
        })}
      />
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
    </div>
  );
}
