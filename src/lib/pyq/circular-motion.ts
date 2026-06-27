import type { ChapterPyq } from "./kinematics";

export const circularMotionPyq: ChapterPyq = {
  chapterName: "Circular Motion",
  className: "11",
  questions: [
    // ---------------- JEE Main ----------------
    {
      exam: "JEE Main 2020",
      examType: "jee-main",
      question:
        "A particle moves on a circle with constant speed. Which of the following statements correctly describes its acceleration?",
      options: [
        "Zero, since speed is constant",
        "Constant in both magnitude and direction",
        "Constant in magnitude but always directed toward the centre, so its direction keeps changing",
        "Directed tangent to the circle at every instant",
      ],
      correctIndex: 2,
      solution:
        "Even at constant speed, the velocity direction keeps changing, producing a centripetal acceleration of constant magnitude v²/r that always points toward the centre — so its direction is continuously changing even though its magnitude stays fixed.",
    },
    {
      exam: "JEE Main 2021",
      examType: "jee-main",
      question:
        "A car negotiates a curve of radius 45 m banked at angle θ, with no reliance on friction, at a speed of 15 m/s. Find tanθ. (g = 10 m/s²)",
      options: ["0.25", "0.5", "0.75", "1.0"],
      correctIndex: 1,
      solution: "tanθ = v²/(Rg) = 15²/(45 × 10) = 225/450 = 0.5.",
    },
    {
      exam: "JEE Main 2019",
      examType: "jee-main",
      question:
        "A car can safely take a flat circular turn of radius 25 m at a maximum speed of 10 m/s without skidding. Find the coefficient of static friction between the tyres and road. (g = 10 m/s²)",
      options: ["0.2", "0.4", "0.6", "0.8"],
      correctIndex: 1,
      solution: "v_max = √(μRg) ⇒ μ = v_max²/(Rg) = 100/(25 × 10) = 100/250 = 0.4.",
    },
    {
      exam: "JEE Main 2022",
      examType: "jee-main",
      question:
        "A small ball tied to a string is to be swung through a complete vertical circle of radius 8 m. Find the minimum speed required at the lowest point. (g = 10 m/s²)",
      options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
      correctIndex: 2,
      solution: "v₀(min) = √(5gl) = √(5 × 10 × 8) = √400 = 20 m/s.",
    },
    {
      exam: "JEE Main 2018",
      examType: "jee-main",
      question:
        "The angular speed of a rotating wheel increases uniformly from 5 rad/s to 15 rad/s while the wheel turns through an angular displacement of 50 rad. Find the angular acceleration.",
      options: ["1 rad/s²", "2 rad/s²", "4 rad/s²", "5 rad/s²"],
      correctIndex: 1,
      solution: "Using ω² = ω₀² + 2αθ: 15² = 5² + 2α(50) ⇒ 225 − 25 = 100α ⇒ α = 200/100 = 2 rad/s².",
    },
    {
      exam: "JEE Main 2017",
      examType: "jee-main",
      question:
        "A conical pendulum of string length 0.8 m has its bob revolving in a horizontal circle with the string making 60° with the vertical. Find its time period. (g = 10 m/s²)",
      options: ["0.2π s", "0.4π s", "0.8π s", "π s"],
      correctIndex: 1,
      solution: "T = 2π√(L cosθ/g) = 2π√(0.8 × 0.5/10) = 2π√0.04 = 2π(0.2) = 0.4π s.",
    },
    {
      exam: "JEE Main 2023",
      examType: "jee-main",
      question:
        "A vehicle moves on a road banked exactly at the angle designed for its current speed. What is the friction force acting on the vehicle from the road?",
      options: [
        "Maximum static friction, directed up the slope",
        "Maximum static friction, directed down the slope",
        "Zero — no friction is needed at the design speed",
        "Kinetic friction, since the vehicle is moving",
      ],
      correctIndex: 2,
      solution:
        "Banking is designed so that, at exactly the intended speed, the horizontal component of the normal reaction alone supplies the required centripetal force — leaving the friction force needed at exactly zero.",
    },
    {
      exam: "JEE Main 2016",
      examType: "jee-main",
      question:
        "A road is banked such that tanθ = 0.25 for a curve of radius 40 m. Find the speed for which the curve can be negotiated without depending on friction. (g = 10 m/s²)",
      options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
      correctIndex: 1,
      solution: "v = √(Rg tanθ) = √(40 × 10 × 0.25) = √100 = 10 m/s.",
    },
    // ---------------- JEE Advanced ----------------
    {
      exam: "JEE Advanced 2012",
      examType: "jee-advanced",
      question:
        "A small block is placed at rest on top of a smooth fixed sphere of radius R and given a negligible push. At what angle θ from the topmost point (measured from the centre) does the block leave the surface of the sphere?",
      options: ["cos⁻¹(1/2)", "cos⁻¹(2/3)", "cos⁻¹(3/4)", "cos⁻¹(1/3)"],
      correctIndex: 1,
      solution:
        "By energy conservation from the top: v² = 2gR(1 − cosθ). The block leaves when the normal reaction vanishes: mg cosθ = mv²/R ⇒ v² = gR cosθ. Equating: gR cosθ = 2gR(1 − cosθ) ⇒ 3cosθ = 2 ⇒ θ = cos⁻¹(2/3). Notably, this angle is independent of R and the mass of the block.",
    },
    {
      exam: "JEE Advanced 2014",
      examType: "jee-advanced",
      question:
        "A bob performs vertical circular motion on a string of length l, with speed v₀ at the lowest point, large enough that it completes the full circle. Which of the following is always true, regardless of the exact value of v₀ (as long as the circle is completed)?",
      options: [
        "T_bottom − T_top = 6mg",
        "T_bottom − T_top = 3mg",
        "T_bottom − T_top = mg",
        "T_bottom − T_top depends on v₀ and cannot be fixed",
      ],
      correctIndex: 0,
      solution:
        "Using T = mv₀²/l − 2mg + 3mg cosθ: at the bottom (θ=0), T_bottom = mv₀²/l + mg; at the top (θ=180°), T_top = mv₀²/l − 5mg. Subtracting, the mv₀²/l terms cancel exactly: T_bottom − T_top = 6mg, independent of v₀.",
    },
    {
      exam: "JEE Advanced 2015",
      examType: "jee-advanced",
      question:
        "A vertical circular loop of radius 1 m is set up inside a lift that is accelerating upward at 10 m/s². As measured by an observer inside the lift, find the minimum speed needed at the lowest point for a ball on a string to just complete the loop. (g = 10 m/s²)",
      options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
      correctIndex: 1,
      solution:
        "Inside the upward-accelerating lift, effective gravity g_eff = g + a = 10 + 10 = 20 m/s². Minimum speed at the bottom: v₀ = √(5 g_eff l) = √(5 × 20 × 1) = √100 = 10 m/s.",
    },
    {
      exam: "JEE Advanced 2011",
      examType: "jee-advanced",
      question:
        "A block of mass m rests on a rough horizontal disc at a distance r = 0.5 m from the centre. The coefficient of friction between the block and disc is 0.2. Find the maximum angular speed of the disc for which the block does not slip. (g = 10 m/s²)",
      options: ["1 rad/s", "2 rad/s", "4 rad/s", "5 rad/s"],
      correctIndex: 1,
      solution:
        "Friction alone supplies the centripetal force here: μmg ≥ mω²r ⇒ ω_max = √(μg/r) = √(0.2 × 10/0.5) = √4 = 2 rad/s.",
    },
    {
      exam: "JEE Advanced 2013",
      examType: "jee-advanced",
      question:
        "A bob on a string of length l is given exactly the special speed v₀ = √(4gl) at the lowest point of a vertical circle. At what angle φ, measured from the lowest point, does the string become slack?",
      options: ["cos⁻¹(−1/3)", "cos⁻¹(−2/3)", "cos⁻¹(1/3)", "cos⁻¹(2/3)"],
      correctIndex: 1,
      solution:
        "From the general slack condition cosφ = (2gl − v₀²)/(3gl), substituting v₀² = 4gl gives cosφ = (2gl − 4gl)/(3gl) = −2/3, so φ = cos⁻¹(−2/3) — an angle in the upper half of the circle, beyond the level of the centre.",
    },
    {
      exam: "JEE Advanced 2016",
      examType: "jee-advanced",
      question:
        "A bob of mass m undergoes vertical circular motion on a string of length l, given exactly the minimum speed needed at the bottom to complete the loop. Find the ratio of its kinetic energy at the top to its kinetic energy at the bottom.",
      options: ["1 : 5", "1 : 3", "2 : 5", "1 : 4"],
      correctIndex: 0,
      solution:
        "At minimum condition: v₀² = 5gl and v_top² = gl. KE_bottom = ½mv₀² = 2.5mgl; KE_top = ½mv_top² = 0.5mgl. Ratio KE_top : KE_bottom = 0.5 : 2.5 = 1 : 5.",
    },
  ],
};
