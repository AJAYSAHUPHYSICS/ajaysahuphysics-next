import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppButton from "@/components/WhatsAppButton";
import ResourceNav, { type ResourceNavItem } from "@/components/ResourceNav";
import { class12Chapters, getChapterBySlug, getAdjacentChapters } from "@/lib/chapters";
import { RESOURCE_ORDER, resourceRegistry } from "@/lib/resource-registry";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return class12Chapters.map((ch) => ({ slug: ch.slug }));
}

export default async function ClassTwelveChapterLayout({
  params,
  children,
}: {
  params: Promise<Params>;
  children: ReactNode;
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug("12", slug);
  if (!chapter) notFound();

  const basePath = `/class-12/${chapter.slug}`;
  const { prev, next } = getAdjacentChapters("12", chapter.slug);

  const navItems: ResourceNavItem[] = [
    { key: "overview", label: "Overview", href: basePath },
    ...RESOURCE_ORDER.map((key) => {
      const def = resourceRegistry[key];
      return {
        key,
        label: def.label,
        href: def.hasData(chapter.slug) ? `${basePath}/${key}` : null,
      };
    }),
    { key: "videos", label: "Videos", href: null },
  ];

  return (
    <div>
      <section className="physics-grid bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Class 12", href: "/class-12" },
              { label: chapter.name },
            ]}
          />
          <p className="mt-6 text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Class 12 &middot; Chapter {chapter.number}
          </p>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl">
            {chapter.name}
          </h1>
          <p className="mt-5 text-white/70 max-w-2xl text-base sm:text-lg leading-relaxed">
            Overview, notes, short notes, formula sheet, daily practice
            problems, previous year questions, and videos for this chapter —
            all in one place.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <ResourceNav items={navItems} />
          <div className="mt-6">{children}</div>

          <div className="mt-12 rounded-lg bg-navy text-white p-8 sm:p-10 physics-grid text-center">
            <h3 className="font-display text-2xl">
              Stuck on a concept in {chapter.name}?
            </h3>
            <p className="mt-2 text-white/70 max-w-md mx-auto">
              Message Ajay Sir directly on WhatsApp for doubt support on this
              chapter.
            </p>
            <div className="mt-6 flex justify-center">
              <WhatsAppButton
                message={`Hi Ajay Sir, I have a doubt in Class 12 - ${chapter.name}.`}
              >
                Ask a doubt
              </WhatsAppButton>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/class-12/${prev.slug}`}
                className="group flex flex-col rounded-lg border border-navy/10 bg-white p-5 hover:border-gold hover:shadow-lg transition-all"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate/60 flex items-center gap-1">
                  <span aria-hidden="true">&larr;</span> Previous chapter
                </span>
                <span className="mt-2 font-display text-lg text-navy group-hover:text-gold-deep transition-colors">
                  {prev.number}. {prev.name}
                </span>
              </Link>
            ) : (
              <div className="rounded-lg border border-dashed border-navy/10 p-5 flex flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate/40">
                  This is the first chapter
                </span>
              </div>
            )}

            {next ? (
              <Link
                href={`/class-12/${next.slug}`}
                className="group flex flex-col rounded-lg border border-navy/10 bg-white p-5 text-right hover:border-gold hover:shadow-lg transition-all"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate/60 flex items-center justify-end gap-1">
                  Next chapter <span aria-hidden="true">&rarr;</span>
                </span>
                <span className="mt-2 font-display text-lg text-navy group-hover:text-gold-deep transition-colors">
                  {next.number}. {next.name}
                </span>
              </Link>
            ) : (
              <div className="rounded-lg border border-dashed border-navy/10 p-5 flex flex-col justify-center text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate/40">
                  This is the last chapter
                </span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link
              href="/class-12"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold-deep transition-colors"
            >
              <span aria-hidden="true">&larr;</span> Back to Class 12 chapters
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
