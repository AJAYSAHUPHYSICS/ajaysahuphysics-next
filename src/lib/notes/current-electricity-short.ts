import type { ChapterShortNotes } from "./kinematics-short";

export const currentElectricityShortNotes: ChapterShortNotes = {
  chapterName: "Current Electricity",
  className: "12",
  groups: [
    {
      heading: "Current & Current Density",
      points: [
        "I = dQ/dt; scalar, SI unit ampere (1 A = 1 C/s).",
        "Conventional current direction = direction of positive charge flow, opposite to electron drift.",
        "J = dI/dA (area normal to flow); general form dI = J dA cosθ.",
        "J is a vector, direction same as E⃗; unit A/m².",
        "Steady current in a non-uniform wire: I is constant everywhere, but J, E, v_d ∝ 1/A.",
      ],
    },
    {
      heading: "Drift Velocity & Mobility",
      points: [
        "v_rms = √(3kT/m); order 10⁵ m/s at room temperature — but average velocity of free electrons is zero without a field.",
        "Drift velocity v_d = eEτ/m; order 10⁻⁴ m/s (~10⁹ times slower than thermal speed).",
        "I = neAv_d — current in terms of free-electron density, area, and drift speed.",
        "n (free e⁻ density) ≈ 10²⁸ /m³ in metals; ≈ 10¹⁶ /m³ in semiconductors.",
        "Mobility μ = v_d/E = eτ/m; unit m²/(V·s); always taken positive.",
        "Mean free path λ ≈ 10 Å; relaxation time τ ≈ 10⁻¹⁴ s in metals.",
      ],
    },
    {
      heading: "Ohm's Law & Resistance",
      points: [
        "Microscopic: J⃗ = σE⃗, σ = ne²τ/m. Macroscopic: V = IR.",
        "R = ρl/A; ρ = 1/σ. ρ depends only on material & temperature — never on shape/size.",
        "Ohm's law is empirical, not fundamental — fails for diodes, vacuum tubes, GaAs.",
        "Stretch to n× length (volume const): R → n²R. Radius → (1/n): R → n⁴R.",
        "Small length change x% (volume const) ⟹ resistance changes by ≈ 2x%.",
      ],
    },
    {
      heading: "Temperature Dependence & Colour Code",
      points: [
        "ρ_T = ρ₀[1 + α(T−T₀)]; R_t = R₀(1 + αΔT).",
        "α > 0 for metals (resistance rises with T). α < 0 for semiconductors, insulators, carbon.",
        "Below critical temperature, some conductors lose all resistance — superconductors.",
        "Resistor colour bands: digit, digit, multiplier, tolerance. Gold = ±5%, Silver = ±10%, no band = ±20%.",
        "Manganin/constantan used in resistance boxes — near-zero α, stable resistance with temperature.",
      ],
    },
    {
      heading: "Series & Parallel Combination",
      points: [
        "Series: R = R₁+R₂+R₃; same current; V₁:V₂:V₃ = R₁:R₂:R₃.",
        "Parallel: 1/R = 1/R₁+1/R₂+1/R₃; same voltage; I₁:I₂:I₃ = 1/R₁:1/R₂:1/R₃.",
        "Equivalent resistance in parallel < smallest individual resistance.",
        "Mixed networks: successive reduction, symmetry (equipotential points), or nodal method for short-circuited points.",
      ],
    },
    {
      heading: "Kirchhoff's Laws",
      points: [
        "Junction law (KCL): ΣI = 0 — based on conservation of charge.",
        "Loop law (KVL): ΣIR = ΣE around a closed loop — based on conservation of energy.",
        "Sign rule: emf positive when moving − to + inside a cell; IR drop negative when moving along assumed current direction.",
      ],
    },
    {
      heading: "EMF, Internal Resistance & Terminal Voltage",
      points: [
        "I = E/(R+r). Discharging: V = E − Ir. Charging: V = E + Ir.",
        "Open circuit (R→∞): I = 0, V = E (max terminal voltage).",
        "Short circuit (R=0): I = E/r (max current), V = 0.",
        "r depends on electrode separation, electrolyte concentration, electrode area, temperature — not on external circuit.",
      ],
    },
    {
      heading: "Combination of Cells",
      points: [
        "n in series: E_net = nE, r_net = nr, I = nE/(nr+R). Best when nr ≪ R.",
        "m identical in parallel: r_net = r/m, I = mE/(r+mR). Best when r ≫ mR.",
        "n series × m parallel rows: E_net = nE, r_net = nr/m. Current max when R = nr/m.",
      ],
    },
    {
      heading: "Power, Heating & Bulb Brightness",
      points: [
        "P = VI = I²R = V²/R. Q = I²Rt (independent of current direction).",
        "1 kWh = 3.6×10⁶ J.",
        "P_max delivered to external R is E²/4r, occurring at R = r.",
        "Series bulbs: same I, P=I²R ⟹ lower-wattage (higher-R) bulb glows brighter.",
        "Parallel bulbs: same V, P=V²/R ⟹ higher-wattage (lower-R) bulb glows brighter.",
        "Two identical heaters: H_parallel = 4 × H_series (same supply voltage).",
      ],
    },
    {
      heading: "Galvanometer, Ammeter & Voltmeter",
      points: [
        "Ammeter: low shunt resistance in parallel, R_shunt = I_gR_g/(I−I_g). Ideal ammeter R = 0.",
        "Voltmeter: high resistance in series, R_series = V/I_g − R_g. Ideal voltmeter R = ∞.",
        "Shunt reduces sensitivity but protects the coil and extends range.",
        "Range I → nI: parallel resistor R_g/(n−1). Range V → nV: series resistor (n−1)R_g.",
      ],
    },
    {
      heading: "Wheatstone Bridge, Metre Bridge & Potentiometer",
      points: [
        "Balance condition: P/Q = R/S; galvanometer carries zero current at balance.",
        "Metre bridge: S = R(100−l)/l, where l is the balance length from end A.",
        "Potentiometer: zero current drawn at balance — more accurate than a voltmeter for emf/PD measurement.",
        "Potential gradient x = V_AB/L. Comparing emfs: E₁/E₂ = l₁/l₂. Internal resistance: r = R(l₁−l₂)/l₂.",
        "Sensitivity ↑ as x ↓ — achieved by increasing wire length or reducing primary current via rheostat.",
        "Changes in the secondary (galvanometer) circuit never affect the potential gradient.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Drift velocity (~10⁻⁴ m/s) and thermal speed (~10⁵ m/s) are not the same thing — don't substitute one for the other.",
        "Resistivity ρ is a material property; resistance R also depends on length and area — a 'longer wire has more resistivity' is wrong, it has more resistance.",
        "In series, the dimmer-rated bulb (lower wattage) is the one that glows brighter — easy to get backwards under exam pressure.",
        "EMF is the open-circuit terminal voltage, not the voltage you'll read with current flowing — V = E only when I = 0.",
        "A potentiometer at balance draws zero current from the cell being measured; a voltmeter, however ideal, can never claim that.",
        "Wheatstone bridge balance (P/Q = R/S) does not depend on the cell's emf or internal resistance — only on the four resistances.",
        "Adding a shunt in parallel lowers the net resistance below the shunt value itself, not just below the galvanometer's resistance.",
      ],
    },
  ],
};
