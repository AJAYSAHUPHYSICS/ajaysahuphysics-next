import type { ActivityEvent } from "@/lib/activity-log";
import EmptyState from "./EmptyState";

/** Plain, no client JS — receives the last-7-days slice of the
 * activity log, already filtered by filterLastDays() in DashboardClient. */
export default function WeeklyProgress({ events }: { events: ActivityEvent[] }) {
  const resourcesCompleted = events.filter((e) => e.type === "resource-completed").length;
  const revisionsCompleted = events.filter((e) => e.type === "revision-completed").length;
  const chaptersVisited = new Set(
    events.filter((e) => e.type === "chapter-visited").map((e) => `${e.cls}:${e.slug}`)
  ).size;

  const hasActivity = resourcesCompleted > 0 || revisionsCompleted > 0 || chaptersVisited > 0;

  if (!hasActivity) {
    return (
      <EmptyState
        icon="clock"
        title="No activity in the last 7 days"
        description="Study activity from the past week — resources completed, revisions, chapters visited — will show up here."
        actionLabel="Browse chapters"
        actionHref="#all-chapters"
      />
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <Stat value={resourcesCompleted} label="Resources completed" />
      <Stat value={revisionsCompleted} label="Revisions completed" />
      <Stat value={chaptersVisited} label="Chapters visited" />
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-3xl font-display text-navy">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate/60 mt-1">{label}</p>
    </div>
  );
}
