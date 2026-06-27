import type { ChapterNotes } from "./kinematics";

export const physicalWorldAndMeasurementNotes: ChapterNotes = {
  chapterName: "Physical World & Measurement",
  className: "11",
  intro:
    "Before motion, force, or energy, physics needs a language for describing quantities precisely — units, dimensions, and the honest reporting of how accurate a measurement actually is. This chapter builds that language: fundamental and derived units, dimensional analysis as a quick error-check on formulas, significant figures, and how errors combine when measured quantities are added, multiplied, or raised to a power. None of this is conceptually hard, but it quietly costs marks in every other chapter if it isn't second nature.",
  sections: [
    {
      heading: "1. Physical Quantities and Units",
      body:
        "A physical quantity is anything that can be measured and expressed as a number times a unit. Writing a quantity as Q = n × u (numerical value × unit) means that if the unit changes, the numerical value must change too, so that their product — the actual physical quantity — stays the same.",
      bullets: [
        "Larger unit ⇒ smaller numerical value, and vice versa: n₁u₁ = n₂u₂ = constant.",
        "Scalars (mass, time, energy) have magnitude only and add/subtract by ordinary algebra; vectors (displacement, velocity, force) have magnitude and direction and add by vector rules.",
        "A few quantities — like angle (arc/radius) or refractive index — are pure ratios and have no unit at all.",
      ],
    },
    {
      heading: "2. Fundamental and Derived Quantities",
      body:
        "Fundamental (base) quantities are the small set that are defined independently and don't need any other physical quantity to express them — mass, length, time, temperature, electric current, luminous intensity, and amount of substance. Every other quantity is a derived quantity, built from these seven through multiplication and division.",
      bullets: [
        "Example: speed = length/time, so speed is derived; area = length², volume = length³.",
        "SI base units: kilogram (kg), metre (m), second (s), kelvin (K), ampere (A), candela (cd), mole (mol).",
        "Supplementary units: radian (rad) for plane angle, steradian (sr) for solid angle — both dimensionless.",
      ],
    },
    {
      heading: "3. Systems of Units and SI Prefixes",
      body:
        "Historically different systems (CGS, MKS, FPS) used different base units for the same quantities; SI is the modern, internationally agreed extension of MKS.",
      bullets: [
        "CGS: centimetre, gram, second. MKS/SI: metre, kilogram, second. FPS: foot, pound, second.",
        "SI prefixes scale a unit by powers of 10 without changing the underlying quantity: kilo (10³), mega (10⁶), giga (10⁹); milli (10⁻³), micro (10⁻⁶), nano (10⁻⁹), pico (10⁻¹²).",
      ],
      formula: [
        { label: "Common conversion", expression: "to convert km/hr to m/s, multiply by 5/18" },
      ],
    },
    {
      heading: "4. Dimensions of a Physical Quantity",
      body:
        "The dimension of a physical quantity shows which powers of the base quantities (mass M, length L, time T, …) combine to produce it. Writing a quantity's dimensional formula strips away the numbers and units and leaves only this underlying structure, enclosed in square brackets.",
      bullets: [
        "Derive a dimensional formula by starting from the defining equation and substituting the dimensions of every quantity on the right-hand side.",
        "Angle, strain, refractive index, and all pure ratios are dimensionless: [M⁰L⁰T⁰].",
      ],
      formula: [
        { label: "Velocity", expression: "[v] = [L]/[T] = [M⁰L¹T⁻¹]" },
        { label: "Acceleration", expression: "[a] = [LT⁻¹]/[T] = [M⁰L¹T⁻²]" },
        { label: "Force", expression: "[F] = [M][LT⁻²] = [M¹L¹T⁻²]" },
        { label: "Work / Energy", expression: "[W] = [F][L] = [M¹L²T⁻²]" },
        { label: "Power", expression: "[P] = [W]/[T] = [M¹L²T⁻³]" },
        { label: "Pressure", expression: "[P] = [F]/[A] = [M¹L⁻¹T⁻²]" },
        { label: "Torque", expression: "[τ] = [F][L] = [M¹L²T⁻²]" },
        { label: "Gravitational constant G", expression: "[G] = [M⁻¹L³T⁻²]" },
      ],
    },
    {
      heading: "5. Applications of Dimensional Analysis",
      body:
        "Dimensional analysis is a fast sanity-check tool, not a way to derive a complete formula — it can tell you a formula is wrong, but a dimensionally correct formula can still have the wrong numerical constant.",
      bullets: [
        "Finding units of a derived quantity: write the defining formula, substitute base-quantity units, and simplify (e.g. work = force × distance ⇒ kg·m²·s⁻² in SI, which is named the joule).",
        "Checking the correctness of an equation: every term added or subtracted in an equation must have the same dimensions — this is the principle of homogeneity of dimensions.",
        "Converting a measurement between two systems of units: if n₁[u₁] = n₂[u₂] for a quantity with dimensional formula [MᵃLᵇTᶜ], then n₂ = n₁ [M₁/M₂]ᵃ[L₁/L₂]ᵇ[T₁/T₂]ᶜ, where the subscripts label the two systems.",
        "Deriving a relation between quantities, when you already know which quantities a result should depend on (e.g. guessing that the time period of a pendulum depends on length and g, then matching dimensions on both sides).",
      ],
    },
    {
      heading: "6. Limitations of Dimensional Analysis",
      bullets: [
        "It cannot determine dimensionless constants (like 2π, 1/2, or numerical coefficients) appearing in a formula.",
        "It fails for relations involving trigonometric, exponential, or logarithmic functions, since these are dimensionless functions of dimensionless arguments and the method can't fix their form.",
        "It cannot be used if a physical quantity depends on more than three independent quantities, since matching powers of M, L, T gives only three independent equations.",
        "It cannot distinguish between physical quantities that happen to have the same dimensional formula (e.g. work and torque are both [ML²T⁻²], but they are physically different).",
      ],
    },
    {
      heading: "7. Significant Figures",
      body:
        "Significant figures are the digits in a measured (or calculated) value that are known reliably, plus one estimated digit. More significant figures generally mean a more precise measurement.",
      bullets: [
        "All non-zero digits are significant: 243.4 has four significant figures.",
        "A zero between two non-zero digits is always significant: 5.604 has four significant figures.",
        "Leading zeros (to the left of the first non-zero digit) are never significant: 0.0045 has two significant figures.",
        "Trailing zeros after a decimal point are significant: 4.330 has four significant figures; 343.000 has six.",
        "In scientific notation, only the digits in the decimal part count — the power of 10 carries no significance of its own: 1.32 × 10⁻² has three significant figures.",
      ],
    },
    {
      heading: "8. Rounding Off",
      bullets: [
        "If the digit to be dropped is less than 5, the preceding digit is left unchanged: 7.82 rounds to 7.8.",
        "If the digit to be dropped is more than 5, the preceding digit is raised by 1: 6.87 rounds to 6.9.",
        "If the digit to be dropped is exactly 5, followed by non-zero digits, the preceding digit is raised by 1: 16.351 rounds to 16.4.",
      ],
      formula: [
        { label: "Multiplication / division", expression: "result keeps the same number of significant figures as the factor with the fewest" },
        { label: "Addition / subtraction", expression: "result keeps the same number of decimal places as the term with the fewest decimal places" },
      ],
    },
    {
      heading: "9. Errors of Measurement",
      body:
        "No measurement is perfectly exact — the error in a measurement is the difference between the measured value and the (usually unknown) true value. When a quantity is measured several times and the true value isn't independently known, the arithmetic mean of all the readings is taken as the best estimate of the true value.",
      formula: [
        { label: "Mean value", expression: "aₘ = (a₁ + a₂ + ... + aₙ)/n" },
        { label: "Absolute error in i-th reading", expression: "Δaᵢ = aₘ − aᵢ" },
        { label: "Mean absolute error", expression: "Δa(mean) = (|Δa₁| + |Δa₂| + ... + |Δaₙ|)/n" },
        { label: "Relative (fractional) error", expression: "Δa(mean)/aₘ" },
        { label: "Percentage error", expression: "[Δa(mean)/aₘ] × 100%" },
      ],
      bullets: [
        "Absolute error has the same unit as the quantity being measured; relative error is unitless; percentage error is also unitless (expressed as a %).",
      ],
    },
    {
      heading: "10. Propagation of Errors",
      body:
        "When a result is calculated from several measured quantities, the error in the result depends on how those quantities combine — addition/subtraction behave differently from multiplication/division/powers.",
      formula: [
        { label: "Sum, x = a + b", expression: "Δx = Δa + Δb (absolute errors add)" },
        { label: "Difference, x = a − b", expression: "Δx = Δa + Δb (absolute errors still add, even for subtraction)" },
        { label: "Product, x = ab", expression: "Δx/x = Δa/a + Δb/b (relative errors add)" },
        { label: "Quotient, x = a/b", expression: "Δx/x = Δa/a + Δb/b (relative errors add)" },
        { label: "Power, x = aᵏ", expression: "Δx/x = k(Δa/a) (relative error is scaled by the power)" },
        { label: "General, x = aᵖbᵠ/cʳ", expression: "Δx/x = p(Δa/a) + q(Δb/b) + r(Δc/c)" },
      ],
      bullets: [
        "Even when a result involves subtraction, the absolute errors of the two quantities still add — error never cancels out, because we don't know the sign of the actual error in either reading.",
        "A quantity raised to a higher power contributes proportionally more error to the final result, which is why the most sensitive measurement (often the one with the highest power) should be made with the greatest care.",
      ],
    },
    {
      heading: "11. Vernier Calipers",
      body:
        "A vernier caliper uses a small auxiliary (vernier) scale sliding along a main scale to measure lengths more precisely than the main scale alone allows. If n vernier scale divisions (VSD) span the same length as (n − 1) main scale divisions (MSD), the difference between one MSD and one VSD is the vernier constant — the least count of the instrument.",
      formula: [
        { label: "Vernier constant (least count)", expression: "VC = 1 MSD − 1 VSD = (1/n) MSD" },
        { label: "Ordinary caliper (10 VSD = 9 MSD, 1 MSD = 1 mm)", expression: "VC = 1/10 mm = 0.01 cm" },
        { label: "Reading", expression: "Length = Main scale reading + (Vernier scale reading × VC)" },
      ],
      bullets: [
        "Zero error: if the zero of the vernier scale does not coincide with the zero of the main scale when the jaws are closed, the instrument has a zero error that must be corrected for in every reading.",
        "Positive zero error: vernier zero lies to the right of the main scale zero — subtract the correction from every raw reading.",
        "Negative zero error: vernier zero lies to the left of the main scale zero — add the correction to every raw reading.",
      ],
    },
    {
      heading: "12. Screw Gauge (Micrometer Screw)",
      body:
        "A screw gauge measures even smaller lengths (like wire diameter) using a screw that advances a fixed distance — the pitch — for one complete rotation of a circular (head) scale divided into equal parts.",
      formula: [
        { label: "Pitch", expression: "distance moved by the screw in one complete rotation of the head scale" },
        { label: "Least count", expression: "LC = Pitch / (number of divisions on the circular scale)" },
        { label: "Reading", expression: "Length = Main (linear) scale reading + (Circular scale reading × LC)" },
      ],
      bullets: [
        "A typical screw gauge has a pitch of 1 mm and 100 divisions on the circular scale, giving a least count of 0.01 mm.",
        "Like the vernier caliper, a screw gauge can have a positive or negative zero error, found and corrected for in exactly the same way before taking the final reading.",
        "The ratchet at the end of the screw prevents over-tightening, which would otherwise damage the object being measured or wear out the screw thread.",
      ],
    },
  ],
};
