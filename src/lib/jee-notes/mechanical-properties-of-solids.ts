import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const mechanicalPropertiesOfSolidsJeeNotes: ChapterJeeNotes = {
  chapterName: "Mechanical Properties of Solids",
  className: "11",
  intro:
    "Fully worked, JEE-style problems on elasticity — Young's modulus, a wire stretching under its own weight, elastic energy density, and Poisson's ratio — going a level beyond the regular DPP.",
  examples: [
    {
      title: "Illustration 1 — Finding Young's Modulus from Experimental Data",
      problem:
        "A wire of length 2 m and cross-sectional area 2×10⁻⁶ m² stretches by 1 mm under a load of 400 N. Find Young's modulus of the material.",
      solutionSteps: [
        "Young's modulus: Y = stress/strain = (F/A)/(ΔL/L) = FL/(A·ΔL).",
        "Substitute F = 400 N, L = 2 m, A = 2×10⁻⁶ m², ΔL = 1×10⁻³ m.",
        "Y = (400×2)/[(2×10⁻⁶)(1×10⁻³)] = 800/(2×10⁻⁹).",
      ],
      answer: "Y = 4 × 10¹¹ N/m² (Pa).",
    },
    {
      title: "Illustration 2 — Elongation of a Wire Under Its Own Weight",
      problem:
        "A uniform wire of mass 2 kg and length 4 m hangs vertically. Its cross-sectional area is 1×10⁻⁶ m² and Young's modulus is 2×10¹¹ Pa. Find its elongation due to its own weight. (g = 10 m/s²)",
      solutionSteps: [
        "When a wire hangs under its own weight, every cross-section above a point supports only the weight BELOW it — so the tension varies along the length, unlike a wire stretched by a load at the end.",
        "Integrating this varying tension over the length gives a total elongation of ΔL = MgL/(2AY) — exactly HALF what you'd get if the full weight Mg acted uniformly along the whole wire.",
        "Substitute M = 2 kg, g = 10, L = 4 m, A = 1×10⁻⁶ m², Y = 2×10¹¹ Pa: ΔL = (2×10×4)/(2×1×10⁻⁶×2×10¹¹) = 80/(4×10⁵).",
      ],
      answer: "ΔL = 2 × 10⁻⁴ m = 0.2 mm.",
    },
    {
      title: "Illustration 3 — Elastic Energy Stored per Unit Volume",
      problem:
        "A material is stressed to 2×10⁸ Pa, and its Young's modulus is 2×10¹¹ Pa. Find the elastic potential energy stored per unit volume.",
      solutionSteps: [
        "Energy density (energy stored per unit volume) = ½ × stress × strain.",
        "Since strain = stress/Y, this can be rewritten as: energy density = stress²/(2Y).",
        "Substitute stress = 2×10⁸ Pa, Y = 2×10¹¹ Pa: energy density = (2×10⁸)²/(2×2×10¹¹) = 4×10¹⁶/(4×10¹¹).",
      ],
      answer: "Energy density = 1 × 10⁵ J/m³.",
    },
    {
      title: "Illustration 4 — Bulk Modulus from Pressure and Volume Change",
      problem:
        "A solid block's volume decreases by 0.1% when subjected to a pressure increase of 2×10⁶ Pa. Find the bulk modulus of the material.",
      solutionSteps: [
        "Bulk modulus: K = −ΔP/(ΔV/V) (the negative sign is conventionally dropped since K is reported as a positive quantity for a volume decrease under increased pressure).",
        "Convert the percentage: ΔV/V = 0.1% = 0.001.",
        "K = ΔP/(ΔV/V) = (2×10⁶)/(0.001).",
      ],
      answer: "K = 2 × 10⁹ Pa.",
    },
    {
      title: "Illustration 5 — Comparing Elongations of Two Different Wires",
      problem:
        "Two wires of identical length and cross-sectional area, but made of different materials with Young's moduli 2×10¹¹ Pa and 1×10¹¹ Pa, are each stretched by the same force. Find the ratio of their elongations.",
      solutionSteps: [
        "For the same force F, length L, and area A: ΔL = FL/(AY), so ΔL is inversely proportional to Y.",
        "Ratio of elongations = ΔL_a : ΔL_b = (1/Y_a) : (1/Y_b) = Y_b : Y_a.",
        "Substitute Y_a = 2×10¹¹, Y_b = 1×10¹¹: ratio = 1×10¹¹ : 2×10¹¹ = 1 : 2.",
      ],
      answer: "ΔL_a : ΔL_b = 1 : 2 — the wire with the SMALLER Young's modulus (less stiff) stretches MORE.",
    },
    {
      title: "Illustration 6 — Using Poisson's Ratio to Find Lateral Strain",
      problem:
        "A wire under tension has a longitudinal strain of 0.002. If the material's Poisson's ratio is 0.3, find the lateral strain (the fractional decrease in diameter).",
      solutionSteps: [
        "Poisson's ratio is defined as: σ = (lateral strain)/(longitudinal strain), with a minus sign by convention since the two strains have opposite signs (the wire gets thinner as it stretches).",
        "Rearranging: lateral strain = σ × longitudinal strain (magnitude only).",
        "Substitute σ = 0.3, longitudinal strain = 0.002: lateral strain = 0.3 × 0.002.",
      ],
      answer: "Lateral strain = 6 × 10⁻⁴ (the wire's diameter decreases by this fraction).",
    },
  ],
};
