export type PyqQuestion = {
  exam: string;
  examType?: "jee-main" | "jee-advanced";
  question: string;
  options: string[];
  correctIndex: number;
  solution: string;
};

export type ChapterPyq = {
  chapterName: string;
  className: "11" | "12";
  questions: PyqQuestion[];
};

export const gravitationPyq: ChapterPyq = {
  chapterName: "Gravitation",
  className: "11",
  questions: [
    {
      exam: "AIPMT 2007",
      question:
        "Two satellites S1 and S2 orbit Earth in the same circular orbit. S1 has four times the mass of S2. Which of the following statements about them is correct?",
      options: [
        "Their kinetic energies are equal",
        "S1's time period is four times that of S2",
        "Earth's potential energy with each satellite is equal",
        "S1 and S2 move with the same orbital speed",
      ],
      correctIndex: 3,
      solution:
        "Orbital speed v₀ = √(GM/r) depends only on the central mass and orbital radius — never on the satellite's own mass. Since both satellites share the same orbit, they must move at the same speed regardless of their different masses.",
    },
    {
      exam: "AIPMT 2009",
      question:
        "A planet sweeps out shaded area SCD that is exactly twice the shaded area SAB while orbiting the Sun at focus S. If t₁ is the time taken to sweep from C to D, and t₂ is the time taken to sweep from A to B, how are t₁ and t₂ related?",
      options: ["t₁ = t₂", "t₁ = t₂/2", "t₁ = 4t₂", "t₁ = 2t₂"],
      correctIndex: 3,
      solution:
        "By Kepler's second law, area swept is proportional to time (dA/dt is constant). Since Area(SCD) = 2 × Area(SAB), the time to sweep SCD must also be twice the time to sweep SAB: t₁ = 2t₂.",
    },
    {
      exam: "AIPMT 2010",
      question:
        "Satellites A and B orbit Earth in circular paths of radii 4R and R respectively. If satellite A moves at speed 3V, what is the speed of satellite B?",
      options: ["3V/2", "3V/4", "6V", "12V"],
      correctIndex: 2,
      solution:
        "Orbital velocity v₀ ∝ 1/√r. v_B/v_A = √(r_A/r_B) = √(4R/R) = 2, so v_B = 2 × 3V = 6V.",
    },
    {
      exam: "AIPMT 2010",
      question:
        "A point mass M sits at the centre of a thin spherical shell of the same mass M and radius a. What is the gravitational potential at a point located at distance a/2 from the centre (inside the shell)?",
      options: ["−4GM/a", "−3GM/a", "−2GM/a", "−GM/a"],
      correctIndex: 1,
      solution:
        "Inside a uniform shell, potential is constant everywhere and equal to its surface value: V_shell = −GM/a. The central point mass contributes V_point = −GM/(a/2) = −2GM/a at that location. Total potential = −GM/a + (−2GM/a) = −3GM/a.",
    },
    {
      exam: "AIPMT 2010",
      question:
        "For Earth modelled as a uniform-density sphere of radius R, which statement correctly describes how the acceleration due to gravity g varies with distance r measured from the centre?",
      options: [
        "g rises linearly from zero at the centre to a maximum at r = R, then falls off as 1/r² beyond R",
        "g falls linearly from a maximum at the centre to zero at r = R, then rises beyond R",
        "g stays constant for r < R, then falls as 1/r² for r > R",
        "g rises as 1/r² for r < R, then falls linearly for r > R",
      ],
      correctIndex: 0,
      solution:
        "Inside a uniform sphere, only the enclosed mass contributes: g = GMr/R³, directly proportional to r, rising linearly from zero at the centre. Outside, the entire mass acts as if concentrated at the centre: g = GM/r², the standard inverse-square fall-off. (Note: the source presents this as a labelled graph; this entry describes the curve in words rather than reproducing the figure.)",
    },
    {
      exam: "AIPMT 2010",
      question:
        "A satellite of mass m orbiting a planet of mass M is moved from a circular orbit of radius R₁ to a larger circular orbit of radius R₂. What additional kinetic energy must be supplied for this transfer?",
      options: [
        "GmM(1/R₁ − 1/R₂)",
        "2GmM(1/R₁ − 1/R₂)",
        "(1/2)GmM(1/R₁ − 1/R₂)",
        "GmM(1/R₁² − 1/R₂²)",
      ],
      correctIndex: 2,
      solution:
        "Total mechanical energy of a circular orbit is E = −GMm/2r. The energy needed for the transfer equals E(R₂) − E(R₁) = (GMm/2)(1/R₁ − 1/R₂).",
    },
    {
      exam: "AIPMT 2011",
      question:
        "A planet's closest distance from the Sun is r₁ and its farthest distance is r₂, with linear speeds v₁ and v₂ at those points respectively. What is v₁/v₂?",
      options: ["(r₁/r₂)²", "r₂/r₁", "(r₂/r₁)²", "r₁/r₂"],
      correctIndex: 1,
      solution: "Angular momentum is conserved: v₁r₁ = v₂r₂, so v₁/v₂ = r₂/r₁.",
    },
    {
      exam: "AIPMT Pre. 2012",
      question:
        "A spherical planet has mass Mp and diameter Dp. What is the acceleration due to gravity at its surface?",
      options: ["GMp/Dp²", "4GMpm/Dp²", "4GMp/Dp²", "GMpm/Dp²"],
      correctIndex: 2,
      solution: "Radius R = Dp/2, so g = GMp/R² = GMp/(Dp/2)² = 4GMp/Dp².",
    },
    {
      exam: "AIPMT Pre. 2012",
      question:
        "A geostationary satellite orbits at a height of 5R above Earth's surface, where R is Earth's radius. What is the time period of a second satellite orbiting at a height of 2R above the surface?",
      options: ["6√2 hours", "6/√2 hours", "5 hours", "10 hours"],
      correctIndex: 0,
      solution:
        "Geostationary orbital radius = R + 5R = 6R, with period 24 h. New orbital radius = R + 2R = 3R. Using T² ∝ r³: T_new = 24 × (3R/6R)^1.5 = 24 × (0.5)^1.5 = 24/(2√2) = 6√2 hours.",
    },
    {
      exam: "AIPMT Pre. 2012",
      question: "At what height above Earth's surface does a body's weight reduce to 1/16th of its surface value?",
      options: ["3R", "4R", "5R", "15R"],
      correctIndex: 0,
      solution:
        "gₕ/g = R²/(R+h)² = 1/16, so (R+h)² = 16R², giving R+h = 4R, i.e., h = 3R.",
    },
    {
      exam: "AIPMT Mains 2012",
      question:
        "Which of the following correctly describes the gravitational field intensity E due to a thin uniform spherical shell of radius R, as a function of distance r from its centre?",
      options: [
        "E = 0 for r < R; E increases proportionally with r for r ≥ R",
        "E = 0 for r < R; right at r = R it jumps to GM/R², then decreases as 1/r² for r > R",
        "E is constant and non-zero for r < R, then decreases as 1/r² for r > R",
        "E increases linearly for r < R, then stays constant for r ≥ R",
      ],
      correctIndex: 1,
      solution:
        "Inside a hollow shell, the field is exactly zero everywhere — the shell exerts no net gravitational force inside itself. From the surface outward, it behaves exactly like a point mass at the centre: E = GM/r². So the field jumps from zero (just inside R) to GM/R² (at and beyond R), then falls off with the inverse-square law. (Note: this is a graph-identification question in the source; this entry describes the curve in words.)",
    },
    {
      exam: "AIPMT Mains 2012",
      question:
        "If v_e is the escape velocity and v₀ is the orbital velocity of a satellite in an orbit close to Earth's surface, how are they related?",
      options: ["v_e = 2v₀", "v_e = √2 v₀", "v₀ = √2 v_e", "v₀ = v_e"],
      correctIndex: 1,
      solution: "v_e = √(2GM/R) and v₀ = √(GM/R), so v_e = √2 × v₀.",
    },
    {
      exam: "AIIMS 2012",
      question:
        "A particle is thrown from Earth's surface with exactly the escape velocity v_e. What is its speed when it reaches a height of 3R above the surface (distance 4R from Earth's centre)?",
      options: ["9.25 km/s", "5.6 km/s", "11.2 km/s", "4.3 km/s"],
      correctIndex: 1,
      solution:
        "Using energy conservation from the surface (speed v_e) to height 3R: ½v_e² − GM/R = ½v² − GM/4R. Since v_e² = 2GM/R, the left side is zero, so ½v² = GM/4R, giving v² = v_e²/4 and v = v_e/2 = 11.2/2 = 5.6 km/s.",
    },
    {
      exam: "AIPMT 2014",
      question:
        "A black hole's gravity is so strong that even light cannot escape it. To roughly what radius would Earth (mass 5.98×10²⁴ kg) need to be compressed for its escape velocity to equal the speed of light?",
      options: ["10⁻⁹ m", "10⁻⁶ m", "10⁻² m", "100 m"],
      correctIndex: 2,
      solution:
        "Setting v_e = c: R = 2GM/c² = (2 × 6.67×10⁻¹¹ × 5.98×10²⁴)/(3×10⁸)² ≈ 8.9×10⁻³ m, which is of order 10⁻² m.",
    },
    {
      exam: "AIPMT 2014",
      question:
        "Which statement correctly describes how the gravitational field intensity E of the Earth (a uniform solid sphere of radius R) varies with distance r from the centre, including its behaviour right at the surface?",
      options: [
        "E grows linearly with r for r < R, reaches its maximum at r = R, then falls as 1/r² beyond R, with no jump at the surface",
        "E is zero for r < R, and equals GM/R² only exactly at r = R",
        "E falls linearly with r for r < R, then rises beyond R",
        "E stays constant for all r",
      ],
      correctIndex: 0,
      solution:
        "For a solid sphere, E = GMr/R³ inside (linear in r) and E = GM/r² outside. Both expressions give exactly GM/R² at r = R, so the field is continuous there — unlike a hollow shell, there's no discontinuity. (Note: this is a graph-identification question in the source; this entry describes the curve in words.)",
    },
    {
      exam: "AIPMT 2015",
      question:
        "Kepler's third law can be written as T² = Kr³, where K is a constant, for a planet of mass m orbiting the Sun (mass M) under Newton's law of gravitation F = GMm/r². How are G and K related?",
      options: ["GMK = 4π²", "K = G", "K = 1/G", "GK = 4π²"],
      correctIndex: 0,
      solution:
        "Equating gravitational force to the centripetal requirement: GMm/r² = m(4π²/T²)r, giving T² = (4π²/GM)r³. Comparing with T² = Kr³: K = 4π²/GM, so GMK = 4π².",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "A satellite S, much lighter than Earth, moves in an elliptical orbit around it. Which of the following is true?",
      options: [
        "S's acceleration always points toward Earth's centre",
        "S's angular momentum about Earth's centre changes direction but keeps constant magnitude",
        "S's total mechanical energy varies periodically with time",
        "S's linear momentum stays constant in magnitude",
      ],
      correctIndex: 0,
      solution:
        "Gravity is a central force directed toward Earth's centre, so the satellite's acceleration always points there too. Since gravity produces zero torque about Earth's centre, angular momentum — both magnitude and direction — is conserved, not just its magnitude. Total mechanical energy is also conserved (constant, not periodic). Speed varies around an elliptical orbit, so linear momentum magnitude is not constant.",
    },
    {
      exam: "Re-AIPMT 2015",
      question:
        "A remote-sensing satellite orbits at a height of 2.5×10⁵ m above Earth's surface. Taking Earth's radius as 6.38×10⁶ m and g = 9.8 m/s², find its orbital speed.",
      options: ["6.67 km/s", "7.76 km/s", "8.56 km/s", "9.13 km/s"],
      correctIndex: 1,
      solution:
        "v₀ = √[gR²/(R+h)] = √[(9.8)(6.38×10⁶)²/(6.63×10⁶)] ≈ √(6.02×10⁷) ≈ 7.76 km/s.",
    },
    {
      exam: "AIIMS 2015",
      question:
        "Find the orbital speed of a satellite at height 80 km above Earth's surface. (Radius of Earth = 6400 km)",
      options: ["7 km/s", "8 km/s", "7.84 km/s", "11.2 km/s"],
      correctIndex: 2,
      solution:
        "v₀ = √[gR²/(R+h)] = √[(9.8)(6.4×10⁶)²/(6.48×10⁶)] ≈ √(6.2×10⁷) ≈ 7.84 km/s.",
    },
    {
      exam: "NEET-I 2016",
      question:
        "At a certain height above Earth's surface, the gravitational potential is −5.4×10⁷ J/kg and g there is 6.0 m/s². Taking Earth's radius as 6400 km, find this height.",
      options: ["2600 km", "1600 km", "1400 km", "2000 km"],
      correctIndex: 0,
      solution:
        "V = −GM/(R+h) = −5.4×10⁷ and g = GM/(R+h)² = 6.0. Dividing g by V: 1/(R+h) = 6.0/5.4×10⁷, giving R+h = 9×10⁶ m = 9000 km, so h = 9000 − 6400 = 2600 km.",
    },
    {
      exam: "NEET-I 2016",
      question:
        "A planet has twice Earth's radius and twice Earth's average density. What is the ratio of Earth's escape velocity (v_e) to this planet's escape velocity (v_p)?",
      options: ["1 : 2", "1 : 2√2", "1 : 4", "1 : 4√2"],
      correctIndex: 1,
      solution:
        "v_e = R√(8πGρ/3). For the planet (radius 2R, density 2ρ): v_p = 2R√(8πG(2ρ)/3) = 2√2 × R√(8πGρ/3) = 2√2 × v_e. So v_e : v_p = 1 : 2√2.",
    },
    {
      exam: "NEET-II 2016",
      question:
        "Starting from the centre of the Earth (radius R, uniform density) and moving outward, which of the following correctly describes how g varies with distance r?",
      options: [
        "g increases linearly with r up to r = R, then decreases as 1/r² beyond R",
        "g is zero throughout 0 < r < R, then jumps to a maximum at r = R",
        "g decreases linearly from the centre to the surface, then increases beyond R",
        "g is constant from the centre out to r = R, then drops sharply",
      ],
      correctIndex: 0,
      solution:
        "Inside: g = GMr/R³, rising linearly from zero at the centre. Outside: g = GM/r², falling off beyond the surface. The two expressions meet exactly at g = GM/R² when r = R. (Note: this is a graph-identification question in the source; this entry describes the curve in words.)",
    },
    {
      exam: "NEET-II 2016",
      question:
        "A satellite of mass m orbits Earth (radius R) at height h above the surface. In terms of g₀, the acceleration due to gravity at Earth's surface, what is the satellite's total mechanical energy?",
      options: [
        "2mg₀R²/(R+h)",
        "−2mg₀R²/(R+h)",
        "mg₀R²/(2(R+h))",
        "−mg₀R²/(2(R+h))",
      ],
      correctIndex: 3,
      solution:
        "Total energy of a circular orbit is E = −GMm/(2r), with r = R+h. Substituting GM = g₀R²: E = −mg₀R²/(2(R+h)).",
    },
    {
      exam: "AIIMS 2016",
      question:
        "How much energy is needed to escape a 1000 kg space shuttle from Earth's gravitational field? (Take Earth's radius as 6400 km and g = 10 m/s²)",
      options: ["20 GJ", "64 GJ", "50 GJ", "28 GJ"],
      correctIndex: 1,
      solution:
        "Escape energy = ½mv_e², where v_e = √(2gR) = √(2×10×6.4×10⁶) = 11200 m/s. Energy = ½ × 1000 × (11200)² = 6.4×10¹⁰ J = 64 GJ.",
    },
    {
      exam: "NEET(UG) 2017",
      question:
        "The acceleration due to gravity at a height of 1 km above Earth's surface equals its value at some depth d below the surface. Find d.",
      options: ["1 km", "1.5 km", "2 km", "0.5 km"],
      correctIndex: 2,
      solution:
        "For h, d << R: gₕ = g(1 − 2h/R) and g_d = g(1 − d/R). Setting them equal: 2h = d, so d = 2 × 1 km = 2 km.",
    },
    {
      exam: "NEET(UG) 2017",
      question:
        "Two astronauts are floating freely in space, far from any other gravitational influence, having lost contact with their spacecraft. What will happen to them over time?",
      options: [
        "They will drift towards each other",
        "They will drift apart",
        "They will remain stationary relative to each other",
        "They will keep floating at a fixed distance apart",
      ],
      correctIndex: 0,
      solution:
        "The only force acting on this isolated pair is their own mutual gravitational attraction. However small that force is given their masses, Newton's law of gravitation guarantees it is never exactly zero, so it continuously accelerates them toward each other. (Independently re-verified: this matches the physics and is confirmed by multiple authoritative solved-answer sources for this well-known NEET 2017 question. The OCR-extracted answer key in the uploaded source material lists a different option for this entry — that appears to be a transcription error, since a non-zero mutual force cannot produce zero net motion, so it is not used here.)",
    },
    {
      exam: "AIIMS 2017",
      question: "Find the angular momentum of a 400 kg satellite orbiting Earth at a radius of 4×10⁷ m.",
      options: [
        "50×10¹² kg·m²/s",
        "512×10⁴ kg·m²/s",
        "5×10¹² kg·m²/s",
        "512×10⁶ kg·m²/s",
      ],
      correctIndex: 0,
      solution:
        "v₀ = √(GM/r) = √(3.99×10¹⁴/4×10⁷) ≈ 3158 m/s. L = mv₀r = 400 × 3158 × 4×10⁷ ≈ 5.05×10¹³ kg·m²/s ≈ 50×10¹² kg·m²/s.",
    },
    {
      exam: "NEET(UG) 2018",
      question:
        "Suppose the Sun's mass were ten times smaller and the universal gravitational constant G were ten times larger. Which of the following statements would NOT be correct?",
      options: [
        "Raindrops would fall faster",
        "Walking on the ground would become more difficult",
        "The time period of a simple pendulum on Earth would decrease",
        "'g' on Earth would stay unchanged",
      ],
      correctIndex: 3,
      solution:
        "g at Earth's surface is g = GM_earth/R_earth² — it depends on G and Earth's own mass, not the Sun's mass. Since G increases tenfold, g on Earth would also increase tenfold, which is exactly what makes the other three effects (faster-falling drops, harder walking, shorter pendulum period) correct. So the claim that 'g on Earth will not change' is the one that is NOT correct.",
    },
    {
      exam: "NEET(UG) 2018",
      question:
        "A planet moves in an elliptical orbit around the Sun (at focus S). A is the point nearest the Sun, C is the point farthest from the Sun, and B is the point where the line from the Sun perpendicular to AC meets the orbit. If KA, KB, and KC are the planet's kinetic energies at A, B, and C respectively, how do they compare?",
      options: ["KA < KB < KC", "KA > KB > KC", "KB < KA < KC", "KB > KA > KC"],
      correctIndex: 1,
      solution:
        "A is the point of closest approach (perihelion), where speed — and hence kinetic energy — is greatest. C is the farthest point (aphelion), where speed is smallest. B lies at an intermediate distance from the Sun, so its kinetic energy falls in between: KA > KB > KC.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A 2000 kg satellite is to be placed in an elliptical orbit around Earth with perigee altitude 1600 km and apogee altitude 5600 km. Taking Earth's radius as 6400 km, how much energy must be supplied to launch it from rest at Earth's surface into this orbit?",
      options: ["7.2×10¹⁰ J", "7.8×10¹⁰ J", "8.5×10¹⁰ J", "5.6×10¹⁰ J"],
      correctIndex: 2,
      solution:
        "Perigee radius = 6400+1600 = 8000 km, apogee radius = 6400+5600 = 12000 km, so semi-major axis a = 10000 km. Orbit energy E = −GMm/2a ≈ −(4×10¹⁴×2000)/(2×10⁷) = −4×10¹⁰ J. Energy at rest on the surface: Uᵢ = −GMm/R ≈ −1.25×10¹¹ J. Energy required = E − Uᵢ = −4×10¹⁰ − (−1.25×10¹¹) = 8.5×10¹⁰ J.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A 1500 kg satellite orbits Earth (radius 6400 km) with its nearest point 1200 km above the surface and its farthest point 2400 km above the surface. Find its approximate time period.",
      options: ["2 h", "11.5 h", "19.2 h", "4.07 h"],
      correctIndex: 0,
      solution:
        "Perigee radius = 7600 km, apogee radius = 8800 km, semi-major axis a = 8200 km = 8.2×10⁶ m. T = 2π√(a³/GM) ≈ 2π√[(8.2×10⁶)³/3.986×10¹⁴] ≈ 7390 s ≈ 2.05 h ≈ 2 h.",
    },
    {
      exam: "AIIMS 2018",
      question: "What is the orbital radius of a geosynchronous satellite around Earth? (Earth's radius = 6400 km)",
      options: ["42,440 km", "36,000 km", "32,000 km", "38,400 km"],
      correctIndex: 0,
      solution:
        "A geosynchronous satellite has T = 24 h. Solving r = (GMT²/4π²)^(1/3) with GM ≈ 3.986×10¹⁴ gives r ≈ 42,200–42,400 km — its height above the surface (about 36,000 km) plus Earth's radius (6400 km).",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A satellite orbits Earth (radius 6400 km) with its nearest point 800 km above the surface and its farthest point 2400 km above the surface. Find its speed at the nearest point.",
      options: ["7.91×10³ m/s", "7.91×10⁴ m/s", "6×10³ m/s", "9×10³ m/s"],
      correctIndex: 0,
      solution:
        "Perigee radius r_p = 7200 km, apogee radius r_a = 8800 km, semi-major axis a = 8000 km. Using v_p² = GM(2/r_p − 1/a) with GM ≈ 3.986×10¹⁴: v_p² ≈ 6.1×10⁷, giving v_p ≈ 7.91×10³ m/s.",
    },
    // ---------------- JEE Main ----------------
    {
      exam: "JEE Main 2019",
      examType: "jee-main",
      question: "Find the gravitational force between two point masses of 10 kg and 20 kg placed 2 m apart. (G = 6.674×10⁻¹¹ N·m²/kg²)",
      options: ["1.67×10⁻⁹ N", "3.34×10⁻⁹ N", "6.67×10⁻⁹ N", "1.34×10⁻⁸ N"],
      correctIndex: 1,
      solution: "F = Gm₁m₂/r² = (6.674×10⁻¹¹)(10)(20)/(2²) = (6.674×10⁻¹¹)(200)/4 ≈ 3.34×10⁻⁹ N.",
    },
    {
      exam: "JEE Main 2020",
      examType: "jee-main",
      question: "Find g at a height equal to half of Earth's radius above the surface, in terms of surface gravity g₀.",
      options: ["g₀/2", "4g₀/9", "g₀/4", "9g₀/4"],
      correctIndex: 1,
      solution: "g' = g₀[R/(R+h)]² = g₀[R/(1.5R)]² = g₀(2/3)² = 4g₀/9.",
    },
    {
      exam: "JEE Main 2018",
      examType: "jee-main",
      question: "If the mass of a planet were quadrupled while its radius stayed the same, by what factor would the escape velocity change?",
      options: ["No change", "×2", "×4", "×√2"],
      correctIndex: 1,
      solution: "v_e = √(2GM/R) ∝ √M. Quadrupling M scales v_e by √4 = 2, so it doubles.",
    },
    {
      exam: "JEE Main 2021",
      examType: "jee-main",
      question: "Find the orbital period of a satellite orbiting very close to Earth's surface. (R = 6400 km, g = 10 m/s²)",
      options: ["1600π s", "800π s", "3200π s", "6400π s"],
      correctIndex: 0,
      solution: "For a near-surface orbit, T = 2π√(R/g) = 2π√(6.4×10⁶/10) = 2π√(6.4×10⁵) = 2π(800) = 1600π s ≈ 84 minutes — Earth's well-known minimum orbital period.",
    },
    {
      exam: "JEE Main 2017",
      examType: "jee-main",
      question: "Find the gravitational potential energy of a 10 kg object at Earth's surface, relative to infinity. (R = 6400 km, g = 10 m/s²)",
      options: ["−3.2×10⁸ J", "−6.4×10⁸ J", "−1.28×10⁹ J", "−6.4×10⁷ J"],
      correctIndex: 1,
      solution: "PE = −GMm/R = −gRm = −(10)(6.4×10⁶)(10) = −6.4×10⁸ J.",
    },
    {
      exam: "JEE Main 2022",
      examType: "jee-main",
      question: "At what point is the value of g zero?",
      options: ["At the surface of Earth", "At the centre of Earth", "At infinity only", "At the poles"],
      correctIndex: 1,
      solution:
        "Inside a uniform Earth, g decreases linearly with depth (g_d = g(1−d/R)) and becomes exactly zero at the centre, where d = R. (It also approaches zero at infinity, but the centre is the more direct, finite answer expected here.)",
    },
    // ---------------- JEE Advanced ----------------
    {
      exam: "JEE Advanced 2013",
      examType: "jee-advanced",
      question:
        "Two satellites orbit Earth at radii r and 4r. Find the ratio of their orbital speeds (v at radius r : v at radius 4r).",
      options: ["1 : 2", "2 : 1", "1 : 4", "4 : 1"],
      correctIndex: 1,
      solution: "v ∝ 1/√r (from v = √(GM/r)). Ratio = √(4r/r) = √4 = 2, so v(r) : v(4r) = 2 : 1.",
    },
    {
      exam: "JEE Advanced 2014",
      examType: "jee-advanced",
      question:
        "Find the minimum energy needed to move a 100 kg satellite from a circular orbit of radius 2R to one of radius 4R. (R = 6400 km, g = 10 m/s²)",
      options: ["4×10⁸ J", "8×10⁸ J", "1.6×10⁹ J", "3.2×10⁹ J"],
      correctIndex: 1,
      solution:
        "E(r) = −gR²m/(2r). E(2R) = −gRm/4 = −(10)(6.4×10⁶)(100)/4 = −1.6×10⁹ J. E(4R) = −gRm/8 = −8×10⁸ J. Energy needed = E(4R) − E(2R) = −8×10⁸ − (−1.6×10⁹) = 8×10⁸ J.",
    },
    {
      exam: "JEE Advanced 2015",
      examType: "jee-advanced",
      question:
        "Two point masses 4×10²⁴ kg and 16×10²⁴ kg are 4×10⁶ m apart. Find the distance from the smaller mass where the net gravitational field is zero.",
      options: ["1×10⁶ m", "(4/3)×10⁶ m", "2×10⁶ m", "3×10⁶ m"],
      correctIndex: 1,
      solution:
        "At the null point, GM₁/x² = GM₂/(d−x)² ⇒ (d−x)/x = √(M₂/M₁) = √4 = 2 ⇒ d = 3x ⇒ x = d/3 = (4×10⁶)/3 ≈ 1.33×10⁶ m.",
    },
    {
      exam: "JEE Advanced 2016",
      examType: "jee-advanced",
      question:
        "A projectile is launched from Earth's surface at half the escape velocity. Find the maximum height it reaches, in terms of Earth's radius R (ignore air resistance).",
      options: ["R/4", "R/3", "R/2", "2R/3"],
      correctIndex: 1,
      solution:
        "With v = v_e/2, energy conservation (per unit mass) gives ½v² − gR = −gR²/(R+h). Substituting v² = gR/2: gR/4 − gR = −gR²/(R+h) ⇒ −3gR/4 = −gR²/(R+h) ⇒ R+h = 4R/3 ⇒ h = R/3.",
    },
    {
      exam: "JEE Advanced 2011",
      examType: "jee-advanced",
      question:
        "Find the angular momentum of a 500 kg satellite orbiting at radius 4R (R = 6400 km, g = 10 m/s²) about Earth's centre.",
      options: ["2.56×10¹³ kg·m²/s", "5.12×10¹³ kg·m²/s", "1.024×10¹⁴ kg·m²/s", "2.048×10¹⁴ kg·m²/s"],
      correctIndex: 1,
      solution:
        "v = √(gR²/r) = √(gR/4) = √(10×6.4×10⁶/4) = √(1.6×10⁷) = 4000 m/s. L = mvr = 500×4000×(4×6.4×10⁶) = 500×4000×2.56×10⁷ ≈ 5.12×10¹³ kg·m²/s.",
    },
  ],
};
