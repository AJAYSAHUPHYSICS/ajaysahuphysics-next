export type PyqQuestion = {
  exam: string;
  examType?: "jee-main" | "jee-advanced";
  question: string;
  options: string[];
  correctIndex: number;
  solution: string;
};

export type ChapterPyq = {
  chapterName: string;
  className: "11" | "12";
  questions: PyqQuestion[];
};

export const mechanicalPropertiesOfSolidsPyq: ChapterPyq = {
  chapterName: "Mechanical Properties of Solids",
  className: "11",
  questions: [
    {
      exam: "NEET UG 2013",
      question:
        "Four wires, all made of the same material, have the dimensions listed below. Under the same applied tension, which wire stretches the most?\n(1) Length 300 cm, diameter 3 mm\n(2) Length 50 cm, diameter 0.5 mm\n(3) Length 100 cm, diameter 1 mm\n(4) Length 200 cm, diameter 2 mm",
      options: [
        "Wire (1): length 300 cm, diameter 3 mm",
        "Wire (2): length 50 cm, diameter 0.5 mm",
        "Wire (3): length 100 cm, diameter 1 mm",
        "Wire (4): length 200 cm, diameter 2 mm",
      ],
      correctIndex: 1,
      solution:
        "For the same material and the same applied force, ΔL ∝ L/d². Comparing L/d² for each wire (in cm/mm²): (1) 300/9 = 33.3, (2) 50/0.25 = 200, (3) 100/1 = 100, (4) 200/4 = 50. Wire (2) has by far the largest value, so it stretches the most.",
    },
    {
      exam: "AIPMT 2014",
      question:
        "A fixed volume of copper is drawn out into a wire of length l. A constant force F is then applied to this wire, producing an extension Δl. Which of the following plots, made for wires of different lengths drawn from the same fixed volume, would be a straight line?",
      options: ["Δl versus 1/l", "Δl versus l²", "Δl versus 1/l²", "Δl versus l"],
      correctIndex: 1,
      solution:
        "Since the volume V = Al is fixed, the cross-section A = V/l. Then ΔL = Fl/(AY) = Fl/[(V/l)Y] = Fl²/(VY). So ΔL is directly proportional to l², meaning a plot of Δl against l² is a straight line through the origin.",
    },
    {
      exam: "AIPMT 2015",
      question:
        "The average depth of an ocean is about 2700 m. Taking the compressibility of water to be 45.4 × 10⁻¹¹ Pa⁻¹ and its density as 10³ kg/m³, estimate the fractional compression (ΔV/V) of water at the bottom of the ocean. (Take g = 10 m/s².)",
      options: ["1.0 × 10⁻²", "1.2 × 10⁻²", "1.4 × 10⁻²", "0.8 × 10⁻²"],
      correctIndex: 1,
      solution:
        "Pressure at the bottom: ΔP = ρgh = 10³ × 10 × 2700 = 2.7×10⁷ Pa. Fractional compression ΔV/V = C × ΔP = (45.4×10⁻¹¹) × (2.7×10⁷) ≈ 1.226×10⁻² ≈ 1.2×10⁻².",
    },
    {
      exam: "AIPMT (Re-Exam) 2015",
      question:
        "The Young's modulus of steel is twice that of brass. Two wires — one steel, one brass — of the same length and the same cross-sectional area are suspended side by side from the same rigid support, each loaded with its own weight. For the lower ends of both wires to settle at the same level, in what ratio must the weights on the steel and brass wires be?",
      options: ["1 : 1", "1 : 2", "2 : 1", "4 : 1"],
      correctIndex: 2,
      solution:
        "ΔL = WL/(AY). With L and A identical for both wires, equal elongation requires W_steel/Y_steel = W_brass/Y_brass, so W_steel/W_brass = Y_steel/Y_brass = 2. The weights must be in the ratio 2 : 1.",
    },
    {
      exam: "AIIMS 2016",
      question:
        "An object is lowered to a depth of 1.0 km in the sea, where the density of sea water is 1.025 × 10³ kg/m³ and the bulk modulus of the object's material is 1.6 × 10⁶ kPa. Find the percentage change in the density of the object at that depth. (Take g = 10 m/s².)",
      options: ["0.36%", "0.64%", "0.40%", "0.60%"],
      correctIndex: 1,
      solution:
        "Pressure at depth: ΔP = ρ_sea × g × h = (1.025×10³) × 10 × 1000 = 1.025×10⁷ Pa. Fractional volume change ΔV/V = ΔP/K = (1.025×10⁷)/(1.6×10⁹) ≈ 6.41×10⁻³. Since mass stays fixed, the fractional density change has the same magnitude (density rises as volume falls): ≈ 0.64%.",
    },
    {
      exam: "NEET UG 2017",
      question:
        "A spherical object made of a material with bulk modulus B is subjected to a uniform external pressure p. What is the resulting fractional decrease in its radius?",
      options: ["B/3p", "3p/B", "p/3B", "p/B"],
      correctIndex: 2,
      solution:
        "ΔV/V = p/B. For a sphere, V ∝ r³, so a small change gives ΔV/V = 3(Δr/r). Therefore Δr/r = (ΔV/V)/3 = p/(3B).",
    },
    {
      exam: "NEET UG 2018",
      question:
        "Two wires of the same material and equal volume are being stretched. The first has cross-sectional area A and stretches by Δl when a force F is applied to it. The second wire has cross-sectional area 3A. What force must be applied to the second wire to produce the same elongation Δl?",
      options: ["9F", "6F", "4F", "F"],
      correctIndex: 0,
      solution:
        "Equal volume means A·l₁ = 3A·l₂, so l₁ = 3l₂. For the first wire, Δl = Fl₁/(AY). For the second, the same Δl requires Δl = F₂l₂/(3AY) = F₂(l₁/3)/(3AY) = F₂l₁/(9AY). Equating the two expressions for Δl gives F/(AY) × l₁ = F₂l₁/(9AY), so F₂ = 9F.",
    },
    // ---------------- JEE Main ----------------
    {
      exam: "JEE Main 2019",
      examType: "jee-main",
      question: "A wire of length 2.5 m and area 2.5×10⁻⁶ m² stretches by 1.25 mm under a 500 N load. Find Young's modulus.",
      options: ["2×10¹¹ Pa", "3×10¹¹ Pa", "4×10¹¹ Pa", "5×10¹¹ Pa"],
      correctIndex: 2,
      solution: "Y = FL/(A·ΔL) = (500×2.5)/[(2.5×10⁻⁶)(1.25×10⁻³)] = 1250/(3.125×10⁻⁹) = 4×10¹¹ Pa.",
    },
    {
      exam: "JEE Main 2020",
      examType: "jee-main",
      question:
        "A 1 kg uniform wire of length 2 m, area 0.5×10⁻⁶ m², Young's modulus 2×10¹¹ Pa, hangs vertically. Find its elongation due to its own weight. (g = 10 m/s²)",
      options: ["0.05 mm", "0.1 mm", "0.15 mm", "0.2 mm"],
      correctIndex: 1,
      solution: "ΔL = MgL/(2AY) = (1×10×2)/(2×0.5×10⁻⁶×2×10¹¹) = 20/(2×10⁵) = 1×10⁻⁴ m = 0.1 mm.",
    },
    {
      exam: "JEE Main 2017",
      examType: "jee-main",
      question: "A material is stressed to 6×10⁸ Pa with Young's modulus 1.8×10¹¹ Pa. Find the elastic energy stored per unit volume.",
      options: ["5×10⁵ J/m³", "1×10⁶ J/m³", "1.5×10⁶ J/m³", "2×10⁶ J/m³"],
      correctIndex: 1,
      solution: "Energy density = stress²/(2Y) = (6×10⁸)²/(2×1.8×10¹¹) = 3.6×10¹⁷/(3.6×10¹¹) = 1×10⁶ J/m³.",
    },
    {
      exam: "JEE Main 2021",
      examType: "jee-main",
      question: "A material has bulk modulus 4×10⁹ Pa. Find its compressibility.",
      options: ["1.5×10⁻¹⁰ Pa⁻¹", "2×10⁻¹⁰ Pa⁻¹", "2.5×10⁻¹⁰ Pa⁻¹", "3×10⁻¹⁰ Pa⁻¹"],
      correctIndex: 2,
      solution: "Compressibility = 1/K = 1/(4×10⁹) = 2.5×10⁻¹⁰ Pa⁻¹.",
    },
    {
      exam: "JEE Main 2018",
      examType: "jee-main",
      question: "Which of the following correctly orders the three elastic moduli for most solids, from largest to smallest, under typical conditions?",
      options: [
        "Young's modulus > Bulk modulus > Modulus of rigidity",
        "Bulk modulus > Young's modulus > Modulus of rigidity",
        "Modulus of rigidity > Young's modulus > Bulk modulus",
        "All three are always exactly equal",
      ],
      correctIndex: 1,
      solution:
        "For most engineering solids, the bulk modulus (resistance to uniform volume change) tends to be the largest, followed by Young's modulus, with the modulus of rigidity (shear modulus) typically the smallest of the three.",
    },
    {
      exam: "JEE Main 2022",
      examType: "jee-main",
      question: "Within the elastic limit, the stress-strain graph for a material is a straight line. What does the slope of this line represent?",
      options: ["Elastic limit", "Yield point", "Young's modulus", "Breaking stress"],
      correctIndex: 2,
      solution: "Within the elastic (linear) region, stress = Y × strain (Hooke's law), so the slope of the stress-strain graph is exactly Young's modulus.",
    },
    // ---------------- JEE Advanced ----------------
    {
      exam: "JEE Advanced 2013",
      examType: "jee-advanced",
      question:
        "Two wires of equal length 1 m and equal area 1×10⁻⁶ m², with Young's moduli 2×10¹¹ Pa and 1×10¹¹ Pa, are joined end to end and stretched by a force of 100 N. Find the total elongation.",
      options: ["1.0 mm", "1.5 mm", "2.0 mm", "2.5 mm"],
      correctIndex: 1,
      solution:
        "Each wire stretches independently under the same force F = 100 N (connected in series): ΔL₁ = FL/(AY₁) = 100/[(1×10⁻⁶)(2×10¹¹)] = 0.5×10⁻³ m. ΔL₂ = 100/[(1×10⁻⁶)(1×10¹¹)] = 1×10⁻³ m. Total = 0.5+1 = 1.5 mm.",
    },
    {
      exam: "JEE Advanced 2014",
      examType: "jee-advanced",
      question:
        "Two wires of Young's moduli 2×10¹¹ Pa (area 2×10⁻⁶ m²) and 1×10¹¹ Pa (area 3×10⁻⁶ m²) are fixed in parallel between two rigid supports, so both stretch by exactly the same amount. Find the ratio of tension in the first wire to the second.",
      options: ["1 : 1", "4 : 3", "3 : 4", "2 : 3"],
      correctIndex: 1,
      solution:
        "Since both wires have the same elongation and length, F = YA(ΔL)/L for each, so F₁/F₂ = (Y₁A₁)/(Y₂A₂) = (2×10¹¹×2×10⁻⁶)/(1×10¹¹×3×10⁻⁶) = 4×10⁵/3×10⁵ = 4/3.",
    },
    {
      exam: "JEE Advanced 2015",
      examType: "jee-advanced",
      question:
        "A steel wire (breaking stress 4×10⁸ Pa) has a circular cross-section of diameter 2 mm. Find the maximum load it can support without breaking.",
      options: ["800π N", "400π N", "200π N", "1600π N"],
      correctIndex: 1,
      solution:
        "Area = π(d/2)² = π(1×10⁻³)² = π×10⁻⁶ m². F_max = (breaking stress)(Area) = (4×10⁸)(π×10⁻⁶) = 4×10²×π = 400π N ≈ 1257 N.",
    },
    {
      exam: "JEE Advanced 2016",
      examType: "jee-advanced",
      question:
        "A wire is stretched by a gradually increasing force, reaching a final force of 200 N and an elongation of 2 mm (within the elastic limit). Find the elastic potential energy stored in the wire.",
      options: ["0.1 J", "0.2 J", "0.3 J", "0.4 J"],
      correctIndex: 1,
      solution:
        "Since the force increases linearly from 0 to F as the wire stretches, the work done (= energy stored) is the AVERAGE force times the elongation: W = ½F(ΔL) = ½(200)(2×10⁻³) = 0.2 J.",
    },
    {
      exam: "JEE Advanced 2017",
      examType: "jee-advanced",
      question:
        "A rubber cord has a much smaller Young's modulus than a steel wire of the same dimensions. For the same applied force, how does the elastic energy stored in the rubber cord compare to that in the steel wire?",
      options: [
        "Stored energy is the same in both, since the force is the same",
        "Rubber stores MORE energy, since it stretches more for the same force",
        "Steel stores more energy, since it has a higher modulus",
        "Cannot be determined without knowing the exact lengths",
      ],
      correctIndex: 1,
      solution:
        "Energy stored = ½F(ΔL). For the same force, the cord with the SMALLER Young's modulus stretches MORE (ΔL ∝ 1/Y), so it stores more elastic energy — this is exactly why rubber, despite being 'weaker,' is so good at absorbing energy (e.g., in shock absorbers and slingshots).",
    },
    // ---------------- JEE Advanced Archive (Cengage, verified) ----------------
    {
      exam: "IIT-JEE 1981",
      examType: "jee-advanced",
      question:
        "Four wires of the same material are stretched by the same tension. Which one has the largest extension?\n(A) Length 50 cm, diameter 0.5 mm\n(B) Length 100 cm, diameter 1 mm\n(C) Length 200 cm, diameter 2 mm\n(D) Length 300 cm, diameter 3 mm",
      options: [
        "Length 50 cm, diameter 0.5 mm",
        "Length 100 cm, diameter 1 mm",
        "Length 200 cm, diameter 2 mm",
        "Length 300 cm, diameter 3 mm",
      ],
      correctIndex: 0,
      solution:
        "For the same material, force, ΔL = FL/(AY) ∝ L/d² (since A ∝ d²). Compute L/d² for each: (A) 50/0.5² = 200. (B) 100/1² = 100. (C) 200/2² = 50. (D) 300/3² = 33.3. The largest value is (A), so wire (A) stretches the most.",
    },
    {
      exam: "IIT-JEE 2003",
      examType: "jee-advanced",
      question:
        "A wire of length 1 m and cross-sectional area 1×10⁻⁶ m² is suspended from a roof, with a load W attached to the free end. A graph of extension Δl versus W is a straight line passing through (20 N, 1×10⁻⁴ m) and (80 N, 4×10⁻⁴ m). Find the Young's modulus of the wire.",
      options: ["2×10¹¹ N/m²", "2×10⁻¹¹ N/m²", "3×10¹² N/m²", "2×10¹³ N/m²"],
      correctIndex: 0,
      solution:
        "Slope of the graph = ΔL/W = (4−1)×10⁻⁴/(80−20) = 3×10⁻⁴/60 = 5×10⁻⁶ m/N. Since ΔL = WL/(AY), this slope equals L/(AY), so Y = L/(A × slope) = 1/[(1×10⁻⁶)(5×10⁻⁶)] = 1/(5×10⁻¹²) = 2×10¹¹ N/m².",
    },
    {
      exam: "IIT-JEE 2005",
      examType: "jee-advanced",
      question:
        "The pressure of a medium is changed from 1.01×10⁵ Pa to 1.165×10⁵ Pa, and the volume changes by 10% keeping temperature constant. Find the bulk modulus of the medium.",
      options: ["204.8×10⁵ Pa", "102.4×10⁵ Pa", "51.2×10⁵ Pa", "1.55×10⁵ Pa"],
      correctIndex: 3,
      solution:
        "ΔP = 1.165×10⁵ − 1.01×10⁵ = 0.155×10⁵ = 1.55×10⁴ Pa. ΔV/V = 10% = 0.1. Bulk modulus K = ΔP/(ΔV/V) = 1.55×10⁴/0.1 = 1.55×10⁵ Pa.",
    },
    {
      exam: "JEE Advanced 2013",
      examType: "jee-advanced",
      question:
        "One end of a horizontal thick copper wire of length 2L and radius 2R is welded to one end of a horizontal thin copper wire of length L and radius R. The other ends are pulled to stretch the combination with equal and opposite forces. Find the ratio of the elongation in the thin wire to that in the thick wire.",
      options: ["0.25", "0.50", "2.00", "4.00"],
      correctIndex: 2,
      solution:
        "Since the wires are welded end to end, the same tension F acts through both. ΔL = FL/(AY), so ΔL ∝ L/A = L/(πr²). For the thick wire: L/(πr²) = 2L/(π(2R)²) = L/(2πR²). For the thin wire: L/(πR²). Ratio (thin : thick) = [L/(πR²)] / [L/(2πR²)] = 2.",
    },
    {
      exam: "JEE Advanced 2019",
      examType: "jee-advanced",
      question:
        "A block of weight 100 N hangs from a copper wire (length √3 m) and a steel wire (length 1 m), both of cross-sectional area 0.5×10⁻⁴ m², fixed to a ceiling. The copper wire makes 30° with the ceiling and the steel wire makes 60° with the ceiling. Given Y_copper = 1×10¹¹ Pa and Y_steel = 2×10¹¹ Pa, find the ratio of elongation in the copper wire to that in the steel wire (Δl_c/Δl_s).",
      options: ["0.5", "1.0", "2.0", "4.0"],
      correctIndex: 2,
      solution:
        "Resolving forces at the junction (copper wire direction (cos30°, sin30°), steel wire direction (−cos60°, sin60°), weight 100 N down) gives two equations. Solving: T_c = 50 N and T_s = 50√3 ≈ 86.6 N. Then Δl_c = T_cL_c/(AY_c) = 50×√3/[(0.5×10⁻⁴)(1×10¹¹)] ≈ 1.73×10⁻⁵ m, and Δl_s = T_sL_s/(AY_s) = 86.6×1/[(0.5×10⁻⁴)(2×10¹¹)] ≈ 8.66×10⁻⁶ m. Ratio Δl_c/Δl_s = 1.73×10⁻⁵/8.66×10⁻⁶ = 2.0.",
    },
  ],
};
