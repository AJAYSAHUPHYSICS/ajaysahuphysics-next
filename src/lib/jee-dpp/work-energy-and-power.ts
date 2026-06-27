import type { ChapterDpp } from "../dpp/kinematics";

export const workEnergyAndPowerJeeDpp: ChapterDpp = {
  chapterName: "Work, Energy & Power",
  className: "11",
  questions: [
    {
      number: 1,
      question: "A variable force F = (4x + 1) N acts on a body. Find the work done as it moves from x = 0 to x = 2 m.",
      options: ["8 J", "9 J", "10 J", "12 J"],
      correctIndex: 2,
      solution: "W = ∫(4x+1)dx from 0 to 2 = [2x²+x] from 0 to 2 = (8+2) − 0 = 10 J.",
    },
    {
      number: 2,
      question:
        "A 2 kg block is dropped from 0.3 m above a vertical spring (k = 500 N/m). Find the maximum compression. (g = 10 m/s²)",
      options: ["0.1 m", "0.2 m", "0.3 m", "0.4 m"],
      correctIndex: 1,
      solution:
        "mg(h+x) = ½kx² ⇒ 2(10)(0.3+x) = ½(500)x² ⇒ 6+20x = 250x². Solving this quadratic gives the positive root x = 0.2 m.",
    },
    {
      number: 3,
      question: "A force F = 5t (N) acts on a particle moving with velocity v = 4t (m/s), both along the same line. Find the total work done from t = 0 to t = 3 s.",
      options: ["90 J", "120 J", "150 J", "180 J"],
      correctIndex: 3,
      solution: "P = Fv = 20t². Work = ∫20t² dt from 0 to 3 = [20t³/3] from 0 to 3 = 20(9) = 180 J.",
    },
    {
      number: 4,
      question: "The potential energy of a particle is U = x³ − 3x (in joules). Find the position(s) of equilibrium.",
      options: ["x = 0 only", "x = ±1", "x = ±3", "x = 1 only"],
      correctIndex: 1,
      solution: "dU/dx = 3x² − 3 = 0 ⇒ x² = 1 ⇒ x = ±1. Both are equilibrium positions (x=−1 is unstable, x=1 is stable, based on the sign of the second derivative).",
    },
    {
      number: 5,
      question:
        "A 4 kg block slides 8 m down a rough 37° incline (μ = 0.25), starting from rest. Find its speed at the bottom. (sin37°≈0.6, cos37°≈0.8, g=10 m/s²)",
      options: ["4 m/s", "6 m/s", "8 m/s", "10 m/s"],
      correctIndex: 2,
      solution: "a = g(sinθ−μcosθ) = 10(0.6−0.2) = 4 m/s². v² = 2(4)(8) = 64 ⇒ v = 8 m/s.",
    },
    {
      number: 6,
      question:
        "A 1 kg block compresses a spring (k = 250 N/m) by 0.2 m against friction (μ = 0.25) and is released. Find its speed as the spring reaches natural length. (g = 10 m/s²)",
      options: ["2 m/s", "3 m/s", "4 m/s", "5 m/s"],
      correctIndex: 1,
      solution: "PE = ½(250)(0.2²) = 5 J. Friction loss = 0.25(1)(10)(0.2) = 0.5 J. KE = 5−0.5 = 4.5 J = ½(1)v² ⇒ v² = 9 ⇒ v = 3 m/s.",
    },
    {
      number: 7,
      question: "A force of 20 N acts on a body at 37° to its displacement of 10 m. Find the work done. (cos37°≈0.8)",
      options: ["120 J", "140 J", "160 J", "200 J"],
      correctIndex: 2,
      solution: "W = Fd cosθ = 20×10×0.8 = 160 J.",
    },
    {
      number: 8,
      question: "A 4 kg body, initially at rest, has 72 J of work done on it (no friction). Find its final speed.",
      options: ["4 m/s", "5 m/s", "6 m/s", "8 m/s"],
      correctIndex: 2,
      solution: "W = ½mv² ⇒ 72 = ½(4)v² ⇒ v² = 36 ⇒ v = 6 m/s.",
    },
    {
      number: 9,
      question: "A spring with k = 600 N/m is compressed by 0.2 m. Find the elastic PE stored.",
      options: ["6 J", "9 J", "12 J", "15 J"],
      correctIndex: 2,
      solution: "U = ½kx² = ½(600)(0.04) = 12 J.",
    },
    {
      number: 10,
      question: "A force of 80 N moves an object at a constant velocity of 3 m/s in its own direction. Find the power delivered.",
      options: ["160 W", "200 W", "240 W", "280 W"],
      correctIndex: 2,
      solution: "P = Fv = 80×3 = 240 W.",
    },
    {
      number: 11,
      question: "A machine has an input power of 2000 W and a useful output of 1500 W. Find its efficiency.",
      options: ["65%", "70%", "75%", "80%"],
      correctIndex: 2,
      solution: "Efficiency = (1500/2000)×100 = 75%.",
    },
    {
      number: 12,
      question: "The work done on a particle is W = 6t³ (joules, t in seconds). Find the instantaneous power at t = 2 s.",
      options: ["36 W", "48 W", "60 W", "72 W"],
      correctIndex: 3,
      solution: "P = dW/dt = 18t². At t=2: P = 18(4) = 72 W.",
    },
  ],
};
