import type { ChapterShortNotes } from "./kinematics-short";

export const nucleiShortNotes: ChapterShortNotes = {
  chapterName: "Nuclei",
  className: "12",
  groups: [
    {
      heading: "Nucleus Basics",
      points: [
        "Nucleus discovered by Rutherford (α-scattering). R_nucleus~10⁻¹⁵m (fm); R_atom~10⁻¹⁰m (Å). Nucleons = protons+neutrons.",
        "₍Z₎Xᴬ: Z=atomic number=protons; A=mass number=Z+N. 1u=1.66×10⁻²⁷kg.",
        "m_p=1.00727u, m_n=1.00866u, m_e=0.00055u — neutron slightly heavier than proton (why free proton can't β-decay but free neutron can).",
        "Isotopes: same Z. Isobars: same A. Isotones: same (A−Z).",
      ],
    },
    {
      heading: "Size, Volume, Mass, Density",
      points: [
        "R = R₀A^(1/3), R₀≈1.2 fm. Volume ∝ A. Mass ≈ A·m_p ∝ A. Density ρ ≈ 3×10¹⁷ kg/m³ — same for ALL nuclei, independent of A.",
        "Radius via electron scattering ≠ radius via α-scattering: electrons sense charge distribution, α-particles sense nuclear matter distribution.",
      ],
    },
    {
      heading: "Nuclear Force",
      points: [
        "3 forces inside nucleus: gravitational (weakest), Coulomb (repulsive, p-p only), nuclear (strongest, binds nucleus).",
        "Nuclear force: short range (3-4 fm only), strongly distance-dependent, charge-independent (n-n=p-p=n-p), spin-dependent (stronger for parallel spins), NOT central force.",
        "Attractive beyond ~0.8 fm; repulsive below ~0.8 fm.",
      ],
    },
    {
      heading: "Mass-Energy, Mass Defect, Binding Energy",
      points: [
        "E=mc². 1u × c² = 931 MeV (key conversion).",
        "Δm = [Z·M_p+(A−Z)M_n] − M(nucleus) [or include M_e's if using atomic mass]. E_b = Δm·c² = Δm(u)×931 MeV. E_b always positive.",
        "BE/nucleon = stability measure. Peak at ⁵⁶Fe (~8.8 MeV/nucleon, most stable). U: ~7.7 MeV/nucleon (unstable, hence fissionable).",
        "Medium nuclei most stable ⟹ both fission (heavy→medium) and fusion (light→medium) release energy by moving toward the peak.",
        "Small peaks at ⁴He, ¹⁶O on BE curve ⟹ evidence of nuclear shell structure.",
      ],
    },
    {
      heading: "Nuclear Fission",
      points: [
        "Heavy nucleus (A>230) + n → excited nucleus → 2 fragments + ~2-3 n + ~200 MeV. First done by Hahn & Strassmann (U-235).",
        "Avg secondary neutrons ≈2.5. Explained via liquid drop model. Δm≈0.1% of fissioning mass. ~93% energy→KE of fragments, ~7%→γ-rays.",
      ],
    },
    {
      heading: "Chain Reaction & Reactor",
      points: [
        "K = (neutron production rate)/(neutron loss rate). K=1 critical (steady, reactor); K>1 supercritical (explosive, bomb); K<1 subcritical (dies out).",
        "Natural U: 0.7% U-235 + 99.3% U-238. Enriched U: ~3% U-235. U-235 fissioned by slow/thermal neutrons (~0.03 eV); U-238 not fissionable by fast neutrons but absorbs them.",
        "Neutron losses: leakage from surface + absorption by U-238. Critical size = minimum size to sustain chain reaction.",
        "Reactor parts: Fuel (U-235, best=Pu-239 but not natural); Moderator (slows neutrons, e.g. heavy water D₂O); Control rods (absorb neutrons, e.g. boron/cadmium); Coolant (removes heat, e.g. pressurised water).",
      ],
    },
    {
      heading: "Fast Breeder Reactor & Fusion",
      points: [
        "Fast breeder: fuel=natural U. U-238+n→U-239→(2β⁻)→Pu-239 (half-life 2400 yr; smaller critical size than U-235 ⟹ also usable in weapons).",
        "Fusion: A+B→C+Q, m_C<(m_A+m_B). Δm=[(m_A+m_B)−m_C]u, E=Δm×931 MeV. BE & BE/nucleon of C > of A,B.",
        "4(¹H¹)→²He⁴+2β⁺+2ν+26 MeV. Per-nucleon: fission≈0.85 MeV/nucleon, fusion≈6.5 MeV/nucleon (fusion more efficient per nucleon, fission releases more energy per single event).",
        "Fusion needs: high T (overcome Coulomb barrier) + high pressure/density (frequent collisions). Occurs in Sun/stars. H-bomb based on fusion (vs A-bomb on fission).",
      ],
    },
    {
      heading: "Pair Production & Annihilation",
      points: [
        "Rest energy: e⁻ or e⁺ = 0.51 MeV; pair = 1.02 MeV. Pair production needs photon E>1.02 MeV (near a nucleus, for momentum conservation); extra energy (E−1.02) split equally as KE of each particle.",
        "E_photon<1.02 MeV ⟹ no pair production. Pair annihilation: e⁻+e⁺→2γ photons (two, for momentum conservation).",
      ],
    },
    {
      heading: "Radioactivity — Nature of Rays",
      points: [
        "Discovered by Becquerel (Becquerel radiations); Curie couple discovered more radioactive substances. Only unstable nuclei show it.",
        "Rutherford's e-field experiment: deflect to −ve plate = α (charge +2e, He nucleus); deflect to +ve plate = β (charge ∓e); undeflected = γ (neutral, EM wave).",
        "Mass: α≈4m_p; β=electron rest mass; γ=0. Speed: α,β~10⁷ m/s (not characteristic, varies by nucleus); γ=c always (also not 'characteristic' since same for all).",
        "Energy spectrum: α,γ = discrete/line; β = continuous (up to a max) — historically explained by postulating the neutrino.",
        "Ionising power: α>β>γ (~10000:100:1). Penetrating power: γ>β>α — exactly reverse of ionising power.",
        "Deflection in E/B field: α & β deflect (β more, lighter); γ undeflected (no charge).",
      ],
    },
    {
      heading: "Types of Radioactive Decay",
      points: [
        "α-decay: ᴬZX→ᴬ⁻⁴Z₋₂Y+⁴₂He. A↓4, Z↓2. Q=(m_X−m_Y−m_He)c² — must be >0 for spontaneous decay.",
        "β⁻-decay: n→p+e⁻+ν̄. ᴬZX→ᴬZ₊₁Y+e⁻+ν̄. A unchanged, Z↑1, n/p ratio ↓.",
        "β⁺-decay: p→n+e⁺+ν. ᴬZX→ᴬZ₋₁Y+e⁺+ν. A unchanged, Z↓1, n/p ratio ↑.",
        "Parent & daughter in β-decay are isobars (same A). K-capture: ᴬZX+e⁻(K-shell)→ᴬZ₋₁Y+ν+X-rays — like β⁺ (n/p↑) but consumes an electron instead of emitting a positron; X-rays from the K-shell vacancy being filled.",
        "ν, ν̄: chargeless, ~zero rest mass, spin ±1/2. Proposed by Pauli to save energy/momentum/angular-momentum conservation in β-decay (continuous β spectrum was the clue).",
        "γ-decay: (ᴬZX)*→ᴬZX+γ. No change in Z or A — only de-excitation. Usually follows α or β decay. Successive γ emissions at fixed energies ⟹ nuclei have discrete energy levels (like atoms).",
      ],
    },
    {
      heading: "Nuclear Reactions — Conservation Laws",
      points: [
        "X(a,b)Y ⟺ X+a→Y+b. Conserved: total nucleon number (A), charge (Z), total mass-energy, linear momentum, angular momentum.",
      ],
    },
    {
      heading: "Law of Radioactive Decay",
      points: [
        "−dN/dt = λN ⟹ N = N₀e^(−λt). Decayed nuclei: N' = N₀−N = N₀(1−e^(−λt)).",
        "λ = decay constant = probability of decay per unit time per nucleus. Depends ONLY on the substance — NOT on amount (N or mass), elapsed time, or physical/chemical conditions.",
        "Half-life T_h = ln2/λ = 0.693/λ ≈ 0.7/λ. Fixed for a given species, independent of initial amount.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Nuclear density is INDEPENDENT of mass number A — don't assume heavier nuclei are denser, they're just bigger (same ρ for all).",
        "Ionising power order (α>β>γ) is the EXACT REVERSE of penetrating power order (γ>β>α) — easy to mix up under time pressure.",
        "Speed of α/β is NOT a fixed 'characteristic' value (depends on the specific nucleus); speed of γ IS always c, but that's true for all photons so it's not 'characteristic' either, in the sense of identifying a nucleus.",
        "β-decay: A stays the SAME (only n/p ratio changes) — don't confuse with α-decay, which changes both A and Z.",
        "λ depends only on the nature of the substance — explicitly NOT on the amount present or on temperature/pressure/chemical state. A very common false-option in MCQs.",
        "A nuclear equation balancing on paper (A and Z conserved) does NOT guarantee the decay happens spontaneously — that additionally requires Q > 0 (check the actual masses).",
        "Free neutron decay (n→p+e⁻+ν̄) is possible; the reverse, free proton decay, is NOT possible, since the proton is (very slightly) lighter than the neutron.",
      ],
    },
  ],
};
