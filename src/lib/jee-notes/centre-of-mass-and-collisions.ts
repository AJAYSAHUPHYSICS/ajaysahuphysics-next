import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const centreOfMassAndCollisionsJeeNotes: ChapterJeeNotes = {
  chapterName: "Centre of Mass & Collisions",
  className: "11",
  intro:
    "Fully worked, JEE-style problems on variable mass systems, oblique collisions, and momentum conservation — the multi-step setups JEE Main and JEE Advanced actually test, going a level beyond the regular DPP.",
  examples: [
    {
      title: "Illustration 1 — Rocket Propulsion",
      problem:
        "A rocket with initial mass 1200 kg is launched vertically upward from rest. It burns fuel at a constant rate of 10 kg/s and ejects it downward at 2500 m/s relative to the rocket. Find the rocket's velocity 60 s after launch. (g = 10 m/s²)",
      solutionSteps: [
        "The velocity of a rocket (ignoring air resistance, with gravity included) is given by v = u − gt + v_rel·ln(m₀/m), where m₀ is the initial mass and m is the mass at time t.",
        "Find the remaining mass at t = 60 s: m = m₀ − (burn rate)(t) = 1200 − 10(60) = 600 kg.",
        "Substitute into the formula: v = 0 − (10)(60) + 2500·ln(1200/600) = −600 + 2500·ln(2).",
        "ln(2) ≈ 0.693, so v ≈ −600 + 2500(0.693) ≈ −600 + 1732.9.",
      ],
      answer: "v ≈ 1132.9 m/s (upward).",
    },
    {
      title: "Illustration 2 — The 90° Rule in Oblique Elastic Collisions",
      problem:
        "Two identical balls undergo an oblique elastic collision; one ball is initially at rest. After the collision, the ball that was originally moving travels at 30° from its original direction. At what angle does the previously-stationary ball move?",
      solutionSteps: [
        "For an oblique elastic collision between two bodies of EQUAL mass, where one is initially at rest, momentum and kinetic energy conservation together force a special geometric result: the two bodies must move off perpendicular to each other after the collision.",
        "This means θ₁ + θ₂ = 90°, where θ₁ and θ₂ are the angles each ball makes with the original line of motion.",
        "Given θ₁ = 30°, solve for θ₂: θ₂ = 90° − 30°.",
      ],
      answer: "60° — and the two balls move perpendicular to each other (30° + 60° = 90°).",
    },
    {
      title: "Illustration 3 — Variable Mass: A Falling Chain",
      problem:
        "A uniform chain of linear mass density 0.5 kg/m is held vertically with its lower end just touching the ground, then released. Find the normal reaction force from the ground on the pile of fallen chain when it has fallen through a height of 2 m and its falling end has speed 4 m/s. (g = 10 m/s²)",
      solutionSteps: [
        "As the chain falls, the ground must support both the WEIGHT of the chain already piled up AND provide an extra 'thrust' force to bring each new falling link to rest (an impulsive collision with the pile).",
        "The general result for this setup is: N = μ(v² + gy), where μ is the linear mass density, v is the speed of the falling part, and y is the length that has already fallen.",
        "Substitute μ = 0.5 kg/m, v = 4 m/s, y = 2 m: N = 0.5 × (4² + 10×2) = 0.5 × (16 + 20) = 0.5 × 36.",
      ],
      answer: "N = 18 N — notice this is THREE times the weight of the fallen chain alone (0.5×2×10 = 10 N), because of the extra impulsive force.",
    },
    {
      title: "Illustration 4 — Recoil from an Explosion",
      problem:
        "A bomb at rest explodes into two fragments of mass 2 kg and 3 kg. The 3 kg fragment flies off at 12 m/s. Find the speed of the 2 kg fragment.",
      solutionSteps: [
        "Since the bomb was initially at rest, total momentum before the explosion is zero.",
        "By conservation of momentum, the momenta of the two fragments after the explosion must be equal and opposite: m₁v₁ = m₂v₂.",
        "Substitute: 2 × v₁ = 3 × 12 ⇒ v₁ = 36/2.",
      ],
      answer: "v₁ = 18 m/s, in the direction opposite to the 3 kg fragment.",
    },
    {
      title: "Illustration 5 — Coefficient of Restitution from Bounce Heights",
      problem:
        "A ball is dropped from a height of 5 m onto a hard floor and bounces back up to a height of 1.25 m. Find the coefficient of restitution.",
      solutionSteps: [
        "Speed just before impact: v₁ = √(2gh₁) (from falling height h₁). Speed just after impact (rebound): v₂ = √(2gh₂) (rises to height h₂).",
        "The coefficient of restitution is the ratio of separation speed to approach speed: e = v₂/v₁ = √(2gh₂)/√(2gh₁) = √(h₂/h₁).",
        "Substitute h₂ = 1.25 m, h₁ = 5 m: e = √(1.25/5) = √0.25.",
      ],
      answer: "e = 0.5.",
    },
    {
      title: "Illustration 6 — General 1D Elastic Collision Formula",
      problem:
        "A 1 kg ball moving at 6 m/s collides head-on elastically with a stationary 2 kg ball. Find the velocity of each ball after the collision.",
      solutionSteps: [
        "For a 1D elastic collision, the general post-collision velocities are: v₁ = [(m₁−m₂)u₁ + 2m₂u₂]/(m₁+m₂), and v₂ = [(m₂−m₁)u₂ + 2m₁u₁]/(m₁+m₂).",
        "Here m₁ = 1, u₁ = 6, m₂ = 2, u₂ = 0.",
        "v₁ = [(1−2)(6) + 0]/3 = −6/3 = −2 m/s (the lighter ball bounces straight back).",
        "v₂ = [0 + 2(1)(6)]/3 = 12/3 = 4 m/s.",
      ],
      answer: "v₁ = −2 m/s (rebounds), v₂ = 4 m/s (moves forward).",
    },
  ],
};
