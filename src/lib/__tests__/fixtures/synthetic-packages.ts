import type { ChapterPackage, Provenance } from "@/lib/content-v2/chapter-package";

// ─────────────────────────────────────────────────────────────────
// SYNTHETIC test fixtures. Placeholder text only: no real chapter
// content, no real questions, answers, examples or diagrams. Every
// string is obviously synthetic ("Synthetic …"). Used to exercise the
// schema, validator, adapters and publication gates.
// ─────────────────────────────────────────────────────────────────

const pending: Provenance = { origin: "original", sources: [], author: "Synthetic Author", aiAssisted: false, review: { reviewer: null, status: "pending" } };

/** A structurally complete draft package (status "in-review", reviews pending). */
export function syntheticPackage(slug: string, cls: "11" | "12" = "11"): ChapterPackage {
  return {
    schemaVersion: 1,
    id: `syn-${slug}`,
    cls,
    slug,
    title: `Synthetic chapter for ${slug}`,
    syllabus: { checkedAgainst: [] },
    status: "in-review",
    sources: [
      {
        id: "R-900",
        title: "Synthetic source",
        url: "https://example.org/synthetic-source",
        licence: "CC-BY-4.0",
        status: "verified",
        attribution: "Synthetic source by Example Org, CC BY 4.0",
        evidence: { url: "https://example.org/synthetic-source/licence", verifiedOn: "2026-11-19", licenceText: "Synthetic licence statement (CC BY 4.0)." },
      },
    ],
    overview: { summary: "Synthetic overview summary.", learningOutcomes: ["Synthetic outcome one.", "Synthetic outcome two."], provenance: pending },
    notes: [
      { id: "syn-s1", heading: "Synthetic section one", body: "Synthetic body one.", formulaRefs: ["f-syn-1"], provenance: pending },
      { id: "syn-s2", heading: "Synthetic section two", body: "Synthetic body two.", points: ["Synthetic point."], formulaRefs: ["f-syn-2"], provenance: pending },
      { id: "syn-s3", heading: "Synthetic section three", body: "Synthetic body three.", provenance: { ...pending, sources: ["R-900"] } },
    ],
    shortNotes: [
      { id: "syn-sn1", ref: "syn-s1", text: "Synthetic revision point one.", provenance: pending },
      { id: "syn-sn2", ref: "syn-s2", text: "Synthetic revision point two.", provenance: pending },
    ],
    formulaSheet: [
      { id: "f-syn-1", label: "Synthetic relation one", expression: "A = B × C", variables: [{ symbol: "A", name: "synthetic quantity A", unit: "m", dimension: "[L]" }, { symbol: "B", name: "synthetic quantity B", unit: "m s⁻¹", dimension: "[L T⁻¹]" }, { symbol: "C", name: "synthetic quantity C", unit: "s", dimension: "[T]" }], provenance: pending },
      { id: "f-syn-2", label: "Synthetic relation two", expression: "D = E / F", variables: [{ symbol: "D", name: "synthetic quantity D", unit: "dimensionless", dimension: "[M⁰ L⁰ T⁰]" }, { symbol: "E", name: "synthetic quantity E", unit: "m", dimension: "[L]" }, { symbol: "F", name: "synthetic quantity F", unit: "m", dimension: "[L]" }], provenance: pending },
    ],
    formulaGroups: [
      { id: "g-syn-a", title: "Synthetic group A", formulaIds: ["f-syn-1"] },
      { id: "g-syn-b", title: "Synthetic group B", formulaIds: ["f-syn-2"] },
    ],
    quickRevisionFormulaIds: ["f-syn-1"],
    version: "0.0.1-synthetic",
    lastUpdated: "2026-11-19",
    solvedExamples: [
      { id: "e-syn-1", level: "board", problem: "Synthetic problem.", steps: ["Synthetic step."], answer: "1 m", answerUnit: "m", formulaRefs: ["f-syn-1"], provenance: pending },
    ],
    dpp: [
      { id: "q-syn-1", number: 1, level: "board", label: "Practice question", question: "Synthetic question one?", options: ["sa", "sb", "sc", "sd"], correctIndex: 0, solution: "Synthetic solution one.", provenance: pending },
      { id: "q-syn-2", number: 2, level: "neet", label: "NEET-style practice question", question: "Synthetic question two?", options: ["ta", "tb", "tc", "td"], correctIndex: 1, solution: "Synthetic solution two.", provenance: pending },
    ],
    examPractice: [
      { id: "x-syn-1", number: 1, level: "jee-main", label: "JEE Main-style practice question", question: "Synthetic exam-style question?", options: ["ua", "ub", "uc", "ud"], correctIndex: 2, solution: "Synthetic exam-style solution.", provenance: pending },
    ],
    experiments: [],
    revisionChecklist: [
      { id: "r-syn-1", text: "Synthetic checklist item one.", provenance: pending },
      { id: "r-syn-2", text: "Synthetic checklist item two.", provenance: pending },
    ],
    pyqs: [],
  };
}

/** Kinematics-shaped synthetic package: one route, two approved parts. */
export function syntheticKinematics(): ChapterPackage {
  const base = syntheticPackage("kinematics");
  const p = base.notes[0].provenance;
  return {
    ...base,
    status: "planning",
    parts: [
      { id: "part-straight-line", title: "Motion in a Straight Line", sectionIds: ["syn-k1a", "syn-k1b"] },
      { id: "part-plane", title: "Motion in a Plane", sectionIds: ["syn-k2a", "syn-k2b", "syn-k2c"] },
    ],
    notes: [
      { id: "syn-k1a", heading: "Synthetic part-one section A", body: "Synthetic body.", formulaRefs: ["f-syn-1"], provenance: p },
      { id: "syn-k1b", heading: "Synthetic part-one section B", body: "Synthetic body.", provenance: p },
      { id: "syn-k2a", heading: "Synthetic part-two section A", body: "Synthetic body.", formulaRefs: ["f-syn-2"], provenance: p },
      { id: "syn-k2b", heading: "Synthetic part-two section B", body: "Synthetic body.", provenance: p },
      { id: "syn-k2c", heading: "Synthetic part-two section C", body: "Synthetic body.", provenance: p },
    ],
    shortNotes: [{ id: "syn-ksn1", ref: "syn-k1a", text: "Synthetic revision point.", provenance: p }],
  };
}

/**
 * Test-only: a copy with every block approved by a fictional INDEPENDENT
 * reviewer, editorial formula fields set, syllabus checked, status published.
 */
export function approved(pkg: ChapterPackage): ChapterPackage {
  const ok = (p: Provenance): Provenance => ({ ...p, review: { reviewer: "Synthetic Independent Reviewer", date: "2026-11-19", status: "approved" } });
  const each = <T extends { provenance: Provenance }>(xs: T[]) => xs.map((x) => ({ ...x, provenance: ok(x.provenance) }));
  return {
    ...pkg,
    status: "published",
    syllabus: { ...pkg.syllabus, checkedAgainst: ["synthetic: official syllabus document"] },
    overview: { ...pkg.overview, provenance: ok(pkg.overview.provenance) },
    notes: each(pkg.notes),
    shortNotes: each(pkg.shortNotes),
    formulaSheet: each(pkg.formulaSheet).map((f) => ({ ...f, examTags: ["boards" as const], difficulty: "easy" as const, frequency: "low" as const, isKeyFormula: false, pdfInclude: true })),
    solvedExamples: each(pkg.solvedExamples),
    dpp: each(pkg.dpp),
    examPractice: each(pkg.examPractice),
    experiments: each(pkg.experiments),
    revisionChecklist: each(pkg.revisionChecklist),
  };
}
