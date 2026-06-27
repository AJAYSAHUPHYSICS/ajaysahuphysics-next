import type { ChapterNotes } from "./kinematics";

export const nucleiNotes: ChapterNotes = {
  chapterName: "Nuclei",
  className: "12",
  intro:
    "The nucleus is the tiny, dense core that holds nearly all of an atom's mass in a volume roughly ten thousand times smaller than the atom itself — and that crowding is only possible because of a force unlike anything found at the atomic scale: the nuclear force. This chapter builds from the nucleus's basic properties up through Einstein's mass–energy equivalence, the binding energy that holds nucleons together, the two great energy-releasing processes (fission and fusion), and finally into radioactivity — the spontaneous, statistically-governed decay of unstable nuclei that follows a single clean exponential law.",
  sections: [
    {
      heading: "1. The Nucleus: Basic Properties",
      body:
        "The nucleus is the central core of every atom, discovered by Rutherford through his α-particle scattering experiment. It is built entirely from protons and neutrons — collectively called nucleons — packed into a space about a hundred-thousandth the size of the atom itself.",
      formula: [
        { label: "Nuclear vs atomic size", expression: "R_nucleus ~ 10⁻¹⁵ m (1 fm) ; R_atom ~ 10⁻¹⁰ m (1 Å)" },
        { label: "Notation for a nuclide", expression: "₍Z₎Xᴬ : Z = atomic number = number of protons; A = mass number = Z + N (total nucleons)" },
      ],
      bullets: [
        "Atomic mass unit (u): defined as 1/12th the mass of a ¹²C atom; 1 u = 1.66 × 10⁻²⁷ kg.",
        "m_p = 1.6726 × 10⁻²⁷ kg = 1.00727 u ; m_n = 1.6749 × 10⁻²⁷ kg = 1.00866 u ; m_e = 9.1 × 10⁻³¹ kg = 0.00055 u — the neutron is very slightly heavier than the proton, a fact that turns out to matter a great deal later (it's why a free proton cannot β-decay, but a free neutron can).",
      ],
    },
    {
      heading: "2. Types of Nuclei: Isotopes, Isobars and Isotones",
      body:
        "Nuclei are classified by which of their defining numbers — Z, A, or the neutron count (A − Z) — they share with another nucleus.",
      bullets: [
        "Isotopes: same Z (same element, different N and hence different A) — e.g. ¹H, ²H, ³H all have Z = 1.",
        "Isobars: same A (different elements, since Z differs, but the same total nucleon count) — e.g. ¹⁴C and ¹⁴N.",
        "Isotones: same (A − Z), i.e. the same number of neutrons, but different Z and A.",
      ],
    },
    {
      heading: "3. Size, Volume, Mass and Density of the Nucleus",
      body:
        "A nucleus behaves almost like an incompressible drop of fluid: as more nucleons are packed in, the nuclear radius grows just enough to keep the density essentially the same for every nucleus, light or heavy.",
      formula: [
        { label: "Nuclear radius", expression: "R = R₀A^(1/3) ,  R₀ ≈ 1.2 fm" },
        { label: "Nuclear volume", expression: "V ∝ R³ ∝ A   (since R ∝ A^(1/3))" },
        { label: "Nuclear mass", expression: "m ≈ A·m_p ∝ A" },
        { label: "Nuclear density", expression: "ρ = m/V ≈ 3m_p/(4πR₀³) ≈ 3×10¹⁷ kg/m³ (≈10¹⁴ g/cm³), independent of A" },
      ],
      bullets: [
        "Because R ∝ A^(1/3) while m ∝ A, density ρ = m/V works out to be the same constant for every nucleus — heavier nuclei are bigger, not denser. This independence from A is one of the most distinctive facts about nuclear matter.",
        "By contrast, atomic (not nuclear) density very much depends on which element/structure you're looking at — the constant-density rule is a purely nuclear phenomenon.",
        "Nuclear radius measured via electron scattering comes out slightly different from radius measured via α-particle scattering — electrons probe the nucleus's charge distribution, while α-particles (and similar nuclear projectiles) probe the distribution of nuclear matter itself; the two need not coincide exactly.",
      ],
    },
    {
      heading: "4. Forces Acting Inside the Nucleus",
      body:
        "Three distinct forces act between nucleons, and only one of them is strong enough to overcome the fierce electrostatic repulsion between the protons packed inside a nucleus.",
      bullets: [
        "Gravitational force: present between all nucleons (since they have mass), but utterly negligible at nuclear scales — the weakest of the three.",
        "Electrostatic (Coulomb) force: repulsive, acts only between proton–proton pairs; far stronger than gravity, but still not strong enough on its own to hold a nucleus together.",
        "Nuclear force: the strongest force in nature at short range, acting between all nucleon pairs (p–p, n–n, and n–p alike) and powerful enough to overcome proton–proton electrostatic repulsion entirely, which is what actually binds the nucleus.",
      ],
    },
    {
      heading: "5. Features of the Nuclear Force",
      body:
        "The nuclear force has a strikingly different character from the familiar central forces of classical physics (gravity, electrostatics) — its short range, charge-independence and spin-dependence are exactly the features tested most often.",
      formula: [{ label: "Central force (for comparison)", expression: "F_c = (K/rⁿ) r̂  — magnitude depends only on distance, line of action passes through a fixed point" }],
      bullets: [
        "Very short range: effectively confined to nuclear dimensions (3–4 fm); beyond this range the nuclear force is essentially zero — unlike gravity or the Coulomb force, which extend to infinity.",
        "Strongly distance-dependent: even a small change in separation can swing the nuclear force dramatically, whereas the electrostatic force barely changes over the same small distance.",
        "Charge-independent: acts equally between n–n, p–p and n–p pairs — it doesn't care whether the nucleons are charged or not.",
        "Spin-dependent: stronger between nucleons with the same sense of spin (parallel spins) than between nucleons with opposite spins.",
        "Not a central force: its line of action does not always pass through a fixed point in the way gravitational and electrostatic forces do, so it cannot be written in the simple F = (K/rⁿ)r̂ form.",
        "Nature changes with distance: attractive for separations greater than about 0.8 fm, but repulsive for separations smaller than 0.8 fm — this short-range repulsive core is what stops nucleons from collapsing into each other entirely.",
      ],
    },
    {
      heading: "6. Einstein's Mass–Energy Equivalence",
      body:
        "Einstein's single most quoted result states that mass and energy are interconvertible — a fact that turns out to govern essentially every energy-release process in nuclear physics, from binding energy to fission to fusion.",
      formula: [{ label: "Mass–energy equivalence", expression: "E = mc²" }],
      bullets: [
        "E is the total energy associated with a mass m; c² simply acts as the (very large) conversion factor between mass units and energy units.",
        "A convenient working unit conversion used throughout this chapter: 1 u (atomic mass unit) of mass disappearing releases 931 MeV of energy (since 1 u × c² = 931 MeV).",
      ],
    },
    {
      heading: "7. Mass Defect and Binding Energy",
      body:
        "Every nucleus, when weighed, turns out to be lighter than the simple sum of its separate proton and neutron masses — that 'missing' mass is the mass defect, and Einstein's equivalence converts it directly into the nucleus's binding energy.",
      formula: [
        { label: "Mass defect (using nuclear mass M)", expression: "Δm = [Z·M_p + (A−Z)·M_n] − M" },
        { label: "Mass defect (using atomic mass M_atom, includes electrons)", expression: "Δm = [Z(M_p + M_e) + (A−Z)M_n] − M_atom" },
        { label: "Binding energy", expression: "E_b = Δm·c² = Δm(in u) × 931 MeV" },
      ],
      bullets: [
        "Binding energy is the energy that would be required to completely split a nucleus apart into its individual, free nucleons — equivalently, it's the energy released when those free nucleons first came together to form the nucleus.",
        "Binding energy is always positive — a bound nucleus is always lighter than its separated constituent nucleons, never heavier.",
        "When using atomic masses (which is how mass tables are usually given), the electron masses must be included on both sides of the mass-defect calculation, since atomic mass = nuclear mass + Z electron masses.",
      ],
    },
    {
      heading: "8. Binding Energy per Nucleon: The Stability Curve",
      body:
        "Dividing total binding energy by mass number gives binding energy per nucleon — and plotting this against A produces one of the most important graphs in all of nuclear physics, since it directly reveals which nuclei are most stable, and why both fission and fusion can release energy.",
      bullets: [
        "Binding energy per nucleon measures nuclear stability directly: the higher this value, the more tightly bound (and stable) the nucleus.",
        "The curve peaks at ⁵⁶Fe (iron-56), with a binding energy per nucleon of about 8.8 MeV — making it the most stable nucleus known by this measure.",
        "Uranium, by contrast, has a binding energy per nucleon of only about 7.7 MeV — noticeably lower than iron's, which is exactly why it's energetically favourable for it to split (fission) into more tightly-bound, medium-mass fragments.",
        "Medium-sized nuclei sit higher on the curve (more stable) than either very light or very heavy nuclei — this is the entire reason both fission (heavy → medium) and fusion (light → medium) are exothermic: both processes move nuclei towards the stability peak.",
        "Although the overall curve is smooth, it shows small peaks at certain nuclides (like ⁴He, ¹⁶O) — evidence of a shell-like structure inside the nucleus, broadly analogous to electron shells in atoms.",
      ],
    },
    {
      heading: "9. Nuclear Fission",
      body:
        "Nuclear fission is the splitting of a heavy nucleus (A > 230 or so) into two or more lighter fragments after being struck by a neutron — releasing an enormous amount of energy from a comparatively tiny amount of vanished mass.",
      formula: [
        { label: "General fission process", expression: "A + n → (excited nucleus) → B + C + Q" },
        { label: "Typical U-235 fission reactions", expression: "U²³⁵ + n → Ba + Kr + 3n + 200 MeV   or   U²³⁵ + n → Xe + Sr + 2n + 200 MeV" },
      ],
      bullets: [
        "First achieved (for U-235) by Hahn and Strassmann; the specific fragments produced vary from one fission event to the next, but the energy released is almost always close to 200 MeV per fission.",
        "Average number of secondary (released) neutrons per fission ≈ 2.5 — these are exactly what makes a self-sustaining chain reaction possible.",
        "Fission can be modelled using the 'liquid drop model' of the nucleus, treating it somewhat like a deformable, splittable droplet.",
        "The mass defect in a typical fission event is about 0.1% of the fissioning nucleus's mass; of the released energy Q, roughly 93% appears as kinetic energy of the fragments and the remaining ~7% as γ-rays.",
      ],
    },
    {
      heading: "10. Nuclear Chain Reaction and Critical Size",
      body:
        "Because each U-235 fission releases multiple secondary neutrons, and each of those can trigger further fissions, a single fission event can cascade into a self-sustaining (or even runaway) chain reaction — whether it does, and how fast, depends entirely on how many of those neutrons are actually retained versus lost.",
      formula: [{ label: "Reproduction factor", expression: "K = (rate of neutron production)/(rate of neutron loss)" }],
      bullets: [
        "Natural uranium is a mixture of 0.7% U-235 (easily fissioned by slow/thermal neutrons of KE ~0.03 eV) and 99.3% U-238 (not fissionable by these neutrons); 'enriched uranium' raises the U-235 fraction to about 3%.",
        "Secondary neutrons are lost in two main ways: leakage out of the sample (especially for small samples, due to high surface-to-volume ratio) and absorption by U-238, which cannot itself be fissioned by the resulting fast neutrons.",
        "Critical size: the minimum size of the uranium sample at which neutron production keeps pace with neutron loss, allowing the chain reaction to sustain itself at all.",
        "K = 1 (critical): steady, self-sustaining chain reaction — the operating condition of a nuclear reactor. K > 1 (supercritical): the reaction accelerates explosively — the principle of an atomic bomb, where an uncontrolled chain reaction releases its energy in roughly a microsecond. K < 1 (subcritical): the reaction dies out.",
      ],
    },
    {
      heading: "11. Nuclear Reactor",
      body:
        "A nuclear reactor is simply a fission chain reaction deliberately held at K = 1, using a specific set of components to keep the reaction controlled, steady and useful rather than explosive.",
      bullets: [
        "Nuclear fuel: most commonly U-235 (used in the majority of reactors); Pu-239 is actually the better fuel in several respects but isn't naturally available in usable quantities.",
        "Moderator: slows down the fast secondary neutrons to thermal (slow) speeds, since only slow neutrons efficiently fission U-235; must be light and must not itself readily absorb neutrons — heavy water (D₂O) is the commonly used moderator.",
        "Control rods: made of strong neutron absorbers (boron and cadmium are the standard choices), inserted or withdrawn to capture slow neutrons and precisely control the chain-reaction rate at any stage.",
        "Coolant: absorbs the heat generated by fission and transfers it onward (typically to water) for practical use, such as driving turbines to generate electricity; pressurised water is the commonly used coolant.",
      ],
    },
    {
      heading: "12. Fast Breeder Reactors",
      body:
        "A fast breeder reactor does double duty — generating energy from fission while simultaneously manufacturing fresh fissionable fuel (Pu-239) from otherwise non-fissionable U-238.",
      formula: [{ label: "Pu-239 production chain", expression: "U²³⁸ + n → U²³⁹ →(2 β⁻ decays)→ Pu²³⁹" }],
      bullets: [
        "Fuel: natural uranium. During ordinary U-235 fission, the secondary neutrons released are absorbed by the abundant U-238 present, converting it (via two successive β⁻ decays) into Pu-239.",
        "Pu-239 (half-life 2400 years) can then be chemically separated out and used as nuclear fuel in its own right — it has a smaller critical size than U-235, which is exactly why it's also used in nuclear weapons.",
      ],
    },
    {
      heading: "13. Nuclear Fusion",
      body:
        "Fusion is the mirror image of fission at the light end of the periodic table: two or more light nuclei combine into a single, more tightly-bound heavy nucleus, again releasing energy because the product sits higher on the binding-energy-per-nucleon curve than the reactants.",
      formula: [
        { label: "General fusion process", expression: "A + B → C + Q ,  with m_C < (m_A + m_B)" },
        { label: "Mass defect and energy released", expression: "Δm = [(m_A + m_B) − m_C] u  ⟹  E = Δm × 931 MeV" },
        { label: "Hydrogen fusion in stars", expression: "4(¹H¹) → ²He⁴ + 2β⁺ + 2ν + 26 MeV" },
      ],
      bullets: [
        "Both total binding energy and binding energy per nucleon of the product C are greater than those of the reactants A and B — this increase, ΔE = E_C − (E_A + E_B), is exactly the energy released.",
        "Energy released per fission event is much larger than energy released per fusion event, but on a per-nucleon basis the comparison flips: fission gives only about 0.85 MeV/nucleon (200 MeV ÷ 235), while hydrogen fusion gives roughly 6.5 MeV/nucleon (26 MeV ÷ 4) — fusion is far more efficient per nucleon involved.",
        "Two conditions are essential for fusion: very high temperature (to give the light nuclei enough kinetic energy to overcome their mutual Coulomb repulsion) and high pressure/density (to make collisions frequent enough for fusion to actually occur). These conditions exist naturally inside the Sun and other stars, where hydrogen exists as plasma and protons fuse into helium — this is the Sun's actual energy source.",
        "The hydrogen bomb is based on nuclear fusion (as opposed to the atomic bomb, based on fission).",
      ],
    },
    {
      heading: "14. Pair Production and Pair Annihilation",
      body:
        "Pair production and pair annihilation are two complementary processes that interconvert electromagnetic energy and matter — a γ-photon creating an electron–positron pair, or the reverse, an electron and positron annihilating into pure radiation.",
      formula: [
        { label: "Rest-mass energy of one electron (or positron)", expression: "0.51 MeV" },
        { label: "Rest-mass energy of the e⁻–e⁺ pair", expression: "1.02 MeV" },
        { label: "Kinetic energy shared by each particle (pair production)", expression: "K.E. (each) = (E_photon − 1.02)/2 MeV" },
      ],
      bullets: [
        "Pair production: a γ-photon of energy greater than 1.02 MeV, interacting with a nucleus (needed to conserve momentum), converts into an electron–positron pair. If the photon's energy exceeds 1.02 MeV, the extra energy is shared roughly equally between the two particles as kinetic energy.",
        "If the photon's energy is less than 1.02 MeV, pair production simply cannot occur — there isn't enough energy to create the rest mass of both particles.",
        "Pair annihilation: the reverse process — an electron and a positron combine, vanish, and their combined rest and kinetic energy is released as two γ-ray photons (two photons are needed, not one, to conserve momentum).",
      ],
    },
    {
      heading: "15. Radioactivity: Discovery and Basic Nature",
      body:
        "Radioactivity is the spontaneous emission of radiation from a nucleus — entirely unprompted by any external trigger — and it occurs only in nuclei that are unstable to begin with.",
      bullets: [
        "Discovered by Becquerel (hence radioactive radiations are sometimes called Becquerel radiations); the Curie couple (Marie and Pierre Curie) subsequently discovered many further radioactive substances.",
        "Only unstable nuclei show radioactivity; a given unstable nuclide emits whichever specific type of radiation it needs to in order to move towards stability.",
      ],
    },
    {
      heading: "16. Rutherford's Experiment: Nature of α, β and γ Rays",
      body:
        "By passing radiation from a radioactive sample through an external electric field, Rutherford showed that 'radioactive radiation' is actually three physically distinct things bundled together — two streams of charged particles and one form of electromagnetic radiation.",
      bullets: [
        "Setup: a radioactive sample is placed in a lead box (lead being an excellent absorber of nuclear radiation) with a narrow exit hole, so the emitted radiation passes through a region with an external electric field between charged plates.",
        "Radiation deflecting towards the negative plate (i.e., itself positively charged) is called α-rays; radiation deflecting towards the positive plate (negatively charged) is called β-rays; radiation passing through completely undeflected is called γ-rays.",
        "α-rays: streams of positively-charged particles (helium nuclei) — clearly particle in nature. β-rays: streams of negatively-charged particles (fast electrons) — also particle in nature. γ-rays: electromagnetic waves (high-energy photons), carrying no charge at all.",
      ],
    },
    {
      heading: "17. Comparing the Properties of α, β and γ Rays",
      body:
        "Beyond just their charge, α, β and γ radiation differ sharply in identity, mass, speed, ionising power and penetrating power — and the trends across these properties (ionising power high-to-low is the reverse of penetrating power) are a recurring theme in this chapter's conceptual questions.",
      bullets: [
        "Identity & charge: α = helium nucleus / doubly-ionised He ion, charge +2e. β = fast electron (β⁻) or positron (β⁺), charge ∓e. γ = electromagnetic photon, neutral (no charge).",
        "Mass: α ≈ 4m_p (substantial mass). β: rest mass equal to that of an electron (tiny). γ: rest mass exactly zero.",
        "Speed: α and β both travel at roughly 10⁷ m/s, but their speed depends on the emitting nucleus, so neither is a fixed 'characteristic' speed. γ-rays always travel at exactly c = 3×10⁸ m/s from every nucleus, but since this speed is the same for all photons regardless of source, it likewise isn't a distinguishing 'characteristic' feature in the way energy is.",
        "Energy spectrum: α and γ rays are emitted with discrete, line-like energies (specific to the decay); β-rays are emitted with a continuous spread of energies up to a maximum — a major historical puzzle that was resolved only by postulating the neutrino.",
        "Ionising power: α > β > γ, roughly in the ratio 10,000 : 100 : 1 — α-particles are by far the most ionising, since they're the most massive and most highly charged.",
        "Penetrating power: γ > β > α, exactly the reverse order of ionising power — the more strongly a radiation ionises (loses energy) as it passes through matter, the less far it penetrates.",
        "Behaviour in electric/magnetic fields: both α and β deflect (β deflects more, being far lighter for a similar charge magnitude), while γ-rays, having no charge, are undeflected.",
      ],
    },
    {
      heading: "18. Alpha Decay",
      body:
        "In α-decay, a nucleus ejects a complete helium-4 nucleus, dropping its mass number by 4 and its atomic number by 2 — a direct, large jump that moves a heavy, unstable nucleus markedly closer to (or into) the region of greater stability.",
      formula: [
        { label: "α-decay equation", expression: "ᴬZX (parent) → ᴬ⁻⁴Z₋₂Y (daughter) + ⁴₂He (α-particle)" },
        { label: "Disintegration (Q) value", expression: "Q = (m_X − m_Y − m_He)c²" },
      ],
      bullets: [
        "The total mass of the products (daughter nucleus + α-particle) is less than the mass of the parent nucleus; this 'missing' mass reappears entirely as the kinetic energy shared between the products.",
        "A spontaneous decay requires Q > 0 — if the calculated Q value comes out negative, the decay cannot happen on its own, regardless of how the equation is balanced on paper (nucleon and charge conservation alone don't guarantee a process is energetically allowed).",
      ],
    },
    {
      heading: "19. Beta Decay (β⁻, β⁺) and Electron Capture",
      body:
        "Unlike α-decay, β-decay leaves the mass number completely unchanged — it's fundamentally about converting one type of nucleon into the other, shifting the neutron-to-proton balance inside the nucleus while a lepton (electron or positron) and its accompanying (anti)neutrino are emitted.",
      formula: [
        { label: "β⁻ decay: underlying process", expression: "n → p + e⁻ + ν̄ (antineutrino)" },
        { label: "β⁻ decay equation", expression: "ᴬZX → ᴬZ₊₁Y + e⁻ + ν̄" },
        { label: "β⁺ decay: underlying process", expression: "p → n + e⁺ + ν (neutrino)" },
        { label: "β⁺ decay equation", expression: "ᴬZX → ᴬZ₋₁Y + e⁺ + ν" },
        { label: "K-electron capture", expression: "ᴬZX + e⁻(K-shell) → ᴬZ₋₁Y + ν  (+ characteristic X-rays)" },
      ],
      bullets: [
        "β⁻-decay: a neutron converts into a proton, increasing Z by 1 while A stays fixed; the n/p ratio decreases; the electron is always accompanied by an antineutrino.",
        "β⁺-decay: a proton converts into a neutron, decreasing Z by 1 while A stays fixed; the n/p ratio increases; the positron is always accompanied by a neutrino.",
        "In both forms of β-decay, parent and daughter nuclei are isobars (same A, since only a neutron and a proton are interchanged, not added or removed).",
        "K-electron capture: instead of emitting a positron, the nucleus captures one of its own inner-shell (K-shell) electrons, converting a proton into a neutron — behaving like β⁺ decay in the sense that n/p increases, but consuming an electron rather than emitting a positron. The resulting vacancy in the K-shell is filled by an electron transition from a higher shell, releasing characteristic X-rays in the process.",
        "Neutrinos and antineutrinos: both are chargeless, have (almost) zero rest mass, and carry spin quantum number ±1/2 (spin angular momentum ±ℏ/2) just like the electron. Pauli originally proposed their existence specifically to rescue energy, linear-momentum, and angular-momentum conservation in β-decay, given that the emitted electrons/positrons alone show a continuous energy spectrum rather than a single fixed value.",
      ],
    },
    {
      heading: "20. Gamma Decay",
      body:
        "γ-decay is the nuclear analogue of an atom's electron dropping to a lower energy level and emitting a photon — except here it's the nucleus itself, often left in an excited state after an α- or β-decay, relaxing down to its ground state.",
      formula: [{ label: "γ-decay equation", expression: "(ᴬZX)* → ᴬZX + γ (photon)   [* denotes an excited nucleus]" }],
      bullets: [
        "γ-emission changes neither Z nor A — it doesn't alter the nucleus's identity at all, only its internal energy state.",
        "γ-emission typically follows immediately after an α- or β-decay, whenever that decay leaves the daughter nucleus in an excited (rather than ground) state.",
        "Observing successive γ-ray emissions from the very same nucleus, at specific discrete energies, is itself strong evidence that nuclei — just like atoms — possess discrete internal energy levels.",
      ],
    },
    {
      heading: "21. Nuclear Reactions and Their Conservation Laws",
      body:
        "Every nuclear reaction, however it's written, must simultaneously satisfy several independent conservation laws — and checking these is the standard first step in balancing or analysing any nuclear equation.",
      formula: [{ label: "Compact notation for a nuclear reaction", expression: "X(a, b)Y  ⟺  X + a → Y + b" }],
      bullets: [
        "Conservation of total number of nucleons (mass number A is conserved across the reaction).",
        "Conservation of charge (atomic number Z, i.e. total charge, is conserved).",
        "Conservation of total mass-energy (accounting for any mass converted to/from energy via E = mc²).",
        "Conservation of linear momentum and of angular momentum, exactly as in any other physical process.",
      ],
    },
    {
      heading: "22. The Law of Radioactive Decay and Half-Life",
      body:
        "Radioactive decay is a purely statistical process at the level of any individual nucleus, but for a large collection of identical unstable nuclei it produces one of the cleanest results in all of physics: a simple exponential decline in the number of nuclei remaining over time.",
      formula: [
        { label: "Rutherford–Soddy decay law", expression: "−dN/dt = λN" },
        { label: "Number of active nuclei remaining at time t", expression: "N = N₀e^(−λt)" },
        { label: "Number of nuclei that have decayed by time t", expression: "N' = N₀ − N = N₀(1 − e^(−λt))" },
        { label: "Half-life", expression: "T_h = (ln 2)/λ = 0.693/λ ≈ 0.7/λ" },
      ],
      bullets: [
        "λ, the decay constant (also called disintegration constant, radioactivity constant, or the Rutherford–Soddy constant), represents the probability of decay per unit time for any single nucleus — it depends only on the nature of the substance, never on the amount present (N or mass), the elapsed time, or any physical/chemical conditions the sample is subjected to.",
        "The decay law is derived by integrating dN/N = −λ dt directly: ∫dN/N = −λ∫dt gives ln N = −λt + C, and applying the initial condition N = N₀ at t = 0 fixes C = ln N₀, leading straight to N = N₀e^(−λt).",
        "Half-life T_h is the time needed for the active nuclei to fall to exactly half their initial number; setting N = N₀/2 in the decay law and solving gives T_h = (ln 2)/λ — a fixed, time-independent quantity for any given radioactive species, completely unaffected by how much of the substance you started with.",
      ],
    },
  ],
};
