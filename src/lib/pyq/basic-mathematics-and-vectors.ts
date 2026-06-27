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
    // ---------------- JEE Main ----------------
    {
      exam: "JEE Main 2019",
      examType: "jee-main",
      question:
        "Two vectors of equal magnitude 5 units each act at an angle of 60° to one another. Find the magnitude of their resultant.",
      options: ["5 units", "5√2 units", "5√3 units", "10 units"],
      correctIndex: 2,
      solution: "For two equal vectors of magnitude A at angle θ: R = 2A cos(θ/2) = 2(5)cos30° = 10 × (√3/2) = 5√3.",
    },
    {
      exam: "JEE Main 2020",
      examType: "jee-main",
      question: "Find the angle between the vectors A = î + ĵ and B = î.",
      options: ["30°", "45°", "60°", "90°"],
      correctIndex: 1,
      solution:
        "cosθ = (A·B)/(|A||B|) = (1×1 + 1×0)/(√2 × 1) = 1/√2, so θ = 45°.",
    },
    {
      exam: "JEE Main 2021",
      examType: "jee-main",
      question:
        "Find the area of the parallelogram whose adjacent sides are given by the vectors A = 2î + 3ĵ and B = î + 4ĵ.",
      options: ["3 sq. units", "5 sq. units", "7 sq. units", "11 sq. units"],
      correctIndex: 1,
      solution:
        "Area = |A × B| = |(2)(4) − (3)(1)| = |8 − 3| = 5 sq. units.",
    },
    {
      exam: "JEE Main 2018",
      examType: "jee-main",
      question: "The position of a particle is given by x = 3t² − 2t (in metres, t in seconds). Find its velocity at t = 2 s.",
      options: ["6 m/s", "8 m/s", "10 m/s", "12 m/s"],
      correctIndex: 2,
      solution: "v = dx/dt = 6t − 2. At t = 2 s: v = 6(2) − 2 = 10 m/s.",
    },
    {
      exam: "JEE Main 2022",
      examType: "jee-main",
      question: "Find the unit vector in the direction of A = 3î + 4ĵ.",
      options: ["(3î + 4ĵ)/7", "(3î + 4ĵ)/5", "(4î + 3ĵ)/5", "3î + 4ĵ"],
      correctIndex: 1,
      solution: "|A| = √(3² + 4²) = 5. Unit vector = A/|A| = (3î + 4ĵ)/5.",
    },
    {
      exam: "JEE Main 2017",
      examType: "jee-main",
      question:
        "A particle's velocity is given by v = 4t (in m/s, t in seconds). Find the displacement of the particle between t = 0 s and t = 3 s.",
      options: ["6 m", "12 m", "18 m", "24 m"],
      correctIndex: 2,
      solution: "Displacement = ∫v dt from 0 to 3 = ∫4t dt = [2t²] from 0 to 3 = 2(9) − 0 = 18 m.",
    },
    // ---------------- JEE Advanced ----------------
    {
      exam: "JEE Advanced 2013",
      examType: "jee-advanced",
      question:
        "Two forces of 8 N and 15 N act on a particle at right angles to each other. Find the magnitude of the third force (the equilibrant) needed to keep the particle in equilibrium.",
      options: ["7 N", "17 N", "23 N", "120 N"],
      correctIndex: 1,
      solution:
        "Resultant of the two perpendicular forces: R = √(8² + 15²) = √(64 + 225) = √289 = 17 N. The equilibrant must be equal in magnitude and opposite in direction to this resultant, so its magnitude is also 17 N.",
    },
    {
      exam: "JEE Advanced 2014",
      examType: "jee-advanced",
      question:
        "Three vectors a, b, c are mutually perpendicular unit vectors. What is the value of the scalar triple product a · (b × c)?",
      options: ["0", "1", "−1", "3"],
      correctIndex: 1,
      solution:
        "For mutually perpendicular unit vectors (like î, ĵ, k̂), b × c is a unit vector along a, so a · (b × c) = 1 × 1 × cos0° = 1. This is also the volume of the unit cube they form.",
    },
    {
      exam: "JEE Advanced 2016",
      examType: "jee-advanced",
      question:
        "Find the projection (component) of vector A = 6î + 8ĵ along the direction of vector B = 3î + 4ĵ.",
      options: ["5 units", "8 units", "10 units", "14 units"],
      correctIndex: 2,
      solution:
        "Projection of A along B = (A·B)/|B| = (6×3 + 8×4)/√(3²+4²) = (18+32)/5 = 50/5 = 10 units.",
    },
    {
      exam: "JEE Advanced 2011",
      examType: "jee-advanced",
      question: "If y = x² sin x, find the value of dy/dx at x = π/2.",
      options: ["0", "π/2", "π", "2π"],
      correctIndex: 2,
      solution:
        "Using the product rule: dy/dx = x²cos x + 2x sin x. At x = π/2: cos(π/2) = 0 and sin(π/2) = 1, so dy/dx = 0 + 2(π/2)(1) = π.",
    },
    {
      exam: "JEE Advanced 2015",
      examType: "jee-advanced",
      question:
        "A particle starts from rest with acceleration a = 6t (in m/s², t in seconds). Find its displacement during the first 2 seconds.",
      options: ["4 m", "6 m", "8 m", "12 m"],
      correctIndex: 2,
      solution:
        "Integrating once: v = ∫6t dt = 3t² (since v(0)=0). Integrating again: s = ∫3t² dt = t³ (since s(0)=0). At t = 2 s: s = 2³ = 8 m.",
    },
  ],
};
