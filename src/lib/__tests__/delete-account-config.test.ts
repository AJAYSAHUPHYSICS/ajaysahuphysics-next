import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PRODUCTION_ORIGIN, allowedOrigins, corsHeaders, serverKeyFrom } from "../../../supabase/functions/delete-account/runtime-config";

const env = (vars: Record<string, string>) => (name: string) => vars[name];

describe("delete-account: server key selection", () => {
  it("prefers the new secret key (SUPABASE_SECRET_KEYS.default)", () => {
    expect(serverKeyFrom(env({ SUPABASE_SECRET_KEYS: JSON.stringify({ default: "sb_secret_abc" }), SUPABASE_SERVICE_ROLE_KEY: "eyJlegacy" }))).toEqual({ key: "sb_secret_abc", kind: "secret" });
  });

  it("falls back to the legacy service_role key", () => {
    expect(serverKeyFrom(env({ SUPABASE_SERVICE_ROLE_KEY: "eyJlegacy" })).kind).toBe("legacy-service-role");
    expect(serverKeyFrom(env({ SUPABASE_SECRET_KEYS: "not json", SUPABASE_SERVICE_ROLE_KEY: "eyJlegacy" })).kind).toBe("legacy-service-role");
    // A publishable key in the secret slot is never used as a server key.
    expect(serverKeyFrom(env({ SUPABASE_SECRET_KEYS: JSON.stringify({ default: "sb_publishable_x" }), SUPABASE_SERVICE_ROLE_KEY: "eyJlegacy" })).kind).toBe("legacy-service-role");
  });

  it("fails loudly with no key, and never includes a key in the error", () => {
    expect(() => serverKeyFrom(env({}))).toThrow(/no server key/);
  });
});

describe("delete-account: CORS", () => {
  it("allows only production unless more origins are configured", () => {
    expect(allowedOrigins(undefined)).toEqual([PRODUCTION_ORIGIN]);
    expect(corsHeaders("https://evil.example", allowedOrigins(undefined))["Access-Control-Allow-Origin"]).toBe(PRODUCTION_ORIGIN);
  });

  it("staging can allow localhost for manual checks; junk entries are ignored", () => {
    const allowed = allowedOrigins("http://localhost:3000, https://staging.example.com/, javascript:alert(1), http://evil.example, *");
    expect(allowed).toEqual([PRODUCTION_ORIGIN, "http://localhost:3000", "https://staging.example.com"]);
    expect(corsHeaders("http://localhost:3000", allowed)["Access-Control-Allow-Origin"]).toBe("http://localhost:3000");
    expect(corsHeaders("http://evil.example", allowed)["Access-Control-Allow-Origin"]).toBe(PRODUCTION_ORIGIN);
  });

  it("the function authorises every request itself (deployed with --no-verify-jwt)", () => {
    const index = readFileSync(path.resolve(__dirname, "..", "..", "..", "supabase", "functions", "delete-account", "index.ts"), "utf8");
    expect(index).toMatch(/--no-verify-jwt/);
    expect(index).toMatch(/admin\.auth\.getUser\(token\)/); // user requests verified with the Auth server
    expect(index).toMatch(/safeEqual\(s, sweepSecret\)/); // sweep requests need the secret
    expect(index).not.toMatch(/SUPABASE_SERVICE_ROLE_KEY"\)!/); // no hard dependency on the legacy key
  });
});
