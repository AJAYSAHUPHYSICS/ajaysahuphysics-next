import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const rotationalMotionJeeNotes: ChapterJeeNotes = {
  chapterName: "System of Particles & Rotational Motion",
  className: "11",
  intro:
    "Fully worked, JEE-style problems on rigid body dynamics — rods released from rest, angular momentum conservation in collisions, rolling without slipping, and pulleys with real moment of inertia — going a level beyond the regular DPP.",
  examples: [
    {
      title: "Illustration 1 — Angular Acceleration of a Falling Rod",
      problem:
        "A uniform rod of length 1.5 m is pivoted at one end and held horizontal, then released from rest. Find its angular acceleration when it makes an angle of 30° with the vertical. (g = 10 m/s²)",
      solutionSteps: [
        "Torque about the pivot due to gravity: τ = mg(L/2)sinθ, where θ is measured from the vertical and the weight acts at the centre of mass, a distance L/2 from the pivot.",
        "Moment of inertia of a uniform rod about an end: I = mL²/3.",
        "Apply τ = Iα: mg(L/2)sinθ = (mL²/3)α ⇒ α = (3g)/(2L) · sinθ.",
        "Substitute g = 10, L = 1.5, θ = 30°: α = (3×10)/(2×1.5) × sin30° = 10 × 0.5.",
      ],
      answer: "α = 5 rad/s².",
    },
    {
      title: "Illustration 2 — Angular Momentum Conservation: A Particle Sticking to a Rod",
      problem:
        "A rod of mass 6 kg and length 2 m can rotate freely about a frictionless axle through its centre. A 1 kg particle moving at 9 m/s, perpendicular to the rod, strikes and sticks to one end. Find the angular speed of the system just after the collision.",
      solutionSteps: [
        "Angular momentum about the centre is conserved during the collision (no external torque acts in the short collision time).",
        "Angular momentum of the incoming particle about the centre: L = mv(d/2), where d/2 is the distance from the centre to the end of the rod.",
        "Moment of inertia after sticking: I = (rod about centre) + (particle at the end) = (Md²/12) + m(d/2)² = (6×4/12) + 1×1 = 2 + 1 = 3 kg·m².",
        "Apply conservation: mv(d/2) = Iω ⇒ ω = [1×9×1]/3.",
      ],
      answer: "ω = 3 rad/s.",
    },
    {
      title: "Illustration 3 — Speed of a Solid Sphere Rolling Down an Incline",
      problem:
        "A solid sphere rolls without slipping down an incline, starting from rest at a height of 1.4 m above the bottom. Find its speed at the bottom. (g = 10 m/s²)",
      solutionSteps: [
        "For rolling without slipping, total KE = translational + rotational = ½mv² + ½Iω², and for a solid sphere I = (2/5)mR² with ω = v/R.",
        "So total KE = ½mv²[1 + 2/5] = (7/10)mv².",
        "By energy conservation, this equals the loss in gravitational PE: mgh = (7/10)mv² ⇒ v² = 10gh/7 = (10/7)gh.",
        "Substitute g = 10, h = 1.4: v² = 2gh/(1.4) = 2(10)(1.4)/1.4 = 20.",
      ],
      answer: "v = √20 = 2√5 ≈ 4.47 m/s.",
    },
    {
      title: "Illustration 4 — Conservation of Angular Momentum When Moment of Inertia Changes",
      problem:
        "A rotating system has moment of inertia 4 kg·m² and angular speed 3 rad/s. Its moment of inertia then changes (due to redistribution of mass) to 6 kg·m², with no external torque acting. Find the new angular speed.",
      solutionSteps: [
        "With no external torque, angular momentum L = Iω is conserved.",
        "I₁ω₁ = I₂ω₂ ⇒ ω₂ = I₁ω₁/I₂.",
        "Substitute: ω₂ = (4×3)/6 = 12/6.",
      ],
      answer: "ω₂ = 2 rad/s (the system slows down as its moment of inertia increases).",
    },
    {
      title: "Illustration 5 — Atwood Machine with a Real (Massive) Pulley",
      problem:
        "Two masses, 2 kg and 4 kg, hang on either side of a pulley of moment of inertia 0.4 kg·m² and radius 0.2 m. Find the acceleration of the system. (g = 10 m/s²)",
      solutionSteps: [
        "Unlike an idealized massless pulley, a real pulley needs torque to angularly accelerate, which adds an extra effective mass term I/R² to the usual Atwood machine formula.",
        "a = (m₂−m₁)g / (m₁+m₂+I/R²).",
        "Substitute: I/R² = 0.4/(0.2²) = 0.4/0.04 = 10. a = (4−2)(10)/(2+4+10) = 20/16.",
      ],
      answer: "a = 1.25 m/s² (noticeably less than the 1.67 m/s² you'd get from ignoring the pulley's inertia).",
    },
    {
      title: "Illustration 6 — Splitting Kinetic Energy in Rolling Motion",
      problem:
        "A solid cylinder of mass 2 kg and radius 0.5 m rolls without slipping at 10 m/s. Find its translational KE, rotational KE, and total KE.",
      solutionSteps: [
        "Translational KE = ½mv² = ½(2)(10²) = 100 J.",
        "For a solid cylinder, I = ½mR² = ½(2)(0.5²) = 0.25 kg·m², and ω = v/R = 10/0.5 = 20 rad/s.",
        "Rotational KE = ½Iω² = ½(0.25)(20²) = ½(0.25)(400) = 50 J.",
        "Total KE = translational + rotational = 100 + 50.",
      ],
      answer: "Translational KE = 100 J, Rotational KE = 50 J, Total KE = 150 J (exactly 2/3 translational, 1/3 rotational — a fixed ratio for any rolling solid cylinder).",
    },
  ],
};
