import { describe, expect, it } from "vitest";
import { serializeJsonForScript } from "@/lib/jsonld";
import { TURNSTILE_ORIGIN, buildPolicy, executableInlineScripts, injectCsp, sha256 } from "../../../scripts/inject-csp.mjs";

// Security baseline (Phase 2B-1): JSON-LD escaping and the post-build CSP injector.

describe("JSON-LD serialisation", () => {
  it("can't be broken out of with </script> or <!--, and parses back to the same data", () => {
    const data = { name: 'x</script><script>alert(1)</script>', note: "<!-- y -->", sep: "a b c", plain: "Kinematics & Motion" };
    const s = serializeJsonForScript(data);
    expect(s).not.toContain("<");
    expect(s).not.toContain(" ");
    expect(s).not.toContain(" ");
    expect(s.toLowerCase()).not.toContain("</script");
    expect(JSON.parse(s)).toEqual(data);
  });

  it("leaves ordinary structured data byte-identical to JSON.stringify", () => {
    const data = { "@context": "https://schema.org", "@type": "WebSite", name: "Ajay Sahu Physics" };
    expect(serializeJsonForScript(data)).toBe(JSON.stringify(data));
  });
});

describe("CSP injector", () => {
  const page = (body: string) => `<!DOCTYPE html><html><head><meta charSet="utf-8"/><title>t</title></head><body>${body}</body></html>`;

  it("hash-lists inline scripts, skips external and JSON-LD scripts", () => {
    const html = page('<script>self.__next_f.push([1])</script><script src="/a.js"></script><script type="application/ld+json">{"a":1}</script><script type="module">import("/b.js")</script>');
    expect(executableInlineScripts(html)).toEqual(["self.__next_f.push([1])", 'import("/b.js")']);
    const out = injectCsp(html);
    expect(out).toContain(`'sha256-${sha256("self.__next_f.push([1])")}'`);
    expect(out).toContain(`'sha256-${sha256('import("/b.js")')}'`);
    expect(out).not.toContain(`sha256-${sha256('{"a":1}')}`);
  });

  it("puts the policy right after <meta charset>, before any script, and is idempotent", () => {
    const html = page('<script>1</script>');
    const once = injectCsp(html);
    const twice = injectCsp(once);
    expect(twice).toBe(once);
    expect((once.match(/Content-Security-Policy/g) ?? []).length).toBe(1);
    expect(once.indexOf("Content-Security-Policy")).toBeLessThan(once.indexOf("<script"));
    expect(once.indexOf("Content-Security-Policy")).toBeGreaterThan(once.indexOf('charSet="utf-8"'));
  });

  it("never allows inline or eval'd scripts, plugins, framing or foreign base URIs", () => {
    const p = buildPolicy(["abc"]);
    const scriptSrc = /script-src ([^;]*)/.exec(p)![1];
    expect(scriptSrc).toContain("'self'");
    expect(scriptSrc).toContain("'sha256-abc'");
    expect(scriptSrc).not.toMatch(/unsafe-inline|unsafe-eval|\*(?!\.googletagmanager)/);
    for (const d of ["object-src 'none'", "frame-src 'none'", "base-uri 'self'", "form-action 'self'", "default-src 'self'", "upgrade-insecure-requests"]) expect(p).toContain(d);
  });

  it("limits connect-src to the configured Supabase project when one is set", () => {
    const prev = process.env.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://abcdefgh.supabase.co";
    try {
      expect(buildPolicy([])).toContain("connect-src 'self' https://abcdefgh.supabase.co ");
    } finally {
      if (prev === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      else process.env.NEXT_PUBLIC_SUPABASE_URL = prev;
    }
    expect(buildPolicy([])).toMatch(/connect-src 'self' https:\/\/\*\.supabase\.co /);
  });
});

describe("optional CAPTCHA origin", () => {
  it("allows Cloudflare Turnstile (script + frame) only when a CAPTCHA site key is set", () => {
    const prev = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    try {
      delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      expect(buildPolicy([])).not.toContain(TURNSTILE_ORIGIN);
      expect(buildPolicy([])).toContain("frame-src 'none'");
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "not a key";
      expect(buildPolicy([])).not.toContain(TURNSTILE_ORIGIN);
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "1x00000000000000000000AA";
      const directives = Object.fromEntries(buildPolicy(["abc"]).split("; ").map((d) => [d.split(" ")[0], d.split(" ").slice(1)]));
      expect(directives["frame-src"]).toEqual([TURNSTILE_ORIGIN]);
      expect(directives["script-src"]).toContain(TURNSTILE_ORIGIN);
      expect(directives["script-src"].join(" ")).not.toMatch(/unsafe/);
      expect(directives["object-src"]).toEqual(["'none'"]);
    } finally {
      if (prev === undefined) delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      else process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = prev;
    }
  });
});
