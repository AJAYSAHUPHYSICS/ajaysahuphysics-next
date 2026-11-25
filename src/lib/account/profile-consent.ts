// ─────────────────────────────────────────────────────────────────
// Profile and consent records for the account page.
//
// The database decides whether cloud copies can be turned on
// (public.enable_sync()): it needs a profile with an age band and, for the
// current notice version, a granted 'terms', 'privacy' and 'cloud-sync'
// consent. This module builds exactly what a signed-in student may write:
//
//   * profiles: only display_name, class_level, exam_targets and age_band
//     (the columns granted to `authenticated`); user_id comes from the
//     column default (auth.uid()), and sync_enabled / deletion_requested_at
//     are never sent (atlas_protect_profile would refuse them anyway);
//   * consents: append-only rows of kind 'terms', 'privacy' or 'cloud-sync'
//     with method 'self' (the default). 'parental' consent is recorded only
//     by a verified server process, never here.
//
// The current notice version lives in app_config, which students can't
// read. CONSENT_VERSION must therefore match the seed in
// supabase/migrations/20261120000000_student_accounts.sql (a test enforces
// this). If the two ever differ, the database simply reports
// 'consent-required': it fails closed.
// ─────────────────────────────────────────────────────────────────

export const CONSENT_VERSION = "2026-11-draft";

/** The consents a student records for themself. Never 'parental'. */
export const SELF_CONSENT_KINDS = ["terms", "privacy", "cloud-sync"] as const;
export type SelfConsentKind = (typeof SELF_CONSENT_KINDS)[number];

export const AGE_BANDS = ["18-plus", "under-18"] as const;
export type AgeBand = (typeof AGE_BANDS)[number];

export const EXAM_TARGETS = ["boards", "neet", "jee-main", "jee-advanced"] as const;
export type ExamTarget = (typeof EXAM_TARGETS)[number];

/** Exactly the profile columns a student may insert or update. */
export const PROFILE_COLUMNS = ["display_name", "class_level", "exam_targets", "age_band"] as const;

export type ProfileInput = {
  displayName: string;
  classLevel: string; // "", "11" or "12" (form value)
  examTargets: string[];
  ageBand: string; // "", "18-plus" or "under-18" (form value)
};

export type ProfileRow = {
  display_name: string | null;
  class_level: 11 | 12 | null;
  exam_targets: ExamTarget[];
  age_band: AgeBand;
};

export type ProfileResult = { ok: true; row: ProfileRow } | { ok: false; errors: string[] };

/** Validates the form against the same rules as the table's check constraints. */
export function profileRow(input: ProfileInput): ProfileResult {
  const errors: string[] = [];
  const name = input.displayName.trim();
  if (name.length > 60) errors.push("Your name can be at most 60 characters.");
  let classLevel: 11 | 12 | null = null;
  if (input.classLevel === "11" || input.classLevel === "12") classLevel = Number(input.classLevel) as 11 | 12;
  else if (input.classLevel !== "") errors.push("Choose Class 11, Class 12 or leave it blank.");
  const targets = [...new Set(input.examTargets)];
  if (targets.some((t) => !(EXAM_TARGETS as readonly string[]).includes(t))) errors.push("Choose exam targets from the list.");
  if (!(AGE_BANDS as readonly string[]).includes(input.ageBand)) errors.push("Tell us your age band.");
  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    row: {
      display_name: name === "" ? null : name,
      class_level: classLevel,
      exam_targets: EXAM_TARGETS.filter((t) => targets.includes(t)),
      age_band: input.ageBand as AgeBand,
    },
  };
}

export type ConsentRecord = { kind: string; version: string; granted: boolean; recorded_at: string; id: number };
export type ConsentState = Record<SelfConsentKind, boolean | null>;

/**
 * The student's latest decision per kind for the current version, in the same
 * order the database uses (public.latest_consent: recorded_at desc, then id desc).
 * null means "no decision for this version yet".
 */
export function currentConsents(records: ConsentRecord[], version: string = CONSENT_VERSION): ConsentState {
  const state: ConsentState = { terms: null, privacy: null, "cloud-sync": null };
  for (const kind of SELF_CONSENT_KINDS) {
    const latest = records
      .filter((r) => r.kind === kind && r.version === version)
      .sort((a, b) => (a.recorded_at === b.recorded_at ? b.id - a.id : a.recorded_at < b.recorded_at ? 1 : -1))[0];
    state[kind] = latest ? latest.granted : null;
  }
  return state;
}

export type ConsentInsert = { kind: SelfConsentKind; version: string; granted: boolean };

/** Rows to append for the decisions that changed. Only self kinds; method stays the default 'self'. */
export function consentChanges(current: ConsentState, wanted: Record<SelfConsentKind, boolean>, version: string = CONSENT_VERSION): ConsentInsert[] {
  return SELF_CONSENT_KINDS.filter((k) => current[k] !== wanted[k]).map((kind) => ({ kind, version, granted: wanted[kind] }));
}

/** True when every consent cloud copies need is granted for the current version. */
export function consentsComplete(state: ConsentState): boolean {
  return SELF_CONSENT_KINDS.every((k) => state[k] === true);
}
