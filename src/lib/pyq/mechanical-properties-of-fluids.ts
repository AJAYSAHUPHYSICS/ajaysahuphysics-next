export type PyqQuestion = {
  exam: string;
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

export const mechanicalPropertiesOfFluidsPyq: ChapterPyq = {
  chapterName: "Mechanical Properties of Fluids",
  className: "11",
  questions: [
    {
      exam: "AIIMS 2006",
      question:
        "By sucking on a straw, a student can lower the pressure in his lungs to 750 mm of Hg (atmospheric pressure corresponds to 760 mm of Hg; density of mercury = 13.6 g/cm³). Using the straw, what is the maximum depth from which he can drink water?",
      options: ["10 cm", "75 cm", "13.6 cm", "1.36 cm"],
      correctIndex: 2,
      solution:
        "The pressure difference driving the water up is equivalent to 10 mm of Hg. Equating mercury and water columns: ρ_Hg·g·h_Hg = ρ_water·g·h_water ⇒ h_water = h_Hg × (ρ_Hg/ρ_water) = 10 mm × 13.6 = 136 mm = 13.6 cm.",
    },
    {
      exam: "AIIMS 2010",
      question:
        "Two soap bubbles of radii R₁ and R₂ coalesce in vacuum under isothermal conditions to form a single soap bubble. What is the radius of the combined bubble?",
      options: ["R₁R₂/(R₁+R₂)", "√(R₁² + R₂²)", "(R₁+R₂)/2", "R₁R₂/(R₁−R₂)"],
      correctIndex: 1,
      solution:
        "For a soap bubble, excess pressure P ∝ 1/r, and volume V ∝ r³, so the quantity PV (proportional to the amount of enclosed gas at constant temperature) is proportional to r². Conservation of gas during coalescence gives r² = R₁² + R₂², so r = √(R₁² + R₂²).",
    },
    {
      exam: "AIIMS 2011",
      question:
        "Water flows with a speed of 4 m/s through a cylindrical pipe of diameter 8 cm. This pipe connects to a narrower outlet tip of diameter 2 cm. Find the speed of water at this outlet.",
      options: ["4 m/s", "8 m/s", "32 m/s", "64 m/s"],
      correctIndex: 3,
      solution:
        "By the equation of continuity, A₁v₁ = A₂v₂ ⇒ v₂ = v₁ × (d₁/d₂)² = 4 × (8/2)² = 4 × 16 = 64 m/s.",
    },
    {
      exam: "AIIMS 2011",
      question: "In Bernoulli's equation written in the 'energy per unit weight' form, the term called the pressure head is:",
      options: ["P/ρg", "ρg/P", "ρg", "Pρg"],
      correctIndex: 0,
      solution:
        "Dividing Bernoulli's equation (P + ½ρv² + ρgh = constant) throughout by ρg gives P/ρg + v²/2g + h = constant. The first term, P/ρg, is the pressure head.",
    },
    {
      exam: "AIIMS 2012",
      question: "A spherical body of diameter D is falling through a viscous medium. Its terminal velocity v_T is proportional to:",
      options: ["D^(1/2)", "D^(3/2)", "D²", "D^(5/2)"],
      correctIndex: 2,
      solution:
        "By Stokes' law, v_T = 2r²(ρ−σ)g/(9η). With r = D/2, v_T ∝ r² ∝ D².",
    },
    {
      exam: "NEET UG 2013",
      question: "The wettability of a solid surface by a given liquid depends primarily on:",
      options: [
        "The angle of contact between the surface and the liquid",
        "The viscosity of the liquid",
        "The surface tension of the liquid alone",
        "The density of the liquid",
      ],
      correctIndex: 0,
      solution:
        "Wettability is determined by the angle of contact: an acute angle (θ < 90°) means the liquid wets the surface, while an obtuse angle (θ > 90°) means it does not.",
    },
    {
      exam: "AIIMS 2013",
      question:
        "A non-viscous fluid of constant density 1000 kg/m³ flows in streamline motion through a tube of varying cross-section. At point P, the cross-sectional area is 40 cm² and the flow speed is 3 m/s. At a narrower point Q, the cross-sectional area is 20 cm². Find the flow speed at Q.",
      options: ["3 m/s", "4 m/s", "5 m/s", "6 m/s"],
      correctIndex: 3,
      solution:
        "By the equation of continuity, A_P·v_P = A_Q·v_Q ⇒ v_Q = (A_P/A_Q) × v_P = (40/20) × 3 = 6 m/s.",
    },
    {
      exam: "AIPMT 2014",
      question:
        "A certain number of spherical droplets of a liquid, each of radius r, coalesce to form a single larger drop of radius R and volume V. If T is the surface tension of the liquid, which statement correctly describes the associated energy change?",
      options: [
        "Energy = 4VT(1/r − 1/R) is released",
        "Energy = 3VT(1/r + 1/R) is absorbed",
        "Energy = 3VT(1/r − 1/R) is released",
        "Energy is neither released nor absorbed",
      ],
      correctIndex: 2,
      solution:
        "Total surface area decreases when small drops merge into one big drop, so energy is released. Using volume conservation and surface energy before/after, the released energy works out to ΔE = 3VT(1/r − 1/R).",
    },
    {
      exam: "AIPMT 2015",
      question:
        "Wind blows at 40 m/s parallel to the roof of a house whose roof area is 250 m². Assuming the air pressure inside the house stays atmospheric, find the net force exerted by the wind on the roof and its direction. (density of air = 1.2 kg/m³)",
      options: [
        "4.8 × 10⁵ N, upward",
        "2.4 × 10⁵ N, upward",
        "2.4 × 10⁵ N, downward",
        "4.8 × 10⁵ N, downward",
      ],
      correctIndex: 1,
      solution:
        "By Bernoulli's theorem, the pressure difference between the still air inside and the fast-moving air outside is ΔP = ½ρv² = ½ × 1.2 × 40² = 960 Pa. Force = ΔP × A = 960 × 250 = 2.4×10⁵ N. Since outside pressure is lower, the net force acts upward, lifting the roof.",
    },
    {
      exam: "AIPMT (Re-Exam) 2015",
      question:
        "A cylindrical spray-pump tube of radius R has n fine holes, each of radius r, at one end. If the liquid moves through the tube at speed V, find the speed at which it is ejected through each hole.",
      options: ["2VR/(nr)", "VR²/(n²r²)", "VR²/(nr²)", "VR²/(n^(3/2)r²)"],
      correctIndex: 2,
      solution:
        "By continuity, the flow rate in the tube equals the combined flow rate through all n holes: πR²V = n·πr²·v_hole ⇒ v_hole = VR²/(nr²).",
    },
    {
      exam: "AIPMT (Re-Exam) 2015",
      question:
        "Water rises to height h in a capillary tube. If the portion of the capillary tube above the liquid surface is now shortened to a length less than h, what happens?",
      options: [
        "Water does not rise at all",
        "Water rises to the tip and then overflows like a fountain",
        "Water rises to the top of the tube and stays there without overflowing",
        "Water rises to a point a little below the top and stays there",
      ],
      correctIndex: 2,
      solution:
        "The rise height h assumes the meniscus curves with a radius equal to the tube's radius. If the available length is shorter, the liquid simply rises to the open top and the meniscus flattens out (adopting a larger radius of curvature) so that the reduced curvature force balances the shorter column's weight — it settles at the top without overflowing.",
    },
    {
      exam: "AIIMS 2015",
      question:
        "Two small spheres A and B, made of the same material (equal density) with radii r_A = 1 mm and r_B = 2 mm, fall through the same viscous medium. Find the ratio of their terminal velocities, v_A/v_B.",
      options: ["1/4", "1/2", "4", "2"],
      correctIndex: 0,
      solution:
        "By Stokes' law, terminal velocity v_T = 2r²(ρ−σ)g/(9η) ∝ r² for spheres of the same density in the same medium. So v_A/v_B = (r_A/r_B)² = (1/2)² = 1/4 — the smaller sphere has the smaller terminal velocity.",
    },
    {
      exam: "AIIMS 2015",
      question:
        "Water needs to be sprayed from a fire-fighting nozzle so that it just reaches a window on fire, 20 m above the nozzle. What is the minimum speed with which water must leave the nozzle? (g = 10 m/s²) — Note: this question is reconstructed from a source figure whose numerical data did not produce a consistent answer; this version tests the identical underlying concept (minimum speed needed to reach a given height).",
      options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
      correctIndex: 2,
      solution:
        "Treating the water jet as a vertically projected body, the minimum launch speed needed to just reach height h is v = √(2gh) = √(2×10×20) = √400 = 20 m/s.",
    },
    {
      exam: "AIIMS 2015",
      question:
        "The total wing area of an aeroplane is 10 m². The air flows at 140 m/s over the upper wing surface and 110 m/s below it. Find the net force exerted on the aeroplane by this pressure difference. (density of air = 1.28 kg/m³)",
      options: ["48750 N", "48000 N", "95000 N", "50000 N"],
      correctIndex: 1,
      solution:
        "By Bernoulli's theorem, the lift force F = ½ρ(v_lower² − v_upper²) × A = ½ × 1.28 × (140² − 110²) × 10 = ½ × 1.28 × 7500 × 10 = 48000 N.",
    },
    {
      exam: "NEET-I 2016",
      question:
        "Two immiscible liquids of densities ρ and nρ (n > 1) are layered in a container, each layer of height h. A solid cylinder of length L and density d floats with its axis vertical, with a length pL (p < 1) submerged in the denser liquid and the rest in the lighter liquid. Find d.",
      options: ["{1 + (n+1)p}ρ", "{2 + (n+1)p}ρ", "{2 + (n−1)p}ρ", "{1 + (n−1)p}ρ"],
      correctIndex: 3,
      solution:
        "Balancing weight against the combined buoyant force from both layers: (AL)dg = A(pL)(nρ)g + A(1−p)L(ρ)g. Dividing through: d = npρ + (1−p)ρ = ρ[1 + p(n−1)].",
    },
    {
      exam: "NEET-II 2016",
      question:
        "A rectangular liquid film is stretched from an area of 4 cm × 2 cm to 5 cm × 4 cm. If the work done in this process is 3 × 10⁻⁴ J, find the surface tension of the liquid.",
      options: ["0.2 N/m", "8.0 N/m", "0.250 N/m", "0.125 N/m"],
      correctIndex: 3,
      solution:
        "Initial area = 8 cm² = 8×10⁻⁴ m²; final area = 20 cm² = 20×10⁻⁴ m². Increase per surface = 12×10⁻⁴ m². Since a film has TWO surfaces, total increase = 24×10⁻⁴ m². T = W/ΔA = (3×10⁻⁴)/(24×10⁻⁴) = 0.125 N/m.",
    },
    {
      exam: "NEET-II 2016",
      question:
        "Three liquids of densities ρ₁ > ρ₂ > ρ₃, all having the same surface tension T, rise to the same height in three identical capillary tubes. How must their angles of contact θ₁, θ₂, θ₃ compare?",
      options: [
        "π/2 < θ₁ < θ₂ < θ₃ < π",
        "π > θ₁ > θ₂ > θ₃ > π/2",
        "π/2 > θ₁ > θ₂ > θ₃ ≥ 0",
        "0 ≤ θ₁ < θ₂ < θ₃ < π/2",
      ],
      correctIndex: 3,
      solution:
        "From h = 2Tcosθ/(rρg), with h, T, r identical for all three: cosθ ∝ ρ. Since ρ₁ > ρ₂ > ρ₃, it follows that cosθ₁ > cosθ₂ > cosθ₃, which (cosine being a decreasing function over 0 to π/2) means θ₁ < θ₂ < θ₃, with all angles acute (since the liquids rise, cosθ > 0): 0 ≤ θ₁ < θ₂ < θ₃ < π/2.",
    },
    {
      exam: "AIIMS 2016",
      question:
        "Two arteries of the same length carry blood under the same pressure difference across their ends. If their radii are in the ratio 1 : 3, find the ratio of the rates of blood flow through them.",
      options: ["1/9", "1/27", "1/81", "1/243"],
      correctIndex: 2,
      solution:
        "By Poiseuille's formula, Q = πPr⁴/(8ηL) ∝ r⁴ for the same P, L, and η. Q₁/Q₂ = (r₁/r₂)⁴ = (1/3)⁴ = 1/81.",
    },
    {
      exam: "AIIMS 2016",
      question:
        "Water is drawn up in a capillary tube of radius 5 mm. Given surface tension T = 0.072 N/m, density of water 1000 kg/m³, and g = 10 m/s², find the height to which water rises.",
      options: ["2.8 cm", "2.9 mm", "28 cm", "2.8 m"],
      correctIndex: 1,
      solution:
        "h = 2T/(rρg) = (2 × 0.072)/(0.005 × 1000 × 10) = 0.144/50 = 0.00288 m ≈ 2.9 mm.",
    },
    {
      exam: "NEET UG 2017",
      question:
        "A U-tube, open at both ends, is partially filled with water. Oil (immiscible with water) is poured into one limb until its surface stands 10 mm above the water level in the other limb. Meanwhile, the water level in that other limb has risen by 65 mm from its original position. Find the density of the oil.",
      options: ["425 kg/m³", "800 kg/m³", "928 kg/m³", "650 kg/m³"],
      correctIndex: 2,
      solution:
        "By symmetry of a uniform tube, the water-oil interface in the oil limb sits 65 mm below the original level (since the displaced volume must reappear as the 65 mm rise on the other side). The oil column height is therefore 65 + 65 + 10 = 140 mm. Equating pressures at the level of the interface: ρ_oil·g·(0.140) = ρ_water·g·(0.130) [the water column height difference between the two limbs at that level] ⇒ ρ_oil = 1000 × (130/140) ≈ 928 kg/m³.",
    },
    {
      exam: "AIIMS 2017",
      question:
        "Find the maximum weight of a needle, 4 cm long, that can float on a water surface of surface tension 0.073 N/m. (g = 10 m/s²)",
      options: ["0.58 kg", "0.584 g", "1.3 g", "1.3 kg"],
      correctIndex: 1,
      solution:
        "The needle is supported along both its edges by surface tension: F = 2Tl = 2 × 0.073 × 0.04 = 0.00584 N. Converting to an equivalent mass: m = F/g = 0.00584/10 = 0.000584 kg = 0.584 g.",
    },
    {
      exam: "NEET UG 2018",
      question:
        "A small sphere of radius r falls from rest through a viscous liquid, generating heat due to viscous resistance. Once the sphere reaches its terminal velocity, the rate at which heat is produced is proportional to:",
      options: ["r³", "r²", "r⁵", "r⁴"],
      correctIndex: 2,
      solution:
        "At terminal velocity, the power dissipated as heat equals the net downward force (weight minus buoyancy, ∝ r³, i.e., proportional to volume) times the terminal velocity (∝ r², by Stokes' law). So the rate of heat production ∝ r³ × r² = r⁵.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "Find the maximum weight of a needle, 5 cm long, that can float on a water surface of surface tension 0.073 N/m.",
      options: ["73 × 10⁻⁴ N", "36.5 × 10⁻⁴ N", "146 × 10⁻⁴ N", "292 × 10⁻⁴ N"],
      correctIndex: 0,
      solution: "F = 2Tl = 2 × 0.073 × 0.05 = 0.0073 N = 73 × 10⁻⁴ N.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "Water shoots up as a fountain from a vertical tube at a rate of 3000 litres/min and just reaches a height of 10 m. Find the cross-sectional area of the tube. (g = 10 m/s²)",
      options: ["35 cm²", "40 cm²", "80 cm²", "17 cm²"],
      correctIndex: 0,
      solution:
        "Exit speed needed to just reach height 10 m: v = √(2gh) = √(2×10×10) = √200 ≈ 14.14 m/s. Flow rate Q = 3000 L/min = 3/60 = 0.05 m³/s. Area A = Q/v = 0.05/14.14 ≈ 3.54×10⁻³ m² ≈ 35 cm².",
    },
    {
      exam: "AIIMS 2018",
      question:
        "Water fills a cylindrical tube of internal diameter 1 mm to a length of 50 cm. If the surface tension of water is 0.055 N/m, find the pressure difference across the curved meniscus of water in the tube.",
      options: ["220 Pa", "110 Pa", "45 Pa", "440 Pa"],
      correctIndex: 0,
      solution:
        "P_excess = 2T/r, where r = (1 mm)/2 = 0.0005 m (the tube's length is irrelevant here). P_excess = (2 × 0.055)/0.0005 = 220 Pa.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A tank is filled with water to a height of 1 m. A small hole is made on the side, 20 cm below the top. Find the horizontal distance from the base of the tank where the emerging water strikes the ground. (g = 10 m/s²)",
      options: ["60 cm", "80 cm", "100 cm", "40 cm"],
      correctIndex: 1,
      solution:
        "Depth of the hole below the surface = 0.2 m, so exit speed v = √(2×10×0.2) = √4 = 2 m/s. Height of the hole above the ground = 1 − 0.2 = 0.8 m, so fall time t = √(2×0.8/10) = √0.16 = 0.4 s. Horizontal range R = v×t = 2 × 0.4 = 0.8 m = 80 cm.",
    },
    {
      exam: "AIIMS 2018",
      question:
        "A ring of radius 2.5 cm and mass 10 g floats on a liquid surface of surface tension 0.06 N/m. Find the force required to just lift the ring off the liquid surface. (g = 10 m/s²)",
      options: ["0.06 N", "0.12 N", "0.24 N", "0.03 N"],
      correctIndex: 1,
      solution:
        "The liquid film pulls on both the inner and outer edges of the ring: F_surface = 2 × (2πr)T = 4πrT = 4π × 0.025 × 0.06 ≈ 0.0188 N. Adding the ring's own weight, mg = 0.01 × 10 = 0.1 N: total force ≈ 0.1 + 0.0188 ≈ 0.12 N.",
    },
  ],
};
