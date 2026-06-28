import type { ChapterDpp } from "../dpp/kinematics";

export const mechanicalPropertiesOfFluidsJeeDpp: ChapterDpp = {
  chapterName: "Mechanical Properties of Fluids",
  className: "11",
  questions: [
    {
      number: 1,
      question: "A container of liquid accelerates horizontally at 10 m/s². Find the angle its free surface makes with the horizontal. (g = 10 m/s²)",
      options: ["30°", "37°", "45°", "60°"],
      correctIndex: 2,
      solution: "tanθ = a/g = 10/10 = 1, so θ = 45°.",
    },
    {
      number: 2,
      question:
        "A container of liquid (density 800 kg/m³) accelerates horizontally at 4 m/s². Find the pressure difference between two points 3 m apart along the direction of acceleration.",
      options: ["7200 Pa", "8400 Pa", "9600 Pa", "10800 Pa"],
      correctIndex: 2,
      solution: "ΔP = ρaL = 800×4×3 = 9600 Pa.",
    },
    {
      number: 3,
      question:
        "Water flows through a horizontal pipe with a pressure drop of 8000 Pa between a wide section (negligible speed) and a narrow section. Find the speed at the narrow section. (ρ = 1000 kg/m³)",
      options: ["2 m/s", "3 m/s", "4 m/s", "5 m/s"],
      correctIndex: 2,
      solution: "v = √(2ΔP/ρ) = √(2×8000/1000) = √16 = 4 m/s.",
    },
    {
      number: 4,
      question:
        "A 3 mm radius ball (density difference from fluid = 6000 kg/m³) falls through a fluid of viscosity 0.2 Pa·s. Find its terminal velocity. (g = 10 m/s²)",
      options: ["0.4 m/s", "0.5 m/s", "0.6 m/s", "0.8 m/s"],
      correctIndex: 2,
      solution: "v_t = 2r²(Δρ)g/(9η) = 2(3×10⁻³)²(6000)(10)/(9×0.2) = 2(9×10⁻⁶)(60000)/1.8 = 1.08/1.8 = 0.6 m/s.",
    },
    {
      number: 5,
      question: "Find the excess pressure inside a soap bubble of radius 2 mm, formed from a solution of surface tension 0.04 N/m.",
      options: ["40 Pa", "60 Pa", "80 Pa", "100 Pa"],
      correctIndex: 2,
      solution: "Soap bubble: ΔP = 4T/R = 4(0.04)/(2×10⁻³) = 0.16/0.002 = 80 Pa.",
    },
    {
      number: 6,
      question: "Find the capillary rise of water (T = 0.05 N/m) in a tube of radius 0.5 mm, assuming complete wetting. (ρ = 1000 kg/m³, g = 10 m/s²)",
      options: ["10 mm", "15 mm", "20 mm", "25 mm"],
      correctIndex: 2,
      solution: "h = 2T/(ρgr) = 2(0.05)/(1000×10×0.5×10⁻³) = 0.1/5 = 0.02 m = 20 mm.",
    },
    {
      number: 7,
      question: "Find the buoyant force on an object of volume 2×10⁻³ m³ fully submerged in water. (ρ_water = 1000 kg/m³, g = 10 m/s²)",
      options: ["10 N", "15 N", "20 N", "25 N"],
      correctIndex: 2,
      solution: "F_buoyant = ρVg = 1000×2×10⁻³×10 = 20 N.",
    },
    {
      number: 8,
      question:
        "Water flows through a pipe of area 4×10⁻⁴ m² at 2 m/s, into a narrower section of area 1×10⁻⁴ m². Find the speed in the narrow section.",
      options: ["4 m/s", "6 m/s", "8 m/s", "10 m/s"],
      correctIndex: 2,
      solution: "By continuity: A₁v₁ = A₂v₂ ⇒ v₂ = (4×10⁻⁴×2)/(1×10⁻⁴) = 8 m/s.",
    },
    {
      number: 9,
      question:
        "A lift accelerates upward at 2 m/s². Find the pressure at a depth of 2 m in a tank of water (density 1000 kg/m³) inside the lift. (g = 10 m/s²)",
      options: ["20000 Pa", "22000 Pa", "24000 Pa", "26000 Pa"],
      correctIndex: 2,
      solution: "Inside the upward-accelerating lift, effective gravity = g+a = 12 m/s². P = ρ(g+a)h = 1000×12×2 = 24000 Pa.",
    },
    {
      number: 10,
      question:
        "Water (density 1000 kg/m³, viscosity 0.001 Pa·s) flows through a 0.02 m diameter pipe at 2 m/s. Find the Reynolds number.",
      options: ["20000", "30000", "40000", "50000"],
      correctIndex: 2,
      solution: "Re = ρvd/η = (1000×2×0.02)/0.001 = 40/0.001 = 40000 (well above 2000-ish, so this flow is turbulent).",
    },
    {
      number: 11,
      question:
        "Using Poiseuille's formula, find the rate of flow of a fluid (viscosity 0.001 Pa·s) through a tube of radius 0.01 m and length 2 m, with a pressure difference of 4000 Pa across it.",
      options: ["π/200 m³/s", "π/400 m³/s", "π/600 m³/s", "π/800 m³/s"],
      correctIndex: 1,
      solution: "Q = πΔPr⁴/(8ηL) = π(4000)(0.01)⁴/(8×0.001×2) = π(4000)(10⁻⁸)/(0.016) = π(4×10⁻⁵)/0.016 = π/400 m³/s.",
    },
    {
      number: 12,
      question:
        "Two identical small drops of radius r merge to form one bigger drop. Find the ratio of the bigger drop's radius to r (using volume conservation).",
      options: ["2^(1/3)", "2", "2^(2/3)", "√2"],
      correctIndex: 0,
      solution:
        "Volume conservation: (4/3)πR³ = 2×(4/3)πr³ ⇒ R³ = 2r³ ⇒ R = 2^(1/3) × r, so R/r = 2^(1/3) ≈ 1.26.",
    },
  ],
};
