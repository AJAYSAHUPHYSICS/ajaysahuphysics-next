"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { useSession } from "@/lib/auth/use-session";
import AuthModal from "@/components/AuthModal";
import { downloadJson, exportDeviceData, removeDeviceData } from "@/lib/account/local-data";
import { DELETION_NOTE, canSubmitDeletion, deletionAvailability, isDeletionDisabledError } from "@/lib/account/deletion-availability";
import { CLOUD_SYNC_ENABLED } from "@/lib/sync/policy";
import { readMeta, syncOnce, type SyncResult } from "@/lib/sync/engine";
import { supabaseRemote } from "@/lib/sync/supabase-remote";

const card = "rounded-lg border border-navy/10 bg-white p-6 sm:p-7";
const h2 = "font-display text-xl text-navy";
const btn = "inline-flex items-center rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-light transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60";
const btnOutline = "inline-flex items-center rounded-md border border-navy/15 px-4 py-2.5 text-sm font-semibold text-navy hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60";
const btnDanger = "inline-flex items-center rounded-md border border-red-700/30 px-4 py-2.5 text-sm font-semibold text-red-800 hover:bg-red-50 transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60";

const ENABLE_REASONS: Record<string, string> = {
  enabled: "Cloud copies are on for this account.",
  "no-profile": "Save your profile first.",
  "age-band-required": "Tell us your age band first.",
  "consent-required": "Please review and accept the privacy notice and cloud-copy consent first.",
  "not-available-yet": "Cloud copies aren't available yet.",
  "not-available-for-under-18": "Cloud copies aren't available for students under 18 yet.",
  "parental-consent-required": "A parent or guardian needs to give verified consent first.",
  "deletion-pending": "Your account is being deleted.",
};

function syncMessage(r: SyncResult): string {
  switch (r.status) {
    case "disabled": return "Cloud copies aren't available yet.";
    case "needs-link-confirmation": return `This device has ${r.localRecords} saved items. Confirm below to add them to your account.`;
    case "linked-to-another-account": return "This device's progress is linked to a different account. Nothing was synced.";
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

  const userId = session.status === "signed-in" ? session.session.user.id : null;

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
    setNotice(error ? "We couldn't change this setting right now." : ENABLE_REASONS[String(data)] ?? "We couldn't change this setting right now.");
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
      return setNotice("We couldn't record your deletion request. Please try again, or contact us to delete your account.");
    }
    const { data, error } = await supabase.functions.invoke("delete-account", { method: "POST" });
    setBusy(false);
    if (!error && (data as { status?: string })?.status === "deleted") {
      await supabase.auth.signOut();
      setNotice("Your account and the data stored with it have been deleted. Progress saved in this browser is still here; use “Remove this device's progress” if you want it gone too.");
    } else {
      setNotice("Your deletion request is recorded and uploads have stopped. We'll finish deleting your account; if you can still sign in after a few days, please contact us from the Contact page.");
    }
    setDeleteText("");
  }

  return (
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
            <button type="button" className={`mt-4 ${btn}`} onClick={() => setLoginOpen(true)}>Log in or create an account</button>
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

      <section className={card} aria-labelledby="acct-sync">
        <h2 id="acct-sync" className={h2}>Cloud copy of your progress</h2>
        {!CLOUD_SYNC_ENABLED ? (
          <p className="mt-3 text-slate leading-relaxed">
            Not available yet. We&apos;re completing a privacy and legal review (many of our students are under 18) before any study progress is stored online. Until then, everything stays in this browser only.
          </p>
        ) : session.status !== "signed-in" ? (
          <p className="mt-3 text-slate">Sign in to manage cloud copies.</p>
        ) : cloudReady === false ? (
          <p className="mt-3 text-slate">Cloud copies aren&apos;t set up on this site yet.</p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className={btnOutline} disabled={busy} onClick={enableSync}>Turn on cloud copies</button>
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
  );
}
