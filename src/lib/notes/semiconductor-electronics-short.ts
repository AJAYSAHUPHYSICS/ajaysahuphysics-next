import type { ChapterShortNotes } from "./kinematics-short";

export const semiconductorElectronicsShortNotes: ChapterShortNotes = {
  chapterName: "Semiconductor Electronics",
  className: "12",
  groups: [
    {
      heading: "Energy Bands & Classification",
      points: [
        "Valence band: outermost electrons, bonding. Conduction band: free electrons that carry current. Forbidden gap E(g) between them — no electron states exist there.",
        "Metals: bands overlap (or conduction band already partly filled) — conduct even near 0 K. Insulators: E(g) > 3 eV — thermal energy can't bridge it. Semiconductors: small E(g) (Si ≈1.1 eV, Ge ≈0.7 eV) — some thermal excitation at room temp.",
        "A semiconductor still has ZERO conductivity at absolute zero, exactly like an insulator — only the small gap size lets ordinary thermal energy bridge it later.",
      ],
    },
    {
      heading: "Intrinsic & Extrinsic Semiconductors",
      points: [
        "Intrinsic (pure Si/Ge, tetravalent): thermal breaking of covalent bonds creates EQUAL numbers of electrons and holes. n(i) roughly doubles every 8°C rise for silicon.",
        "n-type: pentavalent dopant (P, As) — 5th electron loosely bound, becomes majority free electron. Holes are minority.",
        "p-type: trivalent dopant (B, Al, In) — incomplete bond leaves a hole. Holes are majority, electrons minority.",
        "Doped crystal stays electrically NEUTRAL overall — the immobile dopant ion's charge exactly balances the mobile carrier it donates/accepts; only carrier CONCENTRATION changes.",
      ],
    },
    {
      heading: "Law of Mass Action",
      points: [
        "n·p = n(i)² — depends only on material & temperature, NEVER on doping level.",
        "n-type: n≫p. p-type: p≫n. Product n·p stays fixed either way — used to find minority-carrier concentration once majority (≈doping density) is known.",
      ],
    },
    {
      heading: "p-n Junction Formation",
      points: [
        "Diffusion (concentration gradient) drives electrons n→p and holes p→n; recombination near the junction leaves fixed donor ions (+, n-side) and acceptor ions (−, p-side) exposed — the depletion region.",
        "Exposed ions create an internal field (n→p direction) opposing further diffusion; equilibrium reached when diffusion current = drift current, depletion region stops growing.",
        "Barrier potential ≈0.7 V (Si), ≈0.3 V (Ge) at room temperature — memorise directly, appears in nearly every diode numerical.",
        "Depletion width & barrier height both shrink with heavier doping.",
      ],
    },
    {
      heading: "Forward & Reverse Bias",
      points: [
        "Forward bias (p→+, n→−): external field opposes built-in field, narrows depletion region, lowers barrier. Beyond ~0.7 V (Si) current rises steeply; below it, current ≈0 ('knee').",
        "Reverse bias (p→−, n→+): external field reinforces built-in field, WIDENS depletion region. Only a tiny, nearly-constant minority-carrier reverse saturation current flows.",
        "Breakdown at high reverse voltage: Zener breakdown (high field pulls electrons directly from bonds — sharply-doped, low breakdown voltage) or avalanche breakdown (carrier collision chain — higher breakdown voltage).",
      ],
    },
    {
      heading: "Diode Equation & Characteristics",
      points: [
        "I = I₀(e^(eV/kT) − 1). Forward (eV≫kT): exponential dominates, I grows fast. Reverse (|eV|≫kT): I → −I₀ (small, ~constant).",
        "Dynamic (AC) resistance = dV/dI at an operating point ≠ DC resistance = V/I — a common numerical trap when both AC and DC components are present.",
      ],
    },
    {
      heading: "Rectifiers",
      points: [
        "Half-wave (1 diode): conducts one half-cycle only, blocks the other. Output pulsating, unidirectional. η(max) ≈ 40.6%.",
        "Full-wave (2 diodes + centre-tap, OR 4 diodes bridge): uses BOTH half-cycles, ripple frequency = 2×input frequency. η(max) ≈ 81.2%.",
        "Bridge design avoids needing a centre-tapped transformer; centre-tap design uses two diodes conducting on alternate half-cycles.",
      ],
    },
    {
      heading: "Filters & Zener Regulation",
      points: [
        "Shunt capacitor across the load charges near each pulse peak, discharges slowly through R(load) as rectified V dips — smooths ripple. Bigger C or bigger R(load) ⟹ less ripple.",
        "Zener diode: heavily doped, sharp REPEATABLE reverse breakdown voltage, designed to operate continuously in breakdown without damage (unlike an ordinary diode).",
        "Voltage regulator: series resistor limits current, Zener (reverse-biased) in parallel with load absorbs input-voltage variation while holding load voltage ≈constant.",
      ],
    },
    {
      heading: "Special-Purpose Diodes",
      points: [
        "LED: forward-biased junction (compound semiconductor, not Si) — recombination releases energy as light; photon energy (colour) set by band gap.",
        "Photodiode: REVERSE biased — incident light generates extra e-h pairs in the depletion region, increasing reverse saturation current ∝ light intensity.",
        "Solar cell: unbiased/self-biased junction — photon-generated pairs swept apart by the built-in field itself, becoming a source of EMF with no external battery.",
        "LED and photodiode are near-opposite devices doing the same physics in reverse: electrical→light (forward) vs light→electrical (reverse).",
      ],
    },
    {
      heading: "Transistor — Structure & Action",
      points: [
        "BJT (n-p-n or p-n-p): three terminals — emitter (heavily doped, injects carriers), base (thin, lightly doped), collector (moderately doped, collects carriers).",
        "Active-region biasing: emitter-base junction FORWARD biased, base-collector junction REVERSE biased. Thin, lightly-doped base lets most carriers cross rather than recombine.",
        "I(E) = I(B) + I(C). α = I(C)/I(E) (common-base gain, always <1). β = I(C)/I(B) (common-emitter gain, typically tens–hundreds). β = α/(1−α).",
      ],
    },
    {
      heading: "Configurations & CE Amplifier",
      points: [
        "CB: α<1, high voltage gain, rarely used alone — good for high-frequency work. CE: β≫1, appreciable current AND voltage gain — standard amplifier configuration. CC: high current gain, voltage gain just under 1 — buffer/impedance matcher (emitter follower).",
        "CE amplifier: A(v) = β(R(C)/R(in)). A(p) = A(v)×A(i) = β²(R(C)/R(in)) — power gain is the PRODUCT of voltage and current gain, not their sum.",
        "Output is 180° OUT OF PHASE with input in a CE amplifier — rising input ⟹ rising I(C) ⟹ larger drop across R(C) ⟹ falling collector (output) voltage.",
      ],
    },
    {
      heading: "Transistor as Switch & Logic Gates",
      points: [
        "Cut-off: I(B)≈0 ⟹ I(C)≈0 — behaves as an OPEN switch. Saturation: I(B) large enough that I(C) hits its max — behaves as a CLOSED switch (small voltage drop). Rapid switching between these two states builds digital logic.",
        "NOT: single input, inverts (1→0, 0→1). OR: output 1 if ANY input is 1. AND: output 1 only if ALL inputs are 1.",
        "NAND = AND+NOT, NOR = OR+NOT — both are 'universal gates': either one alone, used repeatedly, can build every other gate including OR, AND, and NOT.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "A semiconductor at absolute zero is a perfect insulator — 'small gap' does not mean 'no gap' or 'always conducting'.",
        "n·p = n(i)² is independent of doping level — a very common numerical shortcut question tests exactly this.",
        "Reverse saturation current is carried by MINORITY carriers, not majority — easy to mix up with forward-bias conduction.",
        "Power gain = A(v) × A(i), NOT A(v) + A(i) — a frequently tested numerical relationship.",
        "CE amplifier output is 180° out of phase with input — a commonly drawn/tested waveform diagram.",
        "NAND and NOR are universal gates; OR, AND, and NOT individually are NOT universal on their own.",
      ],
    },
  ],
};
