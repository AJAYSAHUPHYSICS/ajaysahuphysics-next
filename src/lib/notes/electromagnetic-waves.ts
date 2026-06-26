import type { ChapterNotes } from "./kinematics";

export const electromagneticWavesNotes: ChapterNotes = {
  chapterName: "Electromagnetic Waves",
  className: "12",
  intro:
    "This chapter completes the picture built up across electrostatics, current electricity, and magnetism: Maxwell showed that a changing electric field generates a magnetic field exactly as a changing magnetic field generates an electric field, and the two effects sustain each other to produce a self-propagating wave — light itself turns out to be one example. The chapter is mostly qualitative for NEET and JEE Main: the displacement current that completes Ampère's law, Maxwell's four equations, Hertz's experimental confirmation, the general properties of electromagnetic waves, and the full electromagnetic spectrum from gamma rays to radio waves.",
  sections: [
    {
      heading: "1. Historical Background",
      body:
        "The idea of electromagnetic waves moved from pure theory to confirmed reality, and then to global technology, within about 35 years.",
      bullets: [
        "1865 — Maxwell theoretically predicted electromagnetic waves, arguing that an accelerating charge sets up changing electric and magnetic fields that propagate through space.",
        "1887 — Hertz produced and detected electromagnetic waves experimentally, at a wavelength of about 6 m, confirming Maxwell's prediction.",
        "Soon after, J.C. Bose produced electromagnetic waves of much shorter wavelength, in the 5 mm – 25 mm range.",
        "1896 — Marconi showed that connecting one spark-gap terminal to an antenna (and earthing the other) let the radiated waves travel several kilometres; the antenna and the earth wire act like the two plates of a capacitor radiating radio-frequency waves.",
        "1899 — Marconi used this antenna–earth arrangement to establish wireless communication across the English Channel, a distance of about 50 km.",
      ],
    },
    {
      heading: "2. The Need for Displacement Current",
      body:
        "Ampère's circuital law as originally stated works for steady currents, but fails for a charging capacitor — Maxwell fixed this by recognising that a changing electric field between the plates acts just like a current.",
      formula: [
        { label: "Electric field between capacitor plates", expression: "E = σ/ε₀ = q/(ε₀A)" },
        { label: "Displacement current", expression: "I_d = ε₀ (dΦ_E/dt)" },
        { label: "Total current in Ampère–Maxwell law", expression: "I = I_c + I_d" },
        { label: "Ampère–Maxwell circuital law", expression: "∮B·dl = μ₀(I_c + I_d) = μ₀(I_c + ε₀ dΦ_E/dt)" },
      ],
      bullets: [
        "Inside the gap of a charging capacitor there's no actual charge flow (I_c = 0), yet a continuous magnetic field still circles the gap — this can only be explained if a changing electric flux acts as a source of B, just like a real current does.",
        "For a parallel-plate capacitor being charged at rate dq/dt = I, the displacement current between the plates always works out to exactly I — so I_d simply continues the conduction current I_c across the gap where no charge is actually moving.",
        "Displacement current is exactly as effective as conduction current at producing a magnetic field; it isn't a flow of charge, but a changing electric field that mimics one.",
      ],
    },
    {
      heading: "3. Maxwell's Four Equations",
      body:
        "Maxwell unified every known law of electricity and magnetism — due to Coulomb, Gauss, Faraday and Ampère — into four compact equations, and the displacement current was the missing piece that made the set self-consistent.",
      formula: [
        { label: "(I) Gauss's law in electrostatics", expression: "∮E·dS = q/ε₀" },
        { label: "(II) Gauss's law in magnetism", expression: "∮B·dS = 0" },
        { label: "(III) Faraday's law of EM induction", expression: "∮E·dl = −dΦ_B/dt" },
        { label: "(IV) Ampère–Maxwell circuital law", expression: "∮B·dl = μ₀(I_c + ε₀ dΦ_E/dt)" },
      ],
      bullets: [
        "Equation (II) is the magnetic statement that isolated magnetic poles don't exist — net magnetic flux through any closed surface is always zero.",
        "Equations (III) and (IV) are mirror images of each other: a changing magnetic flux creates a circulating electric field (Faraday), and a changing electric flux (or a real current) creates a circulating magnetic field (Ampère–Maxwell) — this symmetry is exactly what allows the two fields to keep regenerating each other as a wave travels.",
      ],
    },
    {
      heading: "4. Hertz's Experiment — Producing EM Waves",
      body:
        "Hertz's 1888 apparatus was the first deliberate, controlled generation and detection of electromagnetic waves, turning Maxwell's equations into demonstrated physics.",
      bullets: [
        "An induction coil charges two spherical electrodes separated by a small gap (the transmitter); once the voltage across the gap reaches the breakdown voltage of air, a spark jumps across.",
        "The ionised air in the gap conducts increasingly well as the spark develops, making the discharge oscillatory — electrically, the loop and the spherical electrodes behave like an LC circuit.",
        "This oscillating circuit radiates electromagnetic waves at a very high frequency (≈100 MHz), generated by the oscillation of free charges in the loop.",
        "A separate receiving loop with its own spark gap detected the waves: sparks appeared across the receiver's gap only when its natural frequency was tuned to match the transmitter's — an early demonstration of resonance in wireless transmission.",
      ],
    },
    {
      heading: "5. General Properties of Electromagnetic Waves",
      body:
        "Once generated, an electromagnetic wave obeys a consistent set of properties that follow directly from Maxwell's equations, regardless of which part of the spectrum it belongs to.",
      formula: [
        { label: "Wave equations for E and B", expression: "∂²E/∂x² = μ₀ε₀ ∂²E/∂t², and similarly for B" },
        { label: "Speed in vacuum", expression: "c = 1/√(μ₀ε₀) = 3 × 10⁸ m/s" },
        { label: "Relation between field magnitudes", expression: "E/B = c (at every instant)" },
        { label: "Sinusoidal plane wave (travelling along +x)", expression: "E = E_m sin(kx − ωt), B = B_m sin(kx − ωt)" },
        { label: "Angular frequency and wave number", expression: "ω = 2πf, k = 2π/λ" },
      ],
      bullets: [
        "E and B oscillate in phase — they reach their maximum and zero values at exactly the same points and the same instants, never out of step with each other.",
        "Electromagnetic waves are transverse: E, B and the direction of propagation are mutually perpendicular (E × B points along the direction the wave travels).",
        "Frequency is the one property that never changes when an electromagnetic wave moves from one medium into another — only its speed and wavelength change.",
        "The fundamental source of every electromagnetic wave is an accelerating (or oscillating) electric charge — this is true from radio antennas all the way to atomic transitions producing visible light or X-rays.",
        "Electromagnetic waves obey the principle of superposition, exactly like mechanical waves.",
        "The electric field vector is responsible for essentially all optical effects on matter (it interacts far more strongly with charges than the magnetic field does), which is why E is sometimes called the 'light vector'.",
      ],
    },
    {
      heading: "6. Transverse Nature of Electromagnetic Waves",
      body:
        "Applying Gauss's law to a small parallelepiped straddling a plane electromagnetic wavefront shows that the field components along the direction of travel must vanish — a clean proof that E and B can only exist perpendicular to the propagation direction.",
      bullets: [
        "For a plane wave travelling along x, E and B depend only on x and t — not on y or z — so flux contributions through the faces of a small box normal to y and z cancel out in pairs by symmetry.",
        "What remains is the flux through the two faces normal to x; since the box encloses no charge, Gauss's law forces the x-component of E on the front face to equal the x-component on the back face at every instant.",
        "A field whose value doesn't change with position along x can't be carried along by a travelling wave — so a genuinely propagating wave must have this component equal to zero: Eₓ = 0.",
        "The identical argument applies to B, giving Bₓ = 0 as well — so both fields are confined entirely to the plane perpendicular to the direction of propagation, confirming that electromagnetic waves are transverse.",
      ],
    },
    {
      heading: "7. Energy Carried by Electromagnetic Waves — the Poynting Vector",
      body:
        "An electromagnetic wave carries energy through space, and the rate at which that energy flows across a unit area is captured by a single vector quantity.",
      formula: [
        { label: "Poynting vector", expression: "S = (1/μ₀)(E × B)" },
        { label: "Instantaneous magnitude", expression: "S = EB/μ₀" },
        { label: "Average intensity (sinusoidal wave)", expression: "I_av = E_mB_m/(2μ₀) = ε₀cE_m²/2 = cB_m²/(2μ₀)" },
      ],
      bullets: [
        "S points along the direction of wave propagation (since E, B, and the propagation direction form a mutually perpendicular set via E × B).",
        "Intensity is the time-average of S over one full cycle — the peak value of S is twice the average for a sinusoidal wave, exactly as with AC power.",
      ],
    },
    {
      heading: "8. Energy Density of Electromagnetic Waves",
      body:
        "Just as a capacitor stores energy in its electric field and an inductor stores energy in its magnetic field, an electromagnetic wave carries energy stored jointly and equally in its E and B fields as it travels.",
      formula: [
        { label: "Instantaneous electric energy density", expression: "u_E = (1/2)ε₀E²" },
        { label: "Instantaneous magnetic energy density", expression: "u_B = B²/(2μ₀)" },
        { label: "These are always equal", expression: "u_E = u_B (since E = cB and c² = 1/(μ₀ε₀))" },
        { label: "Average total energy density", expression: "u_av = (1/2)ε₀E_m² (electric + magnetic together)" },
      ],
      bullets: [
        "Because u_E and u_B are equal at every instant, the energy carried by an electromagnetic wave is split exactly 50–50 between its electric and magnetic fields — never more in one than the other.",
        "Average energy density in each field individually is (1/4)ε₀E_m²; together they add up to the (1/2)ε₀E_m² total quoted above.",
      ],
    },
    {
      heading: "9. Radiation Pressure",
      body:
        "Because electromagnetic waves carry momentum as well as energy, they exert a real (if tiny) pressure on any surface they strike — this is radiation pressure.",
      formula: [
        { label: "Perfectly absorbing surface", expression: "P = S/c" },
        { label: "Perfectly reflecting surface", expression: "P = 2S/c" },
      ],
      bullets: [
        "A reflecting surface feels exactly twice the pressure of an absorbing one for the same incident intensity S, because the wave's momentum is reversed rather than simply absorbed — the same factor-of-two logic as an elastic versus inelastic collision.",
        "Radiation pressure is extremely small for everyday light intensities, but it's significant for spacecraft solar sails and in astrophysical contexts (e.g. it helps support the outer layers of stars against gravity).",
      ],
    },
    {
      heading: "10. Overview of the Electromagnetic Spectrum",
      body:
        "Every electromagnetic wave — from gamma rays to long radio waves — obeys the same physics; what changes across the spectrum is simply wavelength (and correspondingly, frequency and photon energy), which determines how the wave is produced and how it interacts with matter.",
      formula: [
        { label: "Spectrum ordered by increasing wavelength", expression: "γ-rays → X-rays → UV → visible → IR → microwaves → radio waves" },
        { label: "Spectrum ordered by increasing frequency / energy", expression: "Radio waves → microwaves → IR → visible → UV → X-rays → γ-rays" },
      ],
      bullets: [
        "Across the whole spectrum, c = fλ always holds in vacuum — wavelength and frequency are inversely related, so the highest-frequency waves (gamma rays) have the shortest wavelengths, and vice versa for radio waves.",
        "Higher frequency corresponds to higher photon energy (E = hf) — this is why gamma rays and X-rays are dangerous to living tissue while radio waves are essentially harmless at ordinary intensities.",
      ],
    },
    {
      heading: "11. Gamma Rays and X-Rays",
      body:
        "These are the highest-energy, shortest-wavelength members of the spectrum, both highly penetrating and capable of ionising matter — but produced by very different mechanisms.",
      formula: [
        { label: "Gamma rays — wavelength range", expression: "≈ 10⁻¹⁴ m to 10⁻¹⁰ m" },
        { label: "X-rays — wavelength range", expression: "≈ 6 × 10⁻¹² m to 10⁻⁹ m" },
      ],
      bullets: [
        "Gamma rays are produced by radioactive decay of atomic nuclei (discovered by Henri Becquerel and Marie Curie); they have the highest penetrating power and the lowest ionising power among high-energy radiation, and are used in nuclear-structure studies and medical treatment.",
        "X-rays are produced when high-energy electrons collide with heavy metal targets (discovered by Röntgen); they share most properties with gamma rays except their typical wavelength range, and are used in medical diagnosis/treatment, crystal-structure studies, and industrial radiography.",
      ],
    },
    {
      heading: "12. Ultraviolet Rays and the Ozone Layer",
      body:
        "Ultraviolet rays sit just beyond the violet end of visible light, energetic enough to cause chemical and biological effects that visible light cannot.",
      formula: [{ label: "UV — wavelength range", expression: "≈ 6 × 10⁻¹⁰ m to 3.8 × 10⁻⁷ m" }],
      bullets: [
        "Produced by ionised gases, sparks, and special UV lamps; discovered by Ritter.",
        "Shares all the general properties of light, including the photoelectric effect; used to detect adulteration, in writing/signature verification, and to sterilise water (UV light is destructive to bacteria).",
        "The ozone layer in the stratosphere absorbs solar ultraviolet radiation, shielding living organisms on the surface from its harmful effects — this is one of the most important practical reasons the spectrum is studied at all.",
      ],
    },
    {
      heading: "13. Visible Light and Infrared Waves",
      body:
        "Visible light is the narrow band the human eye evolved to detect, while infrared lies just beyond red and is mostly experienced as heat.",
      formula: [
        { label: "Visible light — wavelength range", expression: "≈ 3.8 × 10⁻⁷ m to 7.8 × 10⁻⁷ m" },
        { label: "Infrared — wavelength range", expression: "≈ 7.8 × 10⁻⁷ m to 10⁻³ m" },
      ],
      bullets: [
        "Visible light arises from outer-orbit electron transitions in atoms, gas-discharge tubes, and incandescent solids/liquids (discovered/studied by Newton); within it, violet has the shortest wavelength and red the longest, in the order violet–blue–green–yellow–orange–red.",
        "Infrared arises from rearrangement of outer orbital electrons and from vibrational/rotational energy changes in molecules, and is also emitted strongly by any hot body (discovered by William Herschel).",
        "Infrared is used in industry, medicine, astronomy, and fog/haze photography, and in elucidating molecular structure; it is absorbed by greenhouse gases in the atmosphere, trapping heat near the surface — the greenhouse effect — and the ozone layer additionally traps outgoing infrared, helping keep the atmosphere warm.",
        "Without an atmosphere capable of this trapping effect, Earth's average surface temperature would be considerably lower than it is.",
      ],
    },
    {
      heading: "14. Microwaves and Radio Waves",
      body:
        "These are the longest-wavelength, lowest-energy members of the spectrum, and the ones most directly exploited for communication technology.",
      formula: [
        { label: "Microwaves — wavelength range", expression: "≈ 10⁻³ m to 0.3 m" },
        { label: "Radio waves — wavelength range", expression: "≈ 0.3 m to several km" },
      ],
      bullets: [
        "Microwaves are produced by special electronic devices such as klystron tubes (Hertz); used in radar, satellite and telecommunication, and in analysing fine details of molecular structure via reflection, refraction and diffraction.",
        "Radio waves are produced by oscillating electrical circuits (Marconi); they behave more like classical waves than like particles, and are used for radio and television broadcast.",
        "Radio sub-bands, by increasing wavelength (decreasing frequency): SHF (super high frequency, used for radar/satellite), UHF (ultra high frequency, TV broadcast and short-range communication), VHF (very high frequency), HF (high frequency, used for medium-distance and amateur radio), MF (medium frequency, AM broadcast and marine navigation), LF and VLF (low and very low frequency, long-distance communication).",
      ],
    },
  ],
};
