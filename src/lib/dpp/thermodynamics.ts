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

export const thermodynamicsDpp: ChapterDpp = {
  chapterName: "Thermodynamics",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "An ideal gas expands at a constant pressure of 2 × 10⁵ Pa, with its volume increasing from 1 m³ to 3 m³. Find the work done by the gas.",
      options: ["1 × 10⁵ J", "2 × 10⁵ J", "3 × 10⁵ J", "4 × 10⁵ J"],
      correctIndex: 3,
      solution: "W = PΔV = (2×10⁵) × (3−1) = 4×10⁵ J.",
    },
    {
      number: 2,
      question:
        "The pressure of a gas increases linearly from 2 × 10⁵ Pa to 6 × 10⁵ Pa as its volume increases from 0.1 m³ to 0.3 m³. Find the work done by the gas.",
      options: ["4 × 10⁴ J", "8 × 10⁴ J", "1.2 × 10⁵ J", "1.6 × 10⁵ J"],
      correctIndex: 1,
      solution:
        "Work = area of the trapezium under the P–V graph = ½(P₁+P₂)(V₂−V₁) = ½(2×10⁵+6×10⁵)(0.3−0.1) = ½×8×10⁵×0.2 = 8×10⁴ J.",
    },
    {
      number: 3,
      question:
        "A gas absorbs 500 J of heat and does 200 J of work on its surroundings during a process. Find the change in its internal energy.",
      options: ["200 J", "300 J", "500 J", "700 J"],
      correctIndex: 1,
      solution: "ΔU = Q − W = 500 − 200 = 300 J.",
    },
    {
      number: 4,
      question:
        "2 moles of a monoatomic ideal gas are heated at constant volume so that its temperature rises from 300 K to 400 K. Find the heat absorbed by the gas. (R = 8.3 J/mol·K)",
      options: ["1245 J", "1660 J", "2490 J", "3320 J"],
      correctIndex: 2,
      solution:
        "At constant volume, Q = ΔU = nC_vΔT, with C_v = (3/2)R for a monoatomic gas. Q = 2 × (1.5×8.3) × 100 = 2490 J.",
    },
    {
      number: 5,
      question:
        "1 mole of an ideal gas is heated at constant pressure so that its temperature rises by 50 K. Find the work done by the gas. (R = 8.3 J/mol·K)",
      options: ["210 J", "415 J", "620 J", "830 J"],
      correctIndex: 1,
      solution: "At constant pressure, W = nRΔT = 1 × 8.3 × 50 = 415 J.",
    },
    {
      number: 6,
      question:
        "2 moles of an ideal gas at 300 K expand isothermally until its volume becomes 3 times the original. Find the work done by the gas. (R = 8.3 J/mol·K)",
      options: ["2.49 × 10³ J", "3.32 × 10³ J", "4.15 × 10³ J", "5.47 × 10³ J"],
      correctIndex: 3,
      solution:
        "W = nRT ln(V₂/V₁) = 2 × 8.3 × 300 × ln(3) = 4980 × 1.0986 ≈ 5.47×10³ J.",
    },
    {
      number: 7,
      question:
        "2 moles of a monoatomic ideal gas (γ = 5/3) expand adiabatically, with its temperature falling from 500 K to 350 K. Find the work done by the gas. (R = 8.3 J/mol·K)",
      options: ["1867.5 J", "2490 J", "3120 J", "3735 J"],
      correctIndex: 3,
      solution:
        "W = nR(T₁−T₂)/(γ−1) = 2 × 8.3 × 150/(2/3) = 2 × 8.3 × 150 × 1.5 = 3735 J.",
    },
    {
      number: 8,
      question:
        "A monoatomic ideal gas (γ = 5/3) initially occupying volume V is compressed adiabatically to a volume V/8. Find the ratio of the final to the initial pressure.",
      options: ["8", "16", "24", "32"],
      correctIndex: 3,
      solution:
        "For an adiabatic process, P₁V₁^γ = P₂V₂^γ ⇒ P₂/P₁ = (V₁/V₂)^γ = 8^(5/3) = (2³)^(5/3) = 2⁵ = 32.",
    },
    {
      number: 9,
      question:
        "A thermally insulated container holding an ideal gas is connected to an identical evacuated, insulated container, and the gas is allowed to undergo free expansion into it. Which of these correctly describes what happens to the gas?",
      options: [
        "Temperature falls and internal energy decreases",
        "Temperature and internal energy both remain unchanged",
        "Temperature rises and internal energy increases",
        "Temperature remains the same but internal energy decreases",
      ],
      correctIndex: 1,
      solution:
        "In free expansion, Q = 0 (insulated) and W = 0 (no resisting pressure to push against, since it expands into a vacuum). By the first law, dU = dQ − dW = 0, so internal energy — and hence temperature, for an ideal gas — stays exactly the same.",
    },
    {
      number: 10,
      question: "Find the ratio of specific heats (γ) for a diatomic gas, given its degrees of freedom f = 5.",
      options: ["1.33", "1.40", "1.50", "1.67"],
      correctIndex: 1,
      solution: "γ = 1 + 2/f = 1 + 2/5 = 1.4.",
    },
    {
      number: 11,
      question:
        "For a certain ideal gas, the molar specific heat at constant volume is C_v = 20 J/mol·K. Find its molar specific heat at constant pressure. (R = 8.3 J/mol·K)",
      options: ["11.7 J/mol·K", "20 J/mol·K", "28.3 J/mol·K", "36.6 J/mol·K"],
      correctIndex: 2,
      solution: "By Mayer's relation, C_P = C_v + R = 20 + 8.3 = 28.3 J/mol·K.",
    },
    {
      number: 12,
      question:
        "A gas undergoes a cyclic process that traces out a rectangle on its P–V diagram, with a pressure range of 2 × 10⁵ Pa and a volume range of 0.01 m³, traversed clockwise. Find the net work done by the gas in one complete cycle.",
      options: ["500 J", "1000 J", "1500 J", "2000 J"],
      correctIndex: 3,
      solution:
        "Net work in a cyclic process equals the enclosed area: W = ΔP × ΔV = (2×10⁵) × 0.01 = 2000 J (positive, since the cycle is clockwise).",
    },
    {
      number: 13,
      question:
        "A Carnot engine operates between a source at 600 K and a sink at 300 K. Find its efficiency.",
      options: ["25%", "33%", "50%", "67%"],
      correctIndex: 2,
      solution: "η = 1 − T₂/T₁ = 1 − 300/600 = 0.5 = 50%.",
    },
    {
      number: 14,
      question:
        "A heat engine absorbs 800 J of heat from its source and does 200 J of useful work in each cycle. Find its efficiency.",
      options: ["15%", "20%", "25%", "30%"],
      correctIndex: 2,
      solution: "η = W/Q₁ = 200/800 = 0.25 = 25%.",
    },
    {
      number: 15,
      question:
        "A Carnot refrigerator operates between a cold reservoir at 250 K and a hot reservoir at 300 K. Find its coefficient of performance.",
      options: ["3", "4", "5", "6"],
      correctIndex: 2,
      solution: "β = T₂/(T₁−T₂) = 250/(300−250) = 250/50 = 5.",
    },
    {
      number: 16,
      question:
        "A refrigerator with a coefficient of performance of 4 removes 800 J of heat from its cold chamber in each cycle. Find the work done on the refrigerator in that cycle.",
      options: ["100 J", "200 J", "300 J", "400 J"],
      correctIndex: 1,
      solution: "β = Q₂/W ⇒ W = Q₂/β = 800/4 = 200 J.",
    },
    {
      number: 17,
      question:
        "A Carnot engine has its sink fixed at 300 K and operates with an efficiency of 25%. If the source temperature is raised so that the efficiency becomes 40% (sink unchanged), find the increase in the source temperature.",
      options: ["50 K", "75 K", "100 K", "125 K"],
      correctIndex: 2,
      solution:
        "Initially: 0.25 = 1−300/T₁ ⇒ T₁ = 300/0.75 = 400 K. Finally: 0.40 = 1−300/T₁' ⇒ T₁' = 300/0.60 = 500 K. Increase = 500−400 = 100 K.",
    },
    {
      number: 18,
      question:
        "An ice cube absorbs 5460 J of heat while melting completely at a constant temperature of 273 K. Find the increase in entropy during this process.",
      options: ["10 J/K", "15 J/K", "20 J/K", "25 J/K"],
      correctIndex: 2,
      solution: "ΔS = Q/T = 5460/273 = 20 J/K.",
    },
  ],
};
