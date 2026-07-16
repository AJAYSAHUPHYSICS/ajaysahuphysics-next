import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { class11Chapters, getChapterBySlug } from "@/lib/chapters";
import {
  RESOURCE_ORDER,
  resourceRegistry,
  type ResourceKey,
} from "@/lib/resource-registry";
import { JsonLd, breadcrumbJsonLd, learningResourceJsonLd } from "@/lib/jsonld";
import type { BookmarkType } from "@/lib/bookmarks";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookmarkButton from "@/components/BookmarkButton";
import RecordResourceVisit from "@/components/RecordResourceVisit";

type Params = { slug: string; resource: string };

/**
 * Only generate a static page for a (chapter, resource) pair that actually
 * HAS content — never a thin "coming soon" placeholder. Missing resources
 * are simply not linked (see ResourceNav) and not built, so nothing thin
 * or duplicate ever reaches the sitemap or a crawler.
 *
 * Computed directly from class11Chapters rather than relying on the
 * parent layout's generateStaticParams to supply `slug` — Next.js's
 * parent-to-child param propagation for nested dynamic segments has had
 * known reliability issues, so each route generates its own full param
 * list independently.
 */
export function generateStaticParams(): Params[] {
  return class11Chapters.flatMap((ch) =>
    RESOURCE_ORDER.filter((key) => resourceRegistry[key].hasData(ch.slug)).map(
      (resource) => ({ slug: ch.slug, resource })
    )
  );
}

function resolveEntry(resource: string) {
  return RESOURCE_ORDER.includes(resource as ResourceKey)
    ? resourceRegistry[resource as ResourceKey]
    : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, resource } = await params;
  const chapter = getChapterBySlug("11", slug);
  const def = resolveEntry(resource);
  if (!chapter || !def || !def.hasData(slug)) return {};

  const title = `${chapter.name} ${def.titleNoun}`;
  const description = def.describe(chapter.name, slug);
  const path = `/class-11/${slug}/${resource}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, resource } = await params;
  const chapter = getChapterBySlug("11", slug);
  const def = resolveEntry(resource);
  if (!chapter || !def || !def.hasData(slug)) notFound();

  const content = def.render(slug);
  if (!content) notFound();

  const path = `/class-11/${slug}/${resource}`;

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Class 11", path: "/class-11" },
          { name: chapter.name, path: `/class-11/${slug}` },
          { name: def.label, path },
        ])}
      />
      <JsonLd
        data={learningResourceJsonLd({
          name: `${chapter.name} ${def.label}`,
          description: def.describe(chapter.name, slug),
          path,
          learningResourceType: def.learningResourceType,
          educationalLevel: "11",
          chapterName: chapter.name,
        })}
      />

      <div className="mb-4">
        <Breadcrumbs
          variant="light"
          items={[
            { label: "Home", href: "/" },
            { label: "Class 11", href: "/class-11" },
            { label: chapter.name, href: `/class-11/${slug}` },
            { label: def.label },
          ]}
        />
      </div>

      <RecordResourceVisit
        cls={chapter.cls}
        slug={chapter.slug}
        resourceKey={resource}
        chapterName={chapter.name}
        resourceLabel={def.label}
        path={path}
      />

      <div className="flex items-start justify-between gap-4 mb-4">
        <h2 className="font-display text-2xl text-navy">
          {chapter.name} {def.label}
        </h2>
        <BookmarkButton
          cls={chapter.cls}
          slug={chapter.slug}
          type={resource as BookmarkType}
          chapterName={chapter.name}
          label={`${chapter.name} — ${def.label}`}
          path={path}
          size="sm"
        />
      </div>

      {resource === "notes" ? (
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <p className="text-sm text-slate">Typed notes for {chapter.name}.</p>
          <a
            href={`/notes-pdf/class-11/${chapter.slug}.pdf`}
            download
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep hover:text-navy transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
            </svg>
            Download PDF
          </a>
        </div>
      ) : null}

      {content}
    </div>
  );
}
