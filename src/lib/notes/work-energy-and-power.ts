import type { ChapterNotes } from "./kinematics";

export const workEnergyAndPowerNotes: ChapterNotes = {
  chapterName: "Work, Energy & Power",
  className: "11",
  intro:
    "Laws of Motion solved problems by tracking force at every instant. This chapter offers a shortcut: track energy instead. Work links force to energy, the work-energy theorem connects that energy to motion, and once potential energy and conservation enter the picture, many problems that look painful with F = ma become a one-line energy equation. Power then asks how fast that work gets done.",
  sections: [
    {
      heading: "1. Work Done by a Constant Force",
      body:
        "Work is done on a body whenever a force acting on it produces a displacement. For a constant force, work is simply the product of the force and the component of displacement along the force's own direction.",
      formula: [
        { label: "Work done", expression: "W = F · d = Fd cosθ" },
      ],
      bullets: [
        "θ is the angle between the force vector and the displacement vector.",
        "Work is a scalar — built from two vectors through a dot product, it ends up with a sign but no direction of its own.",
        "Only the component of the force along the displacement contributes; a force acting exactly perpendicular to the motion does zero work, no matter how large it is.",
      ],
    },
    {
      heading: "2. Work Done by a Variable Force",
      body:
        "When a force changes in magnitude or direction as the body moves, the path is broken into infinitesimally small displacements. Over each tiny displacement the force can be treated as constant, and the total work is the sum of all these small contributions — which is exactly what an integral computes.",
      formula: [
        { label: "Small element of work", expression: "dW = F · dr" },
        { label: "Total work", expression: "W = ∫ F · dr  (from position 1 to position 2)" },
        { label: "One-dimensional case", expression: "W = ∫ F(x) dx" },
      ],
      bullets: [
        "This is the only reliable method when the force depends on position — a spring force, or any force given as an algebraic function of x.",
        "For a force with a known x-dependence, set up the limits as the initial and final x-values and integrate directly.",
      ],
    },
    {
      heading: "3. Work from a Force–Displacement Graph",
      body:
        "Since the work done over a small displacement is just F dx, work has the same geometric meaning as area under a curve. Plotting the force (or its component along the displacement) against position turns the work calculation into reading off an area.",
      bullets: [
        "Area lying above the displacement axis counts as positive work; area below the axis (force component pointing backward) counts as negative work — these must be added algebraically, not just totalled as area.",
        "This graphical method is the standard way variable-force work is tested when the force isn't handed to you as a clean algebraic expression.",
      ],
    },
    {
      heading: "4. Nature of Work Done — Positive, Negative, Zero",
      body:
        "The sign of work depends entirely on the angle between the force and the displacement.",
      bullets: [
        "Positive work (θ < 90°): the force has a component favouring the motion. A freely falling body has gravity doing positive work on it; a stretched spring's stretching force does positive work as it stretches.",
        "Negative work (θ > 90°): the force opposes the motion. Friction opposing sliding, and the braking force on a decelerating car, both do negative work.",
        "Zero work (F = 0, or displacement = 0, or θ = 90°): a body moving at constant velocity under zero net force; pushing against a wall that doesn't move; the tension in a swinging pendulum's string; the centripetal force in uniform circular motion, since it is always perpendicular to the velocity.",
      ],
    },
    {
      heading: "5. Work and the Choice of Reference Frame",
      body:
        "A force has the same value for every observer, but displacement does not — it depends on which frame is measuring it. Since work is built from both, work done by a given force can come out different in different frames.",
      bullets: [
        "Classic example: someone holding a bag steady inside a lift that is moving upward. In the lift's own frame the bag doesn't move at all, so the work done on it is zero. In the ground frame, the bag rises with the lift, and the same supporting force now does positive, non-zero work.",
      ],
    },
    {
      heading: "6. Units and Dimensions of Work and Energy",
      body:
        "Work and energy share identical units and dimensions, since one is simply a measure of the other.",
      formula: [
        { label: "SI unit", expression: "joule (J) = 1 N·m = 1 kg·m²/s²" },
        { label: "CGS unit", expression: "erg; 1 J = 10⁷ erg" },
        { label: "Other conversions", expression: "1 eV = 1.6 × 10⁻¹⁹ J;  1 kWh = 3.6 × 10⁶ J" },
        { label: "Dimensions", expression: "[Work] = [ML²T⁻²]" },
      ],
    },
    {
      heading: "7. Kinetic Energy",
      body:
        "Kinetic energy is the capacity a body has to do work purely because it is moving. It can be measured as the work needed to bring the body up to its current speed from rest, or equivalently, the work the body itself could do while being brought to rest.",
      formula: [{ label: "Kinetic energy", expression: "KE = ½mv²" }],
      bullets: [
        "Since KE depends on v² (not v itself), it can never be negative, no matter which direction the body moves.",
        "Like velocity, kinetic energy is frame-dependent — the same body can have different KE values as measured from different reference frames.",
      ],
    },
    {
      heading: "8. The Work-Energy Theorem",
      body:
        "The combined work done by every force acting on a body — conservative or not, internal or external — equals the change in its kinetic energy. This single statement quietly replaces a lot of force-by-force bookkeeping.",
      formula: [
        { label: "Work-energy theorem", expression: "W_total = ΔKE = ½mv_f² − ½mv_i²" },
      ],
      bullets: [
        "This holds for a single body analysed in an inertial frame — it is the safest, most general tool when several forces (gravity, friction, an applied push) act together.",
        "If kinetic energy decreases over some interval, the total work done during that interval must be negative, and vice versa.",
        "The theorem doesn't care whether the work is later 'stored' somewhere as potential energy — it only tracks the net change in motion energy.",
      ],
    },
    {
      heading: "9. Conservative, Non-Conservative, and Central Forces",
      body:
        "A force is conservative if the work it does between two points depends only on those two points, never on the path taken to get from one to the other. An equivalent test: the work done by a conservative force over any closed loop is exactly zero.",
      bullets: [
        "Gravity, the electrostatic force, the spring force, and intermolecular forces are all conservative.",
        "Friction and other forces that depend on velocity (air resistance, viscous drag) are non-conservative — the work they do depends on the actual length of the path, and is essentially always negative when they oppose motion.",
        "A central force always points along the line joining the body to a fixed centre, with a magnitude depending only on distance from that centre. Every force obeying an inverse-square law — gravity and the Coulomb force included — is a central force, and every central force is automatically conservative.",
      ],
    },
    {
      heading: "10. Potential Energy",
      body:
        "Potential energy is the energy a body holds because of its position or configuration, and it is only ever defined inside a conservative force field — non-conservative forces don't get a potential energy of their own. It is measured as the work done against the conservative force to bring the body from a chosen zero-reference point to its present position.",
      formula: [
        { label: "Force from potential energy (1-D)", expression: "F = −dU/dx" },
        { label: "Change in PE", expression: "ΔU = −W_conservative" },
      ],
      bullets: [
        "Potential energy is always measured relative to some chosen reference point where U is taken to be zero — only changes in U have direct physical meaning, not its absolute value.",
        "U comes out negative for attractive force fields (gravity, electrostatic attraction) and positive for repulsive ones, once a sensible reference point is chosen.",
      ],
    },
    {
      heading: "11. Potential Energy Curves and Types of Equilibrium",
      body:
        "Plotting U against position shows directly where the force vanishes — these are the points where the slope dU/dx is zero — and the curvature at each such point tells you what kind of equilibrium it is.",
      bullets: [
        "Stable equilibrium: U is at a local minimum. dU/dx = 0 and d²U/dx² > 0. A small displacement creates a restoring force that pushes the body back toward this point.",
        "Unstable equilibrium: U is at a local maximum. dU/dx = 0 and d²U/dx² < 0. A small displacement creates a force that pushes the body even further away.",
        "Neutral equilibrium: U stays constant over some region. dU/dx = 0 and d²U/dx² = 0 there. The body experiences no restoring or repelling tendency at all.",
      ],
    },
    {
      heading: "12. Law of Conservation of Mechanical Energy",
      body:
        "Mechanical energy is defined as the sum of a system's total kinetic energy and total potential energy. When only conservative internal forces act, and no external force does any net work, this sum stays exactly constant throughout the motion.",
      formula: [
        { label: "Mechanical energy", expression: "E = K + U = constant" },
        { label: "Equivalent statement", expression: "ΔK + ΔU = 0" },
      ],
      bullets: [
        "This is really the work-energy theorem in disguise: work done by an internal conservative force equals −ΔU, so the theorem W = ΔK rearranges directly into ΔK + ΔU = 0.",
        "The moment friction, air resistance, or any external force starts doing work, mechanical energy is no longer conserved — switch back to the more general work-energy theorem, which still holds in every case.",
      ],
    },
    {
      heading: "13. Spring Force and Spring Potential Energy",
      body:
        "An ideal spring resists being stretched or compressed and pushes or pulls back toward its natural length, following Hooke's law as long as the deformation stays within its elastic limit.",
      formula: [
        { label: "Hooke's law", expression: "F = −kx" },
        { label: "Elastic potential energy", expression: "U = ½kx²" },
        { label: "Work to stretch from x₁ to x₂", expression: "W = ½k(x₂² − x₁²)" },
      ],
      bullets: [
        "k is the spring (force) constant in N/m; a stiffer spring has a larger k.",
        "Because U depends on x², doubling the deformation doesn't double the stored energy — it quadruples it.",
        "The negative sign in Hooke's law just encodes that the spring force always opposes the displacement that caused it — a restoring force.",
      ],
    },
    {
      heading: "14. Spring-Block Systems — Standard Setups",
      body:
        "Most spring problems reduce to one energy-conservation equation, but the exact form depends on how the block meets the spring.",
      bullets: [
        "Block dropped from height h directly onto a vertical spring, compressing it by x: mg(h + x) = ½kx² (gravity does work over the full fall, all of it converted to spring PE at the lowest point, where speed is momentarily zero).",
        "Block moving with speed v on a smooth horizontal surface collides with a spring: maximum compression x_max = v√(m/k), found by equating the block's initial KE to the spring's stored PE.",
        "Mass hung from a vertical spring and lowered gently (quasi-statically) to equilibrium: extension x = mg/k — a simple force-balance result.",
        "Same mass instead released suddenly from the spring's natural length (not lowered slowly): maximum extension reached is x_max = 2mg/k — exactly double the equilibrium value, because the block overshoots before the restoring force can bring it to rest. This doubling is found by energy conservation, not by assuming an instant force balance.",
      ],
    },
    {
      heading: "15. Power — Average and Instantaneous",
      body:
        "Power measures not just how much work gets done, but how quickly. It is defined as the rate at which work is done, or equivalently, the rate at which energy is transferred.",
      formula: [
        { label: "Average power", expression: "P_avg = ΔW/Δt = (total work)/(total time)" },
        { label: "Instantaneous power", expression: "P = dW/dt = F · v" },
      ],
      bullets: [
        "SI unit: watt (W) = 1 J/s. Common alternate unit: horsepower, 1 hp = 746 W.",
        "Power is a scalar, formed from the dot product of force and velocity — only the component of force along the instantaneous velocity contributes to power at any moment.",
        "Dimensions of power: [ML²T⁻³].",
      ],
    },
    {
      heading: "16. Power Graphs and Efficiency",
      body:
        "Work-time and power-time graphs carry the same relationships as displacement-velocity-acceleration graphs do in kinematics, just one level removed.",
      bullets: [
        "Area under a power-time graph equals the total work done over that interval.",
        "The slope of the tangent to a work-time graph at a point gives the instantaneous power at that instant.",
        "The slope of a straight line joining two points on a work-time graph gives the average power between those two points.",
        "Efficiency of any real machine is the ratio of useful work output to total energy input, and is always less than 1 because friction and other dissipative effects waste some of the energy supplied.",
      ],
      formula: [{ label: "Efficiency", expression: "η = (work output) / (energy input)" }],
    },
  ],
};
