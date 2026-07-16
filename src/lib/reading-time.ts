// ─────────────────────────────────────────────────────────────────
// Reading Time Estimate
//
// Pure function over text already present in a chapter's content
// objects (notes, short notes, formula sheets) — computed at build
// time on the server, so it costs zero client JS or hydration.
// ─────────────────────────────────────────────────────────────────

/** Conservative pace for technical/exam content — slower than casual
 * reading, since formulas, units, and terms need more attention than
 * plain prose. */
const WORDS_PER_MINUTE = 160;

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Estimated minutes to read the given text fragments, rounded up to
 * the nearest minute with a floor of 1. Accepts strings, arrays of
 * strings, or nested arrays so callers can pass content fields as-is. */
export function estimateReadingMinutes(
  ...fragments: Array<string | string[] | undefined | null>
): number {
  const words = fragments
    .flat()
    .filter((t): t is string => typeof t === "string" && t.trim().length > 0)
    .reduce((total, t) => total + wordCount(t), 0);

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
