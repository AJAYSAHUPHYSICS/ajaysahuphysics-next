import type { ChapterNotes } from "./kinematics";

export const movingChargesAndMagnetismNotes: ChapterNotes = {
  chapterName: "Moving Charges & Magnetism",
  className: "12",
  intro:
    "This chapter is the engine room of electromagnetism for NEET and JEE — how a moving charge or a current creates a magnetic field (Biot–Savart law, Ampère's law, solenoids and toroids), and how a magnetic field pushes back on moving charges and currents in turn (circular and helical motion, the cyclotron, force on a conductor, and the current loop as a magnetic dipole). Almost every later electromagnetism chapter leans on the results derived here.",
  sections: [
    {
      heading: "1. Oersted's Experiment and the Magnetic Field",
      body:
        "Oersted's 1820 discovery that a current-carrying wire deflects a nearby compass needle was the first evidence linking electricity and magnetism — the birth of electromagnetism.",
      bullets: [
        "Reversing the current reverses the direction of deflection; increasing the current or moving the needle closer increases the deflection.",
        "A magnet at rest produces only a magnetic field; a charge at rest produces only an electric field.",
        "A steady current (or a charge moving with uniform velocity) produces a magnetic field; a charge moving with uniform velocity also has an electric field around it.",
        "An accelerated or oscillating charge radiates electromagnetic waves in addition to its electric and magnetic fields.",
      ],
      formula: [
        { label: "SI unit of magnetic field", expression: "tesla (T) = weber/m²" },
        { label: "CGS unit, conversion", expression: "1 T = 10⁴ gauss" },
        { label: "Dimensional formula", expression: "[B] = [M T⁻² A⁻¹]" },
      ],
    },
    {
      heading: "2. Biot–Savart Law",
      body:
        "The Biot–Savart law gives the magnetic field produced by a tiny current element — the magnetic analogue of Coulomb's law for a point charge.",
      formula: [
        { label: "Magnitude", expression: "dB = (μ₀/4π) · I dl sinθ / r²" },
        { label: "Vector form", expression: "dB = (μ₀/4π) (I dl × r̂)/r²" },
        { label: "Constant", expression: "μ₀/4π = 10⁻⁷ T·m/A" },
      ],
      bullets: [
        "θ is the angle between the current element (I dl) and the position vector r to the field point; dB is perpendicular to the plane containing both.",
        "The field on the axis of a straight current-carrying wire (θ = 0° or 180°) is always zero — only off-axis points have a nonzero field.",
        "Field lines never intersect; they form closed loops (unlike electric field lines, which start and end on charges).",
      ],
    },
    {
      heading: "3. Right-Hand Rules for Field Direction",
      body:
        "Two right-hand conventions cover almost every direction question in this chapter.",
      bullets: [
        "Right-hand thumb rule (straight wire): point the thumb along the current; curled fingers give the direction of the circular field lines around the wire.",
        "Right-hand thumb rule (circular wire): curl the fingers along the current; the thumb gives the direction of the field at the centre/axis.",
        "Right-hand palm rule (Fleming): for a wire in the plane of the paper, fingers point along the field and the thumb along the current, palm pushing in the direction the field acts at the point in question — useful for quickly reading off field direction at a specific point without sketching the full circular pattern.",
      ],
    },
    {
      heading: "4. Magnetic Field Due to a Straight Current-Carrying Wire",
      body:
        "Integrating the Biot–Savart law along a straight wire AB gives the field at a point P located a perpendicular distance a from the wire, in terms of the angles φ₁ and φ₂ subtended at P by the two ends.",
      formula: [
        { label: "General formula", expression: "B = (μ₀I)/(4πa) · (sinφ₁ + sinφ₂)" },
        { label: "Infinite wire (point beside it)", expression: "B = μ₀I/(2πa)" },
        { label: "Semi-infinite wire (point off one end)", expression: "B = μ₀I/(4πa)" },
      ],
      bullets: [
        "φ₁ and φ₂ are measured from the foot of the perpendicular to the two ends of the wire, on either side of P.",
        "If P lies outside the span of the wire (off to one side along its length), the two sine terms subtract instead of adding: B = (μ₀I)/(4πa)(sinφ₁ − sinφ₂) using the angles measured appropriately.",
        "Field direction is always perpendicular to the plane containing the wire and the point P, found using the right-hand thumb rule.",
      ],
    },
    {
      heading: "5. Magnetic Field at the Centre of a Circular Loop, Coil and Arc",
      body:
        "Every element of a circular loop is equidistant from the centre and perpendicular to the radius there, so the Biot–Savart contributions add up simply.",
      formula: [
        { label: "Single circular loop", expression: "B₀ = μ₀I/(2R)" },
        { label: "Coil of N turns", expression: "B₀ = μ₀NI/(2R)" },
        { label: "Arc subtending angle α (radians)", expression: "B_arc = μ₀Iα/(4πR) = (α/2π)B₀" },
      ],
      bullets: [
        "For a loop split into two arcs fed from the same two junctions and made of uniform wire, the two arcs' fields at the centre are always equal and opposite — net field is zero regardless of where the terminals are connected, because (arc length ∝ angle) and (current ∝ 1/resistance ∝ 1/length) cancel exactly.",
        "If the two arcs differ in material or thickness (unequal resistance), the currents split unevenly and the net field at the centre is nonzero, dominated by the arc carrying the larger current.",
        "Regular polygon (side a, current I) at its centre — derived by summing the finite-wire contribution of each side: equilateral triangle B = 9μ₀I/(2πa); square B = 2√2 μ₀I/(πa); regular hexagon B = √3 μ₀I/(πa).",
        "Field at the centre of any symmetric polygon made of uniform wire is zero only when there's no net current loop — for an actual current-carrying polygon, the centre field is nonzero and given by the formulas above.",
      ],
    },
    {
      heading: "6. Magnetic Field on the Axis of a Circular Coil",
      body:
        "Moving away from the centre along the coil's axis, the field falls off — slowly at first, then as an inverse-cube law far away, exactly like a magnetic dipole.",
      formula: [
        { label: "At axial distance x", expression: "B(x) = μ₀NIR²/[2(R²+x²)^(3/2)] = B₀ sin³θ" },
        { label: "At the centre (x = 0)", expression: "B₀ = μ₀NI/(2R)" },
        { label: "Far away (x ≫ R)", expression: "B ≈ μ₀NIπR²/(2πx³) = μ₀M/(2πx³)" },
      ],
      bullets: [
        "θ is the angle subtended at the axial point by the radius: sinθ = R/√(R²+x²).",
        "Close to the centre (x ≪ R): B ≈ B₀(1 − 3x²/2R²) — the field decreases quadratically at first.",
        "The B–x graph has points of inflection at x = ±R/2; the separation between these two points equals the coil's radius R.",
        "Helmholtz coils: two identical coaxial coils, same N, I, R, planes parallel, separated by a distance equal to R, carrying current in the same sense — this exploits the points of inflection to create a uniform field over a short range between the coils.",
      ],
    },
    {
      heading: "7. Ampère's Circuital Law",
      body:
        "Ampère's law is the magnetic analogue of Gauss's law — it relates the circulation of B around any closed loop to the current threading through it, and is most powerful for highly symmetric current distributions.",
      formula: [{ label: "Ampère's circuital law", expression: "∮ B·dl = μ₀ I_enclosed" }],
      bullets: [
        "Only the current passing through the area bounded by the closed path counts — current outside the loop contributes nothing to the line integral, however close it is.",
        "The law holds for any closed path, but it's only useful for actually finding B when the current distribution is infinite and symmetric enough that B is constant in magnitude along the chosen path (or zero).",
        "Anticlockwise circulation (as viewed) is taken as the positive sense for current by the right-hand rule.",
      ],
    },
    {
      heading: "8. Magnetic Field of Solid and Hollow Current-Carrying Cylinders",
      body:
        "Applying Ampère's law to circular paths of different radii inside, on, and outside a current-carrying cylinder gives a complete picture of how B varies with distance from the axis.",
      formula: [
        { label: "Solid cylinder, inside (r < R)", expression: "B = μ₀Ir/(2πR²) ∝ r" },
        { label: "Solid cylinder, surface (r = R)", expression: "B = μ₀I/(2πR) (maximum)" },
        { label: "Outside any cylinder (r > R)", expression: "B = μ₀I/(2πr) ∝ 1/r" },
        { label: "Hollow cylinder, inner a, outer b (a < r < b)", expression: "B = μ₀I(r²−a²)/[2πr(b²−a²)]" },
      ],
      bullets: [
        "On the axis of any of these conductors (r = 0), the field is always zero.",
        "Inside the hollow region of a hollow cylinder (r < a), B = 0 — no current is enclosed.",
        "Outside the cylinder, the field is exactly the same as that of a straight wire carrying the same total current — it doesn't matter whether the conductor is thin, thick, solid, or hollow.",
      ],
    },
    {
      heading: "9. Magnetic Field Due to a Solenoid",
      body:
        "A solenoid is a tightly wound helical coil; superposing the fields of all its turns gives a strong, nearly uniform field inside when the solenoid is long compared to its radius.",
      formula: [
        { label: "Infinite/long solenoid, inside", expression: "B = μ₀nI (n = turns per unit length)" },
        { label: "Finite solenoid, general axial point", expression: "B = (μ₀nI/2)(cosθ₁ − cosθ₂)" },
        { label: "At an open end of a long solenoid", expression: "B = μ₀nI/2 (half the central value)" },
      ],
      bullets: [
        "θ₁ and θ₂ are the angles subtended at the field point by the two ends of the solenoid, both measured in the same rotational sense from the axis.",
        "Well inside a long solenoid, θ₁ ≈ 0° and θ₂ ≈ 180°, recovering B ≈ μ₀nI.",
        "The field magnitude inside a solenoid does not depend on its radius of cross-section — only on turn density n and current I.",
        "Field outside the volume of the solenoid is negligible; field inside is uniform and directed along the axis (Maxwell's solenoid rule gives polarity, analogous to a bar magnet).",
      ],
    },
    {
      heading: "10. Magnetic Field Due to a Toroid",
      body:
        "A toroid is a solenoid bent into a closed ring — an 'endless solenoid' — which confines its field entirely within the doughnut-shaped core.",
      formula: [
        { label: "Field inside the core", expression: "B = μ₀nI" },
        { label: "Turn density", expression: "n = N/(2πR_m)" },
        { label: "Mean radius", expression: "R_m = (R₁ + R₂)/2" },
      ],
      bullets: [
        "R₁ and R₂ are the inner and outer radii of the toroid; N is the total number of turns.",
        "Field outside the toroid's volume is always zero, and so is the field in the empty space enclosed by the ring (at the very centre) — both regions enclose zero net current for an Amperian loop drawn there.",
        "Field inside the core is directed along the circular axis and constant in magnitude over the whole cross-section (for the idealised thin-toroid approximation).",
      ],
    },
    {
      heading: "11. Force on a Moving Charge in a Magnetic Field",
      body:
        "A magnetic field exerts a velocity-dependent sideways push on a moving charge — never along the direction of motion, which is what makes magnetic forces fundamentally different from electric ones.",
      formula: [{ label: "Magnetic (Lorentz) force", expression: "F = q(v × B), magnitude qvB sinθ" }],
      bullets: [
        "Zero force if the charge is at rest (v = 0), or if v is parallel/antiparallel to B (θ = 0° or 180°).",
        "Maximum force qvB when v ⊥ B (θ = 90°); F, v, and B are then mutually perpendicular.",
        "The force is always perpendicular to velocity, so it does zero work and never changes the particle's speed (kinetic energy) — it only ever changes the direction of motion.",
      ],
    },
    {
      heading: "12. Circular Motion of a Charged Particle in a Magnetic Field",
      body:
        "When v is exactly perpendicular to B, the magnetic force always points toward a fixed centre and supplies exactly the centripetal force needed for uniform circular motion.",
      formula: [
        { label: "Radius of circular path", expression: "r = mv/(qB) = √(2mE_k)/(qB) = √(2mqV)/(qB)" },
        { label: "Time period", expression: "T = 2πm/(qB)" },
        { label: "Angular frequency", expression: "ω = qB/m" },
        { label: "Kinetic energy in terms of r", expression: "E_k = q²B²r²/(2m)" },
      ],
      bullets: [
        "T and ω depend only on the charge-to-mass ratio and B — not on the speed or radius. This is the key fact that makes the cyclotron work.",
        "A particle accelerated through potential V before entering the field has v = √(2qV/m), which can be substituted directly into the radius formula.",
      ],
    },
    {
      heading: "13. Helical Motion and the Lorentz Force",
      body:
        "If v makes some angle θ with B instead of being exactly perpendicular, split it into a component along B (unaffected, constant) and a component perpendicular to B (which curls into a circle) — combined, the path is a helix.",
      formula: [
        { label: "Radius of the helix", expression: "r = mv sinθ/(qB)" },
        { label: "Time period (same as pure circular case)", expression: "T = 2πm/(qB)" },
        { label: "Pitch of the helix", expression: "p = (v cosθ)T = 2πmv cosθ/(qB)" },
        { label: "Lorentz force (E and B both present)", expression: "F_L = qE + q(v × B)" },
      ],
      bullets: [
        "Pitch is the distance travelled along the field direction in one complete revolution of the helix.",
        "If a charge enters a field region of finite width d (v ⊥ B), it traces a circular arc: it completes a semicircle without striking the far boundary if r < d, just grazes it if r = d, and exits before completing a semicircle if r > d, deviating by angle θ = sin⁻¹(dqB/mv) from its original direction.",
      ],
    },
    {
      heading: "14. The Cyclotron",
      body:
        "The cyclotron (Lawrence and Livingston, 1934) exploits the one clean fact about circular motion in a magnetic field — that the time for a semicircle doesn't depend on speed — to repeatedly accelerate a charged particle using a fixed-frequency alternating voltage.",
      formula: [
        { label: "Radius at speed v", expression: "r = mv/(qB)" },
        { label: "Time for one semicircle (constant)", expression: "t = πm/(qB)" },
        { label: "Resonance condition", expression: "T_oscillator = 2t ⟹ T = 2πm/(qB)" },
        { label: "Cyclotron frequency", expression: "ν = qB/(2πm)" },
        { label: "Max kinetic energy", expression: "(E_K)_max = q²B²r²_max/(2m)" },
      ],
      bullets: [
        "Two hollow 'dees' connected to a high-frequency oscillator sit inside a strong, uniform magnetic field perpendicular to their plane; the particle gains energy qV every time it crosses the gap between dees.",
        "Since the semicircle time is independent of speed, the oscillator's frequency only needs to match ν = qB/(2πm) once, and resonance is maintained automatically as the particle spirals outward.",
        "Total energy after N complete revolutions: 2NqV = q²B²r²_max/(2m), giving N = qB²r²_max/(4mV).",
        "Limitations: cannot accelerate neutral particles (no force without charge); not practical for electrons, since their small mass makes them relativistic at modest energies, breaking the resonance condition.",
      ],
    },
    {
      heading: "15. Force on a Current-Carrying Conductor",
      body:
        "A current is just charge in motion, so a current-carrying wire in a magnetic field experiences the cumulative magnetic force on all its moving charges.",
      formula: [
        { label: "Force on a current element", expression: "dF = I(dl × B)" },
        { label: "Force on a straight wire (uniform B)", expression: "F = I(L × B)" },
      ],
      bullets: [
        "Zero force when the current is parallel/antiparallel to B (θ = 0° or 180°); maximum force BIdl when current ⊥ B (θ = 90°).",
        "The force is always perpendicular to both the current element and B.",
        "For an arbitrarily shaped wire in a uniform field, the net force depends only on the vector L joining the initial and final points (the net displacement along the wire) — not on the actual path length or shape in between.",
        "A consequence: the net magnetic force on any closed current loop in a uniform field is always exactly zero, since L = 0 for a closed path — though the torque on it need not be zero.",
        "In a non-uniform field, even a closed loop can experience a nonzero net force and/or torque, since the cancellation above no longer applies.",
      ],
    },
    {
      heading: "16. Force Between Two Parallel Current-Carrying Conductors",
      body:
        "Each current-carrying wire creates a magnetic field that exerts a force on the other — this mutual interaction is what officially defines the ampere.",
      formula: [
        { label: "Force per unit length, separation d", expression: "f = μ₀I₁I₂/(2πd)" },
        { label: "Definition of the ampere", expression: "1 A: f = 2×10⁻⁷ N/m at d = 1 m, I₁ = I₂ = 1 A" },
      ],
      bullets: [
        "Currents in the same direction attract; currents in opposite directions repel — exactly the reverse of the intuition from like/unlike electric charges.",
        "Free-wire equilibrium above a fixed wire (repulsion balancing gravity) requires unlike (opposite-direction) currents and is a stable equilibrium — a small vertical displacement leads to SHM with T = 2π√(h/g).",
        "Free-wire equilibrium below a fixed wire (attraction balancing gravity) requires like (same-direction) currents and is an unstable equilibrium.",
        "For two parallel moving point charges (rather than continuous currents), the ratio of magnetic to electric force between them is F_m/F_e = v²/c² — magnetic effects are negligible unless v approaches the speed of light.",
      ],
    },
    {
      heading: "17. Current Loop as a Magnetic Dipole",
      body:
        "A current loop generates a field pattern on its axis that is mathematically identical to that of a bar magnet far away — so it's treated as a magnetic dipole with its own dipole moment.",
      formula: [
        { label: "Magnetic moment, single turn, area A", expression: "M = IA" },
        { label: "Magnetic moment, N turns", expression: "M = NIA" },
        { label: "Vector form", expression: "M = NI A (A is the area vector, ⊥ to the loop's plane)" },
      ],
      bullets: [
        "Direction of M (and of A) is found by the right-hand thumb rule: curl the fingers along the current, the thumb points along M.",
        "A face from which the current appears anticlockwise behaves like a north pole (M points out of that face); a face with clockwise current behaves like a south pole.",
        "SI unit of magnetic moment: A·m² (equivalently J/T).",
        "For a current loop, M and the axial magnetic field B it produces are always parallel axial vectors.",
      ],
    },
    {
      heading: "18. Torque on a Current Loop and the Moving Coil Galvanometer",
      body:
        "Placed in an external field, a current loop experiences zero net force (in a uniform field) but generally a nonzero torque that tries to rotate it into alignment — exactly the mechanism a galvanometer is built around.",
      formula: [
        { label: "Torque on a loop/coil", expression: "τ = M × B, magnitude τ = NIAB sinθ" },
        { label: "Galvanometer balance condition", expression: "NIAB = Cθ ⟹ I = (C/NAB)θ" },
        { label: "Current sensitivity", expression: "C.S. = θ/I = NAB/C (rad/A)" },
        { label: "Voltage sensitivity", expression: "V.S. = θ/V = NAB/(CR) (rad/V)" },
      ],
      bullets: [
        "Torque is maximum (= NIAB) when the coil's plane is parallel to B (M ⊥ B, the 'longitudinal field' case) and zero when the plane is perpendicular to B (M ∥ B, 'transverse field') — the opposite extremes of θ = 90° and θ = 0°/180°.",
        "A moving coil galvanometer uses a radial magnetic field so the coil's plane always stays parallel to B as it rotates (sinα is fixed at 90°), making the deflecting torque NIAB exactly, so deflection θ ∝ current I — a linear scale.",
        "Sensitivity can be raised by increasing N, B, or A, or by decreasing the restoring constant C of the suspension.",
        "The galvanometer's deflection is unaffected by external stray fields, because the coil sits inside the field of a strong permanent magnet; eddy currents induced in its metal frame damp the coil quickly to rest.",
        "Main drawbacks: sensitivity is fixed by construction (can't be adjusted afterward), and overcurrent can burn out the suspension/hairsprings.",
      ],
    },
    {
      heading: "19. Magnetic Dipole Moment of a Revolving Electron",
      body:
        "An electron orbiting the nucleus behaves like a tiny current loop, giving the atom a magnetic moment — this is the bridge between atomic structure and magnetism, and it's where the Bohr magneton comes from.",
      formula: [
        { label: "Equivalent orbital current", expression: "I = ef = e/T" },
        { label: "Magnetic moment of the orbit", expression: "M = IA = (e/T)(πr²) = evr/2" },
        { label: "Vector relation to angular momentum", expression: "M = −eL/(2m) (M and L antiparallel)" },
        { label: "Bohr's quantization", expression: "L = nh/(2π) ⟹ M = neh/(4πm)" },
      ],
      bullets: [
        "M and orbital angular momentum L point in opposite directions because the electron's charge is negative.",
        "For n = 1, M = eh/(4πm) ≈ 9.27 × 10⁻²⁴ A·m² — this fundamental quantity is called the Bohr magneton (μ_B).",
        "For any uniformly charged body of charge q and mass m spinning with angular velocity ω, the ratio M/L = q/(2m) is a universal constant of the body, independent of its shape — true for a ring, disc, solid sphere, or spherical shell alike, only the moment of inertia changes (e.g. ring: M = qωR²/2; disc: M = qωR²/4; solid sphere: M = qωR²/5; spherical shell: M = qωR²/3).",
      ],
    },
  ],
};
