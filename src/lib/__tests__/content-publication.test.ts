import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { Fragment, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { allChapters } from "@/lib/chapters";
import { LEGACY_REGISTRIES as LEGACY, legacyStrings } from "@/build-checks/legacy-corpus";
import { hasNotesPdf } from "@/lib/notes-pdf";
import {
  LEGACY_CONTENT_SOURCES,
  REBUILDING_COPY,
  isChapterResourcePublic,
  isLegacyContentPublic,
} from "@/lib/content-policy/publication";
import {
  RESOURCE_ORDER,
  chapterHasPublicResource,
  isResourceIndexable,
  isResourceLinked,
  resourceRegistry,
} from "@/lib/resource-registry";
import { searchIndex } from "@/lib/search-index";
import { generateStaticParams as class11Params } from "@/app/class-11/[slug]/[resource]/page";
import { generateStaticParams as class12Params } from "@/app/class-12/[slug]/[resource]/page";

// ─────────────────────────────────────────────────────────────────
// Open-source migration, Phase A: every legacy learning resource is
// withheld from student-facing output by ONE central policy, while
// routes, checklist slots and student data stay intact.
// ─────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..", "..", "..");

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const render = (key: (typeof RESOURCE_ORDER)[number], slug: string) =>
  renderToStaticMarkup(createElement(Fragment, null, resourceRegistry[key].render(slug)));

describe("central publication policy", () => {
  it("covers every chapter resource plus PDFs and chapter guidance", () => {
    expect([...LEGACY_CONTENT_SOURCES].sort()).toEqual([...RESOURCE_ORDER, "notes-pdf", "chapter-guidance"].sort());
  });

  it("withholds every legacy source", () => {
    for (const s of LEGACY_CONTENT_SOURCES) expect(isLegacyContentPublic(s)).toBe(false);
  });

  it("no chapter resource is public, for any of the 30 chapters", () => {
    expect(allChapters).toHaveLength(30);
    for (const c of allChapters) {
      for (const key of RESOURCE_ORDER) {
        expect(isChapterResourcePublic(key, c.slug)).toBe(false);
        expect(resourceRegistry[key].isPublic(c.slug)).toBe(false);
      }
      expect(chapterHasPublicResource(c.slug)).toBe(false);
    }
  });
});

describe("generated HTML: no legacy content leaks", () => {
  const strings = legacyStrings();
  const pages: { id: string; html: string }[] = [];
  for (const c of allChapters) {
    for (const key of RESOURCE_ORDER) {
      if (resourceRegistry[key].hasData(c.slug)) pages.push({ id: `${c.slug}/${key}`, html: render(key, c.slug) });
    }
  }

  it("has a large body of legacy text to check against", () => {
    expect(strings.length).toBeGreaterThan(5000);
    expect(new Set(strings.map((s) => s.source)).size).toBe(Object.keys(LEGACY).length);
  });

  it("renders all 172 resource pages as notices", () => {
    expect(pages).toHaveLength(172);
    for (const p of pages) {
      const key = p.id.split("/")[1] as (typeof RESOURCE_ORDER)[number];
      expect(p.html).toContain(escapeHtml(REBUILDING_COPY[key].heading));
    }
  });

  it("no rendered page contains any legacy string", () => {
    const leaks: string[] = [];
    for (const p of pages) {
      for (const s of strings) if (p.html.includes(escapeHtml(s.text))) leaks.push(`${p.id} ← ${s.source}: ${s.text}`);
    }
    expect(leaks).toEqual([]);
  });

  it("notices link only to working pages (chapter overview and progress)", () => {
    for (const p of pages) {
      const hrefs = [...p.html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
      const slug = p.id.split("/")[0];
      for (const h of hrefs) expect(h === "/dashboard" || /^\/class-1[12]\/[a-z-]+$/.test(h) && h.endsWith(slug)).toBe(true);
    }
  });

  it("descriptions give no counts and claim no source", () => {
    for (const c of allChapters) {
      for (const key of RESOURCE_ORDER) {
        const d = resourceRegistry[key].describe(c.name, c.slug);
        expect(d).not.toMatch(/\d|\bcengage\b|\ballen\b|\bncert\b/i);
      }
    }
  });
});

describe("routes, checklist and student progress are preserved", () => {
  const routes = new Set([...class11Params(), ...class12Params()].map((p) => `${p.slug}/${p.resource}`));

  it("every resource route still exists (bookmarks and continue-learning links resolve)", () => {
    expect(routes.size).toBe(172);
    for (const c of allChapters) {
      for (const key of RESOURCE_ORDER) expect(routes.has(`${c.slug}/${key}`)).toBe(resourceRegistry[key].hasData(c.slug));
    }
  });

  it("checklist slots are unchanged: notes, formula sheet, DPP and PYQ exist for all 30 chapters", () => {
    for (const c of allChapters) {
      for (const key of ["notes", "formula-sheet", "dpp", "pyq"] as const) {
        expect(resourceRegistry[key].hasData(c.slug)).toBe(true);
      }
    }
  });
});

describe("discovery: nothing advertises withheld content", () => {
  it("no resource page is linked from chapter pages, indexed or in the sitemap", () => {
    for (const c of allChapters) {
      for (const key of RESOURCE_ORDER) {
        expect(isResourceLinked(resourceRegistry[key], c.slug)).toBe(false);
        expect(isResourceIndexable(resourceRegistry[key], c.slug)).toBe(false);
      }
    }
  });

  it("global search still lists all 30 chapters but no resource links", () => {
    expect(searchIndex).toHaveLength(30);
    for (const e of searchIndex) expect(e.resources).toEqual([]);
  });
});

describe("legacy PDFs can't be downloaded", () => {
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((f) => {
      const p = path.join(dir, f);
      return statSync(p).isDirectory() ? walk(p) : [p];
    });

  it("public/ ships no PDF at all", () => {
    expect(walk(path.join(ROOT, "public")).filter((f) => f.toLowerCase().endsWith(".pdf"))).toEqual([]);
  });

  // The 27 legacy PDFs were removed from the repository tree (not moved to
  // another tracked folder). Their preserved copies live in the owner's
  // private archive and in git history, never in a folder that is built,
  // served or published with the source.
  it("no PDF is kept in the source tree (src/) or the app routes", () => {
    expect(walk(path.join(ROOT, "src")).filter((f) => f.toLowerCase().endsWith(".pdf"))).toEqual([]);
  });

  it("no notes page offers a download link", () => {
    expect(isLegacyContentPublic("notes-pdf")).toBe(false);
    for (const c of allChapters) expect(hasNotesPdf(c.cls, c.slug)).toBe(false);
  });
});

// The whole static export is checked after the production build by
// src/build-checks/legacy-content-leaks.check.ts (npm run test:build-output, in CI).
