import type { ChapterNotes } from "./kinematics";

export const gravitationNotes: ChapterNotes = {
  chapterName: "Gravitation",
  className: "11",
  intro:
    "Gravitation is the force that connects an apple falling from a tree to a planet orbiting the Sun — both are governed by the exact same law. This chapter builds from the basic force between two masses up to the motion of satellites and planets, using just one equation and the principle of energy conservation.",
  sections: [
    {
      heading: "1. Newton's Law of Gravitation",
      body:
        "Every particle of matter attracts every other particle in the universe. The force is directly proportional to the product of their masses and inversely proportional to the square of the distance between them, acting along the line joining the two particles.",
      formula: [
        { label: "Newton's law of gravitation", expression: "F = Gm₁m₂ / r²" },
        { label: "Universal gravitational constant", expression: "G = 6.67 × 10⁻¹¹ N·m²/kg²" },
      ],
      bullets: [
        "G is a universal constant — same everywhere, independent of the masses, the medium between them, or anything else. Henry Cavendish first measured its value using a torsion balance.",
        "Gravitational force is always attractive, acts as an action-reaction pair (Newton's third law), and is a central force — it acts along the line joining the two centres.",
        "It is conservative: the work done moving a mass between two points doesn't depend on the path taken, and the net work done over any closed loop is zero.",
        "This formula applies exactly only to point masses or spherically symmetric bodies. For a uniform sphere, all its mass behaves as if concentrated at the centre, for any point outside it.",
        "The force between two bodies is unaffected by the presence of a third body — forces from multiple masses simply add as vectors (principle of superposition).",
      ],
    },
    {
      heading: "2. Gravitational Field and Field Intensity",
      body:
        "A mass modifies the space around it, so that any other mass placed in that space feels a force. This region of influence is the gravitational field, and the field intensity at a point is the force experienced by a unit mass placed there.",
      formula: [
        { label: "Field intensity due to a point mass", expression: "I = GM / r²" },
        { label: "Outside a solid sphere or shell (r > R)", expression: "I = GM / r²" },
        { label: "On the surface (r = R)", expression: "I = GM / R²" },
        { label: "Inside a solid sphere (r < R)", expression: "I = GMr / R³" },
      ],
      bullets: [
        "Field intensity is a vector, pointing toward the mass creating it. Its unit is N/kg, which is dimensionally identical to acceleration (m/s²).",
        "Outside a sphere — solid or hollow — the field behaves exactly as though all the mass were a point at the centre.",
        "Inside a uniform solid sphere, only the mass enclosed within radius r contributes, so the field grows linearly with r and becomes zero exactly at the centre.",
        "Inside a hollow shell, the field is zero everywhere — the shell exerts no net gravitational force on anything inside it.",
      ],
    },
    {
      heading: "3. Acceleration Due to Gravity",
      body:
        "When one of the two attracting bodies is the Earth, the force is simply called gravity, and the acceleration it produces in a freely falling object is g. Treating Earth as a uniform sphere of mass M and radius R gives a clean surface value.",
      formula: [
        { label: "Acceleration due to gravity at the surface", expression: "g = GM / R²" },
        { label: "In terms of mean density ρ", expression: "g = (4/3)πGRρ" },
        { label: "Standard surface value", expression: "g ≈ 9.8 m/s²" },
      ],
      bullets: [
        "The measured value of g at any real location differs slightly from this ideal value for three reasons: Earth's mass isn't distributed perfectly uniformly, Earth isn't a perfect sphere, and Earth rotates.",
        "If R is treated as constant, g is proportional to M. If M is constant, g is proportional to 1/R².",
      ],
    },
    {
      heading: "4. Variation of g — Height, Depth and Rotation",
      body:
        "Moving away from Earth's surface in either direction — up into space or down into the ground — reduces the value of g. Earth's rotation adds a third, direction-dependent effect.",
      formula: [
        { label: "At height h (general)", expression: "gₕ = GM / (R + h)²" },
        { label: "At height h, when h << R", expression: "gₕ = g[1 − 2h/R]" },
        { label: "At depth d (uniform density assumed)", expression: "g_d = g[1 − d/R]" },
        { label: "Due to Earth's rotation, at latitude λ", expression: "g' = g − Rω²cos²λ" },
      ],
      bullets: [
        "With height, g falls off as 1/r² — the same inverse-square pattern as the force itself, since g = GM/r² outside the surface.",
        "With depth, g falls off linearly — g is directly proportional to the distance from the centre, becoming exactly zero at Earth's centre.",
        "g is therefore maximum at the surface and decreases on either side of it — this is one of the most commonly tested ideas in this chapter.",
        "Rotation reduces g everywhere except at the poles (where cos λ = 0, so the rotation term vanishes). The reduction is largest at the equator.",
        "Weightlessness at the equator due to rotation alone would require an angular speed ω = √(g/R) — about 17 times Earth's actual rotation rate.",
      ],
    },
    {
      heading: "5. Gravitational Potential Energy",
      body:
        "The gravitational potential energy of a two-mass system is defined as the work needed to bring one mass from infinitely far away to its current position, without giving it any extra kinetic energy. Since gravity does positive work as masses come together, this energy is taken as negative, with zero set at infinite separation.",
      formula: [
        { label: "PE of a two-particle system", expression: "U = −Gm₁m₂ / r" },
        { label: "PE of mass m on Earth's surface", expression: "U = −GMm / R" },
        { label: "Work to raise a mass by height h", expression: "W = GMmh / [R(R + h)]" },
        { label: "Same result, simplified form", expression: "W = mgh / (1 + h/R)" },
      ],
      bullets: [
        "The negative sign reflects boundedness: it takes positive external work to pull the masses apart and reduce that boundness toward zero.",
        "For a system of more than two particles, total PE is just the sum of the PE of every possible pair — no shortcuts, every pair counts separately.",
        "When h is much smaller than R, the exact raising-work formula collapses neatly to the familiar W = mgh used in everyday mechanics.",
      ],
    },
    {
      heading: "6. Gravitational Potential",
      body:
        "Gravitational potential is the gravitational PE per unit mass at a point — equivalently, the work done per unit mass in bringing it from infinity to that point. It's a scalar, which often makes it easier to work with than the vector field intensity.",
      formula: [
        { label: "Potential due to a point mass", expression: "V = −GM / r" },
        { label: "Relation between field and potential", expression: "I = −dV/dr" },
        { label: "Inside a solid sphere (r < R)", expression: "V = −(GM / 2R³)(3R² − r²)" },
        { label: "At the centre of a solid sphere", expression: "V_centre = −3GM / 2R = (3/2)V_surface" },
      ],
      bullets: [
        "Potential is taken as zero at infinity and becomes more negative closer to the mass — so potential is technically maximum (least negative) at infinity, even though that sounds backwards at first.",
        "Outside any spherical mass — solid or hollow — potential follows the same −GM/r rule as for a point mass.",
        "Inside a hollow shell, potential is constant throughout and equal to its value at the surface (−GM/R), even though the field inside is zero.",
        "Inside a solid sphere, potential is minimum (most negative) exactly at the centre, unlike the field which is zero there.",
      ],
    },
    {
      heading: "7. Escape Velocity and Escape Energy",
      body:
        "Escape velocity is the minimum speed needed at a planet's surface for an object to break free of its gravity entirely and never fall back, assuming no other forces act on it afterward. At the moment it just barely escapes, its kinetic energy has been completely used up reaching infinity with zero leftover speed.",
      formula: [
        { label: "Escape velocity from the surface", expression: "v_e = √(2GM/R) = √(2gR)" },
        { label: "Escape velocity from height h above surface", expression: "v_e = √(2GM/(R+h))" },
        { label: "Escape energy", expression: "GMm/R = (1/2)mv_e²" },
      ],
      bullets: [
        "Escape velocity depends only on the planet's mass and radius (or equivalently g and R, or density and R) — and on how far from the centre the object starts.",
        "It does NOT depend on the mass of the escaping object or the angle at which it's launched.",
        "Earth's escape velocity is about 11.2 km/s; the Moon's is much lower, about 2.3 km/s — small enough that gas molecules routinely exceed it, which is why the Moon has essentially no atmosphere.",
      ],
    },
    {
      heading: "8. Kepler's Laws of Planetary Motion",
      body:
        "Before Newton explained gravity, Kepler had already worked out three empirical rules describing exactly how planets move around the Sun, based purely on careful astronomical observation.",
      bullets: [
        "Law of Orbits: every planet moves in an elliptical orbit with the Sun at one focus — not at the centre of the ellipse.",
        "Law of Areas: the line joining a planet to the Sun sweeps out equal areas in equal time intervals. This means a planet moves fastest when closest to the Sun (perihelion) and slowest when farthest (aphelion).",
        "Law of Areas is exactly equivalent to conservation of angular momentum — both say the same thing, since the Sun's pull on a planet is a central force that produces zero torque about the Sun.",
        "Law of Periods: the square of a planet's orbital period is proportional to the cube of the semi-major axis of its orbit: T² ∝ a³. For a circular orbit, this simplifies to T² ∝ R³.",
      ],
      formula: [
        { label: "Law of periods", expression: "T² ∝ a³" },
      ],
    },
    {
      heading: "9. Satellite Motion — Orbital Velocity and Time Period",
      body:
        "A satellite stays in orbit because gravity supplies exactly the centripetal force needed for its circular path. Setting these two forces equal gives the satellite's required speed at any given orbital radius.",
      formula: [
        { label: "Orbital velocity at radius r", expression: "v₀ = √(GM/r) = √(GM/(R+h))" },
        { label: "Orbital velocity very close to the surface", expression: "v₀ = √(gR) ≈ 7.9 km/s" },
        { label: "Time period of a satellite", expression: "T = 2π√(r³/GM)" },
        { label: "Time period close to Earth's surface", expression: "T₀ = 2π√(R/g) ≈ 84.6 minutes" },
      ],
      bullets: [
        "Orbital velocity depends only on the central body's mass and the orbital radius — never on the satellite's own mass.",
        "As the orbital radius increases, orbital velocity decreases — outer satellites move slower, exactly as Kepler's third law predicts (T² ∝ r³ applies to any body orbiting under gravity, not just planets).",
        "If a satellite's speed is suddenly increased to √2 times its orbital velocity (a 41.4% increase), its kinetic energy doubles and it escapes the planet's gravity entirely.",
      ],
    },
    {
      heading: "10. Energy of a Satellite and Binding Energy",
      body:
        "A satellite in a stable circular orbit has both kinetic and potential energy, and the relationship between the two follows directly from the orbital velocity condition.",
      formula: [
        { label: "Kinetic energy", expression: "K.E. = GMm/2r" },
        { label: "Potential energy", expression: "P.E. = −GMm/r" },
        { label: "Total mechanical energy", expression: "T.E. = −GMm/2r" },
        { label: "Binding energy", expression: "B.E. = −T.E. = GMm/2r" },
      ],
      bullets: [
        "Notice the pattern: P.E. is always exactly twice the magnitude of K.E., and opposite in sign — this is a direct consequence of the orbital speed condition and holds for every circular orbit.",
        "Total energy being negative is what makes the orbit bound; a satellite with zero total energy would have just enough energy to escape, tracing a parabolic path instead of a closed one.",
        "Binding energy is the positive amount of energy that would need to be supplied to free the satellite completely — it equals the kinetic energy and is the negative of the total energy.",
        "Moving a satellite from a smaller orbit r₁ to a larger orbit r₂ requires work W = (GMm/2)(1/r₁ − 1/r₂), since the satellite needs more total energy (less negative) at the larger radius.",
      ],
    },
    {
      heading: "11. Geostationary & Polar Satellites, and Weightlessness",
      body:
        "Real-world satellites are placed in specific orbits chosen for what they need to observe or communicate with, and astronauts inside any orbiting satellite experience a very specific and often misunderstood kind of weightlessness.",
      bullets: [
        "A geostationary satellite orbits in the equatorial plane with a period of exactly 24 hours, matching Earth's own rotation — so it appears fixed over one point on the ground. Its height is about 36,000 km, and its orbital speed is about 3.1 km/s.",
        "Because one geostationary satellite can cover only about a third of Earth's surface, at least three are needed for global communication coverage, and they must be launched from near the equator.",
        "A polar satellite travels in a near-90° inclined orbit, passing near both poles on every revolution. Its period is much shorter — around 100 minutes — and its height is much lower, typically 500–800 km, which makes it ideal for weather and surface imaging.",
        "Weightlessness in orbit isn't about being 'far from gravity' — gravity at that altitude is nearly as strong as on the surface. It happens because the satellite and everything in it are in continuous free fall toward Earth, falling at exactly the rate needed to keep curving around it instead of hitting it.",
        "An object's true weight (the actual gravitational pull on it) is not zero in orbit — only its apparent weight, the normal force or support force it would need from a surface, drops to zero.",
      ],
    },
  ],
};
