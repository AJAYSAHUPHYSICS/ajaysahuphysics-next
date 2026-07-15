import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: Semiconductor Physics (Class 12)
// semiconductor-electronics
// ─────────────────────────────────────────────────────────────────

export const semiconductorPhysicsContent: Record<string, ChapterContent> = {
  "semiconductor-electronics": {
    introduction:
      "Semiconductor Electronics studies materials — silicon and germanium chiefly — whose electrical conductivity lies between that of conductors and insulators, and can be precisely controlled through doping. You'll study energy bands in solids, the classification of conductors, insulators, and semiconductors by band gap, intrinsic versus extrinsic (doped) semiconductors, p-n junction diodes and their behaviour under forward and reverse bias, diode applications including rectification, and a basic introduction to transistors and simple logic gates. This chapter closes out the syllabus by connecting the atomic energy-level concepts from earlier chapters to the practical electronic devices — diodes, transistors — that make modern electronics possible. The p-n junction deserves particular focus: understanding the depletion region, and why forward bias narrows it (allowing current to flow) while reverse bias widens it (blocking current, aside from a small leakage), explains essentially every diode application covered afterward, from simple rectification to LEDs and photodiodes. Doping, too, is worth understanding conceptually rather than as an isolated fact — a small, deliberate impurity concentration changes a semiconductor's conductivity by orders of magnitude, which is precisely what makes semiconductor devices so precisely controllable and technologically useful.",
    whyItMatters:
      "This is a high-weightage, application-focused chapter tested consistently across NEET, JEE Main, and JEE Advanced, and it connects the quantized atomic energy levels studied earlier in the syllabus to the practical electronic devices used throughout modern technology.",
    prerequisites: ["Atoms (energy levels, extended here to energy bands in solids)", "Current Electricity (basic circuit analysis, applied to diode and transistor circuits)"],
    commonMistakes: [
      "Confusing intrinsic semiconductors (pure, undoped) with extrinsic semiconductors (deliberately doped with impurities to control conductivity) and their respectively different charge carrier behaviour.",
      "Getting p-n junction bias direction backwards — forward bias connects the p-side to the positive terminal and the n-side to the negative terminal, narrowing the depletion region and allowing current flow.",
      "Assuming a full-wave rectifier's output is already smooth DC without an additional filter — rectification alone produces a pulsating, unidirectional output, not a genuinely constant voltage.",
    ],
    studyStrategy:
      "Study energy bands and the conductor/insulator/semiconductor classification first, then intrinsic and extrinsic semiconductors, then the p-n junction diode and its biasing behaviour, and finally diode applications (rectifiers) and a basic transistor/logic gate overview last.",
    revisionStrategy:
      "Revise the p-n junction by explaining, in your own words, why forward bias narrows the depletion region while reverse bias widens it — this single mechanism explains nearly every diode-related question in the chapter, and re-deriving it is more useful than memorizing separate facts about forward and reverse bias.",
    pyqStrategy:
      "Prioritize PYQs on p-n junction diode characteristics (V-I curves, forward/reverse bias identification) and half-wave/full-wave rectifier circuits, since these two formats are the most consistently repeated across NEET and JEE.",
    dppStrategy:
      "Use DPPs specifically on identifying doping type (p-type versus n-type) from a given impurity element's valence, and on basic logic gate truth tables, since these conceptual-identification questions are frequently tested but need only modest, focused practice to master.",
    relatedChapters: [
      { slug: "current-electricity", reason: "Diode and transistor circuits are analyzed using the same circuit-analysis foundations — Ohm's law, series-parallel reduction — built in Current Electricity." },
      { slug: "atoms", reason: "Energy band theory, central to explaining why semiconductors conduct the way they do, is a direct extension of the discrete atomic energy levels studied in Atoms to many atoms bonded together in a solid." },
      { slug: "dual-nature-of-radiation-and-matter", reason: "Photodiodes and LEDs, covered as diode applications here, rely directly on the photon-matter interaction concepts introduced in Dual Nature of Radiation & Matter." },
      { slug: "nuclei", reason: "Semiconductor detectors are a practical technology used to detect nuclear radiation, connecting semiconductor device physics back to nuclear physics." },
    ],
    faqs: [
      {
        question: "What's the real difference between an intrinsic and an extrinsic semiconductor?",
        answer: "An intrinsic semiconductor is pure, undoped material — like pure silicon — with a small, roughly equal number of electrons and holes generated purely by thermal energy. An extrinsic semiconductor has been deliberately doped with a small concentration of impurity atoms, dramatically increasing either electron (n-type) or hole (p-type) concentration, and correspondingly increasing conductivity by orders of magnitude.",
      },
      {
        question: "Why does forward bias allow current to flow while reverse bias blocks it?",
        answer: "Forward bias pushes majority charge carriers toward the junction, narrowing the depletion region and lowering the barrier to charge flow, allowing significant current once the barrier potential is overcome. Reverse bias pulls majority carriers away from the junction, widening the depletion region and increasing the barrier, permitting only a tiny leakage current from minority carriers.",
      },
      {
        question: "Why is doping such a small amount of impurity able to change conductivity so dramatically?",
        answer: "Even a very low concentration of dopant atoms — often just one impurity atom per million host atoms — introduces a large number of extra charge carriers (electrons or holes) relative to the very small number of carriers an intrinsic semiconductor generates on its own thermally. This disproportionate impact is exactly what makes semiconductors so useful: conductivity can be precisely tuned across many orders of magnitude with careful, controlled doping.",
      },
      {
        question: "Does a rectifier alone produce smooth, constant DC output?",
        answer: "No — a rectifier (whether half-wave or full-wave) only converts alternating current into a unidirectional but still PULSATING output. Producing genuinely smooth DC requires an additional filter circuit, typically a capacitor, placed after the rectifier to smooth out the remaining voltage fluctuations.",
      },
      {
        question: "How is a transistor able to act as both an amplifier and a switch?",
        answer: "As an amplifier, a transistor operates in its active region, where a small change in base current produces a proportionally much larger change in collector current, achieving signal amplification. As a switch, it's instead operated between two extremes — fully off (cutoff region, no current) and fully on (saturation region, maximum current) — using the same device in a fundamentally different operating mode.",
      },
    ],
    examWeightageNotes:
      "A high-weightage, consistently tested chapter across NEET, JEE Main, and JEE Advanced, with p-n junction diode characteristics and rectifier circuits as the most frequent question formats.",
  },
};
