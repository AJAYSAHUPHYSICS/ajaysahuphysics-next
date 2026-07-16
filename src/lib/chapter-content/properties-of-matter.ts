import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: Properties of Matter (Class 11)
// mechanical-properties-of-solids, mechanical-properties-of-fluids
// ─────────────────────────────────────────────────────────────────

export const propertiesOfMatterContent: Record<string, ChapterContent> = {
  "mechanical-properties-of-solids": {
    introduction:
      "Mechanical Properties of Solids covers how solid materials respond to applied forces — stress, strain, Hooke's law, and the elastic moduli (Young's modulus, bulk modulus, shear modulus) that quantify a material's stiffness. It's one of the shorter chapters in Class 11, with a limited set of formulas and fewer conceptual traps than most mechanics chapters, which makes it a genuinely efficient place to bank marks relative to the study time required. There's no heavy prerequisite chain — basic familiarity with force and area from Laws of Motion is enough. The most common mistake is confusing the different elastic moduli — which modulus applies to which type of deformation, Young's for length change, bulk for volume change, shear for shape change — rather than any calculation error, since the formulas themselves are fairly simple once you know which one to use. A useful way to study this chapter is to explicitly connect each modulus to a physical picture of the deformation it describes: stretching a wire, compressing a fluid, or twisting a block, rather than memorizing three separate formulas that look superficially similar on paper but describe entirely different physical situations.",
    whyItMatters:
      "In NEET, it contributes a small, steady handful of direct, definition- and formula-based questions most years. In JEE Main, it appears occasionally, usually as a single numerical question on stress-strain calculations or the Young's modulus of a wire.",
    prerequisites: ["Laws of Motion (basic familiarity with force and area)"],
    commonMistakes: [
      "Confusing which elastic modulus (Young's, bulk, or shear) applies to which type of deformation.",
      "Misreading a stress-strain graph — mixing up the elastic limit, yield point, and breaking point.",
      "Forgetting that stress and strain are defined per unit area/length, and mixing up total force/elongation with the stress/strain values themselves.",
    ],
    studyStrategy:
      "Study stress and strain first, then Hooke's law, then the three elastic moduli last, since each modulus is really just Hooke's law applied to a specific type of deformation.",
    revisionStrategy:
      "Revise by matching each modulus to its physical scenario — stretching, compressing, twisting — using a quick mental picture, rather than re-reading the formal definitions each time.",
    pyqStrategy:
      "Young's modulus wire-elongation PYQs — given force, length, area, find elongation, or vice versa — are the most repeated pattern in this chapter; prioritize these first.",
    dppStrategy:
      "Use DPPs to build speed on straightforward stress/strain/modulus numerical substitution, since this chapter rewards calculation speed more than deep problem-solving.",
    relatedChapters: [
      { slug: "mechanical-properties-of-fluids", reason: "Both chapters study how matter deforms or flows under applied force, just for solids versus fluids respectively." },
      { slug: "laws-of-motion", reason: "Stress is defined as force per unit area, directly building on the force concepts developed in Laws of Motion." },
      { slug: "work-energy-and-power", reason: "Elastic potential energy stored in a stretched wire is a direct application of the energy concepts built in Work-Energy-Power." },
      { slug: "thermal-properties-of-matter", reason: "A material's elastic properties, like its length, are also affected by temperature through thermal expansion, connecting the two chapters." },
    ],
    faqs: [
      {
        question: "What's the difference between stress and pressure?",
        answer: "Pressure is force per unit area acting on a fluid, always perpendicular to the surface. Stress is a more general concept — force per unit area acting on a solid, which can be perpendicular (normal stress) or parallel (shear stress) to the surface.",
      },
      {
        question: "Which elastic modulus should I use for which problem?",
        answer: "Young's modulus applies to a change in length, like stretching a wire. Bulk modulus applies to a change in volume, like compressing an object uniformly with fluid pressure. Shear modulus applies to a change in shape without a change in volume, like twisting a block.",
      },
      {
        question: "What does the elastic limit mean on a stress-strain graph?",
        answer: "It's the maximum stress a material can experience while still returning to its original shape once the stress is removed. Beyond the elastic limit, the material undergoes permanent (plastic) deformation, even after the force is taken away.",
      },
      {
        question: "Why is this chapter considered a reliable scoring chapter?",
        answer: "It has a small, well-defined set of formulas without many conceptual edge cases, so the return on study time is high — once you know the three moduli and Hooke's law, most questions are direct substitution.",
      },
      {
        question: "Is Poisson's ratio important for NEET/JEE?",
        answer: "It's part of the NCERT syllabus and occasionally tested conceptually — its typical range of values, or its definition as the ratio of lateral to longitudinal strain — but it's rarely central to a numerical problem.",
      },
    ],
    examWeightageNotes:
      "A small, steady handful of direct NEET questions most years; an occasional single numerical question in JEE Main, rarely tested in JEE Advanced.",
  },

  "mechanical-properties-of-fluids": {
    introduction:
      "Mechanical Properties of Fluids covers how fluids behave at rest and in motion — pressure and Pascal's law, buoyancy and Archimedes' principle, surface tension, viscosity, and Bernoulli's principle for flowing fluids. It's a broader chapter than Mechanical Properties of Solids, mixing genuinely conceptual ideas (why does a needle float on water despite being denser?) with formula-driven numerical problems (Bernoulli's equation applications, viscous drag). The prerequisite is Laws of Motion for the force and pressure concepts, though no deep chain of earlier chapters is required. NEET in particular draws steadily from this chapter, and the surface tension and viscosity sections are common sources of conceptual, non-numerical questions. The most common mistake is applying Bernoulli's principle without checking that its underlying assumptions actually hold — the fluid should be non-viscous, incompressible, and in steady (streamline) flow — since students often reach for the formula automatically without verifying the setup actually qualifies. Study this chapter by keeping the conceptual sections (surface tension, capillary rise, viscosity) and the numerical sections (Bernoulli's applications, buoyancy calculations) in separate mental buckets, since NEET tends to test the former as direct concept questions and the latter as calculations.",
    whyItMatters:
      "NEET draws steadily and reliably from this chapter, testing both direct numerical applications of Bernoulli's principle and Archimedes' principle, and conceptual questions on surface tension and viscosity that don't require heavy calculation.",
    prerequisites: ["Laws of Motion (force and pressure concepts)"],
    commonMistakes: [
      "Applying Bernoulli's principle without checking its assumptions hold (non-viscous, incompressible, streamline flow).",
      "Confusing buoyant force (which depends on the volume of fluid displaced) with the weight of the floating/submerged object itself.",
      "Mixing up surface tension (a force per unit length along a surface) with pressure (a force per unit area) in capillary-rise problems.",
    ],
    studyStrategy:
      "Study fluid statics — pressure, Pascal's law, buoyancy — first, then move to fluid dynamics — the equation of continuity and Bernoulli's principle — and cover surface tension and viscosity as a somewhat separate conceptual unit at the end.",
    revisionStrategy:
      "Revise Bernoulli's principle by explicitly re-checking its three assumptions each time you apply it to a new problem, until verifying them becomes an automatic first step rather than an afterthought.",
    pyqStrategy:
      "Venturimeter and efflux-speed (Torricelli's theorem) PYQs are a recurring, formula-direct pattern under Bernoulli's principle — these are worth mastering as a specific problem type.",
    dppStrategy:
      "Use DPPs on surface tension and capillary rise conceptual questions specifically, since these are less calculation-heavy but frequently misunderstood at a conceptual level.",
    relatedChapters: [
      { slug: "mechanical-properties-of-solids", reason: "Both chapters study how matter responds to applied force, just for fluids versus solids respectively." },
      { slug: "thermal-properties-of-matter", reason: "Viscosity and other fluid properties are temperature-dependent, connecting to the thermal behavior of matter covered next." },
      { slug: "laws-of-motion", reason: "Pascal's law and pressure-based force calculations in fluids build directly on the force concepts developed in Laws of Motion." },
      { slug: "work-energy-and-power", reason: "Bernoulli's principle is energy conservation applied specifically to flowing fluids, directly extending the energy methods built earlier." },
    ],
    faqs: [
      {
        question: "Why does a steel needle float on water despite steel being denser than water?",
        answer: "It's not buoyancy in the usual sense — it's surface tension. The needle doesn't break through the water's surface film if placed carefully, and the surface tension force supports its weight. This only works for small, light objects; a larger steel object would sink normally.",
      },
      {
        question: "What are the assumptions behind Bernoulli's principle?",
        answer: "Bernoulli's principle assumes the fluid is non-viscous (no internal friction), incompressible (constant density), and undergoing steady, streamline flow. If a problem violates these — like a highly viscous fluid — Bernoulli's equation doesn't directly apply.",
      },
      {
        question: "What's the difference between buoyant force and Archimedes' principle?",
        answer: "Archimedes' principle is the rule: the buoyant force on a submerged or floating object equals the weight of the fluid it displaces. Buoyant force is the actual upward force that results from applying this principle to a specific object.",
      },
      {
        question: "How is viscosity different from surface tension?",
        answer: "Viscosity is a fluid's internal resistance to flow — friction between adjacent layers of fluid moving at different speeds. Surface tension is a force acting along the surface of a liquid, caused by cohesive forces between surface molecules. They're both intermolecular-force effects, but they act in very different situations.",
      },
      {
        question: "Why does NEET favour this chapter so consistently?",
        answer: "It offers a good mix of direct numerical questions (Bernoulli's principle, buoyancy) and pure conceptual questions (surface tension, capillary action) that test understanding without heavy calculation — a combination NEET's format rewards.",
      },
    ],
    examWeightageNotes:
      "One of the more reliably-tested Class 11 chapters in NEET, mixing direct numerical questions with conceptual ones; a more occasional presence in JEE Main and Advanced.",
  },
};
