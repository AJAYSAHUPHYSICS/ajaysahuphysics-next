// ─────────────────────────────────────────────────────────────────
// Scheduled account-deletion sweep (audit F5), run by
// .github/workflows/deletion-sweep.yml, or by hand against staging.
//
// It POSTs to the delete-account function's sweep endpoint, and its exit
// code is the alert. A failed scheduled run emails the repository owner.
//   exit 0: the sweep ran and nothing is left pending; or the gate is off
//           and no requests are outstanding.
//   exit 1: anything else. That covers a request still pending after the
//           sweep, requests older than the alert threshold ("stale"),
//           requests outstanding while the gate is off (owed under runbook
//           C.3 step 5), an unreadable gate, a failed query, bad
//           credentials, or a network error.
//
// Env: ATLAS_SWEEP_URL              https://<ref>.supabase.co/functions/v1/delete-account
//      ATLAS_DELETION_SWEEP_SECRET  the function's sweep secret (never printed)
// No dependencies. Prints counts only: no ids, emails or secrets.
// ─────────────────────────────────────────────────────────────────
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const RUNBOOK = "docs/PHASE_2_RELEASE.md section 9, C.3 step 5";
// What to do for each failure (shown in the log and the job summary).
const NEXT = {
  pending: `Open Supabase → Edge Functions → delete-account → Logs to see which step failed (purge or auth-user). The next hourly run retries. If it keeps failing, complete the request with the operator procedure (${RUNBOOK}).`,
  stale: `A request has been pending for more than 72 hours. Complete it now with the operator procedure (${RUNBOOK}), then find out why the sweep couldn't finish it.`,
  owed: `Complete each outstanding request with the operator procedure (${RUNBOOK}). Don't open the gate to clear them.`,
  401: "The GitHub secret ATLAS_DELETION_SWEEP_SECRET doesn't match the function's ATLAS_DELETION_SWEEP_SECRET. Set them to the same value.",
  404: "The function isn't deployed at ATLAS_SWEEP_URL. Check the URL and the deployment.",
  500: "A database query failed in the sweep. Check the function logs and the database status.",
  503: "The deletion gate couldn't be read. Check that the migrations are applied and the app_config row 'account_deletion_enabled' exists.",
  network: "The function couldn't be reached. Check ATLAS_SWEEP_URL and the Supabase status page.",
  other: "Unexpected response. Check the function logs.",
};

const URL_RE = /^https:\/\/[a-z0-9]{20}\.supabase\.co\/functions\/v1\/delete-account$/;

/** Decides the exit code and message for a sweep response. */
export function evaluate(status, body) {
  const b = body && typeof body === "object" ? body : {};
  if (status === 200 && typeof b.processed === "number") {
    const summary = `processed ${b.processed}, completed ${b.completed}, pending ${b.pending}, stale ${b.stale}`;
    if (typeof b.stale !== "number") return { code: 1, message: `Deletion sweep returned an incomplete result: ${summary}. ${NEXT.other}` };
    if ((b.stale ?? 0) > 0) return { code: 1, message: `Deletion sweep needs attention: ${summary}. ${NEXT.stale}` };
    if ((b.pending ?? 0) > 0) return { code: 1, message: `Deletion sweep needs attention: ${summary}. ${NEXT.pending}` };
    return { code: 0, message: `Deletion sweep OK: ${summary}.` };
  }
  if (status === 403 && b.error === "deletion-disabled") {
    if (typeof b.pendingRequests !== "number") return { code: 1, message: `Deletion gate is off, and the outstanding-request count is missing. ${NEXT.other}` };
    if (b.pendingRequests > 0) return { code: 1, message: `Deletion gate is off, but ${b.pendingRequests} deletion request(s) are outstanding. ${NEXT.owed}` };
    return { code: 0, message: "Deletion gate is off; no deletion requests are outstanding. Nothing to do." };
  }
  const next = NEXT[status] ?? NEXT.other;
  return { code: 1, message: `${`Deletion sweep failed: HTTP ${status} ${typeof b.error === "string" ? b.error : ""}`.trim()}. ${next}` };
}

export function checkConfig(env) {
  const url = (env.ATLAS_SWEEP_URL ?? "").trim();
  const secret = env.ATLAS_DELETION_SWEEP_SECRET ?? "";
  if (!URL_RE.test(url)) return { ok: false, message: "ATLAS_SWEEP_URL must be https://<project ref>.supabase.co/functions/v1/delete-account." };
  if (secret.length < 16) return { ok: false, message: "ATLAS_DELETION_SWEEP_SECRET is missing or too short." };
  return { ok: true, url, secret };
}

/** Logs the message (as an error annotation on failure) and adds it to the job summary. */
function report(message, code) {
  console.log(`${code ? "::error::" : ""}${message}`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    try { fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Account deletion sweep: ${code ? "needs attention" : "OK"}

${message}
`); } catch { /* summary is optional */ }
  }
}

async function main() {
  const cfg = checkConfig(process.env);
  if (!cfg.ok) { report(cfg.message, 1); process.exit(1); }
  let status = 0, body = null;
  try {
    const res = await fetch(`${cfg.url}?sweep=1`, { method: "POST", headers: { "x-atlas-sweep-secret": cfg.secret }, signal: AbortSignal.timeout(60_000) });
    status = res.status;
    body = await res.json().catch(() => null);
  } catch (e) {
    report(`Deletion sweep request failed: ${e?.name ?? "error"}. ${NEXT.network}`, 1);
    process.exit(1);
  }
  const out = evaluate(status, body);
  report(out.message, out.code);
  process.exit(out.code);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
