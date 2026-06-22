import type { ChapterDpp } from "./kinematics";

export const basicMathematicsAndVectorsDpp: ChapterDpp = {
  chapterName: "Basic Mathematics & Vectors",
  className: "11",
  questions: [
    {
      number: 1,
      question: "A wheel sweeps through an angle of 3π/4 rad. What is this angle in degrees?",
      options: ["100°", "120°", "135°", "150°"],
      correctIndex: 2,
      solution:
        "θ(degree) = θ(rad) × 180/π = (3π/4) × (180/π) = 3 × 45° = 135°.",
    },
    {
      number: 2,
      question: "If sinθ = 3/5 and θ lies in the first quadrant, what is cosθ?",
      options: ["4/5", "3/4", "5/4", "5/3"],
      correctIndex: 0,
      solution:
        "Using sin²θ + cos²θ = 1: cosθ = √(1 − 9/25) = √(16/25) = 4/5 (positive, since θ is in Q1).",
    },
    {
      number: 3,
      question: "What is the value of cos120°?",
      options: ["1/2", "−1/2", "√3/2", "−√3/2"],
      correctIndex: 1,
      solution:
        "cos120° = cos(180° − 60°) = −cos60° = −1/2.",
    },
    {
      number: 4,
      question: "If y = 4x³ − 2x² + 7, find dy/dx at x = 2.",
      options: ["36", "40", "44", "48"],
      correctIndex: 1,
      solution:
        "dy/dx = 12x² − 4x. At x = 2: 12(4) − 4(2) = 48 − 8 = 40.",
    },
    {
      number: 5,
      question: "If y = x² sinx, find dy/dx.",
      options: [
        "2x sinx + x² cosx",
        "x² sinx + 2x cosx",
        "2x cosx − x² sinx",
        "x² cosx",
      ],
      correctIndex: 0,
      solution:
        "By the product rule: dy/dx = (d/dx)(x²)·sinx + x²·(d/dx)(sinx) = 2x sinx + x² cosx.",
    },
    {
      number: 6,
      question: "Find the value of x at which y = x² − 8x + 5 attains its minimum value.",
      options: ["2", "4", "6", "8"],
      correctIndex: 1,
      solution:
        "dy/dx = 2x − 8 = 0 ⟹ x = 4. Since d²y/dx² = 2 > 0, this is a minimum.",
    },
    {
      number: 7,
      question: "Evaluate ∫(3x² + 2x) dx.",
      options: ["x³ + x² + c", "3x³ + 2x² + c", "x³/3 + x² + c", "x² + x + c"],
      correctIndex: 0,
      solution:
        "∫3x² dx = x³, ∫2x dx = x². So the integral is x³ + x² + c.",
    },
    {
      number: 8,
      question: "A particle's velocity is v = 4t (in m/s, t in seconds). What distance does it cover between t = 0 and t = 3 s?",
      options: ["12 m", "16 m", "18 m", "24 m"],
      correctIndex: 2,
      solution:
        "Distance = ∫₀³ 4t dt = [2t²]₀³ = 2(9) − 0 = 18 m.",
    },
    {
      number: 9,
      question: "Find the positive root of x² − 5x − 14 = 0.",
      options: ["2", "5", "7", "14"],
      correctIndex: 2,
      solution:
        "x = [5 ± √(25 + 56)]/2 = [5 ± 9]/2, giving x = 7 or x = −2. The positive root is 7.",
    },
    {
      number: 10,
      question: "Using the binomial approximation, estimate the value of √0.98.",
      options: ["0.96", "0.98", "0.99", "1.02"],
      correctIndex: 2,
      solution:
        "√0.98 = (1 − 0.02)^(1/2) ≈ 1 + (1/2)(−0.02) = 1 − 0.01 = 0.99.",
    },
    {
      number: 11,
      question: "Find the sum of the first 20 terms of the AP 2, 5, 8, 11, ...",
      options: ["580", "600", "610", "620"],
      correctIndex: 2,
      solution:
        "a = 2, d = 3, n = 20. Sₙ = (n/2)[2a + (n−1)d] = 10[4 + 19(3)] = 10(61) = 610.",
    },
    {
      number: 12,
      question: "Find the sum to infinity of the geometric series 8 + 4 + 2 + 1 + ...",
      options: ["8", "12", "16", "32"],
      correctIndex: 2,
      solution:
        "a = 8, r = 1/2. S∞ = a/(1−r) = 8/0.5 = 16.",
    },
    {
      number: 13,
      question: "Two forces of magnitude 6 N and 8 N act on a body at 90° to each other. Find the magnitude of the resultant.",
      options: ["10 N", "14 N", "2 N", "48 N"],
      correctIndex: 0,
      solution:
        "R = √(A² + B² + 2AB cos90°) = √(36 + 64 + 0) = √100 = 10 N.",
    },
    {
      number: 14,
      question: "Two vectors of equal magnitude 10 units each are inclined at 120° to each other. Find the magnitude of their resultant.",
      options: ["0", "10 units", "17.3 units", "20 units"],
      correctIndex: 1,
      solution:
        "For equal vectors, R = 2a cos(θ/2) = 2(10)cos60° = 20 × 0.5 = 10 units.",
    },
    {
      number: 15,
      question: "A force of 20 N acts at 30° above the horizontal. Find its horizontal component.",
      options: ["10 N", "10√3 N", "20 N", "20√3 N"],
      correctIndex: 1,
      solution:
        "Horizontal component = 20 cos30° = 20 × (√3/2) = 10√3 N ≈ 17.3 N.",
    },
    {
      number: 16,
      question:
        "A vector has direction cosines cosα = 1/2 and cosβ = 1/2 with the x- and y-axes. What is cosγ with the z-axis?",
      options: ["1/2", "1/√2", "1", "0"],
      correctIndex: 1,
      solution:
        "cos²α + cos²β + cos²γ = 1 ⟹ 1/4 + 1/4 + cos²γ = 1 ⟹ cos²γ = 1/2 ⟹ cosγ = 1/√2.",
    },
    {
      number: 17,
      question: "Find A·B if A = 3î + 4ĵ and B = 4î − 3ĵ.",
      options: ["0", "7", "12", "25"],
      correctIndex: 0,
      solution:
        "A·B = (3)(4) + (4)(−3) = 12 − 12 = 0 (the two vectors are perpendicular).",
    },
    {
      number: 18,
      question: "Find the magnitude of A × B if A = 2î and B = 3ĵ.",
      options: ["0", "5", "6", "9"],
      correctIndex: 2,
      solution:
        "A × B = (2)(3)(î × ĵ) = 6k̂, since î × ĵ = k̂. Magnitude = 6.",
    },
  ],
};
