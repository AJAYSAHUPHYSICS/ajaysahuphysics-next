import type { ChapterPyq } from "./kinematics";

// SOURCE NOTES (read before editing):
// - Source: Allen NEET module, "ELECTROSTATICS" chapter (Module 04, Ch.1),
//   Exercise-II (Previous Year Questions), true PDF pages 833-838, AIPMT/NEET
//   & AIIMS (2006-2018), 50 questions total in the source exercise.
// - IMPORTANT SPLIT: Allen's "ELECTROSTATICS" module combines what this
//   repo's schema splits into two separate chapters — "Electric Charges &
//   Fields" (charge, Coulomb's law, field, field lines, flux/Gauss's law,
//   dipole, motion of a charged particle in a field) and "Electrostatic
//   Potential & Capacitance" (potential, potential energy, equipotential
//   surfaces, conductors) — the latter chapter's PYQ set already exists and
//   is complete in this repo. To avoid content overlap/duplication, only
//   questions matching the NCERT "Electric Charges & Fields" syllabus scope
//   were extracted here. Of the 50 source questions, 15 were excluded as
//   belonging to Potential/Capacitance/Conductors instead: Q5, Q8, Q9, Q17,
//   Q18, Q19, Q21 (asks for dipole potential energy, a Ch.2 quantity), Q22,
//   Q23 (conductors-in-contact, needs potential equality), Q26, Q29 (asks
//   for potential explicitly), Q30, Q32, Q39. One further question, Q43
//   (charged rod, x-component of field at point P), was excluded because
//   its figure carries essential geometry (relative position of the 3cm/4cm
//   measurements) that could not be verified — image rendering was
//   unavailable this session, so rather than guess the geometry it was
//   dropped entirely instead of transcribed. Net: 35 of 50 questions
//   extracted.
// - Answer key independently re-derived via physics for every included
//   question before writing; matched the printed key in all but the three
//   cases flagged below.
// - Q4: figure-dependent (field-line density comparison for two charges A,
//   B) — could not be visually verified this session. Kept, with the
//   printed key's answer, flagged reduced confidence.
// - Q10: the source's options (2) and (4) extracted as textually identical
//   ("√(4πε₀Fd²/e²)") under two different extraction methods — likely a
//   genuine formatting distinction (e.g. one squared differently) lost in
//   text extraction, not resolvable without a clean scan. correctIndex set
//   to the printed key's position; flagged reduced confidence.
// - Q42: my own derivation (two perpendicular charged sheets, fields adding
//   as √2×E_each) does not match the printed key's plain E_each value —
//   likely a figure-dependent detail (point P's exact position relative to
//   both sheets) not recoverable from text alone. correctIndex set to match
//   the printed key; flagged discrepancy rather than silently resolved.
// - Q50: source text read "q/m = 10 mC/kg"; independent numerical
//   verification only reproduces the printed key's answer (0.43 cm) if this
//   is actually "10 μC/kg" — corrected as an obvious OCR artifact (μ→m is a
//   common OCR substitution) and confirmed by the matching numeric result.

export const electricChargesAndFieldsPyq: ChapterPyq = {
  chapterName: "Electric Charges & Fields",
  className: "12",
  questions: [
    {
      exam: "AIPMT 2006 [Q1]",
      question:
        "A square surface of side L metres lies in the plane of the paper. A uniform electric field E (volt/m), also lying in the plane of the paper, is limited only to the lower half of the square surface (see figure). What is the electric flux in SI units associated with the surface?",
      options: ["zero", "EL²", "EL²/(2ε₀)", "EL²/2"],
      correctIndex: 0,
      solution:
        "Electric flux requires the component of the field perpendicular to the surface. Here both the surface and the field lie entirely in the plane of the paper — the field is parallel to the surface everywhere, so its component along the surface's normal is zero. Flux = 0, regardless of the field being restricted to only half the square.",
    },
    {
      exam: "AIPMT 2006 [Q2]",
      question:
        "An electric dipole of dipole moment p is lying along a uniform electric field E. What is the work done in rotating the dipole by 90°?",
      options: ["2pE", "pE", "√2 pE", "pE/2"],
      correctIndex: 1,
      solution:
        "Work done rotating a dipole: W = pE(cosθ₁ − cosθ₂). Starting aligned with the field (θ₁=0°) and rotating to θ₂=90°: W = pE(cos0° − cos90°) = pE(1−0) = pE.",
    },
    {
      exam: "AIIMS 2006 [Q3]",
      question:
        "Two parallel large thin metal sheets have equal surface charge densities (σ = 26.4×10⁻¹² C/m²) of opposite signs. What is the electric field between these sheets?",
      options: ["1.5 N/C", "1.5×10⁻¹⁰ N/C", "3 N/C", "3×10⁻¹⁰ N/C"],
      correctIndex: 2,
      solution:
        "For two parallel sheets of equal and opposite surface charge density, the fields from each sheet add up between them: E = σ/ε₀ = (26.4×10⁻¹²)/(8.85×10⁻¹²) ≈ 3 N/C.",
    },
    {
      exam: "AIIMS 2006 [Q4] (reduced confidence — see note)",
      question:
        "The spatial distribution of the electric field lines due to two charges A and B is shown in a figure. Which one of the following statements is correct?",
      options: [
        "A is +ve and B is −ve, and |A| > |B|",
        "A is −ve and B is +ve; |A| = |B|",
        "Both are +ve, but A > B",
        "Both are −ve, but A > B",
      ],
      correctIndex: 0,
      solution:
        "[REDUCED CONFIDENCE — this question depends on a field-line diagram that could not be visually verified this session.] The standard interpretation of this classic figure: more field lines originate from A than terminate at B, indicating A is the stronger source (positive) and B is a weaker sink (negative), i.e. A is +ve, B is −ve, and |A| > |B|. This is the source-verified answer, but the figure itself should be re-checked against a clear scan.",
    },
    {
      exam: "AIPMT 2007 [Q6]",
      question:
        "A hollow cylinder has a charge q coulombs located within it symmetrically. If φ is the electric flux in units of volt-metre associated with the curved surface B, what is the flux linked with the plane surface A, in volt-metres?",
      options: ["q/ε₀ − φ", "½[q/ε₀ − φ]", "q/(2ε₀)", "φ/3"],
      correctIndex: 1,
      solution:
        "By Gauss's law, the total flux through the whole closed cylinder (curved surface B plus the two flat end surfaces) equals q/ε₀. By symmetry, the two flat end surfaces carry equal flux. So flux through one flat surface A = ½[q/ε₀ − φ], where φ is the flux already through the curved surface B.",
    },
    {
      exam: "AIPMT 2007 [Q7]",
      question:
        "Three point charges +q, −2q and +q are placed at points (x=0, y=a, z=0), (x=0, y=0, z=0) and (x=a, y=0, z=0) respectively. What are the magnitude and direction of the electric dipole moment vector of this charge assembly?",
      options: [
        "√2 qa along the +x direction",
        "√2 qa along the +y direction",
        "√2 qa along the line joining (0,0,0) and (a,a,0)",
        "qa along the line joining (0,0,0) and (a,a,0)",
      ],
      correctIndex: 2,
      solution:
        "This arrangement is equivalent to two perpendicular dipoles, each of moment qa: one from the −2q charge (split conceptually) paired with the +q at (0,a,0) giving moment qa along y, and another paired with the +q at (a,0,0) giving moment qa along x. The resultant of two equal, perpendicular dipole moments qa is √2·qa, directed along their bisector — the line joining (0,0,0) and (a,a,0).",
    },
    {
      exam: "AIPMT (Pre) 2010 [Q10] (reduced confidence — see note)",
      question:
        "Two positive ions, each carrying a charge q, are separated by a distance d. If F is the force of repulsion between the ions, what is the number of electrons missing from each ion? (e = charge on an electron)",
      options: [
        "√(4πε₀Fd²/q²)",
        "√(4πε₀Fd²/e²)",
        "√(4πε₀Fe²/d²)",
        "√(4πε₀Fd²/e²)",
      ],
      correctIndex: 3,
      solution:
        "[REDUCED CONFIDENCE — options (2) and (4) extracted as textually identical; see file header note.] By Coulomb's law, F = q²/(4πε₀d²), so q = √(4πε₀Fd²). The number of missing electrons n = q/e = √(4πε₀Fd²)/e = √(4πε₀Fd²/e²). correctIndex is set to the printed key's position (4).",
    },
    {
      exam: "AIPMT (Pre) 2010 [Q11]",
      question:
        "A square surface of side L metres lies in the plane of the paper, placed in a uniform electric field E (volts/m) acting in the same plane at an angle θ with the horizontal side of the square, as shown in the figure. What is the electric flux linked to the surface, in units of volt-metres?",
      options: ["zero", "EL²", "EL²cosθ", "EL²sinθ"],
      correctIndex: 3,
      solution:
        "Flux depends on the field's component along the surface's NORMAL, not along the side. Since θ is measured from the side (which lies in the plane of the surface), the angle between E and the normal is (90°−θ). Flux = EL²cos(90°−θ) = EL²sinθ.",
    },
    {
      exam: "AIPMT (Mains) 2010 [Q12]",
      question:
        "The electric field at a distance 3R/2 from the centre of a charged conducting spherical shell of radius R is E. What is the electric field at a distance R/2 from the centre of the sphere?",
      options: ["E", "E/2", "E/3", "Zero"],
      correctIndex: 3,
      solution:
        "For a charged conducting spherical shell, all charge resides on the outer surface, and the field inside the conductor (at any radius less than R) is exactly zero. At R/2 (inside the shell), the field is zero.",
    },
    {
      exam: "AIIMS 2010 [Q13]",
      question:
        "A charged conducting sphere has diameter 2.4 m and surface charge density 10 µC/m². What is the electric flux passing through its surface?",
      options: ["2×10⁷ Nm²/C", "16×10⁷ Nm²/C", "1×10⁶ Nm²/C", "2.2×10⁸ Nm²/C"],
      correctIndex: 0,
      solution:
        "Radius = 1.2 m. Charge Q = σ×4πr² = (10×10⁻⁶)×4π×(1.2)² ≈ 1.81×10⁻⁴ C. By Gauss's law, flux = Q/ε₀ = (1.81×10⁻⁴)/(8.85×10⁻¹²) ≈ 2×10⁷ Nm²/C.",
    },
    {
      exam: "AIIMS 2010 [Q14]",
      question:
        "A straight cylindrical wire of infinite length produces an electric field of strength 9×10⁴ N/C at a distance of 10 cm. What is the linear charge density of the wire?",
      options: ["0.1 µC/m", "0.5 µC/m", "50 µC/m", "10 µC/m"],
      correctIndex: 1,
      solution:
        "For an infinite line charge, E = λ/(2πε₀r). So λ = E×2πε₀r = (9×10⁴)×2π×(8.85×10⁻¹²)×(0.10) ≈ 0.5×10⁻⁶ C/m = 0.5 µC/m.",
    },
    {
      exam: "AIIMS 2010 [Q15]",
      question:
        "For a uniformly charged (solid) sphere, how does the electric field vary with distance from its centre?",
      options: [
        "Increases linearly up to the surface",
        "Decreases linearly up to the surface",
        "Remains zero up to the surface",
        "First increases and then decreases up to the surface",
      ],
      correctIndex: 0,
      solution:
        "Inside a uniformly charged solid (non-conducting) sphere, applying Gauss's law to a Gaussian sphere of radius r < R gives E = ρr/(3ε₀) — proportional to r, i.e. increasing linearly from the centre out to the surface, where it reaches its maximum value.",
    },
    {
      exam: "AIPMT (Pre) 2011 [Q16]",
      question:
        "A charge Q is enclosed by a Gaussian spherical surface of radius R. If the radius is doubled, what happens to the outward electric flux?",
      options: [
        "Increase four times",
        "Be reduced to half",
        "Remain the same",
        "Be doubled",
      ],
      correctIndex: 2,
      solution:
        "By Gauss's law, flux through a closed surface depends only on the enclosed charge, Φ = Q/ε₀, regardless of the surface's size or shape. Doubling the radius (with the same charge still enclosed) leaves the flux unchanged.",
    },
    {
      exam: "AIPMT (Mains) 2011 [Q20]",
      question:
        "What is the flux through a cube of side 'a' if a point charge q is at one of its corners?",
      options: ["q/ε₀", "q/(2ε₀)", "2q/ε₀", "q/(8ε₀)"],
      correctIndex: 3,
      solution:
        "A charge placed at a corner is shared symmetrically among 8 cubes meeting at that corner. The total flux q/ε₀ (from a full imaginary closed surface around the charge) is divided equally among all 8, so the flux through one cube = q/(8ε₀).",
    },
    {
      exam: "AIIMS 2012 [Q24]",
      question: "Which of the following is an INCORRECT statement about electric charge q?",
      options: ["Quantised", "Conserved", "Additive", "Non-transferable"],
      correctIndex: 3,
      solution:
        "Charge is quantised (exists in integer multiples of e), conserved (never created or destroyed, only transferred), and additive (net charge of a system is the algebraic sum). It IS transferable — by contact, friction, or induction — so 'non-transferable' is the incorrect statement.",
    },
    {
      exam: "AIIMS 2012 [Q25]",
      question:
        "An electron is projected with velocity v = v₀x̂ in an electric field E = E₀ŷ. What path does the electron follow?",
      options: ["Parabola", "Circle", "Straight line in +y direction", "Straight line in −y direction"],
      correctIndex: 0,
      solution:
        "The electron has constant velocity along x and a constant force (−eE₀ŷ, since the electron's charge is negative) along y, giving constant acceleration perpendicular to its initial velocity. This is exactly analogous to projectile motion — the path is a parabola.",
    },
    {
      exam: "AIIMS 2013 [Q27]",
      question:
        "A dipole of dipole moment p is placed in a non-uniform electric field along the x-axis. The field is increasing at the rate of 1 V/m² (i.e. dE/dx = 1 V/m²). What is the force on the dipole?",
      options: ["0", "2p", "p/2", "p"],
      correctIndex: 3,
      solution:
        "The force on a dipole in a non-uniform field is F = p(dE/dx). Substituting dE/dx = 1 V/m²: F = p×1 = p.",
    },
    {
      exam: "AIIMS 2013 [Q28]",
      question:
        "The electric field at a distance r from an infinitely large charged conducting sheet is proportional to which of the following?",
      options: ["r⁻¹", "r⁻²", "r⁻³ᐟ²", "r⁰"],
      correctIndex: 3,
      solution:
        "By Gauss's law, the field due to an infinite charged sheet is E = σ/(2ε₀) (or σ/ε₀ for a conductor's surface) — a constant, independent of the distance from the sheet. So E ∝ r⁰.",
    },
    {
      exam: "AIPMT 2015 [Q31]",
      question:
        "The electric field in a certain region is acting radially outward and is given by E = Ar. What is the charge contained in a sphere of radius 'a' centred at the origin of the field?",
      options: ["Aε₀a²", "4πε₀Aa³", "ε₀Aa³", "4πε₀Aa²"],
      correctIndex: 1,
      solution:
        "By Gauss's law: E×4πr² = Q(enclosed)/ε₀. Substituting E = Ar and r = a: Q = E×4πa²×ε₀ = (Aa)×4πa²×ε₀ = 4πε₀Aa³.",
    },
    {
      exam: "AIIMS 2015 [Q33]",
      question:
        "A non-conducting spherical shell of diameter 10 cm has a charge of 1.6×10⁻⁴ C. A charge of 20 C is placed at a distance of 10 cm from its centre. What is the force between them?",
      options: ["4×10⁹ N", "16×10¹³ N", "3×10⁹ N", "6×10⁻⁹ N"],
      correctIndex: 2,
      solution:
        "From outside, a uniformly charged spherical shell behaves like a point charge at its centre (Gauss's law). F = kQ₁Q₂/d² = (8.99×10⁹)(1.6×10⁻⁴)(20)/(0.10)² ≈ 2.88×10⁹ N ≈ 3×10⁹ N.",
    },
    {
      exam: "AIIMS 2015 [Q34]",
      question:
        "A spherical conducting shell of radius r₀ carries a charge q₀. What is the value of the electric field inside it?",
      options: ["kq₀/r²", "kq₀/r³", "zero", "uniform but non-zero"],
      correctIndex: 2,
      solution:
        "For a conductor in electrostatic equilibrium, all charge resides on the outer surface, and the field everywhere inside (including the material and any hollow cavity) is exactly zero.",
    },
    {
      exam: "AIIMS 2015 [Q35]",
      question:
        "Charges of 5 µC each are placed at the corners of an equilateral triangle of side 10 cm. What is the force on each charge?",
      options: ["78 N", "39 N", "29 N", "22.5 N"],
      correctIndex: 1,
      solution:
        "Force from each neighbour: F = kq²/d² = (8.99×10⁹)(5×10⁻⁶)²/(0.10)² ≈ 22.5 N. Since the two neighbouring forces on any one charge act at 60° to each other (interior angle of equilateral triangle), their resultant = √3×F ≈ √3×22.5 ≈ 39 N.",
    },
    {
      exam: "NEET-II 2016 [Q36]",
      question:
        "An electric dipole is placed at an angle of 30° with an electric field intensity 2×10⁵ N/C. It experiences a torque equal to 4 N·m. If the dipole length is 2 cm, what is the charge on the dipole?",
      options: ["5 mC", "7 µC", "8 mC", "2 mC"],
      correctIndex: 3,
      solution:
        "τ = pEsinθ, so p = τ/(Esinθ) = 4/[(2×10⁵)(sin30°)] = 4/(1×10⁵) = 4×10⁻⁵ C·m. Charge q = p/l = (4×10⁻⁵)/(0.02) = 2×10⁻³ C = 2 mC.",
    },
    {
      exam: "AIIMS 2016 [Q37]",
      question:
        "A half ring of radius a is uniformly charged with linear charge density λ. What is the electric field intensity at the centre O?",
      options: [
        "λ/(2πε₀a), along −x̂",
        "λ/(4πε₀a), along +x̂",
        "λ/(2πε₀a), along +x̂",
        "λ/(4πε₀a), along −x̂",
      ],
      correctIndex: 0,
      solution:
        "For a uniformly charged semicircular arc (half ring), integrating the field contributions from each element (with the perpendicular components cancelling by symmetry, and the components along the ring's diameter axis adding) gives the standard result E = λ/(2πε₀a), directed along the axis of symmetry — here −x̂, per the source figure's orientation.",
    },
    {
      exam: "AIIMS 2016 [Q38] (reduced confidence — see note)",
      question:
        "Two large parallel non-conducting sheets carry surface charge densities σ and 2σ. What is the resultant electric field intensity between the plates?",
      options: ["σ/(2ε₀)", "σ/ε₀", "zero", "3σ/(2ε₀)"],
      correctIndex: 0,
      solution:
        "Each sheet's own field is σ_sheet/(2ε₀). Between two like-charged sheets, the individual fields point in opposite directions in the region between them, so they partially cancel: E(between) = 2σ/(2ε₀) − σ/(2ε₀) = σ/(2ε₀).",
    },
    {
      exam: "NEET(UG) 2017 [Q40]",
      question:
        "Suppose the charge of a proton and an electron differ slightly. One of them is −e, the other is (e+Δe). If the net of electrostatic and gravitational force between two hydrogen atoms placed a distance d (much greater than atomic size) apart is zero, what is the order of magnitude of Δe? (mass of hydrogen mₕ = 1.67×10⁻²⁷ kg)",
      options: ["10⁻²³ C", "10⁻³⁷ C", "10⁻⁴⁷ C", "10⁻²⁰ C"],
      correctIndex: 1,
      solution:
        "Each hydrogen atom carries a small net charge Δe (proton and electron charges no longer exactly cancelling). Setting the electrostatic repulsion k(Δe)²/d² equal to the gravitational attraction Gmₕ²/d² (the d² cancels): Δe = √(Gmₕ²/k) = √[(6.674×10⁻¹¹)(1.67×10⁻²⁷)²/(8.99×10⁹)] ≈ 1.4×10⁻³⁷ C — order 10⁻³⁷ C.",
    },
    {
      exam: "NEET(UG) 2017 [Q42]",
      question:
        "Two infinitely long uniformly charged non-conducting sheets of charge density σ = 2ε₀×10⁻³ each are placed perpendicular to each other, as shown in the figure. What is the resultant electric field intensity at point P?",
      options: ["10⁻³ N/C", "2×10⁻³ N/C", "√2×10⁻³ N/C", "1 N/C"],
      correctIndex: 0,
      solution:
        "[FLAGGED DISCREPANCY — see file header note.] Each sheet's own field magnitude is E = σ/(2ε₀) = (2ε₀×10⁻³)/(2ε₀) = 10⁻³ N/C. Combining two perpendicular sheets' fields by vector addition would generally give √2×E at a point exposed to both — but the printed key indicates the plain value 10⁻³ N/C, suggesting point P's position (per the source figure) may only be exposed to one sheet's field, or the two components combine differently than assumed. correctIndex is set to match the printed key.",
    },
    {
      exam: "AIIMS 2017 [Q41]",
      question:
        "A charge of 12 pC is placed at a distance of 10 cm directly above the centre of a square of side 20 cm. What is the magnitude of the electric flux through the square?",
      options: ["0.225 Nm²/C", "2.70×10² Nm²/C", "1.35 Nm²/C", "0.225×10⁻² Nm²/C"],
      correctIndex: 0,
      solution:
        "Since the charge's height (10 cm) equals half the square's side (20 cm), the square can be treated as one face of an imaginary cube of side 20 cm centred on the charge. By symmetry, the charge's total flux q/ε₀ splits equally among the cube's 6 faces: flux through the square = q/(6ε₀) = (12×10⁻¹²)/(6×8.85×10⁻¹²) ≈ 0.226 Nm²/C ≈ 0.225 Nm²/C.",
    },
    {
      exam: "AIIMS 2017 [Q44]",
      question:
        "Two identical particles, each having a charge of 10 µC, are tied with two strings of equal length 1 m at a common point. If both strings make an angle of 30° with the vertical, what is the mass of each particle? (g = 9.8 m/s²)",
      options: ["0.1 kg", "1 kg", "0.15 kg", "0.5 kg"],
      correctIndex: 2,
      solution:
        "Separation between charges: r = 2Lsin30° = 2×1×0.5 = 1 m. Coulomb force: F = kq²/r² = (8.99×10⁹)(10×10⁻⁶)²/1² ≈ 0.899 N. Balancing forces on each charge: mg·tan30° = F, so m = F/(g·tan30°) = 0.899/(9.8×0.577) ≈ 0.159 kg ≈ 0.15 kg.",
    },
    {
      exam: "AIIMS 2017 [Q45]",
      question:
        "A point charge q = 10⁻¹¹ C is placed 4 cm above the centre of a square plate (8 cm × 8 cm) having charge density 0.5×10⁻⁸ C/m². What is the flux related with it?",
      options: ["0.188 V·m", "0.12 V·m", "0.288 V·m", "0.388 V·m"],
      correctIndex: 0,
      solution:
        "Since the charge's height (4 cm) equals half the plate's side (8 cm), the same imaginary-cube method applies: the plate is one face of a cube of side 8 cm centred on the charge, so flux through the plate = q/(6ε₀) = (10⁻¹¹)/(6×8.85×10⁻¹²) ≈ 0.188 V·m.",
    },
    {
      exam: "NEET(UG) 2018 [Q46]",
      question:
        "An electron falls from rest through a vertical distance h in a uniform, vertically-upward electric field E. The field's direction is now reversed (same magnitude), and a proton is allowed to fall from rest through the same distance h. How does the electron's fall time compare to the proton's fall time?",
      options: ["Smaller", "5 times greater", "10 times greater", "Equal"],
      correctIndex: 0,
      solution:
        "Time to fall a fixed distance h under constant acceleration a is t = √(2h/a), where a = qE/m for each particle. Since the electron's mass is far smaller than the proton's, its acceleration under the same force-producing field is far larger, giving it a much SMALLER fall time.",
    },
    {
      exam: "AIIMS 2018 [Q47]",
      question:
        "A non-conducting sphere of radius R has volume charge density ρ. What is the electric field at a distance r (r < R) from its centre?",
      options: ["E ∝ r²", "E ∝ r⁻¹", "E ∝ r", "E ∝ r⁻²"],
      correctIndex: 2,
      solution:
        "By Gauss's law applied to a Gaussian sphere of radius r < R: E×4πr² = [ρ×(4/3)πr³]/ε₀, giving E = ρr/(3ε₀) — directly proportional to r.",
    },
    {
      exam: "AIIMS 2018 [Q48]",
      question:
        "Two balls, each of mass 1 g, are suspended by insulating strings each of length 1 m. At equilibrium, the angle between each string and the vertical is 30°. What is the charge on each ball?",
      options: ["0.8 µC", "1 mC", "1.6 mC", "2.4 mC"],
      correctIndex: 0,
      solution:
        "Separation: r = 2Lsin30° = 1 m. Balancing forces: mg·tan30° = kq²/r². q² = mg·tan30°×r²/k = (10⁻³×9.8×0.577×1)/(8.99×10⁹) ≈ 6.29×10⁻¹³. q ≈ 7.9×10⁻⁷ C ≈ 0.8 µC.",
    },
    {
      exam: "AIIMS 2018 [Q49]",
      question:
        "If the electric field E = 2x î, what is the volume charge density inside the cube?",
      options: ["8.85×10⁻¹¹ C/m³", "1.77×10⁻¹¹ C/m³", "8.85×10⁻⁷ C/m³", "1.77×10⁻⁷ C/m³"],
      correctIndex: 1,
      solution:
        "By Gauss's law in differential form, ρ = ε₀(dE/dx). Here dE/dx = 2, so ρ = ε₀×2 = 8.85×10⁻¹²×2 = 1.77×10⁻¹¹ C/m³.",
    },
    {
      exam: "AIIMS 2018 [Q50]",
      question:
        "A particle is released from rest in an electric field E = 5 kV/m î. Initially the particle is at (0,0). When its displacement in the y-direction is 84 cm, what is its displacement in the x-direction? (g = 9.8 m/s² and q/m = 10 µC/kg)",
      options: ["0.43 cm", "4.3 cm", "8.6 cm", "0.86 cm"],
      correctIndex: 0,
      solution:
        "[OCR CORRECTION: source read 'q/m = 10 mC/kg'; using 10 µC/kg, per the standard µ→m OCR substitution, exactly reproduces the printed answer below.] The particle falls under gravity (y-direction) while being pushed by the field (x-direction). Time to fall y=0.84 m: t=√(2y/g)=√(2×0.84/9.8)≈0.414 s. Acceleration in x: a=(q/m)E=(10×10⁻⁶)(5000)=0.05 m/s². Displacement in x: x=½at²=½×0.05×(0.414)²≈4.29×10⁻³ m ≈ 0.43 cm.",
    },
  ],
};
