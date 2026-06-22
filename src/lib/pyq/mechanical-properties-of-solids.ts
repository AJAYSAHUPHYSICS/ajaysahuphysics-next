export type PyqQuestion = {
  exam: string;
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
  ],
};
