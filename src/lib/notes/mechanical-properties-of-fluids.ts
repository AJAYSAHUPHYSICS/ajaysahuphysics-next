import type { ChapterNotes } from "./kinematics";

export const mechanicalPropertiesOfFluidsNotes: ChapterNotes = {
  chapterName: "Mechanical Properties of Fluids",
  className: "11",
  intro:
    "Fluids — liquids and gases — don't have a fixed shape, so the ideas that worked for solids in the last chapter need to be replaced with new ones: pressure instead of stress, flow instead of strain. This chapter moves from a fluid completely at rest (pressure, buoyancy, floating) to a fluid in motion (continuity, Bernoulli's theorem, viscosity), and finishes with surface tension — a surprisingly powerful effect that explains everything from floating needles to capillary rise.",
  sections: [
    {
      heading: "1. Pressure in a Fluid",
      body:
        "Pressure is the normal force exerted per unit area by a fluid. Unlike stress in a solid, fluid pressure pushes equally in every direction at a point — it has no preferred direction of its own.",
      formula: [
        { label: "Pressure", expression: "P = ΔF / ΔA" },
        { label: "SI unit", expression: "Pa (1 Pa = 1 N/m²)" },
        { label: "Standard atmosphere", expression: "1 atm = 1.013 × 10⁵ Pa = 760 mm of Hg" },
        { label: "Pressure at depth h in a liquid", expression: "P = P₀ + hρg" },
      ],
      bullets: [
        "Pressure is a scalar — even though the force due to pressure acts along a definite direction (perpendicular to the surface), pressure itself doesn't point anywhere.",
        "Gauge pressure is the excess of a fluid's pressure over atmospheric pressure: P_gauge = hρg. Absolute pressure adds the atmosphere back in: P_abs = P₀ + hρg.",
        "A barometer (a vertical tube of mercury, closed at the top, open at the bottom in a mercury reservoir) is the standard way to measure atmospheric pressure directly: P₀ = ρ_Hg·g·h, with h ≈ 76 cm.",
        "The average pressure on a vertical wall of a container, from top (zero depth) to the bottom (depth h), works out to hρg/2 — half the value at the very bottom, since pressure increases linearly with depth.",
      ],
    },
    {
      heading: "2. Pascal's Law and Hydraulic Machines",
      body:
        "Pascal's law states that a change in pressure applied to an enclosed, incompressible fluid is transmitted equally to every point of the fluid and to the walls of its container, without any loss in magnitude.",
      formula: [
        { label: "Pascal's law", expression: "F₁/A₁ = F₂/A₂" },
        { label: "Output force on the larger piston", expression: "F₂ = (A₂/A₁) × F₁" },
      ],
      bullets: [
        "This is the working principle behind hydraulic lifts, hydraulic presses, hydraulic jacks, and hydraulic brakes — a small force on a small piston creates a large force on a larger piston, since the pressure stays the same throughout.",
        "The trade-off is exactly like a lever: the larger piston moves a smaller distance than the smaller piston, so no energy is created — force is gained only at the expense of displacement.",
      ],
    },
    {
      heading: "3. Buoyancy and Archimedes' Principle",
      body:
        "Any object immersed (fully or partly) in a fluid experiences an upward push from the fluid surrounding it, because the fluid pressure on its lower surface is greater than on its upper surface.",
      formula: [
        { label: "Archimedes' principle", expression: "Buoyant force (Th) = weight of fluid displaced = V_in·σ·g" },
      ],
      bullets: [
        "Buoyant force depends only on the volume of the object submerged and the density of the fluid (σ) — never on the object's own mass, density, or shape.",
        "Buoyant force is greater in a denser fluid for the same submerged volume — this is why the same object floats higher in sea water than in fresh water.",
        "The buoyant force acts vertically upward through the centre of buoyancy — the centre of gravity of the displaced fluid, not necessarily of the object itself.",
        "Apparent weight of a submerged object: W_app = W − Th. This is exactly why objects feel lighter underwater, and why a spring balance reads less when its hanging load is dipped into a liquid.",
      ],
    },
    {
      heading: "4. Principle of Floatation",
      body:
        "Whether an object sinks, floats fully submerged, or floats partly out of the liquid depends purely on comparing its own density (ρ) to the density of the liquid (σ).",
      bullets: [
        "ρ > σ: weight exceeds the maximum possible buoyant force, so the object sinks to the bottom.",
        "ρ = σ: weight exactly equals the buoyant force when fully submerged — the object floats fully submerged, in neutral equilibrium (it neither rises nor sinks further).",
        "ρ < σ: the object floats with only part of its volume submerged — just enough volume goes underwater (V_in) so that the displaced fluid's weight equals the object's own weight.",
        "Relative density of a solid via Archimedes' principle: R.D. = (weight in air)/(weight in air − weight in water) = W_A/(W_A − W_W).",
        "Specific gravity of an unknown liquid, found by weighing the same solid in it: (loss of weight in that liquid)/(loss of weight in water) = (W_A − W_L)/(W_A − W_W).",
      ],
    },
    {
      heading: "5. Types of Fluid Flow and the Equation of Continuity",
      body:
        "Before applying any energy or momentum argument to a flowing fluid, it helps to classify how it's flowing — and the equation of continuity is simply conservation of mass applied to that flow.",
      formula: [
        { label: "Equation of continuity (incompressible fluid)", expression: "A₁v₁ = A₂v₂ = constant" },
        { label: "Volume flow rate", expression: "Q = Av" },
      ],
      bullets: [
        "Steady (streamline) flow: the velocity at any fixed point in the fluid doesn't change with time, so every particle passing through that point follows the exact same path — a streamline. Streamlines never cross.",
        "Laminar flow: fluid moves in smooth, parallel layers with no mixing between them. Turbulent flow: irregular, with eddies and high energy loss — occurs at higher speeds.",
        "Compressible vs incompressible: gases readily change density under pressure; liquids are treated as practically incompressible.",
        "Wherever a streamline tube narrows, the equation of continuity forces the fluid to speed up — exactly why a garden hose nozzle increases jet speed, or why a river flows faster through a narrow gorge than across a wide plain.",
      ],
    },
    {
      heading: "6. Bernoulli's Theorem",
      body:
        "Bernoulli's theorem is simply the work-energy theorem applied to a flowing fluid: for an ideal fluid (incompressible, non-viscous, steady, irrotational flow), the total mechanical energy per unit volume stays the same along any streamline.",
      formula: [
        { label: "Bernoulli's equation (energy per unit volume)", expression: "P + ½ρv² + ρgh = constant" },
        { label: "Energy per unit mass", expression: "P/ρ + v²/2 + gh = constant" },
        { label: "Energy per unit weight", expression: "P/ρg + v²/2g + h = constant" },
      ],
      bullets: [
        "The three terms represent pressure energy, kinetic energy, and gravitational potential energy, each measured per unit volume of the fluid.",
        "In the per-unit-weight form, P/ρg is called the pressure head, v²/2g the velocity head, and h the gravitational head — all three add up to a constant 'total head' along a streamline.",
        "For horizontal flow (h constant), Bernoulli's equation reduces to P + ½ρv² = constant: wherever the fluid speeds up, its pressure must drop, and vice versa.",
        "Real fluids lose some energy to heat through viscosity, which Bernoulli's equation — derived for a non-viscous ideal fluid — does not account for.",
      ],
    },
    {
      heading: "7. Applications of Bernoulli's Theorem",
      body:
        "Bernoulli's theorem isn't just an abstract energy statement — it directly explains a long list of everyday and engineering phenomena, all built on the same idea: faster flow means lower pressure.",
      formula: [
        { label: "Speed of efflux from an orifice at depth h (Torricelli's law)", expression: "v = √(2gh)" },
        { label: "Venturimeter flow speed", expression: "v₁ = A₂√[2gh / (A₁² − A₂²)]" },
      ],
      bullets: [
        "Torricelli's law: liquid leaving a small hole at depth h below the free surface emerges with exactly the speed a body would reach falling freely through height h — deeper holes give a faster jet.",
        "Venturimeter: a constriction in a horizontal pipe, fitted with vertical side-tubes, is used to measure flow speed — the narrower section has higher speed and therefore lower pressure, and the height difference h in the side-tubes gives that pressure difference directly.",
        "Dynamic lift on an aerofoil/aircraft wing: the wing's shape forces air to move faster over the top surface than underneath, lowering pressure on top — the resulting pressure difference provides the upward lift.",
        "Magnus effect: a spinning ball drags a thin layer of air around with it, speeding up flow (and lowering pressure) on one side while slowing it down on the other — the resulting sideways force curves the ball's path, the basis of 'swing' and 'spin' in sports.",
        "A sprayer/atomizer pushes air at high speed across the open top of a tube dipped in liquid; the resulting low pressure there draws the liquid up and breaks it into a fine spray.",
        "A speeding train (or strong wind over a roof) lowers the air pressure right next to it; the higher-pressure air farther away pushes objects — or roof tiles — toward the low-pressure region, the reason standing too close to a fast train feels like being pulled toward it.",
      ],
    },
    {
      heading: "8. Viscosity and Newton's Law of Viscosity",
      body:
        "Viscosity is the internal friction within a fluid — the resistance one layer of fluid offers to sliding past an adjacent layer. It's why honey flows so much more sluggishly than water.",
      formula: [
        { label: "Newton's law of viscosity", expression: "F = ηA(dv/dy)" },
        { label: "Coefficient of viscosity", expression: "η = (F/A) / (dv/dy)" },
        { label: "SI unit", expression: "Pa·s (poiseuille); CGS unit: poise (1 Pa·s = 10 poise)" },
        { label: "Dimensions", expression: "[M¹L⁻¹T⁻¹]" },
      ],
      bullets: [
        "dv/dy is the velocity gradient — how sharply velocity changes moving perpendicular to the flow direction. A steeper gradient means a larger viscous force for the same contact area.",
        "η depends only on the nature of the fluid (and its temperature) — never on the area considered or the velocity gradient itself, exactly parallel to how Young's modulus works for solids.",
        "Viscosity of liquids decreases as temperature rises (molecules become more mobile, weakening cohesion); viscosity of gases increases with temperature (faster random motion increases momentum exchange between layers).",
      ],
    },
    {
      heading: "9. Stokes' Law and Terminal Velocity",
      body:
        "When a small sphere falls through a viscous fluid, the viscous drag grows with speed until it — together with buoyancy — exactly balances gravity, after which the sphere falls at a constant, maximum speed.",
      formula: [
        { label: "Stokes' law (viscous drag on a sphere)", expression: "F_v = 6πηrv" },
        { label: "Terminal velocity", expression: "v_T = 2r²(ρ − σ)g / 9η" },
      ],
      bullets: [
        "ρ is the density of the falling sphere, σ is the density of the surrounding fluid, and r is the sphere's radius — terminal velocity grows with the square of the radius, so larger drops fall noticeably faster than smaller ones.",
        "At terminal velocity: weight = buoyant force + viscous force, with zero net acceleration from that point onward.",
        "Real-world terminal velocity examples: raindrops fall much slower than free-fall would predict; clouds 'float' because their tiny water droplets have an extremely small terminal velocity; parachutes work by maximising air drag to keep terminal velocity low; Millikan used terminal velocity of oil drops to measure the electron's charge.",
      ],
    },
    {
      heading: "10. Reynolds Number and Poiseuille's Formula",
      body:
        "Reynolds number is a dimensionless number that predicts whether a given flow will stay smooth (laminar) or break into chaos (turbulent), while Poiseuille's formula gives the actual flow rate through a narrow tube.",
      formula: [
        { label: "Reynolds number", expression: "Re = ρvd / η" },
        { label: "Poiseuille's formula (flow through a capillary)", expression: "Q = πPr⁴ / (8ηL)" },
      ],
      bullets: [
        "Re < 1000: flow is laminar/streamline. Re > 2000: flow is turbulent. In between: an unstable transition region.",
        "Re is the ratio of inertial forces to viscous forces — high speed, high density, or low viscosity all push a flow toward turbulence.",
        "In Poiseuille's formula, P is the pressure difference across the tube, r its radius, and L its length — flow rate is extremely sensitive to radius (Q ∝ r⁴), so even a small narrowing of a tube (or a blood vessel) drastically cuts the flow.",
        "Viscosity of liquids is largely independent of pressure under ordinary conditions; the same is true for gases.",
      ],
    },
    {
      heading: "11. Surface Tension and Surface Energy",
      body:
        "A liquid's free surface behaves like a stretched elastic skin, always trying to shrink to the smallest possible area — this is why small drops pull themselves into spheres, the shape with minimum surface area for a given volume.",
      formula: [
        { label: "Surface tension", expression: "T = F / L" },
        { label: "SI unit", expression: "N/m (equivalently, J/m²)" },
        { label: "Dimensions", expression: "[M¹L⁰T⁻²]" },
        { label: "Surface tension as energy per unit area", expression: "T = dW/dA" },
      ],
      bullets: [
        "Cause: molecules at the surface have fewer neighbours pulling on them than molecules deep inside the liquid, so they experience a net inward pull — stretching the surface (increasing its area) requires doing work against this pull, and that work is stored as surface energy.",
        "Surface tension decreases as temperature rises, and becomes zero at the critical temperature, where the distinction between liquid and gas disappears.",
        "Adding a fully soluble impurity (e.g., common salt) increases surface tension; a partially soluble or surface-active substance (e.g., detergent, soap) decreases it — which is exactly why detergents are so effective at penetrating greasy, water-repelling dirt.",
        "Work done to form a liquid drop of radius r: W = T × 4πr² (one surface). For a soap bubble of radius r: W = T × 2 × 4πr² = 8πr²T (two surfaces — the bubble has both an inner and an outer liquid-air interface).",
      ],
    },
    {
      heading: "12. Excess Pressure in Drops and Bubbles",
      body:
        "A curved liquid surface always has higher pressure on its concave (inner) side than on its convex (outer) side — surface tension squeezes the curved film inward, just like a stretched balloon skin.",
      formula: [
        { label: "Excess pressure inside a liquid drop", expression: "P_excess = 2T / r" },
        { label: "Excess pressure inside an air bubble in a liquid", expression: "P_excess = 2T / R" },
        { label: "Excess pressure inside a soap bubble (in air)", expression: "P_excess = 4T / r" },
      ],
      bullets: [
        "A drop and an air bubble submerged in liquid each have only one curved liquid surface, so both follow the same 2T/r rule.",
        "A soap bubble in air has two surfaces — an inner and an outer liquid film boundary — so its excess pressure is exactly double that of a single-surfaced drop of the same radius.",
        "Excess pressure is inversely proportional to radius — this means a smaller bubble or drop has higher internal pressure than a larger one. If a small and a large bubble are connected, air flows from the smaller (higher-pressure) bubble into the larger one.",
      ],
    },
    {
      heading: "13. Angle of Contact and Capillary Rise",
      body:
        "When a liquid touches a solid surface, it curves near that contact line — whether it curves up (wetting) or down (non-wetting) depends on the balance between the liquid's own cohesion and its adhesion to the solid, and this is exactly what drives liquid up (or down) a thin capillary tube.",
      formula: [
        { label: "Capillary rise (or fall)", expression: "h = 2T cosθ / (rρg)" },
      ],
      bullets: [
        "Angle of contact θ < 90° (acute): liquid wets the solid, surface curves concave, liquid rises in a capillary — water in a clean glass tube (θ ≈ 0°) is the classic example.",
        "Angle of contact θ > 90° (obtuse): liquid does not wet the solid, surface curves convex, liquid is depressed in a capillary — mercury in a glass tube behaves this way.",
        "Jurin's law: for the same liquid and tube material, capillary rise h is inversely proportional to the tube's radius r — a narrower capillary pulls liquid up higher.",
        "Capillary action explains kerosene rising up a lamp's wick, ink rising through a fountain pen's nib, and water moving up through soil and narrow plant tissues.",
      ],
    },
  ],
};
