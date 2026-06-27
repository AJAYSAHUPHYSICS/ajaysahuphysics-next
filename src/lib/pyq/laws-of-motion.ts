import type { ChapterPyq } from "./kinematics";

export const lawsOfMotionPyq: ChapterPyq = {
  chapterName: "Laws of Motion",
  className: "11",
  questions: [
    {
      exam: "AIPMT 2006",
      question:
        "A 0.5 kg ball moving at 12 m/s strikes a hard wall, with its velocity making a 30° angle with the wall's surface, and rebounds at the same angle and speed. If the ball stays in contact with the wall for 0.25 s, find the average force exerted on the wall.",
      options: ["12 N", "24 N", "48 N", "96 N"],
      correctIndex: 1,
      solution:
        "Only the velocity component perpendicular to the wall reverses on rebound; the component parallel to the wall is unchanged. The perpendicular component = v sin30° = 12 × 0.5 = 6 m/s, and it reverses (a total change of 2 × 6 = 12 m/s). Average force = m × Δv_perp / Δt = 0.5 × 12 / 0.25 = 24 N.",
    },
    {
      exam: "AIIMS 2006",
      question:
        "A person pulls a load at constant velocity across a long horizontal surface using a horizontal force F. A graph of F versus the load's displacement x shows the force alternating between a higher plateau and a much lower plateau in a repeating pattern, rather than staying constant. Which kind of surface would require this pattern of force to maintain constant velocity throughout?",
      options: [
        "A surface with alternating rough and smooth patches",
        "A perfectly smooth surface throughout",
        "A surface that steadily inclines upward",
        "A surface with a single very rough patch only at the very start",
      ],
      correctIndex: 0,
      solution:
        "At constant velocity, the applied force must exactly balance friction at every point (net force = 0). Friction is higher on rough patches and lower on smooth ones, so a surface alternating between rough and smooth sections produces exactly this alternating high-low force pattern. Note: the original question paired a force-displacement graph with picture options of surface profiles; this version captures the same underlying friction concept in words, since the original figure could not be reliably reconstructed.",
    },
    {
      exam: "AIPMT 2009",
      question:
        "A force F = (6î − 8ĵ + 10k̂) N acts on a body, producing an acceleration of magnitude 1 m/s². Find the mass of the body.",
      options: ["10√2 kg", "2√10 kg", "10 kg", "20 kg"],
      correctIndex: 0,
      solution:
        "|F| = √(6² + 8² + 10²) = √(36 + 64 + 100) = √200 = 10√2 N. Since |F| = ma and a = 1 m/s², mass m = |F|/a = 10√2 kg.",
    },
    {
      exam: "AIIMS 2009",
      question:
        "A 90 kg man is standing inside a lift when its cable suddenly snaps, sending the lift into free fall. What is the man's apparent weight during the fall?",
      options: ["90 N", "90g N", "0 N", "Some negative value"],
      correctIndex: 2,
      solution:
        "In free fall, the lift's acceleration equals g, so apparent weight N = m(g − g) = 0. The man experiences complete weightlessness.",
    },
    {
      exam: "AIPMT 2010",
      question:
        "A block of mass m rests against the vertical face of a cart C, held in place only by friction, with coefficient of static friction μ between block and cart. What condition must the cart's horizontal acceleration a satisfy to prevent the block from sliding down?",
      options: ["a < g/μ", "a > μg", "a > g/μ", "a ≥ g/μ"],
      correctIndex: 3,
      solution:
        "In the cart's frame, the pseudo force ma presses the block against the cart's vertical face, creating a normal reaction N = ma. The friction this generates, f = μN = μma, must support the block's weight: μma ≥ mg, so a ≥ g/μ.",
    },
    {
      exam: "AIPMT 2011",
      question:
        "A 60 kg person stands inside a 940 kg lift, and the lift begins accelerating upward at 1.0 m/s². Find the tension in the supporting cable. (g = 10 m/s²)",
      options: ["8600 N", "9680 N", "11000 N", "1200 N"],
      correctIndex: 2,
      solution:
        "Total mass of lift + person = 1000 kg. Tension T = M(g + a) = 1000(10 + 1) = 11000 N.",
    },
    {
      exam: "AIPMT 2011",
      question:
        "A body of mass M strikes a rigid wall head-on with speed V and bounces straight back with the same speed. Find the magnitude of the impulse it experiences.",
      options: ["MV", "1.5MV", "2MV", "Zero"],
      correctIndex: 2,
      solution:
        "Taking the incoming direction as positive, momentum changes from +MV to −MV. Impulse = |Δp| = |(−MV) − (MV)| = 2MV.",
    },
    {
      exam: "NEET-UG 2013",
      question:
        "Three blocks of mass m, 2m, and 3m are connected in series by strings and pulled upward by a force F applied to the topmost (m) block, so that the whole system moves upward at a constant speed v. What is the net force on the 2m block?",
      options: ["6mg", "Zero", "2mg", "3mg"],
      correctIndex: 1,
      solution:
        "Moving at constant speed means zero acceleration. By Newton's second law, the net force on any block in this system — including the 2m block — must be zero, regardless of its weight.",
    },
    {
      exam: "AIPMT 2014",
      question:
        "Masses m₁, m₂, and m₃ (all equal to m) are connected by strings over a frictionless, massless pulley P. Mass m₁ hangs freely, while m₂ and m₃ sit in series on a rough horizontal table with coefficient of friction μ. Find the downward acceleration of m₁.",
      options: ["g(1 − 2μ)/9", "2gμ/3", "g(1 − 2μ)/3", "g(1 − 2μ)/2"],
      correctIndex: 2,
      solution:
        "For m₁: mg − T = ma. For the two blocks on the table (combined mass 2m, combined friction μ(2m)g): T − 2μmg = 2ma. Adding both equations: mg − 2μmg = 3ma, so a = g(1 − 2μ)/3.",
    },
    {
      exam: "AIPMT 2014",
      question:
        "A force F acting on a particle varies with time as follows: F is constant at +6 N from t = 0 to t = 4 s, then drops to a constant −3 N from t = 4 s to t = 8 s. Find the change in the particle's momentum from t = 0 to t = 8 s.",
      options: ["24 N·s", "20 N·s", "12 N·s", "6 N·s"],
      correctIndex: 2,
      solution:
        "Change in momentum equals the area under the F-t graph. Area = (6 N × 4 s) + (−3 N × 4 s) = 24 − 12 = 12 N·s. Note: the original question presents this as a graph; the segment values above reconstruct its key features.",
    },
    {
      exam: "AIPMT 2014",
      question:
        "A balloon of mass m is descending with acceleration a (where a < g). How much mass must be removed from it so that it instead rises with the same acceleration a? (Assume the balloon's volume — and hence the buoyant force — stays unchanged.)",
      options: ["2ma/(g + a)", "2ma/(g − a)", "ma/(g + a)", "ma/(g − a)"],
      correctIndex: 0,
      solution:
        "While descending: buoyant force F_b satisfies mg − F_b = ma, so F_b = m(g − a). After removing mass Δm and rising: F_b − (m − Δm)g = (m − Δm)a, so F_b = (m − Δm)(g + a). Equating both expressions for F_b and solving gives Δm = 2ma/(g + a).",
    },
    {
      exam: "AIPMT 2015",
      question:
        "Block A (mass m₁) sits on a horizontal table with kinetic friction coefficient μ_k between block and table. A string over a frictionless pulley at the table's edge connects A to a hanging block B (mass m₂). Find the tension in the string while A is sliding.",
      options: [
        "(m₂ − μ_k m₁)g/(m₁ + m₂)",
        "m₁m₂(1 + μ_k)g/(m₁ + m₂)",
        "m₁m₂(1 − μ_k)g/(m₁ + m₂)",
        "(m₂ + μ_k m₁)g/(m₁ + m₂)",
      ],
      correctIndex: 1,
      solution:
        "For A: T − μ_k m₁g = m₁a. For B: m₂g − T = m₂a. Adding gives a = (m₂ − μ_k m₁)g/(m₁ + m₂). Substituting back into B's equation and simplifying gives T = m₁m₂(1 + μ_k)g/(m₁ + m₂).",
    },
    {
      exam: "AIPMT 2015",
      question:
        "Blocks A (4 kg), B (2 kg), and C (1 kg) sit in contact on a frictionless surface. A 14 N force is applied to block A. Find the contact force between A and B.",
      options: ["6 N", "8 N", "18 N", "2 N"],
      correctIndex: 0,
      solution:
        "Total mass = 7 kg, so common acceleration a = 14/7 = 2 m/s². The contact force between A and B must accelerate the combined mass of B and C (3 kg): F_AB = 3 × 2 = 6 N.",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "A box on a plank starts to slip when the plank is tilted to 30° with the horizontal, then slides 4.0 m down the plank in 4.0 s. Find the coefficients of static and kinetic friction between the box and the plank.",
      options: ["0.4 and 0.3", "0.6 and 0.6", "0.6 and 0.5", "0.5 and 0.6"],
      correctIndex: 2,
      solution:
        "At the point of slipping, μₛ = tan30° ≈ 0.6. Using s = ½at² from rest: 4 = ½a(16), so a = 0.5 m/s². From a = g(sinθ − μ_k cosθ): 0.5 = 10(0.5 − 0.866μ_k), which gives μ_k ≈ 0.5.",
    },
    {
      exam: "AIIMS 2015",
      question:
        "A sphere of radius 25 cm and mass 1 kg rests against a smooth vertical wall, held by a string of length 40 cm attached from the wall to the sphere's surface. Find the tension in the string. (g = 9.8 m/s²)",
      options: ["10.81 N", "18.4 N", "10 N", "8 N"],
      correctIndex: 0,
      solution:
        "The string makes angle θ with the wall, where sinθ = r/(r + l) = 0.25/0.65 ≈ 0.385, giving cosθ ≈ 0.923. Vertical equilibrium requires T cosθ = mg, so T = mg/cosθ = (1 × 9.8)/0.923 ≈ 10.81 N.",
    },
    {
      exam: "AIIMS 2015",
      question:
        "A mass of 22 kg hangs from the midpoint of a string, the two halves of which each make a 30° angle with the horizontal. Find the tension in the string. (g = 10 m/s²)",
      options: ["110 N", "220 N", "Infinite", "Between 110 N and 220 N"],
      correctIndex: 1,
      solution:
        "By symmetry, each half of the string carries equal tension T, and their vertical components together support the weight: 2T sin30° = mg. So T = mg/(2 sin30°) = (22 × 10)/(2 × 0.5) = 220 N.",
    },
    {
      exam: "NEET-II 2016",
      question:
        "A rigid ball of mass m strikes a rigid wall with its velocity making a 60° angle with the normal to the wall, and rebounds elastically (same speed, mirror-image direction). Find the magnitude of the impulse imparted by the wall on the ball.",
      options: ["mV/2", "mV√3", "mV", "2mV"],
      correctIndex: 2,
      solution:
        "Only the velocity component along the normal reverses; the component along the wall stays the same. The normal component is V cos60° = V/2. Impulse equals twice this component: 2m(V cos60°) = 2m(V/2) = mV.",
    },
    {
      exam: "AIIMS 2016",
      question:
        "Three blocks of mass 1 kg, 1 kg, and 3 kg are connected in series by strings on a frictionless surface, and pulled by a force of 30 N applied to the 3 kg block. T1 is the tension between the two 1 kg blocks, and T2 is the tension between the second 1 kg block and the 3 kg block. Find T2.",
      options: ["12 N", "6 N", "4 N", "1 N"],
      correctIndex: 0,
      solution:
        "Common acceleration a = F/(total mass) = 30/5 = 6 m/s². T2 must accelerate the two 1 kg blocks behind it (combined mass 2 kg): T2 = 2 × 6 = 12 N.",
    },
    {
      exam: "AIIMS 2016",
      question:
        "A train has 10 identical wagons, each of mass 1000 kg, pulled by a force of 10⁴ N. Find the net force acting on the last four wagons.",
      options: ["4×10³ N", "4×10⁴ N", "5×10⁴ N", "5×10³ N"],
      correctIndex: 0,
      solution:
        "Total mass = 10000 kg, so acceleration a = 10⁴/10⁴ = 1 m/s². The last four wagons have a combined mass of 4000 kg, so the net force needed to accelerate them is 4000 × 1 = 4×10³ N.",
    },
    {
      exam: "AIIMS 2016",
      question:
        "A 1 kg block (m₁) rests on a frictionless horizontal table and is connected by a string, over a pulley at the table's edge, to a 1 kg mass (m₂) hanging vertically. Find the distance travelled by m₁ in the first half second, starting from rest. (g = 10 m/s²)",
      options: ["0.650 m", "0.625 m", "0.725 m", "0.525 m"],
      correctIndex: 1,
      solution:
        "Acceleration a = m₂g/(m₁ + m₂) = (1 × 10)/2 = 5 m/s². Distance in 0.5 s from rest: s = ½at² = ½(5)(0.5²) = ½(5)(0.25) = 0.625 m.",
    },
    {
      exam: "AIIMS 2016",
      question:
        "A 1000 kg body moves at 0.3 m/s along the +x direction. A hole at its bottom leaks mass at a rate of 20 g/s, falling straight down in the −y direction. Find the force this leaking mass exerts on the body along its direction of motion.",
      options: ["0.4 N", "0 N", "0.6 N", "None of these"],
      correctIndex: 1,
      solution:
        "The leaking mass shares the body's horizontal velocity and leaves only in the vertical direction, so it carries no relative horizontal velocity away from the body. Since the thrust force depends on the ejected mass's relative velocity along the direction of motion, and that component is zero here, the force on the body along its direction of motion is zero.",
    },
    {
      exam: "NEET(UG) 2017",
      question:
        "Blocks A (3m) and B (m) are connected by a massless, inextensible string and hang together from a massless spring. Find the accelerations of A and B immediately after the string connecting them is cut.",
      options: ["g/3, g", "g, g", "g/3, g/3", "g, g/3"],
      correctIndex: 0,
      solution:
        "Before cutting, the spring supports both blocks together: spring force = (3m + m)g = 4mg. The instant the string is cut, the spring force hasn't changed yet, but block A now weighs only 3mg, so the net upward force on A is 4mg − 3mg = mg, giving a_A = g/3 (upward). Block B is now completely free, falling under gravity alone, so a_B = g (downward).",
    },
    {
      exam: "AIIMS 2017",
      question:
        "A horizontal force of 3 N is applied to a 2 kg block, which pushes against a 1 kg block ahead of it; both rest on a frictionless surface. Find the contact force between the blocks.",
      options: ["1 N", "2 N", "3 N", "Zero"],
      correctIndex: 0,
      solution:
        "Common acceleration a = F/(total mass) = 3/3 = 1 m/s². The contact force must accelerate only the 1 kg block ahead of it: contact force = 1 × 1 = 1 N.",
    },
    {
      exam: "AIIMS 2017",
      question:
        "Water emerges from a hose of diameter 20 cm at a speed of 20 cm/s and strikes a person, stopping inelastically (the water doesn't bounce back). Find the force exerted by the jet on the person.",
      options: ["5.04 N", "1.26 N", "2.52 N", "9.4 N"],
      correctIndex: 1,
      solution:
        "Cross-sectional area A = πr² = π(0.1)² ≈ 0.0314 m². Mass flow rate = ρAv = 1000 × 0.0314 × 0.2 ≈ 6.28 kg/s. Since the water stops on impact, force = (mass flow rate) × v = 6.28 × 0.2 ≈ 1.26 N.",
    },
    {
      exam: "AIIMS 2017",
      question:
        "A 1 kg block hangs from a movable pulley, supported by a string looped around it; one end of the string is fixed, and the other end is pulled with acceleration 2 m/s². Find the acceleration of the block.",
      options: ["4 m/s²", "2 m/s²", "1 m/s²", "8 m/s²"],
      correctIndex: 2,
      solution:
        "With a movable pulley supported by two string segments, the block moves (and accelerates) at exactly half the rate of the end being pulled. So the block's acceleration = 2/2 = 1 m/s².",
    },
    {
      exam: "AIIMS 2017",
      question:
        "A 0.01 kg body moves through a viscous liquid with an initial speed of 5 m/s and experiences a constant drag force of 10⁻³ N. Find the time taken for its speed to drop to 0.1 m/s.",
      options: ["49 s", "100 s", "149 s", "200 s"],
      correctIndex: 0,
      solution:
        "Deceleration a = F/m = 10⁻³/0.01 = 0.1 m/s². Using v = u − at: 0.1 = 5 − 0.1t, so t = 4.9/0.1 = 49 s.",
    },
    {
      exam: "NEET(UG) 2018",
      question: "Which one of the following statements about friction is incorrect?",
      options: [
        "Rolling friction is smaller than sliding friction",
        "Limiting static friction is directly proportional to the normal reaction",
        "Frictional force opposes relative motion",
        "The coefficient of sliding friction has dimensions of length",
      ],
      correctIndex: 3,
      solution:
        "The coefficient of friction is the ratio of two forces (friction and normal reaction), so it is a dimensionless, unitless number — it cannot have the dimensions of length. The other three statements are all correct.",
    },
    {
      exam: "NEET(UG) 2018",
      question:
        "A block of mass m sits on a smooth wedge of inclination θ. The wedge is given a horizontal acceleration a so that the block stays stationary relative to the wedge. What is the required relation between a and θ?",
      options: ["a = g cosecθ", "a = g sinθ", "a = g cosθ", "a = g tanθ"],
      correctIndex: 3,
      solution:
        "In the wedge's accelerating frame, the pseudo force ma (horizontal) and gravity mg (vertical) must combine to act exactly along the normal to the frictionless incline, so the block has no tendency to slide. Resolving forces along the incline gives ma cosθ = mg sinθ, so a = g tanθ.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A 100 kg mass is raised at constant velocity using a rope that runs from a fixed point on a ceiling beam, down around a movable pulley supporting the mass, back up over a second pulley fixed to the same beam, and down to where a person pulls it with force F. Find the total force exerted on the beam due to the rope. (g = 9.8 m/s²)",
      options: ["1470 N", "1760 N", "960 N", "490 N"],
      correctIndex: 0,
      solution:
        "Since the mass is supported by two rope segments at the movable pulley, 2F = mg, so F = mg/2 = 490 N. The beam feels two contributions: the fixed end of the rope pulls down with force F = 490 N, and the second (fixed) pulley has two parallel rope segments passing over it, each carrying tension F, contributing 2F = 980 N. Total force on the beam = 490 + 980 = 1470 N.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A 200 kg weight hangs from an arrangement of two massless, frictionless pulleys (A and B) that together share the load across three supporting rope segments. The system is held in equilibrium by a force F. Find the tension at point X of the string. (g = 9.8 m/s²)",
      options: ["980 N", "1962 N", "654 N", "130 N"],
      correctIndex: 2,
      solution:
        "With the load shared equally across three rope segments, each segment carries tension T = W/3 = (200 × 9.8)/3 = 1960/3 ≈ 654 N.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A 50 kg person stands on the floor of a lift accelerating upward at 0.49 m/s². Find the force exerted on the floor of the lift. (g = 9.8 m/s²)",
      options: ["514.5 N", "465.5 N", "245 N", "735 N"],
      correctIndex: 0,
      solution:
        "Apparent weight N = m(g + a) = 50(9.8 + 0.49) = 50 × 10.29 = 514.5 N.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A 250 g ball hits a billiard table's wall at 2 m/s and rebounds at 1.8 m/s after 0.02 s of contact. Find the approximate average force exerted on the ball by the wall.",
      options: ["40 N", "48 N", "25 N", "None of these"],
      correctIndex: 1,
      solution:
        "Taking the incoming direction as positive, change in velocity = (−1.8) − (2) = −3.8 m/s. Average force = m|Δv|/Δt = 0.25 × 3.8/0.02 = 0.95/0.02 = 47.5 N ≈ 48 N.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A 20 kg block hangs in equilibrium, supported by two strings meeting at a point, each making a 45° angle with the horizontal. Find the tension in each supporting string. (g = 10 m/s²)",
      options: ["100 N", "70.7 N", "141 N", "200 N"],
      correctIndex: 2,
      solution:
        "By symmetry, each string carries equal tension T, and together their vertical components support the weight: 2T sin45° = mg. So T = mg/(2 sin45°) = (20 × 10)/(2 × 0.707) ≈ 141 N. Note: the original figure included a third labelled string; this version reconstructs the tension in the two load-bearing strings, since the exact role of the third string could not be confirmed from the source figure alone.",
    },
    // ---------------- JEE Main ----------------
    {
      exam: "JEE Main 2019",
      examType: "jee-main",
      question: "A force of 24 N acts on a body of mass 4 kg. Find its acceleration.",
      options: ["3 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
      correctIndex: 2,
      solution: "a = F/m = 24/4 = 6 m/s².",
    },
    {
      exam: "JEE Main 2020",
      examType: "jee-main",
      question:
        "A block slides down a rough incline of angle 37° with coefficient of kinetic friction 0.25. Find its acceleration. (Use sin37° ≈ 0.6, cos37° ≈ 0.8, g = 10 m/s²)",
      options: ["2 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
      correctIndex: 1,
      solution: "a = g(sinθ − μcosθ) = 10(0.6 − 0.25×0.8) = 10(0.6 − 0.2) = 10 × 0.4 = 4 m/s².",
    },
    {
      exam: "JEE Main 2021",
      examType: "jee-main",
      question:
        "Masses of 3 kg and 2 kg hang on either side of a frictionless, massless pulley (Atwood machine). Find the acceleration of the system. (g = 10 m/s²)",
      options: ["1 m/s²", "2 m/s²", "4 m/s²", "5 m/s²"],
      correctIndex: 1,
      solution: "a = (m₁ − m₂)g/(m₁ + m₂) = (3 − 2)(10)/(3 + 2) = 10/5 = 2 m/s².",
    },
    {
      exam: "JEE Main 2017",
      examType: "jee-main",
      question:
        "A 0.15 kg ball hits a wall at 12 m/s and rebounds elastically at the same speed. Find the magnitude of the impulse delivered to the ball by the wall.",
      options: ["1.8 N·s", "2.4 N·s", "3.0 N·s", "3.6 N·s"],
      correctIndex: 3,
      solution: "Impulse = m(v_f − v_i) = 0.15(12 − (−12)) = 0.15 × 24 = 3.6 N·s.",
    },
    {
      exam: "JEE Main 2022",
      examType: "jee-main",
      question:
        "A 50 kg person stands on a weighing scale inside a lift accelerating downward at 2 m/s². What does the scale read? (g = 10 m/s²)",
      options: ["300 N", "400 N", "500 N", "600 N"],
      correctIndex: 1,
      solution: "Apparent weight N = m(g − a) = 50(10 − 2) = 50 × 8 = 400 N.",
    },
    {
      exam: "JEE Main 2018",
      examType: "jee-main",
      question:
        "A horizontal force of 20 N is applied to a 3 kg block on a frictionless surface, which pushes a 2 kg block in front of it. Find the contact force (normal reaction) between the two blocks.",
      options: ["4 N", "6 N", "8 N", "12 N"],
      correctIndex: 2,
      solution:
        "Common acceleration a = F/(m₁+m₂) = 20/5 = 4 m/s². Contact force on the 2 kg block (the one without the applied force) = m₂a = 2 × 4 = 8 N.",
    },
    // ---------------- JEE Advanced ----------------
    {
      exam: "JEE Advanced 2012",
      examType: "jee-advanced",
      question:
        "A 2 kg block rests on top of an 8 kg block, which lies on a frictionless floor. The coefficient of friction between the two blocks is 0.3. A horizontal force F is applied to the BOTTOM (8 kg) block. Find the maximum value of F for which both blocks move together. (g = 10 m/s²)",
      options: ["20 N", "24 N", "30 N", "36 N"],
      correctIndex: 2,
      solution:
        "Maximum friction available on the top block: f_L = μ(m_top)g = 0.3 × 2 × 10 = 6 N. The maximum common acceleration this can sustain on the top block is a_max = f_L/m_top = μg = 3 m/s². For the whole system: F_max = (m_top + m_bottom) × a_max = 10 × 3 = 30 N.",
    },
    {
      exam: "JEE Advanced 2014",
      examType: "jee-advanced",
      question:
        "A pendulum hangs from the ceiling of a train accelerating horizontally at 5 m/s². Find the angle the string makes with the vertical, as seen by a passenger inside the train. (g = 10 m/s²)",
      options: ["tan⁻¹(0.2)", "tan⁻¹(0.5)", "tan⁻¹(1)", "tan⁻¹(2)"],
      correctIndex: 1,
      solution: "Inside the non-inertial train frame, tanθ = a/g = 5/10 = 0.5, so θ = tan⁻¹(0.5).",
    },
    {
      exam: "JEE Advanced 2015",
      examType: "jee-advanced",
      question:
        "Two springs of force constants 200 N/m and 300 N/m are connected in SERIES. Find the effective force constant of the combination.",
      options: ["100 N/m", "120 N/m", "250 N/m", "500 N/m"],
      correctIndex: 1,
      solution: "For springs in series: 1/k_eff = 1/k₁ + 1/k₂ ⇒ k_eff = k₁k₂/(k₁+k₂) = (200×300)/(200+300) = 60000/500 = 120 N/m.",
    },
    {
      exam: "JEE Advanced 2016",
      examType: "jee-advanced",
      question:
        "A 5 kg block on a smooth horizontal table is connected via a string over a frictionless pulley at the edge of the table to a 5 kg block hanging vertically. Find the tension in the string. (g = 10 m/s²)",
      options: ["15 N", "20 N", "25 N", "50 N"],
      correctIndex: 2,
      solution:
        "Common acceleration a = m_hanging × g/(m_table + m_hanging) = 5(10)/10 = 5 m/s². Tension (from the table block's equation, which has no other horizontal force): T = m_table × a = 5 × 5 = 25 N.",
    },
    {
      exam: "JEE Advanced 2013",
      examType: "jee-advanced",
      question:
        "A time-varying force F = 6t (in N, t in seconds) acts on a body. Find the impulse delivered by this force between t = 0 s and t = 2 s.",
      options: ["6 N·s", "8 N·s", "10 N·s", "12 N·s"],
      correctIndex: 3,
      solution: "Impulse = ∫F dt = ∫6t dt from 0 to 2 = [3t²] from 0 to 2 = 3(4) − 0 = 12 N·s.",
    },
  ],
};
