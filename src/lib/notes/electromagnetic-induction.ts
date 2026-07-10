import type { ChapterNotes } from "./kinematics";

export const electromagneticInductionNotes: ChapterNotes = {
  chapterName: "Electromagnetic Induction",
  className: "12",
  intro:
    "Moving Charges & Magnetism showed that a current produces a magnetic field. This chapter turns that relationship around: a CHANGING magnetic field produces a current. Oersted's discovery made motors possible; Faraday's discovery — that a changing flux induces an EMF — is what makes generators, transformers, and induction cooktops possible. Everything here follows from one experimental fact, formalised as Faraday's law, with Lenz's law fixing the direction so that energy is never created for free.",
  sections: [
    {
      heading: "1. Magnetic Flux",
      body:
        "Magnetic flux is the 'amount' of magnetic field passing through a surface — exactly analogous to electric flux, but for B instead of E. It is the central bookkeeping quantity of this entire chapter: every induction effect is ultimately a statement about how flux changes with time.",
      formula: [
        { label: "Magnetic flux through a flat surface", expression: "Φ = B·A = BA cosθ" },
        { label: "General flux through a surface", expression: "Φ = ∫B·dA" },
      ],
      bullets: [
        "θ is the angle between B and the outward normal to the surface — flux is maximum when the field is perpendicular to the surface (θ = 0°) and zero when the field lies in the plane of the surface (θ = 90°).",
        "SI unit of flux is the weber (Wb); 1 Wb = 1 T·m². Flux is a scalar quantity, even though B and A are each associated with a direction.",
        "For N identical turns of a coil, the flux LINKAGE is NΦ — this is the quantity that actually appears in Faraday's law for a coil, not the flux through a single turn.",
        "Flux through a closed surface due to a magnetic field is always exactly zero (Gauss's law for magnetism) — a direct consequence of magnetic field lines always forming closed loops with no beginning or end, unlike electric field lines which start and end on charges.",
      ],
    },
    {
      heading: "2. Faraday's Laws of Electromagnetic Induction",
      body:
        "Faraday's experiments (moving a magnet in and out of a coil, moving one current-carrying coil near another) all led to the same conclusion: whenever the magnetic flux linked with a circuit changes, an EMF is induced in it, and this EMF lasts only as long as the flux keeps changing.",
      formula: [
        { label: "Faraday's law (single turn)", expression: "ε = −dΦ/dt" },
        { label: "Faraday's law (N turns)", expression: "ε = −N (dΦ/dt)" },
      ],
      bullets: [
        "The induced EMF depends only on the RATE of change of flux, never on the flux's own magnitude — a huge, constant flux through a stationary loop induces exactly zero EMF.",
        "It does not matter WHY the flux is changing — a moving magnet, a changing current in a nearby coil, a coil rotating in a fixed field, or a coil physically changing shape or area — Faraday's law applies identically in every case.",
        "The negative sign is not a minor detail — it is Lenz's law built directly into the equation, and dropping it in a calculation gives no wrong magnitude, only a wrong direction for the induced current.",
        "An induced EMF drives an induced CURRENT only if the circuit is closed; an open circuit still develops an induced EMF (measurable as a potential difference across the break), it just cannot sustain a current.",
      ],
    },
    {
      heading: "3. Lenz's Law and Conservation of Energy",
      body:
        "Lenz's law states that the induced current always flows in the direction that OPPOSES the change in flux that produced it. This is not an independent law — it is a restatement of the conservation of energy, applied to induction.",
      bullets: [
        "If flux is increasing, the induced current creates its own magnetic field opposing that increase (opposing the cause); if flux is decreasing, the induced current tries to maintain it.",
        "Pulling a magnet toward a coil always requires doing work AGAINST a repulsive induced force; pushing it away always requires work against an attractive induced force — in every case, mechanical work done is what supplies the electrical energy delivered by the induced current. Getting energy 'for free' from induction would violate energy conservation, which is precisely what the negative sign in Faraday's law prevents.",
        "Common mistake: students sometimes state Lenz's law as 'the induced current opposes the magnetic field' — it is more precise to say it opposes the CHANGE in flux, since the induced field can point the same way as the external field if that flux is decreasing.",
        "Lenz's law can be used directly, without any calculation, to find the DIRECTION of an induced current in most conceptual (non-numerical) exam questions — a very common shortcut.",
      ],
    },
    {
      heading: "4. Motional EMF — the Rod on Rails",
      body:
        "A very common and exam-favourite setup: a straight conducting rod slides along two parallel rails, all sitting in a uniform magnetic field. As the rod moves, the area of the circuit changes, so the flux changes, and an EMF is induced — this is called motional EMF.",
      formula: [
        { label: "Motional EMF (v, B, l mutually perpendicular)", expression: "ε = Bvl" },
        { label: "Induced current (rails of resistance R)", expression: "I = Bvl / R" },
        { label: "Retarding force on the rod", expression: "F = BIl = B²l²v / R" },
      ],
      bullets: [
        "This is simply Faraday's law in disguise: as the rod moves a distance v·dt in time dt, the enclosed area changes by l·v·dt, so dΦ/dt = Blv.",
        "By Lenz's law, the induced current always creates a force on the rod that OPPOSES its motion — this is why pushing the rod requires continuous work, exactly equal to the electrical energy being generated (and eventually dissipated as heat in the circuit's resistance).",
        "If an external force keeps the rod moving at constant velocity, that force must exactly balance the retarding magnetic force B²l²v/R at every instant.",
        "This setup is the simplest working model of an electric generator — mechanical motion converted directly into electrical energy via induction.",
      ],
    },
    {
      heading: "5. Motional EMF from the Force on Free Charges",
      body:
        "Motional EMF can also be derived from a completely different starting point — not Faraday's law at all, but the direct magnetic force on the free charges inside the moving rod. Both routes give the identical answer, which is a useful cross-check.",
      formula: [
        { label: "Force per unit charge inside the moving rod", expression: "F/q = v × B" },
        { label: "EMF as work done per unit charge along the rod", expression: "ε = ∫(v × B)·dl = Bvl" },
      ],
      bullets: [
        "As the rod moves, free electrons inside it experience a magnetic force qv×B, which pushes them toward one end — this charge separation continues until the resulting electric field exactly balances the magnetic force, at equilibrium.",
        "This microscopic picture explains WHY motional EMF exists physically (it is a direct consequence of the Lorentz force), while Faraday's law explains it macroscopically as a flux-change effect — both are correct and consistent descriptions of the same phenomenon.",
        "This is the same v×B force used throughout Moving Charges & Magnetism — motional EMF is not new physics, just a new context for the Lorentz force.",
      ],
    },
    {
      heading: "6. EMF Induced in a Rotating Rod",
      body:
        "A rod rotating about one end (rather than sliding in a straight line) is a slightly harder version of motional EMF: every point along the rod moves at a different speed, so the simple ε = Bvl formula must be integrated rather than applied directly.",
      formula: [
        { label: "EMF of a rod rotating about one end", expression: "ε = ½Bωl²" },
      ],
      bullets: [
        "Each element at distance r from the pivot moves with speed ωr, so it contributes a tiny EMF dε = B(ωr)dr; integrating this from 0 to l gives the ½ factor.",
        "This result is a direct preview of the AC generator later in this chapter — a full rotating coil is just many such rod-elements combined, integrated over a full loop rather than a single straight rod.",
      ],
    },
    {
      heading: "7. Eddy Currents",
      body:
        "Faraday's law does not require a neat, thin wire loop — any bulk piece of conductor moving through (or sitting in a changing) magnetic field develops swirling, closed loops of induced current inside its volume. These are called eddy currents.",
      bullets: [
        "Eddy currents always oppose the motion or the change causing them (Lenz's law again), which is why a metal plate swinging into a strong magnetic field feels a strong braking force — this is used deliberately in electromagnetic braking systems on trains and roller coasters.",
        "Useful applications: induction furnaces (eddy currents heat a metal sample directly, without contact), induction cooktops, magnetic braking, and speedometers in older vehicles.",
        "Unwanted applications: eddy currents in a transformer's iron core cause wasted heating (a form of energy loss) — this is minimised by using a LAMINATED core (thin, electrically insulated sheets) instead of a solid block, which breaks up the large-area loops the eddy currents would otherwise follow.",
        "Common mistake: eddy currents are NOT a separate physical phenomenon from ordinary induced current — the name simply describes induced current flowing in loops through a bulk conductor rather than around a designed wire circuit.",
      ],
    },
    {
      heading: "8. Self-Inductance",
      body:
        "When current flows through a coil, it creates its own magnetic flux through itself. If that current changes, the coil's own flux changes too, and by Faraday's law, the coil induces an EMF in ITSELF, opposing the change. This property is called self-inductance.",
      formula: [
        { label: "Definition of self-inductance", expression: "Φ = LI" },
        { label: "Self-induced EMF", expression: "ε = −L (dI/dt)" },
      ],
      bullets: [
        "L depends only on the coil's geometry (shape, size, number of turns) and the medium (core material) — never on the current I itself, exactly as capacitance C depends only on geometry, not on charge or voltage.",
        "Self-induced EMF always opposes the CHANGE in current, not the current itself — this is why an inductor resists sudden current changes but has no effect at all on a steady, unchanging current.",
        "This 'electrical inertia' property is why inductors are used to smooth out current spikes and ripples in power supplies.",
        "SI unit of inductance is the henry (H); 1 H = 1 Wb/A = 1 V·s/A.",
      ],
    },
    {
      heading: "9. Self-Inductance of a Long Solenoid",
      body:
        "The solenoid is the standard worked example for calculating self-inductance directly from its geometry, using the uniform field inside a long solenoid derived in Moving Charges & Magnetism.",
      formula: [
        { label: "Self-inductance of a long solenoid", expression: "L = μ₀n²Al = μ₀N²A/l" },
      ],
      bullets: [
        "Derivation outline: the field inside is B = μ₀nI; the flux linkage through all N = nl turns is NΦ = (nl)(BA) = μ₀n²AlI; comparing with Φ=LI directly gives L = μ₀n²Al.",
        "Inserting a ferromagnetic core multiplies L by the core's relative permeability μᵣ, since B (and hence flux) increases by that same factor — this is exactly how large inductance values are achieved in compact devices.",
        "L grows with the SQUARE of the number of turns per unit length (n²), so doubling the turn density quadruples the inductance for the same solenoid length and area.",
      ],
    },
    {
      heading: "10. Mutual Inductance",
      body:
        "Two separate coils placed near each other are magnetically coupled — current changing in one coil induces an EMF in the other, even though they are not electrically connected. This coupling is called mutual inductance.",
      formula: [
        { label: "Definition of mutual inductance", expression: "Φ₂ = MI₁" },
        { label: "Mutually induced EMF in coil 2", expression: "ε₂ = −M (dI₁/dt)" },
      ],
      bullets: [
        "M depends on both coils' geometry AND their relative position/orientation — moving the coils apart, or misaligning their axes, reduces M.",
        "Reciprocity theorem: the mutual inductance is exactly the SAME in both directions (M₁₂ = M₂₁), regardless of which coil is driven and which is the 'receiver' — a coil pair has one single value of M describing the coupling between them.",
        "Mutual inductance is the entire operating principle of a TRANSFORMER: an alternating current in the primary coil induces an alternating EMF in the secondary coil purely through their mutual coupling, with no direct electrical connection between the two windings.",
      ],
    },
    {
      heading: "11. Mutual Inductance of Two Coaxial Solenoids",
      body:
        "The standard worked example: a short secondary coil wound directly around (or coaxially inside) a long primary solenoid, sharing the same cross-sectional area.",
      formula: [
        { label: "Mutual inductance of two coaxial solenoids", expression: "M = μ₀N₁N₂A/l" },
      ],
      bullets: [
        "The field of the primary solenoid, B₁ = μ₀n₁I₁, links through every turn of the secondary; since the secondary sits entirely inside the primary's uniform field region, all of its N₂ turns experience the same flux.",
        "Notice the structural similarity to the self-inductance formula for a solenoid — mutual inductance calculations almost always follow the same pattern: find the field from one coil, then find the flux it produces through the other coil's turns.",
      ],
    },
    {
      heading: "12. Combining Inductances in Series and Parallel",
      body:
        "When inductors are connected together (assuming no mutual coupling between them), their combined inductance follows rules that look exactly like the rules for combining resistors.",
      formula: [
        { label: "Series combination (no mutual coupling)", expression: "L(eq) = L₁ + L₂ + ⋯" },
        { label: "Parallel combination (no mutual coupling)", expression: "1/L(eq) = 1/L₁ + 1/L₂ + ⋯" },
      ],
      bullets: [
        "These simple addition rules assume the inductors are far enough apart (or oriented) that there is no mutual inductance between them — if there IS significant coupling, extra ±2M terms must be added, depending on whether the coils' fields aid or oppose each other.",
        "Inductors combine like resistors (series adds directly, parallel adds reciprocals) — the OPPOSITE pattern to how capacitors combine, a contrast worth keeping straight across chapters.",
      ],
    },
    {
      heading: "13. Energy Stored in an Inductor",
      body:
        "Establishing a current in an inductor requires doing work against the self-induced back-EMF — that work is stored as energy in the inductor's magnetic field, and can be recovered later when the current decreases.",
      formula: [
        { label: "Energy stored in a current-carrying inductor", expression: "U = ½LI²" },
      ],
      bullets: [
        "Derivation outline: at any instant, power delivered against the back-EMF is P = εI = L(dI/dt)·I; integrating this from 0 to I gives U = ½LI².",
        "Structurally identical to the energy stored in a charged capacitor, U = ½CV² — inductors store energy in their MAGNETIC field the way capacitors store it in their ELECTRIC field.",
        "This stored energy is why breaking a current-carrying inductive circuit suddenly (e.g. switching off a large electromagnet) can produce a dangerous voltage spike — the stored energy has to go somewhere very quickly, and Ldi/dt becomes very large as di/dt spikes.",
      ],
    },
    {
      heading: "14. Energy Density of the Magnetic Field",
      body:
        "Just as the electric field carries an energy density, the magnetic field created by any inductor carries energy per unit volume — the two results are structurally parallel.",
      formula: [
        { label: "Energy density of a magnetic field", expression: "u = B² / 2μ₀" },
      ],
      bullets: [
        "Derived by dividing the total stored energy U = ½LI² (for a solenoid) by its volume Al, and substituting B = μ₀nI and L = μ₀n²Al.",
        "Directly comparable to u = ½ε₀E² for the electric field — both fields store energy proportional to the SQUARE of their strength, a pattern that recurs throughout electromagnetism (and in Electromagnetic Waves, where both terms appear together).",
      ],
    },
    {
      heading: "15. Growth of Current in an LR Circuit",
      body:
        "When a battery is connected to a series combination of an inductor and resistor, the current does not jump instantly to its final value — the inductor's back-EMF opposes the sudden change, so current builds up gradually, following an exponential curve.",
      formula: [
        { label: "Current growth in an LR circuit", expression: "I(t) = I₀(1 − e^(−t/τ))" },
        { label: "Time constant", expression: "τ = L/R" },
        { label: "Final steady-state current", expression: "I₀ = ε/R" },
      ],
      bullets: [
        "Derivation outline: applying Kirchhoff's voltage law gives ε = IR + L(dI/dt); solving this first-order differential equation with I(0)=0 gives the exponential growth formula.",
        "At t = τ, the current has reached 63.2% of its final value; theoretically the current never reaches EXACTLY I₀, only approaches it asymptotically — the same mathematical shape as capacitor charging in an RC circuit.",
        "A larger L (more opposition to change) or smaller R (a larger final current to reach) both make τ larger, so the current takes longer to build up.",
      ],
    },
    {
      heading: "16. Decay of Current in an LR Circuit",
      body:
        "If the battery is removed and the LR circuit is short-circuited, the current does not vanish instantly either — the inductor now tries to MAINTAIN the existing current, releasing its stored energy gradually as the current decays.",
      formula: [
        { label: "Current decay in an LR circuit", expression: "I(t) = I₀ e^(−t/τ)" },
      ],
      bullets: [
        "At t = τ, the current has fallen to 36.8% of its initial value — mirror image of the growth case, and identical in form to RC discharge.",
        "The energy dissipated as heat in R during the entire decay exactly equals the energy that was originally stored in the inductor's magnetic field, ½LI₀² — a direct consequence of energy conservation.",
      ],
    },
    {
      heading: "17. AC Generator — Principle, Construction and Working",
      body:
        "An AC generator converts mechanical energy into electrical energy by rotating a coil inside a magnetic field (or, equivalently, rotating a magnet inside a fixed coil) — the induced EMF varies sinusoidally as the coil turns, which is exactly why household electricity is alternating current.",
      formula: [
        { label: "Instantaneous EMF of a rotating coil", expression: "ε = ε₀ sin(ωt)" },
        { label: "Peak EMF", expression: "ε₀ = NBAω" },
      ],
      bullets: [
        "Main components: a strong field magnet, an armature (the rotating coil), slip rings that maintain electrical contact with the rotating coil, and carbon brushes that connect the slip rings to the external circuit.",
        "Derivation outline: as the coil rotates at constant angular speed ω, the flux through it is Φ = BA cos(ωt); applying Faraday's law, ε = −N(dΦ/dt) = NBAω sin(ωt) — a direct, clean derivation from first principles.",
        "The EMF is maximum when the coil's plane is PARALLEL to B (rate of change of flux is greatest there) and zero when the coil's plane is PERPENDICULAR to B (flux is momentarily at its own maximum, but momentarily not changing) — a commonly tested conceptual point that trips students up if they assume EMF peaks where flux peaks.",
        "A real generator's frequency is fixed by how fast the coil is mechanically driven to rotate — in India this is standardised at 50 Hz for grid electricity.",
      ],
    },
    {
      heading: "18. Applications of Electromagnetic Induction",
      body:
        "Electromagnetic induction is not a theoretical curiosity confined to textbook coils — it underlies most of how electrical energy is generated, transformed, and used in daily life.",
      bullets: [
        "Electric generators and alternators (mechanical energy → electrical energy) at every power station, whether the turbine is driven by falling water, steam, or wind.",
        "Transformers (mutual inductance between two windings) step voltage up or down for efficient long-distance power transmission and safe household use.",
        "Induction cooktops and induction furnaces use eddy currents generated directly inside the vessel or workpiece to heat it, with no direct flame or resistive heating element.",
        "Metal detectors, magnetic braking systems, and wireless (inductive) charging pads for phones and electric toothbrushes all rely on some form of changing magnetic flux inducing a usable current or force.",
      ],
    },
  ],
};
