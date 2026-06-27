import type { ChapterDpp } from "../dpp/kinematics";

export const lawsOfMotionJeeDpp: ChapterDpp = {
  chapterName: "Laws of Motion",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A 5 kg block rests on a 10 kg block on a frictionless floor, with μ = 0.2 between the blocks. A horizontal force F is applied to the TOP (5 kg) block. Find the maximum F for which both move together. (g = 10 m/s²)",
      options: ["10 N", "15 N", "20 N", "30 N"],
      correctIndex: 1,
      solution:
        "f_max = μ(m_top)g = 0.2×5×10 = 10 N. a_max = f_max/m_bottom = 10/10 = 1 m/s². F_max = (5+10)×1 = 15 N.",
    },
    {
      number: 2,
      question:
        "A 4 kg block on a frictionless 37° incline is connected over a pulley to a 6 kg hanging block. Find the tension in the string. (sin37°≈0.6, g=10 m/s²)",
      options: ["28.8 N", "33.6 N", "38.4 N", "42.0 N"],
      correctIndex: 2,
      solution:
        "a = (m₂g − m₁g sinθ)/(m₁+m₂) = (60−24)/10 = 3.6 m/s². T = m₂(g−a) = 6(10−3.6) = 6×6.4 = 38.4 N.",
    },
    {
      number: 3,
      question:
        "A block sits on a frictionless incline (tanθ = 0.5) fixed inside a truck. Find the truck's forward acceleration so the block doesn't slide. (g = 10 m/s²)",
      options: ["5 m/s²", "10 m/s²", "20 m/s²", "25 m/s²"],
      correctIndex: 2,
      solution: "For this setup, a = g/tanθ = 10/0.5 = 20 m/s².",
    },
    {
      number: 4,
      question:
        "Blocks of 4 kg and 6 kg are connected by a spring (k = 400 N/m) on a frictionless table. A 100 N force pulls the 6 kg block. Find the spring's extension at steady acceleration.",
      options: ["0.05 m", "0.08 m", "0.10 m", "0.12 m"],
      correctIndex: 2,
      solution: "a = F/(m₁+m₂) = 100/10 = 10 m/s². Spring force on 4 kg block = 4×10 = 40 N. x = 40/400 = 0.10 m.",
    },
    {
      number: 5,
      question:
        "A uniform string of mass 4 kg, length 4 m, has a 16 kg block tied to its bottom. It's pulled up from the top with 240 N. Find the tension at the midpoint. (g = 10 m/s²)",
      options: ["180 N", "200 N", "216 N", "228 N"],
      correctIndex: 2,
      solution:
        "a = (240 − 20×10)/20 = 40/20 = 2 m/s². Mass below midpoint = 16 + 2 = 18 kg. T_mid = 18×(10+2) = 216 N.",
    },
    {
      number: 6,
      question:
        "Three blocks (1 kg, 2 kg, 2 kg) are connected in series on a frictionless table; a 20 N force pulls the far end (the 2 kg block). Find the tension in the string nearest the 1 kg block.",
      options: ["2 N", "4 N", "6 N", "8 N"],
      correctIndex: 1,
      solution: "a = F/(total mass) = 20/5 = 4 m/s². T (nearest 1 kg block) = m₁×a = 1×4 = 4 N.",
    },
    {
      number: 7,
      question: "A force of 36 N acts on a 6 kg body. Find its acceleration.",
      options: ["4 m/s²", "6 m/s²", "8 m/s²", "9 m/s²"],
      correctIndex: 1,
      solution: "a = F/m = 36/6 = 6 m/s².",
    },
    {
      number: 8,
      question:
        "A block slides down a rough 37° incline with μ = 0.5. Find its acceleration. (sin37°≈0.6, cos37°≈0.8, g=10 m/s²)",
      options: ["1 m/s²", "2 m/s²", "3 m/s²", "4 m/s²"],
      correctIndex: 1,
      solution: "a = g(sinθ − μcosθ) = 10(0.6 − 0.5×0.8) = 10(0.6−0.4) = 2 m/s².",
    },
    {
      number: 9,
      question: "An Atwood machine has masses 5 kg and 3 kg. Find the tension in the string. (g = 10 m/s²)",
      options: ["30 N", "32.5 N", "35 N", "37.5 N"],
      correctIndex: 3,
      solution: "T = 2m₁m₂g/(m₁+m₂) = 2(5)(3)(10)/8 = 300/8 = 37.5 N.",
    },
    {
      number: 10,
      question:
        "A 0.2 kg ball hits a wall at 15 m/s and rebounds at 10 m/s. Find the magnitude of the impulse delivered by the wall.",
      options: ["1 N·s", "2 N·s", "5 N·s", "10 N·s"],
      correctIndex: 2,
      solution: "Impulse = m(v_f − (−v_i)) = 0.2(10+15) = 0.2×25 = 5 N·s.",
    },
    {
      number: 11,
      question: "A 60 kg person stands in a lift accelerating UPWARD at 2 m/s². Find the reading on a weighing scale under them. (g = 10 m/s²)",
      options: ["480 N", "600 N", "660 N", "720 N"],
      correctIndex: 3,
      solution: "N = m(g+a) = 60(10+2) = 720 N.",
    },
    {
      number: 12,
      question:
        "A 50 N force pushes a 4 kg block, which pushes a 6 kg block in front of it on a frictionless floor. Find the contact force between the two blocks.",
      options: ["15 N", "20 N", "25 N", "30 N"],
      correctIndex: 3,
      solution:
        "a = F/(m₁+m₂) = 50/10 = 5 m/s². The contact force must supply exactly enough push to accelerate the FRONT block (6 kg, the one with no direct applied force) at this same rate: contact force = 6×5 = 30 N.",
    },
  ],
};
