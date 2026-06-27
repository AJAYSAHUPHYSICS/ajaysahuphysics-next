import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const circularMotionJeeNotes: ChapterJeeNotes = {
  chapterName: "Circular Motion",
  className: "11",
  intro:
    "Fully worked, multi-step problems on circular motion — the combined banking-plus-friction, vertical-circle, and relative-angular-velocity setups that JEE Main and JEE Advanced actually ask, going a level deeper than the regular DPP.",
  examples: [
    {
      title: "Illustration 1 — Banked Road WITH Friction (Speed Range)",
      problem:
        "A road of radius 20 m is banked at an angle whose tangent is 0.75. The coefficient of friction between the tyres and the road is 0.5. Find the maximum and minimum speeds at which a vehicle can safely negotiate the curve. (g = 10 m/s²)",
      solutionSteps: [
        "When both banking and friction act together, the general formulas are: v_max = √[Rg(tanθ + μ)/(1 − μtanθ)] and v_min = √[Rg(tanθ − μ)/(1 + μtanθ)].",
        "Substitute R = 20, g = 10, tanθ = 0.75, μ = 0.5 into v_max: v_max = √[20×10×(0.75+0.5)/(1−0.5×0.75)] = √[200×1.25/0.625] = √400 = 20 m/s.",
        "Substitute into v_min: v_min = √[20×10×(0.75−0.5)/(1+0.5×0.75)] = √[200×0.25/1.375] = √36.36 ≈ 6.03 m/s.",
      ],
      answer: "v_max = 20 m/s, v_min ≈ 6.03 m/s — any speed between these is safe.",
    },
    {
      title: "Illustration 2 — Tension When the String Is Horizontal",
      problem:
        "A 1 kg bob moves in a vertical circle of radius 2 m on a string, with speed 10 m/s at the lowest point. Find the tension in the string at the instant the string is exactly horizontal. (g = 10 m/s²)",
      solutionSteps: [
        "When the string is horizontal, the bob has risen by a height equal to the radius l (θ = 90° from the bottom).",
        "Find speed there using energy conservation: v² = v₀² − 2gl(1−cos90°) = v₀² − 2gl = 10² − 2(10)(2) = 100 − 40 = 60 m²/s².",
        "At this position, gravity acts straight down — entirely tangential, contributing nothing to the radial direction. So the full centripetal force comes from tension alone: T = mv²/l = 1×60/2 = 30 N.",
      ],
      answer: "30 N (equal to 3mg at this instant).",
    },
    {
      title: "Illustration 3 — Conical Pendulum, Full Derivation",
      problem:
        "A conical pendulum has a string of length 2 m making an angle of 37° with the vertical. Find the speed of the bob and the time period of revolution. (g = 10 m/s², sin37° ≈ 0.6, cos37° ≈ 0.8, tan37° ≈ 0.75)",
      solutionSteps: [
        "Resolve tension into components: T cosθ balances weight (T cosθ = mg); T sinθ supplies centripetal force (T sinθ = mv²/r), where r = L sinθ.",
        "Dividing the two equations: tanθ = v²/(rg) ⇒ v² = rg tanθ = (L sinθ)(g)(tanθ) = Lg sinθ tanθ.",
        "Substitute: v² = (2)(10)(0.6)(0.75) = 9, so v = 3 m/s.",
        "Time period: T = 2π√(L cosθ/g) = 2π√(2×0.8/10) = 2π√0.16 = 2π(0.4) ≈ 2.51 s.",
      ],
      answer: "v = 3 m/s, T ≈ 2.51 s.",
    },
    {
      title: "Illustration 4 — Relative Angular Velocity, Opposite Senses",
      problem:
        "Two particles move on the same circle of radius 2 m, one at speed 4 m/s clockwise and the other at speed 6 m/s anticlockwise. Find the rate at which the angle between them (measured the short way) is closing.",
      solutionSteps: [
        "Convert each speed to angular velocity: ω₁ = v₁/r = 4/2 = 2 rad/s; ω₂ = v₂/r = 6/2 = 3 rad/s.",
        "Since the two particles move in OPPOSITE senses around the same circle, they approach each other from both sides at once — their angular velocities relative to each other simply ADD.",
        "Closing rate = ω₁ + ω₂ = 2 + 3.",
      ],
      answer: "5 rad/s.",
    },
    {
      title: "Illustration 5 — Identifying the Regime in Vertical Circular Motion",
      problem:
        "A ball on a string of length 1.6 m is given a speed of 8 m/s at the lowest point. Determine whether the ball completes the full circle, oscillates, or leaves the circular path partway. (g = 10 m/s²)",
      solutionSteps: [
        "Compute the two threshold speeds for l = 1.6 m: √(2gl) = √(2×10×1.6) = √32 ≈ 5.66 m/s, and √(5gl) = √(5×10×1.6) = √80 ≈ 8.94 m/s.",
        "Compare the given speed (8 m/s) against these: 5.66 < 8 < 8.94.",
        "This places the speed in the middle range, where the ball rises above the level of the centre but the string goes slack before reaching the top.",
      ],
      answer: "The ball leaves the circular path partway up and continues as a projectile.",
    },
    {
      title: "Illustration 6 — Effective Gravity in a Horizontally Accelerating Frame",
      problem:
        "A vertical circular loop is set up inside a trolley accelerating horizontally at a = g (numerically equal to g). Find the effective gravity magnitude and its direction relative to the true vertical, as felt inside the trolley.",
      solutionSteps: [
        "Inside a horizontally accelerating frame, effective gravity combines real gravity (downward, magnitude g) with the pseudo force's effective acceleration (backward, magnitude a), at right angles to each other.",
        "Magnitude: g_eff = √(g² + a²) = √(g² + g²) = g√2.",
        "Direction: tanφ = a/g = g/g = 1, so φ = 45° from the true vertical.",
      ],
      answer: "g_eff = g√2 (≈ 14.14 m/s² if g = 10 m/s²), tilted 45° from vertical.",
    },
  ],
};
