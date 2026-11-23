// Runs both E2E scripts in one browser engine, on any OS:
//   node scripts/e2e/run.mjs <chrome|firefox|webkit> [outDir]
// (npm run test:e2e:firefox, npm run test:e2e:webkit). Needs a build in outDir
// and, for Firefox and WebKit, `npx playwright install firefox webkit`.
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [browser = "chrome", out = "out"] = process.argv.slice(2);
const dir = path.dirname(fileURLToPath(import.meta.url));
let status = 0;
for (const script of ["study-tools.mjs", "keyboard.mjs"]) {
  const r = spawnSync(process.execPath, [path.join(dir, script), out], { stdio: "inherit", env: { ...process.env, E2E_BROWSER: browser } });
  if (r.status !== 0) status = r.status ?? 1;
}
process.exit(status);
