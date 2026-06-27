import type { ChapterShortNotes } from "./kinematics-short";

export const physicalWorldAndMeasurementShortNotes: ChapterShortNotes = {
  chapterName: "Physical World & Measurement",
  className: "11",
  groups: [
    {
      heading: "Quantities, Units & Systems",
      points: [
        "Q = n × u; larger unit ⇒ smaller numerical value (n₁u₁ = n₂u₂).",
        "Fundamental quantities (7): mass, length, time, temperature, current, luminous intensity, amount of substance.",
        "Supplementary units: radian (plane angle), steradian (solid angle) — both dimensionless.",
        "SI prefixes: kilo 10³, mega 10⁶, giga 10⁹ | milli 10⁻³, micro 10⁻⁶, nano 10⁻⁹, pico 10⁻¹².",
        "km/hr → m/s: multiply by 5/18.",
      ],
    },
    {
      heading: "Dimensional Formulas to Memorise",
      points: [
        "Velocity [LT⁻¹], Acceleration [LT⁻²]",
        "Force [MLT⁻²], Work/Energy/Torque [ML²T⁻²]",
        "Power [ML²T⁻³], Pressure/Stress [ML⁻¹T⁻²]",
        "Momentum [MLT⁻¹], Gravitational constant G [M⁻¹L³T⁻²]",
        "Angle, strain, refractive index — all dimensionless [M⁰L⁰T⁰].",
      ],
    },
    {
      heading: "Uses & Limits of Dimensional Analysis",
      points: [
        "Can: find units, check homogeneity of an equation, convert between systems, guess a relation among known dependent quantities.",
        "Cannot: find dimensionless constants (2π, ½...), handle trig/exponential/log relations, work with >3 dependent quantities, or distinguish quantities with the same dimensional formula (e.g. work vs torque).",
      ],
    },
    {
      heading: "Significant Figures — Quick Rules",
      points: [
        "All non-zero digits significant; zero between two non-zero digits significant.",
        "Leading zeros never significant; trailing zeros after a decimal point ARE significant.",
        "Scientific notation: only the decimal part's digits count, not the power of 10.",
        "Multiply/divide → match the fewest sig figs; add/subtract → match the fewest decimal places.",
      ],
    },
    {
      heading: "Errors — Definitions",
      points: [
        "Mean value aₘ = Σaᵢ/n (best estimate of true value).",
        "Absolute error Δaᵢ = aₘ − aᵢ; Mean absolute error = Σ|Δaᵢ|/n.",
        "Relative error = Δa(mean)/aₘ; Percentage error = relative error × 100%.",
      ],
    },
    {
      heading: "Error Propagation — Memorise This Table",
      points: [
        "Sum/Difference (x = a ± b): absolute errors ADD → Δx = Δa + Δb.",
        "Product/Quotient (x = ab or a/b): relative errors ADD → Δx/x = Δa/a + Δb/b.",
        "Power (x = aᵏ): relative error scales by k → Δx/x = k(Δa/a).",
        "Errors never cancel — even subtraction adds the absolute errors.",
        "Measure the quantity with the highest power most carefully — its error gets amplified most.",
      ],
    },
    {
      heading: "Vernier Caliper",
      points: [
        "Least count (VC) = 1 MSD − 1 VSD = (1/n) MSD, for n VSD = (n−1) MSD.",
        "Ordinary caliper: VC = 0.1 mm = 0.01 cm.",
        "Reading = MSR + (VSR × VC).",
        "Positive zero error → subtract correction; negative zero error → add correction.",
      ],
    },
    {
      heading: "Screw Gauge",
      points: [
        "LC = Pitch / (number of circular scale divisions).",
        "Typical: pitch 1 mm, 100 divisions → LC = 0.01 mm.",
        "Reading = Linear scale reading + (Circular scale reading × LC).",
        "Zero error correction applied the same way as in vernier calipers.",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Don't confuse precision (number of digits/least count) with accuracy (closeness to true value).",
        "Dimensionally correct ≠ numerically correct — constants like 2π can't be checked this way.",
        "Subtraction of two close, large quantities can drastically increase percentage error even if absolute error looks small.",
        "Always state the final answer with the correct number of significant figures, not just whatever the calculator displays.",
      ],
    },
  ],
};
