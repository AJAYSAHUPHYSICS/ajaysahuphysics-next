import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const physicalWorldAndMeasurementJeeNotes: ChapterJeeNotes = {
  chapterName: "Physical World & Measurement",
  className: "11",
  intro:
    "These are fully worked, JEE-style problems on units, dimensions, and error analysis — the kind of multi-step reasoning JEE Main and JEE Advanced actually test, beyond the straightforward formula plug-ins in the regular DPP.",
  examples: [
    {
      title: "Illustration 1 — Deriving a Formula by Dimensional Analysis",
      problem:
        "The time period T of a simple pendulum is believed to depend on its length l and the acceleration due to gravity g, as T = k·lᵃ·gᵇ for some dimensionless constant k. Use dimensional analysis to find a and b.",
      solutionSteps: [
        "Write the dimensions of each quantity: [T] = T¹, [l] = L¹, [g] = LT⁻².",
        "Substitute into T = k·lᵃ·gᵇ: T¹ = Lᵃ · (LT⁻²)ᵇ = L^(a+b) T^(−2b).",
        "Match powers of L: a + b = 0.",
        "Match powers of T: −2b = 1 ⇒ b = −1/2.",
        "Substitute back: a = −b = 1/2.",
      ],
      answer: "a = 1/2, b = −1/2, so T = k√(l/g) — exactly the known pendulum formula (with k = 2π).",
    },
    {
      title: "Illustration 2 — Mass Unit in a New System of Fundamental Units",
      problem:
        "A new system of units takes force, length, and time as fundamental quantities, with 1 unit of force = 10 N, 1 unit of length = 2 m, and 1 unit of time = 4 s. Find the value (in kg) of 5 units of mass in this new system.",
      solutionSteps: [
        "Mass is derived from F = ma ⇒ m = F/a, and acceleration has dimensions L/T².",
        "So 1 new mass unit = (1 new force unit) × (1 new time unit)² / (1 new length unit).",
        "Substitute: 1 new mass unit = 10 N × (4 s)² / (2 m) = 10 × 16/2 = 80 kg.",
        "5 such units = 5 × 80 kg.",
      ],
      answer: "400 kg",
    },
    {
      title: "Illustration 3 — Multi-Term Error Propagation",
      problem:
        "A quantity X is calculated as X = A²B³/C. If the percentage errors in measuring A, B, and C are 1%, 2%, and 3% respectively, find the percentage error in X.",
      solutionSteps: [
        "For a quantity of the form X = AᵖBᵠ/Cʳ, relative errors combine as: ΔX/X = p(ΔA/A) + q(ΔB/B) + r(ΔC/C).",
        "Here p = 2, q = 3, r = 1.",
        "ΔX/X = 2(1%) + 3(2%) + 1(3%) = 2% + 6% + 3%.",
      ],
      answer: "11%",
    },
    {
      title: "Illustration 4 — Vernier Caliper Reading with Zero Error",
      problem:
        "A vernier caliper has a least count of 0.01 cm and a negative zero error of 0.02 cm. For a measurement, the main scale reads 3.4 cm and the 5th vernier division coincides with a main scale line. Find the corrected reading.",
      solutionSteps: [
        "Raw reading = MSR + (VSR × VC) = 3.4 + (5 × 0.01) = 3.4 + 0.05 = 3.45 cm.",
        "For a negative zero error, the correction is ADDED (not subtracted) to the raw reading: corrected reading = raw reading − (negative zero error) = 3.45 − (−0.02).",
      ],
      answer: "3.47 cm",
    },
    {
      title: "Illustration 5 — Significant Figures Through a Calculation Chain",
      problem: "Evaluate (12.5 × 0.0028) / 3.2, reporting the answer to the correct number of significant figures.",
      solutionSteps: [
        "First compute the raw value: (12.5 × 0.0028)/3.2 = 0.035/3.2 = 0.0109375.",
        "Count significant figures in each measured input: 12.5 has 3, 0.0028 has 2, 3.2 has 2.",
        "In multiplication/division, the result is rounded to match the factor with the FEWEST significant figures — here, 2.",
        "Write 0.0109375 as 1.09375 × 10⁻², then round the decimal part to 2 significant figures: 1.1 × 10⁻².",
      ],
      answer: "0.011 (2 significant figures)",
    },
    {
      title: "Illustration 6 — Checking Dimensional Consistency of a Derived Relation",
      problem:
        "Check whether the equation v² = u² + 2as (a standard kinematics equation) is dimensionally consistent.",
      solutionSteps: [
        "Find the dimension of each term separately: [v²] = (LT⁻¹)² = L²T⁻².",
        "[u²] = (LT⁻¹)² = L²T⁻² — matches [v²].",
        "[2as]: 2 is dimensionless, [a] = LT⁻², [s] = L, so [as] = (LT⁻²)(L) = L²T⁻² — also matches.",
        "Since every term being added has the identical dimension [L²T⁻²], the principle of homogeneity of dimensions is satisfied.",
      ],
      answer: "Dimensionally consistent — all three terms have dimension [L²T⁻²].",
    },
  ],
};
