import type { ChapterContent } from "./types";

// ─────────────────────────────────────────────────────────────────
// Subject Cluster: Mechanics (Class 11)
// basic-mathematics-and-vectors, physical-world-and-measurement,
// kinematics, laws-of-motion, work-energy-and-power,
// centre-of-mass-and-collisions, system-of-particles-and-rotational-motion,
// gravitation, circular-motion
// ─────────────────────────────────────────────────────────────────

export const mechanicsContent: Record<string, ChapterContent> = {
  "basic-mathematics-and-vectors": {
    introduction:
      "Basic Mathematics & Vectors is the toolkit chapter — it teaches the mathematical language every later chapter is written in, rather than testing standalone physics. You'll cover differentiation and integration as applied to motion, vector addition and resolution, and the dot and cross products that turn a word problem into a solvable equation. None of this is new mathematics exactly, but applying it to physical quantities like displacement and force is a genuinely different skill from applying it to abstract numbers, and that translation is what this chapter builds. There's no formal prerequisite beyond Class 10 mathematics, though comfort with trigonometric ratios helps immediately. Because the chapter feels like 'just revision,' many students rush through vector resolution and the dot/cross product geometry without building real fluency, then find themselves re-learning it mid-way through Laws of Motion or Current Electricity, at a worse time. The better approach is to slow down here: draw vector diagrams by hand rather than jumping straight to the formula, and deliberately practice resolving vectors at odd angles, not just the familiar 30°/45°/60° cases, until it becomes automatic rather than effortful.",
    whyItMatters:
      "Direct NEET/JEE questions from this chapter alone are rare, but a shaky grip on vector components silently costs marks across nearly every other chapter — Kinematics, Laws of Motion, Work-Energy-Power, and every electromagnetism chapter in Class 12 all assume this fluency without re-teaching it.",
    prerequisites: ["Class 10 mathematics", "Trigonometric ratios (sin, cos, tan) and basic geometry"],
    commonMistakes: [
      "Rushing through vector resolution because it 'feels like revision', then struggling to apply it under exam pressure later.",
      "Memorizing the dot and cross product formulas without building a physical picture of what each one represents.",
      "Only practicing vector resolution at standard angles (30°/45°/60°) instead of arbitrary ones.",
    ],
    studyStrategy:
      "Cover this before anything else — it's assumed knowledge from the first page of Kinematics onward. Don't try to 'master' it in isolation; a solid first pass here is enough, since real fluency comes from applying it inside later chapters.",
    revisionStrategy:
      "Don't schedule a separate revision pass for this chapter alone — instead, revisit vector resolution and dot/cross products every time they show up in a later chapter, until they're second nature.",
    pyqStrategy:
      "Standalone PYQs on this chapter are rare; instead, notice how often a Kinematics or Laws of Motion PYQ secretly depends on a vector-resolution step from here, and treat those as this chapter's real practice.",
    dppStrategy:
      "Use DPPs to build calculation speed on vector components and basic calculus — the goal is fast, correct execution, since this shows up as a sub-step inside much bigger problems later.",
    relatedChapters: [
      { slug: "kinematics", reason: "Vector resolution and calculus are used from the very first topic — relative velocity and projectile motion." },
      { slug: "laws-of-motion", reason: "Force resolution along inclines and connected-body problems rely directly on vector components." },
    ],
    faqs: [
      {
        question: "Is Basic Mathematics & Vectors directly tested in JEE or NEET?",
        answer: "Rarely as a standalone question, but its tools — vector resolution, dot/cross products, differentiation — are used inside a large fraction of Mechanics and Electromagnetism problems. Weak fundamentals here quietly cost marks throughout the syllabus.",
      },
      {
        question: "Do I need to know calculus before starting this chapter?",
        answer: "Only Class 10-level algebra and trigonometry are assumed going in. The chapter itself introduces the calculus you'll need, applied specifically to motion — you don't need prior calculus coursework.",
      },
      {
        question: "What's the difference between the dot product and the cross product?",
        answer: "The dot product of two vectors gives a scalar and is used for things like work done (force · displacement). The cross product gives a new vector, perpendicular to both original vectors, and is used for things like torque and angular momentum.",
      },
      {
        question: "How important is it to memorize vector identities?",
        answer: "Less important than being able to re-derive them quickly. Under exam pressure, a memorized-but-shaky identity is more likely to fail than one you understand well enough to reconstruct.",
      },
      {
        question: "Should I study this chapter in one sitting or alongside Kinematics?",
        answer: "A quick first pass on its own helps the notation feel familiar, but real mastery comes from applying it inside Kinematics and Laws of Motion — don't try to 'finish' vectors in isolation before moving on.",
      },
    ],
    examWeightageNotes:
      "Almost never asked as a standalone question in NEET/JEE, but its techniques are embedded in a large share of Mechanics and Electromagnetism questions across all three exams.",
  },

  "physical-world-and-measurement": {
    introduction:
      "Physical World & Measurement covers the units, dimensions, and precision that make physics a measurable science rather than a set of ideas. You'll work with the SI system, dimensional analysis, significant figures, and error propagation in experimental measurements. It's a short, largely conceptual chapter, but it teaches you to sanity-check every other answer in the syllabus — dimensional analysis alone can catch a wrong formula before you've even finished solving a problem. There's no real prerequisite beyond basic arithmetic and familiarity with common physical quantities like force and energy from earlier schooling. The chapter often feels 'not really physics' to students eager to get to mechanics, which leads many to skip the error-analysis portion (significant figures, propagation of error) — a mistake, since that section is actually one of the more predictable sources of a guaranteed one-mark NEET question. A good way to study it is to work out dimensional formulae for quantities you already know well (force, energy, pressure) so the process feels familiar, then extend to less obvious ones like coefficient of viscosity or Planck's constant, which appear much later in the syllabus but rely on exactly this dimensional method.",
    whyItMatters:
      "This chapter contributes a small, steady handful of direct, formula-based questions almost every year in NEET and JEE Main — usually on dimensional formulae, error analysis, or unit conversion — making it a low-effort, high-reliability place to secure marks.",
    prerequisites: ["Basic arithmetic", "Familiarity with common physical quantities (force, energy, pressure) from earlier schooling"],
    commonMistakes: [
      "Skipping the significant-figures and error-propagation section because it feels less important than 'real' physics.",
      "Memorizing a list of dimensional formulae instead of learning to derive them from a quantity's defining equation.",
      "Losing marks on 'correct number of significant figures' questions purely from careless rounding, not a conceptual gap.",
    ],
    studyStrategy:
      "Study this immediately after (or alongside) Basic Mathematics & Vectors, before Kinematics — dimensional consistency checks are useful from day one of solving real mechanics problems.",
    revisionStrategy:
      "Keep a running personal list of dimensional formulae as you meet new quantities across the year (viscosity, Planck's constant, permittivity), rather than trying to memorize them all upfront in one sitting.",
    pyqStrategy:
      "This chapter's PYQs repeat patterns heavily — checking a given formula's dimensional consistency, or finding an error in a measurement — so a focused PYQ pass here has an unusually high return per hour spent.",
    dppStrategy:
      "Use DPPs to drill significant-figure rules and error-propagation formulas until the arithmetic is fast — these are easy marks lost purely to careless rounding, not conceptual gaps.",
    relatedChapters: [
      { slug: "basic-mathematics-and-vectors", reason: "Both are foundational, non-mechanics-specific chapters typically studied together at the start of Class 11." },
    ],
    faqs: [
      {
        question: "How many marks does Physical World & Measurement typically carry in NEET?",
        answer: "Usually one direct question, sometimes none, but it's one of the more predictable topics — dimensional analysis and significant figures are asked in a fairly repetitive style across years.",
      },
      {
        question: "What is dimensional analysis actually used for, beyond exams?",
        answer: "It's a sanity check: if the dimensions on both sides of an equation you've derived don't match, you know you've made an error, even without checking the numbers. It also lets you guess the form of a formula you don't fully remember.",
      },
      {
        question: "Do significant figures really matter for exam marks?",
        answer: "Yes, in questions that specifically ask for an answer 'to the correct number of significant figures' — these are graded strictly, and it's an easy, low-conceptual-load mark to secure with practice.",
      },
      {
        question: "What's the difference between accuracy and precision?",
        answer: "Accuracy is how close a measurement is to the true value; precision is how consistent repeated measurements are with each other. A precise instrument can still be inaccurate if it's poorly calibrated.",
      },
      {
        question: "Is this chapter relevant to JEE Advanced?",
        answer: "Less directly than to NEET/JEE Main — JEE Advanced rarely asks a standalone question from this chapter, but dimensional analysis remains a useful problem-solving shortcut throughout the exam.",
      },
    ],
    examWeightageNotes:
      "Typically one direct question in NEET and JEE Main most years; rarely a standalone JEE Advanced question, though the dimensional-analysis technique is used as a shortcut elsewhere.",
  },

  kinematics: {
    introduction:
      "Kinematics is where physics starts describing real motion — position, velocity, and acceleration — without yet asking what causes them. You'll work through motion in a straight line, motion graphs, relative velocity, and projectile motion, the last of which is a perennial JEE and NEET favourite. The main prerequisite is comfort with vectors and basic calculus from the previous chapter, since this is the first place those tools get real physical meaning. A common mistake is treating 1D motion and 2D (projectile) motion as separate skills, rather than recognizing that projectile motion is just two independent 1D motions — horizontal and vertical — happening at the same time; students who miss this waste time re-deriving results that follow directly from equations they already know. The most reliable way to study this chapter is to master graph interpretation first, since slope gives velocity and area gives displacement, and a large share of exam questions test graph-reading rather than raw formula substitution. Once graphs feel natural, relative velocity and projectile motion both become extensions of the same core ideas rather than new topics to learn from scratch.",
    whyItMatters:
      "This is the first chapter where vector skills become physically meaningful, and projectile motion and relative-motion ideas resurface constantly in Circular Motion, Laws of Motion, and even later electromagnetism, where the motion of a charged particle in a field is analyzed the same way.",
    prerequisites: ["Basic Mathematics & Vectors", "Comfort with differentiation and integration applied to simple functions"],
    commonMistakes: [
      "Treating projectile motion as one combined problem instead of splitting it into independent horizontal and vertical components.",
      "Relying on formula recall for motion graphs instead of being able to read slope and area directly.",
      "Setting up relative velocity subtraction (velocity of A relative to B = velocity of A − velocity of B) incorrectly in river-boat and rain-umbrella problems.",
    ],
    studyStrategy:
      "Study straight-line motion and graphs first, then relative velocity, then projectile motion last — each builds directly on the one before it, and projectile motion in particular assumes graph fluency.",
    revisionStrategy:
      "Revise by re-deriving the standard equations of motion from calculus rather than re-memorizing them — this catches gaps faster than passively re-reading notes.",
    pyqStrategy:
      "Prioritize PYQs involving motion graphs and relative velocity in rain/river-boat problems — these two sub-topics repeat across years far more often than raw equation-of-motion plugging.",
    dppStrategy:
      "Use DPPs specifically to practice non-standard projectile setups — launch from a height, or a projectile on an incline — since the standard case alone won't prepare you for JEE-style variations.",
    relatedChapters: [
      { slug: "laws-of-motion", reason: "Laws of Motion explains WHY the motion described here happens — force produces the acceleration studied in Kinematics." },
      { slug: "circular-motion", reason: "Circular motion applies the same velocity/acceleration framework from Kinematics to a curved path." },
    ],
    faqs: [
      {
        question: "What's the difference between speed and velocity?",
        answer: "Speed is a scalar — just the magnitude of how fast something moves. Velocity is a vector — it includes direction. An object moving in a circle at constant speed has a constantly changing velocity, because direction keeps changing.",
      },
      {
        question: "How should I approach projectile motion problems in exams?",
        answer: "Split the motion into horizontal (constant velocity) and vertical (constant acceleration due to gravity) components immediately, and solve them independently before combining. Trying to handle both directions at once is the most common source of errors.",
      },
      {
        question: "Are motion graphs really important for NEET/JEE?",
        answer: "Very. A large share of kinematics questions are graph-based rather than pure calculation — you need to be fluent in reading slope and area from a graph, not just applying formulas.",
      },
      {
        question: "What is relative velocity and why does it confuse students?",
        answer: "Relative velocity is how fast one object appears to move as seen from another moving object. It confuses students mainly in river-boat and rain-umbrella problems, where the vector subtraction is set up incorrectly.",
      },
      {
        question: "Do I need calculus to solve Kinematics problems?",
        answer: "For most standard problems, the algebraic equations of motion (v = u + at, etc.) are enough. Calculus becomes necessary when acceleration itself changes with time or position — a favourite twist in JEE Advanced.",
      },
    ],
    examWeightageNotes:
      "A reliable, near-guaranteed source of questions in NEET; appears both standalone and folded into multi-concept mechanics problems in JEE Main and Advanced.",
  },

  "laws-of-motion": {
    introduction:
      "Laws of Motion introduces force as the cause of the acceleration studied in Kinematics — Newton's three laws, friction, and the analysis of connected bodies like blocks on strings, pulleys, and inclined planes. The core prerequisite is Kinematics itself, since you need to already be fluent with acceleration and vector components before force analysis makes sense. The single most common mistake is drawing an incomplete or wrong free-body diagram — missing the normal force on an incline, or getting friction's direction backwards — because everything downstream of the diagram follows mechanically from it; one wrong arrow produces a wrong final answer even with flawless algebra afterward. The right way to study this chapter is to physically practice drawing free-body diagrams for dozens of different setups — blocks on inclines, connected blocks over pulleys, blocks stacked on blocks — until identifying every force acting on an object becomes automatic rather than something you have to consciously think through each time. Friction deserves particular attention: static and kinetic friction behave differently, and mixing up when each applies is a very common, very avoidable source of lost marks.",
    whyItMatters:
      "This is one of the most consequential chapters in the entire syllabus — nearly every later mechanics topic, including Work-Energy-Power, Circular Motion, and System of Particles, either extends these ideas directly or assumes you can draw a correct free-body diagram without thinking twice.",
    prerequisites: ["Kinematics", "Basic Mathematics & Vectors (force resolution along inclines and other angles)"],
    commonMistakes: [
      "Drawing an incomplete free-body diagram — a missing normal force or a friction force in the wrong direction breaks every equation that follows.",
      "Confusing static and kinetic friction, or applying the maximum static friction value in a case where the object isn't actually on the verge of sliding.",
      "In pulley/connected-block problems, assuming an inconsistent direction for acceleration or tension across the different blocks in the system.",
    ],
    studyStrategy:
      "Study Newton's three laws and basic free-body diagrams first, then friction, then connected-body/pulley problems last, since those combine everything before them into one setup.",
    revisionStrategy:
      "Revise by re-drawing free-body diagrams from memory for a mixed set of setups, rather than re-reading theory — the diagram IS the understanding in this chapter.",
    pyqStrategy:
      "Pulley and connected-block PYQs recur constantly across years with only the numbers changed — recognizing the setup pattern is worth more than memorizing any single solved example.",
    dppStrategy:
      "Use DPPs to build speed on identifying forces correctly in unfamiliar geometries — blocks on wedges, blocks stacked on blocks — before timing pressure is added.",
    relatedChapters: [
      { slug: "kinematics", reason: "Laws of Motion explains the cause of the motion Kinematics only described — force produces the acceleration studied there." },
      { slug: "circular-motion", reason: "Centripetal force problems are a direct application of Newton's second law to curved paths." },
      { slug: "work-energy-and-power", reason: "Work-Energy-Power reframes the same force problems using energy methods, often faster than force analysis alone." },
    ],
    faqs: [
      {
        question: "Why is the free-body diagram so important in this chapter?",
        answer: "Every equation you write afterward comes directly from the forces you've identified in the diagram. If a force is missing or its direction is wrong, the rest of the otherwise-correct algebra still gives a wrong answer — this is the single biggest source of errors in this chapter.",
      },
      {
        question: "What's the difference between static and kinetic friction?",
        answer: "Static friction acts on an object that isn't yet sliding, and adjusts itself, up to a maximum value, to prevent motion. Kinetic friction acts once the object is actually sliding, and is usually treated as constant, with a coefficient slightly lower than the maximum static value.",
      },
      {
        question: "How do I solve connected-block (pulley) problems without getting confused?",
        answer: "Draw a separate free-body diagram for each block, assume a consistent direction for acceleration and tension across the whole system, and write Newton's second law for each block separately before combining the equations.",
      },
      {
        question: "Is Newton's third law ever tested directly?",
        answer: "Yes, often as a conceptual question — usually testing whether students understand that action-reaction pairs act on two DIFFERENT objects, and therefore never cancel each other out for a single object's own motion.",
      },
      {
        question: "How much weightage does this chapter carry in JEE Main?",
        answer: "It's consistently one of the higher-weightage Class 11 mechanics chapters, both directly and as a building block inside System of Particles, Circular Motion, and Rotational Motion questions.",
      },
    ],
    examWeightageNotes:
      "A near-guaranteed source of one or more direct NEET questions every year; appears constantly in JEE Main and Advanced, both standalone and inside longer multi-body problems.",
    importantTips: [
      "Always draw the free-body diagram before writing a single equation — don't try to shortcut this even for 'simple-looking' problems.",
      "When in doubt about friction direction, remember it always opposes relative (or impending) motion, not motion in general.",
    ],
  },

  "work-energy-and-power": {
    introduction:
      "Work, Energy & Power reframes the mechanics built so far — instead of tracking forces and accelerations moment to moment, you track energy: work done, kinetic and potential energy, and the work-energy theorem that connects them, along with power as the rate of doing work. The prerequisite is Laws of Motion, since you need force and free-body-diagram fluency before energy methods make full sense as an alternative approach. The most common mistake is defaulting to force methods out of habit even when a problem is clearly better suited to an energy approach, or vice versa — strong students develop a feel for which tool fits which problem, and that judgment only comes from deliberately practicing both approaches on the same problems until you can see which is faster. A useful early exercise is to take a few already-solved Laws of Motion problems and re-solve them using energy conservation instead, which builds exactly this instinct. Conservative and non-conservative forces are worth understanding carefully too, since potential energy is only defined for conservative forces like gravity and spring force, never for friction.",
    whyItMatters:
      "This chapter gives you a second, often much faster, way to solve problems that would otherwise require messy force analysis — a skill JEE Advanced particularly rewards, since it regularly sets up problems where energy methods are dramatically quicker than a Laws-of-Motion approach.",
    prerequisites: ["Laws of Motion", "Basic integration (for variable-force work calculations)"],
    commonMistakes: [
      "Defaulting to force-based methods out of habit even when a problem is clearly asking for an energy approach.",
      "Trying to define a potential energy for a non-conservative force like friction, which isn't possible.",
      "Confusing the work-energy theorem (always true) with conservation of mechanical energy (only true without friction or other non-conservative forces doing work).",
    ],
    studyStrategy:
      "Study work and the work-energy theorem first, then potential energy and conservative forces, then power last, since power is a quick add-on once energy is understood.",
    revisionStrategy:
      "Revise by taking 2-3 previously-solved Laws of Motion problems and re-solving them with energy methods instead — this cements when each approach is faster.",
    pyqStrategy:
      "Spring-block and pendulum-with-energy-conservation PYQs repeat heavily — build fluency with these two setups specifically, since they combine most of the chapter's core ideas in one problem.",
    dppStrategy:
      "Use DPPs on problems that combine energy conservation with other mechanics concepts — like a block sliding down and compressing a spring — to practice multi-step solutions rather than single-formula plugging.",
    relatedChapters: [
      { slug: "laws-of-motion", reason: "Energy methods are an alternative to (and often faster than) the force analysis learned in Laws of Motion, for the same class of problems." },
      { slug: "centre-of-mass-and-collisions", reason: "Collisions are analyzed using energy and momentum conservation, both introduced conceptually in this chapter." },
    ],
    faqs: [
      {
        question: "When should I use energy methods instead of force methods?",
        answer: "Energy methods are usually faster when you only need the speed or position at a specific point, not the full time-dependent motion, and especially when forces change with position (like a spring) rather than being constant.",
      },
      {
        question: "What's the difference between conservative and non-conservative forces?",
        answer: "A conservative force, like gravity or a spring force, does work that depends only on the start and end positions, not the path taken — this lets you define a potential energy for it. Non-conservative forces like friction dissipate energy depending on the actual path, so no potential energy can be defined for them.",
      },
      {
        question: "Is the work-energy theorem the same as conservation of energy?",
        answer: "Not quite. The work-energy theorem says the NET work done on an object equals its change in kinetic energy — it's true always, even with friction. Conservation of mechanical energy is a special case that only holds when no non-conservative forces are doing work.",
      },
      {
        question: "How is power different from energy in exam questions?",
        answer: "Energy (or work) is a total amount; power is the rate at which that work is done or energy is transferred, measured in watts. A question giving you power and time is really asking you to find total work done, and vice versa.",
      },
      {
        question: "Why does JEE Advanced particularly favour this chapter?",
        answer: "Because it rewards judgment, not just formula recall — the best JEE Advanced problems are solvable quickly with the right energy insight, but take much longer with brute-force kinematics, testing whether a student recognizes the shortcut.",
      },
    ],
    examWeightageNotes:
      "Steady, formula-direct questions in NEET most years; a consistent presence in JEE Main and a favoured source of concept-testing problems in JEE Advanced.",
  },

  "centre-of-mass-and-collisions": {
    introduction:
      "Centre of Mass & Collisions shifts focus from single particles to systems of multiple bodies — locating a system's centre of mass, understanding how it moves under external forces regardless of internal interactions, and analyzing elastic and inelastic collisions using momentum, and for elastic collisions, energy conservation. The prerequisites are Laws of Motion, for momentum, and Work-Energy-Power, for the energy side of elastic collisions. The most common mistake is forgetting that momentum conservation applies to the system as a whole, not to each object individually — students sometimes try to apply Newton's laws to each colliding body separately, accounting for the complicated internal forces during the collision, when momentum conservation elegantly sidesteps that entire problem. A clean way to avoid errors is to clearly separate the two collision types in your head: elastic collisions conserve both momentum and kinetic energy, while inelastic collisions conserve only momentum. Mixing these up is the single most common error on collision problems, and it's entirely avoidable with a moment's check before writing any equations.",
    whyItMatters:
      "This chapter is a direct bridge between the single-particle mechanics of earlier chapters and the rigid-body mechanics of Rotational Motion that follows, and collision problems — especially 1D elastic/inelastic collisions and the coefficient of restitution — are a particularly reliable source of direct, formula-based NEET and JEE questions.",
    prerequisites: ["Laws of Motion (for momentum)", "Work-Energy-Power (for kinetic energy in elastic collisions)"],
    commonMistakes: [
      "Applying Newton's laws to each colliding body separately instead of using system-wide momentum conservation.",
      "Assuming kinetic energy is conserved in every collision, rather than only in elastic ones.",
      "Forgetting the extra vector-decomposition step required for 2D (oblique) collisions, and treating them like 1D problems.",
    ],
    studyStrategy:
      "Study centre of mass (location and motion) first, then momentum conservation, then elastic and inelastic collisions last, since collisions are really just momentum conservation applied to a specific scenario.",
    revisionStrategy:
      "Revise by re-deriving the standard 1D elastic collision velocity formulas from the two conservation equations (momentum and kinetic energy), rather than memorizing the final result.",
    pyqStrategy:
      "Centre-of-mass-of-a-system-with-a-removed-part PYQs, like a disc with a hole cut out, are a recurring, somewhat trick-based pattern worth specifically practicing.",
    dppStrategy:
      "Use DPPs on 2D (oblique) collisions specifically — 1D collisions are usually well-practiced by this point, but 2D problems require an extra vector-decomposition step that catches many students off guard.",
    relatedChapters: [
      { slug: "work-energy-and-power", reason: "Elastic collisions rely directly on the kinetic energy conservation concept introduced in Work-Energy-Power." },
      { slug: "system-of-particles-and-rotational-motion", reason: "Centre of mass is the conceptual bridge into rigid-body rotational mechanics, which treats an object as a system of particles." },
    ],
    faqs: [
      {
        question: "What is the centre of mass, in simple terms?",
        answer: "It's the single point that represents the average position of a system's mass, weighted by how the mass is distributed. When you apply an external force to a system, the centre of mass moves exactly as if all the mass were concentrated at that one point.",
      },
      {
        question: "What's the real difference between elastic and inelastic collisions?",
        answer: "In an elastic collision, both momentum and kinetic energy are conserved. In an inelastic collision, only momentum is conserved — some kinetic energy is converted to heat, sound, or deformation. A perfectly inelastic collision is the extreme case where the two objects stick together afterward.",
      },
      {
        question: "Why can't I just apply Newton's second law to each object during a collision?",
        answer: "You technically could, but the force during a collision changes rapidly and is very hard to model directly. Momentum conservation sidesteps this entirely by looking only at the state before and after the collision, without needing to know what happened during it.",
      },
      {
        question: "What is the coefficient of restitution?",
        answer: "It's a number between 0 and 1 that measures how 'bouncy' a collision is — the ratio of relative velocity of separation to relative velocity of approach. e=1 means perfectly elastic, e=0 means perfectly inelastic.",
      },
      {
        question: "Does the centre of mass have to be located inside the object?",
        answer: "No. For irregular or hollow shapes, like a ring or a boomerang, the centre of mass can lie outside the physical material of the object entirely — it's a mathematical point, not necessarily a physical one.",
      },
    ],
    examWeightageNotes:
      "Consistently tested in both NEET and JEE; 1D collision and coefficient-of-restitution problems are especially reliable, repeated formats.",
  },

  "system-of-particles-and-rotational-motion": {
    introduction:
      "System of Particles & Rotational Motion extends everything you know about linear mechanics — force, momentum, kinetic energy — to spinning and rolling bodies, introducing torque, moment of inertia, angular momentum, and the parallel and perpendicular axis theorems. Rotational mechanics has a direct linear-mechanics analogue for almost every concept — torque parallels force, moment of inertia parallels mass, angular momentum parallels momentum — and exam questions test whether you can carry that analogy through correctly, rather than just memorizing a new, disconnected set of formulas. The prerequisites are Laws of Motion and Centre of Mass, since you need force analysis and the centre-of-mass concept before rotational dynamics makes sense. The most common mistake is treating moment of inertia as a fixed property of an object rather than something that depends on the chosen axis of rotation — the same disc has a different moment of inertia depending on whether the axis passes through its centre or its edge, and forgetting this leads directly to wrong answers. A genuinely useful study habit is building the linear-to-rotational translation table yourself, rather than being handed one, since constructing it is what makes the analogy actually stick.",
    whyItMatters:
      "It's one of the most calculation-heavy chapters in Class 11, deliberately so, and a consistently high-weightage topic in JEE Advanced, where multi-step problems combining rolling motion, torque, and energy conservation are common — it also appears steadily in NEET and JEE Main.",
    prerequisites: ["Laws of Motion", "Centre of Mass & Collisions"],
    commonMistakes: [
      "Treating moment of inertia as a fixed property of an object, rather than something that depends on the chosen axis.",
      "Forgetting to apply the parallel or perpendicular axis theorem when the rotation axis isn't through the centre of mass.",
      "Missing the v = ωr relationship in rolling-without-slipping problems, which is the key equation that connects linear and angular motion.",
    ],
    studyStrategy:
      "Study torque and moment of inertia first, then angular momentum, then rolling motion — which combines translation and rotation — last, since rolling motion is the most demanding synthesis of everything before it.",
    revisionStrategy:
      "Revise using the linear-rotational analogy table — force↔torque, mass↔moment of inertia, momentum↔angular momentum — as your primary memory aid, rather than treating rotational formulas as a separate list.",
    pyqStrategy:
      "Rolling-without-slipping PYQs, like a ball or cylinder rolling down an incline, are extremely common and combine torque, moment of inertia, and energy conservation in one problem — master this exact setup first.",
    dppStrategy:
      "Use DPPs on angular momentum conservation problems, like a person on a rotating platform pulling their arms in, since these test conceptual understanding more than raw calculation and are a favourite NEET/JEE conceptual-twist format.",
    relatedChapters: [
      { slug: "centre-of-mass-and-collisions", reason: "Centre of mass is the foundational concept that rotational motion builds on when treating an extended body as a system of particles." },
      { slug: "circular-motion", reason: "Circular motion covers the kinematics of a single particle moving in a circle, which rotational motion extends to entire rigid bodies." },
      { slug: "gravitation", reason: "Angular momentum conservation from this chapter is the same principle behind Kepler's second law in planetary motion." },
    ],
    faqs: [
      {
        question: "Why does moment of inertia depend on the axis of rotation?",
        answer: "Moment of inertia measures how mass is distributed relative to a specific axis — mass farther from the axis contributes more. Since the distribution of mass relative to the axis changes when you move the axis, the moment of inertia changes too, even though the object itself hasn't changed.",
      },
      {
        question: "What's the difference between torque and force?",
        answer: "Force causes linear acceleration; torque causes angular acceleration. Torque depends not just on the force applied but also on where and at what angle it's applied relative to the axis of rotation.",
      },
      {
        question: "What does 'rolling without slipping' actually mean?",
        answer: "It means the point of contact between a rolling object and the surface is instantaneously at rest — there's no relative sliding. This gives a direct relationship between linear and angular velocity, v = ωr, which is the key equation that unlocks most rolling motion problems.",
      },
      {
        question: "Is angular momentum always conserved?",
        answer: "Only when there's no external torque acting on the system — exactly analogous to linear momentum being conserved only when there's no external force. A classic example is a spinning ice skater pulling their arms in: no external torque, so angular momentum stays constant, but moment of inertia decreases, so angular velocity must increase.",
      },
      {
        question: "Why is this chapter considered so calculation-heavy?",
        answer: "Because most problems require combining several concepts — torque, moment of inertia about a specific axis, and often energy or momentum conservation — in a single multi-step solution, rather than a single formula application.",
      },
    ],
    examWeightageNotes:
      "A consistently high-weightage topic in JEE Advanced, where multi-concept rolling-motion problems are common; steady presence in NEET and JEE Main.",
  },

  gravitation: {
    introduction:
      "Gravitation connects the mechanics studied on Earth to the motion of planets and satellites — Newton's law of universal gravitation, Kepler's three laws, gravitational potential energy, and orbital and escape velocity. It's conceptually compact compared to a chapter like Rotational Motion, but it packs a lot of exam-relevant formulas into a relatively short syllabus, making it a reliable, scoring chapter once the core relations are clear. The main prerequisites are Circular Motion, since orbital motion is a special case of centripetal force, and Work-Energy-Power, for gravitational potential energy. The most common mistake is mishandling gravitational potential energy's sign convention — it's taken as negative, approaching zero only at infinite separation — and getting escape velocity or orbital energy problems wrong purely from a sign error rather than a conceptual one. A dependable way to study this chapter is to explicitly connect each new formula, like orbital velocity, escape velocity, or a satellite's time period, back to Kepler's laws and Newton's law of gravitation, rather than memorizing them as a disconnected formula sheet with no underlying structure.",
    whyItMatters:
      "This chapter contributes consistent, direct, formula-based questions almost every year in NEET — often among the more 'guaranteed' marks in the mechanics section — and appears in JEE Main and Advanced both standalone and combined with circular motion or energy conservation.",
    prerequisites: ["Circular Motion (orbital motion as centripetal force)", "Work-Energy-Power (for gravitational potential energy)"],
    commonMistakes: [
      "Getting the sign of gravitational potential energy wrong, leading to incorrect escape-velocity or orbital-energy calculations.",
      "Confusing orbital velocity with escape velocity, or forgetting the fixed √2 relationship between them at the same height.",
      "Treating Kepler's laws and Newton's law of gravitation as unrelated facts instead of understanding one derives the other.",
    ],
    studyStrategy:
      "Study Newton's law of gravitation and Kepler's laws first, then gravitational potential energy, then orbital and escape velocity last, since those are direct applications of the energy concept.",
    revisionStrategy:
      "Revise by re-deriving escape velocity and orbital velocity from energy conservation each time, rather than recalling the final formula — this catches sign errors before they become habitual.",
    pyqStrategy:
      "Geostationary satellite PYQs, finding orbital radius, height above Earth, or velocity, repeat with only the given values changed — this specific setup is worth mastering completely.",
    dppStrategy:
      "Use DPPs on gravitational potential energy and binding energy problems specifically, since sign errors here are the single most common source of wrong answers in this chapter.",
    relatedChapters: [
      { slug: "circular-motion", reason: "Orbital motion is centripetal force analysis applied specifically to gravitational attraction — the same framework, a specific application." },
      { slug: "system-of-particles-and-rotational-motion", reason: "Kepler's second law (equal areas in equal times) is a direct consequence of angular momentum conservation, covered in Rotational Motion." },
    ],
    faqs: [
      {
        question: "Why is gravitational potential energy negative?",
        answer: "By convention, gravitational potential energy is taken to be zero at infinite separation between two masses. Since gravity is attractive, bringing masses closer together releases energy, making the potential energy at any finite separation negative relative to that zero reference.",
      },
      {
        question: "What's the difference between orbital velocity and escape velocity?",
        answer: "Orbital velocity is the speed needed to maintain a stable circular orbit at a given height. Escape velocity is the speed needed to completely break free of a planet's gravitational pull. Escape velocity is always √2 times the orbital velocity at the same height.",
      },
      {
        question: "Are Kepler's laws derived from Newton's law of gravitation, or separate?",
        answer: "Kepler's laws were discovered observationally, before Newton. Newton's law of gravitation, combined with his laws of motion, can be used to derive Kepler's laws mathematically — this is actually part of what convinced physicists that Newton's law was correct.",
      },
      {
        question: "Why does a geostationary satellite have to orbit at a specific height?",
        answer: "A geostationary satellite must have an orbital period of exactly 24 hours to stay above the same point on Earth. Since orbital period depends on orbital radius via Kepler's third law, this fixes the height to one specific value — roughly 36,000 km above Earth's surface.",
      },
      {
        question: "How reliable is Gravitation as a scoring chapter for NEET?",
        answer: "Quite reliable — it has a compact set of formulas, direct numerical questions are common, and the concepts, once understood, don't have as many tricky edge cases as a chapter like Rotational Motion.",
      },
    ],
    examWeightageNotes:
      "Consistent, direct, formula-based questions in NEET almost every year; appears in JEE Main and Advanced both standalone and combined with circular motion or energy conservation.",
  },

  "circular-motion": {
    introduction:
      "Circular Motion applies everything from Kinematics and Laws of Motion to a curved path — centripetal force and acceleration, banking of roads, conical pendulums, and the analysis of motion in a vertical circle, where the required speed changes continuously as gravity does more or less of the work of providing centripetal force. The prerequisites are Kinematics, for the velocity and acceleration framework, and Laws of Motion, since centripetal force problems are really just Newton's second law applied to a specific geometry. The most common mistake is thinking of centripetal force as an extra, separate force acting on an object, rather than recognizing it as simply the net inward component of the real forces already present — like gravity, tension, or the normal force — that happens to point toward the centre. This misunderstanding causes students to add an extra 'centripetal force' term into their free-body diagram, which double-counts a force that's already there. Vertical circular motion deserves particular attention: depending on the speed at the top of the circle, the motion falls into one of three distinct regimes, and correctly identifying which regime a given problem describes is often the real difficulty, not the algebra that follows.",
    whyItMatters:
      "This is a high-weightage, formula-rich topic in both JEE Main and JEE Advanced, and vertical circular motion in particular is a favourite source of tricky, multi-step Advanced-level questions that combine several mechanics concepts at once.",
    prerequisites: ["Kinematics", "Laws of Motion"],
    commonMistakes: [
      "Treating centripetal force as an extra force to add to the free-body diagram, instead of recognizing it as the net inward component of forces already present.",
      "Misidentifying which of the three vertical-circular-motion regimes a problem falls into, based on the speed at the top of the circle.",
      "Forgetting that centripetal acceleration only accounts for the change in direction of velocity — if speed is also changing, there's a separate tangential acceleration component too.",
    ],
    studyStrategy:
      "Study uniform circular motion and centripetal force first, then banking of roads and conical pendulums, then vertical circular motion last, since it requires distinguishing between the three possible motion regimes.",
    revisionStrategy:
      "Revise by re-deriving the minimum speed conditions for each of the three vertical-circular-motion cases from force balance, rather than memorizing the final inequalities.",
    pyqStrategy:
      "Vertical circular motion PYQs (minimum speed at the top, tension at the bottom) are a recurring JEE Advanced favourite — practice identifying the regime first, before attempting the calculation.",
    dppStrategy:
      "Use DPPs on banking-of-roads problems with and without friction, since the 'with friction' case is a common twist that catches students who only practiced the frictionless version.",
    relatedChapters: [
      { slug: "laws-of-motion", reason: "Centripetal force problems are Newton's second law applied to circular paths — the same free-body-diagram approach, a specific geometry." },
      { slug: "gravitation", reason: "Orbital motion is circular motion where gravity itself provides the entire centripetal force." },
      { slug: "system-of-particles-and-rotational-motion", reason: "Rotational motion extends the single-particle circular motion studied here to entire rigid bodies." },
    ],
    faqs: [
      {
        question: "Is centripetal force a separate, real force?",
        answer: "No — it's not a new type of force, but the name given to the net inward component of the real forces already acting (gravity, tension, normal force, friction). Adding a separate 'centripetal force' to a free-body diagram double-counts something already there.",
      },
      {
        question: "What is banking of roads, and why is it needed?",
        answer: "Banking means tilting a road's surface so that part of the normal force points toward the centre of the curve, providing some or all of the centripetal force needed for a vehicle to turn safely — reducing how much the vehicle has to rely on friction alone, especially useful at high speeds.",
      },
      {
        question: "What are the three cases in vertical circular motion?",
        answer: "Depending on the speed, an object on a string can complete a full circle (sufficient speed at the top), oscillate back and forth without completing the loop (too slow, string goes slack partway), or move as a pendulum only through a limited arc. Identifying which applies is usually the real challenge in a problem.",
      },
      {
        question: "Why is vertical circular motion harder than horizontal circular motion?",
        answer: "Because gravity contributes differently to the required centripetal force at different points around the circle — at the top it can help provide centripetal force, while at the bottom it opposes it — so the required speed and tension change continuously around the loop, unlike in horizontal circular motion.",
      },
      {
        question: "Does centripetal acceleration change an object's speed?",
        answer: "No — centripetal acceleration only changes the DIRECTION of velocity, not its magnitude. If an object's speed is also changing (as in non-uniform circular motion), that's due to a separate tangential acceleration component, acting along the direction of motion.",
      },
    ],
    examWeightageNotes:
      "A high-weightage, formula-rich topic in JEE Main and Advanced; vertical circular motion is a particularly favoured source of multi-step Advanced-level questions.",
  },
};
