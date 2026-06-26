import type { ChapterShortNotes } from "./kinematics-short";

export const electromagneticWavesShortNotes: ChapterShortNotes = {
  chapterName: "Electromagnetic Waves",
  className: "12",
  groups: [
    {
      heading: "History",
      points: [
        "1865: Maxwell predicts EM waves theoretically. 1887: Hertz produces/detects them (λ≈6m), confirming the prediction.",
        "J.C. Bose: produced EM waves of λ 5mm–25mm. 1896: Marconi — antenna+earth ≈ capacitor plates, radiates RF waves over km.",
        "1899: Marconi establishes wireless communication across the English Channel (~50 km).",
      ],
    },
    {
      heading: "Displacement Current",
      points: [
        "I_d = ε₀(dΦ_E/dt) — a changing electric field acts as a current source for B, exactly like a real current.",
        "Total current I = I_c + I_d. Ampère–Maxwell law: ∮B·dl = μ₀(I_c + ε₀dΦ_E/dt).",
        "In a charging capacitor's gap, I_c = 0 but I_d = I (the same as the conduction current in the wires) — displacement current 'completes the circuit' through the gap.",
      ],
    },
    {
      heading: "Maxwell's Four Equations",
      points: [
        "(I) Gauss (electrostatics): ∮E·dS = q/ε₀. (II) Gauss (magnetism): ∮B·dS = 0 (no monopoles).",
        "(III) Faraday's law: ∮E·dl = −dΦ_B/dt. (IV) Ampère–Maxwell: ∮B·dl = μ₀(I_c + ε₀dΦ_E/dt).",
        "(III) and (IV) mirror each other — changing B drives circulating E, changing E (or current) drives circulating B; this mutual regeneration is what lets the wave propagate.",
      ],
    },
    {
      heading: "Hertz's Experiment",
      points: [
        "Induction coil → spherical electrodes with gap (transmitter, ≈LC circuit) → spark at breakdown voltage → oscillatory discharge → radiates EM waves (≈100 MHz).",
        "Receiver: separate loop + spark gap; sparks appear only when receiver's natural frequency matches transmitter's (resonance).",
      ],
    },
    {
      heading: "Properties of EM Waves",
      points: [
        "c = 1/√(μ₀ε₀) = 3×10⁸ m/s in vacuum; E/B = c at every instant; E, B in phase, both ⊥ to each other and to propagation direction (transverse).",
        "E = E_m sin(kx−ωt), B = B_m sin(kx−ωt); ω=2πf, k=2π/λ.",
        "Frequency unchanged across media (only speed & λ change). Source: accelerating/oscillating charge. Obey superposition. E is the 'light vector' (dominant for optical effects).",
      ],
    },
    {
      heading: "Transverse Nature — Proof Sketch",
      points: [
        "Plane wave along x: E, B depend only on x,t. Gauss's law on a small box (no enclosed charge) ⟹ flux through y,z-faces cancels in pairs.",
        "Remaining x-faces ⟹ Eₓ same on both ⟹ static, can't propagate ⟹ Eₓ=0. Same argument ⟹ Bₓ=0. Both fields confined to the plane ⊥ propagation ⟹ transverse.",
      ],
    },
    {
      heading: "Energy, Poynting Vector & Density",
      points: [
        "S = (1/μ₀)(E×B), points along propagation. I_av = E_mB_m/(2μ₀) = ε₀cE_m²/2 = cB_m²/(2μ₀).",
        "u_E = ½ε₀E² = u_B = B²/2μ₀ at every instant — energy split equally between E and B. u_av(total) = ½ε₀E_m² (each field's average share = ¼ε₀E_m²).",
      ],
    },
    {
      heading: "Radiation Pressure",
      points: [
        "Perfectly absorbing surface: P = S/c. Perfectly reflecting surface: P = 2S/c (momentum reversed, not just absorbed).",
      ],
    },
    {
      heading: "The Spectrum — Quick Reference",
      points: [
        "By increasing λ: γ-rays (10⁻¹⁴–10⁻¹⁰m) → X-rays (6×10⁻¹²–10⁻⁹m) → UV (6×10⁻¹⁰–3.8×10⁻⁷m) → visible (3.8×10⁻⁷–7.8×10⁻⁷m) → IR (7.8×10⁻⁷–10⁻³m) → microwaves (10⁻³–0.3m) → radio (0.3m–km).",
        "c = fλ always; higher f ⟹ higher photon energy E=hf ⟹ γ/X-rays ionising & dangerous, radio waves harmless.",
        "Visible sub-bands (short→long λ): violet, blue, green, yellow, orange, red.",
        "Radio sub-bands (short→long λ, high→low f): SHF, UHF, VHF, HF, MF, LF, VLF.",
      ],
    },
    {
      heading: "Sources, Discoverers & Uses",
      points: [
        "γ-rays: radioactive decay (Becquerel/Curie) — nuclear structure studies, medical treatment.",
        "X-rays: high-energy electrons hitting heavy targets (Röntgen) — medical diagnosis, crystal structure, industrial radiography.",
        "UV: ionised gases, sparks, UV lamps (Ritter) — detect adulteration, sterilisation (kills bacteria), signature verification.",
        "Visible: atomic electron transitions, discharge tubes, incandescence (Newton).",
        "IR: electron rearrangement, molecular vibration/rotation, hot bodies (Herschel) — industry, medicine, astronomy, greenhouse effect.",
        "Microwaves: klystron tubes (Hertz) — radar, satellite/telecommunication, molecular structure.",
        "Radio waves: oscillating circuits (Marconi) — radio/TV broadcast.",
      ],
    },
    {
      heading: "Ozone & Greenhouse Effect",
      points: [
        "Ozone layer (stratosphere) absorbs solar UV — protects life from its harmful effects.",
        "Ozone + atmosphere also trap outgoing IR — keeps Earth's surface warm (greenhouse effect). Without this trapping, surface temperature would be much lower.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "EM waves transport energy and momentum, but never charge — a very common 'select the false statement' trap.",
        "Frequency never changes when an EM wave crosses into a new medium — only speed and wavelength do; don't apply v=fλ changes to frequency.",
        "Displacement current isn't a flow of charge at all — it's defined purely from the changing electric flux, ε₀dΦ_E/dt, even though it produces a real magnetic field just like a conduction current would.",
        "Energy density of E and B fields are individually equal at every instant (u_E=u_B) — a wave is never 'mostly electric' or 'mostly magnetic'.",
        "Reflecting surface gets exactly double the radiation pressure of an absorbing one for the same intensity — don't forget the factor of 2.",
        "Order of the spectrum by increasing wavelength is γ→X→UV→visible→IR→microwave→radio; many MCQs test this ordering directly or via 'which has the highest frequency/energy' framing.",
      ],
    },
  ],
};
