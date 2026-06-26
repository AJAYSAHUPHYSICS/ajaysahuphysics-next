import type { ChapterDpp } from "./kinematics";

export const magnetismAndMatterDpp: ChapterDpp = {
  chapterName: "Magnetism & Matter",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "A bar magnet has pole strength 10 A·m and effective length 10 cm. What is its magnetic moment?",
      options: ["0.1 A·m²", "1 A·m²", "10 A·m²", "100 A·m²"],
      correctIndex: 1,
      solution: "M = m·l = 10 × 0.10 = 1 A·m².",
    },
    {
      number: 2,
      question:
        "Two magnetic poles, each of pole strength 10 A·m, are placed 10 cm apart in air. What is the force between them?",
      options: ["10⁻⁵ N", "10⁻⁴ N", "10⁻³ N", "10⁻² N"],
      correctIndex: 2,
      solution:
        "F = (μ₀/4π)(m₁m₂/r²) = 10⁻⁷ × (10×10)/(0.1)² = 10⁻⁷ × 100/0.01 = 10⁻⁷ × 10⁴ = 10⁻³ N.",
    },
    {
      number: 3,
      question:
        "A bar magnet has a geometric length of 24 cm. What is its effective (magnetic) length?",
      options: ["12 cm", "16 cm", "20 cm", "24 cm"],
      correctIndex: 2,
      solution: "l = (5/6)l₀ = (5/6) × 24 = 20 cm.",
    },
    {
      number: 4,
      question:
        "A short bar magnet of magnetic moment 2 A·m² is placed with its axis along the line joining it to a point P, 20 cm away from its centre (P far from the magnet). What is the magnetic field at P?",
      options: ["2.5 × 10⁻⁵ T", "5 × 10⁻⁵ T", "1 × 10⁻⁴ T", "2 × 10⁻⁴ T"],
      correctIndex: 1,
      solution:
        "B_axial = (μ₀/4π)(2M/r³) = 10⁻⁷ × (2×2)/(0.2)³ = 10⁻⁷ × 4/0.008 = 5 × 10⁻⁵ T.",
    },
    {
      number: 5,
      question:
        "A short bar magnet of magnetic moment 1 A·m² has a point Q on its equatorial line, 10 cm from its centre (Q far from the magnet). What is the magnetic field at Q?",
      options: ["5 × 10⁻⁵ T", "1 × 10⁻⁴ T", "2 × 10⁻⁴ T", "1 × 10⁻³ T"],
      correctIndex: 1,
      solution:
        "B_eq = (μ₀/4π)(M/r³) = 10⁻⁷ × 1/(0.1)³ = 10⁻⁷ × 1/0.001 = 1 × 10⁻⁴ T.",
    },
    {
      number: 6,
      question:
        "A bar magnet of moment 4 A·m² produces a field B₁ at an axial point 10 cm from its centre, and a field B₂ at an equatorial point at the same distance (both points far from the magnet). What is B₁ : B₂?",
      options: ["1 : 1", "1 : 2", "2 : 1", "4 : 1"],
      correctIndex: 2,
      solution:
        "B_axial = (μ₀/4π)(2M/r³) and B_eq = (μ₀/4π)(M/r³) at the same r, so B_axial/B_eq = 2 always — independent of M and r. B₁ : B₂ = 2 : 1.",
    },
    {
      number: 7,
      question:
        "A magnetic dipole of moment 5 A·m² is placed in a uniform field of 0.2 T, with its moment making an angle of 30° with the field. What is the torque on it?",
      options: ["0.25 N·m", "0.5 N·m", "0.87 N·m", "1.0 N·m"],
      correctIndex: 1,
      solution: "τ = MB sinθ = 5 × 0.2 × sin30° = 5 × 0.2 × 0.5 = 0.5 N·m.",
    },
    {
      number: 8,
      question:
        "A magnetic dipole of moment 4 A·m² is placed in a uniform field of 0.5 T, with its moment at 60° to the field. What is its potential energy?",
      options: ["−2 J", "−1 J", "0 J", "1 J"],
      correctIndex: 1,
      solution: "U = −MB cosθ = −4 × 0.5 × cos60° = −2 × 0.5 = −1 J.",
    },
    {
      number: 9,
      question:
        "A magnetic dipole of moment 3 A·m² is rotated from being parallel to a uniform field of 0.4 T to being exactly antiparallel to it. How much work is done?",
      options: ["0.6 J", "1.2 J", "2.4 J", "4.8 J"],
      correctIndex: 2,
      solution:
        "W = MB(1−cosθ) for θ = 180° gives W = MB(1−(−1)) = 2MB = 2 × 3 × 0.4 = 2.4 J.",
    },
    {
      number: 10,
      question:
        "A magnetic dipole is free to rotate in a uniform magnetic field. In which orientation is its potential energy minimum, and is that orientation stable or unstable?",
      options: [
        "M parallel to B; stable",
        "M parallel to B; unstable",
        "M perpendicular to B; stable",
        "M antiparallel to B; stable",
      ],
      correctIndex: 0,
      solution:
        "U = −MB cosθ is minimum (= −MB) at θ = 0°, i.e. M parallel to B. Any small displacement produces a restoring torque bringing it back, so this is a stable equilibrium.",
    },
    {
      number: 11,
      question:
        "At a place, the Earth's total magnetic field is 6 × 10⁻⁵ T and the angle of dip is 60°. What is the horizontal component of the field?",
      options: ["1.5 × 10⁻⁵ T", "3 × 10⁻⁵ T", "3√3 × 10⁻⁵ T", "5.2 × 10⁻⁵ T"],
      correctIndex: 1,
      solution: "B_H = B cosθ = 6×10⁻⁵ × cos60° = 6×10⁻⁵ × 0.5 = 3 × 10⁻⁵ T.",
    },
    {
      number: 12,
      question:
        "At a certain place, the horizontal component of Earth's field is √3 × 10⁻⁵ T and the vertical component is 1 × 10⁻⁵ T. What is the angle of dip at this place?",
      options: ["15°", "30°", "45°", "60°"],
      correctIndex: 1,
      solution:
        "tanθ = B_V/B_H = (1×10⁻⁵)/(√3×10⁻⁵) = 1/√3 ⟹ θ = 30°.",
    },
    {
      number: 13,
      question:
        "The true angle of dip at a place is 45°. A dip circle is set up at 60° to the magnetic meridian. What apparent dip will it show?",
      options: ["45°", "53.1°", "63.4°", "71.6°"],
      correctIndex: 2,
      solution:
        "tanθₐ = tanθ/cosα = tan45°/cos60° = 1/0.5 = 2 ⟹ θₐ = tan⁻¹(2) ≈ 63.4°.",
    },
    {
      number: 14,
      question:
        "A tangent galvanometer has 50 turns of radius 20 cm. If the horizontal component of Earth's field is 3 × 10⁻⁵ T, what current produces a deflection of 45°?",
      options: ["0.05 A", "0.10 A", "0.19 A", "0.29 A"],
      correctIndex: 2,
      solution:
        "At 45°, B₀ = B_H tan45° = B_H = 3×10⁻⁵ T. I = B₀(2R)/(μ₀N) = (3×10⁻⁵ × 0.4)/(4π×10⁻⁷ × 50) ≈ 0.191 A ≈ 0.19 A.",
    },
    {
      number: 15,
      question:
        "A tangent galvanometer shows a deflection of 30° for a current of 0.1 A. What is its reduction factor?",
      options: ["0.05 A", "0.087 A", "0.173 A", "0.20 A"],
      correctIndex: 2,
      solution: "K = I/tanθ = 0.1/tan30° = 0.1/0.577 ≈ 0.173 A.",
    },
    {
      number: 16,
      question:
        "Two identical bar magnets (same size and moment of inertia) are vibrated one at a time in a vibration magnetometer, giving time periods 2 s and 4 s respectively. What is the ratio of their magnetic moments M₁/M₂ (magnet 1 vibrated in T₁ = 2 s)?",
      options: ["1 : 4", "1 : 2", "2 : 1", "4 : 1"],
      correctIndex: 3,
      solution: "M₁/M₂ = T₂²/T₁² = 4²/2² = 16/4 = 4, so M₁/M₂ = 4 : 1.",
    },
    {
      number: 17,
      question:
        "A short bar magnet of moment 10 A·m² is placed with its south pole pointing towards geographic north. If the horizontal component of Earth's field is 4 × 10⁻⁵ T, find the distance of the neutral points from the magnet's centre (along its axis).",
      options: ["18.4 cm", "27.6 cm", "36.8 cm", "46.0 cm"],
      correctIndex: 2,
      solution:
        "S-pole towards north ⟹ neutral points lie on the axial line: (μ₀/4π)(2M/x³) = B_H. x³ = (10⁻⁷×2×10)/(4×10⁻⁵) = (2×10⁻⁶)/(4×10⁻⁵) = 0.05, so x = (0.05)^(1/3) ≈ 0.368 m ≈ 36.8 cm.",
    },
    {
      number: 18,
      question:
        "A magnetic material has a susceptibility of 1499. What is its relative permeability?",
      options: ["1", "1499", "1500", "2999"],
      correctIndex: 2,
      solution: "μᵣ = 1 + χ = 1 + 1499 = 1500.",
    },
  ],
};
