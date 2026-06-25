import type { ChapterShortNotes } from "./kinematics-short";

export const electrostaticPotentialAndCapacitanceShortNotes: ChapterShortNotes = {
  chapterName: "Electrostatic Potential & Capacitance",
  className: "12",
  groups: [
    {
      heading: "Capacitance — Basics",
      points: [
        "C = Q/V; SI unit farad (F) = C/V. Depends only on geometry & medium, never on Q or V.",
        "Bringing an earthed conductor near a charged one lowers its potential ⟹ raises its capacitance — the working principle of every capacitor.",
        "Charges on the two plates of a capacitor are always equal and opposite; net charge on the system is zero.",
      ],
    },
    {
      heading: "Energy Stored",
      points: [
        "U = Q²/2C = ½CV² = ½QV.",
        "Work done by battery while charging W = QV; only half is stored — the other half is lost as heat in the wires, regardless of resistance value.",
        "Heat produced on discharging through any resistor = ½CV² (independent of R).",
        "Earthed conductor: V = 0 always ⟹ effectively C = ∞.",
      ],
    },
    {
      heading: "Spherical Conductor / Capacitor",
      points: [
        "Isolated sphere: C = 4πε₀R (air), C = 4πε₀ε_rR (medium). Earth's capacitance ≈ 711 µF (R ≈ 6400 km).",
        "Spherical capacitor, outer sphere earthed: C = 4πε₀R₁R₂/(R₂−R₁).",
        "Spherical capacitor, inner sphere earthed: C = 4πε₀R₁R₂/(R₂−R₁) + 4πε₀R₂.",
      ],
    },
    {
      heading: "Parallel Plate Capacitor",
      points: [
        "E = σ/ε₀ = σ/(ε₀ε_r) between the plates; C₀ = ε₀A/d (air), C = ε₀ε_rA/d (medium) = KC₀.",
        "C independent of plate thickness/material; depends only on facing area, separation, medium.",
        "Sliding plates apart sideways reduces overlap area ⟹ reduces C proportionally.",
        "Edge effect (non-uniform field at plate edges) ignored when d ≪ plate dimensions.",
      ],
    },
    {
      heading: "Force, Pressure & Energy Density",
      points: [
        "Force between plates F = Q²/2ε₀A = QE/2 = CV²/2d (only half the naive QE — each plate feels only the other plate's field).",
        "Electrostatic pressure P = σ²/2ε₀ = ½ε₀E². Energy density u = ½ε₀E² — same formula as pressure.",
        "Charged soap bubble equilibrium: P_T + P_outside = P_inside + P_electrostatic.",
      ],
    },
    {
      heading: "Dielectrics",
      points: [
        "Polar (H₂O, HCl, NH₃): permanent dipoles, randomly oriented, align under field. Non-polar (N₂, O₂, CH₄): induced dipole only under field.",
        "Polarisation P⃗ = np⃗ = induced surface charge density σ_i.",
        "Dielectric strength = max field a dielectric withstands before breakdown; unit V/m.",
        "K = ε_r = E₀/E = V₀/V = C/C₀ ≥ 1 always (K=1 for vacuum/air).",
        "Q_i = Q(1−1/K); σ_i = σ(1−1/K) — applicable to parallel plate capacitor only.",
      ],
    },
    {
      heading: "Dielectric Effect — Battery On vs Off",
      points: [
        "Battery disconnected (Q constant), dielectric inserted: V↓, C↑, U↓.",
        "Battery connected (V constant), dielectric inserted: Q↑, C↑, U↑.",
        "Partial slab (thickness t<d, constant K): C = ε₀A/[d−t(1−1/K)]. Full fill (t=d): C = KC₀.",
        "Conducting slab (K→∞), thickness t<d: C = ε₀A/(d−t) — slab thickness simply removed from the gap.",
      ],
    },
    {
      heading: "Combination of Capacitors",
      points: [
        "Series: 1/C_S = 1/C₁+1/C₂+…; same Q on each; V divides inversely with C. C_S < smallest C.",
        "Parallel: C_P = C₁+C₂+…; same V on each; Q divides directly with C. C_P > largest C.",
        "N identical capacitors C: series → C/N; parallel → NC.",
        "Maximum energy storage at fixed V ⟹ connect in parallel (largest C_eq).",
        "Balanced bridge-type capacitor networks: the 'bridge' branch carries zero charge and can be deleted.",
      ],
    },
    {
      heading: "Combination of Dielectric Slabs (Same Capacitor)",
      points: [
        "Distance-wise (stacked) division ≡ series: Ce = [2K₁K₂/(K₁+K₂)]C for equal thickness split (harmonic mean).",
        "Area-wise (side by side) division ≡ parallel: Ce = [(K₁+K₂)/2]C for equal area split (arithmetic mean).",
        "Arithmetic mean ≥ harmonic mean ⟹ area-wise division always gives larger C than distance-wise, for the same K₁, K₂.",
      ],
    },
    {
      heading: "Sharing of Charges & Energy Loss",
      points: [
        "Common potential after connecting: V = (C₁V₁+C₂V₂)/(C₁+C₂).",
        "Charges after connection: Q₁′ = [C₁/(C₁+C₂)]Q, Q₂′ = [C₂/(C₁+C₂)]Q (Q = total charge).",
        "Heat lost: ΔU = −½[C₁C₂/(C₁+C₂)](V₁−V₂)². Zero loss if V₁ = V₂.",
        "Charged capacitor + identical uncharged capacitor: total energy halves; each capacitor ends with U/4; heat lost = U/2.",
      ],
    },
    {
      heading: "Charging & Discharging (RC Circuit)",
      points: [
        "Charging: Q(t) = Q₀(1−e^(−t/RC)); at t = RC (time constant τ), charge ≈ 63% of maximum.",
        "Discharging: Q(t) = Q₀e^(−t/RC); at t = τ, charge ≈ 37% of initial value.",
        "Steady state (t ≫ RC): fully charged capacitor branch acts as an open circuit — no current flows through it.",
        "Just after switching on (t = 0), an uncharged capacitor acts as a plain (zero-resistance) connecting wire.",
      ],
    },
    {
      heading: "Van de Graaff Generator",
      points: [
        "Builds potentials of the order of 10⁷ V using corona discharge + an insulating belt carrying charge to a hollow terminal.",
        "Charge given to a hollow conductor moves entirely to its outer surface — lets new charge keep being added even as terminal potential rises.",
        "Process stops being effective once the field at the terminal surface nears air's breakdown value, ≈ 3 × 10⁶ V/m.",
        "Used to accelerate charged particles to high energies for nuclear/particle physics experiments.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Force between plates is Q²/2ε₀A, not QE — the factor of ½ is dropped easily; each plate is pulled only by the other plate's field, not its own.",
        "K = ε_r is always ≥ 1; a 'dielectric constant less than 1' is not physically meaningful for a real dielectric.",
        "Battery connected vs disconnected flips the direction of every Q/V/U change when a dielectric is inserted — check which one applies before answering.",
        "C_S (series) is smaller than the smallest C; C_P (parallel) is larger than the largest C — the opposite pattern from how resistors combine.",
        "Q_i = Q(1−1/K) gives the induced charge, not the new free charge on the plates — for battery-connected cases the free charge itself also changes.",
        "Energy lost in charge redistribution depends only on (V₁−V₂)², not on the individual charges — equal initial potentials mean zero loss even if charges differ.",
        "At t = RC, charge is at 63% of maximum while charging, but only 37% of initial value while discharging — these are not the same number and are easy to swap.",
      ],
    },
  ],
};
