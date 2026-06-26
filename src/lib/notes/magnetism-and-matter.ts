import type { ChapterNotes } from "./kinematics";

export const magnetismAndMatterNotes: ChapterNotes = {
  chapterName: "Magnetism & Matter",
  className: "12",
  intro:
    "Having seen how currents and moving charges create magnetic fields, this chapter turns the picture around: it studies the bar magnet itself as the prototype magnetic dipole, the Earth as a giant (slightly tilted) bar magnet, and finally asks why some materials respond strongly to a magnetic field while others barely respond at all. The current-loop dipole, torque, and atomic magnetism results from Moving Charges & Magnetism carry over directly — here the same ideas are applied to bar magnets, to geomagnetism, and to the classification of materials as diamagnetic, paramagnetic or ferromagnetic.",
  sections: [
    {
      heading: "1. The Bar Magnet: Pole Strength and Magnetic Moment",
      body:
        "A bar magnet is the simplest example of a magnetic dipole — a north pole and a south pole of equal and opposite 'pole strength', separated by a small distance along the magnetic axis.",
      formula: [
        { label: "Magnetic moment of a bar magnet", expression: "M = m·l (directed from S to N along the axis)" },
        { label: "Coulomb's law for magnetic poles", expression: "F = (μ₀/4π)·(m₁m₂/r²)" },
        { label: "Effective (magnetic) length vs geometric length", expression: "l ≈ (5/6) l₀ ≈ 0.83 l₀" },
      ],
      bullets: [
        "Pole strength (m) is a scalar with SI unit A·m; it is conventionally +m for the north pole and −m for the south pole, and is directly proportional to the magnet's area of cross-section.",
        "Effective length l is the distance between the two poles along the axis; because the poles sit slightly inside the physical ends, l is always a little less than the geometric length l₀ of the bar.",
        "Magnetic moment M = ml is an axial vector, SI unit A·m², pointing from the south pole to the north pole — exactly analogous to the electric dipole moment pointing from −q to +q.",
        "The centre of the magnet, equidistant from both poles, is called the neutral point of the magnet itself — the net attracting force there is zero (not to be confused with the 'neutral point' in Earth's field, covered later).",
        "Magnetic poles always occur in pairs — an isolated magnetic monopole has never been observed. This is why Gauss's law for magnetism gives zero net flux through any closed surface: ∮B·dA = 0, however the surface is drawn.",
        "Coulomb's inverse-square law for poles only works between two long, well-separated bar magnets, since truly isolated point poles do not exist.",
      ],
    },
    {
      heading: "2. Magnetic Field Lines and the Bar Magnet as an Equivalent Solenoid",
      body:
        "A current-carrying solenoid produces exactly the same external field pattern as a bar magnet of the same dipole moment — which is why a solenoid is often pictured as a stack of atomic current loops, and a bar magnet's behaviour can be modelled by replacing it with an equivalent solenoid.",
      bullets: [
        "Magnetic field lines emerge from the north pole, curve around through the surrounding space, and re-enter at the south pole — but unlike electric field lines, they continue inside the magnet too, forming closed loops with no start or end point.",
        "Field lines never intersect (the field at any point has one unique direction); where lines are crowded the field is stronger, where they are sparse it is weaker.",
        "A solenoid's field outside is identical in shape to a bar magnet's field, with its two ends behaving like the magnet's two poles (Maxwell's right-hand rule gives the polarity from the current direction).",
        "This equivalence is the basis for treating a bar magnet's magnetic moment using the same M = NIA-style reasoning developed for current loops, and for picturing the bar magnet's internal atomic currents as the true source of its magnetism.",
      ],
    },
    {
      heading: "3. Magnetic Field Due to a Bar Magnet — Axial and Equatorial Points",
      body:
        "Just like an electric dipole, a bar magnet's field falls off differently along its axis than along its perpendicular bisector (the equatorial or 'broadside-on' line) — and the axial field is always exactly twice the equatorial field at the same distance, for points far from the magnet.",
      formula: [
        { label: "On the axis, far away (r ≫ l)", expression: "B_axial ≈ (μ₀/4π)·(2M/r³), along M" },
        { label: "On the equator, far away (r ≫ l)", expression: "B_eq ≈ (μ₀/4π)·(M/r³), opposite to M" },
        { label: "Exact axial expression", expression: "B_axial = (μ₀/4π)·2Mr/(r²−l²)²" },
        { label: "Exact equatorial expression", expression: "B_eq = (μ₀/4π)·M/(r²+l²)^(3/2)" },
      ],
      bullets: [
        "At equal distances from the centre, B_axial = 2B_eq — a direct consequence of the 1/r³ dipole field pattern, identical in form to the electric dipole result.",
        "On the axial line the field points in the same direction as M (along the magnet, from S to N side extended outward); on the equatorial line it points opposite to M.",
        "These formulas are the magnetic analogue of the electric dipole field results and underlie both the 'neutral point' calculations and Earth's dipole-field model used later in this chapter.",
      ],
    },
    {
      heading: "4. Torque, Potential Energy and Work Done — Dipole in a Uniform Field",
      body:
        "A magnetic dipole placed in a uniform external field experiences zero net force but a torque that tries to rotate it into alignment with the field — exactly the same physics already used for a current loop, now applied generally to any magnetic dipole including a bar magnet.",
      formula: [
        { label: "Torque", expression: "τ = M × B, magnitude τ = MB sinθ" },
        { label: "Potential energy", expression: "U = −M·B = −MB cosθ" },
        { label: "Work done rotating θ₁ → θ₂", expression: "W = MB(cosθ₁ − cosθ₂)" },
        { label: "Work done from alignment (0°) to angle θ", expression: "W_θ = MB(1 − cosθ) = 2MB sin²(θ/2)" },
      ],
      bullets: [
        "Torque is zero at θ = 0° or 180° (minimum) and maximum (= MB) at θ = 90°; it always acts to reduce θ, pulling M towards B.",
        "θ = 0° (M ∥ B): potential energy is minimum, U = −MB — stable equilibrium.",
        "θ = 180° (M antiparallel to B): potential energy is maximum, U = +MB — unstable equilibrium.",
        "θ = 90° (M ⊥ B): U = 0, and torque is simultaneously maximum — so this position has no equilibrium at all, despite zero potential energy.",
        "Work done in rotating the dipole against the field is stored entirely as potential energy — there's no other energy sink, since the net force on the dipole in a uniform field is always zero.",
      ],
    },
    {
      heading: "5. Geomagnetism: Geographic and Magnetic Axes of the Earth",
      body:
        "The Earth behaves approximately like a giant bar magnet whose magnetic axis is tilted with respect to its geographic (rotation) axis — which is precisely why a compass needle does not point exactly towards true geographic north.",
      formula: [{ label: "Tilt between geographic and magnetic axes", expression: "≈ 11.3°" }],
      bullets: [
        "Geographic axis: the line through the geographic (rotational) poles, about which the Earth spins.",
        "Geographic meridian: the vertical plane containing the geographic axis at a given place.",
        "Geographic equator: the great circle perpendicular to the geographic axis, equidistant from both geographic poles — it splits the Earth into northern and southern hemispheres.",
        "Magnetic axis: the line joining the Earth's two magnetic poles, inclined at about 11.3° to the geographic axis.",
        "Magnetic meridian: the vertical plane, at a given place, containing the axis of a freely suspended magnetic needle — equivalently, the plane containing all of Earth's field lines at that location.",
        "Magnetic equator: the great circle perpendicular to the magnetic axis, equidistant from the two magnetic poles.",
      ],
    },
    {
      heading: "6. Declination, Dip and the Components of Earth's Magnetic Field",
      body:
        "At any location, Earth's magnetic field is fully described by three measured quantities: the angle of declination, the angle of dip, and the horizontal component — together these are called the magnetic elements of that place.",
      formula: [
        { label: "Horizontal component", expression: "B_H = B cosθ" },
        { label: "Vertical component", expression: "B_V = B sinθ" },
        { label: "Resultant field", expression: "B = √(B_H² + B_V²)" },
        { label: "Relation between dip and components", expression: "tanθ = B_V/B_H" },
      ],
      bullets: [
        "Angle of declination (φ): the angle between the geographic meridian and the magnetic meridian at a place — equivalently, the angle between true north and the direction a compass needle actually points.",
        "Angle of dip (θ): the angle the Earth's resultant field (or a freely-pivoted needle, free to rotate vertically) makes with the horizontal, in the magnetic meridian.",
        "In the northern hemisphere the north pole of a freely suspended needle dips down towards the ground; in the southern hemisphere it's the south pole that dips down.",
        "At the magnetic poles, θ = 90°: B_H = 0 (minimum) and B_V = B (the field is purely vertical, fully 'dipping').",
        "At the magnetic equator, θ = 0°: B_H = B (maximum, fully horizontal) and B_V = 0.",
        "φ fixes the plane in which the field lies; θ together with B_H fixes its actual magnitude and direction within that plane — all three elements are needed to specify Earth's field completely at a point.",
        "Dip is measured using a dip circle, in which a magnetic needle pivots freely in a vertical plane about a horizontal axis, with its ends reading off a graduated vertical scale.",
      ],
    },
    {
      heading: "7. Apparent Dip",
      body:
        "If a dip circle is not set up exactly in the magnetic meridian, the needle reads a smaller, 'apparent' dip rather than the true dip — but the true dip can still be recovered using two readings taken in mutually perpendicular vertical planes.",
      formula: [
        { label: "Apparent dip at angle α to the meridian", expression: "tanθₐ = tanθ/cosα" },
        { label: "Apparent dip after rotating circle by 90°", expression: "tanθ'ₐ = tanθ/sinα" },
        { label: "Eliminating the unknown angle α", expression: "cot²θₐ + cot²θ'ₐ = cot²θ" },
      ],
      bullets: [
        "Off the meridian, only the component B_H cosα of the horizontal field acts effectively in the dip circle's plane, which is why the apparent dip is always ≥ the true dip (cosα ≤ 1 makes tanθₐ ≥ tanθ).",
        "Taking two readings 90° apart and combining them via the cot² relation gives the true dip θ without ever needing to locate the magnetic meridian directly.",
      ],
    },
    {
      heading: "8. Tangent Galvanometer",
      body:
        "A tangent galvanometer is a moving-magnet-type instrument for measuring small direct currents, working on the principle that a small compass needle settles along the resultant of two mutually perpendicular fields according to the tangent law.",
      formula: [
        { label: "Field at the centre of the coil", expression: "B₀ = μ₀NI/(2R)" },
        { label: "Tangent law balance condition", expression: "B₀ = B_H tanθ" },
        { label: "Current in terms of deflection", expression: "I = K tanθ, where K = 2RB_H/(μ₀N)" },
      ],
      bullets: [
        "The coil (N turns, radius R) is set up in the magnetic meridian so that the field B₀ it produces at the centre is perpendicular to B_H; the compass needle at the centre then aligns along the resultant of the two crossed fields.",
        "K is the reduction factor of the instrument — numerically, it equals the current that would produce a 45° deflection (since tan45° = 1).",
        "Current is proportional to tanθ, not θ itself — so the scale is non-linear, and the instrument's sensitivity (dI/dθ) is best (and accuracy is maximum) near θ = 45°, where tanθ changes most slowly with small errors in θ.",
      ],
    },
    {
      heading: "9. Vibration (Oscillation) Magnetometer",
      body:
        "A vibration magnetometer uses the angular oscillation of a freely suspended bar magnet in Earth's horizontal field to compare magnetic moments of magnets, or to compare Earth's field strength at two different places.",
      formula: [
        { label: "Restoring torque for small angular displacement θ", expression: "τ = −MB_H θ (using sinθ ≈ θ)" },
        { label: "Angular SHM frequency", expression: "ω = √(MB_H/I)" },
        { label: "Time period", expression: "T = 2π√(I/(MB_H))" },
      ],
      bullets: [
        "I here is the moment of inertia of the suspended magnet about its own (geomagnetic) axis of rotation — not the current.",
        "A small angular displacement from equilibrium produces a restoring torque proportional to −θ, so the magnet executes angular SHM exactly like a torsion pendulum.",
        "Increasing M or B_H makes the oscillation faster (smaller T); increasing the moment of inertia I makes it slower (larger T).",
      ],
    },
    {
      heading: "10. Comparing Magnetic Moments and Earth's Field Using a Magnetometer",
      body:
        "The same T = 2π√(I/MB_H) relation, applied cleverly to pairs of magnets or pairs of locations, lets a vibration magnetometer compare magnetic moments of two magnets, or Earth's horizontal field at two different places, without measuring M, I or B_H individually.",
      formula: [
        { label: "Same-size magnets, ratio of moments", expression: "M₁/M₂ = T₂²/T₁²" },
        { label: "Sum combination (like poles together)", expression: "T₁ = 2π√[(I₁+I₂)/((M₁+M₂)B_H)]" },
        { label: "Difference combination (unlike poles together)", expression: "T₂ = 2π√[(I₁+I₂)/((M₁−M₂)B_H)]" },
        { label: "Ratio from sum/difference method", expression: "T₁/T₂ = √[(M₁−M₂)/(M₁+M₂)]" },
        { label: "Comparing Earth's field at two places", expression: "B_H1/B_H2 = (T₂/T₁)² = (T₂²cosθ₁)/(T₁²cosθ₂)" },
      ],
      bullets: [
        "For two magnets of identical size and moment of inertia, simply timing their oscillation periods one at a time gives the ratio of their magnetic moments directly from T₁/T₂.",
        "For magnets of different sizes, the 'sum' combination (stacked with like poles together, net moment M₁+M₂) and the 'difference' combination (unlike poles together, net moment M₁−M₂) give two periods whose ratio yields M₁/M₂ even though I₁, I₂ are unknown and different.",
        "To compare Earth's field at two places, the same magnet (same M, I) is vibrated at each location in turn; since T² ∝ 1/B_H, the ratio of periods squared (with a dip-angle correction if the locations have different dip) gives the ratio of horizontal fields.",
      ],
    },
    {
      heading: "11. Neutral Points",
      body:
        "A neutral point is a location where the magnetic field of a bar magnet exactly cancels Earth's horizontal field, B_H — at that point a compass needle feels no net horizontal force and can point in any direction.",
      formula: [
        { label: "N-pole pointing north — neutral points on equatorial line", expression: "(μ₀/4π)·M/y³ = B_H" },
        { label: "S-pole pointing north — neutral points on axial line", expression: "(μ₀/4π)·2M/x³ = B_H" },
      ],
      bullets: [
        "When the magnet's north pole faces geographic north, its equatorial field (which points opposite to M, i.e. southward) can exactly cancel the northward B_H — giving two neutral points symmetrically placed on the equatorial line, east and west of the magnet's centre.",
        "When the magnet's south pole faces geographic north, its axial field now points in the right sense to cancel B_H, giving two neutral points on the axial line instead, north and south of the centre.",
        "Both formulas assume the neutral point is far from the magnet (distance ≫ magnet's effective length), so the far-field 1/r³ axial/equatorial expressions from Section 3 apply directly.",
      ],
    },
    {
      heading: "12. Magnetising Field, Intensity of Magnetisation and Susceptibility",
      body:
        "To describe how a material responds when placed inside a magnetic field, three related quantities are defined: the magnetising field that's applied, the magnetisation the material develops in response, and the susceptibility that links the two.",
      formula: [
        { label: "Magnetising field", expression: "H = B₀/μ₀ (unit: A/m)" },
        { label: "Intensity of magnetisation", expression: "I = M_dipole/V (unit: A/m)" },
        { label: "Magnetic susceptibility", expression: "χ = I/H (dimensionless)" },
      ],
      bullets: [
        "H is the field in which the material is placed for magnetisation — set by the external source (a solenoid or coil), independent of the material itself.",
        "I is the net induced dipole moment per unit volume that the material develops in response to H.",
        "χ is a pure number (no units, no dimensions) that measures how easily a material can be magnetised — larger χ means the material magnetises more readily in a given field.",
      ],
    },
    {
      heading: "13. Magnetic Permeability and the Relation Between μ and χ",
      body:
        "Permeability measures how much a material 'permits' magnetic field lines to pass through it compared to free space, and is directly related to susceptibility through one of this chapter's most quoted formulas.",
      formula: [
        { label: "Permeability", expression: "μ = B/H" },
        { label: "Relative permeability", expression: "μᵣ = μ/μ₀ (dimensionless)" },
        { label: "Total field inside the material", expression: "B = B₀ + B_induced = μ₀(H + I)" },
        { label: "Permeability–susceptibility relation", expression: "μ = μ₀(1 + χ) ⟺ μᵣ = 1 + χ" },
      ],
      bullets: [
        "B₀ = μ₀H is the field that would exist without the material; B_induced = μ₀I is the extra field contributed by the material's own induced magnetisation.",
        "For vacuum, χ = 0 and μᵣ = 1 exactly; for air at STP, χ ≈ 0.04, so μᵣ ≈ 1.04 — very close to vacuum, which is why air is usually treated as 'free space' in these calculations.",
        "μᵣ = 1 + χ is the single relation connecting every entry in the diamagnetic/paramagnetic/ferromagnetic classification table in the next section.",
      ],
    },
    {
      heading: "14. Classification of Magnetic Materials: Dia, Para and Ferromagnetic",
      body:
        "Faraday classified all materials into three groups, purely on the basis of how they respond to an external magnetic field — this response is rooted in whether their atoms have a permanent magnetic moment at all, and if so, how those moments interact with each other.",
      formula: [
        { label: "Diamagnetic", expression: "χ small & negative, μᵣ slightly < 1" },
        { label: "Paramagnetic", expression: "χ small & positive, 1 < μᵣ < 2 (typically)" },
        { label: "Ferromagnetic", expression: "χ very large & positive, μᵣ ≫ 1" },
      ],
      bullets: [
        "Diamagnetic materials (Bi, Cu, Ag, Pb, H₂O, Au, NaCl, diamond): atoms have no permanent magnetic moment; the field induces a weak moment opposite to itself (B_inside < B₀). They are repelled — pushed from stronger to weaker field — and a freely-suspended rod turns perpendicular to the field. χ is essentially temperature-independent.",
        "Paramagnetic materials (Na, K, Mg, Al, O₂, Pt): atoms have a permanent magnetic moment, but these are randomly oriented in the absence of a field. The field partially aligns them (B_inside slightly > B₀); they are weakly attracted towards stronger field regions, and χ ∝ 1/T (Curie's law) — thermal agitation fights against alignment, so susceptibility falls as temperature rises.",
        "Ferromagnetic materials (Fe, Co, Ni, their alloys, Fe₃O₄): atoms have permanent moments that are already organised into 'domains' even without an external field; an applied field aligns whole domains rather than individual atoms, producing very strong magnetisation (B_inside ≫ B₀). They are strongly attracted into stronger fields, and a weak field between magnet poles is enough to pull a suspended rod parallel to the field.",
        "Across the three groups, only ferromagnetic materials show hysteresis and domain structure; dia- and para-magnetism are both 'linear' responses (I ∝ H) while ferromagnetism is strongly non-linear.",
      ],
    },
    {
      heading: "15. Curie's Law, Curie–Weiss Law and Magnetic Hysteresis",
      body:
        "Temperature disrupts magnetic ordering in both paramagnetic and ferromagnetic materials, but in different ways — and ferromagnets carry an additional 'memory' effect, hysteresis, which has no counterpart in dia- or para-magnetism.",
      formula: [
        { label: "Curie's law (paramagnetic)", expression: "χ ∝ 1/T" },
        { label: "Curie–Weiss law (ferromagnetic, T > T_C)", expression: "χ ∝ 1/(T − T_C)" },
        { label: "Curie temperature of iron", expression: "T_C(Fe) = 770°C = 1043 K" },
        { label: "Energy lost per cycle per unit volume", expression: "= area of the B–H hysteresis loop" },
      ],
      bullets: [
        "Above its Curie temperature T_C, a ferromagnetic material loses its domain structure entirely and behaves as an ordinary paramagnet, following the Curie–Weiss law.",
        "Hysteresis: when H is taken from zero, up, and back to zero, B does not retrace the same curve — it 'lags behind' H, so some magnetism remains even after H = 0.",
        "Retentivity (or remanence): the residual field B_r left in the material when H is reduced to zero — a measure of how much magnetism the material retains on its own.",
        "Coercivity: the reverse magnetising field needed to bring the residual magnetism back down to zero — a measure of how hard it is to demagnetise the material.",
        "Total hysteresis loss per cycle = (volume) × (area of the B–H loop); this repeats every cycle, so total heat dissipated = volume × loop area × frequency × time.",
      ],
    },
    {
      heading: "16. Soft & Hard Magnetic Materials, Magnetic Shielding and Electromagnets",
      body:
        "Whether a ferromagnetic material is useful as a permanent magnet or as an electromagnet core depends entirely on where it sits on the retentivity–coercivity spectrum — and the same ferromagnetism that makes strong magnets possible also makes magnetic shielding possible.",
      bullets: [
        "Soft magnetic materials (e.g. soft iron): low retentivity, low coercivity, small hysteresis loss — magnetise and demagnetise easily, ideal for electromagnet cores, transformer cores, and magnetic shielding, where the field needs to switch on and off efficiently.",
        "Hard magnetic materials (e.g. steel, Alnico): high retentivity, high coercivity, large hysteresis loss — once magnetised they stay magnetised and resist demagnetisation, which is exactly what's needed for permanent magnets.",
        "Magnetic shielding: a soft-iron ring or case placed in an external field channels almost all the field lines through the iron itself, leaving the enclosed space nearly field-free — used to protect sensitive instruments (e.g. watches) from stray magnetic fields.",
        "Superconductors achieve an even more complete form of shielding — they expel magnetic field lines entirely from their interior (the Meissner effect) and behave like perfect diamagnets, with relative permeability of essentially zero.",
        "Electromagnet: a soft-iron core placed inside a current-carrying solenoid boosts the field hundreds of times over the solenoid alone; because soft iron loses its magnetism almost completely once the current stops, the device is only temporarily magnetic — used in electric bells, lifting cranes, and relays.",
      ],
    },
  ],
};
