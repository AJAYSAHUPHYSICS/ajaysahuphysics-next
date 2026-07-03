import type { ChapterFormulaSheet } from "./types";

// ─────────────────────────────────────────────────────────────────
// Laws of Motion — Formula Sheet
// Class 11
// ─────────────────────────────────────────────────────────────────

export const lawsOfMotionFormulaSheet: ChapterFormulaSheet = {
  chapterSlug: "laws-of-motion",
  chapterName: "Laws of Motion",
  className: "11",
  version: "1.0.0",
  lastUpdated: "2026-07-03",
  examCoverage: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
  quickRevisionIds: [
    "lom-second-law",
    "lom-friction-kinetic",
    "lom-friction-static-max",
    "lom-circular-centripetal",
    "lom-banking-ideal",
    "lom-pseudo-force",
  ],
  topicGroups: [
    // ── 1. Newton's Laws ─────────────────────────────────────────
    {
      id: "lom-newtons-laws",
      title: "Newton's Laws & Momentum",
      intro:
        "Force is the rate of change of momentum. Every other result in this chapter is bookkeeping around this single idea.",
      formulas: [
        {
          id: "lom-second-law",
          expression: "F = dp/dt = ma",
          expressionLatex: "\\vec{F} = \\dfrac{d\\vec{p}}{dt} = m\\vec{a}",
          label: "Newton's second law",
          derivedFrom: "F = ma holds only when mass is constant; F = dp/dt is the general form",
          variables: [
            { symbol: "F", name: "net external force", unit: "N", dimension: "[MLT⁻²]" },
            { symbol: "p", name: "linear momentum (mv)", unit: "kg·m/s", dimension: "[MLT⁻¹]" },
            { symbol: "m", name: "mass", unit: "kg", dimension: "[M]" },
            { symbol: "a", name: "acceleration", unit: "m/s²", dimension: "[LT⁻²]" },
          ],
          conditions: ["F must be the NET force", "Valid in inertial frames only"],
          commonMistakes: [
            "Using F = ma for variable-mass systems (rocket, falling chain) — use F = dp/dt there",
            "Forgetting that a is along the NET force, not along the motion",
          ],
          usedIn: ["kinematics", "work-energy-and-power", "centre-of-mass-and-collisions"],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "2. Newton's Second Law",
            concept: "force as rate of change of momentum",
          },
          examTags: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 14, jeeAdvanced: 8, neet: 16, mhtCet: 11 },
          difficulty: "easy",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["newton second law", "F = ma", "dp/dt", "momentum rate"],
        },
        {
          id: "lom-impulse",
          expression: "J = F Δt = Δp",
          expressionLatex: "\\vec{J} = \\vec{F}\\,\\Delta t = \\Delta\\vec{p}",
          label: "Impulse–momentum theorem",
          derivedFrom: "Integrating F = dp/dt over the contact time",
          variables: [
            { symbol: "J", name: "impulse", unit: "N·s", dimension: "[MLT⁻¹]" },
            { symbol: "Δp", name: "change in momentum", unit: "kg·m/s", dimension: "[MLT⁻¹]" },
            { symbol: "Δt", name: "duration of force", unit: "s", dimension: "[T]" },
          ],
          conditions: ["For variable force, J = area under the F–t graph"],
          commonMistakes: [
            "Impulse equals CHANGE in momentum (vector subtraction) — for a ball bouncing back, magnitudes add",
          ],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "3. Impulse",
            concept: "impulse-momentum theorem",
          },
          examTags: ["jee-main", "neet", "mht-cet"],
          frequency: "high",
          examStats: { jeeMain: 7, neet: 9, mhtCet: 6 },
          difficulty: "easy",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["impulse", "F delta t", "area under F-t graph"],
        },
        {
          id: "lom-apparent-weight-lift",
          expression: "N = m(g ± a)",
          expressionLatex: "N = m(g \\pm a)",
          label: "Apparent weight in a lift",
          derivedFrom: "Newton's second law on the person: N − mg = ±ma",
          variables: [
            { symbol: "N", name: "normal reaction (apparent weight)", unit: "N", dimension: "[MLT⁻²]" },
            { symbol: "a", name: "lift's acceleration", unit: "m/s²", dimension: "[LT⁻²]" },
          ],
          conditions: [
            "+a when the lift accelerates upward",
            "−a when it accelerates downward",
            "N = 0 in free fall (weightlessness)",
          ],
          commonMistakes: [
            "Direction of VELOCITY is irrelevant — only the direction of acceleration decides the sign",
          ],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "4. Applications of Newton's Laws",
            concept: "apparent weight in accelerating lift",
          },
          examTags: ["jee-main", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 8, neet: 13, mhtCet: 9 },
          difficulty: "easy",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["apparent weight", "lift", "elevator", "weightlessness"],
        },
        {
          id: "lom-pseudo-force",
          expression: "F(pseudo) = −m a(frame)",
          expressionLatex: "\\vec{F}_{pseudo} = -m\\vec{a}_{frame}",
          label: "Pseudo force (non-inertial frame)",
          variables: [
            { symbol: "m", name: "mass of the object being analysed", unit: "kg", dimension: "[M]" },
            { symbol: "a(frame)", name: "acceleration of the reference frame", unit: "m/s²", dimension: "[LT⁻²]" },
          ],
          conditions: [
            "Apply ONLY when solving from inside an accelerating frame",
            "Direction is opposite to the frame's acceleration",
          ],
          commonMistakes: [
            "Adding a pseudo force while also working in the ground frame — double counting; pick one frame and stay in it",
          ],
          usedIn: ["gravitation", "system-of-particles-and-rotational-motion"],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "5. Non-inertial Frames",
            concept: "pseudo force",
          },
          examTags: ["jee-main", "jee-advanced", "neet"],
          frequency: "high",
          examStats: { jeeMain: 6, jeeAdvanced: 5, neet: 5 },
          difficulty: "medium",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["pseudo force", "fictitious force", "non-inertial frame"],
        },
      ],
      importantObservations: [
        "Newton's third law pairs act on DIFFERENT bodies — they never cancel each other",
        "A body moving at constant velocity has zero net force on it, no matter how fast it moves",
      ],
      examNotes:
        "NEET tests the laws directly; JEE hides them inside connected-body and constraint problems — always start with a free body diagram.",
    },

    // ── 2. Connected Bodies ──────────────────────────────────────
    {
      id: "lom-connected-bodies",
      title: "Connected Bodies & Strings",
      intro:
        "Same string, same tension (if massless and frictionless pulley); same rigid connection, same acceleration magnitude.",
      formulas: [
        {
          id: "lom-atwood",
          expression: "a = (m₁ − m₂)g / (m₁ + m₂),  T = 2m₁m₂g / (m₁ + m₂)",
          expressionLatex: "a = \\dfrac{(m_1 - m_2)g}{m_1 + m_2},\\quad T = \\dfrac{2m_1 m_2 g}{m_1 + m_2}",
          label: "Atwood machine (two masses over a pulley)",
          derivedFrom: "Newton's second law on each mass, tension common",
          derivation: {
            startsFrom: "Second law on each block (m₁ > m₂), taking downward positive for m₁",
            steps: [
              { statement: "For m₁ (moves down)", expression: "m₁g − T = m₁a" },
              { statement: "For m₂ (moves up)", expression: "T − m₂g = m₂a" },
              { statement: "Add the two equations", expression: "(m₁ − m₂)g = (m₁ + m₂)a" },
              { statement: "Solve for a, substitute back for T", expression: "a = (m₁−m₂)g/(m₁+m₂)" },
            ],
          },
          variables: [
            { symbol: "m₁, m₂", name: "the two hanging masses (m₁ > m₂)", unit: "kg", dimension: "[M]" },
            { symbol: "T", name: "string tension", unit: "N", dimension: "[MLT⁻²]" },
          ],
          conditions: ["Massless, inextensible string", "Frictionless, massless pulley"],
          commonMistakes: [
            "T is NOT the average of the two weights — it always lies between m₂g and m₁g, closer to the geometric mean",
          ],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "6. Connected Body Problems",
            concept: "Atwood machine",
          },
          examTags: ["jee-main", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 9, neet: 11, mhtCet: 8 },
          difficulty: "medium",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["atwood machine", "pulley", "two masses"],
        },
        {
          id: "lom-contact-force",
          expression: "a = F / (m₁ + m₂),  contact force = m₂F / (m₁ + m₂)",
          label: "Two blocks pushed together on a smooth surface",
          derivedFrom: "System equation for a; second law on the rear block alone for contact force",
          variables: [
            { symbol: "F", name: "applied force (on block m₁)", unit: "N", dimension: "[MLT⁻²]" },
            { symbol: "m₁, m₂", name: "front and rear block masses", unit: "kg", dimension: "[M]" },
          ],
          conditions: ["Smooth surface", "Blocks stay in contact"],
          commonMistakes: [
            "Contact force changes if you push from the other side — it becomes m₁F/(m₁+m₂)",
          ],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "6. Connected Body Problems",
            concept: "contact forces between blocks",
          },
          examTags: ["jee-main", "neet", "mht-cet"],
          frequency: "high",
          examStats: { jeeMain: 6, neet: 8, mhtCet: 7 },
          difficulty: "easy",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["contact force", "blocks in contact", "pushed blocks"],
        },
      ],
      importantObservations: [
        "For n identical connected blocks pulled by force F, tension after the kth block from the front = F(n−k)/n",
      ],
    },

    // ── 3. Friction ──────────────────────────────────────────────
    {
      id: "lom-friction",
      title: "Friction",
      intro:
        "Static friction is self-adjusting up to a maximum; kinetic friction is constant. Confusing the two is the #1 error in this chapter.",
      formulas: [
        {
          id: "lom-friction-static-max",
          expression: "f(s,max) = μₛN",
          expressionLatex: "f_{s,max} = \\mu_s N",
          label: "Maximum static friction (limiting friction)",
          variables: [
            { symbol: "μₛ", name: "coefficient of static friction", unit: "dimensionless", dimension: "[M⁰L⁰T⁰]" },
            { symbol: "N", name: "normal reaction", unit: "N", dimension: "[MLT⁻²]" },
          ],
          conditions: [
            "Actual static friction f ≤ μₛN — it equals whatever is needed to prevent sliding, up to this cap",
          ],
          commonMistakes: [
            "Writing f = μₛN when the body is at rest with a small applied force — static friction equals the APPLIED force there, not its maximum",
          ],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "7. Friction",
            concept: "static friction is self-adjusting",
          },
          examTags: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 12, jeeAdvanced: 6, neet: 14, mhtCet: 10 },
          difficulty: "easy",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["static friction", "limiting friction", "mu s N"],
        },
        {
          id: "lom-friction-kinetic",
          expression: "f(k) = μₖN",
          expressionLatex: "f_k = \\mu_k N",
          label: "Kinetic friction",
          variables: [
            { symbol: "μₖ", name: "coefficient of kinetic friction", unit: "dimensionless", dimension: "[M⁰L⁰T⁰]", notes: "μₖ < μₛ for the same pair of surfaces" },
            { symbol: "N", name: "normal reaction", unit: "N", dimension: "[MLT⁻²]" },
          ],
          conditions: ["Surfaces sliding relative to each other", "Direction opposes RELATIVE sliding"],
          commonMistakes: [
            "N is not always mg — on an incline N = mg cosθ; with a pulling force at angle θ, N = mg − F sinθ",
          ],
          usedIn: ["work-energy-and-power"],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "7. Friction",
            concept: "kinetic friction",
          },
          examTags: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 13, jeeAdvanced: 5, neet: 15, mhtCet: 11 },
          difficulty: "easy",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["kinetic friction", "mu k N", "sliding friction"],
        },
        {
          id: "lom-angle-of-repose",
          expression: "tan θ(repose) = μₛ",
          expressionLatex: "\\tan\\theta_{repose} = \\mu_s",
          label: "Angle of repose",
          derivedFrom: "On the verge of sliding on an incline: mg sinθ = μₛ mg cosθ",
          variables: [
            { symbol: "θ(repose)", name: "maximum incline angle before sliding starts", unit: "rad (or °)", dimension: "[M⁰L⁰T⁰]" },
          ],
          conditions: ["Body on the verge of sliding under gravity alone"],
          commonMistakes: [
            "Angle of repose equals angle of friction (tan⁻¹ μₛ) — two names, one number",
          ],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "7. Friction",
            concept: "angle of repose and angle of friction",
          },
          examTags: ["jee-main", "neet", "mht-cet", "boards"],
          frequency: "high",
          examStats: { jeeMain: 5, neet: 9, mhtCet: 7 },
          difficulty: "easy",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["angle of repose", "angle of friction", "tan theta mu"],
        },
        {
          id: "lom-incline-acceleration",
          expression: "a = g(sinθ − μₖ cosθ)",
          expressionLatex: "a = g(\\sin\\theta - \\mu_k\\cos\\theta)",
          label: "Acceleration sliding down a rough incline",
          derivedFrom: "Second law along the incline with kinetic friction acting up the slope",
          variables: [
            { symbol: "θ", name: "incline angle", unit: "rad (or °)", dimension: "[M⁰L⁰T⁰]" },
            { symbol: "μₖ", name: "coefficient of kinetic friction", unit: "dimensionless", dimension: "[M⁰L⁰T⁰]" },
          ],
          conditions: ["Sliding down; for a block pushed UP the incline, friction reverses: a = g(sinθ + μₖ cosθ) deceleration"],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "7. Friction",
            concept: "motion on rough incline",
          },
          examTags: ["jee-main", "neet", "mht-cet"],
          frequency: "very-high",
          examStats: { jeeMain: 8, neet: 12, mhtCet: 9 },
          difficulty: "medium",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["rough incline", "sliding down", "g sin theta minus mu"],
        },
      ],
      importantObservations: [
        "Friction can be the FORWARD force — it is what accelerates a walking person and a car's driven wheels",
        "Friction is independent of contact area (for the ideal dry-friction model used in JEE/NEET)",
      ],
      examNotes:
        "JEE Advanced favourite: blocks stacked on blocks, asking whether they move together or slip — compare required friction with maximum available friction.",
    },

    // ── 4. Circular Dynamics ─────────────────────────────────────
    {
      id: "lom-circular-dynamics",
      title: "Dynamics of Circular Motion",
      intro:
        "Centripetal force is not a new force — it is the NET inward force required to keep the body on the circle. Something real (tension, friction, gravity, normal) must supply it.",
      formulas: [
        {
          id: "lom-circular-centripetal",
          expression: "F(c) = mv²/r = mω²r",
          expressionLatex: "F_c = \\dfrac{mv^2}{r} = m\\omega^2 r",
          label: "Centripetal force",
          variables: [
            { symbol: "v", name: "speed along the circle", unit: "m/s", dimension: "[LT⁻¹]" },
            { symbol: "r", name: "radius of the circle", unit: "m", dimension: "[L]" },
            { symbol: "ω", name: "angular speed", unit: "rad/s", dimension: "[T⁻¹]" },
          ],
          conditions: ["Directed toward the centre, always perpendicular to velocity"],
          commonMistakes: [
            "Adding centripetal force as an extra force in the free body diagram — it is the RESULT of real forces, not one of them",
          ],
          usedIn: ["gravitation", "system-of-particles-and-rotational-motion"],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "8. Circular Motion Dynamics",
            concept: "centripetal force",
          },
          examTags: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 11, jeeAdvanced: 6, neet: 14, mhtCet: 10 },
          difficulty: "easy",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["centripetal force", "mv squared by r", "circular motion"],
        },
        {
          id: "lom-max-speed-flat-turn",
          expression: "v(max) = √(μₛ g r)",
          expressionLatex: "v_{max} = \\sqrt{\\mu_s g r}",
          label: "Maximum speed on a flat (unbanked) turn",
          derivedFrom: "Friction supplies the centripetal force: μₛmg = mv²/r",
          variables: [
            { symbol: "μₛ", name: "coefficient of static friction (tyres–road)", unit: "dimensionless", dimension: "[M⁰L⁰T⁰]" },
            { symbol: "r", name: "radius of the turn", unit: "m", dimension: "[L]" },
          ],
          conditions: ["Flat road", "Static friction (tyres roll without skidding)"],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "8. Circular Motion Dynamics",
            concept: "turning on a flat road",
          },
          examTags: ["jee-main", "neet", "mht-cet", "boards"],
          frequency: "high",
          examStats: { jeeMain: 6, neet: 10, mhtCet: 8 },
          difficulty: "easy",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["flat turn", "maximum speed", "root mu g r"],
        },
        {
          id: "lom-banking-ideal",
          expression: "tan θ = v²/rg",
          expressionLatex: "\\tan\\theta = \\dfrac{v^2}{rg}",
          label: "Ideal banking angle (no friction needed)",
          derivedFrom: "Horizontal component of normal reaction supplies the centripetal force",
          derivation: {
            startsFrom: "Resolve N on the banked surface: vertical balance and horizontal circle equation",
            steps: [
              { statement: "Vertical equilibrium", expression: "N cosθ = mg" },
              { statement: "Horizontal (centripetal) equation", expression: "N sinθ = mv²/r" },
              { statement: "Divide the two", expression: "tanθ = v²/rg" },
            ],
            askedInBoards: true,
          },
          variables: [
            { symbol: "θ", name: "banking angle", unit: "rad (or °)", dimension: "[M⁰L⁰T⁰]" },
            { symbol: "v", name: "design speed of the turn", unit: "m/s", dimension: "[LT⁻¹]" },
          ],
          conditions: ["At exactly this speed, no friction is required"],
          commonMistakes: [
            "With friction included, there is a RANGE of safe speeds around the design speed — JEE asks for v(max) with friction: v² = rg(tanθ + μ)/(1 − μ tanθ)",
          ],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "8. Circular Motion Dynamics",
            concept: "banking of roads",
          },
          examTags: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 9, jeeAdvanced: 4, neet: 12, mhtCet: 9 },
          difficulty: "medium",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["banking of road", "banked turn", "tan theta v squared rg"],
        },
        {
          id: "lom-vertical-circle",
          expression: "v(top,min) = √(gr),  v(bottom,min) = √(5gr)",
          expressionLatex: "v_{top,min} = \\sqrt{gr},\\quad v_{bottom,min} = \\sqrt{5gr}",
          label: "Minimum speeds in a vertical circle (string)",
          derivedFrom: "At the top, gravity alone supplies centripetal force (T = 0); energy conservation connects top to bottom",
          variables: [
            { symbol: "r", name: "radius of the vertical circle", unit: "m", dimension: "[L]" },
          ],
          conditions: [
            "String or track that can only PULL/PUSH inward — for a rod, v(top,min) = 0",
          ],
          commonMistakes: [
            "Applying √(5gr) to a rod or a tube — the 5gr result is only for strings where tension cannot be negative",
          ],
          usedIn: ["work-energy-and-power"],
          conceptLink: {
            chapterSlug: "laws-of-motion",
            sectionHeading: "8. Circular Motion Dynamics",
            concept: "motion in a vertical circle",
          },
          examTags: ["jee-main", "jee-advanced", "neet", "mht-cet"],
          frequency: "high",
          examStats: { jeeMain: 7, jeeAdvanced: 5, neet: 10, mhtCet: 6 },
          difficulty: "medium",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["vertical circle", "root 5gr", "minimum speed top"],
        },
      ],
      importantObservations: [
        "Tension in a vertical circle is maximum at the bottom and minimum at the top: T(bottom) − T(top) = 6mg for a string",
        "In uniform circular motion, speed is constant but velocity is not — there is always acceleration",
      ],
      examNotes:
        "NEET loves the √(5gr) one-liner; JEE Advanced replaces the string with rods, tubes, and inside-surface tracks — re-derive from the free body diagram each time.",
    },
  ],
};
