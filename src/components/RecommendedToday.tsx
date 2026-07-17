import Link from "next/link";
import type { PriorityItem } from "@/lib/todays-priorities";
import EmptyState from "./EmptyState";

/** Plain, no client JS — receives an already-built priority list. */
export default function RecommendedToday({ items }: { items: PriorityItem[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon="check"
        title="Nothing urgent today"
        description="No overdue revisions, weak chapters, or unfinished practice right now. Great place to start something new."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  return (
    <ol className="space-y-2">
      {items.map((item, i) => (
        <li key={`${item.cls}-${item.slug}`}>
          <Link
            href={item.path}
            className="flex items-center gap-3 rounded-md border border-navy/10 px-4 py-3 hover:border-gold hover:bg-ivory transition-colors focus-visible:outline-2 focus-visible:outline-gold"
          >
            <span
              aria-hidden="true"
              className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white text-xs font-bold"
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-navy truncate">{item.name}</span>
              <span className="block text-xs text-slate/60 mt-0.5">{item.reason}</span>
            </span>
            <span className="shrink-0 text-sm font-semibold text-gold-deep">Open &rarr;</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
