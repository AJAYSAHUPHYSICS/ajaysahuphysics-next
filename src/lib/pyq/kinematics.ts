export type PyqQuestion = {
  exam: string;
  question: string;
  options: string[];
  correctIndex: number;
  solution: string;
};

export type ChapterPyq = {
  chapterName: string;
  className: "11" | "12";
  questions: PyqQuestion[];
};

export const kinematicsPyq: ChapterPyq = {
  chapterName: "Kinematics",
  className: "11",
  questions: [
    {
      exam: "AIPMT 2006",
      question:
        "A car travels at a constant speed around a circular track of radius 100 m, completing one lap every 62.8 seconds. What are its average speed and average velocity for one complete lap?",
      options: [
        "Both zero",
        "Average velocity zero, average speed 10 m/s",
        "Both 10 m/s",
        "Average velocity 10 m/s, average speed zero",
      ],
      correctIndex: 1,
      solution:
        "Circumference = 2π(100) ≈ 628 m. Average speed = 628/62.8 = 10 m/s. Since the car returns to its starting point, total displacement is zero, so average velocity = 0.",
    },
    {
      exam: "AIPMT 2006",
      question:
        "A particle's position along the x-axis varies with time as x = 40 + 12t − t³ (x in metres, t in seconds). What total distance has it travelled by the time it comes to rest?",
      options: ["56 m", "40 m", "24 m", "16 m"],
      correctIndex: 3,
      solution:
        "v = dx/dt = 12 − 3t². Setting v = 0: t² = 4, so t = 2s. x(0) = 40, x(2) = 40 + 24 − 8 = 56. Distance travelled = 56 − 40 = 16 m.",
    },
    {
      exam: "AIPMT 2006",
      question:
        "Two bodies, of mass 1 kg and 3 kg, are dropped from heights of 16 m and 25 m respectively. What is the ratio of the times they take to reach the ground?",
      options: ["5/4", "12/5", "5/12", "4/5"],
      correctIndex: 3,
      solution:
        "Free-fall time depends only on height, not mass: t = √(2h/g). Ratio = √(16/25) = 4/5.",
    },
    {
      exam: "AIPMT 2006",
      question:
        "A projectile is launched at angle (45° − θ) in one case and (45° + θ) in another, with the same speed. What is the ratio of their horizontal ranges?",
      options: ["1 : 1", "2 : 3", "1 : 2", "2 : 1"],
      correctIndex: 0,
      solution:
        "These two angles are complementary (they sum to 90°), and projectiles launched at complementary angles with the same speed always have equal range. Ratio = 1:1.",
    },
    {
      exam: "AIPMT 2007",
      question:
        "A car travels from point X to point Y at a constant speed v_up, then returns from Y to X at a constant speed v_down. What is the average speed for the entire round trip?",
      options: [
        "(v_up + v_down)/2",
        "2v_up·v_down / (v_up + v_down)",
        "√(v_up · v_down)",
        "v_up · v_down / (v_up + v_down)",
      ],
      correctIndex: 1,
      solution:
        "For equal distances covered at two different speeds, average speed is the harmonic mean: total distance/total time = 2d / (d/v_up + d/v_down) = 2·v_up·v_down/(v_up+v_down).",
    },
    {
      exam: "AIPMT 2007",
      question:
        "A particle moving along the x-axis has acceleration f = f₀(1 − t/T), where f₀ and T are constants, and starts with zero velocity at t = 0. What is the particle's velocity at the instant f becomes zero?",
      options: ["f₀T", "f₀T²", "½f₀T", "¼f₀T"],
      correctIndex: 2,
      solution:
        "f = 0 occurs at t = T. Integrating: v = ∫f₀(1−t/T)dt = f₀t − f₀t²/(2T). At t = T: v = f₀T − f₀T/2 = ½f₀T.",
    },
    {
      exam: "AIPMT 2007",
      question:
        "A particle's position along the x-axis is given by x = 9t² − t³. At what x-coordinate does the particle achieve its maximum speed in the positive x-direction?",
      options: ["81 m", "32 m", "24 m", "54 m"],
      correctIndex: 3,
      solution:
        "v = 18t − 3t². Maximum speed occurs where dv/dt = 0: 18 − 6t = 0, so t = 3s. At t = 3, x = 9(9) − 27 = 81 − 27 = 54 m.",
    },
    {
      exam: "AIPMT 2007",
      question:
        "A particle starts from rest and moves with a constant acceleration of 4/3 m/s². What distance does it cover during the third second of its motion?",
      options: ["10/3 m", "19/3 m", "6 m", "4 m"],
      correctIndex: 0,
      solution:
        "Distance in the nth second: sₙ = u + (a/2)(2n−1). With u = 0, a = 4/3, n = 3: s₃ = (4/3)/2 × 5 = (2/3) × 5 = 10/3 m.",
    },
    {
      exam: "AIPMT 2008",
      question:
        "A particle accelerates uniformly from 10 m/s to 20 m/s while covering a distance of 135 m. How much time does this take?",
      options: ["12 s", "9 s", "10 s", "1.8 s"],
      correctIndex: 1,
      solution:
        "Using s = (u+v)/2 × t: 135 = (10+20)/2 × t = 15t, so t = 9 s.",
    },
    {
      exam: "AIPMT 2008",
      question:
        "A particle's distance-time graph shows it speeding up, then moving at constant speed, then slowing down. At which labelled point on the graph is its instantaneous velocity the largest?",
      options: ["At point D", "At point A", "At point B", "At point C"],
      correctIndex: 0,
      solution:
        "Instantaneous velocity is the slope of the distance-time graph. The steepest slope (largest velocity) occurs where the graph rises most sharply — typically right before the curve flattens into constant motion, labelled D in the source figure.",
    },
    {
      exam: "AIPMT 2008",
      question:
        "A particle of mass m is launched at 45° to the horizontal with speed v. When it lands back at the same height, what is the magnitude of the change in its momentum?",
      options: ["mv√2", "Zero", "2mv", "mv/√2"],
      correctIndex: 0,
      solution:
        "Horizontal momentum (mv cos45°) is unchanged. Vertical momentum reverses sign: from +mv sin45° to −mv sin45°, a change of 2mv sin45° = mv√2. The horizontal component contributes nothing to the change, so |Δp| = mv√2.",
    },
    {
      exam: "AIPMT 2009",
      question:
        "A body starts from rest and undergoes constant acceleration for a total of 20 seconds. It covers a distance S₁ in the first 10 seconds and S₂ in the next 10 seconds. What is S₂ in terms of S₁?",
      options: ["S₁", "2S₁", "3S₁", "4S₁"],
      correctIndex: 2,
      solution:
        "With u = 0: distance at t=10 is S₁ = ½a(10²) = 50a. Distance at t=20 is ½a(20²) = 200a. So S₂ = 200a − 50a = 150a = 3S₁.",
    },
    {
      exam: "AIPMT 2009",
      question:
        "A bus is moving at a constant 10 m/s and is 1 km ahead of a scooter rider. At what speed must the scooterist travel to catch up to the bus in exactly 100 seconds?",
      options: ["10 m/s", "20 m/s", "40 m/s", "25 m/s"],
      correctIndex: 1,
      solution:
        "In 100s, the bus covers 10×100 = 1000 m, ending 2000 m from the scooterist's start. The scooterist must cover this 2000 m in 100 s, requiring a speed of 2000/100 = 20 m/s.",
    },
    {
      exam: "AIPMT (Pre) 2010",
      question:
        "A particle moves such that its distance x from a fixed point follows x = (t + 5)⁻¹. The particle's acceleration is proportional to which power of its velocity?",
      options: ["(velocity)²ᐟ³", "(velocity)³ᐟ²", "(distance)²", "(distance)⁻²"],
      correctIndex: 1,
      solution:
        "v = −(t+5)⁻² and a = 2(t+5)⁻³. Expressing a in terms of |v|: since |v| = (t+5)⁻², we get |v|^(3/2) = (t+5)⁻³, so a = 2|v|^(3/2) — acceleration is proportional to velocity raised to the power 3/2.",
    },
    {
      exam: "AIPMT (Pre) 2010",
      question:
        "A ball is dropped from a platform at t = 0 with zero initial speed. Six seconds later, a second ball is thrown downward from the same platform with some speed v. Both balls hit the ground simultaneously at t = 18 s. Taking g = 10 m/s², find v.",
      options: ["60 m/s", "75 m/s", "55 m/s", "40 m/s"],
      correctIndex: 1,
      solution:
        "First ball falls for 18s, covering h = ½(10)(18²) = 1620 m. Second ball falls for (18−6) = 12s and must cover the same 1620 m: 1620 = 12v + ½(10)(144) = 12v + 720. Solving: 12v = 900, v = 75 m/s.",
    },
    {
      exam: "AIPMT (Pre) 2010",
      question:
        "A particle has initial velocity (3î + 4ĵ) m/s and a constant acceleration of (0.4î + 0.3ĵ) m/s². What is its speed after 10 seconds?",
      options: ["10 units", "7 units", "7√2 units", "8.5 units"],
      correctIndex: 2,
      solution: "v(10) = (3+4, 4+3) = (7, 7). Speed = √(7²+7²) = 7√2 units.",
    },
    {
      exam: "AIPMT (Mains) 2010",
      question:
        "A projectile's speed at the highest point of its trajectory is exactly half of its initial launch speed. What was the angle of projection?",
      options: ["30°", "45°", "60°", "15°"],
      correctIndex: 2,
      solution:
        "At the highest point, speed = u cosθ (only horizontal component remains). Setting u cosθ = u/2 gives cosθ = 1/2, so θ = 60°.",
    },
    {
      exam: "AIPMT (Pre) 2011",
      question:
        "A boy standing on top of a 20 m tall tower drops a stone. Taking g = 10 m/s², with what speed does the stone hit the ground?",
      options: ["10 m/s", "20 m/s", "40 m/s", "5 m/s"],
      correctIndex: 1,
      solution: "v² = u² + 2gh = 0 + 2(10)(20) = 400, so v = 20 m/s.",
    },
    {
      exam: "AIPMT (Pre) 2011",
      question:
        "A body moves with velocity 30 m/s towards east. Ten seconds later, its velocity is 40 m/s towards north. What is the magnitude of its average acceleration?",
      options: ["1 m/s²", "7 m/s²", "√7 m/s²", "5 m/s²"],
      correctIndex: 3,
      solution:
        "Δv = (0−30, 40−0) = (−30, 40), with magnitude √(900+1600) = √2500 = 50 m/s. Average acceleration = 50/10 = 5 m/s².",
    },
    {
      exam: "AIPMT (Pre) 2011",
      question:
        "A missile is launched for maximum horizontal range with an initial speed of 20 m/s. Taking g = 10 m/s², what is its range?",
      options: ["40 m", "50 m", "60 m", "20 m"],
      correctIndex: 0,
      solution:
        "Maximum range occurs at 45°, where R_max = u²/g = 400/10 = 40 m.",
    },
    {
      exam: "AIPMT (Mains) 2011",
      question:
        "A particle covers the first half of a journey's distance at speed v₁ and the second half at speed v₂. What is its average speed for the whole journey?",
      options: [
        "(v₁ + v₂)/2",
        "v₁v₂ / (v₁ + v₂)",
        "2v₁v₂ / (v₁ + v₂)",
        "(v₁² + v₂²) / (v₁² + v₂²)",
      ],
      correctIndex: 2,
      solution:
        "When equal distances (not equal times) are covered at two speeds, the average speed is the harmonic mean: 2v₁v₂/(v₁+v₂).",
    },
    {
      exam: "AIPMT (Mains) 2011",
      question:
        "A projectile is launched at 45° to the horizontal. As seen from the point of launch, what is the angle of elevation to the projectile when it is at the highest point of its path?",
      options: ["45°", "60°", "tan⁻¹(1/2)", "tan⁻¹(√3/2)"],
      correctIndex: 2,
      solution:
        "At the highest point, horizontal distance covered = R/2 = u²sin(90°)/(2g) = u²/(2g), and height = u²sin²(45°)/(2g) = u²/(4g). tan(elevation) = height/horizontal-distance = (u²/4g)/(u²/2g) = 1/2, so elevation = tan⁻¹(1/2).",
    },
    {
      exam: "AIPMT (Pre) 2012",
      question:
        "A particle's position varies as x = 8 + 12t − t³ (SI units). What is its retardation at the moment its velocity becomes zero?",
      options: ["6 m/s²", "12 m/s²", "24 m/s²", "Zero"],
      correctIndex: 1,
      solution:
        "v = dx/dt = 12 − 3t². Setting v = 0: t² = 4, so t = 2 s. Acceleration a = dv/dt = −6t. At t = 2s, a = −12 m/s², so the retardation (magnitude of deceleration) is 12 m/s².",
    },
    {
      exam: "AIPMT (Pre) 2012",
      question:
        "A projectile has equal horizontal range and maximum height. What was its angle of projection?",
      options: ["θ = tan⁻¹(2)", "θ = 45°", "θ = tan⁻¹(1/4)", "θ = tan⁻¹(4)"],
      correctIndex: 3,
      solution:
        "Setting R = H: u²sin(2θ)/g = u²sin²θ/(2g). This gives 2sinθcosθ = sin²θ/2, so 4cosθ = sinθ, meaning tanθ = 4, so θ = tan⁻¹(4).",
    },
    {
      exam: "AIPMT (Mains) 2012",
      question:
        "A particle has initial velocity (2î + 3ĵ) m/s and constant acceleration (0.3î + 0.2ĵ) m/s². What is the magnitude of its velocity after 10 seconds?",
      options: ["5 units", "9 units", "9√2 units", "5√2 units"],
      correctIndex: 3,
      solution: "v(10) = (2+3, 3+2) = (5, 5). Magnitude = √(25+25) = 5√2 units.",
    },
    {
      exam: "AIPMT (Mains) 2012",
      question:
        "A stone is dropped from height h and hits the ground with momentum p. If the same stone is dropped from a height 100% greater (double the height), by what percentage does its momentum on impact change?",
      options: ["200%", "100%", "68%", "41%"],
      correctIndex: 3,
      solution:
        "v = √(2gh), so momentum p = m√(2gh) ∝ √h. Doubling h multiplies v (and p) by √2. Percentage increase = (√2 − 1) × 100 ≈ 41%.",
    },
    {
      exam: "NEET-UG 2013",
      question:
        "A stone falls freely from rest under gravity. It covers distance h₁ in the first 5 seconds, h₂ in the next 5 seconds, and h₃ in the 5 seconds after that. How are h₁, h₂, and h₃ related?",
      options: [
        "h₁ = h₂ = h₃",
        "h₁ = 2h₂ = 3h₃",
        "h₂ = 3h₁ and h₃ = 5h₁",
        "h₂ = 3h₁ and h₃ = 3h₂",
      ],
      correctIndex: 2,
      solution:
        "Distance from rest at time t is proportional to t². Distances in successive equal intervals follow the ratio of odd numbers: 1:3:5. So h₁:h₂:h₃ = 1:3:5, meaning h₂ = 3h₁ and h₃ = 5h₁.",
    },
    {
      exam: "NEET-UG 2013",
      question:
        "A projectile's velocity at point A (early in its flight) is (2î + 3ĵ) m/s. By the symmetry of projectile motion, what is its velocity at point B, a point at the same height later in the flight?",
      options: ["2î + 3ĵ", "−2î − 3ĵ", "−2î + 3ĵ", "2î − 3ĵ"],
      correctIndex: 3,
      solution:
        "At points of equal height on a projectile's path, the horizontal velocity component stays the same, but the vertical component has the same magnitude with reversed sign (since the particle is now descending). So the velocity becomes 2î − 3ĵ.",
    },
    {
      exam: "AIIMS 2013",
      question:
        "A projectile is launched from the ground with initial velocity u₀î + v₀ĵ, with gravity acting along the negative y-direction. What is the maximum horizontal range it achieves?",
      options: ["u₀²/(2g)", "2u₀v₀/g", "v₀²/(2g)", "4u₀v₀/g"],
      correctIndex: 1,
      solution:
        "Here u₀ is the horizontal component and v₀ the vertical component of velocity. Time of flight T = 2v₀/g. Horizontal range = u₀ × T = 2u₀v₀/g.",
    },
    {
      exam: "AIPMT 2014",
      question:
        "A ball is projected from the ground with speed 5 m/s at angle θ to the horizontal. On a planet where gravity differs from Earth's, a ball launched at speed 3 m/s at the same angle follows a trajectory that is geometrically identical (same shape) to the one on Earth. If Earth's g = 9.8 m/s², what is the planet's gravity?",
      options: ["3.5 m/s²", "5.9 m/s²", "16.3 m/s²", "110.8 m/s²"],
      correctIndex: 0,
      solution:
        "For trajectories to be geometrically identical, the ratio u²/g must match in both cases: 5²/9.8 = 3²/g_planet. So g_planet = 9.8 × 9/25 ≈ 3.5 m/s².",
    },
    {
      exam: "AIPMT 2014",
      question:
        "A particle's position coordinates (x, y) are (2m, 3m) at t = 0, (6m, 7m) at t = 2s, and (13m, 14m) at t = 5s. What is its average velocity vector from t = 0 to t = 5s?",
      options: [
        "(1/5)(13î + 14ĵ)",
        "(7/3)(î + ĵ)",
        "2î + ĵ",
        "(11/5)(î + ĵ)",
      ],
      correctIndex: 3,
      solution:
        "Average velocity = (final position − initial position)/total time = [(13,14) − (2,3)]/5 = (11,11)/5 = (11/5)(î+ĵ).",
    },
    {
      exam: "AIPMT 2015",
      question:
        "A particle of unit mass moves such that its velocity depends on its position as v(x) = bx⁻²ⁿ, where b and n are constants. What is its acceleration as a function of x?",
      options: [
        "−2nb²x⁻⁴ⁿ⁻¹",
        "−2b²x⁻²ⁿ⁺¹",
        "−2nb²e⁻⁴ⁿ⁺¹",
        "−2nb²x⁻²ⁿ⁻¹",
      ],
      correctIndex: 0,
      solution:
        "Using a = v(dv/dx): dv/dx = −2nb·x⁻²ⁿ⁻¹. So a = (bx⁻²ⁿ)(−2nb·x⁻²ⁿ⁻¹) = −2nb²x⁻⁴ⁿ⁻¹.",
    },
    {
      exam: "AIPMT 2015",
      question:
        "Ship A moves westward at 10 km/h. Ship B, initially 100 km south of A, moves northward at 10 km/h, starting at the same time. After how much time is the distance between the two ships at its shortest?",
      options: ["5 h", "5√2 h", "10√2 h", "0 h"],
      correctIndex: 0,
      solution:
        "Taking A's initial position as origin, B starts at (0, −100). Relative velocity of B with respect to A = (0,10) − (−10,0) = (10,10). Distance² = (10t)² + (10t−100)². Minimizing this with respect to t gives t = 5 hours.",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "Two particles A and B move with constant velocities v₁ and v₂, starting from position vectors r₁ and r₂ respectively. What condition must hold for A and B to collide?",
      options: [
        "r₁ − r₂ = v₁ − v₂",
        "(r₁−r₂)/|r₁−r₂| = (v₂−v₁)/|v₂−v₁|",
        "r₁ · v₁ = r₂ · v₂",
        "r₁ × v₁ = r₂ × v₂",
      ],
      correctIndex: 1,
      solution:
        "For two particles moving with constant velocity to collide, their relative velocity must point exactly along the line connecting their current positions, meaning the unit vector of their relative displacement must align with (the reverse of) their relative velocity's unit vector.",
    },
    {
      exam: "NEET-I 2016",
      question:
        "A particle's velocity varies with time as v = At + Bt² (A, B are constants). Find the distance it travels between t = 1 s and t = 2 s.",
      options: ["3A/2 + 4B", "3A + 7B", "3A/2 + 7B/3", "A/2 + B/3"],
      correctIndex: 2,
      solution:
        "Distance = ∫v dt from 1 to 2 = [At²/2 + Bt³/3] from 1 to 2 = (2A + 8B/3) − (A/2 + B/3) = 3A/2 + 7B/3.",
    },
    {
      exam: "NEET-II 2016",
      question:
        "Two cars, P and Q, start from the same point at the same time along a straight line, with positions given by x_P(t) = at + bt² and x_Q(t) = ft − t². At what time do they have the same velocity?",
      options: [
        "(a+f)/(2(1+b))",
        "(f−a)/(2(1+b))",
        "(a−f)/(1+b)",
        "(a+f)/(2(b−1))",
      ],
      correctIndex: 1,
      solution:
        "v_P = a + 2bt, v_Q = f − 2t. Setting them equal: a + 2bt = f − 2t, so 2t(b+1) = f − a, giving t = (f−a) / (2(1+b)).",
    },
    {
      exam: "NEET(UG) 2017",
      question:
        "Standing on a stalled (non-moving) escalator, a person would need t₁ seconds to walk up it. If the same person stands still on the escalator while it runs, it carries them up in t₂ seconds. How long would it take the person to walk up the escalator while it is running?",
      options: [
        "t₁t₂ / (t₂−t₁)",
        "t₁t₂ / (t₂+t₁)",
        "t₁ − t₂",
        "(t₁+t₂)/2",
      ],
      correctIndex: 1,
      solution:
        "The person's walking rate (escalator stairs per second) is 1/t₁, and the escalator's own rate is 1/t₂. Combined rate = 1/t₁ + 1/t₂ = (t₁+t₂)/(t₁t₂). Combined time = t₁t₂/(t₁+t₂).",
    },
    {
      exam: "NEET(UG) 2017",
      question:
        "A particle's coordinates vary with time as x = 5t − 2t² and y = 10t (x, y in metres, t in seconds). What is its acceleration at t = 2 s?",
      options: ["5 m/s²", "−4 m/s²", "−8 m/s²", "Zero"],
      correctIndex: 1,
      solution:
        "aₓ = d²x/dt² = −4 m/s² (constant), and a_y = d²y/dt² = 0 (since y is linear in t). So the net acceleration is simply −4 m/s² along the x-direction.",
    },
  ],
};
