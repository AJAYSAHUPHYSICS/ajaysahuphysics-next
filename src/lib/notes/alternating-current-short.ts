import type { ChapterShortNotes } from "./gravitation-short";

export const alternatingCurrentShortNotes: ChapterShortNotes = {
  chapterName: "Alternating Current",
  className: "12",
  groups: [
    {
      heading: "Basics of AC",
      points: [
        "I = I₀ sin ωt; ω = 2π/T = 2πf. Peak-to-peak = 2I₀.",
        "AC must have constant amplitude and equal, opposite half-cycles — a wave that never reverses direction isn't AC.",
        "India: 220 V, 50 Hz. USA: 110 V, 60 Hz.",
      ],
    },
    {
      heading: "Average and RMS Values",
      points: [
        "I_avg (half cycle) = 2I₀/π ≈ 0.637 I₀; full-cycle average of symmetric AC = 0.",
        "I_rms = I₀/√2 ≈ 0.707 I₀ — same heating effect as that value of DC.",
        "Ordering: I₀ > I_rms > I_avg.",
        "Unmarked/unstated AC values (appliance ratings, meter readings) are always rms.",
      ],
    },
    {
      heading: "Phase",
      points: [
        "I = I₀ sin(ωt + φ): φ is initial phase (constant); (ωt+φ) is instantaneous phase.",
        "'V leads I' = V peaks first. 'I leads V' = I peaks first.",
      ],
    },
    {
      heading: "Pure R, L, C Circuits",
      points: [
        "R: I in phase with V; I₀ = V₀/R; same behaviour in AC and DC.",
        "L: I lags V by π/2; X_L = ωL = 2πfL; X_L ∝ f; X_L = 0 at DC.",
        "C: I leads V by π/2; X_C = 1/(ωC); X_C ∝ 1/f; X_C = ∞ at DC (blocks DC).",
        "Inductor = low-pass filter; Capacitor = high-pass filter.",
      ],
    },
    {
      heading: "Series LR and RC Circuits",
      points: [
        "LR: Z_L = √(R²+X_L²); tan φ = X_L/R; emf leads I.",
        "RC: Z_C = √(R²+X_C²); tan φ = X_C/R; emf lags I.",
        "Both cases: E = √(V_R² + V_reactive²) — perpendicular phasors, not plain addition.",
      ],
    },
    {
      heading: "Series LCR Circuit",
      points: [
        "Z = √(R² + (X_L−X_C)²); tan φ = (X_L−X_C)/R.",
        "X_L > X_C → net inductive, emf leads I. X_C > X_L → net capacitive, emf lags I.",
        "V_L or V_C alone can exceed source voltage — only possible when both L and C are present.",
      ],
    },
    {
      heading: "Resonance",
      points: [
        "Condition: X_L = X_C ⟹ ω₀ = 1/√(LC), f₀ = 1/(2π√(LC)).",
        "At resonance: Z_min = R, I_max = V/R, φ = 0, power factor = 1.",
        "Series resonant circuit = 'acceptor circuit' (radio/TV tuning).",
        "Below f₀: capacitive (φ < 0). Above f₀: inductive (φ > 0).",
      ],
    },
    {
      heading: "Q-Factor and Bandwidth",
      points: [
        "Q = ω₀L/R = 1/(ω₀CR) = (1/R)√(L/C) = f₀/Δf.",
        "Δf = f₂ − f₁ (half-power frequencies, where net reactance = net resistance).",
        "↓R ⟹ ↑Q ⟹ sharper resonance, narrower bandwidth.",
        "At resonance, V_L = V_C = Q × V (voltage magnification factor = Q).",
      ],
    },
    {
      heading: "Power in AC Circuits",
      points: [
        "P_avg = V_rms I_rms cos φ (real power). P_apparent = V_rms I_rms.",
        "Power factor cos φ = R/Z; ranges 0 to 1.",
        "Pure R: cos φ = 1 (max). Pure L or C: cos φ = 0.",
        "I_rms cos φ = wattful (active) current; I_rms sin φ = wattless (reactive) current.",
      ],
    },
    {
      heading: "Choke Coil",
      points: [
        "Large L, very small resistance r, wound on soft iron core.",
        "Limits AC current with almost zero power loss: cos φ = r/Z ≈ r/(ωL) → 0.",
        "Works only on AC — an inductor offers zero steady-state opposition to DC.",
        "A capacitor could do the same job (zero power loss) but is costlier than an equivalent choke.",
      ],
    },
    {
      heading: "LC Oscillations",
      points: [
        "q = q_m cos ωt; ω = 1/√(LC) — same formula as resonance, undriven case.",
        "Energy conservation: q_m²/(2C) = ½LI_m².",
        "Charge and current are π/2 out of phase — charge max ⟺ current zero, and vice versa.",
        "At T/8, 3T/8, 5T/8...: energy is shared equally between L and C.",
        "Real circuits have resistance ⟹ damped oscillation (amplitude decays exponentially).",
      ],
    },
    {
      heading: "Measuring AC",
      points: [
        "Hot-wire (AC) meters: based on heating effect, deflection ∝ I², read I_rms, non-uniform scale.",
        "Moving-coil (DC) meters read zero in an AC circuit (average of symmetric AC = 0).",
        "Hot-wire meters work correctly on both AC and DC.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Don't confuse average value (always taken over a half-cycle) with the full-cycle average (always zero for symmetric AC) — questions often ask for one while implying the other.",
        "X_L and X_C are reactances, not resistances — they store/return energy and dissipate none, even though they're measured in ohms.",
        "Resonance needs both L and C together — an RL or RC circuit alone can never resonate, regardless of frequency.",
        "At resonance, current depends only on R and V — L and C have 'cancelled out' and no longer matter for the current magnitude.",
        "V_L + V_C is never just added arithmetically with V_R — they're perpendicular (or opposite, for V_L vs V_C) on the phasor diagram.",
        "A choke's near-zero power loss comes from r ≪ ωL, not from r being exactly zero — real choke coils always have some small resistance.",
      ],
    },
  ],
};
