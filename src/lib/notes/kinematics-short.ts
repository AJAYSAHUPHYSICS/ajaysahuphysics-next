export type ShortNoteGroup = {
  heading: string;
  points: string[];
};

export type ChapterShortNotes = {
  chapterName: string;
  className: "11" | "12";
  groups: ShortNoteGroup[];
};

export const kinematicsShortNotes: ChapterShortNotes = {
  chapterName: "Kinematics",
  className: "11",
  groups: [
    {
      heading: "Core Definitions",
      points: [
        "Distance: scalar, total path length, never decreases.",
        "Displacement: vector, shortest path from start to end.",
        "Distance ≥ |Displacement| always.",
        "Speed = distance/time (scalar). Velocity = displacement/time (vector).",
        "Acceleration = rate of change of velocity; can act to speed up, slow down, or change direction.",
      ],
    },
    {
      heading: "Equations of Motion (constant a only)",
      points: [
        "v = u + at",
        "s = ut + ½at²",
        "v² = u² + 2as",
        "Distance in nth second: sₙ = u + (a/2)(2n − 1)",
      ],
    },
    {
      heading: "Motion Under Gravity",
      points: [
        "Dropped from rest: u = 0, a = +g (downward positive).",
        "Thrown upward: a = −g during rise and fall; time up = time down = u/g.",
        "Max height: H = u²/2g. Total time of flight (up + down to same level): T = 2u/g.",
        "Speed of projection = speed on return to the same point.",
      ],
    },
    {
      heading: "Ground-to-Ground Projectile",
      points: [
        "Horizontal velocity (u cosθ) stays constant throughout flight.",
        "Vertical velocity changes under gravity: vy = u sinθ − gt.",
        "Time of flight: T = 2u sinθ/g",
        "Max height: H = u² sin²θ/2g",
        "Range: R = u² sin2θ/g — maximum at θ = 45°.",
        "Same speed, complementary angles (θ and 90°−θ) → equal range, different height and time of flight.",
      ],
    },
    {
      heading: "Horizontal Projection from Height h",
      points: [
        "Time to land: t = √(2h/g) — depends only on h, not on launch speed.",
        "Range: R = u√(2h/g)",
        "Landing speed: v = √(u² + 2gh)",
      ],
    },
    {
      heading: "Relative Velocity",
      points: [
        "v_AB = v_A − v_B (always subtract as vectors, not magnitudes).",
        "Same direction → relative speed = difference of speeds.",
        "Opposite direction → relative speed = sum of speeds.",
        "Rain-man / river-boat: draw vector diagram, subtract velocities, then resolve angle.",
      ],
    },
    {
      heading: "River-Boat — Two Goals, Two Headings",
      points: [
        "Shortest path (reach point directly opposite): angle upstream so sinθ = v_river/v_boat. Takes longer.",
        "Shortest time: head straight across (θ = 0 to bank). Drift occurs, but crossing time = width/v_boat is minimum.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Equations of motion apply ONLY for constant acceleration — check before using them.",
        "Distance ≠ displacement unless motion is one-directional in a straight line.",
        "At the top of a vertical throw, velocity = 0 but acceleration ≠ 0 (still g, downward).",
        "Speed can never be negative; velocity can be.",
      ],
    },
  ],
};
