import type { ChapterShortNotes } from "./kinematics-short";

export const basicMathematicsAndVectorsShortNotes: ChapterShortNotes = {
  chapterName: "Basic Mathematics & Vectors",
  className: "11",
  groups: [
    {
      heading: "Angles & Trigonometry",
      points: [
        "θ(rad) = θ(degree) × π/180. 1 rad ≈ 57.3°.",
        "sinθ = opp/hyp, cosθ = adj/hyp, tanθ = opp/adj; cosecθ=1/sinθ, secθ=1/cosθ, cotθ=1/tanθ.",
        "sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ.",
        "ASTC rule: All positive in Q1, only Sin (& cosec) in Q2, only Tan (& cot) in Q3, only Cos (& sec) in Q4.",
        "sin30°=½, sin45°=1/√2, sin60°=√3/2 (cosine mirrors this; tan = sin/cos).",
        "Small-angle (θ in rad, θ<5°): sinθ≈θ, tanθ≈θ, cosθ≈1.",
      ],
    },
    {
      heading: "Calculus Essentials",
      points: [
        "d/dx(xⁿ) = nxⁿ⁻¹; d/dx(c)=0; product rule: d/dx(uv)=u v'+v u'.",
        "d/dx(sinx)=cosx, d/dx(cosx)=−sinx, d/dx(eˣ)=eˣ, d/dx(lnx)=1/x.",
        "Stationary point: dy/dx=0. Minimum if d²y/dx²>0; maximum if d²y/dx²<0.",
        "∫xⁿ dx = xⁿ⁺¹/(n+1)+c (n≠−1); ∫(1/x)dx = lnx+c.",
        "∫sinx dx = −cosx+c; ∫cosx dx = sinx+c; ∫eˣ dx = eˣ+c.",
        "Definite integral ∫ₐᵇ f(x)dx = area under curve from a to b = F(b)−F(a).",
        "Average value of y over [a,b] = (∫ₐᵇ y dx)/(b−a).",
      ],
    },
    {
      heading: "Algebra & Series",
      points: [
        "Quadratic roots: x = [−b ± √(b²−4ac)]/2a. Sum = −b/a, product = c/a.",
        "Real & distinct roots if b²−4ac>0; equal if =0; imaginary if <0.",
        "Binomial approximation: (1+x)ⁿ ≈ 1+nx for |x|≪1.",
        "AP: aₙ=a+(n−1)d; Sₙ=(n/2)[2a+(n−1)d].",
        "GP: aₙ=arⁿ⁻¹; Sₙ=a(1−rⁿ)/(1−r); S∞=a/(1−r) for |r|<1.",
      ],
    },
    {
      heading: "Mensuration Quick Reference",
      points: [
        "Circle: A=πr², circumference=2πr.",
        "Sphere: surface area=4πr², volume=(4/3)πr³.",
        "Cylinder: curved surface area=2πrl, volume=πr²l.",
        "Cone: volume=(1/3)πr²h.",
        "Ellipse: area=πab.",
      ],
    },
    {
      heading: "Vectors — Basics",
      points: [
        "Scalar: magnitude only (mass, time, speed). Vector: magnitude + direction (displacement, velocity, force).",
        "Unit vector Â = A/|A|, magnitude exactly 1, marks direction only.",
        "Null vector: zero magnitude, direction undefined.",
        "Parallel vectors: angle 0°. Antiparallel: angle 180°. Collinear: angle 0° or 180°.",
        "Polar vectors (force, displacement) have a point of application; axial vectors (torque, angular velocity) point along the rotation axis via the right-hand rule.",
      ],
    },
    {
      heading: "Vector Addition & Subtraction",
      points: [
        "R = √(A²+B²+2AB cosθ); direction tanα = B sinθ/(A+B cosθ).",
        "R_max = A+B (θ=0°); R_min = |A−B| (θ=180°).",
        "Equal-magnitude vectors a, a, separated by θ: resultant = 2a cos(θ/2), along the bisector.",
        "Resultant of two UNEQUAL vectors can never be zero.",
        "A−B = A+(−B); |A−B| = √(A²+B²−2AB cosθ).",
      ],
    },
    {
      heading: "Vector Resolution & Components",
      points: [
        "Plane: Aₓ=A cosα, A_y=A sinα; A=√(Aₓ²+A_y²); tanα=A_y/Aₓ.",
        "Space: A=Aₓî+A_yĵ+A_zk̂; A²=Aₓ²+A_y²+A_z².",
        "Direction cosines: cosα=Aₓ/A, cosβ=A_y/A, cosγ=A_z/A; cos²α+cos²β+cos²γ=1.",
      ],
    },
    {
      heading: "Dot & Cross Product",
      points: [
        "A·B = AB cosθ = AₓBₓ+A_yB_y+A_zB_z. Work W=F·S=FS cosθ.",
        "A·B > 0 if θ<90°, = 0 if θ=90° (perpendicular), < 0 if θ>90°.",
        "î·î=ĵ·ĵ=k̂·k̂=1; î·ĵ=ĵ·k̂=k̂·î=0.",
        "A×B = AB sinθ n̂, direction by right-hand rule. Torque τ=r×F; angular momentum L=r×p.",
        "A×B = −(B×A); zero only when vectors are parallel/antiparallel (θ=0° or 180°).",
        "î×ĵ=k̂, ĵ×k̂=î, k̂×î=ĵ (reversing any pair flips the sign).",
      ],
    },
    {
      heading: "Common Exam Traps",
      points: [
        "θ must be in radians for the small-angle approximation and for calculus formulas like d/dx(sinθ)=cosθ — degrees give a wrong numerical answer.",
        "Resultant of two vectors of UNEQUAL magnitude can never be zero — only an equal-and-opposite pair cancels.",
        "A·B = 0 means the vectors are perpendicular, NOT that either vector itself is zero.",
        "Cross product order matters: A×B = −(B×A) — swapping flips the sign, not the magnitude.",
        "dy/dx = 0 only locates a turning point — always check the sign of d²y/dx² before calling it a maximum or minimum.",
      ],
    },
  ],
};
