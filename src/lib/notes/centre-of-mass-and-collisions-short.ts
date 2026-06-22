import type { ChapterShortNotes } from "./kinematics-short";

export const centreOfMassAndCollisionsShortNotes: ChapterShortNotes = {
  chapterName: "Centre of Mass & Collisions",
  className: "11",
  groups: [
    {
      heading: "Centre of Mass — Definitions",
      points: [
        "Centre of mass: the point that moves exactly like a particle of total mass M would, under the same external forces.",
        "Two particles: r_cm = (m₁r₁+m₂r₂)/(m₁+m₂); divides the join in inverse mass ratio: r₁/r₂ = m₂/m₁.",
        "System of particles: x_cm=Σmᵢxᵢ/M, y_cm=Σmᵢyᵢ/M, z_cm=Σmᵢzᵢ/M.",
        "Continuous body: x_cm=(1/M)∫x dm, where M=∫dm.",
        "Composite body: treat each part as a particle at its own COM. Truncated body: x_cm=(Mx−mx′)/(M−m), using 'negative mass' for the removed part.",
      ],
    },
    {
      heading: "Standard COM Locations",
      points: [
        "Semicircular ring: 2R/π from centre. Semicircular disc: 4R/3π from centre.",
        "Hemispherical shell: R/2 from centre. Solid hemisphere: 3R/8 from centre (flat face).",
        "Solid cone: h/4 from base. Hollow cone: h/3 from base.",
        "Circular arc (half-angle θ rad): R sinθ/θ from centre. Sector of disc (half-angle θ rad): 2R sinθ/3θ from centre.",
      ],
    },
    {
      heading: "Motion of Centre of Mass",
      points: [
        "v_cm = Σmᵢvᵢ/M; a_cm = Σmᵢaᵢ/M; P = Mv_cm.",
        "F_ext = dP/dt = Ma_cm. If F_ext = 0, v_cm stays exactly constant.",
        "Internal forces (springs, explosions, collisions) can NEVER change v_cm.",
      ],
    },
    {
      heading: "Conservation of Linear Momentum",
      points: [
        "Impulse–momentum theorem: ∫F dt = Δp.",
        "If net external impulse = 0, p_final = p_initial.",
        "Momentum conservation ⟺ Newton's third law for a two-body system.",
        "System starting at rest stays at zero total momentum, however violently it splits apart (recoil, explosion).",
        "Lighter fragment always carries more KE: KE ∝ 1/m when |p| is equal and opposite.",
      ],
    },
    {
      heading: "Collision Basics",
      points: [
        "Head-on: velocities along the line of centres. Oblique: velocities not along that line.",
        "Momentum is conserved in EVERY collision — elastic, inelastic, or perfectly inelastic.",
        "Coefficient of restitution: e = (v₂−v₁)/(u₁−u₂) = velocity of separation / velocity of approach.",
        "e=1: elastic. 0<e<1: inelastic. e=0: perfectly inelastic (bodies stick, move with common velocity).",
      ],
    },
    {
      heading: "1D Elastic Collision Formulas",
      points: [
        "Newton's rule: u₁−u₂ = v₂−v₁ (approach speed = separation speed).",
        "v₁=[(m₁−m₂)/(m₁+m₂)]u₁+[2m₂/(m₁+m₂)]u₂; v₂=[2m₁/(m₁+m₂)]u₁+[(m₂−m₁)/(m₁+m₂)]u₂.",
        "Equal masses: velocities are exchanged completely.",
        "Heavy body hits light body at rest (m₁≫m₂): v₁≈u₁, v₂≈2u₁.",
        "Light body hits heavy body at rest (m₁≪m₂): v₁≈−u₁ (bounces back), v₂≈0.",
        "Equal mass, target at rest: incoming body stops, target moves off with the original velocity (100% energy transfer).",
      ],
    },
    {
      heading: "Bouncing Ball (coefficient of restitution e)",
      points: [
        "Speed before nth rebound: vₙ = eⁿ√(2gh).",
        "Height after nth rebound: hₙ = e²ⁿh.",
        "Total time to stop bouncing: T = √(2h/g)·(1+e)/(1−e).",
        "Total distance travelled: s = h·(1+e²)/(1−e²).",
      ],
    },
    {
      heading: "Oblique Collision",
      points: [
        "Conserve momentum along x and y separately; add KE conservation if elastic.",
        "Equal-mass elastic oblique collision with one body initially at rest: the two bodies always separate at exactly 90° to each other.",
        "Ball bouncing off a rigid floor: component along the floor is unchanged; component along the normal scales by e.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Momentum is ALWAYS conserved in a collision (even perfectly inelastic) — only kinetic energy conservation is conditional on e=1.",
        "Centre of mass velocity is unaffected by ANY internal force, no matter how large — only external force changes it.",
        "Coefficient of restitution compares velocity of separation to velocity of approach, NOT final speed to initial speed of one single body.",
        "In an explosion or recoil starting from rest, total momentum stays zero — but kinetic energy increases from zero, since chemical/elastic PE converts to KE.",
        "Don't confuse 'centre of mass' (always exists, geometric/mass property) with 'centre of gravity' (coincides with COM only when g is uniform over the body).",
      ],
    },
  ],
};
