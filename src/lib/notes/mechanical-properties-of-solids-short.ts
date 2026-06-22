export type ShortNoteGroup = {
  heading: string;
  points: string[];
};

export type ChapterShortNotes = {
  chapterName: string;
  className: "11" | "12";
  groups: ShortNoteGroup[];
};

export const mechanicalPropertiesOfSolidsShortNotes: ChapterShortNotes = {
  chapterName: "Mechanical Properties of Solids",
  className: "11",
  groups: [
    {
      heading: "Stress and Strain — Definitions & Types",
      points: [
        "Stress = F/A — SI unit N/m² (Pa); dimensions [M¹L⁻¹T⁻²].",
        "Longitudinal stress: tensile (stretching) or compressive (squeezing) — normal to the surface.",
        "Volume stress: equal normal forces over the entire surface, changes only volume.",
        "Shear stress: tangential to the surface, changes shape but NOT volume.",
        "Strain = (change in dimension)/(original dimension) — dimensionless, no units.",
        "Longitudinal strain = ΔL/L; volume strain = ΔV/V; shear strain φ = Δx/L (≈ tanφ).",
        "Angle of twist θ and angle of shear φ for a twisted cylinder: rθ = lφ ⇒ φ = rθ/l.",
        "Breaking stress depends on material, temperature, impurities — NOT on area or force. Max load a wire can bear ∝ area.",
      ],
    },
    {
      heading: "Stress–Strain Graph",
      points: [
        "Proportional limit: linear region, Hooke's law holds, body is elastic.",
        "Elastic limit (yield point): stress–strain no longer linear, but full recovery still occurs if unloaded here.",
        "Plastic region: beyond elastic limit, body keeps a permanent set even after unloading.",
        "Tensile strength (ultimate point): beyond this, strain grows even with reduced force → fracture point follows.",
        "Ductile material: large plastic region between elastic limit and fracture (can be drawn into wire).",
        "Brittle material: small/negligible plastic region — fractures soon after the elastic limit.",
        "Elastomers (e.g., rubber): huge elastic strain (up to ~30%), don't obey Hooke's law over most of the range.",
      ],
    },
    {
      heading: "Hooke's Law & Young's Modulus (Y)",
      points: [
        "Hooke's law: stress ∝ strain, within elastic limit only.",
        "Y = longitudinal stress/longitudinal strain = FL/(AΔL).",
        "Y depends ONLY on material, temperature, and impurities — never on the magnitude of stress or strain applied.",
        "Elongation under an end-hung load Mg: ΔL = MgL/(AY) = MgL/(πr²Y).",
        "Y = slope of the stress–strain graph in the linear region.",
      ],
    },
    {
      heading: "Elongation Due to a Wire's Own Weight",
      points: [
        "ΔL = MgL/(2AY) = ρgL²/(2Y) — note the extra factor of 2 vs. an end-loaded wire.",
        "Tension (and stress) is maximum at the point of suspension, zero at the free lower end.",
        "The factor of 2 arises because the weight acts effectively as if concentrated at the midpoint of the rope, not at the free end.",
      ],
    },
    {
      heading: "Bulk Modulus (K) & Modulus of Rigidity (η)",
      points: [
        "K = volume stress/volume strain = −ΔP/(ΔV/V); compressibility C = 1/K.",
        "η = shear stress/shear strain = F/(Aφ).",
        "K is maximum for solids, minimum for gases.",
        "For liquids & gases: Y = 0 and η = 0 (no fixed length or shape to resist) — only K is meaningful.",
        "For an ideal rigid body: Y, K, η are all infinite (zero strain for any stress).",
        "η is a property exclusive to solids — fluids cannot resist a shearing force permanently.",
      ],
    },
    {
      heading: "Poisson's Ratio (σ) & Relations Between Constants",
      points: [
        "σ = lateral strain/longitudinal strain — dimensionless.",
        "Theoretical range: −1 ≤ σ ≤ 0.5; practical range for real materials: σ ≈ 0.2–0.4.",
        "Y = 3K(1 − 2σ) = 2η(1 + σ).",
        "9/Y = 3/η + 1/K — links all four constants directly.",
        "Given any two of {Y, K, η, σ}, the other two can always be found from these relations.",
      ],
    },
    {
      heading: "Elastic Potential Energy",
      points: [
        "W = ½FΔl (work done in stretching, exactly like an ideal spring).",
        "W = ½ × stress × strain × volume = ½Y(strain)² × volume.",
        "Energy density (per unit volume) = ½ × stress × strain = area under the stress–strain curve.",
        "This energy is fully recoverable as long as the wire stayed within its elastic limit.",
      ],
    },
    {
      heading: "Factors Affecting Elasticity",
      points: [
        "Temperature ↑ ⇒ Y generally ↓ (weaker intermolecular forces); material becomes more plastic.",
        "Invar steel: exception — elastic constants barely change with temperature (used in precision clocks/instruments).",
        "Impurities ⇒ Y slightly ↑ (intermolecular attraction strengthens marginally).",
        "Interatomic force constant: k = Y × r₀ (r₀ = equilibrium interatomic spacing) — directly proportional to Y.",
      ],
    },
    {
      heading: "Applications of Elastic Behaviour",
      points: [
        "Crane cable: minimum safe cross-section A ≥ mg/S_y (S_y = yield strength of the material).",
        "Girder: a deeper cross-section (larger d) resists sagging far better than a wider/shallower one for the same material & load.",
        "Maximum height of a mountain: H ≈ (breaking stress of rock)/(ρg) ≈ 10 km — beyond this, base rock would simply give way.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Breaking stress is independent of area and applied force — but the maximum LOAD a wire can take before breaking DOES depend on area (Load = Breaking stress × A). Don't mix the two up.",
        "Y is a fixed ratio for a given material — it does NOT increase just because more load/stress is applied; it stays constant within the elastic limit regardless of the values of stress or strain.",
        "Own-weight elongation has an extra factor of 2 in the denominator (ΔL = MgL/2AY) compared to end-loaded elongation (ΔL = MgL/AY) — a very common one-mark slip.",
        "Shear strain changes shape only, never volume — don't confuse it with volume strain (ΔV/V), which is the only strain that changes volume.",
        "For liquids and gases, only K exists; Y = η = 0 — questions sometimes wrongly ask for the 'Young's modulus of water', which is meaningless.",
        "Watch the sign in K = −ΔP/(ΔV/V): pressure increase causes volume decrease, but K itself is always quoted as a positive number.",
        "Y = 2η(1+σ) and Y = 3K(1−2σ) — easy to swap which modulus pairs with which factor; re-derive from 9/Y = 3/η + 1/K if unsure during the exam.",
      ],
    },
  ],
};
