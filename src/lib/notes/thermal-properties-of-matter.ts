import type { ChapterNotes } from "./kinematics";

export const thermalPropertiesOfMatterNotes: ChapterNotes = {
  chapterName: "Thermal Properties of Matter",
  className: "11",
  intro:
    "This chapter is about how matter responds to a change in temperature — starting with what temperature even means, moving through how solids and liquids expand on heating, how heat is exchanged and measured (specific heat, latent heat, calorimetry), and finishing with the three ways heat travels from one place to another: conduction, convection, and radiation. The radiation section in particular sets up ideas (black bodies, Stefan's law, Wien's law) that come back repeatedly in later chapters and in modern physics.",
  sections: [
    {
      heading: "1. Temperature, Temperature Scales & the Zeroth Law",
      body:
        "Temperature is a measure of the degree of hotness or coldness of a body. Whenever two bodies at different temperatures are placed in contact, heat flows from the hotter one to the colder one until both reach the same temperature — a condition called thermal equilibrium.",
      formula: [
        { label: "Celsius–Fahrenheit–Kelvin conversion", expression: "(C − 0)/100 = (F − 32)/180 = (K − 273)/100" },
        { label: "General scale conversion", expression: "(X − LFP)/(UFP − LFP) = C/100 = F−32/180 = K−273/100" },
      ],
      bullets: [
        "Zeroth law of thermodynamics: if two bodies A and B are each separately in thermal equilibrium with a third body C, then A and B are also in thermal equilibrium with each other. This is what makes a thermometer (acting as the third body) a valid way to compare temperatures of two objects that are never directly in contact.",
        "Thermometry is the branch dealing with temperature measurement; a thermometer must itself reach thermal equilibrium with the body being measured before its reading is trusted.",
        "The Kelvin scale has an absolute lower limit (0 K) — temperature can be raised without any upper bound, but it cannot be lowered below absolute zero, and 0 K itself is never reached in practice (the lowest achieved in a lab is a small fraction of a kelvin above it).",
      ],
    },
    {
      heading: "2. Linear, Superficial & Volumetric Expansion of Solids",
      body:
        "Heating a solid increases the amplitude of vibration of its atoms, which increases the average separation between them — so almost every solid expands when heated, without any change of state.",
      formula: [
        { label: "Linear expansion", expression: "l = l₀(1 + αΔθ)  ⇒  Δl = l₀αΔθ" },
        { label: "Superficial (areal) expansion", expression: "A = A₀(1 + βΔθ),  β = 2α" },
        { label: "Volumetric expansion", expression: "V = V₀(1 + γΔθ),  γ = 3α" },
        { label: "Ratio for isotropic solids", expression: "α : β : γ = 1 : 2 : 3" },
      ],
      bullets: [
        "α, β, γ are the coefficients of linear, superficial, and volumetric expansion respectively — each is the fractional change in length/area/volume per unit rise in temperature.",
        "Thermal expansion is smallest in solids and largest in gases, because intermolecular forces (which resist the atoms moving apart) are strongest in solids and weakest in gases.",
        "For a non-isotropic (anisotropic) solid with different expansion coefficients α₁, α₂, α₃ along the three axes: β = α₁ + α₂ and γ = α₁ + α₂ + α₃.",
        "A few substances (like some rubbers) contract on heating instead of expanding — this happens when transverse vibrations of the atoms dominate over the longitudinal vibrations that normally drive expansion.",
      ],
    },
    {
      heading: "3. Applications of Thermal Expansion in Solids",
      body:
        "Several everyday devices and effects are direct, practical consequences of solids expanding by different amounts depending on material, geometry, and temperature change.",
      formula: [
        { label: "Fractional change in pendulum period", expression: "ΔT/T = ½ αΔθ" },
        { label: "Loss of time per cycle (in time period T)", expression: "Δt_loss = ½ αΔθ · T" },
        { label: "Thermal stress in a rigidly fixed rod", expression: "Stress = YαΔθ" },
        { label: "Force exerted on supports", expression: "F = YAαΔθ" },
      ],
      bullets: [
        "A bimetallic strip is made by joining two metals with different α along their length; since one expands more than the other, the strip bends on heating, with the higher-α metal always ending up on the outer (convex) side of the bend. This is the working principle of a thermostat.",
        "A pendulum clock runs on time only at the temperature it was calibrated for. If temperature rises, the pendulum's length increases, its time period increases, and the clock runs slow (loses time) — in summer. It runs fast (gains time) in winter. Because α is extremely small for invar, pendulums made of invar stay accurate across seasons.",
        "If a rod's ends are rigidly clamped so it cannot expand or contract freely, a temperature change still tries to change its length — this generates internal (thermal) stress and a real force on the supports, even though the rod's actual length never changes.",
        "Thermal expansion of an object with a cavity behaves exactly like a uniform photographic enlargement of the whole solid — the cavity expands by exactly the amount it would if it were filled with the same solid material. A solid and a hollow sphere of the same material, size, and temperature change therefore expand by the same amount.",
        "Everyday consequences: gaps are left between rail track sections; transmission cables are hung with slack, not pulled taut; Pyrex/silica glassware (very low α) is used for lab heating because it resists cracking from uneven expansion; an iron rim for a cart wheel is made slightly smaller than the wheel so that heating it makes it expand to a tight fit; a jammed glass stopper can be loosened by warming just the neck of the bottle so it expands away from the stopper.",
      ],
    },
    {
      heading: "4. Thermal Expansion in Liquids",
      body:
        "Liquids have no fixed shape, so only volumetric expansion makes sense for them — and because a liquid is always heated inside some container, what we directly observe is not quite the liquid's true expansion.",
      formula: [
        { label: "Coefficient of apparent expansion", expression: "γ_apparent = (apparent ΔV)/(V₀Δθ)" },
        { label: "Coefficient of real expansion", expression: "γ_real = (actual ΔV)/(V₀Δθ)" },
        { label: "Relation to the vessel", expression: "γ_real = γ_apparent + γ_vessel,  where γ_vessel = 3α_vessel" },
      ],
      bullets: [
        "On heating a liquid-filled vessel, the vessel (which absorbs heat and starts expanding first) often makes the liquid level appear to fall briefly before it rises as the liquid's own larger expansion catches up — what is measured this way is the apparent expansion, not the true one.",
        "If γ_real > γ_vessel, the liquid level rises on heating; if γ_real < γ_vessel, the level falls; if γ_real = γ_vessel, the level stays the same.",
        "Liquids almost always have a much larger coefficient of volume expansion than the solids used to contain them, which is why the level usually does rise once the initial vessel-expansion effect is over.",
      ],
    },
    {
      heading: "5. Heat, Specific Heat & Mechanical Equivalent of Heat",
      body:
        "Heat is energy that flows between two bodies purely because of a temperature difference between them, and it can produce effects ranging from a change in temperature to a change of state.",
      formula: [
        { label: "Heat required (no change of state)", expression: "Q = msΔθ" },
        { label: "Specific heat (defining relation)", expression: "s = (1/m)(dQ/dT)" },
        { label: "Mechanical equivalent of heat", expression: "W = JH,  J ≈ 4.186 J/cal" },
        { label: "Specific heat of water", expression: "s_water = 1 cal/g·°C = 4200 J/kg·K" },
      ],
      bullets: [
        "Specific heat (s or c) is the heat needed to raise the temperature of unit mass of a substance by 1°C (or 1 K) — it is a property of the material, and depends mildly on the substance's temperature, pressure, and state.",
        "1 calorie is the heat needed to raise the temperature of 1 g of water by 1°C; 1 kcal = 1000 cal. J, the mechanical equivalent of heat, is purely a conversion factor between mechanical work and heat — it is not itself a measurable physical property of any material.",
        "For solids and liquids, specific heat barely changes over wide temperature ranges (water's varies by less than 1% between 0°C and 100°C), so it is normally treated as a constant in calculations.",
        "Gases need two different specific heats — at constant volume (Cᵥ) and at constant pressure (C_P) — because the heat needed depends heavily on what is allowed to happen (expand, do work) during the heating process.",
      ],
    },
    {
      heading: "6. Molar Heat Capacity, Thermal Capacity & Water Equivalent",
      body:
        "Heat capacity ideas scale specific heat up to a fixed amount of substance — either one mole, or the entire mass of a particular object — which is often more directly useful in calorimetry problems.",
      formula: [
        { label: "Molar heat capacity", expression: "C = M × s  (M = molar mass)" },
        { label: "Thermal (heat) capacity", expression: "Thermal capacity = ms" },
        { label: "Water equivalent", expression: "w = ms" },
      ],
      bullets: [
        "Molar heat capacity is the heat required to raise the temperature of one mole of substance by 1°C (or 1 K); its SI unit is J/mol·K.",
        "Thermal capacity of a body is the heat required to raise the temperature of the whole body (not just unit mass) by 1°C — it depends on both the material and the total mass of the specific object.",
        "Water equivalent of a body is the mass of water that would need the same amount of heat as the body to undergo the same temperature change. Since specific heat of water is exactly 1 (in cal/g·°C), the water equivalent (in grams) is numerically equal to the thermal capacity (in cal/°C) of the body.",
      ],
    },
    {
      heading: "7. Latent Heat and Change of State",
      body:
        "A change of state (melting, boiling, etc.) happens at a fixed temperature, with all the heat exchanged going into reorganising the substance's structure rather than raising its temperature.",
      formula: [
        { label: "Latent heat", expression: "Q = mL" },
        { label: "Latent heat of fusion (ice)", expression: "L_f = 80 cal/g = 80 kcal/kg" },
        { label: "Latent heat of vaporisation (water)", expression: "L_v = 540 cal/g (commonly taken as 536–540 cal/g)" },
      ],
      bullets: [
        "Melting is the solid-to-liquid change at a fixed melting point; boiling is evaporation occurring throughout the bulk of a liquid at its boiling point, when the liquid's saturated vapour pressure equals the surrounding atmospheric pressure.",
        "Evaporation is a surface phenomenon that occurs at all temperatures (not just the boiling point); it speeds up with higher temperature, lower humidity, lower atmospheric pressure, and a liquid with a lower boiling point.",
        "Sublimation is solid converting directly to vapour (e.g. camphor, ammonium chloride, and ice on the airless lunar surface); the reverse — vapour converting directly to solid — is called hoar frost (e.g. snow forming directly from moisture in clouds).",
        "Regelation is the melting of ice under applied pressure, and its re-freezing once that pressure is removed — increasing pressure lowers the melting point of ice (water is unusual this way; most substances that expand on melting have their melting point raised by pressure instead).",
      ],
    },
    {
      heading: "8. Phase Diagram and the Triple Point of Water",
      body:
        "A phase diagram plots pressure against temperature and shows, for every combination of the two, which phase (or phases) of a substance are stable — it is essentially a map of when melting, boiling, and sublimation occur.",
      bullets: [
        "Three curves divide the diagram into solid, liquid, and vapour regions: the fusion curve (solid–liquid equilibrium), the vaporisation curve (liquid–vapour equilibrium), and the sublimation curve (solid–vapour equilibrium).",
        "All three curves meet at a single point — the triple point — where solid, liquid, and vapour all coexist in equilibrium simultaneously. For water this occurs at 273.16 K and a pressure of about 6.03 × 10⁻³ atm.",
        "The triple point of water is used to define the Kelvin scale itself: 1 K is defined as exactly 1/273.16 of the temperature of water's triple point.",
        "Along the fusion curve, water's melting point falls as pressure rises (anomalous behaviour, tied to ice being less dense than liquid water); along the vaporisation curve, the boiling point rises as pressure rises — which is why food cooks more slowly at high altitude (lower atmospheric pressure ⇒ lower boiling point) and faster in a pressure cooker.",
      ],
    },
    {
      heading: "9. The Heating Curve",
      body:
        "If heat is supplied to a solid at a constant rate and a graph of temperature versus time is plotted, the resulting heating curve reveals specific heat and latent heat directly from its shape.",
      bullets: [
        "Sloped regions represent a single phase warming up; the temperature-time slope is inversely proportional to specific heat — a steeper slope means a smaller specific heat (less heat needed per degree rise), since Q = P·Δt = msΔT means ΔT/Δt ∝ 1/s for a fixed heating rate P.",
        "Flat (zero-slope) regions represent a change of state at constant temperature — the melting point or boiling point. The horizontal length of this flat region is directly proportional to the latent heat of that change of state, since all the heat supplied during this time goes entirely into L rather than into raising temperature.",
        "Going solid → liquid → gas, the flat region for vaporisation is normally far longer than the one for fusion, because latent heat of vaporisation is much larger than latent heat of fusion for most substances.",
      ],
    },
    {
      heading: "10. Principle of Calorimetry (Law of Mixtures)",
      body:
        "When two bodies at different temperatures are mixed (with no heat lost to the surroundings), heat flows from the hotter to the colder until both reach one common final temperature — and this exchange obeys a simple conservation statement.",
      formula: [
        { label: "Principle of calorimetry", expression: "Heat lost by hotter body = Heat gained by colder body" },
      ],
      bullets: [
        "The final mixture temperature T always satisfies T_L ≤ T ≤ T_H — it can never go below the lower starting temperature or above the higher one, since neither body can be cooled below or heated above the other's starting temperature.",
        "The rise in temperature of the colder body need not equal the fall in temperature of the hotter body, even though the heat gained by one exactly equals the heat lost by the other — because their masses and specific heats are usually different.",
        "A calorimeter itself has a thermal capacity (or water equivalent) and, unless stated to have negligible heat capacity, must be included on the heat-gained (or heat-lost) side of the equation just like any other body in the mixture.",
        "When a phase change is involved (ice melting, steam condensing) within the mixture, the heat required for or released by that phase change (mL) must be added into the calorimetry equation alongside the msΔθ terms — and it's worth checking first whether the available heat is even enough to completely melt/condense everything, since the final state might be a mix of two phases rather than a single uniform temperature.",
      ],
    },
    {
      heading: "11. Conduction and Thermal Conductivity",
      body:
        "Conduction transfers heat through a material by energy passing from particle to particle, without any bulk movement of the particles themselves — it dominates in solids, where atoms are held close together and can pass on vibrational energy efficiently.",
      formula: [
        { label: "Heat conducted (steady state)", expression: "Q/t = KA(T_H − T_C)/L" },
        { label: "Temperature gradient", expression: "dT/dx (rate of change of temperature with distance)" },
      ],
      bullets: [
        "K, the thermal conductivity, depends only on the nature of the material; a perfect conductor has K → ∞ and a perfect insulator has K = 0. Among common metals the order is roughly Ag > Cu > Au > Al.",
        "Steady state means the temperature at each cross-section of the conducting slab stays constant over time (though it differs from one cross-section to another) — this is different from thermal equilibrium, where temperature would be the same everywhere. In steady state, the same amount of heat flows through every cross-section in a given time, since no heat is being absorbed or released anywhere inside the slab.",
        "Good thermal conductors feel colder to the touch than poor conductors at the same (room) temperature, because they pull heat away from your hand faster — this is why a metal chair feels colder than a wooden one on the same cold day, even though both are at the same temperature.",
      ],
    },
    {
      heading: "12. Thermal Resistance and Combinations of Conductors",
      body:
        "Because the steady-state conduction equation has exactly the same form as Ohm's law (with temperature difference playing the role of potential difference), every series/parallel result from electrical circuits carries over directly to heat flow through slabs or rods.",
      formula: [
        { label: "Thermal resistance", expression: "R = L/(KA)" },
        { label: "Thermal current", expression: "i_T = Q/t = (T_H − T_L)/R" },
        { label: "Series combination", expression: "R_eq = R₁ + R₂ + ...  ⇒  K_eq = ΣLᵢ / Σ(Lᵢ/Kᵢ)" },
        { label: "Parallel combination", expression: "1/R_eq = 1/R₁ + 1/R₂ + ...  ⇒  K_eq = ΣKᵢAᵢ / ΣAᵢ" },
        { label: "Time for ice to grow from x₁ to x₂", expression: "t ∝ (x₂² − x₁²)" },
      ],
      bullets: [
        "In a series combination, the same thermal current (Q/t) flows through every slab, just like current through resistors in series; in parallel, the same temperature difference acts across every branch, and the total current is the sum of the branch currents — exactly mirroring Kirchhoff's laws for electrical circuits.",
        "When ice grows on a lake, each extra layer of ice has to conduct heat away through all the ice already formed above it, so growth slows down as the ice gets thicker — the time to grow from thickness x₁ to x₂ is proportional to (x₂² − x₁²), meaning the ice takes 3 times as long to grow from x to 2x as it took to grow from 0 to x, and 5 times as long to grow from 2x to 3x.",
      ],
    },
    {
      heading: "13. Convection",
      body:
        "Convection moves heat by the actual bulk motion of a heated fluid from one place to another, which is why it occurs only in fluids (liquids and gases) and never in solids.",
      bullets: [
        "Natural convection arises purely from density differences created by uneven heating (e.g., a pot of water heated from below) and only occurs under gravity — it does not happen in a gravity-free environment such as a freely falling lift or an orbiting satellite. Forced convection happens when a fan, pump, or blower physically pushes the fluid along.",
        "Natural convection currents always move warm fluid upward and cool fluid downward — which is why rooms are heated from the base (radiators near the floor) and cooled from the top (AC vents near the ceiling).",
        "Everyday and large-scale examples: land and sea breezes (land heats and cools faster than water because of its lower specific heat); trade winds (driven by the pressure difference between the heated equator and the cooler poles); monsoon winds (moist air drawn from the ocean toward the more strongly-heated landmass); and the human body's own temperature regulation, where blood pumped by the heart acts as a forced-convection cooling/heating fluid.",
      ],
    },
    {
      heading: "14. Thermal Radiation, Absorptive & Emissive Power",
      body:
        "Radiation transfers heat as electromagnetic waves (mostly in the infrared band) that need no medium at all to travel through — it's the only mode of heat transfer that works through a vacuum, which is how the Sun's energy reaches the Earth.",
      formula: [
        { label: "Absorptive power (coefficient)", expression: "a = Q_a/Q" },
        { label: "Energy conservation on a surface", expression: "r + a + t = 1" },
      ],
      bullets: [
        "Of the radiation striking any surface, a fraction r is reflected, a is absorbed, and t is transmitted through. A perfect reflector has r = 1; an ideal black body (perfect absorber) has a = 1; a perfect transmitter (diathermanous material) has t = 1.",
        "An ideal black body absorbs all radiation incident on it at any wavelength, and — at high temperature — emits the maximum possible radiation at every wavelength too. Importantly, an ideal black body does not need to look black in colour (the Sun itself behaves almost exactly like an ideal black body).",
        "Emissive power (e) is the radiant energy emitted per unit surface area per unit time; emissivity (e_r) of a real ('grey') body is the ratio of its emitted radiation to what an ideal black body would emit under the same conditions, so 0 < e_r < 1, with e_r = 1 only for an ideal black body.",
        "Prevost's theory: every body, at every temperature above absolute zero, is continuously both emitting and absorbing radiation from its surroundings. A body's temperature rises if it absorbs more than it emits, falls if it emits more than it absorbs, and stays constant when the two rates are equal — which is exactly what thermal equilibrium with the surroundings means in radiative terms.",
      ],
    },
    {
      heading: "15. Kirchhoff's Law and Stefan's Law",
      body:
        "Kirchhoff's law connects how well a body absorbs radiation to how well it emits radiation, while Stefan's law gives the actual amount of radiation an ideal black body emits at a given temperature.",
      formula: [
        { label: "Kirchhoff's law", expression: "e_λ/a_λ = E_λ (a constant, same for all bodies at that temperature)" },
        { label: "Stefan's law", expression: "E = σT⁴,  σ = 5.67 × 10⁻⁸ W/m²K⁴" },
        { label: "Net rate of radiative loss (body at T, surroundings at T₀)", expression: "R_H = σA(T⁴ − T₀⁴)" },
        { label: "Rate of cooling", expression: "R_F = dT/dt = σA(T⁴ − T₀⁴)/(ms)" },
      ],
      bullets: [
        "Kirchhoff's law shows that at a given temperature, e_λ ∝ a_λ for every body — in short, good absorbers of radiation are also good emitters, and poor absorbers are poor emitters.",
        "This explains why, in a desert, sand (rough, dark, a strong absorber) makes days extremely hot, but the same property as a strong emitter makes nights unusually cold once the Sun sets.",
        "Stefan's law in its basic form (E = σT⁴) applies strictly to an ideal black body; for any other surface the actual emission is e_r σT⁴, scaled down by its emissivity.",
        "Both the rate of radiative heat loss (R_H) and the rate of temperature fall (R_F) increase sharply with temperature, because of the T⁴ dependence — a small rise in temperature produces a disproportionately large rise in radiated power.",
      ],
    },
    {
      heading: "16. Newton's Law of Cooling and Wien's Displacement Law",
      body:
        "Newton's law of cooling is simply a convenient approximation to Stefan's law for small temperature differences, while Wien's displacement law describes how the colour (peak wavelength) of a hot body's glow shifts as its temperature changes.",
      formula: [
        { label: "Newton's law of cooling", expression: "dT/dt = −K(T − T₀)   [valid only for (T − T₀) ≲ 35°C]" },
        { label: "Useful averaged form", expression: "(T₁ − T₂)/t = K[(T₁ + T₂)/2 − T₀]" },
        { label: "Wien's displacement law", expression: "λ_m T = b,  b = 2.89 × 10⁻³ m·K" },
      ],
      bullets: [
        "Newton's law can be derived from Stefan's law using a binomial approximation valid only when the temperature excess (T − T₀) is small compared to T₀ itself — this is exactly why the law breaks down once the temperature difference becomes too large (beyond roughly 35°C).",
        "In numerical problems, since a body's own temperature keeps changing as it cools, it's standard to use the average excess temperature over the interval — giving the averaged form above — rather than applying the instantaneous version directly.",
        "Wien's law says the wavelength of peak emission (λ_m) is inversely proportional to absolute temperature: hotter bodies glow with their peak emission shifted toward shorter wavelengths — explaining why a heated metal piece glows dull red, then orange-yellow, then white as its temperature climbs.",
        "On the spectral energy distribution curve (emissive power per unit wavelength vs. wavelength) for an ideal black body at different temperatures, the peak shifts to shorter wavelength and grows taller as temperature rises, and the total area under each curve (equal to σT⁴ by Stefan's law) grows much faster still, since it scales as T⁴ while the peak height itself scales as T⁵.",
      ],
    },
  ],
};
