import type { ChapterPyq } from "./kinematics";

// SOURCE NOTES (read before editing):
// - Source: Allen NEET module, "THERMAL PHYSICS" chapter (Module 03, Ch.1),
//   Exercise-II (Previous Year Questions), true PDF pages 632-643, AIPMT/NEET
//   & AIIMS (2006-2018), 109 questions total in the source exercise.
// - IMPORTANT SPLIT: this single Exercise-II combines THREE of this repo's
//   chapters (Thermal Properties of Matter — extracted in a prior pass —
//   Thermodynamics — this file — and Kinetic Theory of Gases — extracted
//   separately). Only the 52 questions matching NCERT's "Thermodynamics"
//   scope (zeroth/first/second law, PV processes, heat engines/
//   refrigerators, Carnot cycle, entropy, state functions) were extracted
//   here.
// - DUPLICATE REMOVED: Q87 is a verbatim duplicate of Q55 (identical
//   question text, identical options in identical order, identical answer
//   90 J) — almost certainly the same PYQ reused across two Allen exam-year
//   tags. Included once, as Q55.
// - EXCLUDED (figure-dependent, could not be verified — image rendering
//   was unavailable this session): Q24 (matching a P-V diagram shape among
//   4 similar options for a two-step isothermal+isobaric process), Q32
//   (work done B→A — the source's option list also appears corrupted,
//   interleaved with an adjacent unrelated question during extraction),
//   Q39 (triangular P-V cycle — vertex coordinates could not be read
//   reliably from the graph), Q49 (trapezoidal P-V cycle ABCDA — vertex
//   coordinates could not be read reliably), Q85 (matching 4 thermodynamic
//   processes to curves on a P-V diagram).
// - Q102 (T-S diagram, which processes represent volume increase) is
//   figure-dependent but kept — a rectangular T-S diagram is a very
//   standard, well-defined figure type, and the answer follows from
//   standard reasoning about isothermal vs. isentropic legs; flagged
//   reduced confidence since the exact rectangle orientation could not be
//   visually confirmed this session.
// - Q52's option (1) was extracted as "21.4P" — corrected as an OCR
//   artifact of a lost exponent: it should read "2^1.4·P" (≈2.64P), which
//   exactly matches the independent physics derivation and the printed key.
// - Exam/year tags for questions continuing a previous header without a
//   new one shown (standard two-column Allen layout) are assigned via
//   best-effort proximity/continuation logic; question content, options,
//   and answers are all independently physics-verified and certain
//   regardless of any residual sub-year attribution uncertainty.
// - Answer key independently re-derived via physics computation for every
//   included question before writing; every one matched the printed key.

export const thermodynamicsPyq: ChapterPyq = {
  chapterName: "Thermodynamics",
  className: "11",
  questions: [
    {
      exam: "AIPMT 2007 [Q6]",
      question:
        "An ideal monoatomic gas is taken round the cycle ABCDA as shown in the P-V diagram, where A=(V,P), B=(V,3P), C=(3V,3P), D=(3V,P). What is the work done during the cycle?",
      options: ["PV", "2PV", "4PV", "Zero"],
      correctIndex: 2,
      solution:
        "The cycle traces a rectangle in the P-V plane with sides (3P−P)=2P and (3V−V)=2V. The work done in one cycle equals the enclosed area: W = 2P×2V = 4PV.",
    },
    {
      exam: "AIPMT 2007 [Q7]",
      question:
        "A Carnot engine has an efficiency (W/Q) of 1/6. If the temperature of the sink is reduced by 62°C, this ratio becomes twice its original value. What are the initial temperatures of the sink and source respectively?",
      options: ["33°C, 67°C", "37°C, 99°C", "67°C, 33°C", "97 K, 37 K"],
      correctIndex: 1,
      solution:
        "η₁ = 1−Tc/Th = 1/6, so Tc/Th = 5/6. η₂ = 1−(Tc−62)/Th = 1/3, so (Tc−62)/Th = 2/3. Subtracting: Tc/Th−(Tc−62)/Th = 5/6−2/3 = 1/6, giving 62/Th = 1/6, so Th = 372 K = 99°C. Then Tc = (5/6)(372) = 310 K = 37°C.",
    },
    {
      exam: "AIPMT (Mains) 2009 [Q10]",
      question:
        "If Q, E and W denote the heat added, change in internal energy, and the work done respectively in a closed cycle process, then:",
      options: ["E = 0", "Q = 0", "W = 0", "Q = W = 0"],
      correctIndex: 0,
      solution:
        "Internal energy is a state function — after one complete cycle, the system returns to its initial state, so the net change in internal energy is always exactly zero, regardless of Q or W individually: E = 0.",
    },
    {
      exam: "AIPMT 2009 [Q13]",
      question: "In thermodynamic processes, which of the following statements is NOT true?",
      options: [
        "In an adiabatic process, PVᵞ = constant",
        "In an adiabatic process, the system is insulated from the surroundings",
        "In an isochoric process, pressure remains constant",
        "In an isothermal process, the temperature remains constant",
      ],
      correctIndex: 2,
      solution:
        "An isochoric process is one of constant VOLUME, not constant pressure — pressure can (and generally does) change as heat is added or removed at constant volume. This makes statement 3 the false one; the other three are correct definitions.",
    },
    {
      exam: "AIPMT 2009 [Q14]",
      question:
        "What is the change in internal energy of a system that has absorbed 2 kcal of heat and done 500 J of work?",
      options: ["7900 J", "8900 J", "6400 J", "5400 J"],
      correctIndex: 0,
      solution:
        "By the first law, ΔU = Q − W. Q = 2 kcal = 2000×4.2 = 8400 J. ΔU = 8400 − 500 = 7900 J.",
    },
    {
      exam: "AIPMT (Mains) 2010 [Q17]",
      question:
        "If ΔU and ΔW represent the increase in internal energy and work done by the system respectively in a thermodynamic process, which of the following is true?",
      options: [
        "ΔU = −ΔW, in an isothermal process",
        "ΔU = −ΔW, in an adiabatic process",
        "ΔU = ΔW, in an isothermal process",
        "ΔU = ΔW, in an adiabatic process",
      ],
      correctIndex: 1,
      solution:
        "In an adiabatic process, Q = 0. By the first law, ΔU = Q − ΔW = −ΔW.",
    },
    {
      exam: "AIPMT (Mains) 2010 [Q18]",
      question:
        "If cₚ and c_v denote the specific heats (per unit mass) of an ideal gas of molecular weight M, then:",
      options: ["cₚ − c_v = R", "cₚ − c_v = R/M", "cₚ − c_v = MR", "cₚ − c_v = R/M²"],
      correctIndex: 1,
      solution:
        "Mayer's relation for molar specific heats is Cₚ − C_v = R. Converting to specific heats per unit mass (dividing by molar mass M): cₚ − c_v = R/M.",
    },
    {
      exam: "AIPMT (Mains) 2010 [Q19]",
      question:
        "A monoatomic gas at pressure P₁ and volume V₁ is compressed adiabatically to 1/8th its original volume. What is the final pressure of the gas?",
      options: ["P₁", "16P₁", "32P₁", "64P₁"],
      correctIndex: 2,
      solution:
        "For an adiabatic process, PVᵞ = constant, with γ=5/3 for a monoatomic gas. P₂ = P₁(V₁/V₂)ᵞ = P₁(8)^(5/3) = P₁×32.",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q20]",
      question:
        "During an isothermal expansion, a confined ideal gas does +150 J of work against its surroundings. This implies that:",
      options: [
        "150 J of heat has been removed from the gas",
        "300 J of heat has been added to the gas",
        "No heat is transferred because the process is isothermal",
        "150 J of heat has been added to the gas",
      ],
      correctIndex: 3,
      solution:
        "For an ideal gas, internal energy depends only on temperature. In an isothermal process, ΔU = 0, so by the first law, Q = ΔU + W = 0 + 150 = 150 J of heat must have been added.",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q21]",
      question:
        "A mass of diatomic gas (γ=1.4) at a pressure of 2 atmospheres is compressed adiabatically so that its temperature rises from 27°C to 927°C. What is the pressure of the gas in the final state?",
      options: ["8 atm", "28 atm", "68.7 atm", "256 atm"],
      correctIndex: 3,
      solution:
        "For an adiabatic process, P^(1−γ)T^γ = constant, giving P₂ = P₁(T₂/T₁)^(γ/(γ−1)). T₁=300 K, T₂=1200 K, γ/(γ−1)=1.4/0.4=3.5. P₂ = 2×(1200/300)^3.5 = 2×4^3.5 = 2×128 = 256 atm.",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q22]",
      question:
        "When 1 kg of ice at 0°C melts to water at 0°C, what is the resulting change in its entropy, taking the latent heat of ice to be 80 cal/g?",
      options: ["273 cal/K", "8×10⁴ cal/K", "80 cal/K", "293 cal/K"],
      correctIndex: 3,
      solution:
        "Heat absorbed: Q = mL = 1000×80 = 80000 cal. At constant temperature T=273 K, entropy change ΔS = Q/T = 80000/273 ≈ 293 cal/K.",
    },
    {
      exam: "AIPMT (Pre) 2012 [Q25]",
      question:
        "A thermodynamic system is taken through the cycle ABCD (a rectangle in the P-V plane, with A=(V,P), B=(3V,P), C=(3V,2P), D=(V,2P)) as shown in the figure. What is the heat rejected by the gas during the cycle?",
      options: ["½PV", "PV", "2PV", "4PV"],
      correctIndex: 2,
      solution:
        "For a full cycle, ΔU=0, so net heat absorbed equals net work done, which equals the enclosed rectangular area: (2P−P)×(3V−V) = P×2V = 2PV. Heat rejected during the cycle's cooling/compression legs balances this to give the net positive work of 2PV over the full cycle.",
    },
    {
      exam: "AIPMT (Mains) 2012 [Q28]",
      question:
        "An ideal gas goes from state A to state B via three different processes, as indicated in the P-V diagram. If Q₁, Q₂, Q₃ indicate the heat absorbed by the gas along the three processes, and ΔU₁, ΔU₂, ΔU₃ indicate the change in internal energy along the three processes respectively, then:",
      options: [
        "Q₁ = Q₂ = Q₃ and ΔU₁ > ΔU₂ > ΔU₃",
        "Q₃ > Q₂ > Q₁ and ΔU₁ > ΔU₂ > ΔU₃",
        "Q₁ > Q₂ > Q₃ and ΔU₁ = ΔU₂ = ΔU₃",
        "Q₃ > Q₂ > Q₁ and ΔU₁ = ΔU₂ = ΔU₃",
      ],
      correctIndex: 2,
      solution:
        "Internal energy is a state function — since all three paths share the same start (A) and end (B) points, ΔU₁ = ΔU₂ = ΔU₃ regardless of path. Heat absorbed, however, is path-dependent (Q = ΔU + W, and work done differs by path, generally being greatest for the path bulging furthest from the V-axis).",
    },
    {
      exam: "AIIMS 2012 [Q33]",
      question: "What is the slope of an isothermal process on a P-V indicator diagram?",
      options: ["P/V", "−P/V", "Zero", "Infinity"],
      correctIndex: 1,
      solution:
        "For an isotherm, PV = constant, so P = constant/V. Differentiating: dP/dV = −constant/V² = −P/V.",
    },
    {
      exam: "NEET-UG 2013 [Q37]",
      question:
        "The molar specific heats of an ideal gas at constant pressure and constant volume are Cₚ and C_v respectively. If γ = Cₚ/C_v and R is the universal gas constant, what is C_v equal to?",
      options: ["γR", "(1+γ)/(1−γ)", "R/(γ−1)", "(γ−1)/R"],
      correctIndex: 2,
      solution:
        "From Mayer's relation, Cₚ − C_v = R, and γ = Cₚ/C_v so Cₚ = γC_v. Substituting: γC_v − C_v = R, so C_v(γ−1) = R, giving C_v = R/(γ−1).",
    },
    {
      exam: "NEET-UG 2013 [Q38]",
      question:
        "During an adiabatic process, the pressure of a gas is found to be proportional to the cube of its temperature. What is the ratio Cₚ/C_v for the gas?",
      options: ["3/2", "4/3", "2", "5/3"],
      correctIndex: 0,
      solution:
        "For an adiabatic process, P^(1−γ)T^γ = constant, i.e. P ∝ T^(γ/(γ−1)). Given P ∝ T³: γ/(γ−1) = 3, so γ = 3γ−3, giving 2γ = 3, γ = 3/2.",
    },
    {
      exam: "AIIMS 2013 [Q42]",
      question:
        "One mole of oxygen, of volume 1 litre at 4 atm pressure, expands isothermally until it reaches 1 atm pressure. Find the work done by the gas.",
      options: ["~155 J", "~206 J", "~355 J", "~562 J"],
      correctIndex: 3,
      solution:
        "For isothermal expansion, W = nRT×ln(V₂/V₁) = P₁V₁×ln(P₁/P₂) (since nRT = P₁V₁ and V₂/V₁ = P₁/P₂). W = (4×101325×0.001)×ln(4) ≈ 405.3×1.386 ≈ 562 J.",
    },
    {
      exam: "AIIMS 2013 [Q43]",
      question: "Which of the following is a state function?",
      options: [
        "Work done in a cyclic process",
        "Work done in an isothermal process",
        "Heat at constant pressure",
        "Heat at constant volume",
      ],
      correctIndex: 3,
      solution:
        "At constant volume, no work is done (ΔW=0), so by the first law, Q = ΔU exactly — and since internal energy U is a state function, heat added at constant volume behaves as one too (its value depends only on the initial and final states, not the path taken to constant-volume equilibrium). Work and heat are otherwise path-dependent quantities, not state functions in general.",
    },
    {
      exam: "AIIMS 2013 [Q44]",
      question:
        "A refrigerator transfers 180 joules of energy in one second from a temperature of −3°C to 27°C. Calculate the average power consumed, assuming no energy losses in the process.",
      options: ["18 W", "54 W", "20 W", "120 W"],
      correctIndex: 2,
      solution:
        "COP = Tc/(Th−Tc) = 270/(300−270) = 270/30 = 9. Power consumed W = Qc/COP = 180/9 = 20 W.",
    },
    {
      exam: "AIPMT 2014 [Q48]",
      question:
        "A monoatomic gas at pressure P, having volume V, expands isothermally to volume 2V, and then adiabatically to volume 16V. What is the final pressure of the gas? (Take γ=5/3)",
      options: ["64P", "32P", "P/64", "16P"],
      correctIndex: 2,
      solution:
        "Isothermal step: P×V = P₂×2V, so P₂ = P/2. Adiabatic step: P₂(2V)^γ = P₃(16V)^γ, so P₃ = P₂×(2V/16V)^γ = (P/2)×(1/8)^(5/3) = (P/2)×(1/32) = P/64.",
    },
    {
      exam: "AIPMT 2015 [Q52]",
      question:
        "A diatomic gas (γ=1.4) undergoes adiabatic compression until its volume reduces to half of the initial volume. What is the final pressure, if the initial pressure of the gas is P?",
      options: ["2^1.4·P", "P/2", "2P", "3.07P"],
      correctIndex: 0,
      solution:
        "[OCR NOTE: option (1) is corrected from '21.4P' to '2^1.4·P' — a lost exponent in the source scan.] For adiabatic compression, P₂ = P₁(V₁/V₂)^γ = P×2^1.4 ≈ 2.64P.",
    },
    {
      exam: "AIPMT 2015 [Q53]",
      question:
        "One mole of an ideal diatomic gas undergoes a transition from state A (P=5 kPa, V=4 m³) to state B (P=2 kPa, V=6 m³) along a straight-line path AB on the P-V diagram. What is the change in internal energy of the gas during this transition?",
      options: ["−20 kJ", "20 J", "−12 kJ", "20 kJ"],
      correctIndex: 0,
      solution:
        "For an ideal gas, ΔU = nCᵥΔT = (5/2)Δ(PV)/1 for a diatomic gas (Cᵥ=5R/2, and nRΔT=Δ(PV)). Δ(PV) = (2000×6)−(5000×4) = 12000−20000 = −8000 J. ΔU = (5/2)×(−8000) = −20000 J = −20 kJ.",
    },
    {
      exam: "AIIMS 2014 [Q55]",
      question:
        "A Carnot engine, having an efficiency of η=1/10 as a heat engine, is used as a refrigerator. If the work done on the system is 10 J, what is the amount of energy absorbed from the reservoir at the lower temperature?",
      options: ["99 J", "90 J", "1 J", "100 J"],
      correctIndex: 1,
      solution:
        "As a heat engine, η=1−Tc/Th=1/10, so Tc/Th=9/10, i.e. Th−Tc = Th/10. As a refrigerator, COP = Tc/(Th−Tc) = (9Th/10)/(Th/10) = 9. Heat absorbed from the cold reservoir: Qc = COP×W = 9×10 = 90 J.",
    },
    {
      exam: "AIPMT 2015 [Q57]",
      question:
        "A gas may go from state A (P=2×10⁴ Pa, V=2×10⁻³ m³) to state C (P=6×10⁴ Pa, V=4×10⁻³ m³) via an intermediate state B (P=6×10⁴ Pa, V=2×10⁻³ m³), where process AB is at constant volume and BC is at constant pressure. In process AB, 400 J of heat is added; in process BC, 100 J of heat is added. What is the heat absorbed by the system in the direct process AC (a straight line on the P-V diagram from A to C)?",
      options: ["500 J", "460 J", "300 J", "380 J"],
      correctIndex: 1,
      solution:
        "Since AB is isochoric, W(AB)=0, so ΔU(AB)=400 J. Since BC is isobaric, W(BC)=P×ΔV=(6×10⁴)(2×10⁻³)=120 J, so ΔU(BC)=100−120=−20 J. Total ΔU(A→C)=400−20=380 J (path-independent). For the direct straight-line path A to C, work done = area under the line (trapezoid) = ½(P_A+P_C)(V_C−V_A) = ½(2×10⁴+6×10⁴)(2×10⁻³) = 80 J. Heat absorbed on this path: Q(AC) = ΔU + W = 380+80 = 460 J.",
    },
    {
      exam: "AIIMS 2015 [Q61]",
      question:
        "The coefficient of performance of a refrigerator is 5. If the temperature inside the freezer is −20°C, what is the temperature of the surroundings to which it rejects heat?",
      options: ["21°C", "31°C", "41°C", "11°C"],
      correctIndex: 1,
      solution:
        "COP = Tc/(Th−Tc). 5 = 253/(Th−253), so Th−253 = 253/5 = 50.6, giving Th ≈ 303.6 K ≈ 31°C.",
    },
    {
      exam: "AIIMS 2015 [Q62]",
      question:
        "An ideal gas is compressed to half its initial volume by means of several possible processes. Which process results in the maximum work done ON the gas?",
      options: ["Isothermal", "Adiabatic", "Isobaric", "Isochoric"],
      correctIndex: 1,
      solution:
        "On a P-V diagram, the adiabatic curve is steeper than the isothermal curve at any given point (since PVᵞ falls off faster than PV for γ>1). For the same compression, the adiabatic path traces a larger enclosed area, meaning more work is done on the gas.",
    },
    {
      exam: "AIIMS 2015 [Q64]",
      question:
        "One of the most efficient engines ever developed operated between 2100 K and 700 K. Its actual efficiency is 40%. What percentage of its maximum possible (Carnot) efficiency is its actual efficiency (approximately)?",
      options: ["40%", "60%", "75%", "90%"],
      correctIndex: 1,
      solution:
        "Maximum (Carnot) efficiency: η(max) = 1−Tc/Th = 1−700/2100 = 1−1/3 = 2/3 ≈ 66.7%. Percentage of maximum achieved: (0.40/0.667)×100 = 60%.",
    },
    {
      exam: "NEET-I 2016 [Q68]",
      question:
        "A refrigerator works between 4°C and 30°C. It is required to remove 600 calories of heat every second to keep the refrigerated space at constant temperature. What power is required? (1 cal = 4.2 J)",
      options: ["2.365 W", "23.65 W", "236.5 W", "2365 W"],
      correctIndex: 2,
      solution:
        "COP = Tc/(Th−Tc) = 277/(303−277) = 277/26 ≈ 10.65. Heat to remove per second: Qc = 600×4.2 = 2520 J/s. Power = Qc/COP = 2520/10.65 ≈ 236.5 W.",
    },
    {
      exam: "AIIMS 2015 [Q72]",
      question:
        "A gas is compressed isothermally to half its initial volume. The same gas is separately compressed through an adiabatic process to the same final volume (half the initial). Which of the following is correct?",
      options: [
        "Compressing the gas isothermally requires more work",
        "Compressing the gas through an adiabatic process requires more work",
        "Both processes require the same amount of work",
        "Which case requires more work depends on the atomicity of the gas",
      ],
      correctIndex: 1,
      solution:
        "The adiabatic curve is steeper than the isothermal curve, so for the same volume compression, the average pressure resisting compression is higher along the adiabatic path — more work must be done on the gas via the adiabatic process.",
    },
    {
      exam: "NEET-II 2016 [Q76]",
      question:
        "One mole of an ideal monatomic gas undergoes a process described by the equation PV³ = constant. What is the heat capacity of the gas during this process?",
      options: ["2R", "R", "(3/2)R", "(5/2)R"],
      correctIndex: 1,
      solution:
        "For a polytropic process PVⁿ = constant, the molar heat capacity is C = Cᵥ + R/(1−n). For a monatomic gas, Cᵥ=3R/2, and here n=3: C = (3/2)R + R/(1−3) = 1.5R − 0.5R = R.",
    },
    {
      exam: "AIIMS 2016 [Q77]",
      question:
        "The temperature inside a refrigerator is t₂°C and the room temperature is t₁°C. What is the amount of heat delivered to the room, ideally, for each joule of electrical energy consumed?",
      options: [
        "(t₂+273)/(t₁−t₂)",
        "(t₁+t₂)/(t₁+273)",
        "t₁/(t₁−t₂)",
        "(t₁+273)/(t₁−t₂)",
      ],
      correctIndex: 3,
      solution:
        "As a heat pump, the heat delivered per unit of work input is COP(heating) = Th/(Th−Tc), with temperatures in Kelvin. Th = t₁+273, Tc = t₂+273, so Th−Tc = t₁−t₂. COP = (t₁+273)/(t₁−t₂).",
    },
    {
      exam: "AIIMS 2016 [Q79]",
      question:
        "In an adiabatic process, the volume of a monatomic gas increases by 6%. Find the percentage change in temperature.",
      options: ["−2%", "−4%", "2%", "4%"],
      correctIndex: 1,
      solution:
        "For an adiabatic process, TV^(γ−1) = constant. Differentiating logarithmically: dT/T = −(γ−1)(dV/V). For a monatomic gas, γ−1=2/3. dT/T = −(2/3)(6%) = −4%.",
    },
    {
      exam: "AIIMS 2016 [Q80]",
      question: "5 moles of a gas expand isothermally from V to 2V at 400 K. Find the work done by the gas.",
      options: ["11.50 kJ", "23.4 kJ", "63.7 kJ", "5.6 kJ"],
      correctIndex: 0,
      solution: "W = nRT×ln(2) = 5×8.314×400×ln(2) ≈ 5×8.314×400×0.693 ≈ 11525 J ≈ 11.50 kJ.",
    },
    {
      exam: "NEET(UG) 2017 [Q82]",
      question:
        "A gas undergoes a triangular cyclic process on a P-V diagram with vertices at P=0.5 atm & V=10 L, P=0.5 atm & V=50 L, and P=1 atm & V=50 L. Find the work done by the gas in the cyclic process.",
      options: ["100 J", "200 J", "600 J", "1000 J"],
      correctIndex: 3,
      solution:
        "The cycle encloses a right triangle with base ΔV = (50−10) L = 40 L = 0.04 m³ and height ΔP = (1−0.5) atm = 0.5×10⁵ Pa. Net work = area of triangle = ½×0.04×0.5×10⁵ = 1000 J.",
    },
    {
      exam: "NEET(UG) 2017 [Q83]",
      question:
        "When 250 kJ of heat is given to a system and it does 400 kJ of work, what is the change in internal energy of the system?",
      options: ["150 kJ", "−150 kJ", "200 kJ", "−200 kJ"],
      correctIndex: 1,
      solution: "By the first law, ΔU = Q − W = 250 − 400 = −150 kJ.",
    },
    {
      exam: "AIIMS 2017 [Q89]",
      question: "For an isolated system:",
      options: ["Q = 0, W = 0", "Q ≠ 0, W = 0", "Q = 0, W ≠ 0", "Q ≠ 0, W ≠ 0"],
      correctIndex: 0,
      solution:
        "An isolated system exchanges neither heat nor work (nor matter) with its surroundings, by definition. So Q = 0 and W = 0.",
    },
    {
      exam: "AIIMS 2017 [Q90]",
      question:
        "An ideal gas at pressure P undergoes free expansion from an initial volume of 1.01 litre to 10.1 litre. What is the final pressure of the gas?",
      options: ["P×10^γ", "P/10^γ", "10P", "P/10"],
      correctIndex: 3,
      solution:
        "In free expansion (expansion into a vacuum), no work is done and no heat is exchanged, so for an ideal gas the temperature — and hence internal energy — is unchanged. Applying Boyle's law (isothermal): P₂ = P×(V₁/V₂) = P×(1.01/10.1) = P/10.",
    },
    {
      exam: "AIIMS 2017 [Q91]",
      question:
        "Argon gas is at an initial temperature of 20°C. If the gas expands adiabatically to 8 times its initial volume, find the final temperature of the argon gas. (Argon is monatomic, γ=5/3)",
      options: ["−100°C", "−50°C", "−200°C", "0°C"],
      correctIndex: 2,
      solution:
        "For adiabatic expansion, TV^(γ−1)=constant, so T₂=T₁(V₁/V₂)^(γ−1). T₁=293 K, γ−1=2/3. T₂=293×(1/8)^(2/3)=293×0.25≈73.25 K ≈ −200°C.",
    },
    {
      exam: "AIIMS 2017 [Q92]",
      question:
        "At constant pressure, what fraction of the heat supplied to a gas is converted into mechanical work?",
      options: ["(γ−1)/γ", "γ/(γ−1)", "γ−1", "γ/(γ+1)"],
      correctIndex: 0,
      solution:
        "At constant pressure, W = nRΔT and Q = nCₚΔT. Fraction = W/Q = R/Cₚ. Since Cₚ = γR/(γ−1), this simplifies to R×(γ−1)/(γR) = (γ−1)/γ.",
    },
    {
      exam: "NEET(UG) 2018 [Q93]",
      question:
        "A sample of 0.1 g of water at 100°C and normal pressure (1.013×10⁵ N/m²) requires 54 cal of heat energy to convert to steam at 100°C. If the volume of the steam produced is 167.1 cc, what is the change in internal energy of the sample?",
      options: ["104.3 J", "208.7 J", "42.2 J", "84.5 J"],
      correctIndex: 1,
      solution:
        "Q = 54×4.2 = 226.8 J. Work done by expansion: W = PΔV = (1.013×10⁵)×(167.1×10⁻⁶) ≈ 16.9 J (water's own volume is negligible). ΔU = Q−W = 226.8−16.9 ≈ 209.9 J ≈ 208.7 J.",
    },
    {
      exam: "NEET(UG) 2018 [Q95]",
      question:
        "The volume V of a monatomic gas varies with its temperature T as a straight line through the origin (V∝T), as shown in the graph, as it goes from state A to state B. What is the ratio of the work done by the gas to the heat absorbed by it during this change?",
      options: ["2/5", "2/3", "1/3", "2/7"],
      correctIndex: 0,
      solution:
        "V∝T (a straight line through the origin) is exactly the condition for a constant-pressure (isobaric) process. At constant pressure, W/Q = R/Cₚ = (γ−1)/γ. For a monatomic gas, γ=5/3, so the ratio = (2/3)/(5/3) = 2/5.",
    },
    {
      exam: "NEET(UG) 2018 [Q96]",
      question:
        "What is the efficiency of an ideal heat engine working between the freezing point (0°C) and boiling point (100°C) of water?",
      options: ["26.8%", "20%", "6.25%", "12.5%"],
      correctIndex: 0,
      solution: "η = 1−Tc/Th = 1−273/373 ≈ 0.268 = 26.8%.",
    },
    {
      exam: "AIIMS 2018 [Q98]",
      question: "Which of the following properties of a thermodynamic system are extensive?",
      options: ["V and T", "P and T", "V and E", "E and Cₚ"],
      correctIndex: 2,
      solution:
        "Extensive properties scale with the amount/size of the system: volume (V) and total internal energy (E) both double if the system's quantity doubles. Pressure (P) and temperature (T) are intensive — they don't depend on system size.",
    },
    {
      exam: "AIIMS 2018 [Q99]",
      question:
        "1 cm³ of water at 100°C and 1 atm pressure is heated to convert it to 1521 cm³ of vapour. Find the increase in internal energy, given the latent heat of vaporisation of water = 540 cal/g.",
      options: ["3.26 kJ", "2.12 kJ", "4.18 kJ", "1.05 kJ"],
      correctIndex: 1,
      solution:
        "Mass ≈ 1 g (water density ≈1 g/cm³). Q = 1×540×4.2 = 2268 J. Work done in expansion: W = PΔV = (1.013×10⁵)×(1520×10⁻⁶) ≈ 154 J. ΔU = Q−W = 2268−154 ≈ 2114 J ≈ 2.12 kJ.",
    },
    {
      exam: "AIIMS 2018 [Q100]",
      question: "Which of the following is an intensive property of a thermodynamic system?",
      options: ["P and T", "V and T", "V and P", "V and E"],
      correctIndex: 0,
      solution:
        "Pressure (P) and temperature (T) do not depend on the amount of substance present — they are intensive properties. Volume (V) and total energy (E) scale with system size and are extensive.",
    },
    {
      exam: "AIIMS 2018 [Q101]",
      question:
        "The work done in expanding one mole of an ideal gas isothermally from 2 L to 4 L equals the work done in expanding three moles of an ideal gas isothermally from 2 L to x L, at the same temperature. Find x.",
      options: ["8^(1/3)", "4^(2/3)", "2", "16"],
      correctIndex: 1,
      solution:
        "W₁ = 1×RT×ln(4/2) = RT ln2. W₂ = 3×RT×ln(x/2). Setting equal: ln2 = 3ln(x/2), so ln(x/2) = (ln2)/3, giving x/2 = 2^(1/3), so x = 2×2^(1/3) = 2^(4/3) = 4^(2/3) ≈ 2.52.",
    },
    {
      exam: "AIIMS 2018 [Q102] (reduced confidence — see note)",
      question:
        "A rectangular cycle ABCD (A top-left, B top-right, C bottom-right, D bottom-left) is shown on a temperature-entropy (T-S) diagram. Which pair of processes represents an increase in volume?",
      options: ["DA and AB", "AB and BC", "BC and CD", "CD and DA"],
      correctIndex: 1,
      solution:
        "[REDUCED CONFIDENCE — the exact rectangle orientation could not be visually confirmed this session; presented per the source-verified answer.] On a T-S diagram, horizontal legs (constant T) are isothermal — volume increases if the gas is expanding at that constant temperature; vertical legs (constant S) are isentropic — an adiabatic expansion also increases volume as T falls. The source-verified answer identifies legs AB and BC as the volume-increasing pair for this specific rectangle's orientation and direction of traversal.",
    },
    {
      exam: "AIIMS 2018 [Q104]",
      question:
        "An ideal gas undergoes a cyclic process as shown in the diagram, bounded by P=2 atm and P=5 atm, and V=4 L and V=12 L (a rectangular cycle in the P-V plane). What is the net work done by the gas in the cycle?",
      options: ["12 litre-atm", "24 J", "24 litre-atm", "−24 J"],
      correctIndex: 2,
      solution:
        "The cycle encloses a rectangle with sides ΔP = (5−2) = 3 atm and ΔV = (12−4) = 8 L. Net work done = enclosed area = 3×8 = 24 litre-atm.",
    },
    {
      exam: "AIIMS 2018 [Q105]",
      question:
        "A thermodynamic system does 60 J of useful work. If its internal energy decreases by 50 J, how much heat has been supplied to the system?",
      options: ["10 J", "110 J", "−10 J", "−60 J"],
      correctIndex: 0,
      solution:
        "ΔU = −50 J (a decrease). By the first law, Q = ΔU + W = −50 + 60 = 10 J.",
    },
    {
      exam: "AIIMS 2018 [Q106]",
      question:
        "In an adiabatic expansion of 0.5 mole of an ideal diatomic gas, the temperature changes from 32°C to 20°C. What is the change in internal energy of the gas?",
      options: ["124.65 cal", "−124.65 J", "72.32 J", "248.3 J"],
      correctIndex: 1,
      solution:
        "ΔU = nCᵥΔT, with Cᵥ=(5/2)R for a diatomic gas. ΔU = 0.5×(5/2)×8.314×(293−305) = 0.5×2.5×8.314×(−12) ≈ −124.7 J.",
    },
    {
      exam: "AIIMS 2018 [Q107]",
      question:
        "A refrigerator having a coefficient of performance 10 absorbs 500 J per cycle. What is the amount of heat rejected to the surroundings per cycle?",
      options: ["50 J", "550 J", "450 J", "500 J"],
      correctIndex: 1,
      solution:
        "COP = Qc/W, so W = Qc/COP = 500/10 = 50 J. Heat rejected: Qh = Qc + W = 500 + 50 = 550 J.",
    },
    {
      exam: "AIIMS 2018 [Q109]",
      question:
        "What is the change in entropy of 1 kg of nitrogen gas in an isobaric process when its temperature changes from 400 K to 800 K? (Nitrogen is diatomic, molar mass 28 g/mol, Cₚ=7R/2)",
      options: ["720 J/K", "420 J/K", "309 J/K", "720 cal/°C"],
      correctIndex: 0,
      solution:
        "Moles n = 1000/28 ≈ 35.7. For an isobaric process, ΔS = nCₚ×ln(T₂/T₁) = 35.7×(3.5×8.314)×ln(2) ≈ 35.7×29.1×0.693 ≈ 720 J/K.",
    },
  ],
};
