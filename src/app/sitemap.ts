import type { MetadataRoute } from "next";
import { class11Chapters, class12Chapters } from "@/lib/chapters";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

// Update this date when site content meaningfully changes.
const LAST_MODIFIED = new Date("2026-06-19");

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

  const chapterPages = [
    ...class11Chapters.map((ch) => `${base}/class-11/${ch.slug}/`),
    ...class12Chapters.map((ch) => `${base}/class-12/${ch.slug}/`),
  ].map((url) => ({
    url,
    lastModified: LAST_MODIFIED,
  }));

  return [...staticPages, ...chapterPages];
}
