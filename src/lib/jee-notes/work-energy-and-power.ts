import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const workEnergyAndPowerJeeNotes: ChapterJeeNotes = {
  chapterName: "Work, Energy & Power",
  className: "11",
  intro:
    "Fully worked, multi-step problems on variable forces, spring-block energy conservation, potential energy curves, and friction combined with energy methods — the layered setups JEE Main and JEE Advanced actually test, beyond the single-formula questions in the regular DPP.",
  examples: [
    {
      title: "Illustration 1 — Work Done by a Variable Force via Integration",
      problem: "A force F = (3x² + 2x) N acts on a body along the x-axis. Find the work done as it moves from x = 1 m to x = 3 m.",
      solutionSteps: [
        "For a variable force, work done = ∫F dx over the given limits.",
        "Find the antiderivative: ∫(3x²+2x) dx = x³ + x².",
        "Evaluate at the limits: [x³+x²] from 1 to 3 = (27+9) − (1+1) = 36 − 2.",
      ],
      answer: "34 J.",
    },
    {
      title: "Illustration 2 — Block Dropped onto a Vertical Spring",
      problem:
        "A 2 kg block is dropped from a height of 0.4 m above the top of a vertical spring (k = 2000 N/m). Find the maximum compression of the spring. (g = 10 m/s²)",
      solutionSteps: [
        "Use energy conservation from the release point to the point of maximum compression x: loss in gravitational PE = gain in spring PE.",
        "mg(h+x) = ½kx², where h is the initial drop height and x is the (additional) compression.",
        "Substitute: 2(10)(0.4+x) = ½(2000)x² ⇒ 20(0.4+x) = 1000x² ⇒ 8 + 20x = 1000x².",
        "Solving this quadratic (1000x² − 20x − 8 = 0) gives the physically valid (positive) root.",
      ],
      answer: "x = 0.1 m (10 cm).",
    },
    {
      title: "Illustration 3 — Power When Both Force and Velocity Vary with Time",
      problem:
        "A force F = 2t (in N) acts on a particle whose velocity is v = 3t (in m/s) at the same instant, both in the same direction. Find the instantaneous power at t = 2 s, and the total work done from t = 0 to t = 2 s.",
      solutionSteps: [
        "Instantaneous power: P = F·v = (2t)(3t) = 6t².",
        "At t = 2 s: P = 6(4) = 24 W.",
        "Total work done = ∫P dt from 0 to 2 = ∫6t² dt = [2t³] from 0 to 2 = 2(8) − 0.",
      ],
      answer: "P(2 s) = 24 W; total work from 0 to 2 s = 16 J.",
    },
    {
      title: "Illustration 4 — Classifying Equilibrium from a Potential Energy Curve",
      problem:
        "The potential energy of a particle is U = 2x³ − 9x² + 12x (in joules, x in metres). Find the equilibrium positions and classify each as stable or unstable.",
      solutionSteps: [
        "Equilibrium occurs where the force is zero: F = −dU/dx = 0, i.e., where dU/dx = 0.",
        "dU/dx = 6x² − 18x + 12 = 0 ⇒ x² − 3x + 2 = 0 ⇒ (x−1)(x−2) = 0 ⇒ x = 1 or x = 2.",
        "Classify using the second derivative: d²U/dx² = 12x − 18. At x=1: 12−18 = −6 (negative, so U is at a local MAXIMUM here). At x=2: 24−18 = +6 (positive, so U is at a local MINIMUM here).",
        "A potential energy maximum corresponds to UNSTABLE equilibrium (any small displacement pushes the particle further away); a minimum corresponds to STABLE equilibrium (small displacements are pushed back).",
      ],
      answer: "x = 1 m is unstable equilibrium; x = 2 m is stable equilibrium.",
    },
    {
      title: "Illustration 5 — Work-Energy Theorem with Friction on an Incline",
      problem:
        "A 5 kg block starts from rest and slides 8 m down a rough 37° incline (μ = 0.25). Find its speed at the bottom. (sin37°≈0.6, cos37°≈0.8, g=10 m/s²)",
      solutionSteps: [
        "Find the net acceleration down the incline: a = g(sinθ − μcosθ) = 10(0.6 − 0.25×0.8) = 10(0.6−0.2) = 4 m/s².",
        "Apply v² = u² + 2as with u = 0: v² = 2(4)(8) = 64.",
      ],
      answer: "v = 8 m/s.",
    },
    {
      title: "Illustration 6 — Spring Release with Friction, Then Sliding to a Stop",
      problem:
        "A 2 kg block compresses a spring (k = 500 N/m) by 0.2 m against a rough surface (μ = 0.25) and is released. Find (a) its speed when the spring returns to natural length, and (b) how much FURTHER it slides before stopping completely. (g = 10 m/s²)",
      solutionSteps: [
        "Spring PE stored: U = ½kx² = ½(500)(0.2²) = 10 J.",
        "Energy lost to friction while still in contact with the spring (over the same distance x): W_f = μmgx = 0.25(2)(10)(0.2) = 1 J.",
        "Remaining KE when the spring reaches natural length: KE = 10 − 1 = 9 J = ½mv² ⇒ v² = 2(9)/2 = 9 ⇒ v = 3 m/s.",
        "After leaving the spring, friction alone removes the remaining KE over an additional distance d: μmg·d = KE ⇒ d = 9/(0.25×2×10) = 9/5.",
      ],
      answer: "(a) v = 3 m/s when leaving the spring; (b) it slides an additional 1.8 m before stopping.",
    },
  ],
};
