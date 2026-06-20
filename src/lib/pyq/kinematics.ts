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
      exam: "AIPMT 2007",
      question:
        "The position of a particle moving along the x-axis varies as x = 9t² − t³ (x in metres, t in seconds). Find the position of the particle at the instant its speed is maximum (in the positive x-direction).",
      options: ["24 m", "32 m", "54 m", "81 m"],
      correctIndex: 2,
      solution:
        "v = dx/dt = 18t − 3t². Speed is maximum where dv/dt = 0: 18 − 6t = 0, giving t = 3 s. At t = 3, x = 9(9) − 27 = 81 − 27 = 54 m.",
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
      exam: "AIPMT (Pre) 2010",
      question:
        "A ball is dropped from a tall platform at t = 0 from rest. Six seconds later, a second ball is thrown downward from the same platform with some initial speed v. Both balls reach the ground together at t = 18 s. Find v. (g = 10 m/s²)",
      options: ["60 m/s", "75 m/s", "55 m/s", "40 m/s"],
      correctIndex: 1,
      solution:
        "First ball falls for 18s: height = ½(10)(18²) = 1620 m. Second ball falls for (18−6)=12s and must cover the same 1620 m: 1620 = 12v + ½(10)(12²) = 12v + 720. So 12v = 900, v = 75 m/s.",
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
      solution:
        "v² = u² + 2gh = 0 + 2(10)(20) = 400, so v = 20 m/s.",
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
      exam: "AIPMT (Pre) 2012",
      question:
        "A particle's position varies as x = 8 + 12t − t³ (SI units). What is its retardation at the moment its velocity becomes zero?",
      options: ["6 m/s²", "12 m/s²", "24 m/s²", "Zero"],
      correctIndex: 1,
      solution:
        "v = dx/dt = 12 − 3t². Setting v = 0: t² = 4, so t = 2 s. Acceleration a = dv/dt = −6t. At t = 2s, a = −12 m/s², so the retardation (magnitude of deceleration) is 12 m/s².",
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
      exam: "AIPMT 2014",
      question:
        "A ball is projected from the ground with speed 5 m/s at angle θ to the horizontal. On a planet where gravity is different from Earth's, a ball launched at speed 3 m/s at the same angle follows an identical (geometrically matching) trajectory. If Earth's g = 9.8 m/s², what is the planet's gravity?",
      options: ["3.5 m/s²", "5.9 m/s²", "16.3 m/s²", "110.8 m/s²"],
      correctIndex: 0,
      solution:
        "For trajectories to be geometrically identical, the ratio u²/g must be the same in both cases: 5²/9.8 = 3²/g_planet. So g_planet = 9.8 × 9/25 = 3.53 ≈ 3.5 m/s².",
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
      exam: "NEET(UG) 2017",
      question:
        "Standing on a stalled (non-moving) escalator, a person would need 90 seconds to walk up it. If the same person stands still on the escalator while it runs, it carries them up in 60 seconds. How long would it take the person to walk up the escalator while it is running?",
      options: ["t = (t₁t₂)/(t₂−t₁)", "t = (t₁t₂)/(t₂+t₁)", "t₁ − t₂", "(t₁+t₂)/2"],
      correctIndex: 1,
      solution:
        "Person's walking rate = 1/90 (of the stairs per second). Escalator's rate = 1/60. Combined rate = 1/90 + 1/60 = 2/180 + 3/180 = 5/180 = 1/36. So combined time = 36 s, which matches the general formula t = t₁t₂/(t₁+t₂) = (90×60)/(150) = 36 s.",
    },
  ],
};
