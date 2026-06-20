export type NoteSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  formula?: { label: string; expression: string }[];
};

export type ChapterNotes = {
  chapterName: string;
  className: "11" | "12";
  intro: string;
  sections: NoteSection[];
};

export const kinematicsNotes: ChapterNotes = {
  chapterName: "Kinematics",
  className: "11",
  intro:
    "Kinematics describes motion using position, velocity, and acceleration, without asking what causes it. From the basic equations of motion through projectile motion, relative velocity, and river-boat problems, everything in this chapter builds on one idea: motion can be described completely if we know how position changes with time.",
  sections: [
    {
      heading: "1. Frame of Reference and Position",
      body:
        "Motion is always described relative to a frame of reference — a fixed point or object from which position is measured. Without a reference frame, the question \"is this object moving?\" has no meaningful answer.",
      bullets: [
        "Position is the location of an object relative to a chosen origin.",
        "Displacement is the change in position — a vector quantity with both magnitude and direction.",
        "Distance is the total path length covered — a scalar quantity, always ≥ displacement magnitude.",
      ],
    },
    {
      heading: "2. Speed and Velocity",
      body:
        "Speed tells you how fast something moves; velocity tells you how fast and in which direction.",
      bullets: [
        "Average speed = total distance / total time",
        "Average velocity = total displacement / total time",
        "Instantaneous velocity is the velocity at a specific moment — found by taking the derivative of position with respect to time.",
      ],
      formula: [
        { label: "Average velocity", expression: "v_avg = Δx / Δt" },
        { label: "Instantaneous velocity", expression: "v = dx/dt" },
      ],
    },
    {
      heading: "3. Acceleration",
      body:
        "Acceleration is the rate of change of velocity. It does not require speed to be increasing — slowing down or changing direction also counts as acceleration.",
      formula: [
        { label: "Average acceleration", expression: "a_avg = Δv / Δt" },
        { label: "Instantaneous acceleration", expression: "a = dv/dt = d²x/dt²" },
      ],
    },
    {
      heading: "4. Equations of Motion (Constant Acceleration)",
      body:
        "These three equations apply only when acceleration is constant. They are the single most exam-relevant result in this chapter — almost every numerical in JEE and NEET kinematics traces back to one of these three.",
      formula: [
        { label: "First equation", expression: "v = u + at" },
        { label: "Second equation", expression: "s = ut + ½at²" },
        { label: "Third equation", expression: "v² = u² + 2as" },
      ],
      bullets: [
        "u = initial velocity, v = final velocity, a = acceleration, t = time, s = displacement.",
        "Sign convention matters: pick one direction as positive and stay consistent for the entire problem.",
      ],
    },
    {
      heading: "5. Motion Under Gravity",
      body:
        "Free fall is a special case of constant acceleration motion, where a = g ≈ 9.8 m/s², directed downward.",
      bullets: [
        "For an object dropped from rest: u = 0, and the equations of motion apply directly with a = g.",
        "For an object thrown upward: take upward as positive, so a = −g during the rise and fall.",
        "Time to reach maximum height: t = u/g. Maximum height: h = u²/2g.",
      ],
    },
    {
      heading: "6. Relative Velocity",
      body:
        "The velocity of one object as observed from another moving object — found by vector subtraction.",
      formula: [
        { label: "Relative velocity of A with respect to B", expression: "v_AB = v_A − v_B" },
      ],
      bullets: [
        "Common JEE/NEET application: rain falling on a moving observer, or two trains/cars approaching or moving apart.",
      ],
    },
    {
      heading: "7. Projectile Motion",
      body:
        "A projectile undergoes two independent motions simultaneously: uniform horizontal velocity, and vertically accelerated motion under gravity. These two motions don't affect each other — this independence is the key insight of the entire topic.",
      formula: [
        { label: "Time of flight", expression: "T = 2u sinθ / g" },
        { label: "Maximum height", expression: "H = u² sin²θ / 2g" },
        { label: "Horizontal range", expression: "R = u² sin(2θ) / g" },
      ],
      bullets: [
        "Range is maximum when θ = 45°.",
        "At the highest point, vertical velocity is zero, but horizontal velocity remains u·cosθ throughout the flight.",
      ],
    },
    {
      heading: "8. Horizontal Projection from a Height",
      body:
        "When a body is launched horizontally from some height h (like a ball rolling off a table), it has no initial vertical velocity. The fall happens purely due to gravity while the horizontal motion continues undisturbed at constant speed.",
      formula: [
        { label: "Time to reach the ground", expression: "t = √(2h/g)" },
        { label: "Horizontal range covered", expression: "R = u√(2h/g)" },
        { label: "Speed on landing", expression: "v = √(u² + 2gh)" },
      ],
      bullets: [
        "The time to fall depends only on the height h, not on the horizontal speed u — a body thrown faster covers more horizontal distance but takes exactly the same time to land.",
        "This is the same idea Galileo used to argue that a bullet fired horizontally and a bullet simply dropped hit the ground at the same instant.",
      ],
    },
    {
      heading: "9. Oblique Projection from a Height",
      body:
        "This is the general case: a body is launched at an angle θ from a height h, either above or below the horizontal. The vertical motion now has an initial component too, so the standard equations of motion apply with the starting height included as part of the total vertical displacement.",
      bullets: [
        "If launched at angle θ above the horizontal from height h, the body first rises, then falls the full height h plus the extra rise before reaching the ground — solved using s = ut + ½at² with s set to the total vertical drop.",
        "If launched at angle θ below the horizontal, both gravity and the initial velocity pull the body downward together, so it reaches the ground sooner than a horizontal launch from the same height.",
        "In both cases, break the velocity into horizontal (u cosθ) and vertical (u sinθ) components first, then handle each direction separately before combining.",
      ],
    },
    {
      heading: "10. Rain-Man Problems (Relative Velocity in 2D)",
      body:
        "These problems extend relative velocity into two dimensions. Rain may be falling straight down, but a person walking forward feels it hitting them at an angle — that apparent angle is the direction of the rain's velocity relative to the walker, not the rain's true velocity.",
      formula: [
        { label: "Velocity of rain relative to man", expression: "v_RM = v_R − v_M" },
      ],
      bullets: [
        "Draw the rain's velocity and the man's velocity as vectors, then subtract them as vectors (not just their magnitudes) to get the relative velocity.",
        "The angle the umbrella must be tilted equals the angle between the relative velocity vector and the vertical.",
        "If the man's speed increases, the apparent forward-tilt of the rain increases too, even though the actual rain hasn't changed direction at all.",
      ],
    },
    {
      heading: "11. River-Boat Problems",
      body:
        "A boat's velocity relative to the ground is the sum of its velocity relative to the water (set by the rower) and the river's own velocity. The boat's heading and the river's flow combine as vectors, exactly like the rain-man case.",
      formula: [
        { label: "Boat's velocity relative to ground", expression: "v_boat = v_boat/water + v_river" },
      ],
      bullets: [
        "To cross the river by the shortest possible path (landing directly opposite the start), the boat must angle itself partly upstream so the river's sideways push is exactly cancelled — this takes longer than crossing straight across.",
        "To cross the river in the shortest possible time, point the boat straight across (perpendicular to the bank); the current will carry it downstream, but the crossing itself is fastest this way.",
        "These are two different goals — minimum distance drifted vs. minimum time taken — and they almost never happen with the same heading.",
      ],
    },
  ],
};
