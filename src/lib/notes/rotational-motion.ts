export type RMNoteSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  formula?: { label: string; expression: string }[];
};

import type { ChapterNotes } from "./kinematics";

export const rotationalMotionNotes: ChapterNotes = {
  chapterName: "System of Particles & Rotational Motion",
  className: "11",
  intro:
    "So far every object was treated as a single point. Real bodies are extended — they spin as well as move. This chapter builds the toolkit for spinning, extended bodies: moment of inertia (rotational mass), torque (rotational force), angular momentum (rotational momentum), and how all three combine in rolling motion, where a body moves forward and spins at the same time.",
  sections: [
    {
      heading: "1. Rigid Body and Types of Rotational Motion",
      body:
        "A rigid body is an idealised solid in which the distance between any two particles stays exactly fixed, no matter what forces act on it. Real objects always deform a little under force, but when that deformation is too small to matter, we treat the object as rigid — this is why a cricket ball, a wheel, or a door can all be analysed as rigid bodies.\n\nMotion can change an object's position, its orientation, or both. When a body changes its orientation while moving, it is said to be undergoing rotational motion. A block sliding in a straight line without spinning is in pure translation; the same block spinning while it slides is doing both at once.",
      bullets: [
        "Rotation about a fixed axis: every particle moves in a circle, and the centres of all these circles lie on one stationary line called the axis of rotation. A ceiling fan and a door swinging on its hinges are examples — the axis itself does not move.",
        "Rotation about a translating axis: the axis of rotation itself moves through space while the body spins about it. A rolling wheel is the standard example — relative to the vehicle, the wheel just spins about its axle; relative to the ground, that axle is also moving forward.",
        "Rotation about a rotating axis: the spin-axis itself sweeps out a path — a spinning top whose axis traces a cone (called precession), or a tilted oscillating table-fan whose shaft swings side to side while the blades spin.",
      ],
    },
    {
      heading: "2. Angular Displacement, Velocity and Acceleration",
      body:
        "Angular displacement (θ) is the angle swept by a rotating line, measured in radians — a dimensionless quantity. Angular velocity (ω) is how fast that angle changes, and angular acceleration (α) is how fast the angular velocity itself changes. These three play exactly the same role in rotation that displacement, velocity, and acceleration play in straight-line motion, and every equation from kinematics has a direct rotational twin.",
      bullets: [
        "ω is a vector directed along the axis of rotation, fixed by the right-hand rule: curl the fingers of the right hand in the sense of rotation, the thumb points along ω.",
        "Every particle of a rigid body rotating about a fixed axis has the same ω and the same α at a given instant — only their distance from the axis differs, so their linear speeds differ.",
        "Linear speed of a particle at distance r from the axis: v = ωr. Tangential acceleration: a_t = αr. Radial (centripetal) acceleration: a_r = ω²r.",
      ],
      formula: [
        { label: "Angular velocity", expression: "ω = dθ/dt" },
        { label: "Angular acceleration", expression: "α = dω/dt" },
        { label: "Linear–angular velocity link", expression: "v = ω × r" },
        { label: "First equation (constant α)", expression: "ω = ω₀ + αt" },
        { label: "Second equation (constant α)", expression: "θ = ω₀t + ½αt²" },
        { label: "Third equation (constant α)", expression: "ω² = ω₀² + 2αθ" },
      ],
    },
    {
      heading: "3. Moment of Inertia",
      body:
        "Moment of inertia (I) is the rotational equivalent of mass — it measures how strongly a body resists a change in its rotational motion. Just as a heavier object is harder to push into linear motion, a body with larger moment of inertia is harder to spin up or slow down. Unlike mass, moment of inertia is not a fixed property of the body alone — it depends on which axis you spin it about.",
      bullets: [
        "For a single particle: I = mr², where r is the perpendicular distance from the axis.",
        "For a system of particles: I = Σmᵢrᵢ². For a continuous body: I = ∫r² dm.",
        "I depends on: the mass of the body, how that mass is distributed relative to the axis, and the position of the axis itself.",
        "I does NOT depend on angular velocity, angular acceleration, torque, or angular momentum — it is purely a geometric/mass property for a given axis.",
        "Moving mass farther from the axis always increases I, even if the total mass stays the same — this is why flywheels concentrate mass at the rim.",
      ],
      formula: [{ label: "Moment of inertia", expression: "I = Σmr²  (discrete)   I = ∫r² dm  (continuous)" }],
    },
    {
      heading: "4. Radius of Gyration",
      body:
        "Radius of gyration (K) answers the question: if the entire mass of the body were squeezed into a single point, how far from the axis would that point need to be to produce the same moment of inertia? It is a way of summarising how 'spread out' the mass is, without needing to know the actual shape.",
      bullets: [
        "K depends on the axis of rotation and on how the mass is distributed — not on the total mass itself or on any angular quantity.",
        "For a symmetric body cut into two equal symmetric halves, K stays the same as for the whole body.",
      ],
      formula: [{ label: "Radius of gyration", expression: "I = MK²   ⇒   K = √(I/M)" }],
    },
    {
      heading: "5. Theorem of Parallel Axes",
      body:
        "This theorem lets you find the moment of inertia about any axis, as long as you already know it about a parallel axis through the centre of mass. It works for every shape of rigid body — 1D, 2D, or 3D.",
      bullets: [
        "I_CM is the moment of inertia about an axis through the centre of mass; the new axis must be parallel to it, at perpendicular distance d.",
      ],
      formula: [{ label: "Parallel axis theorem", expression: "I = I_CM + Md²" }],
    },
    {
      heading: "6. Theorem of Perpendicular Axes",
      body:
        "This theorem applies only to flat, two-dimensional bodies (a lamina). It connects the moment of inertia about an axis perpendicular to the plane of the body to the moments of inertia about two mutually perpendicular axes lying within that plane, all three axes meeting at one point.",
      bullets: [
        "Valid only for plane laminae (rings, discs, flat plates) — it cannot be used for 3-D bodies like spheres or cylinders.",
      ],
      formula: [{ label: "Perpendicular axis theorem", expression: "I_z = I_x + I_y" }],
    },
    {
      heading: "7. Moment of Inertia of Standard Bodies",
      body:
        "These standard results are used directly in numericals — they are worth memorising rather than re-deriving every time. M is always the total mass, R the radius, L the length.",
      bullets: [
        "Ring, about axis through centre ⊥ to plane: I = MR²",
        "Ring, about a diameter: I = MR²/2",
        "Disc, about axis through centre ⊥ to plane: I = MR²/2",
        "Disc, about a diameter: I = MR²/4",
        "Solid sphere, about a diameter: I = (2/5)MR²",
        "Thin hollow spherical shell, about a diameter: I = (2/3)MR²",
        "Thin uniform rod, about a perpendicular axis through its centre: I = ML²/12",
        "Thin uniform rod, about a perpendicular axis through one end: I = ML²/3",
        "Solid cylinder, about its own (geometric) axis: I = MR²/2",
        "Thin hollow cylinder, about its own axis: I = MR²",
        "Rectangular plate, about an axis through centre ⊥ to its plane: I = M(a² + b²)/12, where a and b are the side lengths",
      ],
    },
    {
      heading: "8. Torque",
      body:
        "Torque is the rotational equivalent of force — it measures the turning effect a force produces about a chosen point or axis. The same force can produce a large torque or none at all, depending on where and in which direction it is applied. A force applied right at the pivot, or directed straight along the line to the pivot, causes no rotation; only the component perpendicular to that line is effective.",
      bullets: [
        "Torque explains why a door handle is placed far from the hinge, and why a longer wrench needs less force to loosen the same nut.",
        "A couple is a pair of equal and opposite forces acting along different lines of action; it produces a pure turning effect with zero net force. Moment of a couple = F × b, where b is the perpendicular distance between the two lines of action.",
        "Torque is the rotational analogue of Newton's second law: τ = Iα, just as F = ma for translation.",
      ],
      formula: [
        { label: "Torque (vector)", expression: "τ = r × F" },
        { label: "Torque (magnitude)", expression: "τ = rF sinθ" },
        { label: "Rotational Newton's 2nd law", expression: "τ = Iα" },
      ],
    },
    {
      heading: "9. Rotational Equilibrium and Bending of a Cyclist",
      body:
        "A rigid body is in rotational equilibrium when its angular acceleration is zero — it is either at rest or spinning at constant angular velocity. For a body to be in complete mechanical equilibrium, both the net force and the net torque about any point must vanish at the same time; satisfying only one of the two is not enough.\n\nA cyclist turning on a horizontal road must lean inward. Looked at from a frame rotating with the cyclist, the centre of mass needs a net inward (centripetal) force, and the bicycle-plus-rider system must also have zero net torque about the centre of mass — leaning inward shifts the line of action of the normal/friction forces so that their torque balances the torque of the apparent outward (centrifugal) effect.",
      bullets: [
        "Translational equilibrium: ΣF = 0. Rotational equilibrium: Στ = 0. Both are needed together for a body to stay fully balanced.",
        "A single force can never produce rotational equilibrium unless its line of action passes through the axis of rotation.",
      ],
      formula: [{ label: "Cyclist's lean angle", expression: "tanθ = v²/(rg)" }],
    },
    {
      heading: "10. Angular Momentum",
      body:
        "Angular momentum (L) is the rotational equivalent of linear momentum — it measures the 'quantity of rotation' a body or particle possesses. For a single particle, it is the moment of linear momentum about a point; for a spinning rigid body, it is tied directly to the moment of inertia and angular velocity.",
      bullets: [
        "Angular momentum is maximum when the position vector and velocity are perpendicular (as in circular motion), and zero when they are parallel — i.e., when the line of motion passes through the reference point.",
        "Angular impulse (τ·Δt) produces a change in angular momentum, exactly as linear impulse (F·Δt) changes linear momentum.",
      ],
      formula: [
        { label: "Angular momentum of a particle", expression: "L = r × p = r × mv" },
        { label: "Angular momentum of a rigid body", expression: "L = Iω" },
        { label: "Torque–angular momentum link", expression: "τ = dL/dt" },
      ],
    },
    {
      heading: "11. Conservation of Angular Momentum",
      body:
        "If the net external torque acting on a system about an axis is zero, the angular momentum of that system about the same axis stays exactly constant — even if the moment of inertia of the system changes internally. This single principle explains a huge range of spinning phenomena, from a spinning skater to a collapsing star.",
      bullets: [
        "A spinning skater pulling their arms in reduces their moment of inertia; since L = Iω must stay constant, ω increases and they spin faster. Spreading the arms out again does the reverse.",
        "A diver tucks into a ball mid-air to spin faster for somersaults, then straightens out before entering the water to slow the spin back down.",
        "If ice at the Earth's poles melts and that water redistributes toward the equator, Earth's moment of inertia increases slightly; by conservation of angular momentum its spin slows very slightly, lengthening the day.",
        "Conservation of angular momentum does not mean rotational kinetic energy is conserved — when I decreases and ω increases, KE_rot = ½Iω² actually goes up, fueled by the internal work the body does in pulling its mass inward.",
      ],
      formula: [{ label: "Conservation condition", expression: "If τ_net = 0:  I₁ω₁ = I₂ω₂" }],
    },
    {
      heading: "12. Rotational Kinetic Energy",
      body:
        "A spinning body has kinetic energy even if its centre of mass is not moving at all — this is rotational kinetic energy, and it comes from adding up the kinetic energy of every individual particle of the body as it moves in its own circular path.",
      bullets: [
        "Work done by a constant torque equals τ multiplied by the angular displacement, and by the work–energy theorem this equals the change in rotational kinetic energy.",
        "Rotational power (rate of doing work) is the rotational analogue of P = Fv.",
      ],
      formula: [
        { label: "Rotational kinetic energy", expression: "KE_rot = ½Iω² = L²/(2I)" },
        { label: "Work done by constant torque", expression: "W = τΔθ = ΔKE_rot" },
        { label: "Rotational power", expression: "P = τω" },
      ],
    },
    {
      heading: "13. Rolling Motion",
      body:
        "Rolling is the combination of translational motion (the centre of mass moving forward with velocity v_cm) and rotational motion (the body spinning about that centre of mass with angular velocity ω) happening together. A rolling ball, wheel, or cylinder is doing both at once, and its total kinetic energy is the sum of both contributions.\n\nIn pure rolling (rolling without slipping), the point of the body touching the ground has zero velocity relative to the ground at that instant — this is the defining condition, and it links v_cm and ω directly.",
      bullets: [
        "Pure rolling condition: v_cm = ωR, where R is the radius of the rolling body.",
        "Velocity of the topmost point of a rolling wheel = 2v_cm (it moves fastest); velocity of the contact point = 0 (momentarily at rest); velocity of the centre = v_cm.",
        "Because the contact point is instantaneously at rest, pure rolling can be analysed as pure rotation about an axis through that contact point — the instantaneous axis of rotation.",
      ],
      formula: [
        { label: "Pure rolling condition", expression: "v_cm = ωR" },
        { label: "Total kinetic energy while rolling", expression: "KE = ½mv_cm² + ½Iω² = ½mv²(1 + K²/R²)" },
      ],
    },
    {
      heading: "14. Rolling Motion on an Inclined Plane",
      body:
        "When a round body rolls down a rough incline without slipping, gravity pulls it down the slope while friction — acting up the slope — is exactly what supplies the torque needed to spin it up. Without friction, the body would only slide, never roll. The fraction of the available energy that ends up as rotational versus translational kinetic energy depends entirely on K²/R² for that shape, which is why different shapes race down an identical incline at different speeds.",
      bullets: [
        "A body with a smaller K²/R² (mass concentrated closer to the axis, like a solid sphere) reaches the bottom first; a larger K²/R² (mass concentrated at the rim, like a ring) reaches last.",
        "A sliding (frictionless) body always beats a rolling body of the same shape down the same incline, because none of its energy is diverted into spinning.",
        "Minimum coefficient of friction needed to sustain pure rolling on an incline of angle θ: μ_min = tanθ / (1 + R²/K²).",
      ],
      formula: [
        { label: "Velocity at the bottom", expression: "v = √[2gh / (1 + K²/R²)]" },
        { label: "Acceleration down the incline", expression: "a = g sinθ / (1 + K²/R²)" },
        { label: "Time to reach the bottom", expression: "t = (1/sinθ)·√[(2h/g)(1 + K²/R²)]" },
      ],
    },
  ],
};
