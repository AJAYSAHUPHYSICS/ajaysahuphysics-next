import type { ChapterPyq } from "./kinematics";

export const physicalWorldAndMeasurementPyq: ChapterPyq = {
  chapterName: "Physical World & Measurement",
  className: "11",
  questions: [
    // ---------------- JEE Main ----------------
    {
      exam: "JEE Main 2019",
      examType: "jee-main",
      question:
        "The dimensional formula of Planck's constant (h) is the same as that of which of the following physical quantities?",
      options: ["Angular momentum", "Linear momentum", "Torque", "Power"],
      correctIndex: 0,
      solution:
        "[h] = [Energy][Time] = [ML²T⁻²][T] = [ML²T⁻¹], which is exactly the dimensional formula of angular momentum.",
    },
    {
      exam: "JEE Main 2020",
      examType: "jee-main",
      question:
        "The length of a simple pendulum is measured with a 1% error, and its time period with a 2% error. What is the percentage error in the calculated value of g, using g = 4π²l/T²?",
      options: ["1%", "3%", "5%", "9%"],
      correctIndex: 2,
      solution:
        "g ∝ l·T⁻². Relative errors combine as: Δg/g = Δl/l + 2(ΔT/T) = 1% + 2(2%) = 1% + 4% = 5%.",
    },
    {
      exam: "JEE Main 2021",
      examType: "jee-main",
      question:
        "Which of the following equations is dimensionally INCORRECT, where v is velocity, m mass, r radius, and F force?",
      options: [
        "F = mv²/r",
        "F = mv/r²",
        "v² = u² + 2as",
        "Kinetic energy = ½mv²",
      ],
      correctIndex: 1,
      solution:
        "Centripetal force is correctly F = mv²/r, with dimensions [MLT⁻²]. The expression mv/r² has dimensions [M][LT⁻¹]/[L²] = [ML⁻¹T⁻¹], which does not match [MLT⁻²] — so it is dimensionally incorrect. The other three options are standard, dimensionally correct relations.",
    },
    {
      exam: "JEE Main 2018",
      examType: "jee-main",
      question:
        "If force (F), velocity (v), and time (T) are taken as fundamental quantities, what is the dimensional formula of mass in this new system?",
      options: ["[FvT]", "[Fv⁻¹T]", "[FvT⁻¹]", "[Fv⁻¹T⁻¹]"],
      correctIndex: 1,
      solution:
        "F = ma = m(v/T) ⇒ m = FT/v = F v⁻¹ T. So mass has the dimensional formula [Fv⁻¹T] in this system.",
    },
    {
      exam: "JEE Main 2017",
      examType: "jee-main",
      question:
        "A vernier caliper has a negative zero error of 0.04 mm. If the reading taken for an object is 5.32 mm, what is the corrected length?",
      options: ["5.24 mm", "5.28 mm", "5.32 mm", "5.36 mm"],
      correctIndex: 3,
      solution:
        "For a negative zero error, the correction must be ADDED to every observed reading: corrected length = 5.32 + 0.04 = 5.36 mm.",
    },
    {
      exam: "JEE Main 2022",
      examType: "jee-main",
      question:
        "The numerical values of the same physical quantity in two systems of units are n₁ and n₂. If n₁ > n₂, what can be said about the size of the unit used in each system?",
      options: [
        "The unit used in system 1 is larger",
        "The unit used in system 1 is smaller",
        "Both units must be equal",
        "No relation can be determined",
      ],
      correctIndex: 1,
      solution:
        "Since n₁u₁ = n₂u₂ (the physical quantity itself doesn't change), a larger numerical value (n₁ > n₂) must correspond to a smaller unit (u₁ < u₂) — numerical value and unit size vary inversely.",
    },
    {
      exam: "JEE Main 2016",
      examType: "jee-main",
      question:
        "Two resistances are measured as R₁ = (4 ± 0.2) Ω and R₂ = (6 ± 0.3) Ω. If they are connected in series, what is the percentage error in the equivalent resistance?",
      options: ["2%", "5%", "8%", "10%"],
      correctIndex: 1,
      solution:
        "For series combination, R = R₁ + R₂ = 10 Ω, and absolute errors add: ΔR = ΔR₁ + ΔR₂ = 0.2 + 0.3 = 0.5 Ω. Percentage error = (0.5/10) × 100 = 5%.",
    },
    {
      exam: "JEE Main 2023",
      examType: "jee-main",
      question:
        "The mass and volume of a body are measured as (5.00 ± 0.05) kg and (2.00 ± 0.04) m³. What is the percentage error in the calculated density?",
      options: ["1%", "2%", "3%", "6%"],
      correctIndex: 2,
      solution:
        "Density ρ = M/V, so relative errors add: Δρ/ρ = ΔM/M + ΔV/V = (0.05/5.00) + (0.04/2.00) = 0.01 + 0.02 = 0.03, i.e., 3%.",
    },
    // ---------------- JEE Advanced ----------------
    {
      exam: "JEE Advanced 2013",
      examType: "jee-advanced",
      question:
        "In a certain system of units, the unit of mass equals 5 kg, the unit of length equals 2 m, and the unit of time equals 2 s. Express 1 joule of energy in this new system of units.",
      options: ["0.05 new units", "0.2 new units", "0.5 new units", "5 new units"],
      correctIndex: 1,
      solution:
        "[Energy] = [M¹L²T⁻²]. Using n₂ = n₁[M₁/M₂]¹[L₁/L₂]²[T₁/T₂]⁻² with SI values M₁=L₁=T₁=1 and new units M₂=5, L₂=2, T₂=2: n₂ = (1/5) × (1/2)² × (2)² = (1/5) × (1/4) × 4 = 1/5 = 0.2.",
    },
    {
      exam: "JEE Advanced 2015",
      examType: "jee-advanced",
      question:
        "The time period T of oscillation of a small liquid drop depends on its density ρ, radius r, and surface tension S, as T = k ρᵃ rᵇ Sᶜ for some dimensionless constant k. Find the values of a, b, and c.",
      options: [
        "a = 1/2, b = 3/2, c = −1/2",
        "a = 1, b = 1, c = −1",
        "a = 1/2, b = 1/2, c = −1",
        "a = −1/2, b = 3/2, c = 1/2",
      ],
      correctIndex: 0,
      solution:
        "[ρ] = [ML⁻³], [r] = [L], [S] = [MT⁻²] (force/length). Matching [T¹] = [M^(a+c) L^(−3a+b) T^(−2c)] gives: a + c = 0, −3a + b = 0, −2c = 1. Solving: c = −1/2, a = 1/2, b = 3a = 3/2.",
    },
    {
      exam: "JEE Advanced 2014",
      examType: "jee-advanced",
      question:
        "The resistivity of a wire is calculated using ρ = πd²R/(4l), where d is diameter (measured with a screw gauge), R is resistance, and l is length. If d is measured with 1% error, R with 1% error, and l with 2% error, what is the percentage error in ρ?",
      options: ["2%", "4%", "5%", "6%"],
      correctIndex: 2,
      solution:
        "ρ ∝ d²Rl⁻¹. Relative errors combine as Δρ/ρ = 2(Δd/d) + ΔR/R + Δl/l = 2(1%) + 1% + 2% = 2% + 1% + 2% = 5%.",
    },
    {
      exam: "JEE Advanced 2011",
      examType: "jee-advanced",
      question:
        "In the Van der Waals equation (P + a/V²)(V − b) = RT, where P is pressure and V is volume, what is the dimensional formula of the constant a?",
      options: ["[ML⁵T⁻²]", "[ML⁻¹T⁻²]", "[ML³T⁻²]", "[M⁰L³T⁰]"],
      correctIndex: 0,
      solution:
        "For the term a/V² to have the dimensions of pressure, [a] = [P][V²] = [ML⁻¹T⁻²][L³]² = [ML⁻¹T⁻²][L⁶] = [ML⁵T⁻²].",
    },
    {
      exam: "JEE Advanced 2016",
      examType: "jee-advanced",
      question:
        "A physical quantity X is defined as X = (A²B^(3/2))/(C³D^(1/2)). If the percentage errors in measuring A, B, C, and D are all equal to 2%, what is the percentage error in X?",
      options: ["8%", "10%", "14%", "20%"],
      correctIndex: 2,
      solution:
        "ΔX/X = 2(ΔA/A) + (3/2)(ΔB/B) + 3(ΔC/C) + (1/2)(ΔD/D) = (2 + 1.5 + 3 + 0.5) × 2% = 7 × 2% = 14%.",
    },
  ],
};
