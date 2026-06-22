import type { ChapterNotes } from "./kinematics";

export const centreOfMassAndCollisionsNotes: ChapterNotes = {
  chapterName: "Centre of Mass & Collisions",
  className: "11",
  intro:
    "Every real object is made of many particles, yet it can still be tracked as if it were a single point — that point is the centre of mass. This chapter builds the idea from a two-particle system up to continuous bodies, then uses it to explain why momentum is conserved whenever bodies push on each other internally, whether that's a recoiling gun, an exploding bomb, or two balls colliding. Collisions are simply momentum conservation applied to a very short, very intense interaction.",
  sections: [
    {
      heading: "1. What Is the Centre of Mass?",
      body:
        "The centre of mass of a system is the single point that behaves exactly like a point particle of the system's total mass would, when the same external forces act on it. It moves the same way the whole system moves on average — even while the system's individual particles do completely different things.",
      bullets: [
        "There need not be any mass physically located at the centre of mass — think of a ring or a horseshoe.",
        "The centre of mass can lie inside or outside the physical boundary of the body.",
        "For a uniform, symmetric body, the centre of mass coincides with the geometric centre.",
      ],
    },
    {
      heading: "2. Centre of Mass of a Two-Particle System",
      body:
        "For two particles of masses m₁ and m₂, the centre of mass lies on the line joining them, closer to the heavier particle.",
      formula: [
        { label: "Position vector", expression: "r_cm = (m₁r₁ + m₂r₂) / (m₁ + m₂)" },
        { label: "Distances from each particle (separation r)", expression: "r₁ = m₂r/(m₁+m₂),   r₂ = m₁r/(m₁+m₂)" },
      ],
      bullets: [
        "The centre of mass divides the line joining the two particles in the inverse ratio of their masses: r₁/r₂ = m₂/m₁.",
        "If the origin is placed at the centre of mass itself, m₁r₁ + m₂r₂ = 0 — the two position vectors point in opposite directions.",
      ],
    },
    {
      heading: "3. Centre of Mass of a System of Particles",
      body:
        "For any number of particles, each coordinate of the centre of mass is simply the mass-weighted average of that coordinate over all the particles.",
      formula: [
        { label: "Position vector", expression: "R_cm = Σmᵢrᵢ / Σmᵢ = Σmᵢrᵢ / M" },
        { label: "In coordinates", expression: "x_cm = Σmᵢxᵢ/M,   y_cm = Σmᵢyᵢ/M,   z_cm = Σmᵢzᵢ/M" },
      ],
      bullets: [
        "If the origin is taken at the centre of mass, the sum of the mass moments about it is always zero: Σmᵢrᵢ = 0.",
      ],
    },
    {
      heading: "4. Centre of Mass of a Continuous Body",
      body:
        "For a body with mass spread continuously rather than as discrete particles, the sum over particles becomes an integral over infinitesimal mass elements dm.",
      formula: [
        { label: "Position vector", expression: "R_cm = (1/M) ∫ r dm,   where M = ∫dm" },
        { label: "In coordinates", expression: "x_cm = (1/M)∫x dm,   y_cm = (1/M)∫y dm,   z_cm = (1/M)∫z dm" },
      ],
      bullets: [
        "For a uniform rod of length L along the x-axis with one end at the origin, this integral gives x_cm = L/2.",
        "If the linear mass density varies as λ = A + Bx, the integral must actually be carried out — the centre of mass shifts toward the denser end.",
      ],
    },
    {
      heading: "5. Centre of Mass of Composite and Truncated Bodies",
      body:
        "A composite body — made of several simple shapes joined together — can be treated as if each component shape were a point particle located at its own centre of mass, carrying its own mass. The same idea run in reverse handles a body with a piece removed: treat the missing piece as a 'negative mass' located where it used to be.",
      formula: [
        { label: "Composite body", expression: "x_cm = (m₁x₁ + m₂x₂ + ...) / (m₁ + m₂ + ...)" },
        { label: "Truncated body (mass m removed from mass M)", expression: "x_cm = (Mx − mx′) / (M − m)" },
      ],
      bullets: [
        "Here x′ is the centre of mass of the piece that was removed, measured in the same coordinate system as the original body.",
        "This 'negative mass' trick is the standard way to handle a disc with a hole, a plate with a corner cut off, or a sphere with a cavity.",
      ],
    },
    {
      heading: "6. Centre of Mass of Common Symmetric Shapes",
      body:
        "A handful of standard results are worth memorising outright, since deriving them from scratch under exam time pressure is wasteful. R is the radius and h is the height in each case, measured from the obvious geometric reference point (centre, base, or apex).",
      formula: [
        { label: "Semicircular ring (arc)", expression: "distance from centre = 2R/π" },
        { label: "Semicircular disc", expression: "distance from centre = 4R/3π" },
        { label: "Hemispherical shell", expression: "distance from centre = R/2" },
        { label: "Solid hemisphere", expression: "distance from centre (flat face) = 3R/8" },
        { label: "Solid cone", expression: "distance from base = h/4" },
        { label: "Hollow (thin) cone", expression: "distance from base = h/3" },
        { label: "Circular arc subtending angle 2θ (θ in rad)", expression: "distance from centre = R sinθ/θ" },
        { label: "Sector of a disc subtending angle 2θ (θ in rad)", expression: "distance from centre = 2R sinθ/3θ" },
      ],
    },
    {
      heading: "7. Centre of Gravity",
      body:
        "The centre of gravity is the point where the entire weight of a body can be considered to act. As long as gravitational acceleration is the same throughout the body's extent — true for almost every everyday object — the centre of gravity coincides exactly with the centre of mass.",
    },
    {
      heading: "8. Motion of the Centre of Mass",
      body:
        "Differentiating the position of the centre of mass with respect to time shows that the centre of mass moves exactly as a single particle of mass M would, carrying the combined momentum of the whole system.",
      formula: [
        { label: "Velocity of centre of mass", expression: "v_cm = Σmᵢvᵢ / M" },
        { label: "Acceleration of centre of mass", expression: "a_cm = Σmᵢaᵢ / M" },
        { label: "Total momentum", expression: "P = Mv_cm = Σpᵢ" },
        { label: "Newton's second law for a system", expression: "F_ext = dP/dt = Ma_cm" },
      ],
      bullets: [
        "If the net external force on a system is zero, v_cm stays exactly constant — internal forces, no matter how violent, cannot change it.",
        "This is precisely why two people pulling on a rope, a spring connecting two blocks, or an exploding bomb all leave the centre of mass's velocity completely unaffected.",
      ],
    },
    {
      heading: "9. Impulse and the Conservation of Linear Momentum",
      body:
        "Impulse is the time-integral of force, and it equals the resulting change in momentum. When the net impulse of all external forces on a system is zero over some interval, the system's total momentum at the end of that interval exactly equals its momentum at the start.",
      formula: [
        { label: "Impulse–momentum theorem", expression: "∫F dt = Δp = p_final − p_initial" },
        { label: "Conservation of momentum (zero net external impulse)", expression: "p_final = p_initial" },
      ],
      bullets: [
        "Momentum conservation is really Newton's third law in disguise: internal action–reaction pairs cancel in pairs, so they can never change the system's total momentum.",
        "It holds independently of the reference frame: each observer might compute a different value of momentum, but every observer will agree that their own value doesn't change over the interval.",
      ],
    },
    {
      heading: "10. Working with Momentum Conservation: Recoil and Explosions",
      body:
        "A system that starts at rest, with zero total momentum, must stay at zero total momentum as long as no external force acts — even if it violently separates into pieces. This single fact resolves a whole family of 'gun and bullet' and 'exploding bomb' problems.",
      formula: [
        { label: "Gun-bullet recoil (initially at rest)", expression: "mv_bullet + MV_gun = 0   ⟹   V_gun = −(m/M)v_bullet" },
        { label: "Explosion into two pieces (initially at rest)", expression: "m₁v₁ + m₂v₂ = 0" },
      ],
      bullets: [
        "Kinetic energy is NOT conserved in a recoil or explosion — chemical or elastic potential energy converts into kinetic energy, increasing the system's total KE from zero to something positive.",
        "Because momenta are equal and opposite, KE splits in the inverse ratio of the masses: the lighter piece always carries away more kinetic energy.",
        "If a man standing on a frictionless plank/boat walks one way, the centre of mass of the man+plank system stays fixed, so the plank slides the other way — exactly enough to keep the combined centre of mass stationary.",
      ],
    },
    {
      heading: "11. What Is a Collision?",
      body:
        "A collision is a brief, intense interaction between two bodies — through direct contact or a strong force field — during which the interaction forces are so large that all other external forces become negligible by comparison for that instant. Only the velocities just before and just after the collision matter; the messy details during the impact itself are not needed.",
      bullets: [
        "A head-on (direct) collision has both velocities along the line joining the centres at impact. An oblique collision does not.",
        "Momentum of the colliding system is conserved in every collision, elastic or not — only kinetic energy conservation is conditional.",
      ],
    },
    {
      heading: "12. Coefficient of Restitution",
      body:
        "During a head-on impact, the colliding bodies first deform and then partially or fully spring back. The coefficient of restitution e compares how much 'bounce-back' speed survives compared to the closing speed beforehand.",
      formula: [
        { label: "Definition", expression: "e = (velocity of separation) / (velocity of approach) = (v₂ − v₁) / (u₁ − u₂)" },
        { label: "Momentum conservation (head-on)", expression: "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂" },
      ],
      bullets: [
        "e = 1: perfectly elastic — no kinetic energy is lost.",
        "0 < e < 1: inelastic — some kinetic energy is lost; the bodies separate but more slowly than they approached.",
        "e = 0: perfectly (plastic) inelastic — the bodies move off together with a common velocity, sticking on contact.",
        "e generally lies between 0 and 1, but can exceed 1 in unusual cases where extra kinetic energy is released during the collision.",
      ],
    },
    {
      heading: "13. Elastic, Inelastic, and Perfectly Inelastic Collisions",
      body:
        "Collisions are classified by what happens to kinetic energy. Momentum is conserved in all three cases without exception — only the kinetic-energy bookkeeping differs.",
      bullets: [
        "Elastic collision: KE_before = KE_after exactly.",
        "Inelastic collision: KE_before > KE_after — some energy converts to heat, sound, or permanent deformation.",
        "Perfectly inelastic collision: the colliding bodies stick together and move with one common final velocity — the most extreme case of energy loss for a given momentum exchange.",
      ],
    },
    {
      heading: "14. One-Dimensional Elastic Collision: Formulas and Special Cases",
      body:
        "Combining momentum conservation with kinetic-energy conservation for a 1D elastic collision leads to a clean extra rule: the relative velocity of approach equals the relative velocity of separation — Newton's law for elastic impact.",
      formula: [
        { label: "Newton's rule for elastic collision", expression: "u₁ − u₂ = v₂ − v₁   (approach speed = separation speed)" },
        { label: "Final velocity of body 1", expression: "v₁ = [(m₁−m₂)/(m₁+m₂)]u₁ + [2m₂/(m₁+m₂)]u₂" },
        { label: "Final velocity of body 2", expression: "v₂ = [2m₁/(m₁+m₂)]u₁ + [(m₂−m₁)/(m₁+m₂)]u₂" },
      ],
      bullets: [
        "Equal masses (m₁ = m₂): the two bodies simply exchange velocities.",
        "m₁ >> m₂, body 2 initially at rest: body 1 barely slows down (v₁ ≈ u₁), while body 2 shoots off at v₂ ≈ 2u₁.",
        "m₁ << m₂, body 2 initially at rest: body 1 bounces straight back (v₁ ≈ −u₁), while heavy body 2 barely moves (v₂ ≈ 0).",
        "Equal mass, target initially at rest: the incoming body stops dead, and the target moves off with the incoming body's original velocity — full energy transfer (the basis of billiards and nuclear moderation).",
      ],
    },
    {
      heading: "15. Bouncing of a Ball",
      body:
        "Dropping a ball repeatedly onto a fixed, rigid surface and letting it bounce gives a clean geometric (GP-style) pattern, governed entirely by the coefficient of restitution e between the ball and the surface.",
      formula: [
        { label: "Speed immediately after the nth rebound", expression: "vₙ = eⁿ√(2gh)   (equivalently, the speed just before the (n+1)th impact)" },
        { label: "Height reached after the nth rebound", expression: "hₙ = e²ⁿh" },
        { label: "Total time until bouncing stops", expression: "T = √(2h/g) · (1+e)/(1−e)" },
        { label: "Total distance travelled before bouncing stops", expression: "s = h · (1+e²)/(1−e²)" },
      ],
      bullets: [
        "Each successive bounce is lower than the last by a constant factor e² — exactly like a geometric series, which is why the total distance and total time both converge to finite values even though the ball bounces infinitely many times in principle.",
        "Average speed over the whole process = total distance/total time; average velocity = total displacement/total time (net displacement is just h, since the ball ends up back where it started bouncing).",
      ],
    },
    {
      heading: "16. Oblique Collisions",
      body:
        "When the velocities aren't along the line joining the centres, momentum must be conserved separately along two perpendicular directions (commonly chosen along and perpendicular to the original direction of motion), and kinetic energy conservation (if elastic) provides a third independent equation.",
      formula: [
        { label: "Momentum along original direction (x)", expression: "m₁u₁ = m₁v₁cosθ + m₂v₂cosφ" },
        { label: "Momentum perpendicular to it (y)", expression: "0 = m₁v₁sinθ − m₂v₂sinφ" },
        { label: "Kinetic energy (if elastic)", expression: "½m₁u₁² = ½m₁v₁² + ½m₂v₂²" },
      ],
      bullets: [
        "A special and exam-favourite result: when a moving body collides elastically and obliquely with an identical stationary body, the two bodies always move off perpendicular to each other afterward (θ + φ = 90°).",
        "When a ball bounces obliquely off a rigid floor, the floor can only push along the normal — so the velocity component parallel to the floor is unchanged, while the normal component scales by e.",
      ],
    },
  ],
};
