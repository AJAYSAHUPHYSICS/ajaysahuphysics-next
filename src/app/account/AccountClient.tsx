"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { useSession } from "@/lib/auth/use-session";
import AuthModal from "@/components/AuthModal";
import { downloadJson, exportDeviceData, removeDeviceData } from "@/lib/account/local-data";
import { accountControl } from "@/lib/auth/accounts-ui";
import { DELETION_NOTE, RATE_LIMITED_NOTE, canSubmitDeletion, deletionAvailability, isDeletionDisabledError, isRateLimitedError } from "@/lib/account/deletion-availability";
import { CLOUD_SYNC_ENABLED } from "@/lib/sync/policy";
import { readMeta, syncOnce, type SyncResult } from "@/lib/sync/engine";
import { supabaseRemote } from "@/lib/sync/supabase-remote";
import FrameGuard from "@/components/FrameGuard";
import { CONSENT_LIMIT_NOTICE, isConsentLimitError, reactivationNotice, withdrawCloudCopy, withdrawalNotice, withdrawalOutcome } from "@/lib/account/cloud-withdrawal";
import {
  EXAM_TARGETS, PROFILE_COLUMNS, SELF_CONSENT_KINDS,
  consentChanges, consentsComplete, currentConsents, profileRow,
  type ConsentRecord, type ConsentState, type ProfileInput, type SelfConsentKind,
} from "@/lib/account/profile-consent";

const EXAM_LABELS: Record<(typeof EXAM_TARGETS)[number], string> = { boards: "Board exams", neet: "NEET", "jee-main": "JEE Main", "jee-advanced": "JEE Advanced" };
// Owner decisions (2026-11-26): no Terms of Use consent (no such document exists yet), and the
// privacy acknowledgement says plainly that the notice is a draft pending legal review.
// This wording is not legal approval; it needs the owner's sign-off before launch (decision J).
// Decision J, option B (2026-11-27): withdrawing the cloud-copy consent deletes the cloud copy
// (lib/account/cloud-withdrawal.ts, migration 20261127000000); this browser's progress stays.
const CONSENT_LABELS: Record<SelfConsentKind, string> = {
  privacy: "I have read the privacy notice. It is a draft, pending legal review.",
  "cloud-sync": "Keep a copy of my bookmarks, chapter checklist, revision rounds, mistakes, goals and study streak with my account (cloud copies). I can withdraw this at any time: uploads stop, the copy stored with my account is deleted, and the progress saved in this browser stays here.",
};
const EMPTY_PROFILE: ProfileInput = { displayName: "", classLevel: "", examTargets: [] };
const NO_CONSENTS: ConsentState = { privacy: null, "cloud-sync": null };

const card = "rounded-lg border border-navy/10 bg-white p-6 sm:p-7";
const h2 = "font-display text-xl text-navy";
const btn = "inline-flex items-center rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-light transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60";
const btnOutline = "inline-flex items-center rounded-md border border-navy/15 px-4 py-2.5 text-sm font-semibold text-navy hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60";
const btnDanger = "inline-flex items-center rounded-md border border-red-700/30 px-4 py-2.5 text-sm font-semibold text-red-800 hover:bg-red-50 transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60";

const ENABLE_REASONS: Record<string, string> = {
  enabled: "Cloud copies are on for this account.",
  "no-profile": "Save your profile first.",
  "consent-required": "Please review the privacy notice and accept the cloud-copy consent first.",
  "not-available-yet": "Cloud copies aren't available yet.",
  "deletion-pending": "Your account is being deleted.",
  "email-not-verified": "Verify your email address first: open the link we sent you, then try again.",
};

function syncMessage(r: SyncResult): string {
  switch (r.status) {
    case "disabled": return "Cloud copies aren't available yet.";
    case "needs-link-confirmation": return r.reason === "cloud-copy-replaced"
      ? `The copy stored with your account was deleted since this device last synced. This device still has ${r.localRecords} saved items, and nothing on it was removed. Confirm below to add them to your account again.`
      : `This device has ${r.localRecords} saved items. Confirm below to add them to your account.`;
    case "linked-to-another-account": return "This device's progress is linked to a different account. Nothing was synced.";
    case "not-allowed": return "Cloud copies aren't on for this account yet (they need a verified email address and your consent). Nothing was synced, and nothing on this device was changed.";
    case "cloud-incomplete": return "We couldn't read your full cloud copy, so nothing was synced and nothing on this device was changed. Try again later.";
    case "error": return "We couldn't sync right now. Nothing on this device was changed; try again later.";
    case "ok": return r.changedLocal || r.pushed ? `Synced: ${r.pushed} uploaded, ${r.changedLocal} updated on this device.` : "Everything is up to date.";
  }
}

export default function AccountClient() {
  const session = useSession();
  const [loginOpen, setLoginOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [cloudReady, setCloudReady] = useState<boolean | null>(null);
  const [deletionEnabled, setDeletionEnabled] = useState<boolean | null>(null);
  const [lastSynced, setLastSynced] = useState<number | null>(null);
  const [needsLink, setNeedsLink] = useState(false);
  const [profile, setProfile] = useState<ProfileInput>(EMPTY_PROFILE);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [consents, setConsents] = useState<ConsentState>(NO_CONSENTS);
  const [wanted, setWanted] = useState<Record<SelfConsentKind, boolean>>({ privacy: false, "cloud-sync": false });
  const [retryWithdrawal, setRetryWithdrawal] = useState(false);

  const userId = session.status === "signed-in" ? session.session.user.id : null;
  // Profile and consents only matter for cloud copies, so they stay dormant with the code switch off.
  const accountRecords = CLOUD_SYNC_ENABLED && cloudReady === true && userId !== null;

  // Is the cloud database for accounts set up in this environment?
  useEffect(() => {
    if (!supabase || !userId) return;
    supabase.rpc("sync_allowed").then(
      ({ error }) => {
        setCloudReady(!error);
        setLastSynced(readMeta(window.localStorage)?.lastSyncedAt ?? null);
      },
      () => setCloudReady(false),
    );
    // Server-side deletion gate (F5). Anything but a confirmed true is off.
    supabase.rpc("account_deletion_enabled").then(
      ({ data, error }) => setDeletionEnabled(!error && data === true),
      () => setDeletionEnabled(false),
    );
  }, [userId]);

  // The student's own profile and consents (RLS: own rows only).
  type Loaded = { profile: ProfileRowRead | null; consents: ConsentRecord[] } | null;
  type ProfileRowRead = { display_name: string | null; class_level: number | null; exam_targets: string[] | null };
  async function fetchAccountRecords(): Promise<Loaded> {
    if (!supabase || !userId) return null;
    const [p, c] = await Promise.all([
      supabase.from("profiles").select(PROFILE_COLUMNS.join(", ")).eq("user_id", userId).maybeSingle(),
      supabase.from("consents").select("id, kind, version, granted, recorded_at").eq("user_id", userId),
    ]);
    if (p.error || c.error) return null;
    return { profile: p.data as ProfileRowRead | null, consents: (c.data ?? []) as ConsentRecord[] };
  }
  function applyAccountRecords(r: Loaded) {
    if (!r) return setNotice("We couldn't load your profile right now. Please try again later.");
    setHasProfile(r.profile !== null);
    const row = r.profile;
    setProfile(row ? { displayName: row.display_name ?? "", classLevel: row.class_level ? String(row.class_level) : "", examTargets: row.exam_targets ?? [] } : EMPTY_PROFILE);
    const state = currentConsents(r.consents);
    setConsents(state);
    setWanted({ privacy: state.privacy === true, "cloud-sync": state["cloud-sync"] === true });
  }
  const reloadAccountRecords = () => fetchAccountRecords().then(applyAccountRecords, () => applyAccountRecords(null));

  useEffect(() => {
    if (!accountRecords) return;
    fetchAccountRecords().then(applyAccountRecords, () => applyAccountRecords(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload only when the account or its database changes
  }, [accountRecords, userId]);

  async function saveProfile() {
    if (!supabase || !userId) return;
    const r = profileRow(profile);
    if (!r.ok) return setNotice(r.errors.join(" "));
    setBusy(true);
    // Only display_name, class_level and exam_targets; user_id comes from auth.uid(). No age is asked for.
    const { error } = hasProfile
      ? await supabase.from("profiles").update(r.row).eq("user_id", userId)
      : await supabase.from("profiles").insert(r.row);
    setBusy(false);
    if (error) return setNotice("We couldn't save your profile. Please try again.");
    setNotice("Profile saved.");
    await reloadAccountRecords();
  }

  async function saveConsents() {
    if (!supabase || !userId) return;
    const rows = consentChanges(consents, wanted);
    if (!rows.length) return setNotice("Nothing changed.");
    // Withdrawing a granted cloud-copy consent also deletes the cloud copy (decision J).
    const withdrawing = consents["cloud-sync"] === true && rows.some((r) => r.kind === "cloud-sync" && !r.granted);
    setBusy(true);
    // A withdrawal turns uploads off FIRST (begin_cloud_withdrawal), then records these rows, then deletes
    // the copy; the deletion goes ahead even if recording failed, because withdraw_cloud_copies() records it too.
    const client = supabase;
    const insert = () => client.from("consents").insert(rows);
    const withdrawal = withdrawing ? await withdrawCloudCopy(supabase, window.localStorage, insert) : null;
    const error = withdrawal ? withdrawal.recordError : (await insert()).error;
    setBusy(false);
    if (withdrawal) {
      setRetryWithdrawal(withdrawalOutcome(withdrawal) === "deletion-failed-retry");
      setNotice(withdrawalNotice(withdrawal) + (error ? " Some of your other choices weren't recorded; please save them again." : ""));
    } else if (error) {
      setNotice(isConsentLimitError(error) ? CONSENT_LIMIT_NOTICE : "We couldn't record your choices. Please try again.");
    } else {
      setNotice("Your choices are recorded."); // only after the server accepted the rows
    }
    await reloadAccountRecords();
  }

  /** Retry, or delete a copy left behind: same steps as a withdrawal; never touches this browser's progress. */
  async function deleteCloudCopy() {
    if (!supabase || !userId) return;
    setBusy(true);
    const r = await withdrawCloudCopy(supabase, window.localStorage);
    setBusy(false);
    setRetryWithdrawal(withdrawalOutcome(r) === "deletion-failed-retry");
    setNotice(withdrawalNotice(r));
    await reloadAccountRecords();
  }

  async function disableSync() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.rpc("disable_sync");
    setBusy(false);
    setNotice(error ? "We couldn't change this setting right now." : "Cloud copies are off. Nothing more is uploaded from this account.");
  }

  const deletion = deletionAvailability(cloudReady, deletionEnabled);

  function downloadDevice() {
    downloadJson(`ajaysahuphysics-device-data-${new Date().toISOString().slice(0, 10)}.json`, exportDeviceData(window.localStorage));
    setNotice("Downloaded everything this browser stores for AjaySahuPhysics.");
  }

  async function downloadCloud() {
    if (!supabase) return;
    setBusy(true);
    const { data, error } = await supabase.rpc("export_my_data");
    setBusy(false);
    if (error) return setNotice("We couldn't fetch your account data right now. Please try again later.");
    downloadJson(`ajaysahuphysics-account-data-${new Date().toISOString().slice(0, 10)}.json`, { account: session.status === "signed-in" ? session.session.user.email : null, ...data });
    setNotice("Downloaded the data stored with your account.");
  }

  function removeDevice() {
    const removed = removeDeviceData(window.localStorage);
    setConfirmRemove(false);
    setNotice(removed.length ? "This device's progress was removed. Reload any open pages to see the change." : "There was nothing saved on this device.");
  }

  async function runSync(confirmLink = false) {
    if (!supabase || !userId) return;
    setBusy(true);
    const r = await syncOnce({ remote: supabaseRemote(supabase, userId), userId, storage: window.localStorage, confirmLink });
    setBusy(false);
    setNeedsLink(r.status === "needs-link-confirmation");
    setNotice(syncMessage(r));
    if (r.status === "ok") setLastSynced(Date.now());
  }

  async function enableSync() {
    if (!supabase) return;
    setBusy(true);
    const { data, error } = await supabase.rpc("enable_sync");
    setBusy(false);
    // After a withdrawal, only a fresh cloud-copy consent can turn cloud copies back on (decision J).
    const fresh = reactivationNotice({ data, error }, consents["cloud-sync"]);
    setNotice(fresh ?? (error ? "We couldn't change this setting right now." : ENABLE_REASONS[String(data)] ?? "We couldn't change this setting right now."));
  }

  async function deleteAccount() {
    if (!supabase || !canSubmitDeletion(deletion, deleteText, busy)) return;
    setBusy(true);
    const req = await supabase.rpc("request_account_deletion");
    if (req.error) {
      setBusy(false);
      if (isDeletionDisabledError(req.error)) {
        setDeletionEnabled(false);
        return setNotice(DELETION_NOTE["not-available-yet"]);
      }
      if (isRateLimitedError(req.error)) return setNotice(RATE_LIMITED_NOTE);
      return setNotice("We couldn't record your deletion request. Please try again, or contact us to delete your account.");
    }
    const { data, error } = await supabase.functions.invoke("delete-account", { method: "POST" });
    setBusy(false);
    if (!error && (data as { status?: string })?.status === "deleted") {
      await supabase.auth.signOut();
      setNotice("Your account and the data stored with it have been deleted. Progress saved in this browser is still here; use “Remove this device's progress” if you want it gone too.");
    } else if (isRateLimitedError(error as { message?: string; context?: { status?: number } } | null)) {
      setNotice("Your deletion request is recorded and uploads have stopped. " + RATE_LIMITED_NOTE);
    } else {
      setNotice("Your deletion request is recorded and uploads have stopped. We'll finish deleting your account; if you can still sign in after a few days, please contact us from the Contact page.");
    }
    setDeleteText("");
  }

  return (
    <FrameGuard>
    <div className="space-y-6">
      {notice ? (
        <p role="status" className="rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-navy">
          {notice}
        </p>
      ) : null}

      <section className={card} aria-labelledby="acct-status">
        <h2 id="acct-status" className={h2}>Your account</h2>
        {session.status === "loading" ? <p className="mt-3 text-slate">Checking…</p> : null}
        {session.status === "unavailable" ? <p className="mt-3 text-slate">Accounts aren&apos;t available on this version of the site. Your progress is saved in this browser.</p> : null}
        {session.status === "signed-out" ? (
          <>
            <p className="mt-3 text-slate leading-relaxed">You&apos;re not signed in. Your progress is still saved in this browser, and you can download it below.</p>
            {/* H1: no login or sign-up entry point while the accounts UI is off. */}
            {accountControl(false) === "login" ? <button type="button" className={`mt-4 ${btn}`} onClick={() => setLoginOpen(true)}>Log in or create an account</button> : null}
          </>
        ) : null}
        {session.status === "signed-in" ? (
          <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
            <div><dt className="text-slate">Email</dt><dd className="font-semibold text-navy break-all">{session.session.user.email}</dd></div>
            <div><dt className="text-slate">Email confirmed</dt><dd className="font-semibold text-navy">{session.session.user.email_confirmed_at ? "Yes" : "Not yet"}</dd></div>
            <div><dt className="text-slate">Signed in since</dt><dd className="font-semibold text-navy">{session.session.user.last_sign_in_at ? new Date(session.session.user.last_sign_in_at).toLocaleString() : "—"}</dd></div>
            <div><dt className="text-slate">Progress storage</dt><dd className="font-semibold text-navy">This browser{lastSynced ? `, last synced ${new Date(lastSynced).toLocaleString()}` : ""}</dd></div>
          </dl>
        ) : null}
      </section>

      {accountRecords ? (
        <section className={card} aria-labelledby="acct-profile">
          <h2 id="acct-profile" className={h2}>Your profile</h2>
          <p className="mt-2 text-sm text-slate">Every field is optional. Save once to set up your profile.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-navy">
              <span className="font-semibold">Name (optional)</span>
              <input value={profile.displayName} maxLength={60} autoComplete="nickname" onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2.5 focus-visible:outline-2 focus-visible:outline-gold" />
            </label>
            <label className="text-sm text-navy">
              <span className="font-semibold">Class (optional)</span>
              <select value={profile.classLevel} onChange={(e) => setProfile({ ...profile, classLevel: e.target.value })} className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2.5 focus-visible:outline-2 focus-visible:outline-gold">
                <option value="">Not set</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </label>
          </div>
          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-navy">Exams you&apos;re preparing for (optional)</legend>
            <div className="mt-2 flex flex-wrap gap-4">
              {EXAM_TARGETS.map((t) => (
                <label key={t} className="inline-flex items-center gap-2 text-sm text-navy">
                  <input type="checkbox" checked={profile.examTargets.includes(t)} onChange={(e) => setProfile({ ...profile, examTargets: e.target.checked ? [...profile.examTargets, t] : profile.examTargets.filter((x) => x !== t) })} />
                  {EXAM_LABELS[t]}
                </label>
              ))}
            </div>
          </fieldset>
          <button type="button" className={`mt-4 ${btn}`} disabled={busy} onClick={saveProfile}>Save profile</button>
        </section>
      ) : null}

      {accountRecords ? (
        <section className={card} aria-labelledby="acct-consent">
          <h2 id="acct-consent" className={h2}>Your choices</h2>
          <p className="mt-2 text-sm text-slate">Read the <Link href="/privacy" className="underline hover:text-navy">privacy notice</Link> first. Each change is recorded with the date; you can change your mind at any time.</p>
          <div className="mt-4 space-y-2">
            {SELF_CONSENT_KINDS.map((k) => (
              <label key={k} className="flex items-start gap-2 text-sm text-navy">
                <input type="checkbox" className="mt-1" checked={wanted[k]} onChange={(e) => setWanted({ ...wanted, [k]: e.target.checked })} />
                <span>{CONSENT_LABELS[k]}</span>
              </label>
            ))}
          </div>
          <button type="button" className={`mt-4 ${btn}`} disabled={busy} onClick={saveConsents}>Save my choices</button>
          {consents["cloud-sync"] === false || retryWithdrawal ? (
            <button type="button" className={`mt-4 ml-2 ${btnOutline}`} disabled={busy} onClick={deleteCloudCopy}>Delete my cloud copy</button>
          ) : null}
          {!consentsComplete(consents) ? <p className="mt-2 text-xs text-slate" role="note">Cloud copies need both.</p> : null}
        </section>
      ) : null}

      <section className={card} aria-labelledby="acct-sync">
        <h2 id="acct-sync" className={h2}>Cloud copy of your progress</h2>
        {!CLOUD_SYNC_ENABLED ? (
          <p className="mt-3 text-slate leading-relaxed">
            Not available yet. We&apos;re completing a privacy and legal review before any study progress is stored online. Until then, everything stays in this browser only.
          </p>
        ) : session.status !== "signed-in" ? (
          <p className="mt-3 text-slate">Sign in to manage cloud copies.</p>
        ) : cloudReady === false ? (
          <p className="mt-3 text-slate">Cloud copies aren&apos;t set up on this site yet.</p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className={btnOutline} disabled={busy} onClick={enableSync}>Turn on cloud copies</button>
            <button type="button" className={btnOutline} disabled={busy} onClick={disableSync}>Turn off cloud copies</button>
            <button type="button" className={btn} disabled={busy} onClick={() => runSync(false)}>Sync now</button>
            {needsLink ? <button type="button" className={btnOutline} disabled={busy} onClick={() => runSync(true)}>Add this device&apos;s progress to my account</button> : null}
          </div>
        )}
        <p className="mt-3 text-xs text-slate">Never copied online: your activity log, searches, reading position and recently viewed pages. See the <Link href="/privacy" className="underline hover:text-navy">privacy notice</Link>.</p>
      </section>

      <section className={card} aria-labelledby="acct-data">
        <h2 id="acct-data" className={h2}>Your data</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className={btnOutline} onClick={downloadDevice}>Download this device&apos;s data</button>
          {session.status === "signed-in" && cloudReady ? <button type="button" className={btnOutline} disabled={busy} onClick={downloadCloud}>Download my account data</button> : null}
        </div>
        <div className="mt-6 border-t border-navy/10 pt-5">
          <h3 className="font-semibold text-navy">Remove this device&apos;s progress</h3>
          <p className="mt-1 text-sm text-slate">Deletes bookmarks, checklist, mistakes, revision, goals, streak and history saved in this browser. This can&apos;t be undone; download it first if you want a copy.</p>
          {confirmRemove ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className={btnDanger} onClick={removeDevice}>Yes, remove it</button>
              <button type="button" className={btnOutline} onClick={() => setConfirmRemove(false)}>Cancel</button>
            </div>
          ) : (
            <button type="button" className={`mt-3 ${btnDanger}`} onClick={() => setConfirmRemove(true)}>Remove this device&apos;s progress…</button>
          )}
        </div>
      </section>

      {session.status === "signed-in" ? (
        <section className={card} aria-labelledby="acct-delete">
          <h2 id="acct-delete" className={h2}>Delete your account</h2>
          <p className="mt-3 text-sm text-slate leading-relaxed">Permanently deletes your account and everything stored with it. Your progress in this browser stays unless you remove it above. Type <strong>DELETE</strong> to confirm.</p>
          <label htmlFor="delete-confirm" className="sr-only">Type DELETE to confirm</label>
          <input id="delete-confirm" value={deleteText} onChange={(e) => setDeleteText(e.target.value)} autoComplete="off" className="mt-3 w-full max-w-xs text-sm rounded-md border border-navy/15 px-3 py-2.5 text-navy focus-visible:outline-2 focus-visible:outline-gold" />
          <div className="mt-3">
            <button type="button" className={btnDanger} disabled={!canSubmitDeletion(deletion, deleteText, busy)} onClick={deleteAccount}>Delete my account</button>
          </div>
          {deletion !== "available" ? <p className="mt-2 text-xs text-slate" role="note">{DELETION_NOTE[deletion]}</p> : null}
        </section>
      ) : null}

      {loginOpen ? <AuthModal onClose={() => setLoginOpen(false)} /> : null}
    </div>
    </FrameGuard>
  );
}
