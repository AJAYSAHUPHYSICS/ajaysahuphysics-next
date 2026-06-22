import type { ChapterShortNotes } from "./kinematics-short";

export const oscillationsShortNotes: ChapterShortNotes = {
  chapterName: "Oscillations",
  className: "11",
  groups: [
    {
      heading: "Periodic & Oscillatory Motion",
      points: [
        "Periodic motion: repeats after a fixed time period (e.g. planetary orbits).",
        "Oscillatory motion: to-and-fro about a fixed mean position — all oscillatory motion is periodic, not vice versa.",
        "Harmonic function: constant-amplitude, single-frequency sin/cos only — y = Asinωt or Acosωt.",
        "Non-harmonic: variable amplitude, or built from tan/cot/sec/cosec.",
        "Mean position: restoring force = 0, PE = minimum.",
        "Restoring force F = −kx, always directed toward mean position, opposite to displacement.",
        "Amplitude = max displacement from mean position. One oscillation = mean→extreme→mean→other extreme→mean.",
      ],
    },
    {
      heading: "Time Period, Frequency, Phase",
      points: [
        "T = 2π/ω = 1/n. n = 1/T = ω/2π (Hz).",
        "y = Asin(ωt+φ); phase = (ωt+φ). Phase at t=0 = initial phase/epoch.",
        "Phase difference Δφ = φ₂−φ₁. Same phase: Δφ=2Nπ. Opposite phase: Δφ=(2N+1)π.",
        "ω = rate of change of phase angle; unit rad/s.",
      ],
    },
    {
      heading: "SHM Conditions & Differential Equation",
      points: [
        "Linear SHM: F ∝ −y (e.g. mass on spring). Angular SHM: τ ∝ −θ (e.g. pendulum bob).",
        "Necessary conditions: oscillatory motion, conserved KE+PE, well-defined extremes.",
        "Linear: F=−kx → d²x/dt²+(k/m)x=0 → ω²=k/m → T=2π√(m/k).",
        "Angular: τ=−Cθ → d²θ/dt²+(C/I)θ=0 → ω²=C/I → T=2π√(I/C).",
        "SHM valid only for small amplitude — that's where restoring force/torque stays linear.",
      ],
    },
    {
      heading: "Reference Circle & x, v, a Equations",
      points: [
        "SHM = projection of uniform circular motion (radius A) onto a diameter.",
        "x = Asinωt (from mean) or Acosωt (from extreme).",
        "v = Aωcosωt = ω√(A²−x²); max |v| = Aω at mean position, zero at extremes.",
        "a = −ω²Asinωt = −ω²x; max |a| = ω²A at extremes, zero at mean position.",
        "x²/A² + v²/(ω²A²) = 1 → ellipse (circle if ω=1).",
        "Phase relations: v leads x by π/2; a leads x by π (opposite); a leads v by π/2.",
        "Path length = 2A. Distance per oscillation = 4A. Net displacement & work per oscillation = 0.",
      ],
    },
    {
      heading: "Energy in SHM",
      points: [
        "U(x) = ½kx² + U₀. U(t) = ½kA²sin²(ωt+φ) — parabolic in x, period = T/2 in time.",
        "K(x) = ½mω²(A²−x²) = ½k(A²−x²). K(t) = ½mω²A²cos²(ωt+φ) — inverted parabola in x.",
        "U max at extremes, K max (=½kA²) at mean position — exactly out of phase with each other.",
        "Total energy E = U+K = ½kA² = ½mω²A² = constant always — depends only on m, ω, A.",
        "Time-averaged: ⟨KE⟩=¼kA², ⟨PE⟩=¼kA²+U₀, ⟨TE⟩=½kA²+U₀.",
        "Frequency of KE & PE oscillation = 2 × frequency of displacement. Frequency of TE = 0 (constant).",
      ],
    },
    {
      heading: "Spring-Block System",
      points: [
        "ω²=k/m, T=2π√(m/k), n=(1/2π)√(k/m). T independent of g — same on Moon, hill, satellite, any orientation.",
        "k·l = constant for a spring → k ∝ 1/l. Cut into n parts: each part's k → nk, period → (1/√n)×.",
        "Length ×n → k → (1/n)×, T → n×.",
        "Heavier mass → T↑ (T∝√m). Stiffer spring → T↓, frequency↑.",
        "Two masses both oscillating: use reduced mass μ=m₁m₂/(m₁+m₂), T=2π√(μ/k).",
        "Only one mass oscillating (other fixed): T=2π√(m₁/k) — use only the oscillating mass.",
        "Vertical spring stretched y₀ by load mg: ky₀=mg → T=2π√(y₀/g) ≡ 2π√(m/k).",
      ],
    },
    {
      heading: "Spring Combinations",
      points: [
        "Series (same force, different stretch): 1/k_s = 1/k₁+1/k₂.",
        "Parallel (same stretch, different force): k_p = k₁+k₂.",
        "Stiffer spring (higher k) always gives shorter period than a softer one under the same load.",
        "Horizontal vs vertical mounting: period is identical — gravity shifts equilibrium point only.",
      ],
    },
    {
      heading: "Simple Pendulum",
      points: [
        "Small-angle restoring force: F=−mgsinθ≈−mgθ=−(mg/l)y → k_eff=mg/l → T=2π√(l/g).",
        "T independent of mass/material of bob — depends only on l and g. T ∝ √l.",
        "Standing on a swing raises CM → l effectively decreases → T decreases → faster swing.",
        "Second's pendulum: T=2s exactly; l≈1m at Earth's surface (g≈π² m/s²).",
        "On Moon (g≈g_E/6): T_Moon = √6 × T_Earth ≈ 2.45× — Earth-calibrated clock runs slow on Moon.",
      ],
    },
    {
      heading: "Effective Gravity (g_eff) Cases",
      points: [
        "General: T=2π√(l/g_eff).",
        "Lift up at a: g_eff=g+a → T↓. Lift down at a: g_eff=g−a → T↑. Free fall: g_eff=0 → T→∞ (no oscillation).",
        "Truck forward at f: g_eff=√(g²+f²) → T↓.",
        "Bob density σ in liquid density ρ: g_eff=g(1−ρ/σ) → T↑.",
        "Charged bob +q, field E downward: g_eff=g+qE/m → T↓. Field upward: g_eff=g−qE/m → T↑.",
        "Pendulum at Earth's centre, in satellite, or in free-fall lift: g_eff=0, never oscillates.",
      ],
    },
    {
      heading: "Pendulum: Large Length & Synchronization",
      points: [
        "l comparable to R: T=2π√[lR/(g(l+R))].",
        "l<<R: reduces to T=2π√(l/g). l→∞ (infinite pendulum): T→2π√(R/g)≈84.6 min — max possible period.",
        "Two pendulums started together realign when shorter completes exactly 1 more oscillation than longer: N√l_long=(N+1)√l_short.",
      ],
    },
    {
      heading: "Free, Damped, Forced Oscillations & Resonance",
      points: [
        "Free oscillation: constant amplitude/frequency/energy, undamped, natural frequency ω=√(k/m).",
        "Damped: F=−bv drains energy. m(d²x/dt²)+b(dx/dt)+kx=0. x=Ae^(−bt/2m)cos(ω't+φ), ω'=√(ω²−(b/2m)²).",
        "Energy decay: E(t)=½kA²e^(−bt/m) — decays twice as fast (in exponent) as amplitude.",
        "Underdamped (b/2m<ω): oscillates, amplitude decays exponentially.",
        "Critically damped (b/2m=ω): fastest return to equilibrium, no oscillation.",
        "Overdamped (b/2m>ω): slow return, no oscillation — slower than critical.",
        "Forced: F(t)=F₀cos(ω_d t). Steady state at ω_d (not ω): A'=F₀/√[m²(ω²−ω_d²)²+b²ω_d²].",
        "Resonance: ω_d≈ω → maximum amplitude, maximum energy transfer from driver.",
        "Examples: soldiers breaking step on a bridge; tuning fork stem forcing tabletop; pushing a swing in rhythm.",
      ],
    },
    {
      heading: "Other Classic SHM Examples",
      points: [
        "Stretched wire: k=YA/L → n=(1/2π)√(YA/mL).",
        "U-tube liquid (column length h): T=2π√(h/g) — independent of cross-section & density.",
        "V-tube liquid (angles θ₁,θ₂): T=2π√[m/(Aρg(sinθ₁+sinθ₂))]; reduces to U-tube at θ₁=θ₂=90°.",
        "Partially floating body (submerged height h): T=2π√(h/g) — same form as U-tube.",
        "Ball in smooth spherical bowl (radius R): T=2π√(R/g) — behaves like pendulum of length R.",
        "Ball in tunnel through Earth (diameter OR any chord): T=2π√(R/g)≈84.6 min — same period either way, only v_max differs.",
        "Ball simply dropped from height (not released inside a tunnel at rest): NOT SHM — force ∝ 1/r², not ∝ −r.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Don't confuse 'periodic' with 'oscillatory' — uniform circular motion is periodic but never oscillatory.",
        "T = 2π√(l/g) for a simple pendulum is mass-independent — a common wrong-option trap involves mass.",
        "Spring-block period is g-independent; pendulum period is g-dependent — don't mix these up under gravity-change questions (lifts, Moon, satellites).",
        "PE and KE both oscillate at 2× the frequency of displacement — total energy has zero frequency (it's constant), a frequent mix-up.",
        "g_eff sign errors are the #1 trap in lift/field/liquid pendulum problems — always check whether the extra force adds to or opposes gravity.",
        "Critical damping ≠ zero oscillation forever — it's the fastest non-oscillating return; overdamped is slower, not faster.",
        "At resonance, amplitude is large but not infinite unless damping is exactly zero — don't assume infinite amplitude by default.",
        "Tunnel-through-Earth period (≈84.6 min) is identical for a diametric tunnel and a chord tunnel — only maximum speed changes between them.",
      ],
    },
  ],
};
