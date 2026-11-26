// ─────────────────────────────────────────────────────────────────
// Profile and consent records for the account page.
//
// No age limit (owner decision, 2026-11-26): the forms never ask for an age
// band, and nothing here depends on age. With migration
// 20261126000000_remove_age_restrictions.sql (PR #25) the database needs, at
// any age: a profile row, no pending deletion, a verified email, the current
// 'privacy' and 'cloud-sync' consents, and the owner's launch switch.
//
// This module builds exactly what a signed-in student may write:
//   * profiles: only display_name, class_level and exam_targets (all
//     optional). user_id comes from the column default (auth.uid()), and
//     sync_enabled / deletion_requested_at are never sent
//     (atlas_protect_profile would refuse them anyway);
//   * consents: append-only rows of kind 'privacy' or 'cloud-sync' with
//     method 'self' (the default). There is no Terms of Use document yet, so
//     no 'terms' consent is asked for (owner decision, 2026-11-26), and no
//     'parental' consent exists in the product.
//
// The current notice version lives in app_config, which students can't
// read. CONSENT_VERSION must therefore match the seed in
// supabase/migrations/20261120000000_student_accounts.sql (a test enforces
// this). If the two ever differ, the database simply reports
// 'consent-required': it fails closed.
// ─────────────────────────────────────────────────────────────────

export const CONSENT_VERSION = "2026-11-draft";

/** The consents a student records for themself. No 'terms' (no document yet) and never 'parental'. */
export const SELF_CONSENT_KINDS = ["privacy", "cloud-sync"] as const;
export type SelfConsentKind = (typeof SELF_CONSENT_KINDS)[number];

export const EXAM_TARGETS = ["boards", "neet", "jee-main", "jee-advanced"] as const;
export type ExamTarget = (typeof EXAM_TARGETS)[number];

/** Exactly the profile columns the form writes: a subset of those granted to `authenticated`, without age_band. */
export const PROFILE_COLUMNS = ["display_name", "class_level", "exam_targets"] as const;

export type ProfileInput = {
  displayName: string;
  classLevel: string; // "", "11" or "12" (form value)
  examTargets: string[];
};

export type ProfileRow = {
  display_name: string | null;
  class_level: 11 | 12 | null;
  exam_targets: ExamTarget[];
};

export type ProfileResult = { ok: true; row: ProfileRow } | { ok: false; errors: string[] };

/** Validates the form against the same rules as the table's check constraints. Every field is optional. */
export function profileRow(input: ProfileInput): ProfileResult {
  const errors: string[] = [];
  const name = input.displayName.trim();
  if (name.length > 60) errors.push("Your name can be at most 60 characters.");
  let classLevel: 11 | 12 | null = null;
  if (input.classLevel === "11" || input.classLevel === "12") classLevel = Number(input.classLevel) as 11 | 12;
  else if (input.classLevel !== "") errors.push("Choose Class 11, Class 12 or leave it blank.");
  const targets = [...new Set(input.examTargets)];
  if (targets.some((t) => !(EXAM_TARGETS as readonly string[]).includes(t))) errors.push("Choose exam targets from the list.");
  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    row: {
      display_name: name === "" ? null : name,
      class_level: classLevel,
      exam_targets: EXAM_TARGETS.filter((t) => targets.includes(t)),
    },
  };
}

export type ConsentRecord = { kind: string; version: string; granted: boolean; recorded_at: string; id: number };
export type ConsentState = Record<SelfConsentKind, boolean | null>;

/** Milliseconds since the epoch, so timestamps compare as instants whatever their text form. */
const instant = (t: string) => Date.parse(t);

/**
 * The student's latest decision per kind for the current version, in the same
 * order the database uses (public.latest_consent: recorded_at desc, then id desc).
 * null means "no decision for this version yet".
 */
export function currentConsents(records: ConsentRecord[], version: string = CONSENT_VERSION): ConsentState {
  const state: ConsentState = { privacy: null, "cloud-sync": null };
  for (const kind of SELF_CONSENT_KINDS) {
    const latest = records
      .filter((r) => r.kind === kind && r.version === version)
      .sort((a, b) => instant(b.recorded_at) - instant(a.recorded_at) || b.id - a.id)[0];
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
