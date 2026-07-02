import type { Difficulty, Frequency } from "@/lib/formula-sheet";

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  easy: "bg-green-50 text-green-700 border-green-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  hard: "bg-red-50 text-red-700 border-red-200",
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap ${DIFFICULTY_STYLES[level]}`}
    >
      {DIFFICULTY_LABELS[level]}
    </span>
  );
}

const FREQUENCY_LABELS: Record<Frequency, string> = {
  "very-high": "Asked very often",
  high: "Asked often",
  medium: "Asked sometimes",
  low: "Rarely asked",
};

const FREQUENCY_STYLES: Record<Frequency, string> = {
  "very-high": "bg-gold/15 text-gold-deep border-gold/40",
  high: "bg-gold/10 text-gold-deep border-gold/25",
  medium: "bg-navy/5 text-navy/70 border-navy/15",
  low: "bg-navy/5 text-navy/50 border-navy/10",
};

export function FrequencyBadge({ level }: { level: Frequency }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap ${FREQUENCY_STYLES[level]}`}
    >
      {FREQUENCY_LABELS[level]}
    </span>
  );
}
