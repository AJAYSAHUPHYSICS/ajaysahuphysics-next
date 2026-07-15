import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { class11Chapters, getChapterBySlug } from "@/lib/chapters";
import { getChapterOverview } from "@/lib/chapter-overviews";
import { JsonLd, breadcrumbJsonLd, learningResourceJsonLd } from "@/lib/jsonld";

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
      <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
        <h3 className="font-display text-xl text-navy mb-3">
          About this chapter
        </h3>
        <p className="text-slate leading-relaxed">{overview}</p>
      </div>
    </div>
  );
}
