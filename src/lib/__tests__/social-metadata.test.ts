import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { allChapters } from "@/lib/chapters";
import { siteConfig } from "@/lib/site-config";
import { chapterOgImagePath, chapterSocialMetadata, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/social-metadata";

const ROOT = path.resolve(__dirname, "..", "..", "..");
type Source = {
  class: "11" | "12"; slug: string; chapter: string; license: string; licenseUrl: string | null;
  attributionRequired: boolean; author: string; sourcePage: string; original: string; sha256: string;
  derived: string | null; imageCredit: string | null; output: string; modifications: string[];
};
const sources: Source[] = JSON.parse(readFileSync(path.join(ROOT, "assets/og-sources/sources.json"), "utf8"));

function pngSize(file: string) {
  const buf = readFileSync(file);
  return { png: buf.subarray(1, 4).toString("ascii") === "PNG", width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), bytes: buf.length };
}

describe("chapterSocialMetadata", () => {
  const meta = chapterSocialMetadata({
    cls: "11", slug: "kinematics", chapterName: "Kinematics",
    title: "Kinematics — Class 11", description: "desc", path: "/class-11/kinematics",
  });

  it("keeps the page's own title, description and URL", () => {
    expect(meta.openGraph).toMatchObject({ title: "Kinematics — Class 11", description: "desc", url: "/class-11/kinematics", type: "article" });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", title: "Kinematics — Class 11", description: "desc" });
  });

  it("restores the site name and locale the root layout uses", () => {
    expect(meta.openGraph).toMatchObject({ siteName: siteConfig.name, locale: "en_IN" });
  });

  it("points og:image and twitter:image at the chapter image", () => {
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({ url: "/og/class-11/kinematics.png", width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT }),
    ]);
    expect(meta.twitter?.images).toEqual(["/og/class-11/kinematics.png"]);
  });

  it("builds image paths per class", () => {
    expect(chapterOgImagePath("12", "atoms")).toBe("/og/class-12/atoms.png");
  });
});

describe("Open Graph image assets", () => {
  it("has exactly one source entry per chapter", () => {
    const expected = allChapters.map((c) => `${c.cls}:${c.slug}`).sort();
    expect(sources.map((s) => `${s.class}:${s.slug}`).sort()).toEqual(expected);
  });

  it.each(allChapters.map((c) => [`class ${c.cls} ${c.slug}`, c] as const))("%s has a 1200 × 630 PNG under 300 KB", (_label, c) => {
    const file = path.join(ROOT, "public", chapterOgImagePath(c.cls, c.slug));
    expect(existsSync(file)).toBe(true);
    const info = pngSize(file);
    expect(info).toMatchObject({ png: true, width: 1200, height: 630 });
    expect(info.bytes).toBeLessThan(300 * 1024);
  });

  it.each(sources.map((s) => [s.slug, s] as const))("%s: original is unmodified and the record is complete", (_slug, s) => {
    const buf = readFileSync(path.join(ROOT, "assets/og-sources/originals", s.original));
    expect(createHash("sha256").update(buf).digest("hex")).toBe(s.sha256);
    if (s.derived) expect(existsSync(path.join(ROOT, "assets/og-sources/derived", s.derived))).toBe(true);
    expect(s.output).toBe(`public/og/class-${s.class}/${s.slug}.png`);
    expect(s.author.length).toBeGreaterThan(0);
    expect(s.sourcePage).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    expect(s.modifications.length).toBeGreaterThan(0);
  });

  it("credits every illustration in docs/ASSET_CREDITS.md", () => {
    const credits = readFileSync(path.join(ROOT, "docs/ASSET_CREDITS.md"), "utf8");
    for (const s of sources) {
      expect(credits).toContain(s.sourcePage);
      if (s.imageCredit) expect(credits).toContain(s.imageCredit);
    }
  });

  it("uses only approved licences, with credit lines exactly where CC BY requires them", () => {
    for (const s of sources) {
      expect(["Public domain", "CC0", "CC BY 2.5", "CC BY 3.0", "CC BY 4.0"]).toContain(s.license);
      const ccBy = s.license.startsWith("CC BY");
      expect(s.attributionRequired).toBe(ccBy);
      expect(Boolean(s.imageCredit)).toBe(ccBy);
      if (ccBy) {
        expect(s.licenseUrl).toMatch(/^https:\/\/creativecommons\.org\/licenses\/by\//);
        expect(s.imageCredit).toContain(s.license);
      }
    }
    expect(sources.filter((s) => s.attributionRequired).map((s) => s.slug).sort()).toEqual(
      ["circular-motion", "dual-nature-of-radiation-and-matter", "magnetism-and-matter", "physical-world-and-measurement"]
    );
  });
});
