import type { ChapterNotes } from "./kinematics";

export const basicMathematicsAndVectorsNotes: ChapterNotes = {
  chapterName: "Basic Mathematics & Vectors",
  className: "11",
  intro:
    "Before any physics problem can be solved, a handful of mathematical tools need to be second nature: how angles and triangles behave, how a quantity's rate of change is found, how areas under curves are computed, and how multi-directional quantities — vectors — combine. This chapter collects exactly those tools. None of it is new mathematics by itself, but seeing it through a physics lens, with the notation and shortcuts physics problems actually use, is what makes the rest of the syllabus readable.",
  sections: [
    {
      heading: "1. Angles: Degrees and Radians",
      body:
        "An angle is the amount of rotation of a line about a fixed point, measured anticlockwise (positive) or clockwise (negative) from a reference direction. Physics almost always works in radians rather than degrees, because radian measure is what keeps calculus formulas — like the derivatives of sine and cosine — clean and unit-free.",
      bullets: [
        "One radian is the angle subtended at the centre of a circle by an arc whose length equals the radius: θ = (arc length)/(radius).",
        "1 radian ≈ 57.3°, and one full revolution = 360° = 2π rad.",
      ],
      formula: [{ label: "Degree–radian conversion", expression: "θ(rad) = θ(degree) × π/180" }],
    },
    {
      heading: "2. Trigonometric Ratios of an Angle",
      body:
        "In a right triangle, the trigonometric ratios connect an angle to the ratio of two of its sides. They appear constantly in physics whenever a vector, force, or velocity needs to be split along two perpendicular directions.",
      formula: [
        { label: "Basic ratios", expression: "sinθ = opposite/hypotenuse,  cosθ = adjacent/hypotenuse,  tanθ = opposite/adjacent" },
        { label: "Reciprocal ratios", expression: "cosecθ = 1/sinθ,  secθ = 1/cosθ,  cotθ = 1/tanθ" },
        { label: "Pythagorean identities", expression: "sin²θ + cos²θ = 1,  1 + tan²θ = sec²θ,  1 + cot²θ = cosec²θ" },
      ],
      bullets: [
        "Given any one ratio and the quadrant, every other ratio can be recovered from these identities — there's no need to memorise all six separately.",
      ],
    },
    {
      heading: "3. The Four Quadrants and Sign Rules",
      body:
        "As an angle sweeps past 90°, 180°, and 270°, the sign of each trig ratio changes depending on which quadrant it falls in. Tracking this correctly is essential whenever a problem hands you an angle bigger than 90°.",
      bullets: [
        "Quadrant I (0°–90°): all ratios positive.",
        "Quadrant II (90°–180°): only sine (and cosecant) positive.",
        "Quadrant III (180°–270°): only tangent (and cotangent) positive.",
        "Quadrant IV (270°–360°): only cosine (and secant) positive.",
        "A handy mnemonic for the order across quadrants I–IV: 'All Sin Tan Cos' are positive in turn.",
      ],
    },
    {
      heading: "4. Standard Angles and Allied-Angle Formulae",
      body:
        "Certain angles — 0°, 30°, 45°, 60°, 90° and their multiples — recur so often that their ratios are worth knowing outright. Ratios of related angles such as (90°−θ), (180°−θ), (180°+θ), and (−θ) all reduce back to a ratio of θ itself, with the sign fixed by the quadrant rule above.",
      formula: [
        { label: "Co-function pairs", expression: "sin(90°−θ) = cosθ,  cos(90°−θ) = sinθ,  tan(90°−θ) = cotθ" },
        { label: "Supplementary pairs", expression: "sin(180°−θ) = sinθ,  cos(180°−θ) = −cosθ,  tan(180°−θ) = −tanθ" },
        { label: "Negative angle", expression: "sin(−θ) = −sinθ,  cos(−θ) = cosθ,  tan(−θ) = −tanθ" },
      ],
      bullets: [
        "Worth memorising outright: sin30° = ½, sin45° = 1/√2, sin60° = √3/2 — cosine follows the mirror pattern, and tanθ = sinθ/cosθ.",
      ],
    },
    {
      heading: "5. Compound and Double Angle Formulae",
      body:
        "These identities expand a trig ratio of a sum or a doubled angle into ratios of the individual parts. They turn up directly in physics whenever a vector undergoes a further rotation, or when interference and SHM expressions need to be simplified.",
      formula: [
        { label: "Sum/difference", expression: "sin(A ± B) = sinA cosB ± cosA sinB" },
        { label: "Sum/difference", expression: "cos(A ± B) = cosA cosB ∓ sinA sinB" },
        { label: "Double angle", expression: "sin2A = 2 sinA cosA,   cos2A = cos²A − sin²A = 1 − 2sin²A" },
      ],
    },
    {
      heading: "6. Small-Angle Approximation",
      body:
        "For a small angle θ (roughly under 5°, and always measured in radians), sinθ ≈ θ, tanθ ≈ θ, and cosθ ≈ 1. This single approximation is what turns the simple pendulum, diffraction, and a long list of optics formulas into clean, linear expressions.",
      bullets: [
        "The angle must be substituted in radians — using degrees directly gives a wrong numerical answer.",
        "Example: sin1° = sin(π/180 rad) ≈ π/180 ≈ 0.01745.",
      ],
    },
    {
      heading: "7. Coordinate Geometry Essentials",
      body:
        "Physics frequently needs the distance between two points and the steepness of the line joining them — both come straight from coordinate geometry.",
      formula: [
        { label: "Distance formula", expression: "d = √[(x₂−x₁)² + (y₂−y₁)²]" },
        { label: "Slope of a line", expression: "m = (y₂−y₁)/(x₂−x₁) = tanθ" },
      ],
      bullets: [
        "On any graph, the slope at a point equals the value of the derivative there — this is the bridge between coordinate geometry and calculus used constantly in kinematics.",
      ],
    },
    {
      heading: "8. Differentiation: What dy/dx Actually Means",
      body:
        "The derivative dy/dx is the instantaneous rate of change of y with respect to x — the limiting value of Δy/Δx as Δx shrinks toward zero. In physics this one idea defines velocity (the rate of change of position) and acceleration (the rate of change of velocity).",
      formula: [
        { label: "Definition", expression: "dy/dx = lim(Δx→0) Δy/Δx" },
        { label: "Velocity and acceleration", expression: "v = ds/dt,   a = dv/dt" },
      ],
    },
    {
      heading: "9. Rules of Differentiation",
      body:
        "A small set of rules covers almost every derivative needed in the syllabus — constants drop out, powers come down as a multiplying factor, and products or quotients of two functions follow their own combination rules.",
      formula: [
        { label: "Constant rule", expression: "d/dx(c) = 0" },
        { label: "Power rule", expression: "d/dx(xⁿ) = n·xⁿ⁻¹" },
        { label: "Sum/difference rule", expression: "d/dx(u ± v) = du/dx ± dv/dx" },
        { label: "Product rule", expression: "d/dx(uv) = u(dv/dx) + v(du/dx)" },
        { label: "Quotient rule", expression: "d/dx(u/v) = [v(du/dx) − u(dv/dx)] / v²" },
        { label: "Standard derivatives", expression: "d/dx(sinx) = cosx,  d/dx(cosx) = −sinx,  d/dx(eˣ) = eˣ,  d/dx(ln x) = 1/x" },
      ],
    },
    {
      heading: "10. Maxima and Minima",
      body:
        "At a turning point of a function, the first derivative is zero. Whether that point is a maximum or a minimum is decided by the sign of the second derivative there.",
      formula: [
        { label: "Stationary point", expression: "dy/dx = 0" },
        { label: "Minimum test", expression: "d²y/dx² > 0  →  minimum" },
        { label: "Maximum test", expression: "d²y/dx² < 0  →  maximum" },
      ],
      bullets: [
        "This is the standard method behind results like 'projectile range is maximum at 45°' or 'potential energy is minimum at the equilibrium separation'.",
      ],
    },
    {
      heading: "11. Integration: Reversing Differentiation",
      body:
        "Integration undoes differentiation: given a rate, it recovers the total. This is exactly how velocity is recovered from acceleration, and position from velocity, by 'running the derivative backwards'.",
      formula: [
        { label: "Power rule", expression: "∫xⁿ dx = xⁿ⁺¹/(n+1) + c,   for n ≠ −1" },
        { label: "Special case", expression: "∫(1/x) dx = ln x + c" },
        { label: "Standard integrals", expression: "∫sinx dx = −cosx + c,  ∫cosx dx = sinx + c,  ∫eˣ dx = eˣ + c" },
      ],
      bullets: [
        "The constant c is pinned down using a known boundary condition — an initial position, an initial velocity, or similar.",
      ],
    },
    {
      heading: "12. Definite Integrals, Area Under a Curve, and Average Value",
      body:
        "A definite integral evaluated between two limits gives a pure number — geometrically, the area trapped between the curve and the x-axis over that interval. This is precisely how displacement is read off a velocity–time graph, or work off a force–displacement graph.",
      formula: [
        { label: "Definite integral", expression: "∫ₐᵇ f(x) dx = F(b) − F(a)" },
        { label: "Average value over [a, b]", expression: "y_avg = [∫ₐᵇ y dx] / (b − a)" },
      ],
      bullets: [
        "On a v–t graph, area above the time axis adds to displacement; area below it subtracts — net area gives net displacement, not total distance.",
      ],
    },
    {
      heading: "13. Recognising Standard Graph Shapes",
      body:
        "Many physics relationships reduce to one of a handful of standard curve shapes, and recognising the shape instantly tells you the underlying equation without needing to derive it from scratch.",
      bullets: [
        "y = mx (through the origin) or y = mx + c (with intercept c): straight line of slope m.",
        "y = kx²: a parabola — seen in distance vs. time under constant acceleration, or kinetic energy vs. velocity.",
        "xy = constant: a rectangular hyperbola — seen in Boyle's law (pressure vs. volume at constant temperature).",
        "y = e^(−kx): exponential decay — seen in radioactive decay and damped oscillations.",
        "x²/a² + y²/b² = 1: an ellipse — the shape of a planet's orbit around the Sun.",
      ],
    },
    {
      heading: "14. Quadratic Equations",
      body:
        "A second-degree equation in one variable, ax² + bx + c = 0, has two roots given by the standard quadratic formula. Plenty of physics problems — finding when a projectile returns to a given height, or when two moving bodies meet — boil down to solving exactly this kind of equation.",
      formula: [
        { label: "Roots", expression: "x = [−b ± √(b² − 4ac)] / 2a" },
        { label: "Sum and product of roots", expression: "x₁ + x₂ = −b/a,    x₁x₂ = c/a" },
        { label: "Nature of roots", expression: "Real & distinct if b²−4ac > 0; equal if = 0; imaginary if < 0" },
      ],
      bullets: [
        "A negative or imaginary root is often simply discarded as unphysical — for instance, a negative time before the situation described even begins.",
      ],
    },
    {
      heading: "15. Binomial Approximation",
      body:
        "When x is small compared to 1, (1 + x)ⁿ can be approximated by keeping only its first-order term. This single shortcut underlies low-speed limits in relativity, small-oscillation problems, and any 'find the small change' calculation.",
      formula: [{ label: "Binomial approximation", expression: "(1 + x)ⁿ ≈ 1 + nx,   for |x| ≪ 1" }],
      bullets: [
        "Example: √(0.98) = (1 − 0.02)^(1/2) ≈ 1 + (1/2)(−0.02) = 0.99 — far quicker than a direct square root.",
      ],
    },
    {
      heading: "16. Arithmetic and Geometric Progressions",
      body:
        "An arithmetic progression (AP) increases by a constant difference each step; a geometric progression (GP) increases by a constant ratio each step. Both appear in physics — AP in uniformly changing quantities, GP in problems like a bouncing ball losing a fixed fraction of its height on every bounce.",
      formula: [
        { label: "AP — nth term", expression: "aₙ = a + (n−1)d" },
        { label: "AP — sum of n terms", expression: "Sₙ = (n/2)[2a + (n−1)d]" },
        { label: "GP — nth term", expression: "aₙ = a·rⁿ⁻¹" },
        { label: "GP — sum of n terms", expression: "Sₙ = a(1−rⁿ)/(1−r)" },
        { label: "GP — sum to infinity (|r| < 1)", expression: "S∞ = a/(1−r)" },
      ],
    },
    {
      heading: "17. Mensuration Formulae Used in Physics",
      body:
        "A short reference list of area and volume formulae that recur across mechanics, thermodynamics, and electromagnetism — for spheres, cylinders, cones, and ellipses in particular.",
      formula: [
        { label: "Circle", expression: "Area = πr²,   Circumference = 2πr" },
        { label: "Sphere", expression: "Surface area = 4πr²,   Volume = (4/3)πr³" },
        { label: "Cylinder", expression: "Curved surface area = 2πrl,   Volume = πr²l" },
        { label: "Cone", expression: "Volume = (1/3)πr²h" },
        { label: "Ellipse", expression: "Area = πab   (a, b = semi-major and semi-minor axes)" },
      ],
    },
    {
      heading: "18. Scalars and Vectors",
      body:
        "A scalar quantity is completely described by a magnitude alone — mass, time, temperature, speed. A vector quantity needs both a magnitude and a direction to be fully specified — displacement, velocity, force. Vectors follow their own rules of addition; they cannot simply be added the way ordinary numbers are.",
      bullets: [
        "A vector is drawn as an arrow: its length represents magnitude, and the way it points represents direction.",
        "The magnitude of a vector A is written |A| or just A, and is always taken as non-negative.",
      ],
    },
    {
      heading: "19. Types of Vectors",
      body:
        "A handful of vector relationships are named often enough to be worth fixing clearly in mind.",
      bullets: [
        "Equal vectors: same magnitude and the same direction.",
        "Negative (opposite) vectors: same magnitude, opposite direction.",
        "Parallel vectors have an angle of 0° between them; antiparallel vectors have 180° between them. Collinear vectors simply lie along the same line, so the angle between them is either 0° or 180°.",
        "Unit vector: magnitude exactly 1, used only to mark a direction — Â = A/|A|.",
        "Null (zero) vector: zero magnitude, direction undefined. A vector added to its own negative always gives a null vector.",
        "Coplanar vectors lie in the same plane; note that any two vectors, by themselves, are always coplanar.",
        "Polar vectors (displacement, force) have a definite point of application. Axial vectors (angular velocity, torque, angular momentum) point along an axis of rotation, fixed using the right-hand rule.",
      ],
    },
    {
      heading: "20. Adding Two Vectors: Triangle and Parallelogram Laws",
      body:
        "To add two vectors graphically, place the tail of the second at the head of the first (triangle law) — the resultant runs from the start of the first to the end of the second. The parallelogram law gives the identical answer by drawing both vectors from a common point and taking the diagonal.",
      formula: [
        { label: "Magnitude of resultant", expression: "R = √(A² + B² + 2AB cosθ)" },
        { label: "Direction from A", expression: "tanα = B sinθ / (A + B cosθ)" },
        { label: "Maximum resultant (θ = 0°)", expression: "R_max = A + B" },
        { label: "Minimum resultant (θ = 180°)", expression: "R_min = |A − B|" },
      ],
      bullets: [
        "The resultant of two vectors of unequal magnitude can never be zero — only a pair that is equal in magnitude and exactly opposite in direction cancels completely.",
        "For two vectors of equal magnitude a separated by an angle θ, the resultant has magnitude 2a·cos(θ/2) and lies exactly along their angle bisector.",
      ],
    },
    {
      heading: "21. Subtracting Two Vectors",
      body:
        "Subtracting B from A is the same as adding A to the negative of B — reverse B's direction, then add by the triangle law.",
      formula: [
        { label: "Definition", expression: "A − B = A + (−B)" },
        { label: "Magnitude", expression: "|A − B| = √(A² + B² − 2AB cosθ)" },
      ],
      bullets: [
        "Whenever a problem asks for the 'change' in a vector quantity — change in velocity, change in momentum — vector subtraction (not ordinary subtraction) is what's required.",
      ],
    },
    {
      heading: "22. Resolving a Vector into Rectangular Components",
      body:
        "Any vector can be split into two (within a plane) or three (in space) mutually perpendicular components, which recombine to reconstruct the original vector exactly. This is the single most-used vector technique in physics, since most real forces and motion don't conveniently line up along one axis.",
      formula: [
        { label: "Components in a plane", expression: "Aₓ = A cosα,   A_y = A sinα,   A = Aₓ î + A_y ĵ" },
        { label: "Recovering magnitude and angle", expression: "A = √(Aₓ² + A_y²),   tanα = A_y / Aₓ" },
        { label: "Components in three dimensions", expression: "A = Aₓ î + A_y ĵ + A_z k̂,   A² = Aₓ² + A_y² + A_z²" },
        { label: "Direction cosines", expression: "cosα = Aₓ/A,  cosβ = A_y/A,  cosγ = A_z/A;   cos²α + cos²β + cos²γ = 1" },
      ],
    },
    {
      heading: "23. Multiplying or Dividing a Vector by a Scalar",
      body:
        "Multiplying a vector A by a positive scalar k scales its magnitude to kA while its direction stays the same; multiplying by a negative scalar scales the magnitude and reverses the direction. Dividing by a scalar k follows the identical rule, with k replaced by 1/k.",
    },
    {
      heading: "24. Scalar (Dot) Product",
      body:
        "The scalar — or dot — product combines two vectors into a single number: the product of their magnitudes and the cosine of the angle between them. It measures how much one vector effectively acts along the direction of the other, which is exactly the physical meaning of work.",
      formula: [
        { label: "Definition", expression: "A·B = AB cosθ" },
        { label: "In components", expression: "A·B = AₓBₓ + A_yB_y + A_zB_z" },
        { label: "Work as a dot product", expression: "W = F·S = FS cosθ" },
      ],
      bullets: [
        "A·B is positive for θ < 90°, exactly zero when θ = 90° (the vectors are perpendicular), and negative for θ > 90°.",
        "A·A = A². For the unit vectors: î·î = ĵ·ĵ = k̂·k̂ = 1, while î·ĵ = ĵ·k̂ = k̂·î = 0.",
      ],
    },
    {
      heading: "25. Vector (Cross) Product",
      body:
        "The vector — or cross — product of two vectors produces a new vector: magnitude equal to the product of the two magnitudes and the sine of the angle between them, direction perpendicular to both, fixed by the right-hand rule. It is the natural tool whenever a physical effect depends on how far off-axis two vectors are from each other — torque and angular momentum being the standard examples.",
      formula: [
        { label: "Definition", expression: "A × B = AB sinθ n̂" },
        {
          label: "In components",
          expression: "A × B = (A_yB_z − A_zB_y) î − (AₓB_z − A_zBₓ) ĵ + (AₓB_y − A_yBₓ) k̂",
        },
        { label: "Examples in physics", expression: "Torque τ = r × F,   Angular momentum L = r × p,   Velocity v = ω × r" },
      ],
      bullets: [
        "A × B = −(B × A): swapping the order reverses the sign (and direction) of the result, not its magnitude.",
        "A × B is zero only when the two vectors are parallel or antiparallel — i.e. θ = 0° or 180°.",
        "For the unit vectors: î × ĵ = k̂, ĵ × k̂ = î, k̂ × î = ĵ — and reversing any pair in this cycle flips the sign.",
      ],
    },
  ],
};
