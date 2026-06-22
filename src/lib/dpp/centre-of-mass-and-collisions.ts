import type { ChapterDpp } from "./kinematics";

export const centreOfMassAndCollisionsDpp: ChapterDpp = {
  chapterName: "Centre of Mass & Collisions",
  className: "11",
  questions: [
    {
      number: 1,
      question: "Two particles of masses 2 kg and 3 kg are located at x = 0 and x = 10 m. Find the x-coordinate of their centre of mass.",
      options: ["4 m", "5 m", "6 m", "8 m"],
      correctIndex: 2,
      solution: "x_cm = (2×0 + 3×10)/(2+3) = 30/5 = 6 m.",
    },
    {
      number: 2,
      question:
        "Three particles of masses 1 kg, 2 kg, and 3 kg are placed at (0,0), (2,0), and (0,3) respectively. Find the y-coordinate of their centre of mass.",
      options: ["1.0 m", "1.5 m", "2.0 m", "3.0 m"],
      correctIndex: 1,
      solution: "y_cm = (1×0 + 2×0 + 3×3)/(1+2+3) = 9/6 = 1.5 m.",
    },
    {
      number: 3,
      question: "Find the position of the centre of mass of a uniform rod of length 6 m, measured from one end.",
      options: ["2 m", "3 m", "4 m", "6 m"],
      correctIndex: 1,
      solution: "For a uniform rod, the centre of mass is at the midpoint: x_cm = L/2 = 3 m.",
    },
    {
      number: 4,
      question:
        "A uniform disc of mass 8 kg has a smaller disc of mass 2 kg cut out from one edge, the small disc's centre being 0.3 m from the centre of the original disc. Find the distance of the centre of mass of the remaining piece from the centre of the original disc.",
      options: ["0.05 m", "0.1 m", "0.15 m", "0.3 m"],
      correctIndex: 1,
      solution:
        "Treating the cut-out as negative mass: x_cm = (Mx − mx′)/(M−m) = (8×0 − 2×0.3)/(8−2) = −0.6/6 = −0.1 m, i.e. 0.1 m on the side opposite the hole.",
    },
    {
      number: 5,
      question:
        "Two blocks of masses 4 kg and 6 kg move with velocities 3 m/s and 2 m/s respectively in the same direction. Find the velocity of their centre of mass.",
      options: ["2.0 m/s", "2.2 m/s", "2.4 m/s", "2.6 m/s"],
      correctIndex: 2,
      solution: "v_cm = (4×3 + 6×2)/(4+6) = (12+12)/10 = 2.4 m/s.",
    },
    {
      number: 6,
      question:
        "Two masses 1 kg and 2 kg have accelerations 3 m/s² and 1.5 m/s² respectively, both in the same direction. Find the acceleration of their centre of mass.",
      options: ["1.5 m/s²", "2.0 m/s²", "2.5 m/s²", "3.0 m/s²"],
      correctIndex: 1,
      solution: "a_cm = (1×3 + 2×1.5)/(1+2) = (3+3)/3 = 2.0 m/s².",
    },
    {
      number: 7,
      question:
        "A gun of mass 5 kg fires a bullet of mass 25 g with a muzzle speed of 200 m/s. Find the recoil speed of the gun.",
      options: ["0.5 m/s", "1.0 m/s", "1.5 m/s", "2.0 m/s"],
      correctIndex: 1,
      solution:
        "By momentum conservation (system starts at rest): 0.025×200 = 5×V ⟹ V = 5/5 = 1.0 m/s.",
    },
    {
      number: 8,
      question:
        "A 6 kg bomb at rest explodes into two fragments of masses 2 kg and 4 kg. If the 2 kg fragment moves at 12 m/s, find the speed of the 4 kg fragment.",
      options: ["3 m/s", "4 m/s", "6 m/s", "8 m/s"],
      correctIndex: 2,
      solution: "By momentum conservation: 2×12 = 4×v ⟹ v = 24/4 = 6 m/s.",
    },
    {
      number: 9,
      question:
        "A stationary object explodes into two parts of masses m and 4m. What is the ratio of their kinetic energies, KE_m : KE_4m?",
      options: ["1 : 4", "4 : 1", "1 : 2", "2 : 1"],
      correctIndex: 1,
      solution:
        "The two fragments have equal and opposite momenta. Since KE = p²/2m for fixed |p|, KE is inversely proportional to mass: KE_m/KE_4m = 4m/m = 4, i.e. 4:1.",
    },
    {
      number: 10,
      question:
        "Two balls collide head-on. Before collision, ball A moves at 6 m/s and ball B at 2 m/s in the same direction. After collision, A moves at 3 m/s and B at 5 m/s. Find the coefficient of restitution.",
      options: ["0.25", "0.5", "0.75", "1.0"],
      correctIndex: 1,
      solution: "e = (v₂−v₁)/(u₁−u₂) = (5−3)/(6−2) = 2/4 = 0.5.",
    },
    {
      number: 11,
      question:
        "A 3 kg ball moving at 8 m/s collides with a stationary 5 kg ball, and they stick together. Find their common velocity after collision.",
      options: ["2 m/s", "3 m/s", "4 m/s", "5 m/s"],
      correctIndex: 1,
      solution: "By momentum conservation: 3×8 = (3+5)×v ⟹ v = 24/8 = 3 m/s.",
    },
    {
      number: 12,
      question:
        "A 4 kg ball moving at 10 m/s collides elastically head-on with an identical stationary 4 kg ball. Find the velocity of the first ball after collision.",
      options: ["0 m/s", "5 m/s", "10 m/s", "−10 m/s"],
      correctIndex: 0,
      solution:
        "For an elastic collision between equal masses, the velocities are completely exchanged — the first ball stops, and the second moves off at 10 m/s.",
    },
    {
      number: 13,
      question:
        "A 9 kg ball moving at 6 m/s collides elastically head-on with a stationary 3 kg ball. Find the velocity of the 3 kg ball after collision.",
      options: ["3 m/s", "6 m/s", "9 m/s", "12 m/s"],
      correctIndex: 2,
      solution:
        "v₂ = [2m₁/(m₁+m₂)]u₁ = [2(9)/12](6) = 1.5 × 6 = 9 m/s.",
    },
    {
      number: 14,
      question:
        "A 1 kg ball moving at 5 m/s collides elastically head-on with a stationary 9 kg ball. Find the velocity of the 1 kg ball after collision.",
      options: ["−4 m/s", "−5 m/s", "0 m/s", "+1 m/s"],
      correctIndex: 0,
      solution:
        "v₁ = [(m₁−m₂)/(m₁+m₂)]u₁ = [(1−9)/10](5) = (−0.8)(5) = −4 m/s — the light ball bounces back.",
    },
    {
      number: 15,
      question:
        "A ball is dropped from a height of 4 m onto a rigid floor. If the coefficient of restitution is 0.5, find the height it reaches after the first bounce.",
      options: ["0.5 m", "1 m", "2 m", "3 m"],
      correctIndex: 1,
      solution: "h₁ = e²h = (0.5)²(4) = 0.25 × 4 = 1 m.",
    },
    {
      number: 16,
      question:
        "A ball is dropped from a height of 5 m (g = 10 m/s²) and bounces off the ground with coefficient of restitution e = 0.6. Find its speed immediately after the second bounce.",
      options: ["3.0 m/s", "3.6 m/s", "6.0 m/s", "6.6 m/s"],
      correctIndex: 1,
      solution:
        "Speed of first impact: v = √(2gh) = √(2×10×5) = 10 m/s. Speed after the second rebound: v₂ = e²v = (0.36)(10) = 3.6 m/s.",
    },
    {
      number: 17,
      question:
        "A ball collides obliquely and elastically with an identical stationary ball. If the first ball moves off at 30° to its original direction, at what angle does the second ball move off (on the other side)?",
      options: ["30°", "45°", "60°", "90°"],
      correctIndex: 2,
      solution:
        "For an elastic oblique collision between equal masses with one initially at rest, the two bodies always separate at 90° to each other: θ₁+θ₂ = 90° ⟹ θ₂ = 90°−30° = 60°.",
    },
    {
      number: 18,
      question:
        "A force acts on a 2 kg object initially at rest, changing its momentum to 10 kg·m/s in 0.5 s. Find the magnitude of the average force.",
      options: ["5 N", "10 N", "20 N", "40 N"],
      correctIndex: 2,
      solution: "F = Δp/Δt = 10/0.5 = 20 N.",
    },
  ],
};
