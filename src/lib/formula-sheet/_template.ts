import type { ChapterFormulaSheet } from "./types";

// ─────────────────────────────────────────────────────────────────
// CHAPTER FORMULA SHEET TEMPLATE
//
// This file is NOT registered in index.ts and never renders.
// It exists so every new chapter starts from a schema-valid skeleton
// that the compiler keeps in sync with types.ts.
//
// To author a new chapter:
//   1. Copy this file to <chapter-slug>.ts
//   2. Rename the export to <chapterName>FormulaSheet
//   3. Follow docs/FORMULA_SHEET_AUTHORING_GUIDE.md
//   4. Run the Quality Checklist before registering in index.ts
// ─────────────────────────────────────────────────────────────────

export const templateFormulaSheet: ChapterFormulaSheet = {
  // Verify against src/lib/chapters.ts — do not guess.
  chapterSlug: "REPLACE-chapter-slug",
  chapterName: "REPLACE Chapter Name",
  className: "11", // or "12"
  version: "1.0.0",
  lastUpdated: "2026-01-01", // ISO date of authoring
  // Tag only exams where this CHAPTER is part of the syllabus.
  examCoverage: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
  // 5–8 formula ids, in revision-priority order.
  // Every id here MUST have isKeyFormula: true on its formula.
  quickRevisionIds: ["REPLACE-prefix-formula-one"],
  topicGroups: [
    // 3–6 groups, in classroom teaching order.
    {
      id: "REPLACE-prefix-group-one",
      title: "REPLACE Group Title",
      intro:
        "REPLACE: 1–2 sentences, teacher voice — what unifies these formulas.",
      formulas: [
        {
          // Permanent once published (ID Stability Contract in types.ts).
          id: "REPLACE-prefix-formula-one",
          // Textbook notation ONLY. Unicode: θ μ ω Δ ² ₁ ₙ − √ ½
          // No underscores, no *, no sqrt(). Caps subscripts → v(AB).
          expression: "REPLACE = formula",
          expressionLatex: "REPLACE", // optional; encouraged for key formulas
          label: "REPLACE what a teacher calls it aloud",
          derivedFrom: "REPLACE one-line origin (optional — delete if none)",
          // 2–4 derivations PER CHAPTER, ≤5 steps. Delete if not one of them.
          derivation: {
            startsFrom: "REPLACE physical starting point",
            steps: [
              { statement: "REPLACE one logical move", expression: "REPLACE" },
            ],
            askedInBoards: false,
          },
          variables: [
            // Every symbol in the expression, exactly as written there.
            {
              symbol: "REPLACE",
              name: "REPLACE lowercase specific name",
              unit: "REPLACE SI unit", // "dimensionless" if none
              dimension: "[REPLACE]", // e.g. [MLT⁻²]; [M⁰L⁰T⁰] if none
              notes: "REPLACE optional classroom clarification — delete if none",
            },
          ],
          conditions: ["REPLACE validity condition — delete array if none"],
          commonMistakes: [
            "REPLACE a REAL student error with its correction — delete array if none. Never invent.",
          ],
          usedIn: ["REPLACE-other-chapter-slug"], // delete if none
          conceptLink: {
            chapterSlug: "REPLACE-chapter-slug", // must exist in chapters.ts
            sectionHeading: "REPLACE exact heading from that chapter's notes",
            concept: "REPLACE lowercase noun phrase for search/AI",
          },
          // Only exams where THIS FORMULA is distinctively relevant.
          examTags: ["jee-main", "neet"],
          // very-high = nearly every year | high = most years
          // medium = every 2–3 years | low = rare
          frequency: "medium",
          // Estimates OK — stored, not displayed (see TODO in FormulaCard).
          examStats: { jeeMain: 0, neet: 0 },
          difficulty: "easy",
          isKeyFormula: false, // true for 5–8 per chapter
          pdfInclude: true,
          searchKeywords: ["REPLACE", "search terms students would type"],
        },
      ],
      importantObservations: [
        "REPLACE the non-formula one-liner Ajay says in class — delete array if none",
      ],
      examNotes:
        "REPLACE only if NEET/JEE genuinely use this group differently — delete if filler",
    },
  ],
};
