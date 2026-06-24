import type { ChapterNotes } from "./kinematics";

export const atomsNotes: ChapterNotes = {
  chapterName: "Atoms",
  className: "12",
  intro:
    "How do we know what's inside an atom we can never actually see? This chapter follows the trail of evidence — a famous scattering experiment that revealed the nucleus, and a daring postulate by Bohr that explained why hydrogen glows in only a few specific colours. Along the way you'll find the handful of formulas that describe every orbit, every energy level, and every spectral line of the hydrogen atom.",
  sections: [
    {
      heading: "1. From Dalton to Thomson — Early Models",
      body:
        "Long before any direct evidence existed, Dalton pictured the atom as an indivisible, indestructible sphere. Thomson's later model tried to account for the electron (discovered in 1897) while keeping the atom electrically neutral.",
      formula: [{ label: "Thomson model — atom radius", expression: "~10⁻¹⁰ m" }],
      bullets: [
        "Thomson's model: a uniformly spread-out positive charge fills a sphere, with electrons embedded in it like seeds in a watermelon — hence its nickname, the 'plum pudding' model.",
        "It correctly kept the atom neutral overall, but it had no way to explain the sharp, discrete lines seen in atomic spectra, or the results of the scattering experiment described next.",
      ],
    },
    {
      heading: "2. Rutherford's Alpha-Particle Scattering Experiment",
      body:
        "Rutherford's team fired a fine beam of alpha particles at an extremely thin gold foil and tracked where the particles ended up using a movable zinc sulphide screen that flashed on impact.",
      bullets: [
        "Most alpha particles passed straight through with little to no deflection — strong evidence that an atom is mostly empty space.",
        "A small fraction were deflected through large angles, and roughly 1 in 8000 bounced almost straight back.",
        "Large deflections could only happen if the positive charge (and nearly all the mass) was concentrated in a tiny, dense region — there was no way a spread-out positive charge (as in Thomson's model) could turn an alpha particle around.",
        "The number of particles scattered at angle θ follows N(θ) ∝ cosec⁴(θ/2) — sharply peaked at small angles, with a long tail reaching all the way to 180°.",
      ],
    },
    {
      heading: "3. The Nuclear Model of the Atom",
      body:
        "Putting the scattering results together, Rutherford proposed that an atom has a tiny, dense, positively charged core — the nucleus — with electrons orbiting around it at a comparatively enormous distance.",
      bullets: [
        "Nuclear diameter: less than about 10⁻¹³ cm (10⁻¹⁵ m), compared to an atomic diameter of about 10⁻¹⁰ m — the nucleus occupies only about one part in a trillion of the atom's volume.",
        "Nearly the entire mass of the atom sits in the nucleus.",
        "Electrons, being far lighter, barely affect the path of a fast, heavy alpha particle — which is why they don't show up in the scattering pattern at all.",
      ],
    },
    {
      heading: "4. Distance of Closest Approach and Impact Parameter",
      body:
        "An alpha particle aimed directly at the nucleus (head-on) slows down as it climbs the electrostatic 'hill' of repulsion, and momentarily stops at its point of closest approach, where all its kinetic energy has converted to potential energy.",
      formula: [
        { label: "Closest approach distance", expression: "r₀ = (1/4πε₀) × (2Ze²)/E_K" },
        { label: "Impact parameter", expression: "b = (1/4πε₀) × (Ze²/E_K) cot(θ/2)" },
      ],
      bullets: [
        "E_K is the alpha particle's initial kinetic energy, far from the nucleus, where potential energy is taken as zero.",
        "The impact parameter b is the perpendicular distance between the alpha particle's original straight-line path and the nucleus — a small b (closer to head-on) produces a large deflection angle θ, and a large b produces almost no deflection.",
      ],
    },
    {
      heading: "5. Failure of Rutherford's Model",
      body:
        "Rutherford's nuclear picture explained the scattering data beautifully, but it ran into two problems the moment classical physics was applied to it.",
      bullets: [
        "An orbiting (accelerating) electron should, by classical electromagnetic theory, continuously radiate energy and spiral into the nucleus within a fraction of a second — predicting that atoms can't be stable, when they obviously are.",
        "Even if an electron somehow stayed in orbit, classical theory gives no reason why an atom should emit light only at specific, discrete wavelengths instead of a continuous spread — yet that's exactly what's observed.",
      ],
    },
    {
      heading: "6. Bohr's Postulates",
      body:
        "Bohr rescued the nuclear model by simply asserting — without classical justification — that the electron's orbits and energies are restricted to a special, discrete set of allowed values.",
      formula: [
        { label: "Force balance (circular orbit)", expression: "(1/4πε₀)(Ze²/r²) = mv²/r" },
        { label: "Quantization of angular momentum", expression: "mvr = nh/2π,  n = 1, 2, 3, ..." },
        { label: "Bohr's frequency condition", expression: "E₂ − E₁ = hν" },
      ],
      bullets: [
        "Postulate 1: the electron moves in a circular orbit, with the Coulomb attraction to the nucleus supplying exactly the required centripetal force.",
        "Postulate 2: only orbits where the angular momentum is an integer multiple of h/2π are allowed — all other orbits simply don't exist for the electron.",
        "Postulate 3: an electron in one of these allowed ('stationary') orbits does not radiate at all, however strange that seems classically — its total energy stays constant as long as it stays in that orbit.",
        "Postulate 4: radiation is emitted (or absorbed) only when an electron jumps between two allowed orbits, and the photon's frequency is fixed by the energy gap between them.",
      ],
    },
    {
      heading: "7. Radius of the Bohr Orbit",
      body:
        "Combining the force-balance equation with the angular-momentum quantization condition (eliminating the velocity v) gives a clean formula for the radius of each allowed orbit.",
      formula: [
        { label: "Radius of nth orbit", expression: "r_n = (ε₀n²h²)/(πmZe²)" },
        { label: "First orbit of hydrogen (n=1, Z=1)", expression: "r₁ = 0.529 Å" },
        { label: "Scaling", expression: "r_n ∝ n²/Z" },
      ],
      bullets: [
        "Orbit radius grows with the square of n — the gaps between successive orbits widen rapidly as n increases.",
        "For a given n, a higher nuclear charge Z pulls the electron into a tighter orbit — this is why heavier hydrogen-like ions (He⁺, Li²⁺, ...) have smaller ground-state radii than hydrogen.",
      ],
    },
    {
      heading: "8. Velocity of the Electron in an Orbit",
      body:
        "Substituting the orbit radius back into the angular-momentum condition gives the electron's orbital speed.",
      formula: [
        { label: "Velocity in nth orbit", expression: "v_n = Ze²/(2ε₀nh)" },
        { label: "First orbit of hydrogen", expression: "v₁ ≈ 2.2 × 10⁶ m/s" },
        { label: "Scaling", expression: "v_n ∝ Z/n" },
      ],
      bullets: [
        "The electron moves fastest in the innermost orbit (n=1) and progressively slower in higher orbits — exactly the opposite trend to the radius.",
        "Even at its fastest, the electron's speed in hydrogen's first orbit is only about 1/137th the speed of light — fast, but comfortably non-relativistic.",
      ],
    },
    {
      heading: "9. Energy of the Electron in an Orbit",
      body:
        "Total energy is the sum of kinetic energy (from orbital motion) and potential energy (from the electron's position in the nucleus's electric field) — and remarkably, it collapses to a single simple formula in terms of n and Z alone.",
      formula: [
        { label: "Energy of nth orbit", expression: "E_n = −13.6 (Z²/n²) eV" },
        { label: "Hydrogen ground state", expression: "E₁ = −13.6 eV" },
        { label: "Kinetic and potential energy", expression: "KE = −E_n,  PE = 2E_n" },
      ],
      bullets: [
        "The negative sign means the electron is bound — energy must be supplied from outside to pull it free of the nucleus entirely.",
        "Kinetic energy is always positive and equal in magnitude to the total energy; potential energy is negative and exactly twice the total energy — this 2:1 split (PE = 2 × Total, KE = −Total) holds at every orbit.",
        "As n → ∞, E_n → 0 — the electron is essentially free, which is exactly the ionization limit.",
      ],
    },
    {
      heading: "10. Energy Level Diagram of Hydrogen",
      body:
        "Plotting the allowed energies as horizontal lines (most negative at the bottom, least negative at the top) gives the energy level diagram — the single picture that summarizes every possible transition in the atom.",
      formula: [
        { label: "n = 1 (ground state, K-shell)", expression: "E₁ = −13.6 eV" },
        { label: "n = 2 (L-shell)", expression: "E₂ = −3.4 eV" },
        { label: "n = 3 (M-shell)", expression: "E₃ = −1.51 eV" },
        { label: "n = 4", expression: "E₄ = −0.85 eV" },
        { label: "n = ∞", expression: "E_∞ = 0 eV" },
      ],
      bullets: [
        "The lowest level (n=1) is the ground state — the atom's normal, stable condition. Any n > 1 is called an excited state.",
        "A transition is drawn as a vertical arrow between two levels; a longer arrow (bigger energy gap) means a higher-energy, shorter-wavelength photon.",
        "Binding energy at level n is simply the positive value |E_n| — the energy that would have to be supplied to free the electron from that level all the way to n = ∞.",
      ],
    },
    {
      heading: "11. Excitation and Ionisation",
      body:
        "Supplying energy to an atom can either bump its electron to a higher allowed orbit, or — if enough energy is supplied — knock it out of the atom entirely.",
      formula: [
        { label: "First excitation energy (H)", expression: "E₂ − E₁ = 10.2 eV" },
        { label: "Ionisation energy (H, ground state)", expression: "0 − (−13.6) = 13.6 eV" },
      ],
      bullets: [
        "Excitation: the electron moves from a lower to a higher allowed orbit. The energy needed, expressed as a potential, is called the excitation potential.",
        "Ionisation: the electron is removed completely (n effectively reaches ∞). The energy needed, expressed as a potential, is the ionisation potential — 13.6 V for hydrogen in its ground state.",
        "An excited state isn't permanent — the electron typically falls back to a lower (often the ground) state within about 10⁻⁸ s, releasing the energy difference as a photon.",
      ],
    },
    {
      heading: "12. Absorption and Emission Spectra",
      body:
        "The same energy-level structure produces two complementary spectra, depending on whether the atom is gaining or losing energy.",
      bullets: [
        "Emission spectrum: an already-excited electron drops to a lower level, emitting a photon at a frequency fixed by the energy gap — seen as bright lines against a dark background.",
        "Absorption spectrum: white light (containing all frequencies) passes through a gas; the atom absorbs exactly the photons whose energy matches an allowed transition, removing those frequencies from the transmitted light — seen as dark lines against a bright, continuous background.",
        "The same set of wavelengths shows up in both spectra — absorption and emission lines for a given transition sit at identical positions, just with opposite contrast.",
      ],
    },
    {
      heading: "13. Spectral Series of Hydrogen",
      body:
        "Every transition that ends on the same lower level n₁ belongs to one named series. Five series, spanning from the ultraviolet through the infrared, cover the entire hydrogen spectrum.",
      formula: [
        { label: "General formula", expression: "1/λ = R [1/n₁² − 1/n₂²]" },
        { label: "Rydberg constant", expression: "R ≈ 1.097 × 10⁷ m⁻¹" },
      ],
      bullets: [
        "Lyman series: n₁ = 1, n₂ = 2,3,4,...∞ — lies entirely in the ultraviolet. Series limit (n₂→∞): λ = 1/R ≈ 912 Å.",
        "Balmer series: n₁ = 2, n₂ = 3,4,5,...∞ — the only series with lines in the visible region (the rest lie in the near-UV). Series limit: λ = 4/R ≈ 3646 Å. First line (Hα, n₂=3): λ ≈ 6563 Å.",
        "Paschen series: n₁ = 3; Brackett series: n₁ = 4; Pfund series: n₁ = 5 — all three lie entirely in the infrared.",
        "In every series, the lines get closer and closer together (converging) as n₂ increases, bunching up at the series limit.",
      ],
    },
    {
      heading: "14. Hydrogen-Like Ions and Scaling with Z",
      body:
        "Bohr's formulas were derived for one electron orbiting a nucleus of charge +Ze — they apply not just to hydrogen (Z=1) but to any ion stripped down to a single electron, such as He⁺ (Z=2) or Li²⁺ (Z=3).",
      formula: [
        { label: "Energy", expression: "E_n = −13.6 Z²/n² eV" },
        { label: "Radius", expression: "r_n ∝ n²/Z" },
        { label: "Spectral lines", expression: "1/λ = RZ² [1/n₁² − 1/n₂²]" },
      ],
      bullets: [
        "A higher Z binds the single remaining electron far more tightly — ionisation energy scales as Z², so He⁺ needs 4× the energy hydrogen does (54.4 eV vs 13.6 eV), and Li²⁺ needs 9× (122.4 eV).",
        "The atomic number of an unknown hydrogen-like ion can be found from its measured ionisation energy: Z = √(IE/13.6 eV).",
      ],
    },
    {
      heading: "15. De Broglie's Justification of Bohr's Quantization",
      body:
        "Bohr's angular-momentum rule looked like an arbitrary assumption until de Broglie's matter-wave idea, proposed over a decade later, gave it a physical picture: an electron's allowed orbits are exactly those where its wave fits the circumference a whole number of times.",
      formula: [
        { label: "Standing-wave condition", expression: "2πr_n = nλ" },
        { label: "De Broglie wavelength", expression: "λ = h/(mv)" },
      ],
      bullets: [
        "Combining these two relations directly reproduces Bohr's quantization rule mvr = nh/2π — what looked like an assumption turns out to be the condition for the electron's wave to interfere constructively with itself, lap after lap.",
        "Orbits that don't fit a whole number of wavelengths would have the wave destructively interfere with itself and cancel out — which is the wave-picture reason those orbits simply aren't allowed.",
      ],
    },
    {
      heading: "16. Limitations of Bohr's Model",
      body:
        "Bohr's model was a triumph for explaining hydrogen's spectrum, but it's very much a stepping stone — a 'semi-quantum' patch on a classical picture — rather than the final word.",
      bullets: [
        "It works well only for single-electron systems (H, He⁺, Li²⁺, ...); it cannot account for electron-electron interactions in multi-electron atoms.",
        "It cannot explain the fine structure of spectral lines, the Zeeman effect (splitting in a magnetic field), or the Stark effect (splitting in an electric field).",
        "It still pictures the electron as moving in a precise, well-defined circular path — a notion modern quantum mechanics replaces with probability distributions, since no real 'orbit' is ever actually observed.",
        "It quantizes energy and angular momentum, but mixes that with an otherwise fully classical picture of circular motion — which is why it's often called a semi-classical or semi-quantum model.",
      ],
    },
  ],
};
