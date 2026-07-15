import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Electromagnetic Waves (Class 12)
//
// Added separately from the originally-planned cluster list — a
// fresh-clone verification pass after the Optics/Modern Physics/
// Semiconductor Physics batch found that "Electromagnetic Waves"
// (Class 12, Chapter 8) was never assigned to any named cluster
// across the whole Milestone M7 build-out, despite six other
// chapters (Waves, Alternating Current, Ray Optics, Wave Optics,
// Dual Nature, Nuclei) already linking to it as a relatedChapter.
// Added now so the registry is genuinely complete at 30/30, not 29/30.
// ─────────────────────────────────────────────────────────────────

export const electromagneticWavesContent: Record<string, ChapterContent> = {
  "electromagnetic-waves": {
    introduction:
      "Electromagnetic Waves studies how oscillating electric and magnetic fields, linked through Maxwell's equations, propagate through space as self-sustaining waves that need no medium at all — unlike the mechanical waves studied earlier in Class 11. You'll study the qualitative idea of displacement current, which completes Maxwell's equations and predicts that a changing electric field itself acts as a source of magnetic field, the basic properties of electromagnetic waves (transverse nature, the fixed ratio between electric and magnetic field amplitudes, and propagation at the speed of light), and the electromagnetic spectrum, from radio waves through microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays. This is a comparatively short, conceptual chapter rather than a calculation-heavy one, and its main achievement is unifying electricity, magnetism, and optics into a single framework — showing that light itself is simply an electromagnetic wave in a particular frequency range, which is exactly the fact that Wave Optics and Ray Optics rely on without re-deriving. The electromagnetic spectrum's practical applications — which wavelength range is used for which real-world purpose, from radio communication to medical imaging — are tested more often than any single formula in this chapter.",
    whyItMatters:
      "This chapter conceptually unifies electricity, magnetism, and optics by establishing light as an electromagnetic wave, and it's tested consistently, if less numerically, across NEET, JEE Main, and JEE Advanced, with the electromagnetic spectrum's properties and applications a recurring conceptual focus.",
    prerequisites: ["Electromagnetic Induction (changing magnetic flux inducing EMF)", "Alternating Current (oscillating fields and circuits, as a conceptual lead-in to wave generation)"],
    commonMistakes: [
      "Assuming electromagnetic waves need a medium to travel through, carrying over intuition from mechanical waves studied in Class 11 — electromagnetic waves propagate through vacuum just as well as through a medium.",
      "Forgetting that in an electromagnetic wave, the electric field, magnetic field, and direction of propagation are all mutually perpendicular to each other.",
      "Mixing up the order of the electromagnetic spectrum by wavelength or frequency, or misremembering which type of electromagnetic radiation is used for a specific practical application.",
    ],
    studyStrategy:
      "Study the qualitative concept of displacement current and how it completes Maxwell's equations first, then the basic properties of electromagnetic waves, and finally the electromagnetic spectrum and its applications last, since that section is best learned once the underlying wave properties are already clear.",
    revisionStrategy:
      "Revise the electromagnetic spectrum by redrawing it from memory in order of increasing frequency (or decreasing wavelength), labelling each region with at least one real-world application, rather than memorizing wavelength ranges as isolated numbers.",
    pyqStrategy:
      "Prioritize PYQs on identifying which type of electromagnetic wave is used for a specific application (communication, medical imaging, remote sensing) and questions on the relationship between electric field amplitude, magnetic field amplitude, and the speed of light — these are the most frequently repeated formats.",
    dppStrategy:
      "Use DPPs on displacement current concept questions specifically, since this is the chapter's most genuinely novel and most frequently misunderstood idea, benefiting from focused conceptual practice rather than heavy numerical drilling.",
    relatedChapters: [
      { slug: "waves", reason: "Electromagnetic Waves reuses the same general wave-equation framework introduced for mechanical waves, now applied to oscillating electric and magnetic fields instead." },
      { slug: "electromagnetic-induction", reason: "A changing magnetic flux inducing an EMF, the central idea of Electromagnetic Induction, is part of the same Maxwell's-equations framework that predicts electromagnetic wave propagation." },
      { slug: "alternating-current", reason: "Oscillating LC circuits, studied as a source of alternating current, are the conceptual starting point for understanding how oscillating charges generate electromagnetic waves." },
      { slug: "wave-optics", reason: "Wave Optics treats light using the wave properties — interference, diffraction, polarization — that are only fully justified once light is established here as a transverse electromagnetic wave." },
    ],
    faqs: [
      {
        question: "Why don't electromagnetic waves need a medium to travel, unlike sound waves?",
        answer: "Mechanical waves like sound require a physical medium because they propagate through the actual displacement of particles. Electromagnetic waves instead propagate through the mutual regeneration of oscillating electric and magnetic fields — a changing electric field creates a magnetic field, which in turn creates a changing electric field, and so on — a self-sustaining process that requires no material medium at all.",
      },
      {
        question: "What is displacement current, and why was it necessary?",
        answer: "Displacement current is a term Maxwell added to Ampere's law to account for a changing electric field (such as between the plates of a charging capacitor) acting as a source of magnetic field, just as a real conduction current does. Without it, Ampere's law gave inconsistent results for situations involving a changing electric field, such as a charging capacitor — adding displacement current resolved this inconsistency and completed Maxwell's equations.",
      },
      {
        question: "Are the electric and magnetic fields in an electromagnetic wave in phase with each other?",
        answer: "Yes — in a simple plane electromagnetic wave, the electric and magnetic field oscillations are in phase, reaching their maximum and zero values at the same points in space and time, while remaining mutually perpendicular to each other and to the direction the wave travels.",
      },
      {
        question: "What determines where a type of radiation falls in the electromagnetic spectrum?",
        answer: "Purely its frequency (or equivalently, its wavelength, since all electromagnetic waves travel at the same speed in vacuum). Radio waves have the lowest frequency and longest wavelength, while gamma rays have the highest frequency and shortest wavelength, with microwaves, infrared, visible light, ultraviolet, and X-rays falling in order between them.",
      },
      {
        question: "Do all types of electromagnetic radiation travel at the same speed?",
        answer: "Yes, in vacuum — every type of electromagnetic wave, from radio waves to gamma rays, travels at exactly the same speed, the speed of light. They differ from each other only in frequency and wavelength, not in how fast they propagate through vacuum.",
      },
    ],
    examWeightageNotes:
      "A shorter, more conceptual chapter tested consistently but less numerically across NEET, JEE Main, and JEE Advanced, with the electromagnetic spectrum's properties and applications as the most frequent question format.",
  },
};
