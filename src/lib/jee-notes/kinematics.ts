import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const kinematicsJeeNotes: ChapterJeeNotes = {
  chapterName: "Kinematics",
  className: "11",
  intro:
    "Fully worked, multi-step kinematics problems — river-boat crossings, rain-man relative velocity, projectiles on inclined planes, and two-body meeting problems — the combined setups JEE Main and JEE Advanced favour, a level beyond the regular DPP.",
  examples: [
    {
      title: "Illustration 1 — River-Boat Problem: Shortest TIME to Cross",
      problem:
        "A boat can row at 10 km/h in still water. A river 2 km wide flows at 6 km/h. Find the minimum time to cross the river (not necessarily landing directly opposite), and the drift downstream in that time.",
      solutionSteps: [
        "For the SHORTEST TIME (as opposed to the shortest path), the boat should point straight across — perpendicular to the bank — using its full speed to cross, regardless of the current.",
        "Time to cross = width / (boat's speed straight across) = 2/10 hours.",
        "While crossing, the current still carries the boat downstream at its own speed: drift = (river speed) × (time) = 6 × 0.2.",
      ],
      answer: "Time = 0.2 h (12 minutes); Drift = 1.2 km downstream.",
    },
    {
      title: "Illustration 2 — Rain-Man Relative Velocity",
      problem:
        "Rain falls vertically downward at 10 m/s. A man walks horizontally at 10√3 m/s. Find the velocity of the rain as observed by the man (magnitude and direction).",
      solutionSteps: [
        "Set up vectors: velocity of rain (ground frame) = (0, −10); velocity of man = (10√3, 0).",
        "Velocity of rain relative to man = (velocity of rain) − (velocity of man) = (0 − 10√3, −10 − 0) = (−10√3, −10).",
        "Magnitude: √[(10√3)² + 10²] = √(300+100) = √400 = 20 m/s.",
        "Direction from the vertical: tanφ = (horizontal component)/(vertical component) = 10√3/10 = √3, so φ = 60° from the vertical.",
      ],
      answer: "20 m/s, at 60° from the vertical (tilted backward relative to the man's walking direction).",
    },
    {
      title: "Illustration 3 — Projectile Range on an Inclined Plane",
      problem:
        "A particle is projected with speed 20 m/s at 60° to the horizontal, up a plane inclined at 30° to the horizontal. Find the range measured along the incline. (g = 10 m/s²)",
      solutionSteps: [
        "For a projectile launched at angle θ (from horizontal) up an incline of angle α, the range along the incline is R = 2u²sin(θ−α)cosθ / (g cos²α).",
        "Substitute θ = 60°, α = 30°, u = 20: R = 2(20)²sin(30°)cos(60°) / [10 × cos²(30°)].",
        "Numerator: 2(400)(0.5)(0.5) = 200. Denominator: 10 × 0.75 = 7.5.",
        "R = 200/7.5 = 80/3.",
      ],
      answer: "80/3 m ≈ 26.7 m along the incline.",
    },
    {
      title: "Illustration 4 — Two Bodies Meeting Mid-Air",
      problem:
        "A stone is dropped from rest from a height of 60 m at the same instant a ball is thrown straight up from the ground below it with speed 20 m/s. Find the time and height at which they meet. (g = 10 m/s²)",
      solutionSteps: [
        "Both objects experience the same downward acceleration g, so the gap between them closes at a rate determined only by their initial velocities (the gravity terms cancel when comparing positions).",
        "Set up: position of stone (from top) = (1/2)gt²; position of ball (from ground) = ut − (1/2)gt². They meet when these add up to the full height h: ut = h ⇒ t = h/u = 60/20 = 3 s.",
        "Check this is valid: the ball's total time of flight is 2u/g = 4 s, and 3 s < 4 s, so the ball is still in the air at this time — the meeting is valid.",
        "Find the meeting height (measuring from the ground, using the ball's position): y = ut − (1/2)gt² = 20(3) − 5(9) = 60 − 45.",
      ],
      answer: "They meet at t = 3 s, at a height of 15 m above the ground.",
    },
    {
      title: "Illustration 5 — Displacement from a Trapezoidal Velocity-Time Graph",
      problem:
        "A particle accelerates uniformly from rest to 20 m/s in 4 s, moves at that constant speed for 3 s, then decelerates uniformly to rest in 2 s. Find the total displacement.",
      solutionSteps: [
        "Total displacement equals the total area under the velocity-time graph, which here is a trapezoid made of three pieces.",
        "Rising part (triangle): area = (1/2)(4)(20) = 40 m.",
        "Constant part (rectangle): area = (20)(3) = 60 m.",
        "Falling part (triangle): area = (1/2)(2)(20) = 20 m.",
        "Total = 40 + 60 + 20.",
      ],
      answer: "120 m.",
    },
    {
      title: "Illustration 6 — Complementary Projection Angles, Heights Compared",
      problem:
        "A projectile is launched with speed 20 m/s, once at 30° and once at 60° (complementary angles, giving equal range). Find the ratio of the maximum heights reached in the two cases. (g = 10 m/s²)",
      solutionSteps: [
        "Maximum height formula: H = u²sin²θ/(2g).",
        "For θ₁ = 30°: H₁ = 20²(sin30°)²/(2×10) = 400(0.25)/20 = 5 m.",
        "For θ₂ = 60°: H₂ = 20²(sin60°)²/(2×10) = 400(0.75)/20 = 15 m.",
        "Ratio H₁ : H₂ = 5 : 15.",
      ],
      answer: "H₁ : H₂ = 1 : 3 (even though the range is the same in both cases).",
    },
  ],
};
