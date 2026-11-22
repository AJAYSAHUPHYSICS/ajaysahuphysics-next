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
