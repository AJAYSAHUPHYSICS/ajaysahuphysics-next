import type { ChapterShortNotes } from "./kinematics-short";

export const workEnergyAndPowerShortNotes: ChapterShortNotes = {
  chapterName: "Work, Energy & Power",
  className: "11",
  groups: [
    {
      heading: "Work — Core Formulas",
      points: [
        "Constant force: W = F · d = Fd cosθ.",
        "Variable force (1-D): W = ∫ F(x) dx between initial and final x.",
        "Graphically: W = area under the F–x curve (area below the axis counts as negative).",
        "Work is a scalar; carries a sign, not a direction.",
      ],
    },
    {
      heading: "Sign of Work",
      points: [
        "Positive (θ < 90°): force favours motion — e.g. gravity on a falling body, a stretched spring's stretching force.",
        "Negative (θ > 90°): force opposes motion — e.g. friction, braking force.",
        "Zero: F = 0, or displacement = 0, or θ = 90° — e.g. centripetal force in circular motion, tension in a swinging pendulum, pushing an immovable wall.",
      ],
    },
    {
      heading: "Frame Dependence & Units",
      points: [
        "Force is frame-independent; displacement (and hence work) is frame-dependent.",
        "SI unit: joule (J) = 1 N·m = 1 kg·m²/s². CGS unit: erg (1 J = 10⁷ erg).",
        "1 eV = 1.6 × 10⁻¹⁹ J. Dimensions of work/energy: [ML²T⁻²].",
      ],
    },
    {
      heading: "Kinetic Energy & Work-Energy Theorem",
      points: [
        "KE = ½mv² — always ≥ 0, frame-dependent.",
        "Work-energy theorem: W_total (by ALL forces) = ΔKE = ½mv_f² − ½mv_i².",
        "Use this even when friction/other non-conservative forces are present — it never fails for a single body in an inertial frame.",
      ],
    },
    {
      heading: "Conservative vs Non-Conservative Forces",
      points: [
        "Conservative: work is path-independent, depends only on initial/final positions; work over a closed loop = 0. Examples: gravity, spring force, electrostatic force.",
        "Non-conservative: work depends on path taken. Example: friction, viscous/air drag.",
        "Central force: always directed along the line to a fixed centre, magnitude depends only on distance. All inverse-square-law forces (gravity, Coulomb) are central, and all central forces are conservative.",
      ],
    },
    {
      heading: "Potential Energy",
      points: [
        "Defined only for conservative forces. PE = work done against the force to bring the body from a zero-reference point to its current position.",
        "F = −dU/dx (one dimension). ΔU = −W_conservative.",
        "U can be +ve, −ve, or 0 depending on the chosen reference; only ΔU has physical meaning.",
      ],
    },
    {
      heading: "Equilibrium from a U–x Curve",
      points: [
        "Equilibrium points: where dU/dx = 0.",
        "Stable: d²U/dx² > 0 (U is a local minimum) — small displacement creates a restoring force.",
        "Unstable: d²U/dx² < 0 (U is a local maximum) — small displacement pushes the body further away.",
        "Neutral: d²U/dx² = 0 and U constant nearby — no restoring or repelling force.",
      ],
    },
    {
      heading: "Conservation of Mechanical Energy",
      points: [
        "E = K + U = constant, when only conservative internal forces act (no net external work).",
        "ΔK + ΔU = 0 — kinetic and potential energy trade off, but their sum is fixed.",
        "Breaks down the moment friction or any external force does net work — switch to the work-energy theorem instead.",
      ],
    },
    {
      heading: "Spring Force & Spring PE",
      points: [
        "Hooke's law: F = −kx. Spring PE: U = ½kx².",
        "Work to stretch from x₁ to x₂: W = ½k(x₂² − x₁²).",
        "PE ∝ x² — doubling deformation quadruples stored energy.",
      ],
    },
    {
      heading: "Spring-Block Special Cases",
      points: [
        "Block dropped from height h onto vertical spring, compresses by x: mg(h + x) = ½kx².",
        "Block (speed v) hits horizontal spring on smooth surface: max compression x_max = v√(m/k).",
        "Mass lowered gently onto vertical spring: equilibrium extension x = mg/k.",
        "Mass released suddenly (not lowered slowly) from natural length: max extension x_max = 2mg/k — double the equilibrium value.",
      ],
    },
    {
      heading: "Power",
      points: [
        "Average power: P_avg = ΔW/Δt = total work / total time.",
        "Instantaneous power: P = dW/dt = F · v.",
        "SI unit: watt (W) = J/s. 1 hp = 746 W. Dimensions: [ML²T⁻³].",
        "Area under P–t graph = work done. Slope of W–t graph = instantaneous power; slope of chord = average power.",
        "Efficiency η = (work output)/(energy input) — always < 1 for real machines.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Work done by centripetal force / normal reaction / tension perpendicular to motion is always zero — don't add it into work-energy equations.",
        "Don't confuse 'work done by gravity' with 'change in gravitational PE' — they're equal in magnitude but opposite in sign (W_gravity = −ΔU).",
        "Check whether a problem hands you mechanical-energy conservation (only conservative forces) or needs the full work-energy theorem (friction/external force present) before picking a method.",
        "Spring PE uses x measured from the spring's natural (relaxed) length, never from some other arbitrary reference.",
        "For motion starting from rest under constant power, v ∝ t^(1/2) and distance x ∝ t^(3/2) — a frequently tested result.",
      ],
    },
  ],
};
