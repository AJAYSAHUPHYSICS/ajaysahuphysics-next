import type { Milestone } from "@/lib/milestones";

/** Plain, no client JS — receives an already-computed milestone list. */
export default function MilestonesCard({ milestones }: { milestones: Milestone[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {milestones.map((m) => (
        <li
          key={m.id}
          className={`rounded-md border px-3 py-3.5 text-center ${
            m.achieved ? "border-gold/40 bg-gold/5" : "border-navy/10 bg-white"
          }`}
        >
          <span aria-hidden="true" className={`block text-xl mb-1 ${m.achieved ? "" : "opacity-30 grayscale"}`}>
            &#127942;
          </span>
          <span className={`block text-xs font-semibold ${m.achieved ? "text-navy" : "text-slate/50"}`}>
            {m.label}
          </span>
          <span className="sr-only">{m.achieved ? " — achieved" : " — not yet achieved"}</span>
        </li>
      ))}
    </ul>
  );
}
