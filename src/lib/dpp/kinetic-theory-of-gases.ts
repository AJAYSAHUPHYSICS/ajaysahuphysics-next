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

export const kineticTheoryOfGasesDpp: ChapterDpp = {
  chapterName: "Kinetic Theory of Gases",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A fixed amount of gas occupies 4 L at 1 atm and 300 K. Find its volume at 2 atm and 450 K.",
      options: ["2 L", "3 L", "4 L", "6 L"],
      correctIndex: 1,
      solution:
        "P₁V₁/T₁ = P₂V₂/T₂ ⇒ V₂ = P₁V₁T₂/(P₂T₁) = (1×4×450)/(2×300) = 1800/600 = 3 L.",
    },
    {
      number: 2,
      question:
        "Find the rms speed of oxygen molecules at 300 K. (Molar mass of O₂ = 32 × 10⁻³ kg/mol, R = 8.3 J/mol·K)",
      options: ["345 m/s", "414 m/s", "483 m/s", "552 m/s"],
      correctIndex: 2,
      solution:
        "v_rms = √(3RT/M) = √[(3×8.3×300)/0.032] = √(7470/0.032) = √233437.5 ≈ 483 m/s.",
    },
    {
      number: 3,
      question: "If the absolute temperature of a gas is increased 4 times, by what factor does the rms speed of its molecules increase?",
      options: ["1.4", "2", "2.8", "4"],
      correctIndex: 1,
      solution: "v_rms ∝ √T, so quadrupling T increases v_rms by a factor of √4 = 2.",
    },
    {
      number: 4,
      question:
        "Find the average translational kinetic energy of a gas molecule at 400 K. (Boltzmann constant k = 1.38 × 10⁻²³ J/K)",
      options: ["4.14 × 10⁻²¹ J", "6.21 × 10⁻²¹ J", "8.28 × 10⁻²¹ J", "1.10 × 10⁻²⁰ J"],
      correctIndex: 2,
      solution: "⟨KE⟩ = (3/2)kT = 1.5 × (1.38×10⁻²³) × 400 = 8.28×10⁻²¹ J.",
    },
    {
      number: 5,
      question:
        "Find the total translational kinetic energy of 1 mole of an ideal gas at 500 K. (R = 8.3 J/mol·K)",
      options: ["4150 J", "6225 J", "8300 J", "10375 J"],
      correctIndex: 1,
      solution: "U = (3/2)nRT = 1.5 × 1 × 8.3 × 500 = 6225 J.",
    },
    {
      number: 6,
      question: "For a gas at any given temperature, how do the rms speed (v_rms), average speed (v_avg), and most probable speed (v_p) of its molecules compare?",
      options: ["v_p > v_avg > v_rms", "v_avg > v_rms > v_p", "v_rms > v_avg > v_p", "All three are always equal"],
      correctIndex: 2,
      solution:
        "From the Maxwell speed distribution, these three speeds always follow the fixed order v_rms > v_avg > v_p, for any gas at any temperature.",
    },
    {
      number: 7,
      question:
        "A diatomic gas has 7 degrees of freedom per molecule (translational + rotational + vibrational, at high temperature). Find its ratio of specific heats, γ.",
      options: ["1.14", "1.22", "1.29", "1.40"],
      correctIndex: 2,
      solution: "γ = 1 + 2/f = 1 + 2/7 = 9/7 ≈ 1.29.",
    },
    {
      number: 8,
      question: "If the number density of molecules in a gas is doubled while temperature and molecular size stay the same, how does the mean free path change?",
      options: ["It doubles", "It is halved", "It stays the same", "It quadruples"],
      correctIndex: 1,
      solution: "λ = 1/(√2πd²n) is inversely proportional to number density n, so doubling n halves the mean free path.",
    },
    {
      number: 9,
      question:
        "Find the mean free path of molecules in a gas with number density 2 × 10²⁵ m⁻³ and effective molecular diameter 2 × 10⁻¹⁰ m.",
      options: ["1.41 × 10⁻⁷ m", "2.81 × 10⁻⁷ m", "4.22 × 10⁻⁷ m", "5.63 × 10⁻⁷ m"],
      correctIndex: 1,
      solution:
        "λ = 1/(√2πd²n) = 1/[1.414 × 3.1416 × (2×10⁻¹⁰)² × 2×10²⁵] = 1/(3.554×10⁶) ≈ 2.81×10⁻⁷ m.",
    },
    {
      number: 10,
      question: "In the Van der Waals equation (P + a/V²)(V−b) = RT, what does the constant 'a' physically account for?",
      options: [
        "The finite size of gas molecules",
        "Intermolecular attractive forces",
        "The average molecular speed",
        "The number of degrees of freedom",
      ],
      correctIndex: 1,
      solution:
        "The 'a' term corrects the pressure for intermolecular attraction, which pulls molecules slightly inward and reduces the force they exert on the container walls compared to an ideal (non-interacting) gas.",
    },
    {
      number: 11,
      question:
        "Calculate the Boltzmann constant, given R = 8.3 J/mol·K and Avogadro's number N_A = 6.02 × 10²³/mol.",
      options: ["1.20 × 10⁻²³ J/K", "1.38 × 10⁻²³ J/K", "1.66 × 10⁻²³ J/K", "1.80 × 10⁻²³ J/K"],
      correctIndex: 1,
      solution: "k = R/N_A = 8.3/(6.02×10²³) ≈ 1.38×10⁻²³ J/K.",
    },
    {
      number: 12,
      question:
        "A gas has density 1.2 kg/m³ and an rms molecular speed of 500 m/s. Find its pressure.",
      options: ["5 × 10⁴ Pa", "1 × 10⁵ Pa", "1.5 × 10⁵ Pa", "2 × 10⁵ Pa"],
      correctIndex: 1,
      solution: "P = (1/3)ρv_rms² = (1/3) × 1.2 × 500² = (1/3) × 1.2 × 250000 = 1×10⁵ Pa.",
    },
    {
      number: 13,
      question:
        "An ideal gas of volume 0.02 m³ has a total translational kinetic energy of 300 J. Find its pressure.",
      options: ["5 × 10³ Pa", "1 × 10⁴ Pa", "1.5 × 10⁴ Pa", "2 × 10⁴ Pa"],
      correctIndex: 1,
      solution: "PV = (2/3)E ⇒ P = 2E/(3V) = (2×300)/(3×0.02) = 600/0.06 = 1×10⁴ Pa.",
    },
    {
      number: 14,
      question:
        "Find the ratio of the rms speed of hydrogen molecules (M = 2 g/mol) to that of oxygen molecules (M = 32 g/mol) at the same temperature.",
      options: ["2 : 1", "4 : 1", "8 : 1", "16 : 1"],
      correctIndex: 1,
      solution: "v_rms ∝ 1/√M, so the ratio is √(M_O₂/M_H₂) = √(32/2) = √16 = 4, i.e., 4 : 1.",
    },
    {
      number: 15,
      question:
        "Two different ideal gases, of different molar masses, are kept at the same temperature. How do their average translational kinetic energies per molecule compare?",
      options: [
        "The heavier gas has greater average KE per molecule",
        "The lighter gas has greater average KE per molecule",
        "Both have equal average KE per molecule",
        "It depends on their respective pressures",
      ],
      correctIndex: 2,
      solution:
        "Average translational KE per molecule = (3/2)kT depends only on temperature, not on molar mass — so at the same T, both gases have exactly equal average KE per molecule (though their rms speeds differ).",
    },
    {
      number: 16,
      question:
        "Find the molar specific heat at constant volume (C_v) for a diatomic gas with 5 degrees of freedom. (R = 8.3 J/mol·K)",
      options: ["12.45 J/mol·K", "16.6 J/mol·K", "20.75 J/mol·K", "24.9 J/mol·K"],
      correctIndex: 2,
      solution: "C_v = (f/2)R = (5/2) × 8.3 = 20.75 J/mol·K.",
    },
    {
      number: 17,
      question: "Find the number of molecules present in 2 moles of an ideal gas. (N_A = 6.02 × 10²³ /mol)",
      options: ["3.01 × 10²³", "6.02 × 10²³", "1.204 × 10²⁴", "2.408 × 10²⁴"],
      correctIndex: 2,
      solution: "N = nN_A = 2 × 6.02×10²³ = 1.204×10²⁴.",
    },
    {
      number: 18,
      question:
        "Find the most probable speed of nitrogen molecules at 300 K. (Molar mass of N₂ = 28 × 10⁻³ kg/mol, R = 8.3 J/mol·K)",
      options: ["301 m/s", "362 m/s", "422 m/s", "493 m/s"],
      correctIndex: 2,
      solution:
        "v_p = √(2RT/M) = √[(2×8.3×300)/0.028] = √(4980/0.028) = √177857 ≈ 422 m/s.",
    },
  ],
};
