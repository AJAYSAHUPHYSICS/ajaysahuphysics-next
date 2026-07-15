import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: Oscillations & Waves (Class 11)
// oscillations, waves
// ─────────────────────────────────────────────────────────────────

export const oscillationsAndWavesContent: Record<string, ChapterContent> = {
  oscillations: {
    introduction:
      "Oscillations covers periodic motion, with simple harmonic motion (SHM) as the central idea — the specific kind of periodic motion where the restoring force (and acceleration) is always proportional to displacement and directed back toward equilibrium. You'll study SHM's equations of motion, energy exchange between kinetic and potential energy during oscillation, springs and pendulums as concrete SHM systems, and damped and forced oscillations, including resonance. The chapter's core skill is recognizing SHM in an unfamiliar physical setup — the mathematics is compact and reusable once you can identify that a given restoring force is linear in displacement, which is what qualifies a system as SHM in the first place. This chapter is foundational for Waves, which follows immediately after and treats a wave as SHM propagating through space, so the two are best thought of as a connected pair rather than separate topics. The energy picture in SHM — where kinetic energy and potential energy continuously trade off, with total energy staying constant — is tested constantly and rewards students who understand it as a single flowing story rather than two separate formulas to memorize independently.",
    whyItMatters:
      "SHM-based questions appear consistently across JEE and NEET, both as direct SHM problems and as the underlying framework for oscillation-adjacent topics elsewhere in the syllabus, and this chapter is the direct prerequisite for Waves.",
    prerequisites: ["Laws of Motion (restoring force analysis)", "Basic Mathematics & Vectors (differentiation, for velocity and acceleration in SHM)"],
    commonMistakes: [
      "Assuming any periodic motion is automatically SHM, without checking that the restoring force is actually proportional to displacement.",
      "Mixing up the phase relationships between displacement, velocity, and acceleration in SHM — velocity leads displacement by 90°, and acceleration is exactly out of phase with displacement.",
      "Forgetting that total mechanical energy in SHM stays constant, and incorrectly assuming kinetic or potential energy alone remains fixed throughout the motion.",
    ],
    studyStrategy:
      "Study the SHM equations of motion and their graphical representation first, then energy in SHM, then specific systems — springs, simple and physical pendulums — and finally damped and forced oscillations, since resonance depends on understanding undamped SHM first.",
    revisionStrategy:
      "Revise by sketching displacement, velocity, and acceleration versus time on the same time axis from memory, checking that their relative phases are correct — this single exercise catches most conceptual gaps in this chapter.",
    pyqStrategy:
      "Spring-combination (series and parallel) and simple-pendulum time-period PYQs are the most repeated formats — prioritize these, along with problems that give velocity or acceleration at a specific displacement and ask for amplitude or time period.",
    dppStrategy:
      "Use DPPs on energy-in-SHM problems specifically, calculating kinetic and potential energy at various points in the cycle, since this numerical skill underlies a large share of both direct and applied SHM questions.",
    relatedChapters: [
      { slug: "waves", reason: "Waves treat wave motion as SHM propagating through space over time — the direct next step after mastering oscillations at a single point." },
      { slug: "circular-motion", reason: "SHM can be derived as the projection of uniform circular motion onto a diameter, giving a geometric way to understand SHM's equations." },
      { slug: "laws-of-motion", reason: "Identifying and analyzing the restoring force in a spring or pendulum system relies directly on the free-body-diagram techniques from Laws of Motion." },
      { slug: "work-energy-and-power", reason: "The continuous exchange between kinetic and potential energy in SHM is a direct application of the energy-conservation framework built in Work-Energy-Power." },
    ],
    faqs: [
      {
        question: "How do I know if a given motion is actually SHM?",
        answer: "Check whether the restoring force (or acceleration) is directly proportional to displacement from equilibrium and always directed back toward it. If the force depends on displacement in any other way — like proportional to displacement squared — the motion is periodic but not SHM.",
      },
      {
        question: "What's the phase relationship between displacement, velocity, and acceleration in SHM?",
        answer: "Velocity leads displacement by a quarter cycle (90°), and acceleration is exactly opposite in phase to displacement (180° out of phase) — meaning acceleration is always directed opposite to displacement, which is exactly what a restoring force requires.",
      },
      {
        question: "Does the time period of a simple pendulum depend on its mass?",
        answer: "No. For a simple pendulum undergoing small-angle oscillations, the time period depends only on its length and the local acceleration due to gravity, not on the mass of the bob — this is a frequently tested conceptual point.",
      },
      {
        question: "What causes resonance in forced oscillations?",
        answer: "Resonance occurs when the frequency of an external driving force matches a system's own natural frequency of oscillation. At this matching frequency, energy is transferred into the system most efficiently, causing the amplitude of oscillation to become very large.",
      },
      {
        question: "Why does total energy in SHM remain constant even though kinetic and potential energy both keep changing?",
        answer: "In ideal (undamped) SHM, only a conservative restoring force acts on the system, so mechanical energy is conserved even as it continuously converts between kinetic and potential forms — the sum of the two stays fixed at every point in the cycle, equal to the total energy set by the amplitude.",
      },
    ],
    examWeightageNotes:
      "A consistent presence across NEET, JEE Main, and JEE Advanced, both as direct SHM questions and as the conceptual foundation tested indirectly through Waves.",
  },

  waves: {
    introduction:
      "Waves covers wave motion, sound, the Doppler effect, and standing waves formed in strings and air columns (pipes). Building directly on Oscillations, this chapter treats a wave as SHM that propagates through a medium over time and space, connecting particle displacement at each point to the same equations studied in the previous chapter, now written as a function of both position and time. You'll study transverse and longitudinal waves, the principle of superposition (which explains both beats and standing waves), and how the Doppler effect shifts observed frequency when a source or observer is moving. The major concepts to master are the wave equation itself, the distinct standing-wave patterns and allowed frequencies (harmonics) in closed versus open pipes, and correctly identifying which velocities (source, observer, medium) enter a Doppler effect calculation and with which sign. This chapter often combines ideas from several earlier chapters at once — SHM from Oscillations, and occasionally kinematics and gas properties — making it a genuinely synthesizing topic near the end of the mechanics-and-matter portion of Class 11.",
    whyItMatters:
      "This chapter builds directly on Oscillations and is a steady, reliable contributor to both JEE Main and NEET question papers, frequently combining sound-related real-world scenarios with the mathematical framework built in the previous chapter.",
    prerequisites: ["Oscillations (SHM equations, applied here as a function of position and time)", "Kinetic Theory of Gases (for the temperature-dependence of the speed of sound)"],
    commonMistakes: [
      "Mixing up the boundary conditions for standing waves in a closed pipe (only odd harmonics) versus an open pipe (all harmonics), leading to wrong frequency calculations.",
      "Getting the sign convention wrong in the Doppler effect formula — whether the source or observer is moving toward or away from the other determines whether a term adds or subtracts in the denominator or numerator.",
      "Confusing beat frequency with the actual frequencies of the two interfering waves, rather than recognizing it specifically as their difference.",
    ],
    studyStrategy:
      "Study the wave equation and basic wave properties first, then superposition and beats, then standing waves in strings and pipes, and finally the Doppler effect last, since it builds on the wave-speed concepts from earlier in the chapter.",
    revisionStrategy:
      "Revise standing-wave patterns by redrawing the harmonic series for closed and open pipes side by side from memory, since the visual pattern (which harmonics are allowed) is easier to misremember than to re-derive from the boundary conditions.",
    pyqStrategy:
      "Doppler effect PYQs involving a moving source AND a moving observer simultaneously are a common, higher-difficulty format — practice setting up the general formula correctly before substituting specific directions.",
    dppStrategy:
      "Use DPPs on standing-wave frequency problems in pipes specifically, alternating between closed and open pipe setups, until you no longer need to pause and recall which harmonics are allowed in each case.",
    relatedChapters: [
      { slug: "oscillations", reason: "Waves are SHM propagating through space — every point on a wave undergoes the same oscillatory motion studied in the previous chapter." },
      { slug: "kinetic-theory-of-gases", reason: "The speed of sound in a gas is derived using the same kinetic-theory framework that gives the rms speed of gas molecules." },
      { slug: "electromagnetic-waves", reason: "Electromagnetic waves revisit the same wave-equation framework introduced here, applied to oscillating electric and magnetic fields instead of a mechanical medium." },
      { slug: "circular-motion", reason: "The phase and angular frequency description used throughout wave equations is the same rotating-vector (phasor) representation used to describe circular motion." },
    ],
    faqs: [
      {
        question: "What's the actual difference between a transverse and a longitudinal wave?",
        answer: "In a transverse wave, particles of the medium oscillate perpendicular to the direction the wave travels — like a wave on a string. In a longitudinal wave, particles oscillate parallel to the direction of travel, through compressions and rarefactions — like sound waves in air.",
      },
      {
        question: "Why does a closed pipe only produce odd harmonics, while an open pipe produces all harmonics?",
        answer: "A closed end must be a displacement node (particles can't move there), while an open end must be a displacement antinode. These boundary conditions only allow odd-numbered harmonics to fit in a closed pipe, while an open pipe's symmetric antinode-antinode boundary allows every harmonic, both odd and even.",
      },
      {
        question: "What causes beats, and how is beat frequency calculated?",
        answer: "Beats occur when two sound waves of slightly different frequencies interfere, causing the resulting intensity to periodically rise and fall. The beat frequency equals the simple difference between the two individual frequencies — not their sum or average.",
      },
      {
        question: "Does the Doppler effect change the actual speed of sound?",
        answer: "No — the speed of sound in the medium stays the same. What changes is the observed FREQUENCY (and correspondingly, wavelength), because the relative motion between source and observer changes how many wave crests reach the observer per second.",
      },
      {
        question: "Why does the speed of sound depend on temperature but not on pressure (for an ideal gas)?",
        answer: "The speed of sound formula for an ideal gas works out to depend on temperature and the gas's molar mass, but pressure and density cancel out of the expression when you substitute the ideal gas law in — so at a fixed temperature, changing pressure alone doesn't change the speed of sound.",
      },
    ],
    examWeightageNotes:
      "A steady, reliable contributor to both JEE Main and NEET, with standing waves in pipes/strings and the Doppler effect being particularly frequent question formats.",
    importantTips: [
      "For any standing-wave problem, identify the boundary conditions (open or closed ends) before writing any frequency formula — this determines the entire harmonic series available.",
      "In Doppler effect problems, always draw a quick diagram showing the direction of motion of the source and observer before substituting into the formula, to get the signs right.",
    ],
  },
};
