import type { ChapterNotes } from "./kinematics";

export const currentElectricityNotes: ChapterNotes = {
  chapterName: "Current Electricity",
  className: "12",
  intro:
    "Until now, charges were studied at rest — fields, potential, capacitance. This chapter sets them in motion. A steady flow of charge through a conductor is what we call current, and almost everything here — drift velocity, resistance, Kirchhoff's laws, cells, and the potentiometer — is really just the bookkeeping of how charge moves and how energy is spent moving it. This is one of the highest-weightage chapters in both JEE and NEET, and circuit problems built on these ideas show up in nearly every paper.",
  sections: [
    {
      heading: "1. Electric Current — Definition and Direction",
      body:
        "Electric current is the rate at which charge crosses a cross-section of a conductor. It is a scalar quantity — direction is assigned only by convention, not because current obeys vector addition.",
      formula: [
        { label: "Average current", expression: "I_avg = ΔQ/Δt" },
        { label: "Instantaneous current", expression: "I = dQ/dt" },
      ],
      bullets: [
        "SI unit: ampere (A). One ampere = one coulomb of charge crossing a section per second.",
        "Conventional current direction = direction of flow of positive charge, opposite to the actual direction of electron drift in a metal.",
        "A conductor stays electrically neutral while carrying current — charge entering one end per second equals charge leaving the other end per second.",
      ],
    },
    {
      heading: "2. Current Density",
      body:
        "Current is a bulk, cross-section-wide quantity. Current density localises this idea to a point, describing how much current flows per unit area at that point, along with its direction.",
      formula: [
        { label: "Current density (area normal to flow)", expression: "J = dI/dA" },
        { label: "General form (area at angle θ to flow)", expression: "dI = J·dA cosθ ⟹ I = ∫ J⃗·dA⃗" },
      ],
      bullets: [
        "J⃗ is a vector; its direction coincides with the direction of E⃗ inside the conductor.",
        "SI unit: A/m². Current density is largest where the conductor's cross-section is smallest.",
        "For a non-uniform wire carrying a steady current, I is the same everywhere along it, but J, E, and drift velocity all scale as 1/A.",
      ],
    },
    {
      heading: "3. Free Electrons and Random Thermal Motion",
      body:
        "A metal is packed with free (conduction) electrons undergoing rapid, random thermal motion — colliding constantly with vibrating positive ions. Averaged over all electrons, this motion carries no net current because it has no preferred direction.",
      formula: [{ label: "RMS thermal speed", expression: "v_rms = √(3kT/m)" }],
      bullets: [
        "At room temperature (≈300 K), v_rms is of the order 10⁵ m/s — fast, but directionless on average.",
        "Mean free path (λ): average distance an electron travels between collisions, ≈ 10 Å in metals.",
        "Relaxation time (τ): average time between successive collisions, ≈ 10⁻¹⁴ s in metals.",
        "Without an applied field, the average velocity of the free-electron population is zero — hence zero current.",
      ],
    },
    {
      heading: "4. Drift Velocity",
      body:
        "Switch on an electric field, and a tiny, organised velocity component gets superimposed on the chaotic thermal motion — this is the drift velocity. It's what actually constitutes the current; the thermal motion underneath contributes nothing to net charge transport.",
      formula: [{ label: "Drift velocity", expression: "v_d = eEτ/m" }],
      bullets: [
        "Order of magnitude: v_d ~ 10⁻⁴ m/s — roughly a billion times slower than the thermal speed.",
        "Electrons accelerate between collisions but lose this gained velocity at the very next collision; only the small net drift survives, averaged over time.",
        "This is why a light switching on feels instantaneous even though individual electrons crawl: the electric field itself propagates at close to the speed of light, triggering drift everywhere in the wire almost at once.",
      ],
    },
    {
      heading: "5. Relating Current to Drift Velocity",
      body:
        "Counting how much charge crosses a section in a given time, in terms of the number density of free electrons and their drift speed, gives the working formula connecting microscopic motion to the current you measure with an ammeter.",
      formula: [{ label: "Current in terms of drift velocity", expression: "I = neAv_d" }],
      bullets: [
        "n = free-electron density (≈10²⁸ m⁻³ for typical metals, vastly higher than in semiconductors, ≈10¹⁶ m⁻³).",
        "For a fixed current I, a narrower section (smaller A) forces a larger drift velocity — current itself stays constant along a series conductor of varying cross-section.",
      ],
    },
    {
      heading: "6. Mobility",
      body:
        "Mobility packages the response of a charge carrier to a field into a single number — how much drift speed you get per unit of applied field. It is what makes σ = ne²τ/m a material property rather than a circuit-dependent one.",
      formula: [{ label: "Mobility", expression: "μ = |v_d|/E = eτ/m" }],
      bullets: [
        "SI unit: m²/(V·s). Mobility is always taken as a positive quantity, even for electrons (whose drift is opposite to E⃗).",
        "Higher relaxation time τ or lower carrier mass m both raise mobility.",
      ],
    },
    {
      heading: "7. Microscopic and Macroscopic Forms of Ohm's Law",
      body:
        "Ohm's law has a point-by-point (microscopic) version and a whole-conductor (macroscopic, lab) version. Both say the same physical thing: current density/current responds linearly to the driving field/voltage, governed entirely by a material property.",
      formula: [
        { label: "Microscopic form", expression: "J⃗ = σE⃗,   where σ = ne²τ/m" },
        { label: "Macroscopic form", expression: "V = IR" },
      ],
      bullets: [
        "σ is the conductivity — it depends only on the material and its temperature, never on the shape of the sample.",
        "Ohm's law is an empirical, not a fundamental, law of nature: vacuum tubes, diodes, and GaAs all violate it under various conditions.",
      ],
    },
    {
      heading: "8. Resistance, Resistivity and Conductivity",
      body:
        "Resistance is what a particular piece of wire offers; resistivity is what the material itself offers, independent of how that material is shaped.",
      formula: [
        { label: "Resistance", expression: "R = ρl/A" },
        { label: "Resistivity–conductivity relation", expression: "ρ = 1/σ" },
      ],
      bullets: [
        "R ∝ l and R ∝ 1/A — resistance is a property of the specific conductor (depends on geometry).",
        "ρ depends only on the nature of the material and its temperature — never on length, area, or shape.",
        "Units: R in ohm (Ω); ρ in Ω·m; dimensions of R are [ML²T⁻³A⁻²].",
      ],
    },
    {
      heading: "9. Effect of Stretching a Wire on its Resistance",
      body:
        "Stretching a wire keeps its volume fixed but trades length for cross-sectional area, so resistance changes faster than either dimension alone would suggest — a frequently tested numerical idea.",
      bullets: [
        "If a wire is stretched to n times its original length (volume constant): new resistance = n² × original resistance.",
        "If the radius is reduced to (1/n) of its original value (so length grows correspondingly): new resistance = n⁴ × original resistance.",
        "For a small percentage change x% in length (volume constant), the resistance changes by approximately 2x% — a quick first-order result, valid only for small x.",
      ],
    },
    {
      heading: "10. V–I Characteristics — Ohmic and Non-Ohmic Conductors",
      body:
        "Plotting current against applied voltage immediately separates well-behaved resistors from devices with richer, voltage-dependent behaviour.",
      bullets: [
        "Ohmic (linear) conductors: V–I graph is a straight line through the origin at constant temperature — pure metallic resistors are the standard example.",
        "Non-ohmic (non-linear) conductors: the V–I relation can depend on the sign of V (a diode conducts well in one direction, poorly in reverse), or can be multi-valued — for the same current, more than one voltage is possible (seen in materials like GaAs, which also shows a negative-resistance region).",
        "A steeper V–I slope (smaller current for the same voltage) corresponds to higher resistance; comparing two V–I lines at different temperatures, the one with the larger slope angle (tanθ) has the higher resistance and higher temperature, for an ohmic conductor whose resistance rises with temperature.",
      ],
    },
    {
      heading: "11. Temperature Dependence of Resistivity and Resistance",
      body:
        "Over a limited temperature range, resistivity (and hence resistance) varies almost linearly with temperature, with a sign that flips between metals and semiconductors.",
      formula: [
        { label: "Resistivity vs temperature", expression: "ρ_T = ρ₀[1 + α(T − T₀)]" },
        { label: "Resistance vs temperature", expression: "R_t = R₀(1 + αΔT)" },
      ],
      bullets: [
        "α (temperature coefficient of resistance), unit °C⁻¹, is positive for metals — resistance rises with temperature as ion vibrations increase and scatter electrons more often, shortening the relaxation time.",
        "α is negative for semiconductors, insulators, and carbon (graphite) — more thermally freed charge carriers outweigh increased scattering, so resistance falls as temperature rises.",
        "Below a critical temperature, certain conductors lose all resistance and become superconductors.",
        "Alloys (manganin, constantan) are deliberately chosen for resistance boxes because their α is very small — their resistance barely drifts with temperature.",
      ],
    },
    {
      heading: "12. Colour Coding of Carbon Resistors",
      body:
        "Carbon resistors are too small to print values on, so four (or more) coloured bands encode the resistance and its tolerance instead.",
      bullets: [
        "First band: first significant digit. Second band: second significant digit. Third band: power-of-ten multiplier. Fourth band: tolerance.",
        "Digit/multiplier colours run black=0, brown=1, red=2, orange=3, yellow=4, green=5, blue=6, violet=7, grey=8, white=9, with the same colours (from brown onward) used as ×10¹, ×10², … for the multiplier band.",
        "Tolerance colours: gold = ±5%, silver = ±10%; no fourth band at all implies ±20%.",
        "Worked example: bands orange, blue, yellow, gold → digits 3 and 6, multiplier ×10⁴ → resistance = 36 × 10⁴ Ω, tolerance ±5%.",
      ],
    },
    {
      heading: "13. Series and Parallel Combination of Resistors",
      body:
        "Two structurally opposite ways to combine resistors, distinguished by whether current or voltage stays common across the elements.",
      formula: [
        { label: "Series", expression: "R = R₁ + R₂ + R₃ + …" },
        { label: "Parallel", expression: "1/R = 1/R₁ + 1/R₂ + 1/R₃ + …" },
      ],
      bullets: [
        "Series: same current through every resistor; voltage divides in direct proportion to resistance — V₁ : V₂ : V₃ = R₁ : R₂ : R₃.",
        "Parallel: same voltage across every resistor; current divides in inverse proportion to resistance — I₁ : I₂ : I₃ = 1/R₁ : 1/R₂ : 1/R₃.",
        "The equivalent resistance of a parallel combination is always smaller than the smallest individual resistance in it.",
        "Mixed networks are solved by successive reduction (collapsing obvious series/parallel sub-groups), by exploiting symmetry (identifying equipotential points to delete or short resistors on a line of symmetry), or by the nodal method when two points are directly wired together.",
      ],
    },
    {
      heading: "14. Kirchhoff's Laws",
      body:
        "For circuits too tangled for simple series–parallel reduction, Kirchhoff's two laws — one for junctions, one for loops — are enough to solve for every current, and they rest on two of the most basic conservation principles in physics.",
      formula: [
        { label: "Junction law (KCL)", expression: "ΣI = 0  (current in = current out)" },
        { label: "Loop law (KVL)", expression: "ΣIR = ΣE  around any closed loop" },
      ],
      bullets: [
        "KCL is a statement of conservation of charge: charge can't pile up or vanish at a junction.",
        "KVL is a statement of conservation of energy: going all the way around a closed loop, the total potential change must be zero.",
        "Sign convention while applying KVL: moving from the − to + terminal inside a cell, take emf as positive; moving in the direction assumed for current through a resistor, take the IR drop as negative.",
      ],
    },
    {
      heading: "15. EMF, Internal Resistance and Terminal Voltage of a Cell",
      body:
        "A real cell is never a perfect source — the chemical reaction inside has its own resistance, so the voltage you actually measure across its terminals depends on how much current is flowing and in which direction.",
      formula: [
        { label: "Current while discharging", expression: "I = E/(R + r)" },
        { label: "Terminal voltage while discharging", expression: "V = E − Ir" },
        { label: "Terminal voltage while charging", expression: "V = E + Ir" },
      ],
      bullets: [
        "EMF (E) is the potential difference across the terminals when no current is drawn at all — the maximum possible terminal voltage.",
        "Internal resistance (r) depends on electrode separation, electrolyte concentration, electrode area, and temperature — never on the external circuit.",
        "Open circuit (R → ∞): I = 0, so V = E (maximum terminal voltage).",
        "Short circuit (R = 0): I = E/r (maximum possible current), and V = 0.",
        "While charging, the terminal voltage exceeds the emf — the charger has to push current against the cell's own emf as well as its internal resistance.",
      ],
    },
    {
      heading: "16. Combination of Cells",
      body:
        "Cells, like resistors, can be wired in series, parallel, or a mixed grid — but which arrangement is useful depends on how the internal resistance of the cells compares with the external resistance being driven.",
      formula: [
        { label: "n cells in series", expression: "E_net = nE,  r_net = nr,  I = nE/(nr + R)" },
        { label: "m identical cells in parallel", expression: "E_net = E,  r_net = r/m,  I = mE/(r + mR)" },
        { label: "n series × m parallel rows", expression: "E_net = nE,  r_net = nr/m,  I = nEm/(nr + mR)" },
      ],
      bullets: [
        "Series combination is preferred when internal resistance is small compared to external resistance (nr ≪ R) — current scales up almost as nE/R.",
        "Parallel combination is preferred when internal resistance is large compared to external resistance (r ≫ mR) — current scales up almost as m × (single-cell short-circuit current).",
        "For the mixed grid, current is maximum when the external resistance equals the total internal resistance: R = nr/m.",
      ],
    },
    {
      heading: "17. Electrical Power, Energy and Joule's Law of Heating",
      body:
        "Every charge moving through a resistance loses energy to collisions with the lattice — this lost energy reappears as heat, and the rate at which it appears is electrical power.",
      formula: [
        { label: "Power dissipated", expression: "P = VI = I²R = V²/R" },
        { label: "Heat produced (Joule heating)", expression: "Q = I²Rt" },
      ],
      bullets: [
        "Heat produced does not depend on the direction of current flow — only on its magnitude, R, and time.",
        "1 kilowatt-hour (kWh, the household electricity 'unit') = 3.6 × 10⁶ J.",
        "Heating elements (heater, geyser, iron) use nichrome — high resistivity, high melting point, doesn't oxidise easily when red hot.",
        "Fuse wire uses a tin–lead alloy — low melting point so it melts and opens the circuit when current exceeds a safe limit.",
        "Bulb filaments use tungsten — high melting point (≈3300 K), and the bulb is filled with inert gas to stop the hot tungsten from oxidising.",
      ],
    },
    {
      heading: "18. Maximum Power Transfer and Bulbs in Series/Parallel",
      body:
        "A cell can never deliver unlimited power to a load — there is a specific external resistance at which the power delivered peaks, and this same R-versus-power thinking explains a famously counter-intuitive bulb-brightness result.",
      formula: [{ label: "Maximum power delivered to external R", expression: "P_max = E²/(4r), occurring at R = r" }],
      bullets: [
        "In series (same current through every bulb), power dissipated P = I²R increases with R — so the bulb with the lower rated wattage (which has the higher resistance at rated voltage) glows brighter.",
        "In parallel (same voltage across every bulb), power dissipated P = V²/R decreases as R increases — so the bulb with the higher rated wattage (lower resistance) glows brighter.",
        "Two identical heater coils, supply voltage unchanged: heat generated in series (H_S) and in parallel (H_P) are related by H_P = 4H_S.",
      ],
    },
    {
      heading: "19. Galvanometer, Ammeter and Voltmeter",
      body:
        "A galvanometer only measures small currents directly via coil deflection. Converting it into a practical ammeter or voltmeter is purely a matter of adding the right resistor in the right place.",
      formula: [
        { label: "Shunt for ammeter conversion", expression: "R_shunt = I_gR_g /(I − I_g)" },
        { label: "Series resistance for voltmeter conversion", expression: "R_series = V/I_g − R_g" },
      ],
      bullets: [
        "Ammeter: a low-resistance shunt is placed in parallel with the galvanometer coil, diverting most of the current around it; an ideal ammeter has zero resistance.",
        "Voltmeter: a high resistance is placed in series with the galvanometer coil, limiting the current it draws; an ideal voltmeter has infinite resistance.",
        "Adding a shunt reduces the effective resistance of the combination below even the shunt's own resistance, but it also reduces galvanometer sensitivity.",
        "To extend an ammeter of range I and resistance R_g to range nI, the parallel resistor needed is R_g/(n − 1); to extend a voltmeter of range V to nV, the series resistor needed is (n − 1)R_g.",
      ],
    },
    {
      heading: "20. Wheatstone Bridge and Metre Bridge",
      body:
        "The Wheatstone bridge is a four-resistor arrangement that finds an unknown resistance by tuning the network until the galvanometer reads exactly zero — no current, no error from the galvanometer's own resistance.",
      formula: [
        { label: "Balance condition", expression: "P/Q = R/S" },
        { label: "Metre bridge (unknown S, known R, balance length l from end A)", expression: "S = R(100 − l)/l" },
      ],
      bullets: [
        "At balance (I_g = 0), the bridge is said to be balanced; the galvanometer branch carries no current and can even be removed without disturbing the rest of the circuit.",
        "If P/Q < R/S, current flows one way through the galvanometer branch; if P/Q > R/S, it flows the other way — useful for predicting which way a slightly unbalanced bridge will deflect.",
        "A metre bridge is a practical, one-metre-wire version of the Wheatstone bridge, with the ratio arms P and Q replaced by lengths of uniform resistance wire on either side of a sliding jockey.",
        "The bridge is most sensitive when all four resistances are of comparable order of magnitude.",
      ],
    },
    {
      heading: "21. Potentiometer — Principle and Applications",
      body:
        "An ordinary voltmeter always draws some current, which itself disturbs the very potential difference it's trying to measure. A potentiometer sidesteps this entirely: at the balance point, it draws no current at all from the circuit being measured, making it the most accurate way to compare or determine emfs and potential differences.",
      formula: [
        { label: "Potential gradient", expression: "x = V_AB/L  (volt per metre along the wire)" },
        { label: "Comparing two emfs", expression: "E₁/E₂ = l₁/l₂" },
        { label: "Internal resistance of a cell", expression: "r = R(l₁ − l₂)/l₂" },
      ],
      bullets: [
        "Working principle: an unknown potential difference is balanced against a known, uniformly-distributed potential drop along a wire — the 'zero deflection' or null method.",
        "Potentiometer wire is made of manganin, constantan, or eureka — alloys chosen for high resistivity and a near-zero temperature coefficient, so the potential gradient stays stable over time.",
        "Sensitivity increases as the potential gradient x decreases — achieved by increasing the wire's length or adding resistance (rheostat) in the primary circuit to reduce the primary current.",
        "Any change made in the secondary (galvanometer) circuit never affects the potential gradient, since x is set entirely by the primary circuit.",
        "Other standard applications: finding the current in a circuit, and comparing two unknown resistances — both reduce to measuring a balance length and applying x = V/L.",
        "Compared to a voltmeter, a potentiometer is more accurate (draws no current at balance), more sensitive, but only usable for the specific applications it's designed for — a voltmeter remains the quicker, everyday tool.",
      ],
    },
  ],
};
