import type { ChapterShortNotes } from "./kinematics-short";

export const electricChargesAndFieldsShortNotes: ChapterShortNotes = {
  chapterName: "Electric Charges & Fields",
  className: "12",
  groups: [
    {
      heading: "Charge — Basics",
      points: [
        "q = ne; e = 1.6×10⁻¹⁹ C. Charge is quantised, conserved, invariant, and always associated with mass.",
        "Positive = electron deficiency; Negative = electron excess. Charge is a scalar (adds algebraically).",
        "True test of electrification is repulsion, not attraction.",
        "Charging methods: friction (transfer), conduction (contact, sharing), induction (redistribution, no contact, no net charge change on inducing body).",
        "In induction: induced charge is opposite in sign and never greater in magnitude than the inducing charge.",
      ],
    },
    {
      heading: "Coulomb's Law",
      points: [
        "F = kq₁q₂/r²; k = 1/(4πε₀) ≈ 9×10⁹ N·m²/C².",
        "Vector form: F⃗₁₂ = (kq₁q₂/r²) r̂₂₁. Superposition: F⃗ = ΣF⃗ᵢ (two-body interactions add vectorially).",
        "Conservative force; stronger than gravity; can attract or repel (gravity only attracts); depends on the medium (gravity doesn't).",
        "Equilibrium of charges is never stable under electrostatic forces alone.",
      ],
    },
    {
      heading: "Charge Equilibrium Configurations",
      points: [
        "3 collinear charges: outer two same sign, middle one opposite sign.",
        "Equilateral triangle (charge q at each vertex): centre charge for equilibrium = −q/√3.",
        "Square (charge q at each vertex): centre charge for equilibrium = −q(2√2+1)/4.",
        "Suspended charges: tanθ = F_electric/mg, where θ is the angle the thread makes with the vertical.",
      ],
    },
    {
      heading: "Electric Field",
      points: [
        "E⃗ = F⃗/q₀ (test charge, q₀→0). E = kq/r²; unit N/C; vector quantity.",
        "Points away from +q, toward −q. Obeys superposition.",
        "Force on a charge: F⃗ = qE⃗ — along E⃗ for +q, opposite for −q.",
        "Continuous distributions: E = ∫kλdl/r² (linear), ∫kσdA/r² (surface), ∫kρdV/r² (volume).",
      ],
    },
    {
      heading: "Charged Ring",
      points: [
        "On axis at distance x: E = kQx/(R²+x²)^(3/2).",
        "At centre (x=0): E = 0 (symmetry cancellation).",
        "Far away (x≫R): E → kQ/x² (behaves like a point charge).",
        "Charged arc (angle 2α): E₀ = 2kλ sinα/R.",
      ],
    },
    {
      heading: "Field Lines & Flux",
      points: [
        "Field lines: start on +, end on −; never cross; never form closed loops; perpendicular to conductor surface.",
        "Φ = ∫E⃗·dA⃗; scalar; unit N·m²/C or V·m.",
        "Φ = 0 if: no charge enclosed, equal +/− charge enclosed (e.g. a dipole), or incoming flux = outgoing flux.",
        "Φ = 0 does NOT mean E = 0 on the surface; but E = 0 everywhere does mean Φ = 0.",
      ],
    },
    {
      heading: "Gauss's Law",
      points: [
        "∮E⃗·dA⃗ = q_enc/ε₀ — depends only on enclosed charge, not on surface shape/size or exact charge position inside.",
        "Field at the Gaussian surface is due to ALL charges (inside + outside), even though flux depends only on enclosed charge.",
        "Symmetric solid, charge q at centre, n identical faces: flux per face = q/(nε₀) (e.g. hemisphere split through centre: q/(2ε₀) each half).",
        "Charge in the plane of one face (hemisphere/cylinder/cube standing on that plane): flux through rest of solid = q/(2ε₀).",
        "Charge at a cube's corner: total flux through whole cube = q/(8ε₀) (8 cubes share a corner). On an edge: q/(4ε₀) (4 cubes share an edge).",
        "Isolated charged conductor surface: E = σ/ε₀ (all flux pushed outward through one side).",
      ],
    },
    {
      heading: "Conducting & Non-Conducting Sphere Fields",
      points: [
        "Conducting sphere/shell: E_in = 0 (r<R); E_surface = kQ/R²; E_out = kQ/r² (r>R) — acts like a point charge outside.",
        "Non-conducting uniform sphere: E_in = kQr/R³ = ρr/3ε₀ (grows linearly, r<R); same surface and outside formulas as conductor.",
        "No discontinuity at r=R for either case — inside and surface formulas match exactly at r=R.",
      ],
    },
    {
      heading: "Infinite Line & Sheet",
      points: [
        "Infinite line charge: E = λ/(2πε₀r) = 2kλ/r — falls off as 1/r, field is radial.",
        "Infinite plane sheet: E = σ/(2ε₀) — uniform, independent of distance from the sheet.",
        "Conductor surface (σ): E = σ/ε₀ — exactly twice the isolated-sheet value, since all flux exits one side only.",
      ],
    },
    {
      heading: "Electric Dipole",
      points: [
        "p⃗ = qd⃗, directed from −q to +q. Unit: C·m.",
        "Uniform field: F_net = 0, but τ = p⃗×E⃗ = pE sinθ (max at θ=90°, zero at θ=0° or 180°).",
        "Work rotating θ₁→θ₂: W = pE(cosθ₁−cosθ₂). U = −p⃗·E⃗ = −pEcosθ (zero reference at θ=90°).",
        "U minimum (−pE, most stable) at θ=0°; U maximum (+pE, least stable) at θ=180°. W(0°→180°) = 2pE.",
      ],
    },
    {
      heading: "Field Due to a Dipole",
      points: [
        "Axial (r≫d): E = 2kp/r³, along p⃗.",
        "Equatorial (r≫d): E = kp/r³, opposite to p⃗. Axial field = 2 × equatorial field at same r.",
        "Both fall off as 1/r³ — faster than a point charge's 1/r², since the dipole is net-neutral.",
        "General point: E = (kp/r³)√(1+3cos²θ); tanα = ½tanθ (α = angle of E from line OP, ≠ θ in general).",
        "Non-uniform field: dipole feels both a net force, F = p(dE/dr), and a torque.",
      ],
    },
    {
      heading: "Charged Particle in a Uniform Field",
      points: [
        "Trajectory: y = (qE/2mv²)x² — a parabola, exactly analogous to projectile motion (qE/m plays the role of g).",
        "Velocity along original direction (v) stays constant; field-direction velocity builds up over time.",
        "Time to cross field region of length l: T = l/v. Total deflection: y = ½(qE/m)(l/v)².",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Field inside a conductor is always zero; field inside a uniformly charged non-conducting sphere is NOT zero — it grows linearly with r.",
        "Φ=0 across a closed surface doesn't mean no charge is present anywhere nearby — only that net enclosed charge is zero (e.g. an enclosed dipole).",
        "Don't confuse the isolated-sheet field (σ/2ε₀) with the conductor-surface field (σ/ε₀) — easy to drop the factor of 2 either way.",
        "Axial dipole field is twice the equatorial field at equal distance — a frequently tested ratio, easy to misremember as equal or inverted.",
        "Coulomb's law gives a force; treating extended charged spheres as point charges is valid only for points outside the sphere, never for points inside.",
        "A dipole in a uniform field has zero net force but a non-zero torque (unless aligned/anti-aligned) — don't assume zero force means zero effect.",
      ],
    },
  ],
};
