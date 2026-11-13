// ─────────────────────────────────────────────────────────────────
// Privacy-first search analytics
//
// GlobalSearch sends GA4's reserved "search" event so the built-in Site
// Search reports keep working. It must NEVER send what the student typed:
// students sometimes type names, phone numbers or other personal text
// into a search box (audit finding S-5).
//
// Instead of the raw query, search_term carries the slug of the top
// matching chapter (a value from the site's own chapter list, never user
// input), or "no_results". Together with result_count and a coarse
// query-length bucket, that still shows which chapters students look for
// and how well search serves them.
// ─────────────────────────────────────────────────────────────────

export type QueryLengthBucket = "1-3" | "4-10" | "11+";

export type SearchEventParams = {
  /** Top result's chapter slug, or "no_results". Never the typed query. */
  search_term: string;
  result_count: number;
  query_length_bucket: QueryLengthBucket;
};

function lengthBucket(length: number): QueryLengthBucket {
  if (length <= 3) return "1-3";
  if (length <= 10) return "4-10";
  return "11+";
}

/**
 * Builds the GA4 "search" event parameters. `query` is used ONLY for its
 * length; its text is never included in the result.
 */
export function searchEventParams(
  query: string,
  topResultSlug: string | undefined,
  resultCount: number
): SearchEventParams {
  return {
    search_term: topResultSlug ?? "no_results",
    result_count: resultCount,
    query_length_bucket: lengthBucket(query.trim().length),
  };
}
