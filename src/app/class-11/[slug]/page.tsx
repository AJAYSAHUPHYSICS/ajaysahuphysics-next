import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChapterDetailPage from "@/components/ChapterDetailPage";
import { class11Chapters, getChapterBySlug } from "@/lib/chapters";

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
  return {
    title: `${chapter.name} — Class 11 Physics`,
    description: `Notes, formula sheet, DPP, and PYQ for ${chapter.name}, a Class 11 Physics chapter for JEE and NEET.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug("11", slug);
  if (!chapter) notFound();
  return <ChapterDetailPage chapter={chapter} className="11" />;
}
