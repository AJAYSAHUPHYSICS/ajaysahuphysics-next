import type { ChapterDpp } from "../dpp/kinematics";

export const physicalWorldAndMeasurementJeeDpp: ChapterDpp = {
  chapterName: "Physical World & Measurement",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "Power delivered by a spring is given by P = (1/2)kx²/t. Check the dimensional consistency of this expression with the known dimension of power, [ML²T⁻³].",
      options: [
        "Consistent — both sides give [ML²T⁻³]",
        "Inconsistent — the expression gives [ML²T⁻²]",
        "Inconsistent — the expression gives [MLT⁻³]",
        "Cannot be checked without knowing k's exact value",
      ],
      correctIndex: 0,
      solution:
        "[k] = [MT⁻²] (force/length), [x²] = [L²], [t⁻¹] = [T⁻¹]. Multiplying: [MT⁻²][L²][T⁻¹] = [ML²T⁻³], which matches power exactly.",
    },
    {
      number: 2,
      question:
        "A system of units takes force, length, and time as fundamental, with 1 unit of force = 5 N, 1 unit of length = 4 m, and 1 unit of time = 2 s. Express 10 kg in terms of the new mass unit.",
      options: ["1 new unit", "2 new units", "4 new units", "5 new units"],
      correctIndex: 1,
      solution:
        "1 new mass unit = (force unit)(time unit)²/(length unit) = 5 × 2²/4 = 20/4 = 5 kg. So 10 kg = 10/5 = 2 new mass units.",
    },
    {
      number: 3,
      question:
        "A quantity X = √A · B² / C³. The percentage errors in A, B, and C are 4%, 2%, and 1% respectively. Find the percentage error in X.",
      options: ["7%", "9%", "11%", "13%"],
      correctIndex: 1,
      solution:
        "ΔX/X = (1/2)(ΔA/A) + 2(ΔB/B) + 3(ΔC/C) = (1/2)(4%) + 2(2%) + 3(1%) = 2% + 4% + 3% = 9%.",
    },
    {
      number: 4,
      question:
        "A vernier caliper (least count 0.01 cm) has a positive zero error of 0.03 cm. The main scale reads 4.2 cm and the 3rd vernier division coincides with a main scale line. Find the corrected reading.",
      options: ["4.17 cm", "4.20 cm", "4.23 cm", "4.26 cm"],
      correctIndex: 1,
      solution:
        "Raw reading = 4.2 + (3 × 0.01) = 4.23 cm. For positive zero error, subtract the correction: 4.23 − 0.03 = 4.20 cm.",
    },
    {
      number: 5,
      question: "Evaluate 3.24/1.2 to the correct number of significant figures.",
      options: ["2.7", "2.70", "2.7000", "3"],
      correctIndex: 0,
      solution:
        "3.24/1.2 = 2.7. Since 1.2 has only 2 significant figures, the result is limited to 2 significant figures: 2.7.",
    },
    {
      number: 6,
      question:
        "The time period of a mass-spring system is believed to follow T = k·mᵃ·kᵇ (k here being the spring constant in the formula, and k the dimensionless constant outside). Using [spring constant] = [MT⁻²], find a and b.",
      options: ["a = 1/2, b = −1/2", "a = 1, b = −1", "a = −1/2, b = 1/2", "a = 1/2, b = 1/2"],
      correctIndex: 0,
      solution:
        "[T] = T¹ = [M]ᵃ[MT⁻²]ᵇ = M^(a+b) T^(−2b). Matching M: a+b=0. Matching T: −2b=1 ⇒ b=−1/2, so a=1/2. This gives the familiar T = 2π√(m/k).",
    },
    {
      number: 7,
      question: "Convert 1 watt of power into the CGS unit of power (erg/s).",
      options: ["10⁵ erg/s", "10⁶ erg/s", "10⁷ erg/s", "10⁸ erg/s"],
      correctIndex: 2,
      solution:
        "[Power] = [ML²T⁻³]. n₂ = n₁[M₁/M₂][L₁/L₂]²[T₁/T₂]⁻³ = 1 × 1000 × (100)² × 1 = 10⁷, so 1 W = 10⁷ erg/s.",
    },
    {
      number: 8,
      question: "Which of the following equations is dimensionally INCORRECT?",
      options: [
        "v = u + at",
        "s = ut + (1/2)at²",
        "F = mv² (for a particle moving in a circle of radius r)",
        "W = Fs cosθ",
      ],
      correctIndex: 2,
      solution:
        "The correct centripetal force expression is F = mv²/r, which has dimensions [MLT⁻²]. Writing F = mv² alone gives [ML²T⁻²] (missing the 1/L from dividing by r), which does not match the dimension of force — so it is dimensionally incorrect.",
    },
    {
      number: 9,
      question:
        "A quantity X = (A + B)/C, where A = (10 ± 0.1), B = (20 ± 0.2), and C = (5 ± 0.1) (all in consistent units). Find the percentage error in X.",
      options: ["1%", "2%", "3%", "5%"],
      correctIndex: 2,
      solution:
        "For the sum (A+B), absolute errors add: Δ(A+B) = 0.1 + 0.2 = 0.3, and (A+B) = 30, so its relative error = 0.3/30 = 1%. For the quotient by C, relative errors add: ΔX/X = 1% + (0.1/5)×100% = 1% + 2% = 3%.",
    },
    {
      number: 10,
      question: "What is the order of magnitude of the number of seconds in one year?",
      options: ["10⁵", "10⁶", "10⁷", "10⁸"],
      correctIndex: 2,
      solution:
        "Number of seconds in a year ≈ 365 × 24 × 3600 ≈ 3.15 × 10⁷, so the order of magnitude is 10⁷.",
    },
    {
      number: 11,
      question:
        "The universal gravitational constant G = 6.674 × 10⁻¹¹ N·m²/kg² in SI units. Find its value in a system where the unit of mass is 5 kg, the unit of length is 2 m, and the unit of time is 2 s.",
      options: ["8.34 × 10⁻¹¹", "1.67 × 10⁻¹⁰", "3.34 × 10⁻¹⁰", "6.67 × 10⁻¹¹"],
      correctIndex: 1,
      solution:
        "[G] = [M⁻¹L³T⁻²]. G_new = G_SI × (M_SI/M_new)⁻¹ × (L_SI/L_new)³ × (T_SI/T_new)⁻² = 6.674×10⁻¹¹ × 5 × (1/2)³ × (1/2)⁻² = 6.674×10⁻¹¹ × 5 × (1/8) × 4 ≈ 1.67 × 10⁻¹⁰ (in the new units).",
    },
    {
      number: 12,
      question:
        "The mass of a cube is measured with 2% error, and the length of its side is measured with 1% error. Find the percentage error in its calculated density.",
      options: ["3%", "4%", "5%", "7%"],
      correctIndex: 2,
      solution:
        "Density ρ = M/L³, so Δρ/ρ = ΔM/M + 3(ΔL/L) = 2% + 3(1%) = 2% + 3% = 5%.",
    },
  ],
};
