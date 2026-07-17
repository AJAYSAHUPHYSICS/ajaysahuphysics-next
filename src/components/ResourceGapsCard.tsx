import Link from "next/link";
import type { ResourceGap } from "@/lib/resource-gaps";
import EmptyState from "./EmptyState";

/** Plain, no client JS — receives already-computed gap counts. */
export default function ResourceGapsCard({ gaps }: { gaps: ResourceGap[] }) {
  const withRemaining = gaps.filter((g) => g.remaining > 0);

  if (gaps.length === 0) {
    return (
      <EmptyState
        icon="chapters"
        title="Nothing to show yet"
        description="Once a chapter has Notes, Formula Sheet, DPP, or PYQ available, remaining work will show up here."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  if (withRemaining.length === 0) {
    return (
      <EmptyState
        icon="check"
        title="Nothing remaining"
        description="Every resource and revision round you've started is complete."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  return (
    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {withRemaining.map((g) => (
        <div key={g.label}>
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate/60">{g.label}</dt>
          <dd className="text-2xl font-display text-navy mt-1">{g.remaining}</dd>
        </div>
      ))}
      <div className="col-span-2 sm:col-span-3 pt-2">
        <Link href="#all-chapters" className="text-sm font-semibold text-gold-deep hover:text-navy transition-colors">
          Browse chapters &rarr;
        </Link>
      </div>
    </dl>
  );
}
