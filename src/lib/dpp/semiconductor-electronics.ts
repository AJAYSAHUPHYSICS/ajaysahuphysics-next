import type { ChapterDpp } from "./kinematics";

export const semiconductorElectronicsDpp: ChapterDpp = {
  chapterName: "Semiconductor Electronics",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "A solid has a forbidden energy gap of about 1.1 eV between its valence and conduction bands. How would this solid be classified at room temperature?",
      options: ["Conductor", "Semiconductor", "Insulator", "Superconductor"],
      correctIndex: 1,
      solution:
        "A gap of about 1 eV (silicon ≈1.1 eV) is small enough that some electrons are thermally excited across it at room temperature, but large enough that conductivity is modest and strongly temperature-dependent — the defining signature of a semiconductor. Insulators have E(g) > 3 eV; conductors have overlapping or partially-filled bands.",
    },
    {
      number: 2,
      question:
        "A semiconductor at a given temperature has an intrinsic carrier concentration n(i) = 1.5×10¹⁰ cm⁻³. After doping, the free electron concentration becomes n = 2.25×10¹³ cm⁻³. What is the hole concentration p?",
      options: ["1×10⁶ cm⁻³", "1×10⁷ cm⁻³", "1.5×10¹⁰ cm⁻³", "2.25×10¹³ cm⁻³"],
      correctIndex: 1,
      solution:
        "By the law of mass action, n·p = n(i)². p = n(i)²/n = (1.5×10¹⁰)²/(2.25×10¹³) = (2.25×10²⁰)/(2.25×10¹³) = 1×10⁷ cm⁻³.",
    },
    {
      number: 3,
      question:
        "Pure germanium (tetravalent) is doped with a small amount of phosphorus (pentavalent). What type of semiconductor results, and what is the majority carrier?",
      options: [
        "p-type; majority carrier is holes",
        "n-type; majority carrier is electrons",
        "Intrinsic; carriers remain equal",
        "n-type; majority carrier is holes",
      ],
      correctIndex: 1,
      solution:
        "A pentavalent dopant (5 valence electrons) in a tetravalent host forms four covalent bonds, leaving the fifth electron loosely bound and free at room temperature — this is an n-type semiconductor, with electrons as the majority carrier.",
    },
    {
      number: 4,
      question:
        "At room temperature, which has the larger barrier (junction) potential — a silicon p-n junction or a germanium p-n junction?",
      options: [
        "Silicon (≈0.7 V) is larger than germanium (≈0.3 V)",
        "Germanium (≈0.7 V) is larger than silicon (≈0.3 V)",
        "Both are exactly equal at 0.5 V",
        "Neither has a meaningful barrier potential",
      ],
      correctIndex: 0,
      solution:
        "Silicon junctions have a barrier potential of about 0.7 V, while germanium junctions have about 0.3 V, at room temperature — standard values used throughout diode-circuit numericals.",
    },
    {
      number: 5,
      question:
        "When a p-n junction diode is forward biased, what happens to the width of the depletion region and the height of the potential barrier?",
      options: [
        "Both increase",
        "Both decrease",
        "Depletion width increases, barrier decreases",
        "Depletion width decreases, barrier increases",
      ],
      correctIndex: 1,
      solution:
        "Forward bias applies an external field that opposes the junction's built-in field. This narrows the depletion region and lowers the potential barrier, making it easier for majority carriers to cross once the applied voltage exceeds the barrier potential.",
    },
    {
      number: 6,
      question:
        "In a reverse-biased p-n junction diode, the small reverse saturation current that does flow is carried mainly by which charge carriers?",
      options: [
        "Majority carriers only",
        "Minority carriers (thermally generated electron-hole pairs)",
        "Free electrons from the external circuit only",
        "There is no current of any kind in reverse bias",
      ],
      correctIndex: 1,
      solution:
        "Reverse bias sweeps majority carriers away from the junction, essentially cutting off majority-carrier current. The small reverse saturation current that remains is carried entirely by minority carriers — thermally generated electron-hole pairs near the depletion region.",
    },
    {
      number: 7,
      question:
        "A mains AC supply of frequency 50 Hz is fed into a full-wave (bridge) rectifier. What is the ripple frequency of the rectifier's output?",
      options: ["25 Hz", "50 Hz", "100 Hz", "200 Hz"],
      correctIndex: 2,
      solution:
        "A full-wave rectifier uses both half-cycles of the input, producing one output pulse per half-cycle — so the ripple frequency is twice the input frequency: 2×50 = 100 Hz.",
    },
    {
      number: 8,
      question:
        "What is the maximum theoretical efficiency of a half-wave rectifier, and why is it well below 100%?",
      options: [
        "≈100%, since a diode conducts perfectly",
        "≈81.2%, since only resistive losses reduce it",
        "≈40.6%, since half of every input cycle is unused",
        "≈25%, since only a quarter-cycle is used",
      ],
      correctIndex: 2,
      solution:
        "A half-wave rectifier only conducts during one half of each input cycle — the diode blocks the other half entirely, wasting that half of the input power. This caps its maximum theoretical efficiency at about 40.6%, well below a full-wave rectifier's ≈81.2%.",
    },
    {
      number: 9,
      question:
        "In a rectifier circuit fitted with a shunt capacitor filter, what happens to the output ripple if the load resistance is increased (capacitance unchanged)?",
      options: [
        "Ripple increases, since more current is drawn",
        "Ripple decreases, since the capacitor discharges more slowly through a larger resistance",
        "Ripple is completely unaffected by load resistance",
        "The rectifier stops working entirely",
      ],
      correctIndex: 1,
      solution:
        "Between input pulses, the filter capacitor discharges through the load resistance. A larger load resistance means a slower discharge (longer RC time), so the voltage dips less before the next pulse arrives — reducing ripple.",
    },
    {
      number: 10,
      question:
        "A Zener diode voltage regulator has an input voltage of 12 V, a series resistor of 100 Ω, and a Zener breakdown voltage of 6 V. If the load draws a constant current of 20 mA, what is the current flowing through the Zener diode itself?",
      options: ["20 mA", "40 mA", "60 mA", "80 mA"],
      correctIndex: 1,
      solution:
        "Current through the series resistor: I(total) = (V(in)−V(z))/R(s) = (12−6)/100 = 0.06 A = 60 mA. By Kirchhoff's current law, this splits between the load and the Zener: I(z) = I(total) − I(L) = 60 − 20 = 40 mA.",
    },
    {
      number: 11,
      question:
        "For a device to function as an LED (light-emitting diode) or as a photodiode, in what bias mode is each normally operated respectively?",
      options: [
        "LED forward biased; photodiode reverse biased",
        "LED reverse biased; photodiode forward biased",
        "Both are forward biased",
        "Both are reverse biased",
      ],
      correctIndex: 0,
      solution:
        "An LED is forward biased so that injected carriers recombine and release energy as light. A photodiode is reverse biased so that incident light-generated carriers add to (and are easily measured as an increase in) the small reverse saturation current.",
    },
    {
      number: 12,
      question:
        "Why can a solar cell generate an EMF and deliver power to an external circuit without needing any battery or external bias at all?",
      options: [
        "It uses a hidden internal battery",
        "Photon-generated electron-hole pairs are swept apart by the junction's own built-in field",
        "It converts heat directly into electricity via the Seebeck effect",
        "It is not actually a p-n junction device",
      ],
      correctIndex: 1,
      solution:
        "A solar cell is essentially an unbiased p-n junction. Light generates electron-hole pairs near the junction, and the junction's own built-in electric field (from the depletion region) separates them before they recombine — the junction itself becomes a source of EMF.",
    },
    {
      number: 13,
      question:
        "A transistor has an emitter current of 10 mA and a base current of 0.1 mA. What are the collector current, the common-base current gain α, and the common-emitter current gain β?",
      options: [
        "I(C)=9.9 mA, α=0.99, β=99",
        "I(C)=10 mA, α=1.00, β=100",
        "I(C)=9.9 mA, α=0.90, β=9.9",
        "I(C)=0.1 mA, α=0.01, β=1",
      ],
      correctIndex: 0,
      solution:
        "I(C) = I(E) − I(B) = 10 − 0.1 = 9.9 mA. α = I(C)/I(E) = 9.9/10 = 0.99. β = I(C)/I(B) = 9.9/0.1 = 99.",
    },
    {
      number: 14,
      question:
        "A transistor has a common-base current gain α = 0.98. What is its approximate common-emitter current gain β?",
      options: ["2", "9.8", "49", "98"],
      correctIndex: 2,
      solution: "β = α/(1−α) = 0.98/(1−0.98) = 0.98/0.02 = 49.",
    },
    {
      number: 15,
      question:
        "A transistor has a common-emitter current gain β = 99. What is its approximate common-base current gain α?",
      options: ["0.90", "0.98", "0.99", "1.00"],
      correctIndex: 2,
      solution: "α = β/(1+β) = 99/(1+99) = 99/100 = 0.99.",
    },
    {
      number: 16,
      question:
        "A common-emitter amplifier has β = 50, a collector resistance R(C) = 2000 Ω, and an input (base) resistance R(in) = 500 Ω. What is its voltage gain?",
      options: ["25", "50", "100", "200"],
      correctIndex: 3,
      solution: "A(v) = β(R(C)/R(in)) = 50×(2000/500) = 50×4 = 200.",
    },
    {
      number: 17,
      question:
        "For the amplifier in the previous question, what is its power gain? (Take current gain A(i) ≈ β)",
      options: ["200", "2500", "10000", "50000"],
      correctIndex: 2,
      solution: "A(p) = A(v)×A(i) = 200×50 = 10000 (power gain is the PRODUCT of voltage and current gain, not their sum).",
    },
    {
      number: 18,
      question:
        "A transistor used purely as an electronic switch is deliberately driven into cut-off and saturation, avoiding its active (linear) region. What characterises each of these two states?",
      options: [
        "Cut-off: I(C) ≈ 0 (open switch). Saturation: I(C) at its maximum (closed switch)",
        "Cut-off: I(C) at its maximum. Saturation: I(C) ≈ 0",
        "Both states have I(C) at the same intermediate value",
        "Cut-off and saturation are two names for the same state",
      ],
      correctIndex: 0,
      solution:
        "In cut-off, the base current is essentially zero, so collector current is essentially zero — the transistor behaves like an open switch. In saturation, base current is large enough that collector current reaches its maximum possible value — the transistor behaves like a closed switch. Rapidly switching between these two states is how digital logic gates are built from transistors.",
    },
    {
      number: 19,
      question:
        "A common-emitter amplifier's output voltage, for a sinusoidal input signal, is best described as:",
      options: [
        "In phase with the input voltage",
        "90° out of phase with the input voltage",
        "180° out of phase with the input voltage",
        "Unrelated in phase to the input voltage",
      ],
      correctIndex: 2,
      solution:
        "As input voltage rises, base current rises, which raises collector current, increasing the voltage drop across R(C) — so the collector (output) voltage actually falls. This makes the CE amplifier's output 180° out of phase with its input, a defining and frequently tested feature.",
    },
    {
      number: 20,
      question:
        "Which of the following statements about logic gates is correct?",
      options: [
        "NAND and NOR are each individually 'universal' — either can build every other gate by itself",
        "AND and OR are each individually 'universal' — either can build every other gate by itself",
        "Only the NOT gate is universal",
        "No single gate can ever be universal",
      ],
      correctIndex: 0,
      solution:
        "NAND (AND followed by NOT) and NOR (OR followed by NOT) are each called universal gates, because either one, used repeatedly on its own, can be combined to build every other logic gate — including OR, AND, and NOT themselves. AND and OR alone cannot do this.",
    },
  ],
};
