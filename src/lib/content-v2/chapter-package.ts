// ─────────────────────────────────────────────────────────────────
// Rebuilt chapter content: package schema and validator
//
// Every rebuilt chapter is one ChapterPackage. Each block of content
// carries its own provenance (original or adapted, which registry
// sources, who wrote it, who reviewed it), so attribution and licence
// compliance can be checked by tests instead of by memory.
//
// Packages are DATA ONLY. Nothing here is rendered or routed; a package
// reaches students only through a separate, reviewed change that wires
// it into the resource registry AND updates the publication policy.
// See docs/content/CHAPTER_TEMPLATE.md.
// ─────────────────────────────────────────────────────────────────

/** Licences a source may carry for its content to be used (licence policy §2). NC/ND can't be expressed. */
export type UsableLicence = "CC0-1.0" | "PUBLIC-DOMAIN" | "CC-BY-4.0" | "CC-BY-3.0" | "CC-BY-2.0" | "US-GOV-WORK" | "CC-BY-SA-4.0";

/** Runtime allow-list (packages may one day be loaded from JSON, so types alone aren't enough). */
export const USABLE_LICENCES: readonly UsableLicence[] = ["CC0-1.0", "PUBLIC-DOMAIN", "CC-BY-4.0", "CC-BY-3.0", "CC-BY-2.0", "US-GOV-WORK", "CC-BY-SA-4.0"];

/** A source as recorded in docs/content/OPEN_SOURCE_CONTENT_REGISTRY.md. */
export type RegistrySource = {
  /** Registry ID, e.g. "R-001". */
  id: string;
  title: string;
  url: string;
  licence: UsableLicence;
  status: "verified" | "pending" | "reference-only" | "rejected";
  /** Attribution text exactly as it must be shown (TASL). */
  attribution: string;
  /**
   * Where and when the licence was read, quoted verbatim, and the reviewer's
   * confirmation that commercial use is permitted. Required to publish; never
   * filled in without actually reading the licence page.
   */
  evidence?: { url: string; verifiedOn: string; licenceText: string; commercialUse?: "permitted" | "not-permitted" | "unclear" };
};

/**
 * Academic review of a block. `reviewer: null` + `status: "pending"` means no
 * independent reviewer has been identified yet. Never fill in a name that
 * hasn't actually reviewed the content.
 */
export type Review = {
  reviewer: string | null;
  date?: string;
  status: "approved" | "changes-requested" | "pending";
};

export type Provenance = {
  /** "original": written by AjaySahuPhysics; "adapted": uses text, figures or data from `sources`. */
  origin: "original" | "adapted";
  /** Registry IDs this block draws on (required for "adapted"; facts may cite sources too). */
  sources: string[];
  author: string;
  aiAssisted: boolean;
  /** What changed relative to the source, for attribution ("Adapted: …"). */
  changes?: string;
  review?: Review;
};

export type Level = "board" | "neet" | "jee-main" | "jee-advanced";
/** Reviewed editorial difficulty (optional while drafting, required to publish examples and questions). */
export type Difficulty = "easy" | "medium" | "hard";
export const DIFFICULTIES: readonly Difficulty[] = ["easy", "medium", "hard"];

/** A diagram. `src` is a path served by the site itself (no hotlinking). */
export type Figure = { id: string; src: string; alt: string; provenance: Provenance };

export type Overview = { summary: string; learningOutcomes: string[]; provenance: Provenance };
export type NotesSection = {
  id: string;
  heading: string;
  body: string;
  points?: string[];
  figures?: Figure[];
  /** Formula IDs shown with this section: formulas live ONLY in formulaSheet[] and are referenced, never retyped. */
  formulaRefs?: string[];
  provenance: Provenance;
};
/** `ref`: the notes section this revision point summarises (keeps short notes traceable, not separately written). */
export type ShortNote = { id: string; text: string; ref?: string; provenance: Provenance };
export type FormulaExamTag = "jee-main" | "jee-advanced" | "neet" | "boards";

/**
 * The CANONICAL formula record. It exists once per package; notes, examples
 * and the formula sheet's topic groups reference it by `id`.
 *
 * Editorial fields (examTags, difficulty, frequency, isKeyFormula, pdfInclude,
 * and each variable's dimension) are optional while drafting and REQUIRED
 * for publication. They are reviewer judgements, so they are never filled
 * with invented defaults.
 */
export type Formula = {
  id: string;
  label: string;
  expression: string;
  variables: { symbol: string; name: string; unit: string; dimension?: string }[];
  conditions?: string[];
  /** One-line origin note, e.g. "From the definition of acceleration". */
  derivedFrom?: string;
  commonMistakes?: string[];
  examTags?: FormulaExamTag[];
  difficulty?: "easy" | "medium" | "hard";
  /** Editorial estimate of how often the formula is needed in exams (reviewed, not a statistic). */
  frequency?: "very-high" | "high" | "medium" | "low";
  isKeyFormula?: boolean;
  pdfInclude?: boolean;
  provenance: Provenance;
};

/** A formula-sheet topic group: holds canonical formula IDs only (no copies). */
export type FormulaGroup = { id: string; title: string; intro?: string; formulaIds: string[] };

/** A named part of a chapter (e.g. Kinematics → Motion in a Straight Line / Motion in a Plane). */
export type ChapterPart = { id: string; title: string; ncertChapter?: string; sectionIds: string[] };
export type SolvedExample = {
  id: string;
  level: Level;
  problem: string;
  steps: string[];
  answer: string;
  /** SI unit of the final answer, or "dimensionless", or "not numerical". Required so no result goes unitless by accident. */
  answerUnit: string;
  /** Formula IDs the solution uses (from formulaSheet[]). */
  formulaRefs?: string[];
  difficulty?: Difficulty;
  provenance: Provenance;
};
/** DPP / exam-style practice. `number` is stable forever (saved mistakes use it); retire, never reuse. */
export type PracticeQuestion = {
  id: string;
  number: number;
  level: Level;
  /** Display label: always a practice label, never an exam name with a year. */
  label: "Practice question" | "NEET-style practice question" | "JEE Main-style practice question" | "JEE Advanced-style practice question";
  question: string;
  options: string[];
  correctIndex: number;
  solution: string;
  difficulty?: Difficulty;
  provenance: Provenance;
};
export type Experiment = { id: string; title: string; aim: string; method: string[]; simulation?: { registryId: string; url: string }; provenance: Provenance };
export type RevisionItem = { id: string; text: string; provenance: Provenance };
/** A real previous-year question. Publishable only when verified AND rights-cleared (PYQ policy §3). */
export type RightsGatedPyq = {
  id: string;
  exam: "neet" | "jee-main" | "jee-advanced" | "cbse";
  year: number;
  paper: { session?: string; shift?: string; code?: string };
  officialNumber: number;
  question: string;
  options?: string[];
  answer: string;
  solution: { text: string; author: string; review?: Review };
  source: { kind: "official-paper" | "official-answer-key"; url: string; retrievedOn: string; fileSha256: string };
  verification: { status: "verified" | "pending" | "rejected"; by?: string; on?: string };
  rights: { status: "cleared" | "pending-legal-review"; basis?: string };
};

export type ChapterPackage = {
  schemaVersion: 1;
  /** e.g. "c11-units-and-measurements". */
  id: string;
  cls: "11" | "12";
  /** Existing route slug: keeps URLs, bookmarks and progress working. */
  slug: string;
  title: string;
  syllabus: { ncertChapter?: string; neetUnit?: string; jeeMainUnit?: string; jeeAdvancedArea?: string; checkedAgainst: string[] };
  status: "planning" | "drafting" | "in-review" | "published";
  /** Every source used anywhere in the package (copied from the registry). */
  sources: RegistrySource[];
  overview: Overview;
  /** Optional named parts; when present, every notes section belongs to exactly one part. */
  parts?: ChapterPart[];
  notes: NotesSection[];
  shortNotes: ShortNote[];
  /** Canonical formula records (single source). */
  formulaSheet: Formula[];
  /** Formula-sheet topic groups referencing canonical IDs; required (covering every formula) to publish a formula sheet. */
  formulaGroups?: FormulaGroup[];
  /** Formula IDs for the quick-revision strip, in order. */
  quickRevisionFormulaIds?: string[];
  /** Content version and date, shown on the formula sheet. */
  version?: string;
  lastUpdated?: string;
  solvedExamples: SolvedExample[];
  dpp: PracticeQuestion[];
  examPractice: PracticeQuestion[];
  experiments: Experiment[];
  revisionChecklist: RevisionItem[];
  pyqs: RightsGatedPyq[];
};

/** Official PYQ source domains (PYQ policy §2). */
export const OFFICIAL_PYQ_DOMAINS = ["nta.ac.in", "nta.nic.in", "jeeadv.ac.in", "cbseacademic.nic.in"] as const;

const EXAM_YEAR_LABEL = /\b(neet|aipmt|aiims|jee|iit)\b[^.]{0,20}\b(19|20)\d\d\b/i;
const PYQ_WORDING = /\bpyqs?\b|previous[- ]year|past[- ]paper|asked in (the )?(neet|jee|aipmt|aiims|cbse)/i;
const ID_FORMAT = /^[a-z0-9][a-z0-9-]*$/;
const LABEL_FOR_LEVEL: Record<Level, PracticeQuestion["label"][]> = {
  board: ["Practice question"],
  neet: ["Practice question", "NEET-style practice question"],
  "jee-main": ["Practice question", "JEE Main-style practice question"],
  "jee-advanced": ["Practice question", "JEE Advanced-style practice question"],
};

const blank = (s: string | undefined) => !s || !s.trim();

/**
 * A real calendar date written strictly as YYYY-MM-DD (no time, no spaces).
 * Rejects impossible dates such as 2026-02-30, which Date.parse would silently
 * roll over into the next month.
 */
export function isCalendarDate(s: string | undefined): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s ?? "");
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (y < 1000) return false;
  const t = new Date(Date.UTC(y, mo - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === mo - 1 && t.getUTCDate() === d;
}
const isDate = isCalendarDate;

function isHttpUrl(s: string | undefined): boolean {
  try {
    const u = new URL(s ?? "");
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}
/**
 * A diagram path served by the site itself: root-relative ("/…"), plain path
 * segments of letters, digits, "_", "-" and "." (a segment can't start with
 * "." or "-", so no "." / ".." traversal or hidden files), ending in an image
 * extension. Anything else is rejected: external or protocol-relative URLs,
 * any scheme (data:, javascript:), backslashes (browsers treat "\\" like "/"),
 * whitespace, percent-encoding, queries and fragments.
 */
export function isSafeAssetPath(s: string | undefined): boolean {
  return /^\/(?:[A-Za-z0-9_][A-Za-z0-9._-]*\/)*[A-Za-z0-9_][A-Za-z0-9._-]*\.(?:svg|png|jpe?g|webp|avif|gif)$/.test(s ?? "");
}

/**
 * Names that identify the author side (AjaySahuPhysics itself). Any two of
 * these are the same identity, so none of them can independently review work
 * written under another. Compared after normaliseIdentity().
 */
export const AUTHOR_ALIASES: readonly string[] = ["AjaySahuPhysics", "Ajay Sahu Physics", "Ajay Sahu"];

/**
 * Identity key for comparing people: trailing parenthetical annotations such
 * as "(draft)" or "(editor)" are removed, accents are folded, and only letters
 * and digits are kept, lower-cased. "AjaySahuPhysics (draft)" and
 * "ajay-sahu physics" both become "ajaysahuphysics".
 */
export function normaliseIdentity(name: string): string {
  let s = name.trim();
  while (/\([^()]*\)\s*$/.test(s)) s = s.replace(/\s*\([^()]*\)\s*$/, "").trim();
  return s.normalize("NFKD").replace(/[^A-Za-z0-9]/g, "").toLowerCase();
}

const ALIAS_KEYS = new Set(AUTHOR_ALIASES.map(normaliseIdentity));

/** True when reviewer and author are (or may be) the same identity. */
export function isSameIdentity(reviewer: string, author: string): boolean {
  const r = normaliseIdentity(reviewer);
  const a = normaliseIdentity(author);
  if (r === "" || a === "") return false;
  return r === a || (ALIAS_KEYS.has(r) && ALIAS_KEYS.has(a));
}

/** Checks an approval record: named reviewer, real date, independent of the author. */
function reviewErrors(where: string, review: Review | undefined, author: string): string[] {
  if (review?.status !== "approved") return [];
  const errs: string[] = [];
  const reviewer = typeof review.reviewer === "string" ? review.reviewer : "";
  if (normaliseIdentity(reviewer) === "") errs.push(`${where}: approved without a named reviewer`);
  if (!isDate(review.date)) errs.push(`${where}: approval has no valid date (YYYY-MM-DD)`);
  if (isSameIdentity(reviewer, author)) errs.push(`${where}: reviewer must be independent of the author`);
  return errs;
}

/** Returns every rule violation (empty = valid). `allowShareAlike` needs the owner's written approval. */
export function validateChapterPackage(pkg: ChapterPackage, opts: { allowShareAlike?: boolean } = {}): string[] {
  const errors: string[] = [];
  const sources = new Map(pkg.sources.map((s) => [s.id, s]));
  const publishing = pkg.status === "published";

  if (!ID_FORMAT.test(pkg.id)) errors.push(`package id "${pkg.id}" is not lowercase-hyphenated`);
  if (blank(pkg.title)) errors.push("package title missing");

  for (const s of pkg.sources) {
    if (!USABLE_LICENCES.includes(s.licence)) errors.push(`source ${s.id} has licence "${s.licence}", which is not allowed (NC, ND and unknown licences are rejected)`);
    if (s.status !== "verified") errors.push(`source ${s.id} is "${s.status}", only "verified" sources may be used`);
    if (s.licence === "CC-BY-SA-4.0" && !opts.allowShareAlike) errors.push(`source ${s.id} is ShareAlike: needs owner approval`);
    if (blank(s.attribution)) errors.push(`source ${s.id} has no attribution text`);
    if (blank(s.url)) errors.push(`source ${s.id} has no URL`);
    else if (!isHttpUrl(s.url)) errors.push(`source ${s.id}: URL is not a valid http(s) URL`);
    if (blank(s.title)) errors.push(`source ${s.id} has no title`);
    if (s.evidence?.commercialUse && s.evidence.commercialUse !== "permitted") errors.push(`source ${s.id}: commercial use is "${s.evidence.commercialUse}", only sources that permit commercial use may be used`);
    if (publishing) {
      const e = s.evidence;
      if (!e || !isHttpUrl(e.url) || blank(e.licenceText) || !isDate(e.verifiedOn)) errors.push(`source ${s.id}: licence evidence (url, verifiedOn YYYY-MM-DD, licenceText) is required to publish`);
      if (e?.commercialUse !== "permitted") errors.push(`source ${s.id}: commercial use must be confirmed as permitted in the licence evidence to publish`);
    }
  }

  const blocks: { where: string; p: Provenance }[] = [
    { where: "overview", p: pkg.overview.provenance },
    ...pkg.notes.flatMap((n) => [{ where: `notes ${n.id}`, p: n.provenance }, ...(n.figures ?? []).map((f) => ({ where: `figure ${f.id}`, p: f.provenance }))]),
    ...pkg.shortNotes.map((n) => ({ where: `short note ${n.id}`, p: n.provenance })),
    ...pkg.formulaSheet.map((f) => ({ where: `formula ${f.id}`, p: f.provenance })),
    ...pkg.solvedExamples.map((e) => ({ where: `example ${e.id}`, p: e.provenance })),
    ...pkg.dpp.map((q) => ({ where: `dpp ${q.id}`, p: q.provenance })),
    ...pkg.examPractice.map((q) => ({ where: `practice ${q.id}`, p: q.provenance })),
    ...pkg.experiments.map((e) => ({ where: `experiment ${e.id}`, p: e.provenance })),
    ...pkg.revisionChecklist.map((r) => ({ where: `revision ${r.id}`, p: r.provenance })),
  ];
  for (const { where, p } of blocks) {
    if (p.origin === "adapted" && p.sources.length === 0) errors.push(`${where}: adapted content must name its sources`);
    if (p.origin === "adapted" && blank(p.changes)) errors.push(`${where}: adapted content must describe its changes`);
    for (const id of p.sources) if (!sources.has(id)) errors.push(`${where}: unknown source ${id}`);
    if (blank(p.author)) errors.push(`${where}: author missing`);
    if (publishing && typeof p.aiAssisted !== "boolean") errors.push(`${where}: AI-assistance must be declared (true/false)`);
    errors.push(...reviewErrors(where, p.review, p.author ?? ""));
    if (publishing && p.review?.status !== "approved") errors.push(`${where}: not approved by a reviewer`);
  }

  if (blank(pkg.overview.summary)) errors.push("overview summary missing");
  if (pkg.overview.learningOutcomes.length === 0) errors.push("overview has no learning outcomes");
  if (pkg.overview.learningOutcomes.some((o) => blank(o))) errors.push("overview has an empty learning outcome");
  if (pkg.revisionChecklist.length === 0) errors.push("revision checklist is empty");
  for (const r of pkg.revisionChecklist) if (blank(r.text)) errors.push(`revision ${r.id}: text missing`);
  for (const n of pkg.shortNotes) if (blank(n.text)) errors.push(`short note ${n.id}: text missing`);

  for (const n of pkg.notes) {
    if (blank(n.heading) || blank(n.body)) errors.push(`notes ${n.id}: heading and body are required`);
    if ((n.points ?? []).some((pt) => blank(pt))) errors.push(`notes ${n.id}: empty point`);
    for (const f of n.figures ?? []) {
      if (blank(f.alt)) errors.push(`figure ${f.id}: alt text missing`);
      if (!isSafeAssetPath(f.src)) errors.push(`figure ${f.id}: src must be a site-served path (root-relative "/…" image path; no external URLs, hotlinking, backslashes, whitespace or traversal)`);
    }
  }
  for (const f of pkg.formulaSheet) {
    if (blank(f.label)) errors.push(`formula ${f.id}: label missing`);
    if (blank(f.expression)) errors.push(`formula ${f.id}: expression missing`);
    for (const v of f.variables) if (blank(v.unit)) errors.push(`formula ${f.id}: variable ${v.symbol} has no unit (use "dimensionless" where appropriate)`);
  }
  for (const e of pkg.solvedExamples) {
    if (blank(e.problem) || e.steps.length === 0 || blank(e.answer)) errors.push(`example ${e.id}: problem, steps and answer are required`);
    if (e.steps.some((st) => blank(st))) errors.push(`example ${e.id}: empty solution step`);
    if (blank(e.answerUnit)) errors.push(`example ${e.id}: answer unit missing`);
    if (EXAM_YEAR_LABEL.test(e.problem) || PYQ_WORDING.test(e.problem)) errors.push(`example ${e.id}: solved examples must not be presented as PYQs`);
    if (e.difficulty !== undefined && !DIFFICULTIES.includes(e.difficulty)) errors.push(`example ${e.id}: difficulty "${e.difficulty}" is not easy, medium or hard`);
    if (publishing && e.difficulty === undefined) errors.push(`example ${e.id}: difficulty missing (reviewed editorial field, required to publish)`);
  }
  const formulaIds = new Set(pkg.formulaSheet.map((f) => f.id));
  const noteIds = new Set(pkg.notes.map((n) => n.id));
  for (const b of [...pkg.notes, ...pkg.solvedExamples]) {
    for (const ref of b.formulaRefs ?? []) if (!formulaIds.has(ref)) errors.push(`${b.id}: formula reference "${ref}" does not exist`);
  }
  for (const n of pkg.shortNotes) if (n.ref && !noteIds.has(n.ref)) errors.push(`short note ${n.id}: reference "${n.ref}" is not a notes section`);

  // Parts (e.g. Kinematics: Motion in a Straight Line / Motion in a Plane).
  if (pkg.parts) {
    const partIds = new Set<string>();
    const partTitles = new Set<string>();
    const owner = new Map<string, string>();
    for (const part of pkg.parts) {
      if (!ID_FORMAT.test(part.id)) errors.push(`part id "${part.id}" is not lowercase-hyphenated`);
      if (partIds.has(part.id)) errors.push(`duplicate part id ${part.id}`);
      partIds.add(part.id);
      if (blank(part.title)) errors.push(`part ${part.id}: title missing`);
      const titleKey = (part.title ?? "").trim().toLowerCase();
      if (titleKey && partTitles.has(titleKey)) errors.push(`part ${part.id}: duplicate part title "${part.title}"`);
      partTitles.add(titleKey);
      if (part.sectionIds.length === 0) errors.push(`part ${part.id}: no sections`);
      for (const sid of part.sectionIds) {
        if (!noteIds.has(sid)) errors.push(`part ${part.id}: section "${sid}" does not exist`);
        if (owner.has(sid)) errors.push(`section ${sid} is in two parts (${owner.get(sid)}, ${part.id})`);
        owner.set(sid, part.id);
      }
    }
    for (const n of pkg.notes) if (!owner.has(n.id)) errors.push(`section ${n.id} is not in any part`);
  }

  // Formula-sheet groups reference canonical formula IDs only.
  const grouped = new Map<string, string>();
  for (const g of pkg.formulaGroups ?? []) {
    if (!ID_FORMAT.test(g.id)) errors.push(`formula group id "${g.id}" is not lowercase-hyphenated`);
    if (blank(g.title)) errors.push(`formula group ${g.id}: title missing`);
    for (const fid of g.formulaIds) {
      if (!formulaIds.has(fid)) errors.push(`formula group ${g.id}: formula "${fid}" does not exist`);
      if (grouped.has(fid)) errors.push(`formula ${fid} is in two groups (${grouped.get(fid)}, ${g.id})`);
      grouped.set(fid, g.id);
    }
  }
  const quick = pkg.quickRevisionFormulaIds ?? [];
  for (const fid of quick) if (!formulaIds.has(fid)) errors.push(`quick-revision formula "${fid}" does not exist`);
  if (new Set(quick).size !== quick.length) errors.push("quick-revision strip lists a formula twice");
  if (publishing && pkg.formulaSheet.length > 0) {
    for (const e of formulaSheetPublicationGaps(pkg)) errors.push(e);
  }

  for (const e of pkg.experiments) {
    if (blank(e.title) || blank(e.aim) || e.method.length === 0 || e.method.some((m) => blank(m))) errors.push(`experiment ${e.id}: title, aim and every method step are required`);
    if (e.simulation && !sources.has(e.simulation.registryId)) errors.push(`experiment ${e.id}: simulation source not in package sources`);
    if (e.simulation && !isHttpUrl(e.simulation.url)) errors.push(`experiment ${e.id}: simulation URL is not a valid http(s) URL`);
  }

  const ids = new Set<string>();
  const all = [
    ...pkg.notes, ...pkg.notes.flatMap((n) => n.figures ?? []), ...pkg.shortNotes, ...pkg.formulaSheet, ...pkg.solvedExamples, ...pkg.dpp,
    ...pkg.examPractice, ...pkg.experiments, ...pkg.revisionChecklist, ...pkg.pyqs,
  ];
  for (const b of all) {
    if (!ID_FORMAT.test(b.id)) errors.push(`id "${b.id}" is not lowercase-hyphenated`);
    if (ids.has(b.id)) errors.push(`duplicate id ${b.id}`);
    ids.add(b.id);
  }

  const seenQuestions = new Set<string>();
  for (const list of [pkg.dpp, pkg.examPractice]) {
    const numbers = new Set<number>();
    for (const q of list) {
      if (!Number.isInteger(q.number) || q.number < 1) errors.push(`${q.id}: number must be a positive integer`);
      if (numbers.has(q.number)) errors.push(`${q.id}: duplicate number ${q.number}`);
      numbers.add(q.number);
      if (q.options.length !== 4) errors.push(`${q.id}: exactly 4 options are required`);
      if (q.correctIndex < 0 || q.correctIndex >= q.options.length || !Number.isInteger(q.correctIndex)) errors.push(`${q.id}: answer index out of range`);
      const norm = q.options.map((o) => o.trim().toLowerCase().replace(/\s+/g, " "));
      if (new Set(norm).size !== norm.length) errors.push(`${q.id}: two options are identical`);
      if (norm.some((o) => o === "")) errors.push(`${q.id}: empty option`);
      if (blank(q.question) || blank(q.solution)) errors.push(`${q.id}: question and solution are required`);
      if (EXAM_YEAR_LABEL.test(q.question) || EXAM_YEAR_LABEL.test(q.label)) errors.push(`${q.id}: practice questions must not carry an exam/year label`);
      if (PYQ_WORDING.test(q.question) || PYQ_WORDING.test(q.label)) errors.push(`${q.id}: practice questions must not be presented as PYQs`);
      if (!LABEL_FOR_LEVEL[q.level].includes(q.label)) errors.push(`${q.id}: label "${q.label}" doesn't match level "${q.level}"`);
      if (q.difficulty !== undefined && !DIFFICULTIES.includes(q.difficulty)) errors.push(`${q.id}: difficulty "${q.difficulty}" is not easy, medium or hard`);
      if (publishing && q.difficulty === undefined) errors.push(`${q.id}: difficulty missing (reviewed editorial field, required to publish)`);
      const key = q.question.trim().toLowerCase().replace(/\s+/g, " ");
      if (seenQuestions.has(key)) errors.push(`${q.id}: duplicate question text`);
      seenQuestions.add(key);
    }
  }

  for (const q of pkg.pyqs) {
    let host = "";
    try {
      host = new URL(q.source.url).hostname;
    } catch {
      errors.push(`pyq ${q.id}: source URL invalid`);
    }
    if (host && !OFFICIAL_PYQ_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`))) errors.push(`pyq ${q.id}: source is not an official exam domain`);
    if (!/^[0-9a-f]{64}$/.test(q.source.fileSha256)) errors.push(`pyq ${q.id}: official file SHA-256 missing`);
    if (!isDate(q.source.retrievedOn)) errors.push(`pyq ${q.id}: source retrievedOn (YYYY-MM-DD) missing`);
    if (q.verification.status === "verified" && (blank(q.verification.by) || !isDate(q.verification.on))) errors.push(`pyq ${q.id}: verification must name who verified it and when (YYYY-MM-DD)`);
    if (q.rights.status === "cleared" && blank(q.rights.basis)) errors.push(`pyq ${q.id}: rights clearance must record its basis`);
    if (blank(q.solution.author) || blank(q.solution.text)) errors.push(`pyq ${q.id}: solution text and author are required`);
    errors.push(...reviewErrors(`pyq ${q.id} solution`, q.solution.review, q.solution.author ?? ""));
    if (publishing && q.verification.status !== "verified") errors.push(`pyq ${q.id}: not verified against the official paper`);
    if (publishing && q.rights.status !== "cleared") errors.push(`pyq ${q.id}: reproduction rights not cleared`);
    if (publishing && q.solution.review?.status !== "approved") errors.push(`pyq ${q.id}: solution not reviewed`);
  }

  if (publishing && pkg.syllabus.checkedAgainst.length === 0) errors.push("syllabus mapping not checked against an official document");
  return errors;
}

/**
 * Everything that would block publication if this package were marked
 * "published" now: the full publication rule set, run on a copy (the
 * package itself is never changed). Used to track a private draft's
 * progress through review. Empty = every publication rule is met; actual
 * publication still needs the reviewed registry change and the switch.
 */
export function publicationReadiness(pkg: ChapterPackage, opts: { allowShareAlike?: boolean } = {}): string[] {
  return validateChapterPackage({ ...pkg, status: "published" }, opts);
}

/**
 * Everything still missing before this package's formula sheet can be shown:
 * every formula must sit in exactly one topic group, carry its reviewed
 * editorial fields, and give a dimension for every variable; the package
 * needs a version and date. Empty = ready.
 */
export function formulaSheetPublicationGaps(pkg: ChapterPackage): string[] {
  const gaps: string[] = [];
  if (!pkg.formulaGroups || pkg.formulaGroups.length === 0) gaps.push("formula sheet: no formula groups");
  const grouped = new Set((pkg.formulaGroups ?? []).flatMap((g) => g.formulaIds));
  for (const f of pkg.formulaSheet) {
    if (!grouped.has(f.id)) gaps.push(`formula ${f.id}: not in any formula group`);
    if (!f.examTags || f.examTags.length === 0) gaps.push(`formula ${f.id}: examTags missing`);
    if (!f.difficulty) gaps.push(`formula ${f.id}: difficulty missing`);
    if (!f.frequency) gaps.push(`formula ${f.id}: frequency missing`);
    if (f.isKeyFormula === undefined) gaps.push(`formula ${f.id}: isKeyFormula missing`);
    if (f.pdfInclude === undefined) gaps.push(`formula ${f.id}: pdfInclude missing`);
    for (const v of f.variables) if (!v.dimension || !v.dimension.trim()) gaps.push(`formula ${f.id}: variable ${v.symbol} has no dimension`);
  }
  if (!pkg.version || !pkg.version.trim()) gaps.push("formula sheet: package version missing");
  if (!isCalendarDate(pkg.lastUpdated)) gaps.push("formula sheet: lastUpdated (YYYY-MM-DD) missing");
  return gaps;
}
