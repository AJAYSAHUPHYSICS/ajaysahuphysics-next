import { describe, expect, it } from "vitest";
import { buildChapterView, toLegacyDpp, toLegacyFormulaSheet, toLegacyNotes, toLegacyShortNotes, sectionsByPart } from "@/lib/content-v2/chapter-view";
import { validateChapterPackage } from "@/lib/content-v2/chapter-package";
import { approved, syntheticKinematics, syntheticPackage } from "./fixtures/synthetic-packages";

// Renderer view model and adapters, on SYNTHETIC fixtures only.

const pkg = syntheticPackage("physical-world-and-measurement");

describe("chapter view model", () => {
  const view = buildChapterView(pkg);

  it("produces every view from one package", () => {
    expect(validateChapterPackage(pkg)).toEqual([]);
    expect(view.sections).toHaveLength(pkg.notes.length);
    expect(view.formulaSheet).toHaveLength(pkg.formulaSheet.length);
    expect(view.revisionChecklist).toHaveLength(pkg.revisionChecklist.length);
    expect(view.progressSlots).toEqual(["notes", "formulaSheet", "dpp"]); // no PYQs
  });

  it("resolves formula references to the single canonical record (same object, never a copy)", () => {
    expect(view.sections[0].formulas[0]).toBe(pkg.formulaSheet[0]);
    expect(view.solvedExamples[0].formulas[0]).toBe(pkg.formulaSheet[0]);
  });

  it("groups short notes under the section each summarises", () => {
    expect(view.shortNotesBySection.map((g) => g.heading)).toEqual(["Synthetic section one", "Synthetic section two"]);
  });

  it("throws on an unknown formula reference (the gate treats that as not servable)", () => {
    const broken = { ...pkg, notes: [{ ...pkg.notes[0], formulaRefs: ["f-missing"] }, ...pkg.notes.slice(1)] };
    expect(() => buildChapterView(broken)).toThrow(/unknown formula/);
  });
});

describe("adapters to existing display components", () => {
  it("NotesDisplay shape with formulas pulled by reference", () => {
    const notes = toLegacyNotes(pkg);
    expect(notes.sections[0].formula).toEqual([{ label: "Synthetic relation one", expression: "A = B × C" }]);
  });

  it("ShortNotesDisplay shape", () => {
    expect(toLegacyShortNotes(pkg).groups.flatMap((g) => g.points)).toHaveLength(pkg.shortNotes.length);
  });

  it("DppDisplay keeps each question's stable number (saved mistakes use it)", () => {
    expect(toLegacyDpp(pkg).questions.map((q) => q.number)).toEqual([1, 2]);
    expect(toLegacyDpp(pkg, [pkg.dpp[1]]).questions.map((q) => q.number)).toEqual([2]);
  });

  it("FormulaSheetDisplay only when editorial fields are complete (never defaulted)", () => {
    expect(toLegacyFormulaSheet(pkg)).toBeNull();
    const sheet = toLegacyFormulaSheet(approved(pkg))!;
    expect(sheet.topicGroups.map((g) => g.formulas.map((f) => f.id))).toEqual([["f-syn-1"], ["f-syn-2"]]);
    expect(sheet.quickRevisionIds).toEqual(["f-syn-1"]);
  });

  it("parts become heading-only dividers in the notes view (Kinematics shape)", () => {
    const kin = syntheticKinematics();
    const headings = toLegacyNotes(kin).sections.map((s) => s.heading);
    expect(headings[0]).toBe("Motion in a Straight Line");
    expect(headings[3]).toBe("Motion in a Plane");
    expect(sectionsByPart(kin).map((p) => p.sectionIds.length)).toEqual([2, 3]);
  });
});
