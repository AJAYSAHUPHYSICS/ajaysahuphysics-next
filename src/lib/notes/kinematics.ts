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
    "Kinematics describes motion using position, velocity, and acceleration, without asking what causes it. Everything in this chapter builds on one idea: motion can be described completely if we know how position changes with time.",
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
  ],
};
