import type { ChapterPyq } from "./kinematics";

// SOURCE NOTES (read before editing):
// - Source: Allen NEET module, "RAY OPTICS AND OPTICAL INSTRUMENTS" chapter,
//   Exercise-II (Previous Year Questions), true PDF pages 1299-1304, 55
//   questions total, a single standalone chapter (the largest Class 12
//   PYQ set implemented so far).
// - Answer key independently re-verified from page 1304's printed key
//   table before writing any content.
// - SCHEMA NOTE: built strictly to the real PyqQuestion type (exam,
//   examType?, question, options, correctIndex, solution) — no invented
//   fields.
// - Q5, Q16, Q50, Q53 involve figures where the exact geometry could not
//   be fully confirmed from text extraction alone. Each is flagged
//   (reduced confidence — see note) with the standard method shown and
//   the specific uncertainty disclosed.
// - Q34 is a match-the-column question; encoded as a single 4-option MCQ
//   matching the source's own presentation (each option is a full
//   A/B/C/D mapping), not as a separate matching-UI structure (which
//   doesn't exist in the real schema).

export const rayOpticsAndOpticalInstrumentsPyq: ChapterPyq = {
  chapterName: "Ray Optics & Optical Instruments",
  className: "12",
  questions: [
    {
      exam: "AIPMT 2006 [Q1]",
      question:
        "A microscope is focused on a mark on a piece of paper. A slab of glass of thickness 3 cm and refractive index 1.5 is then placed over the mark. How should the microscope be moved to bring the mark back into focus?",
      options: ["1 cm upward", "4.5 cm downward", "1 cm downward", "2 cm upward"],
      correctIndex: 0,
      solution:
        "The apparent shift caused by a glass slab is Δ = t(1 − 1/n) = 3(1 − 1/1.5) = 3×(1/3) = 1 cm. Since the slab makes the mark appear closer to the microscope (shifted toward it), the microscope must move up (toward the slab) by this 1 cm to refocus.",
    },
    {
      exam: "AIIMS 2006 [Q2]",
      question:
        "A convex lens and a concave lens, each having the same focal length of 25 cm, are put in contact to form a combination of lenses. What is the power (in diopters) of the combination?",
      options: ["25", "50", "Infinite", "Zero"],
      correctIndex: 3,
      solution:
        "Power of a lens is P = 1/f, with sign depending on whether it's converging (+) or diverging (−). Combined power: P = (+1/0.25) + (−1/0.25) = 0. Since the two lenses have equal and opposite powers, they exactly cancel.",
    },
    {
      exam: "AIPMT 2007 [Q3]",
      question:
        "A lens is made of flint glass (refractive index 1.5). When the lens is immersed in a liquid of refractive index 1.25, how does the focal length change?",
      options: [
        "Increases to a factor of 1.25",
        "Increases to a factor of 2.5",
        "Increases to a factor of 1.2",
        "Decreases to a factor of 1.2",
      ],
      correctIndex: 1,
      solution:
        "Using the lensmaker's equation, 1/f ∝ (n(relative) − 1), where n(relative) = n(lens)/n(medium). In air: n(rel) = 1.5, giving (n(rel)−1)=0.5. In liquid: n(rel) = 1.5/1.25 = 1.2, giving (n(rel)−1)=0.2. Since 1/f is proportional to this factor, f increases by the ratio 0.5/0.2 = 2.5.",
    },
    {
      exam: "AIPMT 2007 [Q4]",
      question:
        "The frequency of a light wave in a material is 2×10¹⁴ Hz and its wavelength is 5000 Å. What is the refractive index of the material?",
      options: ["1.33", "1.40", "1.50", "3.00"],
      correctIndex: 3,
      solution:
        "Speed of light in the material: v = fλ = (2×10¹⁴)(5000×10⁻¹⁰) = (2×10¹⁴)(5×10⁻⁷) = 1×10⁸ m/s. Refractive index: n = c/v = (3×10⁸)/(1×10⁸) = 3.00.",
    },
    {
      exam: "AIPMT (Mains) 2010 [Q5] (reduced confidence — see note)",
      question:
        "A small coin rests on the bottom of a beaker filled with a liquid. A ray of light from the coin travels up to the liquid's surface and then moves along the surface itself (grazing emergence), as shown in the figure. How fast is light traveling in the liquid?",
      options: ["1.2×10⁸ m/s", "1.8×10⁸ m/s", "2.4×10⁸ m/s", "3.0×10⁸ m/s"],
      correctIndex: 1,
      solution:
        "[REDUCED CONFIDENCE] Light emerging exactly along the surface means the angle of incidence at the surface equals the critical angle. This is a classic setup where the figure typically encodes a 3-4-5 right-triangle geometry, giving sinθc = 3/5, so n = 1/sinθc = 5/3. Speed in the liquid: v = c/n = (3×10⁸)/(5/3) = 1.8×10⁸ m/s, matching the verified answer key. However, I could not independently confirm the exact marked distances in the figure that establish this 3-4-5 relationship, so this reconstruction should be checked against a clearer image.",
    },
    {
      exam: "AIPMT 2008 [Q6]",
      question:
        "Two thin lenses of focal lengths f₁ and f₂ are placed in contact, sharing the same axis. What is the power of the combination?",
      options: ["(f₁+f₂)", "(f₁+f₂)/(f₁f₂)", "f₂/f₁", "f₁/f₂"],
      correctIndex: 1,
      solution:
        "Power of a lens combination in contact adds directly: P = P₁+P₂ = 1/f₁ + 1/f₂ = (f₁+f₂)/(f₁f₂).",
    },
    {
      exam: "AIPMT (Pre) 2010 [Q7]",
      question:
        "A lens of focal length f and aperture diameter d forms an image of intensity I. If the central region of the lens, of diameter d/2, is covered with black paper, what are the new focal length and intensity respectively?",
      options: ["f/2 and I/2", "f and I/4", "3f/4 and I/2", "f and 3I/4"],
      correctIndex: 3,
      solution:
        "Focal length depends only on the lens's curvature and refractive index, not its aperture size, so f is unchanged. Covering a central circle of diameter d/2 blocks an area proportional to (d/2)² = d²/4, which is 1/4 of the total area (∝d²). So 3/4 of the original light-collecting area remains, and intensity (proportional to collected light) becomes 3I/4.",
    },
    {
      exam: "AIIMS 2008 [Q8]",
      question:
        "A ray of light travels in a transparent medium of refractive index μ and hits a surface separating the medium from air at an angle of incidence of 45°. For which value of μ can the ray undergo total internal reflection?",
      options: ["μ = 1.25", "μ = 1.33", "μ = 1.40", "μ = 1.50"],
      correctIndex: 3,
      solution:
        "For TIR, the angle of incidence must exceed the critical angle: 45° > θc, i.e. sin45° > sinθc = 1/μ, so μ > 1/sin45° = 1/0.707 ≈ 1.414. Checking the options, only μ=1.50 exceeds this threshold (1.25, 1.33, and 1.40 are all below 1.414).",
    },
    {
      exam: "AIPMT (Mains) 2010 [Q9]",
      question:
        "The speed of light in media M₁ and M₂ is 1.5×10⁸ m/s and 2.0×10⁸ m/s respectively. A ray of light enters from medium M₁ into M₂ at incidence angle i. If the ray suffers total internal reflection, what is the value of i?",
      options: [
        "Equal to or less than sin⁻¹(3/5)",
        "Equal to or greater than sin⁻¹(3/4)",
        "Less than sin⁻¹(2/3)",
        "Equal to sin⁻¹(2/3)",
      ],
      correctIndex: 1,
      solution:
        "Since v₁<v₂, M₁ is the denser medium, so TIR is possible going from M₁ into M₂. Critical angle: sinθc = v₁/v₂ = 1.5/2.0 = 3/4. TIR requires i ≥ θc, i.e. i ≥ sin⁻¹(3/4).",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q10]",
      question:
        "A ray of light is incident on a 60° prism at the minimum deviation position. What is the angle of refraction at the first (incident) face of the prism?",
      options: ["30°", "45°", "60°", "Zero"],
      correctIndex: 0,
      solution:
        "At minimum deviation, the ray passes symmetrically through the prism, so the refraction angles at both faces are equal: r₁ = r₂ = A/2 = 60°/2 = 30°.",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q11]",
      question:
        "Which of the following is NOT due to total internal reflection?",
      options: [
        "Working of optical fibre",
        "Difference between apparent and real depth of a pond",
        "Mirage on hot summer days",
        "Brilliance of diamond",
      ],
      correctIndex: 1,
      solution:
        "Optical fibres, mirages, and diamond brilliance all rely on total internal reflection. The apparent-vs-real depth effect, however, is caused by simple (partial) refraction at a single interface — no total internal reflection is involved.",
    },
    {
      exam: "AIPMT (Mains) 2011 [Q12]",
      question:
        "A biconvex lens has radius of curvature of magnitude 20 cm on each side (refractive index 1.5). What best describes the image of an object of height 2 cm placed 30 cm from the lens?",
      options: [
        "Virtual, upright, height = 1 cm",
        "Virtual, upright, height = 0.5 cm",
        "Real, inverted, height = 4 cm",
        "Real, inverted, height = 1 cm",
      ],
      correctIndex: 2,
      solution:
        "Lensmaker's equation: 1/f = (1.5−1)(1/20−(−1/20)) = 0.5×(2/20) = 0.05, so f=20 cm. Using the lens formula with u=−30cm: 1/v = 1/f + 1/u = 1/20 − 1/30 = 1/60, so v=60cm (positive, real image). Magnification: m = v/u = 60/(−30) = −2. Image height = 2×(−2) = −4 cm — real, inverted, magnitude 4 cm.",
    },
    {
      exam: "AIPMT (Mains) 2011 [Q13]",
      question:
        "A thin prism of angle 15°, made of glass with refractive index μ₁=1.5, is combined with another prism of refractive index μ₂=1.75. The combination produces dispersion without deviation. What should the angle of the second prism be?",
      options: ["5°", "7°", "10°", "12°"],
      correctIndex: 2,
      solution:
        "For zero net deviation with two thin prisms combined oppositely: A₁(μ₁−1) = A₂(μ₂−1). Solving: A₂ = A₁(μ₁−1)/(μ₂−1) = 15×0.5/0.75 = 15×(2/3) = 10°.",
    },
    {
      exam: "AIPMT (Pre) 2012 [Q14]",
      question:
        "The magnifying power of a telescope is 9. When adjusted for parallel rays, the distance between objective and eyepiece is 20 cm. What are the focal lengths of the two lenses?",
      options: ["18 cm, 2 cm", "11 cm, 9 cm", "10 cm, 10 cm", "15 cm, 5 cm"],
      correctIndex: 0,
      solution:
        "For a telescope in normal adjustment: magnifying power M = f(o)/f(e) = 9, and separation = f(o)+f(e) = 20. Substituting f(o)=9f(e): 9f(e)+f(e)=20 → 10f(e)=20 → f(e)=2cm, f(o)=18cm.",
    },
    {
      exam: "AIPMT (Pre) 2012 [Q15]",
      question:
        "A ray of light is incident at angle of incidence i on one face of a prism of small angle A, and emerges normally from the opposite face. If the refractive index of the prism is μ, what is i, approximately?",
      options: ["A/μ", "A/2μ", "μA", "μA/2"],
      correctIndex: 2,
      solution:
        "Since the ray emerges normally from the second face, the refraction angle there is zero, so all of the prism angle is accounted for at the first face: r₁ = A (since A = r₁+r₂ = r₁+0). Snell's law at the first face: sin i = μ sin r₁ = μ sin A. For a small angle A (and correspondingly small i), sin i≈i and sin A≈A, giving i ≈ μA.",
    },
    {
      exam: "AIPMT (Pre) 2013 [Q16] (reduced confidence — see note)",
      question:
        "A concave mirror of focal length f₁ is placed at distance d from a convex lens of focal length f₂. A beam of light from infinity, after passing through the lens and reflecting off the mirror, returns to infinity. What must the distance d equal?",
      options: ["2f₁+f₂", "−2f₁+f₂", "f₁+f₂", "−f₁+f₂"],
      correctIndex: 1,
      solution:
        "[REDUCED CONFIDENCE] The source answer key gives −2f₁+f₂, so correctIndex has been set to 1. My own straightforward single-pass reasoning (image from the lens at f₂ must coincide with the mirror's focal point) gives d=f₁+f₂ instead, which doesn't match. The actual setup likely involves the light making a round trip (lens→mirror→lens again) or a different geometric relationship between the lens's image and the mirror's focal point than I assumed. This should be re-derived carefully from a clearer figure before being fully trusted.",
    },
    {
      exam: "AIPMT (Mains) 2012 [Q17]",
      question:
        "A biconvex lens of glass with refractive index 1.47 acts as a plane sheet of glass when dipped in a certain liquid. What must be true of the liquid's refractive index?",
      options: [
        "greater than that of glass",
        "less than that of glass",
        "equal to that of glass",
        "less than one",
      ],
      correctIndex: 2,
      solution:
        "A lens has zero net optical power (acts as a plain flat sheet) only when there's no effective refractive-index mismatch between the lens and its surrounding medium — i.e. the liquid's refractive index must exactly equal the glass's.",
    },
    {
      exam: "AIPMT (Mains) 2012 [Q18]",
      question:
        "A rod of length 10 cm lies along the principal axis of a concave mirror of focal length 10 cm, positioned so its end closer to the pole is 20 cm from the mirror. What is the length of the image?",
      options: ["2.5 cm", "5 cm", "10 cm", "15 cm"],
      correctIndex: 1,
      solution:
        "Near end (u₁=−20cm): 1/v₁ = 1/f−1/u₁ = −1/10−(−1/20) = −1/20, so v₁=−20cm. Far end (u₂=−30cm): 1/v₂ = −1/10−(−1/30) = −1/15, so v₂=−15cm. Image length = |v₁−v₂| = |−20−(−15)| = 5 cm.",
    },
    {
      exam: "AIPMT (Pre) 2012 [Q19]",
      question:
        "For a prism's angle of minimum deviation to equal its refracting angle (Dm=A), the prism must be made of a material whose refractive index:",
      options: [
        "is less than 1",
        "is greater than 2",
        "lies between √2 and 1",
        "lies between 2 and √2",
      ],
      correctIndex: 3,
      solution:
        "Using n = sin[(A+Dm)/2]/sin(A/2) with Dm=A: n = sin(A)/sin(A/2) = 2cos(A/2). As A ranges over physically reasonable prism angles, n=2cos(A/2) ranges between √2 (at larger A) and 2 (as A→0) — this is the standard result for this classic condition.",
    },
    {
      exam: "AIIMS 2012 [Q20]",
      question:
        "For a convex lens of focal length F, what is the minimum possible distance between an object and its real image?",
      options: ["3F", "4F", "(3/2)F", "2F"],
      correctIndex: 1,
      solution:
        "This minimum separation occurs at u=v=2F (the symmetric case), giving a total object-to-image distance of 2F+2F = 4F — a standard result for real images formed by a convex lens.",
    },
    {
      exam: "NEET-UG 2013 [Q21]",
      question:
        "A plano-convex lens fits exactly into a plano-concave lens, their plane surfaces parallel to each other, made from different materials of refractive indices μ₁ and μ₂. If R is the radius of curvature of the (shared) curved surface, what is the focal length of the combination?",
      options: [
        "2R/(μ₂−μ₁)",
        "R/[2(μ₁+μ₂)]",
        "R/[2(μ₁−μ₂)]",
        "R/(μ₁−μ₂)",
      ],
      correctIndex: 3,
      solution:
        "The combination is equivalent to two surfaces sharing the same radius R, one convex-facing and one concave-facing (opposite orientation). Power: P = (μ₁−1)/R − (μ₂−1)/R... working through the sign conventions for the shared curved interface gives P = (μ₁−μ₂)/R, so f = R/(μ₁−μ₂).",
    },
    {
      exam: "AIIMS 2012 [Q22]",
      question:
        "For a normal eye, the cornea provides a converging power of 40 D, and the least converging power of the eye lens behind the cornea is 20 D. Using this information, estimate the distance between the retina and the cornea/eye-lens system.",
      options: ["1.5 cm", "5 cm", "2.5 cm", "1.67 cm"],
      correctIndex: 3,
      solution:
        "Total converging power (approximating the system as a single thin lens): P(total) = 40+20 = 60 D. Focal length: f = 1/P = 1/60 m ≈ 1.67 cm — this is the distance from the lens system to where a distant object's image forms, i.e. the retina.",
    },
    {
      exam: "AIPMT 2014 [Q23]",
      question:
        "If the focal length of the objective lens is increased, what happens to the magnifying power of a microscope and a telescope respectively?",
      options: [
        "microscope will increase but that of telescope decrease",
        "microscope and telescope both will increase",
        "microscope and telescope both will decrease",
        "microscope will decrease but that of telescope increase",
      ],
      correctIndex: 3,
      solution:
        "A microscope's magnifying power is inversely related to its objective's focal length (a shorter objective gives higher microscope magnification), so increasing f(o) DECREASES microscope magnification. A telescope's magnifying power is directly proportional to its objective's focal length (M=f(o)/f(e)), so increasing f(o) INCREASES telescope magnification.",
    },
    {
      exam: "AIPMT 2014 [Q24]",
      question:
        "A prism has angle A, with one of its refracting surfaces silvered. A light ray incident on the first surface at angle 2A returns back along the same path after reflecting off the silvered surface. What is the refractive index μ of the prism?",
      options: ["2sinA", "2cosA", "(1/2)cosA", "tanA"],
      correctIndex: 1,
      solution:
        "For the ray to retrace its exact path, it must strike the silvered surface perpendicularly. Using the prism's geometry, this requires the refraction angle at the first surface to equal A itself. By Snell's law at the first surface: sin(2A) = μsin(A). Using the double-angle identity sin(2A)=2sinAcosA: 2sinAcosA = μsinA, giving μ = 2cosA.",
    },
    {
      exam: "AIPMT 2015 [Q25]",
      question:
        "The refracting angle of a prism is A, and the refractive index of the prism material is cot(A/2). What is the angle of minimum deviation?",
      options: ["180°−2A", "90°−A", "180°+2A", "180°−3A"],
      correctIndex: 0,
      solution:
        "Using n = sin[(A+Dm)/2]/sin(A/2), with n=cot(A/2)=cos(A/2)/sin(A/2): sin[(A+Dm)/2] = cos(A/2) = sin(90°−A/2). So (A+Dm)/2 = 90°−A/2, giving A+Dm = 180°−A, so Dm = 180°−2A.",
    },
    {
      exam: "AIIMS 2015 [Q26]",
      question:
        "Two identical thin plano-convex glass lenses (refractive index 1.5), each with radius of curvature 20 cm, are placed with their convex surfaces in contact at the centre. The gap between them is filled with oil of refractive index 1.7. What is the focal length of the combination?",
      options: ["−25 cm", "−50 cm", "50 cm", "−20 cm"],
      correctIndex: 1,
      solution:
        "Treating this as four refracting surfaces in sequence (air-glass flat, glass-oil curved, oil-glass curved, glass-air flat), and carefully tracking sign conventions for each curved interface's orientation: the two curved surfaces each contribute −1 D (the higher-index oil creates an unexpectedly diverging effect at both interfaces, since oil's index exceeds the glass's), giving total power P=−2D, so f=1/P=−0.5m=−50cm.",
    },
    {
      exam: "Re-AIPMT 2015 [Q27]",
      question:
        "A beam of red, green, and blue light is incident on a right-angled prism (45° angle shown) as depicted. The refractive indices of the prism material for red, green, and blue light are 1.39, 1.44, and 1.47 respectively. What happens to the beam?",
      options: [
        "separates the red colour from the green and blue colours",
        "separates the blue colour from the red and green colours",
        "separates all three colours from one another",
        "does not separate the three colours at all",
      ],
      correctIndex: 0,
      solution:
        "Critical angle: θc=sin⁻¹(1/n). For blue (n=1.47): θc≈42.8°. For green (n=1.44): θc≈44.0°. For red (n=1.39): θc≈46.0°. At the 45° incidence angle shown, blue and green (both with θc<45°) undergo total internal reflection and are deflected, while red (θc>45°) passes straight through without TIR — separating red from the other two.",
    },
    {
      exam: "AIIMS 2015 [Q28]",
      question:
        "A lens has one concave surface with radius of curvature 2 m and a convex surface with radius of curvature 3 m (refractive index 1.5). What is the focal length of the lens?",
      options: ["12 m", "−12 m", "24 m", "−6 m"],
      correctIndex: 1,
      solution:
        "Using the lensmaker's equation with both surfaces' centres of curvature on the same side (a meniscus-type lens), R₁=−2m and R₂=−3m: 1/f = (1.5−1)(1/(−2)−1/(−3)) = 0.5×(−0.5+0.333) = 0.5×(−0.167) ≈ −0.0833, giving f ≈ −12 m.",
    },
    {
      exam: "AIIMS 2015 [Q29]",
      question:
        "A compound microscope has an objective of focal length 7 mm, an eyepiece of focal length 20 mm, and a distance of 20 cm between the lenses. If the image is formed at the near point of distinct vision, what is the magnifying power?",
      options: ["337", "400", "220", "120"],
      correctIndex: 0,
      solution:
        "Using the standard compound-microscope approximation, M ≈ (L/f(o))×(D/f(e)), with L=200mm, f(o)=7mm, D=250mm, f(e)=20mm: M ≈ (200/7)×(250/20) ≈ 28.6×12.5 ≈ 357, which reduces to ≈337 once the small correction terms in the more exact formula are included.",
    },
    {
      exam: "AIPMT 2015 [Q30]",
      question:
        "A far-sighted person can see objects clearly only beyond 71 cm, given that the separation between their glasses and eye lens is 2 cm. What is the focal length of the corrective glass lens?",
      options: ["23 cm", "34.5 cm", "18.4 cm", "30 cm"],
      correctIndex: 1,
      solution:
        "The lens must form a virtual image, of an object at the normal near point (25cm from the eye, so 23cm from the lens), at the person's actual near point (71cm from the eye, so 69cm from the lens, virtual). Using 1/v−1/u=1/f with u=−23cm, v=−69cm: 1/f = −1/69−(−1/23) = −1/69+3/69 = 2/69, giving f = 69/2 = 34.5 cm.",
    },
    {
      exam: "NEET-I 2016 [Q31]",
      question:
        "If the velocity of an electromagnetic wave in a medium is 3×10⁸ m/s, what is the refractive index of the medium?",
      options: ["1", "2", "0.5", "0.25"],
      correctIndex: 0,
      solution:
        "Since 3×10⁸ m/s equals the speed of light in vacuum, n = c/v = c/c = 1.",
    },
    {
      exam: "NEET-I 2016 [Q32]",
      question:
        "The angle of incidence for a ray of light at a refracting surface of a prism is 45°. The angle of the prism is 60°. If the ray suffers minimum deviation through the prism, what are the angle of minimum deviation and refractive index of the prism material, respectively?",
      options: ["45°, 1/√2", "30°, √2", "45°, √2", "30°, 1/√2"],
      correctIndex: 1,
      solution:
        "At minimum deviation, the incidence angle relates to the prism angle and deviation via i=(A+Dm)/2, so Dm = 2i−A = 2(45°)−60° = 30°. Refractive index: n = sin[(A+Dm)/2]/sin(A/2) = sin(45°)/sin(30°) = (√2/2)/(1/2) = √2.",
    },
    {
      exam: "NEET-I 2016 [Q33]",
      question:
        "An astronomical telescope has objective and eyepiece focal lengths of 40 cm and 4 cm respectively. To view an object 200 cm away from the objective, at what distance must the lenses be separated?",
      options: ["37.3 cm", "46.0 cm", "50.0 cm", "54.0 cm"],
      correctIndex: 3,
      solution:
        "Since the object isn't at infinity, first find the objective's image position: using u=−200cm, f=40cm: 1/v = 1/40−1/200 = 4/200, giving v=50cm. For the final image to form at infinity (relaxed viewing), the eyepiece must be placed a further f(e)=4cm beyond this intermediate image. Total separation: 50+4 = 54 cm.",
    },
    {
      exam: "NEET-I 2016 [Q34]",
      question:
        "Match the entries of Column-1 with Column-2 (m is the magnification produced by a spherical mirror): Column-1: (A) m=−2, (B) m=−1/2, (C) m=+2, (D) m=+1/2. Column-2: (a) Convex mirror, (b) Concave mirror, (c) Real image, (d) Virtual image.",
      options: [
        "A→b,c; B→b,c; C→b,d; D→a,d",
        "A→a,c; B→a,d; C→a,b; D→c,d",
        "A→a,d; B→b,c; C→b,d; D→b,c",
        "A→c,d; B→b,d; C→b,c; D→a,d",
      ],
      correctIndex: 0,
      solution:
        "For mirrors, negative magnification always means a REAL image, and positive magnification always means a VIRTUAL image. Also, only a concave mirror can produce magnitude-greater-than-1 magnification (whether real with m=−2, or virtual with m=+2); a convex mirror always demagnifies (|m|<1) and always gives a virtual image. So: A(m=−2)→concave, real; B(m=−1/2)→concave, real (small real image, e.g. object beyond centre of curvature); C(m=+2)→concave, virtual (object between focus and pole); D(m=+1/2)→convex, virtual. This matches A→b,c; B→b,c; C→b,d; D→a,d.",
    },
    {
      exam: "NEET-II 2016 [Q35]",
      question:
        "Two identical equiconvex glass lenses (refractive index 3/2) of focal length f each are kept in contact. The space between the two lenses is filled with water (refractive index 4/3). What is the focal length of the combination?",
      options: ["4f/3", "3f/4", "f/3", "f"],
      correctIndex: 1,
      solution:
        "Treating this as four refracting surfaces and carefully tracking sign conventions for each curved interface (two glass-air surfaces at the outer ends contributing 0.5/f each, and two glass-water surfaces at the shared centre each contributing 1/(6f)): total power P = 0.5/f + 1/(6f) + 1/(6f) + 0.5/f = 1/f + 1/(3f) = 4/(3f), giving f(combination) = 3f/4.",
    },
    {
      exam: "NEET-II 2016 [Q36]",
      question:
        "An air bubble inside a glass slab of refractive index 1.5 appears to be 5 cm deep when viewed from one face, and 3 cm deep when viewed from the opposite face. What is the thickness of the slab?",
      options: ["12 cm", "16 cm", "8 cm", "10 cm"],
      correctIndex: 0,
      solution:
        "Real depth from each side = apparent depth × n (viewing from a rarer medium into a denser one). Real depth from side 1: 5×1.5=7.5 cm. Real depth from side 2: 3×1.5=4.5 cm. Total thickness = 7.5+4.5 = 12 cm.",
    },
    {
      exam: "NEET-II 2016 [Q37]",
      question:
        "A person can see clearly only between 50 cm and 400 cm from their eyes. To increase the maximum distance of distinct vision to infinity, what type and power of corrective lens is needed?",
      options: [
        "concave, −0.2 diopter",
        "convex, +0.15 diopter",
        "convex, +2.25 diopter",
        "concave, −0.25 diopter",
      ],
      correctIndex: 3,
      solution:
        "A diverging (concave) lens is needed to form a virtual image of a distant object at the person's actual far point (400 cm = 4 m). Using 1/v−1/u=1/f with u=−∞, v=−4m: f=−4m. Power = 1/f = −0.25 D.",
    },
    {
      exam: "AIIMS 2016 [Q38]",
      question:
        "In a compound microscope, the focal length of the objective and eyepiece are 4 cm and 8 cm respectively. If the tube length is 30 cm, what is the magnifying power for normal adjustment?",
      options: ["20.3", "14.06", "23.43", "15.3"],
      correctIndex: 1,
      solution:
        "For normal adjustment, v(o) = L−f(e) = 30−8 = 22 cm. Using the lens formula to find u(o): 1/22−1/u(o)=1/4, giving u(o)≈−4.889cm. Objective magnification: m(o)=v(o)/u(o)≈−4.5. Total magnifying power: M=m(o)×(D/f(e))=4.5×(25/8)≈14.06.",
    },
    {
      exam: "AIIMS 2016 [Q39] (reduced confidence — see note)",
      question:
        "A container is filled with water (refractive index 4/3) up to a height of 1 m, with a point source at the bottom. Find the diameter of the disc at the top water surface through which light escapes.",
      options: ["1/√7 m", "2/√7 m", "6/√7 m", "3/√7 m"],
      correctIndex: 2,
      solution:
        "[The circle-of-illumination geometry is standard, but I flag the specific numeric substitution for a second check.] Light escapes only within a circle whose radius equals h×tanθc, where θc is the critical angle: sinθc=1/n=3/4, so cosθc=√(1−9/16)=√7/4, and tanθc=3/√7. Radius = 1×(3/√7) = 3/√7 m. Diameter = 2×(3/√7) = 6/√7 m.",
    },
    {
      exam: "AIIMS 2016 [Q40]",
      question:
        "The angular magnification of a telescope is 30. If all the light passing through the objective lens (diameter 80 cm) also passes through the eyepiece lens, what is the diameter of the eyepiece lens?",
      options: ["1/4 cm", "3/8 cm", "8/3 cm", "1/5 cm"],
      correctIndex: 2,
      solution:
        "For all the light gathered by the objective to also pass through the eyepiece, the ratio of their diameters must equal the angular magnification: D(o)/D(e) = M, so D(e) = D(o)/M = 80/30 = 8/3 cm.",
    },
    {
      exam: "NEET(UG) 2017 [Q41]",
      question:
        "Light enters a slab at an angle of 60° with the normal (as shown), and undergoes total internal reflection at a perpendicular face inside the slab. What is the minimum refractive index of the slab for this to occur?",
      options: ["1.72", "1.52", "1.32", "1.12"],
      correctIndex: 2,
      solution:
        "Let r be the refraction angle at the entry face: sin60° = n sinr. At the perpendicular side face, the angle of incidence is (90°−r); for TIR to just occur (minimum n), this equals the critical angle θc: 90°−r=θc, so r=90°−θc, giving sinr=cosθc. Also sinθc=1/n, so cosθc=√(1−1/n²). Substituting into Snell's law: sin60°=n√(1−1/n²)=√(n²−1). Squaring: 3/4=n²−1, so n²=7/4, giving n=√7/2≈1.32.",
    },
    {
      exam: "NEET(UG) 2017 [Q42]",
      question:
        "A converging combination of two lenses has a focal length of 20 cm. The ratio of their dispersive powers is 2:3. What is one of the focal lengths?",
      options: ["6 cm", "−10 cm", "−15 cm", "20 cm"],
      correctIndex: 1,
      solution:
        "For an achromatic combination, f₁/f₂ = −ω₁/ω₂ = −2/3. Let f₁=2k, f₂=−3k. Combined power: 1/f₁+1/f₂ = 1/(2k)−1/(3k) = 1/(6k) = 1/20, giving k=10/3. So f₂ = −3×(10/3) = −10 cm.",
    },
    {
      exam: "NEET(UG) 2017 [Q43]",
      question:
        "A beam of light from a source L is incident normally on a plane mirror fixed at distance x from the source, reflecting back as a spot on a scale placed just above the source. When the mirror is rotated through a small angle θ, the spot moves a distance y on the scale. What is θ in terms of x and y?",
      options: ["y/x", "x/2y", "x/y", "y/2x"],
      correctIndex: 3,
      solution:
        "When a mirror rotates by θ, the reflected ray rotates by 2θ (a standard optical-lever result). For small angles, the spot's displacement y relates to the rotation via y ≈ x×(2θ), giving θ = y/(2x).",
    },
    {
      exam: "NEET(UG) 2017 [Q44]",
      question:
        "A thin prism with refracting angle 10° is made of glass with refractive index 1.42. This prism is combined with another thin prism of refractive index 1.7, producing dispersion without deviation. What should the refracting angle of the second prism be?",
      options: ["6°", "8°", "10°", "4°"],
      correctIndex: 0,
      solution:
        "For zero net deviation: A₂ = A₁(n₁−1)/(n₂−1) = 10×0.42/0.7 = 10×0.6 = 6°.",
    },
    {
      exam: "AIIMS 2017 [Q45]",
      question:
        "The power of spectacle lens required for a person is −5 dioptre, with a 2 cm separation between the spectacles and eye. What power of contact lens would this person require?",
      options: ["−5.25 D", "−4.54 D", "−3.2 D", "−5.75 D"],
      correctIndex: 1,
      solution:
        "Using the power-adjustment-for-distance formula: P(contact) = P(spectacle)/(1−d×P(spectacle)), with d=0.02m: P(contact) = (−5)/(1−0.02×(−5)) = (−5)/(1.1) ≈ −4.54 D.",
    },
    {
      exam: "NEET(UG) 2018 [Q46]",
      question:
        "The refractive index of a prism's material is √2, and the prism angle is 30°. One of the refracting surfaces is silvered inward. A beam of monochromatic light entering from the other face will retrace its path (after reflecting off the silvered surface) if its angle of incidence on the prism is:",
      options: ["60°", "45°", "30°", "zero"],
      correctIndex: 1,
      solution:
        "For the ray to retrace its path, it must hit the silvered surface perpendicularly, requiring the refraction angle at the entry face to equal the full prism angle: r₁=A=30°. By Snell's law: sin(i) = n sin(r₁) = √2 × sin(30°) = √2 × 0.5 ≈ 0.707. So i = sin⁻¹(0.707) = 45°.",
    },
    {
      exam: "NEET(UG) 2018 [Q47]",
      question:
        "An object is placed 40 cm from a concave mirror of focal length 15 cm. If the object is moved 20 cm closer to the mirror, what is the displacement of the image?",
      options: [
        "30 cm away from the mirror",
        "36 cm away from the mirror",
        "30 cm towards the mirror",
        "36 cm towards the mirror",
      ],
      correctIndex: 1,
      solution:
        "Initial position (u₁=−40cm): 1/v₁=−1/15+1/40=−5/120=−1/24, giving v₁=−24cm. New position (u₂=−20cm): 1/v₂=−1/15+1/20=−1/60, giving v₂=−60cm. Displacement = |v₂−v₁| = |−60−(−24)| = 36 cm, and since the image moves from −24cm to −60cm (further from the mirror), it moves away from the mirror.",
    },
    {
      exam: "AIIMS 2018 [Q48]",
      question:
        "The focal length of a magnifying lens is 5 cm. What is the maximum magnification possible?",
      options: ["4", "5", "6", "7"],
      correctIndex: 2,
      solution:
        "Maximum magnification (image formed at the near point, D=25cm): M(max) = 1+D/f = 1+25/5 = 1+5 = 6.",
    },
    {
      exam: "AIIMS 2018 [Q49]",
      question:
        "Which of the following produces a virtual image?",
      options: ["lens camera", "cinema projector", "simple microscope", "slide projector"],
      correctIndex: 2,
      solution:
        "A lens camera, cinema projector, and slide projector all form real images (on film or a screen). A simple microscope forms a magnified, virtual image for direct viewing by the eye — it's the only device in this list that produces a virtual image.",
    },
    {
      exam: "AIIMS 2018 [Q50] (reduced confidence — see note)",
      question:
        "Two converging lenses, each of focal length 40 cm, are placed 20 cm apart, with an object placed before the first lens as shown in the figure. Find the position of the final image measured from point O.",
      options: ["−24 cm", "−120 cm", "−40 cm", "−20 cm"],
      correctIndex: 0,
      solution:
        "[REDUCED CONFIDENCE] The source answer key gives −24 cm, so correctIndex has been set to 0. The general method: apply the lens formula sequentially — find the image from the first lens, then treat that image as the object for the second lens (accounting for the 20 cm separation), and find the final image position relative to O. The exact starting object distance shown in the figure could not be confidently reconstructed from the scan, so the specific intermediate calculation should be re-verified.",
    },
    {
      exam: "AIIMS 2018 [Q51]",
      question:
        "The focal length of an eye is 2 cm. In combination with a corrective lens, the effective focal length becomes 2.5 cm. What is the focal length of the corrective lens?",
      options: ["−10 cm", "−15 cm", "−5 cm", "−20 cm"],
      correctIndex: 0,
      solution:
        "Combining powers: 1/2.5 = 1/2 + 1/f(lens). So 0.4 = 0.5 + 1/f(lens), giving 1/f(lens) = −0.1, so f(lens) = −10 cm.",
    },
    {
      exam: "AIIMS 2018 [Q52]",
      question:
        "The focal length of the objective of a compound microscope is 4 mm, and the image is formed 224 mm from it. If the angular magnification is 550, what is the focal length of the eyepiece for normal adjustment?",
      options: ["2.5 cm", "3 cm", "5 cm", "10 cm"],
      correctIndex: 0,
      solution:
        "First find the objective's own magnification: using 1/224−1/u(o)=1/4, u(o)≈−4.073mm, giving m(o)=v(o)/u(o)≈−55. Total magnification M=m(o)×(D/f(e))=550, so D/f(e)=550/55=10. With D=250mm: f(e)=250/10=25mm=2.5cm.",
    },
    {
      exam: "AIIMS 2018 [Q53] (reduced confidence — see note)",
      question:
        "In the arrangement shown, an object is viewed through a system with a lens of focal length 1 m followed (90 cm away) by a lens of focal length 8 cm, with the object roughly 50 m away. Find the linear magnification produced by this system.",
      options: ["0.04", "0.01", "0.02", "0.03"],
      correctIndex: 0,
      solution:
        "[REDUCED CONFIDENCE] The source answer key gives 0.04, so correctIndex has been set to 0. The general method: since the object is very far compared to the first lens's focal length, its image forms essentially at the first lens's focal point; this image then acts as the object for the second lens (accounting for the 90 cm separation), and the overall linear magnification is the product of the two individual magnifications. The exact object distance and lens arrangement shown in the figure could not be fully confirmed from the scan, so the specific intermediate values should be re-verified.",
    },
    {
      exam: "AIIMS 2018 [Q54]",
      question:
        "A ray of light travels from water into an unknown medium, with the angle in water being 60° and the angle in the unknown medium being 45° (as shown). If the refractive index of water is 4/3, what is the refractive index of the unknown medium?",
      options: ["1.4", "1.73", "1.43", "1.63"],
      correctIndex: 3,
      solution:
        "By Snell's law at the interface: n(water)×sin60° = n(medium)×sin45°. So n(medium) = (4/3)×(√3/2)/(√2/2) = (4/3)×(√3/√2) = (4√3)/(3√2). Rationalizing: = (4√6)/6 = (2√6)/3 ≈ (2×2.449)/3 ≈ 1.63.",
    },
    {
      exam: "AIIMS 2018 [Q55]",
      question:
        "The exposure time of a camera is 8 ms at f-number 5.6. What should the exposure time be at f-number 8?",
      options: ["2 ms", "16.32 ms", "8 ms", "4 ms"],
      correctIndex: 1,
      solution:
        "Exposure time is proportional to the square of the f-number (since light intensity ∝ 1/(f-number)²). t₂ = t₁×(N₂/N₁)² = 8×(8/5.6)² = 8×(1.4286)² ≈ 8×2.041 ≈ 16.32 ms.",
    },
  ],
};

