import type { ChapterJeeNotes } from "@/components/JeeNotesDisplay";

export const lawsOfMotionJeeNotes: ChapterJeeNotes = {
  chapterName: "Laws of Motion",
  className: "11",
  intro:
    "Fully worked, multi-step problems on connected bodies, pseudo forces, springs, and friction systems — the combined setups JEE Main and JEE Advanced build entire questions around, a level beyond the regular DPP.",
  examples: [
    {
      title: "Illustration 1 — Two-Block Friction System, Force on the Top Block",
      problem:
        "A 4 kg block rests on top of a 6 kg block, which lies on a frictionless floor. The coefficient of friction between the two blocks is 0.3. A horizontal force F is applied to the TOP (4 kg) block. Find the maximum F for which both blocks move together. (g = 10 m/s²)",
      solutionSteps: [
        "If they move together, the friction between the blocks is what drags the BOTTOM block along — so check the bottom block's requirement.",
        "Maximum friction available: f_max = μ(m_top)g = 0.3 × 4 × 10 = 12 N (the normal force between the blocks equals the top block's weight).",
        "This friction is the only horizontal force on the bottom block, so the maximum common acceleration it can sustain is a_max = f_max/m_bottom = 12/6 = 2 m/s².",
        "For the whole system at this acceleration: F_max = (m_top + m_bottom) × a_max = 10 × 2.",
      ],
      answer: "F_max = 20 N.",
    },
    {
      title: "Illustration 2 — Block on a Frictionless Incline Connected Over a Pulley",
      problem:
        "A 3 kg block rests on a frictionless 37° incline, connected by a string over a pulley at the top to a 2 kg block hanging vertically. Find the acceleration of the system and the tension. (Use sin37° ≈ 0.6, g = 10 m/s²)",
      solutionSteps: [
        "Set up Newton's second law for the system, taking the hanging mass's downward motion as positive: net driving force = m₂g − m₁g sinθ (gravity on the hanging mass minus the component of the incline block's weight along the slope).",
        "a = (m₂g − m₁g sinθ)/(m₁+m₂) = (2×10 − 3×10×0.6)/(3+2) = (20−18)/5 = 2/5.",
        "Find tension from the hanging block's equation: m₂g − T = m₂a ⇒ T = m₂(g−a) = 2(10−0.4).",
      ],
      answer: "a = 0.4 m/s², T = 19.2 N.",
    },
    {
      title: "Illustration 3 — Pseudo Force: Block Stationary on a Frictionless Incline Inside an Accelerating Truck",
      problem:
        "A block rests on a frictionless 45° incline fixed inside a truck. Find the horizontal acceleration the truck must have so the block stays at rest relative to the incline (without sliding down). (g = 10 m/s²)",
      solutionSteps: [
        "In the truck's (non-inertial) frame, the block experiences a backward pseudo force of magnitude ma, in addition to its real weight mg, where a is the truck's forward acceleration.",
        "For the block to stay in place on a frictionless incline, the net force along the incline must vanish: the pseudo force's component up the slope must exactly balance gravity's component down the slope.",
        "This balance condition works out to: a = g/tanθ (a standard result for this exact setup — derived from resolving both mg and ma along the incline and setting the net along-incline force to zero).",
        "Substitute θ = 45°: a = g/tan45° = g/1 = g.",
      ],
      answer: "a = g = 10 m/s² (the truck must accelerate forward at exactly g for a 45° incline).",
    },
    {
      title: "Illustration 4 — Spring Connecting Two Masses Under an Applied Force",
      problem:
        "Two blocks of mass 2 kg and 3 kg are connected by a spring of force constant 500 N/m on a frictionless table. A force of 50 N is applied to the 3 kg block, pulling it away from the 2 kg block. Find the spring's extension once both blocks move with the same (steady) acceleration.",
      solutionSteps: [
        "Once both blocks share the same acceleration, treat the system as a whole: a = F/(m₁+m₂) = 50/5 = 10 m/s².",
        "Now isolate the 2 kg block: the ONLY horizontal force on it is the spring force, which must supply its share of the acceleration: F_spring = m₁ × a = 2 × 10 = 20 N.",
        "Find the extension from Hooke's law: x = F_spring/k = 20/500.",
      ],
      answer: "x = 0.04 m = 4 cm.",
    },
    {
      title: "Illustration 5 — Tension at the Midpoint of a String with Mass",
      problem:
        "A uniform string of mass 2 kg and length 2 m hangs vertically, with an 8 kg block tied to its bottom end. The string is pulled upward from the top with a force of 120 N. Find the tension at the midpoint of the string. (g = 10 m/s²)",
      solutionSteps: [
        "Find the acceleration of the whole system (string + block) first: a = (F − total weight)/(total mass) = (120 − 10×10)/10 = 20/10 = 2 m/s².",
        "To find tension at the midpoint, isolate everything BELOW that point: the 8 kg block plus the bottom half of the string (mass 1 kg), total mass below = 8 + 1 = 9 kg.",
        "Apply Newton's second law to this lower portion: T_mid − (mass below)(g) = (mass below)(a) ⇒ T_mid = (mass below)(g+a) = 9(10+2).",
      ],
      answer: "T_mid = 108 N.",
    },
    {
      title: "Illustration 6 — Three Blocks in Series, Find Each String's Tension",
      problem:
        "Three blocks of mass 2 kg, 3 kg, and 5 kg are connected in a line by two strings on a frictionless table. A force of 50 N is applied to the 5 kg block (at the far end), pulling all three. Find the tension in each connecting string.",
      solutionSteps: [
        "Find the common acceleration of all three blocks together: a = F/(total mass) = 50/(2+3+5) = 5 m/s².",
        "The string between the 2 kg and 3 kg blocks only needs to accelerate the 2 kg block (the one with nothing pulling it from the far side): T₁ = m₁ × a = 2 × 5 = 10 N.",
        "The string between the 3 kg and 5 kg blocks needs to accelerate BOTH the 2 kg and 3 kg blocks together: T₂ = (m₁+m₂) × a = (2+3) × 5 = 25 N.",
      ],
      answer: "T₁ (nearer end) = 10 N, T₂ (nearer the applied force) = 25 N.",
    },
  ],
};
