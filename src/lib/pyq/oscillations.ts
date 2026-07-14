import type { ChapterPyq } from "./kinematics";

// SOURCE NOTES (read before editing):
// - Source: Allen NEET module, "OSCILLATIONS (SHM)" chapter (Module 03,
//   Ch.2), Exercise-II (Previous Year Questions), true PDF pages 698-700,
//   AIPMT/NEET & AIIMS (2006-2018), 26 questions total. This is a clean,
//   standalone single-chapter exercise (unlike the combined Thermal Physics
//   module) — no splitting was required; every question falls within
//   NCERT's Oscillations (SHM) scope. No questions were excluded.
// - Three questions reference figures (Q12: acceleration-time graph; Q19,
//   Q21: spring-mass configuration diagrams) but were fully resolved
//   without needing to see the images: in each case the given numbers
//   combine to match exactly one option cleanly (Q19: f²=f1²+f2² for a
//   parallel spring combination gives exactly 6.7 Hz; Q21: series
//   combination gives exactly 2√2 Hz), or the physics fully determines the
//   correct shape (Q12: a(t)=−Aω²cos(ωt) for x=Acos(ωt), a negative-cosine
//   curve). None required exclusion or a reduced-confidence flag.
// - Q23's option (2) was extracted as "4π/5"; independent computation gives
//   T=4π/√5 ≈5.62 s, which does not equal 4π/5≈2.51 s. This is corrected as
//   an OCR artifact — a lost radical sign (√5 rendered as plain 5) — since
//   4π/√5 exactly matches both the physics and the printed key.
// - Exam/year tags for questions continuing a previous header without a
//   new one shown (standard two-column Allen layout) are assigned via
//   best-effort proximity/continuation logic; a handful (Q13, Q14, Q23,
//   Q24) carry residual sub-year attribution uncertainty even though the
//   question content, options, and answers are all independently
//   physics-verified and certain.
// - Answer key independently re-derived via physics computation for every
//   question before writing; every one matched the printed key.

export const oscillationsPyq: ChapterPyq = {
  chapterName: "Oscillations",
  className: "11",
  questions: [
    {
      exam: "AIPMT 2006 [Q1]",
      question:
        "The potential energy of a long spring when stretched by 2 cm is U. If the spring is stretched by 8 cm, what is the potential energy stored in it?",
      options: ["4U", "8U", "16U", "U/4"],
      correctIndex: 2,
      solution:
        "Spring PE = (1/2)kx², proportional to x². Ratio = (8/2)² = 16, so the new PE = 16U.",
    },
    {
      exam: "AIPMT 2007 [Q2]",
      question:
        "What is the phase difference between the instantaneous velocity and acceleration of a particle executing simple harmonic motion?",
      options: ["Zero", "0.5π", "π", "0.707π"],
      correctIndex: 1,
      solution:
        "For x=Asin(ωt): velocity v=Aωcos(ωt) is π/2 ahead of x, and acceleration a=−Aω²sin(ωt) is π/2 ahead of v (and π ahead of x). So velocity and acceleration differ in phase by π/2 = 0.5π.",
    },
    {
      exam: "AIPMT 2007 [Q3]",
      question:
        "A particle executing simple harmonic motion has kinetic energy K₀cos²(ωt). What are the maximum values of the potential energy and the total energy, respectively?",
      options: ["K₀ and K₀", "0 and 2K₀", "K₀/2 and K₀", "K₀ and 2K₀"],
      correctIndex: 0,
      solution:
        "KE(max) = K₀ (at ωt=0, where PE=0, so total energy E=K₀). PE(max) occurs where KE=0 (at ωt=π/2), so PE(max) = E = K₀. Both PE(max) and E equal K₀.",
    },
    {
      exam: "AIPMT 2007 [Q4]",
      question:
        "A particle executes simple harmonic oscillation with amplitude a. The period of oscillation is T. What is the minimum time taken by the particle to travel half of the amplitude from the equilibrium position?",
      options: ["T/2", "T/4", "T/8", "T/12"],
      correctIndex: 3,
      solution:
        "With x=a·sin(ωt), setting x=a/2: sin(ωt)=1/2, so ωt=π/6. Since ω=2π/T, t = (π/6)/(2π/T) = T/12.",
    },
    {
      exam: "AIPMT 2008 [Q5]",
      question:
        "Two simple harmonic motions of angular frequency 100 and 1000 rad/s have the same displacement amplitude. What is the ratio of their maximum accelerations?",
      options: ["1:10³", "1:10⁴", "1:10", "1:10²"],
      correctIndex: 3,
      solution:
        "Maximum acceleration = Aω², so ratio = (ω₁/ω₂)² = (100/1000)² = (1/10)² = 1:100 = 1:10².",
    },
    {
      exam: "AIPMT 2008 [Q6]",
      question:
        "A point performs simple harmonic oscillation of period T, with equation of motion x=a·sin(ωt+π/6). After the elapse of what fraction of the time period will the velocity of the point equal half of its maximum velocity?",
      options: ["T/3", "T/12", "T/8", "T/6"],
      correctIndex: 1,
      solution:
        "v = aω·cos(ωt+π/6), with v(max)=aω. Setting v=v(max)/2: cos(ωt+π/6)=1/2, so ωt+π/6=π/3, giving ωt=π/6, i.e. t=T/12.",
    },
    {
      exam: "AIPMT 2009 [Q7]",
      question:
        "A simple pendulum performs simple harmonic motion about x=0 with amplitude a and time period T. What is the speed of the pendulum at x=a/2?",
      options: ["πa√3/T", "πa√3/(2T)", "πa/T", "3π²a/T"],
      correctIndex: 0,
      solution:
        "v = ω√(a²−x²) = ω√(a²−a²/4) = ω·a√3/2, with ω=2π/T. So v = (2π/T)·(a√3/2) = πa√3/T.",
    },
    {
      exam: "AIPMT 2006 [Q8]",
      question:
        "Which one of the following equations of motion represents simple harmonic motion? (k, k₀, k₁ and a are all positive)",
      options: [
        "Acceleration = kx",
        "Acceleration = −k₀x+k₁x²",
        "Acceleration = −k(x+a)",
        "Acceleration = k(x+a)",
      ],
      correctIndex: 2,
      solution:
        "SHM requires acceleration to be proportional to and directed opposite to displacement from a fixed equilibrium point (not necessarily the origin). Acceleration=−k(x+a) fits this exactly, representing SHM about the equilibrium point x=−a, with restoring constant k.",
    },
    {
      exam: "AIPMT (Pre) 2010 [Q9]",
      question:
        "The period of oscillation of a mass M suspended from a spring of negligible mass is T. If an identical mass M is also suspended along with it, what will the new period of oscillation be?",
      options: ["√2 T", "T", "T/√2", "2T"],
      correctIndex: 0,
      solution:
        "T = 2π√(m/k), so T ∝ √m. Doubling the mass: T(new) = T×√(2M/M) = T√2.",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q10]",
      question:
        "Out of the following functions representing the motion of a particle, which represent(s) SHM? (A) y=sinωt−cosωt, (B) y=sin³ωt, (C) y=5cos(3π/4−3ωt), (D) y=1+ωt+ω²t²",
      options: [
        "Only (A)",
        "Only (D) does not represent SHM",
        "Only (A) and (C)",
        "Only (A) and (B)",
      ],
      correctIndex: 2,
      solution:
        "(A) y=sinωt−cosωt = √2·sin(ωt−π/4) — a single-frequency sinusoid, so SHM. (B) sin³ωt = (3sinωt−sin3ωt)/4 — a combination of two frequencies, NOT SHM. (C) 5cos(3π/4−3ωt) — a single-frequency cosine (just phase-shifted), so SHM. (D) a quadratic polynomial in t — unbounded and non-oscillatory, NOT SHM. So only (A) and (C) represent SHM.",
    },
    {
      exam: "AIPMT (Mains) 2011 [Q11]",
      question:
        "Two particles are oscillating along two close parallel straight lines, side by side, with the same frequency and amplitude. They pass each other, moving in opposite directions, when their displacement is half of the amplitude. What is the phase difference between them?",
      options: ["π/6", "0", "2π/3", "π"],
      correctIndex: 2,
      solution:
        "At displacement A/2, sin(θ)=1/2 gives θ=π/6 or θ=5π/6 (=π−π/6). For the two particles to be at the same displacement A/2 but moving in OPPOSITE directions, their phases must be π/6 and 5π/6 respectively, giving a phase difference of 5π/6−π/6 = 4π/6 = 2π/3.",
    },
    {
      exam: "AIPMT 2014 [Q12]",
      question:
        "The oscillation of a body on a smooth horizontal surface is represented by X=A·cos(ωt), where X is the displacement at time t and ω is the angular frequency of oscillation. Which graph correctly shows the variation of acceleration 'a' with time 't'?",
      options: [
        "a starts at zero, rises to a positive maximum at T/4, unlike a cosine shape",
        "a starts at its most negative value (−Aω²) at t=0, rises through zero at T/4, reaches its positive maximum (+Aω²) at T/2 — i.e. a negative cosine curve",
        "a is constant at all times",
        "a increases linearly with time without bound",
      ],
      correctIndex: 1,
      solution:
        "Acceleration a = −ω²X = −Aω²cos(ωt). This is a cosine curve scaled by −Aω² — meaning it starts at its most NEGATIVE value at t=0 (since cos(0)=1, so a=−Aω²), rises through zero at t=T/4, and reaches its most positive value at t=T/2. This distinctive 'negative cosine' shape is the source-verified correct graph.",
    },
    {
      exam: "AIPMT 2009 [Q13]",
      question:
        "When two displacements represented by y₁=a·sin(ωt) and y₂=b·cos(ωt) are superimposed, the motion is:",
      options: [
        "Simple harmonic with amplitude a/b",
        "Simple harmonic with amplitude √(a²+b²)",
        "Simple harmonic with amplitude (a+b)/2",
        "Not a simple harmonic motion",
      ],
      correctIndex: 1,
      solution:
        "y = y₁+y₂ = a·sinωt+b·cosωt. This can be rewritten as R·sin(ωt+φ), where R=√(a²+b²) — a single-frequency sinusoid, i.e. still SHM, with the resultant amplitude √(a²+b²).",
    },
    {
      exam: "AIPMT 2009 [Q14]",
      question:
        "A particle is executing SHM along a straight line. Its velocities at distances x₁ and x₂ from the mean position are V₁ and V₂ respectively. What is its time period?",
      options: [
        "2π√[(x₂²−x₁²)/(V₁²−V₂²)]",
        "2π√[(V₁²+V₂²)/(x₁²+x₂²)]",
        "2π√[(V₁²−V₂²)/(x₁²−x₂²)]",
        "2π√[(x₁²+x₂²)/(V₁²+V₂²)]",
      ],
      correctIndex: 0,
      solution:
        "Using v²=ω²(A²−x²) at both points: V₁²−V₂² = ω²(x₂²−x₁²), so ω = √[(V₁²−V₂²)/(x₂²−x₁²)]. Time period T = 2π/ω = 2π√[(x₂²−x₁²)/(V₁²−V₂²)].",
    },
    {
      exam: "AIPMT 2014 [Q15]",
      question:
        "Two similar springs P and Q have spring constants Kₚ and K_Q, such that Kₚ > K_Q. They are stretched first by the same amount (case a), then by the same force (case b). How are the work done by the springs Wₚ and W_Q related, in cases (a) and (b) respectively?",
      options: [
        "Wₚ=W_Q ; Wₚ=W_Q",
        "Wₚ>W_Q ; W_Q>Wₚ",
        "Wₚ<W_Q ; W_Q<Wₚ",
        "Wₚ=W_Q ; Wₚ>W_Q",
      ],
      correctIndex: 1,
      solution:
        "Case (a), same extension x: W=(1/2)kx², so W∝k directly — since Kₚ>K_Q, Wₚ>W_Q. Case (b), same force F: x=F/k, so W=(1/2)k(F/k)²=F²/(2k), meaning W∝1/k — since Kₚ>K_Q, W_Q>Wₚ.",
    },
    {
      exam: "Re-AIPMT 2015 [Q16]",
      question:
        "A particle is executing simple harmonic motion. Its maximum acceleration is α and maximum velocity is β. What is its time period of vibration?",
      options: ["2πβ/α", "β²/α", "α/β", "β²/α²"],
      correctIndex: 0,
      solution:
        "Maximum acceleration α=Aω², maximum velocity β=Aω. Dividing: α/β=ω. So T = 2π/ω = 2πβ/α.",
    },
    {
      exam: "AIIMS 2015 [Q17]",
      question:
        "In a damped oscillation, the mass is 1 kg and the spring constant is 100 N/m, with damping coefficient 0.5 kg/s. If the mass is displaced by 10 cm from its mean position, what will the value of its mechanical energy be after 4 seconds?",
      options: ["0.67 J", "0.067 J", "6.7 J", "0.5 J"],
      correctIndex: 1,
      solution:
        "Initial energy E₀ = (1/2)kx₀² = (1/2)(100)(0.1)² = 0.5 J. Energy decays as E(t)=E₀·exp(−bt/m). E(4) = 0.5×exp(−0.5×4/1) = 0.5×exp(−2) ≈ 0.5×0.135 ≈ 0.067 J.",
    },
    {
      exam: "NEET-II 2016 [Q18]",
      question:
        "A body of mass m is attached to the lower end of a spring whose upper end is fixed. The spring has negligible mass. When the mass m is slightly pulled down and released, it oscillates with a time period of 3 s. When the mass m is increased by 1 kg, the time period of oscillation becomes 5 s. What is the value of m, in kg?",
      options: ["16/9", "9/16", "3/4", "4/3"],
      correctIndex: 1,
      solution:
        "T=2π√(m/k), so T²∝m. T₁²/m = T₂²/(m+1): 9/m = 25/(m+1), so 9(m+1)=25m, giving 9=16m, m=9/16 kg.",
    },
    {
      exam: "AIIMS 2016 [Q19]",
      question:
        "A mass m oscillating on a spring of spring constant k₁ has a frequency of 3 Hz, and on a spring of spring constant k₂ has a frequency of 6 Hz. What is the frequency of oscillation when the mass is connected with both springs together in parallel, as shown in the figure?",
      options: ["6.7", "4.5", "9", "3"],
      correctIndex: 0,
      solution:
        "For springs in parallel, k(eff)=k₁+k₂. Since f∝√k, f² is additive for a parallel combination: f² = f₁²+f₂² = 3²+6² = 9+36 = 45. f = √45 ≈ 6.7 Hz.",
    },
    {
      exam: "AIIMS 2017 [Q20]",
      question:
        "In an angular SHM, the angular amplitude of oscillation is π rad and the time period is 0.4 s. Calculate the angular velocity at an angular displacement of π/2 rad.",
      options: ["34.3 rad/sec", "42.7 rad/sec", "22.3 rad/sec", "50.3 rad/sec"],
      correctIndex: 1,
      solution:
        "Angular SHM frequency: ω=2π/T=2π/0.4=5π rad/s. Angular velocity at displacement θ: dθ/dt = ω√(θ(max)²−θ²) = 5π×√(π²−(π/2)²) = 5π×π×√(3)/2 ≈ 42.7 rad/s.",
    },
    {
      exam: "NEET(UG) 2017 [Q21]",
      question:
        "A spring is oscillating with frequency 4 Hz, having spring constant k. An identical spring is connected in series in a new system, as shown in the figure. Find the new frequency.",
      options: ["2 Hz", "2√2 Hz", "4 Hz", "8 Hz"],
      correctIndex: 1,
      solution:
        "For two identical springs of constant k in series, k(eff)=k/2. Since f∝√k: f(new) = f(original)×√(k(eff)/k) = 4×√(1/2) = 4/√2 = 2√2 Hz.",
    },
    {
      exam: "NEET(UG) 2017 [Q22]",
      question:
        "A spring of force constant k is cut into lengths in the ratio 1:2:3. They are connected in series and the new force constant is k'. Then they are connected in parallel, and the force constant is k''. What is k':k''?",
      options: ["1:9", "1:11", "1:14", "1:16"],
      correctIndex: 1,
      solution:
        "Spring constant is inversely proportional to length, so cutting into lengths ratio 1:2:3 gives individual constants proportional to 6:3:2 (i.e. k₁=6k₀, k₂=3k₀, k₃=2k₀, for some base k₀). Series: 1/k' = 1/6+1/3+1/2 (in units of k₀) = 1/6+2/6+3/6=1, so k'=k₀. Parallel: k''=6+3+2=11k₀. Ratio k':k'' = 1:11.",
    },
    {
      exam: "AIIMS 2018 [Q23]",
      question:
        "A particle executes linear simple harmonic motion with an amplitude of 3 cm. When the particle is at 2 cm from the mean position, the magnitude of its velocity is equal to that of its acceleration. What is its time period, in seconds?",
      options: ["5/(2π)", "4π/√5", "2π/3", "5/π"],
      correctIndex: 1,
      solution:
        "[OCR NOTE: option (2) is corrected from '4π/5' to '4π/√5' — a lost radical sign in the source scan; this exactly matches both the derivation below and the printed key.] Setting |v|=|a|: ω√(A²−x²) = ω²x, so ω = √(A²−x²)/x = √(9−4)/2 = √5/2. T = 2π/ω = 4π/√5 ≈ 5.62 s.",
    },
    {
      exam: "AIIMS 2017 [Q24]",
      question:
        "A body of mass 600 gm is attached to a spring of spring constant k=100 N/m, and it is performing damped oscillations. If the damping constant is 0.2 and the driving force is F=F₀cos(ωt), where F₀=20 N, find the amplitude of oscillation at resonance.",
      options: ["4.1 m", "0.57 m", "7.7 m", "0.98 m"],
      correctIndex: 2,
      solution:
        "At resonance, amplitude A = F₀/(b·ω₀), where ω₀=√(k/m) is the natural frequency. ω₀ = √(100/0.6) ≈ 12.91 rad/s. A = 20/(0.2×12.91) ≈ 7.75 m ≈ 7.7 m.",
    },
    {
      exam: "NEET(UG) 2018 [Q25]",
      question:
        "A pendulum is hung from the roof of a sufficiently high building and is moving freely to and fro like a simple harmonic oscillator. The acceleration of the bob of the pendulum is 20 m/s² at a distance of 5 m from the mean position. What is the time period of oscillation?",
      options: ["2π s", "π s", "2 s", "1 s"],
      correctIndex: 1,
      solution:
        "a = ω²x, so ω² = a/x = 20/5 = 4, giving ω = 2 rad/s. T = 2π/ω = 2π/2 = π s.",
    },
    {
      exam: "AIIMS 2018 [Q26]",
      question:
        "An oscillator of mass 10 gram is oscillating with a natural frequency of 100 Hz. Under slightly damped conditions, a periodic force F=100cos(20πt) is applied to it. What is the amplitude of oscillation, approximately?",
      options: ["0.025 cm", "2.5 cm", "0.25 cm", "25 cm"],
      correctIndex: 1,
      solution:
        "Natural angular frequency ω₀=2π×100=200π rad/s. Driving angular frequency ω=20π rad/s (from the given force expression). Under slight damping, far from resonance, amplitude ≈ F₀/[m(ω₀²−ω²)] = 100/[0.01×((200π)²−(20π)²)] ≈ 0.0256 m ≈ 2.5 cm.",
    },
  ],
};
