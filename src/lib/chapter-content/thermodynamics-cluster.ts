import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: Thermodynamics (Class 11)
// thermal-properties-of-matter, thermodynamics, kinetic-theory-of-gases
// ─────────────────────────────────────────────────────────────────

export const thermodynamicsClusterContent: Record<string, ChapterContent> = {
  "thermal-properties-of-matter": {
    introduction:
      "Thermal Properties of Matter studies how matter responds to heat — temperature scales, thermal expansion of solids, liquids, and gases, calorimetry and specific heat, change of state and latent heat, and the three modes of heat transfer: conduction, convection, and radiation, including Newton's law of cooling, Stefan's law, and Wien's displacement law. It's a broad chapter that mixes short, direct formula-based topics with several genuinely conceptual ones, particularly in the radiation section. For NEET, this is one of the more dependable scoring chapters, since a large share of its questions are direct numerical substitution once the relevant law is identified correctly. The major concepts to master are the heating curve during a change of state (where temperature stays constant while latent heat is absorbed or released), the relationship between conduction rate and temperature difference rather than absolute temperature, and Wien's and Stefan's laws for blackbody radiation, which show up together surprisingly often in the same question. Because the chapter covers so many distinct sub-topics, it rewards students who build a clear mental map of which formula belongs to which physical situation, rather than trying to hold every formula in a single undifferentiated list.",
    whyItMatters:
      "This chapter is a consistently reliable source of direct, formula-based NEET questions, and its radiation laws (Wien's, Stefan's) combined with Newton's law of cooling form a tightly interconnected, frequently-tested cluster of concepts within the broader syllabus.",
    prerequisites: ["Basic Mathematics & Vectors (for graph interpretation)", "Familiarity with temperature and heat from earlier schooling"],
    commonMistakes: [
      "Forgetting that temperature stays constant during a change of state, and mistakenly applying specific heat formulas instead of latent heat during melting or boiling.",
      "Confusing Wien's displacement law (peak wavelength shifts with temperature) with Stefan's law (total radiated power scales with temperature to the fourth power) — they're often tested in the same question but measure different things.",
      "Applying Newton's law of cooling's exact exponential form when the intended (and usually expected) approach is the simpler average-temperature approximation.",
    ],
    studyStrategy:
      "Study temperature scales and thermal expansion first, then calorimetry and change of state, then the three modes of heat transfer last, treating radiation (Wien's law, Stefan's law) as its own focused sub-unit within that.",
    revisionStrategy:
      "Revise by building a one-page summary connecting each law to the physical scenario it applies to — expansion, calorimetry, or radiation — since the chapter's biggest risk is mixing up which formula belongs where, not forgetting a formula outright.",
    pyqStrategy:
      "Prioritize PYQs that combine Wien's law and Stefan's law in a single question — this pairing repeats often — and calorimetry mixture problems involving a phase change partway through.",
    dppStrategy:
      "Use DPPs on Newton's law of cooling specifically, practicing the average-temperature approximation method until it's fast and automatic, since this is the method most NEET/JEE questions actually expect.",
    relatedChapters: [
      { slug: "thermodynamics", reason: "Thermodynamics extends the heat and temperature concepts introduced here into a formal framework of work, internal energy, and thermodynamic processes." },
      { slug: "kinetic-theory-of-gases", reason: "Kinetic theory explains temperature and heat at the molecular level, giving a physical basis for the macroscopic laws studied in this chapter." },
      { slug: "mechanical-properties-of-fluids", reason: "Viscosity and other fluid properties are temperature-dependent, connecting fluid mechanics back to the thermal behavior studied here." },
      { slug: "waves", reason: "The speed of sound in a gas depends on temperature, a direct application of the thermal relationships developed in this chapter." },
    ],
    faqs: [
      {
        question: "Why does temperature stay constant during melting or boiling?",
        answer: "During a change of state, the heat supplied goes entirely into breaking or forming intermolecular bonds (the latent heat), rather than increasing the average kinetic energy of the molecules. Since temperature is a measure of that average kinetic energy, it doesn't change until the phase change is complete.",
      },
      {
        question: "What's the difference between Wien's law and Stefan's law?",
        answer: "Wien's displacement law tells you the wavelength at which a blackbody radiates most intensely, and states that this wavelength gets shorter as temperature increases. Stefan's law tells you the total power radiated by a blackbody, and states that it scales with the fourth power of absolute temperature. They describe different aspects of the same radiation spectrum.",
      },
      {
        question: "Does the rate of heat conduction depend on the actual temperature, or the temperature difference?",
        answer: "Only on the temperature difference between the two ends of the conductor, not their absolute values. A rod with ends at 100°C and 90°C conducts heat at the same rate as one with ends at 20°C and 10°C, since both have the same 10°C difference.",
      },
      {
        question: "Is Newton's law of cooling exact, or an approximation?",
        answer: "It's an approximation, valid only when the temperature difference between the object and its surroundings is small. Most NEET/JEE problems use a simplified average-temperature version of it, rather than the full exponential decay formula, since that's what the exam typically expects.",
      },
      {
        question: "Why do black objects heat up faster in sunlight than white objects?",
        answer: "A black surface has higher emissivity, meaning it's both a better absorber and a better emitter of radiation than a white or reflective surface. In sunlight, its higher absorptivity means it absorbs radiant energy faster, causing a quicker temperature rise.",
      },
    ],
    examWeightageNotes:
      "A dependable, direct-question chapter in NEET most years; a more occasional presence in JEE Main and Advanced, usually as a single numerical question rather than a multi-concept problem.",
  },

  thermodynamics: {
    introduction:
      "Thermodynamics introduces the formal laws governing heat, work, and internal energy — the zeroth law (which defines temperature and thermal equilibrium), the first law (energy conservation applied to heat and work), and the second law (which explains why some processes are irreversible and defines the limits on engine efficiency). You'll also study specific thermodynamic processes — isothermal, adiabatic, isobaric, isochoric — and how to read and interpret them on pressure-volume diagrams, along with heat engines, refrigerators, and Carnot's theorem for maximum possible efficiency. This is a concept-heavy chapter, and JEE Advanced in particular favours it for graph-based, multi-step process questions that test whether a student truly understands what each type of process implies, rather than just recalling a formula. The major concepts to master are the first law itself (ΔQ = ΔU + ΔW, and correctly assigning signs to each term), the distinctive shape and slope of each process type on a PV diagram, and the Carnot efficiency formula, which sets an upper bound that no real engine can exceed. Getting comfortable reading PV diagrams — recognizing a process from its shape, and calculating work done as the area under the curve — is arguably the single most transferable skill this chapter builds.",
    whyItMatters:
      "Thermodynamics is tested consistently across NEET, JEE Main, and JEE Advanced, and JEE Advanced in particular treats it as a favourite source of graph-based and multi-step process questions that reward genuine conceptual understanding over formula memorization.",
    prerequisites: ["Thermal Properties of Matter (temperature, heat)", "Work-Energy-Power (the concept of work and energy conservation)"],
    commonMistakes: [
      "Getting sign conventions wrong in the first law — mixing up whether work done BY the gas or ON the gas is positive in the version of the formula being used.",
      "Confusing an isothermal process (constant temperature, ΔU = 0) with an adiabatic process (no heat exchange, Q = 0) — these are the two most commonly mixed-up process types.",
      "Assuming Carnot efficiency is achievable by real engines, rather than understanding it as a theoretical upper limit.",
    ],
    studyStrategy:
      "Study the zeroth and first laws first, then the different thermodynamic processes and their PV diagrams, then heat engines, refrigerators, and the second law last, since Carnot efficiency builds on a solid grasp of the earlier processes.",
    revisionStrategy:
      "Revise by sketching all four standard processes — isothermal, adiabatic, isobaric, isochoric — on the same PV diagram from memory, and stating what stays constant and what happens to internal energy in each case.",
    pyqStrategy:
      "Cyclic-process PYQs (where a gas returns to its initial state after a series of steps) are extremely common — practice calculating net work done as the enclosed area, and identifying which parts of the cycle add or remove heat.",
    dppStrategy:
      "Use DPPs specifically on distinguishing adiabatic from isothermal processes in mixed-process problems, since this single distinction is responsible for a disproportionate share of errors in this chapter.",
    relatedChapters: [
      { slug: "thermal-properties-of-matter", reason: "Thermodynamics builds directly on the temperature, heat, and specific heat concepts introduced in Thermal Properties of Matter." },
      { slug: "kinetic-theory-of-gases", reason: "Kinetic theory provides the molecular explanation for internal energy and specific heats (Cv, Cp) used throughout thermodynamic process calculations." },
      { slug: "work-energy-and-power", reason: "The first law of thermodynamics is energy conservation — the same principle from Work-Energy-Power, now applied to heat and internal energy." },
      { slug: "mechanical-properties-of-fluids", reason: "Pressure-volume relationships in thermodynamic processes build on the pressure concepts first introduced in fluid mechanics." },
    ],
    faqs: [
      {
        question: "What's the actual difference between an isothermal and an adiabatic process?",
        answer: "In an isothermal process, temperature stays constant, so internal energy doesn't change (ΔU = 0), but heat IS exchanged with the surroundings to keep temperature constant as the gas expands or compresses. In an adiabatic process, no heat is exchanged at all (Q = 0), so any work done comes entirely from a change in internal energy — meaning the temperature DOES change.",
      },
      {
        question: "Why is Carnot efficiency never actually achieved by real engines?",
        answer: "Carnot efficiency assumes a perfectly reversible cycle, with no friction, no heat loss to the surroundings, and infinitely slow (quasi-static) processes. Real engines have friction and finite-speed processes that make them inherently irreversible, so their actual efficiency is always below the Carnot limit for the same two temperatures.",
      },
      {
        question: "How do I find work done in a cyclic process from a PV diagram?",
        answer: "Work done in one full cycle equals the area enclosed by the cycle's path on the PV diagram. If the cycle is traversed clockwise, the net work done BY the gas is positive; if counterclockwise, it's negative — this represents a refrigerator-like cycle instead of an engine.",
      },
      {
        question: "What does the second law of thermodynamics actually say?",
        answer: "There are several equivalent statements, but the core idea is that heat cannot spontaneously flow from a colder body to a hotter one without external work being done, and that no engine can convert heat entirely into work with 100% efficiency. It explains why real processes are irreversible.",
      },
      {
        question: "Is the zeroth law really necessary, or is it just a formality?",
        answer: "It's more than a formality — it's what justifies temperature as a meaningful, measurable quantity in the first place. It states that if two systems are each in thermal equilibrium with a third, they're in thermal equilibrium with each other, which is the logical basis for using a thermometer to compare temperatures at all.",
      },
    ],
    examWeightageNotes:
      "One of the more heavily and consistently tested Class 11 chapters across NEET, JEE Main, and JEE Advanced; JEE Advanced frequently uses it for multi-step, graph-based problems.",
    importantTips: [
      "When given a PV diagram, identify the process type from its shape FIRST, before attempting any calculation — this determines which simplified version of the first law applies.",
      "Always double-check whether a problem's convention treats work done BY the gas or ON the gas as positive before applying the first law.",
    ],
  },

  "kinetic-theory-of-gases": {
    introduction:
      "Kinetic Theory of Gases explains the macroscopic behaviour of gases — pressure, temperature, and the ideal gas law — in terms of the microscopic motion of individual molecules. You'll derive the relationship between pressure and molecular motion, connect temperature directly to the average kinetic energy of molecules, and study degrees of freedom, the law of equipartition of energy, specific heats of gases (Cv and Cp) for monatomic, diatomic, and polyatomic gases, and mean free path. This chapter is the conceptual bridge between Thermal Properties of Matter and Thermodynamics — it explains WHY the macroscopic laws in those chapters hold true, by grounding them in molecular behaviour. The major concepts to master are the direct proportionality between absolute temperature and average kinetic energy per molecule, the degrees-of-freedom method for finding a gas's specific heats without memorizing separate values for each gas type, and the distinction between rms speed, average speed, and most probable speed in the Maxwell speed distribution, which are frequently confused with each other. Because this chapter connects so directly to both the chapter before it and the chapter after it, understanding it well tends to make both of those chapters noticeably easier.",
    whyItMatters:
      "This chapter is tested steadily in both NEET and JEE, often through formula-based numerical questions on rms speed, degrees of freedom, and specific heat ratios, and it directly supports understanding of both Thermal Properties of Matter and Thermodynamics.",
    prerequisites: ["Thermal Properties of Matter (temperature and heat)", "Basic probability/averaging concepts (for the Maxwell speed distribution)"],
    commonMistakes: [
      "Confusing rms speed, average speed, and most probable speed in the Maxwell distribution — they are three genuinely different quantities with different formulas, not interchangeable approximations of each other.",
      "Memorizing separate Cv and Cp values for each type of gas instead of deriving them from degrees of freedom, which works for any gas type including ones not explicitly memorized.",
      "Forgetting that the law of mass action-style relation (n·p = constant for gas mixtures via partial pressures) depends on temperature and volume, not on the amount of any single gas present.",
    ],
    studyStrategy:
      "Study the kinetic theory derivation of pressure and the temperature-kinetic energy relationship first, then degrees of freedom and specific heats, then mean free path and the Maxwell speed distribution last, since those build on the earlier statistical picture.",
    revisionStrategy:
      "Revise by re-deriving Cv and Cp from degrees of freedom for a monatomic, diatomic, and polyatomic gas side by side, rather than memorizing three separate final numbers — this also prepares you for gas mixture problems.",
    pyqStrategy:
      "Rms speed and gas mixture (degrees of freedom, internal energy) PYQs are the most common formats — prioritize practicing the degrees-of-freedom method until it's faster than looking up a memorized value.",
    dppStrategy:
      "Use DPPs specifically on distinguishing rms, average, and most probable speed numerically, since exam questions often deliberately test whether you know which one a given formula actually calculates.",
    relatedChapters: [
      { slug: "thermal-properties-of-matter", reason: "Kinetic theory provides the molecular explanation for temperature and heat, concepts introduced macroscopically in Thermal Properties of Matter." },
      { slug: "thermodynamics", reason: "The specific heats (Cv, Cp) derived here from degrees of freedom are used directly throughout thermodynamic process calculations." },
      { slug: "work-energy-and-power", reason: "The kinetic energy concept from Work-Energy-Power is extended here to the average kinetic energy of gas molecules, connecting macroscopic and microscopic mechanics." },
      { slug: "waves", reason: "The speed of sound in a gas is derived using the same kinetic-theory framework that gives the rms speed of gas molecules, linking the two chapters directly." },
    ],
    faqs: [
      {
        question: "How exactly is temperature related to molecular motion?",
        answer: "Absolute temperature is directly proportional to the average translational kinetic energy of the gas molecules. This is one of kinetic theory's central results — it means temperature isn't just an abstract number, it's a direct measure of how fast molecules are moving on average.",
      },
      {
        question: "What's the difference between rms speed, average speed, and most probable speed?",
        answer: "These are three different ways to summarize the Maxwell speed distribution of gas molecules. Most probable speed is where the distribution peaks, average speed is the mean of all molecular speeds, and rms speed is the square root of the mean of the squared speeds. They're always in the order: most probable < average < rms, for the same gas at the same temperature.",
      },
      {
        question: "Why do different types of gases (monatomic, diatomic, polyatomic) have different specific heats?",
        answer: "Specific heat depends on how many degrees of freedom a molecule has for storing energy. A monatomic gas only has 3 translational degrees of freedom, a diatomic gas adds 2 rotational degrees, and polyatomic gases have even more — each additional degree of freedom that can store energy increases the specific heat.",
      },
      {
        question: "What is mean free path, physically?",
        answer: "It's the average distance a gas molecule travels between successive collisions with other molecules. It depends on molecular size and the gas's number density — a larger molecule or a denser gas leads to more frequent collisions and a shorter mean free path.",
      },
      {
        question: "Does pressure in a gas come from molecules pushing on the container?",
        answer: "More precisely, it comes from molecules repeatedly colliding with and bouncing off the container walls, transferring momentum with each collision. The cumulative effect of billions of these tiny momentum transfers per second, spread over the container's surface area, is what we measure macroscopically as pressure.",
      },
    ],
    examWeightageNotes:
      "Steadily tested in both NEET and JEE, typically through direct formula-based numerical questions on rms speed, specific heats, and degrees of freedom.",
  },
};
