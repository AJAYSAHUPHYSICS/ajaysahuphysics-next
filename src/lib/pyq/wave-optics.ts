import type { ChapterPyq } from "./kinematics";

// SOURCE NOTES (read before editing):
// - Source: Allen NEET module, "WAVE OPTICS" chapter, Exercise-II
//   (Previous Year Questions), true PDF pages 1230-1233, 39 questions
//   total, a single standalone chapter.
// - Answer key independently re-verified from page 1233's printed key
//   table before writing any content.
// - SCHEMA NOTE: built strictly to the real PyqQuestion type (exam,
//   examType?, question, options, correctIndex, solution) — no invented
//   fields.
// - This is the cleanest source chapter encountered so far: no garbled
//   OCR fragments, no match-the-column or assertion-reason formats, and
//   every single question (including the one figure-referencing question,
//   Q37) was independently solvable with full confidence, reproducing
//   the verified key exactly. Zero questions carry a "(reduced
//   confidence)" tag in this chapter.

export const waveOpticsPyq: ChapterPyq = {
  chapterName: "Wave Optics",
  className: "12",
  questions: [
    {
      exam: "AIIMS 2012 [Q1]",
      question:
        "Two sinusoidal waves of intensity I, having the same frequency and same amplitude, interfere constructively at a point. What is the resultant intensity at that point?",
      options: ["I", "2I", "4I", "8I"],
      correctIndex: 2,
      solution:
        "Resultant intensity: I(net) = I₁+I₂+2√(I₁I₂)cosφ. For constructive interference (φ=0), with I₁=I₂=I: I(net) = I+I+2√(I×I) = 2I+2I = 4I.",
    },
    {
      exam: "AIIMS 2012 [Q2]",
      question:
        "In Young's double slit experiment, if the fringe order is represented by m, how does the fringe width depend on m?",
      options: [
        "Independent of m",
        "Directly proportional to m",
        "Directly proportional to (2m+1)",
        "Inversely proportional to (2m+1)",
      ],
      correctIndex: 0,
      solution:
        "Fringe width β = λD/d is a constant, determined only by the wavelength, slit separation, and screen distance — it does not depend on which fringe order m you're looking at. All fringes are equally spaced.",
    },
    {
      exam: "AIIMS 2013 [Q3]",
      question:
        "A light ray is incident on a glass slab and is partially reflected and partially transmitted. What describes the reflected ray?",
      options: [
        "Completely polarised and highly intense",
        "Partially polarised and poorly intense",
        "Partially polarised and highly intense",
        "Completely polarised and poorly intense",
      ],
      correctIndex: 1,
      solution:
        "Except at exactly Brewster's angle, reflection off glass produces only partially polarised light. Since only a small fraction of the incident light reflects off a glass surface (most is transmitted), the reflected ray is also relatively low in intensity.",
    },
    {
      exam: "NEET-UG 2013 [Q4]",
      question:
        "In Young's double slit experiment, the slits are 2 mm apart and illuminated by light of two wavelengths λ₁=12000 Å and λ₂=10000 Å. At what minimum distance from the central bright fringe (on a screen 2 m from the slits) will a bright fringe from one pattern coincide with a bright fringe from the other?",
      options: ["3 mm", "8 mm", "6 mm", "4 mm"],
      correctIndex: 2,
      solution:
        "Coincidence requires n₁λ₁ = n₂λ₂, so n₁/n₂ = λ₂/λ₁ = 10000/12000 = 5/6. The smallest integer solution is n₁=5, n₂=6. Position: y = n₁λ₁D/d = 5×(12000×10⁻¹⁰)×2/(2×10⁻³) = 6×10⁻³ m = 6 mm.",
    },
    {
      exam: "AIIMS 2013 [Q5]",
      question:
        "A parallel beam of fast-moving electrons is incident normally on a narrow slit, with a fluorescent screen placed far away. If the speed of the electrons is increased, what happens to the resulting diffraction pattern?",
      options: [
        "The angular width of the central maximum will be unaffected",
        "Diffraction pattern is not observed for electrons",
        "The angular width of the central maximum will increase",
        "The angular width of the central maximum will decrease",
      ],
      correctIndex: 3,
      solution:
        "Electrons have a de Broglie wavelength λ=h/(mv), which DECREASES as speed v increases. Since the diffraction pattern's angular width is proportional to λ/a (slit width), a smaller λ means a narrower (decreased) angular width for the central maximum.",
    },
    {
      exam: "AIIMS 2013 [Q6]",
      question:
        "In a Young's double slit experiment, the spacing between the slits is 0.3 mm and the screen is 1.5 m away. The second bright fringe is displaced by 6 mm from the central fringe. What is the wavelength of light used?",
      options: ["625 nm", "600 nm", "550 nm", "500 nm"],
      correctIndex: 1,
      solution:
        "y = mλD/d, so λ = yd/(mD) = (6×10⁻³)(0.3×10⁻³)/(2×1.5) = (1.8×10⁻⁶)/3 = 6×10⁻⁷ m = 600 nm.",
    },
    {
      exam: "AIPMT 2014 [Q7]",
      question:
        "A ray of unpolarised light is incident on a glass plate at the polarising angle θp. What happens to the reflected and transmitted rays?",
      options: [
        "Both reflected and transmitted rays will be completely polarised",
        "The reflected ray will be completely polarised, and the transmitted ray will be partially polarised",
        "The reflected ray will be partially polarised, and the transmitted ray will be completely polarised",
        "Both reflected and transmitted rays will be partially polarised",
      ],
      correctIndex: 1,
      solution:
        "At the polarising (Brewster's) angle, the reflected ray becomes completely polarised. The transmitted ray, however, is never completely polarised — it always retains a partial polarisation, carrying the remaining, non-reflected polarisation components.",
    },
    {
      exam: "AIPMT 2014 [Q8]",
      question:
        "In Young's double-slit experiment, the intensity of light at a point where the path difference is λ (the wavelength used) is K. What is the intensity at a point where the path difference is λ/4?",
      options: ["K", "K/4", "K/2", "Zero"],
      correctIndex: 2,
      solution:
        "General intensity formula: I = 4I₀cos²(φ/2), where φ is the phase difference. At path difference λ (φ=2π): I=4I₀cos²(π)=4I₀=K. At path difference λ/4 (φ=π/2): I=4I₀cos²(π/4)=4I₀×(1/2)=2I₀=K/2.",
    },
    {
      exam: "AIPMT 2014 [Q9]",
      question:
        "A beam of light of wavelength 600 nm from a distant source falls on a single slit 1 mm wide, with the resulting diffraction pattern observed on a screen 2 m away. What is the distance between the first dark fringes on either side of the central bright fringe?",
      options: ["1.2 cm", "1.2 mm", "2.4 cm", "2.4 mm"],
      correctIndex: 3,
      solution:
        "Distance to the first dark fringe on one side: y=λD/a = (600×10⁻⁹×2)/(1×10⁻³) = 1.2×10⁻³ m = 1.2 mm. The distance between the two first dark fringes (one on each side) is double this: 2×1.2mm = 2.4 mm.",
    },
    {
      exam: "AIPMT 2015 [Q10]",
      question:
        "In a double slit experiment, the two slits are 1 mm apart and the screen is placed 1 m away. Monochromatic light of wavelength 500 nm is used. What slit width is needed to fit ten interference maxima within the central maximum of the single-slit diffraction pattern?",
      options: ["0.1 mm", "0.5 mm", "0.02 mm", "0.2 mm"],
      correctIndex: 3,
      solution:
        "The central diffraction maximum's full width corresponds to 2d/a interference fringes fitting within it (comparing the diffraction envelope width 2λD/a to the interference fringe spacing λD/d). Setting 2d/a=10: a = 2d/10 = 2×1mm/10 = 0.2 mm.",
    },
    {
      exam: "Re-AIPMT 2015 [Q11]",
      question:
        "For a parallel beam of monochromatic light of wavelength λ, diffraction is produced by a single slit of width a (comparable to the wavelength). If D is the distance to the screen, what is the width of the central maximum?",
      options: ["Dλ/a", "Da/λ", "2Da/λ", "2Dλ/a"],
      correctIndex: 3,
      solution:
        "The central maximum extends from the first dark fringe on one side to the first dark fringe on the other, each at a distance Dλ/a from the centre — giving a total width of 2Dλ/a.",
    },
    {
      exam: "Re-AIPMT 2015 [Q12]",
      question:
        "At the first minimum adjacent to the central maximum of a single-slit diffraction pattern, what is the phase difference between the Huygens' wavelet from the edge of the slit and the wavelet from the midpoint of the slit?",
      options: ["π/8 radian", "π/4 radian", "π/2 radian", "π radian"],
      correctIndex: 3,
      solution:
        "At the first minimum, the total phase spread across the entire slit (edge to edge) is 2π. The phase difference between the edge and the midpoint is exactly half of this total spread: 2π/2 = π radian.",
    },
    {
      exam: "AIIMS 2015 [Q13]",
      question:
        "Two slits in Young's experiment have widths in the ratio 1:25. What is the ratio of intensity at the maxima to the intensity at the minima in the interference pattern?",
      options: ["4/9", "9/4", "121/49", "49/121"],
      correctIndex: 1,
      solution:
        "Since intensity is proportional to slit width, amplitude is proportional to √width: a₁:a₂ = √1:√25 = 1:5. I(max)/I(min) = (a₁+a₂)²/(a₁−a₂)² = (1+5)²/(5−1)² = 36/16 = 9/4.",
    },
    {
      exam: "AIIMS 2015 [Q14]",
      question:
        "The width of the central fringe of a diffraction pattern is 5.8 mm on a screen 2 m away. If the light source has wavelength 5800 Å, what is the slit width?",
      options: ["0.2 mm", "0.4 mm", "0.8 mm", "0.1 mm"],
      correctIndex: 1,
      solution:
        "The central fringe's full width equals 2λD/a. Solving for a: a = 2λD/width = (2×5800×10⁻¹⁰×2)/(5.8×10⁻³) = (23200×10⁻¹⁰)/(5.8×10⁻³) = 4×10⁻⁴ m = 0.4 mm.",
    },
    {
      exam: "AIIMS 2015 [Q15]",
      question:
        "The interference pattern shifts downward by 4 mm when a polystyrene sheet of refractive index 1.8 is placed in front of the lower slit. If the wavelength used is 683 nm, the separation between slits is 2 mm, and the separation between slits and screen is 10 cm, what is the thickness of the sheet?",
      options: ["0.1 mm", "0.2 mm", "0.3 mm", "0.4 mm"],
      correctIndex: 0,
      solution:
        "Shift due to the sheet: Δy = (n−1)tD/d. Solving for t: t = Δy×d/[(n−1)D] = (4×10⁻³×2×10⁻³)/(0.8×0.1) = (8×10⁻⁶)/(0.08) = 1×10⁻⁴ m = 0.1 mm.",
    },
    {
      exam: "AIIMS 2015 [Q16]",
      question:
        "The reflected ray is completely polarised when light is incident on a medium of refractive index 1.73. What is the angle of refraction (not incidence) in this case?",
      options: ["30°", "45°", "60°", "37°"],
      correctIndex: 0,
      solution:
        "Brewster's angle: θp = tan⁻¹(n) = tan⁻¹(1.73) = tan⁻¹(√3) = 60° (the angle of INCIDENCE). At Brewster's angle, the reflected and refracted rays are perpendicular to each other, so the angle of refraction = 90°−60° = 30°.",
    },
    {
      exam: "NEET-I 2016 [Q17]",
      question:
        "The intensity of the central fringe in an interference pattern is 0.01 W/m². What is the intensity at a point with path difference λ/3 from the centre (in mW/m²)?",
      options: ["2.5", "5", "7.5", "10"],
      correctIndex: 0,
      solution:
        "Central fringe intensity = I(max) = 10 mW/m². At path difference λ/3, phase difference φ = 2π/3. Intensity: I = I(max)cos²(φ/2) = 10×cos²(π/3) = 10×(0.5)² = 10×0.25 = 2.5 mW/m².",
    },
    {
      exam: "NEET-I 2016 [Q18]",
      question:
        "In a diffraction pattern from a single slit of width a, the first minimum is at 30° when light of wavelength 5000 Å is used. At what angle is the first secondary maximum observed?",
      options: ["sin⁻¹(1/4)", "sin⁻¹(2/3)", "sin⁻¹(1/2)", "sin⁻¹(3/4)"],
      correctIndex: 3,
      solution:
        "First minimum: a sin30° = λ, so a = λ/sin30° = 2λ. First secondary maximum (standard approximate condition): a sinθ ≈ 3λ/2. Solving: sinθ = 3λ/(2a) = 3λ/(4λ) = 3/4. θ = sin⁻¹(3/4).",
    },
    {
      exam: "NEET-I 2016 [Q19]",
      question:
        "The intensity at the maximum in a Young's double slit experiment is I₀. The distance between the two slits is d=5λ, where λ is the wavelength used. What is the intensity directly in front of one of the slits on a screen at distance D=10d?",
      options: ["I₀", "I₀/4", "3I₀/4", "I₀/2"],
      correctIndex: 3,
      solution:
        "A point directly in front of one slit is offset from the central axis by d/2. Path difference there: Δ = (d/2)(d/D) = d²/(2D). With D=10d: Δ = d/20. With d=5λ: Δ = λ/4, giving phase difference φ=π/2. Intensity: I = I₀cos²(φ/2) = I₀cos²(π/4) = I₀/2.",
    },
    {
      exam: "NEET-II 2016 [Q20]",
      question:
        "An interference pattern is obtained with two coherent light sources whose intensity ratio is n. What is the ratio (Imax−Imin)/(Imax+Imin)?",
      options: ["n/(n+1)²", "2√n/(n+1)²", "n/(n+1)", "2√n/(n+1)"],
      correctIndex: 3,
      solution:
        "Let I₁=nI, I₂=I. Imax=(√I₁+√I₂)²=I(√n+1)². Imin=(√I₁−√I₂)²=I(√n−1)². Using the identities (a+b)²−(a−b)²=4ab and (a+b)²+(a−b)²=2(a²+b²) with a=√n, b=1: Imax−Imin = I×4√n, Imax+Imin = I×2(n+1). Ratio = 4√n/[2(n+1)] = 2√n/(n+1).",
    },
    {
      exam: "NEET-II 2016 [Q21]",
      question:
        "A linear aperture of width 0.02 cm is placed immediately in front of a lens of focal length 60 cm, illuminated normally by a parallel beam of wavelength 5×10⁻⁵ cm. What is the distance of the first dark band of the diffraction pattern from the centre of the screen?",
      options: ["0.20 cm", "0.15 cm", "0.10 cm", "0.25 cm"],
      correctIndex: 1,
      solution:
        "With the lens focusing the diffraction pattern at its focal plane, D effectively equals f=60cm. First dark band: y = λf/a = (5×10⁻⁷×0.6)/(2×10⁻⁴) = (3×10⁻⁷)/(2×10⁻⁴) = 1.5×10⁻³ m = 0.15 cm.",
    },
    {
      exam: "AIIMS 2016 [Q22]",
      question:
        "In YDSE, the distance between slits and screen is 1.5 m. When light of wavelength 500 nm is used, the 2nd bright fringe is at 10 mm from the central bright fringe. What is the shift in position of the 2nd bright fringe if light of wavelength 550 nm is used instead?",
      options: ["2 mm", "1 mm", "1.5 mm", "1.1 mm"],
      correctIndex: 1,
      solution:
        "Fringe position scales directly with wavelength (y=mλD/d): y(new) = y(old)×(λ(new)/λ(old)) = 10×(550/500) = 11 mm. Shift = 11−10 = 1 mm.",
    },
    {
      exam: "AIIMS 2016 [Q23]",
      question:
        "Two waves have intensities 9I and I respectively. What is the resultant intensity if the phase difference between them is π?",
      options: ["3I", "4I", "5I", "6I"],
      correctIndex: 1,
      solution:
        "I(net) = I₁+I₂+2√(I₁I₂)cosφ = 9I+I+2√(9I×I)×cos(180°) = 10I+2×3I×(−1) = 10I−6I = 4I.",
    },
    {
      exam: "NEET(UG) 2017 [Q24]",
      question:
        "A polaroid is oriented at 60° to the electric vector of incident polarised light. By what factor is the intensity reduced (i.e. what fraction of the original intensity is lost)?",
      options: ["1/4", "3/4", "1/2", "1/3"],
      correctIndex: 1,
      solution:
        "By Malus's law, transmitted intensity = I₀cos²(60°) = I₀×(0.5)² = I₀/4 — meaning 1/4 of the light is transmitted, and therefore 1−1/4 = 3/4 of the original intensity is lost (reduced).",
    },
    {
      exam: "NEET(UG) 2017 [Q25]",
      question:
        "What is the ratio of resolving powers of an optical microscope for two wavelengths λ₁=4000 Å and λ₂=6000 Å?",
      options: ["9:4", "3:2", "16:81", "8:27"],
      correctIndex: 1,
      solution:
        "Resolving power is inversely proportional to wavelength (shorter wavelength gives better resolution). R₁/R₂ = λ₂/λ₁ = 6000/4000 = 3:2.",
    },
    {
      exam: "NEET-II 2016 [Q26]",
      question:
        "Young's double slit experiment is first performed in air, then in a medium other than air. It's found that the 8th bright fringe in the medium coincides with where the 5th dark fringe was in air. What is the refractive index of the medium?",
      options: ["1.59", "1.69", "1.78", "1.25"],
      correctIndex: 2,
      solution:
        "Position of 8th bright fringe in medium: y = 8(λ/n)D/d (wavelength shortens by factor n in the medium). Position of 5th dark fringe in air: y = 4.5λD/d. Setting equal: 8/n = 4.5, giving n = 8/4.5 ≈ 1.78.",
    },
    {
      exam: "NEET-II 2016 [Q27]",
      question:
        "Two polaroids P₁ and P₂ are placed with their axes perpendicular to each other. Unpolarised light I₀ is incident on P₁. A third polaroid P₃ is kept between P₁ and P₂, with its axis at 45° to P₁'s. What is the intensity of light transmitted through P₂?",
      options: ["I₀/4", "I₀/8", "I₀/16", "I₀/2"],
      correctIndex: 1,
      solution:
        "After P₁: I₀/2. After P₃ (45° from P₁): (I₀/2)cos²(45°) = I₀/4. After P₂ (90° from P₁, i.e. 45° from P₃): (I₀/4)cos²(45°) = I₀/8.",
    },
    {
      exam: "AIIMS 2017 [Q28]",
      question:
        "The intensities of two interfering coherent sources are 9 units and 4 units respectively. What is the maximum intensity in the interference pattern?",
      options: ["25 unit", "13 unit", "1 unit", "5 unit"],
      correctIndex: 0,
      solution:
        "I(max) = (√I₁+√I₂)² = (√9+√4)² = (3+2)² = 25 units.",
    },
    {
      exam: "AIIMS 2017 [Q29]",
      question:
        "In a YDSE, fringes are formed at a distance of 1 m from double slits separated by 0.12 mm. If the 3rd bright band is at 1.5 cm from the centre of the screen, what is the wavelength of light used?",
      options: ["6000 Å", "5000 Å", "4000 Å", "8000 Å"],
      correctIndex: 0,
      solution:
        "y = nλD/d, so λ = yd/(nD) = (1.5×10⁻²×0.12×10⁻³)/(3×1) = (0.18×10⁻⁵)/3 = 6×10⁻⁷ m = 6000 Å.",
    },
    {
      exam: "AIIMS 2017 [Q30]",
      question:
        "In YDSE, the intensity of the central bright fringe is 8 mW/m². What is the intensity at a point with path difference λ/6?",
      options: ["8 mW/m²", "6 mW/m²", "4 mW/m²", "2 mW/m²"],
      correctIndex: 1,
      solution:
        "Phase difference at λ/6: φ = 2π/6 = π/3. Intensity: I = I(max)cos²(φ/2) = 8×cos²(π/6) = 8×(√3/2)² = 8×(3/4) = 6 mW/m².",
    },
    {
      exam: "NEET(UG) 2018 [Q31]",
      question:
        "Unpolarised light is incident from air onto a plane surface of a material of refractive index μ. At a particular angle of incidence i, the reflected and refracted rays are found to be perpendicular to each other. Which statement is correct for this situation?",
      options: [
        "Reflected light is polarised with its electric vector parallel to the plane of incidence",
        "Reflected light is polarised with its electric vector perpendicular to the plane of incidence",
        "i = sin⁻¹(1/μ)",
        "i = tan⁻¹(1/μ)",
      ],
      correctIndex: 1,
      solution:
        "This is precisely Brewster's angle condition. At this angle, the reflected light is completely polarised, with its electric field oscillating perpendicular to the plane of incidence — the standard, correct qualitative description of Brewster-angle reflection.",
    },
    {
      exam: "NEET(UG) 2018 [Q32]",
      question:
        "In Young's double slit experiment, the slit separation d is 2 mm, the wavelength λ is 5896 Å, and the screen distance D is 100 cm. The angular fringe width is found to be 0.20°. To increase the angular width to 0.21° (same λ and D), what should the new slit separation be?",
      options: ["1.8 mm", "1.9 mm", "2.1 mm", "1.7 mm"],
      correctIndex: 1,
      solution:
        "Angular fringe width Δθ = λ/d, so Δθ ∝ 1/d. New separation: d(new) = d(old)×(Δθ(old)/Δθ(new)) = 2×(0.20/0.21) ≈ 1.9 mm.",
    },
    {
      exam: "AIIMS 2018 [Q33]",
      question:
        "For an astronomical refracting telescope to have both large angular magnification and high angular resolution, what must its objective lens have?",
      options: [
        "small focal length and large diameter",
        "large focal length and small diameter",
        "large focal length and large diameter",
        "small focal length and small diameter",
      ],
      correctIndex: 2,
      solution:
        "Magnification M=f(o)/f(e) favours a LARGE objective focal length. Angular resolution of a telescope depends on the objective's aperture (diameter) — a LARGER diameter gives better (finer) resolution. Both requirements point to a large focal length AND large diameter objective.",
    },
    {
      exam: "AIIMS 2018 [Q34]",
      question:
        "Unpolarised light of intensity I₀ passes through two polaroids kept at 15° to each other. What is the final intensity?",
      options: ["0.34 I₀", "0.47 I₀", "0.52 I₀", "0.78 I₀"],
      correctIndex: 1,
      solution:
        "After the first polaroid: I₀/2. After the second (15° from the first): (I₀/2)cos²(15°) ≈ (I₀/2)×0.933 ≈ 0.467 I₀ ≈ 0.47 I₀.",
    },
    {
      exam: "AIIMS 2018 [Q35]",
      question:
        "A single slit has width 0.5 mm, with the screen 1 m away. The second (secondary) maxima in the diffraction pattern is at a distance of 2 mm from the centre. What is the wavelength of light?",
      options: ["560 nm", "400 nm", "40 nm", "360 nm"],
      correctIndex: 1,
      solution:
        "Using the approximate secondary-maxima condition for the 2nd secondary maximum: a sinθ = 5λ/2. With sinθ≈y/D: λ = 2ay/(5D) = (2×0.5×10⁻³×2×10⁻³)/(5×1) = (2×10⁻⁶)/5 = 4×10⁻⁷ m = 400 nm.",
    },
    {
      exam: "AIIMS 2018 [Q36]",
      question:
        "In YDSE, the wavelength of light used is 600 nm. At a certain point, the intensity is 50% of the maximum value. What is the path difference at that point?",
      options: ["150 nm", "200 nm", "300 nm", "600 nm"],
      correctIndex: 0,
      solution:
        "Setting I=0.5×I(max): cos²(φ/2)=0.5, so cos(φ/2)=1/√2, giving φ/2=45°, φ=90°. Path difference = (φ/360°)×λ = (90/360)×600 = 150 nm.",
    },
    {
      exam: "AIIMS 2018 [Q37]",
      question:
        "Unpolarised light passes through three polaroids with axes at 0°, 30°, and 90° (as shown). What is the final intensity, in terms of the incident intensity I₀?",
      options: ["(3/4)I₀", "(3/16)I₀", "(3/32)I₀", "I₀/4"],
      correctIndex: 2,
      solution:
        "After the first polaroid (0°): I₀/2. After the second (30° from the first): (I₀/2)cos²(30°) = (I₀/2)(3/4) = 3I₀/8. After the third (90°, i.e. 60° from the second): (3I₀/8)cos²(60°) = (3I₀/8)(1/4) = 3I₀/32.",
    },
    {
      exam: "AIIMS 2018 [Q38]",
      question:
        "In a single slit diffraction setup, the slit width is 0.6 mm, and the distance of the first minima from the central position is 1 mm. If the screen distance is 1.2 m, what is the wavelength of light?",
      options: ["500 nm", "600 nm", "200 nm", "100 nm"],
      correctIndex: 0,
      solution:
        "y = λD/a, so λ = ya/D = (1×10⁻³×0.6×10⁻³)/1.2 = (0.6×10⁻⁶)/1.2 = 5×10⁻⁷ m = 500 nm.",
    },
    {
      exam: "AIIMS 2018 [Q39]",
      question:
        "In YDSE, the distance between slits is 0.2 mm, the distance between slit and screen is 2 m, and the wavelength of monochromatic light is 600 nm. What is the phase difference between the waves at a point 2 cm from the midpoint?",
      options: ["20π", "2π/3", "15π", "20π/3"],
      correctIndex: 3,
      solution:
        "Path difference: Δ = yd/D = (2×10⁻²×0.2×10⁻³)/2 = 2×10⁻⁶ m = 2000 nm. Phase difference: φ = 2πΔ/λ = 2π×(2000/600) = 2π×(10/3) = 20π/3.",
    },
  ],
};
