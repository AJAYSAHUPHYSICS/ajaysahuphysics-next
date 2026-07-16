/** Plain server-rendered badge — no client JS, computed from build-time content. */
export default function ReadingTimeBadge({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate/70">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
      {minutes} min read
    </span>
  );
}
