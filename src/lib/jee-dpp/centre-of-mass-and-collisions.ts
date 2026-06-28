import type { ChapterDpp } from "../dpp/kinematics";

export const centreOfMassAndCollisionsJeeDpp: ChapterDpp = {
  chapterName: "Centre of Mass & Collisions",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A rocket of initial mass 1000 kg burns fuel at 5 kg/s and ejects it at 2000 m/s relative to itself. Find its speed 40 s after launch, ignoring gravity.",
      options: ["√(2 ln2) × 1000 m/s", "2000 ln(5/4) m/s", "46.3 m/s", "2000 m/s"],
      correctIndex: 2,
      solution:
        "Remaining mass m = 1000 − 5(40) = 800 kg. v = v_rel·ln(m₀/m) = 2000·ln(1000/800) = 2000·ln(1.25) ≈ 2000(0.223) ≈ 46.3 m/s.",
    },
    {
      number: 2,
      question:
        "Two identical balls undergo an oblique elastic collision, with one initially at rest. If one ball moves off at 40° after the collision, find the angle of the other.",
      options: ["40°", "45°", "50°", "60°"],
      correctIndex: 2,
      solution: "For equal masses with one initially at rest, the two angles must add to 90°: θ₂ = 90° − 40° = 50°.",
    },
    {
      number: 3,
      question:
        "A uniform chain (linear density 1 kg/m) falls from rest, held vertically with its lower end at the floor. Find the normal reaction on the pile when it has fallen 3 m and the falling end moves at 5 m/s. (g = 10 m/s²)",
      options: ["30 N", "45 N", "55 N", "65 N"],
      correctIndex: 2,
      solution: "N = μ(v² + gy) = 1×(25 + 30) = 55 N.",
    },
    {
      number: 4,
      question:
        "A bomb at rest splits into two fragments of mass 4 kg and 6 kg. The 4 kg piece moves at 9 m/s. Find the speed of the 6 kg piece.",
      options: ["4 m/s", "6 m/s", "9 m/s", "12 m/s"],
      correctIndex: 1,
      solution: "By momentum conservation: m₁v₁ = m₂v₂ ⇒ 4×9 = 6×v₂ ⇒ v₂ = 6 m/s.",
    },
    {
      number: 5,
      question: "A ball dropped from 8 m bounces back to a height of 2 m. Find the coefficient of restitution.",
      options: ["0.25", "0.4", "0.5", "0.75"],
      correctIndex: 2,
      solution: "e = √(h₂/h₁) = √(2/8) = √0.25 = 0.5.",
    },
    {
      number: 6,
      question:
        "A 1 kg ball moving at 9 m/s collides elastically head-on with a stationary 2 kg ball. Find the velocity of the 1 kg ball after collision.",
      options: ["−3 m/s", "0 m/s", "3 m/s", "6 m/s"],
      correctIndex: 0,
      solution: "v₁ = [(m₁−m₂)u₁]/(m₁+m₂) = [(1−2)(9)]/3 = −9/3 = −3 m/s (it bounces back).",
    },
    {
      number: 7,
      question:
        "A 3 kg ball moving at 12 m/s collides perfectly inelastically with a stationary 9 kg ball. Find their common velocity after collision.",
      options: ["2 m/s", "3 m/s", "4 m/s", "6 m/s"],
      correctIndex: 1,
      solution: "v = m₁u₁/(m₁+m₂) = (3×12)/12 = 3 m/s.",
    },
    {
      number: 8,
      question:
        "A 2 kg particle moves with velocity (3,0) m/s and a 3 kg particle moves with velocity (0,4) m/s. Find the velocity of their centre of mass.",
      options: ["(1.0, 1.6) m/s", "(1.2, 2.4) m/s", "(1.5, 2.0) m/s", "(2.0, 1.2) m/s"],
      correctIndex: 1,
      solution:
        "v_cm = (m₁v₁+m₂v₂)/(m₁+m₂). x: (2×3+3×0)/5 = 6/5 = 1.2. y: (2×0+3×4)/5 = 12/5 = 2.4. So v_cm = (1.2, 2.4) m/s.",
    },
    {
      number: 9,
      question:
        "A 2 kg ball moving at 10 m/s collides perfectly inelastically with a stationary 3 kg ball. Find the kinetic energy lost in the collision.",
      options: ["30 J", "45 J", "60 J", "75 J"],
      correctIndex: 2,
      solution:
        "v_common = (2×10)/5 = 4 m/s. KE_initial = ½(2)(10²) = 100 J. KE_final = ½(5)(4²) = 40 J. Loss = 100 − 40 = 60 J.",
    },
    {
      number: 10,
      question:
        "A 0.5 kg ball hits a wall at 10 m/s and rebounds with coefficient of restitution 0.6. Find the impulse delivered by the wall.",
      options: ["5 N·s", "6 N·s", "7 N·s", "8 N·s"],
      correctIndex: 3,
      solution: "Rebound speed = e×u = 0.6×10 = 6 m/s. Impulse = m(v+u) = 0.5(6+10) = 0.5×16 = 8 N·s.",
    },
    {
      number: 11,
      question:
        "A rocket (ignore gravity) has initial mass 500 kg and final mass 100 kg, ejecting fuel at 1500 m/s relative to itself. Find its final speed (starting from rest).",
      options: ["1500 m/s", "1750 m/s", "2414 m/s", "3000 m/s"],
      correctIndex: 2,
      solution: "v = v_rel·ln(m₀/m) = 1500·ln(500/100) = 1500·ln(5) ≈ 1500(1.609) ≈ 2414 m/s.",
    },
    {
      number: 12,
      question:
        "Two 5 kg balls move toward each other, one at 4 m/s and the other at 2 m/s (opposite direction). They collide and stick together. Find their common velocity after collision.",
      options: ["0.5 m/s", "1 m/s", "1.5 m/s", "2 m/s"],
      correctIndex: 1,
      solution:
        "Taking the first ball's direction as positive: v = (5×4 + 5×(−2))/10 = (20−10)/10 = 1 m/s, in the direction of the first ball.",
    },
  ],
};
