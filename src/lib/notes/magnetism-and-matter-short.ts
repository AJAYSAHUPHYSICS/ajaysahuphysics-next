import type { ChapterShortNotes } from "./kinematics-short";

export const magnetismAndMatterShortNotes: ChapterShortNotes = {
  chapterName: "Magnetism & Matter",
  className: "12",
  groups: [
    {
      heading: "Bar Magnet Basics",
      points: [
        "M = ml (effective length l, pole strength m); SI unit A·m². Coulomb's law for poles: F = (μ₀/4π)(m₁m₂/r²).",
        "Effective length l ≈ (5/6)l₀ ≈ 0.83l₀ — always slightly less than geometric length l₀, since poles sit a little inside the ends.",
        "Pole strength m ∝ area of cross-section; isolated magnetic monopoles don't exist ⟹ ∮B·dA = 0 always (Gauss's law for magnetism).",
        "Bar magnet ≡ equivalent solenoid: same external field pattern; field lines are closed loops (continue inside the magnet too, unlike electric field lines).",
      ],
    },
    {
      heading: "Field Due to a Bar Magnet",
      points: [
        "Axial (far, r≫l): B_axial ≈ (μ₀/4π)(2M/r³), along M. Equatorial (far, r≫l): B_eq ≈ (μ₀/4π)(M/r³), opposite to M.",
        "At equal distance, B_axial = 2B_eq — same 1/r³ pattern as an electric dipole.",
      ],
    },
    {
      heading: "Dipole in a Uniform Field",
      points: [
        "τ = M×B = MBsinθ (max at 90°, zero at 0°/180°); U = −M·B = −MBcosθ.",
        "θ=0°: U=−MB (stable equilibrium, minimum). θ=180°: U=+MB (unstable, maximum). θ=90°: U=0 but torque is maximum — no equilibrium.",
        "W(θ₁→θ₂) = MB(cosθ₁−cosθ₂); W(0→θ) = MB(1−cosθ) = 2MBsin²(θ/2). Work done = increase in PE (net force is zero, so no other energy sink).",
      ],
    },
    {
      heading: "Geomagnetism — Elements of the Earth",
      points: [
        "Magnetic axis tilted ≈11.3° from geographic axis. Declination φ = angle between geographic & magnetic meridian.",
        "Dip θ = angle resultant field makes with horizontal, in the magnetic meridian. B_H = Bcosθ, B_V = Bsinθ, B=√(B_H²+B_V²), tanθ=B_V/B_H.",
        "At magnetic poles: θ=90°, B_H=0, B_V=B(max). At magnetic equator: θ=0°, B_H=B(max), B_V=0.",
        "NHS: N-pole of needle dips down. SHS: S-pole dips down. Dip measured with a dip circle.",
      ],
    },
    {
      heading: "Apparent Dip",
      points: [
        "Off the meridian by angle α: tanθₐ = tanθ/cosα. Rotated 90° further: tanθ'ₐ = tanθ/sinα.",
        "True dip recovered without locating the meridian: cot²θₐ + cot²θ'ₐ = cot²θ.",
      ],
    },
    {
      heading: "Tangent Galvanometer & Vibration Magnetometer",
      points: [
        "TG: B₀ = μ₀NI/(2R) at centre, set ⊥ to B_H in the magnetic meridian. Tangent law: B₀ = B_H tanθ ⟹ I = Ktanθ, K = 2RB_H/(μ₀N).",
        "K (reduction factor) = current giving 45° deflection. Max sensitivity/accuracy of TG near θ=45°.",
        "Vibration magnetometer: T = 2π√(I/MB_H) — I is moment of inertia of the suspended magnet (not current!).",
        "Same-size magnets: M₁/M₂ = T₂²/T₁². Sum combination (like poles together, M₁+M₂) and difference combination (unlike poles, M₁−M₂) give T₁/T₂ = √[(M₁−M₂)/(M₁+M₂)] — works even for different-sized magnets.",
        "Comparing B_H at two places with the same magnet: B_H1/B_H2 = T₂²/T₁² (correct for dip angle if different: × cosθ₁/cosθ₂).",
      ],
    },
    {
      heading: "Neutral Points",
      points: [
        "N-pole towards geographic north ⟹ neutral points on equatorial line: (μ₀/4π)(M/y³) = B_H.",
        "S-pole towards geographic north ⟹ neutral points on axial line: (μ₀/4π)(2M/x³) = B_H.",
        "At a neutral point the magnet's field cancels B_H exactly — a compass needle there can point any direction.",
      ],
    },
    {
      heading: "Magnetic Properties of Materials",
      points: [
        "H = B₀/μ₀ (A/m, set by external source); I = M/V (A/m, material's response); χ = I/H (dimensionless).",
        "μ = B/H; μᵣ = μ/μ₀; B = μ₀(H+I) ⟹ μ = μ₀(1+χ) ⟺ μᵣ = 1+χ. Vacuum: χ=0, μᵣ=1. Air (STP): χ≈0.04, μᵣ≈1.04.",
      ],
    },
    {
      heading: "Dia / Para / Ferromagnetic — Side by Side",
      points: [
        "Diamagnetic (Bi, Cu, Ag, H₂O, NaCl, diamond): no permanent atomic moment; induced moment opposes field; χ small & negative, μᵣ<1; repelled (strong→weak field); χ ~ temp-independent.",
        "Paramagnetic (Na, K, Mg, Al, O₂, Pt): permanent but randomly oriented atomic moments; partially aligns; χ small & positive, μᵣ slightly >1; weakly attracted; Curie's law χ∝1/T.",
        "Ferromagnetic (Fe, Co, Ni, alloys, Fe₃O₄): domains of aligned moments even without field; strongly attracted; χ very large & positive, μᵣ≫1; shows hysteresis (only this group does).",
        "Above Curie temp T_C, ferromagnet → ordinary paramagnet: Curie–Weiss law χ∝1/(T−T_C). T_C(Fe) = 770°C = 1043K.",
      ],
    },
    {
      heading: "Hysteresis, Shielding, Electromagnets",
      points: [
        "Hysteresis = B lags H; retentivity (B_r) = residual B at H=0; coercivity = reverse H needed to demagnetise.",
        "Energy lost/cycle/volume = area of B–H loop. Total loss = volume × loop area × frequency × time.",
        "Soft magnetic (soft iron): low retentivity & coercivity, small loop — electromagnets, transformer cores. Hard magnetic (steel, Alnico): high retentivity & coercivity, large loop — permanent magnets.",
        "Magnetic shielding: soft-iron casing channels field lines around the enclosed space (B≈0 inside). Superconductors: perfect shielding via Meissner effect, μᵣ≈0, behave as perfect diamagnets.",
        "Electromagnet: soft-iron core inside a solenoid boosts B hugely; temporary magnetism (lost when current stops) — bells, cranes, relays.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Don't confuse the magnet's own neutral point (its centre, zero net pole force) with a geomagnetic neutral point (where the magnet's field cancels B_H) — they're unrelated concepts sharing a name.",
        "N-pole-towards-north gives neutral points on the equatorial line (not axial) — it's easy to swap these by reflex from the axial-field-is-stronger intuition.",
        "In the vibration magnetometer formula, I is moment of inertia of the magnet, not current — a very common mix-up given the same symbol used for current elsewhere in electromagnetism.",
        "Apparent dip is always ≥ true dip (since cosα ≤ 1) — a quick sanity check when solving apparent-dip problems.",
        "μᵣ = 1 + χ, not μᵣ = χ — diamagnetic materials have small negative χ but μᵣ is still close to (just under) 1, never negative.",
        "Tangent galvanometer current is proportional to tanθ, not θ — sensitivity is best near 45°, not near 0° or 90°.",
      ],
    },
  ],
};
