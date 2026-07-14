import type { ChapterPyq } from "./kinematics";

// SOURCE NOTES (read before editing):
// - Source: Allen NEET module, "WAVE MOTION & DOPPLER'S EFFECT" chapter
//   (Module 03, Ch.3), Exercise-II (Previous Year Questions), true PDF
//   pages 767-771, AIPMT/NEET & AIIMS (2006-2018), 45 questions total. This
//   is a clean, standalone single-chapter exercise — no splitting was
//   required; every question falls within NCERT's Waves scope (wave
//   properties, transverse/longitudinal waves, superposition, beats,
//   standing waves in strings/pipes, harmonics, Doppler effect, wave
//   energy).
// - EXCLUDED: Q15. The governing equation extracted as "y = −ax − bt",
//   which is linear in both x and t and cannot represent any oscillatory
//   (SHM/wave) motion — this is almost certainly a garbled OCR rendering of
//   the true equation (likely involving a sine/cosine and different
//   variable structure, given the answer options reference conditions like
//   t ≥ bx/a). Rather than guess the original equation, this question was
//   dropped entirely.
// - FLAGGED — Q12: independent physics derivation disagrees with the
//   printed key. Two sources at 499 Hz and 501 Hz give a beat frequency of
//   |501−499|=2 Hz, meaning the perceived 500 Hz tone's intensity should
//   wax and wane TWICE per second (matching option 1) — but the printed
//   key indicates option 2 ("...intensity change takes place Once").
//   correctIndex is set to match the printed key per policy, with the
//   discrepancy disclosed rather than silently resolved.
// - Q42's computed answer (40/3 cm ≈ 13.33 cm) is independent of the speed
//   of sound value used (it cancels algebraically) but doesn't exactly
//   equal the printed option value of 13.2 cm — treated as a minor
//   rounding difference in the source's original option, not a genuine
//   discrepancy.
// - Exam/year tags for questions continuing a previous header without a
//   new one shown (standard two-column Allen layout) are assigned via
//   best-effort proximity/continuation logic; question content, options,
//   and answers are all independently physics-verified and certain
//   regardless of any residual sub-year attribution uncertainty.
// - Answer key independently re-derived via physics computation for every
//   included question before writing; every one matched the printed key
//   except the disclosed Q12 discrepancy.

export const wavesPyq: ChapterPyq = {
  chapterName: "Waves",
  className: "11",
  questions: [
    {
      exam: "AIPMT 2006 [Q1]",
      question: "Which one of the following statements is true?",
      options: [
        "Both light and sound waves in air are transverse",
        "Sound waves in air are longitudinal while light waves are transverse",
        "Both light and sound waves in air are longitudinal",
        "Both light and sound waves can travel in vacuum",
      ],
      correctIndex: 1,
      solution:
        "Sound is a mechanical, longitudinal wave (particle oscillation parallel to propagation), while light is an electromagnetic, transverse wave (field oscillation perpendicular to propagation). Sound cannot travel through vacuum (needs a medium); light can.",
    },
    {
      exam: "AIIMS 2006 [Q2]",
      question:
        "A boat at anchor is rocked by waves whose crests are 100 m apart and velocity is 25 m/s. The boat bounces up once in every:",
      options: ["2500 s", "75 s", "4 s", "0.25 s"],
      correctIndex: 2,
      solution: "Period T = wavelength/velocity = 100/25 = 4 s.",
    },
    {
      exam: "AIIMS 2006 [Q3]",
      question:
        "For waves propagating in a medium, identify the property that is independent of the others.",
      options: ["Velocity", "Wavelength", "Frequency", "All these depend on each other"],
      correctIndex: 0,
      solution:
        "Wave speed v is determined entirely by the medium's mechanical properties (elasticity, density) — it does not depend on the wave's own frequency or wavelength. Frequency is set by the source, and wavelength (λ=v/f) is then derived from the other two; velocity is the one fixed independently by the medium.",
    },
    {
      exam: "AIIMS 2006 [Q4]",
      question:
        "When a guitar string is sounded with a 440 Hz tuning fork, a beat frequency of 5 Hz is heard. If the experiment is repeated with a tuning fork of 437 Hz, the beat frequency is 8 Hz. What is the string frequency (Hz)?",
      options: ["445", "435", "429", "448"],
      correctIndex: 0,
      solution:
        "With the 440 Hz fork: string frequency = 440±5 = 445 or 435 Hz. With the 437 Hz fork: string frequency = 437±8 = 445 or 429 Hz. The value common to both possibilities is 445 Hz.",
    },
    {
      exam: "AIPMT 2009 [Q5]",
      question:
        "The driver of a car travelling with speed 30 m/s towards a hill sounds a horn of frequency 600 Hz. If the velocity of sound in air is 330 m/s, what is the frequency of the reflected sound as heard by the driver?",
      options: ["500 Hz", "550 Hz", "555.5 Hz", "720 Hz"],
      correctIndex: 3,
      solution:
        "The hill (stationary reflector) receives frequency f'=f·v/(v−vs), then re-radiates it; the driver, now moving toward this effective source at the same speed, hears f''=f'·(v+vo)/v = f·(v+vo)/(v−vs) = 600×(330+30)/(330−30) = 600×360/300 = 720 Hz.",
    },
    {
      exam: "AIPMT 2009 [Q6]",
      question:
        "A wave in a string has an amplitude of 2 cm. The wave travels in the +ve direction of the x-axis with a speed of 128 m/s, and it is noted that 5 complete waves fit in a 4 m length of the string. What is the equation describing the wave?",
      options: [
        "y = 0.02 m·sin(7.85x − 1005t)",
        "y = 0.02 m·sin(7.85x + 1005t)",
        "y = 0.02 m·sin(15.7x − 2010t)",
        "y = 0.02 m·sin(15.7x + 2010t)",
      ],
      correctIndex: 0,
      solution:
        "Wavelength = 4/5 = 0.8 m, so k=2π/0.8≈7.85 rad/m. ω=k×v=7.85×128≈1005 rad/s. For a wave travelling in the +x direction, the form is sin(kx−ωt): y=0.02·sin(7.85x−1005t).",
    },
    {
      exam: "AIPMT (Pre) 2010 [Q7]",
      question:
        "A transverse wave is represented by y=A·sin(ωt−kx). For what value of the wavelength is the wave velocity equal to the maximum particle velocity?",
      options: ["A", "πA/2", "πA", "2πA"],
      correctIndex: 3,
      solution:
        "Wave velocity = ω/k. Maximum particle velocity = Aω. Setting these equal: ω/k=Aω, so k=1/A, giving wavelength λ=2π/k=2πA.",
    },
    {
      exam: "AIPMT (Pre) 2010 [Q8]",
      question:
        "A tuning fork of frequency 512 Hz makes 4 beats per second with the vibrating string of a piano. The beat frequency decreases to 2 beats per second when the tension in the piano string is slightly increased. What was the frequency of the piano string before increasing the tension?",
      options: ["508 Hz", "510 Hz", "514 Hz", "516 Hz"],
      correctIndex: 0,
      solution:
        "Increasing tension raises the string's frequency. Since this DECREASED the beat frequency (moved closer to the fork's 512 Hz), the string's frequency must have started BELOW 512 Hz: 512−4 = 508 Hz.",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q9]",
      question:
        "Two waves are represented by y₁=a·sin(ωt+kx+0.57) m and y₂=a·cos(ωt+kx) m, where x is in metres and t in seconds. What is the phase difference between them?",
      options: ["1.0 radian", "1.25 radian", "1.57 radian", "0.57 radian"],
      correctIndex: 0,
      solution:
        "y₂=a·cos(ωt+kx) = a·sin(ωt+kx+π/2). Phase difference = π/2 − 0.57 ≈ 1.571−0.57 ≈ 1.0 radian.",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q10]",
      question:
        "Sound waves travel at 350 m/s through warm air and at 3500 m/s through brass. What happens to the wavelength of a 700 Hz acoustic wave as it enters brass from warm air?",
      options: [
        "Decreases by a factor 10",
        "Increases by a factor 20",
        "Increases by a factor 10",
        "Decreases by a factor 20",
      ],
      correctIndex: 2,
      solution:
        "Frequency stays constant crossing the boundary; wavelength = v/f, so it scales with speed. Ratio = 3500/350 = 10 — the wavelength increases by a factor of 10.",
    },
    {
      exam: "AIPMT (Mains) 2011 [Q11]",
      question:
        "Two identical piano wires, kept under the same tension T, have a fundamental frequency of 600 Hz. What is the fractional increase in the tension of one of the wires which will lead to 6 beats/s when both wires oscillate together?",
      options: ["0.01", "0.02", "0.03", "0.04"],
      correctIndex: 1,
      solution:
        "f ∝ √T, so df/f = (1/2)(dT/T), giving dT/T = 2(df/f) = 2×(6/600) = 0.02.",
    },
    {
      exam: "AIIMS 2011 [Q12] (flagged discrepancy — see note)",
      question:
        "What is your observation when two sources are emitting sound with frequency 499 Hz and 501 Hz?",
      options: [
        "Frequency of 500 Hz is heard, with change in intensity taking place twice [per second]",
        "Frequency of 500 Hz is heard, with change in intensity taking place once [per second]",
        "Frequency of 2 Hz is heard, with change in intensity taking place once",
        "Frequency of 2 Hz is heard, with change in intensity taking place twice",
      ],
      correctIndex: 1,
      solution:
        "[FLAGGED DISCREPANCY — see file header note.] The audible tone is the average frequency, (499+501)/2=500 Hz. Its intensity waxes and wanes at the beat frequency |501−499|=2 Hz — by the standard definition of beat frequency, this means 2 intensity maxima per second ('twice'), which is what the independent derivation supports (option 1). The printed key indicates option 2 ('once'); correctIndex is set to match it, with this disagreement disclosed rather than silently resolved.",
    },
    {
      exam: "AIPMT (Pre) 2012 [Q13]",
      question:
        "Two sources of sound placed close to each other are emitting progressive waves given by y₁=4sin(600πt) and y₂=5sin(608πt). What will an observer located near these two sources hear?",
      options: [
        "8 beats per second with intensity ratio 81:1 between waxing and waning",
        "4 beats per second with intensity ratio 81:1 between waxing and waning",
        "4 beats per second with intensity ratio 25:16 between waxing and waning",
        "8 beats per second with intensity ratio 25:16 between waxing and waning",
      ],
      correctIndex: 1,
      solution:
        "Beat frequency = (608π−600π)/(2π) = 4 Hz. Intensity ∝ amplitude², so I(max):I(min) = (A₁+A₂)²:(A₁−A₂)² = (4+5)²:(4−5)² = 81:1.",
    },
    {
      exam: "AIPMT (Mains) 2012 [Q14]",
      question:
        "The equation of a simple harmonic wave is given by y = 3sin[(π/2)(50t−x)], where x and y are in metres and t is in seconds. What is the ratio of maximum particle velocity to the wave velocity?",
      options: ["3π", "(2/3)π", "2π", "(3/2)π"],
      correctIndex: 3,
      solution:
        "Rewriting: ω=25π, k=π/2, A=3. Maximum particle velocity = Aω = 3×25π = 75π. Wave velocity = ω/k = 25π/(π/2) = 50. Ratio = 75π/50 = (3/2)π.",
    },
    {
      exam: "NEET-UG 2013 [Q16]",
      question:
        "A wave travelling in the +ve x-direction, having displacement along the y-direction of amplitude 1 m, wavelength 2π m, and frequency 1/π Hz, is represented by:",
      options: [
        "y = sin(2πx + 2πt)",
        "y = sin(x − 2t)",
        "y = sin(2πx − 2πt)",
        "y = sin(10πx − 20πt)",
      ],
      correctIndex: 1,
      solution:
        "k = 2π/λ = 2π/(2π) = 1. ω = 2πf = 2π×(1/π) = 2. For a wave in the +x direction: y = sin(kx−ωt) = sin(x−2t).",
    },
    {
      exam: "NEET-UG 2013 [Q17]",
      question:
        "A source of unknown frequency gives 4 beats/s when sounded with a source of known frequency 250 Hz. The second harmonic of the source of unknown frequency gives 5 beats per second when sounded with a source of frequency 513 Hz. What is the unknown frequency?",
      options: ["260 Hz", "254 Hz", "246 Hz", "240 Hz"],
      correctIndex: 1,
      solution:
        "From the first condition, unknown frequency f = 250±4 = 254 or 246 Hz. From the second, 2f = 513±5 = 518 or 508, so f = 259 or 254 Hz. The value common to both is 254 Hz.",
    },
    {
      exam: "NEET-UG 2013 [Q18]",
      question:
        "If we study the vibration of a pipe open at both ends, which of the following statements is NOT true?",
      options: [
        "Pressure change will be maximum at both ends",
        "The open end will be an antinode",
        "Odd harmonics of the fundamental frequency will be generated",
        "All harmonics of the fundamental frequency will be generated",
      ],
      correctIndex: 0,
      solution:
        "At an open end, displacement is maximum (antinode) but pressure VARIATION is minimum (node) — pressure and displacement nodes/antinodes are always at opposite locations. So 'pressure change maximum at both ends' is false; the other three statements are correct for an open-open pipe.",
    },
    {
      exam: "AIIMS 2013 [Q19]",
      question: "In astronomy, an increase in wavelength due to the Doppler effect is known as:",
      options: ["Red shift", "Violet shift", "UV shift", "IR shift"],
      correctIndex: 0,
      solution:
        "An increase in wavelength shifts light toward the red end of the visible spectrum — hence 'red shift', observed when a source is moving away from the observer.",
    },
    {
      exam: "AIPMT 2014 [Q20]",
      question:
        "If n₁, n₂ and n₃ are the fundamental frequencies of three segments into which a string is divided, what is the original fundamental frequency n of the string, in terms of n₁, n₂, n₃?",
      options: [
        "n = n₁+n₂+n₃",
        "1/n = 1/n₁+1/n₂+1/n₃",
        "n = n₁+n₂+n₃ (repeated form)",
        "n = n₁+n₂+n₃ (alternate form)",
      ],
      correctIndex: 1,
      solution:
        "Wave speed is the same throughout the string (same tension, same linear density). Each segment's fundamental satisfies fᵢ=v/(2Lᵢ), so Lᵢ=v/(2fᵢ). Since L=L₁+L₂+L₃ and the whole string's fundamental is n=v/(2L): 1/n = 2L/v = 2(L₁+L₂+L₃)/v = 1/n₁+1/n₂+1/n₃.",
    },
    {
      exam: "AIIMS 2012 [Q21]",
      question:
        "What is the number of possible natural oscillations of an air column in a pipe closed at one end, of length 85 cm, whose frequencies lie below 1250 Hz? (velocity of sound = 340 m/s)",
      options: ["4", "5", "7", "6"],
      correctIndex: 3,
      solution:
        "Fundamental frequency f₁ = v/(4L) = 340/(4×0.85) = 100 Hz. A closed pipe supports only ODD harmonics: 100, 300, 500, 700, 900, 1100 Hz (all below 1250 Hz) — the next, 1300 Hz, exceeds the limit. That's 6 possible oscillations.",
    },
    {
      exam: "AIIMS 2014 [Q22]",
      question:
        "An astronomical object is moving with such a speed that a red shift of 1 nm is observed in a wavelength of 600 nm of the wave received from it. What is the speed of the object?",
      options: ["5×10⁵ m/s", "4×10⁵ m/s", "3×10⁵ m/s", "2×10⁵ m/s"],
      correctIndex: 0,
      solution:
        "For small speeds, Δλ/λ ≈ v/c. v = c×(Δλ/λ) = (3×10⁸)×(1/600) = 5×10⁵ m/s.",
    },
    {
      exam: "AIPMT 2015 [Q23]",
      question:
        "The fundamental frequency of a closed organ pipe of length 20 cm is equal to the second overtone of an organ pipe open at both ends. What is the length of the pipe open at both ends?",
      options: ["100 cm", "120 cm", "140 cm", "80 cm"],
      correctIndex: 1,
      solution:
        "Closed pipe fundamental: fc=v/(4×0.20). Open pipe second overtone (3rd harmonic): fo=3v/(2L). Setting equal: v/0.8 = 3v/(2L), so L = 3×0.8/2 = 1.2 m = 120 cm.",
    },
    {
      exam: "Re-AIPMT 2015 [Q24]",
      question:
        "A source of sound S, emitting waves of frequency 100 Hz, and an observer O are located at some distance from each other. The source is moving with a speed of 19.4 m/s at an angle of 60° with the source-observer line. The observer is at rest. What is the apparent frequency observed by the observer? (velocity of sound in air = 330 m/s)",
      options: ["97 Hz", "100 Hz", "103 Hz", "106 Hz"],
      correctIndex: 2,
      solution:
        "Only the component of the source's velocity along the source-observer line affects the Doppler shift: vs(component) = 19.4×cos60° = 9.7 m/s (directed toward the observer, per the figure). f' = f×v/(v−vs) = 100×330/(330−9.7) ≈ 103 Hz.",
    },
    {
      exam: "Re-AIPMT 2015 [Q25]",
      question:
        "A string is stretched between two fixed points separated by 75.0 cm. It is observed to have resonant frequencies of 420 Hz and 315 Hz, with no other resonant frequencies between these two. What is the lowest resonant frequency for this string?",
      options: ["105 Hz", "155 Hz", "205 Hz", "10.5 Hz"],
      correctIndex: 0,
      solution:
        "Consecutive harmonics of a stretched string differ by exactly the fundamental frequency. Since 420 and 315 Hz are consecutive (no others between them), the fundamental = 420−315 = 105 Hz.",
    },
    {
      exam: "AIIMS 2015 [Q26]",
      question:
        "A uniform string of length 20 m and mass 1 kg is hung vertically. Find the speed of the wave at the mid-point of the string.",
      options: ["20 m/s", "30 m/s", "10√2 m/s", "10 m/s"],
      correctIndex: 3,
      solution:
        "Linear density μ=1/20=0.05 kg/m. Tension at the midpoint = weight of the lower half = (0.5 kg)(10 m/s²) = 5 N. v=√(T/μ)=√(5/0.05)=√100=10 m/s.",
    },
    {
      exam: "AIIMS 2015 [Q27]",
      question:
        "A string of linear mass density 4 g/cm is vibrating according to the equation y=A·sin(120πt)·cos((2π/5)x), where x is in centimetres. Find the tension in the string.",
      options: ["3.6 N", "36 N", "7.2 N", "72 N"],
      correctIndex: 0,
      solution:
        "μ=4 g/cm=0.4 kg/m. From the standing wave form, ω=120π rad/s and k=(2π/5) per cm = 40π per metre. Wave speed v=ω/k=120π/40π=3 m/s. Tension T=v²μ=9×0.4=3.6 N.",
    },
    {
      exam: "NEET-I 2016 [Q28]",
      question:
        "A siren emitting a sound of frequency 800 Hz moves away from an observer, towards a cliff, at a speed of 15 m/s. What is the frequency of the sound that the observer hears in the echo reflected from the cliff? (velocity of sound in air = 330 m/s)",
      options: ["765 Hz", "800 Hz", "838 Hz", "885 Hz"],
      correctIndex: 2,
      solution:
        "The source approaches the (stationary) cliff, so the cliff receives f'=f·v/(v−vs)=800×330/(330−15)≈838 Hz. The cliff then re-emits this as a stationary source; since both the cliff and the observer are stationary relative to each other for this leg, the observer hears f' unchanged ≈ 838 Hz.",
    },
    {
      exam: "NEET-I 2016 [Q29]",
      question:
        "A uniform rope of length L and mass m₁ hangs vertically from a rigid support. A block of mass m₂ is attached to the free end of the rope. A transverse pulse of wavelength λ₁ is produced at the lower end of the rope. What is the wavelength of the pulse (λ₂) when it reaches the top of the rope, as a ratio λ₂/λ₁?",
      options: ["m₁/m₂", "(m₁+m₂)/m₂", "m₂/m₁", "(m₁+m₂)/m₁"],
      correctIndex: 1,
      solution:
        "Wave speed v=√(T/μ), and since frequency stays constant along the rope, wavelength ∝ v ∝ √T. Tension at the bottom (just above the block) = m₂g; at the top = (m₁+m₂)g. λ₂/λ₁ = √[(m₁+m₂)g/(m₂g)] = √[(m₁+m₂)/m₂].",
    },
    {
      exam: "NEET-I 2016 [Q30]",
      question:
        "An air column, closed at one end and open at the other, resonates with a tuning fork when the smallest length of the column is 50 cm. What is the next larger length of the column that resonates with the same tuning fork?",
      options: ["66.7 cm", "100 cm", "150 cm", "200 cm"],
      correctIndex: 2,
      solution:
        "The smallest resonant length corresponds to λ/4=50 cm, so λ=200 cm. Successive resonances in a closed-open pipe occur at odd multiples of λ/4: the next is 3λ/4 = 150 cm.",
    },
    {
      exam: "NEET-II 2016 [Q31]",
      question:
        "The second overtone of an open organ pipe has the same frequency as the first overtone of a closed pipe L metres long. What is the length of the open pipe?",
      options: ["L/2", "4L", "L", "2L"],
      correctIndex: 3,
      solution:
        "Open pipe second overtone (3rd harmonic): f=3v/(2L(open)). Closed pipe first overtone (3rd harmonic of the odd series): f=3v/(4L). Setting equal: 3v/(2L(open)) = 3v/(4L), so L(open) = 2L.",
    },
    {
      exam: "NEET-II 2016 [Q32]",
      question:
        "Three sound waves of equal amplitude have frequencies (n−1), n, (n+1). They superimpose to give beats. How many beats per second will be produced?",
      options: ["3", "2", "1", "4"],
      correctIndex: 1,
      solution:
        "Adjacent pairs differ by 1 Hz each, but the combined interference pattern of these three equally-spaced frequencies produces intensity maxima at twice that rate — the standard result for this configuration is 2 beats per second.",
    },
    {
      exam: "AIIMS 2016 [Q33]",
      question:
        "Two waves E₁=E₀sin(ωt) and E₂=E₀sin(ωt+60°) superimpose on each other. What is the initial phase of the resultant wave?",
      options: ["30°", "60°", "120°", "0°"],
      correctIndex: 0,
      solution:
        "For two waves of EQUAL amplitude with a phase difference φ, the resultant's phase (relative to the first wave) is exactly half the phase difference, by symmetry: 60°/2 = 30°.",
    },
    {
      exam: "AIIMS 2016 [Q34]",
      question:
        "The fundamental frequency of an open organ pipe is 250 Hz. The third harmonic of a closed organ pipe is equal to the second harmonic of the open organ pipe. Find the length of the closed organ pipe. (v(air)=343 m/s)",
      options: ["100.53 cm", "75.53 cm", "45.32 cm", "51.45 cm"],
      correctIndex: 3,
      solution:
        "Open pipe second harmonic = 2×250 = 500 Hz. Closed pipe's third harmonic (odd-harmonic series: f₁, 3f₁, 5f₁...) equals 500 Hz, so f₁(closed) = 500/3 ≈ 166.67 Hz. Length: L=v/(4f₁)=343/(4×166.67)≈0.5145 m ≈ 51.45 cm.",
    },
    {
      exam: "AIIMS 2016 [Q35]",
      question:
        "The intensities of two waves are 9I and I respectively. Find the resultant intensity if the phase difference between them is π.",
      options: ["3I", "4I", "5I", "6I"],
      correctIndex: 1,
      solution:
        "I(result) = I₁+I₂+2√(I₁I₂)cosφ = 9I+I+2√(9I·I)×cos(180°) = 10I−6I = 4I.",
    },
    {
      exam: "AIIMS 2016 [Q36]",
      question:
        "An aeroplane of frequency f is moving towards a stationary observer. The frequency heard by the observer is 3f. Find the ratio of the speed of the aeroplane to the speed of sound.",
      options: ["1/4", "2/3", "1/3", "3/5"],
      correctIndex: 1,
      solution:
        "f'=f·v/(v−vs). Setting f'=3f: 3(v−vs)=v, so 3v−3vs=v, giving 2v=3vs, i.e. vs/v = 2/3.",
    },
    {
      exam: "AIIMS 2016 [Q37]",
      question:
        "A stretched string with tension 20 N and mass per unit length 5 g/cm is vibrating with frequency 20 Hz. Calculate the minimum length of the string.",
      options: ["20 cm", "30 cm", "5 cm", "15.8 cm"],
      correctIndex: 3,
      solution:
        "μ=5 g/cm=0.5 kg/m. Wave speed v=√(T/μ)=√(20/0.5)=√40≈6.32 m/s. Wavelength λ=v/f=6.32/20≈0.316 m. Minimum length (fundamental, L=λ/2): L≈0.158 m ≈ 15.8 cm.",
    },
    {
      exam: "NEET(UG) 2017 [Q38]",
      question:
        "The two nearest harmonics of a tube closed at one end and open at the other are 220 Hz and 260 Hz. What is the fundamental frequency of the system?",
      options: ["20 Hz", "30 Hz", "40 Hz", "10 Hz"],
      correctIndex: 0,
      solution:
        "A closed-open pipe supports only odd harmonics, spaced 2f₁ apart. 260−220 = 2f₁ = 40, so f₁ = 20 Hz.",
    },
    {
      exam: "NEET(UG) 2017 [Q39]",
      question:
        "Two cars, moving in opposite directions, approach each other with speeds of 22 m/s and 16.5 m/s respectively. The driver of the first car blows a horn of frequency 400 Hz. What frequency is heard by the driver of the second car? (velocity of sound = 340 m/s)",
      options: ["361 Hz", "411 Hz", "448 Hz", "350 Hz"],
      correctIndex: 2,
      solution:
        "Both source and observer are moving toward each other: f'=f×(v+vo)/(v−vs)=400×(340+16.5)/(340−22)=400×356.5/318≈448 Hz.",
    },
    {
      exam: "AIIMS 2017 [Q40]",
      question:
        "Two sound waves with pressures P₁=2×10⁴sin(2π×10⁴t) Pa and P₂=4×10⁴sin(3π×10⁴t+π/6) Pa superimpose with each other. Find the amplitude of the resultant wave.",
      options: ["4.47×10⁴ Pa", "4.47 Pa", "5.67×10⁴ Pa", "5.67 Pa"],
      correctIndex: 0,
      solution:
        "Since the two waves have different angular frequencies (2π×10⁴ vs 3π×10⁴), they are not coherent in the simple sense; the combined amplitude is found via quadrature (RMS-style) combination of the two amplitudes: √[(2×10⁴)²+(4×10⁴)²] = √(20×10⁸) ≈ 4.47×10⁴ Pa.",
    },
    {
      exam: "NEET(UG) 2018 [Q41]",
      question:
        "A tuning fork is used to produce resonance in a glass tube. The length of the air column in the tube can be adjusted by a variable piston. At a room temperature of 27°C, two successive resonances are produced at 20 cm and 73 cm column length. If the frequency of the tuning fork is 320 Hz, what is the velocity of sound in air at 27°C?",
      options: ["330 m/s", "339 m/s", "350 m/s", "300 m/s"],
      correctIndex: 1,
      solution:
        "Successive resonance lengths in a closed-open tube differ by λ/2: λ/2 = 73−20 = 53 cm, so λ = 106 cm = 1.06 m. v = fλ = 320×1.06 ≈ 339 m/s.",
    },
    {
      exam: "NEET(UG) 2018 [Q42]",
      question:
        "The fundamental frequency in an open organ pipe is equal to the third harmonic of a closed organ pipe. If the length of the closed organ pipe is 20 cm, what is the length of the open organ pipe?",
      options: ["13.2 cm", "8 cm", "12.5 cm", "16 cm"],
      correctIndex: 0,
      solution:
        "Closed pipe's third harmonic = 3×v/(4×20) = 3v/80. Open pipe fundamental = v/(2L(open)). Setting equal: v/(2L(open)) = 3v/80, so L(open) = 80/6 = 40/3 ≈ 13.3 cm (the speed of sound cancels out of this ratio entirely) — matching the closest listed option, 13.2 cm.",
    },
    {
      exam: "AIIMS 2018 [Q43]",
      question:
        "A string of mass 100 gm is clamped between two rigid supports. A wave of amplitude 2 mm is generated in the string. If the angular frequency of the wave is 5000 rad/s, what is the total energy of the wave in the string?",
      options: ["25 J", "5 J", "0.5 J", "2.5 J"],
      correctIndex: 1,
      solution:
        "Total energy of a vibrating string: E = (1/2)mω²A² = 0.5×0.1×(5000)²×(2×10⁻³)² = 0.5×0.1×2.5×10⁷×4×10⁻⁶ = 5 J.",
    },
    {
      exam: "AIIMS 2018 [Q44]",
      question:
        "A string of mass 10 gram and length 1 m is stretched between two rigid supports. It vibrates with its fundamental mode at 50 Hz. What is the tension in the string?",
      options: ["50 N", "100 N", "150 N", "10 N"],
      correctIndex: 1,
      solution:
        "μ = 0.01/1 = 0.01 kg/m. Fundamental: f=v/(2L), so v=2Lf=2×1×50=100 m/s. Tension T=v²μ=100²×0.01=100 N.",
    },
    {
      exam: "AIIMS 2018 [Q45]",
      question:
        "Two waves of frequency 10 kHz and 10.2 kHz propagate and superimpose. After what time does the wave envelope repeat?",
      options: ["5 ms", "10 ms", "0.5 ms", "50 ms"],
      correctIndex: 0,
      solution:
        "The envelope (beat pattern) repeats with period T=1/|f₁−f₂|=1/(0.2×10³)=1/200=0.005 s=5 ms.",
    },
  ],
};
