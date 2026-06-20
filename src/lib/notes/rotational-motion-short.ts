import type { ChapterShortNotes } from "./kinematics-short";

export const rotationalMotionShortNotes: ChapterShortNotes = {
  chapterName: "System of Particles & Rotational Motion",
  className: "11",
  groups: [
    {
      heading: "Angular Kinematics",
      points: [
        "θ in radians (dimensionless). ω = dθ/dt (rad/s). α = dω/dt (rad/s²).",
        "v = ωr, a_t = αr, a_r = ω²r — same particle, three different speeds/accelerations depending on what you're asking.",
        "ω = ω₀ + αt | θ = ω₀t + ½αt² | ω² = ω₀² + 2αθ — direct rotational twins of v = u+at etc.",
        "All particles of a rigid body share the same ω and α at a given instant; only v, a_t differ (since r differs).",
      ],
    },
    {
      heading: "Moment of Inertia — Core Idea",
      points: [
        "I = Σmr² (discrete) or ∫r² dm (continuous). Rotational analogue of mass.",
        "Depends on: mass, mass distribution, axis chosen. Does NOT depend on ω, α, τ, or L.",
        "Same mass spread farther from axis → larger I.",
        "K (radius of gyration): I = MK². Depends on axis + mass distribution, not on total mass value.",
      ],
    },
    {
      heading: "Two Theorems",
      points: [
        "Parallel axis (any body): I = I_CM + Md².",
        "Perpendicular axis (laminae/2-D bodies ONLY): I_z = I_x + I_y.",
      ],
    },
    {
      heading: "Standard Moments of Inertia",
      points: [
        "Ring, ⊥ axis through centre: MR² | Ring, diameter: MR²/2",
        "Disc, ⊥ axis through centre: MR²/2 | Disc, diameter: MR²/4",
        "Solid sphere, diameter: (2/5)MR² | Hollow shell, diameter: (2/3)MR²",
        "Rod, ⊥ axis through centre: ML²/12 | Rod, ⊥ axis through end: ML²/3",
        "Solid cylinder, own axis: MR²/2 | Hollow cylinder, own axis: MR²",
        "Rectangular plate, ⊥ through centre: M(a²+b²)/12",
      ],
    },
    {
      heading: "Torque",
      points: [
        "τ = r × F, magnitude rF sinθ. Unit: N·m (never write as joule).",
        "Only the force component ⊥ to r contributes — force along r or through the pivot gives zero torque.",
        "τ = Iα — rotational version of F = ma.",
        "Couple: two equal, opposite, non-collinear forces → moment = F × b (b = perpendicular distance between lines), zero net force.",
      ],
    },
    {
      heading: "Equilibrium",
      points: [
        "Full equilibrium needs BOTH ΣF = 0 AND Στ = 0.",
        "A single force can't give rotational equilibrium unless its line of action passes through the axis.",
        "Cyclist bending on a turn: tanθ = v²/(rg).",
      ],
    },
    {
      heading: "Angular Momentum",
      points: [
        "L = r × mv (particle) | L = Iω (rigid body).",
        "L is max when r ⊥ v (e.g. circular motion); L = 0 when v is along r (motion passes through the reference point).",
        "τ = dL/dt — rotational version of F = dp/dt.",
        "Angular impulse = τ·Δt = ΔL.",
      ],
    },
    {
      heading: "Conservation of Angular Momentum (COAM)",
      points: [
        "τ_net = 0  ⇒  I₁ω₁ = I₂ω₂ (L stays constant).",
        "Arms in → I decreases → ω increases (skater, diver). Arms out → reverse.",
        "COAM conserves L, NOT rotational KE — KE_rot can change even while L stays fixed.",
        "Ice melting at poles → mass shifts toward equator → Earth's I increases → ω decreases → day lengthens.",
      ],
    },
    {
      heading: "Rotational Kinetic Energy",
      points: [
        "KE_rot = ½Iω² = L²/(2I).",
        "W = τΔθ (constant torque) = ΔKE_rot — rotational work-energy theorem.",
        "Rotational power: P = τω.",
      ],
    },
    {
      heading: "Rolling Motion",
      points: [
        "Pure rolling condition: v_cm = ωR (no slipping at contact point).",
        "Contact point velocity = 0. Top point velocity = 2v_cm. Centre velocity = v_cm.",
        "Total KE while rolling = ½mv² (1 + K²/R²).",
        "Pure rolling ⇒ equivalent to pure rotation about the instantaneous axis through the contact point.",
      ],
    },
    {
      heading: "Rolling on an Inclined Plane",
      points: [
        "v at bottom = √[2gh / (1 + K²/R²)]",
        "a down the slope = g sinθ / (1 + K²/R²)",
        "t to reach bottom = (1/sinθ)·√[(2h/g)(1 + K²/R²)]",
        "Smaller K²/R² → reaches first (solid sphere fastest; ring/hollow cylinder slowest of standard shapes).",
        "Sliding (frictionless) body always beats a rolling body of the same shape down the same incline.",
        "μ_min for pure rolling on incline of angle θ: tanθ / (1 + R²/K²).",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "Perpendicular axis theorem fails for 3-D bodies (sphere, cylinder) — parallel axis theorem works for all.",
        "I is NOT a fixed number for a body — always state the axis.",
        "Torque's SI unit is N·m, never joule, even though dimensions match work.",
        "Don't confuse 'sliding' (K²/R² = 0, frictionless) with 'rolling' (K²/R² > 0, friction provides spin-up torque).",
      ],
    },
  ],
};
