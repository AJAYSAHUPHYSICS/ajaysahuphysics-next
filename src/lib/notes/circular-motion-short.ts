import type { ChapterShortNotes } from "./kinematics-short";

export const circularMotionShortNotes: ChapterShortNotes = {
  chapterName: "Circular Motion",
  className: "11",
  groups: [
    {
      heading: "Angular Quantities — Core Formulas",
      points: [
        "ω = dθ/dt = 2πf = 2π/T (rad/s)",
        "α = dω/dt = d²θ/dt² (rad/s²)",
        "Equations of motion: ω = ω₀ + αt | θ = ω₀t + ½αt² | ω² = ω₀² + 2αθ",
        "ω is an axial vector — direction via right-hand rule along the axis of rotation.",
      ],
    },
    {
      heading: "Linear ↔ Angular Relations",
      points: [
        "s = rθ, v = rω, a_t = rα (θ, ω, α must be in radians).",
        "v is always tangent to the circular path.",
      ],
    },
    {
      heading: "Acceleration in Circular Motion",
      points: [
        "Centripetal (radial) acceleration: a_c = v²/r = ω²r — always points toward the centre.",
        "Tangential acceleration: a_t = dv/dt = rα — present only in non-uniform circular motion.",
        "Total acceleration: a = √(a_c² + a_t²); in UNIFORM circular motion, a_t = 0 so a = a_c.",
      ],
    },
    {
      heading: "Centripetal Force",
      points: [
        "F_c = mv²/r = mω²r — NOT a separate force; it's the name for whatever net real force points toward the centre.",
        "Always identify which real force (tension/friction/gravity/normal reaction) is acting as the centripetal force.",
      ],
    },
    {
      heading: "Vehicle on Roads",
      points: [
        "Flat (unbanked) road: max safe speed v_max = √(μₛRg); independent of vehicle mass.",
        "Banked road (no friction): tanθ = v²/(Rg).",
        "Banking lets part of the normal reaction supply centripetal force, reducing reliance on friction.",
      ],
    },
    {
      heading: "Conical Pendulum",
      points: [
        "Speed: v = √(rg tanθ) = √(Lg sinθ tanθ), where r = L sinθ.",
        "Time period: T = 2π√(L cosθ/g).",
        "T cosθ = mg (vertical); T sinθ = mv²/r (horizontal, centripetal).",
      ],
    },
    {
      heading: "Centrifugal Force",
      points: [
        "Pseudo force, magnitude mω²r, directed radially outward.",
        "Appears ONLY in a rotating (non-inertial) frame; ground-frame observers never need it.",
        "No Newton's third law reaction pair — it's fictitious.",
      ],
    },
    {
      heading: "Vertical Circular Motion — The Three Conditions",
      points: [
        "Speed at angle θ: v² = v₀² − 2gl(1 − cosθ). Tension: T = mv₀²/l − 2mg + 3mg cosθ.",
        "COMPLETES the loop (string): v₀ ≥ √(5gl); then T_bottom = 6mg, T_top = 0.",
        "OSCILLATES in lower half: v₀ < √(2gl) — speed hits zero before tension does.",
        "LEAVES the track (goes slack, then projectile): √(2gl) ≤ v₀ < √(5gl).",
        "Rigid rod/track (can push, not just pull): only needs v₀ ≥ √(4gl) to complete the loop.",
      ],
    },
    {
      heading: "Non-Inertial Frame — Effective Gravity",
      points: [
        "Lift accelerating up: g_eff = g + a. Lift accelerating down: g_eff = g − a.",
        "Horizontally accelerating trolley: g_eff = √(g² + a²), tilted at tan⁻¹(a/g) from vertical.",
        "Once g_eff is found, reuse every vertical-circle formula with g replaced by g_eff.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Don't forget tension/speed both vary continuously around a vertical circle — they are NOT constant like in horizontal circular motion.",
        "v_max on a flat curve does not depend on mass — don't introduce mass into that formula.",
        "Centripetal and centrifugal force are NOT an action-reaction pair — centrifugal force isn't even real in an inertial frame.",
        "Check carefully whether the question gives a string (can go slack) or a rigid rod (cannot go slack) before applying the completing-the-loop condition.",
      ],
    },
  ],
};
