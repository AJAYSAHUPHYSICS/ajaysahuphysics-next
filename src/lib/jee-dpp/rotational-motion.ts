import type { ChapterDpp } from "../dpp/kinematics";

export const rotationalMotionJeeDpp: ChapterDpp = {
  chapterName: "System of Particles & Rotational Motion",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A uniform rod of length 2 m, pivoted at one end, is released from rest in a horizontal position. Find its angular acceleration the instant it becomes vertical. (g = 10 m/s²)",
      options: ["5 rad/s²", "6.5 rad/s²", "7.5 rad/s²", "10 rad/s²"],
      correctIndex: 2,
      solution: "α = (3g)/(2L)·sinθ. At the vertical position θ=90°, sinθ=1: α = (3×10)/(2×2) × 1 = 30/4 = 7.5 rad/s².",
    },
    {
      number: 2,
      question:
        "A rod of mass 4 kg, length 3 m, free to rotate about its centre, is struck by a 2 kg particle moving at 6 m/s perpendicular to it, which sticks to one end. Find the angular speed just after impact.",
      options: ["1.8 rad/s", "2.4 rad/s", "3.0 rad/s", "3.6 rad/s"],
      correctIndex: 1,
      solution:
        "I = Md²/12 + m(d/2)² = (4×9/12) + 2×(1.5²) = 3 + 4.5 = 7.5 kg·m². L = mv(d/2) = 2×6×1.5 = 18. ω = L/I = 18/7.5 = 2.4 rad/s.",
    },
    {
      number: 3,
      question: "A hollow sphere rolls without slipping down an incline from a height of 3 m. Find its speed at the bottom. (g = 10 m/s²)",
      options: ["√30 m/s", "6 m/s", "√42 m/s", "8 m/s"],
      correctIndex: 1,
      solution: "For a hollow sphere, I/(mR²) = 2/3. v² = 2gh/(1+2/3) = 2(10)(3)/(5/3) = 60×3/5 = 36, so v = 6 m/s.",
    },
    {
      number: 4,
      question:
        "A rotating disc has moment of inertia 8 kg·m² and angular speed 2 rad/s. Its moment of inertia changes to 4 kg·m² with no external torque. Find the new angular speed.",
      options: ["1 rad/s", "2 rad/s", "4 rad/s", "8 rad/s"],
      correctIndex: 2,
      solution: "I₁ω₁ = I₂ω₂ ⇒ ω₂ = (8×2)/4 = 4 rad/s.",
    },
    {
      number: 5,
      question:
        "Masses of 3 kg and 5 kg hang from a pulley of moment of inertia 0.5 kg·m² and radius 0.25 m. Find the system's acceleration. (g = 10 m/s²)",
      options: ["1 m/s²", "1.25 m/s²", "1.5 m/s²", "2 m/s²"],
      correctIndex: 1,
      solution: "I/R² = 0.5/0.0625 = 8. a = (5−3)(10)/(3+5+8) = 20/16 = 1.25 m/s².",
    },
    {
      number: 6,
      question:
        "A solid sphere of mass 4 kg rolls without slipping at 5 m/s. Find its rotational kinetic energy.",
      options: ["10 J", "20 J", "30 J", "50 J"],
      correctIndex: 1,
      solution: "KE_trans = ½(4)(25) = 50 J. For a solid sphere, KE_rot/KE_trans = (I/mR²) = 2/5, so KE_rot = (2/5)(50) = 20 J.",
    },
    {
      number: 7,
      question: "A torque of 20 N·m acts on a body of moment of inertia 4 kg·m². Find its angular acceleration.",
      options: ["2 rad/s²", "5 rad/s²", "8 rad/s²", "80 rad/s²"],
      correctIndex: 1,
      solution: "α = τ/I = 20/4 = 5 rad/s².",
    },
    {
      number: 8,
      question:
        "A ring and a disc have the same mass and radius. Find the ratio of their moments of inertia about the central axis (ring : disc).",
      options: ["1 : 1", "2 : 1", "1 : 2", "4 : 1"],
      correctIndex: 1,
      solution: "I_ring = mR², I_disc = mR²/2. Ratio = mR² : mR²/2 = 2 : 1.",
    },
    {
      number: 9,
      question: "A body has moment of inertia 50 kg·m² and mass 8 kg. Find its radius of gyration.",
      options: ["2 m", "2.5 m", "3 m", "5 m"],
      correctIndex: 1,
      solution: "I = mk² ⇒ k = √(I/m) = √(50/8) = √6.25 = 2.5 m.",
    },
    {
      number: 10,
      question: "A wheel rotates at 300 revolutions per minute. Find its angular velocity in rad/s.",
      options: ["5π rad/s", "10π rad/s", "20π rad/s", "30π rad/s"],
      correctIndex: 1,
      solution: "ω = 2πN/60 = 2π(300)/60 = 10π rad/s.",
    },
    {
      number: 11,
      question: "A constant torque of 15 N·m rotates a body through an angle of 4 rad. Find the work done by the torque.",
      options: ["30 J", "45 J", "60 J", "75 J"],
      correctIndex: 2,
      solution: "W = τθ = 15 × 4 = 60 J.",
    },
    {
      number: 12,
      question:
        "A 0.5 kg particle moves at 8 m/s along a line that passes at a perpendicular distance of 2 m from a fixed point O. Find its angular momentum about O.",
      options: ["4 kg·m²/s", "6 kg·m²/s", "8 kg·m²/s", "16 kg·m²/s"],
      correctIndex: 2,
      solution: "L = mvr (r = perpendicular distance) = 0.5 × 8 × 2 = 8 kg·m²/s.",
    },
  ],
};
