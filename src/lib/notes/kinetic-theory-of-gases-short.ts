export type ShortNoteGroup = {
  heading: string;
  points: string[];
};

export type ChapterShortNotes = {
  chapterName: string;
  className: "11" | "12";
  groups: ShortNoteGroup[];
};

export const kineticTheoryOfGasesShortNotes: ChapterShortNotes = {
  chapterName: "Kinetic Theory of Gases",
  className: "11",
  groups: [
    {
      heading: "Assumptions of Kinetic Theory",
      points: [
        "Huge number of identical molecules, random motion, obey Newton's laws.",
        "Molecular volume negligible vs container volume — molecules treated as point masses.",
        "NO intermolecular forces except DURING collision. Collisions perfectly ELASTIC.",
        "Time of collision << time between collisions. Straight-line motion between collisions.",
      ],
    },
    {
      heading: "Gas Laws & Ideal Gas Equation",
      points: [
        "Boyle's law: PV=const (T,n fixed). Charles' law: V/T=const (P,n fixed). Gay-Lussac's: P/T=const (V,n fixed).",
        "Avogadro's law: equal V, same T & P ⇒ equal number of molecules, regardless of gas identity.",
        "PV = nRT = NkT. k = R/N_A ≈ 1.38×10⁻²³ J/K (Boltzmann constant — R on a per-molecule basis).",
        "Ideal gas behaviour is best approached at LOW pressure & HIGH temperature.",
      ],
    },
    {
      heading: "Kinetic Theory Derivation of Pressure",
      points: [
        "P = (1/3)ρ⟨v²⟩ = (1/3)(N/V)m⟨v²⟩.",
        "PV = (2/3)E, where E = total translational KE of the gas.",
        "Factor 1/3 comes from velocity being equally shared among x,y,z directions.",
      ],
    },
    {
      heading: "Kinetic Interpretation of Temperature",
      points: [
        "⟨KE⟩ per molecule = (3/2)kT — depends ONLY on T, NOT on mass/identity/P/V.",
        "v_rms = √(3kT/m) = √(3RT/M). Lighter molecules (smaller M) ⇒ HIGHER v_rms at same T.",
        "T=0 K ⇒ average KE → 0 (unreachable in practice).",
      ],
    },
    {
      heading: "Molecular Speed Distribution",
      points: [
        "v_rms = √(3RT/M); v_avg = √(8RT/πM); v_p (most probable) = √(2RT/M).",
        "ALWAYS: v_rms > v_avg > v_p (fixed order for any gas, any T).",
        "Maxwell distribution: rises from 0, peaks at v_p, long tail to high speed — NOT symmetric.",
        "Higher T ⇒ curve shifts right & flattens; area under curve (total molecules) stays the same.",
      ],
    },
    {
      heading: "Degrees of Freedom & Equipartition",
      points: [
        "Equipartition law: average energy per degree of freedom = (1/2)kT. Total ⟨E⟩ = (f/2)kT.",
        "Monoatomic: f=3 (translation only). Diatomic (no vibration): f=5 (3 trans+2 rot).",
        "Diatomic WITH vibration (high T): f=7. Non-linear polyatomic: f=6 (3 trans+3 rot).",
        "Each VIBRATIONAL mode adds 2 dof (KE + PE of the 'spring'), not 1 — common slip point.",
      ],
    },
    {
      heading: "Specific Heats via Equipartition",
      points: [
        "C_v=(f/2)R, C_P=C_v+R=[(f+2)/2]R, γ=1+2/f.",
        "f=3: γ=5/3≈1.67. f=5: γ=7/5=1.4. f=7: γ=9/7≈1.29. f=6: γ=4/3≈1.33.",
        "MORE degrees of freedom ⇒ γ closer to 1 (more places to store absorbed energy).",
      ],
    },
    {
      heading: "Mean Free Path",
      points: [
        "λ = 1/(√2 π d²n). d=molecular diameter, n=number density.",
        "λ ∝ 1/n — compressing gas (↑n) ⇒ shorter λ. Low-pressure gas ⇒ long λ.",
        "√2 factor arises because BOTH colliding molecules are moving (relative speed), not just the tracked one.",
      ],
    },
    {
      heading: "Real Gases & Van der Waals Equation",
      points: [
        "(P + a/V²)(V−b) = RT (per mole). 'a' → intermolecular ATTRACTION correction. 'b' → finite molecular SIZE (excluded volume).",
        "Real gas ≈ ideal gas at LOW pressure + HIGH temperature (molecules far apart, fast-moving).",
        "Above the critical temperature, a gas CANNOT be liquefied no matter how much pressure is applied.",
      ],
    },
    {
      heading: "Brownian Motion & Avogadro's Number",
      points: [
        "Brownian motion: random zig-zag of suspended particles from molecular bombardment — direct visual evidence for molecular motion.",
        "More vigorous at: HIGHER temperature, SMALLER suspended particle size.",
        "N_A ≈ 6.022×10²³ /mol — bridges molecular (k) and molar (R) descriptions: k = R/N_A.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Average translational KE per molecule (3/2)kT depends ONLY on T — never on the gas's molar mass. Don't assume heavier gas molecules carry more KE at the same T (they don't; they just move SLOWER).",
        "v_rms, v_avg, v_p are NOT equal — always v_rms > v_avg > v_p. A common slip is treating all three as the same 'average speed'.",
        "Vibrational degrees of freedom contribute 2 each (KE+PE), not 1 — under-counting this is a frequent f/γ error.",
        "γ = 1+2/f is INVERSE in f — more degrees of freedom give a SMALLER γ, not larger.",
        "λ ∝ 1/n (inversely proportional to number density), not directly proportional — compressing a gas SHORTENS the mean free path.",
        "Van der Waals 'a' (attraction) and 'b' (size) correct DIFFERENT assumptions — don't mix up which constant fixes which idealisation.",
        "PV=(2/3)E uses only TRANSLATIONAL kinetic energy, even for polyatomic gases with rotational/vibrational energy too — don't substitute total internal energy here.",
      ],
    },
  ],
};
