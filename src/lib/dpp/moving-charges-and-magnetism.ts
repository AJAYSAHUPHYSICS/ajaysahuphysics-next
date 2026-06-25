import type { ChapterDpp } from "./kinematics";

export const movingChargesAndMagnetismDpp: ChapterDpp = {
  chapterName: "Moving Charges & Magnetism",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "A long straight wire carries a current of 5 A. Find the magnetic field at a point 10 cm from the wire.",
      options: ["5 μT", "10 μT", "20 μT", "2 μT"],
      correctIndex: 1,
      solution:
        "B = μ₀I/(2πa) = (4π×10⁻⁷ × 5)/(2π × 0.10) = (2×10⁻⁷ × 5)/0.10 = 1×10⁻⁵ T = 10 μT.",
    },
    {
      number: 2,
      question:
        "A circular coil of 100 turns and radius 10 cm carries a current of 2 A. Find the magnetic field at its centre.",
      options: ["6.3 × 10⁻⁴ T", "1.26 × 10⁻³ T", "2.5 × 10⁻³ T", "1.26 × 10⁻⁴ T"],
      correctIndex: 1,
      solution:
        "B₀ = μ₀NI/(2R) = (4π×10⁻⁷ × 100 × 2)/(2 × 0.10) = 4π×10⁻⁴ T ≈ 1.26 × 10⁻³ T.",
    },
    {
      number: 3,
      question:
        "A long solenoid has 1000 turns per metre and carries a current of 2 A. Find the magnetic field well inside the solenoid.",
      options: ["1.26 × 10⁻³ T", "2.51 × 10⁻³ T", "5.02 × 10⁻³ T", "2.51 × 10⁻⁴ T"],
      correctIndex: 1,
      solution:
        "B = μ₀nI = 4π×10⁻⁷ × 1000 × 2 = 8π×10⁻⁴ T ≈ 2.51 × 10⁻³ T.",
    },
    {
      number: 4,
      question:
        "A proton (m = 1.67 × 10⁻²⁷ kg) moves at 2 × 10⁶ m/s perpendicular to a magnetic field of 0.5 T. Find the radius of its circular path.",
      options: ["2.1 cm", "4.2 cm", "8.4 cm", "1.05 cm"],
      correctIndex: 1,
      solution:
        "r = mv/(qB) = (1.67×10⁻²⁷ × 2×10⁶)/(1.6×10⁻¹⁹ × 0.5) = (3.34×10⁻²¹)/(8×10⁻²⁰) ≈ 0.0418 m ≈ 4.2 cm.",
    },
    {
      number: 5,
      question:
        "Find the cyclotron frequency of a proton moving in a magnetic field of 1 T.",
      options: ["7.6 MHz", "15.2 MHz", "30.4 MHz", "1.52 MHz"],
      correctIndex: 1,
      solution:
        "ν = qB/(2πm) = (1.6×10⁻¹⁹ × 1)/(2π × 1.67×10⁻²⁷) = (1.6×10⁻¹⁹)/(1.049×10⁻²⁶) ≈ 1.52×10⁷ Hz = 15.2 MHz.",
    },
    {
      number: 6,
      question:
        "Two long parallel wires carry currents of 3 A and 5 A and are separated by 10 cm. Find the magnetic force per unit length between them.",
      options: ["1.5 × 10⁻⁵ N/m", "3 × 10⁻⁵ N/m", "6 × 10⁻⁵ N/m", "3 × 10⁻⁴ N/m"],
      correctIndex: 1,
      solution:
        "f = μ₀I₁I₂/(2πd) = (4π×10⁻⁷ × 3 × 5)/(2π × 0.10) = (2×10⁻⁷ × 15)/0.10 = 3×10⁻⁵ N/m.",
    },
    {
      number: 7,
      question:
        "A toroid of mean radius 20 cm has 2000 turns and carries a current of 2 A. Find the magnetic field inside its core.",
      options: ["2 × 10⁻³ T", "4 × 10⁻³ T", "8 × 10⁻³ T", "4 × 10⁻⁴ T"],
      correctIndex: 1,
      solution:
        "n = N/(2πR_m) = 2000/(2π × 0.20) ≈ 1592 turns/m. B = μ₀nI = 4π×10⁻⁷ × 1592 × 2 ≈ 4×10⁻³ T.",
    },
    {
      number: 8,
      question:
        "A galvanometer coil has N = 50 turns, area 4 × 10⁻⁴ m², sits in a field B = 0.2 T, and has a restoring constant C = 1 × 10⁻⁶ N·m/rad. Find its current sensitivity.",
      options: ["2000 rad/A", "4000 rad/A", "8000 rad/A", "1000 rad/A"],
      correctIndex: 1,
      solution:
        "C.S. = NAB/C = (50 × 4×10⁻⁴ × 0.2)/(1×10⁻⁶) = (4×10⁻³)/(1×10⁻⁶) = 4000 rad/A.",
    },
    {
      number: 9,
      question:
        "An electron moves at 1 × 10⁷ m/s perpendicular to a magnetic field of 2 × 10⁻³ T. Find the magnitude of the magnetic force on it.",
      options: ["1.6 × 10⁻¹⁵ N", "3.2 × 10⁻¹⁵ N", "6.4 × 10⁻¹⁵ N", "3.2 × 10⁻¹⁶ N"],
      correctIndex: 1,
      solution:
        "F = qvB = (1.6×10⁻¹⁹)(1×10⁷)(2×10⁻³) = 3.2×10⁻¹⁵ N.",
    },
    {
      number: 10,
      question:
        "A 0.5 m wire carries a current of 4 A in a magnetic field of 0.3 T, making an angle of 30° with the field. Find the magnetic force on the wire.",
      options: ["0.15 N", "0.3 N", "0.6 N", "1.2 N"],
      correctIndex: 1,
      solution:
        "F = BIL sinθ = 0.3 × 4 × 0.5 × sin30° = 0.6 × 0.5 = 0.3 N.",
    },
    {
      number: 11,
      question:
        "In the first Bohr orbit of hydrogen (r ≈ 0.53 Å, v ≈ 2.18 × 10⁶ m/s), find the equivalent orbital current of the electron.",
      options: ["0.52 mA", "1.05 mA", "2.1 mA", "4.2 mA"],
      correctIndex: 1,
      solution:
        "T = 2πr/v = (2π × 0.53×10⁻¹⁰)/(2.18×10⁶) ≈ 1.527×10⁻¹⁶ s. I = e/T = (1.6×10⁻¹⁹)/(1.527×10⁻¹⁶) ≈ 1.05×10⁻³ A = 1.05 mA.",
    },
    {
      number: 12,
      question:
        "A solid cylindrical conductor of radius 4 cm carries a current of 10 A, uniformly distributed. Find the magnetic field at a point 2 cm from the axis (inside the conductor).",
      options: ["1.25 × 10⁻⁵ T", "2.5 × 10⁻⁵ T", "5 × 10⁻⁵ T", "2.5 × 10⁻⁴ T"],
      correctIndex: 1,
      solution:
        "Inside: B = μ₀Ir/(2πR²) = (4π×10⁻⁷ × 10 × 0.02)/(2π × 0.04²) = (2×10⁻⁷ × 10 × 0.02)/(0.0016) = 2.5×10⁻⁵ T.",
    },
    {
      number: 13,
      question:
        "A square current loop of side 20 cm carries a current of 5 A. Find the magnetic field at its centre.",
      options: ["1.41 × 10⁻⁵ T", "2.83 × 10⁻⁵ T", "5.66 × 10⁻⁵ T", "2.83 × 10⁻⁶ T"],
      correctIndex: 1,
      solution:
        "B = 2√2 μ₀I/(πa) = 2√2 × (4π×10⁻⁷ × 5)/(π × 0.20) = 2√2 × 10⁻⁵ ≈ 2.83×10⁻⁵ T.",
    },
    {
      number: 14,
      question:
        "A rectangular coil of 20 turns and dimensions 2 cm × 3 cm carries a current of 3 A in a field of 0.25 T, with its plane parallel to the field. Find the torque on it.",
      options: ["4.5 × 10⁻³ N·m", "9 × 10⁻³ N·m", "1.8 × 10⁻² N·m", "9 × 10⁻⁴ N·m"],
      correctIndex: 1,
      solution:
        "Plane ∥ B means M ⊥ B, so θ = 90° (maximum torque). τ = NIAB = 20 × 3 × (0.02×0.03) × 0.25 = 20×3×6×10⁻⁴×0.25 = 9×10⁻³ N·m.",
    },
    {
      number: 15,
      question:
        "A proton moves at 1 × 10⁶ m/s at 60° to a magnetic field of 0.2 T. Find the pitch of its helical path. (m = 1.67 × 10⁻²⁷ kg)",
      options: ["8.2 cm", "16.4 cm", "32.8 cm", "20.5 cm"],
      correctIndex: 1,
      solution:
        "T = 2πm/(qB) = (2π × 1.67×10⁻²⁷)/(1.6×10⁻¹⁹ × 0.2) ≈ 3.28×10⁻⁷ s. Pitch = v cosθ · T = 1×10⁶ × cos60° × 3.28×10⁻⁷ = 1×10⁶ × 0.5 × 3.28×10⁻⁷ ≈ 0.164 m = 16.4 cm.",
    },
    {
      number: 16,
      question:
        "A galvanometer has current sensitivity 100 rad/A and coil resistance 100 Ω. Find its voltage sensitivity.",
      options: ["0.5 rad/V", "1 rad/V", "2 rad/V", "100 rad/V"],
      correctIndex: 1,
      solution:
        "V.S. = C.S./R = 100/100 = 1 rad/V.",
    },
    {
      number: 17,
      question:
        "A wire is bent into a three-quarter circle (270°) of radius 10 cm and carries a current of 4 A. Find the magnetic field at the centre due to this arc.",
      options: ["0.94 × 10⁻⁵ T", "1.885 × 10⁻⁵ T", "3.77 × 10⁻⁵ T", "1.885 × 10⁻⁴ T"],
      correctIndex: 1,
      solution:
        "B = μ₀Iα/(4πR) with α = 3π/2 rad: B = (4π×10⁻⁷ × 4 × 3π/2)/(4π × 0.10) = (3μ₀I)/(8R) = (3 × 4π×10⁻⁷ × 4)/(8 × 0.10) ≈ 1.885×10⁻⁵ T.",
    },
    {
      number: 18,
      question:
        "In a cyclotron, a proton reaches a maximum radius of 0.4 m in a magnetic field of 1.5 T. Find its maximum kinetic energy.",
      options: ["4.3 MeV", "8.6 MeV", "17.2 MeV", "34.5 MeV"],
      correctIndex: 2,
      solution:
        "(E_K)_max = q²B²r²/(2m) = (1.6×10⁻¹⁹)² × (1.5)² × (0.4)²/(2 × 1.67×10⁻²⁷) ≈ 2.76×10⁻¹² J ÷ 1.6×10⁻¹³ J/MeV ≈ 17.2 MeV.",
    },
  ],
};
