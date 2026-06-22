import type { ChapterNotes } from "./kinematics";

export const oscillationsNotes: ChapterNotes = {
  chapterName: "Oscillations",
  className: "11",
  intro:
    "Simple harmonic motion is nature's default rhythm — the same mathematics describes a swinging pendulum, a vibrating spring, a bobbing buoy, and even atoms jiggling in a crystal lattice. This chapter builds the full toolkit: defining SHM through its differential equation, deriving displacement-velocity-acceleration relationships, tracking energy as it sloshes between kinetic and potential, then applying all of it to springs, pendulums, and a long tail of real-world SHM systems — finishing with what happens when oscillations are damped, driven, or driven at just the right frequency to resonate.",
  sections: [
    {
      heading: "1. Periodic Motion, Oscillatory Motion, and Harmonic Functions",
      body:
        "Periodic motion is any motion that repeats itself after a fixed interval of time, called the time period. Oscillatory (vibratory) motion is a stricter case: the particle moves to and fro about a fixed mean (equilibrium) position. Every oscillatory motion is periodic, but not every periodic motion is oscillatory — circular motion at constant speed is periodic but never doubles back, so it isn't oscillatory.",
      bullets: [
        "Periodic motion examples: planets orbiting the Sun, the pendulum of a wall clock.",
        "Oscillatory motion examples: a vibrating sitar string, a mass bobbing on a spring.",
        "A harmonic function is a trigonometric function of constant amplitude and a single frequency — strictly, only sin and cos in their basic form qualify: y = A sinωt or y = A cosωt.",
        "A function is non-harmonic if its amplitude isn't constant, or if it's built from tan, cot, sec, or cosec instead of sin/cos.",
      ],
    },
    {
      heading: "2. Key Terms — Mean Position, Restoring Force, Amplitude, Time Period",
      bullets: [
        "Mean position: the point where the restoring force is zero and potential energy is minimum.",
        "Restoring force: always directed toward the mean position, opposite to the displacement; F = −kx (dimension MLT⁻²).",
        "Amplitude (A): the maximum displacement of the particle from its mean position.",
        "One complete oscillation: mean → one extreme → back through mean → other extreme → back to mean.",
      ],
      formula: [
        { label: "Time period", expression: "T = 2π/ω = 1/n" },
        { label: "Frequency", expression: "n = 1/T = ω/2π  (unit: hertz, Hz)" },
      ],
    },
    {
      heading: "3. Phase and Angular Frequency",
      body:
        "Phase is a single number that captures everything about a vibrating particle's instantaneous state — both how far it is from the mean position and which way it's currently moving.",
      formula: [
        { label: "Displacement with phase", expression: "y = A sin(ωt + φ)" },
        { label: "Phase difference between two particles", expression: "Δφ = φ₂ − φ₁" },
      ],
      bullets: [
        "The phase at t = 0 is called the initial phase or epoch.",
        "Same phase: Δφ = 2Nπ (an even multiple of π). Opposite phase: Δφ = (2N+1)π (an odd multiple of π).",
        "Angular frequency ω is the rate of change of phase angle with time — unit rad/s, dimension [M⁰L⁰T⁻¹].",
      ],
    },
    {
      heading: "4. What Is SHM? Linear vs Angular SHM",
      body:
        "SHM is the simplest form of oscillatory motion, and comes in two flavours depending on whether the displacement is linear or angular.",
      bullets: [
        "Linear SHM: a particle moves to and fro along a straight line about a fixed equilibrium point (e.g. a mass on a spring).",
        "Angular SHM: a system oscillates angularly about a fixed axis (e.g. the bob of a simple pendulum).",
        "Necessary conditions for SHM: the motion must be oscillatory; total mechanical energy (KE + PE) must stay conserved; the extreme positions must be well defined.",
        "Linear SHM condition: restoring force (or acceleration) is proportional to displacement and directed toward equilibrium — F ∝ −y or a ∝ −y.",
        "Angular SHM condition: restoring torque (or angular acceleration) is proportional to angular displacement and directed toward equilibrium — τ ∝ −θ or α ∝ −θ.",
        "SHM is strictly valid only for small amplitude — that's the regime where the restoring force or torque stays linear in displacement.",
      ],
    },
    {
      heading: "5. The Differential Equation of SHM",
      body:
        "Every SHM system in this chapter is solved the same way: write the restoring force or torque, identify ω², then read off the period. This pattern works whether the system is linear or angular.",
      formula: [
        { label: "Linear SHM", expression: "F = −kx  ⇒  d²x/dt² + (k/m)x = 0  ⇒  ω² = k/m" },
        { label: "Angular SHM", expression: "τ = −Cθ  ⇒  d²θ/dt² + (C/I)θ = 0  ⇒  ω² = C/I" },
        { label: "Solutions", expression: "x = A sinωt (linear);  θ = θ₀ sinωt (angular)" },
        { label: "Time period", expression: "T = 2π√(m/k)  (linear);  T = 2π√(I/C)  (angular)" },
      ],
      bullets: [
        "k = restoring force constant, C = restoring torque constant, I = moment of inertia about the axis of oscillation.",
        "This force → ω² → T pipeline is the single most reusable idea in this chapter — every spring, pendulum, and oddball SHM system later on is solved with exactly this method.",
      ],
    },
    {
      heading: "6. The Reference Circle — Geometrical Meaning of SHM",
      body:
        "If a particle moves with uniform speed around a circle of radius A, the foot of the perpendicular dropped from it onto any diameter executes SHM with amplitude A. This single picture generates every SHM equation you'll ever need.",
      bullets: [
        "The radius vector turns through angle ωt in time t, starting from whatever initial angle (phase) the particle had at t = 0.",
        "The projection's equation is x(t) = A cos(ωt + φ₀), where φ₀ is read directly off the starting position on the reference circle.",
        "This geometric picture is why every SHM displacement equation looks like a sine or cosine with some phase offset — it's literally a shadow of circular motion.",
      ],
    },
    {
      heading: "7. Displacement, Velocity and Acceleration in SHM",
      formula: [
        { label: "Displacement (from mean position)", expression: "x = A sinωt" },
        { label: "Displacement (from extreme position)", expression: "x = A cosωt" },
        { label: "Velocity", expression: "v = dx/dt = Aω cosωt = ω√(A² − x²)" },
        { label: "Acceleration", expression: "a = dv/dt = −ω²A sinωt = −ω²x" },
        { label: "Velocity–displacement relation", expression: "x²/A² + v²/(ω²A²) = 1  (an ellipse; a circle if ω = 1)" },
      ],
      bullets: [
        "At the mean position (x = 0): velocity is maximum (= Aω), acceleration is zero.",
        "At the extreme position (x = ±A): velocity is zero, acceleration is maximum (= ω²A) and points toward the mean position.",
        "Velocity direction is always either toward or away from the mean position — never anything else, since the motion is confined to a straight line.",
      ],
    },
    {
      heading: "8. Graphical and Phase Relationships in SHM",
      body:
        "Displacement, velocity, acceleration, and force all vary sinusoidally with the same frequency as the motion — but they're offset from each other in phase.",
      formula: [
        { label: "Force", expression: "F = ma = −mω²x, maximum magnitude mω²A at the extremes" },
      ],
      bullets: [
        "Velocity leads displacement by π/2.",
        "Acceleration leads displacement by π — i.e., acceleration is always exactly opposite in direction to displacement.",
        "Acceleration leads velocity by π/2.",
        "Length of the SHM path = 2A. Total distance travelled per complete oscillation = 4A, but net displacement over a full oscillation is zero — so total work done over one complete oscillation is also zero.",
      ],
    },
    {
      heading: "9. Potential Energy in SHM",
      formula: [
        { label: "PE vs displacement", expression: "U(x) = ½kx² + U₀  (U₀ = PE at equilibrium)" },
        { label: "PE vs time", expression: "U(t) = ½kA²sin²(ωt + φ) = ½mω²A²sin²(ωt + φ)" },
      ],
      bullets: [
        "PE is a parabolic function of displacement — minimum at the mean position (often taken as zero), maximum (½kA²) at the extremes.",
        "PE is periodic in time, but oscillates at twice the frequency of the displacement itself — it passes through two minima and two maxima for every one oscillation of the particle.",
      ],
    },
    {
      heading: "10. Kinetic Energy and Total Energy in SHM",
      formula: [
        { label: "KE vs displacement", expression: "K(x) = ½mω²(A² − x²) = ½k(A² − x²)" },
        { label: "KE vs time", expression: "K(t) = ½mω²A²cos²(ωt + φ)" },
        { label: "Total energy", expression: "E = U + K = ½kA² = ½mω²A² = constant" },
      ],
      bullets: [
        "KE is an inverted-parabola function of displacement — maximum (½kA²) at the mean position, zero at the extremes.",
        "Like PE, KE oscillates at twice the displacement's frequency — but exactly out of step with PE, so their sum (the total energy) stays perfectly constant at every instant and every position.",
        "Total energy depends only on mass, ω², and A² — never on instantaneous position or time.",
      ],
    },
    {
      heading: "11. Average Energy Over a Cycle",
      formula: [
        { label: "Time-averaged KE", expression: "⟨KE⟩ = ¼kA²" },
        { label: "Time-averaged PE", expression: "⟨PE⟩ = ¼kA² + U₀" },
        { label: "Time-averaged total energy", expression: "⟨TE⟩ = ½kA² + U₀  (same as the instantaneous value)" },
      ],
      bullets: [
        "Stripping out the constant offset U₀, the time-averaged KE and PE are exactly equal — each is half of the (offset-free) total energy.",
        "PE and KE oscillate at twice the displacement's frequency; total energy has zero frequency, since by definition it never changes.",
      ],
    },
    {
      heading: "12. Spring-Block System (Spring Pendulum)",
      body:
        "A mass hanging from (or resting against) a massless spring is the cleanest possible SHM system — the restoring force is exactly linear by Hooke's law.",
      formula: [
        { label: "Angular frequency", expression: "ω² = k/m" },
        { label: "Time period", expression: "T = 2π√(m/k)" },
        { label: "Frequency", expression: "n = (1/2π)√(k/m)" },
      ],
      bullets: [
        "Spring constant k depends on the spring's length, radius, and material; for a given spring, k·l = constant, so k ∝ 1/l.",
        "Time period of a spring-block system is independent of g — it's identical on a hill, on the Moon, or in an orbiting satellite, and unchanged whether the spring oscillates vertically, horizontally, or on an incline.",
        "Heavier mass → longer period (T ∝ √m). Stiffer spring (higher k) → shorter period (T ∝ 1/√k) but higher frequency.",
        "Two masses connected by a spring, both free to move: use the reduced mass μ = m₁m₂/(m₁+m₂) in place of m — T = 2π√(μ/k).",
        "If only one of two connected masses actually oscillates (the other effectively fixed), the period uses just the oscillating mass: T = 2π√(m₁/k).",
        "Vertically hanging spring stretched by y₀ under load mg: ky₀ = mg, so T = 2π√(y₀/g) — algebraically identical to the standard T = 2π√(m/k).",
      ],
    },
    {
      heading: "13. Spring Combinations — Series and Parallel",
      formula: [
        { label: "Series (same force, different extensions)", expression: "1/k_s = 1/k₁ + 1/k₂" },
        { label: "Parallel (same extension, different forces)", expression: "k_p = k₁ + k₂" },
      ],
      bullets: [
        "If a spring's length is increased n times, its spring constant becomes (1/n) times and its time period becomes n times longer.",
        "If a spring is cut into n equal parts, each part's spring constant becomes nk; loaded with the same mass, each part's period becomes (1/√n) times the original.",
        "A stiffer spring (larger k) always gives a shorter period than a softer spring of the same natural length carrying the same load.",
        "A loaded spring's period is identical whether mounted horizontally or vertically — gravity only shifts the equilibrium point, never the restoring force constant.",
      ],
    },
    {
      heading: "14. Simple Pendulum — Derivation and Key Properties",
      body:
        "A heavy point mass on a light, inextensible string from a rigid support, swinging through small angles, is the textbook example of angular SHM disguised as nearly-linear motion.",
      formula: [
        { label: "Small-angle restoring force", expression: "F = −mg sinθ ≈ −mgθ = −(mg/l)y  ⇒  k_eff = mg/l" },
        { label: "Time period", expression: "T = 2π√(l/g)" },
      ],
      bullets: [
        "Time period is independent of the mass and material of the bob — it depends only on the length l (i.e. where the centre of mass sits) and on g.",
        "T ∝ √l: a longer pendulum swings slower.",
        "The sinθ ≈ θ approximation holds only for small angular amplitude — that's the regime where pendulum motion counts as SHM at all.",
        "A person standing up on a swing raises their centre of mass, effectively shortening l — period decreases, the swing speeds up.",
        "A second's pendulum has T = 2 s exactly; at Earth's surface (g ≈ 9.8 m/s² ≈ π² m/s²) this works out to l ≈ 1 m.",
        "On the Moon (g_Moon ≈ g/6), a pendulum's period is √6 ≈ 2.45 times longer than on Earth — a pendulum clock calibrated for Earth runs slow on the Moon.",
      ],
    },
    {
      heading: "15. Simple Pendulum — Effective Gravity in Non-Inertial Frames",
      body:
        "Whenever the pendulum's support accelerates, or the bob feels an extra force, the formula T = 2π√(l/g) still works — you just replace g with an effective gravity g_eff that accounts for every downward (or apparent-downward) acceleration acting on the bob.",
      formula: [
        { label: "General form", expression: "T = 2π√(l/g_eff)" },
        { label: "Lift accelerating upward at a", expression: "g_eff = g + a  ⇒  T decreases" },
        { label: "Lift accelerating downward at a", expression: "g_eff = g − a  ⇒  T increases" },
        { label: "Lift in free fall", expression: "g_eff = 0  ⇒  T → ∞ (no oscillation)" },
        { label: "Truck accelerating forward at f", expression: "g_eff = √(g² + f²)  ⇒  T decreases" },
        { label: "Bob (density σ) in liquid of density ρ", expression: "g_eff = g(1 − ρ/σ)  ⇒  T increases" },
        { label: "Charged bob (+q), field E downward", expression: "g_eff = g + qE/m  ⇒  T decreases" },
        { label: "Charged bob (+q), field E upward", expression: "g_eff = g − qE/m  ⇒  T increases" },
      ],
      bullets: [
        "Whenever net 'downward' acceleration changes, only g_eff changes in the formula — l and the SHM nature of the motion are unaffected, as long as the angle stays small.",
        "A pendulum in a freely falling lift, in an orbiting satellite, or at Earth's centre all share g_eff = 0 — none of them will oscillate.",
      ],
    },
    {
      heading: "16. Simple Pendulum — Length Comparable to Earth's Radius",
      body:
        "The familiar T = 2π√(l/g) assumes l is negligible compared to Earth's radius R. When l isn't negligible, gravity itself weakens slightly with the extra height, and the formula generalizes.",
      formula: [
        { label: "General formula", expression: "T = 2π√[ lR / (g(l + R)) ]" },
        { label: "Limit l << R", expression: "T → 2π√(l/g)  (the familiar formula)" },
        { label: "Limit l → ∞ (infinite pendulum)", expression: "T → 2π√(R/g) ≈ 84.6 minutes (the maximum possible period)" },
      ],
      bullets: [
        "Two pendulums of different lengths, started together, return to being in phase exactly when the shorter one has completed one more full oscillation than the longer one.",
        "If the longer pendulum has completed N oscillations when they next align, the shorter one has completed (N+1): N√l_long = (N+1)√l_short.",
      ],
    },
    {
      heading: "17. Free and Damped Oscillations",
      bullets: [
        "Free oscillation: a system oscillates at its own natural frequency under the restoring force alone, with constant amplitude, frequency, and energy — an idealized, undamped case.",
        "Damped oscillation: a retarding force proportional to velocity, F = −bv (b = damping coefficient), steadily drains mechanical energy into heat, so the amplitude decays over time.",
        "ω is the natural (undamped) frequency; ω' is the actual, slightly lower, damped frequency.",
        "Underdamped (b/2m < ω): the system still oscillates, but the amplitude decays exponentially.",
        "Critically damped (b/2m = ω): the system returns to equilibrium in the shortest possible time, without oscillating at all.",
        "Overdamped (b/2m > ω): the system returns to equilibrium without oscillating, but more slowly than the critically damped case.",
        "Energy decays twice as fast as amplitude in the exponent, since energy depends on amplitude squared.",
      ],
      formula: [
        { label: "Equation of motion", expression: "m(d²x/dt²) + b(dx/dt) + kx = 0" },
        { label: "Solution", expression: "x = Ae^(−bt/2m) cos(ω't + φ),  ω' = √(ω² − (b/2m)²),  ω = √(k/m)" },
        { label: "Energy decay", expression: "E(t) = ½kA²e^(−bt/m)" },
      ],
    },
    {
      heading: "18. Forced Oscillations and Resonance",
      body:
        "Left alone, every damped oscillator eventually dies out. An external periodic force can keep it going indefinitely — but then the system oscillates at the driver's frequency, not its own.",
      formula: [
        { label: "Driving force", expression: "F(t) = F₀ cos(ω_d t)" },
        { label: "Steady-state amplitude", expression: "A' = F₀ / √[ m²(ω² − ω_d²)² + b²ω_d² ]" },
      ],
      bullets: [
        "A forced oscillator eventually settles into oscillating at the driving frequency ω_d, not its own natural frequency ω.",
        "The closer the driving frequency ω_d is to the natural frequency ω, the larger the steady-state amplitude becomes (for a given amount of damping).",
        "Resonance: when ω_d ≈ ω, amplitude becomes maximum, and energy transfer from the driver to the oscillator is also maximum. With very small damping, this amplitude can become dangerously large.",
        "Classic examples: soldiers breaking step crossing a bridge (to avoid matching its natural frequency and triggering destructive resonance); a tuning fork's stem forcing a tabletop into forced vibration; pushing a swing at exactly its own rhythm to build up amplitude.",
      ],
    },
    {
      heading: "19. Other Classic Examples of SHM",
      body:
        "The same force → ω² → T method from Section 5 applies far beyond springs and pendulums. A handful of standard setups show up repeatedly in problems.",
      formula: [
        { label: "Stretched elastic wire", expression: "k = YA/L  ⇒  n = (1/2π)√(YA/mL)" },
        { label: "Liquid in a U-tube (length h)", expression: "T = 2π√(h/g)  — independent of cross-section & density" },
        { label: "Liquid in a V-tube (angles θ₁, θ₂)", expression: "T = 2π√[ m / (Aρg(sinθ₁ + sinθ₂)) ]" },
        { label: "Partially floating body (submerged height h)", expression: "T = 2π√(h/g)" },
        { label: "Ball inside a smooth spherical bowl (radius R)", expression: "T = 2π√(R/g)" },
        { label: "Ball in a tunnel through Earth (diameter or chord)", expression: "T = 2π√(R/g) ≈ 84.6 minutes" },
      ],
      bullets: [
        "Stretched wire: restoring force comes from elasticity (Young's modulus Y, cross-section A, length L) — same linear-force pattern as a spring.",
        "U-tube liquid: restoring force comes from the hydrostatic pressure difference between the two arms; the V-tube formula reduces exactly to the U-tube result when θ₁ = θ₂ = 90°.",
        "Floating body pushed down and released: restoring force comes from the extra buoyant thrust — same elegant T = 2π√(h/g) form as the U-tube.",
        "Ball in a spherical bowl: restoring torque comes from gravity, behaving exactly like a pendulum of length equal to the bowl's radius R.",
        "Ball dropped through a tunnel along Earth's diameter: only the mass interior to the ball's current radius pulls on it, making the restoring force exactly linear in distance from the centre — giving the same period as the 'infinite pendulum,' about 84.6 minutes.",
        "Ball dropped through a tunnel along any chord (not through the centre) has the same restoring-force constant and hence the same ≈84.6-minute period — only the maximum speed differs, not the period.",
        "A ball simply dropped from height outside a tunnel does NOT execute SHM on its way down — gravitational force there varies as 1/r², not as −r, so it's oscillatory at best, never strictly SHM, until it's actually inside the linear-force region.",
      ],
    },
  ],
};
