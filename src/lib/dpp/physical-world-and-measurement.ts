import type { ChapterDpp } from "./kinematics";

export const physicalWorldAndMeasurementDpp: ChapterDpp = {
  chapterName: "Physical World & Measurement",
  className: "11",
  questions: [
    {
      number: 1,
      question: "What is the dimensional formula of pressure?",
      options: ["[ML⁻¹T⁻²]", "[ML¹T⁻²]", "[ML²T⁻²]", "[M⁰L¹T⁻¹]"],
      correctIndex: 0,
      solution: "Pressure = Force/Area = [MLT⁻²]/[L²] = [ML⁻¹T⁻²].",
    },
    {
      number: 2,
      question: "What is the dimensional formula of power?",
      options: ["[ML²T⁻²]", "[ML²T⁻³]", "[MLT⁻²]", "[ML²T⁻¹]"],
      correctIndex: 1,
      solution: "Power = Work/Time = [ML²T⁻²]/[T] = [ML²T⁻³].",
    },
    {
      number: 3,
      question: "Convert a force of 25 N into the CGS system (dyne).",
      options: ["2.5 × 10³ dyne", "2.5 × 10⁴ dyne", "2.5 × 10⁵ dyne", "2.5 × 10⁶ dyne"],
      correctIndex: 3,
      solution: "1 N = 10⁵ dyne, so 25 N = 25 × 10⁵ = 2.5 × 10⁶ dyne.",
    },
    {
      number: 4,
      question: "Convert 1 joule of energy into ergs (CGS system).",
      options: ["10⁵ erg", "10⁶ erg", "10⁷ erg", "10⁸ erg"],
      correctIndex: 2,
      solution:
        "[W] = [ML²T⁻²]. Using n₂ = n₁[M₁/M₂][L₁/L₂]²[T₁/T₂]⁻²: n₂ = 1 × 1000 × (100)² = 10⁷, so 1 J = 10⁷ erg.",
    },
    {
      number: 5,
      question: "A car moves at 72 km/h. What is its speed in m/s?",
      options: ["15 m/s", "20 m/s", "25 m/s", "30 m/s"],
      correctIndex: 1,
      solution: "Multiply km/h by 5/18: 72 × 5/18 = 20 m/s.",
    },
    {
      number: 6,
      question: "How many significant figures are there in the measurement 0.00604 m?",
      options: ["2", "3", "5", "6"],
      correctIndex: 1,
      solution:
        "Leading zeros are never significant. The significant digits are 6, 0, and 4 — three significant figures.",
    },
    {
      number: 7,
      question: "How many significant figures are there in 4.330 × 10² ?",
      options: ["2", "3", "4", "5"],
      correctIndex: 2,
      solution:
        "Only the decimal part 4.330 counts; trailing zeros after a decimal point are significant, giving four significant figures. The power of 10 adds none.",
    },
    {
      number: 8,
      question: "Round off 6.87 to two significant figures.",
      options: ["6.8", "6.9", "6.80", "7.0"],
      correctIndex: 1,
      solution: "The digit to be dropped is 7, which is greater than 5, so the preceding digit 8 is raised to 9, giving 6.9.",
    },
    {
      number: 9,
      question:
        "The length and breadth of a rectangle are measured as 5.7 cm and 3.4 cm. To how many significant figures should the area be reported?",
      options: ["1", "2", "3", "4"],
      correctIndex: 1,
      solution:
        "In multiplication, the result is rounded to match the factor with the fewest significant figures. Both measurements have 2 significant figures, so the area is reported to 2 significant figures.",
    },
    {
      number: 10,
      question:
        "A quantity is measured five times and the mean value comes out to 2.624 s. What is this mean value used for?",
      options: [
        "It is discarded once errors are calculated",
        "It is taken as the best estimate of the true value",
        "It replaces the least count of the instrument",
        "It is only used for rounding off",
      ],
      correctIndex: 1,
      solution:
        "When the true value of a repeatedly measured quantity is not independently known, the arithmetic mean of all readings is taken as the best estimate of the true value.",
    },
    {
      number: 11,
      question:
        "The voltage across a resistor is measured as (10 ± 0.2) V and the current through it as (2 ± 0.1) A. Find the percentage error in the calculated resistance R = V/I.",
      options: ["2%", "5%", "7%", "10%"],
      correctIndex: 2,
      solution:
        "For a quotient, relative errors add: ΔR/R = ΔV/V + ΔI/I = 0.2/10 + 0.1/2 = 0.02 + 0.05 = 0.07, i.e. 7%.",
    },
    {
      number: 12,
      question:
        "The radius of a sphere is measured with a 1% error. What is the percentage error in its calculated volume (V ∝ r³)?",
      options: ["1%", "2%", "3%", "9%"],
      correctIndex: 2,
      solution:
        "For x = aᵏ, the relative error scales by k: ΔV/V = 3 × (Δr/r) = 3 × 1% = 3%.",
    },
    {
      number: 13,
      question:
        "In a vernier caliper, 10 vernier scale divisions (VSD) coincide with 9 main scale divisions (MSD), and 1 MSD = 1 mm. What is the least count of the instrument?",
      options: ["0.01 mm", "0.1 mm", "0.5 mm", "1 mm"],
      correctIndex: 1,
      solution: "VC = 1 MSD − 1 VSD = 1 MSD − (9/10) MSD = (1/10) MSD = 0.1 mm.",
    },
    {
      number: 14,
      question:
        "A vernier caliper (least count 0.01 cm) gives a main scale reading of 2.1 cm with the 6th vernier division coinciding with a main scale division. Find the measured length.",
      options: ["2.06 cm", "2.16 cm", "2.60 cm", "2.66 cm"],
      correctIndex: 1,
      solution: "Length = MSR + (VSR × VC) = 2.1 + (6 × 0.01) = 2.1 + 0.06 = 2.16 cm.",
    },
    {
      number: 15,
      question:
        "A screw gauge has a pitch of 1 mm and 100 divisions on its circular scale. What is its least count?",
      options: ["0.001 mm", "0.01 mm", "0.1 mm", "1 mm"],
      correctIndex: 1,
      solution: "LC = Pitch / (number of circular scale divisions) = 1 mm / 100 = 0.01 mm.",
    },
    {
      number: 16,
      question:
        "Using the screw gauge from the previous question, the linear scale reads 3 mm and the circular scale reading is 27. Find the measured length, assuming no zero error.",
      options: ["3.027 mm", "3.27 mm", "3.7 mm", "27.3 mm"],
      correctIndex: 1,
      solution: "Length = Linear scale reading + (Circular scale reading × LC) = 3 + (27 × 0.01) = 3.27 mm.",
    },
    {
      number: 17,
      question:
        "A screw gauge has a positive zero error of 0.05 mm. If the observed reading for an object is 4.50 mm, find the corrected (true) reading.",
      options: ["4.40 mm", "4.45 mm", "4.50 mm", "4.55 mm"],
      correctIndex: 1,
      solution:
        "For a positive zero error, the correction is subtracted from the observed reading: True reading = 4.50 − 0.05 = 4.45 mm.",
    },
    {
      number: 18,
      question: "Which of the following pairs has the same dimensional formula?",
      options: [
        "Work and Power",
        "Torque and Work",
        "Force and Pressure",
        "Momentum and Impulse have different dimensions",
      ],
      correctIndex: 1,
      solution:
        "Torque = Force × perpendicular distance = [MLT⁻²][L] = [ML²T⁻²], which is exactly the dimensional formula of Work/Energy — even though they represent physically different quantities.",
    },
  ],
};
