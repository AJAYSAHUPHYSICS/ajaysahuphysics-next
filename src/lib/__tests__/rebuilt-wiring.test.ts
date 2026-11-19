import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { Fragment, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { allChapters } from "@/lib/chapters";
import { REBUILT_PUBLICATION, isChapterResourcePublic, isRebuiltResourcePublic, type RebuiltResource } from "@/lib/content-policy/publication";
import { formulaSheetPublicationGaps, validateChapterPackage, type ChapterPackage } from "@/lib/content-v2/chapter-package";
import { REBUILT_PACKAGES, getServableRebuiltPackage, isPackageServable, resolveServablePackage } from "@/lib/content-v2/rebuilt-packages";
import { decideRendering, isResourceIndexable, renderRebuiltResource, resourceRegistry } from "@/lib/resource-registry";
import { approved, syntheticKinematics, syntheticPackage } from "./fixtures/synthetic-packages";

// ─────────────────────────────────────────────────────────────────
// Renderer wiring and the four publication gates, on SYNTHETIC fixtures.
// Real drafts live outside this public repository and are never imported.
// ─────────────────────────────────────────────────────────────────

const SRC = path.resolve(__dirname, "..", "..");
const RESOURCES: RebuiltResource[] = ["notes", "short-notes", "formula-sheet", "dpp"];
const html = (node: unknown) => renderToStaticMarkup(createElement(Fragment, null, node as never));
const units = approved(syntheticPackage("physical-world-and-measurement"));
// Everything approved except the package status, which stays in review.
const kin: ChapterPackage = { ...approved(syntheticKinematics()), status: "in-review" };

describe("private draft separation", () => {
  it("no drafts folder exists in the repository and the package registry is empty", () => {
    expect(existsSync(path.join(SRC, "lib", "content-v2", "drafts"))).toBe(false);
    expect(Object.keys(REBUILT_PACKAGES)).toEqual([]);
  });

  it("no source file imports anything from a drafts folder", () => {
    const walk = (d: string): string[] =>
      readdirSync(d).flatMap((f) => {
        const p = path.join(d, f);
        return statSync(p).isDirectory() ? walk(p) : [p];
      });
    const importers = walk(SRC)
      .filter((f) => /\.(ts|tsx|mjs)$/.test(f))
      .filter((f) => /(?:from\s+|import\()\s*["'][^"']*drafts\/[^"']*["']/.test(readFileSync(f, "utf8")));
    expect(importers.map((f) => path.relative(SRC, f))).toEqual([]);
  });

  it("only the resource registry imports the package gate", () => {
    const users = ["lib/resource-registry.tsx", "app", "components"]
      .flatMap((p) => {
        const full = path.join(SRC, p);
        const walk = (d: string): string[] =>
          statSync(d).isDirectory() ? readdirSync(d).flatMap((f) => walk(path.join(d, f))) : [d];
        return walk(full);
      })
      .filter((f) => /from\s+"[^"]*rebuilt-packages"/.test(readFileSync(f, "utf8")))
      .map((f) => path.relative(SRC, f).split(path.sep).join("/"));
    expect(users).toEqual(["lib/resource-registry.tsx"]);
  });
});

describe("publication switches (all off)", () => {
  it("all 8 rebuilt switches are false", () => {
    const values = Object.values(REBUILT_PUBLICATION).flatMap((row) => RESOURCES.map((r) => row[r]));
    expect(values).toHaveLength(8);
    expect(values.every((v) => v === false)).toBe(true);
  });

  it("switch rows exist only for real routes; any switch that is on would need a servable registered package", () => {
    const slugs = new Set(allChapters.map((c) => c.slug));
    for (const [slug, row] of Object.entries(REBUILT_PUBLICATION)) {
      expect(slugs.has(slug)).toBe(true);
      for (const r of RESOURCES) if (row[r]) expect(isPackageServable(REBUILT_PACKAGES[slug], r), `${slug}/${r}`).toBe(true);
    }
  });

  it("no chapter resource is public, rebuilt or legacy, and every page renders the notice", () => {
    for (const c of allChapters) {
      for (const r of RESOURCES) {
        expect(isRebuiltResourcePublic(r, c.slug)).toBe(false);
        expect(getServableRebuiltPackage(r, c.slug)).toBeNull();
        expect(isChapterResourcePublic(r, c.slug)).toBe(false);
        expect(isResourceIndexable(resourceRegistry[r], c.slug)).toBe(false);
      }
    }
    for (const slug of ["physical-world-and-measurement", "kinematics"]) {
      for (const r of RESOURCES) {
        const page = html(resourceRegistry[r].render(slug));
        expect(page).toMatch(/being rebuilt/);
        expect(page).not.toContain("Sources and licences");
      }
    }
  });
});

describe("the four gates (fail closed)", () => {
  const cases: [string, boolean, ChapterPackage | null | undefined, RebuiltResource][] = [
    ["switch off, valid package", false, units, "notes"],
    ["switch on, status drafting", true, { ...units, status: "drafting" }, "notes"],
    ["switch on, status in-review", true, { ...units, status: "in-review" }, "notes"],
    ["switch on, review pending", true, { ...units, notes: [{ ...units.notes[0], provenance: { ...units.notes[0].provenance, review: { reviewer: null, status: "pending" } } }, ...units.notes.slice(1)] }, "notes"],
    ["switch on, self-review", true, { ...units, notes: [{ ...units.notes[0], provenance: { ...units.notes[0].provenance, review: { reviewer: "Synthetic Author", date: "2026-11-19", status: "approved" } } }, ...units.notes.slice(1)] }, "notes"],
    ["switch on, no package registered", true, undefined, "notes"],
    ["switch on, validator fails (broken formula ref)", true, { ...units, notes: [{ ...units.notes[0], formulaRefs: ["f-missing"] }, ...units.notes.slice(1)] }, "notes"],
    ["switch on, resource missing (no DPP)", true, { ...units, dpp: [] }, "dpp"],
    ["switch on, resource empty (no notes)", true, { ...units, notes: [], shortNotes: [] }, "notes"],
    ["switch on, invalid part mapping", true, { ...units, parts: [{ id: "p-a", title: "A", sectionIds: ["syn-s1", "syn-nope"] }] }, "notes"],
    ["switch on, duplicate formula ID", true, { ...units, formulaSheet: [...units.formulaSheet, { ...units.formulaSheet[0] }] }, "notes"],
    ["switch on, duplicate question number", true, { ...units, dpp: [units.dpp[0], { ...units.dpp[1], number: 1 }] }, "dpp"],
    ["switch on, blank source attribution", true, { ...units, sources: [{ ...units.sources[0], attribution: " " }] }, "notes"],
    ["switch on, missing licence evidence", true, { ...units, sources: [{ ...units.sources[0], evidence: undefined }] }, "notes"],
    ["switch on, unverified source", true, { ...units, sources: [{ ...units.sources[0], status: "pending" }] }, "notes"],
    ["switch on, non-commercial licence", true, { ...units, sources: [{ ...units.sources[0], licence: "CC-BY-NC-4.0" as never }] }, "notes"],
    ["switch on, formula sheet with editorial gap", true, { ...units, formulaSheet: [{ ...units.formulaSheet[0], frequency: undefined }, units.formulaSheet[1]] }, "formula-sheet"],
    ["switch on, malformed package (notes missing)", true, { ...units, notes: undefined as never }, "notes"],
  ];

  it.each(cases)("%s → not servable", (_name, switchOn, pkg, resource) => {
    expect(() => resolveServablePackage(switchOn, pkg, resource)).not.toThrow();
    expect(resolveServablePackage(switchOn, pkg, resource)).toBeNull();
  });

  it("only a valid, published, independently approved package with that resource passes all four gates", () => {
    expect(validateChapterPackage(units)).toEqual([]);
    for (const r of RESOURCES) expect(resolveServablePackage(true, units, r)).toBe(units);
  });
});

describe("rendering decision (never legacy once a rebuilt switch is on)", () => {
  const table: [boolean, boolean, boolean, string][] = [
    [false, false, false, "notice"],
    [false, false, true, "legacy"],
    [false, true, false, "notice"],
    [false, true, true, "legacy"],
    [true, false, false, "notice"],
    [true, false, true, "notice"],
    [true, true, false, "rebuilt"],
    [true, true, true, "rebuilt"],
  ];
  it.each(table)("switch=%s servable=%s legacyPublic=%s → %s", (rebuiltSwitchOn, servable, legacyPublic, expected) => {
    expect(decideRendering({ rebuiltSwitchOn, servable, legacyPublic })).toBe(expected);
  });
});

describe("rebuilt renderer (synthetic only)", () => {
  it("renders notes, DPP and formula sheet with attribution", () => {
    const notes = html(renderRebuiltResource("notes", units, units.slug));
    expect(notes).toContain("Synthetic section one");
    expect(notes).toContain("Sources and licences");
    expect(notes).toContain("Synthetic source by Example Org");
    expect(html(renderRebuiltResource("dpp", units, units.slug))).toContain("Q2");
    expect(html(renderRebuiltResource("formula-sheet", units, units.slug))).toContain("Synthetic group A");
  });

  it("returns nothing (so the notice shows) when an adapter can't run", () => {
    expect(renderRebuiltResource("notes", { ...units, notes: [{ ...units.notes[0], formulaRefs: ["f-missing"] }] }, units.slug)).toBeNull();
    expect(renderRebuiltResource("formula-sheet", syntheticPackage("physical-world-and-measurement"), "x")).toBeNull();
  });
});

describe("Kinematics shape: one route, one package, two parts (synthetic)", () => {
  it("exists as a single existing route", () => {
    expect(allChapters.filter((c) => c.slug === "kinematics")).toHaveLength(1);
    expect(validateChapterPackage(syntheticKinematics())).toEqual([]);
  });

  it("has exactly the two approved parts covering every section once", () => {
    const k = syntheticKinematics();
    expect(k.parts!.map((p) => p.title)).toEqual(["Motion in a Straight Line", "Motion in a Plane"]);
    expect(k.parts!.flatMap((p) => p.sectionIds).sort()).toEqual(k.notes.map((n) => n.id).sort());
  });

  it("rejects sections outside a part, in two parts, or unknown", () => {
    const k = syntheticKinematics();
    const [a, b] = k.parts!;
    expect(validateChapterPackage({ ...k, parts: [a, { ...b, sectionIds: b.sectionIds.slice(1) }] }).join()).toMatch(/is not in any part/);
    expect(validateChapterPackage({ ...k, parts: [a, { ...b, sectionIds: [...b.sectionIds, a.sectionIds[0]] }] }).join()).toMatch(/is in two parts/);
    expect(validateChapterPackage({ ...k, parts: [{ ...a, sectionIds: [...a.sectionIds, "k-nope"] }, b] }).join()).toMatch(/does not exist/);
  });

  it("a Kinematics package still in review is not servable for any resource", () => {
    for (const r of RESOURCES) expect(resolveServablePackage(true, kin, r)).toBeNull();
  });
});

describe("formula-sheet editorial fields", () => {
  it("are reported as gaps, never defaulted, until the reviewer sets them", () => {
    const draft = syntheticPackage("physical-world-and-measurement");
    const gaps = formulaSheetPublicationGaps(draft);
    for (const field of ["examTags", "difficulty", "frequency", "isKeyFormula", "pdfInclude"]) {
      expect(gaps.filter((g) => g.includes(`${field} missing`))).toHaveLength(draft.formulaSheet.length);
    }
    expect(formulaSheetPublicationGaps(units)).toEqual([]);
  });

  it("groups must reference canonical formula IDs exactly once", () => {
    const bad = { ...units, formulaGroups: [{ id: "g-x", title: "X", formulaIds: ["f-nope", "f-syn-1"] }, { id: "g-y", title: "Y", formulaIds: ["f-syn-1"] }] };
    const errs = validateChapterPackage(bad).join("\n");
    expect(errs).toMatch(/formula "f-nope" does not exist/);
    expect(errs).toMatch(/f-syn-1 is in two groups/);
  });
});
