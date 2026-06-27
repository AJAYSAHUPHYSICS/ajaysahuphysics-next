import type { ChapterDpp } from "../dpp/kinematics";

export const circularMotionJeeDpp: ChapterDpp = {
  chapterName: "Circular Motion",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A road of radius 90 m is banked at an angle whose tangent is 0.6. The coefficient of friction between tyres and road is 0.25. Find the maximum safe speed. (g = 10 m/s²)",
      options: ["20 m/s", "25 m/s", "30 m/s", "35 m/s"],
      correctIndex: 2,
      solution:
        "v_max = √[Rg(tanθ+μ)/(1−μtanθ)] = √[90×10×(0.6+0.25)/(1−0.25×0.6)] = √[900×0.85/0.85] = √900 = 30 m/s.",
    },
    {
      number: 2,
      question:
        "A 1 kg bob moves in a vertical circle of radius 2 m on a string with speed 10 m/s at the lowest point. Find the tension when the string makes 120° with the lowest point.",
      options: ["10 N", "15 N", "20 N", "25 N"],
      correctIndex: 1,
      solution:
        "T = mv₀²/l − 2mg + 3mg cosθ = (1×100/2) − 2(1)(10) + 3(1)(10)cos120° = 50 − 20 + 30(−0.5) = 50 − 20 − 15 = 15 N.",
    },
    {
      number: 3,
      question:
        "A conical pendulum has a bob of mass 3 kg, with the string making 60° with the vertical. Find the tension in the string. (g = 10 m/s²)",
      options: ["30 N", "45 N", "60 N", "75 N"],
      correctIndex: 2,
      solution: "T cosθ = mg ⇒ T = mg/cosθ = (3×10)/cos60° = 30/0.5 = 60 N.",
    },
    {
      number: 4,
      question:
        "Two particles move on the same circle of radius 3 m in the SAME rotational sense, one at 9 m/s and the other at 6 m/s. Find the rate at which the angle between them is changing.",
      options: ["1 rad/s", "3 rad/s", "5 rad/s", "15 rad/s"],
      correctIndex: 0,
      solution:
        "ω₁ = 9/3 = 3 rad/s, ω₂ = 6/3 = 2 rad/s. Moving in the same sense, the relative angular velocity is the DIFFERENCE: 3 − 2 = 1 rad/s.",
    },
    {
      number: 5,
      question:
        "A ball on a string of length 2.5 m is given a speed of 12 m/s at the lowest point. Determine its motion. (g = 10 m/s²)",
      options: [
        "Completes the full vertical circle",
        "Oscillates in the lower half",
        "Leaves the circular path partway up",
        "Cannot be determined without the mass",
      ],
      correctIndex: 0,
      solution:
        "√(5gl) = √(5×10×2.5) = √125 ≈ 11.18 m/s. Since the given speed 12 m/s ≥ 11.18 m/s, the ball has enough speed to complete the full circle.",
    },
    {
      number: 6,
      question:
        "A particle is given a small initial speed of 2 m/s at the very top of a smooth sphere of radius 2 m and slides down the outside. At what angle (from the top) does it lose contact with the sphere? (g = 10 m/s²)",
      options: ["cos⁻¹(0.6)", "cos⁻¹(0.67)", "cos⁻¹(0.73)", "cos⁻¹(0.80)"],
      correctIndex: 2,
      solution:
        "Energy conservation: v² = v₀² + 2gR(1−cosθ). Losing contact: v² = gRcosθ. Equating and solving: cosθ = (v₀² + 2gR)/(3gR) = (4 + 40)/60 = 44/60 ≈ 0.733, so θ = cos⁻¹(0.73).",
    },
    {
      number: 7,
      question:
        "A block on a rotating disc is at a distance of 0.5 m from the centre. The coefficient of friction between block and disc is 0.2. Find the maximum angular speed of the disc before the block slips. (g = 10 m/s²)",
      options: ["1 rad/s", "2 rad/s", "4 rad/s", "5 rad/s"],
      correctIndex: 1,
      solution: "ω_max = √(μg/r) = √(0.2×10/0.5) = √4 = 2 rad/s.",
    },
    {
      number: 8,
      question:
        "A 1 kg bob moves in a vertical circle of radius 2 m with speed 12 m/s at the lowest point. Find the tension in the string at the TOPMOST point. (g = 10 m/s²)",
      options: ["10 N", "22 N", "32 N", "82 N"],
      correctIndex: 1,
      solution: "T_top = mv₀²/l − 5mg = (1×144/2) − 5(1)(10) = 72 − 50 = 22 N.",
    },
    {
      number: 9,
      question: "A car negotiates a banked curve of radius 50 m at 20 m/s, exactly at the design speed (no friction needed). Find tanθ for the bank.",
      options: ["0.4", "0.6", "0.8", "1.0"],
      correctIndex: 2,
      solution: "tanθ = v²/(Rg) = 20²/(50×10) = 400/500 = 0.8.",
    },
    {
      number: 10,
      question:
        "A particle moves in a circle of radius 5 m such that its speed increases uniformly from 0 to 10 m/s in 5 seconds. Find its tangential acceleration.",
      options: ["1 m/s²", "2 m/s²", "5 m/s²", "10 m/s²"],
      correctIndex: 1,
      solution: "a_t = Δv/Δt = (10−0)/5 = 2 m/s² (constant, since speed increases uniformly).",
    },
    {
      number: 11,
      question:
        "For the particle in the previous question, find its centripetal acceleration at the instant its speed is 10 m/s.",
      options: ["5 m/s²", "10 m/s²", "20 m/s²", "25 m/s²"],
      correctIndex: 1,
      solution: "a_c = v²/r = 10²/5 = 100/5 = 20 m/s².",
    },
    {
      number: 12,
      question:
        "A vertical circular loop of radius 1 m is set up inside a lift accelerating DOWNWARD at 4 m/s². Find the minimum speed needed at the lowest point to complete the loop, as seen by an observer inside the lift. (g = 10 m/s²)",
      options: ["√24 m/s", "√30 m/s", "√36 m/s", "6 m/s"],
      correctIndex: 1,
      solution:
        "Inside the downward-accelerating lift, g_eff = g − a = 10 − 4 = 6 m/s². Minimum speed: v₀ = √(5 g_eff l) = √(5×6×1) = √30 m/s.",
    },
  ],
};
