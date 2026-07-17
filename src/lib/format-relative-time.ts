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
