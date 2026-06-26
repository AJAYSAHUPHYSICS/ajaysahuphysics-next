import type { ChapterShortNotes } from "./kinematics-short";

export const dualNatureOfRadiationAndMatterShortNotes: ChapterShortNotes = {
  chapterName: "Dual Nature of Radiation & Matter",
  className: "12",
  groups: [
    {
      heading: "Photoelectric Effect — Basics",
      points: [
        "Hertz discovered it; Lenard gave its experimental laws; Einstein explained it via quantum theory (Nobel Prize).",
        "Hallwachs: charged Zn plate loses negative charge / gains positive charge under UV — proves negative particles emitted.",
        "Work function φ₀ = minimum energy to free an electron from a metal surface; depends on metal & surface condition.",
        "Emission types: thermionic (heat), field (strong E ~10⁸ V/m), photoelectric (light of suitable ν).",
      ],
    },
    {
      heading: "Photon — Energy, Momentum, Mass",
      points: [
        "E = hν = hc/λ = 12400/λ(Å) eV [hc=12400 eV·Å]. p = E/c = h/λ. m(effective) = E/c² = h/(cλ) ∝ 1/λ.",
        "Violet photon (shorter λ) has greater effective mass than red photon. Rest mass of photon = 0 always.",
        "Intensity I = P/A = n(hν)/A ⟹ photon flux n = P/(hν) = Pλ/(hc) ≈ (5×10²⁴ J⁻¹m⁻¹)Pλ.",
        "I ∝ photons/s ∝ photoelectrons/s ∝ photocurrent ∝ 1/d² (point source).",
      ],
    },
    {
      heading: "Radiation Force & Pressure",
      points: [
        "Reflecting surface (normal incidence): F = 2P/c, Pressure = 2I/c.",
        "Absorbing surface (normal incidence): F = P/c, Pressure = I/c. (Reflecting = 2× absorbing, since Δp doubles vs. just vanishing.)",
      ],
    },
    {
      heading: "Lenard's Experiment — Key Observations",
      points: [
        "Stopping potential V₀: minimum reverse potential making i_p = 0. K_max = eV₀.",
        "↑Intensity (fixed ν): i_s (saturation current) ↑ proportionally; V₀ unchanged.",
        "↑Frequency (fixed I): V₀ ↑; i_s essentially unchanged.",
        "Threshold frequency ν₀: minimum ν for any emission, regardless of intensity. Threshold wavelength λ₀ = corresponding max λ.",
        "No time lag (≲10⁻⁹s) — instantaneous emission, even for very dim light. V₀ independent of source–surface distance.",
        "UV ejects electrons from any metal; visible light only from alkali metals (low φ₀).",
      ],
    },
    {
      heading: "Failure of Wave Theory",
      points: [
        "(i) Predicts time lag for energy accumulation — none observed. (ii) Predicts V₀ ∝ intensity — V₀ is intensity-independent. (iii) Predicts no threshold frequency should exist — one always does.",
      ],
    },
    {
      heading: "Einstein's Photoelectric Equation",
      points: [
        "hν = K_max + φ₀ + Q (Q=0 ⟹ max KE). K_max = hν − φ₀ ⟺ eV₀ = hν − hν₀.",
        "Threshold: hν₀ = φ₀ = hc/λ₀ = 12400/λ₀(Å) eV. Need hν > φ₀ (ν>ν₀) for any emission — KE can't be negative.",
        "i_s ∝ I (more photons ⟹ more photoelectrons/s) but K_max, V₀ depend only on ν, not I — single-photon-single-electron interaction explains all 3 wave-theory failures at once.",
      ],
    },
    {
      heading: "Graphs (K.E.max vs ν, V₀ vs ν)",
      points: [
        "K_max = hν−φ₀ (slope h, same for all metals; y-intercept −φ₀ varies by metal).",
        "V₀ = (h/e)ν − φ₀/e (slope h/e, same for all metals). Larger φ₀ ⟹ larger ν₀, more negative intercept, same slope.",
        "Classic method to measure h: plot V₀ vs ν for one metal, slope × e = h.",
      ],
    },
    {
      heading: "Quantum Efficiency & Current",
      points: [
        "η = n_e/n_ph (≤1, i.e. ≤100%). If η=x%, n_e = (x/100)n_ph, with n_ph = Pλ/(hc).",
        "Photoelectric current I_e = n_e × e = 1.6×10⁻¹⁹ n_e.",
      ],
    },
    {
      heading: "Compton & Raman Effect",
      points: [
        "Compton: high-energy photon (X/γ-ray) scatters off free/loose electron, loses energy ⟹ λ increases — confirms photon momentum.",
        "Raman: inelastic scattering of visible light by molecules of a transparent medium ⟹ λ increases or decreases.",
        "Together with photoelectric effect — the 3 pillars of evidence for particle nature of light.",
      ],
    },
    {
      heading: "Photocell",
      points: [
        "Evacuated sealed tube, anode + concave photo-emissive cathode (e.g. Cs). Light (ν>ν₀) → photoelectrons → anode → current; current ∝ intensity, stops if light stops.",
        "Uses: TV camera tubes, automatic doors, burglar alarms, automatic street-light/traffic-signal switching.",
      ],
    },
    {
      heading: "Dual Nature of Light",
      points: [
        "Wave nature: reflection, refraction, interference, diffraction. Particle nature: photoelectric effect, Compton effect, pair production/annihilation.",
        "Which nature shows up depends on the experiment — never both simultaneously in one experiment (complementarity).",
      ],
    },
    {
      heading: "de Broglie Wavelength",
      points: [
        "General: λ = h/p = h/(mv) = h/√(2mE). Macroscopic objects: λ~10⁻²⁴Å (unobservable). Microscopic particles: λ~10⁻¹⁰m (X-ray range, observable).",
        "Charged particle through potential V: λ = h/√(2mqV). Electron specifically: λ = 12.27/√V Å ⟹ λ∝1/√V.",
        "Voltage to stop electron of wavelength λ: V = 150.6/λ²(Å) volts.",
        "Uncharged/thermal particle at temp T: λ = h/√(3mkT), from E=(3/2)kT.",
        "λ∝1/√V: quadrupling V only halves λ — common trap.",
      ],
    },
    {
      heading: "Davisson–Germer Experiment",
      points: [
        "Electron gun → Ni crystal (acts as 3D diffraction grating) → detector measures intensity vs angle.",
        "Sharp intensity maximum at V=54V, diffraction angle φ=50°.",
        "Experimental λ (Bragg analysis) = 1.65 Å; de Broglie prediction (12.27/√54) = 1.66 Å — near-exact match confirms matter waves.",
        "Bragg's eqn: 2d sinθ = nλ or D sinφ = nλ. Relation: φ = 180°−2θ ⟺ θ = 90°−φ/2. (d = interplanar spacing, D = interatomic spacing in plane.)",
      ],
    },
    {
      heading: "Bohr Quantisation via de Broglie",
      points: [
        "Electron orbit = standing matter wave; stable orbit needs whole number of wavelengths around it: 2πr = nλ.",
        "Substitute λ=h/mv ⟹ mvr = nh/2π — Bohr's quantisation condition, now derived rather than assumed.",
      ],
    },
    {
      heading: "Wave Packets & Wave Function",
      points: [
        "Δp=0 ⟹ single exact λ=h/p but particle's position fully undetermined (Δx→∞) — consistent with uncertainty principle.",
        "Localised particle (Δx finite) ⟹ superposition of many λ's centred on h/p ⟹ wave packet (Δp finite too).",
        "ψ = wave function (complex); |ψ|²(ΔV) = probability of finding particle in ΔV (Max Born). ψ itself has no direct physical meaning.",
        "Phase velocity of matter wave: no physical significance. Group velocity of wave packet = actual particle velocity (this one is physically meaningful).",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Don't confuse 'light absorbed in units of hν' with 'light consists of particles each of energy hν' — the photoelectric effect strictly only establishes the former.",
        "Stopping potential depends on ν, NOT on intensity or source distance — a very frequently inverted fact in MCQs.",
        "λ ∝ 1/√V for accelerated charged particles — don't assume direct proportionality.",
        "Effective mass of photon ∝ 1/λ, but REST mass of a photon is always exactly zero — never negative or nonzero at rest.",
        "Reflecting-surface radiation force is 2× absorbing-surface force for the same power — easy to drop the factor of 2.",
        "K_max = hν − φ₀ uses the ACTUAL incident frequency; φ₀ = hν₀ uses the THRESHOLD frequency — don't swap them in a calculation.",
      ],
    },
  ],
};
