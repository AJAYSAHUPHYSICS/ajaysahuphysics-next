// ─────────────────────────────────────────────────────────────────
// Staging environment loader and checker. Never prints secret values.
//
//   node scripts/staging/staging-env.mjs check   (npm run staging:check)
//     Validates .env.staging.local offline: the file is git-ignored and
//     untracked; the target is a confirmed, non-production project; the
//     keys are the right kind and not swapped; and no secret key sits in
//     any env file Next.js loads (which would reach browser code).
//
//   node scripts/staging/staging-env.mjs run     (npm run test:staging)
//     Same checks, then runs the staging suite with those values.
//
// Values already set in the shell take precedence over the file.
// ─────────────────────────────────────────────────────────────────
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { PRODUCTION_REFS, STAGING_REF, classifyKey, refFromUrl, stagingTarget } from "../../supabase/staging/guard.mjs";

const ROOT = process.cwd();
const FILE = path.join(ROOT, process.env.STAGING_ENV_FILE ?? ".env.staging.local");
const NEXT_ENV_FILES = [".env", ".env.local", ".env.development", ".env.development.local", ".env.production", ".env.production.local", ".env.test", ".env.test.local"];

/** Minimal KEY=VALUE parser (comments, blank lines, optional quotes, optional `export`). */
function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (!m || line.trim().startsWith("#")) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[m[1]] = v;
  }
  return out;
}

const git = (...args) => {
  try {
    return { ok: true, out: execFileSync("git", args, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim() };
  } catch {
    return { ok: false, out: "" };
  }
};

const problems = [];
const warnings = [];
const isServerKey = (v) => ["secret", "legacy-service-role"].includes(classifyKey(String(v ?? "").trim()).kind);
/**
 * Where the LOCAL SITE points (NEXT_PUBLIC_SUPABASE_URL). Staging checks need it on staging: warn for a
 * production project, and for anything that isn't exactly the staging project URL. Never prints the value.
 */
function siteUrlWarning(source, value) {
  const v = String(value ?? "");
  if (PRODUCTION_REFS.some((r) => v.includes(r))) return `${source} points the local site at a PRODUCTION project. For staging checks use the staging URL in .env.development.local.`;
  if (refFromUrl(v) !== STAGING_REF) return `${source} points the local site at a Supabase URL that is not the staging project (${STAGING_REF}). Browser checks would not test staging.`;
  return null;
}

// 1. The staging file: present, ignored, untracked.
let fileVars = {};
if (fs.existsSync(FILE)) {
  const rel = path.relative(ROOT, FILE);
  if (git("ls-files", "--error-unmatch", rel).ok) problems.push(`${rel} is TRACKED by git. Remove it from the index (git rm --cached) and rotate the staging keys.`);
  if (!git("check-ignore", "-q", rel).ok) problems.push(`${rel} is not git-ignored.`);
  fileVars = parseEnv(fs.readFileSync(FILE, "utf8"));
  for (const k of Object.keys(fileVars)) if (k.startsWith("NEXT_PUBLIC_")) problems.push(`${rel} defines ${k}: browser variables don't belong in the staging test file.`);
} else if (!process.env.STAGING_SUPABASE_URL) {
  problems.push(`${path.relative(ROOT, FILE)} not found. Copy supabase/staging/staging.env.example to it and fill it in.`);
}

// 2. No server key in any file Next.js loads, and none in NEXT_PUBLIC_ shell vars.
for (const f of NEXT_ENV_FILES) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) continue;
  const vars = parseEnv(fs.readFileSync(p, "utf8"));
  for (const [k, v] of Object.entries(vars)) {
    if (isServerKey(v)) problems.push(`${f} contains a SECRET/service-role key in ${k}. Next.js loads ${f}; remove it and rotate that key.`);
    if (k === "NEXT_PUBLIC_SUPABASE_URL") {
      const w = siteUrlWarning(f, v);
      if (w) warnings.push(w);
    }
  }
  if (f === ".env.local" && vars.NEXT_PUBLIC_SUPABASE_URL) warnings.push(".env.local is also loaded by `npm run build`; prefer .env.development.local (dev server only) for staging browser checks.");
}
for (const [k, v] of Object.entries(process.env)) if (k.startsWith("NEXT_PUBLIC_") && isServerKey(v)) problems.push(`Shell variable ${k} holds a SECRET/service-role key.`);
if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  const w = siteUrlWarning("Shell variable NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
  if (w) warnings.push(w);
}

// 3. The target and keys.
const env = { ...fileVars, ...Object.fromEntries(Object.entries(process.env).filter(([k]) => k.startsWith("STAGING_"))) };
let target = null;
try {
  target = stagingTarget(env);
} catch (e) {
  problems.push(e.message);
}

const mode = process.argv[2] ?? "check";
console.log("Staging environment check");
if (target) {
  console.log(`  target ref:        ${target.ref} (not production)`);
  console.log(`  public key:        ${target.publicKind}`);
  console.log(`  server key:        ${target.serverKind} (local test process only)`);
  console.log(`  sweep secret:      ${target.sweepSecret ? "set" : "not set (sweep success path will be skipped)"}`);
  console.log(`  CAPTCHA test token: ${target.captchaToken ? "set" : "not set (CAPTCHA check will be skipped)"}`);
}
for (const w of warnings) console.log(`  warning: ${w}`);
for (const p of problems) console.log(`  PROBLEM: ${p}`);
if (problems.length) {
  console.log(`staging-env: ${problems.length} problem(s); nothing was run.`);
  process.exit(1);
}
console.log("staging-env: OK");
if (mode === "check") process.exit(0);

if (mode === "run") {
  const r = spawnSync(process.execPath, [path.join(ROOT, "node_modules", "vitest", "vitest.mjs"), "run", "--config", "vitest.staging.config.ts"], { stdio: "inherit", env: { ...process.env, ...env } });
  process.exit(r.status ?? 1);
}
console.log(`unknown mode "${mode}" (use check or run)`);
process.exit(2);
