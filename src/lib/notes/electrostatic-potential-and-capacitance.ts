import type { ChapterNotes } from "./kinematics";

export const electrostaticPotentialAndCapacitanceNotes: ChapterNotes = {
  chapterName: "Electrostatic Potential & Capacitance",
  className: "12",
  intro:
    "This chapter covers the Capacitance half of the syllabus — capacitors, how they store charge and energy, the parallel plate capacitor, the role of dielectrics, series–parallel combinations, and how capacitors charge and discharge through a resistor. A capacitor is really just a clever geometric trick: place a second conductor near a charged one, and the same charge can be held at a much lower potential, which means a much higher capacity to store charge. Every result in this chapter — energy stored, dielectrics, combinations, RC circuits — flows from that one idea.",
  sections: [
    {
      heading: "1. Capacitance — Concept and Definition",
      body:
        "Every conductor has some ability to hold charge, measured by how much its potential rises per unit charge given to it. Bringing another conductor nearby changes that ability dramatically — and a pair of conductors set up to exploit this is called a capacitor.",
      formula: [
        { label: "Capacitance of a conductor", expression: "C = Q/V" },
        { label: "Capacitance of a capacitor", expression: "C = Q / (potential difference between the plates)" },
      ],
      bullets: [
        "C depends only on the geometry (shape, size) of the conductor and the surrounding medium — never on the charge given or the resulting potential.",
        "SI unit: farad (F) = coulomb/volt. Practical capacitors are usually rated in µF, nF, or pF since 1 F is an enormous capacitance.",
        "Dimensional formula: [M⁻¹L⁻²T⁴A²].",
        "A charged conductor brought near another conductor sees its potential drop (for the same charge) — so its capacitance increases. This is the entire working principle behind a capacitor.",
        "In a capacitor, the two plates carry equal and opposite charge, so the net charge on the system is always zero — only the magnitude of charge on either plate is used to define C.",
      ],
    },
    {
      heading: "2. Principle of a Capacitor",
      body:
        "A single charged plate has some capacitance C. Bringing an identical earthed plate close to it lowers the potential at the first plate (because of the induced opposite charge), and that drop in potential is exactly what raises the capacitance.",
      bullets: [
        "Isolated charged plate M, potential V, capacitance C = Q/V.",
        "Bring an identical plate N nearby (uncharged): induced charges appear on N. The potential at M drops to V′ < V because the nearer induced negative charge dominates over the farther induced positive charge, so C′ = Q/V′ > C.",
        "Earth plate N from the outer face: its induced positive charge drains away to earth, leaving only the negative charge facing M. Potential at M drops further to V″ ≪ V′, so C″ ≫ C′ — a large jump in capacitance.",
        "This is exactly the working principle of a parallel plate capacitor: an earthed conductor placed close to a charged one boosts its capacitance appreciably.",
      ],
    },
    {
      heading: "3. Energy Stored in a Charged Capacitor",
      body:
        "Charging a capacitor means pushing charge onto it against an opposing potential that keeps building up — this requires work, and that work is exactly what gets stored as electrostatic potential energy in the capacitor.",
      formula: [
        { label: "Energy stored", expression: "U = Q²/2C = ½CV² = ½QV" },
        { label: "Work done by the battery while charging", expression: "W_battery = QV" },
      ],
      bullets: [
        "Only half the work done by the battery (QV) ends up stored in the capacitor (½QV) — the other half is dissipated as heat in the connecting wires and any resistance in the circuit, regardless of how small that resistance is.",
        "When a capacitor is discharged through any resistor, the heat generated equals the full stored energy, ½CV², independent of the value of that resistance.",
        "A conductor connected to earth behaves as if it has infinite capacitance, since its potential is taken as zero however much charge flows into or out of it.",
      ],
    },
    {
      heading: "4. Capacitance of an Isolated Spherical Conductor",
      body:
        "An isolated sphere is the simplest capacitor of all — there's no second plate, just the sphere and the rest of space (effectively, a conducting shell at infinity, at zero potential) acting as the other plate.",
      formula: [
        { label: "Isolated sphere in air/vacuum", expression: "C = 4πε₀R" },
        { label: "Isolated sphere in a medium", expression: "C = 4πε₀ε_rR" },
      ],
      bullets: [
        "Capacitance depends only on the radius of the sphere and the surrounding medium — never on the charge or potential given to it.",
        "Larger sphere ⟹ larger capacitance; a medium with higher dielectric constant around the sphere also raises its capacitance.",
        "The capacitance of Earth itself, treated as an isolated sphere of radius ≈ 6400 km, works out to roughly 711 µF — a useful order-of-magnitude benchmark.",
      ],
    },
    {
      heading: "5. Spherical Capacitor",
      body:
        "Placing a concentric earthed (or oppositely charged) shell around a charged sphere converts it into a genuine two-conductor capacitor, with two distinct cases depending on which sphere is grounded.",
      formula: [
        { label: "Outer sphere earthed (R₂ outside, R₁ inside, R₂ > R₁)", expression: "C = 4πε₀R₁R₂ / (R₂ − R₁)" },
        { label: "Inner sphere earthed", expression: "C = 4πε₀R₁R₂/(R₂ − R₁) + 4πε₀R₂" },
      ],
      bullets: [
        "Outer sphere earthed: charge Q on the inner sphere induces −Q on the inner face of the outer shell; the induced +Q on the outer face drains to earth, so the outer shell stays at zero potential.",
        "Inner sphere earthed: the system behaves like a spherical capacitor (radii R₁, R₂) in parallel with an isolated conducting sphere of radius R₂ — this is why its capacitance formula has two additive terms.",
        "For a thin spherical capacitor (R₂ − R₁ = d, both radii ≈ R), the formula reduces to C ≈ ε₀A/d, the same as a parallel plate capacitor — consistent with the plates being only slightly curved over a small gap.",
      ],
    },
    {
      heading: "6. The Parallel Plate Capacitor",
      body:
        "Two flat, closely spaced plates form the most common and most analysed capacitor geometry — simple enough that the field between the plates can be treated as uniform almost everywhere except right at the edges.",
      formula: [
        { label: "Field between the plates", expression: "E = σ/ε₀ = σ/(ε₀ε_r), where σ = Q/A" },
        { label: "Capacitance (medium of dielectric constant ε_r)", expression: "C = ε₀ε_rA/d" },
        { label: "Capacitance in air/vacuum", expression: "C₀ = ε₀A/d" },
      ],
      bullets: [
        "C is independent of the thickness or the nature of the metal used for the plates — only the facing area A, the separation d, and the medium between them matter.",
        "If the plates slide so the overlapping area shrinks, capacitance falls in direct proportion to that overlap area, not the full plate area.",
        "Near the edges of the plates, the field is non-uniform (the 'edge effect') — this is ignored whenever d is small compared to the linear dimensions of the plates, which is the usual assumption in problems.",
        "If both plates of a charged capacitor are touched together, all the charge cancels and the potential difference drops to zero.",
      ],
    },
    {
      heading: "7. Force Between the Plates and Electrostatic Pressure",
      body:
        "The two plates of a capacitor attract each other since they carry equal and opposite charge — the subtlety is that each plate is pulled only by the field of the other plate, not by its own field, which exactly halves the naive estimate.",
      formula: [
        { label: "Force between the plates", expression: "F = Q²/(2ε₀A) = QE/2 = CV²/2d" },
        { label: "Electrostatic pressure (force per unit area)", expression: "P = σ²/(2ε₀) = ½ε₀E²" },
        { label: "Energy density of the electric field", expression: "u = ½ε₀E² = σ²/(2ε₀)" },
      ],
      bullets: [
        "Just outside any charged conductor's surface, the field is E = σ/ε₀; the field due to the small element alone is half that, σ/(2ε₀) — the other half comes from the rest of the charge distribution, and only that half pulls on the element.",
        "Energy density and electrostatic pressure share the same formula, ½ε₀E² — energy stored per unit volume of field equals force per unit area on a charged surface.",
        "For a charged soap bubble in equilibrium: (surface tension + outside air pressure) inward = (inside air pressure + electrostatic pressure) outward, i.e. P_T + P_out = P_in + P_e — so charging a bubble effectively reduces the excess pressure needed to sustain it, and the bubble's radius tends to increase.",
      ],
    },
    {
      heading: "8. Dielectrics and Polarisation",
      body:
        "A dielectric is an insulator that responds to an external field not by conducting, but by developing a net alignment of charge at the molecular level — this internal rearrangement is what changes a capacitor's behaviour when a dielectric is introduced.",
      bullets: [
        "Polar dielectrics (water, alcohol, HCl, NH₃): molecules have a permanent dipole moment due to asymmetric shape; these dipoles are randomly oriented with zero net moment in the absence of a field, but align along the field once it's applied.",
        "Non-polar dielectrics (N₂, O₂, benzene, methane): symmetric molecules with zero dipole moment normally; an external field induces a dipole moment in each molecule.",
        "Polarisation P⃗ = dipole moment per unit volume = np⃗ (n = molecules per unit volume), and equals the induced surface charge density σ_i on the faces of the dielectric facing the plates.",
        "Dielectric strength is the maximum field a dielectric can sustain before it breaks down and starts to conduct; exceeding it destroys the insulating behaviour.",
      ],
    },
    {
      heading: "9. Effect of a Dielectric on Capacitance",
      body:
        "Once a dielectric fills the space between the plates, the induced surface charge on the dielectric partially cancels the field set up by the plates — and this single fact is the source of every formula relating K, charge, field, and capacitance.",
      formula: [
        { label: "Field in presence of dielectric", expression: "E = E₀/K = E₀ − E_i" },
        { label: "Dielectric constant", expression: "K = ε_r = E₀/E = V₀/V = C/C₀ = ε/ε₀" },
        { label: "Induced charge on the dielectric", expression: "Q_i = Q(1 − 1/K)" },
        { label: "Induced surface charge density", expression: "σ_i = σ(1 − 1/K)" },
      ],
      bullets: [
        "K (also written ε_r) is always ≥ 1 for any real dielectric; K = 1 corresponds to vacuum/air (no dielectric at all).",
        "With charge Q held fixed (battery disconnected) and a dielectric inserted: V decreases, C increases, and stored energy U = Q²/2C decreases.",
        "With voltage V held fixed (battery still connected) and a dielectric inserted: Q increases (more charge flows in from the battery), C increases, and stored energy U = ½CV² increases.",
        "These Q–V–C–U relations apply specifically to a parallel plate capacitor; the same induced-charge reasoning carries over conceptually to other geometries but the exact formulas change.",
      ],
    },
    {
      heading: "10. Dielectric or Conducting Slab Partially Filling a Parallel Plate Capacitor",
      body:
        "When a slab — dielectric or conducting — only partly fills the gap between the plates, the capacitor effectively behaves as if the gap had been shortened by an amount that depends on the slab's thickness and (for a dielectric) its dielectric constant.",
      formula: [
        { label: "Dielectric slab, thickness t < d, constant K", expression: "C = ε₀A / [d − t(1 − 1/K)]" },
        { label: "Dielectric filling the entire gap (t = d)", expression: "C = ε₀ε_rA/d = KC₀" },
        { label: "Conducting slab, thickness t < d (K → ∞)", expression: "C = ε₀A/(d − t)" },
      ],
      bullets: [
        "A conducting slab behaves like a dielectric of infinite K — it simply removes its own thickness from the effective gap, since the field inside a conductor is zero.",
        "A metal plate inserted symmetrically between the plates without touching either one, of thickness up to d/2, has no effect on the field calculation outside it — but it does reduce the effective separation, increasing C.",
        "If the dielectric slab's thickness t is increased (with K fixed and t < d), capacitance keeps increasing, reaching its maximum, KC₀, exactly when t = d.",
      ],
    },
    {
      heading: "11. Combination of Capacitors",
      body:
        "Just like resistors, capacitors combine in series and parallel — but the roles are reversed compared to resistors: charge stays common in series, and voltage stays common in parallel.",
      formula: [
        { label: "Series", expression: "1/C_S = 1/C₁ + 1/C₂ + 1/C₃ + …  (same charge Q on each)" },
        { label: "Parallel", expression: "C_P = C₁ + C₂ + C₃ + …  (same voltage V on each)" },
      ],
      bullets: [
        "In series, charge has no alternative path, so every capacitor carries identical charge Q; the applied voltage splits in inverse proportion to capacitance — the smaller capacitor takes the larger share of voltage.",
        "In parallel, voltage is identical across every capacitor (common nodes); the total charge splits in direct proportion to capacitance — the larger capacitor takes the larger share of charge.",
        "C_P is always greater than the largest individual capacitance; C_S is always smaller than the smallest individual capacitance — exactly the opposite of how resistor series/parallel combinations behave.",
        "For N identical capacitors each of capacitance C: series combination gives C/N, parallel combination gives NC.",
        "For maximum energy storage at a given working voltage, capacitors should be connected in parallel (parallel gives the largest equivalent C, and U = ½CV² with V fixed).",
        "Networks with a clear left–right or top–bottom symmetry (a 'balanced bridge' arrangement) often have one branch carrying no charge at all — that branch can be deleted entirely before solving, exactly as with a balanced Wheatstone bridge.",
      ],
    },
    {
      heading: "12. Combination of Dielectric Slabs Within One Capacitor",
      body:
        "Two different dielectrics can be packed into the same parallel plate capacitor in two distinct ways — stacked along the direction of separation, or side by side across the plate area — and each way reduces to a familiar series or parallel rule.",
      formula: [
        { label: "Distance-wise division (slabs stacked, thicknesses d₁, d₂)", expression: "C = ε₀A / [d₁/ε_r1 + d₂/ε_r2]" },
        { label: "Distance-wise, equal thickness (d₁ = d₂ = d/2)", expression: "C = (ε₀A/d) × [2ε_r1ε_r2 / (ε_r1 + ε_r2)]" },
        { label: "Area-wise division (areas A₁, A₂, full separation d)", expression: "C = (ε₀/d)(ε_r1A₁ + ε_r2A₂)" },
        { label: "Area-wise, equal areas (A₁ = A₂ = A/2)", expression: "C = (ε₀A/d) × [(ε_r1 + ε_r2)/2]" },
      ],
      bullets: [
        "Stacking slabs along the separation direction is equivalent to two capacitors in series — the result is a harmonic-mean-like combination of the dielectric constants.",
        "Splitting the area between two dielectrics (same full separation d) is equivalent to two capacitors in parallel — the result is an arithmetic-mean-like combination of the dielectric constants.",
        "For equal halves: distance-wise division gives the harmonic mean of K₁ and K₂ times the original air capacitance; area-wise division gives the arithmetic mean — and the arithmetic mean is always ≥ the harmonic mean, so area-wise division always yields the larger capacitance for the same pair of dielectrics.",
      ],
    },
    {
      heading: "13. Sharing of Charges — Common Potential",
      body:
        "Connect two separately charged capacitors (or conductors) by a wire, and charge redistributes until both reach the same potential — exactly as conservation of charge demands.",
      formula: [
        { label: "Common potential after connection", expression: "V = (C₁V₁ + C₂V₂)/(C₁ + C₂)" },
        { label: "Charge on each after connection", expression: "Q₁′ = [C₁/(C₁+C₂)]Q,  Q₂′ = [C₂/(C₁+C₂)]Q,  where Q = total charge" },
        { label: "Ratio of charges after redistribution (spherical conductors)", expression: "Q₁′/Q₂′ = R₁/R₂" },
      ],
      bullets: [
        "If both conductors start at the same potential (V₁ = V₂), connecting them causes no flow of charge at all and no energy is lost.",
        "A charged capacitor connected to an identical uncharged one: the total energy drops to half of the original, with the energy split equally — each ends up storing a quarter of the original energy, and the other quarter is lost as heat.",
      ],
    },
    {
      heading: "14. Loss of Energy in Charge Redistribution",
      body:
        "Whenever charge flows through a connecting wire to equalise potentials, some electrical energy always converts irreversibly to heat — the redistribution can never be perfectly lossless unless no charge needed to move in the first place.",
      formula: [
        { label: "Heat lost on connection", expression: "ΔU = −½ [C₁C₂/(C₁+C₂)] (V₁ − V₂)²" },
      ],
      bullets: [
        "The negative sign simply confirms that the system's total electrostatic energy always decreases (or stays the same) when charge redistributes — the lost energy appears as heat in the wire and any resistance, however small.",
        "Loss depends only on the difference (V₁ − V₂), squared — equal initial potentials (regardless of charge or capacitance) always give zero loss.",
      ],
    },
    {
      heading: "15. Charging and Discharging of a Capacitor (RC Circuit)",
      body:
        "A capacitor never charges or discharges instantly through a resistor — the process follows a smooth exponential curve in time, governed by a single characteristic timescale called the time constant.",
      formula: [
        { label: "Charging — charge at time t", expression: "Q(t) = Q₀(1 − e^(−t/RC)), Q₀ = CV" },
        { label: "Charging — potential difference at time t", expression: "V(t) = V₀(1 − e^(−t/RC))" },
        { label: "Discharging — charge at time t", expression: "Q(t) = Q₀e^(−t/RC)" },
        { label: "Time constant", expression: "τ = RC" },
      ],
      bullets: [
        "During charging, after one time constant (t = RC), the charge/voltage on the capacitor has risen to about 63% of its final (maximum) value.",
        "During discharging, after one time constant, the charge has fallen to about 37% of its initial value.",
        "A larger R or larger C means a larger time constant — charging/discharging takes proportionally longer.",
        "In the steady state (a long time after the switch is closed, t ≫ RC), no current flows through a fully charged capacitor's branch — it behaves like an open circuit; this is the standard trick used to find steady-state currents and voltages in mixed RC networks.",
        "Immediately after closing the switch (t = 0), an initially uncharged capacitor behaves like a plain connecting wire (zero resistance) — this is the standard trick used to find the initial current in a circuit.",
      ],
    },
    {
      heading: "16. Van de Graaff Generator",
      body:
        "This machine is built specifically to pile up an enormous electrostatic potential — tens of millions of volts — by repeatedly carrying small charges up to a large hollow conducting shell, exploiting the fact that charge given to a hollow conductor always migrates entirely to its outer surface.",
      bullets: [
        "Operates on corona discharge — sharp points leak charge into the surrounding air, ionising it and creating an 'electric wind' that carries charge away from (or toward) the point.",
        "An insulating belt physically carries charge from a charging source at the base up to a metal brush inside the high-voltage terminal at the top.",
        "Because charge delivered to a hollow conductor distributes itself entirely over the outer surface, more and more charge can keep being added to the shell even as its potential rises — the new charge always finds itself at a lower potential than the shell, regardless of how much charge the shell already carries, which is exactly why the process doesn't choke itself off.",
        "The terminal's potential keeps climbing until it approaches the breakdown field of air, about 3 × 10⁶ V/m at the surface — beyond this, the device starts leaking charge into the surrounding air instead of storing more.",
        "Used to accelerate charged particles (protons, ions) to very high energies for nuclear and particle-physics experiments.",
      ],
    },
  ],
};
