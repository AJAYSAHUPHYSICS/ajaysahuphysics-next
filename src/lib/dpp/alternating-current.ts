import type { ChapterDpp } from "./kinematics";

export const alternatingCurrentDpp: ChapterDpp = {
  chapterName: "Alternating Current",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "An alternating current has a peak value of 10 A. What is its average value over a half cycle?",
      options: ["6.37 A", "7.07 A", "10 A", "5 A"],
      correctIndex: 0,
      solution:
        "I_avg (half cycle) = 2I₀/π = 2(10)/π = 20/π ≈ 6.37 A.",
    },
    {
      number: 2,
      question:
        "An alternating current is given by I = 5√2 sin(100πt) A. What is its rms value?",
      options: ["10 A", "5√2 A", "5 A", "2.5 A"],
      correctIndex: 2,
      solution:
        "I_rms = I₀/√2 = 5√2/√2 = 5 A.",
    },
    {
      number: 3,
      question:
        "A voltage V = V₀ sin(ωt + π/6) drives a current I = I₀ sin(ωt − π/6) in a circuit. By what phase angle does the current lag the voltage?",
      options: ["30°", "60°", "90°", "120°"],
      correctIndex: 1,
      solution:
        "Phase of I relative to V = (−π/6) − (π/6) = −π/3, so I lags V by π/3 = 60°.",
    },
    {
      number: 4,
      question:
        "An inductor of inductance (1/π) H is connected to a 50 Hz AC supply. Calculate its inductive reactance.",
      options: ["50 Ω", "100 Ω", "31.4 Ω", "200 Ω"],
      correctIndex: 1,
      solution:
        "X_L = ωL = 2πfL = 2π(50)(1/π) = 100 Ω.",
    },
    {
      number: 5,
      question:
        "A capacitor of capacitance (100/π) μF is connected to a 50 Hz AC source. Find its capacitive reactance.",
      options: ["50 Ω", "31.8 Ω", "200 Ω", "100 Ω"],
      correctIndex: 3,
      solution:
        "X_C = 1/(2πfC) = 1/[2π(50) × (100/π)×10⁻⁶] = 1/(0.01) = 100 Ω.",
    },
    {
      number: 6,
      question:
        "In a series LR circuit, R = 30 Ω and X_L = 40 Ω. What is the impedance of the circuit?",
      options: ["10 Ω", "50 Ω", "70 Ω", "1200 Ω"],
      correctIndex: 1,
      solution:
        "Z_L = √(R² + X_L²) = √(30² + 40²) = √(900+1600) = √2500 = 50 Ω.",
    },
    {
      number: 7,
      question:
        "In a series RC circuit, R = 10√3 Ω and X_C = 10 Ω. By what phase angle does the applied emf lag the current?",
      options: ["15°", "30°", "45°", "60°"],
      correctIndex: 1,
      solution:
        "tan φ = X_C/R = 10/(10√3) = 1/√3, so φ = 30°. The emf lags the current by this angle in an RC circuit.",
    },
    {
      number: 8,
      question:
        "A series LCR circuit has R = 6 Ω, X_L = 18 Ω, and X_C = 10 Ω. Calculate the impedance of the circuit.",
      options: ["8 Ω", "10 Ω", "28 Ω", "100 Ω"],
      correctIndex: 1,
      solution:
        "Net reactance = X_L − X_C = 8 Ω. Z = √(R² + 8²) = √(36+64) = √100 = 10 Ω.",
    },
    {
      number: 9,
      question:
        "A series LCR circuit has L = 1 H and C = 1 μF. Calculate its resonant frequency.",
      options: ["50 Hz", "159 Hz", "318 Hz", "1000 Hz"],
      correctIndex: 1,
      solution:
        "f₀ = 1/(2π√(LC)) = 1/(2π√(1 × 10⁻⁶)) = 1/(2π × 10⁻³) ≈ 159 Hz.",
    },
    {
      number: 10,
      question:
        "A series LCR circuit with R = 50 Ω is driven at its resonant frequency by a 200 V (rms) source. What is the rms current in the circuit?",
      options: ["2 A", "4 A", "8 A", "200 A"],
      correctIndex: 1,
      solution:
        "At resonance, Z = R, so I = V/R = 200/50 = 4 A.",
    },
    {
      number: 11,
      question:
        "For a series LCR circuit with R = 10 Ω, L = 1 H and C = 1 μF, calculate the quality factor.",
      options: ["10", "100", "1000", "0.1"],
      correctIndex: 1,
      solution:
        "Q = (1/R)√(L/C) = (1/10)√(1/10⁻⁶) = (1/10)(1000) = 100.",
    },
    {
      number: 12,
      question:
        "A series resonant circuit has a resonant frequency of 2000 Hz and a quality factor of 50. What is its bandwidth?",
      options: ["25 Hz", "40 Hz", "100 Hz", "2000 Hz"],
      correctIndex: 1,
      solution:
        "Bandwidth Δf = f₀/Q = 2000/50 = 40 Hz.",
    },
    {
      number: 13,
      question:
        "In an AC circuit, the resistance is 80 Ω and the total impedance is 100 Ω. What is the power factor?",
      options: ["0.6", "0.8", "1.25", "8"],
      correctIndex: 1,
      solution:
        "Power factor cos φ = R/Z = 80/100 = 0.8.",
    },
    {
      number: 14,
      question:
        "An AC source with rms voltage 200 V drives an rms current of 2 A through a circuit, with the current lagging the voltage by 60°. Calculate the average power consumed.",
      options: ["400 W", "346 W", "200 W", "100 W"],
      correctIndex: 2,
      solution:
        "P_avg = V_rms I_rms cos φ = 200 × 2 × cos 60° = 400 × 0.5 = 200 W.",
    },
    {
      number: 15,
      question:
        "The rms current in an AC circuit is 10 A, and the phase angle between voltage and current is 30°. What is the wattless component of the current?",
      options: ["10 A", "8.66 A", "5 A", "0 A"],
      correctIndex: 2,
      solution:
        "Wattless current = I_rms sin φ = 10 × sin 30° = 10 × 0.5 = 5 A.",
    },
    {
      number: 16,
      question:
        "An ideal choke coil (zero ohmic resistance) is connected to an AC source. What are its power factor and average power consumption?",
      options: [
        "Power factor = 0; average power = zero",
        "Power factor = 1; average power = maximum",
        "Power factor = 0.5; average power = half of maximum",
        "Power factor = 1; average power = zero",
      ],
      correctIndex: 0,
      solution:
        "With r = 0, cos φ = r/Z = 0, so the power factor is 0, and P_avg = V_rms I_rms cos φ = 0 regardless of the current flowing.",
    },
    {
      number: 17,
      question:
        "An LC circuit has L = 10 mH and C = 1 μF, with the capacitor initially charged to 100 μC. What is the maximum current that flows in the circuit?",
      options: ["0.1 A", "1 A", "10 A", "100 A"],
      correctIndex: 1,
      solution:
        "ω = 1/√(LC) = 1/√(10×10⁻³ × 1×10⁻⁶) = 1/√(10⁻⁸) = 10⁴ rad/s. I_max = q_m ω = (100×10⁻⁶)(10⁴) = 1 A.",
    },
    {
      number: 18,
      question:
        "In a free LC oscillation of period T, the capacitor is fully charged at t = 0. At what minimum time is the energy shared equally between the capacitor and the inductor?",
      options: ["T/16", "T/8", "T/4", "T/2"],
      correctIndex: 1,
      solution:
        "q = q_m cos ωt. Equal sharing needs q²/2C = (1/2)(q_m²/2C), so q = q_m/√2, giving cos ωt = 1/√2, ωt = π/4, t = (π/4)/(2π/T) = T/8.",
    },
  ],
};
