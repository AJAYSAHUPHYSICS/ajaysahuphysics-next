import type { ChapterNotes } from "./kinematics";

export const electricChargesAndFieldsNotes: ChapterNotes = {
  chapterName: "Electric Charges & Fields",
  className: "12",
  intro:
    "Electromagnetism opens with the simplest possible question: what happens when two charged objects are near each other? The answer — Coulomb's law — looks almost identical to Newton's law of gravitation, but it sets up an entirely new idea: a charge doesn't just pull or push on other charges directly, it fills the space around it with a field. Once that field exists, everything else in this chapter — field lines, flux, Gauss's law, dipoles — is really just different ways of describing and calculating that field. This chapter is foundational for nearly every electricity and magnetism topic that follows.",
  sections: [
    {
      heading: "1. Electric Charge — Basic Properties",
      body:
        "Charge is the property of matter that makes it produce and respond to electric (and magnetic) effects. A body's net charge comes purely from an imbalance between its protons and electrons.",
      bullets: [
        "Positive charge = deficiency of electrons relative to protons. Negative charge = excess of electrons relative to protons.",
        "SI unit: coulomb (C); dimension [AT]. Practical units: ampere-hour (3600 C) and faraday (96500 C).",
        "Charge is a scalar — it adds algebraically, not vectorially.",
        "Charge is always associated with mass — charge cannot exist without mass, though mass can exist without charge.",
        "Charge is transferable between bodies in contact, and is invariant — a charge's value doesn't change with the frame of reference or its speed, unlike its mass (which increases relativistically).",
      ],
    },
    {
      heading: "2. Quantisation and Conservation of Charge",
      body:
        "Two of the deepest facts about charge — that it comes in fixed packets, and that it can never simply appear or vanish — make most circuit and particle-physics bookkeeping possible.",
      formula: [{ label: "Quantisation", expression: "q = ne,  n = ±1, ±2, …" }],
      bullets: [
        "e = 1.6 × 10⁻¹⁹ C is the smallest free charge found in nature — every observable charge is an integer multiple of e.",
        "Charge on a proton = +e; charge on an electron = −e.",
        "Conservation of charge: in an isolated system, the total charge stays constant — individual charges may move or change, but the sum never does. This holds in every chemical and nuclear process observed so far.",
        "The true test of electrification is repulsion, not attraction — attraction can happen even between a charged body and a neutral one, so only repulsion confirms both bodies are actually charged (and of the same sign).",
      ],
    },
    {
      heading: "3. Methods of Charging",
      body:
        "A neutral body can pick up a net charge in exactly three distinct ways, each transferring (or just redistributing) electrons differently.",
      bullets: [
        "Friction: rubbing two different materials transfers electrons from one to the other, leaving each with an equal and opposite charge.",
        "Conduction: direct contact between a charged and an uncharged conductor lets electrons flow until the charge is shared between them.",
        "Induction: bringing a charged body near a neutral one (without contact) redistributes the neutral body's own charges — the near side gets the opposite charge, the far side gets the same charge as the inducing body.",
        "In induction, the charging body itself neither gains nor loses charge; the induced charge is always opposite in sign to the inducing charge, and its magnitude is never greater than the inducing charge.",
      ],
    },
    {
      heading: "4. Coulomb's Law",
      body:
        "The force between two point charges at rest is the foundational quantitative law of electrostatics — strikingly similar in form to Newton's gravitation, but with a force that can attract or repel.",
      formula: [
        { label: "Coulomb's law", expression: "F = kq₁q₂/r²,   k = 1/(4πε₀) ≈ 9 × 10⁹ N·m²/C²" },
      ],
      bullets: [
        "Force is directed along the line joining the two charges — attractive for unlike charges, repulsive for like charges.",
        "Compared to gravity: electric force is vastly stronger (so gravity is ignored whenever both act between charged particles), can be attractive or repulsive (gravity is always attractive), and depends on the medium between the charges (gravity does not).",
        "Coulomb's law is conservative — work done moving a charge around any closed path under this force alone is zero.",
        "Strictly valid only for point charges; for extended spherical charge distributions, the whole charge can be treated as concentrated at the centre, but only for points outside the sphere.",
      ],
    },
    {
      heading: "5. Coulomb's Law in Vector Form and Superposition",
      body:
        "Writing the force as a vector pins down its direction precisely, and the superposition principle is what makes it possible to handle more than two charges at all.",
      formula: [
        { label: "Vector form (force on q₁ due to q₂)", expression: "F⃗₁₂ = (kq₁q₂/r²) r̂₂₁" },
        { label: "Superposition (net force on charge 0)", expression: "F⃗ = Σᵢ k q₀qᵢ/rᵢ² r̂ᵢ" },
      ],
      bullets: [
        "Coulomb's force is a strictly two-body interaction — the force between any pair of charges is completely unaffected by the presence of other charges nearby.",
        "Net force on any one charge in a group is simply the vector sum of the individual pairwise forces on it — this is the principle of superposition.",
        "The medium between two specific charges affects the force between just that pair, even though other charges and dielectrics elsewhere may change the overall field.",
      ],
    },
    {
      heading: "6. Equilibrium of Charged Particles",
      body:
        "A handful of standard configurations — three collinear charges, charges on a symmetric polygon, and a charge suspended by a thread — recur constantly in numerical problems and are worth recognising on sight.",
      bullets: [
        "A charged particle's equilibrium under electrostatic forces alone can never be stable — Coulomb's law alone cannot trap a charge in a stable potential well.",
        "Three collinear charges in equilibrium: the two outer charges must have the same sign, and the middle (third) charge must have the opposite sign; its position and magnitude are fixed by the ratio of the two outer charges.",
        "For equal charges q at the corners of an equilateral triangle, a charge Q = −q/√3 at the centroid keeps the system in equilibrium; for equal charges at the corners of a square, the centre charge needed is Q = −q(2√2+1)/4.",
        "Suspended-charge problems (two identical charges hung from threads, repelling each other to some equilibrium angle) are solved by balancing tanθ = Coulomb force/weight along the thread.",
      ],
    },
    {
      heading: "7. Electric Field — Definition and Properties",
      body:
        "Rather than thinking of charges exerting force directly on each other across empty space, it's more powerful to say a charge sets up a field everywhere around it, and that field then pushes on any other charge placed in it.",
      formula: [
        { label: "Field due to a point charge", expression: "E⃗ = kq/r² r̂ = (kq/r³) r⃗" },
        { label: "Force on a test charge", expression: "F⃗ = qE⃗" },
      ],
      bullets: [
        "E⃗ is a vector; SI unit N/C; points away from a positive charge, toward a negative charge.",
        "A 'test charge' is an idealised, vanishingly small positive charge that probes the field without itself disturbing it.",
        "Force on a positive charge is along E⃗; on a negative charge it's opposite to E⃗.",
        "Electric field obeys superposition exactly like force does — net field is the vector sum of fields due to each source charge individually.",
      ],
    },
    {
      heading: "8. Electric Field due to Discrete and Continuous Charge Distributions",
      body:
        "For a handful of point charges, just add up the individual field vectors. For a continuous distribution, the same idea applies to infinitesimal charge elements, turning the sum into an integral.",
      formula: [
        { label: "Linear charge distribution", expression: "E = ∫ kλ dl /r²  (λ = charge per unit length)" },
        { label: "Surface charge distribution", expression: "E = ∫ kσ dA /r²  (σ = charge per unit area)" },
        { label: "Volume charge distribution", expression: "E = ∫ kρ dV /r²  (ρ = charge per unit volume)" },
      ],
      bullets: [
        "Each tiny element dq is treated as a point charge contributing dE = k dq/r², and the contributions are then added vectorially (often exploiting symmetry to cancel components).",
      ],
    },
    {
      heading: "9. Electric Field due to a Uniformly Charged Ring",
      body:
        "The charged ring is a classic symmetry problem: at the centre, every element is cancelled by its diametrically opposite twin, but on the axis the perpendicular components survive and add.",
      formula: [
        { label: "On the axis at distance x", expression: "E = kQx/(R² + x²)^(3/2)" },
      ],
      bullets: [
        "At the centre of the ring (x = 0): E = 0, by symmetry.",
        "Far from the ring (x ≫ R), E → kQ/x² — the ring behaves just like a point charge at large distances.",
        "For a charged arc subtending angle 2α at the centre, E₀ = 2kλ sinα/R, where λ = Q/(arc length).",
      ],
    },
    {
      heading: "10. Electric Field Lines",
      body:
        "Field lines are a visual shorthand for the field — imaginary curves whose tangent at every point gives the field direction there, and whose density gives the field's strength.",
      bullets: [
        "Field lines start on positive charges and end on negative charges (or run off to infinity).",
        "Field lines never cross — a crossing point would mean the field has two directions there, which is impossible.",
        "Field lines never form closed loops in electrostatics.",
        "Crowded lines mean a strong field; widely spaced lines mean a weak field; no field lines at all means no field.",
        "Field lines meet a conductor's surface exactly perpendicular to it.",
      ],
    },
    {
      heading: "11. Electric Flux",
      body:
        "Electric flux quantifies how many field lines pass through a given surface — it converts the qualitative picture of field lines into a precise, calculable scalar.",
      formula: [{ label: "Flux through a surface", expression: "Φ = ∫ E⃗·dA⃗" }],
      bullets: [
        "Flux is a scalar; SI unit V·m or N·m²/C; dimension [ML³T⁻³A⁻¹].",
        "For a closed surface, outgoing flux is taken positive and incoming flux negative; dA⃗ always points outward by convention.",
        "Flux through a closed surface is zero whenever: no net charge is enclosed, equal positive and negative charge are enclosed (including any enclosed dipole), or all incoming flux is exactly cancelled by outgoing flux.",
      ],
    },
    {
      heading: "12. Gauss's Theorem",
      body:
        "Gauss's law connects the flux through any closed surface directly to the charge it encloses — a relationship so powerful that it turns several hard field-calculation problems into a few lines of algebra, provided the right symmetry is exploited.",
      formula: [{ label: "Gauss's law", expression: "∮ E⃗·dA⃗ = q_enclosed/ε₀" }],
      bullets: [
        "Valid for any closed surface (a 'Gaussian surface') and any charge distribution, but only practically useful for calculating E when the distribution has enough symmetry to make E constant (and either parallel or perpendicular) over each part of a well-chosen surface.",
        "Flux through a closed surface depends only on the enclosed charge — not on the surface's shape or size, and not on exactly where the charge sits inside it.",
        "The field at the Gaussian surface itself is due to all charges, inside and outside — Gauss's law constrains the flux, not the field at any single point, except in symmetric cases.",
      ],
    },
    {
      heading: "13. Key Properties and Special Cases of Gaussian Surfaces",
      body:
        "A few recurring facts about flux make Gauss's-law-based reasoning much faster, especially for symmetric solids with a point charge at the centre.",
      bullets: [
        "Φ = 0 does not imply E = 0 anywhere on the surface — but E = 0 everywhere on a surface does imply Φ = 0 on it.",
        "A point charge q at the centre of a symmetric solid with n identical faces gives flux q/(nε₀) through each face — e.g., q/(2ε₀) through each half of a sphere split by a plane through the centre.",
        "If a point charge q lies exactly in the plane of one face of a solid (hemisphere, cylinder, or cube standing on that plane, charge at the centre of that face), the flux through the rest of the solid is q/(2ε₀) — half the charge's total flux escapes to that side.",
        "If the charge sits at a corner of a cube, the total flux through that whole cube is q/(8ε₀) (8 cubes meet at a shared corner); if it sits on an edge, the total flux through the cube is q/(4ε₀) (4 cubes share an edge).",
        "For an isolated, infinite charged conducting sheet (field only on the outward side, none inside the conductor), Gauss's law with a pillbox surface gives E = σ/ε₀ just outside the surface — twice the field of a non-conducting sheet with the same σ, because all the flux is forced out through one side only.",
      ],
    },
    {
      heading: "14. Electric Field due to a Charged Conducting Sphere or Shell",
      body:
        "Because all the charge on a conductor sits on its outer surface, a charged conducting sphere produces a field structure with a sharp, clean boundary: nothing inside, a point-charge-like field outside.",
      formula: [
        { label: "Outside (r > R)", expression: "E = kQ/r²" },
        { label: "On the surface (r = R)", expression: "E = kQ/R²" },
        { label: "Inside (r < R)", expression: "E = 0" },
      ],
      bullets: [
        "Inside the conductor, the Gaussian surface encloses zero net charge, so the field is exactly zero — regardless of how the sphere itself is charged or where the charge is on its surface.",
        "Outside, the sphere behaves exactly like a point charge Q located at its centre.",
      ],
    },
    {
      heading: "15. Electric Field due to a Uniformly Charged Non-Conducting Sphere",
      body:
        "A solid insulating sphere with charge spread uniformly through its volume behaves differently inside: since charge is present throughout, the enclosed charge — and hence the field — grows steadily as you move outward from the centre.",
      formula: [
        { label: "Outside (r > R)", expression: "E = kQ/r²" },
        { label: "On the surface (r = R)", expression: "E = kQ/R²" },
        { label: "Inside (r < R)", expression: "E = kQr/R³ = ρr/3ε₀" },
      ],
      bullets: [
        "Inside, E grows linearly with r (E ∝ r) and reaches the same value as the surface field exactly at r = R — there's no discontinuity at the boundary.",
        "Outside, it's identical to the conducting-sphere case: behaves exactly like a point charge Q at the centre.",
      ],
    },
    {
      heading: "16. Electric Field due to an Infinite Line Charge and an Infinite Charged Sheet",
      body:
        "Two more symmetric, frequently tested Gauss's-law applications: an infinitely long uniformly charged wire, and an infinite uniformly charged plane sheet.",
      formula: [
        { label: "Infinite line charge (linear density λ)", expression: "E = λ/(2πε₀r) = 2kλ/r" },
        { label: "Infinite plane sheet (surface density σ)", expression: "E = σ/(2ε₀)" },
      ],
      bullets: [
        "Line charge: use a coaxial cylindrical Gaussian surface — flux only emerges through the curved part (the flat end-caps are parallel to E, contributing nothing); field is radial and falls off as 1/r, not 1/r² like a point charge.",
        "Plane sheet: use a 'pillbox' Gaussian surface straddling the sheet — flux emerges equally through both flat faces, giving E = σ/(2ε₀) on each side, independent of distance from the sheet.",
        "Field due to an infinite sheet is uniform everywhere (doesn't fall off with distance) — unlike a point charge or finite line/sheet, where the field weakens further away.",
      ],
    },
    {
      heading: "17. Electric Dipole — Dipole Moment",
      body:
        "A pair of equal and opposite charges separated by a small distance behaves, from far away, like a single new kind of source — this combination is the electric dipole, and many molecules behave exactly this way even though they're overall neutral.",
      formula: [{ label: "Dipole moment", expression: "p⃗ = qd⃗ (directed from −q to +q)" }],
      bullets: [
        "SI unit: coulomb-metre (C·m); dimension [LTA].",
        "A polar molecule has a permanent dipole moment because its positive and negative charge centres don't coincide; a non-polar molecule (or atom) can still acquire an induced dipole moment when placed in an external field.",
      ],
    },
    {
      heading: "18. Dipole in a Uniform Electric Field — Torque, Work, and Potential Energy",
      body:
        "Drop a dipole into a uniform field and something interesting happens: the net force on it is exactly zero (equal and opposite forces on the two charges), yet it still feels a turning effect, because those two equal-and-opposite forces don't act along the same line.",
      formula: [
        { label: "Net force", expression: "F⃗_net = 0  (uniform field)" },
        { label: "Torque", expression: "τ⃗ = p⃗ × E⃗,  magnitude τ = pE sinθ" },
        { label: "Work done rotating from θ₁ to θ₂", expression: "W = pE(cosθ₁ − cosθ₂)" },
        { label: "Potential energy (θ measured from E⃗)", expression: "U = −p⃗·E⃗ = −pE cosθ" },
      ],
      bullets: [
        "Torque is maximum (= pE) when the dipole is perpendicular to the field (θ = 90°), and zero when aligned (θ = 0°) or anti-aligned (θ = 180°).",
        "U is taken as zero at θ = 90° by convention; it is minimum (most stable, U = −pE) when the dipole is aligned with the field, and maximum (least stable, U = +pE) when anti-aligned.",
        "Rotating a dipole from aligned (0°) all the way to anti-aligned (180°) against the field requires work W = 2pE — the maximum possible for this system.",
      ],
    },
    {
      heading: "19. Electric Field due to a Dipole",
      body:
        "Far from a dipole, its field falls off faster than a single point charge's — the +q and −q fields almost cancel, and only the leftover 'imbalance' from their slight separation survives at large distances.",
      formula: [
        { label: "On the axis (r ≫ d)", expression: "E_axial = 2kp/r³  (direction along p⃗)" },
        { label: "On the equatorial line (r ≫ d)", expression: "E_equatorial = kp/r³  (direction opposite to p⃗)" },
        { label: "At a general point, angle θ from the axis", expression: "E = (kp/r³)√(1 + 3cos²θ),  tanα = ½tanθ" },
      ],
      bullets: [
        "Both axial and equatorial fields fall off as 1/r³ — much faster than the 1/r² field of an isolated point charge, since the dipole is overall neutral.",
        "The axial field is exactly twice the equatorial field at the same distance r, for the same dipole.",
        "α (in the general-point formula) is the angle the resultant field makes with the line joining the dipole to the point — it does not, in general, equal θ.",
      ],
    },
    {
      heading: "20. Force on a Dipole in a Non-Uniform Electric Field",
      body:
        "Unlike in a uniform field, a dipole placed in a non-uniform field does feel a net force — because the field strength (and hence the force) is slightly different at the +q end compared to the −q end.",
      formula: [{ label: "Force on a dipole aligned with the field", expression: "F = p (dE/dr)" }],
      bullets: [
        "The interaction energy of a dipole at a point in a field is U = −p⃗·E⃗, and the force follows from how this energy changes with position, F = −dU/dr.",
        "A dipole in a non-uniform field generally experiences both a net force (pulling it toward the stronger field region, if aligned) and a torque (trying to align it with the local field direction).",
      ],
    },
    {
      heading: "21. Motion of a Charged Particle in a Uniform Electric Field",
      body:
        "A charged particle entering a uniform electric field region perpendicular to it traces a path that's mathematically identical to projectile motion under gravity — only here, the 'gravity' is the electric force qE, and it can be switched on, off, or scaled at will.",
      formula: [
        { label: "Trajectory equation", expression: "y = (qE/2mv²) x²  (a parabola)" },
        { label: "Time to cross field region of length l", expression: "T = l/v" },
        { label: "Total deflection on exiting the field", expression: "y = ½(qE/m)(l/v)²" },
      ],
      bullets: [
        "Velocity component along the original direction of motion (v) stays constant throughout — exactly like the horizontal velocity in projectile motion.",
        "The deflecting acceleration a = qE/m acts only in the direction of the field, building up a perpendicular velocity component over time, just as gravity builds up vertical velocity in projectile motion.",
        "This is the working principle behind devices like the cathode-ray oscilloscope and the deflection of charged particles (e.g., in Millikan's oil-drop-style setups) by a known field.",
      ],
    },
  ],
};
