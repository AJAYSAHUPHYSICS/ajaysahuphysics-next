import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: Current Electricity (Class 12)
// current-electricity
// ─────────────────────────────────────────────────────────────────

export const currentElectricityContent: Record<string, ChapterContent> = {
  "current-electricity": {
    introduction:
      "Current Electricity studies the steady, sustained flow of charge that the previous two chapters set up the groundwork for — electric current, drift velocity of electrons in a conductor, resistance and resistivity, Ohm's law and its limitations, EMF and internal resistance of a cell, Kirchhoff's current and voltage laws for analyzing complex circuits, and specialized measuring instruments including the Wheatstone bridge, meter bridge, and potentiometer. Where the electrostatics chapters dealt with charges in equilibrium, this chapter deals with charges continuously in motion, driven by an electric field sustained inside a conductor by a cell or battery. The drift velocity picture — where individual electrons move remarkably slowly, in a randomized zigzag, while the overall current signal travels through the circuit almost instantly — is one of the more genuinely counterintuitive ideas in the syllabus and worth understanding carefully rather than glossing over. Kirchhoff's laws deserve particular attention: they're really just charge conservation and energy conservation applied to a circuit, and mastering them unlocks the ability to analyze circuits far more complex than simple series-parallel combinations, which is exactly the kind of problem JEE Advanced favours.",
    whyItMatters:
      "This is one of the highest-weightage chapters in both JEE and NEET, with circuit analysis questions — Kirchhoff's laws, Wheatstone bridge, and potentiometer problems — appearing in nearly every major exam paper across all three exams.",
    prerequisites: ["Electric Charges & Fields (electric field inside a conductor)", "Electrostatic Potential & Capacitance (potential difference as the driving concept behind current flow)"],
    commonMistakes: [
      "Confusing EMF (the total energy per unit charge a cell can provide, including what's lost internally) with terminal potential difference (what's actually available to the external circuit).",
      "Applying Kirchhoff's voltage law with inconsistent sign conventions while tracing a loop, leading to an equation that looks reasonable but is actually wrong.",
      "Assuming Ohm's law always holds, when many real devices (diodes, and conductors at very high currents where heating changes resistance) are explicitly non-ohmic.",
    ],
    studyStrategy:
      "Study current, drift velocity, and Ohm's law first, then resistance combinations and EMF/internal resistance, then Kirchhoff's laws and circuit analysis, and finally the Wheatstone bridge, meter bridge, and potentiometer, since those instruments are direct applications of Kirchhoff's laws.",
    revisionStrategy:
      "Revise Kirchhoff's laws by picking a moderately complex circuit and writing out the full set of loop and junction equations from scratch each time, rather than only reviewing already-solved examples — the setup process is the actual skill being tested.",
    pyqStrategy:
      "Prioritize Wheatstone bridge and potentiometer PYQs specifically — these appear constantly and follow a fairly small number of recurring setups, so recognizing the pattern quickly is worth more than re-deriving each one from first principles under time pressure.",
    dppStrategy:
      "Use DPPs on multi-loop circuits requiring full Kirchhoff's law analysis (not solvable by simple series-parallel reduction alone), since this is exactly the skill level JEE Advanced tests and needs the most repetition to build genuine speed.",
    relatedChapters: [
      { slug: "electric-charges-and-fields", reason: "The electric field inside a conductor, which drives the drift velocity of electrons, is the same field concept introduced in this earlier chapter." },
      { slug: "electrostatic-potential-and-capacitance", reason: "Potential difference is the direct driving concept behind current flow, and capacitors are analyzed together with resistors in many circuit problems." },
      { slug: "moving-charges-and-magnetism", reason: "A current-carrying conductor, the central object of study in this chapter, becomes the source of a magnetic field in the very next chapter." },
      { slug: "thermal-properties-of-matter", reason: "Resistivity's dependence on temperature, and the heating effect of current (Joule heating), directly connect to the thermal concepts developed there." },
    ],
    faqs: [
      {
        question: "If electrons drift so slowly, why does a bulb light up almost instantly when a switch is flipped?",
        answer: "Drift velocity — the actual average speed of individual electrons — is extremely slow, often less than a millimetre per second. But the electric field that drives them is established throughout the entire circuit almost instantly, close to the speed of light, so every electron in the circuit starts drifting together at nearly the same moment, even though each one moves slowly.",
      },
      {
        question: "What's the real difference between EMF and terminal potential difference?",
        answer: "EMF is the total energy per unit charge a cell can supply, including the energy that gets lost overcoming the cell's own internal resistance. Terminal potential difference is what's actually left over and available to the external circuit — it's always slightly less than the EMF whenever current is flowing, because of that internal resistance.",
      },
      {
        question: "Why does resistivity increase with temperature for metals but decrease for semiconductors?",
        answer: "In metals, higher temperature increases the random thermal vibration of the atomic lattice, so electrons collide more often, reducing their effective drift and increasing resistivity. In semiconductors, higher temperature instead frees up more charge carriers, and this large increase in the number of carriers outweighs the increased collision effect, so resistivity actually decreases.",
      },
      {
        question: "What are Kirchhoff's laws really saying, in simple terms?",
        answer: "The junction (current) law is just conservation of charge — whatever current flows into a junction must flow out. The loop (voltage) law is conservation of energy — going all the way around any closed loop in a circuit, the total rise and fall in potential must add up to exactly zero.",
      },
      {
        question: "Why is a potentiometer more accurate than a voltmeter for measuring EMF?",
        answer: "A voltmeter, even a good one, draws some current from the circuit to operate, which slightly changes the very voltage it's trying to measure. A potentiometer measures EMF by balancing it against a known potential drop with zero current flowing through the branch being measured at the balance point, so it doesn't disturb the circuit at all, making it inherently more accurate.",
      },
    ],
    examWeightageNotes:
      "One of the highest-weightage chapters in JEE Main, JEE Advanced, and NEET alike; circuit analysis and bridge/potentiometer problems appear in nearly every major paper.",
    importantTips: [
      "When applying Kirchhoff's voltage law, fix a consistent direction for traversing each loop before writing any equation, and stick to one sign convention (rise = positive or drop = positive) throughout.",
      "For Wheatstone bridge problems, always check the balance condition first — if the bridge is balanced, the galvanometer branch can be ignored entirely, dramatically simplifying the circuit.",
    ],
  },
};
