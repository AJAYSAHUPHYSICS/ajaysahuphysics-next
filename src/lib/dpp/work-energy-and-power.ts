import type { ChapterDpp } from "./kinematics";

export const workEnergyAndPowerDpp: ChapterDpp = {
  chapterName: "Work, Energy & Power",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A force F = (4î + 3ĵ) N displaces a particle by d = (2î − ĵ) m. Find the work done.",
      options: ["3 J", "5 J", "8 J", "11 J"],
      correctIndex: 1,
      solution: "W = F · d = (4)(2) + (3)(−1) = 8 − 3 = 5 J.",
    },
    {
      number: 2,
      question:
        "A force of 20 N displaces a body through 10 m. If the work done is 100√3 J, find the angle between the force and the displacement.",
      options: ["30°", "45°", "60°", "90°"],
      correctIndex: 0,
      solution:
        "cosθ = W/(Fd) = 100√3/(20 × 10) = 100√3/200 = (√3)/2 ≈ 0.866, so θ = 30°.",
    },
    {
      number: 3,
      question:
        "A force F = (2x + 3) N acts on a body along the x-axis. Find the work done as the body moves from x = 0 to x = 4 m.",
      options: ["24 J", "28 J", "32 J", "36 J"],
      correctIndex: 1,
      solution:
        "W = ∫₀⁴ (2x + 3) dx = [x² + 3x]₀⁴ = (16 + 12) − 0 = 28 J.",
    },
    {
      number: 4,
      question:
        "A 1000 kg car, starting from rest, speeds up to 20 m/s over a distance of 50 m on a frictionless level road under a constant driving force. Find that force.",
      options: ["2000 N", "3000 N", "4000 N", "8000 N"],
      correctIndex: 2,
      solution:
        "By the work-energy theorem, Fd = ΔKE = ½(1000)(20²) = 200000 J. So F = 200000/50 = 4000 N.",
    },
    {
      number: 5,
      question: "A spring of force constant 200 N/m is stretched by 10 cm. Find the elastic potential energy stored.",
      options: ["0.5 J", "1 J", "2 J", "4 J"],
      correctIndex: 1,
      solution: "U = ½kx² = ½(200)(0.1)² = ½(200)(0.01) = 1 J.",
    },
    {
      number: 6,
      question:
        "A spring stores elastic potential energy U when stretched by x. How much energy does the same spring store when stretched by 3x?",
      options: ["3U", "6U", "9U", "27U"],
      correctIndex: 2,
      solution:
        "Spring PE ∝ x². Stretching by 3x instead of x scales the energy by 3² = 9, giving 9U.",
    },
    {
      number: 7,
      question: "The potential energy of a particle is given by U(x) = 5x² − 10x (in joules). Find its equilibrium position.",
      options: ["0.5 m", "1 m", "2 m", "5 m"],
      correctIndex: 1,
      solution: "At equilibrium, dU/dx = 0: 10x − 10 = 0, so x = 1 m.",
    },
    {
      number: 8,
      question:
        "A particle's potential energy is given by U(x) = 3x² − 6x (in joules), with equilibrium at x = 1 m. What kind of equilibrium is this?",
      options: ["Stable", "Unstable", "Neutral", "Cannot be determined"],
      correctIndex: 0,
      solution:
        "d²U/dx² = 6, which is positive — U has a local minimum at x = 1 m, so the equilibrium is stable.",
    },
    {
      number: 9,
      question: "The kinetic energy of a body increases by 21%. Find the percentage increase in its momentum.",
      options: ["10%", "11%", "21%", "42%"],
      correctIndex: 0,
      solution:
        "Since p = √(2mE), p ∝ √E. New p/old p = √1.21 = 1.1, which is a 10% increase.",
    },
    {
      number: 10,
      question:
        "A 2 kg ball falls from rest through a height of 10 m, but air resistance limits its speed to 12 m/s just before landing. Find the energy lost to air resistance. (g = 10 m/s²)",
      options: ["40 J", "56 J", "72 J", "100 J"],
      correctIndex: 1,
      solution:
        "PE lost = mgh = 2 × 10 × 10 = 200 J. KE gained = ½(2)(12²) = 144 J. Energy lost to air resistance = 200 − 144 = 56 J.",
    },
    {
      number: 11,
      question:
        "A 2 kg block moving at 6 m/s on a smooth horizontal surface collides with a spring of force constant 800 N/m. Find the maximum compression of the spring.",
      options: ["0.1 m", "0.2 m", "0.3 m", "0.4 m"],
      correctIndex: 2,
      solution:
        "x_max = v√(m/k) = 6√(2/800) = 6√0.0025 = 6 × 0.05 = 0.3 m.",
    },
    {
      number: 12,
      question:
        "A 1 kg mass is attached to a vertical spring of force constant 100 N/m and released suddenly from the spring's natural length (not lowered gently). Find the maximum extension. (g = 10 m/s²)",
      options: ["5 cm", "10 cm", "20 cm", "40 cm"],
      correctIndex: 2,
      solution:
        "For sudden release, x_max = 2mg/k = 2(1)(10)/100 = 0.2 m = 20 cm — double the gentle-lowering equilibrium value of mg/k = 10 cm.",
    },
    {
      number: 13,
      question:
        "A motor lifts a 50 kg mass at a constant velocity of 2 m/s. Find the power delivered. (g = 10 m/s²)",
      options: ["500 W", "750 W", "1000 W", "1500 W"],
      correctIndex: 2,
      solution: "P = Fv = mgv = (50)(10)(2) = 1000 W.",
    },
    {
      number: 14,
      question:
        "A body starts from rest and moves under a constant power source. The distance it covers is proportional to which power of time?",
      options: ["t^(1/2)", "t", "t^(3/2)", "t²"],
      correctIndex: 2,
      solution:
        "Constant power gives v ∝ t^(1/2) (from ½mv² = Pt). Integrating velocity over time gives x ∝ t^(3/2).",
    },
    {
      number: 15,
      question:
        "A pump raises 900 kg of water per minute to a height of 20 m. If the pump's efficiency is 60%, find the electrical input power. (g = 10 m/s²)",
      options: ["3 kW", "4 kW", "5 kW", "6 kW"],
      correctIndex: 2,
      solution:
        "Output power = mgh/t = (900)(10)(20)/60 = 3000 W. Input power = output/efficiency = 3000/0.6 = 5000 W = 5 kW.",
    },
    {
      number: 16,
      question:
        "A 4 kg block slides on a rough horizontal floor (μ = 0.2) with an initial speed of 10 m/s. Find the distance it travels before stopping. (g = 10 m/s²)",
      options: ["20 m", "25 m", "30 m", "40 m"],
      correctIndex: 1,
      solution:
        "Friction force f = μmg = 0.2(4)(10) = 8 N. By the work-energy theorem: −fd = 0 − ½(4)(10²) ⟹ −8d = −200 ⟹ d = 25 m.",
    },
    {
      number: 17,
      question: "Which of the following is NOT a conservative force?",
      options: ["Gravitational force", "Spring force", "Electrostatic force", "Frictional force"],
      correctIndex: 3,
      solution:
        "Friction is non-conservative — the work it does depends on the path length travelled. Gravity, spring force, and electrostatic force are all conservative.",
    },
    {
      number: 18,
      question:
        "A force F = (5 − 2x) N acts on a particle along the x-axis. Find the work done as it moves from x = 0 to x = 3 m.",
      options: ["3 J", "6 J", "9 J", "12 J"],
      correctIndex: 1,
      solution:
        "W = ∫₀³ (5 − 2x) dx = [5x − x²]₀³ = (15 − 9) − 0 = 6 J.",
    },
  ],
};
