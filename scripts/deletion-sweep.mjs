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
import { pathToFileURL } from "node:url";

const URL_RE = /^https:\/\/[a-z0-9]{20}\.supabase\.co\/functions\/v1\/delete-account$/;

/** Decides the exit code and message for a sweep response. */
export function evaluate(status, body) {
  const b = body && typeof body === "object" ? body : {};
  if (status === 200 && typeof b.processed === "number") {
    const summary = `processed ${b.processed}, completed ${b.completed}, pending ${b.pending}, stale ${b.stale}`;
    if ((b.pending ?? 0) > 0 || (b.stale ?? 0) > 0 || typeof b.stale !== "number") return { code: 1, message: `Deletion sweep needs attention: ${summary}.` };
    return { code: 0, message: `Deletion sweep OK: ${summary}.` };
  }
  if (status === 403 && b.error === "deletion-disabled") {
    if (typeof b.pendingRequests !== "number") return { code: 1, message: "Deletion gate is off, and the outstanding-request count is missing." };
    if (b.pendingRequests > 0) return { code: 1, message: `Deletion gate is off, but ${b.pendingRequests} deletion request(s) are outstanding. Complete them through the documented operator procedure (runbook C.3 step 5).` };
    return { code: 0, message: "Deletion gate is off; no deletion requests are outstanding. Nothing to do." };
  }
  return { code: 1, message: `Deletion sweep failed: HTTP ${status} ${typeof b.error === "string" ? b.error : ""}`.trim() + "." };
}

export function checkConfig(env) {
  const url = (env.ATLAS_SWEEP_URL ?? "").trim();
  const secret = env.ATLAS_DELETION_SWEEP_SECRET ?? "";
  if (!URL_RE.test(url)) return { ok: false, message: "ATLAS_SWEEP_URL must be https://<project ref>.supabase.co/functions/v1/delete-account." };
  if (secret.length < 16) return { ok: false, message: "ATLAS_DELETION_SWEEP_SECRET is missing or too short." };
  return { ok: true, url, secret };
}

async function main() {
  const cfg = checkConfig(process.env);
  if (!cfg.ok) { console.log(`::error::${cfg.message}`); process.exit(1); }
  let status = 0, body = null;
  try {
    const res = await fetch(`${cfg.url}?sweep=1`, { method: "POST", headers: { "x-atlas-sweep-secret": cfg.secret }, signal: AbortSignal.timeout(60_000) });
    status = res.status;
    body = await res.json().catch(() => null);
  } catch (e) {
    console.log(`::error::Deletion sweep request failed: ${e?.name ?? "error"}.`);
    process.exit(1);
  }
  const out = evaluate(status, body);
  console.log(`${out.code ? "::error::" : ""}${out.message}`);
  process.exit(out.code);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
