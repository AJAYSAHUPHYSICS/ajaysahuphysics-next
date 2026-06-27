import type { ChapterDpp } from "./kinematics";

export const circularMotionDpp: ChapterDpp = {
  chapterName: "Circular Motion",
  className: "11",
  questions: [
    {
      number: 1,
      question: "A particle completes one full revolution of a circle in 4 seconds. Find its angular velocity.",
      options: ["π/4 rad/s", "π/2 rad/s", "π rad/s", "2π rad/s"],
      correctIndex: 1,
      solution: "ω = 2π/T = 2π/4 = π/2 rad/s.",
    },
    {
      number: 2,
      question: "A particle moves on a circle of radius 0.5 m with an angular velocity of 4 rad/s. Find its linear speed.",
      options: ["1 m/s", "2 m/s", "4 m/s", "8 m/s"],
      correctIndex: 1,
      solution: "v = rω = 0.5 × 4 = 2 m/s.",
    },
    {
      number: 3,
      question: "A particle moves in a circle of radius 2 m with a constant speed of 10 m/s. Find its centripetal acceleration.",
      options: ["5 m/s²", "20 m/s²", "50 m/s²", "100 m/s²"],
      correctIndex: 2,
      solution: "a_c = v²/r = 10²/2 = 100/2 = 50 m/s².",
    },
    {
      number: 4,
      question: "A particle moves in a circle of radius 2 m with angular velocity 5 rad/s. Find its centripetal acceleration.",
      options: ["10 m/s²", "25 m/s²", "50 m/s²", "100 m/s²"],
      correctIndex: 2,
      solution: "a_c = ω²r = 5² × 2 = 25 × 2 = 50 m/s².",
    },
    {
      number: 5,
      question: "A fan rotates at a frequency of 2 Hz. What is its angular velocity?",
      options: ["π rad/s", "2π rad/s", "4π rad/s", "8π rad/s"],
      correctIndex: 2,
      solution: "ω = 2πf = 2π × 2 = 4π rad/s.",
    },
    {
      number: 6,
      question: "A 2 kg stone tied to a string moves in a circle of radius 1 m with speed 4 m/s. Find the tension needed in the string (assume the circle is horizontal and on a frictionless surface, so tension alone provides the centripetal force).",
      options: ["8 N", "16 N", "32 N", "64 N"],
      correctIndex: 2,
      solution: "T = mv²/r = 2 × 4²/1 = 2 × 16 = 32 N.",
    },
    {
      number: 7,
      question:
        "A car negotiates a curve of radius 40 m banked at an angle θ (assume no friction). If its speed is 20 m/s, find tanθ. (g = 10 m/s²)",
      options: ["0.5", "1.0", "1.5", "2.0"],
      correctIndex: 1,
      solution: "tanθ = v²/(Rg) = 20²/(40 × 10) = 400/400 = 1.0.",
    },
    {
      number: 8,
      question:
        "A car can safely negotiate a flat circular curve of radius 20 m at a maximum speed of 10 m/s. Find the coefficient of static friction between the tyres and the road. (g = 10 m/s²)",
      options: ["0.25", "0.5", "0.75", "1.0"],
      correctIndex: 1,
      solution: "v_max = √(μRg) ⇒ μ = v_max²/(Rg) = 10²/(20 × 10) = 100/200 = 0.5.",
    },
    {
      number: 9,
      question:
        "A conical pendulum of string length 1 m has its bob moving in a horizontal circle with the string making 60° with the vertical. Find the tension in the string for a 1 kg bob. (g = 10 m/s²)",
      options: ["5 N", "10 N", "20 N", "40 N"],
      correctIndex: 2,
      solution: "Vertical equilibrium: T cosθ = mg ⇒ T = mg/cosθ = (1 × 10)/cos60° = 10/0.5 = 20 N.",
    },
    {
      number: 10,
      question:
        "For the same conical pendulum as above (L = 1 m, θ = 60°), find the speed of the bob. (g = 10 m/s²)",
      options: ["√10 m/s", "√15 m/s", "√20 m/s", "5 m/s"],
      correctIndex: 1,
      solution:
        "v = √(Lg sinθ tanθ) = √(1 × 10 × sin60° × tan60°) = √(10 × 0.866 × 1.732) = √15 m/s ≈ 3.9 m/s.",
    },
    {
      number: 11,
      question:
        "A bucket of water is whirled in a vertical circle of radius 2 m. What is the minimum speed required at the topmost point so that the water does not spill out? (g = 10 m/s²)",
      options: ["√10 m/s", "√20 m/s", "√40 m/s", "√50 m/s"],
      correctIndex: 1,
      solution: "Minimum speed at the top: v_top = √(gl) = √(10 × 2) = √20 m/s.",
    },
    {
      number: 12,
      question:
        "A small ball tied to a string of length 2 m is to be swung in a complete vertical circle. Find the minimum speed required at the LOWEST point. (g = 10 m/s²)",
      options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
      correctIndex: 1,
      solution: "Minimum speed at the lowest point: v₀ = √(5gl) = √(5 × 10 × 2) = √100 = 10 m/s.",
    },
    {
      number: 13,
      question:
        "A 0.5 kg ball is whirled in a vertical circle of radius 2 m, given exactly the minimum possible speed at the bottom to complete the loop. Find the tension in the string at the lowest point. (g = 10 m/s²)",
      options: ["10 N", "20 N", "30 N", "60 N"],
      correctIndex: 2,
      solution: "At the minimum condition, tension at the lowest point is always T_bottom = 6mg = 6 × 0.5 × 10 = 30 N.",
    },
    {
      number: 14,
      question:
        "Using the same setup as above (minimum possible speed for completing the loop), find the tension in the string at the TOPMOST point.",
      options: ["0 N", "5 N", "10 N", "15 N"],
      correctIndex: 0,
      solution:
        "At exactly the minimum speed needed to complete the loop, the tension at the top is exactly zero — this is precisely the defining condition for the minimum case.",
    },
    {
      number: 15,
      question:
        "A ball tied to a string of length 1 m is given a speed of 3 m/s at the lowest point. What happens to the ball? (g = 10 m/s²)",
      options: [
        "It completes the full vertical circle",
        "It oscillates back and forth in the lower half of the circle",
        "It leaves the circular path partway up and becomes a projectile",
        "It moves in a straight line",
      ],
      correctIndex: 1,
      solution:
        "Check against √(2gl) = √(2×10×1) = √20 ≈ 4.47 m/s. Since 3 m/s < 4.47 m/s, the ball's speed becomes zero before the string can go slack — so it simply swings back, oscillating in the lower half.",
    },
    {
      number: 16,
      question:
        "A ball tied to a string of length 1 m is given a speed of 6 m/s at the lowest point. What happens to the ball? (g = 10 m/s²)",
      options: [
        "It completes the full vertical circle",
        "It oscillates back and forth in the lower half",
        "It leaves the circular path partway up and becomes a projectile",
        "It immediately falls straight down",
      ],
      correctIndex: 2,
      solution:
        "Check: √(2gl) = √20 ≈ 4.47 m/s and √(5gl) = √50 ≈ 7.07 m/s. Since 4.47 < 6 < 7.07, the ball rises above the centre's level but the string goes slack before it reaches the top — it leaves the circular path and continues as a projectile.",
    },
    {
      number: 17,
      question:
        "A particle moves on a circle of radius 4 m. Its speed at time t is given by v = 2t² (in m/s, t in seconds). Find its tangential acceleration at t = 2 s.",
      options: ["2 m/s²", "4 m/s²", "8 m/s²", "16 m/s²"],
      correctIndex: 2,
      solution: "a_t = dv/dt = 4t. At t = 2 s: a_t = 4 × 2 = 8 m/s².",
    },
    {
      number: 18,
      question:
        "For the same particle as above (v = 2t², r = 4 m), find its centripetal acceleration at t = 2 s.",
      options: ["8 m/s²", "16 m/s²", "32 m/s²", "64 m/s²"],
      correctIndex: 1,
      solution: "At t = 2 s, v = 2(2²) = 8 m/s. a_c = v²/r = 8²/4 = 64/4 = 16 m/s².",
    },
    {
      number: 19,
      question:
        "A wheel starts from rest and gains a constant angular acceleration of 4 rad/s². Find its angular velocity after 5 seconds.",
      options: ["5 rad/s", "10 rad/s", "20 rad/s", "40 rad/s"],
      correctIndex: 2,
      solution: "ω = ω₀ + αt = 0 + 4 × 5 = 20 rad/s.",
    },
    {
      number: 20,
      question:
        "For the same wheel as above (starting from rest, α = 4 rad/s²), find the total angular displacement after 5 seconds.",
      options: ["20 rad", "30 rad", "50 rad", "100 rad"],
      correctIndex: 2,
      solution: "θ = ω₀t + ½αt² = 0 + ½ × 4 × 5² = 2 × 25 = 50 rad.",
    },
  ],
};
