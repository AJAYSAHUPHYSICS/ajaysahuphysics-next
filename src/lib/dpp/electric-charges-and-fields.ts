import type { ChapterDpp } from "./kinematics";

export const electricChargesAndFieldsDpp: ChapterDpp = {
  chapterName: "Electric Charges & Fields",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "Two point charges of +4 μC and +9 μC are placed 0.3 m apart in air. Find the electrostatic force between them. (k = 9 × 10⁹ N·m²/C²)",
      options: ["3.6 N", "1.8 N", "7.2 N", "0.36 N"],
      correctIndex: 0,
      solution:
        "F = kq₁q₂/r² = (9×10⁹ × 4×10⁻⁶ × 9×10⁻⁶)/(0.3)² = (9×10⁹ × 36×10⁻¹²)/0.09 = 0.324/0.09 = 3.6 N.",
    },
    {
      number: 2,
      question: "How many electrons must be removed from a neutral conductor to give it a charge of +1.6 μC?",
      options: ["1 × 10¹³", "1 × 10¹²", "1 × 10¹⁴", "1 × 10¹⁹"],
      correctIndex: 0,
      solution: "n = Q/e = (1.6×10⁻⁶)/(1.6×10⁻¹⁹) = 1 × 10¹³ electrons.",
    },
    {
      number: 3,
      question:
        "Point charges +Q and +4Q are fixed at the two ends of a line of length d. At what distance from the +Q charge should a third charge be placed (on the line, between them) so that the net force on it is zero?",
      options: ["d/3", "d/2", "d/4", "2d/3"],
      correctIndex: 0,
      solution:
        "For zero net force, x/(d−x) = √(Q/4Q) = 1/2 ⟹ 2x = d − x ⟹ 3x = d ⟹ x = d/3 from the +Q charge.",
    },
    {
      number: 4,
      question: "Find the electric field intensity at a point 0.3 m from a point charge of 5 μC. (k = 9 × 10⁹ N·m²/C²)",
      options: ["5 × 10⁵ N/C", "2.5 × 10⁵ N/C", "1 × 10⁵ N/C", "1 × 10⁶ N/C"],
      correctIndex: 0,
      solution: "E = kq/r² = (9×10⁹ × 5×10⁻⁶)/(0.3)² = 45000/0.09 = 5 × 10⁵ N/C.",
    },
    {
      number: 5,
      question:
        "A uniformly charged ring of radius 3 cm carries a charge of 1.25 nC. Find the electric field on its axis at a distance of 4 cm from the centre. (k = 9 × 10⁹ N·m²/C²)",
      options: ["3.6 × 10³ N/C", "1.8 × 10³ N/C", "7.2 × 10³ N/C", "9 × 10³ N/C"],
      correctIndex: 0,
      solution:
        "E = kQx/(R²+x²)^(3/2). R = 0.03 m, x = 0.04 m ⟹ R²+x² = 0.0025, so (R²+x²)^(3/2) = (0.05)³ = 1.25×10⁻⁴. E = (9×10⁹ × 1.25×10⁻⁹ × 0.04)/(1.25×10⁻⁴) = 0.45/1.25×10⁻⁴ = 3.6 × 10³ N/C.",
    },
    {
      number: 6,
      question:
        "A closed surface encloses a net charge of 4.425 × 10⁻⁹ C. Find the total electric flux through the surface. (ε₀ = 8.85 × 10⁻¹² C²/N·m²)",
      options: ["500 N·m²/C", "250 N·m²/C", "1000 N·m²/C", "5000 N·m²/C"],
      correctIndex: 0,
      solution: "Φ = q/ε₀ = (4.425×10⁻⁹)/(8.85×10⁻¹²) = 500 N·m²/C.",
    },
    {
      number: 7,
      question:
        "A charged conducting sphere has a uniform surface charge density of 8.85 × 10⁻⁸ C/m². Find the electric field just outside its surface. (ε₀ = 8.85 × 10⁻¹² C²/N·m²)",
      options: ["1 × 10⁴ N/C", "2 × 10⁴ N/C", "5 × 10³ N/C", "1 × 10⁵ N/C"],
      correctIndex: 0,
      solution: "E = σ/ε₀ = (8.85×10⁻⁸)/(8.85×10⁻¹²) = 1 × 10⁴ N/C.",
    },
    {
      number: 8,
      question:
        "A uniformly charged non-conducting sphere of radius 10 cm carries a total charge of 1 nC. Find the electric field at a point 5 cm from its centre (inside the sphere). (k = 9 × 10⁹ N·m²/C²)",
      options: ["450 N/C", "900 N/C", "225 N/C", "1800 N/C"],
      correctIndex: 0,
      solution:
        "Inside a uniformly charged sphere: E = kQr/R³ = (9×10⁹ × 1×10⁻⁹ × 0.05)/(0.1)³ = (9 × 0.05)/0.001 = 0.45/0.001 = 450 N/C.",
    },
    {
      number: 9,
      question:
        "An infinitely long straight wire carries a uniform linear charge density of 2 × 10⁻⁶ C/m. Find the electric field at a perpendicular distance of 0.6 m from the wire. (k = 9 × 10⁹ N·m²/C²)",
      options: ["1.2 × 10⁵ N/C", "6 × 10⁴ N/C", "2.4 × 10⁵ N/C", "6 × 10⁵ N/C"],
      correctIndex: 0,
      solution: "E = 2kλ/r = (2 × 9×10⁹ × 2×10⁻⁶)/0.6 = 72000/0.6 = 1.2 × 10⁵ N/C.",
    },
    {
      number: 10,
      question:
        "An infinite non-conducting plane sheet has a uniform surface charge density of 4.425 × 10⁻⁷ C/m². Find the electric field near the sheet. (ε₀ = 8.85 × 10⁻¹² C²/N·m²)",
      options: ["2.5 × 10⁴ N/C", "5 × 10⁴ N/C", "1.25 × 10⁴ N/C", "5 × 10³ N/C"],
      correctIndex: 0,
      solution: "E = σ/(2ε₀) = (4.425×10⁻⁷)/(2 × 8.85×10⁻¹²) = (4.425×10⁻⁷)/(1.77×10⁻¹¹) = 2.5 × 10⁴ N/C.",
    },
    {
      number: 11,
      question:
        "An electric dipole of moment 4 × 10⁻⁹ C·m is placed in a uniform electric field of 5 × 10⁴ N/C, making an angle of 30° with the field. Find the torque acting on it.",
      options: ["1 × 10⁻⁴ N·m", "2 × 10⁻⁴ N·m", "0.5 × 10⁻⁴ N·m", "2 × 10⁻⁵ N·m"],
      correctIndex: 0,
      solution: "τ = pE sinθ = (4×10⁻⁹)(5×10⁴)(sin30°) = (2×10⁻⁴)(0.5) = 1 × 10⁻⁴ N·m.",
    },
    {
      number: 12,
      question:
        "A dipole of moment 2 × 10⁻⁸ C·m is rotated from 0° to 60° with respect to a uniform field of 1 × 10⁵ N/C. Find the work done.",
      options: ["1 × 10⁻³ J", "2 × 10⁻³ J", "0.5 × 10⁻³ J", "1.5 × 10⁻³ J"],
      correctIndex: 0,
      solution:
        "W = pE(cosθ₁ − cosθ₂) = (2×10⁻⁸)(1×10⁵)(cos0° − cos60°) = (2×10⁻³)(1 − 0.5) = 1 × 10⁻³ J.",
    },
    {
      number: 13,
      question:
        "At the same distance r from a short electric dipole, the field on the axial line is E_axial and on the equatorial line is E_equatorial. Find E_axial/E_equatorial.",
      options: ["2", "4", "0.5", "1"],
      correctIndex: 0,
      solution: "E_axial = 2kp/r³ and E_equatorial = kp/r³ ⟹ ratio = 2.",
    },
    {
      number: 14,
      question:
        "An electric dipole of moment 5 × 10⁻⁹ C·m is aligned parallel to a uniform field of 2 × 10⁴ N/C. Find its potential energy.",
      options: ["−1 × 10⁻⁴ J", "+1 × 10⁻⁴ J", "−2 × 10⁻⁴ J", "0 J"],
      correctIndex: 0,
      solution: "U = −pE cosθ. Aligned ⟹ θ = 0° ⟹ U = −pE = −(5×10⁻⁹)(2×10⁴) = −1 × 10⁻⁴ J.",
    },
    {
      number: 15,
      question:
        "A charged particle of mass 4 g and charge 2 μC enters a uniform electric field of 1000 N/C, perpendicular to its initial velocity of 10 m/s, and travels a horizontal distance of 0.2 m through the field. Find its deflection in the direction of the field.",
      options: ["1 × 10⁻⁴ m", "2 × 10⁻⁴ m", "0.5 × 10⁻⁴ m", "1 × 10⁻³ m"],
      correctIndex: 0,
      solution:
        "a = qE/m = (2×10⁻⁶ × 1000)/(4×10⁻³) = 0.5 m/s². T = l/v = 0.2/10 = 0.02 s. y = ½aT² = ½(0.5)(0.02)² = ½(0.5)(4×10⁻⁴) = 1 × 10⁻⁴ m.",
    },
    {
      number: 16,
      question:
        "Two point charges in air repel each other with force F₀. If the space between them is now completely filled with a dielectric medium of dielectric constant K = 5, find the new force between them, in terms of F₀.",
      options: ["F₀/5", "5F₀", "F₀/25", "F₀"],
      correctIndex: 0,
      solution: "Force in a medium F' = F₀/K = F₀/5.",
    },
    {
      number: 17,
      question:
        "Three point charges +2 μC, +3 μC, and +4 μC are placed on a straight line at x = 0, x = 0.3 m, and x = 0.6 m respectively. Find the net force on the +3 μC charge due to the other two. (k = 9 × 10⁹ N·m²/C²)",
      options: [
        "0.6 N, directed toward the 2 μC charge",
        "0.6 N, directed toward the 4 μC charge",
        "1.8 N, directed toward the 4 μC charge",
        "Zero",
      ],
      correctIndex: 0,
      solution:
        "Force from 2 μC on 3 μC (0.3 m apart): F₁ = (9×10⁹×2×10⁻⁶×3×10⁻⁶)/(0.3)² = 0.054/0.09 = 0.6 N, pushing the 3 μC charge away from the 2 μC charge (toward +x). Force from 4 μC on 3 μC (0.3 m apart): F₂ = (9×10⁹×3×10⁻⁶×4×10⁻⁶)/(0.3)² = 0.108/0.09 = 1.2 N, pushing it away from the 4 μC charge (toward −x). Net force = 1.2 − 0.6 = 0.6 N, directed toward the 2 μC charge.",
    },
    {
      number: 18,
      question: "A point charge q is placed exactly at one corner of a cube. Find the total electric flux through the entire (closed) cube.",
      options: ["q/(8ε₀)", "q/(6ε₀)", "q/(4ε₀)", "q/(2ε₀)"],
      correctIndex: 0,
      solution:
        "Eight identical cubes meet symmetrically at a shared corner, together enclosing the charge entirely. Total flux from the charge (q/ε₀) is shared equally among all 8 cubes, so each cube — including the one in question — receives q/(8ε₀).",
    },
  ],
};
