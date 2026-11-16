import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Minimal Vitest setup (Phase 1B). Unit tests run in a plain Node
// environment. Tests that need browser APIs such as localStorage stub
// them per test instead of pulling in a full DOM emulator.
//
// Vitest is pinned to 4.x because CI and deploy run Node 20; Vitest 5
// requires Node >= 22.12 (the Node 22 move is deferred to Phase 1C).
export default defineConfig({
  resolve: {
    // Mirrors the "@/*" path alias in tsconfig.json.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
