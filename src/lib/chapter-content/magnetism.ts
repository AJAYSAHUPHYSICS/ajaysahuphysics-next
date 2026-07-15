import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: Magnetism (Class 12)
// moving-charges-and-magnetism, magnetism-and-matter
// ─────────────────────────────────────────────────────────────────

export const magnetismContent: Record<string, ChapterContent> = {
  "moving-charges-and-magnetism": {
    introduction:
      "Moving Charges & Magnetism shows that electric currents and moving charges are themselves sources of magnetic fields — a genuinely new idea after two chapters built entirely around static charges. You'll study the Biot-Savart law and Ampere's circuital law for calculating magnetic fields due to current-carrying conductors of various shapes, the force on a moving charge in a magnetic field (the Lorentz force) and the resulting circular or helical motion, the force on a current-carrying conductor placed in a magnetic field, torque on a current loop, and practical devices including the moving coil galvanometer and the cyclotron. The chapter's central conceptual shift is recognizing current loops and bar magnets as equivalent sources of magnetic field at large distances — a current loop behaves like a magnetic dipole, with a dipole moment you can calculate directly from its current and area. Ampere's law deserves the same careful attention Gauss's law received in electrostatics: it's a genuine shortcut for symmetric current configurations, like a long straight wire or a solenoid, but it requires choosing the right Amperian loop to actually simplify the calculation.",
    whyItMatters:
      "This is a dense, formula-rich chapter that's consistently and heavily tested in JEE Advanced, and its Biot-Savart law and Ampere's law applications, along with charged-particle motion in magnetic fields, form the mathematical backbone for Magnetism & Matter and Electromagnetic Induction that follow.",
    prerequisites: ["Current Electricity (current-carrying conductors as the source studied here)", "Circular Motion (the geometry of charged-particle motion in a magnetic field)"],
    commonMistakes: [
      "Getting the direction of the magnetic force wrong by misapplying the right-hand rule (or Fleming's left-hand rule) for force, rather than for field.",
      "Applying Ampere's law to a current configuration without enough symmetry to actually simplify the line integral, the same trap as with Gauss's law in electrostatics.",
      "Forgetting that the magnetic force on a moving charge is always perpendicular to its velocity, meaning it changes direction of motion but never does work or changes speed.",
    ],
    studyStrategy:
      "Study the Biot-Savart law and magnetic field due to standard current configurations first, then Ampere's law, then the force on moving charges and current-carrying conductors, and finally torque on a current loop and its dipole-moment equivalence, since that ties directly into the next chapter.",
    revisionStrategy:
      "Revise by keeping two separate right-hand-rule applications clearly distinct in your mind: one finds the DIRECTION of a magnetic field created by a current, the other finds the direction of FORCE on a charge or conductor already inside a field — mixing these two up is the single most common source of sign errors in this chapter.",
    pyqStrategy:
      "Prioritize PYQs on magnetic field due to a straight wire, circular loop, and solenoid using Ampere's or Biot-Savart law, and charged-particle circular motion (radius, time period) in a magnetic field — these formats recur constantly with only the geometry or given values changed.",
    dppStrategy:
      "Use DPPs specifically on force on a current-carrying conductor in a non-uniform or angled magnetic field, since these require careful vector cross-product setup that's easy to rush through incorrectly under time pressure.",
    relatedChapters: [
      { slug: "current-electricity", reason: "Current-carrying conductors, the central source of magnetic fields studied in this chapter, are the direct subject of the previous chapter." },
      { slug: "circular-motion", reason: "A charged particle moving perpendicular to a magnetic field follows exactly the circular-motion framework built earlier, with the magnetic force playing the role of centripetal force." },
      { slug: "magnetism-and-matter", reason: "The current loop's equivalence to a magnetic dipole, established in this chapter, is the direct starting point for the bar-magnet-focused treatment in the next chapter." },
      { slug: "electromagnetic-induction", reason: "The static magnetic fields studied here become the basis for induced EMF once those fields are allowed to change with time, in the next major topic." },
    ],
    faqs: [
      {
        question: "What's the difference between the magnetic force on a moving charge and the electric force on a charge?",
        answer: "Electric force acts along the direction of the electric field, whether or not the charge is moving, and can do work on the charge, changing its speed. Magnetic force acts only on a MOVING charge, is always perpendicular to both the velocity and the magnetic field, and can never do work — it changes the direction of motion but never the speed.",
      },
      {
        question: "Why does a charged particle move in a circle in a uniform magnetic field?",
        answer: "Since the magnetic force is always perpendicular to velocity, it acts exactly like a centripetal force — constantly changing direction but never magnitude. A constant-magnitude force always perpendicular to velocity produces uniform circular motion, with the magnetic force providing exactly the centripetal force needed.",
      },
      {
        question: "What is the fundamental limitation of a cyclotron?",
        answer: "A cyclotron relies on the particle's time period of circular motion being independent of its speed, which holds only at non-relativistic speeds. As the particle is accelerated to speeds approaching a significant fraction of the speed of light, relativistic mass increase makes the time period increase too, throwing the particle out of sync with the alternating accelerating voltage — this is why cyclotrons can't accelerate particles indefinitely.",
      },
      {
        question: "How is a current loop equivalent to a bar magnet?",
        answer: "At distances large compared to its size, a current loop produces a magnetic field with exactly the same pattern as a short bar magnet — both behave as a magnetic dipole. The current loop's dipole moment is simply current multiplied by the loop's area, giving it a concrete, calculable magnitude and a direction given by the right-hand rule.",
      },
      {
        question: "When should I use Ampere's law instead of the Biot-Savart law?",
        answer: "Ampere's law is a shortcut, useful specifically when the current configuration has enough symmetry — like an infinite straight wire, a solenoid, or a toroid — to choose an Amperian loop where the field is constant in magnitude along the path. For less symmetric configurations, like a finite wire segment or an arc, the Biot-Savart law's direct integration is usually necessary instead.",
      },
    ],
    examWeightageNotes:
      "A dense, formula-rich chapter consistently and heavily tested in JEE Advanced; a steady, reliable presence in JEE Main and NEET as well.",
    importantTips: [
      "Keep the field-direction right-hand rule and the force-direction right-hand rule mentally separate — they answer different questions and are the most common source of sign errors in this chapter.",
      "For Ampere's law problems, sketch the Amperian loop explicitly before writing the integral, and confirm the field is genuinely constant along that path before proceeding.",
    ],
  },

  "magnetism-and-matter": {
    introduction:
      "Magnetism & Matter shifts focus from current loops as sources of magnetic field to how different materials respond when placed inside an external magnetic field — covering bar magnets and their field pattern, Earth's magnetism and the magnetic elements used to describe it (declination, dip, and horizontal component), and the classification of all materials into diamagnetic, paramagnetic, and ferromagnetic categories based on their magnetic response. Building directly on the previous chapter's result that a current loop behaves like a magnetic dipole, this chapter treats a bar magnet the same way, letting you reuse the same dipole formulas — field along the axis, field along the equator, torque and potential energy in an external field — in a new physical context. The material-classification section is often underappreciated but genuinely important: diamagnetic materials are weakly repelled by a magnetic field, paramagnetic materials are weakly attracted, and ferromagnetic materials are strongly attracted and can retain magnetization even after the external field is removed, and the microscopic reasons behind each behaviour (electron pairing, alignment of atomic magnetic moments, and domain structure respectively) are a frequent source of conceptual exam questions.",
    whyItMatters:
      "This chapter reuses the magnetic dipole framework from Moving Charges & Magnetism in the concrete context of bar magnets and Earth's field, and the diamagnetic/paramagnetic/ferromagnetic classification is a recurring, conceptually-focused topic across NEET and JEE Main.",
    prerequisites: ["Moving Charges & Magnetism (magnetic dipole moment, field due to a current loop)"],
    commonMistakes: [
      "Treating a bar magnet's field formulas as an entirely new set to memorize, rather than recognizing them as the same dipole formulas already learned for a current loop.",
      "Confusing diamagnetic, paramagnetic, and ferromagnetic behaviour — particularly forgetting that diamagnetism is a universal property of all matter, just usually masked by stronger paramagnetic or ferromagnetic effects when present.",
      "Mixing up the three elements of Earth's magnetic field — declination, dip (inclination), and horizontal component — and how they combine to give the total field.",
    ],
    studyStrategy:
      "Study the bar magnet as a magnetic dipole first, explicitly connecting each formula back to the current-loop dipole result from the previous chapter, then Earth's magnetism and its three elements, and finally the diamagnetic/paramagnetic/ferromagnetic classification last, as a largely conceptual closing topic.",
    revisionStrategy:
      "Revise the three material classifications using a simple comparison table — relative permeability, susceptibility sign, behaviour in a field, and a real-world example for each — rather than three separate paragraphs of description.",
    pyqStrategy:
      "Prioritize PYQs on the axial and equatorial field of a bar magnet, and conceptual questions distinguishing diamagnetic, paramagnetic, and ferromagnetic materials by their susceptibility or behaviour — these two formats are the most consistently repeated across years.",
    dppStrategy:
      "Use DPPs on Earth's magnetic field problems specifically, calculating one element (like horizontal component) from the other two, since these numerical setups are less intuitive than the bar-magnet-alone problems and benefit from extra repetition.",
    relatedChapters: [
      { slug: "moving-charges-and-magnetism", reason: "This chapter directly reuses the magnetic dipole moment and dipole field formulas first derived for a current loop in the previous chapter, now applied to bar magnets." },
      { slug: "electric-charges-and-fields", reason: "The magnetic dipole treated here is the direct structural analogue of the electric dipole studied in electrostatics, with matching formulas for field and torque." },
      { slug: "current-electricity", reason: "A magnetic dipole moment is calculated directly from current and area, connecting back to the current concepts developed there." },
      { slug: "gravitation", reason: "Earth's magnetic field is described with a dipole pattern conceptually similar to how Earth's gravitational field is treated, offering a useful structural parallel between the two." },
    ],
    faqs: [
      {
        question: "Is a bar magnet's magnetic field really the same as a current loop's field?",
        answer: "At distances large compared to the magnet or loop's own size, yes — both produce a magnetic dipole field with the identical mathematical form. This is why a bar magnet can be modeled as an equivalent current loop (and vice versa) for the purposes of calculating field, torque, or potential energy at a distance.",
      },
      {
        question: "What's the real difference between diamagnetic, paramagnetic, and ferromagnetic materials?",
        answer: "Diamagnetic materials have no net atomic magnetic moment and are weakly repelled by an external field. Paramagnetic materials have a small net atomic moment that weakly aligns with an external field, giving weak attraction. Ferromagnetic materials have strong, mutually-reinforcing atomic moments organized into domains, giving strong attraction and the ability to retain magnetization even after the external field is removed.",
      },
      {
        question: "Is diamagnetism present in all materials, even paramagnetic and ferromagnetic ones?",
        answer: "Yes — diamagnetism arises from the orbital motion of electrons and is a universal property of all matter. In paramagnetic and ferromagnetic materials, this weak diamagnetic effect is simply overwhelmed by the much stronger paramagnetic or ferromagnetic response, so it isn't noticeable in practice.",
      },
      {
        question: "What are the three elements of Earth's magnetic field?",
        answer: "Declination is the angle between geographic north and the direction a compass needle points (magnetic north). Dip (or inclination) is the angle the field makes with the horizontal at a given location. Horizontal component is the strength of the field's component along the horizontal direction — together, these three fully describe Earth's field at any point.",
      },
      {
        question: "Why does a ferromagnetic material stay magnetized after the external field is removed, but a paramagnetic one doesn't?",
        answer: "In a ferromagnetic material, neighbouring atomic magnetic moments interact strongly enough to stay aligned within regions called domains, even without an external field, which is why the material can retain magnetization. In a paramagnetic material, the alignment of atomic moments depends entirely on the external field to overcome random thermal motion — once the field is removed, thermal agitation quickly randomizes the moments again.",
      },
    ],
    examWeightageNotes:
      "A conceptually-focused chapter tested steadily in NEET and JEE Main, with material classification and Earth's magnetism as the most frequently repeated question formats.",
  },
};
