import type { ChapterShortNotes } from "./kinematics-short";

export const movingChargesAndMagnetismShortNotes: ChapterShortNotes = {
  chapterName: "Moving Charges & Magnetism",
  className: "12",
  groups: [
    {
      heading: "Biot–Savart Law & Field Direction",
      points: [
        "dB = (μ₀/4π)(I dl sinθ)/r²; vector form dB = (μ₀/4π)(I dl × r̂)/r². μ₀/4π = 10⁻⁷ T·m/A.",
        "Field on the axis of a straight wire (θ = 0°/180°) is always zero.",
        "Right-hand thumb rule: thumb along current → curl gives field (straight wire); curl along current → thumb gives field (circular wire/loop).",
      ],
    },
    {
      heading: "Field Due to a Straight Wire",
      points: [
        "B = (μ₀I)/(4πa)(sinφ₁ + sinφ₂); infinite wire: B = μ₀I/(2πa); semi-infinite: B = μ₀I/(4πa).",
        "If the point lies outside the wire's span (off to the side along its length), the sines subtract instead of adding.",
      ],
    },
    {
      heading: "Circular Loop, Coil and Arc",
      points: [
        "Centre of loop: B₀ = μ₀I/(2R); N turns: B₀ = μ₀NI/(2R); arc of angle α (rad): B = μ₀Iα/(4πR) = (α/2π)B₀.",
        "Two arcs of a uniform-wire loop, fed at the same two points, always give equal and opposite fields at the centre — net zero, regardless of terminal placement.",
        "Regular polygon, side a: triangle B = 9μ₀I/(2πa); square B = 2√2μ₀I/(πa); hexagon B = √3μ₀I/(πa).",
        "Axial field: B(x) = μ₀NIR²/[2(R²+x²)^1.5] = B₀sin³θ. Points of inflection at x = ±R/2, separated by R — basis of Helmholtz coils.",
        "Far axial field (x ≫ R): B ≈ μ₀M/(2πx³), exactly like a dipole.",
      ],
    },
    {
      heading: "Ampère's Circuital Law & Cylindrical Conductors",
      points: [
        "∮B·dl = μ₀I_enclosed — only current inside the loop counts; best suited to infinite, symmetric distributions.",
        "Solid cylinder: inside B = μ₀Ir/(2πR²) ∝ r; surface B = μ₀I/(2πR) (max); outside B = μ₀I/(2πr) ∝ 1/r.",
        "Hollow cylinder (radii a, b): B = 0 for r < a; B = μ₀I(r²−a²)/[2πr(b²−a²)] for a<r<b; B = μ₀I/(2πr) for r > b.",
        "Outside any cylindrical conductor, B depends only on total current and distance — never on shape, solid/hollow, or radius.",
      ],
    },
    {
      heading: "Solenoid & Toroid",
      points: [
        "Long solenoid, inside: B = μ₀nI (n = turns/length); independent of cross-sectional radius.",
        "Finite solenoid, axial point: B = (μ₀nI/2)(cosθ₁−cosθ₂); at an open end of a long solenoid: B = μ₀nI/2 (half the central value).",
        "Toroid: B = μ₀nI inside the core, n = N/(2πR_m), R_m = (R₁+R₂)/2. B = 0 outside the toroid and in the central empty space.",
      ],
    },
    {
      heading: "Charge Moving in a Magnetic Field",
      points: [
        "F = q(v×B); zero if v ∥ B or v = 0; max (qvB) when v ⊥ B. Always ⊥ to v ⟹ does no work ⟹ speed (KE) is constant, only direction changes.",
        "Circular motion (v ⊥ B): r = mv/(qB) = √(2mE_k)/(qB); T = 2πm/(qB) (independent of v, r); ω = qB/m.",
        "Helical motion (angle θ to B): r = mv sinθ/(qB); T unchanged = 2πm/(qB); pitch p = (v cosθ)T.",
        "Field of finite width d: completes semicircle if r < d, grazes boundary if r = d, exits early with deviation θ = sin⁻¹(dqB/mv) if r > d.",
      ],
    },
    {
      heading: "Cyclotron",
      points: [
        "Semicircle time t = πm/(qB) is independent of speed — this is what makes resonant acceleration possible.",
        "Resonance: oscillator T = 2πm/(qB); cyclotron frequency ν = qB/(2πm).",
        "(E_K)_max = q²B²r²_max/(2m); after N revolutions, 2NqV = q²B²r²_max/(2m).",
        "Can't accelerate neutral particles; impractical for electrons (too light — go relativistic quickly, breaking resonance).",
      ],
    },
    {
      heading: "Force on Conductors",
      points: [
        "dF = I(dl×B); zero if I ∥/antiparallel to B, max (BIdl) if I ⊥ B. Always ⊥ to both dl and B.",
        "Uniform field: F = I(L×B), where L is the net displacement vector from start to end — shape/path length doesn't matter.",
        "Net force on any closed loop in a uniform field is always zero (torque may not be); in a non-uniform field, both force and torque can be nonzero.",
        "Parallel wires: f = μ₀I₁I₂/(2πd) per unit length. Like currents attract, unlike currents repel — opposite of the rule for charges.",
        "Definition of ampere: current giving f = 2×10⁻⁷ N/m between two such wires 1 m apart.",
        "Free wire above a fixed wire needs unlike currents (stable, T = 2π√(h/g)); free wire below needs like currents (unstable).",
      ],
    },
    {
      heading: "Current Loop as a Dipole; Torque & Galvanometer",
      points: [
        "M = NIA (vector along the area vector via right-hand rule); SI unit A·m².",
        "τ = M×B = NIAB sinθ; max at θ = 90° (plane ∥ B); zero at θ = 0°/180° (plane ⊥ B).",
        "Net force on a loop in uniform B is always zero; torque is what a galvanometer measures.",
        "Galvanometer (radial field, sinα fixed at 90°): NIAB = Cθ ⟹ I ∝ θ (linear scale).",
        "Current sensitivity = NAB/C; voltage sensitivity = NAB/(CR).",
        "Sensitivity raised by ↑N, ↑B, ↑A, or ↓C; fixed stray-field immunity from the strong magnet; eddy currents damp the coil quickly.",
      ],
    },
    {
      heading: "Atomic Magnetism — Revolving Electron",
      points: [
        "Orbital current I = ef = e/T; orbital magnetic moment M = evr/2.",
        "M = −eL/(2m) — M and orbital angular momentum L are antiparallel (electron's charge is negative).",
        "Bohr quantization L = nh/(2π) ⟹ M = neh/(4πm); for n = 1, M = Bohr magneton μ_B ≈ 9.27×10⁻²⁴ A·m².",
        "For any uniformly charged spinning body, M/L = q/(2m) — a universal ratio, independent of shape (only the moment of inertia changes between ring, disc, sphere, shell).",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Don't confuse 'like currents attract' with the electrostatic rule — for currents it's the reverse of like-charges-repel.",
        "Cyclotron period/frequency depend only on q, m, B — never on v or r; only the radius grows with speed, not the timing.",
        "Net magnetic force on a closed current loop in a uniform field is zero even though the torque on it generally isn't — don't assume zero force means zero torque.",
        "Outside a cylindrical conductor, B depends only on total enclosed current and r — solid vs hollow, thick vs thin makes no difference.",
        "Magnetic force never changes a charged particle's speed (work done is always zero) — only direction changes, so KE is conserved in any purely magnetic field region.",
      ],
    },
  ],
};
