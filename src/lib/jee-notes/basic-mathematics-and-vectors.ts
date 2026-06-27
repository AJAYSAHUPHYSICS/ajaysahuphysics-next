import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const basicMathematicsAndVectorsJeeNotes: ChapterJeeNotes = {
  chapterName: "Basic Mathematics & Vectors",
  className: "11",
  intro:
    "Fully worked, multi-step problems combining vector algebra and basic calculus — the toolkit-building exercises that JEE Main and JEE Advanced lean on throughout mechanics, beyond the single-step formula questions in the regular DPP.",
  examples: [
    {
      title: "Illustration 1 — Lami's Theorem, Classic 3-4-5 Forces",
      problem:
        "Three forces of magnitude 3 N, 4 N, and 5 N keep a particle in equilibrium. Find the angle between the 3 N and 4 N forces.",
      solutionSteps: [
        "Since 3² + 4² = 5², these three magnitudes form a right triangle when drawn head-to-tail as a closed force triangle (the condition for equilibrium of three concurrent forces).",
        "By Lami's theorem, the angle between any two of the forces equals 180° minus the interior angle of the force triangle opposite the third force.",
        "The right angle in the 3-4-5 triangle sits opposite the 5 N side, so the interior angle there is 90°.",
        "The angle BETWEEN the 3 N and 4 N force vectors (as drawn from the particle) is therefore 180° − 90°.",
      ],
      answer: "90° — the 3 N and 4 N forces act perpendicular to each other.",
    },
    {
      title: "Illustration 2 — Finding an Unknown Vector from an Equilibrium Condition",
      problem:
        "Three vectors A = 3î + 4ĵ, B = −2î + ĵ, and C satisfy A + B + C = 0. Find C.",
      solutionSteps: [
        "Rearranging: C = −(A + B).",
        "First add A + B = (3 + (−2))î + (4 + 1)ĵ = 1î + 5ĵ.",
        "Now negate: C = −(1î + 5ĵ) = −1î − 5ĵ.",
      ],
      answer: "C = −î − 5ĵ.",
    },
    {
      title: "Illustration 3 — Product Rule with a Logarithmic Function",
      problem: "Find dy/dx for y = x³ ln(x), and evaluate it at x = 1.",
      solutionSteps: [
        "Apply the product rule: d/dx(x³ · ln x) = (d/dx x³)(ln x) + (x³)(d/dx ln x).",
        "d/dx(x³) = 3x², and d/dx(ln x) = 1/x.",
        "So dy/dx = 3x² ln x + x³ × (1/x) = 3x² ln x + x².",
        "At x = 1: ln(1) = 0, so dy/dx = 3(1)(0) + 1 = 0 + 1.",
      ],
      answer: "dy/dx = 3x²lnx + x²; at x = 1, dy/dx = 1.",
    },
    {
      title: "Illustration 4 — Definite Integral for Total Change",
      problem: "A quantity changes at the rate dQ/dx = 3x² + 2x. Find the total change in Q as x goes from 0 to 2.",
      solutionSteps: [
        "Total change = ∫(3x² + 2x) dx from 0 to 2.",
        "Find the antiderivative: ∫3x² dx = x³, and ∫2x dx = x², so the antiderivative is x³ + x².",
        "Evaluate at the limits: [x³ + x²] from 0 to 2 = (2³ + 2²) − (0 + 0) = (8 + 4) − 0.",
      ],
      answer: "12 (units of Q).",
    },
    {
      title: "Illustration 5 — Dot and Cross Product Together",
      problem:
        "For vectors A = 4î and B = 2î + 2ĵ, find (a) the angle between them using the dot product, and (b) the area of the parallelogram they form using the cross product.",
      solutionSteps: [
        "Dot product: A·B = (4)(2) + (0)(2) = 8.",
        "Magnitudes: |A| = 4, |B| = √(2²+2²) = 2√2.",
        "cosθ = (A·B)/(|A||B|) = 8/(4 × 2√2) = 8/(8√2) = 1/√2, so θ = 45°.",
        "Cross product (z-component, since both lie in the xy-plane): A×B = (4)(2) − (0)(2) = 8, which directly equals the parallelogram's area.",
      ],
      answer: "θ = 45°; Area = 8 square units.",
    },
    {
      title: "Illustration 6 — Unit Vector Perpendicular to Two Given Vectors",
      problem: "Find a unit vector perpendicular to both A = î + ĵ and B = ĵ + k̂.",
      solutionSteps: [
        "The cross product A × B gives a vector perpendicular to both A and B.",
        "A × B = |î  ĵ  k̂; 1  1  0; 0  1  1| = î(1×1 − 0×1) − ĵ(1×1 − 0×0) + k̂(1×1 − 1×0) = î − ĵ + k̂.",
        "Find its magnitude: |A×B| = √(1² + (−1)² + 1²) = √3.",
        "Divide by the magnitude to get the unit vector: (î − ĵ + k̂)/√3.",
      ],
      answer: "(î − ĵ + k̂)/√3.",
    },
  ],
};
