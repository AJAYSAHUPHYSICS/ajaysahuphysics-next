import type { ChapterShortNotes } from "./kinematics-short";

export const rayOpticsAndOpticalInstrumentsShortNotes: ChapterShortNotes = {
  chapterName: "Ray Optics & Optical Instruments",
  className: "12",
  groups: [
    {
      heading: "Reflection & Plane Mirror",
      points: [
        "Laws: i = r; incident ray, reflected ray, normal coplanar. Regular reflection (smooth surface) vs irregular/diffused (rough surface).",
        "Plane mirror = perpendicular bisector of object–image line; lateral inversion (left↔right). Image distance behind = object distance in front.",
        "Minimum mirror length to see full height = h/2 — independent of eye position and distance from mirror.",
        "Deviation, single mirror: δ = 180° − 2i. Two mirrors inclined at θ: net δ = 360° − 2θ.",
        "Rotate ray by α (mirror fixed) → reflected ray rotates by α, opposite sense. Rotate mirror by α (ray fixed) → reflected ray rotates by 2α, same sense.",
        "Images between two inclined mirrors (angle θ): if 360°/θ = even integer m, n = m−1. If odd, n = m (object off bisector) or m−1 (object on bisector).",
        "Stationary mirror: v_parallel same for object & image; v_normal equal & opposite ⟹ object & image always equal speed relative to mirror.",
      ],
    },
    {
      heading: "Spherical Mirrors — Setup",
      points: [
        "f = R/2 (paraxial). Pole P, centre of curvature C, principal axis = CP.",
        "Sign convention: distances from pole; +ve along incident-light direction & above axis; −ve opposite & below.",
        "Spherical aberration: marginal rays focus closer (F_m) than paraxial rays (F_p) — defect of spherical (not parabolic) shape.",
        "Mirror formula: 1/v + 1/u = 1/f = 2/R.",
      ],
    },
    {
      heading: "Magnification — Mirrors",
      points: [
        "Transverse: m = h_i/h_o = −v/u = f/(f−u) = (f−v)/f. |m|>1 enlarged, |m|<1 diminished; m<0 inverted (real), m>0 erect (virtual).",
        "Longitudinal (small object along axis): m_L = −m² = −(v/u)² — always negative.",
        "Superficial (2D object, plane ⊥ axis): m_s = A_image/A_object = m².",
        "Newton's formula: x₁x₂ = f² (distances from focus). Velocity of image: |v_image| = m² |v_object|.",
      ],
    },
    {
      heading: "Concave Mirror — Object Position → Image",
      points: [
        "∞ → at F: real, inverted, highly diminished. ∞ to C → between C–F: real, inverted, diminished.",
        "At C → at C: real, inverted, same size (m=−1). C to F → beyond C: real, inverted, enlarged.",
        "At F → at ∞: real, inverted, hugely enlarged. F to P → behind mirror: virtual, erect, enlarged (m>+1).",
      ],
    },
    {
      heading: "Convex Mirror & Power of Mirror",
      points: [
        "Always virtual, erect; diminished (finite object) or highly diminished (object at ∞). m always positive.",
        "Wider field of view than plane mirror ⟹ used as vehicle rear-view/wide-angle mirrors.",
        "Power: P = −1/f(m) = −100/f(cm) D. Concave mirror P>0 (converging); convex mirror P<0 (diverging).",
      ],
    },
    {
      heading: "Refraction Basics",
      points: [
        "Snell's law: μ₁ sin i = μ₂ sin r. μ = c/v (absolute); ₁μ₂ = μ₂/μ₁ = v₁/v₂ (relative). μ dimensionless, μ_vacuum = 1 (minimum).",
        "Rarer→denser: bends towards normal (i>r). Denser→rarer: bends away from normal (i<r). Frequency never changes on refraction.",
        "Apparent depth (denser viewed from rarer, μ_R=1): d_ap = d_ac/μ (d_ap < d_ac). Normal shift x = d_ac(1−1/μ).",
        "Rarer object viewed from denser: d_ap = μ·d_ac (d_ap > d_ac) — flying object looks higher than it is.",
        "Lateral shift through slab: d = t sin(i−r)/cos r. Normal shift through slab: x = t(1−1/μ).",
      ],
    },
    {
      heading: "Total Internal Reflection",
      points: [
        "Conditions: (i) denser→rarer, (ii) i > θ_C. sin θ_C = μ_R/μ_D.",
        "i<θ_C: δ = i − sin⁻¹[(μ_D/μ_R)sin i]. i>θ_C (TIR): δ = 180°−2i.",
        "Underwater point source at depth h: bright circle radius r = h/√(μ²−1); diver sees outside world through cone of half-angle θ_C.",
        "TIR reflects 100% light (no loss) ⟹ images via TIR are brighter than via mirrors/lenses.",
        "Applications: diamond sparkle (θ_C≈24°, μ≈2.42), optical fibre (core μ > cladding μ, guided by repeated TIR), mirage (hot ground, TIR in air), optical looming (polar regions, reverse gradient).",
      ],
    },
    {
      heading: "Refraction at Curved Surface",
      points: [
        "μ₂/v − μ₁/u = (μ₂−μ₁)/R. Sign convention for R same as for mirrors (from pole to centre of curvature).",
        "f₁ = μ₁R/(μ₂−μ₁) (object-side focus); f₂ = μ₂R/(μ₂−μ₁) (image-side focus); f₁/μ₁ + f₂/μ₂ = 0.",
        "Plane surface: R→∞ ⟹ reduces to d_ac/d_ap = μ₁/μ₂.",
      ],
    },
    {
      heading: "Lens — Basics & Formulas",
      points: [
        "Lens maker's formula: 1/f = (μ_L/μ_M − 1)(1/R₁ − 1/R₂). Lens formula: 1/v − 1/u = 1/f. m = h_i/h_o = v/u = f/(f+u) = (f−v)/f.",
        "Convergent (convex): centre thicker than edge. Divergent (concave): centre thinner than edge — given μ_lens > μ_surrounding.",
        "Ray rules: through optical centre → undeviated; through/towards F₁ → emerges parallel to axis; parallel to axis → emerges through/towards F₂.",
        "Sign convention: real object u(−), real image v(+); virtual object u(+), virtual image v(−). [Differs from mirror convention for v.]",
        "Power: P = 1/f(m) = 100/f(cm) D. Convex (converging) P>0; concave (diverging) P<0.",
      ],
    },
    {
      heading: "Convex Lens — Object Position → Image",
      points: [
        "∞ → at F: real, inverted, highly diminished. ∞ to 2F → between F–2F: real, inverted, diminished.",
        "At 2F → at 2F: real, inverted, same size. 2F to F → beyond 2F: real, inverted, enlarged.",
        "At F → at ∞: real, inverted, hugely enlarged. F to O → same side, virtual: erect, enlarged (m>+1) — magnifying-glass mode.",
      ],
    },
    {
      heading: "Concave Lens",
      points: [
        "Always virtual, erect, diminished, on same side as object, between O and F. Never real or magnified for a real object.",
        "Object at ∞: very diminished image at F. Object at finite distance: diminished image strictly between O and F.",
      ],
    },
    {
      heading: "Combination, Cutting & Silvering of Lenses",
      points: [
        "Contact: P=P₁+P₂ ⟹ 1/F=1/f₁+1/f₂. Separated by d: P=P₁+P₂−P₁P₂d ⟹ 1/F=1/f₁+1/f₂−d/(f₁f₂).",
        "Equiconvex lens cut horizontally (along axis, into 2 D-shapes): f unchanged each half, intensity halved.",
        "Equiconvex lens cut vertically (⊥ axis, into 2 plano-convex): f doubles each half, intensity unchanged.",
        "Layered lens (n different μ): forms n distinct images, one per refractive index.",
        "Lens silvered on one face: equivalent mirror P = 2P_L + P_M.",
        "Sunglasses (equal R same side): f→∞, P=0 — no focusing power.",
      ],
    },
    {
      heading: "Displacement Method",
      points: [
        "Object–screen separation D, two lens positions exist only if D > 4f. D=4f: exactly one position (u=v=2f). D>4f: two positions, x apart.",
        "f = (D²−x²)/4D. Object/image distances interchange between the two positions; m₁m₂ = 1.",
      ],
    },
    {
      heading: "Chromatic Aberration",
      points: [
        "μ_V > μ_R ⟹ f_V < f_R (violet focuses closer for convex lens). Longitudinal CA = f_R − f_V (axial spread); lateral CA = difference in image height.",
        "Achromatic doublet (two lenses in contact): ω₁/f₁ + ω₂/f₂ = 0 — combination has zero net colour spread but nonzero net f.",
      ],
    },
    {
      heading: "Prism — Deviation",
      points: [
        "r₁+r₂ = A; δ = i₁+i₂−A. Minimum deviation: i₁=i₂=i, r₁=r₂=A/2.",
        "μ = sin[(A+δ_min)/2]/sin(A/2). Thin prism: δ_min ≈ (μ−1)A.",
        "Grazing emergence: i_g = sin⁻¹[μ sinA − √(μ²−1)cosA]; beyond i_g, TIR at 2nd face instead of emergence.",
        "No-emergence for any i: μ ≥ 1/sin(A/2). A=0 (parallel faces) ⟹ acts as slab, δ=0.",
      ],
    },
    {
      heading: "Dispersion & Prism Combinations",
      points: [
        "Angular dispersion θ = δ_V−δ_R = (μ_V−μ_R)A. Dispersive power ω = θ/δ_Y = (μ_V−μ_R)/(μ_Y−1), μ_Y=(μ_V+μ_R)/2.",
        "Single prism always gives both deviation AND dispersion together — never one without the other.",
        "Deviation without dispersion (two prisms): (μ_V−μ_R)A + (μ'_V−μ'_R)A' = 0.",
        "Dispersion without deviation (direct-vision, two prisms): (μ−1)A + (μ'−1)A' = 0.",
      ],
    },
    {
      heading: "Microscope & Telescope",
      points: [
        "Simple microscope: MP = D/f (image at ∞); MP = 1+D/f (image at D).",
        "Compound microscope: MP = (v₀/u₀)(1+D/f_e) [image at D]; MP = (v₀/f₀)(D/f_e) [image at ∞]. Objective: short f, small aperture. Increase MP ⟹ decrease both f₀ and f_e.",
        "Astronomical telescope: MP = −f₀/f_e [image at ∞], L=f₀+f_e; MP = −(f₀/f_e)(1+f_e/D) [image at D]. Increase MP ⟹ increase f₀, decrease f_e.",
        "Swap objective & eyepiece: microscope MP barely changes; telescope MP becomes (1/m²) of original.",
        "Galilean telescope (concave eyepiece): MP=f₀/f_e, L=f₀−f_e, erect final image — but intermediate image outside tube, can't use cross-wires.",
        "Cassegrain (reflecting): paraboloid primary + convex secondary, MP=−f₀/f_e, avoids chromatic aberration, compact.",
        "Camera: I·D²·t = constant ⟹ time of exposure ∝ (f-number)², f-number = focal length/aperture.",
      ],
    },
    {
      heading: "Eye Defects",
      points: [
        "Myopia (near-sighted): image forms before retina; far objects blurred; corrected with concave lens (images ∞ at the far point).",
        "Hypermetropia (far-sighted): image forms behind retina; near objects blurred; corrected with convex lens (images 25 cm object at the near point).",
        "Presbyopia: both near & far vision impaired; two separate lenses or bifocals.",
        "Astigmatism: irregular corneal curvature; corrected with cylindrical lens.",
      ],
    },
    {
      heading: "Natural Phenomena",
      points: [
        "Primary rainbow: dispersion + 1 internal reflection; violet inner, red outer; ≈40°–42°.",
        "Secondary rainbow: dispersion + 2 internal reflections; fainter, colours reversed (red inner, violet outer); ≈50°–53°.",
        "Rayleigh scattering (particles ≪ λ): I ∝ 1/λ⁴ — blue scatters ~6× more than red.",
        "Blue sky: scattered blue light reaches observer from all directions. Red sunrise/sunset: longer atmospheric path scatters away blue, leaving red/orange.",
        "Particles > λ (clouds, dust): all colours scatter equally ⟹ clouds appear white. Red signal lights travel farthest through fog (least scattered).",
      ],
    },
    {
      heading: "Exam Traps",
      points: [
        "Mirror power sign is opposite to lens power sign for the same converging/diverging behaviour: concave mirror P>0 but convex lens P>0 too — don't assume mirror and lens conventions match by surface shape alone.",
        "Convex mirror image is NEVER real or inverted for a real object — eliminate any option claiming otherwise instantly.",
        "Concave lens image is NEVER real or magnified for a real object — same instant-elimination trick.",
        "Longitudinal magnification m_L = −m² is always negative, even though transverse m for the same case might be positive.",
        "Don't confuse μ_vacuum = 1 (minimum, not zero) with μ = 0; and remember μ is unitless/dimensionless.",
        "TIR needs denser→rarer AND i>θ_C — both conditions; many trap questions give only one of the two.",
        "In displacement-method numericals, the magnified and diminished image positions are easy to swap — always check D > 4f before assuming two positions exist.",
        "Swapping objective/eyepiece changes telescope MP by a factor of 1/m², not negligibly as in a microscope — a frequently inverted fact in MCQs.",
      ],
    },
  ],
};
