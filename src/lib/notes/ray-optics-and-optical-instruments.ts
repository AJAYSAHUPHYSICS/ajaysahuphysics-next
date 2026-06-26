import type { ChapterNotes } from "./kinematics";

export const rayOpticsAndOpticalInstrumentsNotes: ChapterNotes = {
  chapterName: "Ray Optics & Optical Instruments",
  className: "12",
  intro:
    "Ray optics (geometrical optics) treats light as travelling in straight-line rays whenever the obstacles or apertures involved are much larger than its wavelength — an approximation good enough to explain mirrors, lenses, prisms and every optical instrument from a microscope to the human eye. This chapter builds up from the basic laws of reflection and refraction, through spherical mirrors and lenses with their sign conventions and formulas, into total internal reflection, prisms and dispersion, and finally into the optical instruments — microscope, telescope, camera and eye — that put all of these ideas to practical use.",
  sections: [
    {
      heading: "1. Reflection of Light: Laws and Types",
      body:
        "Reflection occurs when light strikes the boundary between two media and part of it bounces back into the same medium. How the reflected rays behave depends entirely on how smooth the reflecting surface is.",
      bullets: [
        "Regular (specular) reflection: from a perfectly plane surface, parallel incident rays remain parallel after reflection — this is what lets a plane mirror form a clear image.",
        "Irregular (diffused) reflection: from a rough surface, rays reflect in many different directions from different bits of the surface — this is why an object can be seen from almost any viewing position (most everyday objects are seen by diffused reflection).",
        "Laws of reflection: (i) the incident ray, reflected ray and the normal at the point of incidence all lie in the same plane; (ii) the angle of reflection equals the angle of incidence, ∠i = ∠r.",
        "Real space is the side of a mirror where the reflected rays actually exist; virtual space is the other side, where reflected rays do not exist but appear to come from.",
        "A point object is where incident rays actually diverge from (real object) or appear to converge towards (virtual object). A point image is where reflected/refracted rays actually converge (real image) or appear to diverge from (virtual image) — object is always decided by incident rays, image always by reflected/refracted rays.",
      ],
    },
    {
      heading: "2. Plane Mirror: Image Formation and Lateral Inversion",
      body:
        "A plane mirror is the simplest reflecting surface, and it has a beautifully simple geometric property: it is exactly the perpendicular bisector of the line joining any object point to its image.",
      bullets: [
        "Image distance behind a plane mirror always equals object distance in front of it — the mirror line bisects the object–image segment perpendicularly.",
        "Lateral inversion: left turns into right (and vice versa) in the image compared with the object, as seen by someone facing the mirror — this is why text held up to a mirror reads backwards.",
        "A plane mirror behaves like a 'window' into a virtual world: objects in real space appear to have exact duplicates sitting symmetrically in virtual space.",
        "Clock-in-mirror trick: if the object (real) time shown is AHBMCS, the image (mirror) time read is 11h 59m 60s − AHBMCS (equivalently 12h − object time, adjusted for minutes and seconds borrowing).",
        "A plane mirror normally forms a virtual image of a real object, but it can form a real image if the incident light is already converging (i.e., the object itself is virtual).",
      ],
    },
    {
      heading: "3. Minimum Mirror Length and Deviation by Plane Mirrors",
      body:
        "Two classic plane-mirror results — how short a mirror can be and still show your whole reflection, and how much a ray deviates on reflection — both fall out directly from the laws of reflection applied with simple geometry.",
      formula: [
        { label: "Minimum mirror length to see full height", expression: "L_min = h/2 (independent of eye height and distance from mirror)" },
        { label: "Deviation by a single plane mirror", expression: "δ = 180° − (i + r) = 180° − 2i  (since i = r)" },
        { label: "Net deviation, two mirrors inclined at θ", expression: "δ = 360° − 2θ" },
      ],
      bullets: [
        "To see your complete image, the mirror needs to be only half your height — and this result holds regardless of how far you stand from the mirror or where your eyes are positioned along your height.",
        "For a single reflection, deviation δ = 180° − 2i; the ray that hits the mirror normally (i = 0) retraces its own path with δ = 0° in the sense that it returns exactly along the incident direction.",
        "When two plane mirrors are inclined at angle θ to each other, a ray reflecting once off each mirror in succession deviates by a total δ = 360° − 2θ, independent of the angle of incidence on the first mirror.",
        "Keeping the mirror fixed and rotating the incident ray by angle α rotates the reflected ray by the same α, in the opposite sense. Keeping the incident ray fixed and rotating the mirror by α rotates the reflected ray by 2α, in the same sense — this factor of 2 is a frequently tested result.",
      ],
    },
    {
      heading: "4. Multiple Images by Inclined Mirrors and Velocity of Image",
      body:
        "When two plane mirrors are inclined at an angle θ with an object placed between them, light can bounce back and forth, creating several images — the exact count depends on whether 360°/θ works out even or odd.",
      formula: [
        { label: "n = 360°/θ is even", expression: "number of images n = (360°/θ) − 1" },
        { label: "n = 360°/θ is odd, object off bisector", expression: "number of images n = 360°/θ" },
        { label: "n = 360°/θ is odd, object on bisector", expression: "number of images n = (360°/θ) − 1" },
        { label: "Image velocity (stationary plane mirror)", expression: "v_op = v_ip (parallel component), v_on = −v_in (normal component)" },
      ],
      bullets: [
        "At each successive reflection some light energy is absorbed, so images farther down the chain get progressively fainter.",
        "For a stationary plane mirror, the component of object velocity parallel to the mirror equals the corresponding component of image velocity, while the normal components are equal in magnitude but opposite in sense — net result: object and image always move with the same speed relative to the mirror.",
        "If a person walks towards a mirror at speed v, their image approaches at the same speed v relative to the mirror (so the gap closes at 2v relative to the person) — a very common numerical trap.",
      ],
    },
    {
      heading: "5. Spherical Mirrors: Definitions and Sign Convention",
      body:
        "A spherical mirror is a small cut-out piece of a hollow sphere — concave if the inner (concave) surface reflects, convex if the outer (bulging) surface reflects. A handful of standard terms and one consistent sign convention make every formula in this section work cleanly.",
      formula: [
        { label: "Relation between focal length and radius", expression: "f = R/2 (for paraxial rays)" },
      ],
      bullets: [
        "Pole (P): the centre point of the mirror's reflecting surface. Centre of curvature (C): centre of the sphere the mirror is cut from. Radius of curvature (R): CP, the sphere's radius. Principal axis: the line through C and P.",
        "Principal focus (F): the point on the axis where parallel-to-axis rays converge (concave) or appear to diverge from (convex) after reflection; focal length f = PF.",
        "Paraxial rays make a small angle with the normal and stay close to the principal axis — all the standard mirror/lens formulas are derived assuming paraxial rays only. Marginal rays (large angle) do not focus at the same point as paraxial rays.",
        "Sign convention: all distances measured from the pole; distances in the direction of incident light are positive, opposite to it are negative; distances above the axis are positive, below are negative. Light is taken to travel left to right.",
        "Under this convention a real object always has u negative; a concave mirror has f negative... however, this module presents many results in magnitude form before applying the sign convention numerically — always re-apply the convention carefully when substituting numbers.",
      ],
    },
    {
      heading: "6. Spherical Aberration and the Mirror Formula",
      body:
        "Real spherical mirrors don't focus all parallel rays to one exact point — only paraxial rays do that ideally; marginal rays focus slightly closer to the mirror, a defect called spherical aberration. The mirror formula itself follows from simple paraxial-ray geometry.",
      formula: [
        { label: "Marginal focus vs paraxial focus", expression: "spherical aberration: image of a distant point spreads between F_m (marginal) and F_p (paraxial)" },
        { label: "Mirror formula", expression: "1/v + 1/u = 1/f = 2/R" },
      ],
      bullets: [
        "Spherical aberration arises purely from the geometry of a spherical (as opposed to parabolic) surface — it exists even for perfectly polished, perfectly reflecting mirrors.",
        "The mirror formula 1/v + 1/u = 1/f is derived by applying the law of reflection to a paraxial ray and using small-angle approximations throughout — it is exact only in the paraxial limit.",
        "As per sign convention: real object → u negative; real image → v negative; virtual object → u positive; virtual image → v positive.",
      ],
    },
    {
      heading: "7. Magnification for Spherical Mirrors",
      body:
        "Magnification compares the size of the image to the size of the object — and for an extended object, three different kinds of magnification apply depending on how the object is oriented relative to the principal axis.",
      formula: [
        { label: "Transverse (linear) magnification", expression: "m = h_i/h_o = −v/u = f/(f−u) = (f−v)/f" },
        { label: "Longitudinal magnification (small object)", expression: "m_L = −(dv/du) = −m² = −(v/u)²" },
        { label: "Superficial (areal) magnification", expression: "m_s = A_image/A_object = m²" },
      ],
      bullets: [
        "Transverse/lateral magnification applies when a one-dimensional object is placed perpendicular to the principal axis — the standard case for most problems.",
        "Longitudinal magnification applies when a rod lies along the principal axis itself; for a small object it works out to exactly −m², always negative regardless of the sign of m, meaning the image of a rod along the axis is always inverted end-to-end relative to the object's orientation in the −m² sense.",
        "Superficial magnification applies to a flat two-dimensional object whose plane is perpendicular to the axis; area scales as the square of the linear magnification, m_s = m².",
        "|m| > 1 → enlarged image; |m| < 1 → diminished image. m < 0 → inverted (and necessarily real, for a single mirror with a real object); m > 0 → erect (and necessarily virtual, for a single mirror with a real object).",
      ],
    },
    {
      heading: "8. Image Formation by a Concave Mirror",
      body:
        "A concave mirror's image changes character dramatically depending on exactly where the object sits relative to the focus F and the centre of curvature C — this progression is one of the most frequently tested visual sequences in optics.",
      bullets: [
        "Object at infinity → image at F: real, inverted, highly diminished (m → 0, m < 0).",
        "Object between ∞ and C → image between C and F: real, inverted, diminished (|m| < 1, m < 0).",
        "Object at C → image at C: real, inverted, same size (m = −1).",
        "Object between C and F → image beyond C: real, inverted, enlarged (|m| > 1, m < 0).",
        "Object at F → image at infinity: real, inverted, infinitely large (m → −∞).",
        "Object between F and pole P → image behind the mirror: virtual, erect, enlarged (m > +1) — this is the concave-mirror mode used by dentists and for shaving/make-up mirrors.",
      ],
    },
    {
      heading: "9. Image Formation by a Convex Mirror and Power of a Mirror",
      body:
        "A convex mirror is far simpler to summarise than a concave one: no matter where the object is placed, the image is always virtual, erect and diminished (or at most equal in the limiting case) — which is exactly why convex mirrors make ideal wide-view mirrors.",
      formula: [{ label: "Power of a mirror", expression: "P = −1/f(m) = −100/f(cm) dioptre" }],
      bullets: [
        "Object at infinity → virtual, erect, highly diminished image at F (behind the mirror).",
        "Object at a finite distance → virtual, erect, diminished image between P and F (behind the mirror); m is always positive (erect) for a convex mirror with a real object.",
        "Wider field of view than an equivalent plane mirror is the key practical advantage, which is why convex mirrors serve as rear-view/side mirrors in vehicles and as wide-angle security mirrors.",
        "By the power convention, a concave mirror has positive power (converging) and a convex mirror has negative power (diverging) — opposite to how a convex lens (positive) and concave lens (negative) are signed, despite the analogous converging/diverging behaviour.",
      ],
    },
    {
      heading: "10. Newton's Formula and Velocity of the Image (Mirrors)",
      body:
        "Measuring object and image distances from the focus instead of from the pole leads to a strikingly compact relation (Newton's formula); differentiating the mirror formula with respect to time gives the velocity of a moving image.",
      formula: [
        { label: "Newton's formula", expression: "x₁x₂ = f² (x₁, x₂ measured from the focus, on the object and image side respectively)" },
        { label: "Velocity of image (concave mirror, object approaching F from ∞)", expression: "v_image = −m² × v_object" },
      ],
      bullets: [
        "Newton's formula is derived by substituting u = −(f + x₁) and v = −(f + x₂) into the mirror formula and simplifying — useful whenever distances are naturally given relative to the focus.",
        "The image speed is always −m² times the object speed: the minus sign signals that when the object moves towards the mirror (decreasing |u|), the image generally moves in the corresponding direction set by how m changes; the key numerical fact to remember is the m² factor relating the magnitudes.",
        "Because m² ≥ 0 always, the magnitude relation |v_image| = m²|v_object| is the safest form to apply directly in numerical problems.",
      ],
    },
    {
      heading: "11. Refraction: Laws, Refractive Index and Bending of Light",
      body:
        "Refraction is the bending of light's path as it crosses the boundary between two media of different optical density — governed by Snell's law, with frequency staying fixed throughout (only speed and wavelength change).",
      formula: [
        { label: "Snell's law", expression: "μ₁ sin i = μ₂ sin r" },
        { label: "Absolute refractive index", expression: "μ = c/v" },
        { label: "Relative refractive index", expression: "₁μ₂ = μ₂/μ₁ = v₁/v₂" },
      ],
      bullets: [
        "Incident ray, refracted ray and the normal all lie in the same plane — exactly as in reflection.",
        "Denser medium ⟺ lower speed of light ⟺ higher refractive index; since v_glass < v_water, μ_glass > μ_water.",
        "Rarer → denser: ray bends towards the normal (∠i > ∠r). Denser → rarer: ray bends away from the normal (∠i < ∠r).",
        "Frequency of light never changes on refraction (it's set by the source); speed and wavelength both change in proportion to 1/μ of the medium.",
        "μ is a dimensionless, unitless scalar. The refractive index of free space (vacuum) is exactly 1, and is the minimum possible value of μ for any wavelength — every material medium has μ ≥ 1 (approximately, in the visible range).",
      ],
    },
    {
      heading: "12. Apparent Depth, Normal Shift and Lateral Shift",
      body:
        "Refraction at a plane boundary makes objects appear to be at a different depth than they really are — this 'apparent depth' effect, and the related lateral shift through a slab, are both direct, derivable consequences of Snell's law applied with small angles.",
      formula: [
        { label: "Object in denser medium, viewed from rarer (μ_D, μ_R = 1)", expression: "d_apparent = d_actual/μ" },
        { label: "Normal shift (object viewed through denser→rarer boundary)", expression: "x = d_actual(1 − 1/μ)" },
        { label: "Object in rarer medium, viewed from denser", expression: "d_apparent = μ × d_actual  (d_apparent > d_actual)" },
        { label: "Lateral shift through a slab", expression: "d = t·sin(i−r)/cos r" },
        { label: "Normal shift through a glass slab", expression: "x = t(1 − 1/μ)" },
      ],
      bullets: [
        "A fish at real depth d underwater appears shifted upward (shallower) to an observer in air — apparent depth is always less than actual depth when viewing from the rarer side into the denser medium.",
        "Conversely, a flying object viewed from inside a denser medium (e.g. a fish looking up at a bird) appears higher than its actual height — apparent height exceeds actual height in that direction.",
        "Lateral shift is the perpendicular distance between the incident ray's original direction and the emergent ray after passing through a parallel-sided slab; it depends on slab thickness t, angle of incidence i, and angle of refraction r inside the slab.",
        "A transparent slab placed in front of an object always shifts the apparent position of the object towards the slab (in the direction of incident light) by x = t(1 − 1/μ); this normal shift is independent of the object's actual distance from the slab.",
      ],
    },
    {
      heading: "13. Total Internal Reflection: Critical Angle and Conditions",
      body:
        "When light travels from a denser to a rarer medium and the angle of incidence keeps increasing, refraction eventually becomes impossible — beyond the critical angle, all the light reflects back into the denser medium. This is total internal reflection (TIR).",
      formula: [
        { label: "Critical angle", expression: "sin θ_C = μ_R/μ_D  (denser → rarer)" },
        { label: "Deviation, i < θ_C (refraction)", expression: "δ = i − sin⁻¹[(μ_D/μ_R) sin i]" },
        { label: "Deviation, i > θ_C (TIR)", expression: "δ = 180° − 2i" },
        { label: "Radius of bright circular patch above an underwater point source at depth h", expression: "r = h/√(μ² − 1)" },
      ],
      bullets: [
        "Two conditions are essential for TIR: (i) light must travel from a denser to a rarer medium, and (ii) the angle of incidence must exceed the critical angle θ_C.",
        "At exactly i = θ_C, the refracted ray grazes the boundary (r = 90°); for i > θ_C, no refracted ray exists at all — 100% of the light reflects.",
        "Because TIR reflects all the incident light (no energy lost to a transmitted ray), images formed by TIR are noticeably brighter than corresponding images formed by ordinary mirrors or lens refraction, where some light is always lost.",
        "A point source at depth h inside a liquid of refractive index μ illuminates only a circular patch of radius r = h/√(μ²−1) on the surface directly above it — light hitting the surface outside this circle undergoes TIR and never escapes; a diver sees the entire outside world compressed into a cone of half-angle θ_C through this same circular window.",
      ],
    },
    {
      heading: "14. Applications of Total Internal Reflection",
      body:
        "TIR isn't just a theoretical curiosity — it explains the sparkle of a diamond, makes optical-fibre communication possible, and is responsible for natural illusions like mirages and polar 'looming'.",
      bullets: [
        "Sparkling of diamonds: diamond's very high refractive index (≈2.42) gives a small critical angle (≈24°), and diamonds are cut so that light entering them strikes the internal faces at angles exceeding θ_C repeatedly, undergoing TIR again and again before finally emerging at a few bright points — producing the characteristic sparkle.",
        "Optical fibre: a thin glass/plastic core of higher refractive index surrounded by a cladding of lower refractive index guides light along its length purely through repeated TIR at the core–cladding boundary, with essentially no loss even around bends — the basis of fibre-optic communication (pioneered by Dr. Narinder Singh Kapany, 'the father of fibre optics').",
        "Mirage: on hot ground, air near the surface is hotter (and hence less dense, lower μ) than air higher up; light from a distant object bends progressively and undergoes TIR near the ground, producing an inverted image that looks like a 'reflection' in a pool of water that isn't really there.",
        "Optical looming (polar regions): the opposite temperature gradient (cold air near the ground, warmer above) produces TIR that creates an inverted image apparently suspended in the sky above the actual object.",
      ],
    },
    {
      heading: "15. Refraction at a Single Curved Surface",
      body:
        "Refraction at a single spherical surface separating two media follows its own formula, structurally similar to the mirror formula but with the two different refractive indices both appearing explicitly.",
      formula: [
        { label: "Refraction at a single spherical surface", expression: "μ₂/v − μ₁/u = (μ₂ − μ₁)/R" },
        { label: "First focal length (object-side focus, u = f₁ gives v = ∞)", expression: "f₁ = μ₁R/(μ₂ − μ₁)" },
        { label: "Second focal length (image-side focus, u = −∞ gives v = f₂)", expression: "f₂ = μ₂R/(μ₂ − μ₁)" },
        { label: "Relation between the two focal lengths", expression: "f₁/μ₁ + f₂/μ₂ = 0" },
      ],
      bullets: [
        "Sign convention for R: measured from the pole to the centre of curvature, positive if C lies on the side light is heading towards (same side as outgoing light), negative otherwise — applies uniformly to convex, concave or plane refracting surfaces.",
        "For a plane refracting surface, R → ∞, and the formula reduces directly to the familiar apparent-depth relation d_actual/d_apparent = μ₁/μ₂.",
        "A single curved surface has two distinct principal foci (unlike a plane mirror, which has none, or a thin lens, where the two coincide in magnitude when surrounded by the same medium on both sides) because the media on the two sides are different.",
      ],
    },
    {
      heading: "16. Lens Basics, Lens Maker's Formula and Lens Formula",
      body:
        "A lens is built from two refracting surfaces; combining the single-surface refraction formula for each surface in turn (treating the first image as the object for the second surface) yields the lens maker's formula, and from it the everyday lens formula.",
      formula: [
        { label: "Lens maker's formula", expression: "1/f = (μ_L/μ_M − 1)(1/R₁ − 1/R₂)" },
        { label: "Lens formula", expression: "1/v − 1/u = 1/f" },
        { label: "Magnification", expression: "m = h_i/h_o = v/u = f/(f+u) = (f−v)/f" },
      ],
      bullets: [
        "A lens with refractive index greater than its surroundings is convergent (convex) if its centre is thicker than its edges, and divergent (concave) if its centre is thinner than its edges.",
        "Optical centre O: the point through which any ray passes completely undeviated. Principal axis: the line through the two centres of curvature, perpendicular to the lens.",
        "First focal point F₁: object point for which the image forms at infinity. Second focal point F₂: image point corresponding to an object at infinity — for a thin lens in a single surrounding medium these two focal lengths are equal in magnitude.",
        "Aperture is the effective diameter through which light enters the lens; image intensity ∝ (aperture)², which is the basis of the f-number used in cameras.",
        "Rules for ray tracing: a ray through the optical centre goes undeviated; a ray through (or directed at) F₁ emerges parallel to the axis; a ray parallel to the axis emerges through (or appearing to pass through) F₂.",
      ],
    },
    {
      heading: "17. Image Formation by a Convex (Converging) Lens",
      body:
        "Just like the concave mirror, a convex lens produces a whole sequence of qualitatively different images depending on where the object sits relative to F and 2F — the convex-lens version of the same story, but transmitted rather than reflected.",
      bullets: [
        "Object at infinity → image at F: real, inverted, highly diminished.",
        "Object between ∞ and 2F → image between F and 2F: real, inverted, diminished.",
        "Object at 2F → image at 2F: real, inverted, same size (m = −1).",
        "Object between 2F and F → image beyond 2F: real, inverted, enlarged.",
        "Object at F → image at infinity: real, inverted, infinitely enlarged.",
        "Object between F and the optical centre O → image on the same side as the object: virtual, erect, enlarged (m > +1) — this is exactly the simple-microscope/magnifying-glass mode of a convex lens.",
      ],
    },
    {
      heading: "18. Image Formation by a Concave (Diverging) Lens and Power of a Lens",
      body:
        "A concave lens, like a convex mirror, always gives one consistent type of image regardless of object position — virtual, erect and diminished, located on the same side as the object, between the lens and its focus.",
      formula: [{ label: "Power of a lens", expression: "P = 1/f(m) = 100/f(cm) dioptre [in air]; converging (convex) lens P > 0, diverging (concave) lens P < 0" }],
      bullets: [
        "Object at infinity → virtual, erect, very diminished image at F.",
        "Object at any finite distance → virtual, erect, diminished image strictly between the optical centre and F.",
        "A concave lens can never produce a real or magnified image of a real object — this single fact eliminates many wrong options in multiple-choice questions instantly.",
        "Sign convention for lenses: real object u negative, real image v positive; virtual object u positive, virtual image v negative (note this differs from the mirror convention for v).",
      ],
    },
    {
      heading: "19. Combination of Lenses, Cutting a Lens and Silvering",
      body:
        "Multiple thin lenses (in contact, or separated by a small gap) combine by simply adding powers; cutting a single lens along different planes changes its focal length in specific, testable ways; and silvering one face of a lens turns it into an equivalent mirror.",
      formula: [
        { label: "Two thin lenses in contact", expression: "P = P₁ + P₂  ⟺  1/F = 1/f₁ + 1/f₂" },
        { label: "Two thin lenses separated by distance d", expression: "P = P₁ + P₂ − P₁P₂d  ⟺  1/F = 1/f₁ + 1/f₂ − d/(f₁f₂)" },
        { label: "Equivalent mirror power of a lens silvered on one face", expression: "P = 2P_L + P_M" },
      ],
      bullets: [
        "Cutting an equiconvex lens along a horizontal plane through its axis (into two D-shaped halves) leaves the focal length of each half unchanged (μ, R₁, R₂ all unchanged) — only the intensity of the image drops, since aperture (and hence light collected) is halved.",
        "Cutting the same equiconvex lens along a vertical plane (perpendicular to the axis, splitting it into two thinner plano-convex pieces) doubles the focal length of each half — but image intensity stays the same as the original.",
        "If a lens is built from layers of different refractive indices, it behaves as several different lenses superposed — the number of distinct images formed equals the number of distinct refractive indices present.",
        "An equiconvex lens silvered on one curved face behaves as an equivalent concave mirror with power P = 2P_L + P_M, where P_L is the lens power (using one surface) and P_M is the power of the silvered (mirror) surface — light passes through the lens, reflects off the silvered face, and passes back through the lens.",
        "Sunglasses/plain window-glass goggles, with both surfaces having equal radii of curvature on the same side, work out to f → ∞ and P = 0 — confirming they have no focusing power, purely cosmetic/protective.",
      ],
    },
    {
      heading: "20. Displacement Method for Focal Length of a Convex Lens",
      body:
        "A practical lab technique: with an object and screen fixed a distance D apart, a convex lens can usually be placed at two different positions between them and still form a sharp image on the screen — this method gives focal length without needing to measure u or v directly.",
      formula: [
        { label: "Condition for two lens positions to exist", expression: "D > 4f" },
        { label: "Focal length from D and separation x between the two lens positions", expression: "f = (D² − x²)/4D" },
        { label: "Magnifications at the two positions multiply to 1", expression: "m₁m₂ = 1" },
      ],
      bullets: [
        "If D < 4f, no real position of the lens gives a sharp image on the screen at all (u comes out imaginary in the quadratic for u).",
        "If D = 4f exactly, there's only one possible lens position, exactly midway (u = v = 2f).",
        "If D > 4f, there are exactly two positions; the two object distances u₁ and u₂ (and correspondingly the two image distances) are mutually interchangeable — i.e. whichever distance was the object distance at one position becomes the image distance at the other.",
        "At one position the image is magnified (m₁ > 1) and at the other it's diminished (m₂ < 1, with m₁m₂ = 1) — so geometric mean of the two image-sizes observed equals the actual object size, a handy practical check.",
      ],
    },
    {
      heading: "21. Chromatic Aberration and Achromatism",
      body:
        "Because a lens's focal length depends on the refractive index of its material, and refractive index itself varies with wavelength (μ_violet > μ_red), a single lens forms a slightly different image for each colour in white light — a defect called chromatic aberration.",
      formula: [
        { label: "Longitudinal chromatic aberration", expression: "f_R − f_V  (axial separation between red and violet image points, for object at ∞)" },
        { label: "Achromatic doublet condition (two lenses in contact)", expression: "ω₁/f₁ + ω₂/f₂ = 0" },
      ],
      bullets: [
        "Since μ decreases from violet to red, focal length increases from violet to red (f ∝ 1/(μ−1)), so f_R > f_V — violet focuses closer to the lens than red, for a convex lens.",
        "Longitudinal (axial) chromatic aberration is the axial spread between where red and violet images form along the principal axis; lateral chromatic aberration is the difference in image height/size for red vs violet, for a finite-sized object.",
        "An achromatic combination (achromatic doublet) is built by combining two lenses (usually one convex, one concave, of different dispersive powers) so that all colours focus at the same point — the condition is ω₁/f₁ + ω₂/f₂ = 0, which forces the two lenses to have opposite sign of focal length when both ω are positive.",
        "Achromatism removes chromatic aberration but the combination still has a net non-zero focal length overall — it corrects colour-spread without eliminating the lens's focusing ability.",
      ],
    },
    {
      heading: "22. Prism: Deviation, Minimum Deviation and Emergence Conditions",
      body:
        "A prism is a transparent medium bounded by two inclined plane refracting surfaces; tracking the ray through both refractions gives a deviation that depends on the angle of incidence, with one special angle — minimum deviation — that is by far the most tested configuration.",
      formula: [
        { label: "Sum of refraction angles inside the prism", expression: "r₁ + r₂ = A" },
        { label: "Total deviation", expression: "δ = i₁ + i₂ − A" },
        { label: "Minimum deviation condition", expression: "i₁ = i₂ = i, r₁ = r₂ = A/2" },
        { label: "Refractive index from minimum deviation", expression: "μ = sin[(A+δ_min)/2] / sin(A/2)" },
        { label: "Thin prism (small A)", expression: "δ_min = (μ−1)A" },
        { label: "Angle for grazing emergence", expression: "i_g = sin⁻¹[μ sin A − √(μ²−1) cos A]" },
        { label: "No-emergence condition (TIR at second face for all i)", expression: "μ ≥ 1/sin(A/2)" },
      ],
      bullets: [
        "A = angle of prism (the angle between the two refracting faces the light enters through and exits through); if these faces are parallel, A = 0 and the slab transmits light straight through with zero deviation, acting as a plain parallel slab.",
        "At minimum deviation the ray's path through the prism is symmetric: i₁ = i₂ and r₁ = r₂ = A/2 — this single fact is the entry point for almost every minimum-deviation numerical.",
        "For a thin prism with small angle A, δ_min ≈ (μ−1)A — directly analogous to the thin-lens power relation, and very commonly used for small-angle dispersion problems.",
        "Maximum deviation (grazing emergence) occurs when the emergent ray grazes the second face (i₂ = 90°); beyond the corresponding incidence angle i_g, the ray would undergo TIR at the second face instead of emerging.",
        "If μ ≥ 1/sin(A/2), no incident angle at all lets the ray emerge from the second face — every ray entering the first face undergoes TIR at the second, regardless of incidence angle; this sets an upper bound on A (or lower bound on μ) for a prism to transmit light at all in the usual two-refraction sense.",
      ],
    },
    {
      heading: "23. Dispersion of Light and Combination of Prisms",
      body:
        "White light splits into its component colours on passing through a prism because the prism's refractive index — and hence its deviation — is slightly different for every wavelength; this splitting is dispersion, quantified by angular dispersion and dispersive power.",
      formula: [
        { label: "Angular dispersion", expression: "θ = δ_V − δ_R = (μ_V − μ_R)A" },
        { label: "Dispersive power", expression: "ω = θ/δ_Y = (μ_V − μ_R)/(μ_Y − 1), with μ_Y = (μ_V + μ_R)/2" },
        { label: "Combination: deviation without dispersion", expression: "(μ_V − μ_R)A + (μ'_V − μ'_R)A' = 0" },
        { label: "Combination: dispersion without deviation", expression: "(μ−1)A + (μ'−1)A' = 0" },
      ],
      bullets: [
        "Since μ_V > μ_R always, δ_V > δ_R always — violet deviates more than red on passing through any prism, with the other colours of the visible spectrum spreading out in order (red deviating least, violet most) to produce the familiar VIBGYOR fan.",
        "Dispersive power depends only on the material of the prism (not on its angle A), and is always a small, positive, dimensionless number for ordinary optical glasses.",
        "A single prism can never produce deviation without dispersion or dispersion without deviation — both effects are tied together for one prism (since both scale with A through the same μ values). Achieving one without the other always needs at least two prisms of different materials, combined with opposite-facing angles in the appropriate proportion.",
        "'Deviation without dispersion' combinations are used to deviate a beam while keeping it white (no colour fringing); 'dispersion without deviation' combinations (direct-vision prisms) are used in spectrometers to spread colours out for analysis while keeping the overall beam direction unchanged.",
      ],
    },
    {
      heading: "24. Optical Instruments: Simple and Compound Microscope",
      body:
        "A simple microscope is just a convex lens used to magnify; a compound microscope adds a second lens (the eyepiece) to magnify the already-magnified intermediate image, multiplying the two magnifications together for a much larger overall effect.",
      formula: [
        { label: "Simple microscope, image at infinity", expression: "MP = D/f" },
        { label: "Simple microscope, image at near point D", expression: "MP = 1 + D/f" },
        { label: "Compound microscope, image at D", expression: "MP = (v₀/u₀)(1 + D/f_e)" },
        { label: "Compound microscope, image at infinity", expression: "MP = (v₀/f₀)(D/f_e)" },
      ],
      bullets: [
        "In a simple microscope the object sits between the lens's focus and optical centre, giving a virtual, erect, magnified image — magnifying power is greater when the image forms at the near point D than when it forms at infinity (relaxed-eye viewing), differing by exactly 1 in the formula.",
        "In a compound microscope, the objective forms a real, inverted, magnified intermediate image (object placed between f₀ and 2f₀ of the objective); this intermediate image then acts as the object for the eyepiece, which is positioned so the intermediate image falls between the eyepiece's optical centre and its focus — producing a final image that is virtual, inverted (relative to the original object) and further magnified.",
        "The objective has a small aperture (since the object is very close, little light-gathering area is needed) while the eyepiece has a larger aperture, the opposite of what's needed in a telescope.",
        "Total magnifying power of a compound microscope = m₀ × MP_e (objective's linear magnification times the eyepiece's angular magnifying power as a simple microscope) — increasing magnification means decreasing the focal length of both lenses.",
      ],
    },
    {
      heading: "25. Optical Instruments: Astronomical and Galilean Telescope, Camera",
      body:
        "A telescope's job is the opposite of a microscope's: instead of magnifying something tiny and nearby, it magnifies the visual angle of something huge but very far away, using a large-aperture, large-focal-length objective paired with a short-focal-length eyepiece.",
      formula: [
        { label: "Astronomical telescope, final image at infinity", expression: "MP = −f₀/f_e ; tube length L = f₀ + f_e" },
        { label: "Astronomical telescope, final image at D", expression: "MP = −(f₀/f_e)(1 + f_e/D)" },
        { label: "Galilean telescope (uses a concave eyepiece)", expression: "MP = f₀/f_e (final image erect); L = f₀ − f_e" },
        { label: "Cassegrain (reflecting) telescope", expression: "MP = −f₀/f_e" },
      ],
      bullets: [
        "In the astronomical (refracting) telescope, the objective (large f, large aperture) forms a real, inverted image at its own focus; the eyepiece (short f) then views this intermediate image as a simple microscope, producing a final image that is virtual, inverted and magnified — final image lies between D and infinity from the eye.",
        "Compared to a compound microscope: in a telescope, increasing magnifying power means increasing the objective's focal length and decreasing the eyepiece's focal length (opposite emphasis to the microscope, where both focal lengths are decreased).",
        "If objective and eyepiece of a telescope are interchanged, the magnifying power becomes 1/m² of its original value (a sharp contrast with a compound microscope, whose MP barely changes if its two lenses are swapped).",
        "A Galilean telescope replaces the convergent eyepiece with a divergent (concave) lens placed so that rays from the objective are directed towards its focus; this produces an erect (not inverted), magnified, virtual final image — useful for terrestrial viewing — but its intermediate image forms outside the tube, so it cannot carry cross-wires/scales and isn't used for precise angular measurement.",
        "Cassegrain's reflecting telescope uses a large paraboloidal primary mirror plus a convex secondary mirror instead of lenses, avoiding chromatic aberration entirely and allowing a much more compact tube for a given objective focal length.",
        "Camera: a convex lens of adjustable aperture and lens–film distance forms a real, inverted, diminished image (object between 2F and ∞, image between F and 2F) on the film/sensor. Exposure follows I·D²·t = constant, so time of exposure ∝ (f-number)², where f-number = focal length/aperture.",
      ],
    },
    {
      heading: "26. Defects of Vision",
      body:
        "The human eye is itself a converging-lens optical instrument that focuses images on the retina; when it fails to do this correctly for either near or far objects (or both), spectacle lenses of the appropriate power restore clear vision.",
      formula: [
        { label: "Myopia correction (image must form at the far point)", expression: "1/v − 1/u = 1/f, with v = −(distance to far point)" },
        { label: "Hypermetropia correction (image must form at the near point)", expression: "1/v − 1/u = 1/f, with v = −(distance to near point)" },
      ],
      bullets: [
        "Myopia (near-sightedness): distant objects appear blurred because their image forms in front of the retina (eyeball too long, or lens too strongly converging); corrected using a concave (diverging) lens, with power chosen so the lens images an object at infinity exactly at the person's actual far point.",
        "Hypermetropia (far-sightedness/long-sightedness): nearby objects appear blurred because their image forms behind the retina; corrected using a convex (converging) lens, chosen so it images an object at the normal near point (25 cm, unless stated otherwise) exactly at the person's actual (farther-out) near point.",
        "Presbyopia: both near and distant vision are impaired (typically with age, as the eye's accommodation weakens); corrected using either two separate pairs of single-power glasses, or a single bifocal lens combining both corrections.",
        "Astigmatism: an irregularly-curved cornea/lens means the eye cannot focus on horizontal and vertical lines simultaneously; corrected with a cylindrical lens oriented to compensate for the specific irregular curvature.",
      ],
    },
    {
      heading: "27. Natural Phenomena Due to Sunlight: Rainbow and Scattering",
      body:
        "Several everyday sky phenomena — rainbows, the blue daytime sky and the red sun at sunrise/sunset — are all consequences of how sunlight disperses and scatters as it passes through raindrops or the atmosphere.",
      formula: [{ label: "Rayleigh scattering law (particles smaller than λ)", expression: "I ∝ 1/λ⁴" }],
      bullets: [
        "Primary rainbow: formed by dispersion plus one internal reflection inside suspended raindrops; violet appears on the inner edge, red on the outer edge, with the bow's arc subtending about 40°–42° from the antisolar point.",
        "Secondary rainbow: formed by dispersion plus two internal reflections inside the raindrops; it is fainter than the primary bow and has its colour order reversed — red on the inner edge, violet on the outer edge — appearing at a larger angle (roughly 50°–53°) than the primary bow.",
        "Scattering of light is the deflection of light by particles much smaller than the beam, via absorption and re-radiation in different directions; for particles smaller than the wavelength (e.g. air molecules), Rayleigh's law gives intensity scattered ∝ 1/λ⁴ — blue light (shorter λ) scatters about six times as strongly as red light.",
        "Blue sky: sunlight scattered sideways by air molecules reaches an observer looking at any part of the sky away from the sun; since blue scatters far more than red, the scattered light — and hence the sky — appears blue.",
        "Red sun at sunrise/sunset: sunlight then travels a much longer path through the atmosphere before reaching the observer, so almost all the blue component is scattered away en route, leaving mainly red/orange light to reach the eye directly — making the sun (and surrounding sky) look reddish-orange.",
        "For particles larger than the wavelength of light (e.g. water droplets in clouds, dust), Rayleigh's law breaks down and all wavelengths scatter roughly equally — which is why clouds appear white rather than blue.",
        "Practical consequence of Rayleigh scattering: red signal lights are used for danger/stop signals because red light, being scattered the least, travels the farthest through fog/haze/rain with the least loss of visibility.",
      ],
    },
  ],
};
