import type { ChapterShortNotes } from "./kinematics-short";

export const lawsOfMotionShortNotes: ChapterShortNotes = {
  chapterName: "Laws of Motion",
  className: "11",
  groups: [
    {
      heading: "Newton's Three Laws — Core Statements",
      points: [
        "1st Law: a body stays at rest or moves uniformly unless an external force acts — defines force qualitatively.",
        "2nd Law: F = dp/dt; for constant mass, F = ma — measures force.",
        "3rd Law: every action has an equal and opposite reaction, acting on two different bodies, simultaneously.",
        "1st law is a special case of the 2nd law: F = 0 ⇒ a = 0.",
      ],
    },
    {
      heading: "Momentum & Impulse",
      points: [
        "Momentum: p = mv (vector, SI unit kg·m/s).",
        "Impulse: I = F·Δt (constant force) = area under F-t graph (varying force).",
        "Impulse-momentum theorem: Impulse = Δp.",
        "Conservation of momentum: if F_net = 0 on a system, total p stays constant.",
        "Stretching contact time lowers average force for the same Δp (cricketer's hands, shock absorbers, bumpers).",
      ],
    },
    {
      heading: "Force Units & Conversions",
      points: [
        "1 kgf = 9.8 N",
        "1 gf = 980 dyne",
        "1 N = 10^5 dyne",
        "Unit of force = unit of mass × unit of acceleration.",
      ],
    },
    {
      heading: "Apparent Weight in a Lift",
      points: [
        "At rest / constant velocity: N = mg",
        "Accelerating upward: N = m(g + a) → feels heavier",
        "Accelerating downward: N = m(g − a) → feels lighter",
        "Free fall (a = g): N = 0 → weightlessness",
      ],
    },
    {
      heading: "Connected Bodies, Strings & Pulleys",
      points: [
        "Common acceleration: a = F_net / total mass being moved.",
        "Find 'a' from the whole system first, then isolate one body's FBD for tension/contact force.",
        "Tension always pulls away from the attachment point; a string can only pull, never push.",
        "Ideal (massless, frictionless) string/pulley: same tension throughout; pulley only redirects force, doesn't change it.",
        "Atwood machine: a = (m₁ − m₂)g/(m₁ + m₂); T = 2m₁m₂g/(m₁ + m₂); thrust on pulley R = 2T.",
        "On an incline + hanging mass: replace mg with mg sinθ for the block on the slope.",
      ],
    },
    {
      heading: "Spring Force",
      points: [
        "Hooke's law: F = −kx (k = spring constant, N/m).",
        "Negative sign: force always opposes displacement (restoring force).",
        "Steady-state spring problems: find force/tension on spring first, then x = F/k.",
      ],
    },
    {
      heading: "Pseudo Force (Non-Inertial Frames)",
      points: [
        "Inertial frame: at rest or constant velocity — Newton's laws apply directly.",
        "Non-inertial (accelerating) frame: must add a pseudo force to make Newton's laws work.",
        "Pseudo force: F = −ma_frame, opposite to the frame's acceleration.",
        "Pseudo force has no reaction pair — it isn't a real interaction force.",
        "Pendulum in accelerating train: tan θ = a/g (tilts opposite to acceleration).",
      ],
    },
    {
      heading: "Equilibrium of Concurrent Forces",
      points: [
        "Translational equilibrium: vector sum of all forces = 0 (no acceleration).",
        "Two forces in equilibrium: equal magnitude, opposite direction.",
        "Three forces in equilibrium: form a closed triangle (Lami's theorem).",
        "Lami's theorem: F₁/sinα = F₂/sinβ = F₃/sinγ (angle opposite each force).",
      ],
    },
    {
      heading: "Friction — Key Formulas",
      points: [
        "Limiting (max static) friction: f_L = μₛN",
        "Kinetic friction: f_k = μ_k N (essentially constant once sliding starts).",
        "μ_k < μₛ always (kinetic friction is slightly less than limiting friction).",
        "Friction depends on N, not on apparent contact area.",
        "Angle of friction = angle of repose: tan λ = tan θ = μₛ.",
        "Acceleration down a rough incline: a = g(sinθ − μ_k cosθ).",
        "Retardation moving up a rough incline: a = g(sinθ + μ_k cosθ).",
      ],
    },
    {
      heading: "Two-Block Friction Systems — Method",
      points: [
        "Step 1: Assume blocks move together; find common acceleration aC = F/(total mass).",
        "Step 2: Find the friction force needed on the unforced block to keep that common acceleration.",
        "Step 3: Compare to the maximum limiting friction available.",
        "If required ≤ limiting → move together. If required > limiting → blocks slip; solve each block separately with kinetic friction.",
        "Pulling > pushing (easier): pulling reduces N, pushing increases N, so pushing always faces more friction.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Action-reaction pairs never appear together in the same free-body diagram.",
        "Normal reaction is NOT always equal to mg — only in simple, unaccelerated, no-extra-force cases.",
        "Pseudo force only appears for an observer INSIDE the accelerating frame, never for a ground/inertial observer.",
        "Static friction is self-adjusting (varies up to f_L); kinetic friction is constant — don't use μₛ where μ_k is needed.",
        "Check whether two blocks actually move together before assuming a single common acceleration.",
      ],
    },
  ],
};
