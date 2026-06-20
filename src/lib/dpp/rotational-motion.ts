import type { ChapterDpp } from "./kinematics";

export const rotationalMotionDpp: ChapterDpp = {
  chapterName: "System of Particles & Rotational Motion",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A wheel starts from rest and is given a uniform angular acceleration of 4 rad/s². What is its angular velocity after 5 seconds?",
      options: ["10 rad/s", "20 rad/s", "30 rad/s", "40 rad/s"],
      correctIndex: 1,
      solution: "ω = ω₀ + αt = 0 + 4(5) = 20 rad/s.",
    },
    {
      number: 2,
      question:
        "A disc rotates at a constant angular velocity of 10 rad/s. What angular displacement does it cover in 6 seconds?",
      options: ["30 rad", "40 rad", "60 rad", "80 rad"],
      correctIndex: 2,
      solution: "Constant ω, so θ = ωt = 10 × 6 = 60 rad.",
    },
    {
      number: 3,
      question:
        "A point on a rotating body is at a distance of 0.5 m from the axis. If the body's angular velocity is 8 rad/s, what is the linear speed of that point?",
      options: ["2 m/s", "4 m/s", "6 m/s", "8 m/s"],
      correctIndex: 1,
      solution: "v = ωr = 8 × 0.5 = 4 m/s.",
    },
    {
      number: 4,
      question:
        "A particle of mass 2 kg is located 0.5 m from an axis of rotation. What is its moment of inertia about that axis?",
      options: ["0.25 kg·m²", "0.5 kg·m²", "1 kg·m²", "2 kg·m²"],
      correctIndex: 1,
      solution: "I = mr² = 2 × (0.5)² = 2 × 0.25 = 0.5 kg·m².",
    },
    {
      number: 5,
      question:
        "A disc of mass 2 kg and radius 0.2 m has its moment of inertia I_CM about an axis through its centre, perpendicular to its plane. Using the parallel axis theorem, find its moment of inertia about a parallel axis 0.3 m away from the centre.",
      options: ["0.04 kg·m²", "0.22 kg·m²", "0.18 kg·m²", "0.4 kg·m²"],
      correctIndex: 1,
      solution:
        "I_CM = MR²/2 = 2(0.2)²/2 = 0.04 kg·m². By the parallel axis theorem, I = I_CM + Md² = 0.04 + 2(0.3)² = 0.04 + 0.18 = 0.22 kg·m².",
    },
    {
      number: 6,
      question:
        "The moment of inertia of a uniform disc about one of its diameters is 0.5 kg·m². Using the perpendicular axis theorem, find its moment of inertia about an axis through its centre, perpendicular to its plane.",
      options: ["0.25 kg·m²", "0.5 kg·m²", "1.0 kg·m²", "2.0 kg·m²"],
      correctIndex: 2,
      solution:
        "For a disc, the two perpendicular diameters have equal moments of inertia (symmetry), so by I_z = I_x + I_y, I_z = 2 × 0.5 = 1.0 kg·m².",
    },
    {
      number: 7,
      question:
        "A uniform rod of mass 3 kg and length 2 m rotates about a perpendicular axis through its centre. Find its radius of gyration about this axis.",
      options: ["0.33 m", "0.58 m", "0.71 m", "1.0 m"],
      correctIndex: 1,
      solution:
        "I = ML²/12 = 3(2)²/12 = 1 kg·m². K = √(I/M) = √(1/3) ≈ 0.58 m.",
    },
    {
      number: 8,
      question:
        "A force of 10 N is applied at a point 0.4 m from a pivot, making an angle of 30° with the rod. Find the magnitude of the torque produced about the pivot.",
      options: ["1 N·m", "2 N·m", "3 N·m", "4 N·m"],
      correctIndex: 1,
      solution: "τ = rF sinθ = 0.4 × 10 × sin30° = 0.4 × 10 × 0.5 = 2 N·m.",
    },
    {
      number: 9,
      question:
        "A wheel has a moment of inertia of 4 kg·m² about its axis. What torque is needed to give it an angular acceleration of 3 rad/s²?",
      options: ["6 N·m", "9 N·m", "12 N·m", "15 N·m"],
      correctIndex: 2,
      solution: "τ = Iα = 4 × 3 = 12 N·m.",
    },
    {
      number: 10,
      question:
        "A cyclist goes around a horizontal circular turn of radius 20 m at a speed of 10 m/s. Taking g = 10 m/s², at what angle to the vertical must the cyclist lean?",
      options: ["18.4°", "26.6°", "33.7°", "45°"],
      correctIndex: 1,
      solution:
        "tanθ = v²/(rg) = (10)²/(20 × 10) = 100/200 = 0.5, so θ = tan⁻¹(0.5) ≈ 26.6°.",
    },
    {
      number: 11,
      question:
        "A particle of mass 0.5 kg moves with a speed of 4 m/s along a straight line. The perpendicular distance from a fixed point O to this line is 2 m. What is the particle's angular momentum about O?",
      options: ["2 kg·m²/s", "4 kg·m²/s", "6 kg·m²/s", "8 kg·m²/s"],
      correctIndex: 1,
      solution: "L = mvr_⊥ = 0.5 × 4 × 2 = 4 kg·m²/s.",
    },
    {
      number: 12,
      question:
        "A rigid body has a moment of inertia of 2 kg·m² and is spinning at 5 rad/s. Find its angular momentum.",
      options: ["5 kg·m²/s", "10 kg·m²/s", "15 kg·m²/s", "20 kg·m²/s"],
      correctIndex: 1,
      solution: "L = Iω = 2 × 5 = 10 kg·m²/s.",
    },
    {
      number: 13,
      question:
        "A skater spinning with moment of inertia 5 kg·m² at 2 rad/s pulls her arms in, reducing her moment of inertia to 2 kg·m². No external torque acts on her. Find her new angular velocity.",
      options: ["2 rad/s", "4 rad/s", "5 rad/s", "8 rad/s"],
      correctIndex: 2,
      solution:
        "By conservation of angular momentum, I₁ω₁ = I₂ω₂ ⇒ 5 × 2 = 2 × ω₂ ⇒ ω₂ = 10/2 = 5 rad/s.",
    },
    {
      number: 14,
      question:
        "An ice skater pulls in her arms while spinning freely, reducing her moment of inertia. Which statement about her angular momentum (L) and rotational kinetic energy (KE_rot) is correct?",
      options: [
        "Both L and KE_rot increase",
        "L stays constant, KE_rot increases",
        "Both L and KE_rot stay constant",
        "L stays constant, KE_rot decreases",
      ],
      correctIndex: 1,
      solution:
        "With no external torque, L = Iω is conserved. Since I decreases, ω must increase to keep L constant. But KE_rot = ½Iω² = L²/(2I), and since L is fixed while I decreases, KE_rot increases — the extra energy comes from the work the skater does pulling her arms in.",
    },
    {
      number: 15,
      question:
        "A flywheel has a moment of inertia of 4 kg·m² and spins at 6 rad/s. Find its rotational kinetic energy.",
      options: ["36 J", "48 J", "72 J", "96 J"],
      correctIndex: 2,
      solution: "KE_rot = ½Iω² = ½ × 4 × (6)² = ½ × 4 × 36 = 72 J.",
    },
    {
      number: 16,
      question:
        "A wheel of radius 0.5 m rolls on the ground without slipping with its centre moving at 10 m/s. Find its angular velocity.",
      options: ["5 rad/s", "10 rad/s", "20 rad/s", "40 rad/s"],
      correctIndex: 2,
      solution: "For pure rolling, v_cm = ωR ⇒ ω = v_cm/R = 10/0.5 = 20 rad/s.",
    },
    {
      number: 17,
      question:
        "A solid sphere of mass 2 kg rolls without slipping with a centre-of-mass speed of 4 m/s. Find its total kinetic energy. (For a solid sphere, K²/R² = 2/5.)",
      options: ["11.2 J", "16 J", "22.4 J", "28 J"],
      correctIndex: 2,
      solution:
        "KE = ½mv²(1 + K²/R²) = ½(2)(4)²(1 + 2/5) = ½(2)(16)(1.4) = 16 × 1.4 = 22.4 J.",
    },
    {
      number: 18,
      question:
        "A solid sphere rolls down a rough incline, without slipping, starting from rest at a height of 7 m. Taking g = 10 m/s², find its speed at the bottom. (For a solid sphere, K²/R² = 2/5.)",
      options: ["8 m/s", "9 m/s", "10 m/s", "12 m/s"],
      correctIndex: 2,
      solution:
        "v = √[2gh/(1 + K²/R²)] = √[2(10)(7)/(1 + 2/5)] = √[140/1.4] = √100 = 10 m/s.",
    },
  ],
};
