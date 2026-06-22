import type { ChapterNotes } from "./kinematics";

export const wavesNotes: ChapterNotes = {
  chapterName: "Waves",
  className: "11",
  intro:
    "A wave is energy travelling without matter making the trip. This chapter builds from a single wiggle on a string up to the full machinery of sound — speed, superposition, beats, standing waves in strings and pipes, and finally the Doppler effect, which explains why a passing ambulance's siren changes pitch and why starlight shifts colour. Every result here traces back to one wave equation and one idea: phase difference.",
  sections: [
    {
      heading: "1. What Is a Wave? Classification of Waves",
      body:
        "A wave is a disturbance that travels through space, carrying energy and momentum from one point to another without any net transport of matter. When you speak, no particle of air leaves your mouth and lands in your friend's ear — your vocal cords disturb the nearby air, that disturbance passes from layer to layer, and only the disturbance (not the air itself) reaches the listener.",
      bullets: [
        "Mechanical (elastic) waves need a material medium to travel — the medium's inertia and elasticity carry the disturbance forward. Examples: sound, water ripples, seismic waves.",
        "Non-mechanical (electromagnetic) waves need no medium at all — light, radio waves, X-rays, infrared.",
        "Progressive waves carry energy continuously through a medium at a constant velocity; particles far apart oscillate with a regular phase lag relative to each other.",
        "Stationary (standing) waves are confined between boundaries — particles vibrate with position-dependent amplitude, but no net energy crosses any point.",
        "Transverse waves: particle vibration is perpendicular to the direction of propagation (crests and troughs). Mechanical transverse waves need a medium with shear strength, so they exist only in solids and on the surface of liquids.",
        "Longitudinal waves: particle vibration is along the direction of propagation (compressions and rarefactions). Since fluids cannot sustain shear, waves in the bulk of any gas or liquid are always longitudinal.",
        "Solids can carry both kinds simultaneously (e.g. seismic S-waves are transverse, P-waves are longitudinal) — and longitudinal waves always travel faster than transverse waves in the same solid.",
      ],
    },
    {
      heading: "2. Wave Terminology and the Equation of a Progressive Wave",
      body:
        "A handful of quantities describe every periodic wave completely, and together they build the single equation that governs simple harmonic progressive waves.",
      bullets: [
        "Wavelength (λ): the distance between two nearest particles vibrating in the same phase — equivalently, the distance covered by the wave in one full oscillation of a particle.",
        "Frequency (n or f): the number of complete oscillations a particle completes per second.",
        "Time period (T): time taken by the wave to advance one wavelength; T = 1/f.",
        "Amplitude (A): the maximum displacement of a vibrating particle from its mean position.",
        "Phase (ωt − kx): a single quantity that encodes everything about a particle's instantaneous state of vibration.",
      ],
      formula: [
        { label: "Angular frequency", expression: "ω = 2πn = 2π/T" },
        { label: "Propagation constant (wave number)", expression: "k = 2π/λ" },
        { label: "Wave (phase) velocity", expression: "V = ω/k = nλ = λ/T" },
        { label: "Progressive wave along +x", expression: "y = A sin(ωt − kx)" },
        { label: "Progressive wave along −x", expression: "y = A sin(ωt + kx)" },
      ],
    },
    {
      heading: "3. Particle Velocity vs Wave Velocity",
      body:
        "These two velocities are easy to confuse but behave completely differently. Wave velocity is a property of the medium and stays fixed; particle velocity belongs to one oscillating particle and changes continuously through its cycle, exactly like in SHM.",
      formula: [
        { label: "Particle velocity", expression: "v_p = ∂y/∂t = Aω cos(ωt − kx)" },
        { label: "Particle acceleration", expression: "a_p = ∂²y/∂t² = −ω²y" },
        { label: "Slope–velocity relation", expression: "∂y/∂x = −(1/V)·∂y/∂t" },
        { label: "Differential wave equation", expression: "∂²y/∂x² = (1/V²)·∂²y/∂t²" },
      ],
      bullets: [
        "Maximum particle speed is Aω, reached at the mean position; particle speed is zero at the extreme position — same as SHM.",
        "Particle velocity at any point equals −(wave velocity) × (slope of the wave at that point); the slope ∂y/∂x is also called the wave strain.",
        "Wave velocity is constant for a given medium; particle velocity oscillates between +Aω and −Aω.",
      ],
    },
    {
      heading: "4. Speed of a Transverse Wave on a String",
      formula: [
        { label: "Wave speed on a string", expression: "V = √(T/μ)" },
        { label: "In terms of diameter & density", expression: "V = (2/D)·√(T/πρ), where μ = πD²ρ/4" },
      ],
      bullets: [
        "T = tension in the string, μ = mass per unit length.",
        "Wave speed depends only on tension and linear mass density — not on amplitude, frequency, or waveform.",
        "Every expression for wave velocity gives the speed relative to the medium, never relative to the ground.",
      ],
    },
    {
      heading: "5. Intensity of Waves and Wavefronts",
      body:
        "A wavefront is an imaginary surface joining all points that are in the same phase. How intensity falls off with distance depends entirely on the shape of the wavefront.",
      formula: [
        { label: "Intensity (fixed medium)", expression: "I = ½ρω²A²V  ⇒  I ∝ A² (for fixed n, V)" },
      ],
      bullets: [
        "Plane wavefront (source effectively at infinity, e.g. sunlight): area stays constant, so intensity stays constant as the wave travels — amplitude stays constant too.",
        "Spherical wavefront (point source): area ∝ r², so I ∝ 1/r² and amplitude ∝ 1/r.",
        "Cylindrical wavefront (line source, e.g. a tube light): area ∝ r, so I ∝ 1/r and amplitude ∝ 1/√r.",
      ],
    },
    {
      heading: "6. Sound Waves and the Speed of Sound",
      body:
        "Sound is a longitudinal mechanical wave and can be described two equivalent ways: by the displacement of medium particles, or by the excess pressure those displacements create.",
      bullets: [
        "Displacement wave: y = A sin(ωt − kx).",
        "Pressure wave: ΔP = P₀ cos(ωt − kx), where P₀ = ABk (B = bulk modulus, A = displacement amplitude).",
        "The two descriptions are 90° out of phase — displacement is maximum exactly where the pressure change is zero, and vice versa.",
        "A detector that senses pressure (ear, microphone) is best described with the pressure wave; a detector that senses displacement is best described with the displacement wave.",
        "On reflection, the pressure wave keeps its phase at a rigid boundary and flips by π at a free boundary — the displacement wave behaves the opposite way round.",
        "Newton assumed sound travels isothermally through air and got only 279 m/s — far below the measured 332 m/s.",
        "Laplace corrected this: sound compresses and rarefies air too quickly for heat to escape, so the process is adiabatic (uses γ = Cp/Cv, not just P). This raises the predicted speed to 331.3 m/s — matching experiment almost exactly.",
        "This mismatch and its correction is historically how we know sound propagates adiabatically, not isothermally, through gases.",
      ],
      formula: [
        { label: "General (Newton's formula)", expression: "V = √(E/ρ)" },
        { label: "Solids", expression: "V = √(Y/ρ)" },
        { label: "Liquids", expression: "V = √(B/ρ)" },
        { label: "Gases — Laplace's formula (adiabatic)", expression: "V = √(γP/ρ) = √(γRT/M)" },
      ],
    },
    {
      heading: "7. Factors Affecting the Speed of Sound",
      bullets: [
        "Temperature: V ∝ √T. For air specifically, V_t = V₀ + 0.61t (V₀ = 332 m/s at 0°C) — speed rises with temperature.",
        "Pressure: no effect at constant temperature, since P/ρ stays constant for a fixed mass of gas (Boyle's law keeps the ratio fixed even as both P and ρ fall with altitude).",
        "Humidity: moist air is less dense than dry air at the same temperature and pressure, so speed increases slightly with humidity — sound carries farther after rain.",
        "Wind: adds (or subtracts) vectorially — speed becomes (V + w) along the wind and (V − w) against it.",
        "No effect: frequency, amplitude, phase, loudness, pitch, and quality — none of these change the speed of sound in a given medium (which is why an orchestra doesn't fall apart in pitch over distance).",
        "Speed ranking across states of matter: v_solid > v_liquid > v_gas, because elasticity rises faster than density as you go from gas to liquid to solid.",
      ],
    },
    {
      heading: "8. Characteristics of Sound — Loudness, Pitch, Quality",
      bullets: [
        "Loudness depends on intensity and on the size/shape of the source. It follows the Weber–Fechner law: L ∝ log₁₀I, measured in decibels as L = 10 log₁₀(I/I₀), where I₀ is the threshold of hearing.",
        "Pitch depends only on frequency — higher frequency means a higher, shriller pitch (a mosquito's hum has high pitch but low loudness; a lion's roar is the opposite).",
        "Quality (timbre) depends on waveform, which is shaped by which overtones are present and in what relative strength — this is what lets you tell a violin and a flute apart even when they play the same note at the same loudness.",
      ],
    },
    {
      heading: "9. Superposition, Interference and Beats",
      body:
        "When two or more waves overlap in a medium, the net displacement at any point and instant is simply the vector sum of what each wave would produce alone. Two special, exam-favourite outcomes of this principle are interference (a fixed pattern in space) and beats (a fluctuating pattern in time).",
      formula: [
        { label: "Resultant intensity", expression: "I = I₁ + I₂ + 2√(I₁I₂)·cos Δφ" },
        { label: "Constructive (maxima)", expression: "Δφ = 2Nπ, Δx = Nλ  ⇒  I_max = (√I₁ + √I₂)²" },
        { label: "Destructive (minima)", expression: "Δφ = (2N+1)π, Δx = (2N+1)λ/2  ⇒  I_min = (√I₁ − √I₂)²" },
      ],
      bullets: [
        "Two waves are coherent only if their phase difference stays constant in time — interference patterns require coherent sources.",
        "Interference is a function of position, I = f(x), and is permanent; beats are a function of time, I = f(t), and repeat periodically.",
        "For equal-amplitude coherent sources (a₁ = a₂ = a): I_max = 4I and I_min = 0 — perfect contrast, degree of interference = 100%.",
      ],
    },
    {
      heading: "10. Beats",
      body:
        "Beats arise when two waves of slightly different (not exactly equal) frequencies travel in the same direction and overlap at a point — the intensity there waxes and wanes periodically.",
      formula: [
        { label: "Beat frequency", expression: "n_beat = |n₁ − n₂|" },
        { label: "Frequency of the resultant wave", expression: "n' = (n₁ + n₂)/2" },
      ],
      bullets: [
        "The human ear can resolve at most about 10 beats per second; faster fluctuation just sounds like a steady tone.",
        "Filing a tuning fork's prongs raises its frequency; loading it with wax lowers it — sounding the unknown fork against a known one before and after filing/loading tells you which side of the known frequency the unknown one sits on.",
        "With three or more close frequencies sounded together, total beats per second can be found by counting all the pairwise beat frequencies and removing any double-counted coincidences.",
      ],
    },
    {
      heading: "11. Reflection of Waves and Stationary Waves",
      body:
        "Stationary (standing) waves form only when two identical waves of the same frequency and amplitude travel in exactly opposite directions through a bounded medium — and the only way to reliably get two such waves is by reflection.",
      bullets: [
        "Rigid boundary: the wave reflects with a phase change of π (inverted) — the fixed end can't move, so by Newton's third law it pushes back with an equal and opposite force.",
        "Free boundary: the wave reflects in phase (not inverted) — the free end overshoots and a restoring tension pulls it back.",
        "Nodes: permanently at rest — zero displacement, zero velocity, maximum strain (slope).",
        "Antinodes: maximum displacement and velocity, zero strain.",
        "Distance between two consecutive nodes (or two consecutive antinodes) is always λ/2.",
        "All particles between two adjacent nodes vibrate in phase; particles just on either side of a node vibrate in opposite phase.",
        "A stationary wave carries no net energy across any point — its wave velocity is zero even though individual particle velocities are non-zero.",
        "For longitudinal stationary waves specifically: pressure and density variation is maximum at a node and minimum (constant) at an antinode — exactly opposite to displacement.",
      ],
      formula: [
        { label: "Reflection at a rigid end", expression: "y = −2a sin(kx) cos(ωt) — node at the boundary" },
        { label: "Reflection at a free end", expression: "y = 2a cos(kx) sin(ωt) — antinode at the boundary" },
      ],
    },
    {
      heading: "12. Standing Waves in Strings (Sonometer)",
      body:
        "A string fixed at both ends supports standing waves only at specific frequencies — its natural modes, or harmonics.",
      formula: [
        { label: "Wavelength for p loops", expression: "λ = 2L/p" },
        { label: "Frequency for p loops", expression: "n_p = (p/2L)·√(T/m)" },
        { label: "Fundamental (p = 1)", expression: "n₁ = (1/2L)·√(T/m)" },
      ],
      bullets: [
        "m = mass per unit length, L = length of the string, T = tension.",
        "All harmonics are allowed: n₁ : n₂ : n₃ : n₄ = 1 : 2 : 3 : 4 ...",
        "A sonometer wire pressed under a vibrating tuning fork resonates loudest exactly when its natural frequency matches the fork's — that's the basis of the sonometer experiment.",
        "n ∝ 1/L, n ∝ √T, n ∝ 1/√(mass per unit length) — these three proportionalities cover almost every sonometer numerical.",
      ],
    },
    {
      heading: "13. Standing Waves in Organ Pipes",
      body:
        "Blowing air across the open end of a pipe sets up a wave that reflects at the far end and returns, superposing with the original to form a stationary wave. A closed end always forms a node (no freedom to vibrate); an open end always forms an antinode (maximum freedom to vibrate).",
      formula: [
        { label: "Closed pipe — fundamental", expression: "n = V/4L" },
        { label: "Closed pipe — overtone series", expression: "n₁ : n₂ : n₃ = 1 : 3 : 5 ... (odd harmonics only)" },
        { label: "Open pipe — fundamental", expression: "n = V/2L" },
        { label: "Open pipe — overtone series", expression: "n₁ : n₂ : n₃ = 1 : 2 : 3 ... (all harmonics)" },
      ],
      bullets: [
        "Closed pipe: first overtone is the 3rd harmonic (3V/4L), second overtone is the 5th harmonic (5V/4L) — even harmonics never appear.",
        "Open pipe: first overtone is the 2nd harmonic (2V/2L), second overtone is the 3rd harmonic (3V/2L) — every harmonic appears.",
        "For the same length, an open pipe's fundamental is exactly twice a closed pipe's fundamental.",
        "End correction: the antinode actually forms slightly beyond the open end, at distance e ≈ 0.6r (r = pipe radius). Effective length becomes (L + 0.6r) for a closed pipe and (L + 1.2r) for an open pipe (correction applies at both ends).",
        "A pipe open at both ends, half-submerged in water, behaves like a closed pipe of half the original length — and its fundamental frequency stays unchanged, since both V/4L and original V/2L-halved work out the same.",
      ],
    },
    {
      heading: "14. Resonance Tube and the Speed of Sound",
      body:
        "The resonance tube is a practical setup to measure the speed of sound: a vertical air column of adjustable length, closed at the water surface and open at the top, resonates with a tuning fork held at the mouth at specific column lengths.",
      formula: [
        { label: "First resonance", expression: "l₁ + e = λ/4" },
        { label: "Second resonance", expression: "l₂ + e = 3λ/4" },
        { label: "Wavelength (end correction cancels)", expression: "λ = 2(l₂ − l₁)" },
        { label: "Speed of sound", expression: "v = nλ = 2n(l₂ − l₁)" },
      ],
      bullets: [
        "e is the end correction; it cancels automatically when you subtract l₁ from l₂, which is why this method doesn't need e to be known in advance.",
        "Once λ is found this way, the speed at any other temperature can be corrected using v_t = v_0 + 0.61t.",
      ],
    },
    {
      heading: "15. The Doppler Effect",
      body:
        "The Doppler effect is the apparent change in frequency heard or seen due to relative motion between a source and an observer along the line joining them. The sign convention is simple: motion that closes the gap between source and observer raises the apparent frequency; motion that opens the gap lowers it.",
      formula: [
        { label: "Source moving toward stationary observer", expression: "n' = nV/(V − v_s)" },
        { label: "Source moving away from stationary observer", expression: "n' = nV/(V + v_s)" },
        { label: "Observer moving toward stationary source", expression: "n' = n(V + v₀)/V" },
        { label: "Observer moving away from stationary source", expression: "n' = n(V − v₀)/V" },
        { label: "General case (with wind at v_m)", expression: "n' = n·(V ± v_m ± v₀)/(V ± v_m ∓ v_s)" },
      ],
      bullets: [
        "No Doppler shift occurs when: both source and observer are at rest; both move with the same velocity in the same direction; their relative motion is perpendicular to the line joining them; only the medium (wind) moves; or the source–observer separation stays constant.",
        "If the source has a component of velocity at angle θ to the line joining source and observer, only the component v_s cosθ along that line matters in the formula.",
      ],
    },
    {
      heading: "16. Doppler Effect — Echo, Light, and Shock Waves",
      body:
        "The same idea extends to reflected sound (used to find a moving target's speed via beats) and to light, with one key structural difference between the two.",
      formula: [
        { label: "Reflected-sound beat frequency (target speed v_t, sound speed V)", expression: "Δn ≈ 2v_t·n/V (for v_t << V)" },
        { label: "Light — approach", expression: "n' ≈ n(1 + v/c) for v << c" },
        { label: "Light — recession", expression: "n' ≈ n(1 − v/c) for v << c" },
        { label: "Doppler shift in wavelength", expression: "Δλ/λ = ±v/c (− for approach/violet shift, + for recession/red shift)" },
      ],
      bullets: [
        "Doppler's effect in light is symmetric — a source approaching at speed v and an observer approaching at the same speed v produce the same frequency shift, since light's speed doesn't depend on the motion of source or observer. Sound has no such symmetry: source-motion and observer-motion give different formulas.",
        "SONAR uses sound reflected off underwater targets (submarines); RADAR uses radio waves reflected off moving targets (aircraft) — both extract target speed from the Doppler shift of the echo.",
        "Shock waves: when a source moves faster than the wave speed itself (supersonic), it leaves behind a conical disturbance front. sinθ = V/v_s = 1/(Mach number), where Mach number = (speed of the body)/(speed of sound in that medium). Supersonic flight means Mach number > 1.",
      ],
    },
  ],
};
