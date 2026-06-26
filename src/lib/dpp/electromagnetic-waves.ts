import type { ChapterDpp } from "./kinematics";

export const electromagneticWavesDpp: ChapterDpp = {
  chapterName: "Electromagnetic Waves",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "If E and B are the electric and magnetic field vectors of an electromagnetic wave, the direction of propagation of the wave is along:",
      options: ["E", "B", "E × B", "Cannot be determined"],
      correctIndex: 2,
      solution:
        "E, B, and the direction of propagation form a mutually perpendicular set, with the wave travelling along the direction of E × B.",
    },
    {
      number: 2,
      question: "Electromagnetic waves do NOT transport:",
      options: ["Energy", "Charge", "Momentum", "Information"],
      correctIndex: 1,
      solution:
        "EM waves carry energy and momentum (hence exert radiation pressure) and can carry information (e.g. radio signals), but they never transport charge.",
    },
    {
      number: 3,
      question:
        "An electromagnetic wave is described by E = 5×10⁻⁴ sin(π×10⁷x − 3π×10¹⁵t) (SI units). What is the speed of this wave?",
      options: ["1 × 10⁸ m/s", "3 × 10⁸ m/s", "9 × 10⁸ m/s", "3 × 10⁷ m/s"],
      correctIndex: 1,
      solution:
        "Speed = ω/k = (3π×10¹⁵)/(π×10⁷) = 3 × 10⁸ m/s — exactly c, as expected for an EM wave in vacuum.",
    },
    {
      number: 4,
      question:
        "For the same wave, E = 5×10⁻⁴ sin(π×10⁷x − 3π×10¹⁵t), what is its wavelength?",
      options: ["100 nm", "200 nm", "500 nm", "1000 nm"],
      correctIndex: 1,
      solution: "λ = 2π/k = 2π/(π×10⁷) = 2×10⁻⁷ m = 200 nm.",
    },
    {
      number: 5,
      question:
        "Which of Maxwell's four equations directly expresses the fact that an isolated magnetic monopole does not exist?",
      options: [
        "Gauss's law in electrostatics",
        "Gauss's law in magnetism",
        "Faraday's law of EM induction",
        "Ampère–Maxwell circuital law",
      ],
      correctIndex: 1,
      solution:
        "Gauss's law in magnetism states ∮B·dS = 0 for any closed surface — net magnetic flux is always zero because magnetic poles always occur in pairs.",
    },
    {
      number: 6,
      question:
        "The electric field between the plates of a parallel-plate capacitor (plate area 0.02 m²) changes at a rate of 1 × 10¹² V/(m·s). What is the displacement current between the plates?",
      options: ["0.0885 A", "0.177 A", "0.354 A", "1.77 A"],
      correctIndex: 1,
      solution: "I_d = ε₀A(dE/dt) = 8.85×10⁻¹² × 0.02 × 10¹² ≈ 0.177 A.",
    },
    {
      number: 7,
      question:
        "A parallel-plate capacitor has circular plates of radius 10 cm separated by 4 mm, and is being charged by a constant current of 0.2 A. What is the displacement current between the plates?",
      options: ["0 A", "0.1 A", "0.2 A", "0.4 A"],
      correctIndex: 2,
      solution:
        "For a capacitor charging at constant current I, the displacement current between the plates always equals the conduction current in the wires: I_d = I = 0.2 A (the capacitance and gap geometry only affect dV/dt, not I_d).",
    },
    {
      number: 8,
      question:
        "In an electromagnetic wave, the electric field has amplitude 90 V/m. What is the amplitude of the magnetic field?",
      options: ["3 × 10⁻⁷ T", "9 × 10⁻⁷ T", "2.7 × 10⁻⁷ T", "3 × 10⁻⁶ T"],
      correctIndex: 0,
      solution: "B = E/c = 90/(3×10⁸) = 3 × 10⁻⁷ T.",
    },
    {
      number: 9,
      question:
        "A plane electromagnetic wave has an electric field amplitude of 100 V/m. What is its average intensity?",
      options: ["6.6 W/m²", "13.3 W/m²", "26.6 W/m²", "100 W/m²"],
      correctIndex: 1,
      solution:
        "I_av = ½ε₀cE_m² = 0.5 × 8.85×10⁻¹² × 3×10⁸ × (100)² ≈ 13.3 W/m².",
    },
    {
      number: 10,
      question:
        "A plane electromagnetic wave has an electric field amplitude of 60 V/m. What is the total average energy density of the wave?",
      options: ["7.97 × 10⁻⁹ J/m³", "1.59 × 10⁻⁸ J/m³", "3.19 × 10⁻⁸ J/m³", "1.59 × 10⁻⁷ J/m³"],
      correctIndex: 1,
      solution: "u_av = ½ε₀E_m² = 0.5 × 8.85×10⁻¹² × (60)² ≈ 1.59 × 10⁻⁸ J/m³.",
    },
    {
      number: 11,
      question:
        "An electromagnetic wave of intensity 600 W/m² is incident on a surface. What is the radiation pressure if the surface is (a) perfectly absorbing and (b) perfectly reflecting?",
      options: [
        "(a) 1×10⁻⁶ Pa, (b) 2×10⁻⁶ Pa",
        "(a) 2×10⁻⁶ Pa, (b) 4×10⁻⁶ Pa",
        "(a) 2×10⁻⁶ Pa, (b) 2×10⁻⁶ Pa",
        "(a) 4×10⁻⁶ Pa, (b) 8×10⁻⁶ Pa",
      ],
      correctIndex: 1,
      solution:
        "Absorbing: P = S/c = 600/(3×10⁸) = 2×10⁻⁶ Pa. Reflecting: P = 2S/c = 4×10⁻⁶ Pa — exactly double.",
    },
    {
      number: 12,
      question:
        "A point source radiates electromagnetic waves uniformly in all directions with an average power output of 1000 W. What is the amplitude of the electric field at a distance of 5 m from the source?",
      options: ["24.5 V/m", "34.6 V/m", "49.0 V/m", "69.3 V/m"],
      correctIndex: 2,
      solution:
        "I_av = P/(4πr²) = ε₀cE_m²/2 ⟹ E_m = √(μ₀cP/(2πr²)) = √[(4π×10⁻⁷ × 3×10⁸ × 1000)/(2π×5²)] ≈ 49.0 V/m.",
    },
    {
      number: 13,
      question:
        "A radio receiver is tuned to a wavelength of 600 m using an inductor of 2 mH. What capacitance is required in the tuning circuit?",
      options: ["25.3 pF", "50.7 pF", "101.3 pF", "200 pF"],
      correctIndex: 1,
      solution:
        "f = c/λ = (3×10⁸)/600 = 5×10⁵ Hz. From f = 1/(2π√(LC)): C = 1/[(2πf)²L] = 1/[(2π×5×10⁵)² × 2×10⁻³] ≈ 50.7 pF.",
    },
    {
      number: 14,
      question: "Which part of the electromagnetic spectrum is mainly used in radar and satellite communication?",
      options: ["Infrared waves", "Microwaves", "Ultraviolet rays", "X-rays"],
      correctIndex: 1,
      solution: "Microwaves (produced by devices such as klystron tubes) are used for radar and satellite/telecommunication links.",
    },
    {
      number: 15,
      question:
        "Which layer of Earth's atmosphere absorbs most of the Sun's ultraviolet radiation, protecting living organisms?",
      options: ["Troposphere", "Stratosphere (ozone layer)", "Ionosphere", "Mesosphere"],
      correctIndex: 1,
      solution: "The ozone layer, located in the stratosphere, absorbs ultraviolet rays from the Sun, shielding life on Earth's surface.",
    },
    {
      number: 16,
      question: "The greenhouse effect, which keeps Earth's surface warm, is primarily caused by the trapping of:",
      options: ["Ultraviolet rays", "Infrared rays", "X-rays", "Radio waves"],
      correctIndex: 1,
      solution:
        "Greenhouse gases and the ozone layer trap outgoing infrared radiation, preventing it from escaping into space and keeping the surface warm.",
    },
    {
      number: 17,
      question: "Arrange the following in order of increasing frequency: visible light, X-rays, microwaves, gamma rays.",
      options: [
        "Microwaves < visible light < X-rays < gamma rays",
        "Gamma rays < X-rays < visible light < microwaves",
        "Visible light < microwaves < X-rays < gamma rays",
        "Microwaves < X-rays < visible light < gamma rays",
      ],
      correctIndex: 0,
      solution:
        "Frequency increases as wavelength decreases. Order of increasing wavelength is gamma rays < X-rays < visible light < microwaves, so frequency increases in exactly the reverse order: microwaves < visible light < X-rays < gamma rays.",
    },
    {
      number: 18,
      question: "The speed of electromagnetic waves in vacuum is given by:",
      options: ["μ₀ε₀", "√(μ₀ε₀)", "1/(μ₀ε₀)", "1/√(μ₀ε₀)"],
      correctIndex: 3,
      solution:
        "From Maxwell's wave equations, c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m/s.",
    },
  ],
};
