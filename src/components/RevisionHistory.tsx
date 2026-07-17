import { relativeDayLabel } from "@/lib/format-relative-time";
import type { ActivityEvent } from "@/lib/activity-log";
import EmptyState from "./EmptyState";

/** Plain, no client JS — takes the already-read activity log as a prop
 * (DashboardClient reads it once, this and Today's Activity both derive
 * from that single read) rather than subscribing itself. */
export default function RevisionHistory({ log }: { log: ActivityEvent[] }) {
  const revisions = log
    .filter((e) => e.type === "revision-completed")
    .sort((a, b) => b.at - a.at)
    .slice(0, 12);

  if (revisions.length === 0) {
    return (
      <EmptyState
        icon="revision"
        title="No revision history yet"
        description="Mark a revision round complete on any chapter and it'll show up here, grouped by when you revised it."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  const groups: { label: string; events: ActivityEvent[] }[] = [];
  for (const event of revisions) {
    const label = relativeDayLabel(event.at);
    const group = groups.find((g) => g.label === label);
    if (group) group.events.push(event);
    else groups.push({ label, events: [event] });
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate/60 mb-2">{group.label}</p>
          <ul className="space-y-1.5">
            {group.events.map((event, i) => (
              <li key={`${event.slug}-${event.at}-${i}`} className="text-sm text-navy">
                <span className="font-semibold">{event.label}</span>
                <span className="text-slate/60"> &middot; chapter revised (Class {event.cls})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
