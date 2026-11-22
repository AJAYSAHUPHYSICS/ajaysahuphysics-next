import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The safe release check (scripts/staging/release-check.staging.mjs) replaces
// `npm run test:staging` for the release because it never turns cloud sync
// on. These checks keep it that way: they fail if the script ever gains a
// write to the launch switches or the deletion gate, or stops checking them.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const src = readFileSync(path.join(ROOT, "scripts", "staging", "release-check.staging.mjs"), "utf8");
const code = src.replace(/^\s*\/\/.*$/gm, "");
const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));

describe("safe staging release check", () => {
  it("the server key never writes app_config (no sync switch, no deletion gate)", () => {
    expect(code).not.toMatch(/admin\s*\.from\(\s*["']app_config["']\s*\)\s*\.(update|upsert|insert|delete)/);
    expect(code).not.toMatch(/value:\s*["']true["']\s*\}\s*\)\s*\.eq\(\s*["']key["']\s*,\s*["'](minor_sync_permitted|account_deletion_enabled)["']/);
  });

  it("the only app_config write is a student's attempt, which must be refused", () => {
    const writes = code.match(/\.from\(\s*["']app_config["']\s*\)\s*\.update/g) ?? [];
    expect(writes).toHaveLength(1);
    expect(code).toMatch(/A\.c\.from\("app_config"\)\.update\(\{ value: "true" \}\)/);
    expect(code).toMatch(/a student can't change a launch switch/);
  });

  it("refuses to start unless both sync switches and the deletion gate are 'false', and checks them again at the end", () => {
    expect(code).toMatch(/adult_sync_permitted === "false" && c\.minor_sync_permitted === "false" && c\.account_deletion_enabled === "false"/);
    expect(code).toMatch(/if \(!switchesOff\(start\)\)[\s\S]{0,200}process\.exit\(2\)/);
    expect(code).toMatch(/end: sync switches and deletion gate still 'false'/);
  });

  it("every study-table upload it attempts must be refused, with 0 rows stored", () => {
    expect(code).toMatch(/error\?\.code === "42501" && \(await count\(t, A\.id\)\) === 0/);
    expect(code).not.toMatch(/admin\s*\.from\(\s*["'](bookmarks|checklist_items|revision_rounds|mistakes|goals|streaks)["']\s*\)\s*\.(insert|upsert|update)/);
  });

  it("uses the staging guard, synthetic accounts, and removes them", () => {
    expect(code).toMatch(/stagingTarget\(env\)/);
    expect(code).toMatch(/atlas-staging-release-/);
    expect(code).toMatch(/finally \{[\s\S]*deleteUser/);
  });

  it("is wired as its own npm script and never runs the old suite", () => {
    expect(pkg.scripts["test:staging:release"]).toMatch(/staging-env\.mjs check && node scripts\/staging\/release-check\.staging\.mjs$/);
    expect(pkg.scripts["test:staging:release"]).not.toMatch(/staging-env\.mjs run/);
    expect(code).not.toMatch(/journey\.staging|test:staging["'\s]/);
  });
});
