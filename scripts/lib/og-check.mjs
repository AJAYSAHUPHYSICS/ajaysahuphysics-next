// ─────────────────────────────────────────────────────────────────
// Open Graph checks for one built page (used by verify-build.mjs).
//
// Chapter pages (/class-{11,12}/{slug}/ and every chapter resource page)
// are ALWAYS checked, whether or not they are noindexed: while learning
// content is being rebuilt those pages are noindex, but students still
// share them, so their social previews must stay correct. Other pages
// are checked only when indexable.
//
// Node built-ins only; kept separate so the rules can be unit-tested.
// ─────────────────────────────────────────────────────────────────

export const CHAPTER_PAGE = /^\/class-(11|12)\/([a-z0-9-]+)\/(?:([a-z0-9-]+)\/)?$/;

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");
}

export function metaContent(html, key) {
  const m = html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`));
  return m ? decodeEntities(m[1]) : null;
}

export function isNoindex(html) {
  return /<meta name="robots" content="[^"]*noindex/.test(html);
}

/**
 * @param {{ urlPath: string, html: string, origin: string, ogWidth: number, ogHeight: number,
 *           expectedOg: Map<string, unknown>, resolveInternal: (p: string) => unknown }} p
 * @returns {{ checked: boolean, chapter: { cls: string, slug: string, resource: string | null } | null, failures: string[] }}
 */
export function checkPageOg({ urlPath, html, origin, ogWidth, ogHeight, expectedOg, resolveInternal }) {
  const failures = [];
  const m = urlPath.match(CHAPTER_PAGE);
  const chapter = m ? { cls: m[1], slug: m[2], resource: m[3] ?? null } : null;
  if (!chapter && isNoindex(html)) return { checked: false, chapter, failures };

  const og = metaContent(html, "og:image");
  const tw = metaContent(html, "twitter:image");
  if (!og) {
    failures.push(`${urlPath}: missing og:image`);
    return { checked: true, chapter, failures };
  }
  if (!tw) failures.push(`${urlPath}: missing twitter:image`);
  else if (tw !== og) failures.push(`${urlPath}: twitter:image (${tw}) differs from og:image (${og})`);
  if (!og.startsWith(origin + "/")) {
    failures.push(`${urlPath}: og:image not on ${origin}: ${og}`);
    return { checked: true, chapter, failures };
  }
  const imgPath = og.slice(origin.length);
  if (!resolveInternal(imgPath)) failures.push(`${urlPath}: og:image points to a missing file ${imgPath}`);
  if (chapter) {
    const expected = `/og/class-${chapter.cls}/${chapter.slug}.png`;
    if (imgPath !== expected) failures.push(`${urlPath}: og:image ${imgPath}, expected the chapter image ${expected}`);
    if (!expectedOg.has(expected)) failures.push(`${urlPath}: no sources.json entry for ${expected}`);
    if (metaContent(html, "og:image:width") !== String(ogWidth) || metaContent(html, "og:image:height") !== String(ogHeight)) {
      failures.push(`${urlPath}: og:image:width/height should be ${ogWidth}/${ogHeight}`);
    }
  }
  return { checked: true, chapter, failures };
}

/**
 * Every chapter that has an OG image must have its overview page built and
 * checked; returns one failure per chapter that wasn't.
 * @param {Iterable<string>} expectedOgPaths  e.g. "/og/class-11/kinematics.png"
 * @param {Set<string>} checkedOverviews       e.g. "11/kinematics"
 */
export function chapterCoverageFailures(expectedOgPaths, checkedOverviews) {
  const failures = [];
  for (const p of expectedOgPaths) {
    const m = p.match(/^\/og\/class-(11|12)\/([a-z0-9-]+)\.png$/);
    if (!m) continue;
    if (!checkedOverviews.has(`${m[1]}/${m[2]}`)) failures.push(`chapter page /class-${m[1]}/${m[2]}/ was not built or not checked for og:image`);
  }
  return failures;
}
