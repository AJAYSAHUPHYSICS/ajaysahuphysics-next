export type ShortNoteGroup = {
  heading: string;
  points: string[];
};

export type ChapterShortNotes = {
  chapterName: string;
  className: "11" | "12";
  groups: ShortNoteGroup[];
};

export const thermodynamicsShortNotes: ChapterShortNotes = {
  chapterName: "Thermodynamics",
  className: "11",
  groups: [
    {
      heading: "Systems, State Variables & State Functions",
      points: [
        "PV = μRT. State fixed by ANY 2 of (P, V, T) — third follows automatically.",
        "Homogeneous: uniform throughout. Heterogeneous: not uniform. Isolated: no exchange of matter OR energy.",
        "ΔU = U_f − U_i depends ONLY on initial/final states — NOT on path (state function). Q and W DO depend on path.",
      ],
    },
    {
      heading: "Internal Energy",
      points: [
        "dU = dU_k + dU_p. Ideal gas (no intermolecular forces): dU = dU_k = μC_vdT.",
        "Internal energy of an ideal gas depends ONLY on temperature — never on volume or pressure directly.",
      ],
    },
    {
      heading: "Sign Convention & Work from P–V Diagram",
      points: [
        "Heat gained: +. Heat lost: −. Work done BY system: +. Work done ON system: −. ΔU increase: +, decrease: −.",
        "W = ∫PdV = area under the P–V curve. V increasing ⇒ W > 0. V decreasing ⇒ W < 0. V constant ⇒ W = 0.",
        "Cyclic process: net W = enclosed area of the loop. Clockwise loop: W > 0 (+area). Anticlockwise: W < 0 (−area).",
      ],
    },
    {
      heading: "First Law of Thermodynamics",
      points: [
        "dQ = dU + dW (Q = ΔU + W) — conservation of energy applied to heat/work/internal energy.",
        "dQ − dW is path-independent (= dU) even though dQ and dW individually ARE path-dependent.",
        "Applies to EVERY process, all 3 phases of matter. Q, ΔU, W must be in the SAME units.",
        "Melting: Q = ΔU + PΔV (ΔV negligible ⇒ mostly ΔU). Boiling: mL = (U_v−U_l) + P(V_v−V_l) (work term significant).",
      ],
    },
    {
      heading: "Isochoric (Isometric) Process",
      points: [
        "V = constant. P/T = constant. W = 0 always.",
        "Q = ΔU = μC_vΔT — ALL heat goes to internal energy, none to work.",
        "P–V slope = ∞ (vertical line). Examples: rigid sealed container, pressure cooker heating.",
      ],
    },
    {
      heading: "Isobaric Process",
      points: [
        "P = constant. V/T = constant. W = PΔV = μRΔT.",
        "Q = ΔU + W = μC_vΔT + μRΔT = μC_PΔT.",
        "ΔU/Q = 1/γ ; W/Q = 1−1/γ. P–V slope = 0 (horizontal line).",
        "Examples: heating water/boiling at atmospheric pressure, melting at atmospheric pressure.",
      ],
    },
    {
      heading: "Isothermal Process",
      points: [
        "T = constant. PV = constant (Boyle's law) — isotherm is a HYPERBOLA.",
        "ΔU = 0 always (ideal gas, U depends only on T) ⇒ Q = W entirely.",
        "W = μRT ln(V₂/V₁) = 2.303μRT log₁₀(V₂/V₁) = 2.303μRT log₁₀(P₁/P₂).",
        "Isotherms of the same gas at different T NEVER intersect. Slope dP/dV = −P/V.",
        "Examples: melting, boiling, very slow process in a perfectly conducting cylinder.",
      ],
    },
    {
      heading: "Adiabatic Process",
      points: [
        "Q = 0 (insulated or too fast for heat exchange). PV^γ = const; TV^(γ−1) = const; T^γP^(1−γ) = const.",
        "dU = −dW. Expansion ⇒ gas COOLS (T falls). Compression ⇒ gas HEATS UP (T rises).",
        "W = (P₁V₁−P₂V₂)/(γ−1) = μR(T₁−T₂)/(γ−1).",
        "Slope dP/dV = −γP/V — STEEPER than isothermal slope by factor γ (γ>1 always).",
        "Examples: tyre bursting, sound wave propagation, diesel engine ignition (no spark plug).",
      ],
    },
    {
      heading: "Free Expansion",
      points: [
        "Insulated gas rushes into an evacuated, insulated container. Q = 0 AND W = 0 (nothing to push against).",
        "⇒ dU = 0 ⇒ T unchanged. This is the key proof that ideal-gas U depends ONLY on T, not on V.",
        "NOT a standard adiabatic process — irreversible, not quasi-static, does NOT follow PV^γ=const.",
      ],
    },
    {
      heading: "Degrees of Freedom & Specific Heats",
      points: [
        "U(per mole) = (f/2)RT. C_v = (f/2)R. C_P = C_v+R = [(f+2)/2]R. γ = C_P/C_v = 1+2/f.",
        "Monoatomic: f=3, C_v=3R/2, C_P=5R/2, γ=5/3≈1.67.",
        "Diatomic/linear triatomic: f=5, C_v=5R/2, C_P=7R/2, γ=7/5=1.4.",
        "Non-linear polyatomic: f=6, C_v=3R, C_P=4R, γ=4/3≈1.33.",
        "1 < γ < 2 always. More degrees of freedom ⇒ SMALLER γ. Mixture's γ lies between component γ's.",
        "Process PVˣ=const: C = R/(1−x)+C_v. Isobaric (x=0): C=C_P. Isothermal (x=1): C=∞. Adiabatic (x=γ): C=0.",
      ],
    },
    {
      heading: "Mayer's Relation",
      points: [
        "C_P − C_v = R, derived from first law applied to the isobaric case.",
        "C_P > C_v always — constant-pressure heating must ALSO supply the work of expansion, constant-volume heating doesn't.",
      ],
    },
    {
      heading: "Heat Engines",
      points: [
        "η = W/Q₁ = (Q₁−Q₂)/Q₁ = 1−Q₂/Q₁. Three parts: source (T₁), sink (T₂), working substance.",
        "η = 1 (100%) is IMPOSSIBLE for any engine — second law (Kelvin–Planck), not just a practical limitation.",
      ],
    },
    {
      heading: "Refrigerators & C.O.P.",
      points: [
        "β = Q₂/W = Q₂/(Q₁−Q₂). Carnot refrigerator: β = T₂/(T₁−T₂).",
        "Q₁ = Q₂+W always. Relation to engine efficiency (same reservoirs): β = (1/η)−1.",
        "Unlike η (always ≤1), β has NO upper limit of 1 — can be, and often is, greater than 1.",
      ],
    },
    {
      heading: "Second Law & Entropy",
      points: [
        "Kelvin–Planck: can't completely convert heat from ONE reservoir into work as the sole result.",
        "Clausius: can't transfer heat cold→hot as the sole result (no external work). Both statements are EQUIVALENT.",
        "ΔS = ∫dQ/T. Reversible process: ΔS=0. Irreversible: ΔS>0. ΔS<0 is NEVER observed (universe entropy never decreases).",
        "Reversible process needs: quasi-static (mechanical+thermal+chemical equilibrium at every stage) AND no friction/dissipation — an ideal limit, never exactly achieved.",
        "Irreversible = the RULE in nature: friction, Joule heating, unbalanced expansion, diffusion, gas leaks, etc.",
      ],
    },
    {
      heading: "The Carnot Cycle",
      points: [
        "4 reversible steps: Isothermal expansion (A→B, absorbs Q₁ at T₁) → Adiabatic expansion (B→C) → Isothermal compression (C→D, rejects Q₂ at T₂) → Adiabatic compression (D→A).",
        "η_Carnot = 1−T₂/T₁ = 1−Q₂/Q₁ — the MAXIMUM possible efficiency between T₁ and T₂.",
        "η=100% only if T₂=0 K — physically unreachable, so even an ideal reversible engine can't be perfectly efficient.",
        "Carnot's theorem: NO engine (reversible or not) between two given temperatures can beat a Carnot engine's efficiency operating between the same two temperatures.",
        "To raise efficiency: lowering T₂ by ΔT helps MORE than raising T₁ by the same ΔT (η more sensitive to the smaller temperature in the T₂/T₁ ratio).",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Free expansion has Q=0 AND W=0, so ΔU=0 — but it is NOT an adiabatic process in the textbook sense (irreversible, doesn't follow PV^γ=const). Don't apply adiabatic formulas to it.",
        "Isothermal: ΔU=0 but Q≠0 (Q=W). Adiabatic: Q=0 but ΔU≠0 (dU=−dW). Easy to swap these two under pressure.",
        "C_P − C_v = R is in MOLAR heat capacity terms; don't confuse with specific heat (per unit mass), which needs dividing by molar mass M.",
        "γ = 1+2/f — more degrees of freedom give a SMALLER γ, not larger; a common inversion mistake.",
        "Carnot efficiency η = 1−T₂/T₁ uses ABSOLUTE (Kelvin) temperatures ONLY — plugging in Celsius values directly is a frequent, costly error.",
        "C.O.P. (β) of a refrigerator has NO upper bound of 1, unlike efficiency η which is always ≤ 1 — don't apply engine intuition directly to refrigerator problems.",
        "Work done in a cyclic process = the ENCLOSED area, not the sum of all individual path integrals taken at face value without tracking direction (clockwise vs anticlockwise) and sign.",
      ],
    },
  ],
};
