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

export const thermalPropertiesOfMatterDpp: ChapterDpp = {
  chapterName: "Thermal Properties of Matter",
  className: "11",
  questions: [
    {
      number: 1,
      question: "Convert a temperature of 122°F into the Celsius scale.",
      options: ["40°C", "45°C", "50°C", "55°C"],
      correctIndex: 2,
      solution: "C/100 = (F−32)/180 ⇒ C = (122−32) × 100/180 = 90 × 100/180 = 50°C.",
    },
    {
      number: 2,
      question:
        "A faulty thermometer has its ice point marked at −10° and its steam point marked at 110° on its own scale. If this thermometer reads 20°, find the actual temperature on the Celsius scale.",
      options: ["15°C", "20°C", "25°C", "30°C"],
      correctIndex: 2,
      solution:
        "(C−0)/100 = (t−LFP)/(UFP−LFP) = (20−(−10))/(110−(−10)) = 30/120 = 0.25 ⇒ C = 25°C.",
    },
    {
      number: 3,
      question:
        "A steel rod of length 2 m at 20°C is heated to 120°C. Find the increase in its length. (α for steel = 1.2 × 10⁻⁵ /°C)",
      options: ["1.2 mm", "2.4 mm", "3.6 mm", "4.8 mm"],
      correctIndex: 1,
      solution: "Δl = l₀αΔθ = 2 × 1.2×10⁻⁵ × 100 = 2.4×10⁻³ m = 2.4 mm.",
    },
    {
      number: 4,
      question:
        "The side of a thin square metal plate increases by 0.5% when it is heated. Find the percentage increase in its area.",
      options: ["0.5%", "1.0%", "1.5%", "2.0%"],
      correctIndex: 1,
      solution: "For superficial expansion, β = 2α, so %ΔA = 2 × %Δl = 2 × 0.5% = 1.0%.",
    },
    {
      number: 5,
      question:
        "A steel wire of cross-sectional area 1 mm² is held taut between two rigid supports at 30°C. Find the tension developed in the wire when the temperature falls to 10°C. (α for steel = 1.1 × 10⁻⁵ /°C, Y = 2.0 × 10¹¹ N/m²)",
      options: ["22 N", "33 N", "44 N", "55 N"],
      correctIndex: 2,
      solution:
        "F = AYαΔθ = (1×10⁻⁶) × (2×10¹¹) × (1.1×10⁻⁵) × 20 = 44 N.",
    },
    {
      number: 6,
      question:
        "A pendulum clock keeps correct time at a certain temperature. If the temperature rises by 15°C and the coefficient of linear expansion of the pendulum's material is 2 × 10⁻⁵ /°C, find the loss of time in one day (86400 s).",
      options: ["6.48 s", "9.72 s", "12.96 s", "16.20 s"],
      correctIndex: 2,
      solution:
        "Loss of time = ½αΔθ × T = ½ × (2×10⁻⁵) × 15 × 86400 = 12.96 s (clock runs slow since temperature rose).",
    },
    {
      number: 7,
      question:
        "A glass flask filled with a liquid shows a coefficient of apparent expansion of 4 × 10⁻⁴/°C for the liquid. If the coefficient of linear expansion of the glass is 1 × 10⁻⁵/°C, find the coefficient of real expansion of the liquid.",
      options: ["3.7 × 10⁻⁴/°C", "4.0 × 10⁻⁴/°C", "4.3 × 10⁻⁴/°C", "4.6 × 10⁻⁴/°C"],
      correctIndex: 2,
      solution:
        "γ_real = γ_apparent + γ_vessel = γ_apparent + 3α_vessel = 4×10⁻⁴ + 3×(1×10⁻⁵) = 4×10⁻⁴ + 3×10⁻⁵ = 4.3×10⁻⁴/°C.",
    },
    {
      number: 8,
      question:
        "Find the heat required to raise the temperature of 500 g of water from 20°C to 80°C. (Specific heat of water = 4200 J/kg·K)",
      options: ["63 kJ", "94.5 kJ", "126 kJ", "157.5 kJ"],
      correctIndex: 2,
      solution: "Q = msΔθ = 0.5 × 4200 × 60 = 126000 J = 126 kJ.",
    },
    {
      number: 9,
      question:
        "Find the heat required to completely convert 100 g of ice at 0°C into water at 0°C. (Latent heat of fusion of ice = 80 cal/g)",
      options: ["4 kcal", "6 kcal", "8 kcal", "10 kcal"],
      correctIndex: 2,
      solution: "Q = mL = 100 × 80 = 8000 cal = 8 kcal.",
    },
    {
      number: 10,
      question:
        "200 g of water at 80°C is mixed with 300 g of water at 20°C in a container of negligible heat capacity. Find the final temperature of the mixture.",
      options: ["38°C", "41°C", "44°C", "47°C"],
      correctIndex: 2,
      solution:
        "Heat lost = heat gained: 200(80−T) = 300(T−20) ⇒ 16000 − 200T = 300T − 6000 ⇒ 22000 = 500T ⇒ T = 44°C.",
    },
    {
      number: 11,
      question:
        "A metal slab of area 0.5 m² and thickness 2 cm has its two faces maintained at 100°C and 20°C. Find the rate of heat conduction through the slab. (K = 200 W/m·K)",
      options: ["1 × 10⁵ W", "2 × 10⁵ W", "3 × 10⁵ W", "4 × 10⁵ W"],
      correctIndex: 3,
      solution:
        "Q/t = KA(T_H−T_C)/L = (200 × 0.5 × 80)/0.02 = 8000/0.02 = 4×10⁵ W.",
    },
    {
      number: 12,
      question:
        "Two slabs of the same length L and same cross-sectional area, having thermal conductivities K and 3K, are joined end to end (in series) between two heat reservoirs. Find the equivalent thermal conductivity of the combination.",
      options: ["1.0K", "1.5K", "2.0K", "2.5K"],
      correctIndex: 1,
      solution:
        "K_eq = (L₁+L₂)/[(L₁/K₁)+(L₂/K₂)] = 2L/[(L/K)+(L/3K)] = 2L/[(4L)/(3K)] = (2×3K)/4 = 1.5K.",
    },
    {
      number: 13,
      question:
        "Two rods of copper and aluminium, of the same length, with cross-sectional areas 2 cm² and 3 cm² respectively, are connected in parallel between the same two temperatures. Find the ratio of the thermal current through the copper rod to that through the aluminium rod. (K_Cu = 400 W/m·K, K_Al = 200 W/m·K)",
      options: ["1 : 1", "2 : 1", "4 : 3", "3 : 2"],
      correctIndex: 2,
      solution:
        "Since L and ΔT are the same for both rods, current i ∝ KA. i_Cu/i_Al = (K_Cu×A_Cu)/(K_Al×A_Al) = (400×2)/(200×3) = 800/600 = 4/3.",
    },
    {
      number: 14,
      question:
        "Ice forms on the surface of a lake. If the time taken for the ice thickness to grow from x to 2x is t₁, and the time taken to grow further from 2x to 3x is t₂, find the ratio t₂ : t₁.",
      options: ["3 : 2", "5 : 3", "7 : 5", "9 : 5"],
      correctIndex: 1,
      solution:
        "Time to grow from x₁ to x₂ is proportional to (x₂²−x₁²). t₁ ∝ (2x)²−x² = 3x². t₂ ∝ (3x)²−(2x)² = 5x². So t₂ : t₁ = 5 : 3.",
    },
    {
      number: 15,
      question:
        "A body cools from 60°C to 50°C in 5 minutes, with the surrounding temperature constant at 20°C. Using Newton's law of cooling, find the time taken for the same body to cool from 50°C to 40°C.",
      options: ["5 minutes", "6 minutes", "7 minutes", "8 minutes"],
      correctIndex: 2,
      solution:
        "Using (T₁−T₂)/t = K[(T₁+T₂)/2 − T₀]: for the first interval, 10/5 = K(55−20) = 35K ⇒ K = 2/35. For the second interval, 10/t = K(45−20) = 25K = 25×(2/35) = 10/7 ⇒ t = 7 minutes.",
    },
    {
      number: 16,
      question:
        "A black body of surface area 0.1 m² is at a temperature of 27°C. Find the power radiated by it. (Stefan's constant σ = 5.67 × 10⁻⁸ W/m²K⁴; ignore the surroundings)",
      options: ["23 W", "35 W", "46 W", "57 W"],
      correctIndex: 2,
      solution:
        "T = 27+273 = 300 K. P = σAT⁴ = (5.67×10⁻⁸) × 0.1 × (300)⁴ = (5.67×10⁻⁸) × 0.1 × (8.1×10⁹) ≈ 45.9 W ≈ 46 W.",
    },
    {
      number: 17,
      question:
        "If the absolute temperature of a black body is doubled, find the percentage increase in the total radiant power emitted by it.",
      options: ["400%", "800%", "1200%", "1500%"],
      correctIndex: 3,
      solution:
        "E ∝ T⁴. Doubling T multiplies E by 2⁴ = 16. Percentage increase = (16−1) × 100% = 1500%.",
    },
    {
      number: 18,
      question:
        "The maximum spectral emissive power of a star's surface occurs at a wavelength of 5800 Å. Find the surface temperature of the star. (Wien's constant b = 2.9 × 10⁻³ m·K)",
      options: ["3000 K", "4000 K", "5000 K", "6000 K"],
      correctIndex: 2,
      solution:
        "By Wien's displacement law, T = b/λ_m = (2.9×10⁻³)/(5800×10⁻¹⁰) = (2.9×10⁻³)/(5.8×10⁻⁷) = 5000 K.",
    },
  ],
};
