import Link from "next/link";
import type { StreakBonus } from "@/lib/streak-bonus";

/** Plain, no client JS — receives an already-computed StreakBonus (or null). */
export default function StreakBonusCard({ bonus }: { bonus: StreakBonus | null }) {
  if (!bonus) {
    return (
      <p className="text-sm text-slate">
        Complete a resource or revision round to start your study streak.
      </p>
    );
  }

  if (bonus.kind === "encouragement") {
    return (
      <p className="text-sm font-semibold text-green-700">
        <span aria-hidden="true">🔥</span> {bonus.message}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-navy">{bonus.message}</p>
      <Link
        href={bonus.path}
        className="shrink-0 text-sm font-semibold text-gold-deep hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded"
      >
        Restart here &rarr;
      </Link>
    </div>
  );
}
