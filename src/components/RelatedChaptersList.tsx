import Link from "next/link";
import { allChapters } from "@/lib/chapters";
import type { RelatedChapter } from "@/lib/chapter-content";

/**
 * Renders a chapter's relatedChapters as internal links, each with its
 * stored reason. Resolves each slug against `allChapters` (the single
 * source of truth for class + display name), so a link is only ever
 * rendered for a chapter that genuinely exists — no possibility of a
 * broken link even if a future relatedChapters entry has a typo.
 */
export default function RelatedChaptersList({
  relatedChapters,
}: {
  relatedChapters: RelatedChapter[];
}) {
  const resolved = relatedChapters
    .map((rc) => {
      const chapter = allChapters.find((c) => c.slug === rc.slug);
      return chapter ? { ...rc, chapter } : null;
    })
    .filter((rc): rc is RelatedChapter & { chapter: (typeof allChapters)[number] } => rc !== null);

  if (resolved.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {resolved.map(({ slug, reason, chapter }) => (
        <li
          key={slug}
          className="rounded-lg border border-navy/10 bg-ivory p-4"
        >
          <Link
            href={`/class-${chapter.cls}/${chapter.slug}`}
            className="font-semibold text-navy hover:text-gold-deep transition-colors"
          >
            {chapter.name}
          </Link>
          <p className="mt-1 text-sm text-slate leading-relaxed">{reason}</p>
        </li>
      ))}
    </ul>
  );
}
