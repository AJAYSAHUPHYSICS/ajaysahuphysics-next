import type { ChapterPyq } from "./kinematics";

export const rotationalMotionPyq: ChapterPyq = {
  chapterName: "System of Particles & Rotational Motion",
  className: "11",
  questions: [
    {
      exam: "AIIMS 2006",
      question:
        "A uniform rod of length 2 m and weight 50 N is hinged to a wall at one end and held horizontal by a cable attached to its far end, the cable making an angle of 30° with the rod. Find the tension in the cable.",
      options: ["25 N", "50 N", "75 N", "100 N"],
      correctIndex: 1,
      solution:
        "Taking torque about the hinge: T sin30° × L = W × (L/2). Since L cancels: T sin30° = W/2 ⇒ T(0.5) = 25 ⇒ T = 50 N.",
    },
    {
      exam: "AIPMT 2007",
      question:
        "A uniform rod AB of length l and mass m is free to rotate about end A and is released from rest in a horizontal position. Given that its moment of inertia about A is ml²/3, find its initial angular acceleration.",
      options: ["3g/2l", "2g/3l", "mg/2l", "3g/l"],
      correctIndex: 0,
      solution:
        "Gravity acts at the centre of mass, a distance l/2 from A, so τ = mg(l/2). Then α = τ/I = [mg(l/2)] / (ml²/3) = 3g/(2l).",
    },
    {
      exam: "AIPMT 2009",
      question:
        "Four identical thin rods, each of mass M and length l, are joined to form a square frame. Find the moment of inertia of this frame about an axis through the centre of the square, perpendicular to its plane.",
      options: ["Ml²/3", "4Ml²/3", "2Ml²/3", "13Ml²/3"],
      correctIndex: 1,
      solution:
        "Each rod's own centre is at distance l/2 from the centre of the square. By the parallel axis theorem, each rod contributes I = Ml²/12 + M(l/2)² = Ml²/12 + Ml²/4 = Ml²/3. Four rods give a total of 4 × Ml²/3 = 4Ml²/3.",
    },
    {
      exam: "AIPMT 2009",
      question:
        "A force F acts on a particle with position vector r, producing a torque τ = r × F about the origin. Which of the following is necessarily true?",
      options: [
        "r·τ ≠ 0 and F·τ = 0",
        "r·τ = 0 and F·τ ≠ 0",
        "r·τ > 0 and F·τ < 0",
        "r·τ = 0 and F·τ = 0",
      ],
      correctIndex: 3,
      solution:
        "Since τ = r × F, the cross product is always perpendicular to both r and F, no matter what these vectors are. Therefore r·τ = 0 and F·τ = 0 always hold.",
    },
    {
      exam: "AIPMT 2010",
      question:
        "A thin circular ring of mass M and radius R rotates in a horizontal plane about a vertical axis through its centre with angular velocity ω. Two small objects, each of mass m, are gently attached to the opposite ends of a diameter of the ring. Find the new angular velocity.",
      options: ["Mω/(M+2m)", "Mω/(M+m)", "(M+2m)ω/M", "Mω/(M−2m)"],
      correctIndex: 0,
      solution:
        "No external torque acts during the attachment, so angular momentum is conserved: MR²ω = (M+2m)R²ω′. Hence ω′ = Mω/(M+2m).",
    },
    {
      exam: "AIPMT (Pre) 2011",
      question:
        "The angular position of a point on a rotating wheel is given by θ(t) = 2t³ − 6t². At what time does the torque on the wheel become zero?",
      options: ["t = 1 s", "t = 0.5 s", "t = 0.25 s", "t = 2 s"],
      correctIndex: 0,
      solution:
        "ω = dθ/dt = 6t² − 12t. α = dω/dt = 12t − 12. Torque is zero when α = 0, i.e., 12t = 12, so t = 1 s.",
    },
    {
      exam: "AIPMT (Pre) 2011",
      question:
        "The moment of inertia of a uniform rod of mass M and length L about a perpendicular axis through its midpoint is I₀. Find its moment of inertia about a perpendicular axis through one end.",
      options: ["I₀ + ML²/2", "I₀ + ML²/4", "I₀ + 2ML²", "I₀ + ML²"],
      correctIndex: 1,
      solution:
        "By the parallel axis theorem, moving the axis from the centre to the end (a distance L/2 away) adds M(L/2)² = ML²/4. So the new moment of inertia is I₀ + ML²/4.",
    },
    {
      exam: "AIPMT (Mains) 2011",
      question:
        "A small mass tied to a string moves on a frictionless table in a circle. The string is pulled in, halving the radius of the circular path. By what factor does the kinetic energy of the mass change?",
      options: ["Decreases by a factor of 2", "Remains constant", "Increases by a factor of 2", "Increases by a factor of 4"],
      correctIndex: 3,
      solution:
        "The pulling force is radial, so it exerts no torque about the centre — angular momentum L = mvr is conserved. Halving r doubles v (since mvr is constant). Kinetic energy ∝ v², so KE increases by a factor of 2² = 4.",
    },
    {
      exam: "AIPMT (Pre) 2012",
      question:
        "ABC is an equilateral triangle with centroid O. Three forces act along its sides: F₁ along AB (directed A to B), F₂ along BC (directed B to C), and F₃ along AC (directed A to C). If the total torque about O is zero, find F₃ in terms of F₁ and F₂.",
      options: ["F₁ + F₂", "2(F₁ + F₂)", "F₁ − F₂", "(F₁+F₂)/2"],
      correctIndex: 0,
      solution:
        "By symmetry, the perpendicular distance from the centroid O to each side is equal. If all three forces followed the same cyclic sense around the triangle, their torques about O would all add up rather than cancel. Since F₃ runs A-to-C — opposite to the cyclic A→B→C→A pattern that F₁ and F₂ follow — its torque opposes theirs. For zero net torque, the opposing torque must balance the other two: F₃ = F₁ + F₂.",
    },
    {
      exam: "AIPMT (Pre) 2012",
      question: "When a mass moves in a circular path in a plane, its angular momentum about the centre is directed along:",
      options: ["the radius", "the tangent to the path", "a line perpendicular to the plane of motion", "a line at 45° to the plane of motion"],
      correctIndex: 2,
      solution:
        "Angular momentum L = r × mv is always perpendicular to the plane containing r and v — which is the plane of the circular motion. So L points along the axis, perpendicular to that plane.",
    },
    {
      exam: "AIPMT (Pre) 2012",
      question:
        "A solid cylinder of mass 3 kg rolls without slipping on a horizontal surface with a speed of 4 m/s, and collides with a horizontal spring of force constant 200 N/m. Assuming it continues to roll without slipping as it compresses the spring, find the maximum compression of the spring.",
      options: ["0.7 m", "0.2 m", "0.5 m", "0.6 m"],
      correctIndex: 3,
      solution:
        "For a solid cylinder, K²/R² = 1/2, so total KE = ½mv²(1 + ½) = ½(3)(4²)(1.5) = 36 J. At maximum compression the cylinder is momentarily at rest (and so is not spinning, since it's still rolling without slipping), so all 36 J goes into the spring: ½kx² = 36 ⇒ x² = 72/200 = 0.36 ⇒ x = 0.6 m.",
    },
    {
      exam: "AIPMT (Mains) 2012",
      question:
        "A uniform circular disc lies flat with four marked points: one at its centre, one midway between centre and rim, one on the rim, and one outside the disc at twice the rim's radius from the centre (all four points lying along the same radius). About which of these points, taken as the location of a perpendicular axis through it, is the disc's moment of inertia greatest?",
      options: ["The point outside the disc, at twice the radius", "The centre", "The midway point", "The point on the rim"],
      correctIndex: 0,
      solution:
        "By the parallel axis theorem, I = I_CM + Md², which grows with the square of the distance d from the centre. The farthest of the four points — the one outside the disc — gives the largest d, and therefore the largest moment of inertia.",
    },
    {
      exam: "AIPMT (Mains) 2012",
      question:
        "A circular platform of radius R = 2 m can rotate freely about a frictionless vertical axle and has a moment of inertia of 200 kg·m² about that axle. It is initially at rest. A 50 kg man standing at its edge begins walking along the edge at a speed of 1 m/s relative to the ground. How long does he take to complete one full revolution relative to the platform?",
      options: ["2π s", "π/2 s", "π s", "3π/2 s"],
      correctIndex: 0,
      solution:
        "Total angular momentum starts at zero and must stay zero, so the platform spins the opposite way to the man. Man's angular speed (ground frame): ω_man = v/R = 1/2 = 0.5 rad/s. Platform's angular speed: Ω = mvR/I = (50)(1)(2)/200 = 0.5 rad/s, in the opposite sense. Relative to the platform, the man's angular speed is ω_man + Ω = 0.5 + 0.5 = 1 rad/s. Time for one revolution = 2π/1 = 2π s.",
    },
    {
      exam: "AIPMT 2014",
      question:
        "A solid cylinder of mass 50 kg and radius 0.5 m is free to rotate about its horizontal axis. A massless string is wound around it, with one end fixed to the cylinder and the other hanging freely. What tension in the string is needed to give the cylinder an angular acceleration of 2 revolutions per second squared?",
      options: ["25 N", "50 N", "78.5 N", "157 N"],
      correctIndex: 3,
      solution:
        "I = ½MR² = ½(50)(0.5)² = 6.25 kg·m². α = 2 rev/s² = 4π rad/s². Required torque τ = Iα = 6.25 × 4π ≈ 78.5 N·m. Since τ = TR, T = τ/R = 78.5/0.5 ≈ 157 N.",
    },
    {
      exam: "AIPMT 2014",
      question:
        "A solid sphere rolls down an incline of angle θ without slipping. Find the ratio of its acceleration while rolling to the acceleration it would have if it slid down the same frictionless incline without rolling.",
      options: ["5 : 7", "2 : 3", "2 : 5", "7 : 5"],
      correctIndex: 0,
      solution:
        "Rolling: a = g sinθ/(1 + K²/R²) = g sinθ/(1 + 2/5) = (5/7) g sinθ. Sliding: a = g sinθ. Ratio = (5/7) : 1 = 5 : 7.",
    },
    {
      exam: "AIPMT 2015",
      question:
        "A mass m moves in a circle on a smooth horizontal table at speed v₀ and radius R₀, held by a string through a hole in the table. The string is pulled in until the mass moves in a circle of radius R₀/2. Find the final kinetic energy.",
      options: ["¼mv₀²", "2mv₀²", "½mv₀²", "4mv₀²"],
      correctIndex: 1,
      solution:
        "The tension is radial and exerts no torque about the hole, so angular momentum is conserved: mv₀R₀ = mv′(R₀/2) ⇒ v′ = 2v₀. Final KE = ½m(2v₀)² = 2mv₀².",
    },
    {
      exam: "AIPMT 2015",
      question:
        "A rod of weight W rests horizontally on two knife-edges A and B, a distance d apart, in equilibrium. The rod's centre of mass is at a distance x from A. Find the normal reaction at A.",
      options: ["Wd/x", "W(d−x)/x", "W(d−x)/d", "Wx/d"],
      correctIndex: 2,
      solution:
        "Taking torques about B: N_A × d = W × (d − x) [since the centre of mass is at distance (d−x) from B]. So N_A = W(d−x)/d.",
    },
    {
      exam: "AIPMT 2015",
      question:
        "Three identical thin spherical shells, each of mass m and radius r, are arranged so that an axis XX′ is tangent to two of the shells and passes through the diameter of the third. Find the moment of inertia of the system about XX′.",
      options: ["3mr²", "(16/5)mr²", "4mr²", "(11/5)mr²"],
      correctIndex: 2,
      solution:
        "For a thin shell, I about a diameter = (2/3)mr². For the two shells with the axis tangent to their surface (perpendicular distance r from their centres), the parallel axis theorem gives I = (2/3)mr² + mr² = (5/3)mr² each. The third shell's axis passes directly through its own diameter, contributing (2/3)mr². Total = 2(5/3)mr² + (2/3)mr² = (10/3 + 2/3)mr² = 4mr².",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "A car moves at 54 km/h on a road. Its wheels have radius 0.45 m and moment of inertia 3 kg·m² about their axis. If the car is brought to rest uniformly in 15 s, find the magnitude of the average braking torque on each wheel.",
      options: ["2.86 N·m", "6.66 N·m", "8.58 N·m", "10.86 N·m"],
      correctIndex: 1,
      solution:
        "54 km/h = 15 m/s. Initial angular speed ω₀ = v/R = 15/0.45 ≈ 33.3 rad/s. Angular deceleration α = ω₀/t = 33.3/15 ≈ 2.22 rad/s². Torque τ = Iα = 3 × 2.22 ≈ 6.66 N·m.",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "Point masses m₁ and m₂ sit at the two ends of a light rigid rod of length L. An axis perpendicular to the rod passes through point P, at distance x from m₁. For what value of x is the work needed to spin the rod up to a given angular velocity the smallest?",
      options: ["x = m₂L/(m₁+m₂)", "x = m₁L/(m₁+m₂)", "x = m₁L/m₂", "x = m₂L/m₁"],
      correctIndex: 0,
      solution:
        "The work needed to reach a given ω is W = ½Iω², which is smallest when I is smallest. I is minimised when the axis passes through the centre of mass. Measured from m₁, the centre of mass lies at x = m₂L/(m₁+m₂).",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "A force F = αî + 3ĵ + 6k̂ acts at a point with position vector r = 2î − 6ĵ − 12k̂ (measured from the origin). For what value of α is the angular momentum about the origin conserved (i.e., the torque about the origin is zero)?",
      options: ["1", "−1", "2", "0"],
      correctIndex: 1,
      solution:
        "Torque is zero only if F is parallel to r, i.e., F = λr for some scalar λ. Comparing the ĵ-components: 3 = λ(−6) ⇒ λ = −½. Comparing k̂-components: 6 = λ(−12) ⇒ λ = −½ (consistent). Then α = λ(2) = −1.",
    },
    {
      exam: "AIIMS 2015",
      question:
        "The radius of a uniformly spinning sphere decreases by 2%, while its mass stays the same and no external torque acts on it. Find the percentage change in its rotational kinetic energy.",
      options: ["2% decrease", "1% increase", "4% increase", "8% increase"],
      correctIndex: 2,
      solution:
        "I = (2/5)MR², so a 2% decrease in R gives roughly a 4% decrease in I (since I ∝ R²). With no external torque, angular momentum L is conserved, and KE_rot = L²/(2I) ∝ 1/I. So a 4% decrease in I means roughly a 4% increase in KE_rot.",
    },
    {
      exam: "AIIMS 2015",
      question:
        "A rectangular box of height 2 m and base width 1 m sits on the flat bed of a truck. Taking g = 10 m/s², find the maximum forward acceleration the truck can have without the box toppling backward about its trailing edge.",
      options: ["2.5 m/s²", "5 m/s²", "7.5 m/s²", "10 m/s²"],
      correctIndex: 1,
      solution:
        "Toppling begins when the torque of the pseudo-force (ma, acting backward at the centre of mass height h/2) about the trailing edge equals the restoring torque of gravity (mg, acting at horizontal distance b/2 from that edge): ma(h/2) = mg(b/2) ⇒ a = gb/h = 10(1)/2 = 5 m/s².",
    },
    {
      exam: "NEET-I 2016",
      question:
        "A circular disc of mass M and radius R has a circular hole of diameter R cut out of it, positioned so that the rim of the hole passes through the centre of the disc. Find the moment of inertia of the remaining part about a perpendicular axis through the centre of the original disc.",
      options: ["15MR²/32", "13MR²/32", "11MR²/32", "9MR²/32"],
      correctIndex: 1,
      solution:
        "The hole has radius R/2 and its centre is at distance R/2 from the disc's centre (so its rim touches the centre). Surface density σ = M/(πR²), so the removed mass is m = σπ(R/2)² = M/4. Moment of inertia of the removed piece about its own centre: ½m(R/2)² = MR²/32. By the parallel axis theorem, about the disc's centre: MR²/32 + (M/4)(R/2)² = MR²/32 + MR²/16 = 3MR²/32. Full disc's I = ½MR² = 16MR²/32. Remaining I = 16MR²/32 − 3MR²/32 = 13MR²/32.",
    },
    {
      exam: "NEET-I 2016",
      question:
        "A circular disc of radius 0.5 m, initially at rest, is given a constant angular acceleration of 2.0 rad/s². Find the magnitude of the net (linear) acceleration of a point on its rim after 2.0 s.",
      options: ["8.0 m/s²", "7.0 m/s²", "6.0 m/s²", "3.0 m/s²"],
      correctIndex: 0,
      solution:
        "After 2 s, ω = αt = 4 rad/s. Tangential acceleration a_t = αR = 2(0.5) = 1 m/s². Radial acceleration a_r = ω²R = 16(0.5) = 8 m/s². Net acceleration = √(1² + 8²) = √65 ≈ 8.0 m/s².",
    },
    {
      exam: "NEET-I 2016",
      question:
        "A disc and a sphere have the same radius but different masses. Both roll, starting from rest, down two identical inclined planes of the same length and height, without slipping. Which one reaches the bottom first?",
      options: ["The disc", "The sphere", "Both reach together", "It depends on their masses"],
      correctIndex: 1,
      solution:
        "Rolling acceleration a = g sinθ/(1 + K²/R²) depends only on the shape factor K²/R², not on mass. Disc: K²/R² = 1/2. Sphere: K²/R² = 2/5. The sphere's smaller factor gives it a larger acceleration, so it reaches the bottom first, regardless of either object's mass.",
    },
    {
      exam: "NEET-II 2016",
      question:
        "Two rotating bodies A and B, of moments of inertia I_A and I_B respectively (with I_B > I_A), have equal rotational kinetic energy. Compare their angular momenta L_A and L_B.",
      options: ["L_B > L_A", "L_A > L_B", "L_A = L_B/2", "L_A = 2L_B"],
      correctIndex: 0,
      solution:
        "Since KE = L²/(2I), for the same KE, L = √(2·I·KE). As I_B > I_A while KE is the same for both, L_B > L_A.",
    },
    {
      exam: "NEET-II 2016",
      question:
        "A solid sphere of mass m and radius R spins about its diameter. A solid cylinder of the same mass and radius spins about its own axis at twice the angular speed of the sphere. Find the ratio of their rotational kinetic energies (sphere : cylinder).",
      options: ["1 : 4", "3 : 1", "2 : 3", "1 : 5"],
      correctIndex: 3,
      solution:
        "E_sphere = ½(2/5 mR²)ω² = (1/5)mR²ω². E_cylinder = ½(1/2 mR²)(2ω)² = mR²ω². Ratio = (1/5) : 1 = 1 : 5.",
    },
    {
      exam: "NEET-II 2016",
      question:
        "A light rod of length l has point masses m₁ and m₂ fixed to its two ends. Find the moment of inertia of the system about a perpendicular axis through the centre of mass.",
      options: ["(m₁+m₂)l²", "l²√(m₁m₂)", "[m₁m₂/(m₁+m₂)]l²", "[(m₁+m₂)/(m₁m₂)]l²"],
      correctIndex: 2,
      solution:
        "Distances from the centre of mass: r₁ = m₂l/(m₁+m₂), r₂ = m₁l/(m₁+m₂). I = m₁r₁² + m₂r₂² = [m₁m₂² + m₂m₁²]l²/(m₁+m₂)² = m₁m₂(m₁+m₂)l²/(m₁+m₂)² = [m₁m₂/(m₁+m₂)]l².",
    },
    {
      exam: "AIIMS 2016",
      question:
        "A solid cylinder of radius 5 cm rolls without slipping down a 30° incline, starting from rest. Taking g = 10 m/s², find its angular velocity after it has travelled 6 m along the incline.",
      options: ["40 rad/s", "40√10 rad/s", "4√10 rad/s", "3√10 rad/s"],
      correctIndex: 1,
      solution:
        "For a solid cylinder, K²/R² = 1/2, so a = g sinθ/(1+½) = (10)(0.5)/1.5 = 10/3 m/s². Using v² = 2as: v² = 2(10/3)(6) = 40, so v = √40 = 2√10 m/s. ω = v/R = 2√10/0.05 = 40√10 rad/s.",
    },
    {
      exam: "NEET (UG) 2017",
      question:
        "A rope is wound around a hollow cylinder of mass 3 kg and radius 0.4 m. If the rope is pulled with a force of 30 N, find the angular acceleration of the cylinder.",
      options: ["0.25 rad/s²", "25 rad/s²", "5 rad/s²", "25 m/s²"],
      correctIndex: 1,
      solution:
        "For a hollow cylinder, I = MR² = 3(0.4)² = 0.48 kg·m². Torque τ = FR = 30 × 0.4 = 12 N·m. α = τ/I = 12/0.48 = 25 rad/s².",
    },
    {
      exam: "NEET (UG) 2017",
      question:
        "Two identical discs, each with moment of inertia I, spin about a common axis with angular velocities ω₁ and ω₂ respectively. They are brought face to face and stick together, ending up with a common angular velocity. Find the loss in kinetic energy during this process.",
      options: ["(I/4)(ω₁−ω₂)²", "I(ω₁−ω₂)²", "(I/8)(ω₁−ω₂)²", "(I/2)(ω₁+ω₂)²"],
      correctIndex: 0,
      solution:
        "Angular momentum is conserved: Iω₁ + Iω₂ = 2Iω_f ⇒ ω_f = (ω₁+ω₂)/2. KE_i = ½I(ω₁²+ω₂²). KE_f = ½(2I)ω_f² = (I/4)(ω₁+ω₂)². Loss = KE_i − KE_f = (I/4)(ω₁−ω₂)² after simplifying.",
    },
    {
      exam: "NEET (UG) 2017",
      question:
        "Which pair of statements about rigid bodies is correct?\n(a) The centre of mass of a body always coincides with its centre of gravity.\n(b) The centre of mass is the point about which the total gravitational torque on the body is zero.\n(c) A couple acting on a body produces both translational and rotational motion.\n(d) A mechanical advantage greater than one means a small effort can lift a larger load.",
      options: ["(a) and (b)", "(b) and (c)", "(c) and (d)", "(b) and (d)"],
      correctIndex: 3,
      solution:
        "(a) is false in general — CM and centre of gravity coincide only in a uniform gravitational field. (c) is false — a couple has zero net force, so it produces pure rotation, never translation. (b) and (d) are both correct statements, making the answer (b) and (d).",
    },
    {
      exam: "AIIMS 2017",
      question:
        "Find the moment of inertia of a uniform annular disc of mass 100 g, with inner radius 10 cm and outer radius 20 cm, about a perpendicular axis through its centre.",
      options: ["2.5 × 10⁻³ kg·m²", "1.5 × 10⁻³ kg·m²", "5 × 10⁻³ kg·m²", "6 × 10⁻³ kg·m²"],
      correctIndex: 0,
      solution:
        "For an annular disc, I = (M/2)(R₁² + R₂²) = (0.1/2)(0.10² + 0.20²) = 0.05 × (0.01+0.04) = 0.05 × 0.05 = 2.5 × 10⁻³ kg·m².",
    },
    {
      exam: "NEET (UG) 2018",
      question:
        "Three objects — A: a solid sphere, B: a thin disc, and C: a ring — all have the same mass M and radius R, and all spin at the same angular speed ω about their own symmetry axes. Compare the work needed to bring each one to rest.",
      options: ["W_C > W_B > W_A", "W_A > W_B > W_C", "W_B > W_A > W_C", "W_A > W_C > W_B"],
      correctIndex: 0,
      solution:
        "The work needed to stop a spinning body equals its rotational KE = ½Iω². I_sphere = (2/5)MR², I_disc = ½MR², I_ring = MR². Since I_ring > I_disc > I_sphere while ω is the same for all three, W_C > W_B > W_A.",
    },
    {
      exam: "NEET (UG) 2018",
      question:
        "A force F = 3î − 2ĵ + 4k̂ (in newtons) acts at the point (1, 2, −1) m. Find the torque of this force about the point (0, 1, 1) m.",
      options: ["−10ĵ − 5k̂ N·m", "10î − 5ĵ N·m", "−5î − 10k̂ N·m", "5î − 10ĵ N·m"],
      correctIndex: 0,
      solution:
        "Position vector from the reference point to the point of application: r = (1−0, 2−1, −1−1) = (1, 1, −2). τ = r × F = (1×4 − (−2)×(−2), −(1×4 − (−2)×3), 1×(−2) − 1×3) = (4−4, −(4+6), −2−3) = (0, −10, −5), i.e., τ = −10ĵ − 5k̂ N·m.",
    },
    {
      exam: "NEET (UG) 2018",
      question:
        "A solid sphere rolls without slipping. If K_t is its translational kinetic energy and K_r its rotational kinetic energy, find the ratio K_t : (K_t + K_r).",
      options: ["7 : 10", "5 : 7", "10 : 7", "2 : 5"],
      correctIndex: 1,
      solution:
        "K_t/(K_t+K_r) = 1/(1 + K²/R²) = 1/(1 + 2/5) = 1/(7/5) = 5/7.",
    },
    {
      exam: "NEET (UG) 2018",
      question:
        "A solid sphere spins freely about its own axis in free space (no external torque). Its radius is then somehow increased while its mass stays the same. Which physical quantity stays constant throughout?",
      options: ["Angular velocity", "Moment of inertia", "Rotational kinetic energy", "Angular momentum"],
      correctIndex: 3,
      solution:
        "With no external torque acting at any point, dL/dt = τ = 0, so angular momentum L must stay constant. As the radius (and hence I) changes, ω and KE_rot will both change to keep L = Iω fixed.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A tractor's caterpillar tread has total mass 0.72 kg and the tractor moves at 6 km/h. Treating the belt's bottom section (in contact with the ground) as instantaneously at rest and its top section as moving at twice the tractor's speed, find the kinetic energy of the belt.",
      options: ["4 J", "1 J", "2 J", "6 J"],
      correctIndex: 2,
      solution:
        "v = 6 km/h = 5/3 m/s. With half the belt's mass (M/2) at rest and half moving at 2v: KE = ½(M/2)(2v)² + ½(M/2)(0)² = Mv² = 0.72 × (5/3)² = 0.72 × 25/9 = 2 J.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "An elevator, initially at rest, is supported by a cable that passes over a pulley of radius 0.4 m. The elevator accelerates upward at 0.6 m/s². Find the number of rotations made by the pulley in the first 10 seconds (assuming the cable doesn't slip on the pulley).",
      options: ["23.88", "11.94", "5.97", "8.96"],
      correctIndex: 1,
      solution:
        "Distance travelled by the cable (= elevator) in 10 s: s = ½at² = ½(0.6)(10²) = 30 m. This equals the arc length on the pulley: n × 2πR = 30 ⇒ n = 30/(2π×0.4) = 30/2.513 ≈ 11.94 rotations.",
    },
    // ---------------- JEE Main ----------------
    {
      exam: "JEE Main 2019",
      examType: "jee-main",
      question: "Find the ratio of the moment of inertia of a uniform rod about an axis through its end (perpendicular to its length) to that about its centre.",
      options: ["2 : 1", "3 : 1", "4 : 1", "1 : 4"],
      correctIndex: 2,
      solution: "I_end = mL²/3, I_centre = mL²/12. Ratio = (mL²/3)/(mL²/12) = 12/3 = 4 : 1.",
    },
    {
      exam: "JEE Main 2020",
      examType: "jee-main",
      question: "A 3 kg disc rolls without slipping at 4 m/s. Find its total kinetic energy.",
      options: ["24 J", "30 J", "36 J", "48 J"],
      correctIndex: 2,
      solution: "KE_trans = ½(3)(16) = 24 J. For a disc, KE_rot = ½ KE_trans = 12 J. Total = 24+12 = 36 J.",
    },
    {
      exam: "JEE Main 2018",
      examType: "jee-main",
      question: "A wheel completes one full rotation every 0.5 s. Find its angular velocity.",
      options: ["2π rad/s", "4π rad/s", "8π rad/s", "π rad/s"],
      correctIndex: 1,
      solution: "ω = 2π/T = 2π/0.5 = 4π rad/s.",
    },
    {
      exam: "JEE Main 2021",
      examType: "jee-main",
      question: "A torque produces an angular acceleration of 10 rad/s² in a body of moment of inertia 2 kg·m². Find the torque.",
      options: ["5 N·m", "10 N·m", "20 N·m", "40 N·m"],
      correctIndex: 2,
      solution: "τ = Iα = 2×10 = 20 N·m.",
    },
    {
      exam: "JEE Main 2017",
      examType: "jee-main",
      question:
        "A man on a frictionless rotating stool, with moment of inertia 4 kg·m² and angular speed 2 rad/s, pulls his arms in, reducing his moment of inertia to 1 kg·m². Find his new angular speed.",
      options: ["2 rad/s", "4 rad/s", "8 rad/s", "0.5 rad/s"],
      correctIndex: 2,
      solution: "By conservation of angular momentum: I₁ω₁ = I₂ω₂ ⇒ ω₂ = (4×2)/1 = 8 rad/s.",
    },
    {
      exam: "JEE Main 2022",
      examType: "jee-main",
      question:
        "A body has moment of inertia 2 kg·m² about an axis through its centre of mass. Find its moment of inertia about a parallel axis 0.5 m away, given its mass is 4 kg.",
      options: ["2 kg·m²", "2.5 kg·m²", "3 kg·m²", "4 kg·m²"],
      correctIndex: 2,
      solution: "By the parallel axis theorem: I = I_cm + md² = 2 + 4(0.5²) = 2 + 1 = 3 kg·m².",
    },
    // ---------------- JEE Advanced ----------------
    {
      exam: "JEE Advanced 2013",
      examType: "jee-advanced",
      question:
        "A uniform rod of length 3 m, pivoted at one end, is released from rest in a horizontal position. Find the speed of its free end the instant the rod becomes vertical. (g = 10 m/s²)",
      options: ["3√5 m/s", "3√10 m/s", "5√3 m/s", "10 m/s"],
      correctIndex: 1,
      solution:
        "Using energy conservation, the rod's centre of mass falls by L/2: mg(L/2) = ½Iω² (rotational KE about the pivot), with I = mL²/3. This gives ω² = 3g/L, so the speed of the free end is v = ωL = √(3gL) = √(3×10×3) = √90 = 3√10 m/s.",
    },
    {
      exam: "JEE Advanced 2014",
      examType: "jee-advanced",
      question:
        "A solid sphere rolls without slipping down an incline of angle 30°. Find the minimum coefficient of friction needed.",
      options: ["1/(7√3)", "2/(7√3)", "1/(2√3)", "2/√3"],
      correctIndex: 1,
      solution:
        "For a solid sphere to roll without slipping down an incline of angle θ, the minimum friction coefficient required is μ_min = (2/7)tanθ. At θ = 30°: μ_min = (2/7)(1/√3) = 2/(7√3).",
    },
    {
      exam: "JEE Advanced 2015",
      examType: "jee-advanced",
      question:
        "A disc of moment of inertia 1 kg·m², spinning at 10 rad/s, is gently dropped (coaxially) onto an identical stationary disc, and they reach a common angular speed due to friction between them. Find this common angular speed.",
      options: ["2.5 rad/s", "5 rad/s", "7.5 rad/s", "10 rad/s"],
      correctIndex: 1,
      solution:
        "Angular momentum is conserved (no external torque on the pair): I₁ω₀ = (I₁+I₂)ω_common ⇒ ω_common = (1×10)/(1+1) = 5 rad/s.",
    },
    {
      exam: "JEE Advanced 2016",
      examType: "jee-advanced",
      question:
        "Two discs of radii 0.1 m and 0.3 m are connected by a belt (no slipping on the rims). The smaller disc rotates at 30 rad/s. Find the angular speed of the larger disc.",
      options: ["5 rad/s", "10 rad/s", "15 rad/s", "90 rad/s"],
      correctIndex: 1,
      solution:
        "The linear speed at the rim is the same for both (connected by the belt): v = ω₁r₁ = 30×0.1 = 3 m/s. So ω₂ = v/r₂ = 3/0.3 = 10 rad/s.",
    },
    {
      exam: "JEE Advanced 2011",
      examType: "jee-advanced",
      question:
        "A solid sphere rolling without slipping at 10 m/s moves up a rough incline and momentarily comes to rest (still rolling, not sliding, throughout). Find the height it reaches. (g = 10 m/s²)",
      options: ["5 m", "6 m", "7 m", "10 m"],
      correctIndex: 2,
      solution:
        "Since it rolls without slipping throughout (friction does no work), total KE converts entirely to PE: (7/10)mv² = mgh ⇒ h = 7v²/(10g) = 7(100)/(100) = 7 m.",
    },
  ],
};
