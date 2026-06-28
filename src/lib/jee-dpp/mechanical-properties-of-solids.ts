import type { ChapterDpp } from "../dpp/kinematics";

export const mechanicalPropertiesOfSolidsJeeDpp: ChapterDpp = {
  chapterName: "Mechanical Properties of Solids",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A wire of length 1 m and area 3×10⁻⁶ m² stretches by 0.5 mm under a 900 N load. Find Young's modulus.",
      options: ["2×10¹¹ Pa", "4×10¹¹ Pa", "6×10¹¹ Pa", "8×10¹¹ Pa"],
      correctIndex: 2,
      solution: "Y = FL/(A·ΔL) = (900×1)/[(3×10⁻⁶)(0.5×10⁻³)] = 900/(1.5×10⁻⁹) = 6×10¹¹ Pa.",
    },
    {
      number: 2,
      question:
        "A uniform wire of mass 3 kg, length 6 m, area 2×10⁻⁶ m², and Young's modulus 1×10¹¹ Pa hangs vertically. Find its elongation due to its own weight. (g = 10 m/s²)",
      options: ["0.30 mm", "0.45 mm", "0.60 mm", "0.90 mm"],
      correctIndex: 1,
      solution: "ΔL = MgL/(2AY) = (3×10×6)/(2×2×10⁻⁶×1×10¹¹) = 180/(4×10⁵) = 4.5×10⁻⁴ m = 0.45 mm.",
    },
    {
      number: 3,
      question:
        "A material is stressed to 4×10⁸ Pa with Young's modulus 4×10¹¹ Pa. Find the elastic energy stored per unit volume.",
      options: ["1×10⁵ J/m³", "2×10⁵ J/m³", "3×10⁵ J/m³", "4×10⁵ J/m³"],
      correctIndex: 1,
      solution: "Energy density = stress²/(2Y) = (4×10⁸)²/(2×4×10¹¹) = 1.6×10¹⁷/(8×10¹¹) = 2×10⁵ J/m³.",
    },
    {
      number: 4,
      question: "A block's volume decreases by 0.05% under a pressure increase of 5×10⁶ Pa. Find the bulk modulus.",
      options: ["5×10⁹ Pa", "1×10¹⁰ Pa", "1.5×10¹⁰ Pa", "2×10¹⁰ Pa"],
      correctIndex: 1,
      solution: "K = ΔP/(ΔV/V) = (5×10⁶)/(0.0005) = 1×10¹⁰ Pa.",
    },
    {
      number: 5,
      question:
        "Two identical wires of Young's moduli 3×10¹¹ Pa and 1×10¹¹ Pa are stretched by the same force. Find the ratio of their elongations (first : second).",
      options: ["1 : 3", "3 : 1", "1 : 9", "9 : 1"],
      correctIndex: 0,
      solution: "ΔL ∝ 1/Y for the same force, length, and area. Ratio = Y₂ : Y₁ = (1×10¹¹) : (3×10¹¹) = 1 : 3.",
    },
    {
      number: 6,
      question: "A wire has longitudinal strain 0.004 and Poisson's ratio 0.25. Find its lateral strain.",
      options: ["0.0005", "0.001", "0.002", "0.004"],
      correctIndex: 1,
      solution: "Lateral strain = Poisson's ratio × longitudinal strain = 0.25 × 0.004 = 0.001.",
    },
    {
      number: 7,
      question:
        "Find the force needed to stretch a wire (Y = 2×10¹¹ Pa, A = 1×10⁻⁶ m², L = 2 m) by 2 mm.",
      options: ["100 N", "150 N", "200 N", "250 N"],
      correctIndex: 2,
      solution: "F = YA(ΔL)/L = (2×10¹¹)(1×10⁻⁶)(2×10⁻³)/2 = (2×10¹¹×2×10⁻⁹)/2 = 400/2 = 200 N.",
    },
    {
      number: 8,
      question: "A material with Young's modulus 1.5×10¹¹ Pa is subjected to a strain of 0.001. Find the stress.",
      options: ["1×10⁸ Pa", "1.5×10⁸ Pa", "2×10⁸ Pa", "2.5×10⁸ Pa"],
      correctIndex: 1,
      solution: "Stress = Y × strain = (1.5×10¹¹)(0.001) = 1.5×10⁸ Pa.",
    },
    {
      number: 9,
      question:
        "A wire of volume 2×10⁻⁴ m³ is stressed to 1×10⁸ Pa with Young's modulus 1×10¹¹ Pa. Find the total elastic potential energy stored.",
      options: ["5 J", "10 J", "15 J", "20 J"],
      correctIndex: 1,
      solution: "Energy density = stress²/(2Y) = (1×10⁸)²/(2×1×10¹¹) = 5×10⁴ J/m³. Total energy = 5×10⁴ × 2×10⁻⁴ = 10 J.",
    },
    {
      number: 10,
      question: "A material has bulk modulus 2×10⁹ Pa. Find the percentage decrease in volume under a pressure increase of 4×10⁶ Pa.",
      options: ["0.1%", "0.2%", "0.3%", "0.4%"],
      correctIndex: 1,
      solution: "ΔV/V = ΔP/K = (4×10⁶)/(2×10⁹) = 0.002 = 0.2%.",
    },
    {
      number: 11,
      question: "A material has shear stress 2×10⁶ Pa and shear strain 0.0004. Find its modulus of rigidity.",
      options: ["2.5×10⁹ Pa", "5×10⁹ Pa", "7.5×10⁹ Pa", "1×10¹⁰ Pa"],
      correctIndex: 1,
      solution: "Modulus of rigidity G = shear stress/shear strain = (2×10⁶)/(0.0004) = 5×10⁹ Pa.",
    },
    {
      number: 12,
      question:
        "Wire A (length 2 m, area 1×10⁻⁶ m²) and wire B (length 4 m, area 2×10⁻⁶ m²) are made of the same material and stretched by the same force. Find the ratio of their elongations (A : B).",
      options: ["1 : 1", "1 : 2", "2 : 1", "1 : 4"],
      correctIndex: 0,
      solution:
        "ΔL = FL/(AY), so ΔL ∝ L/A. For wire A: L/A = 2/(1×10⁻⁶) = 2×10⁶. For wire B: L/A = 4/(2×10⁻⁶) = 2×10⁶ — identical, so the elongations are equal: ratio 1 : 1.",
    },
  ],
};
