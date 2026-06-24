import type { ChapterNotes } from "./kinematics";

export const alternatingCurrentNotes: ChapterNotes = {
  chapterName: "Alternating Current",
  className: "12",
  intro:
    "Every socket in your house delivers alternating current — a voltage and current that reverse direction many times a second instead of flowing one way like a battery. This chapter builds the language to describe that reversing flow (peak, average, rms), then looks at what happens when it meets a resistor, an inductor, and a capacitor — separately and together — and ends with the energy that quietly sloshes back and forth in an LC circuit.",
  sections: [
    {
      heading: "1. What Is Alternating Current?",
      body:
        "An alternating quantity changes continuously in magnitude and periodically reverses its direction. Unlike DC, which flows steadily one way, AC traces out a repeating pattern in time — most commonly a sine wave, since that's the natural output of a rotating generator.",
      formula: [
        { label: "AC current", expression: "I = I₀ sin ωt" },
        { label: "Angular frequency", expression: "ω = 2π/T = 2πf" },
      ],
      bullets: [
        "I₀ is the peak value (amplitude); T is the time for one complete cycle; f = 1/T is the number of cycles per second.",
        "Peak-to-peak value = 2I₀ — the total swing from the most positive to the most negative point.",
        "Indian household supply: 220 V, 50 Hz. US supply: 110 V, 60 Hz.",
        "For a waveform to count as 'alternating', its amplitude must stay constant, and successive half-cycles must be equal and opposite — a wave that's always positive (just bumpy) is not AC, however it varies.",
      ],
    },
    {
      heading: "2. Average and RMS Values",
      body:
        "Since a symmetric AC wave is positive for half the cycle and equally negative for the other half, its average over a full cycle is always zero — that average is meaningless for describing 'how much' current is flowing. Two other measures fix this: the half-cycle average, and the rms value.",
      formula: [
        { label: "Average value (half cycle)", expression: "I_avg = 2I₀/π ≈ 0.637 I₀" },
        { label: "RMS value", expression: "I_rms = I₀/√2 ≈ 0.707 I₀" },
        { label: "Ordering", expression: "I₀ > I_rms > I_avg" },
      ],
      bullets: [
        "Average value is the steady DC that would push the same charge through a circuit in the same time — calculated over one half-cycle (positive or negative), never the full cycle.",
        "RMS (root-mean-square) value is the steady DC that would produce the same heating effect in a resistor over the same time. This is the physically meaningful 'equivalent strength' of an AC supply.",
        "Unless stated otherwise, any rating printed on an appliance, or any reading shown by an AC meter, is the rms value — never the peak.",
        "rms value = virtual value = apparent value — three names for the same quantity.",
      ],
    },
    {
      heading: "3. Phase and Phase Difference",
      body:
        "Writing a sine wave as I = I₀ sin(ωt + φ) adds an initial phase φ that doesn't change with time, while the full angle (ωt + φ) is the instantaneous phase, which does. Phase becomes important the moment two alternating quantities — like voltage and current — are compared.",
      formula: [
        { label: "Current with phase φ", expression: "I = I₀ sin(ωt + φ)" },
        { label: "Phase difference of I w.r.t. V", expression: "Δφ = φ_I − φ_V" },
      ],
      bullets: [
        "If V reaches its peak before I does, V leads I (equivalently, I lags V).",
        "If I reaches its peak before V does, I leads V (equivalently, V lags I).",
        "A phasor diagram represents V and I as rotating arrows of length equal to their peak values, separated by the constant angle φ — their vertical projections give the instantaneous values at any moment.",
      ],
    },
    {
      heading: "4. AC Through a Pure Resistor",
      body:
        "A resistor offers the same opposition to current regardless of how fast that current is changing, so the current through it simply mirrors the applied voltage at every instant.",
      formula: [
        { label: "Applied emf", expression: "V = V₀ sin ωt" },
        { label: "Current", expression: "I = I₀ sin ωt,  I₀ = V₀/R" },
      ],
      bullets: [
        "Voltage and current are exactly in phase (φ = 0) — they rise, peak, and fall together.",
        "Same relation holds for peak or rms values: V₀ = I₀R and V_rms = I_rms R.",
        "A pure resistor behaves identically in AC and DC circuits — frequency plays no role at all.",
      ],
    },
    {
      heading: "5. AC Through a Pure Inductor",
      body:
        "An inductor resists any change in current by generating a back-emf, so the current can never keep instantaneous step with the voltage — it always falls behind.",
      formula: [
        { label: "Current", expression: "I = I₀ sin(ωt − π/2)" },
        { label: "Inductive reactance", expression: "X_L = ωL = 2πfL" },
        { label: "Peak current", expression: "I₀ = V₀/X_L" },
      ],
      bullets: [
        "Current lags the applied emf by exactly π/2 (90°) — equivalently, the emf leads the current by π/2.",
        "X_L plays the same role R plays in a resistive circuit, but it isn't a true resistance — it dissipates no energy, it only opposes the rate of change of current.",
        "X_L is directly proportional to frequency: double f, and the inductor opposes the current twice as strongly.",
        "At f = 0 (pure DC, steady state), X_L = 0 — an ideal inductor offers zero steady-state opposition to direct current, but presents a real, growing opposition as frequency rises.",
      ],
    },
    {
      heading: "6. AC Through a Pure Capacitor",
      body:
        "A capacitor's charge — and hence the field between its plates — must track the applied voltage, and the current is simply the rate at which that charge is being delivered. Differentiating a sine gives a cosine, which is why the current here runs ahead of the voltage rather than behind it.",
      formula: [
        { label: "Current", expression: "I = I₀ sin(ωt + π/2)" },
        { label: "Capacitive reactance", expression: "X_C = 1/(ωC) = 1/(2πfC)" },
        { label: "Peak current", expression: "I₀ = ωCV₀ = V₀/X_C" },
      ],
      bullets: [
        "Current leads the applied emf by π/2 — equivalently, the emf lags the current by π/2.",
        "X_C is inversely proportional to frequency: the capacitor opposes high-frequency AC weakly, and low-frequency AC strongly.",
        "At f = 0 (DC), X_C → ∞ — a capacitor completely blocks steady DC once fully charged, but offers an easy path to AC, especially at high frequency.",
        "This opposite frequency-dependence is why an inductor is called a low-pass filter (lets low frequencies through, blocks high) and a capacitor a high-pass filter (lets high frequencies through, blocks low).",
      ],
    },
    {
      heading: "7. Comparing R, L and C at a Glance",
      body:
        "Each element has its own signature: how current relates in phase to voltage, and how its opposition responds to frequency.",
      bullets: [
        "Resistor: φ = 0 (in phase); opposition R is constant with frequency.",
        "Inductor: current lags by π/2; opposition X_L = ωL rises linearly with frequency.",
        "Capacitor: current leads by π/2; opposition X_C = 1/(ωC) falls as frequency rises.",
        "DC behaviour: a resistor is unaffected, an inductor offers zero opposition (acts like a plain wire), a capacitor offers infinite opposition (acts like an open switch, once charged).",
      ],
    },
    {
      heading: "8. Series LR Circuit",
      body:
        "When a resistor and inductor share the same current, their voltage drops don't add directly — V_R is in phase with the current while V_L leads it by 90°, so the two combine as perpendicular vectors.",
      formula: [
        { label: "Impedance", expression: "Z_L = √(R² + X_L²)" },
        { label: "Phase angle", expression: "tan φ = X_L/R" },
        { label: "Peak current", expression: "I₀ = V₀/Z_L" },
      ],
      bullets: [
        "Because V_R ⊥ V_L on the phasor diagram, the applied emf is E = √(V_R² + V_L²), not the plain sum V_R + V_L.",
        "The applied emf leads the current by φ — an LR circuit is always 'inductive' in character, somewhere between φ = 0 (pure R) and φ = π/2 (pure L).",
        "This is exactly the circuit behind a choke coil — see Section 14.",
      ],
    },
    {
      heading: "9. Series RC Circuit",
      body:
        "Here V_R stays in phase with the current while V_C lags it by 90°, giving a mirror image of the LR case — the applied emf now lags the current instead of leading it.",
      formula: [
        { label: "Impedance", expression: "Z_C = √(R² + X_C²)" },
        { label: "Phase angle", expression: "tan φ = X_C/R" },
        { label: "Peak current", expression: "I₀ = V₀/Z_C" },
      ],
      bullets: [
        "The applied emf lags the current by φ — equivalently, the current leads the emf.",
        "Just like the LR case, E = √(V_R² + V_C²) — the perpendicular phasors combine by Pythagoras, not simple addition.",
      ],
    },
    {
      heading: "10. Series LCR Circuit",
      body:
        "Putting all three elements in series, the current is common to all of them, but V_L and V_C point in exactly opposite directions on the phasor diagram (both perpendicular to V_R, but on opposite sides) — so they partially cancel before combining with V_R.",
      formula: [
        { label: "Net reactance", expression: "X = X_L − X_C" },
        { label: "Impedance", expression: "Z = √(R² + (X_L − X_C)²)" },
        { label: "Phase angle", expression: "tan φ = (X_L − X_C)/R" },
        { label: "Peak current", expression: "I₀ = V₀/Z" },
      ],
      bullets: [
        "If X_L > X_C, the circuit is net inductive — applied emf leads the current (φ positive).",
        "If X_C > X_L, the circuit is net capacitive — applied emf lags the current (φ negative).",
        "Unlike a circuit with R alone, the voltage across L or across C individually can exceed the source voltage — this can only happen when both L and C are present together.",
      ],
    },
    {
      heading: "11. Series Resonance",
      body:
        "As frequency is varied, there's exactly one frequency where the inductive and capacitive reactances cancel completely, leaving only resistance to oppose the current. At that frequency the circuit responds most strongly — this is resonance.",
      formula: [
        { label: "Resonance condition", expression: "X_L = X_C" },
        { label: "Resonant angular frequency", expression: "ω₀ = 1/√(LC)" },
        { label: "Resonant frequency", expression: "f₀ = 1/(2π√(LC))" },
        { label: "At resonance", expression: "Z_min = R,  I_max = V/R,  φ = 0" },
      ],
      bullets: [
        "Below f₀: X_L < X_C, the circuit behaves capacitively (φ negative). Above f₀: X_L > X_C, it behaves inductively (φ positive). Exactly at f₀: purely resistive (φ = 0).",
        "Because impedance is at its minimum at resonance, the series resonant circuit is called an acceptor circuit — it most readily 'accepts' current at its own natural frequency, which is exactly how a radio tunes to one station out of many.",
        "Resonance is only possible when both L and C are present; a circuit with just R and L, or just R and C, never resonates.",
      ],
    },
    {
      heading: "12. Quality Factor and Bandwidth",
      body:
        "Not all resonance peaks are equally sharp. The quality factor Q measures how selective — how 'sharp' — the resonance is, by comparing energy stored to energy lost each cycle.",
      formula: [
        { label: "Definition", expression: "Q = 2π × (max. energy stored per cycle)/(max. energy lost per cycle)" },
        { label: "Equivalent forms", expression: "Q = ω₀L/R = 1/(ω₀CR) = (1/R)√(L/C)" },
        { label: "Bandwidth", expression: "Δf = f₂ − f₁ = f₀/Q" },
      ],
      bullets: [
        "f₁ and f₂ are the half-power frequencies — where the power delivered drops to half its maximum value (and, equivalently, net reactance equals net resistance).",
        "A larger Q means a narrower bandwidth and a sharper, more selective resonance peak.",
        "Lowering R increases Q (sharper resonance, narrower bandwidth); raising R does the opposite — this is the one knob that trades off selectivity against tolerance.",
        "Q also equals the magnification factor: at resonance, the voltage across L (or C) is Q times the supply voltage — which is exactly why series resonance is described as giving voltage amplification.",
      ],
    },
    {
      heading: "13. Power in AC Circuits",
      body:
        "Because voltage and current are generally out of phase, the power delivered isn't simply V_rms × I_rms — only the component of current that's actually in phase with the voltage does any real work.",
      formula: [
        { label: "Average (real) power", expression: "P_avg = V_rms I_rms cos φ" },
        { label: "Apparent power", expression: "P_apparent = V_rms I_rms" },
        { label: "Power factor", expression: "cos φ = R/Z" },
      ],
      bullets: [
        "Power factor ranges from 0 to 1: it's 1 for a pure resistor (maximum possible real power for given V_rms, I_rms), and exactly 0 for a pure inductor or pure capacitor.",
        "At resonance, φ = 0 so cos φ = 1 — the power factor is at its maximum and the full apparent power is converted to real power.",
        "I_rms cos φ is the 'active' or wattful part of the current — the part that actually does work and dissipates energy.",
        "I_rms sin φ is the 'wattless' or reactive part — it flows through the circuit and registers on an ammeter, but contributes zero average power.",
      ],
    },
    {
      heading: "14. Wattless Current and the Choke Coil",
      body:
        "Since a pure inductor (or capacitor) dissipates no power at all, it offers a way to limit current in an AC circuit without burning any energy as heat — exactly what a series resistor would do, but for free. This is the working principle of the choke coil.",
      formula: [
        { label: "Choke coil impedance", expression: "Z = √((R + r)² + (ωL)²)" },
        { label: "Power factor of choke", expression: "cos φ = r/Z ≈ r/(ωL) → 0" },
      ],
      bullets: [
        "A choke coil is a copper coil wound on a soft iron core — built for large inductance L with a deliberately small winding resistance r.",
        "Because r is tiny compared to ωL, the power factor is close to zero, so the power loss P_avg = V_rms I_rms cos φ is nearly zero even while the coil substantially limits the current.",
        "A choke coil only works in AC circuits — in steady DC, an inductor offers no opposition at all (X_L = 0), so it couldn't limit a DC current even in principle.",
        "A suitable capacitor can do the same job (also zero average power), but inductors (chokes) are used in practice because capacitors of equivalent reactance are usually far more expensive.",
      ],
    },
    {
      heading: "15. LC Oscillations",
      body:
        "Connect a charged capacitor directly to an inductor (no resistance) and the energy doesn't just sit still — it sloshes back and forth between the capacitor's electric field and the inductor's magnetic field, forever, in an undamped oscillation.",
      formula: [
        { label: "Charge oscillation", expression: "q = q_m cos ωt" },
        { label: "Natural frequency", expression: "ω = 1/√(LC),  f = 1/(2π√(LC))" },
        { label: "Energy conservation", expression: "q_m²/(2C) = ½LI_m²" },
      ],
      bullets: [
        "When the capacitor is fully charged (q = q_m), all the energy is electrical and the current is momentarily zero; a quarter-cycle later all the energy has transferred to the inductor's magnetic field, and the current is at its peak I_m.",
        "Charge and current are π/2 out of phase: charge is maximum exactly when current is zero, and vice versa.",
        "At t = T/8, 3T/8, 5T/8, ... the energy is shared exactly equally between the capacitor and the inductor.",
        "This natural frequency formula is identical to the series-resonance formula from Section 11 — both describe the same underlying LC behaviour, one in a driven circuit, the other in a free one.",
        "In a real circuit, any resistance present causes the oscillation amplitude to die out exponentially over time — this is damped oscillation, as opposed to the ideal, resistance-free undamped case.",
      ],
    },
    {
      heading: "16. Measuring Alternating Current",
      body:
        "An ordinary DC ammeter (moving-coil type) cannot be used on AC at all — it deflects in proportion to current, and since a symmetric AC's average is zero, it would simply read zero (or just judder uselessly at line frequency).",
      bullets: [
        "AC meters are hot-wire instruments: they work on the heating effect of current, where deflection ∝ heat ∝ I², so they naturally respond to I_rms regardless of direction.",
        "Because deflection depends on I² rather than I directly, the scale of a hot-wire meter is non-uniform — equal current intervals are not equally spaced.",
        "A hot-wire (AC) meter works correctly on both AC and DC supplies, since I_rms = I for steady DC; a moving-coil (DC) meter, by contrast, reads zero the moment it's placed in an AC circuit.",
      ],
    },
  ],
};
