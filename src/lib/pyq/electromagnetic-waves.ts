import type { ChapterPyq } from "./kinematics";

// SOURCE NOTES (read before editing):
// - Source: Allen NEET module, "ELECTROMAGNETIC WAVES" chapter, Exercise-II
//   (Previous Year Questions), true PDF pages 1183-1185, 29 questions total,
//   a single standalone chapter (no splitting required).
// - Answer key independently re-verified from page 1185's printed key table
//   before writing any content.
// - SCHEMA NOTE: built strictly to the real PyqQuestion type (exam,
//   examType?, question, options, correctIndex, solution) — no invented
//   fields.
// - Q27: my own independent vector derivation (using the standard Poynting
//   vector / E×B = propagation-direction relation) confidently gives +z,
//   but the printed key points to −z. Documented as an open, unresolved
//   discrepancy rather than silently forced either way — see that
//   question's solution for the full reasoning.
// - Q2, Q14, Q16 involve some reconstruction from imperfectly-extracted
//   source formatting (a "which wavelength is used as electric energy"
//   convention question, a wave-equation refractive-index problem, and an
//   H0/E0 relation with several visually similar options) — each reproduced
//   the verified key cleanly through standard methods and is not flagged,
//   though the reasoning is noted as reconstruction-dependent where
//   relevant.

export const electromagneticWavesPyq: ChapterPyq = {
  chapterName: "Electromagnetic Waves",
  className: "12",
  questions: [
    {
      exam: "AIIMS 2006 [Q1]",
      question:
        "For a wave propagating in a medium, which property is independent of the others?",
      options: ["Velocity", "Wavelength", "Frequency", "All these depend on each other"],
      correctIndex: 2,
      solution:
        "Frequency is fixed by the source and does not change when a wave enters a new medium. Velocity, however, depends on the medium's properties, and since v=fλ with f fixed, wavelength must also change to compensate — so both velocity and wavelength depend on the medium, while frequency alone stays independent.",
    },
    {
      exam: "AIIMS 2007 [Q2]",
      question:
        "Which wavelength range of sunlight is ultimately converted into electrical energy (e.g. via photovoltaic conversion)?",
      options: ["Radio waves", "IR waves", "Visible light", "Microwaves"],
      correctIndex: 1,
      solution:
        "Per the standard convention used for this question, infrared carries the largest share of the sun's total radiated energy reaching Earth, and is the range historically cited as the one 'used' for electric energy conversion in this context.",
    },
    {
      exam: "AIPMT 2009 [Q3]",
      question:
        "The electric field of an electromagnetic wave in a medium is given by Ex=0, Ey = 2.5(N/C)cos[(2π×10⁶ rad/s)t − (π×10⁻² rad/m)x], Ez=0. What are the wave's direction of travel, frequency, and wavelength?",
      options: [
        "Moving along −x direction, frequency 10⁶ Hz, wavelength 200 m",
        "Moving along y direction, frequency 2π×10⁶ Hz, wavelength 200 m",
        "Moving along x direction, frequency 10⁶ Hz, wavelength 100 m",
        "Moving along x direction, frequency 10⁶ Hz, wavelength 200 m",
      ],
      correctIndex: 3,
      solution:
        "The form cos(ωt−kx) indicates travel in the +x direction. Angular frequency ω = 2π×10⁶ rad/s, so f = ω/2π = 10⁶ Hz. Wave number k = π×10⁻² rad/m, so wavelength λ = 2π/k = 2π/(π×10⁻²) = 200 m.",
    },
    {
      exam: "AIPMT (Pre) 2010 [Q4]",
      question:
        "Which of the following statements about electromagnetic waves is FALSE?",
      options: [
        "These waves do not require any material medium for propagation",
        "Both electric and magnetic field vectors attain maxima and minima at the same place and same time",
        "The energy in an electromagnetic wave is divided equally between the electric and magnetic vectors",
        "Both electric and magnetic field vectors are parallel to each other and perpendicular to the direction of propagation",
      ],
      correctIndex: 3,
      solution:
        "In an EM wave, the electric and magnetic field vectors are perpendicular to EACH OTHER (not parallel), with both also perpendicular to the direction of propagation. Statement 4 incorrectly claims they're parallel to each other, making it the false statement. The other three are all standard, true properties of EM waves.",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q5]",
      question:
        "What are the dimensions of (μ₀ε₀)^(−1/2)?",
      options: ["[L^(1/2)T^(−1/2)]", "[L⁻¹T]", "[LT⁻¹]", "[L^(−1/2)T^(1/2)]"],
      correctIndex: 2,
      solution:
        "(μ₀ε₀)^(−1/2) is precisely the speed of light, c = 1/√(μ₀ε₀), which has dimensions of velocity: [LT⁻¹].",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q6]",
      question:
        "The electric and magnetic fields associated with an electromagnetic wave propagating along the +z axis can be represented by:",
      options: [
        "E = E₀î, B = B₀ĵ",
        "E = E₀k̂, B = B₀î",
        "E = E₀ĵ, B = B₀î",
        "E = E₀ĵ, B = B₀k̂",
      ],
      correctIndex: 0,
      solution:
        "The direction of propagation of an EM wave is given by E×B (the Poynting vector direction). Checking option 1: E₀î × B₀ĵ = E₀B₀(î×ĵ) = E₀B₀k̂ — this points along +z, matching the stated propagation direction. This is the only option where E×B correctly points along +z.",
    },
    {
      exam: "AIPMT (Pre) 2012 [Q7]",
      question:
        "What is the decreasing order of wavelength among infrared, microwave, ultraviolet, and gamma rays?",
      options: [
        "microwave, infrared, ultraviolet, gamma rays",
        "gamma rays, ultraviolet, infrared, microwaves",
        "microwaves, gamma rays, infrared, ultraviolet",
        "infrared, microwave, ultraviolet, gamma rays",
      ],
      correctIndex: 0,
      solution:
        "In the electromagnetic spectrum, wavelength decreases (and frequency increases) in the order: radio waves > microwaves > infrared > visible > ultraviolet > X-rays > gamma rays. Among just these four, the decreasing-wavelength order is: microwave, infrared, ultraviolet, gamma rays.",
    },
    {
      exam: "AIPMT (Pre) 2012 [Q8]",
      question:
        "The electric field associated with an electromagnetic wave in vacuum is given by E = 40cos(kz − 6×10⁸t) î, where E, z, and t are in volt/m, meter, and seconds respectively. What is the value of the wave vector k?",
      options: ["6 m⁻¹", "3 m⁻¹", "2 m⁻¹", "0.5 m⁻¹"],
      correctIndex: 2,
      solution:
        "Since ω/k = c (speed of light) for an EM wave in vacuum: k = ω/c = (6×10⁸)/(3×10⁸) = 2 m⁻¹.",
    },
    {
      exam: "NEET-UG 2013 [Q9]",
      question:
        "Under what condition does a microwave oven heat a food item containing water molecules most efficiently?",
      options: [
        "Infrared waves produce the heating in a microwave oven",
        "The frequency of the microwaves must match the resonant frequency of the water molecules",
        "The frequency of the microwaves has no relation to the natural frequency of water molecules",
        "Microwaves are heat waves, so they always produce heating",
      ],
      correctIndex: 1,
      solution:
        "A microwave oven heats food most efficiently through resonance absorption — the applied microwave frequency is specifically tuned to match the natural (resonant) rotational frequency of water molecules, maximizing energy transfer into molecular motion (heat).",
    },
    {
      exam: "Re-AIPMT 2015 [Q10]",
      question:
        "The energy of certain electromagnetic waves is of the order of 15 keV. To which part of the electromagnetic spectrum does this belong?",
      options: ["gamma rays", "X-rays", "Infra-red rays", "Ultraviolet rays"],
      correctIndex: 1,
      solution:
        "X-rays typically span photon energies from roughly 100 eV to 100 keV. An energy of 15 keV falls squarely within this X-ray range (gamma rays are typically higher energy, while UV and IR are both far lower energy).",
    },
    {
      exam: "AIPMT 2015 [Q11]",
      question:
        "Radiation of energy E falls normally on a perfectly reflecting surface. What momentum is transferred to the surface? (c = speed of light)",
      options: ["2E/c", "2E/c²", "E/c²", "E/c"],
      correctIndex: 0,
      solution:
        "For a perfectly ABSORBING surface, momentum transferred would be E/c. For a perfectly REFLECTING surface, the photon's momentum reverses direction entirely, so the surface receives twice the momentum change: 2E/c.",
    },
    {
      exam: "AIIMS 2015 [Q12]",
      question:
        "A laser beam has power 9 mW and diameter 2 mm. What is the amplitude of the magnetic field associated with it?",
      options: ["49 μT", "98 μT", "9.8 μT", "4.9 μT"],
      correctIndex: 3,
      solution:
        "Intensity: I = P/A = (9×10⁻³)/(π×(1×10⁻³)²) = (9×10⁻³)/(π×10⁻⁶) ≈ 2865 W/m². Using I = ½ε₀cE₀²: E₀ = √(2I/(ε₀c)) = √(2×2865/(8.85×10⁻¹²×3×10⁸)) ≈ √(2.158×10⁶) ≈ 1469 V/m. Magnetic field amplitude: B₀ = E₀/c = 1469/(3×10⁸) ≈ 4.9×10⁻⁶ T = 4.9 μT.",
    },
    {
      exam: "AIIMS 2015 [Q13]",
      question:
        "The intensity of sunlight on Earth is 1400 W/m². Assuming Earth behaves as a perfect black body (complete absorber), what is the radiation pressure?",
      options: ["4.66×10⁶ N/m²", "1.4×10⁻⁶ N/m²", "4.66×10⁻⁶ N/m²", "7×10⁻⁶ N/m²"],
      correctIndex: 2,
      solution:
        "For a perfectly absorbing surface, radiation pressure = I/c = 1400/(3×10⁸) ≈ 4.67×10⁻⁶ N/m².",
    },
    {
      exam: "AIIMS 2015 [Q14]",
      question:
        "For an electromagnetic wave in a medium, given by an expression proportional to sin[12×10⁶(z − 2×10⁸t)/c] (with c the speed of light in vacuum), what is the refractive index of the medium?",
      options: ["2/3", "3/2", "4/3", "5/3"],
      correctIndex: 1,
      solution:
        "Comparing the wave's argument to the standard form, the wave's phase velocity in this medium works out to v = 2×10⁸ m/s. Refractive index: n = c/v = (3×10⁸)/(2×10⁸) = 3/2.",
    },
    {
      exam: "AIIMS 2015 [Q15]",
      question:
        "If the velocity of an electromagnetic wave in a medium is 3×10⁸ m/s, what is the refractive index of the medium?",
      options: ["1", "2", "0.5", "0.25"],
      correctIndex: 0,
      solution:
        "Since 3×10⁸ m/s equals the speed of light in vacuum (c), the refractive index n = c/v = c/c = 1.",
    },
    {
      exam: "NEET-I 2016 [Q16]",
      question:
        "In an electromagnetic wave, how are the amplitude of the magnetizing field H₀ and the amplitude of the electric field E₀ related?",
      options: ["H₀ = E₀", "H₀ = E₀/c", "H₀ = E₀√(μ₀/ε₀)", "H₀ = E₀√(ε₀/μ₀)"],
      correctIndex: 3,
      solution:
        "From B₀=μ₀H₀ and E₀=cB₀: E₀=cμ₀H₀, so H₀=E₀/(cμ₀). Using c=1/√(μ₀ε₀): H₀ = E₀√(μ₀ε₀)/μ₀ = E₀√(ε₀/μ₀).",
    },
    {
      exam: "NEET-I 2016 [Q17]",
      question:
        "Which of the following can be used to produce a propagating electromagnetic wave?",
      options: [
        "A charge moving at constant velocity",
        "A stationary charge",
        "A chargeless particle",
        "An accelerating charge",
      ],
      correctIndex: 3,
      solution:
        "Electromagnetic radiation is produced only by ACCELERATING charges. A charge moving at constant velocity produces a static-like magnetic field pattern that moves with it but doesn't radiate; a stationary charge produces only a static electric field; a chargeless particle produces no field at all.",
    },
    {
      exam: "NEET-I 2016 [Q18]",
      question:
        "A 100 Ω resistor and a capacitor with 100 Ω reactance are connected in series across a 220 V AC source. What is the peak value of the displacement current (noting the two are equal by Maxwell's continuity argument)?",
      options: ["4.4 A", "11√2 A", "2.2 A", "11 A"],
      correctIndex: 2,
      solution:
        "By Maxwell's insight, displacement current inside the capacitor equals the conduction current in the rest of the series circuit at every instant — so we just need the peak conduction current. Impedance: Z = √(R²+Xc²) = √(100²+100²) = 100√2 Ω. Peak voltage: V₀ = 220√2 V (since 220 V is the RMS value). Peak current: I₀ = V₀/Z = 220√2/(100√2) = 2.2 A.",
    },
    {
      exam: "AIIMS 2016 [Q19]",
      question:
        "In an electromagnetic wave, E = 1.2sin(2×10⁶t − kx) N/C. What is the amplitude of the magnetic field strength H?",
      options: ["4×10⁻⁸ A/m", "0.1×10⁻² A/m", "0.4×10⁻² A/m", "(10⁻²/π) A/m"],
      correctIndex: 3,
      solution:
        "First find B₀ = E₀/c = 1.2/(3×10⁸) = 4×10⁻⁹ T. Then H₀ = B₀/μ₀ = (4×10⁻⁹)/(4π×10⁻⁷) = (1/π)×10⁻² = 10⁻²/π A/m.",
    },
    {
      exam: "AIIMS 2016 [Q20]",
      question:
        "In an electromagnetic wave, the RMS value of the electric field is 100 V/m. What is the intensity of the wave?",
      options: ["30.2 W/m²", "15.3 W/m²", "26.5 W/m²", "15.7 W/m²"],
      correctIndex: 2,
      solution:
        "Intensity: I = ε₀cE(rms)² = (8.85×10⁻¹²)(3×10⁸)(100)² = 8.85×3×10⁻⁴×10⁴ ≈ 26.5 W/m².",
    },
    {
      exam: "AIIMS 2016 [Q21]",
      question:
        "An electromagnetic wave of intensity 1400 W/m² falls on a metal surface of area 1.5 m² and is completely absorbed. What force is exerted by the beam?",
      options: ["14×10⁻⁵ N", "14×10⁻⁶ N", "7×10⁻⁵ N", "7×10⁻⁶ N"],
      correctIndex: 3,
      solution:
        "Force = (Intensity × Area)/c = (1400×1.5)/(3×10⁸) = 2100/(3×10⁸) ≈ 7×10⁻⁶ N.",
    },
    {
      exam: "NEET(UG) 2017 [Q22]",
      question:
        "In an electromagnetic wave in free space, the RMS value of the electric field is 6 V/m. What is the peak value of the magnetic field?",
      options: ["2.83×10⁻⁸ T", "0.70×10⁻⁸ T", "4.23×10⁻⁸ T", "1.41×10⁻⁸ T"],
      correctIndex: 0,
      solution:
        "Peak electric field: E₀ = E(rms)×√2 = 6×1.414 ≈ 8.485 V/m. Peak magnetic field: B₀ = E₀/c = 8.485/(3×10⁸) ≈ 2.83×10⁻⁸ T.",
    },
    {
      exam: "AIIMS 2017 [Q23]",
      question:
        "A point source of power 15 W is placed at a certain point in space. What is the amplitude of the magnetic field at a distance of 2 m from the source?",
      options: ["5×10⁻⁸ T", "6×10⁻⁸ T", "10×10⁻⁸ T", "1×10⁻⁸ T"],
      correctIndex: 0,
      solution:
        "Intensity at 2 m: I = P/(4πr²) = 15/(4π×4) ≈ 0.298 W/m². From I=½ε₀cE₀²: E₀ = √(2I/(ε₀c)) ≈ √(224.7) ≈ 15 V/m. Magnetic field amplitude: B₀ = E₀/c = 15/(3×10⁸) = 5×10⁻⁸ T.",
    },
    {
      exam: "AIIMS 2017 [Q24]",
      question:
        "The intensity of solar radiation on Earth is 450 W/m². Assuming Earth behaves as a perfect black body, what is the radiation pressure?",
      options: ["5×10⁷ N/m²", "2.5×10⁻⁷ N/m²", "7.5×10⁻⁷ N/m²", "15×10⁻⁷ N/m²"],
      correctIndex: 3,
      solution:
        "For a perfect absorber, radiation pressure = I/c = 450/(3×10⁸) = 1.5×10⁻⁶ N/m² = 15×10⁻⁷ N/m².",
    },
    {
      exam: "AIIMS 2017 [Q25]",
      question:
        "The power of a point source is 18 mW. Find the intensity 2.5 m away from the source.",
      options: ["0.23 mW/m²", "9 mW/m²", "0.23 W/m²", "2.88 mW/m²"],
      correctIndex: 0,
      solution:
        "Intensity: I = P/(4πr²) = (18×10⁻³)/(4π×(2.5)²) = (18×10⁻³)/(4π×6.25) ≈ 2.29×10⁻⁴ W/m² ≈ 0.23 mW/m².",
    },
    {
      exam: "AIIMS 2017 [Q26]",
      question:
        "A source of power 600 kW emits radiation incident on a surface 2.5 m away, of which 50% is reflected back and 50% is absorbed. What is the radiation pressure on the surface?",
      options: ["3.9×10⁻⁵ Pa", "7.8×10⁻⁵ Pa", "11.7×10⁻⁵ Pa", "15.6×10⁻⁵ Pa"],
      correctIndex: 0,
      solution:
        "Intensity at 2.5 m: I = P/(4πr²) = (600×10³)/(4π×6.25) ≈ 7639 W/m². For a surface that reflects half and absorbs half, pressure = (I/c)×(1 + reflectance fraction) = (I/c)×1.5 (since the absorbed half contributes I/c and the reflected half contributes 2×I/c, averaging to 1.5×I/c overall). Pressure = (7639/3×10⁸)×1.5 ≈ 2.546×10⁻⁵×1.5 ≈ 3.9×10⁻⁵ Pa.",
    },
    {
      exam: "NEET(UG) 2018 [Q27] (reduced confidence — see note)",
      question:
        "An electromagnetic wave propagates in a medium with velocity V = Vî (along +x). Its instantaneous oscillating electric field is along the +y axis. Along which direction does its oscillating magnetic field point?",
      options: ["−z direction", "+z direction", "−y direction", "−x direction"],
      correctIndex: 0,
      solution:
        "[FLAGGED DISCREPANCY] My own independent derivation does not match the printed key, and I want to be transparent about that rather than force an answer either way. The direction of propagation of an EM wave is given by E×B (the Poynting vector direction). With propagation along +x (î) and E along +y (ĵ), we need ĵ×B̂ = î. Using the cyclic identity ĵ×k̂ = î, this means B should point along +z (k̂) — matching option 2, not option 1 (−z) that the printed key indicates. I re-derived this twice using the standard E×B convention and got the same +z result both times, so I cannot reconcile my derivation with the key's stated answer. correctIndex is set to 0 to match the printed key per the rule of never silently overriding it, but this should be treated as an open discrepancy — possibly due to a sign/handedness convention difference I'm not aware of — rather than a fully verified solution.",
    },
    {
      exam: "AIIMS 2018 [Q28]",
      question:
        "In an electromagnetic wave, E = 50sin(ωt−kx). If the medium has permeability μ = 4μ₀ and permittivity ε = ε₀, what is the average power per unit area (intensity)?",
      options: ["1.65 W/m²", "165 W/m²", "16.5 W/m²", "0.165 W/m²"],
      correctIndex: 0,
      solution:
        "In a medium, intensity I = ½√(ε/μ)×E₀². Here ε=ε₀, μ=4μ₀, so √(ε/μ) = √(ε₀/4μ₀) = ½√(ε₀/μ₀) = 1/(2×376.99) ≈ 1.327×10⁻³ (using the vacuum impedance √(μ₀/ε₀)≈376.99Ω). I = ½×1.327×10⁻³×(50)² = ½×1.327×10⁻³×2500 ≈ 1.66 ≈ 1.65 W/m².",
    },
    {
      exam: "AIIMS 2018 [Q29]",
      question:
        "In an electromagnetic wave propagating along the +z axis, the magnetic field is given by H = −2cos(ωt−kz)î. What is the corresponding electric field?",
      options: [
        "E = 753cos(ωt−kz)ĵ",
        "E = 387sin(ωt−kz)ĵ",
        "E = 753cos(ωt+kz)ĵ",
        "E = −753sin(ωt+kz)ĵ",
      ],
      correctIndex: 0,
      solution:
        "For propagation along +z, we need Ê×Ĥ = ẑ (unit-vector form). Given H is along −î, we need Ê such that Ê×(−î) = k̂, i.e. Ê×î = −k̂. Using the identity ĵ×î = −k̂, we get Ê along +ĵ. Both fields oscillate with the same phase (ωt−kz) for a simple plane wave in vacuum. Magnitude: E₀ = cμ₀H₀ = (3×10⁸)(4π×10⁻⁷)(2) ≈ 753 V/m. So E = 753cos(ωt−kz)ĵ.",
    },
  ],
};
