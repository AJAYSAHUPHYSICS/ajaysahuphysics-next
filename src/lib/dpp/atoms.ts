import type { ChapterDpp } from "./kinematics";

export const atomsDpp: ChapterDpp = {
  chapterName: "Atoms",
  className: "12",
  questions: [
    {
      number: 1,
      question:
        "The radius of the first Bohr orbit of hydrogen is 0.529 Å. What is the radius of its second orbit?",
      options: ["0.529 Å", "1.058 Å", "2.116 Å", "4.232 Å"],
      correctIndex: 2,
      solution:
        "r_n ∝ n². r₂ = r₁ × 2² = 0.529 × 4 = 2.116 Å.",
    },
    {
      number: 2,
      question:
        "The orbital speed of an electron in the first Bohr orbit of hydrogen is 2.2 × 10⁶ m/s. What is its speed in the second orbit?",
      options: ["4.4 × 10⁶ m/s", "2.2 × 10⁶ m/s", "1.1 × 10⁶ m/s", "0.55 × 10⁶ m/s"],
      correctIndex: 2,
      solution:
        "v_n ∝ 1/n. v₂ = v₁/2 = 2.2×10⁶/2 = 1.1×10⁶ m/s.",
    },
    {
      number: 3,
      question: "Calculate the energy of an electron in the third orbit of a hydrogen atom.",
      options: ["−13.6 eV", "−3.4 eV", "−1.51 eV", "−0.85 eV"],
      correctIndex: 2,
      solution:
        "E_n = −13.6/n² eV. E₃ = −13.6/9 = −1.51 eV.",
    },
    {
      number: 4,
      question:
        "What is the ionisation energy of a singly ionised helium atom (He⁺, Z = 2) in its ground state?",
      options: ["13.6 eV", "27.2 eV", "54.4 eV", "108.8 eV"],
      correctIndex: 2,
      solution:
        "IE = 13.6 Z² eV (for n=1) = 13.6 × 4 = 54.4 eV.",
    },
    {
      number: 5,
      question:
        "Find the energy required to excite a hydrogen atom from its ground state to the first excited state (n = 2).",
      options: ["3.4 eV", "10.2 eV", "12.1 eV", "13.6 eV"],
      correctIndex: 1,
      solution:
        "ΔE = E₂ − E₁ = (−3.4) − (−13.6) = 10.2 eV.",
    },
    {
      number: 6,
      question:
        "Calculate the wavelength of the first line (Hα) of the Balmer series of hydrogen. (R = 1.097 × 10⁷ m⁻¹)",
      options: ["6563 Å", "4861 Å", "1216 Å", "912 Å"],
      correctIndex: 0,
      solution:
        "1/λ = R(1/4 − 1/9) = R×5/36. λ = 36/(5×1.097×10⁷) ≈ 6.563×10⁻⁷ m = 6563 Å.",
    },
    {
      number: 7,
      question:
        "An electron in a hydrogen atom is in the n = 4 state. How many spectral lines can be emitted in total as it returns to the ground state through all possible transitions?",
      options: ["3", "4", "6", "10"],
      correctIndex: 2,
      solution:
        "Number of lines = n(n−1)/2 = 4×3/2 = 6 (4→3, 4→2, 4→1, 3→2, 3→1, 2→1).",
    },
    {
      number: 8,
      question: "Find the shortest wavelength (series limit) of the Lyman series of hydrogen.",
      options: ["912 Å", "3646 Å", "1216 Å", "6563 Å"],
      correctIndex: 0,
      solution:
        "Series limit: 1/λ = R(1/1² − 0) = R. λ = 1/R = 1/(1.097×10⁷) ≈ 9.12×10⁻⁸ m = 912 Å.",
    },
    {
      number: 9,
      question:
        "Using Bohr's quantization condition, what is the de Broglie wavelength of an electron in the first orbit of hydrogen (r₁ = 0.529 Å)?",
      options: ["0.529 Å", "1.058 Å", "3.32 Å", "6.64 Å"],
      correctIndex: 2,
      solution:
        "2πr_n = nλ. For n=1: λ = 2πr₁ = 2π(0.529) ≈ 3.32 Å.",
    },
    {
      number: 10,
      question:
        "The orbital frequency of an electron in the first Bohr orbit of hydrogen is how many times its frequency in the second orbit?",
      options: ["2", "4", "8", "16"],
      correctIndex: 2,
      solution:
        "f_n ∝ 1/n³. f₁/f₂ = (n₂/n₁)³ = (2/1)³ = 8.",
    },
    {
      number: 11,
      question: "What is the angular momentum of an electron in the third Bohr orbit of hydrogen?",
      options: ["h/2π", "2h/2π", "3h/2π", "9h/2π"],
      correctIndex: 2,
      solution:
        "L_n = nh/2π. For n=3: L = 3h/2π.",
    },
    {
      number: 12,
      question:
        "By what factor is the time period of an electron in the second Bohr orbit of hydrogen greater than in the first orbit?",
      options: ["2", "4", "8", "16"],
      correctIndex: 2,
      solution:
        "T_n ∝ n³. T₂/T₁ = (2/1)³ = 8.",
    },
    {
      number: 13,
      question:
        "The ionisation potential of a hydrogen-like ion is found to be 54.4 V. What is its atomic number?",
      options: ["1", "2", "3", "4"],
      correctIndex: 1,
      solution:
        "IE = 13.6 Z² eV. Z² = 54.4/13.6 = 4, so Z = 2.",
    },
    {
      number: 14,
      question: "Find the second excitation potential of a hydrogen atom (n = 1 to n = 3).",
      options: ["10.2 V", "12.1 V", "13.6 V", "3.4 V"],
      correctIndex: 1,
      solution:
        "E₃ − E₁ = (−1.51) − (−13.6) = 12.09 ≈ 12.1 V.",
    },
    {
      number: 15,
      question:
        "An alpha particle with kinetic energy 5 MeV approaches a gold nucleus (Z = 79) head-on. Estimate its distance of closest approach. (k = 9×10⁹ Nm²/C²)",
      options: ["≈ 4.5 × 10⁻¹⁰ m", "≈ 4.5 × 10⁻¹² m", "≈ 4.5 × 10⁻¹⁴ m", "≈ 4.5 × 10⁻¹⁶ m"],
      correctIndex: 2,
      solution:
        "r₀ = k(2Ze²)/E_K = (9×10⁹)(2×79)(1.6×10⁻¹⁹)²/(5×1.6×10⁻¹³ J) ≈ 4.55×10⁻¹⁴ m.",
    },
    {
      number: 16,
      question:
        "What is the radius of the ground-state orbit of a doubly ionised lithium atom (Li²⁺, Z = 3)?",
      options: ["0.529 Å", "1.587 Å", "0.353 Å", "0.176 Å"],
      correctIndex: 3,
      solution:
        "r_n ∝ 1/Z for n=1. r = r₁(H)/Z = 0.529/3 ≈ 0.176 Å.",
    },
    {
      number: 17,
      question:
        "An electron transitions from n = 5 to n = 3 in a hydrogen atom. Which spectral series does this belong to, and in what region of the spectrum does it lie?",
      options: [
        "Balmer series; visible",
        "Paschen series; infrared",
        "Lyman series; ultraviolet",
        "Brackett series; infrared",
      ],
      correctIndex: 1,
      solution:
        "Transitions ending on n₁ = 3 belong to the Paschen series, which lies entirely in the infrared.",
    },
    {
      number: 18,
      question: "Calculate the series limit (shortest wavelength) of the Balmer series of hydrogen.",
      options: ["3646 Å", "6563 Å", "912 Å", "1216 Å"],
      correctIndex: 0,
      solution:
        "Series limit: 1/λ = R(1/4 − 0) = R/4. λ = 4/R = 4/(1.097×10⁷) ≈ 3.646×10⁻⁷ m = 3646 Å.",
    },
  ],
};
