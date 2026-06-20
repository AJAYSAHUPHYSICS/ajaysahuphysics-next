export type DppQuestion = {
  number: number;
  question: string;
  options: string[];
  correctIndex: number;
  solution: string;
};

export type ChapterDpp = {
  chapterName: string;
  className: "11" | "12";
  questions: DppQuestion[];
};

export const kinematicsDpp: ChapterDpp = {
  chapterName: "Kinematics",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A cyclist rides 4 km east, then 3 km north. What is the magnitude of the displacement?",
      options: ["3 km", "4 km", "5 km", "7 km"],
      correctIndex: 2,
      solution:
        "The two legs are perpendicular, so displacement = √(4² + 3²) = √25 = 5 km.",
    },
    {
      number: 2,
      question:
        "A particle's position is given by x = 5t² − 3t + 2 (in metres, t in seconds). What is its velocity at t = 2 s?",
      options: ["17 m/s", "20 m/s", "13 m/s", "7 m/s"],
      correctIndex: 0,
      solution:
        "v = dx/dt = 10t − 3. At t = 2s, v = 20 − 3 = 17 m/s.",
    },
    {
      number: 3,
      question:
        "A car accelerates uniformly from 10 m/s to 30 m/s in 5 seconds. Find the acceleration.",
      options: ["2 m/s²", "4 m/s²", "5 m/s²", "8 m/s²"],
      correctIndex: 1,
      solution: "a = (v − u)/t = (30 − 10)/5 = 4 m/s².",
    },
    {
      number: 4,
      question:
        "A ball is thrown vertically upward with speed 20 m/s. Taking g = 10 m/s², how long does it take to return to the thrower's hand?",
      options: ["2 s", "4 s", "1 s", "5 s"],
      correctIndex: 1,
      solution: "Total time of flight T = 2u/g = 2(20)/10 = 4 s.",
    },
    {
      number: 5,
      question:
        "A stone dropped from a tower reaches the ground in 4 s. Taking g = 10 m/s², find the height of the tower.",
      options: ["40 m", "80 m", "60 m", "100 m"],
      correctIndex: 1,
      solution: "h = ½gt² = ½(10)(4²) = ½(10)(16) = 80 m.",
    },
    {
      number: 6,
      question:
        "A particle moving with constant acceleration covers 10 m in the 3rd second and 14 m in the 5th second. Find its acceleration.",
      options: ["1 m/s²", "2 m/s²", "4 m/s²", "0.5 m/s²"],
      correctIndex: 1,
      solution:
        "sₙ = u + (a/2)(2n−1). For n=3: 10 = u + 2.5a. For n=5: 14 = u + 4.5a. Subtracting: 4 = 2a, so a = 2 m/s².",
    },
    {
      number: 7,
      question:
        "Two cars, A and B, move in the same direction at 25 m/s and 18 m/s respectively. What is the velocity of A relative to B?",
      options: ["43 m/s", "7 m/s", "18 m/s", "25 m/s"],
      correctIndex: 1,
      solution: "v_AB = v_A − v_B = 25 − 18 = 7 m/s (same direction as A).",
    },
    {
      number: 8,
      question:
        "A projectile is launched at 30° to the horizontal with speed 40 m/s. Taking g = 10 m/s², find its time of flight.",
      options: ["2 s", "4 s", "6 s", "8 s"],
      correctIndex: 0,
      solution:
        "T = 2u sinθ/g = 2(40)(0.5)/10 = 40/10 = 4 s. Note: sin30° = 0.5, so T = 2(40)(0.5)/10 = 4 s.",
    },
    {
      number: 9,
      question:
        "For a projectile launched at angle θ, the range is maximum when θ equals:",
      options: ["30°", "45°", "60°", "90°"],
      correctIndex: 1,
      solution:
        "Range R = u²sin2θ/g is maximum when sin2θ = 1, i.e., 2θ = 90°, so θ = 45°.",
    },
    {
      number: 10,
      question:
        "A ball rolls off a table 1.25 m high with a horizontal speed of 2 m/s. Taking g = 10 m/s², how far from the table's edge does it land?",
      options: ["0.5 m", "1 m", "2 m", "2.5 m"],
      correctIndex: 1,
      solution:
        "Time to fall: t = √(2h/g) = √(2×1.25/10) = √0.25 = 0.5 s. Range = u×t = 2×0.5 = 1 m.",
    },
    {
      number: 11,
      question:
        "Rain falls vertically at 8 m/s. A person walks horizontally at 6 m/s. At what angle to the vertical should they hold their umbrella?",
      options: ["tan⁻¹(3/4)", "tan⁻¹(4/3)", "tan⁻¹(6/8)", "tan⁻¹(8/6)"],
      correctIndex: 0,
      solution:
        "tanθ = v_man/v_rain = 6/8 = 3/4, so θ = tan⁻¹(3/4), measured from the vertical, tilted forward.",
    },
    {
      number: 12,
      question:
        "A boat can row at 6 km/h in still water. A river flows at 4 km/h. What is the boat's maximum possible speed relative to the ground (moving directly downstream)?",
      options: ["2 km/h", "6 km/h", "10 km/h", "4 km/h"],
      correctIndex: 2,
      solution:
        "Downstream: boat speed and river speed add directly: 6 + 4 = 10 km/h.",
    },
    {
      number: 13,
      question:
        "A particle moves with velocity v = 4t − 2 (SI units). What is its displacement between t = 0 and t = 3 s?",
      options: ["6 m", "9 m", "12 m", "15 m"],
      correctIndex: 0,
      solution:
        "s = ∫v dt from 0 to 3 = [2t² − 2t] from 0 to 3 = (18 − 6) − 0 = 12 m. Recheck: 2(9) − 2(3) = 18 − 6 = 12 m.",
    },
    {
      number: 14,
      question:
        "A body starts from rest and moves with constant acceleration for 10 s, covering 100 m. What is its acceleration?",
      options: ["1 m/s²", "2 m/s²", "5 m/s²", "10 m/s²"],
      correctIndex: 1,
      solution:
        "s = ut + ½at² with u = 0: 100 = ½a(100), so a = 2 m/s².",
    },
    {
      number: 15,
      question:
        "A stone is thrown upward with speed u and reaches a maximum height H. To double the maximum height (keeping g constant), the new speed must be:",
      options: ["√2 u", "2u", "u/√2", "4u"],
      correctIndex: 0,
      solution:
        "H = u²/2g, so H ∝ u². To double H, u must be multiplied by √2.",
    },
    {
      number: 16,
      question:
        "Two trains, each 100 m long, move toward each other on parallel tracks at 20 m/s and 30 m/s. How long do they take to cross each other completely?",
      options: ["2 s", "4 s", "6 s", "8 s"],
      correctIndex: 1,
      solution:
        "Relative speed (opposite directions) = 20 + 30 = 50 m/s. Total distance to cover = 100 + 100 = 200 m. Time = 200/50 = 4 s.",
    },
    {
      number: 17,
      question:
        "A particle moving along a straight line has velocity v² = 64 − 16x (SI units), where x is its position. What is its acceleration?",
      options: ["−8 m/s²", "8 m/s²", "−16 m/s²", "16 m/s²"],
      correctIndex: 0,
      solution:
        "Differentiating v² = 64 − 16x with respect to x: 2v(dv/dx) = −16, so a = v(dv/dx) = −8 m/s².",
    },
    {
      number: 18,
      question:
        "A ball is dropped from height h above the ground. At what fraction of h has it covered exactly half of its total fall time?",
      options: ["1/4 of h", "1/2 of h", "3/4 of h", "It depends on h"],
      correctIndex: 0,
      solution:
        "Since h = ½gt², distance covered is proportional to t². At half the time, distance = (1/2)² = 1/4 of the total height, so the ball has fallen 1/4 of h (and has 3/4 of h still to fall).",
    },
  ],
};
