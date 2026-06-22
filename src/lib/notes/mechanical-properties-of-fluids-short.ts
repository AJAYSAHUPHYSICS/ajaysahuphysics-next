export type ShortNoteGroup = {
  heading: string;
  points: string[];
};

export type ChapterShortNotes = {
  chapterName: string;
  className: "11" | "12";
  groups: ShortNoteGroup[];
};

export const mechanicalPropertiesOfFluidsShortNotes: ChapterShortNotes = {
  chapterName: "Mechanical Properties of Fluids",
  className: "11",
  groups: [
    {
      heading: "Pressure in a Fluid",
      points: [
        "P = ΔF/ΔA — SI unit Pa; dimensions [M¹L⁻¹T⁻²]. Pressure is a SCALAR.",
        "1 atm = 1.013 × 10⁵ Pa = 760 mm of Hg.",
        "Pressure at depth h: P = P₀ + hρg.",
        "Gauge pressure = hρg (excess over atmospheric); Absolute pressure = P₀ + hρg.",
        "Average pressure on a vertical wall of height h = hρg/2 (half the bottom value, since P rises linearly with depth).",
      ],
    },
    {
      heading: "Pascal's Law & Hydraulic Machines",
      points: [
        "Pascal's law: pressure change in an enclosed fluid is transmitted equally & undiminished to every point.",
        "Hydraulic lift: F₁/A₁ = F₂/A₂ ⇒ F₂ = (A₂/A₁)F₁.",
        "Applications: hydraulic lift, press, jack, brakes — force is gained only by sacrificing displacement (no free energy).",
      ],
    },
    {
      heading: "Buoyancy & Archimedes' Principle",
      points: [
        "Buoyant force Th = weight of fluid displaced = V_in·σ·g.",
        "Th depends ONLY on submerged volume and fluid density — NEVER on the object's own mass, density, or shape.",
        "Acts upward through the centre of buoyancy (C.G. of displaced fluid, not of the object).",
        "Apparent weight = W − Th. This is why things feel lighter in water.",
      ],
    },
    {
      heading: "Principle of Floatation",
      points: [
        "ρ > σ ⇒ sinks. ρ = σ ⇒ floats fully submerged (neutral equilibrium). ρ < σ ⇒ floats partly submerged.",
        "R.D. of solid = W_A/(W_A − W_W) (Archimedes' method).",
        "Specific gravity of unknown liquid = (W_A − W_L)/(W_A − W_W).",
      ],
    },
    {
      heading: "Equation of Continuity & Types of Flow",
      points: [
        "A₁v₁ = A₂v₂ = constant for steady, incompressible flow; Q = Av (volume flow rate).",
        "Steady/streamline flow: velocity at a fixed point doesn't change with time; streamlines never cross.",
        "Laminar: smooth parallel layers. Turbulent: chaotic, eddies, high energy loss — occurs at high speed.",
        "Narrower cross-section ⇒ faster flow (continuity); this is the basis for every Bernoulli application below.",
      ],
    },
    {
      heading: "Bernoulli's Theorem",
      points: [
        "P + ½ρv² + ρgh = constant (per unit volume) — valid for ideal fluid: incompressible, non-viscous, steady, irrotational.",
        "Per unit mass: P/ρ + v²/2 + gh = constant. Per unit weight: P/ρg + v²/2g + h = constant (pressure head + velocity head + gravitational head).",
        "Horizontal flow (h const): P + ½ρv² = constant — faster flow ⇒ lower pressure, and vice versa.",
        "Real (viscous) fluids lose energy as heat — not accounted for in the ideal Bernoulli equation.",
      ],
    },
    {
      heading: "Applications of Bernoulli's Theorem",
      points: [
        "Torricelli's law (speed of efflux): v = √(2gh) — same as free-fall speed through height h.",
        "Venturimeter: v₁ = A₂√[2gh/(A₁²−A₂²)] — measures flow speed from a height difference h in side-tubes.",
        "Aerofoil/wing lift: faster flow over the top ⇒ lower pressure there ⇒ net upward lift.",
        "Magnus effect: spin drags air around the ball, speeding flow (lowering pressure) on one side ⇒ curved path (swing/spin).",
        "Atomizer/sprayer: fast air jet ⇒ low pressure ⇒ draws liquid up and disperses it as spray.",
        "Fast trains / storm winds: lower pressure near the fast-moving object pulls nearby objects toward it.",
      ],
    },
    {
      heading: "Viscosity & Newton's Law",
      points: [
        "F = ηA(dv/dy); η = (F/A)/(dv/dy) — viscous force ∝ area & velocity gradient.",
        "SI unit: Pa·s (poiseuille); CGS: poise (1 Pa·s = 10 poise). Dimensions [M¹L⁻¹T⁻¹].",
        "η depends only on the fluid's nature & temperature — NOT on area or velocity gradient.",
        "Liquids: η ↓ as T ↑ (weaker cohesion). Gases: η ↑ as T ↑ (faster molecular momentum exchange) — opposite trends!",
      ],
    },
    {
      heading: "Stokes' Law & Terminal Velocity",
      points: [
        "Stokes' law: viscous drag on a falling sphere F_v = 6πηrv.",
        "Terminal velocity: v_T = 2r²(ρ−σ)g/9η — grows with r² (radius squared).",
        "At terminal velocity: weight = buoyant force + viscous force (zero net acceleration).",
        "Applications: raindrop terminal speed, cloud droplets 'floating', parachutes, Millikan's oil-drop experiment.",
      ],
    },
    {
      heading: "Reynolds Number & Poiseuille's Formula",
      points: [
        "Re = ρvd/η — ratio of inertial to viscous forces.",
        "Re < 1000: laminar. Re > 2000: turbulent. 1000–2000: unstable transition.",
        "Poiseuille's formula: Q = πPr⁴/(8ηL) — flow rate ∝ r⁴, extremely sensitive to radius.",
        "Viscosity is largely independent of pressure for both liquids and gases.",
      ],
    },
    {
      heading: "Surface Tension & Surface Energy",
      points: [
        "T = F/L — SI unit N/m (= J/m²); dimensions [M¹L⁰T⁻²].",
        "T = dW/dA — surface tension = work done per unit increase in surface area.",
        "Cause: surface molecules have fewer neighbours ⇒ net inward pull ⇒ surface minimizes its area (like a stretched membrane).",
        "T decreases as temperature rises; becomes zero at the critical temperature.",
        "Soluble impurities (salt) ⇒ T increases. Partially-soluble/surfactants (detergent, soap) ⇒ T decreases.",
        "Drop (1 surface): W = T × 4πr². Soap bubble (2 surfaces): W = T × 8πr².",
      ],
    },
    {
      heading: "Excess Pressure in Drops & Bubbles",
      points: [
        "Drop or air bubble IN liquid (1 surface): P_excess = 2T/r.",
        "Soap bubble in air (2 surfaces): P_excess = 4T/r — double that of a single-surface drop of the same radius.",
        "Excess pressure ∝ 1/r — smaller bubble/drop has HIGHER internal pressure than a larger one.",
        "Two connected bubbles of different sizes: air flows from the smaller (higher-pressure) into the larger one.",
      ],
    },
    {
      heading: "Angle of Contact & Capillary Rise",
      points: [
        "h = 2Tcosθ/(rρg) — capillary rise (or depression).",
        "θ < 90° (acute): liquid wets solid, concave meniscus, liquid RISES (water–glass, θ≈0°).",
        "θ > 90° (obtuse): liquid doesn't wet solid, convex meniscus, liquid is DEPRESSED (mercury–glass).",
        "Jurin's law: h ∝ 1/r — narrower capillary ⇒ greater rise.",
        "Real-world capillarity: lamp wicks, fountain pen nibs, water rising through soil/plant tissue.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Don't confuse the bubble-in-liquid case (1 surface, 2T/r) with the soap-bubble-in-air case (2 surfaces, 4T/r) — a very common one-mark slip.",
        "Buoyant force never depends on the object's own density or mass — only on submerged volume and fluid density. Students often wrongly drag the object's density into the Th formula.",
        "Viscosity of liquids and gases respond OPPOSITELY to rising temperature (liquids: ↓, gases: ↑) — easy to mix up under exam pressure.",
        "Terminal velocity ∝ r² (radius squared, from Stokes' law), NOT ∝ r — a frequent algebra slip when scaling between two drops of different sizes.",
        "Bernoulli's equation requires an IDEAL fluid (non-viscous, incompressible, steady, irrotational) — it does not directly apply to real, viscous flow without modification.",
        "Capillary rise h ∝ 1/r (Jurin's law) — inverse, not direct proportionality; doubling the radius HALVES the rise, not doubles it.",
        "Pressure is a scalar, but the force due to pressure is a vector acting perpendicular to the surface — don't describe 'pressure' itself as having a direction.",
      ],
    },
  ],
};
