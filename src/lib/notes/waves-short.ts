import type { ChapterShortNotes } from "./kinematics-short";

export const wavesShortNotes: ChapterShortNotes = {
  chapterName: "Waves",
  className: "11",
  groups: [
    {
      heading: "Wave Basics & Classification",
      points: [
        "Wave = disturbance carrying energy/momentum, no net matter transport.",
        "Mechanical waves need a medium (sound, water ripples); EM waves don't (light, radio).",
        "Transverse: particle motion ⊥ propagation — only in solids & liquid surfaces (needs shear).",
        "Longitudinal: particle motion ∥ propagation — only possible kind in gases/liquids.",
        "In solids: longitudinal waves travel faster than transverse waves.",
        "Progressive wave: energy travels continuously. Stationary wave: confined, no net energy transfer.",
      ],
    },
    {
      heading: "Wave Equation & Key Terms",
      points: [
        "y = A sin(ωt − kx): travels along +x. y = A sin(ωt + kx): travels along −x.",
        "ω = 2πn = 2π/T, k = 2π/λ, V = ω/k = nλ = λ/T.",
        "Wavelength = distance between nearest particles in same phase.",
        "Path difference Δx and phase difference Δφ: Δφ = (2π/λ)·Δx.",
      ],
    },
    {
      heading: "Particle Velocity vs Wave Velocity",
      points: [
        "v_p = ∂y/∂t = Aω cos(ωt − kx); max |v_p| = Aω at mean position, zero at extremes.",
        "a_p = −ω²y (same as SHM).",
        "∂y/∂x = −(1/V)(∂y/∂t) → particle velocity = −(wave velocity)×(slope).",
        "Differential wave equation: ∂²y/∂x² = (1/V²)∂²y/∂t².",
        "Wave velocity: constant for the medium. Particle velocity: oscillates between ±Aω.",
      ],
    },
    {
      heading: "Speed of Waves",
      points: [
        "String: V = √(T/μ); μ = mass/length = πD²ρ/4.",
        "Solid (longitudinal): V = √(Y/ρ). Liquid: V = √(B/ρ). Gas: V = √(γP/ρ) = √(γRT/M).",
        "Newton (isothermal) gives 279 m/s for air; Laplace (adiabatic, γ=1.41) gives 331.3 m/s ≈ experimental 332 m/s.",
        "v_solid > v_liquid > v_gas always.",
        "Temperature: V ∝ √T; for air, V_t = 332 + 0.61t.",
        "Pressure: no effect (P/ρ constant). Humidity: speed increases (density decreases). Frequency/amplitude/phase: no effect.",
        "Wind adds vectorially: V + w along wind, V − w against it.",
      ],
    },
    {
      heading: "Intensity & Wavefronts",
      points: [
        "I = ½ρω²A²V ∝ A² (fixed medium & frequency).",
        "Plane wavefront: I = constant, A = constant.",
        "Spherical wavefront: I ∝ 1/r², A ∝ 1/r.",
        "Cylindrical wavefront: I ∝ 1/r, A ∝ 1/√r.",
      ],
    },
    {
      heading: "Sound Wave Forms",
      points: [
        "Displacement wave: y = A sin(ωt − kx). Pressure wave: ΔP = P₀cos(ωt − kx), P₀ = ABk.",
        "Pressure & displacement waves are 90° out of phase; max displacement ↔ min pressure change.",
        "Pressure wave: no phase change at rigid end, π change at free end (opposite of displacement wave).",
        "Loudness L = 10log₁₀(I/I₀), unit dB; depends on intensity + source size/shape.",
        "Pitch ∝ frequency only. Quality (timbre) depends on waveform/overtones present.",
      ],
    },
    {
      heading: "Superposition, Interference & Beats",
      points: [
        "I = I₁ + I₂ + 2√(I₁I₂)cosΔφ.",
        "Maxima: Δφ = 2Nπ, Δx = Nλ → I_max = (√I₁+√I₂)².",
        "Minima: Δφ = (2N+1)π, Δx = (2N+1)λ/2 → I_min = (√I₁−√I₂)².",
        "Coherent sources: phase difference constant in time — required for interference.",
        "Equal amplitudes (a₁=a₂): I_max = 4I, I_min = 0, degree of interference = 100%.",
        "Interference: I = f(position), permanent. Beats: I = f(time), temporary.",
        "Beat frequency = |n₁ − n₂|; resultant frequency = (n₁+n₂)/2.",
        "Ear resolves beats only up to ~10/sec.",
        "Filing a fork's prongs → frequency increases. Loading (wax) → frequency decreases.",
      ],
    },
    {
      heading: "Reflection & Stationary Waves",
      points: [
        "Rigid end: phase change of π on reflection (inverted). Free end: no phase change (not inverted).",
        "Rigid-end stationary wave: y = −2a sinkx·cosωt (node at boundary).",
        "Free-end stationary wave: y = 2a coskx·sinωt (antinode at boundary).",
        "Node: zero displacement & velocity, max strain. Antinode: max displacement & velocity, zero strain.",
        "Distance between consecutive nodes (or antinodes) = λ/2.",
        "Particles between adjacent nodes vibrate in phase; across a node, vibration is opposite phase.",
        "Stationary wave: zero net energy transfer, zero wave velocity.",
        "Longitudinal stationary wave: pressure/density variation max at node, min (constant) at antinode.",
      ],
    },
    {
      heading: "Strings (Sonometer) & Organ Pipes",
      points: [
        "String fixed both ends, p loops: λ = 2L/p, n_p = (p/2L)√(T/m). All harmonics allowed (1:2:3:4...).",
        "Closed pipe: node at closed end, antinode at open end. n = V/4L. Only odd harmonics (1:3:5...).",
        "Closed pipe overtones: 1st overtone = 3rd harmonic, 2nd overtone = 5th harmonic.",
        "Open pipe: antinodes at both ends, node in middle. n = V/2L. All harmonics (1:2:3...).",
        "Open pipe overtones: 1st overtone = 2nd harmonic, 2nd overtone = 3rd harmonic.",
        "Same length: open pipe fundamental = 2 × closed pipe fundamental.",
        "End correction e ≈ 0.6r. Closed: L_eff = L + 0.6r. Open: L_eff = L + 1.2r.",
        "Open pipe half-submerged in water = closed pipe of half length, same fundamental frequency.",
        "Resonance tube: λ = 2(l₂ − l₁); v = nλ — end correction cancels automatically.",
      ],
    },
    {
      heading: "Doppler Effect",
      points: [
        "Source → observer (approaching): n' = nV/(V − v_s) [n' > n].",
        "Source ← observer (receding): n' = nV/(V + v_s) [n' < n].",
        "Observer → source (approaching): n' = n(V + v₀)/V [n' > n].",
        "Observer ← source (receding): n' = n(V − v₀)/V [n' < n].",
        "General (wind v_m): n' = n(V ± v_m ± v₀)/(V ± v_m ∓ v_s).",
        "No Doppler shift if: both at rest; same velocity & direction; perpendicular relative motion; only medium moves; constant separation.",
        "Light Doppler is symmetric (depends only on relative speed); sound is not.",
        "Light (v<<c): approach n'≈n(1+v/c); recession n'≈n(1−v/c); Δλ/λ = ±v/c.",
        "Echo/SONAR/RADAR: reflected-wave beat frequency ≈ 2v_target·n/V (sound) — used to find target speed.",
        "Shock wave (supersonic source): sinθ = V/v_s = 1/(Mach number); Mach number = speed/speed of sound.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Wave velocity is NEVER the same as particle velocity — don't confuse Aω with V = nλ.",
        "Pressure-wave and displacement-wave reflection rules are OPPOSITE at the same boundary — a classic NEET trap.",
        "Closed pipe gives ONLY odd harmonics — never assume the 2nd harmonic exists there.",
        "End correction direction: forgetting +0.6r (closed) vs +1.2r (open, both ends) is the most common numerical slip.",
        "In Doppler problems, only the velocity component ALONG the source–observer line matters — perpendicular motion gives zero shift.",
        "Pressure has NO effect on speed of sound at constant temperature — a frequently-tested 'no effect' fact.",
        "Beats need frequencies to be close (not equal, not very different) — equal frequencies give pure interference, not beats.",
        "Don't confuse 'degree of interference' (contrast, %) with the intensity ratio I_max/I_min — they're related but not identical.",
      ],
    },
  ],
};
