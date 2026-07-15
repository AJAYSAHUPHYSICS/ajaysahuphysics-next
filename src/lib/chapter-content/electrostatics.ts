import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: Electrostatics (Class 12)
// electric-charges-and-fields, electrostatic-potential-and-capacitance
// ─────────────────────────────────────────────────────────────────

export const electrostaticsContent: Record<string, ChapterContent> = {
  "electric-charges-and-fields": {
    introduction:
      "Electric Charges & Fields opens Class 12 electromagnetism with electric charge and its properties, Coulomb's law for the force between point charges, the electric field as a way of describing the influence of a charge on the space around it, electric field lines, electric dipoles, and Gauss's law with its applications to symmetric charge distributions. This chapter establishes the vocabulary and mathematical machinery — vector superposition of fields, flux, and the specific symmetry-based shortcuts Gauss's law provides — that every later electromagnetism chapter builds on without re-explaining. The central shift this chapter asks you to make is thinking in terms of FIELDS rather than direct force-at-a-distance: instead of asking how one charge pushes or pulls another, you learn to first find the field a charge configuration creates, then ask how a second charge would respond to that field if placed in it. Gauss's law deserves particular attention, since it turns what would otherwise be a difficult integral into a short calculation for any sufficiently symmetric charge distribution — spheres, infinite lines, and infinite planes — provided you choose the right Gaussian surface.",
    whyItMatters:
      "This chapter is foundational for nearly every later electricity and magnetism chapter, and it's tested heavily across NEET, JEE Main, and JEE Advanced, with Gauss's law applications and electric dipole problems being particularly frequent, high-value formats.",
    prerequisites: ["Basic Mathematics & Vectors (vector addition, flux as a surface integral concept)", "Gravitation (conceptual parallel to the inverse-square force law)"],
    commonMistakes: [
      "Confusing electric field (a property of space, independent of any test charge placed in it) with the force a specific charge experiences in that field.",
      "Choosing a Gaussian surface that doesn't match the symmetry of the charge distribution, making the flux integral impossible to simplify.",
      "Forgetting that Gauss's law only directly gives the field magnitude easily when the charge distribution has enough symmetry — it's always true, but not always useful for calculation.",
    ],
    studyStrategy:
      "Study charge properties and Coulomb's law first, then the electric field and field lines, then electric dipoles, and finally Gauss's law and its standard applications, since Gauss's law is best understood as a shortcut for problems you could, in principle, already solve directly.",
    revisionStrategy:
      "Revise Gauss's law by re-deriving the field due to a charged sphere, an infinite line, and an infinite plane from scratch each time, rather than memorizing the three final results — the choice of Gaussian surface is the real skill being tested.",
    pyqStrategy:
      "Prioritize PYQs on electric flux through a specified surface (using the concept that only enclosed charge matters) and dipole torque/field problems — these two formats recur across NEET and JEE with only the geometry changed.",
    dppStrategy:
      "Use DPPs to build fluency in superposing electric fields from multiple point charges at a given location, since this vector-addition skill underlies both direct field problems and later Gauss's law applications.",
    relatedChapters: [
      { slug: "electrostatic-potential-and-capacitance", reason: "Electric potential is defined directly in terms of the electric field studied here — the two chapters form a single continuous topic split for syllabus purposes." },
      { slug: "gravitation", reason: "Coulomb's law and Newton's law of gravitation share the same inverse-square mathematical structure, making Gravitation a useful conceptual parallel." },
      { slug: "current-electricity", reason: "Electric current is charge in motion, driven by the same electric field concept introduced here, now sustained inside a conductor." },
      { slug: "moving-charges-and-magnetism", reason: "A moving charge, studied here only in the context of a static field, becomes the source of a magnetic field in this later chapter." },
    ],
    faqs: [
      {
        question: "What's the actual difference between electric field and electric force?",
        answer: "Electric field is a property of the space around a charge — it exists whether or not another charge is present to feel it. Electric force is what happens when a specific charge is actually placed in that field; force equals the charge's magnitude multiplied by the field strength at that point.",
      },
      {
        question: "Is Gauss's law only true for symmetric charge distributions?",
        answer: "No — Gauss's law is always true, for any charge distribution and any closed surface. It only becomes practically USEFUL for quickly finding the field's magnitude when the distribution has enough symmetry (spherical, cylindrical, or planar) to let you pull the field out of the flux integral.",
      },
      {
        question: "Why do electric field lines never cross each other?",
        answer: "The direction of the electric field at any point is unique — it can only point one way. If two field lines crossed, that point would have two different field directions simultaneously, which isn't physically possible.",
      },
      {
        question: "What does torque on a dipole in a uniform electric field actually represent?",
        answer: "It represents the field's tendency to rotate the dipole so that its dipole moment aligns with the field direction. The torque is maximum when the dipole is perpendicular to the field, and zero when it's already aligned (or exactly opposed) with the field.",
      },
      {
        question: "Does the electric flux through a closed surface depend on charges outside the surface?",
        answer: "No — only the charge enclosed WITHIN the surface contributes to the net flux through it, regardless of how much charge sits just outside. External charges do still affect the field's exact shape at each point, but their net contribution to total flux through the closed surface is always zero.",
      },
    ],
    examWeightageNotes:
      "A consistently high-weightage chapter across NEET, JEE Main, and JEE Advanced, with Gauss's law applications and dipole-related problems appearing especially frequently.",
  },

  "electrostatic-potential-and-capacitance": {
    introduction:
      "Electrostatic Potential & Capacitance builds directly on the electric field concept from the previous chapter, introducing electric potential and potential energy, potential due to point charges and dipoles, equipotential surfaces, and capacitors — devices that store charge and electrical energy. You'll learn how potential relates to field (potential decreases in the direction of the field, and field is the negative gradient of potential), how to combine capacitors in series and parallel, and how inserting a dielectric between a capacitor's plates changes its capacitance and stored energy. The conceptual heart of this chapter is understanding potential as a scalar quantity — unlike the electric field, which is a vector, potential at a point is just a single number, which makes combining contributions from multiple charges far simpler through ordinary addition rather than vector addition. Equipotential surfaces are worth special attention: they're always perpendicular to field lines, and no work is done moving a charge along one, a fact that resolves a surprising number of otherwise-confusing problems once it's internalized properly rather than just memorized as a rule.",
    whyItMatters:
      "Capacitor combination problems and energy-storage questions are a recurring, high-scoring topic in both JEE Main and JEE Advanced, and this chapter's concepts — potential, equipotential surfaces, and capacitance — are assumed knowledge in Current Electricity and later chapters.",
    prerequisites: ["Electric Charges & Fields (electric field and Gauss's law)", "Work-Energy-Power (potential energy as a general concept)"],
    commonMistakes: [
      "Treating electric potential as a vector quantity out of habit, carried over from working with electric fields, when it's actually a scalar.",
      "Adding capacitances the wrong way — using the series formula for a parallel combination or vice versa, since the rules are inverted compared to how resistors combine.",
      "Forgetting that once a charged capacitor is disconnected from its battery, its charge stays constant even as other quantities (voltage, capacitance) change if a dielectric is inserted — versus a capacitor still connected to a battery, where voltage stays constant instead.",
    ],
    studyStrategy:
      "Study electric potential and potential energy first, then equipotential surfaces and the potential-field relationship, then capacitors and their series/parallel combinations, and finally dielectrics and energy stored in a capacitor last.",
    revisionStrategy:
      "Revise the 'battery connected vs. disconnected' distinction for dielectric-insertion problems specifically, using a quick two-column comparison (what stays constant, what changes) — this single point resolves a large share of this chapter's trickiest questions.",
    pyqStrategy:
      "Prioritize PYQs on capacitor networks (series-parallel combinations) and energy stored before and after a dielectric is inserted — these two formats are extremely common and reward careful, systematic circuit reduction.",
    dppStrategy:
      "Use DPPs specifically on potential due to a system of multiple point charges, since the scalar addition involved is deceptively simple to set up but easy to get wrong with sign errors on negative charges.",
    relatedChapters: [
      { slug: "electric-charges-and-fields", reason: "Electric potential is mathematically derived from the electric field studied in this prerequisite chapter — the two form a single continuous topic." },
      { slug: "current-electricity", reason: "Capacitors are core circuit elements studied further in Current Electricity, and potential difference is the driving concept behind current flow." },
      { slug: "electromagnetic-induction", reason: "Capacitors storing energy in an electric field is the direct structural parallel to inductors storing energy in a magnetic field, covered later." },
      { slug: "work-energy-and-power", reason: "Electric potential energy extends the general potential energy and energy-conservation framework first built in Work-Energy-Power to the electrical domain." },
    ],
    faqs: [
      {
        question: "Why is electric potential a scalar quantity while electric field is a vector?",
        answer: "Potential is defined as the work done per unit charge to bring a charge from infinity to a point, which is just a single number (energy per charge) — it has no direction. Electric field, by contrast, describes both the strength AND direction of the force a charge would experience, making it inherently a vector.",
      },
      {
        question: "What exactly is an equipotential surface?",
        answer: "It's a surface where every point has the same electric potential. Since no work is done moving a charge between points of equal potential, equipotential surfaces are always perpendicular to electric field lines — moving along one never involves any component of displacement along the field direction.",
      },
      {
        question: "How does a dielectric actually increase a capacitor's capacitance?",
        answer: "A dielectric material becomes polarized in the external field, creating an internal field that partially opposes the original one. This reduces the net field (and hence the voltage) for the same amount of charge on the plates, and since capacitance equals charge divided by voltage, a lower voltage for the same charge means higher capacitance.",
      },
      {
        question: "Why do capacitors combine in series and parallel in the opposite way that resistors do?",
        answer: "In series, capacitors share the same charge but split the voltage, which mathematically leads to reciprocals adding (like parallel resistors). In parallel, capacitors share the same voltage but their charges (and effectively their capacitances) add directly (like series resistors) — the physical setup is structurally 'flipped' compared to resistor networks.",
      },
      {
        question: "What happens to a capacitor's stored energy if a dielectric is inserted while it's still connected to a battery?",
        answer: "With the battery still connected, voltage stays fixed at the battery's value, so as capacitance increases due to the dielectric, both charge and stored energy increase too — this is different from the disconnected case, where charge stays fixed and stored energy actually decreases as the dielectric is inserted.",
      },
    ],
    examWeightageNotes:
      "A high-scoring, consistently tested chapter in JEE Main and Advanced, with capacitor networks and dielectric-insertion energy problems among the most frequently repeated formats.",
    importantTips: [
      "Before solving any capacitor-network problem, redraw the circuit to clearly identify which capacitors are genuinely in series versus parallel — misidentifying this is the most common source of error.",
      "For dielectric-insertion problems, always check first whether the battery is still connected or has been disconnected — this single detail changes which quantity (voltage or charge) stays constant.",
    ],
  },
};
