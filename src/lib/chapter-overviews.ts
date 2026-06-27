export const chapterOverviews: Record<string, string> = {
  // Class 11
  "physical-world-and-measurement":
    "This chapter introduces physics as a way of describing nature through measurement, units, and significant figures. It builds the habit of working with the right precision and dimensional checks — small skills that quietly save marks across every other chapter in JEE and NEET.",
  kinematics:
    "Kinematics is about describing motion — position, velocity, and acceleration — without asking what causes it. Graphs, relative motion, and projectile motion from this chapter show up constantly in JEE Main, JEE Advanced, and NEET as either standalone questions or the first step inside a longer mechanics problem.",
  "laws-of-motion":
    "Newton's three laws and the idea of force finally explain what kinematics only described. Friction, circular motion, and connected-body problems from this chapter are a near-guaranteed presence in both JEE and NEET, and they form the base for almost every later mechanics topic.",
  "work-energy-and-power":
    "This chapter reframes motion in terms of energy instead of force — work, kinetic and potential energy, and the work-energy theorem. It's a favorite for JEE Advanced because it rewards students who can choose the right approach (forces vs. energy) for a tricky problem.",
  "system-of-particles-and-rotational-motion":
    "Rotational motion extends everything learned in linear mechanics to spinning and rolling bodies — torque, moment of inertia, and angular momentum. It's one of the most calculation-heavy chapters in Class 11 and a regular high-weightage topic in JEE Advanced.",
  gravitation:
    "Gravitation connects everyday falling objects to planetary motion, covering Kepler's laws, orbital velocity, and escape velocity. It's conceptually compact but appears reliably in NEET and JEE Main, often as a quick, scoring question if the formulas are clear.",
  "mechanical-properties-of-solids":
    "This chapter covers how solids stretch, compress, and deform — stress, strain, and the elastic moduli. It's a shorter chapter with a handful of direct, formula-based questions that are easy marks once the definitions are clear.",
  "mechanical-properties-of-fluids":
    "Fluids at rest and in motion are covered here — pressure, buoyancy, viscosity, and Bernoulli's principle. NEET in particular draws steadily from this chapter, and the surface tension and viscosity sections are common sources of conceptual questions.",
  "thermal-properties-of-matter":
    "This chapter looks at how matter responds to heat — thermal expansion, specific heat, and modes of heat transfer. It's a reliable, formula-driven scoring chapter, especially for NEET, where direct numerical questions are common.",
  thermodynamics:
    "Thermodynamics introduces the laws governing heat, work, and internal energy, including various thermodynamic processes and engine efficiency. It's a concept-heavy chapter that JEE Advanced often tests through graph-based and multi-step process questions.",
  "kinetic-theory-of-gases":
    "This chapter explains gas behavior — pressure, temperature, and the speed of molecules — using the kinetic theory model. It connects directly to thermodynamics and is tested in both JEE and NEET, often through formula-based numerical questions.",
  oscillations:
    "Oscillations covers periodic motion, with simple harmonic motion (SHM) as the central idea — springs, pendulums, and energy in SHM. It's foundational for the Waves chapter that follows, and SHM-based questions appear consistently across JEE and NEET.",
  waves:
    "This chapter covers wave motion, sound, the Doppler effect, and standing waves in strings and pipes. It builds directly on Oscillations and is a steady contributor to both JEE Main and NEET question papers, often in combination with sound-related real-world scenarios.",
  "circular-motion":
    "Circular motion applies everything from kinematics and Newton's laws to a curved path — centripetal force, banking of roads, conical pendulums, and the three possible outcomes of motion in a vertical circle. It's a high-weightage, formula-rich topic in both JEE Main and JEE Advanced, and vertical circular motion in particular is a favourite source of tricky, multi-step Advanced-level questions.",

  // Class 12
  "electric-charges-and-fields":
    "This chapter opens electromagnetism with electric charge, Coulomb's law, and the concept of electric field, including Gauss's law for symmetric charge distributions. It's foundational for nearly every later electricity and magnetism chapter, making it essential to get right early.",
  "electrostatic-potential-and-capacitance":
    "Building on electric fields, this chapter introduces potential energy, potential difference, and capacitors. Capacitor combination problems and energy-storage questions are a recurring, high-scoring topic in both JEE Main and JEE Advanced.",
  "current-electricity":
    "This chapter covers electric current, resistance, circuits, and Kirchhoff's laws. It's one of the highest-weightage chapters in JEE and NEET, with circuit analysis questions appearing in nearly every major exam paper.",
  "moving-charges-and-magnetism":
    "Here, moving charges and currents are shown to create magnetic fields — covering the Biot-Savart law, Ampere's law, and forces on current-carrying conductors. It's a dense, formula-rich chapter that's consistently tested in JEE Advanced.",
  "magnetism-and-matter":
    "This chapter looks at magnetism more broadly — bar magnets, Earth's magnetism, and how different materials respond to magnetic fields. It's a shorter, more conceptual chapter that complements Moving Charges and Magnetism.",
  "electromagnetic-induction":
    "This chapter explains how changing magnetic fields generate electric currents — Faraday's law, Lenz's law, and self and mutual inductance. It's a core topic for JEE Advanced and sets up the Alternating Current chapter that follows.",
  "alternating-current":
    "AC circuits, phasors, and resonance are the focus here, building directly on electromagnetic induction. It's a calculation-intensive chapter that rewards careful practice, and it appears regularly in JEE Main and Advanced.",
  "electromagnetic-waves":
    "This chapter introduces the electromagnetic spectrum and the nature of EM waves as predicted by Maxwell's equations. It's a relatively short, concept-based chapter that's usually a quick, scoring addition in NEET and JEE Main.",
  "ray-optics-and-optical-instruments":
    "Ray optics covers reflection, refraction, lenses, and mirrors, along with how optical instruments like microscopes and telescopes are built from these principles. It's one of the most heavily tested chapters in NEET and a regular feature in JEE.",
  "wave-optics":
    "This chapter treats light as a wave, covering interference, diffraction, and polarization — including the classic Young's double-slit experiment. It's conceptually distinct from Ray Optics and is a favorite source of tricky, concept-testing questions in JEE Advanced.",
  "dual-nature-of-radiation-and-matter":
    "This chapter introduces the idea that light and matter both behave as particles and waves, covering the photoelectric effect and de Broglie wavelength. It bridges classical and modern physics and is a steady contributor to NEET and JEE Main papers.",
  atoms:
    "This chapter traces the structure of the atom through Rutherford's and Bohr's models, including atomic spectra. It's a compact, formula-driven chapter that pairs closely with Dual Nature and Nuclei for the modern physics portion of the syllabus.",
  nuclei:
    "This chapter covers the nucleus, radioactivity, and nuclear reactions, including binding energy and decay laws. Direct numerical questions from this chapter are common in NEET, and it's a quick scoring opportunity once the decay formulas are familiar.",
  "semiconductor-electronics":
    "This chapter introduces semiconductors, diodes, and basic digital electronics — components that power the devices you use every day. It's a unique, application-focused chapter that closes out the Class 12 syllabus, and it appears reliably in JEE Main.",
};

export function getChapterOverview(slug: string): string {
  return (
    chapterOverviews[slug] ??
    "Detailed overview for this chapter is being written and will be added soon."
  );
}
