import type { Achievement } from "@/lib/achievements";

/** Plain, no client JS — receives an already-computed achievement list.
 * Same grid/badge pattern as MilestonesCard.tsx, kept as a distinct
 * component since M16's achievement set is a separate, named list
 * from M13's Milestones. */
export default function AchievementsCard({ achievements }: { achievements: Achievement[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {achievements.map((a) => (
        <li
          key={a.id}
          className={`rounded-md border px-3 py-3.5 text-center ${
            a.achieved ? "border-gold/40 bg-gold/5" : "border-navy/10 bg-white"
          }`}
        >
          <span aria-hidden="true" className={`block text-xl mb-1 ${a.achieved ? "" : "opacity-30 grayscale"}`}>
            &#127894;
          </span>
          <span className={`block text-xs font-semibold ${a.achieved ? "text-navy" : "text-slate/50"}`}>
            {a.label}
          </span>
          <span className="sr-only">{a.achieved ? " — achieved" : " — not yet achieved"}</span>
        </li>
      ))}
    </ul>
  );
}
