import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const gravitationJeeNotes: ChapterJeeNotes = {
  chapterName: "Gravitation",
  className: "11",
  intro:
    "Fully worked, JEE-style problems on gravitational fields, satellite motion, and escape velocity — the multi-step derivations JEE Main and JEE Advanced build entire questions around, going a level beyond the regular DPP.",
  examples: [
    {
      title: "Illustration 1 — Finding a Planet's Mass from g and R",
      problem:
        "The acceleration due to gravity on a planet's surface is 4 m/s², and its radius is 3.2 × 10⁶ m. Find the mass of the planet. (G = 6.674 × 10⁻¹¹ N·m²/kg²)",
      solutionSteps: [
        "Start from g = GM/R², and rearrange for mass: M = gR²/G.",
        "Substitute g = 4 m/s², R = 3.2×10⁶ m: M = (4)(3.2×10⁶)²/(6.674×10⁻¹¹).",
        "(3.2×10⁶)² = 1.024×10¹³, so M = 4×1.024×10¹³/(6.674×10⁻¹¹) = 4.096×10¹³/6.674×10⁻¹¹.",
      ],
      answer: "M ≈ 6.14 × 10²³ kg.",
    },
    {
      title: "Illustration 2 — Height Where g Drops to a Given Percentage",
      problem:
        "At what height above Earth's surface does the acceleration due to gravity reduce to 64% of its surface value? (Radius of Earth = 6400 km)",
      solutionSteps: [
        "g′ = gR²/(R+h)² ⇒ g′/g = [R/(R+h)]².",
        "Given g′/g = 0.64: [R/(R+h)]² = 0.64 ⇒ R/(R+h) = 0.8 ⇒ R+h = R/0.8 = 1.25R.",
        "So h = 1.25R − R = 0.25R.",
        "Substitute R = 6400 km: h = 0.25 × 6400.",
      ],
      answer: "h = 1600 km.",
    },
    {
      title: "Illustration 3 — Orbital Speed and Period at a Given Height",
      problem:
        "Find the orbital speed and time period of a satellite orbiting at a height of 1600 km above Earth's surface. (Radius of Earth = 6400 km, g = 10 m/s²)",
      solutionSteps: [
        "Orbital radius r = R + h = 6400 + 1600 = 8000 km = 8×10⁶ m.",
        "Orbital speed: v = √(GM/r) = √(gR²/r), since GM = gR² (a useful substitution that avoids needing G or M directly).",
        "v = √[(10)(6.4×10⁶)²/(8×10⁶)] = √[(10)(4.096×10¹³)/(8×10⁶)] = √(5.12×10⁷) ≈ 7155 m/s.",
        "Time period: T = 2πr/v = 2π(8×10⁶)/7155 ≈ 7029 s ≈ 1.95 hours.",
      ],
      answer: "v ≈ 7.16 km/s, T ≈ 1.95 hours.",
    },
    {
      title: "Illustration 4 — Escape Velocity from Earth",
      problem: "Find the escape velocity from Earth's surface. (R = 6400 km, g = 10 m/s²)",
      solutionSteps: [
        "Escape velocity formula: v_e = √(2gR), derived by setting total mechanical energy to zero at infinity.",
        "Substitute g = 10 m/s², R = 6.4×10⁶ m: v_e = √(2×10×6.4×10⁶) = √(1.28×10⁸).",
      ],
      answer: "v_e ≈ 11.3 km/s — this is the well-known real escape velocity of Earth.",
    },
    {
      title: "Illustration 5 — Energy Needed to Send a Satellite to Infinity",
      problem:
        "A 1000 kg satellite orbits Earth at a radius of 2R (twice Earth's radius). Find the minimum energy needed to send it from this orbit to infinity. (R = 6400 km, g = 10 m/s²)",
      solutionSteps: [
        "Total energy of a satellite in a circular orbit of radius r: E_orbit = −GMm/(2r) = −gR²m/(2r) (using GM = gR²).",
        "Substitute R = 6.4×10⁶ m, r = 2R = 1.28×10⁷ m, m = 1000 kg: E_orbit = −(10)(6.4×10⁶)²(1000)/(2×1.28×10⁷) = −1.6×10¹⁰ J.",
        "At infinity, total energy is exactly zero. The energy needed is the difference: ΔE = E_∞ − E_orbit = 0 − (−1.6×10¹⁰).",
      ],
      answer: "ΔE = 1.6 × 10¹⁰ J (16,000 MJ) must be supplied.",
    },
    {
      title: "Illustration 6 — Variation of g with Depth",
      problem: "Find the acceleration due to gravity at a depth equal to half of Earth's radius. (g at surface = 10 m/s²)",
      solutionSteps: [
        "Inside a uniform Earth, g at depth d is: g_d = g(1 − d/R), assuming uniform density.",
        "Substitute d = R/2: g_d = g(1 − 1/2) = g/2.",
        "With g = 10 m/s²: g_d = 10/2.",
      ],
      answer: "g_d = 5 m/s² — exactly half the surface value at half the radius depth.",
    },
  ],
};
