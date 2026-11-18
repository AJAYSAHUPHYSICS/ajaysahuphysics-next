import Link from "next/link";

/**
 * Shown on a chapter page whose learning content is withheld while the
 * platform is rebuilt (src/lib/content-policy/publication.ts). The route
 * stays live, so bookmarks and continue-learning links keep working. It
 * never shows any withheld material, and only links to pages that still
 * work for students: the chapter overview and their progress dashboard.
 */
export default function ContentRebuildingNotice({
  cls,
  slug,
  chapterName,
  heading,
  body,
}: {
  cls: "11" | "12";
  slug: string;
  chapterName: string;
  heading: string;
  body: string;
}) {
  const links = [
    { href: `/class-${cls}/${slug}`, label: `${chapterName} overview` },
    { href: "/dashboard", label: "My progress" },
  ];
  return (
    <div className="rounded-lg border border-navy/10 bg-white p-7 sm:p-9">
      <h3 className="font-display text-xl text-navy">{heading}</h3>
      <p className="mt-3 text-slate leading-relaxed">{body}</p>
      <p className="mt-3 text-slate leading-relaxed">
        Your bookmarks, checklist and saved progress for {chapterName} are kept.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex items-center rounded-md border border-navy/15 px-3.5 py-2 text-sm font-semibold text-navy hover:border-gold hover:text-gold-deep transition-colors focus-visible:outline-2 focus-visible:outline-gold"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
