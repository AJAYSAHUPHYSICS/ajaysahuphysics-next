import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { checkConfig, evaluate } from "../../../scripts/deletion-sweep.mjs";

// Audit F5: the scheduled sweep and its alert. The exit code is the alert.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const URL_OK = "https://abcdefghijklmnopqrst.supabase.co/functions/v1/delete-account";

describe("deletion sweep: alert rules", () => {
  it("passes only when the sweep ran and nothing is left pending or stale", () => {
    expect(evaluate(200, { processed: 2, completed: 2, pending: 0, stale: 0 }).code).toBe(0);
    expect(evaluate(200, { processed: 0, completed: 0, pending: 0, stale: 0 }).code).toBe(0);
  });

  it("alerts on pending, stale or a malformed result", () => {
    expect(evaluate(200, { processed: 1, completed: 0, pending: 1, stale: 0 }).code).toBe(1);
    expect(evaluate(200, { processed: 0, completed: 0, pending: 0, stale: 3 }).code).toBe(1);
    expect(evaluate(200, { processed: 0, completed: 0, pending: 0 }).code).toBe(1);
    expect(evaluate(200, null).code).toBe(1);
  });

  it("gate off: quiet when nothing is owed, alerts when requests are outstanding", () => {
    expect(evaluate(403, { error: "deletion-disabled", pendingRequests: 0 }).code).toBe(0);
    const owed = evaluate(403, { error: "deletion-disabled", pendingRequests: 2 });
    expect(owed.code).toBe(1);
    expect(owed.message).toMatch(/operator procedure/);
    expect(evaluate(403, { error: "deletion-disabled" }).code).toBe(1);
  });

  it("alerts on every failure: unreadable gate, failed query, bad secret, server error", () => {
    for (const [s, b] of [[503, { error: "deletion-unavailable" }], [500, { error: "sweep-query-failed" }], [401, { error: "forbidden" }], [502, null], [403, { error: "other" }]] as const) {
      expect(evaluate(s, b).code, `${s}`).toBe(1);
    }
  });
});

describe("deletion sweep: alerts are actionable", () => {
  it("every failure says what to do next, and never includes ids, emails or secrets", () => {
    const cases: Array<[number, unknown, RegExp]> = [
      [200, { processed: 1, completed: 0, pending: 1, stale: 0 }, /Edge Functions → delete-account → Logs/],
      [200, { processed: 0, completed: 0, pending: 0, stale: 1 }, /operator procedure \(docs\/PHASE_2_RELEASE\.md section 9, C\.3 step 5\)/],
      [403, { error: "deletion-disabled", pendingRequests: 1 }, /Don't open the gate to clear them/],
      [401, { error: "forbidden" }, /ATLAS_DELETION_SWEEP_SECRET doesn't match/],
      [404, null, /isn't deployed at ATLAS_SWEEP_URL/],
      [500, { error: "sweep-query-failed" }, /database query failed/],
      [503, { error: "deletion-unavailable" }, /account_deletion_enabled/],
      [418, null, /Check the function logs/],
    ];
    for (const [status, body, next] of cases) {
      const out = evaluate(status, body);
      expect(out.code, String(status)).toBe(1);
      expect(out.message, String(status)).toMatch(next);
      expect(out.message).not.toMatch(/@|[0-9a-f]{8}-[0-9a-f]{4}-|sb_secret_/);
    }
  });

  it("stale takes priority over pending in the message", () => {
    expect(evaluate(200, { processed: 2, completed: 0, pending: 2, stale: 1 }).message).toMatch(/more than 72 hours/);
  });
});

describe("deletion sweep: configuration", () => {
  it("accepts only a Supabase function URL and a real secret, and never echoes the secret", () => {
    expect(checkConfig({ ATLAS_SWEEP_URL: URL_OK, ATLAS_DELETION_SWEEP_SECRET: "s".repeat(32) }).ok).toBe(true);
    expect(checkConfig({ ATLAS_SWEEP_URL: "https://example.com/x", ATLAS_DELETION_SWEEP_SECRET: "s".repeat(32) }).ok).toBe(false);
    expect(checkConfig({ ATLAS_SWEEP_URL: URL_OK, ATLAS_DELETION_SWEEP_SECRET: "" }).ok).toBe(false);
    const bad = checkConfig({ ATLAS_SWEEP_URL: URL_OK, ATLAS_DELETION_SWEEP_SECRET: "short-secret" });
    expect(bad.ok).toBe(false);
    expect(bad.message).not.toContain("short-secret");
  });

  it("the workflow is inert until the owner sets the switch, and passes the secret only as an env var", () => {
    const wf = readFileSync(path.join(ROOT, ".github", "workflows", "deletion-sweep.yml"), "utf8");
    expect(wf).toMatch(/if: vars\.ATLAS_DELETION_SWEEP_ENABLED == 'true'/);
    expect(wf).toMatch(/ATLAS_DELETION_SWEEP_SECRET: \$\{\{ secrets\.ATLAS_DELETION_SWEEP_SECRET \}\}/);
    expect(wf).toMatch(/permissions:\s*\n\s*contents: read/);
    expect(wf).not.toMatch(/app_config|adult_sync_permitted|echo .*secrets\./);
  });
});

describe("delete-account function configuration (audit F6)", () => {
  it("supabase/config.toml pins verify_jwt = false for delete-account and holds no remote settings", () => {
    const toml = readFileSync(path.join(ROOT, "supabase", "config.toml"), "utf8");
    expect(toml).toMatch(/\[functions\.delete-account\]\s*\r?\nverify_jwt = false/);
    expect(toml.match(/^\[[^\]]+\]/gm)).toEqual(["[functions.delete-account]"]);
    expect(toml).not.toMatch(/dykhwagloqxawgfkmjmc|wtuifivaxnhdnfwjsayk/);
  });
});
