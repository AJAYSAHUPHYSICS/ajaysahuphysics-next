# Formula Sheet Authoring Guide
**Project Atlas · Formula Knowledge Engine · Schema v1.0 (frozen)**

This guide is the single source of truth for writing chapter formula sheets.
Every future chapter MUST follow it. When this guide and personal preference
disagree, this guide wins.

---

## 1. Standard Authoring Workflow

1. **Copy the template** — `src/lib/formula-sheet/_template.ts` → `<chapter-slug>.ts`
2. **Verify the slug** against `src/lib/chapters.ts` (never assume; slugs have been wrong before)
3. **List every formula** in the chapter from the source material FIRST, before writing any — then group them
4. **Write topic groups** in teaching order (the order Ajay teaches them in class)
5. **Fill every formula** completely (all required fields; see standards below)
6. **Select 5–8 quick-revision formulas** and order them by revision priority
7. **Run the Quality Checklist** (Section 10) — every box must pass
8. **Register** — one import + one entry in BOTH `index.ts` and `slugs.ts`

   ⚠️ **Push order (learned the hard way, Sprint 7):** `index.ts` and `slugs.ts` are
   validated against each other by the build-time drift guard, which throws in BOTH
   directions. Pushing them as separate commits therefore always creates one broken
   intermediate commit, and CI may build it. Push all content files first, then push
   `slugs.ts` and `index.ts` **as a single commit** (Git Trees API), or push them
   back-to-back and re-run CI on the final HEAD once both have landed.
9. **Build locally** (`npm run build`, not just tsc) — must be green before push
10. **Push, poll deployment, verify** on the live chapter page

## 2. Topic Grouping Rules

- **3–6 groups per chapter.** Fewer = wall of formulas; more = fragmentation.
- Group by **how the topic is taught**, not by textbook section numbers.
- Group order = classroom teaching order.
- Every group gets an `intro` (1–2 sentences, teacher voice: what unifies these formulas).
- `importantObservations` = the one-liners Ajay says in class that aren't formulas ("friction can be the forward force").
- `examNotes` only when there is a genuine exam-behaviour difference (how NEET vs JEE Advanced uses this group). Never filler.

## 3. Formula Writing Standards

- `expression` is **plain text with Unicode**, textbook style. It must look like what a student writes in a notebook.
- **NEVER use programming notation.** No underscores (`v_avg` ❌), no `*` for multiplication, no `sqrt()`.
- Multiplication: space or nothing — `(2u sinθ)/g`, `mv²/r`. Use `·` only between two variables that would otherwise merge confusingly (`kg·m/s` in units).
- Fractions: `/` with parentheses when the numerator or denominator has more than one term: `(m₁ − m₂)g / (m₁ + m₂)`.
- Superscripts/subscripts: Unicode where available (`u²`, `sin²θ`, `m₁`, `sₙ`, `vᵣ`). Where Unicode has no subscript (capital letters), use parenthetical form: `v(AB)`, `F(c)`, `T(top)`.
- Greek letters: real Unicode (`θ`, `μ`, `ω`, `Δ`, `α`). Minus sign: `−` (U+2212), not hyphen.
- One formula per card. Two closely-tied results may share a card ONLY if always taught together (e.g. Atwood a and T).
- `expressionLatex` is optional but encouraged for key formulas (future renderer).
- `label` = the name a teacher says aloud ("Third equation of motion"), max ~8 words.
- `id` format: `<chapter-prefix>-<short-kebab-name>` (e.g. `lom-banking-ideal`). **IDs are permanent once published** — see ID Stability Contract in `types.ts`.

## 4. Variable Standards

- List every symbol appearing in the expression — no orphans, no extras.
- `name` is lowercase, specific: "initial upward speed", not "velocity".
- Use `notes` for the clarifications Ajay would say in class ("μₖ < μₛ for the same surfaces").
- Symbols in the table must EXACTLY match symbols in the expression.

## 5. Unit & Dimension Standards

- SI units only. Composite units with `·`: `kg·m/s`, `N·s`.
- Dimensionless quantities: `unit: "dimensionless"`, `dimension: "[M⁰L⁰T⁰]"`.
- Angles: `unit: "rad (or °)"`, dimension `[M⁰L⁰T⁰]`.
- Dimension format: square brackets, Unicode exponents: `[MLT⁻²]`, `[LT⁻¹]`.

## 6. Derivation Guidelines

- Derivations only for formulas where the derivation itself is asked (Boards) or genuinely aids memory. Target: **2–4 per chapter**, not every formula.
- 3–5 steps maximum. Each step = one logical move. If it needs more, it belongs in Notes, not the formula sheet.
- Set `askedInBoards: true` only when it genuinely appears in board papers.
- `startsFrom` names the physical starting point, not "we begin by".

## 7. Common Mistakes Guidelines

- **This is the product differentiator.** Write them in Ajay's classroom voice.
- Each mistake must be a REAL error students make, stated with the correction: "N is not always mg — on an incline N = mg cosθ".
- 0–2 per formula. If a formula has no genuine common mistake, omit the field — never invent one.
- CAPS for the one emphasised word maximum ("the NET force").

## 8. Concept Link Guidelines

- `chapterSlug` must exist in `chapters.ts`. Cross-chapter links are allowed (a formula reused from kinematics links back to kinematics).
- `sectionHeading` must match the actual heading string in that chapter's notes file — verify, don't guess.
- `concept` is free text for AI/search: lowercase, noun phrase.

## 9. Exam Tagging & Frequency Guidelines

- Tag only exams where the formula is **distinctively relevant** — do NOT stamp all five tags on everything (badge noise, audit finding I2).
- `boards` tag = formula or its derivation appears in board theory papers.
- Frequency scale (calibrate against these anchors):
  - `very-high` — appears nearly every year in at least one exam (SUVAT, μN, mv²/r)
  - `high` — appears most years (angle of repose, impulse)
  - `medium` — every 2–3 years (nth-second displacement)
  - `low` — rare, completeness only
- `examStats`: fill with best estimates — they are **stored but not displayed** until the PYQ cross-count script exists. Do not agonise over exact numbers.
- `isKeyFormula: true` for 5–8 formulas per chapter; these MUST also appear in `quickRevisionIds` (curated order = revision priority).

## 10. Quality Checklist (all must pass before push)

- [ ] Slug verified against `chapters.ts`
- [ ] 3–6 topic groups, teaching order
- [ ] Zero programming notation in any `expression` (`grep '_' | grep expression` returns nothing)
- [ ] Every expression symbol has a matching variables-table row
- [ ] All units SI, all dimensions bracketed Unicode
- [ ] No duplicate `id` values (run the duplicate-ID scan)
- [ ] 2–4 derivations, ≤5 steps each
- [ ] Common mistakes are real and in teacher voice
- [ ] Concept links point at real chapters + real section headings
- [ ] 5–8 key formulas, all present in `quickRevisionIds`
- [ ] Exam tags trimmed to distinctive relevance
- [ ] Physics content verified against source material (Allen/Cengage) — values, conditions, signs
- [ ] All original wording — nothing copied verbatim from source PDFs
- [ ] `npm run build` green locally
- [ ] Push order: content file → registry

## 11. Effort Benchmark

Measured from the two completed chapters:
- Kinematics: 17 formulas / 6 groups / ~640 lines
- Laws of Motion: 18 formulas / 4 groups / ~490 lines

**Per-chapter estimate: one focused session (~60–90 min)** — 45–60 min authoring + verification, 15–20 min checklist/build/push/deploy-poll. Formula-dense chapters (Current Electricity, Ray Optics) may run to two sessions.
