export type DppQuestion = {
  number: number;
  question: string;
  options: string[];
  correctIndex: number;
  solution: string;
};

export type ChapterDpp = {
  chapterName: string;
  className: "11" | "12";
  questions: DppQuestion[];
};

export const gravitationDpp: ChapterDpp = {
  chapterName: "Gravitation",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "Two point masses of 2 kg and 8 kg are placed 4 m apart. What is the gravitational force between them? (G = 6.67 × 10⁻¹¹ N·m²/kg²)",
      options: ["6.67 × 10⁻¹¹ N", "1.67 × 10⁻¹⁰ N", "3.34 × 10⁻¹⁰ N", "6.67 × 10⁻¹⁰ N"],
      correctIndex: 0,
      solution:
        "F = Gm₁m₂/r² = (6.67×10⁻¹¹ × 2 × 8)/4² = (6.67×10⁻¹¹ × 16)/16 = 6.67×10⁻¹¹ N.",
    },
    {
      number: 2,
      question:
        "If the distance between two point masses is doubled, the gravitational force between them becomes:",
      options: ["Double", "Half", "One-fourth", "Four times"],
      correctIndex: 2,
      solution:
        "F ∝ 1/r². Doubling r makes F → F/2² = F/4, i.e., one-fourth of the original value.",
    },
    {
      number: 3,
      question:
        "The gravitational field intensity at a distance r from a point mass is 9 × 10⁻⁹ N/kg. What is the field intensity at a distance 3r from the same mass?",
      options: ["3 × 10⁻⁹ N/kg", "1 × 10⁻⁹ N/kg", "9 × 10⁻⁹ N/kg", "27 × 10⁻⁹ N/kg"],
      correctIndex: 1,
      solution:
        "I ∝ 1/r². At distance 3r, I becomes I/3² = I/9 = (9×10⁻⁹)/9 = 1×10⁻⁹ N/kg.",
    },
    {
      number: 4,
      question:
        "A solid sphere of mass M and radius R has a point at distance R/2 from its centre. What is the field intensity there, as a fraction of the field intensity at the surface?",
      options: ["1/4", "1/2", "2", "4"],
      correctIndex: 1,
      solution:
        "Inside a solid sphere, I = GMr/R³. At r = R/2: I = GM(R/2)/R³ = GM/2R². Surface value is GM/R². Ratio = (GM/2R²)/(GM/R²) = 1/2.",
    },
    {
      number: 5,
      question:
        "At what height above Earth's surface does the acceleration due to gravity reduce to one-fourth of its surface value? (R = radius of Earth)",
      options: ["R/2", "R", "2R", "3R"],
      correctIndex: 1,
      solution:
        "gₕ = GM/(R+h)² = g/4 = GM/4R². So (R+h)² = 4R², giving R+h = 2R, i.e., h = R.",
    },
    {
      number: 6,
      question:
        "At what depth below Earth's surface does the value of g reduce to 75% of its surface value?",
      options: ["R/4", "R/2", "R/3", "3R/4"],
      correctIndex: 0,
      solution:
        "g_d = g(1 − d/R) = 0.75g. So 1 − d/R = 0.75, giving d/R = 0.25, i.e., d = R/4.",
    },
    {
      number: 7,
      question:
        "If Earth suddenly stopped rotating about its own axis, the value of g would:",
      options: [
        "Increase everywhere except at the poles",
        "Decrease everywhere",
        "Remain the same everywhere",
        "Increase only at the poles",
      ],
      correctIndex: 0,
      solution:
        "g' = g − Rω²cos²λ. At the poles, λ = 90°, so cosλ = 0 and the rotation term is already zero — stopping rotation changes nothing there. Everywhere else, removing the −Rω²cos²λ term increases g.",
    },
    {
      number: 8,
      question:
        "Find the gravitational potential energy of a 5 kg mass at Earth's surface, given GM/R = 6.4 × 10⁷ J/kg.",
      options: ["−3.2 × 10⁸ J", "−6.4 × 10⁷ J", "−1.6 × 10⁸ J", "−6.4 × 10⁸ J"],
      correctIndex: 0,
      solution:
        "U = −GMm/R = −m × (GM/R) = −5 × 6.4×10⁷ = −3.2×10⁸ J.",
    },
    {
      number: 9,
      question:
        "The gravitational potential at a certain point is −16 J/kg. What is the potential energy of a 3 kg mass placed at that point?",
      options: ["−48 J", "−16 J", "16 J", "48 J"],
      correctIndex: 0,
      solution: "U = mV = 3 × (−16) = −48 J.",
    },
    {
      number: 10,
      question:
        "A 2 kg mass is raised from Earth's surface to a height equal to Earth's radius R. Taking g = 10 m/s² and R = 6400 km, find the work done against gravity.",
      options: ["6.4 × 10⁷ J", "1.28 × 10⁸ J", "3.2 × 10⁷ J", "1.28 × 10⁷ J"],
      correctIndex: 0,
      solution:
        "W = mgh/(1 + h/R), with h = R: W = mgR/(1+1) = mgR/2 = (2 × 10 × 6.4×10⁶)/2 = 6.4×10⁷ J.",
    },
    {
      number: 11,
      question:
        "If Earth's radius were halved while its mass stayed the same, the escape velocity from its surface would:",
      options: [
        "Increase by a factor of √2",
        "Decrease by a factor of √2",
        "Double",
        "Halve",
      ],
      correctIndex: 0,
      solution:
        "v_e = √(2GM/R). Halving R gives v_e' = √(2GM/(R/2)) = √(2) × √(2GM/R) = √2 × v_e.",
    },
    {
      number: 12,
      question:
        "A planet has the same mass as Earth but twice Earth's radius. In terms of Earth's escape velocity v_e, the escape velocity from this planet's surface is:",
      options: ["v_e√2", "v_e/√2", "2v_e", "v_e/2"],
      correctIndex: 1,
      solution:
        "v_e(planet) = √(2GM/(2R)) = √(GM/R) = (1/√2)√(2GM/R) = v_e/√2.",
    },
    {
      number: 13,
      question:
        "A planet orbits the Sun at twice Earth's orbital radius. Using Kepler's third law, find its time period in years.",
      options: ["2 years", "2√2 years", "4 years", "8 years"],
      correctIndex: 1,
      solution:
        "T² ∝ R³. T²(planet)/T²(Earth) = (2R/R)³ = 8, so T(planet) = √8 × 1 year = 2√2 years.",
    },
    {
      number: 14,
      question:
        "A planet's distance from the Sun at perihelion is half its distance at aphelion. What is the ratio of its speed at perihelion to its speed at aphelion?",
      options: ["1 : 2", "2 : 1", "1 : 4", "4 : 1"],
      correctIndex: 1,
      solution:
        "Conservation of angular momentum gives v_p r_p = v_a r_a. With r_p = r_a/2: v_p(r_a/2) = v_a r_a, so v_p/v_a = 2, i.e., 2:1.",
    },
    {
      number: 15,
      question:
        "Two satellites orbit Earth at radii R and 4R. What is the ratio of their orbital velocities v₁ : v₂?",
      options: ["1 : 2", "2 : 1", "1 : 4", "4 : 1"],
      correctIndex: 1,
      solution:
        "v₀ = √(GM/r), so v₀ ∝ 1/√r. v₁/v₂ = √(4R/R) = √4 = 2, i.e., 2:1.",
    },
    {
      number: 16,
      question:
        "A satellite orbits at a height equal to Earth's radius R above the surface, so its orbital radius is 2R. If T₀ is the time period for a satellite very close to Earth's surface, find this satellite's time period.",
      options: ["T₀√2", "2T₀", "2√2 T₀", "4T₀"],
      correctIndex: 2,
      solution:
        "T ∝ r^(3/2). T_new/T₀ = (2R/R)^(3/2) = 2^(3/2) = 2√2, so T_new = 2√2 T₀.",
    },
    {
      number: 17,
      question:
        "A satellite of mass m orbits Earth with kinetic energy K. What is its total mechanical energy?",
      options: ["−K", "−2K", "−K/2", "K"],
      correctIndex: 0,
      solution:
        "For a circular orbit, P.E. = −2 × K.E. So Total energy = K.E. + P.E. = K − 2K = −K.",
    },
    {
      number: 18,
      question:
        "A 500 kg satellite orbits Earth at a radius of 8000 km. Given GM = 4 × 10¹⁴ m³/s² for Earth, find the binding energy of the satellite.",
      options: ["1.25 × 10¹⁰ J", "2.5 × 10¹⁰ J", "6.25 × 10⁹ J", "2.5 × 10⁹ J"],
      correctIndex: 0,
      solution:
        "B.E. = GMm/2r = (4×10¹⁴ × 500)/(2 × 8×10⁶) = (2×10¹⁷)/(1.6×10⁷) = 1.25×10¹⁰ J.",
    },
  ],
};
