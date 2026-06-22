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

export const mechanicalPropertiesOfSolidsDpp: ChapterDpp = {
  chapterName: "Mechanical Properties of Solids",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A wire of length 2 m and cross-sectional area 1 × 10⁻⁶ m² is stretched by a force of 100 N. If the Young's modulus of the material is 2 × 10¹¹ N/m², find the elongation produced.",
      options: ["0.5 mm", "1 mm", "2 mm", "5 mm"],
      correctIndex: 1,
      solution:
        "ΔL = FL/(AY) = (100 × 2)/(1×10⁻⁶ × 2×10¹¹) = 200/(2×10⁵) = 1×10⁻³ m = 1 mm.",
    },
    {
      number: 2,
      question:
        "Two wires of the same material have lengths in the ratio 2 : 1 and radii in the ratio 1 : 2. If both are stretched by the same force, find the ratio of their elongations.",
      options: ["1 : 8", "2 : 1", "4 : 1", "8 : 1"],
      correctIndex: 3,
      solution:
        "For the same force, material, ΔL ∝ L/r². ΔL₁/ΔL₂ = (L₁/L₂) × (r₂/r₁)² = 2 × 2² = 8. So the ratio is 8 : 1.",
    },
    {
      number: 3,
      question: "The breaking stress of a given wire does NOT depend upon:",
      options: ["Nature of the material", "Temperature", "Cross-sectional area of the wire", "Impurities present"],
      correctIndex: 2,
      solution:
        "Breaking stress is a fixed property of the material, set by its nature, temperature, and impurity content. It is independent of the wire's cross-sectional area or the magnitude of the applied force — only the maximum LOAD the wire can bear depends on area.",
    },
    {
      number: 4,
      question:
        "A steel wire has a breaking stress of 8 × 10⁸ N/m² and density 8 × 10³ kg/m³. Find the maximum length of this wire that can hang vertically without breaking under its own weight. (g = 10 m/s²)",
      options: ["5 km", "8 km", "10 km", "16 km"],
      correctIndex: 2,
      solution:
        "Maximum length l = (breaking stress)/(ρg) = (8×10⁸)/(8×10³ × 10) = (8×10⁸)/(8×10⁴) = 1×10⁴ m = 10 km.",
    },
    {
      number: 5,
      question:
        "A rubber cord of natural length 0.5 m and cross-sectional area 2 × 10⁻⁶ m² (Young's modulus 5 × 10⁸ N/m²) is stretched by 1 cm. Find the elastic potential energy stored in it.",
      options: ["0.05 J", "0.1 J", "0.2 J", "0.5 J"],
      correctIndex: 1,
      solution:
        "W = ½YAx²/L₀ = ½ × (5×10⁸) × (2×10⁻⁶) × (0.01)²/0.5 = ½ × 1000 × 10⁻⁴/0.5 = ½ × 0.2 = 0.1 J.",
    },
    {
      number: 6,
      question:
        "When the pressure on a given mass of liquid is increased by 2 × 10⁶ Pa, its volume decreases by 0.05%. Calculate the bulk modulus of the liquid.",
      options: ["1 × 10⁹ Pa", "2 × 10⁹ Pa", "4 × 10⁹ Pa", "8 × 10⁹ Pa"],
      correctIndex: 2,
      solution:
        "K = ΔP/(ΔV/V) = (2×10⁶)/(0.0005) = 4×10⁹ Pa.",
    },
    {
      number: 7,
      question: "The compressibility of a liquid is 5 × 10⁻¹⁰ Pa⁻¹. What is its bulk modulus?",
      options: ["5 × 10⁻¹⁰ Pa", "2 × 10⁹ Pa", "5 × 10⁹ Pa", "2 × 10⁻⁹ Pa"],
      correctIndex: 1,
      solution: "Bulk modulus K = 1/C = 1/(5×10⁻¹⁰) = 2×10⁹ Pa.",
    },
    {
      number: 8,
      question:
        "A cube of side 20 cm has its bottom face fixed. A tangential force of 4000 N is applied to its top face, producing a shearing strain of 0.01. Find the modulus of rigidity of the material.",
      options: ["1 × 10⁶ N/m²", "1 × 10⁷ N/m²", "1 × 10⁸ N/m²", "1 × 10⁹ N/m²"],
      correctIndex: 1,
      solution:
        "η = F/(Aφ). Here A = (0.2)² = 0.04 m². η = 4000/(0.04 × 0.01) = 4000/(4×10⁻⁴) = 1×10⁷ N/m².",
    },
    {
      number: 9,
      question:
        "A wire is stretched so that its longitudinal strain is 1 × 10⁻³ while its lateral strain (decrease in diameter ÷ original diameter) is 3 × 10⁻⁴. Find the Poisson's ratio of the material.",
      options: ["0.1", "0.2", "0.3", "0.4"],
      correctIndex: 2,
      solution: "σ = (lateral strain)/(longitudinal strain) = (3×10⁻⁴)/(1×10⁻³) = 0.3.",
    },
    {
      number: 10,
      question:
        "The Young's modulus of a material is 2 × 10¹¹ N/m² and its Poisson's ratio is 0.25. Find its modulus of rigidity.",
      options: ["4 × 10¹⁰ N/m²", "8 × 10¹⁰ N/m²", "1.6 × 10¹¹ N/m²", "2.5 × 10¹¹ N/m²"],
      correctIndex: 1,
      solution:
        "Y = 2η(1+σ) ⇒ η = Y/[2(1+σ)] = (2×10¹¹)/[2×1.25] = (2×10¹¹)/2.5 = 8×10¹⁰ N/m².",
    },
    {
      number: 11,
      question:
        "The Young's modulus of a material is 3 × 10¹¹ N/m² and its Poisson's ratio is 1/3. Find its bulk modulus.",
      options: ["1 × 10¹¹ N/m²", "2 × 10¹¹ N/m²", "3 × 10¹¹ N/m²", "9 × 10¹¹ N/m²"],
      correctIndex: 2,
      solution:
        "Y = 3K(1−2σ) ⇒ K = Y/[3(1−2σ)]. With σ = 1/3: 1−2σ = 1/3, so 3(1−2σ) = 1. Therefore K = Y/1 = 3×10¹¹ N/m².",
    },
    {
      number: 12,
      question:
        "On a stress–strain graph for a ductile material, the region beyond the elastic limit (where the material no longer returns to its original dimensions on unloading) but before fracture is called the:",
      options: ["Proportional limit", "Plastic region", "Elastic region", "Breaking point"],
      correctIndex: 1,
      solution:
        "Beyond the elastic limit, the body acquires a permanent set on unloading — this region of irrecoverable deformation, lasting until fracture, is the plastic region.",
    },
    {
      number: 13,
      question:
        "Two wires A and B of the same length and same cross-sectional area, but different materials, are loaded identically. On their load–extension graphs, the line for wire A has a steeper slope than that for wire B. Which is correct?",
      options: ["Y_A < Y_B", "Y_A > Y_B", "Y_A = Y_B", "Cannot be determined"],
      correctIndex: 1,
      solution:
        "Since Y = FL/(AΔL), the slope of the load–extension graph (F/ΔL) equals YA/L. With A and L identical for both wires, a steeper slope directly means a larger Y. So Y_A > Y_B.",
    },
    {
      number: 14,
      question: "As the temperature of a metal wire is increased, its Young's modulus generally:",
      options: ["Increases", "Decreases", "Remains exactly unchanged", "First increases, then decreases"],
      correctIndex: 1,
      solution:
        "Rising temperature weakens intermolecular forces, making the material more plastic and reducing its Young's modulus — true for most materials except special alloys like Invar steel.",
    },
    {
      number: 15,
      question:
        "The Young's modulus of a metal is 1 × 10¹¹ N/m² and the interatomic spacing in it is 3 × 10⁻¹⁰ m. Find the interatomic force constant.",
      options: ["3 N/m", "30 N/m", "300 N/m", "0.3 N/m"],
      correctIndex: 1,
      solution: "k = Y × r₀ = (1×10¹¹) × (3×10⁻¹⁰) = 30 N/m.",
    },
    {
      number: 16,
      question:
        "A crane is to lift a maximum load of 5000 kg using a steel cable. If the yield strength of the steel is 2.5 × 10⁸ N/m², find the minimum cross-sectional area needed for the cable. (g = 10 m/s²)",
      options: ["1 × 10⁻⁴ m²", "2 × 10⁻⁴ m²", "4 × 10⁻⁴ m²", "5 × 10⁻⁴ m²"],
      correctIndex: 1,
      solution:
        "A ≥ mg/S_y = (5000 × 10)/(2.5×10⁸) = 50000/(2.5×10⁸) = 2×10⁻⁴ m².",
    },
    {
      number: 17,
      question:
        "A wire is stretched such that the stress developed is 2 × 10⁸ N/m², and the Young's modulus of the material is 2 × 10¹¹ N/m². Find the elastic energy stored per unit volume of the wire.",
      options: ["5 × 10⁴ J/m³", "1 × 10⁵ J/m³", "2 × 10⁵ J/m³", "4 × 10⁵ J/m³"],
      correctIndex: 1,
      solution:
        "Strain = stress/Y = (2×10⁸)/(2×10¹¹) = 1×10⁻³. Energy density = ½ × stress × strain = ½ × (2×10⁸) × (1×10⁻³) = 1×10⁵ J/m³.",
    },
    {
      number: 18,
      question:
        "A cylindrical rod of length 50 cm and radius 1 cm, fixed at one end, is twisted through an angle of 0.6 rad at the free end. Find the angle of shear produced at the surface of the rod.",
      options: ["0.006 rad", "0.012 rad", "0.024 rad", "0.06 rad"],
      correctIndex: 1,
      solution:
        "Using rθ = lφ: φ = rθ/l = (0.01 × 0.6)/0.5 = 0.006/0.5 = 0.012 rad.",
    },
  ],
};
