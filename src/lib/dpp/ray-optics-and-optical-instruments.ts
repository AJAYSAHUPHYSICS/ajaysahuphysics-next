import type { ChapterDpp } from "./kinematics";

export const rayOpticsAndOpticalInstrumentsDpp: ChapterDpp = {
  chapterName: "Ray Optics & Optical Instruments",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "A boy of height 1.7 m, with his eyes 1.6 m above the floor, stands in front of a plane mirror fixed on a wall. What is the minimum length of the mirror required for him to see his complete image?",
      options: ["0.8 m", "0.85 m", "1.6 m", "1.7 m"],
      correctIndex: 1,
      solution:
        "Minimum mirror length to see the full image = h/2, independent of eye position or distance from the mirror. So L_min = 1.7/2 = 0.85 m.",
    },
    {
      number: 2,
      question:
        "Two plane mirrors are inclined to each other at 60°, with a point object placed exactly on the bisector between them. How many images are formed?",
      options: ["4", "5", "6", "7"],
      correctIndex: 1,
      solution:
        "360°/θ = 360/60 = 6, which is even, so n = m − 1 = 6 − 1 = 5 images (this rule applies regardless of whether the object is on the bisector when m is even).",
    },
    {
      number: 3,
      question:
        "A man walks directly towards a stationary plane mirror at a speed of 3 m/s. At what rate does the distance between the man and his image decrease?",
      options: ["1.5 m/s", "3 m/s", "6 m/s", "9 m/s"],
      correctIndex: 2,
      solution:
        "For a stationary plane mirror, the image approaches the mirror at the same speed as the object (3 m/s). So the man and his image close the gap between them at 3 + 3 = 6 m/s.",
    },
    {
      number: 4,
      question:
        "An object is placed 30 cm in front of a concave mirror of focal length 20 cm. Find the position and nature of the image.",
      options: [
        "60 cm in front of the mirror, real, inverted, magnified 2×",
        "12 cm behind the mirror, virtual, erect, diminished",
        "60 cm behind the mirror, virtual, erect, magnified 2×",
        "12 cm in front of the mirror, real, inverted, diminished",
      ],
      correctIndex: 0,
      solution:
        "Using 1/v + 1/u = 1/f with f = −20 cm, u = −30 cm: 1/v = 1/(−20) − 1/(−30) = −1/60, so v = −60 cm. m = −v/u = −(−60)/(−30) = −2. Image is real, inverted, 2× magnified, 60 cm in front of the mirror (object lies between C and F).",
    },
    {
      number: 5,
      question:
        "An object is placed 30 cm in front of a convex mirror of focal length 15 cm. Find the position and nature of the image.",
      options: [
        "10 cm behind the mirror, virtual, erect, m = 1/3",
        "10 cm in front of the mirror, real, inverted, m = 1/3",
        "30 cm behind the mirror, virtual, erect, m = 1",
        "10 cm behind the mirror, virtual, inverted, m = 1/3",
      ],
      correctIndex: 0,
      solution:
        "Using 1/v + 1/u = 1/f with f = +15 cm, u = −30 cm: 1/v = 1/15 − 1/(−30) = 1/10, so v = +10 cm. m = −v/u = −10/(−30) = +1/3. Image is virtual, erect, diminished (m = 1/3), 10 cm behind the mirror — as expected for a convex mirror with any real object.",
    },
    {
      number: 6,
      question:
        "For a spherical mirror of focal length 15 cm, the image of an object is formed at a distance of 5 cm from the focus (measured from the focus, on the object side). Using Newton's formula, find the distance of the image from the focus on the other side.",
      options: ["30 cm", "45 cm", "60 cm", "75 cm"],
      correctIndex: 1,
      solution:
        "Newton's formula: x₁x₂ = f². Here f = 15 cm, x₁ = 5 cm, so x₂ = f²/x₁ = 225/5 = 45 cm.",
    },
    {
      number: 7,
      question:
        "A ray of light travelling in air is incident on a water surface (μ_water = 4/3) at an angle of incidence of 53° (sin 53° = 0.8). What is the angle of refraction?",
      options: ["30°", "37°", "45°", "53°"],
      correctIndex: 1,
      solution:
        "By Snell's law, sin i = μ sin r ⟹ sin r = sin i/μ = 0.8/(4/3) = 0.6, so r = sin⁻¹(0.6) = 37°. The ray bends towards the normal on entering the denser medium, as expected.",
    },
    {
      number: 8,
      question:
        "A tank is filled with a liquid of refractive index 1.5 to a depth of 12 cm. What is the apparent depth of an object lying at the bottom, when viewed from directly above?",
      options: ["6 cm", "8 cm", "9 cm", "18 cm"],
      correctIndex: 1,
      solution:
        "Apparent depth = actual depth/μ (viewing a denser medium from a rarer one) = 12/1.5 = 8 cm.",
    },
    {
      number: 9,
      question:
        "A glass slab of thickness 6 cm and refractive index 1.5 is placed over a printed page. By how much does the page appear to be shifted (towards the slab)?",
      options: ["1 cm", "2 cm", "3 cm", "4 cm"],
      correctIndex: 1,
      solution:
        "Normal shift due to a slab: x = t(1 − 1/μ) = 6 × (1 − 1/1.5) = 6 × (1/3) = 2 cm.",
    },
    {
      number: 10,
      question:
        "Find the critical angle for a glass–air interface if the refractive index of the glass is √2.",
      options: ["30°", "37°", "45°", "60°"],
      correctIndex: 2,
      solution:
        "sin θ_C = μ_R/μ_D = 1/√2, so θ_C = sin⁻¹(1/√2) = 45°.",
    },
    {
      number: 11,
      question:
        "Taking the refractive index of diamond to be 2.5, what is the speed of light inside a diamond? (c = 3 × 10⁸ m/s)",
      options: ["1.0 × 10⁸ m/s", "1.2 × 10⁸ m/s", "1.5 × 10⁸ m/s", "2.0 × 10⁸ m/s"],
      correctIndex: 1,
      solution:
        "μ = c/v ⟹ v = c/μ = (3 × 10⁸)/2.5 = 1.2 × 10⁸ m/s.",
    },
    {
      number: 12,
      question:
        "A point object is placed in air at a distance of 40 cm from the pole of a convex spherical glass surface (R = 20 cm, μ_glass = 1.5). Where is the image formed?",
      options: [
        "At infinity",
        "20 cm inside the glass",
        "40 cm inside the glass",
        "20 cm in front of the surface, in air",
      ],
      correctIndex: 0,
      solution:
        "Using μ₂/v − μ₁/u = (μ₂−μ₁)/R with μ₁ = 1, μ₂ = 1.5, R = +20, u = −40: μ₂/v = (0.5/20) + (1/−40) = 0.025 − 0.025 = 0, so v → ∞. This is no coincidence: u = −40 cm is exactly the first focal length f₁ = μ₁R/(μ₂−μ₁) = (1×20)/0.5 = 40 cm, so by definition the image forms at infinity.",
    },
    {
      number: 13,
      question:
        "An equiconvex lens has both radii of curvature equal to 20 cm and is made of glass of refractive index 1.5. What is its focal length?",
      options: ["10 cm", "20 cm", "30 cm", "40 cm"],
      correctIndex: 1,
      solution:
        "1/f = (μ−1)(1/R₁ − 1/R₂). For an equiconvex lens, R₁ = +20 cm, R₂ = −20 cm: 1/f = 0.5 × (1/20 − 1/(−20)) = 0.5 × (1/10) = 1/20, so f = 20 cm.",
    },
    {
      number: 14,
      question:
        "An object is placed 15 cm in front of a convex lens of focal length 10 cm. Find the position and magnification of the image.",
      options: [
        "30 cm, real, inverted, m = −2",
        "30 cm, virtual, erect, m = +2",
        "6 cm, real, inverted, m = −0.4",
        "10 cm, real, inverted, m = −1",
      ],
      correctIndex: 0,
      solution:
        "Using 1/v − 1/u = 1/f with f = 10 cm, u = −15 cm: 1/v = 1/10 + 1/(−15) = 1/30, so v = +30 cm. m = v/u = 30/(−15) = −2. Image is real, inverted, and magnified 2×, 30 cm from the lens (object lies between F and 2F, as expected for this image type).",
    },
    {
      number: 15,
      question:
        "An object is placed 30 cm in front of a concave lens of focal length 20 cm. Find the position and magnification of the image.",
      options: [
        "12 cm, virtual, erect, m = +0.4",
        "12 cm, real, inverted, m = −0.4",
        "50 cm, virtual, erect, m = +1.67",
        "7.5 cm, virtual, erect, m = +0.25",
      ],
      correctIndex: 0,
      solution:
        "Using 1/v − 1/u = 1/f with f = −20 cm, u = −30 cm: 1/v = 1/(−20) + 1/(−30) = −1/12, so v = −12 cm. m = v/u = (−12)/(−30) = +0.4. Image is virtual, erect, diminished — exactly as expected, since a concave lens never forms a real or magnified image of a real object.",
    },
    {
      number: 16,
      question:
        "A convex lens of focal length 20 cm is placed in contact with a concave lens of focal length 25 cm. What is the focal length of the combination?",
      options: ["45 cm", "100 cm", "1 cm", "5 cm"],
      correctIndex: 1,
      solution:
        "P₁ = 100/20 = +5 D, P₂ = 100/(−25) = −4 D. Net power P = P₁ + P₂ = +1 D. Focal length F = 100/P = 100 cm.",
    },
    {
      number: 17,
      question:
        "An equilateral glass prism (A = 60°) has a refractive index of 1.5. What is the angle of minimum deviation? (Use sin 48.6° ≈ 0.75)",
      options: ["20°", "30°", "37°", "45°"],
      correctIndex: 2,
      solution:
        "At minimum deviation, μ = sin[(A+δ_min)/2]/sin(A/2). sin(A/2) = sin 30° = 0.5, so sin[(60°+δ_min)/2] = 1.5 × 0.5 = 0.75, giving (60°+δ_min)/2 ≈ 48.6°, so δ_min ≈ 97.2° − 60° ≈ 37°.",
    },
    {
      number: 18,
      question:
        "An astronomical telescope has an objective of focal length 100 cm and an eyepiece of focal length 5 cm. What is its magnifying power when the final image is formed at infinity?",
      options: ["5", "20", "95", "105"],
      correctIndex: 1,
      solution:
        "For the final image at infinity, MP = f₀/f_e (magnitude) = 100/5 = 20.",
    },
  ],
};
