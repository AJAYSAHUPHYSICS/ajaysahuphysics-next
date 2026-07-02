import type { ChapterNotes } from "./kinematics";

export const waveOpticsNotes: ChapterNotes = {
  chapterName: "Wave Optics",
  className: "12",
  intro:
    "Light travels as a wave — and this chapter is the proof. You will understand why two sources of the same colour produce alternating bright and dark bands, why a sharp edge bends light into the shadow, and why certain transparent crystals block half of all light. The three pillars here are interference (what happens when two waves meet), diffraction (how a wave bends around obstacles), and polarisation (the directional nature of light). These are among the most concept-heavy topics in NEET optics, but each one follows a compact set of formulas once the ideas are clear.",
  sections: [
    {
      heading: "1. Nature of Light — Newton vs Huygens",
      body:
        "Two competing theories historically described light. Newton's corpuscular theory treated light as a stream of tiny particles (corpuscles). Huygens proposed instead that light is a wave travelling through a hypothetical medium called the luminiferous ether.",
      formula: [
        { label: "Speed of light (vacuum)", expression: "c = 3 × 10⁸ m/s" },
      ],
      bullets: [
        "Newton's corpuscular theory explained reflection and refraction, but predicted (incorrectly) that light should travel faster in denser media than in rarer media — this was disproved experimentally.",
        "Corpuscular theory could not explain interference, diffraction, or polarisation.",
        "Huygens' wave theory correctly predicted that light slows down on entering a denser medium, and it explained reflection, refraction, interference, and diffraction. Its weakness: it could not explain the photoelectric effect.",
        "Modern understanding: light is an electromagnetic wave (Maxwell), but also exhibits particle behaviour (photon) in quantum phenomena like the photoelectric effect.",
        "Key principle of Huygens' wave theory — every point on a wavefront acts as a source of secondary wavelets. The envelope (tangent) of these secondary wavelets after a small time gives the new position of the wavefront.",
      ],
    },
    {
      heading: "2. Wavefront — Definition and Types",
      body:
        "A wavefront is the locus of all points of a medium that are vibrating in the same phase at a given instant. The shape of the wavefront depends on the shape of the light source.",
      formula: [
        { label: "Spherical wavefront — amplitude", expression: "A ∝ 1/r,  I ∝ 1/r²" },
        { label: "Cylindrical wavefront — amplitude", expression: "A ∝ 1/√r,  I ∝ 1/r" },
        { label: "Plane wavefront", expression: "A = constant,  I = constant" },
      ],
      bullets: [
        "Spherical wavefront: emitted by a point source. Amplitude falls as 1/r, intensity as 1/r².",
        "Cylindrical wavefront: emitted by a linear (slit) source. Amplitude falls as 1/√r.",
        "Plane wavefront: emitted by a point source at a very large (effectively infinite) distance, or by a large extended source. Amplitude and intensity remain constant.",
        "The normal to a wavefront at any point represents the direction of propagation of light (i.e., the ray) at that point.",
        "The phase difference between any two points on the same wavefront is zero.",
        "Wavefronts always travel in the forward direction; they cannot travel backward through the medium.",
      ],
    },
    {
      heading: "3. Interference of Light — Concept and Conditions",
      body:
        "When two light waves of the same frequency and a constant phase difference superpose, the resultant intensity at different points varies — some points are brighter than either wave alone (constructive) and some are darker (destructive). This redistribution is interference.",
      bullets: [
        "Constructive interference: resultant intensity greater than the sum I₁ + I₂. Occurs when the waves reinforce each other.",
        "Destructive interference: resultant intensity less than I₁ + I₂. Occurs when the waves partially or completely cancel.",
        "No energy is created or destroyed — energy is simply redistributed from points of minimum intensity to points of maximum intensity. Interference obeys the law of conservation of energy.",
        "Conditions for sustained interference: (i) both sources must be coherent (same frequency, constant phase difference); (ii) both sources must emit continuous waves of the same wavelength; (iii) separation between sources should be small; (iv) distance of screen from sources should be large; (v) amplitudes of both waves should be nearly equal for good contrast; (vi) sources should be narrow and monochromatic for many distinct fringes.",
        "Coherent sources: two sources that emit waves of the same frequency and maintain a constant phase difference. In practice they are always derived from a single primary source. Example: two slits illuminated by one bulb.",
        "Incoherent sources: two independent sources that emit the same frequency but have a randomly varying phase difference — they cannot produce a sustained interference pattern.",
        "Laser light has a very high degree of coherence — interference has even been observed between two independent laser beams.",
      ],
    },
    {
      heading: "4. Methods of Obtaining Coherent Sources",
      body:
        "Since two independent sources cannot be coherent, coherent sources are always created by splitting a single primary source into two using either division of wavefront or division of amplitude.",
      bullets: [
        "Division of wavefront: the incoming wavefront is physically split into two parts by an aperture or obstacle, and each part then acts as a secondary source. Examples: Young's double slit experiment, Fresnel's biprism, Lloyd's mirror.",
        "Division of amplitude: the amplitude of the incoming beam is split at a partially reflecting surface — one part is reflected and one is refracted. Both parts travel different paths and then recombine. Examples: thin film interference, Newton's rings, Michelson interferometer.",
        "In Young's experiment (YDSE) the two slits S₁ and S₂ are illuminated by the same primary source S — so they always vibrate in phase (zero initial phase difference). This is the standard exam setup.",
      ],
    },
    {
      heading: "5. Analysis of Interference — Resultant Amplitude and Intensity",
      body:
        "When two waves of amplitudes a₁ and a₂ with a phase difference φ between them superpose, the resultant amplitude A is found by the phasor (triangle) method.",
      formula: [
        { label: "Resultant amplitude", expression: "A = √(a₁² + a₂² + 2a₁a₂ cos φ)" },
        { label: "Resultant intensity", expression: "I = I₁ + I₂ + 2√(I₁I₂) cos φ" },
        { label: "Intensity maximum", expression: "I_max = (√I₁ + √I₂)²" },
        { label: "Intensity minimum", expression: "I_min = (√I₁ − √I₂)²" },
        { label: "Average intensity", expression: "I_av = I₁ + I₂" },
      ],
      bullets: [
        "The term 2√(I₁I₂) cos φ is the interference factor — it can add to or subtract from the sum (I₁ + I₂) depending on whether cos φ is positive or negative.",
        "When I₁ = I₂ = I₀: I_max = 4I₀ and I_min = 0. The maximum is four times any individual source's intensity — this is the ideal case of equal amplitudes.",
        "Fringe visibility (contrast): V = (I_max − I_min)/(I_max + I_min). When I_min = 0 (equal amplitudes), V = 100% — the best possible contrast.",
        "Intensity is proportional to the square of the amplitude (I ∝ A²) and also proportional to the slit width (I ∝ w). So I₁/I₂ = w₁/w₂ = a₁²/a₂².",
        "Relation between max and min: (I_max/I_min) = ((a₁ + a₂)/(a₁ − a₂))² = ((√I₁ + √I₂)/(√I₁ − √I₂))².",
      ],
    },
    {
      heading: "6. Constructive and Destructive Interference — Conditions",
      body:
        "Whether a point on the screen has maximum or minimum intensity depends on the path difference δ (or equivalently the phase difference φ) between the two waves arriving there.",
      formula: [
        { label: "Phase–path difference relation", expression: "φ = (2π/λ) δ" },
        { label: "Phase–time difference relation", expression: "φ/2π = δ/λ = Δt/T" },
        { label: "Constructive (bright)", expression: "δ = nλ   (n = 0, 1, 2, ...)" },
        { label: "Destructive (dark)", expression: "δ = (2n − 1)λ/2   (n = 1, 2, 3, ...)" },
      ],
      bullets: [
        "Constructive interference: path difference is a whole-number multiple of the wavelength → the waves arrive in phase → resultant amplitude = a₁ + a₂ (maximum).",
        "Destructive interference: path difference is an odd multiple of half the wavelength → the waves arrive exactly out of phase → resultant amplitude = |a₁ − a₂| (minimum, zero if equal amplitudes).",
        "Both conditions follow directly from the phasor: cos φ = +1 gives maximum, cos φ = −1 gives minimum.",
      ],
    },
    {
      heading: "7. Young's Double Slit Experiment (YDSE)",
      body:
        "YDSE is the classic demonstration that light is a wave. A primary slit S illuminated by a monochromatic source sends a wavefront to two narrow slits S₁ and S₂ separated by distance d. The two slits act as coherent secondary sources, and the waves they emit superpose on a screen at distance D to form alternating bright and dark fringes.",
      formula: [
        { label: "Path difference at point P (height y)", expression: "δ = yd/D" },
        { label: "Position of nth bright fringe", expression: "yₙ = nλD/d" },
        { label: "Position of mth dark fringe", expression: "yₘ = (2m − 1)λD/2d" },
        { label: "Fringe width", expression: "β = λD/d" },
        { label: "Angular fringe width", expression: "α = λ/d" },
      ],
      bullets: [
        "In YDSE the wavefront is divided — this is a division-of-wavefront arrangement.",
        "The central fringe (n = 0) is always bright, because S₁O = S₂O (path difference = 0).",
        "If white light is used as the primary source, the central fringe is white, flanked by coloured fringes. Red fringes (longer λ) lie farther from centre than blue fringes. Beyond a few fringes, the pattern becomes washed out because different colours' maxima and minima overlap.",
        "Closing one slit removes the interference pattern — a single broad diffraction pattern appears instead. This is a classic NEET conceptual question.",
        "Fringe width β is the same for all bright and dark fringes — every fringe (bright or dark) has the same width.",
        "Submerging the apparatus in a liquid of refractive index μ: λ′ = λ/μ, so β′ = β/μ. The fringe width decreases by factor μ; angular fringe width also decreases.",
        "Moving the screen farther (increasing D): fringe width β increases, but intensity of fringes decreases (since the fringes spread out). Angular fringe width α = λ/d does not change with D.",
        "When both slits have equal width, fringe visibility is 100% (I_min = 0).",
      ],
    },
    {
      heading: "8. Special Situations in YDSE",
      body:
        "Several variations of YDSE appear frequently in NEET. These deal with wavelength coincidences, shifts, and the geometry of the fringe pattern in space.",
      formula: [
        { label: "Coincidence of fringes (λ₁ vs λ₂)", expression: "n₁λ₁ = n₂λ₂" },
        { label: "Shape of fringes in space", expression: "Hyperbolic (foci at S₁ and S₂)" },
      ],
      bullets: [
        "If two wavelengths λ₁ and λ₂ are used simultaneously, they produce overlapping patterns. The minimum distance from the centre where a bright fringe from λ₁ coincides with a bright fringe from λ₂ is found from n₁λ₁ = n₂λ₂.",
        "The fringes in YDSE are actually hyperbolae in three dimensions (foci at S₁ and S₂). On a flat screen, they appear as straight lines only if the screen is at large distance.",
        "If an additional phase difference of π is introduced in one of the beams (e.g. by a thin transparent medium), the central fringe shifts toward that beam, and a dark fringe appears at the centre.",
        "The angular position of nth maximum: θₙ = nλ/d (valid for small angles, sinθ ≈ tanθ ≈ θ).",
        "Distance between n₁th and n₂th bright fringes: Δy = (n₂ − n₁) β.",
      ],
    },
    {
      heading: "9. Effect of a Thin Film Slab Placed in YDSE",
      body:
        "If a transparent slab of thickness t and refractive index μ is placed over one of the slits, it introduces an extra optical path in that arm, shifting the entire fringe pattern toward that slit.",
      formula: [
        { label: "Extra path introduced by slab", expression: "Δ = (μ − 1)t" },
        { label: "Shift of central fringe", expression: "x = D(μ − 1)t / d = β(μ − 1)t / λ" },
        { label: "Number of fringes shifted", expression: "N = (μ − 1)t / λ" },
      ],
      bullets: [
        "The central bright fringe (originally at O) moves to the side where the slab is placed, by a distance x = D(μ − 1)t/d.",
        "If two slabs of different refractive indices μ₁ and μ₂ but the same thickness t are placed over S₁ and S₂ respectively, the net path difference is D(μ₁ − μ₂)t/d.",
        "Number of fringes that shift = (μ − 1)t/λ — this can be a non-integer, meaning the shift is not always a whole number of fringe widths.",
        "The fringe width β does not change when a slab is inserted — only the position of the pattern shifts.",
      ],
    },
    {
      heading: "10. Interference in Thin Films",
      body:
        "When light falls on a thin transparent film (soap bubble, oil film on water), partial reflection occurs at both surfaces of the film. The two reflected beams travel different path lengths and interfere. This is a division-of-amplitude setup.",
      formula: [
        { label: "Effective path difference (reflected)", expression: "Δ = 2μt cos r" },
        { label: "Bright (reflected system)", expression: "2μt cos r = (2n + 1)λ/2   (n = 0,1,2,...)" },
        { label: "Dark (reflected system)", expression: "2μt cos r = nλ   (n = 0,1,2,...)" },
        { label: "Bright (transmitted system)", expression: "2μt cos r = nλ" },
        { label: "Dark (transmitted system)", expression: "2μt cos r = (2n + 1)λ/2" },
      ],
      bullets: [
        "When light reflects from an optically denser medium, it undergoes a phase change of π (equivalent to an extra path of λ/2). Reflection from the top surface of the film (air → film) introduces this λ/2 shift; reflection from the bottom surface (film → air) does not. Net result: reflected beams have an effective path difference of 2μt cos r − λ/2.",
        "Reflected and transmitted systems are complementary — where the reflected beam is bright, the transmitted beam is dark, and vice versa.",
        "Colours in thin films: when white light falls on a soap film or oil slick, each colour (wavelength) satisfies the bright condition at a different thickness, so different colours are reflected from different parts of the film — giving the rainbow pattern.",
        "For normal incidence, r = 0 and cos r = 1, simplifying all formulas.",
        "Uses: precise measurement of wavelength; measuring refractive index or thickness of a transparent film; 3-D holography.",
      ],
    },
    {
      heading: "11. Diffraction of Light",
      body:
        "Diffraction is the bending of light around the edges of an obstacle or aperture and its spreading into the region of the geometrical shadow. It was first observed by Grimaldi and theoretically explained by Fresnel.",
      formula: [
        { label: "Condition for diffraction", expression: "λ ≈ a  (a = size of aperture/obstacle)" },
        { label: "Fresnel distance", expression: "Z_F = a²/λ" },
      ],
      bullets: [
        "Diffraction occurs for all types of waves — mechanical (sound) or electromagnetic (light, radio, X-rays).",
        "Key condition: diffraction is significant when the wavelength λ is comparable to the size a of the obstacle or aperture (λ ≈ a or a/λ ≈ 1). When a >> λ (obstacle much larger than wavelength), light travels in nearly straight lines — no visible diffraction.",
        "Sound (λ ~ 16 mm to 16 m) diffracts around everyday objects (furniture, doorways) very easily. Light (λ ~ 10⁻⁷ m) rarely diffracts around visible obstacles, so it appears to travel in straight lines in daily life.",
        "Radio waves (λ ~ 2.5 m to 250 m) diffract conveniently around hills and buildings. Ultrasonic waves (λ ~ 1 cm) diffract with difficulty. X-rays (λ ~ 10⁻¹⁰ m) are diffracted by crystal lattices.",
        "Diffraction was used by Laue to demonstrate that X-rays are waves, using crystal lattices as diffraction gratings.",
        "Fresnel distance Z_F: the distance from a slit of width a at which the spreading of the beam due to diffraction becomes equal to the slit width itself. For distances much smaller than Z_F, light travels as in geometrical optics (ray approximation is valid).",
      ],
    },
    {
      heading: "12. Fraunhofer Diffraction at a Single Slit",
      body:
        "In Fraunhofer (far-field) diffraction, both the source and the screen are at effectively infinite distance from the slit, so the incident and diffracted rays are parallel. In practice this is achieved by placing lenses on either side of the slit. A slit of width a produces a central bright maximum flanked by alternating dark and bright secondary maxima.",
      formula: [
        { label: "Condition for nth minimum", expression: "a sin θₙ = nλ   (n = ±1, ±2, ...)" },
        { label: "Distance of nth minimum", expression: "xₙ = nλD/a" },
        { label: "Width of central maximum (linear)", expression: "w_x = 2λD/a" },
        { label: "Angular width of central maximum", expression: "w_θ = 2λ/a" },
        { label: "Fringe width (secondary maxima)", expression: "β = λD/a" },
        { label: "Condition for secondary maxima", expression: "a sin θ = (2n+1)λ/2" },
      ],
      bullets: [
        "The central maximum is twice as wide as each of the secondary maxima and far more intense — it contains most of the diffracted light.",
        "Minima occur when the path difference from the two edges of the slit equals a whole-number multiple of λ. At these points, the contributions from all pairs of corresponding sub-slits cancel exactly.",
        "Secondary maxima occur when the path difference from the two edges equals an odd multiple of λ/2. They are much weaker than the central maximum (intensities ~ I₀/22, I₀/61, ...).",
        "Width of central maximum ∝ λ and ∝ 1/a. Wider slit → narrower central maximum (less diffraction); narrower slit → wider central maximum (more diffraction).",
        "Blue light (shorter λ) gives a narrower central maximum than red light. This is opposite to dispersion by a prism.",
        "When the lens is placed very close to the slit, D ≈ f (focal length), and xₙ = nλf/a.",
        "Unlike YDSE fringes, diffraction fringes are not equally bright — their intensity decreases progressively from the centre outward.",
      ],
    },
    {
      heading: "13. Difference Between Interference and Diffraction",
      body:
        "Both phenomena involve superposition of waves, but they arise differently. NEET often asks you to distinguish them.",
      bullets: [
        "Interference: superposition of waves from two (or more) separate coherent sources. All bright fringes have equal intensity and equal width. Dark fringes are perfectly dark (I_min = 0) when amplitudes are equal.",
        "Diffraction (single slit): superposition of waves from different parts of the same wavefront. Fringe widths are unequal — the central maximum is twice as wide as the others. Fringe intensity decreases progressively away from centre.",
        "Number of fringes: interference patterns have a large number of nearly equal fringes; diffraction patterns have only a few visible bands.",
        "Both phenomena satisfy energy conservation — energy is redistributed, never created or destroyed.",
        "In practice, both occur simultaneously (e.g. in YDSE, each slit also diffracts). The observed pattern is a product of the single-slit diffraction envelope and the double-slit interference pattern.",
      ],
    },
    {
      heading: "14. Resolving Power — Rayleigh's Criterion",
      body:
        "Any optical instrument forms images that are diffraction patterns (Airy discs), not perfect point images. When two objects are very close, their Airy discs overlap and the instrument cannot distinguish them — the images are 'unresolved'. Rayleigh's criterion specifies the limit of resolution.",
      formula: [
        { label: "Rayleigh's criterion", expression: "Two images are just resolved when the central max of one coincides with the first min of the other" },
        { label: "Resolving limit (telescope)", expression: "δθ = 1.22λ/a" },
        { label: "Resolving power (telescope)", expression: "RP = 1/δθ = a/(1.22λ)" },
        { label: "Resolving limit (microscope)", expression: "RL = 1.22λ/(2μ sin θ)" },
        { label: "Resolving power (microscope)", expression: "RP = 2μ sin θ/(1.22λ)" },
      ],
      bullets: [
        "Telescope: two stars are just resolved when δθ = 1.22λ/a (a = diameter of objective lens/mirror). Larger aperture → smaller δθ → better resolution. This is why large telescopes are built.",
        "Resolving power of telescope ∝ a and ∝ 1/λ. Use shorter wavelength (blue) light to improve resolution.",
        "Microscope: the quantity μ sin θ is called the numerical aperture (NA). Larger NA → smaller resolving limit → finer detail resolved. The factor 1.22 comes from the circular aperture geometry.",
        "To increase the resolving power of a microscope: use shorter wavelength light (UV or electron microscopes use much shorter de Broglie wavelengths), or use oil-immersion objectives (higher μ increases NA).",
        "Resolving power and magnifying power are different — you can magnify a blurry image and it is still blurry. Resolution determines whether detail actually exists in the image.",
      ],
    },
    {
      heading: "15. Polarisation — Concept",
      body:
        "Interference and diffraction prove that light is a wave, but they don't tell us whether it is longitudinal or transverse. Polarisation settles this — light is a transverse electromagnetic wave. In unpolarised light, the electric field vector E vibrates symmetrically in all directions perpendicular to the direction of propagation. In plane-polarised light, E vibrates in only one fixed direction.",
      bullets: [
        "Unpolarised light: the electric field vector oscillates randomly in all planes perpendicular to the direction of propagation. Ordinary light from a bulb, the sun, or a flame is unpolarised.",
        "Plane polarised (linearly polarised) light: the electric field oscillates in only one fixed plane (the plane of vibration). The plane perpendicular to the plane of vibration and containing the propagation direction is called the plane of polarisation.",
        "Polariser: an optical element that converts unpolarised light to plane-polarised light. Examples: Nicol prism, Polaroid sheet, tourmaline crystal.",
        "Analyser: a second polariser used to detect or confirm that light is already polarised. When the axes of polariser and analyser are parallel, maximum light passes; when perpendicular (crossed), no light passes.",
        "Key conclusion from the tourmaline experiment: when polariser and analyser are crossed (90°), intensity = 0. This proves light is transverse — longitudinal waves cannot be polarised.",
        "When unpolarised light is converted to plane-polarised light (by passing through an ideal polariser), its intensity is halved: I_polarised = I₀/2.",
      ],
    },
    {
      heading: "16. Methods of Obtaining Plane Polarised Light",
      body:
        "Five distinct methods can convert unpolarised light into plane-polarised light. NEET focuses on polarisation by reflection (Brewster's law) and by selective absorption (Polaroids).",
      formula: [
        { label: "Brewster's law", expression: "μ = tan θ_p   (θ_p = polarising angle)" },
        { label: "Reflected + refracted rays at θ_p", expression: "θ_p + θ_r = 90°" },
      ],
      bullets: [
        "Polarisation by reflection (Malus, 1808): when unpolarised light strikes a surface at the polarising angle (Brewster's angle) θ_p, the reflected beam is completely plane-polarised with vibrations perpendicular to the plane of incidence. The refracted (transmitted) beam is only partially polarised.",
        "Brewster's law: μ = tan θ_p. At this angle the reflected and refracted rays are perpendicular to each other (θ_p + θ_r = 90°). For glass (μ ≈ 1.5), θ_p ≈ 57°.",
        "At i = 0° or i = 90°, the reflected beam is unpolarised. Only at i = θ_p is the reflected beam completely polarised.",
        "Polarisation by refraction (pile of plates): stacking 20–30 glass plates at Brewster's angle — each reflection removes some vibrations perpendicular to the plane of incidence. After enough plates, the transmitted beam is nearly completely polarised with vibrations in the plane of incidence.",
        "Polarisation by selective absorption (dichroism): certain crystals (tourmaline) and Polaroid sheets absorb one component of the electric field and transmit the perpendicular component. This is the most common practical method.",
        "Polarisation by scattering: light scattered by small particles (Rayleigh scattering) at 90° to the incident direction is completely plane-polarised. This is why the sky light seen at 90° to the sun is polarised — bees and some animals can detect this.",
        "Polarisation by double refraction: in anisotropic crystals like calcite, incident unpolarised light splits into two rays — the ordinary ray (O-ray, obeys Snell's law) and the extraordinary ray (E-ray, does not obey Snell's law). Both are plane-polarised with mutually perpendicular vibrations. A Nicol prism uses this to isolate the E-ray.",
      ],
    },
    {
      heading: "17. Law of Malus",
      body:
        "When completely plane-polarised light of intensity I₀ passes through an analyser, the transmitted intensity depends on the angle θ between the transmission axes of the polariser and analyser.",
      formula: [
        { label: "Malus's law", expression: "I = I₀ cos² θ" },
        { label: "θ = 0° (parallel)", expression: "I = I₀   (maximum)" },
        { label: "θ = 90° (crossed)", expression: "I = 0   (minimum)" },
        { label: "Unpolarised → polariser → analyser", expression: "I = (I_unpol/2) cos² θ" },
      ],
      bullets: [
        "If the incident light is unpolarised of intensity I_unpol, the polariser transmits I₀ = I_unpol/2. The analyser then transmits I = I₀ cos² θ = (I_unpol/2) cos² θ.",
        "At θ = 45°: I = I₀/2 (half the intensity of the polarised beam reaches the analyser).",
        "Malus's law is derived from the component of the electric field amplitude along the analyser axis: if A is the amplitude incident on the analyser, only A cos θ passes through. Since I ∝ A², we get I = I₀ cos² θ.",
        "The law applies only when the incident light on the analyser is already completely plane-polarised.",
      ],
    },
    {
      heading: "18. Brewster's Law — Deeper Analysis and Critical Angle Relation",
      body:
        "Brewster's law and critical angle are both properties of the same interface between two media. A useful relation connects them.",
      formula: [
        { label: "Brewster's law", expression: "μ = tan θ_p" },
        { label: "Critical angle (TIR)", expression: "sin θ_c = 1/μ" },
        { label: "Combined relation", expression: "sin θ_c = cos θ_p   (since θ_p + θ_c = 90°)" },
      ],
      bullets: [
        "From Snell's law at the polarising angle: μ = sin θ_p / sin θ_r. From Brewster's law: μ = tan θ_p = sin θ_p / cos θ_p. Comparing: sin θ_r = cos θ_p, giving θ_r = 90° − θ_p, i.e., θ_p + θ_r = 90°.",
        "For incidence from a denser medium (relevant for TIR): sin θ_c = 1/μ. Since μ = tan θ_p, we get sin θ_c = cot θ_p = cos θ_p / sin θ_p.",
        "If polarising angle θ_p is known, critical angle θ_c can be found from sin θ_c = 1/tan θ_p = cos θ_p/sin θ_p. This is a common NEET numerical.",
        "For water (μ = 1.33): θ_p ≈ 53°. For glass (μ ≈ 1.5): θ_p ≈ 57°. For glass (μ = 1.732 = √3): θ_p = 60° exactly.",
      ],
    },
    {
      heading: "19. Key Comparative Summary and Exam Traps",
      body:
        "Wave Optics has many formulas that look alike but apply to different contexts. This section flags the most frequently confused pairs.",
      bullets: [
        "YDSE bright fringe: δ = nλ → y = nλD/d. Single slit dark fringe: a sin θ = nλ → x = nλD/a. Both have the same form nλD/(width), but in YDSE it gives the bright fringe position, while in single slit it gives the dark fringe position.",
        "Fringe width in YDSE (β = λD/d) increases with D; angular fringe width (α = λ/d) is independent of D. Fringe width in single slit (secondary maxima) = λD/a, and angular width of central max = 2λ/a.",
        "Thin film — reflected system is bright when 2μt cos r = (2n+1)λ/2 (odd multiples, because of the λ/2 phase shift on reflection). Transmitted system is bright when 2μt cos r = nλ. Don't mix up the two.",
        "Polarisation by reflection: at θ_p the reflected beam is 100% polarised. The refracted beam at θ_p is only partially polarised — not 100%.",
        "Malus's law applies only to plane-polarised input. If the input is unpolarised, first divide by 2 for the polariser, then apply cos² θ for the analyser.",
        "Interference preserves photon count; diffraction does too. Both are manifestations of superposition — the same physics.",
        "NEET favourite: two coherent sources of intensities I and 4I. Then √I₁ = √I, √I₂ = 2√I. I_max = (√I + 2√I)² = 9I; I_min = (2√I − √I)² = I. Ratio I_max : I_min = 9 : 1.",
      ],
    },
  ],
};
