#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────
// verify-build.mjs: regression checks for the static export in ./out
//
// Run AFTER `npm run build`:
//   node scripts/verify-build.mjs                    # verify against baseline
//   node scripts/verify-build.mjs --update-baseline  # deliberately accept changes
//   node scripts/verify-build.mjs --out <dir>        # verify another directory
//
// Uses only Node built-ins (no dependencies), so it behaves the same
// locally and in CI. Exit code 0 = all checks passed, 1 = failure.
//
// What it protects (see IMPLEMENTATION_PLAN.md, working agreement §0):
//   1. URL preservation: every page in the baseline must still be built.
//   2. Sitemap: every baseline URL must still be listed; every listed
//      URL must resolve to a built page; nothing noindexed is listed;
//      every indexable page is listed.
//   3. robots.txt is unchanged.
//   4. <title> and canonical URL of every baseline page are unchanged,
//      and every canonical is absolute, on the production origin,
//      ends in "/", and points at the page itself.
//   5. Every internal link (href="/...") resolves to a built file,
//      except entries recorded in scripts/baseline/known-issues.json.
//      A known issue that has been fixed must be removed from that
//      file, so the record of open issues stays accurate.
//   6. Open Graph images: every chapter image listed in
//      assets/og-sources/sources.json exists in the build as a valid PNG,
//      exactly 1200 × 630 and under 300 KB; every indexable page has
//      og:image and twitter:image on the production origin pointing to a
//      file that exists; every chapter and chapter-resource page uses its
//      own chapter's image; and the homepage's social meta tags are
//      byte-for-byte unchanged from scripts/baseline/home-social.txt.
//
// Changing the baseline is intentional: run with --update-baseline and
// commit the resulting diff under scripts/baseline/, so every URL,
// title or canonical change is visible in code review.
// ─────────────────────────────────────────────────────────────────

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = "https://ajaysahuphysics.com";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// --out <dir> verifies a different directory (used to test the checks
// themselves against deliberately broken copies of the build).
const outArg = process.argv.indexOf("--out");
const OUT = outArg > -1 ? path.resolve(process.argv[outArg + 1]) : path.join(ROOT, "out");
const BASELINE = path.join(ROOT, "scripts", "baseline");
const UPDATE = process.argv.includes("--update-baseline");
const IN_CI = process.env.GITHUB_ACTIONS === "true";

/** Pages that are intentionally never canonical or listed in the sitemap. */
const NOT_FOUND_PAGES = new Set(["404.html", "404/index.html", "_not-found/index.html"]);

const failures = [];
const notices = [];

function fail(check, message) {
  failures.push(`[${check}] ${message}`);
}
function notice(check, message) {
  notices.push(`[${check}] ${message}`);
}

// ── Helpers ──────────────────────────────────────────────────────

/** All files under dir, as posix paths relative to dir. */
function walk(dir, base = dir) {
  const result = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) result.push(...walk(full, base));
    else result.push(path.relative(base, full).split(path.sep).join("/"));
  }
  return result;
}

function readLines(file) {
  return readFileSync(file, "utf8")
    .split(/\r?\n/)
    .filter((line) => line.length > 0);
}

function writeLines(file, lines) {
  writeFileSync(file, lines.join("\n") + "\n");
}

/** "class-11/kinematics/index.html" → "/class-11/kinematics/" */
function pageToUrlPath(page) {
  if (page === "index.html") return "/";
  if (page.endsWith("/index.html")) return "/" + page.slice(0, -"index.html".length);
  return "/" + page;
}

/** Resolves an internal URL path to a file in out/, or null if none exists. */
function resolveInternal(urlPath) {
  let p;
  try {
    p = decodeURIComponent(urlPath.split("#")[0].split("?")[0]);
  } catch {
    return null;
  }
  if (p === "" || p === "/") return existsSync(path.join(OUT, "index.html")) ? "index.html" : null;
  const rel = p.replace(/^\/+/, "");
  const candidates = p.endsWith("/")
    ? [rel + "index.html"]
    : [rel, rel + "/index.html", rel + ".html"];
  for (const c of candidates) {
    const full = path.join(OUT, c);
    if (existsSync(full) && statSync(full).isFile()) return c;
  }
  return null;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/);
  return m ? decodeEntities(m[1]).trim() : "";
}

function extractCanonical(html) {
  const m = html.match(/<link rel="canonical" href="([^"]*)"/);
  return m ? m[1] : "";
}

function isNoindex(html) {
  return /<meta name="robots" content="[^"]*noindex/.test(html);
}

/** All og:* and twitter:* meta tags, in document order, as they appear in the HTML. */
function socialTags(html) {
  return [...html.matchAll(/<meta (?:property|name)="(?:og|twitter):[^"]+"[^>]*\/?>/g)].map((m) => m[0]);
}

function metaContent(html, key) {
  const m = html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`));
  return m ? decodeEntities(m[1]) : null;
}

/** PNG signature + IHDR dimensions, read directly from the file header. */
function pngInfo(file) {
  const buf = readFileSync(file);
  const signature = buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const ihdr = buf.subarray(12, 16).toString("ascii") === "IHDR";
  return { valid: signature && ihdr, width: ihdr ? buf.readUInt32BE(16) : 0, height: ihdr ? buf.readUInt32BE(20) : 0, bytes: buf.length };
}

const OG_W = 1200, OG_H = 630, OG_MAX_BYTES = 300 * 1024;

// ── Load build output ────────────────────────────────────────────

if (!existsSync(OUT)) {
  console.error("verify-build: ./out does not exist. Run `npm run build` first.");
  process.exit(1);
}

const allFiles = walk(OUT);
const htmlPages = allFiles.filter((f) => f.endsWith(".html")).sort();
const indexPages = htmlPages.filter((f) => f === "index.html" || f.endsWith("/index.html"));
const html = new Map(indexPages.map((p) => [p, readFileSync(path.join(OUT, p), "utf8")]));

const sitemapPath = path.join(OUT, "sitemap.xml");
const sitemapUrls = existsSync(sitemapPath)
  ? [...readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort()
  : [];
const robotsPath = path.join(OUT, "robots.txt");
const robots = existsSync(robotsPath) ? readLines(robotsPath) : [];

const meta = indexPages
  .filter((p) => !NOT_FOUND_PAGES.has(p))
  .map((p) => {
    const h = html.get(p);
    return { page: p, title: extractTitle(h), canonical: extractCanonical(h) };
  });

// ── --update-baseline: rewrite the baseline and stop ─────────────

if (UPDATE) {
  mkdirSync(BASELINE, { recursive: true });
  writeLines(path.join(BASELINE, "pages.txt"), htmlPages);
  writeLines(path.join(BASELINE, "sitemap.txt"), sitemapUrls);
  writeLines(path.join(BASELINE, "robots.txt"), robots);
  writeLines(
    path.join(BASELINE, "meta.tsv"),
    meta.map((m) => [m.page, m.title, m.canonical].join("\t"))
  );
  writeLines(path.join(BASELINE, "home-social.txt"), socialTags(html.get("index.html") ?? ""));
  console.log(
    `verify-build: baseline updated (${htmlPages.length} HTML files, ${sitemapUrls.length} sitemap URLs). ` +
      "Review and commit the diff in scripts/baseline/."
  );
  process.exit(0);
}

// ── 1. URL preservation ──────────────────────────────────────────

const baselinePages = readLines(path.join(BASELINE, "pages.txt"));
const builtPageSet = new Set(htmlPages);
for (const page of baselinePages) {
  if (!builtPageSet.has(page)) fail("urls", `page missing from build: ${page} (${pageToUrlPath(page)})`);
}
const baselinePageSet = new Set(baselinePages);
for (const page of htmlPages) {
  if (!baselinePageSet.has(page)) notice("urls", `new page (not in baseline): ${pageToUrlPath(page)}`);
}

// ── 2. Sitemap ───────────────────────────────────────────────────

if (sitemapUrls.length === 0) fail("sitemap", "out/sitemap.xml missing or empty");
const sitemapSet = new Set(sitemapUrls);
for (const url of readLines(path.join(BASELINE, "sitemap.txt"))) {
  if (!sitemapSet.has(url)) fail("sitemap", `URL dropped from sitemap: ${url}`);
}
const baselineSitemap = new Set(readLines(path.join(BASELINE, "sitemap.txt")));
for (const url of sitemapUrls) {
  if (!baselineSitemap.has(url)) notice("sitemap", `new sitemap URL: ${url}`);
  if (!url.startsWith(ORIGIN + "/")) {
    fail("sitemap", `URL not on ${ORIGIN}: ${url}`);
    continue;
  }
  if (!url.endsWith("/")) fail("sitemap", `URL missing trailing slash: ${url}`);
  const page = resolveInternal(url.slice(ORIGIN.length));
  if (!page) fail("sitemap", `URL has no built page: ${url}`);
  else if (html.has(page) && isNoindex(html.get(page))) fail("sitemap", `noindex page listed in sitemap: ${url}`);
}
for (const [page, h] of html) {
  if (NOT_FOUND_PAGES.has(page) || isNoindex(h)) continue;
  const url = ORIGIN + pageToUrlPath(page);
  if (!sitemapSet.has(url)) fail("sitemap", `indexable page not in sitemap: ${url}`);
}

// ── 3. robots.txt ────────────────────────────────────────────────

const baselineRobots = readLines(path.join(BASELINE, "robots.txt"));
if (robots.join("\n") !== baselineRobots.join("\n")) {
  fail("robots", `robots.txt changed.\n  expected: ${baselineRobots.join(" | ")}\n  actual:   ${robots.join(" | ")}`);
}

// ── 4. Titles and canonicals ─────────────────────────────────────

const baselineMeta = new Map(
  readLines(path.join(BASELINE, "meta.tsv")).map((line) => {
    const [page, title, canonical] = line.split("\t");
    return [page, { title, canonical }];
  })
);
for (const m of meta) {
  const expectedSelf = ORIGIN + pageToUrlPath(m.page);
  if (!m.title) fail("meta", `${pageToUrlPath(m.page)}: empty or missing <title>`);
  if (!m.canonical) fail("meta", `${pageToUrlPath(m.page)}: missing canonical`);
  else if (m.canonical !== expectedSelf) {
    fail("meta", `${pageToUrlPath(m.page)}: canonical ${m.canonical} does not point at the page itself (${expectedSelf})`);
  }
  const base = baselineMeta.get(m.page);
  if (!base) continue;
  if (base.title !== m.title) {
    fail("meta", `${pageToUrlPath(m.page)}: title changed\n  expected: ${base.title}\n  actual:   ${m.title}`);
  }
  if (base.canonical !== m.canonical) {
    fail("meta", `${pageToUrlPath(m.page)}: canonical changed\n  expected: ${base.canonical}\n  actual:   ${m.canonical}`);
  }
}

// ── 5. Internal links ────────────────────────────────────────────

const knownIssuesPath = path.join(BASELINE, "known-issues.json");
const knownIssues = existsSync(knownIssuesPath) ? JSON.parse(readFileSync(knownIssuesPath, "utf8")) : {};
const knownBroken = new Map((knownIssues.brokenLinks ?? []).map((k) => [k.href, k]));
const brokenSeen = new Map(); // href → first page it appears on

for (const [page, h] of html) {
  for (const m of h.matchAll(/href="(\/[^"]*)"/g)) {
    const href = decodeEntities(m[1]);
    if (href.startsWith("//") || href.startsWith("/_next/")) continue;
    if (resolveInternal(href)) continue;
    if (!brokenSeen.has(href)) brokenSeen.set(href, pageToUrlPath(page));
  }
}
for (const [href, firstPage] of brokenSeen) {
  if (knownBroken.has(href)) notice("links", `known broken link (${knownBroken.get(href).tracking}): ${href}`);
  else fail("links", `broken internal link ${href} (first seen on ${firstPage})`);
}
for (const href of knownBroken.keys()) {
  if (!brokenSeen.has(href)) {
    fail("links", `known issue is resolved: ${href}. Remove it from scripts/baseline/known-issues.json`);
  }
}

// ── 6. Open Graph images ─────────────────────────────────────────

const sourcesPath = path.join(ROOT, "assets", "og-sources", "sources.json");
const ogSources = existsSync(sourcesPath) ? JSON.parse(readFileSync(sourcesPath, "utf8")) : [];
if (ogSources.length === 0) fail("og", "assets/og-sources/sources.json missing or empty");

// 6a. Every expected chapter image is in the build and meets the format rules.
const expectedOg = new Map(); // "/og/class-11/kinematics.png" -> entry
for (const s of ogSources) {
  const urlPath = "/" + s.output.replace(/^public\//, "");
  expectedOg.set(urlPath, s);
  const file = path.join(OUT, urlPath);
  if (!existsSync(file)) { fail("og", `missing OG image ${urlPath}`); continue; }
  const info = pngInfo(file);
  if (!info.valid) fail("og", `${urlPath} is not a valid PNG`);
  else if (info.width !== OG_W || info.height !== OG_H) fail("og", `${urlPath} is ${info.width}×${info.height}, expected ${OG_W}×${OG_H}`);
  if (info.bytes >= OG_MAX_BYTES) fail("og", `${urlPath} is ${info.bytes} B, must be under ${OG_MAX_BYTES} B`);
}

// 6b. Every indexable page has og:image + twitter:image that resolve; chapter pages use their own image.
let chapterPagesChecked = 0;
for (const [page, h] of html) {
  if (NOT_FOUND_PAGES.has(page) || isNoindex(h)) continue;
  const urlPath = pageToUrlPath(page);
  const og = metaContent(h, "og:image");
  const tw = metaContent(h, "twitter:image");
  if (!og) { fail("og", `${urlPath}: missing og:image`); continue; }
  if (!tw) fail("og", `${urlPath}: missing twitter:image`);
  else if (tw !== og) fail("og", `${urlPath}: twitter:image (${tw}) differs from og:image (${og})`);
  if (!og.startsWith(ORIGIN + "/")) { fail("og", `${urlPath}: og:image not on ${ORIGIN}: ${og}`); continue; }
  const imgPath = og.slice(ORIGIN.length);
  if (!resolveInternal(imgPath)) fail("og", `${urlPath}: og:image points to a missing file ${imgPath}`);
  const chapter = urlPath.match(/^\/class-(11|12)\/([a-z0-9-]+)\//);
  if (chapter) {
    chapterPagesChecked++;
    const expected = `/og/class-${chapter[1]}/${chapter[2]}.png`;
    if (imgPath !== expected) fail("og", `${urlPath}: og:image ${imgPath}, expected the chapter image ${expected}`);
    if (!expectedOg.has(expected)) fail("og", `${urlPath}: no sources.json entry for ${expected}`);
    if (metaContent(h, "og:image:width") !== String(OG_W) || metaContent(h, "og:image:height") !== String(OG_H)) {
      fail("og", `${urlPath}: og:image:width/height should be ${OG_W}/${OG_H}`);
    }
  }
}

// 6c. Homepage social tags unchanged.
const homeBaselinePath = path.join(BASELINE, "home-social.txt");
if (!existsSync(homeBaselinePath)) fail("og", "scripts/baseline/home-social.txt missing");
else {
  const expectedHome = readLines(homeBaselinePath);
  const actualHome = socialTags(html.get("index.html") ?? "");
  if (expectedHome.join("\n") !== actualHome.join("\n")) {
    fail("og", `homepage social meta tags changed\n  expected: ${expectedHome.join(" ")}\n  actual:   ${actualHome.join(" ")}`);
  }
}

// ── Report ───────────────────────────────────────────────────────

console.log(
  `verify-build: ${htmlPages.length} HTML files (${indexPages.length} pages), ` +
    `${sitemapUrls.length} sitemap URLs, ${brokenSeen.size} broken internal link(s) ` +
    `(${[...brokenSeen.keys()].filter((h) => knownBroken.has(h)).length} known), ` +
    `${expectedOg.size} OG images, ${chapterPagesChecked} chapter pages checked for og:image.`
);
for (const n of notices) console.log(`  note  ${n}`);
if (failures.length > 0) {
  for (const f of failures) {
    console.error(`  FAIL  ${f}`);
    if (IN_CI) console.log(`::error title=verify-build::${f.replace(/\n/g, "%0A")}`);
  }
  console.error(`verify-build: ${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log("verify-build: all checks passed.");
