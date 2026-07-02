import type { ChapterShortNotes } from "./gravitation-short";

export const waveOpticsShortNotes: ChapterShortNotes = {
  chapterName: "Wave Optics",
  className: "12",
  groups: [
    {
      heading: "Nature of Light and Wavefronts",
      points: [
        "Newton's corpuscular theory: light = tiny particles. Explained reflection & refraction, but predicted light is faster in denser media — WRONG. Could not explain interference, diffraction, polarisation.",
        "Huygens' wave theory: light travels as a wavefront through ether. Each point on a wavefront acts as a secondary source. Correctly predicted light is slower in denser media.",
        "Wavefront: locus of all points vibrating in the same phase. Normal to wavefront = ray direction.",
        "Spherical wavefront (point source): A ∝ 1/r, I ∝ 1/r².",
        "Cylindrical wavefront (linear source): A ∝ 1/√r, I ∝ 1/r.",
        "Plane wavefront (source at ∞): A = constant, I = constant.",
        "Phase difference between any two points on the same wavefront = 0.",
      ],
    },
    {
      heading: "Interference — Core Formulas",
      points: [
        "Resultant amplitude: A = √(a₁² + a₂² + 2a₁a₂ cos φ).",
        "Resultant intensity: I = I₁ + I₂ + 2√(I₁I₂) cos φ.",
        "I_max = (√I₁ + √I₂)²;  I_min = (√I₁ − √I₂)².",
        "I_av = I₁ + I₂ (average intensity, independent of phase).",
        "Equal amplitudes (I₁ = I₂ = I₀): I_max = 4I₀,  I_min = 0,  I_av = 2I₀.",
        "Intensity ∝ slit width ∝ (amplitude)²: I₁/I₂ = w₁/w₂ = a₁²/a₂².",
        "Fringe visibility V = (I_max − I_min)/(I_max + I_min). V = 100% when I_min = 0 (equal amplitudes).",
        "Phase ↔ path: φ = (2π/λ)δ = 2π(δ/λ) = 2π(Δt/T).",
        "Constructive: δ = nλ (n = 0,1,2,...). Destructive: δ = (2n−1)λ/2 (n = 1,2,...).",
        "Interference conserves energy — redistributes it from dark to bright regions.",
      ],
    },
    {
      heading: "Young's Double Slit Experiment (YDSE)",
      points: [
        "Path difference at point P (height y): δ = yd/D.",
        "nth bright fringe: y_n = nλD/d.",
        "mth dark fringe: y_m = (2m−1)λD/2d.",
        "Fringe width: β = λD/d  (same for all fringes).",
        "Angular fringe width: α = λ/d  (independent of D).",
        "Central fringe (n=0) is always bright. Closing one slit → no interference pattern.",
        "White light: central fringe = white; nearest fringe on each side = red (longest λ, widest β); outermost visible fringe = blue.",
        "Liquid of refractive index μ: λ′ = λ/μ, so β′ = β/μ. Fringe width decreases.",
        "Increasing D: β increases, intensity decreases, α unchanged.",
        "Fringe coincidence (two λ): n₁λ₁ = n₂λ₂. Fringes in space are hyperbolae.",
      ],
    },
    {
      heading: "Thin Film / Slab in YDSE",
      points: [
        "Slab of thickness t, refractive index μ over one slit: extra path = (μ−1)t.",
        "Shift of central fringe toward the slab: x = D(μ−1)t/d = β(μ−1)t/λ.",
        "Number of fringes shifted = (μ−1)t/λ.",
        "Fringe width β is unchanged — only the pattern's position shifts.",
      ],
    },
    {
      heading: "Thin Film Interference",
      points: [
        "Division of amplitude: both reflected rays come from the same incident beam (partial reflection at each surface).",
        "Reflection from denser medium → phase change π → extra path λ/2. Reflection from rarer medium → no phase change.",
        "Reflected system — Bright: 2μt cos r = (2n+1)λ/2.  Dark: 2μt cos r = nλ.",
        "Transmitted system — Bright: 2μt cos r = nλ.  Dark: 2μt cos r = (2n+1)λ/2.",
        "Reflected and transmitted systems are complementary (one bright where the other is dark).",
        "Normal incidence (r = 0): cos r = 1, formulas simplify.",
        "Uses: wavelength measurement, refractive index measurement, holography.",
      ],
    },
    {
      heading: "Diffraction",
      points: [
        "Bending of light around edges of an obstacle or aperture into the geometrical shadow region.",
        "Condition: λ ≈ a (obstacle size ≈ wavelength). If a >> λ, light travels in straight lines.",
        "Discovered by Grimaldi; theoretically explained by Fresnel.",
        "Sound diffracts easily (λ large); light barely does (λ ~ 10⁻⁷ m); X-rays diffract in crystals (λ ~ 10⁻¹⁰ m).",
        "Fresnel distance Z_F = a²/λ: beyond this, diffraction spreading equals slit width — wave optics needed.",
      ],
    },
    {
      heading: "Single Slit Fraunhofer Diffraction",
      points: [
        "Minima: a sin θ_n = nλ → x_n = nλD/a  (n = ±1, ±2, ...).",
        "Secondary maxima: a sin θ = (2n+1)λ/2.",
        "Width of central maximum (linear): w_x = 2λD/a.",
        "Angular width of central maximum: w_θ = 2λ/a.",
        "Secondary fringe width (beyond central): β = λD/a  (half the central maximum width).",
        "Intensity decreases outward: I₀, I₀/22, I₀/61, ... for central, 1st, 2nd secondary maxima.",
        "Wider slit → narrower central maximum. Narrower slit → wider central maximum.",
        "Central maximum width ∝ λ: red light gives a wider central max than blue light.",
        "Unlike YDSE: fringes are not equally bright or equally spaced.",
      ],
    },
    {
      heading: "Resolving Power",
      points: [
        "Rayleigh's criterion: two images just resolved when central max of one falls on first min of the other.",
        "Telescope — Resolving limit: δθ = 1.22λ/a;  RP = a/(1.22λ).",
        "Microscope — Resolving limit: RL = 1.22λ/(2μ sin θ);  RP = 2μ sin θ/(1.22λ).",
        "μ sin θ = Numerical Aperture (NA). Higher NA → better resolution.",
        "Both RP ∝ 1/λ: shorter wavelength → better resolution.",
        "Resolving power ≠ magnifying power. Magnifying a blur does not resolve it.",
      ],
    },
    {
      heading: "Polarisation",
      points: [
        "Light is transverse — the electric vector E vibrates perpendicular to the direction of propagation.",
        "Unpolarised light: E vibrates symmetrically in all directions perpendicular to propagation.",
        "Plane polarised: E vibrates in one fixed direction only.",
        "Passing unpolarised light through an ideal polariser: intensity halved (I = I₀/2).",
        "Crossed polariser + analyser (θ = 90°): zero intensity.",
      ],
    },
    {
      heading: "Methods of Polarisation",
      points: [
        "Brewster's law (reflection): μ = tan θ_p. At polarising angle, reflected beam is 100% polarised; refracted beam is partially polarised. At θ_p: reflected ⊥ refracted (θ_p + θ_r = 90°).",
        "At i = 0° or 90°: reflected beam is unpolarised.",
        "Pile of glass plates (refraction): repeated reflections at Brewster's angle remove the perpendicular component; transmitted beam becomes fully polarised after enough plates.",
        "Dichroism / Polaroids: crystal absorbs one component, transmits the other. Most common practical polariser.",
        "Scattering: light scattered at 90° to the incident direction is completely polarised (explains polarised sky light).",
        "Double refraction (calcite, quartz): splits into O-ray and E-ray, both plane polarised with perpendicular vibrations. Nicol prism isolates E-ray using TIR of O-ray at canada balsam.",
      ],
    },
    {
      heading: "Law of Malus",
      points: [
        "I = I₀ cos² θ (I₀ = intensity of polarised light incident on analyser; θ = angle between axes).",
        "θ = 0°: I = I₀. θ = 45°: I = I₀/2. θ = 90°: I = 0.",
        "Unpolarised → polariser → analyser: I = (I_unpol/2) cos² θ.",
        "Malus's law applies only when the input to the analyser is already plane-polarised.",
      ],
    },
    {
      heading: "Brewster–Critical Angle Relation",
      points: [
        "μ = tan θ_p (Brewster) and sin θ_c = 1/μ (TIR critical angle).",
        "Combined: sin θ_c = cot θ_p = cos θ_p / sin θ_p.",
        "Glass μ = √3 ≈ 1.732: θ_p = 60° exactly, θ_c = 30°.",
        "Glass μ = 1.5: θ_p ≈ 56°, θ_c ≈ 42°.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "YDSE: nλD/d gives BRIGHT fringe. Single slit: nλD/a gives DARK fringe. Same formula, opposite meaning — don't swap.",
        "Thin film reflected bright: 2μt cos r = (2n+1)λ/2 (odd half-multiples, NOT even). Transmitted bright: 2μt cos r = nλ.",
        "Fringe width in YDSE changes with D and λ, but not with the number of the fringe — all fringes have the same width β.",
        "Polarisation by reflection: at θ_p the reflected beam is 100% polarised; the refracted beam is only partially polarised — NOT 100%.",
        "I₁ = I, I₂ = 4I (common NEET setup): √I₁ = √I, √I₂ = 2√I → I_max = 9I, I_min = I, ratio 9:1.",
        "Intensity ratio of slits given as w₁:w₂ = 1:9 → a₁:a₂ = 1:3 → I_min:I_max = (3−1)²:(3+1)² = 4:16 = 1:4.",
        "Angular fringe width α = λ/d is independent of screen distance D — a favourite trap in MCQs.",
      ],
    },
  ],
};
