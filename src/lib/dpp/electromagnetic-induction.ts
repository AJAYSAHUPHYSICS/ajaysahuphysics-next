import type { ChapterDpp } from "./kinematics";

export const electromagneticInductionDpp: ChapterDpp = {
  chapterName: "Electromagnetic Induction",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "A circular coil of area 0.02 m² is held with its plane perpendicular to a uniform magnetic field of 0.5 T. What is the magnetic flux linked with the coil?",
      options: ["0.005 Wb", "0.01 Wb", "0.02 Wb", "0.05 Wb"],
      correctIndex: 1,
      solution: "Φ = BAcosθ, with θ=0° (plane ⊥ B means normal ∥ B): Φ = 0.5 × 0.02 × 1 = 0.01 Wb.",
    },
    {
      number: 2,
      question:
        "The magnetic flux linked with a coil of 50 turns changes from 2 mWb to 6 mWb in 0.2 s. What is the magnitude of the induced EMF?",
      options: ["0.1 V", "0.5 V", "1 V", "2 V"],
      correctIndex: 2,
      solution: "ε = N(ΔΦ/Δt) = 50 × (4×10⁻³)/0.2 = 50 × 0.02 = 1 V.",
    },
    {
      number: 3,
      question:
        "A bar magnet is pushed with its N-pole first into a coil connected to a galvanometer. As the magnet approaches, in which direction does the induced current flow in the coil, and what is the nature of the force on the magnet?",
      options: [
        "Current flows so the coil's near face becomes a N-pole; force is repulsive",
        "Current flows so the coil's near face becomes a S-pole; force is attractive",
        "No current flows unless the magnet actually touches the coil",
        "Current direction is random and depends only on coil resistance",
      ],
      correctIndex: 0,
      solution:
        "By Lenz's law, the induced current opposes the increasing flux caused by the approaching N-pole — the coil's near face becomes a N-pole to repel the magnet, so the force always opposes the motion (here, repulsive), consistent with energy conservation.",
    },
    {
      number: 4,
      question:
        "A conducting rod of length 0.5 m moves with a speed of 4 m/s perpendicular to a uniform magnetic field of 0.2 T, with the rod, velocity, and field all mutually perpendicular. What is the motional EMF induced?",
      options: ["0.2 V", "0.4 V", "0.8 V", "1.6 V"],
      correctIndex: 1,
      solution: "ε = Bvl = 0.2 × 4 × 0.5 = 0.4 V.",
    },
    {
      number: 5,
      question:
        "In the previous setup, if the rod (resistance negligible) slides on rails connected to a resistor of 2 Ω, what is the retarding force on the rod at that instant?",
      options: ["0.01 N", "0.02 N", "0.04 N", "0.08 N"],
      correctIndex: 1,
      solution: "I = ε/R = 0.4/2 = 0.2 A. F = BIl = 0.2 × 0.2 × 0.5 = 0.02 N.",
    },
    {
      number: 6,
      question:
        "A metal rod of length 1 m rotates about one end at an angular velocity of 10 rad/s, in a uniform magnetic field of 0.4 T perpendicular to the plane of rotation. What is the EMF induced between its centre and the rotating end?",
      options: ["1 V", "2 V", "4 V", "8 V"],
      correctIndex: 1,
      solution: "ε = ½Bωl² = ½ × 0.4 × 10 × 1² = 2 V.",
    },
    {
      number: 7,
      question:
        "Why are transformer cores built from thin, insulated laminated sheets rather than a single solid block of iron?",
      options: [
        "To increase the core's self-inductance",
        "To reduce eddy current losses by breaking up the large-area current loops",
        "To increase the resistance of the primary winding",
        "To make the transformer physically lighter",
      ],
      correctIndex: 1,
      solution:
        "A solid iron core allows large-area eddy current loops to form, dissipating energy as unwanted heat. Thin, electrically-insulated laminations break these loops into much smaller ones, sharply cutting eddy current losses — the actual purpose of lamination.",
    },
    {
      number: 8,
      question:
        "A coil of self-inductance 2 H carries a current that is changing at a rate of 3 A/s. What is the magnitude of the self-induced EMF?",
      options: ["1.5 V", "3 V", "6 V", "9 V"],
      correctIndex: 2,
      solution: "ε = L(dI/dt) = 2 × 3 = 6 V.",
    },
    {
      number: 9,
      question:
        "A long solenoid has 2000 turns per metre, a cross-sectional area of 4 × 10⁻⁴ m², and a length of 0.5 m. What is its self-inductance? (μ₀ = 4π×10⁻⁷ T·m/A)",
      options: ["1.0 mH", "1.6 mH", "2.0 mH", "3.2 mH"],
      correctIndex: 0,
      solution:
        "L = μ₀n²Al = (4π×10⁻⁷)×(2000)²×(4×10⁻⁴)×0.5 = (4π×10⁻⁷)×(4×10⁶)×(4×10⁻⁴)×0.5 ≈ 1.257×10⁻⁶×4×10⁶×2×10⁻⁴ ≈ 1.0×10⁻³ H = 1.0 mH.",
    },
    {
      number: 10,
      question:
        "Two coils have self-inductances of 4 H and 9 H, with a coupling coefficient of 1 (perfect coupling, all flux from one links the other). What is their mutual inductance?",
      options: ["4 H", "6 H", "9 H", "13 H"],
      correctIndex: 1,
      solution: "M = k√(L₁L₂) = 1×√(4×9) = √36 = 6 H.",
    },
    {
      number: 11,
      question:
        "A short primary coil produces a magnetic field of 0.05 T inside itself when carrying a current of 2 A. A secondary coil of 100 turns and cross-sectional area 4×10⁻⁴ m² is wound coaxially around the same region as the primary. What is the mutual inductance between them?",
      options: ["0.5 mH", "1.0 mH", "2.0 mH", "4.0 mH"],
      correctIndex: 1,
      solution:
        "Flux through one secondary turn (at I₁=2A): Φ₂ = B×A = 0.05×4×10⁻⁴ = 2×10⁻⁵ Wb. Total flux linkage: N₂Φ₂ = 100×2×10⁻⁵ = 2×10⁻³ Wb-turns. M = N₂Φ₂/I₁ = 2×10⁻³/2 = 1×10⁻³ H = 1.0 mH.",
    },
    {
      number: 12,
      question:
        "Two inductors of 6 mH and 3 mH (no mutual coupling) are connected in parallel. What is the equivalent inductance?",
      options: ["1 mH", "2 mH", "4.5 mH", "9 mH"],
      correctIndex: 1,
      solution: "1/L(eq) = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2, so L(eq) = 2 mH.",
    },
    {
      number: 13,
      question:
        "An inductor of 0.5 H carries a steady current of 4 A. How much energy is stored in its magnetic field?",
      options: ["1 J", "2 J", "4 J", "8 J"],
      correctIndex: 2,
      solution: "U = ½LI² = ½ × 0.5 × 16 = 4 J.",
    },
    {
      number: 14,
      question:
        "A region has a uniform magnetic field of 0.02 T. What is the magnetic energy density in that region? (μ₀ = 4π×10⁻⁷ T·m/A)",
      options: ["1.6 × 10⁻² J/m³", "3.2 × 10⁻² J/m³", "1.6 × 10² J/m³", "3.2 × 10² J/m³"],
      correctIndex: 2,
      solution:
        "u = B²/(2μ₀) = (0.02)²/(2×4π×10⁻⁷) = 4×10⁻⁴/(2.513×10⁻⁶) ≈ 1.6×10² J/m³.",
    },
    {
      number: 15,
      question:
        "In a series LR circuit with L = 4 H and R = 2 Ω, connected to a battery of EMF 10 V, what is the time constant and the final steady-state current?",
      options: ["τ=2s, I₀=5A", "τ=0.5s, I₀=5A", "τ=2s, I₀=20A", "τ=8s, I₀=5A"],
      correctIndex: 0,
      solution: "τ = L/R = 4/2 = 2 s. I₀ = ε/R = 10/2 = 5 A.",
    },
    {
      number: 16,
      question:
        "In the circuit of the previous question, approximately what fraction of the final current has been reached at t = τ?",
      options: ["36.8%", "50%", "63.2%", "100%"],
      correctIndex: 2,
      solution: "I(t)=I₀(1−e^(−t/τ)); at t=τ, I=I₀(1−e⁻¹)=I₀(1−0.368)=0.632I₀, i.e. 63.2% of the final value.",
    },
    {
      number: 17,
      question:
        "An LR circuit with τ = 0.1 s is carrying a steady current when the battery is removed and the circuit is short-circuited. Approximately what fraction of the initial current remains after t = τ?",
      options: ["13.5%", "36.8%", "50%", "63.2%"],
      correctIndex: 1,
      solution: "I(t)=I₀e^(−t/τ); at t=τ, I=I₀e⁻¹≈0.368I₀, i.e. 36.8% of the initial current.",
    },
    {
      number: 18,
      question:
        "A coil of 100 turns and area 0.05 m² rotates at 50 rad/s in a uniform magnetic field of 0.2 T. What is the peak EMF generated?",
      options: ["25 V", "50 V", "100 V", "200 V"],
      correctIndex: 1,
      solution: "ε₀ = NBAω = 100 × 0.2 × 0.05 × 50 = 50 V.",
    },
    {
      number: 19,
      question:
        "For the AC generator in the previous question, at what orientation of the coil (relative to B) is the induced EMF maximum?",
      options: [
        "When the coil's plane is parallel to B",
        "When the coil's plane is perpendicular to B",
        "EMF is the same at every orientation",
        "When the flux through the coil is at its own maximum",
      ],
      correctIndex: 0,
      solution:
        "EMF ∝ rate of change of flux, not flux itself. When the coil's plane is parallel to B, flux is momentarily zero but changing fastest as the coil rotates — this is exactly where EMF peaks, not where flux itself is maximum (plane ⊥ B, where flux is momentarily NOT changing).",
    },
    {
      number: 20,
      question:
        "Which of the following is NOT a direct application of electromagnetic induction?",
      options: [
        "An induction cooktop heating a steel pan",
        "A transformer stepping down mains voltage",
        "A resistor heating up when current flows through it",
        "A metal detector at an airport security gate",
      ],
      correctIndex: 2,
      solution:
        "Resistive (Joule) heating, I²R, is a direct consequence of current flowing through resistance and involves no changing flux or induced EMF — it is unrelated to electromagnetic induction. Induction cooktops (eddy currents), transformers (mutual inductance), and metal detectors (flux disturbance sensing) are all direct applications of induction.",
    },
  ],
};
