import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Staging verification suite (`npm run test:staging`). Talks to a real
// STAGING Supabase project, so it is never part of `npm test` or CI.
// supabase/staging/guard.ts refuses production and requires explicit
// confirmation of the target project.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["supabase/staging/**/*.staging.ts"],
    fileParallelism: false,
    testTimeout: 120_000,
    hookTimeout: 120_000,
  },
});
