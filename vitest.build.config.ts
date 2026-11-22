import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Post-build checks (`npm run test:build-output`). These inspect the static
// export in out/, so they run only AFTER `npm run build` (in CI: after the
// "Build static site" step). They are kept out of the default `npm test`
// run, which happens before the build.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/build-checks/**/*.check.ts"],
    // Several checks read every file of the ~220-page export; the 5 s default
    // is too tight on slower machines (the assertions are unchanged).
    testTimeout: 60_000,
  },
});
