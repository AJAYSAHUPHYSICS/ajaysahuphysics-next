import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const mechanicalPropertiesOfFluidsJeeNotes: ChapterJeeNotes = {
  chapterName: "Mechanical Properties of Fluids",
  className: "11",
  intro:
    "Fully worked, JEE-style problems on fluids in accelerating containers, Bernoulli's theorem, terminal velocity, and surface tension — going a level beyond the regular DPP, into the multi-step setups JEE Main and JEE Advanced actually test.",
  examples: [
    {
      title: "Illustration 1 — Free Surface Tilt in a Horizontally Accelerating Container",
      problem:
        "A container of liquid accelerates horizontally at 5 m/s². Find the angle the free surface makes with the horizontal. (g = 10 m/s²)",
      solutionSteps: [
        "In a frame attached to the accelerating container, the liquid experiences a pseudo force of magnitude ma (per unit mass, just a) opposite to the direction of acceleration, in addition to real gravity g (downward).",
        "The free surface always settles perpendicular to the NET effective gravity (the vector sum of g and the pseudo acceleration).",
        "This gives tanθ = a/g, where θ is the angle of tilt from the horizontal.",
        "Substitute a = 5, g = 10: tanθ = 5/10 = 0.5.",
      ],
      answer: "tanθ = 0.5, so θ ≈ 26.6°.",
    },
    {
      title: "Illustration 2 — Pressure Difference in an Accelerating Liquid",
      problem:
        "A container of water (density 1000 kg/m³) accelerates horizontally at 5 m/s². Find the pressure difference between two points on the bottom, 2 m apart along the direction of acceleration.",
      solutionSteps: [
        "In the accelerating frame, pressure increases in the direction OPPOSITE to the acceleration (just like pressure increases with depth under gravity) — here horizontally instead of vertically.",
        "The pressure gradient is: ΔP = ρ·a·L, where L is the separation along the direction of acceleration.",
        "Substitute ρ = 1000 kg/m³, a = 5 m/s², L = 2 m: ΔP = 1000×5×2.",
      ],
      answer: "ΔP = 10,000 Pa (10 kPa) — higher at the back of the container (the end facing away from the direction of motion).",
    },
    {
      title: "Illustration 3 — Finding Flow Speed from a Pressure Difference (Bernoulli)",
      problem:
        "Water (density 1000 kg/m³) flows through a horizontal pipe with a pressure drop of 4000 Pa between two points at the same height, where the flow speeds are negligible at the wider section. Find the flow speed at the narrower section.",
      solutionSteps: [
        "For horizontal flow (no height change), Bernoulli's theorem reduces to: P₁ + ½ρv₁² = P₂ + ½ρv₂².",
        "If v₁ ≈ 0 at the wide section, then P₁ − P₂ = ½ρv₂² ⇒ v₂ = √(2ΔP/ρ).",
        "Substitute ΔP = 4000 Pa, ρ = 1000 kg/m³: v₂ = √(2×4000/1000) = √8.",
      ],
      answer: "v₂ = 2√2 ≈ 2.83 m/s.",
    },
    {
      title: "Illustration 4 — Terminal Velocity Using Stokes' Law",
      problem:
        "A small steel ball of radius 3 mm and density 8000 kg/m³ falls through oil of density 1000 kg/m³ and viscosity 0.1 Pa·s. Find its terminal velocity. (g = 10 m/s²)",
      solutionSteps: [
        "At terminal velocity, the net force is zero: weight = buoyant force + viscous drag (Stokes' law: F = 6πηrv).",
        "Solving this balance gives the standard terminal velocity formula: v_t = [2r²(ρ_ball − ρ_fluid)g]/(9η).",
        "Substitute r = 3×10⁻³ m, ρ_ball − ρ_fluid = 7000 kg/m³, g = 10, η = 0.1: v_t = [2(3×10⁻³)²(7000)(10)]/(9×0.1).",
        "= [2(9×10⁻⁶)(70000)]/0.9 = [1.26]/0.9.",
      ],
      answer: "v_t = 1.4 m/s.",
    },
    {
      title: "Illustration 5 — Excess Pressure: Soap Bubble vs. Liquid Drop",
      problem:
        "A soap bubble and a liquid drop, both of radius 1 mm, are formed from a liquid of surface tension 0.03 N/m. Find the excess pressure inside each.",
      solutionSteps: [
        "A liquid drop has only ONE surface (the liquid-air interface), giving excess pressure ΔP = 2T/R.",
        "A soap bubble has TWO surfaces (an inner and outer film, both under tension), giving DOUBLE that: ΔP = 4T/R.",
        "Substitute T = 0.03 N/m, R = 1×10⁻³ m: drop ⇒ ΔP = 2(0.03)/(10⁻³) = 60 Pa. Bubble ⇒ ΔP = 4(0.03)/(10⁻³) = 120 Pa.",
      ],
      answer: "Excess pressure in the drop = 60 Pa; in the soap bubble = 120 Pa (exactly double, due to the second surface).",
    },
    {
      title: "Illustration 6 — Capillary Rise",
      problem:
        "Water (surface tension 0.07 N/m, density 1000 kg/m³) rises in a capillary tube of radius 0.2 mm. Find the height of rise, assuming complete wetting (contact angle ≈ 0°). (g = 10 m/s²)",
      solutionSteps: [
        "Capillary rise formula: h = 2Tcosθ/(ρgr), where θ is the angle of contact.",
        "For complete wetting, θ ≈ 0°, so cosθ ≈ 1.",
        "Substitute T = 0.07 N/m, ρ = 1000 kg/m³, g = 10 m/s², r = 0.2×10⁻³ m: h = 2(0.07)/(1000×10×0.2×10⁻³) = 0.14/2.",
      ],
      answer: "h = 0.07 m = 7 cm — capillary rise becomes dramatic in very thin tubes like this one.",
    },
  ],
};
