import { describe, expect, it } from "vitest";
import { checkPageOg, chapterCoverageFailures } from "../../../scripts/lib/og-check.mjs";
import { findLegacyText, legacyStrings, normaliseBuiltText } from "@/build-checks/legacy-corpus";
import { notesRegistry } from "@/lib/notes";
import { dppRegistry } from "@/lib/dpp";

// Unit tests for the build-verification rules themselves.

const ORIGIN = "https://ajaysahuphysics.com";
const page = (og: string | null, { noindex = false, w = "1200", h = "630", twitter = og } = {}) =>
  [
    noindex ? '<meta name="robots" content="noindex, follow"/>' : "",
    og ? `<meta property="og:image" content="${og}"/>` : "",
    og ? `<meta property="og:image:width" content="${w}"/><meta property="og:image:height" content="${h}"/>` : "",
    twitter ? `<meta name="twitter:image" content="${twitter}"/>` : "",
  ].join("");
const expectedOg = new Map([["/og/class-11/kinematics.png", {}], ["/og/class-12/atoms.png", {}]]);
const check = (urlPath: string, html: string) =>
  checkPageOg({ urlPath, html, origin: ORIGIN, ogWidth: 1200, ogHeight: 630, expectedOg, resolveInternal: (p: string) => expectedOg.has(p) || p === "/og-image.png" });

describe("OG check (verify-build)", () => {
  const good = page(`${ORIGIN}/og/class-11/kinematics.png`, { noindex: true });

  it("checks NOINDEXED chapter overview and resource pages", () => {
    for (const p of ["/class-11/kinematics/", "/class-11/kinematics/pyq/"]) {
      const r = check(p, good);
      expect(r.checked).toBe(true);
      expect(r.failures).toEqual([]);
    }
    expect(check("/class-11/kinematics/", good).chapter).toEqual({ cls: "11", slug: "kinematics", resource: null });
    expect(check("/class-11/kinematics/pyq/", good).chapter).toEqual({ cls: "11", slug: "kinematics", resource: "pyq" });
  });

  it("fails a noindexed chapter page with missing, wrong or mis-sized images", () => {
    expect(check("/class-11/kinematics/", page(null, { noindex: true })).failures.join()).toMatch(/missing og:image/);
    expect(check("/class-12/atoms/notes/", page(`${ORIGIN}/og/class-11/kinematics.png`, { noindex: true })).failures.join()).toMatch(/expected the chapter image \/og\/class-12\/atoms\.png/);
    expect(check("/class-11/kinematics/", page(`${ORIGIN}/og/class-11/kinematics.png`, { noindex: true, w: "800" })).failures.join()).toMatch(/width\/height/);
    expect(check("/class-11/kinematics/", page(`${ORIGIN}/og/class-11/kinematics.png`, { noindex: true, twitter: `${ORIGIN}/x.png` })).failures.join()).toMatch(/differs/);
  });

  it("still skips other noindexed pages (e.g. the dashboard) and checks indexable ones", () => {
    expect(check("/dashboard/", page(null, { noindex: true })).checked).toBe(false);
    expect(check("/notes/", page(null)).failures.join()).toMatch(/missing og:image/);
    expect(check("/notes/", page(`${ORIGIN}/og-image.png`)).failures).toEqual([]);
  });

  it("requires every chapter's overview page to have been checked", () => {
    expect(chapterCoverageFailures(expectedOg.keys(), new Set(["11/kinematics", "12/atoms"]))).toEqual([]);
    expect(chapterCoverageFailures(expectedOg.keys(), new Set(["11/kinematics"]))).toEqual([
      "chapter page /class-12/atoms/ was not built or not checked for og:image",
    ]);
  });
});

describe("legacy-text finder (post-build leak check)", () => {
  const strings = legacyStrings();
  const noteText = notesRegistry.kinematics.sections[2].body!;
  const dppText = dppRegistry.gravitation.questions[4].question;

  it("finds legacy prose in plain, HTML-escaped and RSC-encoded text", () => {
    expect(findLegacyText(`<p>${noteText}</p>`, strings).length).toBeGreaterThan(0);
    const escaped = dppText.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");
    expect(findLegacyText(`<div>${escaped}</div>`, strings).length).toBeGreaterThan(0);
    expect(findLegacyText(`self.__next_f.push([1,"${noteText.replace(/"/g, '\\"')}"])`, strings).length).toBeGreaterThan(0);
  });

  it("ignores chapter names and site copy", () => {
    expect(findLegacyText("System of Particles & Rotational Motion — Class 11 | Ajay Sahu Physics", strings)).toEqual([]);
    expect(findLegacyText("Notes are being rebuilt from openly licensed educational resources.", strings)).toEqual([]);
  });

  it("decodes React text markers and entities", () => {
    expect(normaliseBuiltText("a<!-- -->b &amp; c &#x27;d&#x27;")).toBe("ab & c 'd'");
  });
});
