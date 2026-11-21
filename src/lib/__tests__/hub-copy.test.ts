import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { Metadata } from "next";
import { APPROVED_SITE_OG_DESCRIPTION, HUB_PAGES, availabilityClaims } from "@/build-checks/hub-claims";
import { metadata as notes } from "@/app/notes/page";
import { metadata as dpp } from "@/app/dpp/page";
import { metadata as formulaSheet } from "@/app/formula-sheet/page";
import { metadata as pyq } from "@/app/pyq/page";
import { metadata as jee } from "@/app/jee/page";
import { metadata as neet } from "@/app/neet/page";
import { metadata as class11 } from "@/app/class-11/page";
import { metadata as class12 } from "@/app/class-12/page";

// Hub pages must not claim that withheld learning resources are available.

const SRC = path.resolve(__dirname, "..", "..");
const METADATA: Record<(typeof HUB_PAGES)[number], Metadata> = {
  notes, dpp, "formula-sheet": formulaSheet, pyq, jee, neet, "class-11": class11, "class-12": class12,
};
const PICKERS = ["ClassExamPicker", "JeeMainAdvancedPicker", "PyqExamPicker", "ExamTabs", "NeetResourceTabs", "SingleExamResourceTabs", "ChapterGrid"];

describe("hub marketing copy", () => {
  it.each(HUB_PAGES)("/%s: meta description states the rebuild and makes no availability claim", (hub) => {
    const d = String(METADATA[hub].description ?? "");
    expect(d).toMatch(/being (rebuilt|written)/);
    expect(availabilityClaims(d)).toEqual([]);
  });

  it.each(HUB_PAGES)("/%s: page source makes no availability claim and keeps its title", (hub) => {
    const src = readFileSync(path.join(SRC, "app", hub, "page.tsx"), "utf8");
    expect(availabilityClaims(src)).toEqual([]);
    expect(src).toMatch(/rebuil|being written/);
    expect(METADATA[hub].title).toBeTruthy();
  });

  it.each(PICKERS)("%s makes no availability claim", (c) => {
    expect(availabilityClaims(readFileSync(path.join(SRC, "components", `${c}.tsx`), "utf8"))).toEqual([]);
  });

  it("homepage, footer and site-wide meta description make no availability claim", async () => {
    const home = readFileSync(path.join(SRC, "app", "page.tsx"), "utf8");
    const footer = readFileSync(path.join(SRC, "components", "Footer.tsx"), "utf8");
    expect(availabilityClaims(home)).toEqual([]);
    expect(availabilityClaims(footer)).toEqual([]);
    expect(home).toMatch(/being rebuilt/);
    const { metadata: root } = await import("@/app/layout");
    expect(availabilityClaims(String(root.description))).toEqual([]);
    expect(String(root.description)).toMatch(/being rebuilt/);
    // Importing the root layout pulls in every component (~1 s alone); under a
    // parallel full run it could exceed the 5 s default, so it gets 30 s.
  }, 30_000);

  it("uses the approved site-wide og:description (owner-approved), and the baseline matches", async () => {
    const { metadata: root } = await import("@/app/layout");
    expect(root.openGraph?.description).toBe(APPROVED_SITE_OG_DESCRIPTION);
    expect(availabilityClaims(String(root.openGraph?.description))).toEqual([]);
    const baseline = readFileSync(path.join(SRC, "..", "scripts", "baseline", "home-social.txt"), "utf8");
    expect(baseline).toContain(`<meta property="og:description" content="${APPROVED_SITE_OG_DESCRIPTION}"/>`);
    // Everything else in the social baseline is unchanged.
    expect(baseline).toContain(`<meta property="og:image" content="https://ajaysahuphysics.com/og-image.png"/>`);
    expect(baseline).toContain(`<meta name="twitter:description" content="Premium physics coaching for JEE Main, JEE Advanced, and NEET aspirants."/>`);
  }, 30_000);


  it("the Videos page makes no availability claim", () => {
    expect(availabilityClaims(readFileSync(path.join(SRC, "app", "videos", "page.tsx"), "utf8"))).toEqual([]);
  });

  it("disabled chapter-nav items announce 'coming soon' to screen readers, not only in a tooltip", () => {
    const nav = readFileSync(path.join(SRC, "components", "ResourceNav.tsx"), "utf8");
    expect(nav).toMatch(/<span className="sr-only"> \(coming soon\)<\/span>/);
  });

  it("the claim detector catches the old wording", () => {
    for (const old of [
      "Pick a chapter below to download notes or get notified when they're ready.",
      "Complete JEE Main and JEE Advanced physics preparation",
      "every chapter is covered with notes, formula sheets",
      "Real questions previously asked in NEET/AIPMT exams",
    ]) expect(availabilityClaims(old).length).toBeGreaterThan(0);
  });
});
