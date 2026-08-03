// ─────────────────────────────────────────────────────────────────
// Lightweight fuzzy text matching (no dependencies)
//
// Adds typo tolerance and match highlighting on top of GlobalSearch's
// existing substring-based relevance scoring, without pulling in a
// fuzzy-search library. Three tiers, tried in order:
//
//   1. Substring match     — exact contiguous match (unchanged from
//                             the original scoring: start-of-text
//                             beats mid-text).
//   2. Word-level typo match — a whole word within 1-2 edits of the
//                             query (handles "kinamatics" matching
//                             "Kinematics").
//   3. Subsequence match   — query's characters appear in order, not
//                             necessarily contiguous (handles a single
//                             missed letter, e.g. "kinmatics").
//
// Both `text` and `query` should be pre-lowercased by the caller —
// this module does no locale-aware casing itself.
// ─────────────────────────────────────────────────────────────────

export type MatchResult = {
  matched: boolean;
  /** Higher is better. Exact/start-of-text substring scores highest,
   * subsequence fallback lowest. Comparable across calls. */
  score: number;
  /** [start, end) ranges into `text` to highlight, merged and sorted. */
  ranges: [number, number][];
};

const NO_MATCH: MatchResult = { matched: false, score: 0, ranges: [] };

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let prev = new Array(b.length + 1);
  let curr = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

function mergeRanges(ranges: [number, number][]): [number, number][] {
  if (ranges.length === 0) return [];
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    const [start, end] = sorted[i];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

/** Max edit distance tolerated for a word-level typo match, scaled to
 * query length so short queries ("ac") don't fuzzy-match everything. */
function typoThreshold(queryLength: number): number {
  if (queryLength <= 3) return 0; // too short to safely fuzzy-match
  if (queryLength <= 6) return 1;
  return 2;
}

/** Every character of `query` appears in `text`, in order, not
 * necessarily contiguous. Greedy earliest-match — sufficient for the
 * short queries a search box gets. */
function subsequenceMatch(text: string, query: string): MatchResult {
  const ranges: [number, number][] = [];
  let ti = 0;
  for (const ch of query) {
    const found = text.indexOf(ch, ti);
    if (found === -1) return NO_MATCH;
    ranges.push([found, found + 1]);
    ti = found + 1;
  }
  return { matched: true, score: 0.3, ranges: mergeRanges(ranges) };
}

export function matchQuery(text: string, query: string): MatchResult {
  if (!query) return NO_MATCH;

  // Tier 1 — substring (the original GlobalSearch scoring, unchanged).
  const idx = text.indexOf(query);
  if (idx !== -1) {
    const score = idx === 0 ? 2 : 1;
    return { matched: true, score, ranges: [[idx, idx + query.length]] };
  }

  // Tier 2 — word-level typo tolerance.
  const threshold = typoThreshold(query.length);
  if (threshold > 0) {
    let offset = 0;
    for (const word of text.split(/\s+/)) {
      const start = text.indexOf(word, offset);
      if (start === -1) continue;
      offset = start + word.length;
      if (Math.abs(word.length - query.length) <= threshold) {
        const dist = levenshtein(word, query);
        if (dist > 0 && dist <= threshold) {
          return { matched: true, score: 0.6, ranges: [[start, start + word.length]] };
        }
      }
    }
  }

  // Tier 3 — subsequence match, last resort, lowest confidence.
  if (query.length >= 2) {
    return subsequenceMatch(text, query);
  }

  return NO_MATCH;
}
