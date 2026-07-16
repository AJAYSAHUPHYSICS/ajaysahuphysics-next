export type TocItem = { id: string; label: string };

/**
 * Plain anchor links to in-page section ids — smooth scrolling comes
 * from the global `scroll-behavior: smooth` rule (see globals.css),
 * so this component needs zero client JS. Renders nothing below 3
 * sections, where a table of contents adds more clutter than value.
 */
export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Sections in this chapter"
      className="mb-6 rounded-lg border border-navy/10 bg-ivory/60 p-4 sm:p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate/60 mb-2.5">
        On this page
      </p>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-block text-sm font-medium px-3 py-1.5 rounded-full border border-navy/15 text-navy/80 bg-white hover:border-gold hover:text-gold-deep transition-colors focus-visible:outline-2 focus-visible:outline-gold"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
