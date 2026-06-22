export type ChapterExam = "jee-main" | "jee-advanced" | "neet";

export type Chapter = {
  name: string;
  cls: "11" | "12";
  slug: string;
  number: number;
};

export const class11Chapters: Chapter[] = [
  { name: "Basic Mathematics & Vectors", cls: "11", slug: "basic-mathematics-and-vectors", number: 1 },
  { name: "Physical World & Measurement", cls: "11", slug: "physical-world-and-measurement", number: 2 },
  { name: "Kinematics", cls: "11", slug: "kinematics", number: 3 },
  { name: "Laws of Motion", cls: "11", slug: "laws-of-motion", number: 4 },
  { name: "Work, Energy & Power", cls: "11", slug: "work-energy-and-power", number: 5 },
  { name: "System of Particles & Rotational Motion", cls: "11", slug: "system-of-particles-and-rotational-motion", number: 6 },
  { name: "Gravitation", cls: "11", slug: "gravitation", number: 7 },
  { name: "Mechanical Properties of Solids", cls: "11", slug: "mechanical-properties-of-solids", number: 8 },
  { name: "Mechanical Properties of Fluids", cls: "11", slug: "mechanical-properties-of-fluids", number: 9 },
  { name: "Thermal Properties of Matter", cls: "11", slug: "thermal-properties-of-matter", number: 10 },
  { name: "Thermodynamics", cls: "11", slug: "thermodynamics", number: 11 },
  { name: "Kinetic Theory of Gases", cls: "11", slug: "kinetic-theory-of-gases", number: 12 },
  { name: "Oscillations", cls: "11", slug: "oscillations", number: 13 },
  { name: "Waves", cls: "11", slug: "waves", number: 14 },
];

export const class12Chapters: Chapter[] = [
  { name: "Electric Charges & Fields", cls: "12", slug: "electric-charges-and-fields", number: 1 },
  { name: "Electrostatic Potential & Capacitance", cls: "12", slug: "electrostatic-potential-and-capacitance", number: 2 },
  { name: "Current Electricity", cls: "12", slug: "current-electricity", number: 3 },
  { name: "Moving Charges & Magnetism", cls: "12", slug: "moving-charges-and-magnetism", number: 4 },
  { name: "Magnetism & Matter", cls: "12", slug: "magnetism-and-matter", number: 5 },
  { name: "Electromagnetic Induction", cls: "12", slug: "electromagnetic-induction", number: 6 },
  { name: "Alternating Current", cls: "12", slug: "alternating-current", number: 7 },
  { name: "Electromagnetic Waves", cls: "12", slug: "electromagnetic-waves", number: 8 },
  { name: "Ray Optics & Optical Instruments", cls: "12", slug: "ray-optics-and-optical-instruments", number: 9 },
  { name: "Wave Optics", cls: "12", slug: "wave-optics", number: 10 },
  { name: "Dual Nature of Radiation & Matter", cls: "12", slug: "dual-nature-of-radiation-and-matter", number: 11 },
  { name: "Atoms", cls: "12", slug: "atoms", number: 12 },
  { name: "Nuclei", cls: "12", slug: "nuclei", number: 13 },
  { name: "Semiconductor Electronics", cls: "12", slug: "semiconductor-electronics", number: 14 },
];

export const allChapters: Chapter[] = [...class11Chapters, ...class12Chapters];

export function getChapterBySlug(cls: "11" | "12", slug: string): Chapter | undefined {
  const list = cls === "11" ? class11Chapters : class12Chapters;
  return list.find((c) => c.slug === slug);
}

export function getAdjacentChapters(
  cls: "11" | "12",
  slug: string
): { prev: Chapter | null; next: Chapter | null } {
  const list = cls === "11" ? class11Chapters : class12Chapters;
  const index = list.findIndex((c) => c.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
  };
}
