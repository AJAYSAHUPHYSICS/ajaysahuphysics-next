import { readFileSync } from "node:fs";
import path from "node:path";
import { Fragment, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { allChapters } from "@/lib/chapters";
import { jeeNotesRegistry } from "@/lib/jee-notes";
import { jeeDppRegistry } from "@/lib/jee-dpp";
import { jeeNotesSlugSet } from "@/lib/jee-notes/slugs";
import { jeeDppSlugSet } from "@/lib/jee-dpp/slugs";
import { pyqRegistry } from "@/lib/pyq";
import {
  isJeeDppPublic,
  isJeeNotesPublic,
  jeeDppStatus,
  jeeNotesStatus,
} from "@/lib/content-policy/jee-publication";
import {
  RESOURCE_ORDER,
  isResourceIndexable,
  isResourceLinked,
  resourceRegistry,
} from "@/lib/resource-registry";
import { searchIndex } from "@/lib/search-index";
import { generateStaticParams as class11Params } from "@/app/class-11/[slug]/[resource]/page";
import { generateStaticParams as class12Params } from "@/app/class-12/[slug]/[resource]/page";

// ─────────────────────────────────────────────────────────────────
// Phase 2A, Task 2: JEE Notes and JEE DPP are withheld.
// ─────────────────────────────────────────────────────────────────

const JEE_SLUGS = [
  "basic-mathematics-and-vectors",
  "physical-world-and-measurement",
  "kinematics",
  "laws-of-motion",
  "work-energy-and-power",
  "centre-of-mass-and-collisions",
  "system-of-particles-and-rotational-motion",
  "gravitation",
  "mechanical-properties-of-solids",
  "mechanical-properties-of-fluids",
  "circular-motion",
].sort();

const chapterOf = (slug: string) => allChapters.find((c) => c.slug === slug)!;
const html = (key: "jee-notes" | "jee-dpp" | "pyq", slug: string) =>
  renderToStaticMarkup(createElement(Fragment, null, resourceRegistry[key].render(slug)));

/** Every piece of student-facing text in the withheld JEE material (25+ chars). */
function jeeFragments(): { slug: string; text: string }[] {
  const out: { slug: string; text: string }[] = [];
  const push = (slug: string, s: string | undefined) => {
    if (s && s.length >= 25) out.push({ slug, text: s.slice(0, 80) });
  };
  for (const [slug, n] of Object.entries(jeeNotesRegistry)) {
    push(slug, n.intro);
    for (const ex of n.examples) {
      push(slug, ex.title);
      push(slug, ex.problem);
      push(slug, ex.answer);
      ex.solutionSteps.forEach((s) => push(slug, s));
    }
  }
  for (const [slug, d] of Object.entries(jeeDppRegistry)) {
    for (const q of d.questions) {
      push(slug, q.question);
      push(slug, q.solution);
      q.options.forEach((o) => push(slug, o));
    }
  }
  return out;
}

/** Escape text as React does in static markup, so substring checks are exact. */
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

describe("inventory: exactly the 11 + 11 recorded chapters", () => {
  it("JEE Notes: 11 chapters, 66 worked examples, all with a withheld status", () => {
    expect(Object.keys(jeeNotesRegistry).sort()).toEqual(JEE_SLUGS);
    expect([...jeeNotesSlugSet].sort()).toEqual(JEE_SLUGS);
    expect(Object.keys(jeeNotesStatus).sort()).toEqual(JEE_SLUGS);
    expect(Object.values(jeeNotesRegistry).reduce((n, c) => n + c.examples.length, 0)).toBe(66);
    expect(Object.values(jeeNotesStatus).every((s) => s === "withheld-third-party")).toBe(true);
  });

  it("JEE DPP: 11 chapters, 132 questions, all with a withheld status", () => {
    expect(Object.keys(jeeDppRegistry).sort()).toEqual(JEE_SLUGS);
    expect([...jeeDppSlugSet].sort()).toEqual(JEE_SLUGS);
    expect(Object.keys(jeeDppStatus).sort()).toEqual(JEE_SLUGS);
    expect(Object.values(jeeDppRegistry).reduce((n, c) => n + c.questions.length, 0)).toBe(132);
    expect(Object.values(jeeDppStatus).every((s) => s === "withheld-third-party")).toBe(true);
  });

  it("nothing is public, and unknown chapters are never public", () => {
    for (const slug of [...JEE_SLUGS, "atoms", "not-a-chapter"]) {
      expect(isJeeNotesPublic(slug)).toBe(false);
      expect(isJeeDppPublic(slug)).toBe(false);
    }
  });
});

describe("generated HTML: no withheld content leaks", () => {
  const fragments = jeeFragments();

  it("has material to check", () => {
    expect(fragments.length).toBeGreaterThan(500);
  });

  it.each(JEE_SLUGS)("%s: JEE Notes and JEE DPP render only the notice", (slug) => {
    const notes = html("jee-notes", slug);
    const dpp = html("jee-dpp", slug);
    expect(notes).toContain("JEE worked examples are being rewritten");
    expect(dpp).toContain("JEE practice questions are being rewritten");
    for (const page of [notes, dpp]) {
      // Since the open-source migration every resource is withheld, so the
      // notice links only to pages that still work: overview and progress.
      const base = `/class-${chapterOf(slug).cls}/${slug}`;
      expect(page).toContain(`href="${base}"`);
      expect(page).toContain(`href="/dashboard"`);
      expect(page).not.toContain(`href="${base}/notes"`);
      expect(page).not.toMatch(/Illustration \d|\bcengage\b|\ballen\b/i);
    }
    for (const f of fragments) {
      expect(notes).not.toContain(escapeHtml(f.text));
      expect(dpp).not.toContain(escapeHtml(f.text));
    }
  });

  it("PYQ pages (Task 1) still render no question text", () => {
    for (const [slug, ch] of Object.entries(pyqRegistry)) {
      const page = html("pyq", slug);
      expect(page).toContain("Previous year questions are being rebuilt");
      for (const q of ch.questions) {
        if (q.question.length >= 25) expect(page).not.toContain(escapeHtml(q.question.slice(0, 60)));
      }
    }
  });
});

describe("routes, SEO and discovery", () => {
  const routes = new Set(
    [...class11Params(), ...class12Params()].map((p) => `${p.slug}/${p.resource}`)
  );

  it("keeps all 22 JEE routes (bookmarks and continue-learning links resolve)", () => {
    for (const slug of JEE_SLUGS) {
      expect(routes.has(`${slug}/jee-notes`)).toBe(true);
      expect(routes.has(`${slug}/jee-dpp`)).toBe(true);
    }
  });

  it("keeps every route the registry had data for (no route removed)", () => {
    for (const c of allChapters) {
      for (const key of RESOURCE_ORDER) {
        expect(routes.has(`${c.slug}/${key}`)).toBe(resourceRegistry[key].hasData(c.slug));
      }
    }
    expect(routes.size).toBe(172);
  });

  it("withheld JEE pages are noindex/out of the sitemap and no longer linked from chapter pages", () => {
    for (const slug of JEE_SLUGS) {
      for (const key of ["jee-notes", "jee-dpp"] as const) {
        expect(isResourceIndexable(resourceRegistry[key], slug)).toBe(false);
        expect(isResourceLinked(resourceRegistry[key], slug)).toBe(false);
      }
    }
  });

  it("descriptions carry no counts or source claims", () => {
    for (const slug of JEE_SLUGS) {
      const name = chapterOf(slug).name;
      for (const key of ["jee-notes", "jee-dpp"] as const) {
        const d = resourceRegistry[key].describe(name, slug);
        expect(d).toMatch(/being rewritten independently by AjaySahuPhysics/);
        expect(d).not.toMatch(/\d|\bcengage\b|\ballen\b/i);
      }
    }
  });

  it("global search offers no JEE Notes or JEE DPP links", () => {
    for (const e of searchIndex) {
      const keys = e.resources.map((r) => r.key);
      expect(keys).not.toContain("jee-notes");
      expect(keys).not.toContain("jee-dpp");
    }
  });

  // Since the open-source migration (2026-11-18) every other legacy
  // resource is withheld too; content-publication.test.ts covers them.
});

describe("no Cengage or Allen claims remain outside the withheld PYQ data files", () => {
  const files = [
    "lib/resource-registry.tsx",
    "lib/search-index.ts",
    "lib/jee-notes/slugs.ts",
    "lib/jee-dpp/slugs.ts",
    "lib/jee-notes/index.ts",
    "lib/jee-dpp/index.ts",
    "lib/content-policy/jee-publication.ts",
    "lib/content-policy/pyq-publication.ts",
    "components/SingleExamResourceTabs.tsx",
    "components/ContentRebuildingNotice.tsx",
    "lib/content-policy/publication.ts",
    ...JEE_SLUGS.flatMap((s) => {
      const file = s === "system-of-particles-and-rotational-motion" ? "rotational-motion" : s;
      return [`lib/jee-notes/${file}.ts`, `lib/jee-dpp/${file}.ts`];
    }),
  ];
  it.each(files)("%s", (f) => {
    const src = readFileSync(path.resolve(__dirname, "..", "..", f), "utf8");
    expect(src).not.toMatch(/\bcengage\b|\ballen\b/i);
  });
});

// ── Student data ─────────────────────────────────────────────────

function memoryStorage(store: Map<string, string>) {
  return {
    getItem: (k: string) => (store.has(k) ? (store.get(k) as string) : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("student data stays intact", () => {
  const bookmarks = [
    { id: "11:kinematics:jee-notes", cls: "11", slug: "kinematics", type: "jee-notes", chapterName: "Kinematics", label: "Kinematics — JEE Notes", path: "/class-11/kinematics/jee-notes", bookmarkedAt: 200 },
    { id: "11:gravitation:jee-dpp", cls: "11", slug: "gravitation", type: "jee-dpp", chapterName: "Gravitation", label: "Gravitation — JEE Practice Questions", path: "/class-11/gravitation/jee-dpp", bookmarkedAt: 100 },
  ];
  const recent = [
    { cls: "11", slug: "circular-motion", resourceKey: "jee-dpp", chapterName: "Circular Motion", resourceLabel: "JEE Practice Questions", path: "/class-11/circular-motion/jee-dpp", visitedAt: 300 },
    { cls: "11", slug: "laws-of-motion", resourceKey: "jee-notes", chapterName: "Laws of Motion", resourceLabel: "JEE Notes", path: "/class-11/laws-of-motion/jee-notes", visitedAt: 250 },
  ];
  // JEE DPP mistakes have always been saved as resourceType "dpp" with the question number.
  const mistakes = [
    { id: "m1", cls: "11", slug: "kinematics", chapterName: "Kinematics", resourceType: "dpp", questionId: "7", conceptTag: "Relative velocity", difficulty: "hard", note: "", createdAt: 1, resolvedAt: null },
  ];
  const checklist = { "11:kinematics": { notes: true, dpp: true, pyq: true } };

  it("reads existing JEE bookmarks, recent links, mistakes and checklist exactly as stored", async () => {
    const store = new Map<string, string>([
      ["atlas:bookmarks", JSON.stringify(bookmarks)],
      ["atlas:recently-viewed-resources", JSON.stringify(recent)],
      ["atlas:mistakes", JSON.stringify(mistakes)],
      ["atlas:checklist", JSON.stringify(checklist)],
    ]);
    vi.stubGlobal("window", { localStorage: memoryStorage(store) });
    const before = new Map(store);

    expect((await import("@/lib/bookmarks")).getBookmarks()).toEqual(bookmarks);
    expect((await import("@/lib/recently-viewed-resources")).getRecentlyViewedResources()).toEqual(recent);
    expect((await import("@/lib/mistakes")).getMistakes()).toEqual(mistakes);
    expect((await import("@/lib/checklist")).getChapterChecklist("11", "kinematics")).toEqual(checklist["11:kinematics"]);

    // Reading never rewrites or migrates anything.
    expect(store).toEqual(before);
  });

  it("every stored JEE path still points at a generated route", () => {
    const routes = new Set(
      [...class11Params(), ...class12Params()].map((p) => `/class-${chapterOf(p.slug).cls}/${p.slug}/${p.resource}`)
    );
    for (const p of [...bookmarks.map((b) => b.path), ...recent.map((r) => r.path)]) {
      expect(routes.has(p)).toBe(true);
    }
  });

  it("storage keys are unchanged", () => {
    const keyOf = (f: string) =>
      readFileSync(path.resolve(__dirname, "..", f), "utf8").match(/const STORAGE_KEY = "([^"]+)"/)?.[1];
    expect(keyOf("bookmarks.ts")).toBe("atlas:bookmarks");
    expect(keyOf("mistakes.ts")).toBe("atlas:mistakes");
    expect(keyOf("checklist.ts")).toBe("atlas:checklist");
    expect(keyOf("recently-viewed-resources.ts")).toBe("atlas:recently-viewed-resources");
  });

  it("JEE resources have no checklist slot, so progress totals can't shift", async () => {
    const { RESOURCE_KEY_TO_CHECKLIST_ITEM } = await import("@/lib/checklist");
    expect(RESOURCE_KEY_TO_CHECKLIST_ITEM["jee-notes"]).toBeUndefined();
    expect(RESOURCE_KEY_TO_CHECKLIST_ITEM["jee-dpp"]).toBeUndefined();
  });
});
