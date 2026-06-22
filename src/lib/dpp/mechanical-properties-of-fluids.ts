export type DppQuestion = {
  number: number;
  question: string;
  options: string[];
  correctIndex: number;
  solution: string;
};

export type ChapterDpp = {
  chapterName: string;
  className: "11" | "12";
  questions: DppQuestion[];
};

export const mechanicalPropertiesOfFluidsDpp: ChapterDpp = {
  chapterName: "Mechanical Properties of Fluids",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "Find the pressure at a depth of 10 m below the free surface of water. (Atmospheric pressure = 1.0 × 10⁵ Pa, density of water = 1000 kg/m³, g = 10 m/s²)",
      options: ["1 × 10⁵ Pa", "1.5 × 10⁵ Pa", "2 × 10⁵ Pa", "2.5 × 10⁵ Pa"],
      correctIndex: 2,
      solution: "P = P₀ + hρg = (1×10⁵) + (10 × 1000 × 10) = (1×10⁵) + (1×10⁵) = 2×10⁵ Pa.",
    },
    {
      number: 2,
      question:
        "In a hydraulic lift, the input piston has an area of 5 cm² and the output piston has an area of 200 cm². If a force of 20 N is applied to the input piston, find the force exerted by the output piston.",
      options: ["200 N", "400 N", "800 N", "1000 N"],
      correctIndex: 2,
      solution: "F₂ = (A₂/A₁) × F₁ = (200/5) × 20 = 40 × 20 = 800 N.",
    },
    {
      number: 3,
      question:
        "A block of volume 2 × 10⁻³ m³ is fully submerged in water (density 1000 kg/m³). Find the buoyant force on it. (g = 10 m/s²)",
      options: ["2 N", "10 N", "20 N", "200 N"],
      correctIndex: 2,
      solution: "Th = Vρg = (2×10⁻³) × 1000 × 10 = 20 N.",
    },
    {
      number: 4,
      question: "A solid weighs 50 N in air and 30 N when fully immersed in water. Find its relative density.",
      options: ["1.5", "2.0", "2.5", "3.0"],
      correctIndex: 2,
      solution: "R.D. = W_A/(W_A − W_W) = 50/(50 − 30) = 50/20 = 2.5.",
    },
    {
      number: 5,
      question:
        "A block of wood of density 600 kg/m³ floats in water of density 1000 kg/m³. What fraction of its volume remains above the water surface?",
      options: ["0.2", "0.4", "0.6", "0.8"],
      correctIndex: 1,
      solution:
        "Fraction submerged = ρ_body/ρ_liquid = 600/1000 = 0.6. Fraction above the surface = 1 − 0.6 = 0.4.",
    },
    {
      number: 6,
      question:
        "Water flows through a pipe of cross-sectional area 4 cm² with a speed of 2 m/s. It then enters a narrower section of area 1 cm². Find the speed of water in the narrower section.",
      options: ["2 m/s", "4 m/s", "8 m/s", "16 m/s"],
      correctIndex: 2,
      solution: "By the equation of continuity, A₁v₁ = A₂v₂ ⇒ v₂ = A₁v₁/A₂ = (4×2)/1 = 8 m/s.",
    },
    {
      number: 7,
      question:
        "Water flows horizontally through a pipe whose cross-section narrows so that the flow speed increases from 2 m/s to 4 m/s. Find the drop in pressure between the wide and narrow sections. (density of water = 1000 kg/m³)",
      options: ["3 × 10³ Pa", "6 × 10³ Pa", "9 × 10³ Pa", "12 × 10³ Pa"],
      correctIndex: 1,
      solution:
        "For horizontal flow, P₁ − P₂ = ½ρ(v₂² − v₁²) = ½ × 1000 × (4² − 2²) = ½ × 1000 × 12 = 6×10³ Pa.",
    },
    {
      number: 8,
      question:
        "A tank has water filled to a height of 5 m above a small hole near its base. Find the speed with which water emerges from the hole. (g = 10 m/s²)",
      options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
      correctIndex: 1,
      solution: "By Torricelli's law, v = √(2gh) = √(2 × 10 × 5) = √100 = 10 m/s.",
    },
    {
      number: 9,
      question:
        "A layer of liquid 2 mm thick is sheared between two plates, with the top plate moving at 0.5 m/s relative to the stationary bottom plate. If the coefficient of viscosity of the liquid is 1.2 Pa·s and the contact area is 0.02 m², find the viscous force required to maintain this motion.",
      options: ["3 N", "6 N", "9 N", "12 N"],
      correctIndex: 1,
      solution:
        "F = ηA(dv/dy). Here dv/dy = 0.5/0.002 = 250 s⁻¹. F = 1.2 × 0.02 × 250 = 6 N.",
    },
    {
      number: 10,
      question:
        "A small sphere of radius 1 mm and density 2000 kg/m³ falls through a fluid of density 1000 kg/m³ and viscosity 0.5 Pa·s. Find its terminal velocity. (g = 10 m/s²)",
      options: ["2.2 × 10⁻³ m/s", "4.4 × 10⁻³ m/s", "6.6 × 10⁻³ m/s", "8.8 × 10⁻³ m/s"],
      correctIndex: 1,
      solution:
        "v_T = 2r²(ρ−σ)g/(9η) = 2×(1×10⁻³)²×(2000−1000)×10/(9×0.5) = (2×10⁻⁶×1000×10)/4.5 = 0.02/4.5 ≈ 4.4×10⁻³ m/s.",
    },
    {
      number: 11,
      question:
        "Water flows through a pipe of diameter 2 cm with speed 1 m/s. Taking the density of water as 1000 kg/m³ and its viscosity as 1 × 10⁻³ Pa·s, find the Reynolds number and identify the type of flow.",
      options: [
        "200 (laminar)",
        "2000 (transition)",
        "20000 (turbulent)",
        "200000 (turbulent)",
      ],
      correctIndex: 2,
      solution:
        "Re = ρvd/η = (1000 × 1 × 0.02)/(1×10⁻³) = 20/0.001 = 20000. Since Re > 2000, the flow is turbulent.",
    },
    {
      number: 12,
      question:
        "Water flows through a horizontal capillary tube of radius 1 mm and length 0.2 m under a pressure difference of 1000 Pa. Taking the viscosity of water as 1 × 10⁻³ Pa·s, find the volume flow rate using Poiseuille's formula.",
      options: ["1.96 × 10⁻⁷ m³/s", "1.96 × 10⁻⁶ m³/s", "1.96 × 10⁻⁵ m³/s", "1.96 × 10⁻⁴ m³/s"],
      correctIndex: 1,
      solution:
        "Q = πPr⁴/(8ηL) = [π × 1000 × (10⁻³)⁴]/[8 × 10⁻³ × 0.2] = (3.1416×10⁻⁹)/(1.6×10⁻³) ≈ 1.96×10⁻⁶ m³/s.",
    },
    {
      number: 13,
      question:
        "A wire ring of radius 2 cm is lifted out of a soap solution of surface tension 0.03 N/m. Ignoring the weight of the ring, find the additional force needed to pull it free of the liquid surface (the film clings to the ring on both its inner and outer edges).",
      options: ["3.8 × 10⁻³ N", "7.5 × 10⁻³ N", "1.5 × 10⁻² N", "3.0 × 10⁻² N"],
      correctIndex: 1,
      solution:
        "With two surfaces pulling on the ring's circumference: F = 2 × (2πr) × T = 4πrT = 4π × 0.02 × 0.03 ≈ 7.5×10⁻³ N.",
    },
    {
      number: 14,
      question:
        "Find the work done in forming a water drop of radius 1 mm, given the surface tension of water is 0.072 N/m.",
      options: ["4.5 × 10⁻⁷ J", "9.0 × 10⁻⁷ J", "1.8 × 10⁻⁶ J", "3.6 × 10⁻⁶ J"],
      correctIndex: 1,
      solution: "W = T × 4πr² = 0.072 × 4π × (10⁻³)² = 0.072 × 1.2566×10⁻⁵ ≈ 9.0×10⁻⁷ J.",
    },
    {
      number: 15,
      question:
        "Find the excess pressure inside a soap bubble of radius 1 cm, if the surface tension of the soap solution is 0.025 N/m.",
      options: ["2.5 Pa", "5 Pa", "10 Pa", "20 Pa"],
      correctIndex: 2,
      solution: "For a soap bubble (two surfaces): P_excess = 4T/r = (4 × 0.025)/0.01 = 0.1/0.01 = 10 Pa.",
    },
    {
      number: 16,
      question:
        "Two soap bubbles of radii 3 cm and 4 cm coalesce in vacuum under isothermal conditions to form a single bubble. Find the radius of the resulting bubble.",
      options: ["3.5 cm", "5 cm", "7 cm", "12 cm"],
      correctIndex: 1,
      solution:
        "For soap bubbles coalescing in vacuum, conservation of the gas (PV ∝ r² since P ∝ 1/r and V ∝ r³) gives r² = r₁² + r₂² = 3² + 4² = 25, so r = 5 cm.",
    },
    {
      number: 17,
      question:
        "Water rises to a height of 4 cm in a capillary tube of radius 0.5 mm. Find the surface tension of the liquid, given its density is 1000 kg/m³, angle of contact is 0°, and g = 10 m/s².",
      options: ["0.05 N/m", "0.1 N/m", "0.2 N/m", "0.4 N/m"],
      correctIndex: 1,
      solution:
        "h = 2Tcosθ/(rρg) ⇒ T = hrρg/(2cosθ) = (0.04 × 0.0005 × 1000 × 10)/(2×1) = 0.2/2 = 0.1 N/m.",
    },
    {
      number: 18,
      question:
        "Water rises to a height of 6 cm in a capillary tube of radius r. If a second capillary tube of radius 2r is used instead (same liquid, same conditions), find the new height of rise.",
      options: ["1.5 cm", "3 cm", "9 cm", "12 cm"],
      correctIndex: 1,
      solution: "By Jurin's law, h ∝ 1/r. h₂ = h₁ × (r₁/r₂) = 6 × (r/2r) = 6 × 0.5 = 3 cm.",
    },
  ],
};
