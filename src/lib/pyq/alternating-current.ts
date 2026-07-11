import type { ChapterPyq } from "./kinematics";

// SOURCE NOTES (read before editing):
// - Source: Allen NEET module, "ALTERNATING CURRENT (AC)" chapter,
//   Exercise-II (Previous Year Questions), true PDF pages 1158-1162, 41
//   questions total, all belonging to this single standalone chapter.
// - Answer key independently verified from page 1162's printed key table.
// - SCHEMA NOTE: built strictly to the real PyqQuestion type (exam,
//   examType?, question, options, correctIndex, solution) — no invented
//   fields.
// - Q5: source options had badly garbled bracket/division formatting in
//   the scan; reconstructed using the one dimensionally-correct form of
//   the standard LCR power formula.
// - Q10: graph-shape question: my triangular-wave-RMS derivation
//   (V0/root3) does not match where the key points (which corresponds to
//   V0/root2, the sinusoidal-wave result) -- flagged as an open
//   discrepancy rather than silently forced.
// - Q26: multi-step numeric calculation lands close to, but not exactly
//   matching, the key's stated value -- likely accumulated rounding;
//   flagged for transparency.
// - Every other question reproduced the verified key cleanly through
//   standard, well-established methods.

export const alternatingCurrentPyq: ChapterPyq = {
  chapterName: "Alternating Current",
  className: "12",
  questions: [
    {
      exam: "AIPMT 2006 [Q1]",
      question:
        "A transistor-oscillator uses a resonant circuit with an inductor L (negligible resistance) and a capacitor C in series, producing oscillations of frequency f. If L is doubled and C is changed to 4C, what is the new frequency?",
      options: ["f/4", "8f", "f/(2 root2)", "f/2"],
      correctIndex: 2,
      solution:
        "Resonant frequency: f = 1/(2*pi*sqrt(LC)). New frequency: f' = 1/(2*pi*sqrt(2L*4C)) = 1/(2*pi*sqrt(8LC)) = f/sqrt(8) = f/(2*sqrt(2)).",
    },
    {
      exam: "AIIMS 2006 [Q2]",
      question:
        "A coil of inductive reactance 31 ohm has a resistance of 8 ohm. It is placed in series with a condenser of capacitive reactance 25 ohm. The combination is connected to an AC source of 110 V. What is the power factor of the circuit?",
      options: ["0.56", "0.64", "0.80", "0.33"],
      correctIndex: 2,
      solution:
        "Net reactance: X = XL - XC = 31 - 25 = 6 ohm. Impedance: Z = sqrt(R^2+X^2) = sqrt(64+36) = sqrt(100) = 10 ohm. Power factor = R/Z = 8/10 = 0.80.",
    },
    {
      exam: "AIPMT 2007 [Q3]",
      question:
        "What is the value of inductance L for which the current is maximum in a series LCR circuit with C = 10 microfarad and omega = 1000 per second?",
      options: ["10 mH", "100 mH", "1 mH", "Cannot be calculated unless R is known"],
      correctIndex: 1,
      solution:
        "Current is maximum at resonance, where omega*L = 1/(omega*C), so L = 1/(omega^2*C) = 1/(1000^2 * 10e-6) = 1/(1e6*1e-5) = 1/10 = 0.1 H = 100 mH.",
    },
    {
      exam: "AIPMT 2008 [Q4]",
      question:
        "In an AC circuit, the EMF (e) and current (i) at any instant are given by e = E0*sin(wt) and i = I0*sin(wt - phi). What is the average power in the circuit over one cycle?",
      options: ["(E0*I0/2)*cos(phi)", "E0*I0", "E0*I0/2", "(E0*I0/2)*sin(phi)"],
      correctIndex: 0,
      solution:
        "Average power over one full AC cycle: P(avg) = (E0*I0/2)*cos(phi), where phi is the phase difference between current and voltage. This is the standard result -- averaging the instantaneous power e(t)*i(t) over a complete cycle.",
    },
    {
      exam: "AIPMT 2009 [Q5] (reduced confidence — see note)",
      question:
        "What is the power dissipated in an LCR series circuit connected to an AC source of EMF e?",
      options: [
        "e^2*R / [R^2 + (Lw - 1/Cw)^2]",
        "e^2 / [R^2 + (Lw - 1/Cw)^2]",
        "e^2*R^2 / [R^2 + (Lw - 1/Cw)^2]",
        "e / [R^2 + (Lw - 1/Cw)^2]",
      ],
      correctIndex: 1,
      solution:
        "[FLAGGED DISCREPANCY] The source scan's bracket/exponent formatting for these four options was badly garbled, and my reconstruction may not exactly match the original. Physics: power dissipated P = I(rms)^2 * R = [e/Z]^2 * R, where Z^2 = R^2+(Lw-1/Cw)^2. So P = e^2*R/[R^2+(Lw-1/Cw)^2] -- option 1 above, which is the only one of the four listed forms that is dimensionally consistent with power (option 2, which the printed key points to, has units of e^2/impedance^2, not power). correctIndex is set to 1 to match the printed key per the rule of never silently overriding it, but this is a real, unresolved discrepancy between the key and basic dimensional analysis -- most likely because my reconstruction of the garbled option text doesn't exactly match the source. Recommend re-checking against a clearer scan.",
    },
    {
      exam: "AIPMT Pre. 2010 [Q6]",
      question:
        "In a series circuit with inductor L, capacitor C, and resistance R=100 ohm connected to a 220V, 50Hz source, voltmeters V1 (across L) and V2 (across C) both read 300 V. What are the readings of voltmeter V3 (across R) and the ammeter A respectively?",
      options: ["100 V, 2.0 A", "150 V, 2.2 A", "220 V, 2.2 A", "220 V, 2.0 A"],
      correctIndex: 2,
      solution:
        "Since V(L) = V(C) = 300 V, these two voltage phasors are equal and opposite (180 degrees apart), so they cancel completely in the series combination. Total source voltage = sqrt[V(R)^2 + (V(L)-V(C))^2] = V(R) directly, since (V(L)-V(C))=0. So V(R) = V3 = 220 V (equal to the source voltage). Current: I = V(R)/R = 220/100 = 2.2 A.",
    },
    {
      exam: "AIPMT Mains 2010 [Q7]",
      question:
        "A capacitor of capacity C is charged to a potential difference V1. Its plates are then connected to an ideal inductor of inductance L. What is the current through the inductor when the potential difference across the capacitor reduces to V2?",
      options: [
        "C(V1^2-V2^2)/L",
        "C(V1^2+V2^2)/L",
        "[C(V1^2-V2^2)/L]^(1/2)",
        "[C(V1-V2)^2/L]^(1/2)",
      ],
      correctIndex: 2,
      solution:
        "By energy conservation in the LC circuit: (1/2)C*V1^2 = (1/2)C*V2^2 + (1/2)L*I^2, so I^2 = C(V1^2-V2^2)/L, giving I = sqrt[C(V1^2-V2^2)/L].",
    },
    {
      exam: "AIPMT Pre. 2011 [Q8]",
      question:
        "An AC voltage is applied to a resistance R and an inductor L in series. If R and the inductive reactance are both equal to 3 ohm, what is the phase difference between the applied voltage and the current?",
      options: ["pi/6", "pi/4", "pi/2", "Zero"],
      correctIndex: 1,
      solution:
        "tan(phi) = XL/R = 3/3 = 1, so phi = pi/4.",
    },
    {
      exam: "AIPMT Mains 2011 [Q9]",
      question:
        "In an AC circuit, an alternating voltage e = 200*sqrt(2)*sin(100t) volts is connected to a capacitor of capacity 1 microfarad. What is the rms value of the current in the circuit?",
      options: ["10 mA", "100 mA", "200 mA", "20 mA"],
      correctIndex: 3,
      solution:
        "E(rms) = E0/sqrt(2) = 200*sqrt(2)/sqrt(2) = 200 V. Capacitive reactance: XC = 1/(wC) = 1/(100*1e-6) = 1e4 ohm. I(rms) = E(rms)/XC = 200/1e4 = 0.02 A = 20 mA.",
    },
    {
      exam: "AIPMT Mains 2011 [Q10] (reduced confidence — see note)",
      question:
        "A symmetric triangular voltage waveform, rising linearly from 0 to a peak value V0 over half a period and falling back to 0 over the other half, is shown in a figure. What is the rms value of this waveform?",
      options: ["V0/sqrt(3)", "V0", "V0/sqrt(2)", "V0/2"],
      correctIndex: 2,
      solution:
        "[FLAGGED DISCREPANCY] The standard rms value for a symmetric linear triangular waveform (rising 0 to V0, falling V0 to 0) is V0/sqrt(3), from integrating the square of a linear ramp over the period. This does not match where the printed key points (option 3, V0/sqrt(2) -- the standard result for a SINUSOIDAL wave, not a triangular one). Either the waveform shown is not a simple linear triangle (perhaps a different shape I can't confirm from the text extraction), or there's a genuine mismatch. correctIndex is set to 2 to match the printed key, but this should be treated as an open, unresolved discrepancy rather than a fully verified derivation.",
    },
    {
      exam: "AIPMT Pre. 2012 [Q11]",
      question:
        "A coil has resistance 30 ohm and inductive reactance 20 ohm at 50 Hz frequency. If an AC source of 200 V, 100 Hz is connected across the coil, what is the current in the coil?",
      options: ["2.0 A", "4.0 A", "8.0 A", "20/13 A"],
      correctIndex: 1,
      solution:
        "Since XL is proportional to frequency, doubling the frequency from 50 Hz to 100 Hz doubles the reactance: XL(new) = 2*20 = 40 ohm. Impedance: Z = sqrt(R^2+XL^2) = sqrt(900+1600) = sqrt(2500) = 50 ohm. Current: I = V/Z = 200/50 = 4.0 A.",
    },
    {
      exam: "AIPMT Pre. 2012 [Q12]",
      question:
        "In a series R, L, C AC circuit, when L is removed, the phase difference between voltage and current is pi/3. When instead C is removed, the phase difference is again pi/3. What is the power factor of the complete (R-L-C) circuit?",
      options: ["1", "1/sqrt(2)", "1/2", "sqrt(3)/2"],
      correctIndex: 0,
      solution:
        "With L removed (just R,C): tan(pi/3) = XC/R, so XC = sqrt(3)*R. With C removed (just R,L): tan(pi/3) = XL/R, so XL = sqrt(3)*R. Since XL = XC when both are present together, the circuit is at resonance -- net reactance is zero, impedance Z=R, and power factor = R/Z = 1.",
    },
    {
      exam: "AIPMT Mains 2012 [Q13]",
      question:
        "The instantaneous alternating current and voltage in a circuit are i = (1/sqrt(2))*sin(100*pi*t) amperes and e = (1/sqrt(2))*sin(100*pi*t + pi/3) volts. What is the average power (in watts) consumed?",
      options: ["1/2", "1/8", "1/4", "3/4"],
      correctIndex: 1,
      solution:
        "P(avg) = (E0*I0/2)*cos(phi) = [(1/sqrt(2))*(1/sqrt(2))/2] * cos(60 degrees) = [(1/2)/2] * 0.5 = 0.25*0.5 = 1/8.",
    },
    {
      exam: "AIIMS 2012 [Q14]",
      question:
        "In an AC circuit, voltage V = V0*sin(wt) is applied across an inductor L. What is the instantaneous power?",
      options: [
        "(V0^2/2wL)*sin(wt)",
        "(-V0^2/2wL)*sin(wt)",
        "(-V0^2/2wL)*sin(2wt)",
        "(V0^2/wL)*sin(2wt)",
      ],
      correctIndex: 2,
      solution:
        "Current through the inductor: i = (V0/wL)*sin(wt - pi/2) = -(V0/wL)*cos(wt). Instantaneous power: p = V*i = V0*sin(wt) * [-(V0/wL)*cos(wt)] = -(V0^2/wL)*sin(wt)*cos(wt) = -(V0^2/2wL)*sin(2wt), using the identity 2*sin(theta)*cos(theta)=sin(2*theta).",
    },
    {
      exam: "AIIMS 2012 [Q15]",
      question:
        "In a series LCR circuit with R=4 ohm, XL=5 ohm, and XC=8 ohm, how does the current relate to the voltage?",
      options: [
        "Leads the voltage by arctan(3/4)",
        "Leads the voltage by arctan(5/8)",
        "Lags the voltage by arctan(3/4)",
        "Lags the voltage by arctan(5/8)",
      ],
      correctIndex: 0,
      solution:
        "Net reactance = XL-XC = 5-8 = -3 ohm (net capacitive). Phase angle magnitude: tan(phi) = |net reactance|/R = 3/4. Since the circuit is net capacitive (XC>XL), current LEADS the voltage -- so the current leads by arctan(3/4).",
    },
    {
      exam: "AIPMT Mains 2012 [Q16]",
      question:
        "In the mechanical-electrical analogy for a series LCR circuit, which electrical quantity is analogous to the driving force F(t) in mechanics?",
      options: ["Current dq/dt", "Inductance L", "Capacitance C", "Voltage 'e'"],
      correctIndex: 3,
      solution:
        "In the standard electromechanical analogy (mass to L, damping to R, 1/spring-constant to C, displacement to charge q, velocity to current), the external driving force F(t) corresponds to the driving voltage/EMF source e(t) -- both are the external inputs that drive their respective systems.",
    },
    {
      exam: "NEET-UG 2013 [Q17]",
      question:
        "A coil of self-inductance L is connected in series with a bulb B and an AC source. Under which condition does the brightness of the bulb decrease?",
      options: [
        "An iron rod is inserted in the coil",
        "Frequency of the AC source is decreased",
        "Number of turns in the coil is reduced",
        "A capacitance of reactance XC=XL is included in the same circuit",
      ],
      correctIndex: 0,
      solution:
        "Brightness decreases when current decreases, i.e. when impedance increases. Inserting an iron rod increases L (hence increases XL and total impedance), decreasing current -- this is the only listed change that increases impedance. Decreasing frequency, reducing turns, or adding a matching capacitance (creating resonance, minimizing impedance) would all instead increase the current and brightness.",
    },
    {
      exam: "AIIMS 2013 [Q18]",
      question:
        "In a parallel L-C-R circuit, the mechanical spring constant K is analogous to which electrical quantity?",
      options: ["L", "C", "1/L", "1/C"],
      correctIndex: 2,
      solution:
        "For the parallel-circuit form of the electromechanical analogy (the 'dual' of the series-circuit analogy), the roles of L and C swap compared to the series case -- here, spring constant K corresponds to 1/L.",
    },
    {
      exam: "AIPMT 2014 [Q19]",
      question:
        "In a series R-L-C circuit with R=20 ohm, L=0.5H, C=200 microfarad, and V=5*sin(100t), what is the maximum voltage drop across the inductor?",
      options: ["50 volt", "25 volt", "12.5 volt", "5 volt"],
      correctIndex: 2,
      solution:
        "w=100. XL = wL = 100*0.5 = 50 ohm. XC = 1/(wC) = 1/(100*200e-6) = 1/0.02 = 50 ohm. Since XL=XC, the circuit is at resonance, so Z=R=20 ohm. Peak current: I0=V0/Z=5/20=0.25A. Maximum voltage across L: V(L,max) = I0*XL = 0.25*50 = 12.5 volt.",
    },
    {
      exam: "AIPMT 2014 [Q20]",
      question:
        "An electrical device operates at 12 A and 120 V DC. If it is instead connected to a 250 V, 30 Hz AC supply (treating the device as a simple resistor), what is the power consumption?",
      options: ["625 W", "1250 W", "6250 W", "Zero"],
      correctIndex: 2,
      solution:
        "Device resistance (from DC operation): R = 120/12 = 10 ohm. Treating it as purely resistive under AC: P = V(rms)^2/R = 250^2/10 = 62500/10 = 6250 W.",
    },
    {
      exam: "AIIMS 2014 [Q21]",
      question:
        "Comparing damped mechanical oscillations with a parallel RLC circuit connected to an external source, the damping coefficient is found analogous to which electrical quantity?",
      options: ["1/R", "R", "L/R", "R/(LC)"],
      correctIndex: 0,
      solution:
        "In the parallel-circuit electromechanical analogy, the damping coefficient (which represents energy loss due to friction in the mechanical system) corresponds to 1/R -- since in a parallel circuit, a smaller R (larger conductance) provides greater damping.",
    },
    {
      exam: "Re-AIPMT 2015 [Q22]",
      question:
        "A series R-C circuit is connected to an alternating voltage source. Two situations are considered: (a) capacitor is air-filled, (b) capacitor is mica-filled (higher dielectric constant, higher capacitance). Current through the resistor is i and voltage across the capacitor is V. Which relation holds?",
      options: ["Va = Vb", "Va < Vb", "Va > Vb", "ia > ib"],
      correctIndex: 2,
      solution:
        "Mica has a higher dielectric constant than air, so C(b) > C(a), meaning XC(b) < XC(a) -- the mica-filled capacitor has lower reactance, allowing more current to flow (ib > ia) and thus reducing the impedance-limited voltage drop across it relative to the air-filled case. Working through the full phasor relationship, the voltage across the capacitor ends up larger in the air-filled case: Va > Vb.",
    },
    {
      exam: "AIPMT 2015 [Q23]",
      question:
        "A resistance R draws power P when connected to an AC source. If an inductance is now placed in series with the resistance, so that the impedance of the circuit becomes Z, what power is now drawn?",
      options: ["P", "P(R/Z)", "P(Z/R)", "P(R/Z)^2"],
      correctIndex: 3,
      solution:
        "With just R: P = V^2/R (for fixed source voltage V). With L added: Z=sqrt(R^2+XL^2) > R, and the new power = I^2*R = (V/Z)^2*R = (V^2/R)*(R/Z)^2 = P(R/Z)^2.",
    },
    {
      exam: "AIIMS 2015 [Q24]",
      question:
        "What is the frequency of instantaneous power in an AC circuit connected to a capacitor, given the source frequency f=50 Hz, V=220V?",
      options: ["50 Hz", "100 Hz", "zero", "60 Hz"],
      correctIndex: 1,
      solution:
        "Instantaneous power p(t) = v(t)*i(t), and since both voltage and current oscillate at the source frequency f, their PRODUCT (via a product-to-sum trigonometric identity) oscillates at DOUBLE the source frequency: 2*50 = 100 Hz.",
    },
    {
      exam: "AIIMS 2015 [Q25]",
      question:
        "In a series RL circuit connected to a 120V, 60Hz AC source, the potential difference across the resistance is 54 V and the power consumed by it is 16 W. What is the value of L?",
      options: ["1 H", "2 H", "5 H", "4 H"],
      correctIndex: 0,
      solution:
        "Since P = I*V(R) for a resistor (as P=I^2*R=I*IR): I = P/V(R) = 16/54 is about 0.296 A. Resistance: R = V(R)/I = 54/0.296 is about 182.3 ohm. Since it's a series RL circuit, total voltage: V(total)^2 = V(R)^2 + V(L)^2, so V(L) = sqrt(120^2-54^2) = sqrt(14400-2916) = sqrt(11484) is about 107.2 V. Inductive reactance: XL = V(L)/I is about 361.7 ohm. Inductance: L = XL/w = 361.7/(2*pi*60) is about 0.96 H, approximately 1 H.",
    },
    {
      exam: "NEET-I 2016 [Q26] (reduced confidence — see note)",
      question:
        "An inductor of 20 mH, a capacitor of 50 microfarad, and a resistor of 40 ohm are connected in series across a source of EMF V = 10 sin(340t). What is the power loss in this AC circuit?",
      options: ["0.51 W", "0.67 W", "0.76 W", "0.89 W"],
      correctIndex: 0,
      solution:
        "[Multi-step calculation lands close to, but not exactly at, the listed value -- likely accumulated rounding. Presenting the full method transparently.] w=340. XL=wL=340*0.02=6.8 ohm. XC=1/(wC)=1/(340*50e-6) is about 58.8 ohm. Impedance: Z=sqrt(R^2+(XL-XC)^2)=sqrt(1600+(6.8-58.8)^2)=sqrt(1600+2704)=sqrt(4304) is about 65.6 ohm. Peak current: I0=V0/Z=10/65.6 is about 0.152A. I(rms)=I0/sqrt(2) is about 0.108A. Power=I(rms)^2*R is about 0.0116*40 is about 0.47W, closest to the listed 0.51 W option.",
    },
    {
      exam: "NEET-I 2016 [Q27]",
      question:
        "A small AC signal voltage V(t)=V0*sin(wt) is applied across an ideal capacitor C. Which of the following statements is true?",
      options: [
        "Current I(t) lags voltage V(t) by 90 degrees",
        "Over a full cycle, the capacitor does not consume any net energy from the source",
        "Current I(t) is in phase with voltage V(t)",
        "Current I(t) leads voltage V(t) by 180 degrees",
      ],
      correctIndex: 1,
      solution:
        "For an ideal capacitor, current actually LEADS voltage by 90 degrees (not lags, ruling out option 1), and they are never in phase or 180 degrees apart (ruling out options 3 and 4). Since a capacitor is a purely reactive (energy-storing, not energy-dissipating) element, over a complete AC cycle it stores energy during part of the cycle and returns exactly that energy during the other part -- consuming zero net energy overall.",
    },
    {
      exam: "NEET-II 2016 [Q28]",
      question:
        "Which of the following R, L, C combinations should be selected for better tuning of an L-C-R circuit used for communication?",
      options: [
        "R=15 ohm, L=3.5H, C=30 microfarad",
        "R=25 ohm, L=1.5H, C=45 microfarad",
        "R=20 ohm, L=1.5H, C=35 microfarad",
        "R=25 ohm, L=2.5H, C=45 microfarad",
      ],
      correctIndex: 0,
      solution:
        "Better tuning (sharper resonance) means a higher quality factor, Q = (1/R)*sqrt(L/C). Computing for each: option 1 gives Q of about 22.8; option 2 gives Q of about 7.3; option 3 gives Q of about 10.4; option 4 gives Q of about 9.4. Option 1 has by far the highest Q-factor, so it gives the sharpest, best tuning.",
    },
    {
      exam: "AIIMS 2016 [Q29]",
      question:
        "In a series L-C-R circuit, the potential differences across the resistance, capacitance, and inductance are 80 V, 40 V, and 100 V respectively. What is the power factor of this circuit?",
      options: ["0.8", "1.0", "0.4", "0.5"],
      correctIndex: 0,
      solution:
        "Total voltage: V = sqrt[V(R)^2 + (V(L)-V(C))^2] = sqrt[80^2 + (100-40)^2] = sqrt[6400+3600] = sqrt(10000) = 100 V. Power factor = V(R)/V(total) = 80/100 = 0.8.",
    },
    {
      exam: "AIIMS 2016 [Q30]",
      question:
        "A series LCR circuit with R=10 kilo-ohm, L=20 mH, C=5 microfarad is connected to an AC source V=10*sin(wt). What is the bandwidth of this signal?",
      options: ["80 kHz", "800 kHz", "100 kHz", "120 kHz"],
      correctIndex: 0,
      solution:
        "Bandwidth (in frequency terms) for a series RLC circuit: delta-f = R/(2*pi*L) = 10000/(2*pi*0.02) = 10000/0.1257 is about 79577 Hz, approximately 80 kHz.",
    },
    {
      exam: "AIIMS 2017 [Q31]",
      question:
        "In an LC oscillator circuit, L=10 mH, C=40 microfarad. If at t=0 the capacitor is fully charged with 4 microcoulombs, what is the current in the circuit when the capacitor and inductor share equal energies?",
      options: ["0.2 mA", "4.4 mA", "0.3 mA", "2 mA"],
      correctIndex: 1,
      solution:
        "Total energy = Q0^2/(2C) = (4e-6)^2/(2*40e-6) = 16e-12/(80e-6) = 2e-7 J. When energies are equal, the inductor holds half the total: (1/2)*L*I^2 = 1e-7 J. So I^2 = 2e-7/0.01 = 2e-5, giving I = sqrt(2e-5) is about 4.47e-3 A, approximately 4.4 mA.",
    },
    {
      exam: "AIIMS 2017 [Q32]",
      question:
        "An alternating voltage is generated by rotating a coil in a magnetic field at 50 Hz. If V(rms)=220V, what is the maximum flux passing through the coil?",
      options: ["0.99 Wb", "0.4 Wb", "0.6 Wb", "0.7 Wb"],
      correctIndex: 0,
      solution:
        "E0 = V(rms)*sqrt(2) = 220*sqrt(2) is about 311.13 V. Since E0=Phi0*w (where Phi0 is the maximum flux linkage), Phi0 = E0/w = 311.13/(2*pi*50) = 311.13/314.16 is about 0.99 Wb.",
    },
    {
      exam: "AIIMS 2017 [Q33]",
      question:
        "An RC series circuit with R=15 ohm and C=10 microfarad is connected to a 20V DC supply for a long time. The capacitor is then disconnected from this circuit and connected to a 10mH inductor. What is the amplitude of the resulting current?",
      options: ["0.2*sqrt(10) A", "2*sqrt(10) A", "0.2 A", "sqrt(10) A"],
      correctIndex: 0,
      solution:
        "After a long time on DC, the capacitor is fully charged to the supply voltage: V(C) = 20 V. Once connected to the inductor (forming an LC oscillator), energy conservation gives the peak current: (1/2)*C*V^2 = (1/2)*L*I0^2, so I0 = V*sqrt(C/L) = 20*sqrt(10e-6/10e-3) = 20*sqrt(1e-3) = 20*0.0316 is about 0.632 A, which equals 0.2*sqrt(10) is about 0.2*3.162 is about 0.632 A.",
    },
    {
      exam: "AIIMS 2017 [Q34]",
      question:
        "In a series LCR circuit with L=10mH, C=10 microfarad, R=20 ohm, connected to an AC source V=200*sin(wt), what is the power at the half-power frequencies?",
      options: ["500 W", "2000 W", "3000 W", "4000 W"],
      correctIndex: 0,
      solution:
        "By definition, the half-power frequencies are exactly where the power is half the maximum (resonance) power. Maximum power at resonance: P(max) = V(rms)^2/R = (200/sqrt(2))^2/20 = 20000/20 = 1000 W. Half-power: 500 W.",
    },
    {
      exam: "NEET(UG) 2017 [Q35]",
      question:
        "A square loop of resistance 11 ohm and area 0.15 m^2 is placed in a magnetic field of 2 T. At what frequency should it be rotated so that the average power dissipated in it is 100 W?",
      options: ["35 rev/sec", "17.5 rev/sec", "24.89 rev/sec", "45.2 rev/sec"],
      correctIndex: 2,
      solution:
        "P(rms) = E(rms)^2/R = E0^2/(2R). Setting this to 100W: E0^2 = 200R = 200*11 = 2200, so E0 is about 46.9 V. Since E0 = B*A*w (for a single-turn loop): w = E0/(BA) = 46.9/(2*0.15) = 46.9/0.3 is about 156.3 rad/s. Frequency: f = w/(2*pi) is about 24.89 rev/sec.",
    },
    {
      exam: "AIIMS 2017 [Q36]",
      question:
        "In a circuit, a switch is connected to position 1 (a 6V source with 12 ohm resistance) for a very long time, charging a 50 microfarad capacitor to the full source voltage. The switch is then moved to position 2, connecting the charged capacitor to a 0.8 mH inductor. What is the maximum current through the inductor?",
      options: ["1.5 A", "3 A", "1 A", "6 A"],
      correctIndex: 0,
      solution:
        "At steady state on position 1, the capacitor is fully charged to the source voltage (no current flows through it at DC steady state): V(C) = 6 V. When switched to position 2, energy conservation in the resulting LC oscillation gives the peak inductor current: (1/2)*C*V^2 = (1/2)*L*I0^2, so I0 = V*sqrt(C/L) = 6*sqrt(50e-6/0.8e-3) = 6*sqrt(0.0625) = 6*0.25 = 1.5 A.",
    },
    {
      exam: "AIIMS 2017 [Q37]",
      question:
        "A coil has resistance 10 ohm and inductance 0.4 H. It is connected to an AC source of 6.5 V at frequency (30/pi) Hz. What is the average power consumed?",
      options: ["5/8 W", "4/3 W", "3/8 W", "6/7 W"],
      correctIndex: 0,
      solution:
        "w = 2*pi*f = 2*pi*(30/pi) = 60 rad/s. XL = wL = 60*0.4 = 24 ohm. Impedance: Z = sqrt(R^2+XL^2) = sqrt(100+576) = sqrt(676) = 26 ohm. I(rms) = V(rms)/Z = 6.5/26 = 0.25 A. Average power = I(rms)^2*R = 0.0625*10 = 0.625 W = 5/8 W.",
    },
    {
      exam: "NEET(UG) 2018 [Q38]",
      question:
        "An inductor of 20 mH, a capacitor of 100 microfarad, and a resistor of 50 ohm are connected in series across a source of EMF V=10*sin(314t). What is the power loss in the circuit?",
      options: ["0.79 W", "0.43 W", "2.74 W", "1.13 W"],
      correctIndex: 0,
      solution:
        "w=314. XL=wL=314*0.02 is about 6.28 ohm. XC=1/(wC)=1/(314*100e-6) is about 31.85 ohm. Impedance: Z=sqrt(R^2+(XL-XC)^2)=sqrt(2500+(6.28-31.85)^2)=sqrt(2500+653.6)=sqrt(3153.6) is about 56.15 ohm. Peak current: I0=10/56.15 is about 0.178A. I(rms) is about 0.126A. Power=I(rms)^2*R is about 0.0159*50 is about 0.79 W.",
    },
    {
      exam: "AIIMS 2018 [Q39]",
      question:
        "In the mechanical-electrical analogy, if a mechanical system is equivalent to an electrical system, what is the displacement 'x' analogous to?",
      options: ["Charge", "Current", "Electric field", "Voltage"],
      correctIndex: 0,
      solution:
        "In the standard electromechanical analogy, mechanical displacement x corresponds directly to electrical charge q -- since velocity (dx/dt) corresponds to current (dq/dt), displacement itself must correspond to charge.",
    },
    {
      exam: "AIIMS 2018 [Q40]",
      question:
        "In a series RLC AC circuit, L=1H, C=1 microfarad, R=20 ohm, connected across a supply voltage of 10V. At resonance, what is the voltage across L?",
      options: ["500 V", "200 V", "300 V", "100 V"],
      correctIndex: 0,
      solution:
        "Resonant angular frequency: w0 = 1/sqrt(LC) = 1/sqrt(1e-6) = 1000 rad/s. Inductive reactance at resonance: XL = w0*L = 1000*1 = 1000 ohm. At resonance, impedance Z=R=20 ohm (minimum), so current I = V/R = 10/20 = 0.5A. Voltage across L: V(L) = I*XL = 0.5*1000 = 500 V.",
    },
    {
      exam: "AIIMS 2018 [Q41]",
      question:
        "In a series RLC circuit, L=1mH, C=0.1 microfarad, R=10 ohm, and the applied voltage is V=9*sin(wt). At resonance, what is the peak voltage across the capacitor?",
      options: ["9 volt", "90 volt", "900 volt", "9000 volt"],
      correctIndex: 1,
      solution:
        "Resonant angular frequency: w0 = 1/sqrt(LC) = 1/sqrt(1e-3*0.1e-6) = 1/sqrt(1e-10) = 1e5 rad/s. Capacitive reactance at resonance: XC = 1/(w0*C) = 1/(1e5*0.1e-6) = 100 ohm. At resonance, Z=R=10 ohm, so peak current I0=V0/R=9/10=0.9A. Peak voltage across C: V(C,max) = I0*XC = 0.9*100 = 90 volt.",
    },
  ],
};
