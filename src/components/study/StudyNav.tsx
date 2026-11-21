import Link from "next/link";

const LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/bookmarks", label: "Bookmarks" },
  { href: "/dashboard/mistakes", label: "Mistakes" },
  { href: "/dashboard/revision", label: "Revision" },
  { href: "/dashboard/activity", label: "Activity" },
] as const;

/** Section navigation shared by the dashboard and its study tools. */
export default function StudyNav({ current }: { current: (typeof LINKS)[number]["href"] }) {
  return (
    <nav aria-label="My progress sections" className="mb-8 -mx-4 overflow-x-auto px-4">
      <ul className="flex gap-2 whitespace-nowrap">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={l.href === current ? "page" : undefined}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                l.href === current ? "bg-navy text-white" : "border border-navy/15 text-navy hover:border-gold"
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const studyCard = "rounded-lg border border-navy/10 bg-white p-5 sm:p-6";
export const studySelect = "rounded-md border border-navy/15 bg-white px-3 py-2 text-sm text-navy focus-visible:outline-2 focus-visible:outline-gold";
export const studyButton = "inline-flex items-center rounded-md border border-navy/15 px-3 py-1.5 text-xs font-semibold text-navy hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50";
