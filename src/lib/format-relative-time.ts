/** Small, dependency-free "3h ago" style formatter, shared by every
 * dashboard section that shows a timestamp (Continue Studying, Recent
 * Activity) so the wording stays consistent. */
export function formatRelativeTime(at: number): string {
  const diffMs = Date.now() - at;
  const mins = Math.round(diffMs / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;

  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;

  const months = Math.round(days / 30);
  return `${months}mo ago`;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(t: number): number {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Categorical day-bucket label — "Today", "Yesterday", "3 days ago",
 * "Last week" — used by Revision History (M12 Task 5) to group events
 * by calendar day rather than exact elapsed time. Pure date-math, no
 * date library. */
export function relativeDayLabel(at: number, now: number = Date.now()): string {
  const diffDays = Math.round((startOfDay(now) - startOfDay(at)) / DAY_MS);

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 6) return `${diffDays} days ago`;
  if (diffDays <= 13) return "Last week";
  if (diffDays <= 29) return "This month";
  return "Older";
}
