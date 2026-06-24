import type { ChapterShortNotes } from "./gravitation-short";

export const atomsShortNotes: ChapterShortNotes = {
  chapterName: "Atoms",
  className: "12",
  groups: [
    {
      heading: "Early Models",
      points: [
        "Thomson's model: positive charge spread through the whole sphere, electrons embedded in it ('plum pudding'). Couldn't explain spectra or large-angle alpha scattering.",
      ],
    },
    {
      heading: "Rutherford's Scattering Experiment",
      points: [
        "Alpha particles fired at thin gold foil; most pass straight through, a few deflect strongly, ~1 in 8000 bounce back.",
        "N(θ) ∝ cosec⁴(θ/2) — sharply peaked at small angles.",
        "Conclusion: atom is mostly empty space, with nearly all mass and all positive charge concentrated in a tiny nucleus.",
        "Nuclear diameter < ~10⁻¹⁵ m; atomic diameter ~10⁻¹⁰ m.",
      ],
    },
    {
      heading: "Closest Approach and Impact Parameter",
      points: [
        "r₀ = (1/4πε₀)(2Ze²)/E_K — head-on closest approach, all KE converted to PE.",
        "b = (1/4πε₀)(Ze²/E_K) cot(θ/2) — small b ⟹ large deflection; large b ⟹ small deflection.",
      ],
    },
    {
      heading: "Failure of Rutherford's Model",
      points: [
        "Classically, an accelerating (orbiting) electron should radiate energy continuously and spiral into the nucleus — predicts atoms can't be stable.",
        "Gives no reason for discrete spectral lines instead of a continuous spectrum.",
      ],
    },
    {
      heading: "Bohr's Postulates",
      points: [
        "Coulomb force = centripetal force: (1/4πε₀)(Ze²/r²) = mv²/r.",
        "Angular momentum quantized: mvr = nh/2π, n = 1,2,3,...",
        "Electron in an allowed orbit does not radiate — stationary states, constant energy.",
        "Radiation emitted/absorbed only on a jump between orbits: E₂ − E₁ = hν.",
      ],
    },
    {
      heading: "Orbit Formulas (Hydrogen-Like, Charge Ze)",
      points: [
        "r_n = ε₀n²h²/(πmZe²); r_n ∝ n²/Z; r₁(H) = 0.529 Å.",
        "v_n = Ze²/(2ε₀nh); v_n ∝ Z/n; v₁(H) ≈ 2.2×10⁶ m/s.",
        "E_n = −13.6 Z²/n² eV; E_n ∝ Z²/n².",
        "KE = −E_n (always positive); PE = 2E_n (always negative) — PE is twice the magnitude of total energy.",
        "Time period T_n ∝ n³/Z; orbital frequency f_n ∝ Z²/n³; angular momentum L_n = nh/2π ∝ n.",
      ],
    },
    {
      heading: "Energy Levels of Hydrogen",
      points: [
        "n=1: −13.6 eV (ground state, K-shell). n=2: −3.4 eV (L). n=3: −1.51 eV (M). n=4: −0.85 eV. n=∞: 0 eV.",
        "Binding energy at level n = |E_n|.",
        "First excitation energy (H) = 10.2 eV; ionisation energy (H, ground state) = 13.6 eV.",
      ],
    },
    {
      heading: "Excitation, Ionisation and Spectra",
      points: [
        "Excitation: electron jumps to a higher orbit. Ionisation: electron removed completely (n→∞).",
        "Excited states last ~10⁻⁸ s before the electron falls back, emitting a photon.",
        "Emission spectrum: bright lines on dark background (electron drops down). Absorption spectrum: dark lines on bright background (electron jumps up) — same wavelengths as emission, opposite contrast.",
      ],
    },
    {
      heading: "Spectral Series of Hydrogen",
      points: [
        "1/λ = R[1/n₁² − 1/n₂²]; R ≈ 1.097×10⁷ m⁻¹.",
        "Lyman: n₁=1, UV, series limit ≈ 912 Å.",
        "Balmer: n₁=2, visible (+ near-UV), series limit ≈ 3646 Å, Hα (n₂=3) ≈ 6563 Å.",
        "Paschen (n₁=3), Brackett (n₁=4), Pfund (n₁=5): all infrared.",
        "Lines converge (bunch up) as n₂ → ∞ within any series.",
      ],
    },
    {
      heading: "Hydrogen-Like Ions",
      points: [
        "Same Bohr formulas apply to any single-electron ion of nuclear charge Ze: He⁺ (Z=2), Li²⁺ (Z=3), etc.",
        "Ionisation energy scales as Z²: He⁺ = 54.4 eV, Li²⁺ = 122.4 eV.",
        "Z of an unknown hydrogen-like ion = √(measured IE / 13.6 eV).",
      ],
    },
    {
      heading: "De Broglie's Justification",
      points: [
        "Standing-wave condition: 2πr_n = nλ, with λ = h/(mv).",
        "Combining the two reproduces Bohr's quantization rule directly — orbits are where the electron's wave closes on itself constructively.",
      ],
    },
    {
      heading: "Limitations of Bohr's Model",
      points: [
        "Works only for single-electron systems — fails for multi-electron atoms (no electron-electron interaction).",
        "Can't explain fine structure, Zeeman effect, or Stark effect.",
        "Still assumes a precise circular orbit — replaced by probability clouds in true quantum mechanics.",
        "Semi-classical: quantizes energy/angular momentum but keeps a classical circular-motion picture.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Don't forget the negative sign on E_n — 'energy increases' with n means E_n becomes less negative (closer to zero), not larger in magnitude.",
        "KE = −E_n and PE = 2E_n — a very common source of sign and factor-of-2 errors; PE is NOT just −E_n.",
        "Number of spectral lines from n down to 1 is n(n−1)/2, not n² or n−1 — don't forget this combinatorial formula.",
        "Z² appears in energy/ionisation formulas, but Z¹ (not Z²) appears in the velocity formula, and 1/Z in the radius formula — don't apply the same power of Z to every quantity.",
        "Balmer series is the only one with visible lines; all of Paschen, Brackett, and Pfund are infrared — a frequently tested distinction.",
      ],
    },
  ],
};
