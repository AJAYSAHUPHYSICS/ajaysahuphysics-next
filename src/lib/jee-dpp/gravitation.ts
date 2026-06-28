import type { ChapterDpp } from "../dpp/kinematics";

export const gravitationJeeDpp: ChapterDpp = {
  chapterName: "Gravitation",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A planet has surface gravity 6 m/s² and radius 4×10⁶ m. Find its mass. (G = 6.674×10⁻¹¹ N·m²/kg²)",
      options: ["8.6×10²³ kg", "1.0×10²⁴ kg", "1.2×10²⁴ kg", "1.44×10²⁴ kg"],
      correctIndex: 3,
      solution: "M = gR²/G = (6)(4×10⁶)²/(6.674×10⁻¹¹) = (6)(1.6×10¹³)/(6.674×10⁻¹¹) ≈ 1.44×10²⁴ kg.",
    },
    {
      number: 2,
      question: "At what height above Earth's surface does g reduce to 25% of its surface value?",
      options: ["R/2", "R", "2R", "3R"],
      correctIndex: 1,
      solution: "[R/(R+h)]² = 0.25 ⇒ R/(R+h) = 0.5 ⇒ R+h = 2R ⇒ h = R.",
    },
    {
      number: 3,
      question:
        "Find the orbital speed of a satellite at height h = R above Earth's surface (so orbital radius = 2R). (R = 6400 km, g = 10 m/s²)",
      options: ["4000 m/s", "4000√2 m/s", "5657 m/s", "8000 m/s"],
      correctIndex: 1,
      solution: "v = √(gR²/r) = √(gR/2) = √(10×6.4×10⁶/2) = √(3.2×10⁷) = 4000√2 m/s ≈ 5657 m/s.",
    },
    {
      number: 4,
      question: "Find the escape velocity from a planet with g = 5 m/s² and R = 6.4×10⁶ m.",
      options: ["6000 m/s", "7000 m/s", "8000 m/s", "9000 m/s"],
      correctIndex: 2,
      solution: "v_e = √(2gR) = √(2×5×6.4×10⁶) = √(6.4×10⁷) = 8000 m/s.",
    },
    {
      number: 5,
      question:
        "Find the minimum energy needed to completely remove a 500 kg satellite from Earth's surface to infinity. (R = 6400 km, g = 10 m/s²)",
      options: ["1.6×10¹⁰ J", "3.2×10¹⁰ J", "6.4×10¹⁰ J", "1.28×10¹¹ J"],
      correctIndex: 1,
      solution: "Energy needed from the surface = GMm/R = gRm = 10×6.4×10⁶×500 = 3.2×10¹⁰ J.",
    },
    {
      number: 6,
      question: "Find g at a depth equal to 3/4 of Earth's radius. (Surface g = 10 m/s²)",
      options: ["1.5 m/s²", "2.5 m/s²", "5 m/s²", "7.5 m/s²"],
      correctIndex: 1,
      solution: "g_d = g(1 − d/R) = 10(1 − 0.75) = 10 × 0.25 = 2.5 m/s².",
    },
    {
      number: 7,
      question: "A 60 kg person's weight at a height equal to Earth's radius above the surface (so g reduces to g/4). Find their weight there. (g = 10 m/s²)",
      options: ["100 N", "150 N", "200 N", "300 N"],
      correctIndex: 1,
      solution: "W = m(g/4) = 60×10/4 = 150 N.",
    },
    {
      number: 8,
      question:
        "A planet orbits the Sun with period 1 year at distance r. Another planet orbits at distance 4r. Find its period, using Kepler's third law.",
      options: ["2 years", "4 years", "8 years", "16 years"],
      correctIndex: 2,
      solution: "T² ∝ r³. T₂ = T₁(r₂/r₁)^(3/2) = 1×(4)^1.5 = 1×8 = 8 years.",
    },
    {
      number: 9,
      question:
        "Find the gravitational field intensity at a point 8×10⁶ m from the centre of a planet of mass 6×10²⁴ kg.",
      options: ["5.0 N/kg", "6.26 N/kg", "7.5 N/kg", "9.4 N/kg"],
      correctIndex: 1,
      solution: "Field = GM/r² = (6.674×10⁻¹¹)(6×10²⁴)/(8×10⁶)² = (4.004×10¹⁴)/(6.4×10¹³) ≈ 6.26 N/kg.",
    },
    {
      number: 10,
      question:
        "Find the orbital speed of a satellite at height h = 2R above Earth's surface (orbital radius = 3R). (R = 6400 km, g = 10 m/s²)",
      options: ["3000 m/s", "3771 m/s", "4619 m/s", "5333 m/s"],
      correctIndex: 2,
      solution: "v = √(gR/3) = √(10×6.4×10⁶/3) = √(2.133×10⁷) ≈ 4619 m/s.",
    },
    {
      number: 11,
      question:
        "Find the binding energy of a 200 kg satellite orbiting at Earth's surface level (radius R). (R = 6400 km, g = 10 m/s²)",
      options: ["3.2×10⁹ J", "6.4×10⁹ J", "1.28×10¹⁰ J", "2.56×10¹⁰ J"],
      correctIndex: 1,
      solution: "Binding energy = gRm/2 = (10×6.4×10⁶×200)/2 = 1.28×10¹⁰/2 = 6.4×10⁹ J.",
    },
    {
      number: 12,
      question:
        "A planet has the same average density as Earth but twice Earth's radius. Find the surface gravity on this planet, in terms of Earth's g.",
      options: ["g/2", "g", "2g", "4g"],
      correctIndex: 2,
      solution:
        "For constant density, M ∝ R³, so g = GM/R² ∝ R³/R² = R. Doubling R doubles g, so the planet's surface gravity is 2g.",
    },
  ],
};
