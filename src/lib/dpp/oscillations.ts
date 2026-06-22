import type { ChapterDpp } from "./kinematics";

export const oscillationsDpp: ChapterDpp = {
  chapterName: "Oscillations",
  className: "11",
  questions: [
    {
      number: 1,
      question: "A particle executes SHM with a frequency of 5 Hz. What is its time period?",
      options: ["0.1 s", "0.2 s", "0.5 s", "5 s"],
      correctIndex: 1,
      solution: "T = 1/n = 1/5 = 0.2 s.",
    },
    {
      number: 2,
      question:
        "A particle executes SHM with amplitude 0.04 m and angular frequency 10 rad/s. What is the maximum speed of the particle?",
      options: ["0.04 m/s", "0.4 m/s", "4 m/s", "0.004 m/s"],
      correctIndex: 1,
      solution: "Maximum speed = Aω = 0.04 × 10 = 0.4 m/s, attained at the mean position.",
    },
    {
      number: 3,
      question:
        "A particle in SHM has amplitude 5 cm and angular frequency 2 rad/s. What is its speed when its displacement from the mean position is 3 cm?",
      options: ["4 cm/s", "6 cm/s", "8 cm/s", "10 cm/s"],
      correctIndex: 2,
      solution: "v = ω√(A² − x²) = 2 × √(5² − 3²) = 2 × √16 = 2 × 4 = 8 cm/s.",
    },
    {
      number: 4,
      question:
        "A particle executes SHM with amplitude 0.02 m and angular frequency 50 rad/s. What is its maximum acceleration?",
      options: ["1 m/s²", "20 m/s²", "50 m/s²", "100 m/s²"],
      correctIndex: 2,
      solution: "Maximum acceleration = ω²A = 50² × 0.02 = 2500 × 0.02 = 50 m/s², attained at the extreme positions.",
    },
    {
      number: 5,
      question:
        "A block of mass 0.5 kg is attached to a spring of force constant 200 N/m. What is the time period of its oscillation?",
      options: ["π/20 s", "π/10 s", "π/5 s", "π s"],
      correctIndex: 1,
      solution: "T = 2π√(m/k) = 2π√(0.5/200) = 2π√0.0025 = 2π × 0.05 = 0.1π = π/10 s.",
    },
    {
      number: 6,
      question:
        "A spring of force constant k, loaded with mass m, has time period T. The spring is now cut into two equal halves, and the same mass m is attached to just one half. What is the new time period, in terms of T?",
      options: ["T/2", "T/√2", "T√2", "2T"],
      correctIndex: 1,
      solution:
        "Cutting a spring of constant k into two equal halves makes each half's spring constant 2k. New period T' = 2π√(m/2k) = (1/√2) × 2π√(m/k) = T/√2.",
    },
    {
      number: 7,
      question:
        "Two springs of force constants 200 N/m and 300 N/m are connected in series. What is the effective spring constant of the combination?",
      options: ["100 N/m", "120 N/m", "250 N/m", "500 N/m"],
      correctIndex: 1,
      solution: "For series springs: 1/k_s = 1/k₁ + 1/k₂ = 1/200 + 1/300. So k_s = (200×300)/(200+300) = 60000/500 = 120 N/m.",
    },
    {
      number: 8,
      question:
        "Using g ≈ π² m/s², what is the time period of a simple pendulum of length 1 m? (This is essentially the principle behind the second's pendulum used to define standard timekeeping.)",
      options: ["1 s", "2 s", "π s", "2π s"],
      correctIndex: 1,
      solution: "T = 2π√(l/g) = 2π√(1/π²) = 2π × (1/π) = 2 s.",
    },
    {
      number: 9,
      question:
        "A simple pendulum has time period T when hanging at rest in a lift. If the lift accelerates upward with acceleration equal to g, what is the new time period in terms of T?",
      options: ["T/2", "T/√2", "T√2", "2T"],
      correctIndex: 1,
      solution: "g_eff = g + a = g + g = 2g. New period T' = 2π√(l/2g) = (1/√2) × 2π√(l/g) = T/√2.",
    },
    {
      number: 10,
      question:
        "The length of a simple pendulum is increased by 21%. What is the percentage change in its time period?",
      options: ["10.5%", "21%", "10%", "42%"],
      correctIndex: 2,
      solution: "T ∝ √l, so T'/T = √(1.21) = 1.1, meaning the time period increases by 10%.",
    },
    {
      number: 11,
      question:
        "If the amplitude of a particle executing SHM is doubled while its mass and angular frequency stay the same, by what factor does its total energy increase?",
      options: ["2", "4", "8", "16"],
      correctIndex: 1,
      solution: "Total energy E = ½mω²A² ∝ A². Doubling A multiplies E by 2² = 4.",
    },
    {
      number: 12,
      question:
        "A particle executes SHM with amplitude A. At a displacement of A/3 from the mean position, what fraction of the total energy is kinetic?",
      options: ["1/9", "1/3", "8/9", "2/3"],
      correctIndex: 2,
      solution:
        "Fraction of KE = (A² − x²)/A² = 1 − (x/A)² = 1 − (1/3)² = 1 − 1/9 = 8/9.",
    },
    {
      number: 13,
      question:
        "For a particle executing SHM with amplitude A, at what displacement (as a fraction of A) is the kinetic energy exactly three times the potential energy?",
      options: ["A/4", "A/2", "A/√2", "A/3"],
      correctIndex: 1,
      solution:
        "KE = 3PE ⇒ ½k(A² − x²) = 3 × ½kx² ⇒ A² − x² = 3x² ⇒ A² = 4x² ⇒ x = A/2.",
    },
    {
      number: 14,
      question:
        "Liquid oscillates in a U-tube with total column length 0.25 m. Taking g ≈ π² m/s², what is the time period of oscillation?",
      options: ["0.5 s", "1 s", "2 s", "4 s"],
      correctIndex: 1,
      solution: "T = 2π√(h/g) = 2π√(0.25/π²) = 2π × (0.5/π) = 1 s.",
    },
    {
      number: 15,
      question:
        "A damped oscillator's amplitude reduces to half its initial value every 20 oscillations. What fraction of the initial amplitude remains after 60 oscillations?",
      options: ["1/4", "1/6", "1/8", "1/16"],
      correctIndex: 2,
      solution: "60 oscillations = 3 half-life intervals of 20 oscillations each, so the amplitude becomes (1/2)³ = 1/8 of the original.",
    },
    {
      number: 16,
      question:
        "A damped oscillator is driven by an external periodic force. Under which condition is the amplitude of the resulting forced oscillation the largest?",
      options: [
        "When the driving frequency is much higher than the natural frequency",
        "When the driving frequency is much lower than the natural frequency",
        "When the driving frequency is close to the natural frequency, with small damping",
        "When the damping coefficient is very large, regardless of driving frequency",
      ],
      correctIndex: 2,
      solution:
        "Resonance occurs when the driving frequency ω_d is close to the system's natural frequency ω. With small damping, this condition produces the maximum possible steady-state amplitude.",
    },
    {
      number: 17,
      question:
        "Two simple pendulums of lengths 1.00 m and 0.81 m start swinging together in phase. After how many oscillations of the longer pendulum will they next be in phase together?",
      options: ["7", "8", "9", "10"],
      correctIndex: 2,
      solution:
        "T_long/T_short = √(l_long/l_short) = √(1.00/0.81) = 1/0.9 = 10/9. They realign when the shorter pendulum has completed exactly one more oscillation than the longer: N × (10/9) = N + 1 ⇒ N = 9.",
    },
    {
      number: 18,
      question:
        "A ball is released (from rest) inside a frictionless tunnel drilled straight through the centre of the Earth. Taking Earth's radius as 6.4 × 10⁶ m and g = 9.8 m/s², find the time period of its oscillation.",
      options: ["42.3 minutes", "60 minutes", "84.6 minutes", "120 minutes"],
      correctIndex: 2,
      solution:
        "T = 2π√(R/g) = 2π√(6.4×10⁶/9.8) ≈ 2π × 808.1 ≈ 5078 s ≈ 84.6 minutes — the same period as an 'infinite' simple pendulum.",
    },
  ],
};
