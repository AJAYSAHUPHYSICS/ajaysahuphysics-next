import type { ReactNode } from "react";
import Link from "next/link";

type IconName = "bookmark" | "clock" | "revision" | "chapters" | "check";

/** Small inline-SVG icon set matching the stroke-based style already
 * used across the app (ReadingTimeBadge, BookmarkButton, RevisionTracker)
 * — no icon library added. */
const ICON_PATHS: Record<IconName, ReactNode> = {
  bookmark: <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  revision: (
    <>
      <path d="M3 12a9 9 0 1 1 3 6.7" />
      <path d="M3 17v-5h5" />
    </>
  ),
  chapters: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
};

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon: IconName;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-navy/15 bg-ivory p-7 sm:p-9 text-center">
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-navy/10 text-navy/40 mb-4"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {ICON_PATHS[icon]}
        </svg>
      </span>
      <p className="font-semibold text-navy mb-1.5">{title}</p>
      <p className="text-sm text-slate max-w-md mx-auto mb-5">{description}</p>
      <Link
        href={actionHref}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-navy hover:bg-navy-light rounded-md px-4 py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-gold"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
