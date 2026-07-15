import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: Modern Physics (Class 12)
// dual-nature-of-radiation-and-matter, atoms, nuclei
// ─────────────────────────────────────────────────────────────────

export const modernPhysicsContent: Record<string, ChapterContent> = {
  "dual-nature-of-radiation-and-matter": {
    introduction:
      "Dual Nature of Radiation & Matter introduces the idea that both light and matter show a genuine dual character — behaving as waves in some experiments and as discrete particles in others. You'll study the photoelectric effect, where light striking a metal surface ejects electrons in a way classical wave theory cannot explain, Einstein's photon explanation of it, and de Broglie's hypothesis that even matter, like electrons, has an associated wavelength. The photoelectric effect deserves the most careful attention: its key experimental results — that ejection is instantaneous, that a threshold frequency exists below which no electrons are ejected regardless of intensity, and that stopping potential depends on frequency but not intensity — are exactly the observations Einstein's photon (particle) model explains but the classical wave model of light cannot. This chapter directly resolves the tension left open by Wave Optics: light isn't simply a wave OR a particle, but shows either behaviour depending on the experiment, and de Broglie's hypothesis extends this same duality to matter, giving even everyday objects a wavelength too small to ever notice, while making it genuinely significant for particles as small as electrons.",
    whyItMatters:
      "The photoelectric effect is one of the most conceptually significant and consistently tested topics in modern physics across NEET, JEE Main, and JEE Advanced, and this chapter's resolution of the wave-particle debate is essential conceptual groundwork for the Bohr model in Atoms that follows.",
    prerequisites: ["Wave Optics (establishing light's wave nature, which this chapter directly complicates)", "Electromagnetic Waves (light as a wave with a specific frequency and energy relationship)"],
    commonMistakes: [
      "Believing that increasing light intensity alone can eject electrons below the threshold frequency — intensity affects the NUMBER of photons, not each photon's individual energy, which depends only on frequency.",
      "Confusing stopping potential (which depends only on frequency, not intensity) with photoelectric current (which depends on intensity, at a fixed frequency above threshold).",
      "Assuming de Broglie wavelength is only relevant to electrons — it applies to all matter, but is only practically significant for very small masses, which is why it's discussed almost exclusively in the context of electrons and other subatomic particles.",
    ],
    studyStrategy:
      "Study the experimental observations of the photoelectric effect first, before the explanation, so that Einstein's photon model feels like a genuine solution to a real puzzle rather than an arbitrary rule; then study Einstein's photoelectric equation, and finally de Broglie's matter-wave hypothesis last.",
    revisionStrategy:
      "Revise by listing the specific experimental observations of the photoelectric effect that classical wave theory fails to explain, alongside how Einstein's photon model explains each one — this comparison is exactly how the chapter is most often tested conceptually.",
    pyqStrategy:
      "Prioritize PYQs using Einstein's photoelectric equation to find stopping potential, work function, or threshold frequency from given data, and de Broglie wavelength calculations for accelerated electrons — these two formats are the most consistently repeated.",
    dppStrategy:
      "Use DPPs specifically on graphs relating stopping potential to frequency (whose slope gives Planck's constant and x-intercept gives threshold frequency), since graph-reading questions on this relationship are a frequently tested format.",
    relatedChapters: [
      { slug: "wave-optics", reason: "This chapter directly complicates the purely wave-based picture of light established in Wave Optics, showing light also behaves as discrete particles (photons)." },
      { slug: "atoms", reason: "The photon concept and quantized energy developed here are essential conceptual groundwork for the Bohr model of the atom studied next." },
      { slug: "nuclei", reason: "Mass-energy equivalence, introduced conceptually alongside photon energy here, becomes essential for calculating nuclear binding energy in the Nuclei chapter." },
      { slug: "electromagnetic-waves", reason: "Photon energy (E = hf) is calculated directly from a light wave's frequency, a quantity defined and studied in Electromagnetic Waves." },
    ],
    faqs: [
      {
        question: "Why doesn't increasing the intensity of light eject electrons below the threshold frequency?",
        answer: "In the photon model, light energy arrives in discrete packets (photons), and each photon's energy depends only on frequency, not intensity. Increasing intensity increases the NUMBER of photons arriving per second, but if each individual photon's energy is still below the work function needed to eject an electron, no amount of additional (still-too-weak) photons will help.",
      },
      {
        question: "What's the difference between stopping potential and threshold frequency?",
        answer: "Threshold frequency is the minimum light frequency needed to eject any electrons at all, regardless of intensity. Stopping potential is the minimum reverse voltage needed to stop even the fastest ejected electrons from reaching the collector, once photoemission is already occurring above threshold frequency — it's a measure of the electrons' maximum kinetic energy.",
      },
      {
        question: "Why is the photoelectric effect considered impossible to explain with classical wave theory?",
        answer: "Classical wave theory predicts that a dim light source should still eventually eject electrons if given enough time to accumulate energy, and that a brighter (more intense) light source should always be able to eject electrons at any frequency. Neither prediction matches what's actually observed — ejection is instantaneous or doesn't happen at all, and there's a strict frequency threshold, no matter how intense the light.",
      },
      {
        question: "Does every object really have a de Broglie wavelength?",
        answer: "Yes, in principle — de Broglie's hypothesis applies to all matter. But wavelength is inversely proportional to momentum, so for everyday objects with large mass, the wavelength is astronomically small and completely unobservable. It only becomes practically significant for very light particles like electrons, which is why matter waves are discussed almost exclusively in that context.",
      },
      {
        question: "How is de Broglie wavelength connected to the Bohr model of the atom?",
        answer: "De Broglie's hypothesis provides a physical justification for Bohr's otherwise ad-hoc quantization rule: an electron's allowed orbits are exactly those where the orbit's circumference fits a whole number of de Broglie wavelengths, turning Bohr's quantization condition from an arbitrary assumption into a natural consequence of matter waves.",
      },
    ],
    examWeightageNotes:
      "The photoelectric effect is one of the most consistently tested single topics in modern physics across NEET, JEE Main, and JEE Advanced.",
  },

  atoms: {
    introduction:
      "Atoms traces the historical development of atomic structure — from Thomson's and Rutherford's models, through Rutherford's alpha-particle scattering experiment and its surprising results, to the Bohr model, which successfully explains the hydrogen atom's discrete spectral lines by quantizing electron orbits and angular momentum. You'll study the Bohr model's postulates, the resulting formulas for orbital radius, energy levels, and the specific spectral series (Lyman, Balmer, and others) that hydrogen emits when electrons transition between energy levels. This chapter directly builds on the previous chapter's photon concept, since spectral lines are explained as photons emitted with energy exactly equal to the difference between two quantized energy levels. Rutherford's scattering experiment deserves attention beyond its historical significance: the specific, unexpected result — that a small fraction of alpha particles bounced almost straight back — is precisely what led to the concept of a small, dense, positively charged nucleus, and exam questions frequently test whether you understand why this particular observation ruled out Thomson's earlier 'plum pudding' model rather than just asking you to recall the final nuclear model.",
    whyItMatters:
      "The Bohr model and hydrogen spectral series are consistently and thoroughly tested across NEET, JEE Main, and JEE Advanced, and this chapter's quantized-energy-level framework is the direct conceptual bridge into Nuclei and nuclear energy calculations.",
    prerequisites: ["Dual Nature of Radiation & Matter (photon concept, de Broglie wavelength)", "Electric Charges & Fields (Coulomb's law, used in deriving orbital dynamics)"],
    commonMistakes: [
      "Treating the Bohr model as fully correct rather than as a specific, historically important model that works well for hydrogen-like atoms but has known limitations for more complex atoms.",
      "Confusing which spectral series (Lyman, Balmer, Paschen, etc.) corresponds to transitions ending at which energy level, and in which region of the electromagnetic spectrum each series falls.",
      "Forgetting that energy levels in the Bohr model are negative, with energy approaching zero only as the electron moves to an infinitely large orbit — a sign convention that trips up ionization energy calculations.",
    ],
    studyStrategy:
      "Study Rutherford's scattering experiment and its conclusions first, then the Bohr model's postulates and derived formulas, and finally hydrogen's spectral series last, since correctly identifying transitions between energy levels depends on a solid grasp of the energy-level formula built earlier.",
    revisionStrategy:
      "Revise the spectral series by drawing the hydrogen energy-level diagram from memory and marking where each named series (Lyman, Balmer, Paschen) starts and ends, rather than memorizing a disconnected list of series names and their spectral regions.",
    pyqStrategy:
      "Prioritize PYQs asking for the wavelength or frequency of a specific spectral line transition, and ionization energy calculations, since these two formats make up the large majority of this chapter's numerical questions.",
    dppStrategy:
      "Use DPPs specifically on identifying which spectral series a given transition belongs to, and finding the number of possible spectral lines from a given number of excited energy levels, since these are frequently tested conceptual-numerical hybrid questions.",
    relatedChapters: [
      { slug: "dual-nature-of-radiation-and-matter", reason: "The photon concept from this earlier chapter directly explains spectral lines as photons emitted during transitions between the quantized energy levels studied here." },
      { slug: "nuclei", reason: "Atoms establishes the quantized-energy framework and nuclear charge concepts that Nuclei directly extends to the structure and behaviour of the nucleus itself." },
      { slug: "electromagnetic-waves", reason: "Spectral lines are electromagnetic radiation of a specific frequency, and their classification (visible, ultraviolet, infrared) depends on the EM spectrum studied in that chapter." },
      { slug: "semiconductor-electronics", reason: "The energy band theory of solids, central to how semiconductors work, is a direct extension of the discrete atomic energy levels studied in this chapter to many atoms bonded together." },
    ],
    faqs: [
      {
        question: "Why did Rutherford's scattering experiment rule out Thomson's 'plum pudding' model?",
        answer: "In Thomson's model, positive charge was spread throughout the atom, which couldn't produce enough concentrated electric force to significantly deflect a fast-moving alpha particle. The observation that a small fraction of alpha particles bounced back almost the way they came only makes sense if the atom's positive charge (and most of its mass) is concentrated in a tiny, dense region — the nucleus.",
      },
      {
        question: "Why are the energy levels in the Bohr model negative?",
        answer: "The zero of potential energy is conventionally set at infinite separation between the electron and nucleus. Since the electron is bound to the nucleus (attracted, not free), its total energy at any finite orbit is lower than this zero reference, making it negative. Ionizing the atom means supplying enough energy to raise the electron's energy up to exactly zero.",
      },
      {
        question: "What determines which spectral series a particular transition belongs to?",
        answer: "The series is determined by which energy level the electron transitions DOWN TO. Transitions ending at the first energy level (n=1) belong to the Lyman series, transitions ending at the second level (n=2) belong to the Balmer series, and so on — the starting level can vary, but the ending level defines the series.",
      },
      {
        question: "Does the Bohr model work for atoms other than hydrogen?",
        answer: "It works reasonably well for 'hydrogen-like' ions — atoms stripped down to a single electron, like He⁺ or Li²⁺ — using a modified formula that accounts for the higher nuclear charge. It does not accurately describe multi-electron atoms, where electron-electron interactions make the physics considerably more complex than the Bohr model can capture.",
      },
      {
        question: "How does de Broglie's hypothesis justify Bohr's quantization rule?",
        answer: "Bohr simply assumed angular momentum was quantized, without a physical justification. De Broglie's matter-wave hypothesis, applied afterward, shows that Bohr's allowed orbits are exactly those where the orbit's circumference equals a whole number of the electron's de Broglie wavelengths — turning an assumption into a natural, physically motivated condition.",
      },
    ],
    examWeightageNotes:
      "The Bohr model and hydrogen spectral series are consistently and thoroughly tested across NEET, JEE Main, and JEE Advanced.",
  },

  nuclei: {
    introduction:
      "Nuclei studies the atomic nucleus itself — its composition of protons and neutrons, nuclear size and density, mass defect and binding energy, and the processes of radioactivity and nuclear reactions, including fission and fusion. You'll work with Einstein's mass-energy equivalence to calculate binding energy from the small but significant difference between a nucleus's actual mass and the sum of its individual proton and neutron masses, and study radioactive decay's exponential nature, characterized by half-life. The binding energy per nucleon curve is one of the most conceptually important single graphs in this chapter: it explains why fusion releases energy for light nuclei (moving up the curve toward more stable, higher binding-energy-per-nucleon configurations) while fission releases energy for heavy nuclei (moving down the curve for the same reason), from a single unified principle rather than two separate, unrelated facts to memorize. Radioactive decay's statistical, exponential character — where you can predict the DECAY RATE of a large sample precisely, even though any individual nucleus's exact decay moment is fundamentally unpredictable — is a genuinely important conceptual point that exam questions test both numerically and conceptually.",
    whyItMatters:
      "Binding energy and radioactivity calculations are consistently tested across NEET, JEE Main, and JEE Advanced, and this chapter's mass-energy equivalence directly builds on the photon and matter-wave concepts introduced in Dual Nature of Radiation & Matter.",
    prerequisites: ["Atoms (nuclear charge and quantized structure)", "Dual Nature of Radiation & Matter (mass-energy equivalence, E = mc²)"],
    commonMistakes: [
      "Confusing mass defect (the small difference between a nucleus's actual mass and the sum of its separate nucleon masses) with the nucleus's total mass itself.",
      "Misreading the binding-energy-per-nucleon curve, and not recognizing that BOTH fusion (for light nuclei) and fission (for heavy nuclei) release energy for the same underlying reason: moving toward the curve's peak around iron.",
      "Treating half-life as the time for ALL nuclei in a sample to decay, rather than correctly understanding it as the time for HALF of the remaining sample to decay, repeatedly, in each successive half-life period.",
    ],
    studyStrategy:
      "Study nuclear composition, size, and density first, then mass defect and binding energy, then the binding-energy-per-nucleon curve and what it explains about fission and fusion, and finally radioactive decay and half-life last, as a somewhat separate statistical topic.",
    revisionStrategy:
      "Revise binding energy calculations by working through the full mass-defect-to-binding-energy conversion from scratch each time (using u = 931.5 MeV as the conversion factor), rather than jumping straight to a memorized final binding energy value for common nuclei.",
    pyqStrategy:
      "Prioritize PYQs on binding energy per nucleon calculations and radioactive decay problems involving half-life or the decay constant — these two formats make up the majority of this chapter's numerical questions across all three exams.",
    dppStrategy:
      "Use DPPs specifically on radioactive decay chain problems (where one radioactive nuclide decays into another, which may itself be radioactive), since these multi-step problems are more conceptually demanding than single-nuclide half-life calculations.",
    relatedChapters: [
      { slug: "atoms", reason: "Nuclei directly extends the quantized-structure and nuclear-charge concepts established in the Atoms chapter to the internal structure and behaviour of the nucleus itself." },
      { slug: "dual-nature-of-radiation-and-matter", reason: "Mass-energy equivalence, essential for calculating nuclear binding energy in this chapter, is introduced conceptually in Dual Nature of Radiation & Matter." },
      { slug: "electromagnetic-waves", reason: "Gamma radiation, one of the three main types of radioactive decay studied here, is itself a high-energy electromagnetic wave." },
      { slug: "semiconductor-electronics", reason: "Semiconductor detectors are a practical technology used to detect and measure nuclear radiation, connecting nuclear physics to semiconductor device physics." },
    ],
    faqs: [
      {
        question: "What is mass defect, and why does it matter?",
        answer: "Mass defect is the difference between a nucleus's actual measured mass and the sum of the masses of its individual protons and neutrons if they were separate. This 'missing' mass has been converted into the binding energy holding the nucleus together, via Einstein's mass-energy equivalence — it's a small but measurable and critically important quantity.",
      },
      {
        question: "Why do both fusion and fission release energy, even though they're opposite processes?",
        answer: "Both processes move nuclei toward the peak of the binding-energy-per-nucleon curve, around iron. Light nuclei fusing together increase their binding energy per nucleon (moving up toward the peak from below), while heavy nuclei splitting apart also increase their binding energy per nucleon (moving up toward the peak from above) — both directions release energy because both increase overall stability.",
      },
      {
        question: "Does half-life mean all the radioactive material is gone after two half-lives?",
        answer: "No — after one half-life, half the original sample remains. After a second half-life, half of THAT remaining half decays, leaving a quarter of the original sample, not zero. The sample only approaches zero asymptotically, in principle never quite reaching it, though it becomes negligible after many half-lives.",
      },
      {
        question: "Can you predict when a specific radioactive nucleus will decay?",
        answer: "No — radioactive decay is a fundamentally random, probabilistic process for any individual nucleus. What CAN be predicted precisely is the statistical decay behaviour of a large sample, since with enough nuclei, the law of large numbers makes the overall decay rate extremely predictable even though each individual decay event is not.",
      },
      {
        question: "What's the difference between nuclear fission and nuclear fusion, in terms of what's required to make them happen?",
        answer: "Fission (splitting a heavy nucleus) can be triggered relatively easily, often just by a slow neutron striking a suitable heavy nucleus like uranium-235. Fusion (combining light nuclei) requires overcoming strong electrostatic repulsion between two positively charged nuclei, which needs extremely high temperatures and pressures — like inside stars — to force the nuclei close enough for the strong nuclear force to take over.",
      },
    ],
    examWeightageNotes:
      "Binding energy and radioactive decay (half-life) calculations are consistently tested across NEET, JEE Main, and JEE Advanced.",
  },
};
