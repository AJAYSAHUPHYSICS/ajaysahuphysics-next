import type { MetadataRoute } from "next";
import { class11Chapters, class12Chapters, type Chapter } from "@/lib/chapters";
import { siteConfig } from "@/lib/site-config";
import { RESOURCE_ORDER, resourceRegistry } from "@/lib/resource-registry";

export const dynamic = "force-static";

// Computed once at build time (this route is `force-static`, so this runs
// during `next build`, not per-request — no runtime fetching involved).
// This replaces a hand-maintained hardcoded date that reliably went stale
// between deploys; a build-time timestamp instead reflects the actual date
// of the last production deployment automatically, with no upkeep required.
const LAST_MODIFIED = new Date();

function chapterResourceUrls(base: string, chapters: Chapter[]) {
  return chapters.flatMap((ch) => {
    const overviewUrl = `${base}/class-${ch.cls}/${ch.slug}/`;
    const resourceUrls = RESOURCE_ORDER.filter((key) =>
      resourceRegistry[key].hasData(ch.slug)
    ).map((key) => `${base}/class-${ch.cls}/${ch.slug}/${key}/`);
    return [overviewUrl, ...resourceUrls];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages = [
    "",
    "about",
    "contact",
    "blog",
    "notes",
    "formula-sheet",
    "dpp",
    "pyq",
    "videos",
    "class-11",
    "class-12",
    "jee",
    "neet",
  ].map((path) => ({
    url: `${base}/${path}`.replace(/\/$/, "") + "/",
    lastModified: LAST_MODIFIED,
  }));

  // Every chapter's Overview page, plus one entry per resource that
  // actually has content (Notes, Formula Sheet, DPP, PYQ, ...) — this is
  // the fix for the SEO architecture gap: every crawlable resource route
  // now gets its own sitemap entry instead of being hidden behind a
  // client-side tab on the Overview page.
  const chapterPages = [
    ...chapterResourceUrls(base, class11Chapters),
    ...chapterResourceUrls(base, class12Chapters),
  ].map((url) => ({
    url,
    lastModified: LAST_MODIFIED,
  }));

  return [...staticPages, ...chapterPages];
}
