import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

const THEME = {
  dark: {
    link: "text-white/60 hover:text-gold transition-colors",
    current: "text-gold",
    inactive: "text-white/60",
    separator: "text-white/30",
  },
  light: {
    link: "text-slate hover:text-gold-deep transition-colors",
    current: "text-navy font-semibold",
    inactive: "text-slate",
    separator: "text-navy/25",
  },
} as const;

export default function Breadcrumbs({
  items,
  variant = "dark",
}: {
  items: Crumb[];
  /** Use "light" when rendering on a white/ivory background instead of the navy hero. */
  variant?: "dark" | "light";
}) {
  const theme = THEME[variant];
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center flex-wrap gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className={theme.link}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? theme.current : theme.inactive}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={theme.separator} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
