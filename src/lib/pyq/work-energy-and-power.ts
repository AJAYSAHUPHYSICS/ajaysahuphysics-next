import type { ChapterPyq } from "./kinematics";

export const workEnergyAndPowerPyq: ChapterPyq = {
  chapterName: "Work, Energy & Power",
  className: "11",
  questions: [
    {
      exam: "AIPMT 2006",
      question:
        "A total of 300 J of work is done in sliding a 2 kg block up a frictioned inclined plane to a height of 10 m. Find the work done against friction. (g = 10 m/s²)",
      options: ["Zero", "100 J", "200 J", "300 J"],
      correctIndex: 1,
      solution:
        "Work done against gravity = mgh = 2 × 10 × 10 = 200 J. The remaining input work goes against friction: 300 − 200 = 100 J.",
    },
    {
      exam: "AIPMT 2006",
      question:
        "A 3 kg body, starting from rest, moves under a constant force such that its displacement varies with time as s = t²/3 (s in metres, t in seconds). Find the work done by the force in the first 2 seconds.",
      options: ["19/5 J", "8/3 J", "8/3 J", "19/3 J"],
      correctIndex: 1,
      solution:
        "Velocity v = ds/dt = 2t/3. At t = 2 s, v = 4/3 m/s. Since the body starts from rest, work done = final KE = ½(3)(4/3)² = ½(3)(16/9) = 8/3 J.",
    },
    {
      exam: "AIIMS 2008",
      question:
        "A vertical spring of force constant k rests on a table. A ball of mass m, held at height h above the spring's free end, is released and falls onto it, compressing it by a distance d. Find the net work done on the ball during this entire process.",
      options: [
        "mg(h + d) + ½kd²",
        "mg(h + d) − ½kd²",
        "mg(h − d) − ½kd²",
        "mg(h − d) + ½kd²",
      ],
      correctIndex: 1,
      solution:
        "The ball falls a total height (h + d) before reaching the point of compression d, so gravity does work mg(h + d). Over that same compression, the spring does work −½kd² on the ball (it resists the motion). Net work = mg(h + d) − ½kd².",
    },
    {
      exam: "AIPMT 2009",
      question:
        "A block of mass M hangs from the lower end of a vertical spring of force constant k. The spring is initially unstretched, and the block is released from rest. Find the maximum extension produced in the spring.",
      options: ["Mg/2k", "Mg/k", "2Mg/k", "4Mg/k"],
      correctIndex: 2,
      solution:
        "At maximum extension x, the block is momentarily at rest, so by energy conservation Mgx = ½kx², giving x = 2Mg/k.",
    },
    {
      exam: "AIPMT 2009",
      question:
        "An engine continuously pumps water through a hose, ejecting it with speed v. If m is the mass per unit length of the water jet leaving the hose, find the rate at which kinetic energy is being delivered to the water.",
      options: ["½m²v²", "½mv³", "mv³", "½mv²"],
      correctIndex: 1,
      solution:
        "Mass flow rate = (mass per length) × (speed) = mv. Rate of kinetic energy delivery = ½(mass flow rate)(v²) = ½(mv)(v²) = ½mv³.",
    },
    {
      exam: "AIPMT 2009",
      question:
        "A 1 kg body is thrown vertically upward with a speed of 20 m/s, and it momentarily comes to rest after rising 18 m. Find the energy lost to air resistance during the rise. (g = 10 m/s²)",
      options: ["10 J", "20 J", "30 J", "40 J"],
      correctIndex: 1,
      solution:
        "Initial KE = ½(1)(20²) = 200 J. PE gained at the top = mgh = 1 × 10 × 18 = 180 J. Energy lost to air resistance = 200 − 180 = 20 J.",
    },
    {
      exam: "AIPMT 2010",
      question:
        "An engine continuously pumps water through a pipe, and the water leaves with a speed of 2 m/s. If the mass of water per unit length inside the pipe is 100 kg/m, find the power of the engine.",
      options: ["800 W", "400 W", "200 W", "100 W"],
      correctIndex: 0,
      solution:
        "Mass flow rate = (mass per length) × v = 100 × 2 = 200 kg/s. Force needed = (mass flow rate) × v = 200 × 2 = 400 N. Power = Fv = 400 × 2 = 800 W.",
    },
    {
      exam: "AIPMT 2011",
      question: "The potential energy of a system increases when work is done:",
      options: [
        "Upon the system by a non-conservative force",
        "By the system against a conservative force",
        "By the system against a non-conservative force",
        "Upon the system by a conservative force",
      ],
      correctIndex: 1,
      solution:
        "Potential energy rises specifically when the system itself does work against a conservative force — that work gets stored back as PE (ΔU = −W_conservative, so PE rises when the system's own work against that force is positive).",
    },
    {
      exam: "AIPMT 2011",
      question:
        "A body is projected straight up from the Earth's surface and reaches a maximum height equal to the Earth's radius before falling back. At which point is the power delivered by the gravitational force the greatest?",
      options: [
        "At the highest point of the body's path",
        "Just before the body strikes the Earth",
        "It stays constant throughout",
        "Just after the body is launched",
      ],
      correctIndex: 1,
      solution:
        "Power delivered by gravity is F·v. Both the gravitational force (strongest near the surface) and the body's speed (maximum on return) are largest just before impact, so the power is greatest at that instant.",
    },
    {
      exam: "AIPMT 2011",
      question:
        "A force acting on a particle moving along the x-axis varies with position as follows: it rises linearly from 0 to 2 N as the particle moves from x = 0 to x = 3 m, stays constant at 2 N from x = 3 m to x = 7 m, then falls linearly from 2 N back to 0 between x = 7 m and x = 9 m, and remains zero afterward. Find the work done as the particle moves from x = 0 to x = 12 m. (Note: this question is based on a force–distance graph in the original source, reconstructed here in words as closely as the available figure allows — treat this as the weakest-verified item in this set.)",
      options: ["18 J", "21 J", "26 J", "13 J"],
      correctIndex: 3,
      solution:
        "Work = total area under the F–x graph: rising triangle (0 to 3 m) = ½(3)(2) = 3 J; rectangle (3 to 7 m) = (4)(2) = 8 J; falling triangle (7 to 9 m) = ½(2)(2) = 2 J; zero force afterward. Total = 3 + 8 + 2 = 13 J.",
    },
    {
      exam: "AIPMT (Pre) 2012",
      question:
        "The potential energy of a particle in a force field is given by U = A/r² − B/r, where A and B are positive constants and r is the distance from the centre of the field. Find the distance at which the particle is in stable equilibrium.",
      options: ["A/B", "B/A", "B/2A", "2A/B"],
      correctIndex: 3,
      solution:
        "dU/dr = −2A/r³ + B/r² = 0 ⟹ B/r² = 2A/r³ ⟹ r = 2A/B.",
    },
    {
      exam: "AIPMT (Mains) 2012",
      question:
        "A car of mass m starts from rest and accelerates such that the power delivered to it stays constant at P₀. How does its instantaneous velocity depend on time?",
      options: ["v ∝ t^(-1/2)", "v ∝ t/√m", "v ∝ t²P₀", "v ∝ t^(1/2)"],
      correctIndex: 3,
      solution:
        "From P₀ = ½m(dv²/dt), integrating with v = 0 at t = 0 gives v² = 2P₀t/m, so v ∝ t^(1/2).",
    },
    {
      exam: "NEET (UG) 2013",
      question:
        "A uniform force F = (3î + ĵ) N acts on a 2 kg particle, displacing it from position (2î + k̂) m to position (4î + 3ĵ − k̂) m. Find the work done by the force.",
      options: ["15 J", "9 J", "6 J", "13 J"],
      correctIndex: 1,
      solution:
        "Displacement Δr = (4 − 2)î + (3 − 0)ĵ + (−1 − 1)k̂ = 2î + 3ĵ − 2k̂. Since F has no k̂ component, W = F · Δr = (3)(2) + (1)(3) = 6 + 3 = 9 J.",
    },
    {
      exam: "AIPMT 2015",
      question:
        "A 10 kg block, moving along the x-axis at a constant 10 m/s, is then subjected to a retarding force F = 0.1x (in N, with x in m) as it travels from x = 20 m to x = 30 m. Find its final kinetic energy.",
      options: ["450 J", "275 J", "250 J", "475 J"],
      correctIndex: 3,
      solution:
        "Work done by the retarding force = −∫₂₀³⁰ 0.1x dx = −[0.05x²]₂₀³⁰ = −(45 − 20) = −25 J. Initial KE = ½(10)(10²) = 500 J. Final KE = 500 − 25 = 475 J.",
    },
    {
      exam: "AIPMT 2015",
      question:
        "A particle of mass m, starting from rest, is driven by a machine delivering constant power k watts. Find the force on the particle at time t.",
      options: [
        "√(2mk) · t^(1/2)",
        "√(mk) · t^(-1/2)",
        "√(mk/(2t))",
        "2√(mk) · t^(-1/2)",
      ],
      correctIndex: 2,
      solution:
        "From constant power k = ½m(dv²/dt), integrating with v = 0 at t = 0 gives v² = 2kt/m, so v = √(2kt/m). Differentiating, dv/dt = √(k/(2mt)). Force F = m(dv/dt) = m√(k/(2mt)) = √(mk/(2t)).",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "A human heart pumps 5 litres of blood per minute at an average pressure of 150 mm of mercury. Find the power of the heart. (density of mercury = 13.6 × 10³ kg/m³, g = 10 m/s²)",
      options: ["1.50 W", "1.70 W", "2.35 W", "3.0 W"],
      correctIndex: 1,
      solution:
        "Pressure = ρgh = 13.6×10³ × 10 × 0.150 = 20400 Pa. Volume flow rate = 5 L/min = (5×10⁻³)/60 m³/s ≈ 8.33×10⁻⁵ m³/s. Power = pressure × flow rate = 20400 × 8.33×10⁻⁵ ≈ 1.70 W.",
    },
    {
      exam: "AIIMS 2015",
      question:
        "A 50 kg boy jumps straight up, reaching a height of 0.8 m. Find the momentum transferred to him by the ground during the jump. (g = 10 m/s²)",
      options: ["400 kg·m/s", "200 kg·m/s", "800 kg·m/s", "500 kg·m/s"],
      correctIndex: 1,
      solution:
        "Launch speed needed for height 0.8 m: v = √(2gh) = √(2×10×0.8) = √16 = 4 m/s. Momentum transferred = mv = 50 × 4 = 200 kg·m/s.",
    },
    {
      exam: "NEET-I 2016",
      question:
        "A 1 kg body, starting from rest, moves under a time-dependent force F = (2t î + 3t² ĵ) N, where î and ĵ are unit vectors along the x and y axes. Find the power developed by the force at time t.",
      options: ["(2t² + 3t³) W", "(2t² + 4t⁴) W", "(2t³ + 3t⁴) W", "(2t³ + 3t⁵) W"],
      correctIndex: 3,
      solution:
        "Since mass = 1 kg, acceleration = F directly, so velocity v = ∫F dt = (t² î + t³ ĵ) (starting from rest). Power = F · v = (2t)(t²) + (3t²)(t³) = 2t³ + 3t⁵.",
    },
    {
      exam: "NEET-II 2016",
      question:
        "A particle moves from position (−2î + 5ĵ) m to position (4ĵ + 3k̂) m under a constant force of (4î + 3ĵ) N. Find the work done by the force.",
      options: ["5 J", "2 J", "8 J", "11 J"],
      correctIndex: 0,
      solution:
        "Displacement Δr = (0−(−2))î + (4−5)ĵ + (3−0)k̂ = 2î − ĵ + 3k̂. Since the force has no k̂ component, W = F·Δr = (4)(2) + (3)(−1) = 8 − 3 = 5 J.",
    },
    {
      exam: "NEET (UG) 2017",
      question:
        "A 1 g raindrop falls from a height of 1 km and hits the ground with a speed of 50 m/s. Taking g = 10 m/s², find (i) the work done by gravity and (ii) the work done by the resistive force of air during the fall.",
      options: [
        "(i) 1.25 J  (ii) −8.25 J",
        "(i) 100 J  (ii) 8.75 J",
        "(i) 10 J  (ii) −8.75 J",
        "(i) −10 J  (ii) −8.25 J",
      ],
      correctIndex: 2,
      solution:
        "Work by gravity = mgh = (0.001)(10)(1000) = 10 J. KE gained = ½(0.001)(50²) = 1.25 J. By the work-energy theorem, work by air resistance = ΔKE − W_gravity = 1.25 − 10 = −8.75 J.",
    },
    {
      exam: "AIIMS 2017",
      question:
        "A 20 kg block is pulled up a 37° incline at constant velocity by a force of constant power 50 W. The coefficient of kinetic friction between the block and the incline is 0.25. Find the fraction of the power that is used to overcome gravity. (g = 10 m/s², sin37° ≈ 0.6, cos37° ≈ 0.8)",
      options: ["3/4", "1/4", "1/2", "1/8"],
      correctIndex: 0,
      solution:
        "At constant velocity, applied force F = mg sinθ + μmg cosθ = (200)(0.6) + 0.25(200)(0.8) = 120 + 40 = 160 N. Speed v = P/F = 50/160 = 0.3125 m/s. Power against gravity = (mg sinθ)v = 120 × 0.3125 = 37.5 W. Fraction = 37.5/50 = 3/4.",
    },
    {
      exam: "AIIMS 2017",
      question:
        "The velocity of a 1 kg particle moving in a straight line is given by v = 25 − 2t + t² (in m/s). Find the average power delivered to the particle between t = 0 and t = 1 s.",
      options: ["49 W", "24.5 W", "−49 W", "−24.5 W"],
      correctIndex: 3,
      solution:
        "v(0) = 25 m/s, v(1) = 25 − 2 + 1 = 24 m/s. KE(0) = ½(1)(25²) = 312.5 J, KE(1) = ½(1)(24²) = 288 J. Average power = ΔKE/Δt = (288 − 312.5)/1 = −24.5 W.",
    },
  ],
};
