import type { ChapterFormulaSheet } from "./types";

// ─────────────────────────────────────────────────────────────────
// Work, Energy & Power — Formula Sheet
// Class 11
// ─────────────────────────────────────────────────────────────────

export const workEnergyAndPowerFormulaSheet: ChapterFormulaSheet = {
  chapterSlug: "work-energy-and-power",
  chapterName: "Work, Energy & Power",
  className: "11",
  version: "1.0.0",
  lastUpdated: "2026-07-03",
  examCoverage: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
  quickRevisionIds: [
    "wep-work-constant-force",
    "wep-work-energy-theorem",
    "wep-kinetic-energy",
    "wep-spring-pe",
    "wep-power-instantaneous",
    "wep-ke-momentum",
  ],
  topicGroups: [
    // ── 1. Work ──────────────────────────────────────────────────
    {
      id: "wep-work",
      title: "Work Done by a Force",
      intro:
        "Work is force times displacement along the force. The angle between them decides everything — including whether work is positive, negative, or zero.",
      formulas: [
        {
          id: "wep-work-constant-force",
          expression: "W = F s cosθ",
          expressionLatex: "W = \\vec{F}\\cdot\\vec{s} = Fs\\cos\\theta",
          label: "Work by a constant force",
          variables: [
            { symbol: "W", name: "work done", unit: "J", dimension: "[ML²T⁻²]" },
            { symbol: "F", name: "magnitude of the force", unit: "N", dimension: "[MLT⁻²]" },
            { symbol: "s", name: "magnitude of displacement", unit: "m", dimension: "[L]" },
            { symbol: "θ", name: "angle between force and displacement", unit: "rad (or °)", dimension: "[M⁰L⁰T⁰]" },
          ],
          conditions: ["Constant force only — for variable force, integrate"],
          commonMistakes: [
            "Work by friction is not always negative — on the lower block of a stacked pair, friction does POSITIVE work",
            "Normal force and centripetal force do zero work (θ = 90°), no matter how large they are",
          ],
          usedIn: ["laws-of-motion", "system-of-particles-and-rotational-motion"],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "1. Work",
            concept: "work done by a constant force",
          },
          examTags: ["jee-main", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 10, neet: 13, mhtCet: 9 },
          difficulty: "easy",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["work done", "F s cos theta", "dot product work"],
        },
        {
          id: "wep-work-variable-force",
          expression: "W = ∫ F dx  (area under the F–x graph)",
          expressionLatex: "W = \\int F\\,dx",
          label: "Work by a variable force",
          derivedFrom: "Summing F·dx over infinitesimal displacements",
          variables: [
            { symbol: "F", name: "force as a function of position", unit: "N", dimension: "[MLT⁻²]" },
            { symbol: "dx", name: "infinitesimal displacement", unit: "m", dimension: "[L]" },
          ],
          conditions: ["Area below the x-axis counts as negative work"],
          commonMistakes: [
            "Plugging the final x into W = Fx for a variable force — you must integrate or take graph area",
          ],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "1. Work",
            concept: "work by variable force as integral",
          },
          examTags: ["jee-main", "jee-advanced", "neet"],
          frequency: "high",
          examStats: { jeeMain: 8, jeeAdvanced: 4, neet: 7 },
          difficulty: "medium",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["variable force", "integral F dx", "area under F-x graph"],
        },
      ],
      importantObservations: [
        "Work is a scalar but carries a sign — the sign tells whether energy flows into or out of the body",
        "Work depends on the frame of reference: the same force can do different work in different frames",
      ],
    },

    // ── 2. Energy & the Work-Energy Theorem ──────────────────────
    {
      id: "wep-energy",
      title: "Kinetic Energy & the Work-Energy Theorem",
      intro:
        "The work-energy theorem is the fastest route in mechanics — it skips time and acceleration entirely and connects force directly to speed.",
      formulas: [
        {
          id: "wep-kinetic-energy",
          expression: "K = ½mv²",
          expressionLatex: "K = \\tfrac{1}{2}mv^2",
          label: "Kinetic energy",
          variables: [
            { symbol: "K", name: "kinetic energy", unit: "J", dimension: "[ML²T⁻²]" },
            { symbol: "m", name: "mass", unit: "kg", dimension: "[M]" },
            { symbol: "v", name: "speed", unit: "m/s", dimension: "[LT⁻¹]" },
          ],
          conditions: ["Always non-negative", "Frame-dependent"],
          usedIn: ["centre-of-mass-and-collisions", "thermodynamics"],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "2. Kinetic Energy",
            concept: "kinetic energy",
          },
          examTags: ["jee-main", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 9, neet: 14, mhtCet: 10 },
          difficulty: "easy",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["kinetic energy", "half m v squared"],
        },
        {
          id: "wep-ke-momentum",
          expression: "K = p²/2m,   p = √(2mK)",
          expressionLatex: "K = \\dfrac{p^2}{2m}",
          label: "Kinetic energy ↔ momentum relation",
          derivedFrom: "Substituting v = p/m into K = ½mv²",
          variables: [
            { symbol: "p", name: "linear momentum", unit: "kg·m/s", dimension: "[MLT⁻¹]" },
            { symbol: "K", name: "kinetic energy", unit: "J", dimension: "[ML²T⁻²]" },
          ],
          commonMistakes: [
            "If momentum doubles, KE becomes FOUR times — students often say two times",
            "Two bodies with equal KE do NOT have equal momentum unless masses are equal — the heavier one has more momentum",
          ],
          usedIn: ["centre-of-mass-and-collisions", "dual-nature-of-radiation-and-matter"],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "2. Kinetic Energy",
            concept: "kinetic energy momentum relation",
          },
          examTags: ["jee-main", "neet", "mht-cet"],
          frequency: "very-high",
          examStats: { jeeMain: 8, neet: 12, mhtCet: 8 },
          difficulty: "easy",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["p squared by 2m", "momentum kinetic energy relation"],
        },
        {
          id: "wep-work-energy-theorem",
          expression: "W(net) = ΔK = K(f) − K(i)",
          expressionLatex: "W_{net} = \\Delta K = K_f - K_i",
          label: "Work-energy theorem",
          derivedFrom: "Integrating F = ma over displacement using a = v dv/dx",
          derivation: {
            startsFrom: "Newton's second law with a = v dv/dx",
            steps: [
              { statement: "Write the net force along motion", expression: "F(net) = m v dv/dx" },
              { statement: "Multiply both sides by dx and integrate", expression: "∫ F(net) dx = ∫ᵤᵛ m v dv" },
              { statement: "Left side is net work; evaluate the right side", expression: "W(net) = ½mv² − ½mu²" },
            ],
            askedInBoards: true,
          },
          variables: [
            { symbol: "W(net)", name: "work done by ALL forces", unit: "J", dimension: "[ML²T⁻²]" },
            { symbol: "K(f), K(i)", name: "final and initial kinetic energies", unit: "J", dimension: "[ML²T⁻²]" },
          ],
          conditions: ["W must include EVERY force: gravity, friction, normal, applied, tension"],
          commonMistakes: [
            "Using only the applied force's work — the theorem needs the NET work",
            "It holds even for variable forces and curved paths — students wrongly restrict it to constant force",
          ],
          usedIn: ["laws-of-motion", "gravitation"],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "3. Work-Energy Theorem",
            concept: "work-energy theorem",
          },
          examTags: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 12, jeeAdvanced: 7, neet: 15, mhtCet: 10 },
          difficulty: "medium",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["work energy theorem", "net work change in kinetic energy"],
        },
      ],
      importantObservations: [
        "Choose the work-energy theorem when the question gives distances and speeds but not time",
      ],
      examNotes:
        "JEE Advanced applies the theorem on curved and rough paths where F = ma is painful — recognising when to switch tools is the real skill tested.",
    },

    // ── 3. Potential Energy & Conservation ───────────────────────
    {
      id: "wep-potential-conservation",
      title: "Potential Energy & Conservation of Mechanical Energy",
      intro:
        "Potential energy exists only for conservative forces. When only such forces act, K + U stays constant — the most powerful shortcut in mechanics.",
      formulas: [
        {
          id: "wep-gravitational-pe",
          expression: "U = mgh",
          expressionLatex: "U = mgh",
          label: "Gravitational potential energy (near Earth)",
          variables: [
            { symbol: "U", name: "potential energy relative to the chosen reference", unit: "J", dimension: "[ML²T⁻²]" },
            { symbol: "h", name: "height above the reference level", unit: "m", dimension: "[L]" },
            { symbol: "g", name: "acceleration due to gravity", unit: "m/s²", dimension: "[LT⁻²]" },
          ],
          conditions: ["Valid for h ≪ Earth's radius", "Only CHANGES in U are physical — the zero level is your free choice"],
          usedIn: ["gravitation", "oscillations"],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "4. Potential Energy",
            concept: "gravitational potential energy",
          },
          examTags: ["neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { neet: 13, mhtCet: 9 },
          difficulty: "easy",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["mgh", "gravitational potential energy"],
        },
        {
          id: "wep-spring-pe",
          expression: "U = ½kx²",
          expressionLatex: "U = \\tfrac{1}{2}kx^2",
          label: "Elastic potential energy of a spring",
          derivedFrom: "Work done against the spring force: ∫kx dx from 0 to x",
          derivation: {
            startsFrom: "Spring force F = kx opposing the stretch",
            steps: [
              { statement: "Work done against the spring for stretch dx", expression: "dW = kx dx" },
              { statement: "Integrate from 0 to x", expression: "U = ∫₀ˣ kx dx = ½kx²" },
            ],
          },
          variables: [
            { symbol: "k", name: "spring constant", unit: "N/m", dimension: "[MT⁻²]" },
            { symbol: "x", name: "extension or compression from natural length", unit: "m", dimension: "[L]" },
          ],
          conditions: ["x is measured from NATURAL length, never from the equilibrium position of a hanging load"],
          commonMistakes: [
            "Energy stored going from stretch x₁ to x₂ is ½k(x₂² − x₁²), NOT ½k(x₂ − x₁)²",
          ],
          usedIn: ["oscillations"],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "4. Potential Energy",
            concept: "elastic potential energy",
          },
          examTags: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 10, jeeAdvanced: 5, neet: 12, mhtCet: 8 },
          difficulty: "easy",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["spring energy", "half k x squared", "elastic potential energy"],
        },
        {
          id: "wep-force-from-pe",
          expression: "F = −dU/dx",
          expressionLatex: "F = -\\dfrac{dU}{dx}",
          label: "Conservative force from potential energy",
          variables: [
            { symbol: "F", name: "conservative force along x", unit: "N", dimension: "[MLT⁻²]" },
            { symbol: "U", name: "potential energy function", unit: "J", dimension: "[ML²T⁻²]" },
          ],
          conditions: [
            "Equilibrium where dU/dx = 0",
            "Stable if U is a minimum (d²U/dx² > 0), unstable if a maximum",
          ],
          commonMistakes: [
            "Dropping the minus sign — force points from HIGH potential energy toward LOW",
          ],
          usedIn: ["oscillations", "gravitation"],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "4. Potential Energy",
            concept: "force as negative gradient of potential energy",
          },
          examTags: ["jee-main", "jee-advanced", "neet"],
          frequency: "high",
          examStats: { jeeMain: 8, jeeAdvanced: 6, neet: 6 },
          difficulty: "medium",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["F minus dU dx", "stable unstable equilibrium", "potential energy curve"],
        },
        {
          id: "wep-mechanical-energy-conservation",
          expression: "K(i) + U(i) = K(f) + U(f)",
          expressionLatex: "K_i + U_i = K_f + U_f",
          label: "Conservation of mechanical energy",
          derivedFrom: "Work-energy theorem when only conservative forces act",
          variables: [
            { symbol: "K", name: "kinetic energy", unit: "J", dimension: "[ML²T⁻²]" },
            { symbol: "U", name: "total potential energy (all forms)", unit: "J", dimension: "[ML²T⁻²]" },
          ],
          conditions: [
            "ONLY when non-conservative forces (friction, air drag) do zero work",
            "With friction: K(i) + U(i) = K(f) + U(f) + heat generated",
          ],
          commonMistakes: [
            "Applying it across a collision — collisions generally destroy mechanical energy unless stated perfectly elastic",
          ],
          usedIn: ["gravitation", "oscillations", "centre-of-mass-and-collisions"],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "5. Conservation of Mechanical Energy",
            concept: "conservation of mechanical energy",
          },
          examTags: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 11, jeeAdvanced: 6, neet: 14, mhtCet: 9 },
          difficulty: "easy",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["conservation of energy", "K plus U constant"],
        },
      ],
      importantObservations: [
        "Work by a conservative force over any closed loop is zero — that is the defining test",
        "In a vertical circle (string), the √(5gr) result of Laws of Motion comes from combining energy conservation with the top-point condition",
      ],
    },

    // ── 4. Power ─────────────────────────────────────────────────
    {
      id: "wep-power",
      title: "Power",
      intro:
        "Power is the rate of doing work. The F·v form is the exam favourite — it connects engines, pumps, and vehicles to forces directly.",
      formulas: [
        {
          id: "wep-power-average",
          expression: "P(avg) = W / t",
          expressionLatex: "P_{avg} = \\dfrac{W}{t}",
          label: "Average power",
          variables: [
            { symbol: "P(avg)", name: "average power", unit: "W", dimension: "[ML²T⁻³]" },
            { symbol: "W", name: "work done", unit: "J", dimension: "[ML²T⁻²]" },
            { symbol: "t", name: "time taken", unit: "s", dimension: "[T]" },
          ],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "6. Power",
            concept: "average power",
          },
          examTags: ["neet", "mht-cet", "boards"],
          frequency: "high",
          examStats: { neet: 9, mhtCet: 7 },
          difficulty: "easy",
          isKeyFormula: false,
          pdfInclude: true,
          searchKeywords: ["average power", "work by time"],
        },
        {
          id: "wep-power-instantaneous",
          expression: "P = F v cosθ",
          expressionLatex: "P = \\vec{F}\\cdot\\vec{v} = Fv\\cos\\theta",
          label: "Instantaneous power",
          derivedFrom: "P = dW/dt with dW = F·ds",
          variables: [
            { symbol: "P", name: "instantaneous power", unit: "W", dimension: "[ML²T⁻³]" },
            { symbol: "F", name: "force", unit: "N", dimension: "[MLT⁻²]" },
            { symbol: "v", name: "instantaneous speed", unit: "m/s", dimension: "[LT⁻¹]" },
            { symbol: "θ", name: "angle between force and velocity", unit: "rad (or °)", dimension: "[M⁰L⁰T⁰]" },
          ],
          commonMistakes: [
            "A car at TOP speed has engine force = resistive force, so P = F(resistive) × v(max) — the classic pump/vehicle question",
            "Pump problems: P = (dm/dt)gh for lifting, plus ½(dm/dt)v² if the water leaves with speed v",
          ],
          conceptLink: {
            chapterSlug: "work-energy-and-power",
            sectionHeading: "6. Power",
            concept: "instantaneous power",
          },
          examTags: ["jee-main", "jee-advanced", "neet", "mht-cet", "boards"],
          frequency: "very-high",
          examStats: { jeeMain: 9, jeeAdvanced: 4, neet: 11, mhtCet: 8 },
          difficulty: "easy",
          isKeyFormula: true,
          pdfInclude: true,
          searchKeywords: ["instantaneous power", "F dot v", "pump power", "car maximum speed"],
        },
      ],
      importantObservations: [
        "1 horsepower = 746 W; 1 kWh = 3.6 × 10⁶ J (a unit of ENERGY, not power — NEET one-liner)",
      ],
      examNotes:
        "NEET repeats the pump-lifting-water calculation almost every alternate year; JEE Main prefers constant-power motion, where v ∝ √t and x ∝ t³ᐟ².",
    },
  ],
};
