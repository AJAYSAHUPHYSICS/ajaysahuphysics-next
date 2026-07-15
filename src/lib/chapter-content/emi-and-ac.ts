import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: EMI & AC (Class 12)
// electromagnetic-induction, alternating-current
// ─────────────────────────────────────────────────────────────────

export const emiAndAcContent: Record<string, ChapterContent> = {
  "electromagnetic-induction": {
    introduction:
      "Electromagnetic Induction studies what happens when magnetic flux through a circuit changes with time — the discovery, due to Faraday, that a changing magnetic flux induces an EMF, and Lenz's law, which fixes the direction of that induced EMF by requiring it to oppose the very change producing it. You'll study motional EMF (generated when a conductor moves through a magnetic field), self-inductance and mutual inductance, energy stored in an inductor, and the basic AC generator as a direct application of induction. This chapter is where the static magnetic fields of the previous two chapters become genuinely dynamic, and it's also where energy conservation gets a satisfying, concrete demonstration: Lenz's law isn't an arbitrary extra rule, it's exactly what energy conservation demands, since an induced EMF that reinforced rather than opposed its own cause would let you extract energy from nothing. The self- and mutual-inductance sections deserve careful attention, since they introduce inductance as a genuine circuit property, analogous to how capacitance was introduced earlier, and this analogy is examined explicitly and often in exam questions.",
    whyItMatters:
      "This chapter is the conceptual gateway to Alternating Current, and Lenz's law questions, motional EMF problems, and self/mutual inductance calculations are consistently tested across NEET, JEE Main, and JEE Advanced.",
    prerequisites: ["Moving Charges & Magnetism (magnetic field and flux concepts)", "Current Electricity (circuit analysis, EMF and current relationships)"],
    commonMistakes: [
      "Applying Lenz's law by guessing the direction rather than systematically reasoning about which induced current direction would oppose the actual change in flux.",
      "Confusing self-inductance (a coil's own changing current inducing an EMF in itself) with mutual inductance (one coil's changing current inducing an EMF in a separate, nearby coil).",
      "Forgetting that motional EMF (Blv for a rod moving through a field) and Faraday's law (rate of change of flux) are two ways of calculating the exact same physical effect, not two separate phenomena.",
    ],
    studyStrategy:
      "Study Faraday's law and Lenz's law together first, since they're inseparable in practice, then motional EMF as a specific case, then self and mutual inductance, and finally energy stored in an inductor and the basic AC generator last.",
    revisionStrategy:
      "Revise Lenz's law by working through a handful of scenarios — a magnet approaching a coil, a magnet receding, a rod sliding on rails — and explicitly stating in words why the induced current direction opposes the change, rather than just recalling a memorized direction for each specific case.",
    pyqStrategy:
      "Prioritize PYQs on a conducting rod sliding on rails in a magnetic field (motional EMF, with or without an external resistor) and self-inductance of a solenoid — these two formats are the most consistently repeated across years.",
    dppStrategy:
      "Use DPPs specifically on mutual inductance between two coils in different geometric arrangements, since these are less intuitive than self-inductance problems and benefit from focused, repeated practice.",
    relatedChapters: [
      { slug: "moving-charges-and-magnetism", reason: "The static magnetic fields and flux concepts studied there become time-varying here, which is precisely what induces an EMF." },
      { slug: "current-electricity", reason: "Induced EMF drives induced current through a circuit, analyzed using the same circuit concepts developed in this earlier chapter." },
      { slug: "alternating-current", reason: "The basic AC generator introduced at the end of this chapter is the direct starting point for the detailed study of alternating current that follows." },
      { slug: "electrostatic-potential-and-capacitance", reason: "Energy stored in an inductor's magnetic field is the direct structural parallel to energy stored in a capacitor's electric field, a comparison tested explicitly." },
    ],
    faqs: [
      {
        question: "Why does Lenz's law say the induced current opposes the change, rather than the field itself?",
        answer: "If the induced current instead reinforced the change in flux, the flux would keep increasing on its own, inducing an even larger current, in an unstable runaway that would create energy from nothing. Lenz's law — opposing the change — is what keeps electromagnetic induction consistent with energy conservation.",
      },
      {
        question: "What's the difference between motional EMF and the EMF from Faraday's law?",
        answer: "They're not actually different phenomena — motional EMF (like Blv for a rod moving through a field) is just a special, direct case of Faraday's law, where the flux change happens specifically because the circuit's area is changing as a conductor physically moves. Both describe the same underlying induction, calculated from two equivalent perspectives.",
      },
      {
        question: "What's the real difference between self-inductance and mutual inductance?",
        answer: "Self-inductance describes how a coil's own changing current induces an EMF in itself, opposing the change (a property of a single coil). Mutual inductance describes how a changing current in one coil induces an EMF in a separate, nearby coil, due to the shared magnetic flux linking them both.",
      },
      {
        question: "Why is energy stored in an inductor's magnetic field, not 'used up'?",
        answer: "Just as a capacitor stores energy in the electric field between its plates, an inductor stores energy in the magnetic field created by the current flowing through it. This energy isn't dissipated — it can be recovered, for instance, if the current is later allowed to decrease, with the inductor's induced EMF now doing work on the circuit instead of opposing the current buildup.",
      },
      {
        question: "How does a simple AC generator actually produce a sinusoidal EMF?",
        answer: "As a coil rotates at constant angular velocity in a uniform magnetic field, the flux through it varies as the cosine of the rotation angle, since flux depends on the coil's orientation relative to the field. Since EMF is the rate of change of flux, and the derivative of a cosine is a sine, the induced EMF comes out as a sinusoidal function of time automatically.",
      },
    ],
    examWeightageNotes:
      "Consistently tested across NEET, JEE Main, and JEE Advanced, and serves as the essential conceptual foundation for Alternating Current immediately following it.",
    importantTips: [
      "When applying Lenz's law, always explicitly state what quantity is changing (flux increasing or decreasing) before determining the induced current's direction — skipping this step is the most common source of sign errors.",
      "Remember that motional EMF and Faraday's law give identical answers for the same physical situation — if your two approaches disagree, one of them has an error, not a genuine physical discrepancy.",
    ],
  },

  "alternating-current": {
    introduction:
      "Alternating Current studies circuits where voltage and current vary sinusoidally with time, rather than staying constant as in the DC circuits of Current Electricity. You'll study RMS and peak values of AC voltage and current, the behaviour of resistors, inductors, and capacitors individually and combined in an AC circuit, phase relationships between voltage and current for each element, LCR series circuits and resonance, power in AC circuits including the power factor, and transformers as a practical application of mutual inductance for stepping voltage up or down. This chapter builds directly on Electromagnetic Induction's AC generator and reuses the inductance concepts from that chapter in a new, oscillating context. The central skill this chapter demands is comfort with phasor diagrams — representing sinusoidally varying quantities as rotating vectors — which makes adding voltages across different circuit elements (which peak at different times due to phase differences) far more manageable than working with the underlying trigonometric functions directly. Resonance in an LCR circuit is a particular highlight: at one specific driving frequency, the inductive and capacitive reactances exactly cancel, and current becomes maximum for a given voltage — a genuinely elegant result worth understanding deeply rather than just memorizing the resonance condition.",
    whyItMatters:
      "AC circuits are how electrical power is actually generated, transmitted, and used in the real world, and LCR resonance, transformer, and phase-relationship questions are a reliably high-weightage topic across JEE Main, JEE Advanced, and NEET.",
    prerequisites: ["Electromagnetic Induction (self and mutual inductance, the AC generator)", "Current Electricity (basic circuit analysis and Ohm's law)"],
    commonMistakes: [
      "Adding RMS voltages across different elements directly, without accounting for their phase difference — voltages across a resistor, inductor, and capacitor in series don't simply add arithmetically, since they peak at different times.",
      "Confusing which element causes current to lead voltage (a capacitor) versus lag voltage (an inductor) — these are frequently mixed up under exam pressure.",
      "Assuming resonance in an LCR circuit means impedance is zero, when it actually means impedance is at its MINIMUM (equal to just the resistance), not zero, unless resistance itself happens to be zero.",
    ],
    studyStrategy:
      "Study RMS and peak values first, then each circuit element's individual AC behaviour (resistor, inductor, capacitor) and their phase relationships, then LCR series circuits and resonance, and finally power in AC circuits and transformers last, since those apply everything built earlier.",
    revisionStrategy:
      "Revise phase relationships using a simple mnemonic-free approach: physically reason through why an inductor opposes rapid current changes (so current lags) and why a capacitor's current is largest when voltage is changing fastest (so current leads) — this sticks better than memorizing 'ELI the ICE man' style rules without understanding.",
    pyqStrategy:
      "Prioritize LCR series circuit PYQs asking for impedance, phase angle, or resonant frequency, and transformer PYQs involving turns ratio and current/voltage relationships — these two formats dominate this chapter's exam appearances.",
    dppStrategy:
      "Use DPPs specifically on power factor and average power calculations in AC circuits, since these require correctly combining RMS values with the phase angle, a step that's frequently skipped or miscalculated under time pressure.",
    relatedChapters: [
      { slug: "electromagnetic-induction", reason: "The AC generator, which produces the sinusoidal voltage studied throughout this chapter, is a direct application built in the previous chapter." },
      { slug: "current-electricity", reason: "AC circuit analysis reuses the same resistance and Ohm's law concepts from DC circuit analysis, extended to handle time-varying voltage and current." },
      { slug: "moving-charges-and-magnetism", reason: "An inductor's behaviour in an AC circuit depends directly on the magnetic field and flux concepts first developed in that chapter." },
      { slug: "electromagnetic-waves", reason: "Oscillating LC circuits, a natural extension of the resonance concept in this chapter, are the conceptual starting point for understanding how oscillating charges generate electromagnetic waves." },
    ],
    faqs: [
      {
        question: "Why can't I just add up the RMS voltages across a resistor, inductor, and capacitor in series?",
        answer: "Because voltage across each element reaches its peak at a different time — they're out of phase with each other. Since they can't be added as simple numbers, you have to add them as phasors (vectors), which is why the resultant (impedance-based) voltage is generally less than the arithmetic sum of the individual RMS voltages.",
      },
      {
        question: "Why does current lead voltage in a capacitor but lag voltage in an inductor?",
        answer: "In a capacitor, current is largest exactly when voltage is changing fastest — as the capacitor starts charging from zero voltage, current is at its peak, so current 'gets ahead' of voltage. In an inductor, the induced EMF opposes rapid changes in current, so current builds up gradually behind the applied voltage, making it lag.",
      },
      {
        question: "What actually happens at resonance in an LCR series circuit?",
        answer: "At resonance, the inductive reactance and capacitive reactance are equal in magnitude, and since they act in opposite phase, they exactly cancel each other out. This leaves impedance equal to just the resistance — its minimum possible value — so current becomes maximum for a given applied voltage at that specific frequency.",
      },
      {
        question: "How does a transformer change voltage without violating energy conservation?",
        answer: "An ideal transformer doesn't create energy — it changes voltage and current in inverse proportion to each other, keeping power (voltage times current) approximately constant. A step-up transformer increases voltage but proportionally decreases current, and vice versa for a step-down transformer.",
      },
      {
        question: "What is power factor, and why does it matter?",
        answer: "Power factor is the cosine of the phase angle between voltage and current, and it tells you what fraction of the apparent power (RMS voltage times RMS current) is actually real, usable power delivered to the circuit. A power factor of zero (as in a pure inductor or capacitor) means no net power is consumed at all, despite current still flowing.",
      },
    ],
    examWeightageNotes:
      "A reliably high-weightage chapter across JEE Main, JEE Advanced, and NEET, with LCR resonance and transformer questions being the most consistently tested formats.",
    importantTips: [
      "Always draw the phasor diagram before attempting an LCR circuit problem — trying to reason through phase relationships algebraically without a diagram is a common source of avoidable errors.",
      "Remember resonance minimizes impedance (to just the resistance) rather than making it zero — this distinction is tested directly and often.",
    ],
  },
};
