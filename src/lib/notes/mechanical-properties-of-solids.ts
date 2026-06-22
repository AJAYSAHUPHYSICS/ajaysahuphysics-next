import type { ChapterNotes } from "./kinematics";

export const mechanicalPropertiesOfSolidsNotes: ChapterNotes = {
  chapterName: "Mechanical Properties of Solids",
  className: "11",
  intro:
    "No real object is perfectly rigid — every solid deforms a little when a force acts on it, and most solids spring back once that force is removed. This chapter quantifies that springiness through stress, strain, and a handful of elastic constants, then uses them to answer very practical questions: how much will a wire stretch, how tall can a mountain be, and how thick should a crane's cable really be.",
  sections: [
    {
      heading: "1. Elastic Behaviour of Solids",
      body:
        "A deforming force tries to change the length, volume, or shape of a body. Elasticity is the property by which a body resists this change and returns to its original size and shape once the force is removed. No material is perfectly elastic or perfectly rigid in practice — these are useful idealisations at opposite ends of a spectrum.",
      bullets: [
        "Perfectly elastic body: regains its original form completely once the deforming force is removed. Quartz and phosphor-bronze come closest to this ideal.",
        "Plastic body: shows little to no tendency to oppose deformation and stays deformed even after the force is removed.",
        "Restoring force: the internal force, arising from intermolecular interactions, that opposes the deformation. At equilibrium, its magnitude equals the applied deforming force.",
        "Diamond is the closest real approximation to a perfectly rigid body — its constituent particles barely shift position under ordinary forces.",
      ],
    },
    {
      heading: "2. Stress and Its Types",
      body:
        "Stress is the restoring force developed per unit cross-sectional area inside a deformed body. Since the internal restoring force balances the external deforming force at equilibrium, stress can equally be computed from either one.",
      formula: [
        { label: "Stress", expression: "Stress = F / A" },
        { label: "SI unit", expression: "N/m² (pascal)" },
        { label: "Dimensions", expression: "[M¹L⁻¹T⁻²]" },
      ],
      bullets: [
        "Longitudinal (normal) stress acts perpendicular to the surface. It is tensile stress if it stretches the body and increases its length, and compressive stress if it squeezes the body and reduces its length.",
        "Volume stress arises when equal normal forces act over the entire surface of a body, changing only its volume.",
        "Shear stress acts tangential to the surface. It changes the shape of the body but leaves its volume unchanged.",
        "Breaking stress (ultimate strength) is the stress at which a material actually fractures. It depends on the nature of the material, temperature, and impurities — but NOT on the cross-sectional area or the magnitude of the applied force.",
        "Because breaking stress is a fixed material property, the maximum load a wire of given material can bear before breaking is directly proportional to its cross-sectional area.",
      ],
    },
    {
      heading: "3. Strain and Its Types",
      body:
        "Strain measures the fractional deformation produced — the change in a dimension divided by its original value. Being a ratio of two similar quantities, strain has no units or dimensions.",
      formula: [
        { label: "Longitudinal strain", expression: "ε = ΔL / L" },
        { label: "Volume strain", expression: "ΔV / V" },
        { label: "Shear strain", expression: "φ = Δx / L  (≈ tanφ, for small φ)" },
      ],
      bullets: [
        "Longitudinal strain occurs only in solids, since it requires a definite length to be preserved along one direction.",
        "Shear strain φ equals the angular displacement of a face of the body, measured as the sideways shift of the upper face relative to the lower face, divided by the separation between them.",
        "For a cylinder of length l and radius r, twisted through angle θ at the free end while fixed at the other, the angle of shear φ at the surface relates to the angle of twist θ through rθ = lφ, so φ = rθ/l. Even a small angle of twist θ produces a much smaller angle of shear φ when r << l.",
        "Strain in the direction of the applied force is called longitudinal strain; strain in a direction perpendicular to it is lateral strain — these two are linked through Poisson's ratio (Section 7).",
      ],
    },
    {
      heading: "4. The Stress–Strain Graph",
      body:
        "Plotting stress against strain as a wire is loaded reveals distinct regions of behaviour, and the shape of this curve is itself used to classify how a material responds to increasing load.",
      bullets: [
        "Proportional limit: in the initial, linear portion of the graph, stress is directly proportional to strain — this is the region where Hooke's law holds and the body behaves elastically.",
        "Elastic limit (yield point): beyond the linear region, stress and strain are no longer proportional, but the body still fully recovers its original dimensions if the load is removed before this point.",
        "Plastic region: past the elastic limit, removing the load no longer brings strain back to zero — the body retains a permanent set. Further loading in this region produces a rapid rise in strain for comparatively little extra stress.",
        "Tensile strength (ultimate point): beyond this point, the material continues to stretch even if the applied force is reduced, and fracture quickly follows at the breaking point.",
        "A material with a large plastic region between its elastic limit and fracture point is ductile (can be drawn into wires); one with a small or negligible plastic region is brittle (snaps soon after the elastic limit).",
        "Elastomers (e.g., rubber) stretch enormously — strains as large as 30% — without ever obeying Hooke's law over most of that range, yet still recover their shape almost completely.",
      ],
    },
    {
      heading: "5. Hooke's Law and Young's Modulus",
      body:
        "Hooke's law states that within the elastic limit, stress is directly proportional to the corresponding strain. The constant of proportionality is called the modulus of elasticity, and for longitudinal deformation, this constant is Young's modulus.",
      formula: [
        { label: "Hooke's law", expression: "stress = (modulus) × strain" },
        { label: "Young's modulus", expression: "Y = (F/A) / (ΔL/L) = FL / (AΔL)" },
        { label: "Elongation under a hanging load Mg", expression: "ΔL = MgL / (Aπr²Y)" },
      ],
      bullets: [
        "Y depends only on the nature of the material, its temperature, and the impurities present — never on the values of stress or strain themselves, since it is the ratio that stays constant within the elastic limit.",
        "A wire hanging under its own weight stretches differently from one stretched by a single end-load, because the tension inside it isn't uniform — this special case is worked out separately in the next section.",
      ],
    },
    {
      heading: "6. Elongation of a Hanging Wire Under Its Own Weight",
      body:
        "For a uniform rope of length L, cross-section A, and density ρ hanging vertically, the tension varies linearly along its length — maximum at the top, zero at the free end — so the stress and strain also vary point to point.",
      formula: [
        { label: "Total elongation due to own weight", expression: "ΔL = MgL / (2AY) = ρgL² / (2Y)" },
      ],
      bullets: [
        "The factor of 2 in the denominator (compared with a wire stretched by an external load Mg at its end) reflects that the weight acts, on average, as though concentrated at the rope's midpoint rather than at its very end.",
        "Stress is maximum at the point of suspension (it must support the full weight below) and minimum — zero — at the free lower end.",
      ],
    },
    {
      heading: "7. Bulk Modulus, Compressibility, and Modulus of Rigidity",
      body:
        "Young's modulus describes resistance to a change in length. Two further moduli describe resistance to a change in volume and resistance to a change in shape respectively.",
      formula: [
        { label: "Bulk modulus", expression: "K = (volume stress) / (volume strain) = −ΔP / (ΔV/V)" },
        { label: "Compressibility", expression: "C = 1 / K" },
        { label: "Modulus of rigidity", expression: "η = (shear stress) / (shear strain) = F / (Aφ)" },
      ],
      bullets: [
        "The negative sign in K's definition simply reflects that volume decreases when pressure increases — K itself is reported as a positive quantity.",
        "K is largest for solids and smallest for gases, since gases compress far more readily than solids for the same change in pressure.",
        "For liquids and gases, Young's modulus and the modulus of rigidity are both effectively zero — fluids cannot sustain a fixed length or resist a permanent shape change the way solids can. Bulk modulus, by contrast, is meaningful for solids, liquids, and gases alike.",
        "For an ideal (perfectly rigid) body, all three moduli — Y, K, and η — are taken as infinite, since no strain whatsoever is produced regardless of the stress applied.",
        "Modulus of rigidity is a property exclusive to solids, since only solids can sustain a fixed shape against a tangential (shearing) force.",
      ],
    },
    {
      heading: "8. Poisson's Ratio and Relations Between Elastic Constants",
      body:
        "When a wire is stretched, it doesn't just get longer — it also gets thinner. Poisson's ratio quantifies exactly how much thinning accompanies a given amount of stretching.",
      formula: [
        { label: "Poisson's ratio", expression: "σ = (lateral strain) / (longitudinal strain)" },
        { label: "Theoretical limits", expression: "−1 ≤ σ ≤ 0.5" },
        { label: "Experimental range for real materials", expression: "σ ≈ 0.2 to 0.4" },
        { label: "Relation linking Y, K, η, σ", expression: "Y = 3K(1 − 2σ) = 2η(1 + σ)" },
        { label: "Relation linking all four directly", expression: "9/Y = 3/η + 1/K" },
      ],
      bullets: [
        "Since σ is a ratio of two strains, it is dimensionless and unitless — exactly like strain itself.",
        "Given any two of the four elastic constants (Y, K, η, σ), the relations above let you compute the remaining two for the same material.",
      ],
    },
    {
      heading: "9. Elastic Potential Energy in a Stretched Wire",
      body:
        "Stretching a wire requires work to be done against the internal restoring force, and since the wire is elastic, none of this work is lost — it is stored entirely as potential energy within the stretched wire.",
      formula: [
        { label: "Work done in stretching by Δl", expression: "W = ½ F Δl" },
        { label: "Energy in terms of stress, strain, volume", expression: "W = ½ × (stress) × (strain) × (volume)" },
        { label: "Equivalently", expression: "W = ½ Y (strain)² × volume" },
      ],
      bullets: [
        "This follows because the restoring force grows linearly with extension within the elastic limit (F = YAx/L), so the work done is the area of a triangle on the force–extension graph, exactly as with an ideal spring.",
        "Elastic potential energy density (energy per unit volume) equals ½ × stress × strain — and geometrically, this is just the area under the stress–strain curve up to that strain.",
        "Young's modulus itself is the slope of the stress–strain graph in the linear (Hooke's law) region.",
      ],
    },
    {
      heading: "10. Factors Affecting Elasticity",
      body:
        "Elastic constants are properties of the material, but they are not fixed forever — temperature and impurities can shift them measurably.",
      formula: [
        { label: "Interatomic force constant", expression: "k = Y × r₀  (r₀ = equilibrium interatomic spacing)" },
      ],
      bullets: [
        "Effect of temperature: as temperature rises, intermolecular forces weaken, so Young's modulus generally decreases and the material becomes more plastic. Invar steel is a special exception — its elastic constants stay nearly unchanged with temperature, which is why it's used in precision instruments and pendulum clocks.",
        "Effect of impurities: adding impurities usually strengthens intermolecular attraction slightly, so Young's modulus tends to increase a little — the material resists external deformation more effectively.",
        "The interatomic force constant k behaves exactly like a tiny spring constant between neighbouring atoms, and is directly proportional to the material's Young's modulus.",
      ],
    },
    {
      heading: "11. Applications of Elastic Behaviour",
      body:
        "Elastic limits aren't just a theoretical curiosity — they directly decide how thick a crane's cable must be, how deep a girder should be, and even how tall a mountain can grow before its own base gives way under the load above it.",
      formula: [
        { label: "Minimum cable cross-section for a crane", expression: "A ≥ W / S_y = mg / S_y" },
        { label: "Maximum height of a mountain", expression: "H ≈ (breaking stress of rock) / (ρg)" },
      ],
      bullets: [
        "S_y is the yield strength (or safe working stress) of the cable material, and W is the weight of the load being lifted — engineers always design with a safety margin well below the actual breaking stress.",
        "A girder's sag under a load depends on its cross-sectional shape; for the same material and load, a deeper cross-section (larger depth d) resists bending far more effectively than a wider, shallower one, which is why I-beams and railway girders are built tall rather than flat.",
        "The maximum possible height of a mountain works out to roughly 10 km for typical rock — beyond this, the compressive stress at the base would exceed the rock's breaking stress and it would simply give way, which is consistent with Earth's tallest peaks.",
      ],
    },
  ],
};
