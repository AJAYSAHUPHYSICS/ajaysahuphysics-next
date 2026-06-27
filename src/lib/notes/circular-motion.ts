import type { ChapterNotes } from "./kinematics";

export const circularMotionNotes: ChapterNotes = {
  chapterName: "Circular Motion",
  className: "11",
  intro:
    "Circular motion takes everything learned in linear kinematics and dynamics and applies it to a particle moving along a curved, circular path. Even at constant speed, a particle going around a circle is always accelerating — its direction keeps changing — and that single idea drives every result in this chapter: from the basic angular quantities, through centripetal force, conical pendulums and banked roads, all the way to the three possible outcomes when a body swings in a vertical circle.",
  sections: [
    {
      heading: "1. Angular Position and Angular Displacement",
      body:
        "To describe a particle moving on a circle of radius r about a centre O, it's easier to track the angle θ its position vector makes with a fixed reference line than to track x-y coordinates directly. This angle is the angular position; the angle swept out in a given time interval is the angular displacement.",
      bullets: [
        "Angular displacement is measured in radians (a dimensionless ratio: arc length/radius); 2π rad = 360° = 1 revolution.",
        "By convention, angular displacement measured anticlockwise from the positive x-direction is taken as positive, and clockwise as negative.",
        "For motion confined to one plane, finite angular displacements can be treated as ordinary algebraic scalars; the total angular displacement is just the algebraic sum of the individual ones.",
      ],
    },
    {
      heading: "2. Angular Velocity",
      body:
        "Angular velocity tells us how fast the angular position is changing — the rotational equivalent of velocity in linear kinematics.",
      formula: [
        { label: "Average angular velocity", expression: "ω_av = Δθ/Δt = (θ₂ − θ₁)/(t₂ − t₁)" },
        { label: "Instantaneous angular velocity", expression: "ω = dθ/dt" },
        { label: "Relation to frequency", expression: "ω = 2πf = 2π/T" },
      ],
      bullets: [
        "Unit: rad/s; dimensional formula [M⁰L⁰T⁻¹].",
        "Angular velocity is technically an axial vector, directed along the axis of rotation by the right-hand rule (curl the fingers along the direction of revolution; the thumb points along ω).",
        "Frequency f is the number of complete revolutions per second; time period T is the time for one revolution; f = 1/T.",
      ],
    },
    {
      heading: "3. Angular Acceleration",
      body:
        "Angular acceleration is the rate of change of angular velocity, exactly mirroring how linear acceleration is the rate of change of linear velocity.",
      formula: [
        { label: "Average angular acceleration", expression: "α_av = Δω/Δt = (ω₂ − ω₁)/(t₂ − t₁)" },
        { label: "Instantaneous angular acceleration", expression: "α = dω/dt = d²θ/dt²" },
      ],
      bullets: [
        "Unit: rad/s²; dimensional formula [M⁰L⁰T⁻²].",
        "If α = 0, the circular motion is uniform (constant angular speed); θ = ωt in that case.",
        "α points along ω if angular speed is increasing, and opposite to ω if angular speed is decreasing.",
      ],
    },
    {
      heading: "4. Equations of Motion with Constant Angular Acceleration",
      body:
        "These exactly parallel the standard linear kinematics equations, with θ replacing displacement, ω replacing velocity, and α replacing acceleration.",
      formula: [
        { label: "First equation", expression: "ω = ω₀ + αt" },
        { label: "Second equation", expression: "θ = ω₀t + ½αt²" },
        { label: "Third equation", expression: "ω² = ω₀² + 2αθ" },
      ],
    },
    {
      heading: "5. Relation Between Linear and Angular Quantities",
      body:
        "For a particle moving on a circle of radius r, every linear quantity has a direct angular counterpart, connected through the radius.",
      formula: [
        { label: "Arc length", expression: "s = rθ" },
        { label: "Linear (tangential) speed", expression: "v = rω" },
        { label: "Tangential acceleration", expression: "a_t = rα" },
      ],
      bullets: [
        "These relations hold only when θ, ω, α are measured in radians and radians/second(²).",
        "Linear velocity v is always directed tangent to the circular path, perpendicular to the radius at that point.",
      ],
    },
    {
      heading: "6. Centripetal (Radial) Acceleration",
      body:
        "Even when a particle moves on a circle at constant speed, its velocity vector keeps changing direction — and a change in velocity always means an acceleration. This acceleration points from the particle toward the centre of the circle at every instant, and is called centripetal or radial acceleration.",
      formula: [
        { label: "Centripetal acceleration", expression: "a_c = v²/r = ω²r" },
      ],
      bullets: [
        "Centripetal acceleration is always variable in direction (it always points toward the centre, which itself keeps changing as the particle moves), even when its magnitude is constant.",
        "It is sometimes also called normal acceleration, since it acts along the inward normal to the path.",
      ],
    },
    {
      heading: "7. Tangential Acceleration and Total Acceleration",
      body:
        "If the particle's speed itself is changing (non-uniform circular motion), there is a second component of acceleration directed along the tangent to the path — this is the tangential acceleration, responsible for the change in speed rather than direction.",
      formula: [
        { label: "Tangential acceleration", expression: "a_t = dv/dt = rα" },
        { label: "Total acceleration", expression: "a = √(a_c² + a_t²)" },
        { label: "Direction of total acceleration", expression: "tanθ = a_t/a_c (θ measured from the radial direction)" },
      ],
      bullets: [
        "In uniform circular motion, a_t = 0 since speed is constant, so the net acceleration is purely centripetal: a = a_c.",
        "If a_t acts in the same direction as velocity, the particle speeds up; if opposite, it slows down — the sign of a_t (positive or negative) tells you which.",
      ],
    },
    {
      heading: "8. Centripetal Force",
      body:
        "The centripetal force is not a new, separate kind of force in nature — it is simply the name given to whatever net real force (gravity, tension, friction, normal reaction, or a combination) happens to be directed toward the centre and is responsible for producing the centripetal acceleration. Without this net inward force, a body would move off in a straight line, tangent to its circular path, exactly as Newton's first law demands.",
      formula: [
        { label: "Centripetal force", expression: "F_c = ma_c = mv²/r = mω²r" },
      ],
      bullets: [
        "Always ask, for any circular motion problem: \"which real force (or combination of forces) is supplying the centripetal force here?\" — this is usually the key first step.",
        "mv²/r is not itself a force; it is the value that the net inward force must equal for the body to maintain that particular circular path.",
      ],
    },
    {
      heading: "9. Motion of a Vehicle on a Flat (Unbanked) Circular Road",
      body:
        "A car taking a curve on a flat road relies entirely on static friction between its tyres and the road surface to provide the necessary centripetal force. Since the car doesn't slip, this is static — not kinetic — friction, and it can take any value up to its maximum (limiting) value.",
      formula: [
        { label: "Maximum safe speed", expression: "v_max = √(μₛ R g)" },
      ],
      bullets: [
        "If the actual speed exceeds v_max, the required centripetal force would exceed the maximum friction available, and the vehicle skids outward off the curve.",
        "v_max does not depend on the mass of the vehicle — this is why a single speed limit sign works for cars, buses, and trucks alike on the same curve.",
      ],
    },
    {
      heading: "10. Banking of Roads",
      body:
        "Relying on friction alone is risky — friction drops sharply on a wet or icy road. Banking tilts the road surface inward so that a component of the normal reaction itself contributes to the centripetal force, letting vehicles take the curve safely even with little or no friction.",
      formula: [
        { label: "Angle of banking (no friction)", expression: "tanθ = v²/(Rg)" },
      ],
      bullets: [
        "At the exact designed speed, the curve can be negotiated with zero reliance on friction.",
        "If a real banked road also has friction available, the safe speed range widens to a minimum and maximum value around the no-friction design speed, rather than just one exact value.",
        "Banking is also used in railway tracks (outer rail raised) and aircraft turns, for the same reason — to let part of the normal/lift force do the job that friction would otherwise have to do alone.",
      ],
    },
    {
      heading: "11. Conical Pendulum",
      body:
        "A conical pendulum is a bob tied to a string, set into motion so that it sweeps out a horizontal circle while the string itself traces the surface of a cone, making a constant angle θ with the vertical.",
      formula: [
        { label: "Speed of the bob", expression: "v = √(rg tanθ) = √(Lg sinθ tanθ)" },
        { label: "Time period", expression: "T = 2π√(L cosθ / g)" },
      ],
      bullets: [
        "Here L is the string length and r = L sinθ is the radius of the horizontal circle traced by the bob.",
        "The vertical component of tension balances gravity (T cosθ = mg); the horizontal component supplies the centripetal force (T sinθ = mv²/r).",
        "A larger half-angle θ means a shorter time period — the bob revolves faster for a more tilted string.",
      ],
    },
    {
      heading: "12. Centrifugal Force",
      body:
        "Centrifugal force is a pseudo (fictitious) force that appears only when circular motion is analyzed from a rotating (non-inertial) reference frame — for instance, by an observer sitting on a spinning merry-go-round.",
      bullets: [
        "It has magnitude mω²r, directed radially outward, exactly opposite to the real centripetal force.",
        "An observer in an inertial (ground) frame never needs this force — for them, the only real forces present already explain the body's circular motion completely.",
        "Like all pseudo forces, centrifugal force has no Newton's-third-law reaction partner; it exists purely to make Newton's laws appear to hold inside the rotating frame.",
      ],
    },
    {
      heading: "13. Motion in a Vertical Circle — Setting Up the Problem",
      body:
        "Unlike horizontal circular motion, a vertical circle has gravity constantly doing work on the body — speeding it up on the way down, slowing it down on the way up. This means both the speed and the tension (or normal reaction) in the string keep changing continuously around the loop, and energy conservation becomes the natural tool to find the speed at any position.",
      formula: [
        { label: "Speed at angle θ from the bottom", expression: "v² = v₀² − 2gl(1 − cosθ)" },
        { label: "Tension at angle θ from the bottom", expression: "T = (mv₀²/l) − 2mg + 3mg cosθ" },
      ],
      bullets: [
        "Here v₀ is the speed at the lowest point, l is the string (or track) length/radius, and θ is measured from the lowest point.",
        "Tension is maximum at the bottom (θ = 0°) and minimum at the top (θ = 180°) — this is why, if the string is going to snap or go slack anywhere, it happens at the top, not the bottom.",
      ],
    },
    {
      heading: "14. Condition for Completing the Vertical Circle",
      body:
        "For a bob on a string (which can only pull, never push), the body completes the full circle only if tension never drops to zero anywhere on the loop. Since tension is minimum at the top, it's enough to check that condition there.",
      formula: [
        { label: "Minimum speed at the top", expression: "v_top ≥ √(gl)" },
        { label: "Minimum speed at the bottom (lowest point)", expression: "v₀ ≥ √(5gl)" },
        { label: "Tension at the lowest point (minimum case)", expression: "T_bottom = 6mg" },
        { label: "Tension at the topmost point (minimum case)", expression: "T_top = 0" },
      ],
      bullets: [
        "At the bare-minimum condition for completing the loop, tension at the top is exactly zero, and tension at the bottom is exactly 6 times the weight (6mg).",
        "If instead of a string the body is on a rigid rod (which can push as well as pull), the body only needs v_top ≥ 0 to complete the circle — the rod can supply an outward push near the top, something a string cannot do.",
      ],
    },
    {
      heading: "15. Condition for Oscillation (Speed Becomes Zero Before Tension Does)",
      body:
        "If the bob is given too little speed at the bottom, gravity brings it to a complete stop (v = 0) before the tension in the string has any chance to become zero. Since the string is still taut and gravity has a component pulling the bob back, the bob simply swings back the way it came — it oscillates, confined to the lower half of the circle.",
      formula: [
        { label: "Condition for oscillation", expression: "v₀ < √(2gl)" },
      ],
      bullets: [
        "This is exactly the familiar simple-pendulum-like swinging motion, just with a larger amplitude.",
        "The bob never rises above the level of the centre of the circle in this case.",
      ],
    },
    {
      heading: "16. Condition for Leaving the Circular Path",
      body:
        "In the in-between range of initial speeds, the bob rises above the level of the centre but doesn't have enough speed to keep tension positive all the way to the top. Tension drops to zero at some point in the upper half of the circle (string goes slack), and from that point on, the bob leaves the circular path and moves under gravity alone, following a projectile (parabolic) path until it perhaps re-enters circular motion or falls away entirely.",
      formula: [
        { label: "Condition for leaving the path partway", expression: "√(2gl) ≤ v₀ < √(5gl)" },
      ],
      bullets: [
        "The exact angle at which the string goes slack depends on v₀; it always happens somewhere in the upper half of the circle (between the height of the centre and the very top).",
        "Once tension hits zero, the only force left acting on the bob is gravity — from that instant on, treat the problem exactly like ordinary projectile motion, using the bob's velocity at that point as the initial velocity.",
      ],
    },
    {
      heading: "17. Special Case: Smooth Rigid Track / Rod Instead of a String",
      body:
        "If the vertical circular motion is constrained by a rigid object — a light rod, or a bead threaded on a circular wire — rather than a flexible string, the constraining force (now a normal reaction, which can push as well as pull) can become negative in the sense of pushing outward. This removes the 'going slack' problem entirely.",
      bullets: [
        "Minimum speed needed at the lowest point to complete a full revolution on a rigid track/rod is just v₀ = √(4gl), noticeably less than the √(5gl) required for a string.",
        "With this minimum speed on a rigid constraint, the body's speed becomes exactly zero right at the top, but it still completes the circle because the rod can push it through that point — unlike a string, which would have already gone slack well before reaching the top under the same initial speed.",
      ],
    },
    {
      heading: "18. Circular Motion in a Non-Inertial Frame (Effective Gravity)",
      body:
        "When the support point of a vertical-circle setup is itself accelerating (a bob in an accelerating lift, or a circular loop inside a horizontally accelerating trolley), the cleanest approach is to switch to that non-inertial frame and replace ordinary gravity g with an effective gravity g_eff that combines real gravity with the pseudo force from the frame's acceleration.",
      formula: [
        { label: "Lift accelerating upward with acceleration a", expression: "g_eff = g + a" },
        { label: "Lift accelerating downward with acceleration a", expression: "g_eff = g − a" },
        { label: "Trolley accelerating horizontally with acceleration a", expression: "g_eff = √(g² + a²), at angle tan⁻¹(a/g) from vertical" },
      ],
      bullets: [
        "Once g_eff is found, every formula from the earlier sections of this chapter (minimum speed to complete the loop, oscillation condition, tension at any point) applies exactly as before, with g replaced by g_eff.",
        "This is a powerful shortcut: it avoids having to separately track the pseudo force at every single point around the circle.",
      ],
    },
  ],
};
