import type { ChapterDpp } from "./kinematics";

export const currentElectricityDpp: ChapterDpp = {
  chapterName: "Current Electricity",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "A copper wire of cross-sectional area 1 × 10⁻⁶ m² carries a current of 1.6 A. If the free-electron density is 8 × 10²⁸ /m³, find the drift velocity of the electrons. (e = 1.6 × 10⁻¹⁹ C)",
      options: ["1.25 × 10⁻⁴ m/s", "2.5 × 10⁻⁴ m/s", "0.8 × 10⁻⁴ m/s", "1.0 × 10⁻⁴ m/s"],
      correctIndex: 0,
      solution:
        "I = neAv_d ⟹ v_d = I/(neA) = 1.6/(8×10²⁸ × 1.6×10⁻¹⁹ × 1×10⁻⁶) = 1.6/(1.28×10⁴) = 1.25 × 10⁻⁴ m/s.",
    },
    {
      number: 2,
      question:
        "A wire of circular cross-section has radius 1 mm and carries a steady current of 3.14 A. Find the current density in the wire. (Take π ≈ 3.14)",
      options: ["1 × 10⁶ A/m²", "2 × 10⁶ A/m²", "0.5 × 10⁶ A/m²", "1 × 10⁵ A/m²"],
      correctIndex: 0,
      solution:
        "A = πr² = 3.14 × (1×10⁻³)² = 3.14×10⁻⁶ m². J = I/A = 3.14/(3.14×10⁻⁶) = 1×10⁶ A/m².",
    },
    {
      number: 3,
      question:
        "A cell of emf 3 V is balanced against a length of 1.5 m on a potentiometer wire carrying a steady current. What is the potential gradient along the wire?",
      options: ["2 V/m", "1.5 V/m", "3 V/m", "0.5 V/m"],
      correctIndex: 0,
      solution: "Potential gradient x = E/l = 3/1.5 = 2 V/m.",
    },
    {
      number: 4,
      question:
        "A wire of resistivity 1.1 × 10⁻⁶ Ω·m has length 2 m and cross-sectional area 2.2 × 10⁻⁷ m². Find its resistance.",
      options: ["10 Ω", "5 Ω", "20 Ω", "1 Ω"],
      correctIndex: 0,
      solution: "R = ρl/A = (1.1×10⁻⁶ × 2)/(2.2×10⁻⁷) = (2.2×10⁻⁶)/(2.2×10⁻⁷) = 10 Ω.",
    },
    {
      number: 5,
      question:
        "A wire of resistance R is uniformly stretched, without changing its volume, until its length becomes 3 times the original length. What is its new resistance?",
      options: ["9R", "3R", "R/9", "27R"],
      correctIndex: 0,
      solution:
        "Volume constant ⟹ A' = A/3 when l' = 3l. R' = ρl'/A' = ρ(3l)/(A/3) = 9(ρl/A) = 9R.",
    },
    {
      number: 6,
      question:
        "The length of a wire of resistance 50 Ω is increased by 2% by stretching, without changing its volume. Find the new resistance.",
      options: ["52 Ω", "48 Ω", "54 Ω", "50.5 Ω"],
      correctIndex: 0,
      solution:
        "For small changes, %ΔR ≈ 2 × %Δl = 2 × 2% = 4%. New R = 50 + 4% of 50 = 50 + 2 = 52 Ω.",
    },
    {
      number: 7,
      question:
        "A heating element has resistance 20 Ω at 0°C and a temperature coefficient of resistance α = 2 × 10⁻³ °C⁻¹. At what temperature will its resistance become 30 Ω?",
      options: ["250°C", "200°C", "300°C", "150°C"],
      correctIndex: 0,
      solution:
        "R_t = R₀(1+αt) ⟹ 30 = 20(1 + 0.002t) ⟹ 1.5 = 1 + 0.002t ⟹ t = 0.5/0.002 = 250°C.",
    },
    {
      number: 8,
      question:
        "A carbon resistor has the colour bands Brown, Black, Red, Gold (in that order). What is its resistance value and tolerance?",
      options: ["1 kΩ ± 5%", "100 Ω ± 5%", "1 kΩ ± 10%", "10 Ω ± 5%"],
      correctIndex: 0,
      solution:
        "Brown = 1, Black = 0, Red = multiplier ×10² , Gold = ±5% tolerance. R = 10 × 10² = 1000 Ω = 1 kΩ, tolerance ±5%.",
    },
    {
      number: 9,
      question: "Three resistors of 2 Ω, 3 Ω, and 6 Ω are connected in parallel. Find the equivalent resistance.",
      options: ["1 Ω", "2 Ω", "11 Ω", "0.5 Ω"],
      correctIndex: 0,
      solution: "1/R = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1 ⟹ R = 1 Ω.",
    },
    {
      number: 10,
      question:
        "At a circuit junction, currents of 5 A and 3 A flow in. Two currents, I and 2 A, flow out. Find I.",
      options: ["6 A", "8 A", "2 A", "4 A"],
      correctIndex: 0,
      solution: "By Kirchhoff's junction law: 5 + 3 = I + 2 ⟹ I = 6 A.",
    },
    {
      number: 11,
      question:
        "A battery of emf 12 V and internal resistance 1 Ω is connected to an external resistor of 5 Ω. Find the terminal voltage of the battery.",
      options: ["10 V", "12 V", "8 V", "6 V"],
      correctIndex: 0,
      solution:
        "I = E/(R+r) = 12/(5+1) = 2 A. Terminal voltage V = E − Ir = 12 − 2×1 = 10 V (also = IR = 2×5 = 10 V).",
    },
    {
      number: 12,
      question:
        "Four identical cells, each of emf 1.5 V and internal resistance 0.5 Ω, are connected in series to an external resistance of 4 Ω. Find the current in the circuit.",
      options: ["1 A", "1.5 A", "0.5 A", "2 A"],
      correctIndex: 0,
      solution:
        "E_net = 4 × 1.5 = 6 V. r_net = 4 × 0.5 = 2 Ω. I = E_net/(r_net+R) = 6/(2+4) = 1 A.",
    },
    {
      number: 13,
      question:
        "Three identical cells, each of emf 2 V and internal resistance 3 Ω, are connected in parallel to an external resistance of 1 Ω. Find the current delivered to the external resistor.",
      options: ["1 A", "2 A", "0.5 A", "3 A"],
      correctIndex: 0,
      solution:
        "r_net = r/m = 3/3 = 1 Ω. I = E/(r_net+R) = 2/(1+1) = 1 A.",
    },
    {
      number: 14,
      question:
        "An electric heater rated 1000 W operates for 2 hours daily. At ₹6 per unit (kWh), find the cost of running it for one day.",
      options: ["₹12", "₹6", "₹24", "₹2"],
      correctIndex: 0,
      solution: "Energy used = 1 kW × 2 h = 2 kWh. Cost = 2 × ₹6 = ₹12.",
    },
    {
      number: 15,
      question:
        "A cell of emf 10 V and internal resistance 2 Ω is connected to a variable external resistance R. Find the value of R for which the power delivered to R is maximum, and the value of that maximum power.",
      options: ["R = 2 Ω, P_max = 12.5 W", "R = 2 Ω, P_max = 25 W", "R = 5 Ω, P_max = 12.5 W", "R = 2 Ω, P_max = 5 W"],
      correctIndex: 0,
      solution:
        "Maximum power transfer occurs when R = r = 2 Ω. P_max = E²/4r = 100/8 = 12.5 W.",
    },
    {
      number: 16,
      question:
        "Two bulbs, rated 100 W and 60 W (both at 220 V), are connected in series to a 220 V supply. Which bulb glows brighter, and why?",
      options: [
        "60 W bulb — it has the higher resistance",
        "100 W bulb — it has the higher resistance",
        "Both glow equally bright",
        "Cannot be determined from the given data",
      ],
      correctIndex: 0,
      solution:
        "R = V²/P, so R(100W) = 220²/100 = 484 Ω and R(60W) = 220²/60 ≈ 807 Ω. In series, the same current flows through both, so P = I²R is larger for the larger resistance — the 60 W bulb (higher R) dissipates more power and glows brighter.",
    },
    {
      number: 17,
      question:
        "A galvanometer of resistance 99 Ω requires a current of 10 mA for full-scale deflection. What shunt resistance is needed to convert it into an ammeter of range 1 A?",
      options: ["1 Ω", "0.5 Ω", "2 Ω", "0.99 Ω"],
      correctIndex: 0,
      solution:
        "R_shunt = I_gR_g/(I−I_g) = (0.01×99)/(1−0.01) = 0.99/0.99 = 1 Ω.",
    },
    {
      number: 18,
      question:
        "In a Wheatstone bridge, the four arms have resistances P = 4 Ω, Q = 6 Ω, and R = 10 Ω. Find the value of S for the bridge to be balanced.",
      options: ["15 Ω", "6.67 Ω", "24 Ω", "10 Ω"],
      correctIndex: 0,
      solution: "Balance condition: P/Q = R/S ⟹ S = RQ/P = (10×6)/4 = 15 Ω.",
    },
  ],
};
