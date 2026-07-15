import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: Optics (Class 12)
// ray-optics-and-optical-instruments, wave-optics
// ─────────────────────────────────────────────────────────────────

export const opticsContent: Record<string, ChapterContent> = {
  "ray-optics-and-optical-instruments": {
    introduction:
      "Ray Optics & Optical Instruments treats light as travelling in straight-line rays, using this simplified model to study reflection at mirrors, refraction at surfaces and through lenses, total internal reflection, and the combination of multiple optical elements in real instruments like the microscope, telescope, and human eye. You'll work extensively with mirror and lens formulas, magnification, and sign conventions, along with prism dispersion and the specific defects of vision that lenses correct. This is one of the more formula-dense chapters in Class 12, but the formulas themselves are individually straightforward — the real skill is careful, consistent sign convention, since a single sign error early in a multi-lens problem propagates through every subsequent step. Optical instruments deserve focused attention beyond just memorizing their formulas for magnifying power and resolving power, since exam questions frequently test whether you understand WHY a compound microscope or astronomical telescope is built the way it is, not just what its final magnification formula looks like. Total internal reflection is worth understanding conceptually and not just as a formula for critical angle, since it underlies both everyday phenomena and technology like optical fibres.",
    whyItMatters:
      "This chapter is consistently tested across NEET, JEE Main, and JEE Advanced, with multi-lens/mirror combination problems and optical instrument questions being reliable, high-frequency formats that reward careful sign-convention discipline over raw formula recall.",
    prerequisites: ["Basic Mathematics & Vectors (geometry and trigonometry for ray diagrams)"],
    commonMistakes: [
      "Losing track of sign convention partway through a multi-element (multiple lens or mirror) problem, causing an error that isn't obvious until the final answer looks physically unreasonable.",
      "Confusing real and virtual images, or forgetting that a virtual image cannot be captured on a screen even though it can still be seen and used as an object for a subsequent optical element.",
      "Applying the lens/mirror formula without first drawing even a rough ray diagram, missing an intuitive check that would have caught an otherwise unnoticed sign or setup error.",
    ],
    studyStrategy:
      "Study reflection and refraction at single surfaces first, building strict sign-convention habits early, then lens and mirror formulas, then prism and dispersion, and finally optical instruments last, since those combine multiple elements using everything studied before.",
    revisionStrategy:
      "Revise by re-solving a handful of multi-lens combination problems from scratch, focused specifically on maintaining sign convention consistently from the first step to the last, rather than reviewing final answers alone.",
    pyqStrategy:
      "Prioritize PYQs combining two or more optical elements (lens-mirror combinations, or a lens system used inside a described instrument) — these compound problems are more common and more differentiating than single-element ones.",
    dppStrategy:
      "Use DPPs specifically on optical instrument magnifying-power derivations (compound microscope, astronomical telescope in normal adjustment) since understanding where each formula comes from prevents errors when a question varies the standard setup.",
    relatedChapters: [
      { slug: "wave-optics", reason: "Wave Optics provides the more fundamental wave-based explanation for phenomena that Ray Optics treats using the simplified straight-line ray model." },
      { slug: "electromagnetic-waves", reason: "Light, the subject of this entire chapter, is itself an electromagnetic wave, a fact made explicit in the Electromagnetic Waves chapter." },
      { slug: "dual-nature-of-radiation-and-matter", reason: "The resolving power of optical instruments, covered here, depends on light's wavelength, directly connecting to the wave-particle duality of light explored in that chapter." },
      { slug: "atoms", reason: "Prism dispersion and spectrometers, used to analyze light in this chapter, are the practical tools used to study atomic spectra in the Atoms chapter." },
    ],
    faqs: [
      {
        question: "Why does a small sign error in a multi-lens problem cause such big issues?",
        answer: "Because each optical element's output image becomes the next element's object, an error in sign or position at the first element carries through and compounds at every subsequent step. This is why disciplined, consistent sign convention from the very first line of working matters more in this chapter than almost any other.",
      },
      {
        question: "What's the actual difference between a real image and a virtual image?",
        answer: "A real image forms where light rays actually converge and can be captured on a screen. A virtual image forms where light rays only APPEAR to diverge from, when traced backward — no light actually passes through that point, so it can't be captured on a screen, though it can still be seen by an eye or used as an object for another optical element.",
      },
      {
        question: "Why do optical fibres rely on total internal reflection rather than ordinary reflection?",
        answer: "Total internal reflection, unlike reflection from a mirror, reflects nearly 100% of the light with no absorption loss at a mirrored surface, which matters enormously over the long distances light travels inside an optical fibre. It occurs naturally at the fibre's core-cladding boundary whenever light hits it at an angle greater than the critical angle, with no separate reflective coating needed.",
      },
      {
        question: "Why does a compound microscope use two lenses instead of just one?",
        answer: "A single lens (simple magnifier) has a practical limit to useful magnification. A compound microscope's objective lens first forms a real, enlarged image of the object, which the eyepiece then further magnifies as if it were a simple magnifier — this two-stage magnification achieves much higher total magnification than either lens could alone.",
      },
      {
        question: "What determines the resolving power of a telescope or microscope?",
        answer: "Resolving power — the ability to distinguish two closely spaced objects as separate — depends on the wavelength of light used and the aperture (diameter) of the objective lens or mirror. A larger aperture and shorter wavelength both improve resolving power, which is why large telescopes use big mirrors and some microscopy techniques use shorter-wavelength light.",
      },
    ],
    examWeightageNotes:
      "Consistently tested across NEET, JEE Main, and JEE Advanced, with multi-element combination problems and optical instrument questions among the most frequent, high-value formats.",
    importantTips: [
      "Fix a single sign convention at the start of every problem and write it down if needed — don't switch conventions mid-problem even if a later step seems to suggest an easier shortcut.",
      "Draw at least a rough ray diagram before applying any formula — it catches a large share of sign and setup errors before they propagate through a multi-step calculation.",
    ],
  },

  "wave-optics": {
    introduction:
      "Wave Optics returns to the wave nature of light, explaining phenomena that the straight-line ray model of the previous chapter simply cannot account for — interference (Young's double-slit experiment), diffraction, and polarization. You'll study the conditions for constructive and destructive interference, fringe width and its dependence on wavelength and slit geometry, single-slit diffraction and how its central maximum differs from the sharp fringes of interference, and polarization as evidence that light is a transverse wave. This chapter directly extends the general wave concepts from the Class 11 Waves chapter, now applied specifically to light, and the young's double-slit experiment in particular is treated with a level of numerical and conceptual depth that makes it one of the most reliably tested single experiments in the entire syllabus. A recurring point of confusion worth resolving early is the distinction between interference and diffraction: interference is the superposition of light from two (or more) distinct coherent sources, while diffraction is the spreading and self-interference of light from a single slit or obstacle — they're related phenomena but conceptually and mathematically distinct, and exam questions frequently test this distinction directly.",
    whyItMatters:
      "Young's double-slit experiment is one of the most consistently and thoroughly tested single topics across JEE Main, JEE Advanced, and NEET, and polarization concepts round out this chapter's role in demonstrating light's fundamentally wave-like behaviour.",
    prerequisites: ["Waves (general wave concepts: superposition, interference, the wave equation)", "Ray Optics & Optical Instruments (as a contrasting model of light behaviour)"],
    commonMistakes: [
      "Confusing interference (from two coherent sources) with diffraction (from a single slit or obstacle) — they produce visually similar-looking fringe patterns but arise from different physical mechanisms and have different governing formulas.",
      "Forgetting that coherent sources must have a constant phase difference, and that two independent light sources (like two separate bulbs) essentially never produce a stable, visible interference pattern in practice.",
      "Mixing up the conditions for constructive and destructive interference — path difference as an integer multiple of wavelength gives constructive interference, while a half-integer multiple gives destructive.",
    ],
    studyStrategy:
      "Study Young's double-slit experiment thoroughly first, including fringe width and the effect of changing wavelength or slit separation, then single-slit diffraction as a contrasting case, and finally polarization last, as a more conceptually self-contained topic.",
    revisionStrategy:
      "Revise the interference-versus-diffraction distinction using a direct side-by-side comparison — number of sources, fringe width formula, and relative brightness pattern — since this comparison itself is a common, direct exam question.",
    pyqStrategy:
      "Prioritize Young's double-slit experiment PYQs involving a change in one parameter (wavelength, slit separation, or screen distance) and asking for the resulting change in fringe width — this is the single most repeated numerical format in the chapter.",
    dppStrategy:
      "Use DPPs on problems that introduce a thin film or slab into one arm of a double-slit setup, shifting the fringe pattern, since this variation on the standard YDSE setup is a common way exams add difficulty to an otherwise familiar problem.",
    relatedChapters: [
      { slug: "waves", reason: "Wave Optics directly extends the general wave concepts — superposition, interference, the wave equation — first developed for mechanical waves in this earlier chapter." },
      { slug: "ray-optics-and-optical-instruments", reason: "Wave Optics provides the deeper, wave-based explanation for light behaviour that Ray Optics treats using a simplified straight-line ray model." },
      { slug: "electromagnetic-waves", reason: "Light's classification as a transverse electromagnetic wave, central to explaining polarization in this chapter, is established explicitly in Electromagnetic Waves." },
      { slug: "dual-nature-of-radiation-and-matter", reason: "This chapter's thorough demonstration of light's wave nature sets up the conceptual tension resolved in Dual Nature, which shows light also behaves as particles (photons)." },
    ],
    faqs: [
      {
        question: "What's the real difference between interference and diffraction?",
        answer: "Interference results from the superposition of light waves from two or more distinct coherent sources (like the two slits in Young's experiment). Diffraction results from the spreading and self-interference of light passing through or around a single slit or obstacle. Both rely on the same underlying superposition principle, but the physical setup and resulting formulas differ.",
      },
      {
        question: "Why do we need coherent sources for a stable interference pattern?",
        answer: "Coherent sources maintain a constant phase relationship with each other over time. If the phase relationship between two sources kept randomly changing, as it does for two independent light bulbs, the interference pattern would shift too rapidly to observe, averaging out to uniform illumination instead of a visible fringe pattern.",
      },
      {
        question: "How does fringe width change if the wavelength of light is increased?",
        answer: "Fringe width is directly proportional to wavelength, so increasing wavelength increases fringe width — the fringes get wider and more spread apart. This is why using red light (longer wavelength) instead of blue light (shorter wavelength) produces visibly wider fringes in a double-slit setup.",
      },
      {
        question: "Why is the central maximum in single-slit diffraction different from a simple interference fringe?",
        answer: "In single-slit diffraction, the central maximum is significantly BRIGHTER and WIDER than the secondary maxima on either side, unlike interference fringes from a double slit, which are all roughly equal in width and intensity. This asymmetric, dominant central maximum is one of diffraction's distinguishing signatures.",
      },
      {
        question: "What does polarization actually prove about the nature of light?",
        answer: "Polarization can only occur for transverse waves, where the oscillation is perpendicular to the direction of travel — a longitudinal wave, like sound, cannot be polarized at all. The fact that light CAN be polarized is direct experimental evidence that light is a transverse wave, not a longitudinal one.",
      },
    ],
    examWeightageNotes:
      "Young's double-slit experiment is one of the most thoroughly and consistently tested single topics across all three major exams; polarization is tested more conceptually and less numerically.",
  },
};
