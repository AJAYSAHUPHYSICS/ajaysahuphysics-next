import type { ChapterNotes } from "./kinematics";

export const thermodynamicsNotes: ChapterNotes = {
  chapterName: "Thermodynamics",
  className: "11",
  intro:
    "Thermodynamics studies how heat, work, and internal energy convert into one another. Everything in this chapter flows from one equation — the first law, dQ = dU + dW — applied to five named processes (isochoric, isobaric, isothermal, adiabatic, and free expansion). It then builds up to heat engines, refrigerators, and the second law, which sets a hard limit on how efficient any engine converting heat to work can ever be.",
  sections: [
    {
      heading: "1. Thermodynamic Systems and State Variables",
      body:
        "A thermodynamic system is any specified portion of matter (like gas enclosed in a cylinder with a piston) whose pressure, volume, and temperature can be tracked, while everything outside it that can exchange energy with it is called the surroundings.",
      formula: [
        { label: "Equation of state (ideal gas)", expression: "PV = μRT" },
      ],
      bullets: [
        "A homogeneous system is uniform throughout (a pure solid or liquid); a heterogeneous system is not (e.g., two immiscible liquids together). An isolated system exchanges neither matter nor energy with its surroundings. The system plus its surroundings together make up 'the universe' in the thermodynamic sense.",
        "A system's thermodynamic state is completely fixed by any two of its three state variables (P, V, T) — the third follows automatically from PV = μRT, so only two are ever independent.",
        "A P–V (indicator) diagram plots volume on the x-axis and pressure on the y-axis; every point on it represents one possible equilibrium state of the system, and a curve joining two points represents a path the system takes between those states.",
      ],
    },
    {
      heading: "2. Internal Energy",
      body:
        "Internal energy (U) is the total energy a system holds because of the motion of its molecules (internal kinetic energy) and their mutual configuration (internal potential energy).",
      formula: [
        { label: "Internal energy split", expression: "dU = dU_k + dU_p" },
        { label: "Ideal gas (no intermolecular forces, dU_p = 0)", expression: "dU = dU_k = μC_vdT" },
      ],
      bullets: [
        "For an ideal gas, internal energy depends only on temperature — it is a state function, meaning ΔU = U_f − U_i depends only on the initial and final states, never on the path taken to get from one to the other.",
        "This path-independence of ΔU is what makes internal energy fundamentally different from heat and work, both of which do depend on the path — a distinction that becomes central to the first law.",
      ],
    },
    {
      heading: "3. Sign Convention and Work Done by a Gas",
      body:
        "Before applying the first law to any process, a consistent sign convention is essential, since heat and work can each flow in either direction relative to the system.",
      formula: [
        { label: "Work done in expansion/compression", expression: "dW = PdV  ⇒  W = ∫(Vi to Vf) PdV" },
      ],
      bullets: [
        "Sign convention: heat gained by the system is positive, heat lost is negative; work done BY the system is positive, work done ON the system is negative; a rise in internal energy is positive, a fall is negative.",
        "Work done by a gas equals the area under the curve on a P–V diagram between the initial and final volumes — this geometric picture works for any process, not just simple ones, and is often faster than direct integration.",
        "If volume increases, the gas does positive work (W > 0); if volume decreases, work done by the gas is negative; if volume is constant, W = 0 regardless of how pressure changes.",
        "In a cyclic process (the system returns to its starting state), the net work equals the enclosed area of the closed loop on the P–V diagram — positive (and equal to +area) if the cycle runs clockwise, negative (−area) if anticlockwise.",
      ],
    },
    {
      heading: "4. The First Law of Thermodynamics",
      body:
        "The first law is simply the law of conservation of energy applied to heat, work, and internal energy — heat supplied to a system either raises its internal energy, or is used by the system to do external work, or both.",
      formula: [
        { label: "First law of thermodynamics", expression: "dQ = dU + dW  (i.e., Q = ΔU + W)" },
      ],
      bullets: [
        "dQ and dW both depend on the path taken between two states, but their difference dQ − dW does not — this path-independent quantity is exactly dU, which is how the first law identifies internal energy as a genuine state function in the first place.",
        "The first law applies to every process in nature and to all three phases of matter (solid, liquid, gas) — it places no restriction on which processes are allowed, that job belongs to the second law.",
        "Q, ΔU, and W must all be expressed in the same units (all as heat units, or all as work/mechanical units) before the equation can be applied numerically.",
      ],
    },
    {
      heading: "5. Applying the First Law: Melting and Boiling",
      body:
        "Phase changes are a clean test case for the first law, since temperature stays fixed throughout and all the absorbed heat splits cleanly between internal energy change and work done in any associated volume change.",
      formula: [
        { label: "Heat absorbed during melting/boiling", expression: "Q = mL" },
        { label: "First law applied to melting", expression: "Q = ΔU + PΔV" },
        { label: "First law applied to boiling (liquid → vapour)", expression: "mL = (U_v − U_l) + P(V_v − V_l)" },
      ],
      bullets: [
        "During melting, the volume change (ΔV) is usually so small that the PΔV work term is negligible compared to mL — almost all the latent heat of fusion goes into changing internal (potential) energy as the solid's rigid structure breaks down.",
        "During boiling, the volume increase from liquid to vapour is large, so the work term P(V_v − V_l) is significant — a sizeable fraction of the latent heat of vaporisation goes into pushing back the atmosphere as the vapour expands, with the rest changing the internal energy.",
      ],
    },
    {
      heading: "6. Isochoric (Isometric) Process",
      body:
        "An isochoric process happens at constant volume — pressure and temperature change, but the gas does no work because it never expands or contracts.",
      formula: [
        { label: "Equation of state", expression: "P/T = constant" },
        { label: "Work done", expression: "W = 0" },
        { label: "First law reduces to", expression: "Q = ΔU = μC_vΔT" },
      ],
      bullets: [
        "Since dV = 0 throughout, the slope of the P–V curve is infinite (a vertical line) — every bit of heat supplied goes directly into raising internal energy, none of it into external work.",
        "Examples: a gas in a rigid, fixed-piston cylinder being heated; heating in a pressure cooker; melting (where the volume change is negligible) is often treated as nearly isochoric too.",
      ],
    },
    {
      heading: "7. Isobaric Process",
      body:
        "An isobaric process happens at constant pressure — volume and temperature change together (V ∝ T), and the gas does work as it expands or is compressed against this fixed external pressure.",
      formula: [
        { label: "Equation of state", expression: "V/T = constant" },
        { label: "Work done", expression: "W = PΔV = μRΔT" },
        { label: "First law", expression: "Q = ΔU + W = μC_vΔT + μRΔT = μC_PΔT" },
        { label: "Fraction of heat going to internal energy / work", expression: "ΔU/Q = 1/γ,  W/Q = 1 − 1/γ" },
      ],
      bullets: [
        "The slope of an isobaric line on a P–V diagram is zero (a horizontal line) — pressure never changes, no matter how much the volume changes.",
        "Heat supplied at constant pressure does two jobs simultaneously: raises the internal energy, and does work pushing back the surroundings — which is exactly why C_P must be larger than C_v.",
        "Examples: heating water or boiling a liquid at atmospheric pressure; melting a solid at atmospheric pressure.",
      ],
    },
    {
      heading: "8. Isothermal Process",
      body:
        "An isothermal process keeps temperature constant throughout, while pressure and volume both change — this requires the process to happen slowly enough that heat can continuously flow in or out to cancel any tendency for temperature to shift.",
      formula: [
        { label: "Equation of state", expression: "PV = constant (Boyle's law)" },
        { label: "Work done", expression: "W = μRT ln(V₂/V₁) = 2.303μRT log₁₀(V₂/V₁) = 2.303μRT log₁₀(P₁/P₂)" },
        { label: "First law (since ΔU = 0)", expression: "Q = W" },
      ],
      bullets: [
        "Since internal energy of an ideal gas depends only on temperature, ΔU = 0 for any isothermal process — every joule of heat absorbed is converted entirely into external work, with nothing left over to change internal energy.",
        "The isotherm (P–V curve at constant T) is a hyperbola; its slope is dP/dV = −P/V. Isotherms for different temperatures of the same gas never cross — if two did intersect, that single point would force both temperatures to be equal, contradicting the premise that they're different.",
        "On a P–T diagram, a higher isotherm (further from the origin in the P-V plane, i.e., further out) corresponds to a higher temperature, since at constant pressure V ∝ T.",
        "Examples that are effectively isothermal: melting and boiling (temperature stays fixed by definition); any very slow expansion/compression inside a perfectly conducting cylinder, where heat exchange with the surroundings keeps pace with the change so temperature never lags.",
      ],
    },
    {
      heading: "9. Adiabatic Process",
      body:
        "An adiabatic process has zero heat exchange with the surroundings — pressure, volume, and temperature all change, but purely because of work done, not because of any heat flowing in or out. It typically happens because the process is either thermally insulated or simply too fast for heat to escape.",
      formula: [
        { label: "Adiabatic relations", expression: "PV^γ = constant,  TV^(γ−1) = constant,  T^γP^(1−γ) = constant" },
        { label: "Work done", expression: "W = (P₁V₁ − P₂V₂)/(γ−1) = μR(T₁ − T₂)/(γ−1)" },
        { label: "First law (since Q = 0)", expression: "dU = −dW" },
        { label: "Slope of adiabatic curve", expression: "dP/dV = −γP/V  (steeper than the isothermal slope by a factor of γ)" },
      ],
      bullets: [
        "Since Q = 0, any work the gas does in adiabatic expansion comes entirely at the cost of its own internal energy — the gas cools (T₂ < T₁) when it expands adiabatically, and heats up (T₂ > T₁) when compressed adiabatically.",
        "Because γ > 1 always, an adiabatic curve is always steeper than an isothermal curve passing through the same point — pressure falls faster with increasing volume along an adiabatic expansion than along an isothermal one.",
        "Examples: sudden compression or expansion of a gas in an insulated cylinder; bursting of a tyre tube; propagation of sound waves through a gas; the diesel engine's fuel-air mixture igniting purely from the heat of sudden adiabatic compression (no spark plug needed).",
      ],
    },
    {
      heading: "10. Free Expansion",
      body:
        "Free expansion is a special, idealised process: a thermally insulated gas is allowed to rush into a connected, evacuated, insulated container until pressure equalises, with no piston or external surroundings for it to push against.",
      bullets: [
        "Free expansion is adiabatic (insulated, so Q = 0) and the gas does no external work at all (W = 0), since it isn't pushing against any resisting pressure — it is simply rushing into a vacuum.",
        "Applying the first law: dQ = dU + dW ⇒ 0 = dU + 0 ⇒ dU = 0. So the internal energy — and hence the temperature — of an ideal gas is unchanged by free expansion.",
        "This result is exactly why internal energy of an ideal gas is said to depend only on temperature and not at all on volume: free expansion changes the gas's volume drastically while leaving both U and T completely unchanged.",
        "Free expansion is neither isothermal, isobaric, isochoric, nor a standard adiabatic process in the usual sense (P, V both change with Q = 0, but it does not follow the PV^γ = constant relation, since it is fundamentally irreversible and not quasi-static).",
      ],
    },
    {
      heading: "11. Degrees of Freedom and Specific Heats of a Gas",
      body:
        "The number of independent ways a gas molecule can store energy (its degrees of freedom, f) directly fixes how much internal energy a mole of that gas carries, and from there, both of its specific heats.",
      formula: [
        { label: "Internal energy per mole", expression: "U = (f/2)RT" },
        { label: "Specific heat at constant volume", expression: "C_v = (f/2)R" },
        { label: "Specific heat at constant pressure", expression: "C_P = C_v + R = [(f+2)/2]R" },
        { label: "Ratio of specific heats", expression: "γ = C_P/C_v = 1 + 2/f" },
      ],
      bullets: [
        "Monoatomic gas: f = 3 (three translational degrees of freedom only) ⇒ C_v = (3/2)R, C_P = (5/2)R, γ = 5/3 ≈ 1.67.",
        "Diatomic gas (and linear triatomic, at ordinary temperatures): f = 5 (3 translational + 2 rotational) ⇒ C_v = (5/2)R, C_P = (7/2)R, γ = 7/5 = 1.4.",
        "Non-linear (triangular) polyatomic gas: f = 6 ⇒ C_v = 3R, C_P = 4R, γ = 4/3 ≈ 1.33.",
        "γ always lies strictly between 1 and 2; gases with more degrees of freedom have smaller γ. For a mixture of gases with different atomicities, the mixture's γ lies between the γ values of its components.",
        "For a general process following PVˣ = constant, the molar heat capacity works out to C = R/(1−x) + C_v: this gives C = C_P for an isobaric process (x = 0), C → ∞ for an isothermal process (x = 1), and C = 0 for an adiabatic process (x = γ).",
      ],
    },
    {
      heading: "12. Mayer's Relation: Why C_P Exceeds C_v",
      body:
        "Heating a gas at constant pressure always requires more heat per degree than heating it at constant volume, because the constant-pressure case has to additionally supply the energy for the gas to expand and push back the atmosphere.",
      formula: [
        { label: "Mayer's relation", expression: "C_P − C_v = R" },
      ],
      bullets: [
        "At constant volume, all the heat goes purely into raising temperature (no work is done). At constant pressure, the same temperature rise needs that same internal-energy contribution PLUS the work μRΔT done in expanding — so C_P must exceed C_v by exactly R.",
        "Mayer's relation follows directly from combining the first law (dQ = dU + dW) with dQ = μC_PdT, dU = μC_vdT, and dW = μRdT for the isobaric case, then cancelling μdT throughout.",
      ],
    },
    {
      heading: "13. Heat Engines and Efficiency",
      body:
        "A heat engine is any device that converts heat into mechanical work, by repeatedly taking heat from a hot source, converting part of it into work, and dumping the unused remainder into a cold sink.",
      formula: [
        { label: "Efficiency of a heat engine", expression: "η = W/Q₁ = (Q₁ − Q₂)/Q₁ = 1 − Q₂/Q₁" },
        { label: "Efficiency of a cycle (general)", expression: "η = (net work done in the cycle)/(positive heat absorbed) = (P–V loop area)/(heat injected)" },
      ],
      bullets: [
        "Every heat engine has three essential parts: a high-temperature source (T₁) that supplies heat, a low-temperature sink (T₂) that absorbs the rejected heat, and a working substance that carries out the cycle between them.",
        "No heat engine can have η = 1 (100% efficiency) — some heat must always be rejected to the sink; this is exactly the content of the second law (Kelvin–Planck statement), not just a practical limitation.",
      ],
    },
    {
      heading: "14. Refrigerators and Coefficient of Performance",
      body:
        "A refrigerator runs a heat engine in reverse: instead of producing work from a heat flow, external work is supplied to forcibly pump heat from a cold reservoir to a hotter one — exactly the direction heat would never flow on its own.",
      formula: [
        { label: "Coefficient of performance (C.O.P.)", expression: "β = Q₂/W = Q₂/(Q₁ − Q₂)" },
        { label: "For a Carnot (reversible) refrigerator", expression: "β = T₂/(T₁ − T₂)" },
        { label: "Relation between β and engine efficiency η (same reservoirs)", expression: "β = (1/η) − 1" },
      ],
      bullets: [
        "Q₁ = Q₂ + W always — the heat dumped into the hot reservoir equals the heat extracted from the cold one plus the work put in to drive the cycle (energy conservation).",
        "Unlike efficiency (which is always ≤ 1), C.O.P. has no upper limit of 1 — a good refrigerator can easily move several times more heat than the work it consumes, especially when T₁ and T₂ are close together.",
      ],
    },
    {
      heading: "15. The Second Law of Thermodynamics and Entropy",
      body:
        "The first law alone permits all sorts of processes that are never actually observed in nature (heat spontaneously flowing from cold to hot, for instance) — the second law is what rules these out, by placing a directional constraint on natural processes.",
      formula: [
        { label: "Entropy change", expression: "ΔS = ∫dQ/T" },
      ],
      bullets: [
        "Kelvin–Planck statement: no process can have, as its sole result, the complete conversion of heat absorbed from a single reservoir into work — some heat must always be rejected somewhere.",
        "Clausius statement: no process can have, as its sole result, the transfer of heat from a colder body to a hotter one without external work being done — these two statements are logically equivalent.",
        "Entropy is a measure of disorder; for any process, the entropy of the universe (system + surroundings) never decreases: ΔS = 0 for a reversible process, ΔS > 0 for an irreversible one, and ΔS < 0 is never observed.",
        "A reversible process is one that can be undone leaving no trace on the surroundings — it must proceed quasi-statically (through a continuous sequence of equilibrium states) with no friction or dissipative losses anywhere; this is an ideal limit, never achieved exactly in practice.",
        "Irreversible processes are the rule in nature, not the exception: examples include unbalanced (sudden) gas expansion, friction, resistive (Joule) heating, gas leaking from a cylinder, diffusion, and essentially every real spontaneous process.",
      ],
    },
    {
      heading: "16. The Carnot Cycle and Carnot's Theorem",
      body:
        "The Carnot cycle is an idealised, fully reversible four-step cycle that extracts the maximum possible work from heat flowing between two fixed-temperature reservoirs — it serves as the theoretical benchmark against which every real heat engine is measured.",
      formula: [
        { label: "The four steps", expression: "Isothermal expansion (A→B) → Adiabatic expansion (B→C) → Isothermal compression (C→D) → Adiabatic compression (D→A)" },
        { label: "Efficiency of a Carnot engine", expression: "η = 1 − T₂/T₁ = 1 − Q₂/Q₁" },
      ],
      bullets: [
        "During the isothermal expansion (at source temperature T₁), the gas absorbs heat Q₁ and does work equal to that same Q₁ (since ΔU = 0 isothermally). During the isothermal compression (at sink temperature T₂), the gas rejects heat Q₂, with work done on it equal to Q₂.",
        "The two adiabatic legs (B→C expansion, D→A compression) involve no heat exchange at all — they simply carry the gas between the two temperatures T₁ and T₂, with work done purely at the expense of (or adding to) internal energy.",
        "Carnot's efficiency formula shows that 100% efficiency is only possible if the sink temperature T₂ = 0 K — physically unreachable — so even an ideal, perfectly reversible engine can never be perfectly efficient.",
        "Carnot's theorem: no engine operating between two given temperatures can be more efficient than a reversible (Carnot) engine working between the same two temperatures — this makes the Carnot engine's efficiency an absolute upper bound for every real engine, however cleverly designed.",
        "To raise a Carnot engine's efficiency, lowering the sink temperature T₂ by a given amount always helps more than raising the source temperature T₁ by the same amount, because η is more sensitive to changes in the smaller of the two temperatures appearing in the ratio T₂/T₁.",
      ],
    },
  ],
};
