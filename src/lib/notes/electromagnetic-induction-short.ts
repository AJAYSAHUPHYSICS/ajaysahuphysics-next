import type { ChapterShortNotes } from "./kinematics-short";

export const electromagneticInductionShortNotes: ChapterShortNotes = {
  chapterName: "Electromagnetic Induction",
  className: "12",
  groups: [
    {
      heading: "Magnetic Flux & Faraday's Law",
      points: [
        "Φ = B·A = BAcosθ (θ from the normal); SI unit weber (Wb), 1 Wb = 1 T·m². For N turns, flux LINKAGE is NΦ.",
        "Flux through any CLOSED surface is always zero (Gauss's law for magnetism) — field lines never begin or end.",
        "Faraday's law: ε = −dΦ/dt (single turn), ε = −N(dΦ/dt) (N turns). Depends only on the RATE of change of flux, never its magnitude.",
        "Doesn't matter WHY flux changes — moving magnet, changing current nearby, rotating coil, or changing area/shape — the law applies identically.",
        "An open circuit still develops an induced EMF (measurable across the break); it just can't sustain a current.",
      ],
    },
    {
      heading: "Lenz's Law",
      points: [
        "Induced current opposes the CHANGE in flux (not the field itself) — a restatement of energy conservation, built into Faraday's law as the negative sign.",
        "Flux increasing ⟹ induced current opposes the increase. Flux decreasing ⟹ induced current tries to maintain it.",
        "Pulling a magnet toward a coil always meets repulsion; pushing it away always meets attraction — mechanical work done = electrical energy generated.",
        "Fastest way to get the DIRECTION of induced current in conceptual questions — no calculation needed.",
      ],
    },
    {
      heading: "Motional EMF",
      points: [
        "Rod on rails (v, B, l mutually ⊥): ε = Bvl, I = Bvl/R, retarding force F = BIl = B²l²v/R.",
        "Two equivalent derivations: (1) Faraday's law — area swept changes at rate lv, so dΦ/dt = Blv. (2) Force on free charges — F/q = v×B pushes charges to one end until equilibrium; ε = ∫(v×B)·dl = Bvl.",
        "Rod rotating about one end: ε = ½Bωl² — each element at radius r moves at ωr, contributing dε = B(ωr)dr, integrated 0 to l. Direct preview of the AC generator.",
        "Constant-velocity rod: applied force must exactly balance B²l²v/R at every instant — this IS the simplest working generator.",
      ],
    },
    {
      heading: "Eddy Currents",
      points: [
        "Swirling induced currents inside bulk conductors (not confined to a thin wire) — always oppose the motion/change causing them (Lenz's law).",
        "Useful: induction furnaces, induction cooktops, magnetic braking (trains, roller coasters), older speedometers.",
        "Unwanted: wasted heating in transformer cores — minimised with a LAMINATED (thin, insulated sheets) core instead of a solid block.",
        "Not a separate phenomenon — just ordinary induced current flowing in loops through bulk material rather than a designed wire circuit.",
      ],
    },
    {
      heading: "Self-Inductance",
      points: [
        "Φ = LI; self-induced EMF ε = −L(dI/dt). L depends only on geometry & core material — never on I itself (like capacitance C).",
        "Opposes the CHANGE in current, not the current — no effect on steady current, resists sudden changes ('electrical inertia').",
        "SI unit henry (H); 1 H = 1 Wb/A = 1 V·s/A.",
        "Long solenoid: L = μ₀n²Al = μ₀N²A/l. Derivation: B=μ₀nI inside, flux linkage NΦ=(nl)(BA)=μ₀n²AlI. Ferromagnetic core multiplies L by μᵣ.",
        "L ∝ n² — doubling turn density quadruples L for the same solenoid length and area.",
      ],
    },
    {
      heading: "Mutual Inductance",
      points: [
        "Φ₂ = MI₁; mutually induced EMF ε₂ = −M(dI₁/dt). M depends on both coils' geometry AND relative position/orientation.",
        "Reciprocity: M₁₂ = M₂₁ always — one single M describes the coupling regardless of which coil drives the other.",
        "Entire operating principle of a TRANSFORMER — AC in the primary induces AC EMF in the secondary purely through mutual coupling, no direct electrical connection.",
        "Two coaxial solenoids: M = μ₀N₁N₂A/l — same pattern as self-inductance: find the field from one coil, then the flux it produces through the other's turns.",
      ],
    },
    {
      heading: "Combining Inductances & Stored Energy",
      points: [
        "No mutual coupling: series L(eq) = L₁+L₂+⋯ (like resistors); parallel 1/L(eq) = 1/L₁+1/L₂+⋯. Opposite pattern to capacitors.",
        "Energy stored in an inductor: U = ½LI² (derived from P=εI=L(dI/dt)·I, integrated 0 to I). Structurally identical to a capacitor's U=½CV².",
        "Energy density of magnetic field: u = B²/2μ₀ — directly parallel to u=½ε₀E² for the electric field.",
        "Breaking a current-carrying inductive circuit suddenly can spike voltage dangerously — stored energy must dissipate quickly as di/dt spikes.",
      ],
    },
    {
      heading: "LR Circuit — Growth & Decay",
      points: [
        "Growth (battery connected): I(t) = I₀(1−e^(−t/τ)), τ = L/R, I₀ = ε/R. From ε = IR + L(dI/dt).",
        "At t=τ, current reaches 63.2% of final value; never reaches I₀ exactly, only asymptotically. Same shape as RC charging.",
        "Decay (short-circuited): I(t) = I₀e^(−t/τ). At t=τ, current falls to 36.8% of initial value — mirror of growth, same shape as RC discharge.",
        "Larger L or smaller R ⟹ larger τ ⟹ slower current buildup/decay. Heat dissipated during full decay = ½LI₀² exactly (energy conservation).",
      ],
    },
    {
      heading: "AC Generator",
      points: [
        "Converts mechanical → electrical energy by rotating a coil in a field (or magnet inside a fixed coil). ε = ε₀sin(ωt), peak ε₀ = NBAω.",
        "Components: field magnet, armature (rotating coil), slip rings, carbon brushes.",
        "Derivation: Φ=BAcos(ωt) ⟹ ε=−N(dΦ/dt)=NBAωsin(ωt).",
        "EMF is MAX when coil plane is PARALLEL to B (flux changing fastest); EMF is ZERO when coil plane is PERPENDICULAR to B (flux itself at its own max, but momentarily not changing) — a common trap.",
        "Grid frequency fixed by mechanical rotation speed — standardised at 50 Hz in India.",
      ],
    },
    {
      heading: "Applications",
      points: [
        "Generators/alternators at power stations (any turbine source — water, steam, wind).",
        "Transformers: mutual inductance steps voltage up/down for efficient transmission and safe household use.",
        "Induction cooktops/furnaces: eddy currents heat the vessel/workpiece directly, no flame or resistive element.",
        "Metal detectors, magnetic braking, wireless (inductive) charging — all rely on changing magnetic flux inducing usable current or force.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Lenz's law opposes the CHANGE in flux, not the field itself — the induced field can point the SAME way as B if flux is decreasing.",
        "EMF peaks where flux is changing FASTEST (coil plane ∥ B), not where flux itself is maximum (coil plane ⊥ B) — very commonly reversed by mistake.",
        "Self-induced EMF opposes change in I, not I itself — a steady current through an inductor produces zero self-induced EMF.",
        "Inductors combine like resistors (series adds, parallel adds reciprocals) — capacitors do the OPPOSITE. Easy to swap under exam pressure.",
        "τ=L/R for LR circuits is the direct analogue of τ=RC for RC circuits, but note L/R (not L×R) — a common substitution slip.",
        "An open induced circuit still has an EMF across the break, just no current — flux still changing even if nothing flows.",
      ],
    },
  ],
};
