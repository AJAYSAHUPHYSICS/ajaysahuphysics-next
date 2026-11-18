import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { findLegacyText, legacyStrings, normaliseBuiltText } from "./legacy-corpus";
import { APPROVED_SITE_OG_DESCRIPTION, HUB_PAGES, availabilityClaims } from "./hub-claims";
import { REBUILT_PACKAGES } from "@/lib/content-v2/rebuilt-packages";

// ─────────────────────────────────────────────────────────────────
// Post-build check: no withheld legacy learning content in the static
// export. Runs in CI AFTER `npm run build` (npm run test:build-output);
// it FAILS, rather than skipping, when there is no build to check.
//
// Scans every HTML page, RSC payload (.txt), script, JSON and XML file in
// out/ for any legacy prose, and checks that no PDF is shipped at all.
// ─────────────────────────────────────────────────────────────────

const OUT = path.resolve(__dirname, "..", "..", process.env.ATLAS_OUT_DIR ?? "out");

function files(): string[] {
  return readdirSync(OUT, { recursive: true, encoding: "utf8" })
    .map((f) => path.join(OUT, f))
    .filter((f) => statSync(f).isFile());
}

describe("static export: legacy content withheld", () => {
  it("a production build exists to check", () => {
    expect(existsSync(path.join(OUT, "index.html")), `no build found in ${OUT}; run npm run build first`).toBe(true);
  });

  it("ships no PDF", () => {
    expect(files().filter((f) => f.toLowerCase().endsWith(".pdf"))).toEqual([]);
  });

  it("no page, payload or script contains legacy learning text", () => {
    const strings = legacyStrings();
    expect(strings.length).toBeGreaterThan(5000);
    const leaks: string[] = [];
    const scanned = files().filter((f) => /\.(html|txt|js|json|xml)$/.test(f));
    expect(scanned.length).toBeGreaterThan(200);
    for (const f of scanned) {
      for (const hit of findLegacyText(readFileSync(f, "utf8"), strings)) leaks.push(`${path.relative(OUT, f)} ← ${hit}`);
    }
    expect(leaks.slice(0, 20)).toEqual([]);
  }, 600_000);

  it("no unpublished registered package content is exposed", () => {
    // Packages registered in the public repository (none today) that are not
    // servable must not appear anywhere in the export.
    const strings: { source: string; text: string }[] = [];
    for (const pkg of Object.values(REBUILT_PACKAGES)) {
      const walk = (v: unknown) => {
        if (typeof v === "string") {
          if (v.length >= 60 && (v.match(/ /g) ?? []).length >= 3) strings.push({ source: `package:${pkg.id}`, text: v.slice(0, 60) });
        } else if (Array.isArray(v)) v.forEach(walk);
        else if (v && typeof v === "object") Object.values(v).forEach(walk);
      };
      walk(pkg);
    }
    const exposed: string[] = [];
    if (strings.length > 0) {
      for (const f of files().filter((x) => /\.(html|txt|js|json|xml)$/.test(x))) {
        for (const hit of findLegacyText(readFileSync(f, "utf8"), strings)) exposed.push(`${path.relative(OUT, f)} ← ${hit}`);
      }
    }
    expect(exposed.slice(0, 20)).toEqual([]);
  }, 600_000);

  // Local-only: real drafts live OUTSIDE this public repository. When
  // ATLAS_PRIVATE_DRAFTS_DIR points at that private folder, string literals
  // are read directly from the private .ts files (nothing is imported) and
  // the export is scanned for them. Skipped in CI, where no drafts exist.
  const PRIVATE_DIR = process.env.ATLAS_PRIVATE_DRAFTS_DIR;
  it.skipIf(!PRIVATE_DIR || !existsSync(PRIVATE_DIR))("no private draft text is exposed (local scan of the private store)", () => {
    const tsFiles = readdirSync(PRIVATE_DIR!, { recursive: true, encoding: "utf8" })
      .map((f) => path.join(PRIVATE_DIR!, f))
      .filter((f) => /\.(ts|mjs)$/.test(f) && statSync(f).isFile());
    const strings: { source: string; text: string }[] = [];
    for (const f of tsFiles) {
      for (const m of readFileSync(f, "utf8").matchAll(/"((?:[^"\\]|\\.){60,})"/g)) {
        if ((m[1].match(/ /g) ?? []).length >= 3) strings.push({ source: `private:${path.basename(f)}`, text: m[1].slice(0, 60) });
      }
    }
    expect(strings.length).toBeGreaterThan(50);
    const exposed: string[] = [];
    for (const f of files().filter((x) => /\.(html|txt|js|json|xml|map)$/.test(x))) {
      for (const hit of findLegacyText(readFileSync(f, "utf8"), strings)) exposed.push(`${path.relative(OUT, f)} ← ${hit}`);
    }
    expect(exposed.slice(0, 20)).toEqual([]);
  }, 600_000);

  it("no draft diagram is shipped", () => {
    const shipped = files().filter((f) => /si-base-units|dimensional-formula|vernier-scale|micrometer|measurement-errors|significant-figures/.test(f));
    expect(shipped).toEqual([]);
    for (const f of files().filter((x) => /\.(html|txt|js)$/.test(x))) {
      expect(readFileSync(f, "utf8"), path.relative(OUT, f)).not.toContain("AjaySahuPhysics (draft)");
    }
  });

  it("the homepage and hub pages claim no withheld resource is available (social tags included)", () => {
    for (const page of ["", ...HUB_PAGES]) {
      const html = normaliseBuiltText(readFileSync(path.join(OUT, page, "index.html"), "utf8"));
      expect(availabilityClaims(html), `/${page}`).toEqual([]);
      expect(html, `/${page}`).toMatch(/being (rebuilt|written)/);
    }
  });

  it("the homepage and pages that inherit it use the approved og:description", () => {
    const og = (page: string) =>
      normaliseBuiltText(readFileSync(path.join(OUT, page, "index.html"), "utf8")).match(/<meta property="og:description" content="([^"]*)"/)?.[1];
    for (const page of ["", "about", "contact", "blog", "videos", "dashboard", ...HUB_PAGES]) {
      expect(og(page), `/${page}`).toBe(APPROVED_SITE_OG_DESCRIPTION);
    }
    // Chapter pages keep their own, page-specific descriptions.
    expect(og("class-11/kinematics")).not.toBe(APPROVED_SITE_OG_DESCRIPTION);
  });

});
