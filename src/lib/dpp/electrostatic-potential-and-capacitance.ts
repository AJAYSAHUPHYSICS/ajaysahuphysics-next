import type { ChapterDpp } from "./kinematics";

export const electrostaticPotentialAndCapacitanceDpp: ChapterDpp = {
  chapterName: "Electrostatic Potential & Capacitance",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "A capacitor stores a charge of 600 µC when connected across a battery of emf 12 V. Find its capacitance.",
      options: ["50 µF", "25 µF", "100 µF", "12 µF"],
      correctIndex: 0,
      solution: "C = Q/V = 600 × 10⁻⁶ / 12 = 50 × 10⁻⁶ F = 50 µF.",
    },
    {
      number: 2,
      question:
        "A capacitor of capacitance 4 µF is charged to a potential difference of 250 V. Calculate the energy stored in it.",
      options: ["0.125 J", "0.25 J", "0.0625 J", "1 J"],
      correctIndex: 0,
      solution: "U = ½CV² = ½ × 4×10⁻⁶ × (250)² = ½ × 4×10⁻⁶ × 62500 = 0.125 J.",
    },
    {
      number: 3,
      question:
        "An isolated spherical conductor of radius 9 cm is kept in air. Find its capacitance. (Take 1/4πε₀ = 9 × 10⁹ SI units)",
      options: ["10 pF", "9 pF", "11 pF", "90 pF"],
      correctIndex: 0,
      solution: "C = 4πε₀R = R/k = 0.09/(9×10⁹) = 1×10⁻¹¹ F = 10 pF.",
    },
    {
      number: 4,
      question:
        "A spherical capacitor has an inner sphere of radius 9 cm and a concentric outer sphere of radius 10 cm, which is earthed. Find its capacitance in air.",
      options: ["100 pF", "90 pF", "110 pF", "10 pF"],
      correctIndex: 0,
      solution:
        "C = 4πε₀R₁R₂/(R₂−R₁) = (R₁R₂/(R₂−R₁))/k = (0.09×0.10/0.01)/(9×10⁹) = (0.9)/(9×10⁹) = 1×10⁻¹⁰ F = 100 pF.",
    },
    {
      number: 5,
      question:
        "A parallel plate capacitor has plates of area 200 cm² separated by 1 mm of air. Find its capacitance. (ε₀ = 8.85 × 10⁻¹² F/m)",
      options: ["177 pF", "200 pF", "150 pF", "17.7 pF"],
      correctIndex: 0,
      solution: "C₀ = ε₀A/d = 8.85×10⁻¹² × 0.02 / 1×10⁻³ = 1.77×10⁻¹⁰ F ≈ 177 pF.",
    },
    {
      number: 6,
      question:
        "The capacitor of the previous type (A = 200 cm², d = 1 mm) is now completely filled with a dielectric of dielectric constant 5. Find the new capacitance.",
      options: ["885 pF", "177 pF", "442 pF", "1770 pF"],
      correctIndex: 0,
      solution: "C = KC₀ = 5 × 177 pF = 885 pF.",
    },
    {
      number: 7,
      question:
        "A parallel plate capacitor has capacitance C₀. If the area of its plates is made 3 times larger and the separation between them is reduced to one-third, what is the new capacitance?",
      options: ["9C₀", "3C₀", "C₀/9", "6C₀"],
      correctIndex: 0,
      solution: "C ∝ A/d. New C = C₀ × (3A)/(d/3) / (A/d) = C₀ × 9 = 9C₀.",
    },
    {
      number: 8,
      question:
        "A parallel plate capacitor of capacitance 8 µF (no dielectric) is connected to a 25 V battery. Without disconnecting the battery, a dielectric of dielectric constant 3 is inserted to completely fill the gap. Find the charge on the capacitor after the dielectric is inserted.",
      options: ["600 µC", "200 µC", "75 µC", "2400 µC"],
      correctIndex: 0,
      solution:
        "With the battery still connected, V stays 25 V. New C = K C₀ = 3 × 8 = 24 µF. Charge after = CV = 24 × 25 = 600 µC.",
    },
    {
      number: 9,
      question:
        "The surface charge density on a charged conducting plate is 4.0 × 10⁻⁶ C/m². Find the electrostatic pressure on the surface. (ε₀ = 8.85 × 10⁻¹² F/m)",
      options: ["0.90 N/m²", "1.81 N/m²", "0.45 N/m²", "1.27 N/m²"],
      correctIndex: 0,
      solution:
        "P = σ²/2ε₀ = (4×10⁻⁶)² / (2 × 8.85×10⁻¹²) = 1.6×10⁻¹¹ / 1.77×10⁻¹¹ ≈ 0.90 N/m².",
    },
    {
      number: 10,
      question:
        "At a point in an electric field, E = 3 × 10⁴ V/m. Find the energy density of the field at that point. (ε₀ = 8.85 × 10⁻¹² F/m)",
      options: ["3.98 × 10⁻³ J/m³", "7.96 × 10⁻³ J/m³", "1.99 × 10⁻³ J/m³", "8.85 × 10⁻¹² J/m³"],
      correctIndex: 0,
      solution: "u = ½ε₀E² = ½ × 8.85×10⁻¹² × (3×10⁴)² = ½ × 8.85×10⁻¹² × 9×10⁸ ≈ 3.98×10⁻³ J/m³.",
    },
    {
      number: 11,
      question: "Three capacitors of 6 µF, 3 µF and 2 µF are connected in series. Find the equivalent capacitance.",
      options: ["1 µF", "2 µF", "11 µF", "0.5 µF"],
      correctIndex: 0,
      solution: "1/C_S = 1/6 + 1/3 + 1/2 = (1+2+3)/6 = 1 ⟹ C_S = 1 µF.",
    },
    {
      number: 12,
      question:
        "Capacitors of 2 µF, 3 µF and 5 µF are connected in parallel across a 12 V battery. Find the total charge supplied by the battery.",
      options: ["120 µC", "12 µC", "1200 µC", "60 µC"],
      correctIndex: 0,
      solution: "C_P = 2+3+5 = 10 µF. Q = C_PV = 10 × 12 = 120 µC.",
    },
    {
      number: 13,
      question:
        "Two capacitors of 4 µF each are connected in series, and this combination is connected in parallel with another 4 µF capacitor. Find the equivalent capacitance of the whole network.",
      options: ["6 µF", "8 µF", "4 µF", "3 µF"],
      correctIndex: 0,
      solution: "Series part: (4×4)/(4+4) = 2 µF. In parallel with 4 µF: 2 + 4 = 6 µF.",
    },
    {
      number: 14,
      question:
        "A capacitor of 4 µF is charged to a potential of 12 V, and another capacitor of 2 µF is charged to a potential of 6 V (same polarity). They are then connected together by a wire. Find the common potential after connection.",
      options: ["10 V", "9 V", "12 V", "8 V"],
      correctIndex: 0,
      solution: "V = (C₁V₁+C₂V₂)/(C₁+C₂) = (4×12 + 2×6)/(4+2) = (48+12)/6 = 10 V.",
    },
    {
      number: 15,
      question:
        "For the two capacitors of the previous question (4 µF at 12 V, 2 µF at 6 V, same polarity) connected together by a wire, calculate the heat dissipated in the process.",
      options: ["24 µJ", "12 µJ", "48 µJ", "6 µJ"],
      correctIndex: 0,
      solution:
        "ΔU = ½ × [C₁C₂/(C₁+C₂)] × (V₁−V₂)² = ½ × (4×2/6) × (12−6)² = ½ × 1.333 × 36 = 24 µJ.",
    },
    {
      number: 16,
      question:
        "An uncharged capacitor is connected to a 20 V battery through a resistor R, with time constant RC = 4 s. Find the potential difference across the capacitor after 4 s.",
      options: ["≈12.6 V", "≈7.4 V", "20 V", "10 V"],
      correctIndex: 0,
      solution: "At t = RC, V = V₀(1 − e⁻¹) = 20 × (1 − 0.368) ≈ 12.6 V.",
    },
    {
      number: 17,
      question:
        "A capacitor charged to 100 µC discharges through a resistor with a time constant of 5 s. Find the charge remaining on it after 5 s.",
      options: ["≈36.8 µC", "≈63.2 µC", "50 µC", "100 µC"],
      correctIndex: 0,
      solution: "At t = τ = RC, Q = Q₀e⁻¹ = 100 × 0.368 ≈ 36.8 µC.",
    },
    {
      number: 18,
      question: "A Van de Graaff generator is able to build up a potential of the order of 10⁷ V mainly because —",
      options: [
        "charge delivered to the hollow terminal always moves entirely to its outer surface, so fresh charge can keep being added",
        "the terminal is made of a material with an extremely large dielectric constant",
        "the insulating belt itself becomes negatively charged and cancels the terminal's own field",
        "the terminal is connected to the earth through a very high resistance",
      ],
      correctIndex: 0,
      solution:
        "Since charge given to a hollow conductor resides entirely on its outer surface, the inside of the terminal is always at the same potential as a point just arriving with fresh charge is at a lower potential — so charge keeps flowing onto the terminal even as its potential rises, until air breakdown is approached.",
    },
  ],
};
