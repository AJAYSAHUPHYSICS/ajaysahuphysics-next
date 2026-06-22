import type { ChapterPyq } from "./kinematics";

export const centreOfMassAndCollisionsPyq: ChapterPyq = {
  chapterName: "Centre of Mass & Collisions",
  className: "11",
  questions: [
    {
      exam: "AIIMS 2006",
      question: "For an inelastic collision between two spherical rigid bodies, which statement is correct?",
      options: [
        "The total kinetic energy is conserved",
        "The total potential energy is conserved",
        "The linear momentum is not conserved",
        "The linear momentum is conserved",
      ],
      correctIndex: 3,
      solution:
        "Linear momentum is conserved in every collision, elastic or inelastic, as long as no external force acts. Kinetic energy is conserved only in an elastic collision.",
    },
    {
      exam: "AIPMT 2009",
      question:
        "Two bodies of mass 1 kg and 3 kg have position vectors î+2ĵ+k̂ and −3î−2ĵ+k̂ respectively. Find the position vector of the centre of mass of this system.",
      options: ["−î+ĵ+k̂", "−2î+2k̂", "−2î−ĵ+k̂", "−2î−ĵ−2k̂"],
      correctIndex: 2,
      solution:
        "R_cm = [1(1,2,1) + 3(−3,−2,1)]/(1+3) = [(1−9), (2−6), (1+3)]/4 = (−8,−4,4)/4 = (−2,−1,1), i.e. −2î−ĵ+k̂.",
    },
    {
      exam: "NEET 2013",
      question:
        "An explosion blows a rock into three parts. Two parts go off at right angles to each other: a 1 kg piece moving at 12 m/s and a 2 kg piece moving at 8 m/s. If the third part flies off with a speed of 4 m/s, what is its mass?",
      options: ["3 kg", "5 kg", "7 kg", "17 kg"],
      correctIndex: 1,
      solution:
        "The two perpendicular momenta are 1×12=12 and 2×8=16. The third fragment's momentum must balance both: √(12²+16²) = √400 = 20 kg·m/s. Its mass = 20/4 = 5 kg.",
    },
    {
      exam: "AIPMT 2010",
      question:
        "A ball moving at 2 m/s collides head-on with a stationary ball of double the mass. If the coefficient of restitution is 0.5, find their velocities (in m/s) after collision.",
      options: ["0, 2", "0, 1", "1, 1", "1, 0.5"],
      correctIndex: 1,
      solution:
        "Let m and 2m be the masses. Momentum: m(2) = mv₁+2mv₂ ⟹ 2=v₁+2v₂. Restitution: e=(v₂−v₁)/2=0.5 ⟹ v₂−v₁=1. Solving: 2=v₁+2(v₁+1)=3v₁+2 ⟹ v₁=0, v₂=1.",
    },
    {
      exam: "AIPMT (Pre) 2010",
      question:
        "Two particles, initially at rest, move toward each other under their mutual attraction. At an instant when their speeds are v and 2v, what is the speed of the centre of mass of the system?",
      options: ["v", "2v", "Zero", "1.5v"],
      correctIndex: 2,
      solution:
        "The system starts with zero total momentum and experiences no external force (only internal mutual attraction), so the centre of mass remains at rest throughout — its speed is always zero.",
    },
    {
      exam: "AIPMT (Pre) 2010",
      question:
        "A 50 kg man is standing in a gravity-free space at a height of 10 m above the floor. He throws a 0.5 kg stone downward at 2 m/s. When the stone reaches the floor, how far above the floor is the man?",
      options: ["20 m", "9.9 m", "10.1 m", "10 m"],
      correctIndex: 2,
      solution:
        "Time for stone to fall 10 m at constant 2 m/s: t=5s. By momentum conservation, the man recoils upward at v=(0.5×2)/50=0.02 m/s. Distance risen in 5s = 0.1 m, so the man is at 10+0.1=10.1 m.",
    },
    {
      exam: "AIPMT (Pre) 2012",
      question:
        "Two people of mass 55 kg and 65 kg stand at opposite ends of a 3.0 m boat of mass 100 kg, floating in still water. The 55 kg person walks to the 65 kg person's end and sits down. By how much does the centre of mass of the (people + boat) system shift?",
      options: ["zero", "0.75 m", "3.0 m", "2.3 m"],
      correctIndex: 0,
      solution:
        "With no external horizontal force on the system, its centre of mass cannot shift at all — the boat itself slides to compensate for the person's motion, but the system's combined COM stays exactly fixed.",
    },
    {
      exam: "AIPMT (Pre) 2012",
      question:
        "Spheres A and B have masses m₁ and m₂. A is at rest; B moves with velocity v along the x-axis. After an oblique collision, B has velocity v/2 perpendicular to its original direction. In which direction does A move after the collision?",
      options: [
        "θ = tan⁻¹(1/2) to the x-axis",
        "θ = tan⁻¹(−1/2) to the x-axis",
        "same direction as B",
        "opposite to B",
      ],
      correctIndex: 1,
      solution:
        "Momentum along x: m₂v = m₁v_Ax ⟹ v_Ax=(m₂/m₁)v. Momentum along y: 0 = m₁v_Ay + m₂(v/2) ⟹ v_Ay = −(m₂/2m₁)v. So tanθ = v_Ay/v_Ax = −1/2, i.e. θ = tan⁻¹(−1/2) to the x-axis.",
    },
    {
      exam: "AIPMT 2015",
      question:
        "Two particles of masses m₁ and m₂ move with initial velocities u₁ and u₂. On collision, one particle gets excited to a higher energy level after absorbing energy ε. If the final velocities are v₁ and v₂, which energy relation must hold?",
      options: [
        "½m₁u₁²+½m₂u₂² = ½m₁v₁²+½m₂v₂² − ε",
        "½m₁u₁²+½m₂u₂² − ε = ½m₁v₁²+½m₂v₂²",
        "½m₁u₁²+½m₂u₂²+ε = ½m₁²v₁²+½m₂²v₂²",
        "m₁²u₁+m₂²u₂ − ε = m₁²v₁+m₂²v₂",
      ],
      correctIndex: 1,
      solution:
        "Energy absorbed to excite the particle reduces the kinetic energy available after the collision, so initial KE minus the absorbed energy ε equals the final KE.",
    },
    {
      exam: "AIPMT 2015",
      question:
        "Two spherical bodies of mass M and 5M, with radii R and 2R, are released in free space with their centres 12R apart. If they attract each other only gravitationally, find the distance covered by the smaller body before they collide.",
      options: ["4.5R", "7.5R", "1.5R", "2.5R"],
      correctIndex: 1,
      solution:
        "They touch when the centre separation equals R+2R=3R, so together they close a gap of 12R−3R=9R. Since the centre of mass stays fixed, displacement splits inversely with mass: the lighter body (M) covers 5/6 of the gap = 7.5R, the heavier body (5M) covers 1.5R.",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "A ball is thrown vertically downward from a height of 20 m with initial velocity v₀. It loses 50% of its energy on hitting the ground and rebounds to the same height of 20 m. Find v₀. (g = 10 m/s²)",
      options: ["10 m/s", "14 m/s", "20 m/s", "28 m/s"],
      correctIndex: 2,
      solution:
        "Speed just before impact: v₁²=v₀²+2(10)(20)=v₀²+400. To rebound to 20 m, speed just after impact must satisfy v₂²=2(10)(20)=400. Given ½v₂²=0.5×½v₁² ⟹ v₂²=½v₁² ⟹ 400=½(v₀²+400) ⟹ v₀²=400 ⟹ v₀=20 m/s.",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "On a frictionless surface, a block of mass M moving at speed v collides elastically with an identical stationary block. After collision, the first block moves at angle θ to its initial direction with speed v/3. Find the second block's speed after collision.",
      options: ["(√3/2)v", "(2√2/3)v", "(3/4)v", "(3/2)v"],
      correctIndex: 1,
      solution:
        "Energy conservation: v² = (v/3)² + v₂² ⟹ v₂² = v²(1−1/9) = (8/9)v² ⟹ v₂ = (2√2/3)v.",
    },
    {
      exam: "AIIMS 2015",
      question:
        "The density of a cylindrical rod of length L varies as ρ = ρ₀x²/L² (x measured from one end). Find the position of its centre of mass from that end.",
      options: ["2L/3", "L/2", "L/3", "3L/4"],
      correctIndex: 3,
      solution:
        "x_cm = ∫x·ρ₀(x²/L²)dx / ∫ρ₀(x²/L²)dx over [0,L] = (ρ₀L²/4)/(ρ₀L/3) = (3/4)L.",
    },
    {
      exam: "AIIMS 2015",
      question: "Find the position of the centre of mass of a solid hemisphere of radius 16 cm, measured from its flat base.",
      options: ["4 cm", "6 cm", "8 cm", "12 cm"],
      correctIndex: 1,
      solution: "For a solid hemisphere, the centre of mass is at 3R/8 from the flat face: 3(16)/8 = 6 cm.",
    },
    {
      exam: "NEET-II 2016",
      question:
        "A 10 g bullet moving horizontally at 400 m/s strikes a 2 kg wooden block hanging from a 5 m string. The block's centre of gravity rises 10 cm. Find the bullet's speed as it emerges from the block.",
      options: ["120 m/s", "160 m/s", "100 m/s", "80 m/s"],
      correctIndex: 0,
      solution:
        "Block's speed right after impact (from the pendulum rise): v=√(2gh)=√(2×9.8×0.1)=1.4 m/s. Momentum conservation: 0.01(400)=0.01(v_f)+2(1.4) ⟹ 4=0.01v_f+2.8 ⟹ v_f=120 m/s.",
    },
    {
      exam: "NEET-II 2016",
      question:
        "Two identical balls A and B, with velocities 0.5 m/s and −0.3 m/s respectively, collide elastically in one dimension. Find the velocities of B and A (respectively) after the collision.",
      options: ["−0.3 m/s and 0.5 m/s", "0.3 m/s and 0.5 m/s", "−0.5 m/s and 0.3 m/s", "0.5 m/s and −0.3 m/s"],
      correctIndex: 3,
      solution:
        "For an elastic collision between equal masses, the velocities simply exchange: B ends up with A's original velocity (0.5 m/s) and A ends up with B's original velocity (−0.3 m/s).",
    },
    {
      exam: "AIIMS 2016",
      question:
        "A 20 metric-ton wagon moving at 10 m/s collides perfectly inelastically with a stationary 60 metric-ton wagon. Find the loss of kinetic energy.",
      options: ["250 kJ", "750 kJ", "500 kJ", "650 kJ"],
      correctIndex: 1,
      solution:
        "Common velocity: v=(20000×10)/80000=2.5 m/s. KE_initial=½(20000)(10²)=1000 kJ. KE_final=½(80000)(2.5²)=250 kJ. Loss = 1000−250 = 750 kJ.",
    },
    {
      exam: "AIIMS 2016",
      question:
        "A proton of mass mₚ makes a perfectly elastic collision with a heavy particle at rest, and bounces back with 4/9 of its initial kinetic energy. Find the mass of the heavy particle.",
      options: ["5mₚ", "6mₚ", "3mₚ", "1.5mₚ"],
      correctIndex: 0,
      solution:
        "KE ratio = [(m₁−m₂)/(m₁+m₂)]² = 4/9 ⟹ |m₁−m₂|/(m₁+m₂)=2/3. Since the proton bounces back, m₂>m₁: (m₂−m₁)/(m₁+m₂)=2/3 ⟹ 3m₂−3m₁=2m₁+2m₂ ⟹ m₂=5m₁=5mₚ.",
    },
    {
      exam: "NEET(UG) 2018",
      question:
        "A moving block of mass m collides with a stationary block of mass 4m. The lighter block comes to rest after the collision. If the lighter block's initial velocity was v, find the coefficient of restitution.",
      options: ["0.5", "0.25", "0.8", "0.4"],
      correctIndex: 1,
      solution:
        "Momentum: mv = 4m·v₂ ⟹ v₂=v/4. Coefficient of restitution e=(v₂−0)/(v−0)=(v/4)/v=0.25.",
    },
    {
      exam: "AIIMS 2018",
      question: "Find the location of the centre of mass of a uniform semicircular plate (lamina) of radius R, from its flat base.",
      options: ["4R/3π", "2R/π", "R/2", "3R/8"],
      correctIndex: 0,
      solution: "For a semicircular disc (lamina), the centre of mass lies at 4R/3π from the flat base — distinct from the semicircular ring's 2R/π.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A semicircular ring of radius 0.5 m is given. Find the location of its centre of mass on its line of symmetry, above its base.",
      options: ["2/(3π) m", "2/π m", "1/π m", "3/(2π) m"],
      correctIndex: 2,
      solution: "For a semicircular ring (arc), the centre of mass lies at 2R/π from the centre: 2(0.5)/π = 1/π m.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A 10 metric-ton body moving at 5 m/s collides head-on with a stationary 40 metric-ton body and they combine. Find the loss in kinetic energy after collision.",
      options: ["1×10⁵ J", "2×10⁵ J", "3×10⁵ J", "4×10⁵ J"],
      correctIndex: 0,
      solution:
        "Common velocity: v=(10000×5)/50000=1 m/s. KE_initial=½(10000)(5²)=125000 J. KE_final=½(50000)(1²)=25000 J. Loss=125000−25000=100000 J=1×10⁵ J.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A cart of total mass 2 metric tons carries 1 metric ton of sand, initially at rest. Sand leaks out at 0.5 kg/s while a constant external horizontal force of 10 N acts on the cart. Find the cart's final velocity once all the sand has leaked out.",
      options: ["13.86 m/s", "14.26 m/s", "20.08 m/s", "16.39 m/s"],
      correctIndex: 0,
      solution:
        "Mass at time t: M(t)=2000−0.5t (kg), with all sand gone at t=2000s. Since leaking sand carries away no extra momentum (it just falls out at the cart's own velocity), F=M(t)(dv/dt). Integrating: v=∫₀²⁰⁰⁰ [10/(2000−0.5t)]dt = 20 ln(2000/1000) = 20 ln2 ≈ 13.86 m/s.",
    },
  ],
};
