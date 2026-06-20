import type { ChapterDpp } from "./kinematics";

export const lawsOfMotionDpp: ChapterDpp = {
  chapterName: "Laws of Motion",
  className: "11",
  questions: [
    {
      number: 1,
      question: "A force of 15 N acts on a body of mass 3 kg, initially at rest. What is its acceleration?",
      options: ["2 m/s²", "5 m/s²", "15 m/s²", "45 m/s²"],
      correctIndex: 1,
      solution: "Using F = ma: a = F/m = 15/3 = 5 m/s².",
    },
    {
      number: 2,
      question:
        "A 0.5 kg ball moving at 10 m/s is brought to rest in 0.2 s by a goalkeeper. Find the average force applied.",
      options: ["2.5 N", "5 N", "25 N", "50 N"],
      correctIndex: 2,
      solution:
        "Change in momentum Δp = m(v − u) = 0.5(0 − 10) = −5 kg·m/s. Average force = |Δp|/Δt = 5/0.2 = 25 N.",
    },
    {
      number: 3,
      question:
        "A bat strikes a 0.2 kg ball, reversing its velocity from 20 m/s to 15 m/s in the opposite direction. Find the magnitude of the impulse delivered.",
      options: ["3 N·s", "5 N·s", "7 N·s", "9 N·s"],
      correctIndex: 2,
      solution:
        "Taking the initial direction as positive: Δp = m(v − u) = 0.2(−15 − 20) = 0.2(−35) = −7 N·s. Magnitude of impulse = 7 N·s.",
    },
    {
      number: 4,
      question:
        "A horizontal force of 20 N is applied to a 3 kg block, which is connected by a string to a 2 kg block placed behind it (the string pulls the 2 kg block along). Find the tension in the string. Surface is frictionless.",
      options: ["4 N", "6 N", "8 N", "12 N"],
      correctIndex: 2,
      solution:
        "Common acceleration: a = F/(m₁ + m₂) = 20/5 = 4 m/s². For the 2 kg block (no force applied directly to it): T = m₂a = 2 × 4 = 8 N.",
    },
    {
      number: 5,
      question:
        "Masses of 5 kg and 3 kg hang on either side of a frictionless, massless pulley (Atwood machine). Find the acceleration of the system. (g = 10 m/s²)",
      options: ["1.25 m/s²", "2.5 m/s²", "5 m/s²", "10 m/s²"],
      correctIndex: 1,
      solution:
        "a = (m₁ − m₂)g/(m₁ + m₂) = (5 − 3)(10)/(5 + 3) = 20/8 = 2.5 m/s².",
    },
    {
      number: 6,
      question:
        "A 60 kg man stands on a weighing scale inside a lift accelerating upward at 2 m/s². What does the scale read? (g = 10 m/s²)",
      options: ["480 N", "600 N", "720 N", "840 N"],
      correctIndex: 2,
      solution:
        "Apparent weight N = m(g + a) = 60(10 + 2) = 60 × 12 = 720 N.",
    },
    {
      number: 7,
      question:
        "The cable of the lift in the previous question suddenly snaps, and the lift falls freely. What does the scale now read?",
      options: ["0 N", "240 N", "480 N", "600 N"],
      correctIndex: 0,
      solution:
        "In free fall, a = g, so apparent weight N = m(g − g) = 0. The man experiences weightlessness.",
    },
    {
      number: 8,
      question:
        "A 4 kg block rests on a horizontal surface with μₛ = 0.3. A horizontal force of 10 N is applied to it. What is the force of friction acting on the block? (g = 10 m/s²)",
      options: ["0 N", "10 N", "12 N", "40 N"],
      correctIndex: 1,
      solution:
        "Limiting friction f_L = μₛN = 0.3 × 4 × 10 = 12 N. Since the applied force (10 N) is less than f_L, the block stays at rest and static friction exactly balances the applied force: f = 10 N.",
    },
    {
      number: 9,
      question:
        "A 2 kg block slides on a horizontal surface with μ_k = 0.25. Find its deceleration due to friction. (g = 10 m/s²)",
      options: ["1.25 m/s²", "2.5 m/s²", "5 m/s²", "10 m/s²"],
      correctIndex: 1,
      solution:
        "Deceleration a = μ_k g = 0.25 × 10 = 2.5 m/s² (mass cancels out, since f = μ_k mg = ma).",
    },
    {
      number: 10,
      question: "The coefficient of static friction between a body and an inclined surface is 0.5. Find the angle of repose.",
      options: ["tan⁻¹(0.25)", "tan⁻¹(0.5)", "tan⁻¹(1)", "tan⁻¹(2)"],
      correctIndex: 1,
      solution:
        "Angle of repose θ satisfies tanθ = μₛ. Here μₛ = 0.5, so θ = tan⁻¹(0.5).",
    },
    {
      number: 11,
      question:
        "A 5 kg block slides down a 30° rough incline with μ_k = 0.2. Find its acceleration down the slope. (g = 10 m/s²)",
      options: ["1.73 m/s²", "3.27 m/s²", "5 m/s²", "8.66 m/s²"],
      correctIndex: 1,
      solution:
        "a = g(sinθ − μ_k cosθ) = 10(sin30° − 0.2cos30°) = 10(0.5 − 0.2 × 0.866) = 10(0.5 − 0.173) = 10 × 0.327 = 3.27 m/s².",
    },
    {
      number: 12,
      question:
        "A spring with force constant k = 200 N/m is stretched by a force of 50 N. Find the extension produced.",
      options: ["10 cm", "15 cm", "25 cm", "50 cm"],
      correctIndex: 2,
      solution:
        "Using Hooke's law, x = F/k = 50/200 = 0.25 m = 25 cm.",
    },
    {
      number: 13,
      question:
        "A pendulum hangs from the ceiling of a train accelerating at 5 m/s². Find the angle the string makes with the vertical, as seen by a passenger inside the train. (g = 10 m/s²)",
      options: ["tan⁻¹(0.2)", "tan⁻¹(0.5)", "tan⁻¹(2)", "tan⁻¹(5)"],
      correctIndex: 1,
      solution:
        "Inside the train (non-inertial frame), tanθ = a/g = 5/10 = 0.5, so θ = tan⁻¹(0.5), tilted opposite to the train's acceleration.",
    },
    {
      number: 14,
      question: "A gun recoils backward when a bullet is fired forward from it. This is best explained by:",
      options: ["Newton's first law", "Newton's second law", "Newton's third law", "Law of gravitation"],
      correctIndex: 2,
      solution:
        "The bullet pushes forward on the gun's barrel (action), and by Newton's third law, the gun experiences an equal and opposite reaction, causing it to recoil backward.",
    },
    {
      number: 15,
      question:
        "A 5 kg block rests on a 10 kg block, which lies on a frictionless floor. The coefficient of friction between the two blocks is 0.3. A horizontal force F is applied to the bottom (10 kg) block. Find the maximum value of F for which both blocks move together. (g = 10 m/s²)",
      options: ["15 N", "30 N", "45 N", "60 N"],
      correctIndex: 2,
      solution:
        "Maximum friction available on the top block: f_L = μ(m_top)g = 0.3 × 5 × 10 = 15 N. If they move together, common acceleration a = F/(m_top + m_bottom) = F/15. Friction needed to accelerate the top block: f_req = m_top × a = 5F/15 = F/3. Setting f_req ≤ f_L: F/3 ≤ 15, so F ≤ 45 N.",
    },
    {
      number: 16,
      question:
        "A 4 kg block hangs from a string passing over a frictionless pulley and is connected to a 6 kg block resting on a rough horizontal surface (μ = 0.25). Find the acceleration of the system. (g = 10 m/s²)",
      options: ["1 m/s²", "1.5 m/s²", "2.5 m/s²", "4 m/s²"],
      correctIndex: 2,
      solution:
        "a = (m₁ − μm₂)g/(m₁ + m₂) = (4 − 0.25 × 6)(10)/(4 + 6) = (4 − 1.5)(10)/10 = 2.5 × 10/10 = 2.5 m/s².",
    },
    {
      number: 17,
      question:
        "A 2 kg block on a horizontal surface is pulled by a force of 10 N directed at 30° above the horizontal. Find the normal reaction on the block. (g = 10 m/s²)",
      options: ["5 N", "10 N", "15 N", "20 N"],
      correctIndex: 2,
      solution:
        "N = mg − F sinθ = (2 × 10) − (10 × sin30°) = 20 − (10 × 0.5) = 20 − 5 = 15 N.",
    },
    {
      number: 18,
      question:
        "A bomb of mass 10 kg at rest explodes into two fragments of mass 4 kg and 6 kg. The 4 kg fragment moves off at 6 m/s. Find the speed of the 6 kg fragment.",
      options: ["2 m/s", "4 m/s", "6 m/s", "8 m/s"],
      correctIndex: 1,
      solution:
        "By conservation of momentum, total momentum stays zero: 0 = (4 × 6) + (6 × v), where v is the velocity of the 6 kg piece (taking the 4 kg piece's direction as positive). So v = −24/6 = −4 m/s — the 6 kg fragment moves at 4 m/s in the opposite direction.",
    },
  ],
};
