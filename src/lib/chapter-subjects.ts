// ─────────────────────────────────────────────────────────────────
// Chapter Subjects (pure lookup, no storage)
//
// Groups every chapter slug into one of the 7 broad subject areas the
// planner uses to avoid one topic dominating a day's plan (M15 Task 4).
// A plain lookup table, not derived from the M7 content-cluster files
// (those are organized by production workflow, not by the coarser
// grouping a study planner needs) — but it covers exactly the same 30
// chapters, so every chapter has a subject.
// ─────────────────────────────────────────────────────────────────

export type Subject =
  | "Mechanics"
  | "Heat"
  | "Waves"
  | "Electricity"
  | "Magnetism"
  | "Optics"
  | "Modern Physics";

const SUBJECT_BY_SLUG: Record<string, Subject> = {
  // Class 11 — Mechanics
  "basic-mathematics-and-vectors": "Mechanics",
  "physical-world-and-measurement": "Mechanics",
  kinematics: "Mechanics",
  "laws-of-motion": "Mechanics",
  "work-energy-and-power": "Mechanics",
  "centre-of-mass-and-collisions": "Mechanics",
  "system-of-particles-and-rotational-motion": "Mechanics",
  gravitation: "Mechanics",
  "circular-motion": "Mechanics",
  "mechanical-properties-of-solids": "Mechanics",
  "mechanical-properties-of-fluids": "Mechanics",

  // Class 11 — Heat
  "thermal-properties-of-matter": "Heat",
  thermodynamics: "Heat",
  "kinetic-theory-of-gases": "Heat",

  // Class 11 — Waves (and Class 12's EM waves, topically the same family)
  oscillations: "Waves",
  waves: "Waves",
  "electromagnetic-waves": "Waves",

  // Class 12 — Electricity
  "electric-charges-and-fields": "Electricity",
  "electrostatic-potential-and-capacitance": "Electricity",
  "current-electricity": "Electricity",

  // Class 12 — Magnetism
  "moving-charges-and-magnetism": "Magnetism",
  "magnetism-and-matter": "Magnetism",
  "electromagnetic-induction": "Magnetism",
  "alternating-current": "Magnetism",

  // Class 12 — Optics
  "ray-optics-and-optical-instruments": "Optics",
  "wave-optics": "Optics",

  // Class 12 — Modern Physics
  "dual-nature-of-radiation-and-matter": "Modern Physics",
  atoms: "Modern Physics",
  nuclei: "Modern Physics",
  "semiconductor-electronics": "Modern Physics",
};

export function getSubject(slug: string): Subject | null {
  return SUBJECT_BY_SLUG[slug] ?? null;
}
