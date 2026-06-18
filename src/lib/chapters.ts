export type ChapterExam = "jee-main" | "jee-advanced" | "neet";

export type Chapter = {
  name: string;
  cls: "11" | "12";
};

export const class11Chapters: Chapter[] = [
  { name: "Physical World & Measurement", cls: "11" },
  { name: "Kinematics", cls: "11" },
  { name: "Laws of Motion", cls: "11" },
  { name: "Work, Energy & Power", cls: "11" },
  { name: "System of Particles & Rotational Motion", cls: "11" },
  { name: "Gravitation", cls: "11" },
  { name: "Mechanical Properties of Solids", cls: "11" },
  { name: "Mechanical Properties of Fluids", cls: "11" },
  { name: "Thermal Properties of Matter", cls: "11" },
  { name: "Thermodynamics", cls: "11" },
  { name: "Kinetic Theory of Gases", cls: "11" },
  { name: "Oscillations", cls: "11" },
  { name: "Waves", cls: "11" },
];

export const class12Chapters: Chapter[] = [
  { name: "Electric Charges & Fields", cls: "12" },
  { name: "Electrostatic Potential & Capacitance", cls: "12" },
  { name: "Current Electricity", cls: "12" },
  { name: "Moving Charges & Magnetism", cls: "12" },
  { name: "Magnetism & Matter", cls: "12" },
  { name: "Electromagnetic Induction", cls: "12" },
  { name: "Alternating Current", cls: "12" },
  { name: "Electromagnetic Waves", cls: "12" },
  { name: "Ray Optics & Optical Instruments", cls: "12" },
  { name: "Wave Optics", cls: "12" },
  { name: "Dual Nature of Radiation & Matter", cls: "12" },
  { name: "Atoms", cls: "12" },
  { name: "Nuclei", cls: "12" },
  { name: "Semiconductor Electronics", cls: "12" },
];

export const allChapters: Chapter[] = [...class11Chapters, ...class12Chapters];

export const jeeAdvancedTopics: Chapter[] = [
  { name: "Rotational Dynamics (Advanced)", cls: "11" },
  { name: "Fluid Mechanics (Advanced)", cls: "11" },
  { name: "Electromagnetic Induction (Advanced)", cls: "12" },
  { name: "Geometrical & Wave Optics (Advanced)", cls: "12" },
  { name: "Modern Physics (Advanced)", cls: "12" },
  { name: "Heat & Thermodynamics (Advanced)", cls: "11" },
];
