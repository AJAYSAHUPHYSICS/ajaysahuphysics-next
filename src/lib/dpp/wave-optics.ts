import type { ChapterDpp } from "./kinematics";

export const waveOpticsDpp: ChapterDpp = {
  chapterName: "Wave Optics",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "In a Young's double slit experiment, the slit separation is 0.5 mm, the screen is 1 m away, and light of wavelength 5000 Å is used. What is the fringe width?",
      options: ["0.5 mm", "1.0 mm", "1.5 mm", "2.0 mm"],
      correctIndex: 1,
      solution: "β = λD/d = (5000×10⁻¹⁰ × 1)/(0.5×10⁻³) = 1.0×10⁻³ m = 1.0 mm.",
    },
    {
      number: 2,
      question:
        "For the same setup as the previous question (β = 1.0 mm), at what distance from the central fringe does the 3rd bright fringe appear?",
      options: ["1.0 mm", "2.0 mm", "3.0 mm", "4.0 mm"],
      correctIndex: 2,
      solution: "yₙ = nλD/d = n×β. For n = 3: y₃ = 3×1.0 mm = 3.0 mm.",
    },
    {
      number: 3,
      question:
        "For the same setup (λ = 5000 Å, d = 0.5 mm, D = 1 m), at what distance from the centre does the 2nd dark fringe appear?",
      options: ["0.5 mm", "1.0 mm", "1.5 mm", "2.5 mm"],
      correctIndex: 2,
      solution:
        "yₘ = (2m−1)λD/2d, for the mth dark fringe. For m=2: y = (3)(5000×10⁻¹⁰)(1)/(2×0.5×10⁻³) = 1.5×10⁻³ m = 1.5 mm.",
    },
    {
      number: 4,
      question:
        "Two coherent sources have intensities in the ratio I₁:I₂ = 1:4. What is the ratio of maximum to minimum intensity, I(max):I(min), in the resulting interference pattern?",
      options: ["1 : 1", "2 : 1", "4 : 1", "9 : 1"],
      correctIndex: 3,
      solution:
        "I(max) = (√I₁+√I₂)² and I(min) = (√I₂−√I₁)². With I₁=1, I₂=4: √I₁=1, √I₂=2. I(max)=(1+2)²=9. I(min)=(2−1)²=1. Ratio = 9:1.",
    },
    {
      number: 5,
      question:
        "In a YDSE setup with d = 0.5 mm and D = 1 m, a thin transparent slab of refractive index 1.5 and thickness 10 μm is placed over one slit. By how much does the central fringe shift?",
      options: ["1 mm", "5 mm", "10 mm", "15 mm"],
      correctIndex: 2,
      solution: "x = D(μ−1)t/d = 1×(0.5)×(10×10⁻⁶)/(0.5×10⁻³) = 1×0.5×10⁻⁵/0.5×10⁻³ = 1×10⁻² m = 10 mm.",
    },
    {
      number: 6,
      question:
        "A slab of refractive index 1.6 and thickness 3 μm is placed over one slit in a YDSE setup using light of wavelength 6000 Å. How many fringes does the pattern shift by?",
      options: ["1", "2", "3", "5"],
      correctIndex: 2,
      solution: "N = (μ−1)t/λ = (0.6)(3×10⁻⁶)/(6000×10⁻¹⁰) = (1.8×10⁻⁶)/(6×10⁻⁷) = 3.",
    },
    {
      number: 7,
      question:
        "In single-slit Fraunhofer diffraction, a slit of width 0.2 mm is illuminated by light of wavelength 6000 Å, with the screen 1 m away. What is the width of the central maximum?",
      options: ["3 mm", "6 mm", "9 mm", "12 mm"],
      correctIndex: 1,
      solution: "w(x) = 2λD/a = 2×(6000×10⁻¹⁰)(1)/(0.2×10⁻³) = 2×3×10⁻³ = 6×10⁻³ m = 6 mm.",
    },
    {
      number: 8,
      question:
        "For the same single-slit setup (a = 0.2 mm, λ = 6000 Å, D = 1 m), at what distance from the centre does the 3rd minimum occur?",
      options: ["3 mm", "6 mm", "9 mm", "12 mm"],
      correctIndex: 2,
      solution: "xₙ = nλD/a. For n=3: x₃ = 3×(6000×10⁻¹⁰)(1)/(0.2×10⁻³) = 3×3×10⁻³ = 9×10⁻³ m = 9 mm.",
    },
    {
      number: 9,
      question:
        "A telescope has an objective lens of diameter 10 cm and is used with light of wavelength 5500 Å. What is its resolving limit (the minimum angular separation it can resolve)?",
      options: ["3.36 × 10⁻⁶ rad", "6.71 × 10⁻⁶ rad", "1.22 × 10⁻⁵ rad", "6.71 × 10⁻⁵ rad"],
      correctIndex: 1,
      solution: "δθ = 1.22λ/a = 1.22×(5500×10⁻¹⁰)/(0.1) = 1.22×5.5×10⁻⁶ ≈ 6.71×10⁻⁶ rad.",
    },
    {
      number: 10,
      question:
        "A microscope objective has a refractive index of the medium μ = 1.5 and sinθ = 0.9 (giving numerical aperture NA = μsinθ), used with light of wavelength 5000 Å. What is its resolving limit?",
      options: ["0.11 μm", "0.23 μm", "0.45 μm", "0.68 μm"],
      correctIndex: 1,
      solution: "NA = μsinθ = 1.5×0.9 = 1.35. RL = 1.22λ/(2×NA) = 1.22×(5000×10⁻¹⁰)/(2×1.35) ≈ 2.26×10⁻⁷ m ≈ 0.23 μm.",
    },
    {
      number: 11,
      question:
        "Completely plane-polarised light of intensity 8 W/m² passes through an analyser whose transmission axis is at 30° to the plane of polarisation. What is the transmitted intensity?",
      options: ["2 W/m²", "4 W/m²", "6 W/m²", "8 W/m²"],
      correctIndex: 2,
      solution: "By Malus's law: I = I₀cos²θ = 8×cos²30° = 8×(√3/2)² = 8×0.75 = 6 W/m².",
    },
    {
      number: 12,
      question:
        "Unpolarised light of intensity 20 W/m² passes first through a polariser, then through an analyser whose axis is at 60° to the polariser's axis. What is the final transmitted intensity?",
      options: ["1.25 W/m²", "2.5 W/m²", "5 W/m²", "10 W/m²"],
      correctIndex: 1,
      solution:
        "The polariser halves unpolarised light: I₀ = 20/2 = 10 W/m². The analyser then applies Malus's law: I = I₀cos²60° = 10×(0.5)² = 10×0.25 = 2.5 W/m².",
    },
    {
      number: 13,
      question:
        "Light travelling in air is incident on a glass surface of refractive index √3. What is the polarising (Brewster's) angle for this interface?",
      options: ["30°", "45°", "53°", "60°"],
      correctIndex: 3,
      solution: "Brewster's law: μ = tanθ(p). tanθ(p) = √3 ⟹ θ(p) = 60°.",
    },
    {
      number: 14,
      question:
        "For a certain glass-air interface, the polarising angle is 53°. Using the relation between Brewster's angle and the critical angle for total internal reflection at the same interface, what is the critical angle?",
      options: ["27°", "37°", "43°", "53°"],
      correctIndex: 1,
      solution:
        "Since θ(p) + θ(r) = 90° and sinθ(c) = 1/μ = cosθ(p)/sinθ(p), we get sinθ(c) = cosθ(p). With θ(p)=53°: sinθ(c) = cos53° = sin37°, so θ(c) = 37°.",
    },
    {
      number: 15,
      question:
        "A YDSE apparatus in air produces a fringe width of 0.6 mm. If the entire apparatus is now immersed in a liquid of refractive index 4/3 (keeping all other quantities unchanged), what is the new fringe width?",
      options: ["0.30 mm", "0.45 mm", "0.60 mm", "0.80 mm"],
      correctIndex: 1,
      solution: "In a medium, λ′ = λ/μ, so β′ = β/μ = 0.6/(4/3) = 0.6×(3/4) = 0.45 mm.",
    },
    {
      number: 16,
      question:
        "Young's double slit experiment is an example of obtaining coherent sources by 'division of wavefront'. Which of the following is instead an example of 'division of amplitude'?",
      options: [
        "Fresnel's biprism",
        "Lloyd's mirror",
        "Thin film (soap bubble) interference",
        "The two slits in YDSE itself",
      ],
      correctIndex: 2,
      solution:
        "Division of amplitude splits a single beam's amplitude at a partially reflecting surface (part reflected, part transmitted) — thin film interference (and Newton's rings, Michelson interferometer) work this way. YDSE, Fresnel's biprism, and Lloyd's mirror all instead split the wavefront itself.",
    },
    {
      number: 17,
      question:
        "Which statement correctly distinguishes an interference pattern (YDSE) from a single-slit diffraction pattern?",
      options: [
        "Interference fringes are all equally bright and equally wide; diffraction fringes have a much wider, brighter central maximum with progressively weaker secondary maxima",
        "Diffraction fringes are all equally bright and equally wide; interference fringes are not",
        "Both patterns always have identical fringe widths and identical intensities",
        "Interference occurs only with white light, diffraction only with monochromatic light",
      ],
      correctIndex: 0,
      solution:
        "In YDSE (two coherent sources), all bright fringes have equal width and equal intensity. In single-slit diffraction (many secondary wavelets from the same wavefront), the central maximum is twice as wide as the secondary maxima and far more intense, with intensity dropping off rapidly away from the centre.",
    },
    {
      number: 18,
      question:
        "How does the intensity of light vary with distance r from the source, for a spherical wavefront versus a plane wavefront?",
      options: [
        "Spherical: I ∝ 1/r². Plane: I = constant",
        "Spherical: I ∝ 1/r. Plane: I ∝ 1/r²",
        "Both fall off as 1/r²",
        "Both remain constant with distance",
      ],
      correctIndex: 0,
      solution:
        "A spherical wavefront (point source) has amplitude A ∝ 1/r, so intensity I ∝ A² ∝ 1/r². A plane wavefront (distant or extended source) has constant amplitude and hence constant intensity, independent of distance.",
    },
    {
      number: 19,
      question:
        "In a YDSE setup, an additional path difference of λ/2 (a phase difference of π) is introduced in the beam from one slit, using a thin transparent film. What happens to the pattern at the centre of the screen (the point originally showing a bright fringe)?",
      options: [
        "It remains bright, unaffected",
        "It becomes completely dark",
        "The entire pattern disappears",
        "It becomes twice as bright",
      ],
      correctIndex: 1,
      solution:
        "Originally the path difference at the centre was zero (bright fringe). Adding an extra λ/2 path difference to one beam makes the net path difference at that point equal to λ/2 — the condition for destructive interference — so the centre becomes dark, and the whole fringe pattern shifts accordingly.",
    },
    {
      number: 20,
      question:
        "In a running YDSE experiment showing clear interference fringes, one of the two slits is suddenly covered (closed). What happens to the pattern on the screen?",
      options: [
        "The interference fringes remain exactly the same",
        "The fringes double in number",
        "The interference pattern disappears, replaced by a single broad diffraction pattern from the remaining open slit",
        "The screen goes completely dark",
      ],
      correctIndex: 2,
      solution:
        "Interference requires two coherent sources superposing. With only one slit open, there is nothing to interfere with — the sharp bright/dark interference fringes vanish, and what remains is the single-slit diffraction pattern of the one open slit: a broad central maximum with much weaker secondary maxima.",
    },
  ],
};
