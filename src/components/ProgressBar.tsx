/**
 * Plain presentational progress bar — no "use client" needed, so it
 * can be rendered from server or client components alike. Colour
 * follows the same green-for-correct/complete convention already used
 * for DPP/PYQ answer states and the difficulty badges.
 */
export default function ProgressBar({
  percent,
  size = "md",
  label,
}: {
  percent: number;
  size?: "sm" | "md";
  /** Accessible label, e.g. "Kinematics completion" — falls back to a generic one. */
  label?: string;
}) {
  const clamped = Math.min(100, Math.max(0, Math.round(percent)));
  const height = size === "sm" ? "h-1.5" : "h-2.5";
  const barColor = clamped >= 100 ? "bg-green-600" : "bg-gold";

  return (
    <div
      role="progressbar"
      aria-label={label ?? "Completion"}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full ${height} rounded-full bg-navy/10 overflow-hidden`}
    >
      <div
        className={`h-full ${barColor} rounded-full transition-[width] duration-300 ease-out`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
