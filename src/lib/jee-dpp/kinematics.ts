import type { ChapterDpp } from "../dpp/kinematics";

export const kinematicsJeeDpp: ChapterDpp = {
  chapterName: "Kinematics",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "A boat that rows at 10 km/h in still water crosses a river 4.8 km wide flowing at 6 km/h, taking the shortest possible PATH (straight across). Find the time taken.",
      options: ["0.4 h", "0.5 h", "0.6 h", "0.8 h"],
      correctIndex: 2,
      solution:
        "For the shortest path, v_across = √(v_boat² − v_river²) = √(10²−6²) = √64 = 8 km/h. Time = width/v_across = 4.8/8 = 0.6 h.",
    },
    {
      number: 2,
      question:
        "Rain falls vertically at 20 m/s. A cyclist rides horizontally at 20 m/s. Find the speed of the rain as seen by the cyclist.",
      options: ["20 m/s", "20√2 m/s", "28.3 m/s", "40 m/s"],
      correctIndex: 1,
      solution:
        "Relative velocity of rain w.r.t. cyclist has components (−20, −20) (taking cyclist's direction as positive x). Magnitude = √(20²+20²) = 20√2 ≈ 28.3 m/s.",
    },
    {
      number: 3,
      question:
        "A particle is projected at 60° to the horizontal up an incline of 30°, with initial speed 10 m/s. Find the time of flight along the incline. (g = 10 m/s²)",
      options: ["2/√3 s", "1 s", "√3 s", "2 s"],
      correctIndex: 0,
      solution: "T = 2u sin(θ−α)/(g cosα) = 2(10)sin30°/(10 cos30°) = 10/(10×0.866) = 1/0.866 = 2/√3 s ≈ 1.15 s.",
    },
    {
      number: 4,
      question:
        "A stone is dropped from a height of 40 m at the same instant a ball is thrown up from the ground with speed 20 m/s. At what height do they meet? (g = 10 m/s²)",
      options: ["10 m", "15 m", "20 m", "25 m"],
      correctIndex: 2,
      solution:
        "They meet when ut = h ⇒ t = 40/20 = 2 s. Height of meeting (from ground, using the ball): y = ut − ½gt² = 20(2) − 5(4) = 40 − 20 = 20 m.",
    },
    {
      number: 5,
      question:
        "A particle accelerates uniformly from rest to 30 m/s in 6 s, then decelerates uniformly to rest in 4 s. Find the total distance covered.",
      options: ["90 m", "120 m", "150 m", "180 m"],
      correctIndex: 2,
      solution: "Area under v-t graph: rising triangle = ½(6)(30) = 90 m; falling triangle = ½(4)(30) = 60 m. Total = 90+60 = 150 m.",
    },
    {
      number: 6,
      question:
        "A projectile is launched at 40° and again at 50° with the same speed 20 m/s. Compare their horizontal ranges.",
      options: ["Range at 40° is greater", "Range at 50° is greater", "Both ranges are equal", "Cannot be compared without g"],
      correctIndex: 2,
      solution:
        "40° and 50° are complementary angles (they sum to 90°). Projectiles launched at complementary angles with the same speed always have equal range — both give R = u²sin(2θ)/g ≈ 39.4 m here.",
    },
    {
      number: 7,
      question: "A particle starts with velocity 2 m/s and moves with uniform acceleration 4 m/s². Find the distance covered in the 5th second.",
      options: ["16 m", "18 m", "20 m", "22 m"],
      correctIndex: 2,
      solution: "sₙ = u + (a/2)(2n−1) = 2 + 2(9) = 2 + 18 = 20 m.",
    },
    {
      number: 8,
      question: "Car A moves east at 30 m/s and car B moves north at 40 m/s. Find the magnitude of velocity of A relative to B.",
      options: ["10 m/s", "35 m/s", "50 m/s", "70 m/s"],
      correctIndex: 2,
      solution: "Relative velocity = A − B = (30, −40) (east-north components). Magnitude = √(30²+40²) = √2500 = 50 m/s.",
    },
    {
      number: 9,
      question: "A ball thrown vertically up returns to the thrower after 4 s. Find the maximum height reached. (g = 10 m/s²)",
      options: ["10 m", "15 m", "20 m", "25 m"],
      correctIndex: 2,
      solution: "Using H = gT²/8 (where T is the total time of flight): H = 10(16)/8 = 160/8 = 20 m.",
    },
    {
      number: 10,
      question: "A projectile is launched with speed 20 m/s. Find its maximum possible horizontal range. (g = 10 m/s²)",
      options: ["20 m", "30 m", "40 m", "50 m"],
      correctIndex: 2,
      solution: "Maximum range occurs at 45°: R_max = u²/g = 400/10 = 40 m.",
    },
    {
      number: 11,
      question: "A car covers the first half of a journey at 20 m/s and the second half (equal distance) at 30 m/s. Find its average speed for the whole journey.",
      options: ["22 m/s", "24 m/s", "25 m/s", "26 m/s"],
      correctIndex: 1,
      solution: "For equal distances at two speeds, average speed is the harmonic mean: 2v₁v₂/(v₁+v₂) = 2(20)(30)/50 = 1200/50 = 24 m/s.",
    },
    {
      number: 12,
      question: "A car decelerates uniformly from 30 m/s to rest over a distance of 90 m. Find its deceleration.",
      options: ["3 m/s²", "5 m/s²", "6 m/s²", "9 m/s²"],
      correctIndex: 1,
      solution: "v² = u² − 2as ⇒ 0 = 30² − 2a(90) ⇒ a = 900/180 = 5 m/s².",
    },
  ],
};
