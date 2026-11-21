# Security Review

| | |
|---|---|
| **Last updated** | 2026-11-14 (Phase 1B, branch `phase-1b-fixes`) |
| **Scope** | Dependencies, supply chain of new packages and assets, CI/deploy, client-side data handling |
| **Production model** | Static export on GitHub Pages: no server, no API routes, no Server Actions, no image optimizer at runtime |

Audit IDs (S-x, A-x, B-x) refer to [ARCHITECTURE_AUDIT.md](ARCHITECTURE_AUDIT.md).

---

## 1. Production dependency advisories (`npm audit --omit=dev`)

At the Phase 0 audit there were **6**. As of 2026-11-14 there are **4** (1 critical, 2 high, 1 moderate). Every one arrives through `next@16.2.9`.

| # | Package (installed) | Severity | Path | What it is | Actual exposure | Status / remediation |
|---|---|---|---|---|---|---|
| 1 | `next` 16.2.9 | Critical (20 advisories) | direct | RCE/SSRF/DoS/cache poisoning in the image optimizer, Server Actions, middleware/proxy, `use cache`, `next/og`, rewrites, Windows-hosted servers; information leak from the **dev server's MCP endpoint** | **Production: none.** None of these features run in a static export. **Local:** low, and only if `next dev` is reachable from a network. | Open. Fixed by `next@16.4.6` → **Phase 1C** (approved, separate branch). |
| 2 | `postcss` 8.4.31 | High | next → postcss | `.map` file read via an attacker-controlled `sourceMappingURL`; XSS in stringified output | **None.** It processes only this repository's own CSS at build time. | Open. `next@16.4.6` ships postcss 8.5.23 → Phase 1C. |
| 3 | `sharp` 0.34.5 (optional) | High | next → sharp | libvips/libheif/librsvg vulnerabilities | **None in production.** The site sets `images.unoptimized`, so sharp only exists on the build machine. | Open. `next@16.4.6` requires sharp ^0.35.5 → Phase 1C. |
| 4 | `nanoid` 3.3.12 | High | next → postcss → nanoid | Infinite loop with a custom size ≤ 0 | None (fixed-size internal use) | ✅ **Resolved**: now 3.3.20 (lockfile dedupe during the Vitest install, owner-approved). |
| 5 | `source-map-js` 1.2.1 | High | next → postcss → source-map-js | Event-loop DoS from malformed source maps | None (own code only) | ✅ **Resolved**: now 1.2.2 (same dedupe). |
| 6 | `baseline-browser-mapping` 2.10.38 | Moderate | next → baseline-browser-mapping | Crash on invalid input | None (build time, fixed input) | Open. 2.11.36 is within range → Phase 1C. |

`npm audit fix` has **not** been run. Remediation is a targeted upgrade (`next` + `eslint-config-next` to 16.4.6, exact pins), then a refresh of in-range transitives, then `npm audit signatures`. That's planned for the separate `phase-1c-next-upgrade` branch.

## 2. Development-only advisories

The full audit (including dev dependencies) reports **16**. The 12 beyond the production four are all development tooling that never reaches students:
- **the ESLint / typescript-eslint chain:** `@typescript-eslint/*`, `typescript-eslint`, `minimatch`, `brace-expansion`, `js-yaml`, `zod`, `browserslist`;
- **Tailwind's own PostCSS:** `@tailwindcss/postcss` 4.3.1 (fixed in 4.3.5).

They run only on developer machines and in CI, against this repository's own files. **Recommendation:** a separate, later PR to refresh the dev toolchain.

## 3. Dependencies added in Phase 1B

| Package | Version | Type | Why | Supply-chain checks |
|---|---|---|---|---|
| `vitest` | **4.1.12** (exact) | dev | Unit tests | Pinned to 4.x because Vitest 5 requires Node ≥ 22.12, while CI and deploy run Node 20. Brought in 64 packages. The dedupe also updated 4 existing packages (`nanoid`, `source-map-js`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util`), all within semver range; the owner approved keeping them. Build output unchanged (verified). |
| `@resvg/resvg-js` | **2.6.2** (exact) | dev | Renders the Open Graph PNGs | Stable since 2024-03; MPL-2.0; **no JavaScript dependencies**, only 12 prebuilt per-platform binaries. 13 lockfile additions, 0 changes, 0 removals. Used only by `scripts/generate-og-images.mjs`, which is run by hand. **Not used by `next build` or CI.** |

`npm audit signatures`: all registry signatures verified (403 packages; 105 with attestations) after both installs. Neither package added any advisory.

## 4. Third-party assets (Open Graph images)

- **SVG illustrations (30):** from Wikimedia Commons. Each was checked before use:
  - SHA-1 matched against Commons;
  - scanned for embedded raster images, `data:` URIs, external URLs, `<script>`/`@import`/event handlers and `<foreignObject>`: **none found**. One scanner flag (`VFPt Solenoid correct3.svg`, URLs in `<desc>` text) was a false positive, and that file isn't used.
  - **The SVGs are never served to visitors.** They live in `assets/` (outside `public/`) and are rendered offline to PNG. Only the PNGs ship.
- **Fonts:** Source Serif 4 / Source Sans 3 (SIL OFL 1.1), from `adobe-fonts/*` on GitHub.
  - **Verification:** each file is pinned to a commit and verified against the git blob SHA-1 GitHub reports (`assets/og-fonts/provenance.json`).
  - **Use:** the generator only; never shipped to the site.
- **Edits:** the edited copies (`assets/og-sources/derived/`) are made by `scripts/derive-og-sources.mjs`. It refuses to run unless each original's SHA-256 matches the record and every targeted element occurs exactly once.

Provenance, licences and modifications: [docs/ASSET_CREDITS.md](docs/ASSET_CREDITS.md).

## 5. CI / deployment (Phase 1A, merged)

- **`ci.yml`:** read-only permissions, **no secrets**, never deploys. It runs type-check, lint, unit tests, the build, and `verify-build.mjs`.
- **`deploy.yml`:** both jobs run only on `refs/heads/main`, so a manual "Run workflow" can no longer publish a feature branch.
- **Branch protection:** the owner confirmed a GitHub ruleset on `main` requiring the `ci` check.
- **Secrets:** only the Supabase anon key is used, in the production build step. No service-role key anywhere.

## 6. Client-side data and privacy changes in Phase 1B

- **Storage hardening (B-2):** localStorage reads that could throw (blocked storage, some in-app browsers) now go through `safeGetItem()`. No keys or data formats changed (106 tests).
- **Analytics privacy (S-5):** the GA4 `search` event **no longer contains the student's typed query**. It sends the top result's chapter slug, the result count and a length bucket (`1-3`/`4-10`/`11+`). Searches already sent to GA4 before this change stay there unless the owner files a GA4 data-deletion request.

## 6a. Content Security Policy (Phase 2B-1)

GitHub Pages can't send response headers, so every exported page now carries a `<meta http-equiv="Content-Security-Policy">`. It's inserted after the build by `scripts/inject-csp.mjs` (npm `postbuild`), directly after `<meta charset>`, before any script.

**Policy:**
- `script-src`: `'self'`, the SHA-256 of **each page's own inline Next.js bootstrap scripts**, and `https://*.googletagmanager.com`. No `'unsafe-inline'`, no `'unsafe-eval'`.
- `connect-src`: `'self'`, the configured Supabase project origin (or `https://*.supabase.co` when no project is configured) and the GA4 endpoints.
- `img-src`: `'self'`, `data:` and GA4.
- `style-src`: `'self' 'unsafe-inline'`, because React writes inline style attributes.
- `font-src 'self'` (fonts are self-hosted).
- `default-src`, `base-uri`, `form-action`, `manifest-src` and `worker-src`: `'self'`.
- `object-src` and `frame-src`: `'none'`.
- `upgrade-insecure-requests`.

**Supporting changes:**
- **GA4 bootstrap** moved from an inline `next/script` into `public/ga-init.js` (same measurement ID, same behaviour).
- **JSON-LD** is serialised with `serializeJsonForScript` (`src/lib/jsonld.tsx`), which escapes `<`, U+2028 and U+2029, so a value containing `</script>` can't break out of the data block.

**Verification:**
- `src/build-checks/csp.check.ts` (CI, after the build) checks that every page:
  - has exactly one policy, placed before any script;
  - hash-lists every inline script;
  - never allows inline or eval'd scripts.
- In headless Chrome against the built site:
  - 18 pages, including client-side navigation, the 404 page and GA4 loading: **0 CSP violations, 0 console errors**;
  - an injected un-hashed inline script **was blocked** (positive control).

**Limits of a meta-tag policy:**
- `frame-ancestors` (clickjacking), `report-uri` and `sandbox` are ignored in `<meta>`.
- `X-Frame-Options` and `X-Content-Type-Options` still need a host that can send headers (see the hosting comparison).
- `style-src 'unsafe-inline'` remains.

## 7. Open items

| Item | Plan |
|---|---|
| `next` and three transitive advisories | Phase 1C (`next@16.4.6`) |
| CI/deploy run Node 20, which is end-of-life | Phase 1C (Node 22), owner-deferred |
| Dev-toolchain advisories | Separate later PR |
| No HTTP security headers (GitHub Pages limitation): CSP now delivered by meta tag (§6a); `frame-ancestors`, `X-Frame-Options`, `X-Content-Type-Options` still need a header-capable host | Hosting decision (Phase 2 hosting comparison) |
| RLS / database security | Phase 4 (after DPDP review) |
