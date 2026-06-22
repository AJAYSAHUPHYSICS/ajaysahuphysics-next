import type { ChapterDpp } from "./kinematics";

export const wavesDpp: ChapterDpp = {
  chapterName: "Waves",
  className: "11",
  questions: [
    {
      number: 1,
      question:
        "The equation of a transverse wave travelling along a string is y = 0.05 sin(4πx − 200πt) m, where x is in metres and t in seconds. What is the speed of the wave?",
      options: ["12.5 m/s", "50 m/s", "100 m/s", "200 m/s"],
      correctIndex: 1,
      solution:
        "Comparing with y = A sin(kx − ωt): k = 4π rad/m, ω = 200π rad/s. Wave speed V = ω/k = 200π/4π = 50 m/s.",
    },
    {
      number: 2,
      question:
        "For the wave y = 0.05 sin(4πx − 200πt) m described above, what is the maximum speed of a particle of the string?",
      options: ["10π m/s (≈31.4 m/s)", "5π m/s (≈15.7 m/s)", "20π m/s (≈62.8 m/s)", "2.5π m/s (≈7.85 m/s)"],
      correctIndex: 0,
      solution:
        "Maximum particle speed v_p(max) = Aω = 0.05 × 200π = 10π ≈ 31.4 m/s. Note this is very different from the wave speed of 50 m/s found above — wave velocity and particle velocity are independent quantities.",
    },
    {
      number: 3,
      question:
        "A stretched wire under tension T supports a transverse wave of speed V. If the tension is increased to 4T while the mass per unit length stays the same, what is the new wave speed?",
      options: ["V/2", "2V", "4V", "V (unchanged)"],
      correctIndex: 1,
      solution:
        "Wave speed on a string: V = √(T/μ), so V ∝ √T. Increasing tension to 4T gives new speed = √4 × V = 2V.",
    },
    {
      number: 4,
      question:
        "Two wires of the same material, under the same tension, have diameters in the ratio 1 : 2 (thin : thick). What is the ratio of wave speeds on them (thin wire : thick wire)?",
      options: ["1 : 2", "2 : 1", "1 : 4", "4 : 1"],
      correctIndex: 1,
      solution:
        "Mass per unit length μ = πD²ρ/4, so V = √(T/μ) ∝ 1/D for fixed T and ρ. V(thin)/V(thick) = D(thick)/D(thin) = 2/1, i.e., the thin wire carries the wave twice as fast — ratio 2 : 1.",
    },
    {
      number: 5,
      question:
        "Calculate the speed of sound in a gas with pressure 1.0 × 10⁵ Pa, density 1.3 kg/m³, and γ = 1.4.",
      options: ["258 m/s", "279 m/s", "328 m/s", "332 m/s"],
      correctIndex: 2,
      solution:
        "Using Laplace's formula: V = √(γP/ρ) = √(1.4 × 1.0×10⁵ / 1.3) = √(107692) ≈ 328 m/s.",
    },
    {
      number: 6,
      question:
        "The speed of sound in air at 0°C is 332 m/s. Using V_t = V₀ + 0.61t, find the speed of sound at 30°C.",
      options: ["332.0 m/s", "341.2 m/s", "350.3 m/s", "361.0 m/s"],
      correctIndex: 2,
      solution: "V_t = V₀ + 0.61t = 332 + 0.61 × 30 = 332 + 18.3 = 350.3 m/s.",
    },
    {
      number: 7,
      question:
        "Two coherent sound waves of amplitude ratio 3 : 2 superpose at a point. What is the ratio I_max : I_min at that point?",
      options: ["25 : 1", "5 : 1", "9 : 4", "16 : 1"],
      correctIndex: 0,
      solution:
        "I_max : I_min = (a₁ + a₂)² : (a₁ − a₂)² = (3+2)² : (3−2)² = 25 : 1.",
    },
    {
      number: 8,
      question:
        "A tuning fork of frequency 256 Hz produces 4 beats per second with an unknown tuning fork. When the unknown fork is loaded with a little wax (which lowers its frequency), the beat frequency decreases to 2 beats per second. What is the frequency of the unknown fork?",
      options: ["248 Hz", "252 Hz", "260 Hz", "264 Hz"],
      correctIndex: 2,
      solution:
        "The unknown fork's frequency is either 256 − 4 = 252 Hz or 256 + 4 = 260 Hz. Loading with wax lowers frequency. If it were 252 Hz, lowering it further would move it away from 256 Hz, increasing the beat frequency — but the beats decreased. So the fork must be at 260 Hz; lowering it toward 256 Hz reduces the beat frequency to 2, consistent with the data.",
    },
    {
      number: 9,
      question:
        "A closed organ pipe is 25 cm long. Taking the speed of sound in air as 340 m/s and ignoring end correction, find its fundamental frequency.",
      options: ["170 Hz", "340 Hz", "680 Hz", "850 Hz"],
      correctIndex: 1,
      solution: "For a closed pipe: n = V/4L = 340/(4 × 0.25) = 340/1 = 340 Hz.",
    },
    {
      number: 10,
      question:
        "An open organ pipe of length 1 m resonates at 510 Hz, which is one of its overtones. Taking the speed of sound as 340 m/s, which harmonic is this?",
      options: [
        "Fundamental",
        "First overtone (2nd harmonic)",
        "Second overtone (3rd harmonic)",
        "Third overtone (4th harmonic)",
      ],
      correctIndex: 2,
      solution:
        "Fundamental of the open pipe: n₁ = V/2L = 340/(2×1) = 170 Hz. 510/170 = 3, so 510 Hz is the 3rd harmonic — the second overtone of an open pipe (all harmonics are allowed).",
    },
    {
      number: 11,
      question:
        "In a resonance tube experiment using a tuning fork of frequency 512 Hz, the first and second resonance lengths are found to be 16.5 cm and 50.5 cm. Calculate the speed of sound in air.",
      options: ["332 m/s", "340 m/s", "348 m/s", "356 m/s"],
      correctIndex: 2,
      solution:
        "λ = 2(l₂ − l₁) = 2(50.5 − 16.5) cm = 68 cm = 0.68 m. Speed V = nλ = 512 × 0.68 ≈ 348 m/s.",
    },
    {
      number: 12,
      question:
        "In a resonance tube, the first resonance length is 17 cm and the second is 53 cm. Find the end correction (e).",
      options: ["0.5 cm", "1.0 cm", "1.5 cm", "2.0 cm"],
      correctIndex: 1,
      solution:
        "λ = 2(l₂ − l₁) = 2(53 − 17) = 72 cm. For the first resonance, l₁ + e = λ/4 = 18 cm, so e = 18 − 17 = 1.0 cm.",
    },
    {
      number: 13,
      question:
        "A sonometer wire of length L under tension T vibrates at its fundamental frequency n. If the tension is increased to 2.25T (length unchanged), what is the new fundamental frequency?",
      options: ["1.125n", "1.5n", "2.25n", "2n"],
      correctIndex: 1,
      solution:
        "Fundamental frequency n ∝ √T (length and mass per unit length fixed). n'/n = √(2.25T/T) = √2.25 = 1.5, so n' = 1.5n.",
    },
    {
      number: 14,
      question:
        "A wire vibrating in its fundamental mode at frequency n is replaced by an identical wire of double the length, under the same tension and with the same mass per unit length. In how many loops (segments) must the new wire vibrate to produce the same frequency n?",
      options: ["1", "2", "3", "4"],
      correctIndex: 1,
      solution:
        "Original fundamental: n = (1/2L)√(T/m). For the wire of length 2L vibrating in p loops: nₚ = (p/2(2L))√(T/m) = (p/4L)√(T/m). Setting nₚ = n: p/4L = 1/2L ⇒ p = 2 loops.",
    },
    {
      number: 15,
      question:
        "A train sounds its whistle of frequency 480 Hz while approaching a stationary observer at 30 m/s. Taking the speed of sound as 330 m/s, what frequency does the observer hear?",
      options: ["440 Hz", "480 Hz", "528 Hz", "550 Hz"],
      correctIndex: 2,
      solution:
        "Source approaching stationary observer: n' = nV/(V − v_s) = 480 × 330/(330 − 30) = 480 × 330/300 = 528 Hz.",
    },
    {
      number: 16,
      question:
        "A stationary source emits sound of frequency 600 Hz. An observer moves directly away from the source at 20 m/s. Taking the speed of sound as 340 m/s, what frequency does the observer hear?",
      options: ["529 Hz", "565 Hz", "600 Hz", "635 Hz"],
      correctIndex: 1,
      solution:
        "Observer receding from a stationary source: n' = n(V − v₀)/V = 600 × (340 − 20)/340 = 600 × 320/340 ≈ 565 Hz.",
    },
    {
      number: 17,
      question:
        "A source of frequency 500 Hz moves towards a stationary listener at 20 m/s, while the listener simultaneously moves towards the source at 10 m/s. Taking the speed of sound as 340 m/s, find the apparent frequency heard.",
      options: ["500 Hz", "525 Hz", "547 Hz", "570 Hz"],
      correctIndex: 2,
      solution:
        "Both moving towards each other: n' = n(V + v₀)/(V − v_s) = 500 × (340 + 10)/(340 − 20) = 500 × 350/320 ≈ 547 Hz.",
    },
    {
      number: 18,
      question:
        "A jet flies at a speed of 680 m/s through air where the speed of sound is 340 m/s. What is the half-angle of the conical shock wave it produces?",
      options: ["15°", "30°", "45°", "60°"],
      correctIndex: 1,
      solution:
        "Mach number M = v_s/V = 680/340 = 2. The shock cone half-angle satisfies sinθ = 1/M = 1/2, so θ = 30°.",
    },
  ],
};
