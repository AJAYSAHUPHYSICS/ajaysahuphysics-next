import type { ChapterPyq } from "./kinematics";

export const basicMathematicsAndVectorsPyq: ChapterPyq = {
  chapterName: "Basic Mathematics & Vectors",
  className: "11",
  questions: [
    {
      exam: "AIPMT 2006",
      question:
        "Two vectors A and B are such that the magnitude of their sum equals the magnitude of their difference. What is the angle between A and B?",
      options: ["90°", "60°", "75°", "45°"],
      correctIndex: 0,
      solution:
        "|A+B|² = A²+B²+2AB cosθ and |A−B|² = A²+B²−2AB cosθ. Setting these equal gives 4AB cosθ = 0, so cosθ = 0 and θ = 90°.",
    },
    {
      exam: "AIPMT 2007",
      question:
        "Two vectors A and B satisfy |A × B| = √3 (A·B). What is the magnitude of A + B?",
      options: [
        "√(A² + B² + AB)",
        "A + B",
        "√(A² + B² + 3AB)",
        "√(A² + B² + AB/√3)",
      ],
      correctIndex: 0,
      solution:
        "|A×B| = AB sinθ and A·B = AB cosθ. From AB sinθ = √3 AB cosθ, tanθ = √3, so θ = 60°. Then |A+B| = √(A²+B²+2AB cos60°) = √(A²+B²+AB).",
    },
    {
      exam: "AIIMS 2009",
      question:
        "A force F = −3î + ĵ + 5k̂ acts at a point with position vector r = 7î + 3ĵ + k̂ (measured from the axis of rotation). Find the torque τ = r × F.",
      options: [
        "14î − 38ĵ + 16k̂",
        "4î + 4ĵ + 6k̂",
        "−14î − 38ĵ − 16k̂",
        "−21î − 3ĵ − 5k̂",
      ],
      correctIndex: 0,
      solution:
        "τ = r × F = ((3)(5) − (1)(1))î − ((7)(5) − (1)(−3))ĵ + ((7)(1) − (3)(−3))k̂ = (15−1)î − (35+3)ĵ + (7+9)k̂ = 14î − 38ĵ + 16k̂.",
    },
    {
      exam: "AIPMT 2010 (adapted)",
      question:
        "Five vectors of equal magnitude are arranged tail-to-head, with directions evenly spaced 72° apart, forming a closed pentagon. What is their resultant?",
      options: ["Zero", "Equal to one of the vectors", "Twice one vector", "Cannot be determined"],
      correctIndex: 0,
      solution:
        "When n coplanar vectors of equal magnitude are spaced at equal angular intervals of 360°/n, their vector sum is always zero. Here n = 5 vectors spaced 72° apart close into a pentagon, so head meets tail and the resultant vanishes.",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "Vectors A = cos(ωt) î + sin(ωt) ĵ and B = cos(ωt/2) î + sin(ωt/2) ĵ vary with time t. At what value of t are A and B first orthogonal to each other (for t > 0)?",
      options: ["t = 0", "t = π/(4ω)", "t = π/(2ω)", "t = π/ω"],
      correctIndex: 3,
      solution:
        "A·B = cos(ωt)cos(ωt/2) + sin(ωt)sin(ωt/2) = cos(ωt − ωt/2) = cos(ωt/2). For orthogonality, A·B = 0, so cos(ωt/2) = 0, giving ωt/2 = π/2, i.e. t = π/ω.",
    },
    {
      exam: "NEET-I 2016",
      question:
        "If the magnitude of the sum of two vectors equals the magnitude of their difference, what is the angle between the vectors?",
      options: ["0°", "90°", "45°", "180°"],
      correctIndex: 1,
      solution:
        "Exactly as in the AIPMT 2006 case above: |A+B| = |A−B| forces 4AB cosθ = 0, so θ = 90°.",
    },
  ],
};
