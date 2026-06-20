import type { ChapterNotes } from "./kinematics";

export const lawsOfMotionNotes: ChapterNotes = {
  chapterName: "Laws of Motion",
  className: "11",
  intro:
    "Kinematics described motion without asking why it happens. This chapter answers that question. Newton's three laws connect force to motion, and once force is on the table, everything else follows — momentum, tension, pulleys, pseudo forces in accelerating frames, and friction. Together these ideas form the working toolkit for almost every mechanics problem in JEE and NEET.",
  sections: [
    {
      heading: "1. Newton's First Law of Motion",
      body:
        "A body continues in its state of rest, or of uniform motion in a straight line, unless an external force compels it to change that state. This is also called the law of inertia, and it directly contradicts the older (and wrong) idea that a force must constantly act on a body just to keep it moving.",
      bullets: [
        "The law is mostly qualitative — it tells us that force is whatever changes a body's state of rest or motion, without yet giving force a numerical measure.",
        "A body moving at constant velocity needs zero net force acting on it; it does not need a force to \"keep it going.\"",
      ],
    },
    {
      heading: "2. Force",
      body:
        "Force is any push or pull that changes, or tends to change, the state of rest or of uniform motion of a body.",
      bullets: [
        "A net force on a body can change its speed, its direction, both together, or its size and shape.",
        "SI unit of force is the newton (N); CGS unit is the dyne. Gravitational units kgf and gf are also used.",
      ],
      formula: [
        { label: "Conversion", expression: "1 kgf = 9.8 N" },
        { label: "Conversion", expression: "1 gf = 980 dyne" },
        { label: "Conversion", expression: "1 N = 10^5 dyne" },
      ],
    },
    {
      heading: "3. Inertia",
      body:
        "Inertia is a body's built-in resistance to any change in its state of rest or motion. Mass is simply the numerical measure of this resistance — the more massive a body, the harder it is to start, stop, speed up, or redirect.",
      bullets: [
        "Inertia of rest: resistance to starting motion. A sharp jerk removing a card from under a coin leaves the coin behind because it resists being set into motion.",
        "Inertia of motion: resistance to stopping motion. Passengers lurch forward when a moving bus brakes suddenly, because their bodies tend to keep moving at the bus's earlier speed.",
        "Inertia of direction: resistance to changing the direction of motion. Mud flung off a spinning wheel flies off tangentially rather than curving with the wheel, because it resists the change in direction.",
      ],
    },
    {
      heading: "4. Linear Momentum",
      body:
        "Linear momentum is the quantity of motion a moving body carries — the product of its mass and velocity. It is a vector, pointing the same way as the velocity.",
      formula: [{ label: "Momentum", expression: "p = mv" }],
      bullets: [
        "SI unit: kg·m/s. Dimensions: [M¹L¹T⁻¹].",
        "A heavy slow body and a light fast body can carry the same momentum — this is why a slow-moving truck can be just as hard to stop as a fast-moving car.",
      ],
    },
    {
      heading: "5. Newton's Second Law of Motion",
      body:
        "The net external force on a system equals the rate at which its momentum changes, and the change in momentum happens in the direction of the applied force. This law turns the qualitative idea of force from the first law into something measurable.",
      formula: [
        { label: "General form", expression: "F = dp/dt = m(dv/dt) + v(dm/dt)" },
        { label: "Constant mass", expression: "F = ma" },
      ],
      bullets: [
        "When mass is constant, the familiar F = ma applies directly.",
        "When mass itself changes with time — a conveyor belt picking up material, or a rocket burning fuel — the v(dm/dt) term cannot be dropped.",
        "Setting F = 0 in this law gives a = 0, which is exactly Newton's first law: the first law is really a special case of the second.",
      ],
    },
    {
      heading: "6. Impulse and the Impulse-Momentum Theorem",
      body:
        "When a large force acts for a very short time — a bat striking a ball, a hammer striking a nail — the product of force and time is called impulse. The impulse-momentum theorem states that impulse equals the total change in momentum it produces.",
      formula: [
        { label: "Impulse (constant force)", expression: "I = F·Δt = Δp" },
        { label: "Impulse (varying force)", expression: "I = ∫F dt = area under F-t graph" },
      ],
      bullets: [
        "For a fixed amount of momentum change, stretching the time of contact lowers the average force needed — this is why cricketers draw their hands back while catching a fast ball, and why vehicles use shock absorbers and bumpers to soften jerks.",
        "On a momentum-time graph, the slope at any point equals the force acting at that instant.",
      ],
    },
    {
      heading: "7. Conservation of Linear Momentum",
      body:
        "If the net external force on a system is zero, its total linear momentum stays constant. This follows directly from the second law: no force means no change in momentum.",
      bullets: [
        "Applies component-wise: momentum can be conserved along one direction even while changing along another, as long as the external force along that particular direction is zero.",
        "For a two-body system with no external force, any momentum gained by one body is exactly the momentum lost by the other — recoil of a gun and rocket propulsion both rely on this.",
      ],
    },
    {
      heading: "8. Newton's Third Law of Motion",
      body:
        "For every action there is an equal and opposite reaction. Whenever body A exerts a force on body B, body B simultaneously exerts an equal and opposite force on A.",
      bullets: [
        "Action and reaction always act on two different bodies — they can never appear together in the same free-body diagram, and they never cancel each other out for that reason.",
        "There is no time delay between action and reaction; neither one is strictly the \"cause\" of the other.",
        "This law applies to every kind of interaction force — gravity, tension, friction, normal reaction, electrostatic force — and whether the bodies are touching or not.",
        "Walking, swimming, and rocket propulsion are everyday examples: you push backward on the ground (or a rocket pushes exhaust gas backward), and the reaction pushes you (or the rocket) forward.",
      ],
    },
    {
      heading: "9. Free Body Diagrams and Normal Reaction",
      body:
        "A free body diagram (FBD) isolates one object and shows only the external forces acting directly on it — nothing else. Drawing a clean FBD is usually the single most important step in solving any force problem correctly.",
      bullets: [
        "Normal reaction (N) is the contact force a surface exerts on a body resting on it, always perpendicular to the surface and pushing away from it.",
        "For a block resting on a level table, equilibrium demands N = mg; the normal reaction adjusts itself to whatever balance is required — it is not always equal to weight once other forces or accelerations are involved.",
      ],
    },
    {
      heading: "10. Apparent Weight in a Lift",
      body:
        "The reading you'd get from a weighing scale under your feet — the normal reaction — is your apparent weight, and it does not always equal your actual weight mg. Inside an accelerating lift, the two can differ noticeably.",
      formula: [
        { label: "Lift at rest or constant velocity", expression: "N = mg" },
        { label: "Lift accelerating upward", expression: "N = m(g + a)" },
        { label: "Lift accelerating downward", expression: "N = m(g − a)" },
        { label: "Free fall (a = g, downward)", expression: "N = 0 (weightlessness)" },
      ],
      bullets: [
        "Apparent weight exceeds actual weight whenever the net acceleration of the lift points upward (speeding up while going up, or slowing down while going down).",
        "Apparent weight is less than actual weight whenever the net acceleration points downward (speeding up while going down, or slowing down while going up).",
        "If the lift's downward acceleration ever exceeds g, the apparent weight would have to go negative — in practice, this means the person lifts off the floor and presses against the ceiling instead.",
      ],
    },
    {
      heading: "11. Connected Bodies — Contact Force and String Tension",
      body:
        "When several bodies are pushed together or linked by strings, they all share the same acceleration (assuming rigid contact or an inextensible string). The standard approach: find the common acceleration from the whole system first, then isolate one body's FBD to find the unknown contact force or tension.",
      formula: [
        { label: "Common acceleration", expression: "a = F_net / (total mass being moved)" },
      ],
      bullets: [
        "For bodies in contact, the contact (normal) force between two blocks depends on which block the external force is applied to, even though the common acceleration of the system does not.",
        "Tension always pulls a body away from the point where the string is attached — strings can only pull, never push.",
        "A massless, frictionless string carries the same tension throughout its length; tension only varies along a string if the string itself has mass, or if friction acts where it passes over a support.",
        "If a force is applied directly to one end of a string, the tension throughout equals that applied force, regardless of what happens at the other end.",
      ],
    },
    {
      heading: "12. Pulley Systems",
      body:
        "An ideal pulley is massless and frictionless — its only job is to redirect the tension in a string, not change its magnitude. The classic Atwood machine, two unequal masses hanging on either side of a fixed pulley, is the foundation for nearly every pulley problem.",
      formula: [
        { label: "Atwood machine acceleration", expression: "a = (m₁ − m₂)g / (m₁ + m₂)" },
        { label: "Atwood machine tension", expression: "T = 2m₁m₂g / (m₁ + m₂)" },
        { label: "Reaction (thrust) on the pulley", expression: "R = 2T" },
      ],
      bullets: [
        "For an inclined-plane-plus-hanging-mass setup, replace mg in the formulas above with the component of weight along the incline (mg sinθ) for the block on the slope.",
        "When three or more masses are connected through one or more pulleys, write Newton's second law separately for each mass, then solve the resulting equations together — there's rarely a shortcut beyond doing this systematically.",
      ],
    },
    {
      heading: "13. Spring Force",
      body:
        "A spring resists being stretched or compressed, pushing or pulling back toward its natural (relaxed) length. Hooke's law describes this restoring force as long as the deformation stays within the spring's elastic limit.",
      formula: [{ label: "Hooke's law", expression: "F = −kx" }],
      bullets: [
        "k is the spring constant (also called force constant), measured in N/m — a stiffer spring has a larger k.",
        "The negative sign shows the force always opposes the displacement x: a stretched spring pulls back inward, a compressed spring pushes back outward.",
        "In problems with a spring in a steady state (constant acceleration, not yet oscillating), find the tension or force on the spring first, then get its extension or compression from x = F/k.",
      ],
    },
    {
      heading: "14. Pseudo Force and Non-Inertial Frames",
      body:
        "Newton's laws, in their simple form, only work in inertial frames — frames that are at rest or moving with constant velocity. Inside an accelerating frame (a braking bus, a turning car, an accelerating lift), Newton's laws appear to fail unless an extra, fictitious force is introduced.",
      formula: [{ label: "Pseudo force", expression: "F_pseudo = −ma_frame" }],
      bullets: [
        "The pseudo force always acts opposite to the frame's acceleration, with magnitude equal to (mass of the object) × (acceleration of the frame).",
        "It is not a real interaction force, so it never has a Newton's-third-law partner — it exists purely to make the bookkeeping work for an observer inside the accelerating frame.",
        "Classic example: a pendulum hanging inside an accelerating train tilts backward (opposite to the train's acceleration); an observer inside the train explains this tilt using the pseudo force, while an observer on the ground explains the same tilt using only the real forces and the train's actual acceleration.",
      ],
    },
    {
      heading: "15. Equilibrium of Concurrent Forces",
      body:
        "A body is in translational equilibrium when the vector sum of all forces acting on it is zero — meaning zero acceleration, whether the body is at rest (static equilibrium) or moving at constant velocity (dynamic equilibrium).",
      bullets: [
        "Two forces in equilibrium must be equal in magnitude and exactly opposite in direction.",
        "Three concurrent forces in equilibrium must form a closed triangle when drawn head-to-tail — this is the basis of Lami's theorem.",
        "For more than three forces, resolve everything into perpendicular x and y components and set each sum to zero separately; this analytical approach is more reliable than trying to force a geometric picture.",
      ],
      formula: [
        { label: "Lami's theorem", expression: "F₁/sinα = F₂/sinβ = F₃/sinγ (α, β, γ are the angles opposite each force)" },
      ],
    },
    {
      heading: "16. Friction — Static and Kinetic",
      body:
        "Friction is the component of the contact force between two surfaces that acts parallel to those surfaces, always opposing relative sliding or the tendency toward it. Modern understanding attributes friction to molecular-level attractive forces between surfaces at the points where they actually touch.",
      bullets: [
        "Static friction acts before relative sliding begins. It is self-adjusting — it grows to match whatever force is trying to cause sliding, up to a maximum value.",
        "Limiting friction is the maximum value static friction can reach; beyond this, the body starts to slide.",
        "Kinetic friction acts once sliding has begun, and stays essentially constant regardless of how fast the sliding is, as long as the normal reaction doesn't change.",
        "Friction force (except its limiting static value, in principle) is directly proportional to the normal reaction, and is independent of the apparent area of contact between the surfaces.",
      ],
      formula: [
        { label: "Static friction (maximum)", expression: "f_L = μ_s N" },
        { label: "Kinetic friction", expression: "f_k = μ_k N" },
      ],
    },
    {
      heading: "17. Angle of Friction and Angle of Repose",
      body:
        "These two angles describe the same physical limit from two different setups, and turn out to be numerically equal.",
      bullets: [
        "Angle of friction (λ): the angle that the resultant of the limiting friction force and the normal reaction makes with the normal reaction itself. tan λ = μₛ.",
        "Angle of repose (θ): the steepest angle an inclined surface can be tilted to before a body resting on it just begins to slide down on its own. tan θ = μₛ as well, so angle of repose = angle of friction.",
        "On an incline steeper than the angle of repose, a body released from rest will accelerate down the slope; on a gentler incline, static friction is enough to hold it in place.",
      ],
      formula: [
        { label: "Acceleration sliding down a rough incline", expression: "a = g(sinθ − μ_k cosθ)" },
        { label: "Retardation sliding up a rough incline", expression: "a = g(sinθ + μ_k cosθ)" },
      ],
    },
    {
      heading: "18. Two-Block Friction Systems",
      body:
        "When one block rests on another and a force is applied to either of them, the first question to ask is whether they move together or separately. The check: assume they move together, work out the common acceleration, then find the friction force this would require on the block with no force directly applied to it. Compare that required friction to the maximum available limiting friction.",
      bullets: [
        "If the required friction is within the limiting value, the blocks genuinely move together with the common acceleration calculated.",
        "If the required friction would have to exceed the limiting value, that's impossible — the blocks instead slip relative to each other and must be analyzed with separate free-body diagrams, each carrying its own kinetic friction term.",
        "Pulling a block is easier than pushing it at the same angle, because pulling reduces the normal reaction on the surface (some of the applied force acts upward), while pushing increases it — and a smaller normal reaction always means smaller limiting friction.",
      ],
    },
    {
      heading: "19. Reducing Friction; Advantages and Disadvantages",
      body:
        "Friction is often called a \"necessary evil\" — costly in some situations, indispensable in others.",
      bullets: [
        "Common ways to reduce friction: lubrication, using ball or roller bearings, streamlining shapes to cut drag, and moderate (not excessive) surface polishing — polishing a surface too much can actually increase friction, since the surfaces come into such close contact that molecular attraction between them grows stronger.",
        "Disadvantages: wastes energy as heat, causes wear and tear in machines, and limits the top speed of vehicles.",
        "Advantages: lets us walk and run, lets vehicle brakes and tyres bring a car to a stop, lets a pen write on paper, and lets a chalk mark a blackboard — all of these would be impossible on a perfectly frictionless surface.",
      ],
    },
  ],
};
