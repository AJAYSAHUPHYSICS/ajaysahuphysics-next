export type ShortNoteGroup = {
  heading: string;
  points: string[];
};

export type ChapterShortNotes = {
  chapterName: string;
  className: "11" | "12";
  groups: ShortNoteGroup[];
};

export const thermalPropertiesOfMatterShortNotes: ChapterShortNotes = {
  chapterName: "Thermal Properties of Matter",
  className: "11",
  groups: [
    {
      heading: "Temperature Scales & Zeroth Law",
      points: [
        "(C−0)/100 = (F−32)/180 = (K−273)/100. General form: (X−LFP)/(UFP−LFP) = C/100.",
        "Zeroth law: if A and B are each in thermal equilibrium with C, then A and B are in thermal equilibrium with each other — this justifies using a thermometer.",
        "Kelvin scale has NO negative values; 0 K (absolute zero) can never be reached in practice, only approached.",
      ],
    },
    {
      heading: "Thermal Expansion of Solids",
      points: [
        "l = l₀(1+αΔθ); A = A₀(1+βΔθ) with β=2α; V = V₀(1+γΔθ) with γ=3α.",
        "α : β : γ = 1 : 2 : 3 for isotropic solids.",
        "Non-isotropic solids: β = α₁+α₂, γ = α₁+α₂+α₃ (different α along each axis).",
        "Expansion: solids < liquids < gases (intermolecular forces: solids > liquids > gases).",
        "Some rubbers CONTRACT on heating (transverse vibration dominates over longitudinal).",
      ],
    },
    {
      heading: "Applications of Thermal Expansion",
      points: [
        "Bimetallic strip bends on heating with the HIGHER-α metal on the outer (convex) side — used in thermostats.",
        "Pendulum clock: ΔT/T = ½αΔθ. Loses time in summer (q'>q), gains time in winter. Invar pendulums (tiny α) stay accurate year-round.",
        "Rigidly clamped rod: thermal stress = YαΔθ; force on supports F = YAαΔθ — even though length never actually changes.",
        "Cavity expansion = expansion of an equivalent solid piece (photographic-enlargement idea) — solid and hollow spheres of same size/material expand identically.",
        "Real-world: gaps in rail tracks, slack transmission cables, Pyrex/silica lab glassware (low α), undersized iron rim on a cart wheel, warming a bottle-neck to free a jammed stopper.",
      ],
    },
    {
      heading: "Thermal Expansion of Liquids",
      points: [
        "Liquids show ONLY volumetric expansion (no linear/superficial — no fixed shape).",
        "γ_real = γ_apparent + γ_vessel, where γ_vessel = 3α_vessel.",
        "γ_real > γ_vessel ⇒ level rises. γ_real < γ_vessel ⇒ level falls. γ_real = γ_vessel ⇒ level unchanged.",
        "On heating, level often dips briefly (vessel expands first) before rising as the liquid's larger expansion takes over.",
      ],
    },
    {
      heading: "Heat, Specific Heat & Heat Capacities",
      points: [
        "Q = msΔθ; s = (1/m)(dQ/dT). SI unit of s: J/kg·K.",
        "s_water = 1 cal/g·°C = 4200 J/kg·K. J (mechanical equiv. of heat) ≈ 4.186 J/cal — just a conversion factor, not a material property.",
        "Molar heat capacity C = M×s (J/mol·K). Gases need BOTH Cᵥ and C_P since heat needed depends on the process.",
        "Thermal capacity = ms (heat for whole body, not unit mass). Water equivalent w = ms — numerically equals thermal capacity in cal/°C.",
      ],
    },
    {
      heading: "Latent Heat & Change of State",
      points: [
        "Q = mL. L_fusion(ice) = 80 cal/g; L_vaporisation(water) ≈ 540 cal/g.",
        "Melting/boiling: fixed temperature. Evaporation: surface phenomenon, ALL temperatures, faster with more heat/less humidity/lower pressure.",
        "Sublimation: solid→vapour directly (camphor, NH₄Cl, lunar ice). Hoar frost: vapour→solid directly (snow from clouds).",
        "Regelation: pressure LOWERS ice's melting point; removing pressure causes refreezing.",
      ],
    },
    {
      heading: "Phase Diagram & Triple Point",
      points: [
        "P (y-axis) vs T (x-axis). Three curves: fusion (ice line), vaporisation (steam line), sublimation (hoar frost line) meet at the triple point.",
        "Triple point of water: 273.16 K, ≈6.03×10⁻³ atm — all 3 phases coexist; defines 1 K = (1/273.16) of this temperature.",
        "Water: ↑pressure ⇒ M.P. ↓ (anomalous) and B.P. ↑ — why food cooks slower at altitude, faster in a pressure cooker.",
      ],
    },
    {
      heading: "Heating Curve",
      points: [
        "Sloped region: single phase warming; slope ∝ 1/specific heat (steeper slope = smaller s, for constant heating rate).",
        "Flat region: change of state at constant T; length of flat region ∝ latent heat (L).",
        "Vaporisation's flat region is normally much longer than fusion's (L_v >> L_f for most substances).",
      ],
    },
    {
      heading: "Calorimetry (Law of Mixtures)",
      points: [
        "Heat lost by hotter body = Heat gained by colder body. T_L ≤ T_final ≤ T_H always.",
        "Temperature rise of one body need NOT equal temperature fall of the other (masses/specific heats usually differ).",
        "Calorimeter's own thermal capacity/water equivalent must be included unless stated negligible.",
        "With phase change involved: check FIRST whether available heat is enough to completely melt/condense everything — final state may be a two-phase mixture, not a single temperature.",
      ],
    },
    {
      heading: "Conduction & Thermal Conductivity",
      points: [
        "Q/t = KA(T_H−T_C)/L. K depends only on material nature. Order: Ag > Cu > Au > Al.",
        "Perfect conductor: K→∞. Perfect insulator: K=0.",
        "Steady state ≠ thermal equilibrium: in steady state, T at each cross-section is constant in TIME but differs by POSITION; no heat absorbed anywhere inside.",
        "Good conductors feel colder than poor conductors at the SAME room temperature — they pull heat from your hand faster.",
      ],
    },
    {
      heading: "Thermal Resistance & Combinations",
      points: [
        "R = L/(KA). Thermal current i_T = (T_H−T_L)/R — exact OHM'S LAW analogy (T ↔ V).",
        "Series: R_eq = R₁+R₂ ⇒ K_eq = ΣLᵢ/Σ(Lᵢ/Kᵢ). Same thermal current through each slab.",
        "Parallel: 1/R_eq = 1/R₁+1/R₂ ⇒ K_eq = ΣKᵢAᵢ/ΣAᵢ. Same ΔT across each branch.",
        "Ice growth on a lake: t ∝ (x₂²−x₁²) — growth SLOWS as ice thickens (heat must conduct through more ice). Time to grow x→2x is 3× the time for 0→x; 2x→3x is 5× that initial time.",
      ],
    },
    {
      heading: "Convection",
      points: [
        "Bulk fluid motion transfers heat — occurs ONLY in fluids (liquids & gases), never in solids.",
        "Natural convection: density-driven, needs GRAVITY (fails in free-fall/orbit). Forced convection: driven by fan/pump/blower.",
        "Natural convection: warm fluid UP, cool fluid DOWN — heat from the base, cool from the top.",
        "Examples: land/sea breeze, trade winds, monsoons, ventilation, blood circulation (forced convection) regulating body temperature.",
      ],
    },
    {
      heading: "Radiation, Absorptive & Emissive Power",
      points: [
        "Radiation: EM waves (infrared range), needs NO medium, travels through vacuum — how solar energy reaches Earth.",
        "r + a + t = 1 (reflected + absorbed + transmitted fractions). Perfect reflector: r=1. Ideal black body: a=1. Perfect transmitter: t=1.",
        "Ideal black body: perfect absorber at low T, perfect emitter at high T. Need NOT be black in colour (Sun ≈ ideal black body).",
        "Emissivity e_r = (emission by real body)/(emission by ideal black body at same T); 0 < e_r < 1, e_r=1 only for ideal black body.",
        "Prevost's theory: every body continuously emits AND absorbs radiation at all T > 0 K; net effect (heating/cooling/steady) depends on which rate is larger.",
      ],
    },
    {
      heading: "Kirchhoff's Law & Stefan's Law",
      points: [
        "Kirchhoff's law: e_λ/a_λ = E_λ = constant ⇒ GOOD ABSORBERS ARE GOOD EMITTERS (and vice versa).",
        "Desert sand: strong absorber by day (hot days) ⇒ strong emitter by night (cold nights), via Kirchhoff's law.",
        "Stefan's law (ideal black body only): E = σT⁴, σ = 5.67×10⁻⁸ W/m²K⁴. Real body: e_rσT⁴.",
        "Net radiative loss: R_H = σA(T⁴−T₀⁴). Rate of cooling: R_F = σA(T⁴−T₀⁴)/(ms).",
        "T⁴ dependence ⇒ small T rise gives a disproportionately LARGE jump in radiated power.",
      ],
    },
    {
      heading: "Newton's Law of Cooling & Wien's Law",
      points: [
        "dT/dt = −K(T−T₀); valid ONLY for (T−T₀) ≲ 35°C (it's Stefan's law, binomial-approximated for small excess).",
        "Numerical-problems form: (T₁−T₂)/t = K[(T₁+T₂)/2 − T₀] (uses AVERAGE excess temperature).",
        "Wien's displacement law: λ_mT = b, b = 2.89×10⁻³ m·K. Hotter ⇒ peak shifts to SHORTER wavelength.",
        "Heated metal glows red → orange-yellow → white as T rises (λ_m decreasing).",
        "Black-body spectral curve: peak height ∝ T⁵; area under curve (= σT⁴) grows even faster than the peak.",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Don't confuse steady state (T constant in time, varies with position) with thermal equilibrium (T same everywhere) — a very common conceptual mix-up.",
        "γ : the LIQUID's coefficient is what's usually asked for; remember γ_real = γ_apparent + 3α_vessel, NOT γ_apparent − 3α_vessel.",
        "Newton's law of cooling FAILS for large temperature excess (>35°C) — Stefan's law (with T⁴, not linear in T) must be used instead.",
        "Stefan's law E=σT⁴ applies strictly to an IDEAL black body; for any real surface you must multiply by emissivity e_r.",
        "β = 2α and γ = 3α only for ISOTROPIC solids — don't apply this ratio to anisotropic (crystalline, direction-dependent) materials.",
        "In calorimetry with a possible phase change, always check whether the heat available is enough to complete the phase change before assuming a single final temperature.",
        "Thermal resistance combinations mirror electrical resistance EXACTLY (R = L/KA ↔ R = ρL/A), but it's easy to swap series and parallel formulas under pressure — same current (series) vs same ΔT (parallel).",
      ],
    },
  ],
};
