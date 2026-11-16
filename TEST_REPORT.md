# Test Report

Results of the verification run for each phase branch. Newest phase first.
Only results from checks that were actually executed are recorded.

---

## Phase 1B: quick fixes (`phase-1b-fixes`; prepared, awaiting commits, push, CI and PR)

| | |
|---|---|
| **Base** | `main` at `def0e85` |
| **Environment** | Windows 11, Node v26.13.1 (local). CI (ubuntu-latest, Node 20) not yet run for 1B: the branch isn't pushed. |

### Step results (each run locally when the step was completed)
| Step | Commit | Tests | Type-check | Lint | Clean build | verify-build |
|---|---|---|---|---|---|---|
| Vitest setup | `f61732c` | ✅ 1/1 | ✅ | ✅ | ✅ | ✅ (3 known PDF issues) |
| Storage crash fix | `0ec9b60` | ✅ 107/107 | ✅ | ✅ | ✅ | ✅ |
| PDF link fix | `c028683` | ✅ 113/113 | ✅ | ✅ | ✅ | ✅ 0 broken links |
| Search analytics privacy | `f2a465f` | ✅ 127/127 | ✅ | ✅ | ✅ | ✅ |
| **OG images** | prepared, awaiting commit | ✅ **194/194** | ✅ | ✅ | ✅ (no warnings) | ✅ incl. new OG checks |
| **Modal wording + docs/config (final 1B gate)** | prepared, awaiting commit | ✅ 194/194 | ✅ | ✅ | ✅ (no warnings) | ✅ all checks incl. OG; 30 images, 202 chapter pages |

**Final 1B gate extras:**
- **OG preserved:** all 30 PNGs and 3 derived SVGs are byte-identical to the reviewed versions.
- **Modal text:** the built JavaScript contains the single new supporting text (used in both the sign-up and login views) and neither old text.
- **`engines`:** `npm ci --dry-run` accepts the new field (exit 0); CI's Node 20.x satisfies `>=20.9`.
- **Diff review:** layout, site config, Supabase/auth, storage helper, both workflows and all existing baseline files are byte-unchanged.

**Storage fix:** tests were written first. 34 failed on the old code and 73 passed, so they describe today's data formats. After the fix all pass.
**Analytics:** the built JavaScript was checked. The live site sends `search_term:e` (the typed query); the new build sends `search_term:L??"no_results"` with `L=A[0]?.entry.slug`.
**PDF:** 27/30 notes pages keep a working PDF link; the 3 with missing files show none. The visible page text is otherwise identical to the live site.

### OG images: verification detail
| Check | Result |
|---|---|
| 30 approved sources present; SHA-1 matches Commons; licence matches review record | ✅ 30/30 |
| Originals copied into the repo byte-identical (SHA-256) | ✅ 30/30 |
| Fonts: git blob SHA-1 matches GitHub for all 6 files (4 TTF + 2 OFL texts), pinned commits | ✅ |
| Derived edits: each targeted element found exactly once; rendered and inspected | ✅ 3 (Vernier crop and callouts, incline labels, "Zeit" → "time") |
| Generated images: 1200 × 630 PNG, 47–120 KB (all under 300 KB) | ✅ 30/30 |
| Regeneration deterministic (all 30 PNGs + 3 derived SVGs byte-identical on a second run) | ✅ |
| Unit tests: helper output; one image per chapter; PNG size and format; source SHA-256; licence and credit rules; every source credited in `ASSET_CREDITS.md` | ✅ 67 new tests |
| `verify-build` OG checks on the real build: 30 images valid; **202 chapter pages** (30 overview + 172 resource) use their own chapter's image; every indexable page has og:image and twitter:image on the production domain; homepage social tags identical to the pre-change baseline | ✅ |
| Existing baseline (pages, sitemap, robots, titles, canonicals) | ✅ unchanged |
| Built HTML spot-check (`/class-12/semiconductor-electronics/`, `/class-11/laws-of-motion/pyq/`) | ✅ correct og:image, twitter:image, width/height, site_name, locale; titles, descriptions and canonicals unchanged |

**Negative tests for the new OG checks** (scratch copy of `out/`, each mutation undone):

| # | Mutation | Result |
|---|---|---|
| 0 | none | ✅ pass |
| 1 | OG image missing | ✅ fail: `missing OG image` |
| 2 | wrong dimensions (192×192) | ✅ fail |
| 3 | not a PNG | ✅ fail |
| 4 | over 300 KB | ✅ fail |
| 5 | chapter page uses another chapter's image | ✅ fail |
| 6 | og:image off the production domain | ✅ fail |
| 7 | twitter:image missing | ✅ fail |
| 8 | og:image missing on a non-chapter page | ✅ fail |
| 9 | homepage social tag changed | ✅ fail |
| — | clean copy after all undos | ✅ pass |

**11/11 as expected.**

**Correction:** the Phase 0 audit listed 103 + 71 chapter resource pages. The build actually has **102 + 70 = 172** (30 overview + 172 resource = 202 chapter pages). The audit's total of 218 HTML pages was correct.

### Not yet verified
- CI on GitHub for Phase 1B (branch not pushed).
- Real-browser checks: dashboard with storage blocked; a WhatsApp/social preview of a chapter link (needs the live URL after deploy).

---

## Phase 1A: CI gate (`phase-1a-ci`)

| | |
|---|---|
| **Date** | 2026-11-13 |
| **Base** | `phase-0-audit` (`f69f9b3`), whose application code is identical to `main` (`0260f11`) |
| **Environment** | Windows 11, Node v26.13.1 (local); CI runs on ubuntu-latest with Node 20 |
| **Scope** | CI workflow, build verification script, baseline, deploy guard. No application code changed. |

### 1. Quality gate (local, same steps as CI)

| Step | Command | Result |
|---|---|---|
| Workflow syntax | parse `ci.yml` and `deploy.yml` with js-yaml | ✅ both valid; `deploy.yml` build and deploy jobs both carry `if: github.ref == 'refs/heads/main'` |
| Type-check | `npx tsc --noEmit` | ✅ 0 errors |
| Lint | `npm run lint` (also covers `scripts/*.mjs`) | ✅ 0 problems; `eslint scripts/verify-build.mjs --max-warnings 0` passes |
| Unit tests | `npm test --if-present` | ✅ skipped (no `test` script yet; Vitest arrives in 1B), exit 0 |
| Production build | `rm -rf out && npm run build` | ✅ success, 218 pages + `404.html` |
| Build verification | `node scripts/verify-build.mjs` | ✅ all checks passed; 3 known issues reported as notes |

### 2. Baseline integrity
The baseline was generated by `verify-build.mjs --update-baseline` from a build of unchanged application code. It was then compared with a baseline captured independently on 2026-11-12 using different shell tooling:

| File | Entries | Matches 2026-11-12 capture |
|---|---|---|
| `pages.txt` | 219 HTML files | ✅ identical |
| `sitemap.txt` | 215 URLs | ✅ identical |
| `robots.txt` | 3 lines | ✅ identical (blank lines are normalised on purpose) |
| `meta.tsv` (canonicals) | 216 pages (all except the 2 not-found pages) | ✅ identical |

The link check also found the broken internal links on its own: **exactly 3**, the missing PDFs already found in the Phase 0 audit (`electromagnetic-induction`, `semiconductor-electronics`, `wave-optics`). No other broken internal link exists on any of the 218 pages.

### 3. Negative tests: does each check actually catch failures?
Each case mutates a scratch copy of `out/`, runs the verifier, and undoes the mutation. (The test harness lives outside the repository and isn't committed.)

| # | Mutation | Expected | Result | First failure reported |
|---|---|---|---|---|
| 0 | none (clean copy) | pass | ✅ pass | — |
| 1 | delete `/class-11/kinematics/pyq/` | fail | ✅ fail | `[urls] page missing from build` |
| 2 | replace a sitemap URL | fail | ✅ fail | `[sitemap] URL dropped from sitemap` |
| 3 | change `robots.txt` to `Disallow: /` | fail | ✅ fail | `[robots] robots.txt changed` |
| 4 | change the `/about/` title | fail | ✅ fail | `[meta] title changed` |
| 5 | drop the trailing slash from a canonical | fail | ✅ fail | `[meta] canonical does not point at the page itself` |
| 6 | add a link to a page that doesn't exist | fail | ✅ fail | `[links] broken internal link /class-11/nope/` |
| 7 | add a missing PDF while it's still listed as a known issue | fail | ✅ fail | `[links] known issue is resolved … remove it` |
| 8 | add `noindex` to a page in the sitemap | fail | ✅ fail | `[sitemap] noindex page listed in sitemap` |
| 9 | remove an indexable page's sitemap entry | fail | ✅ fail | `[sitemap] URL dropped from sitemap` |
| 10 | add a new page plus its sitemap entry | pass (with note) | ✅ pass | — |
| 11 | `out/` missing | fail | ✅ fail | `./out does not exist` |
| — | clean copy after all undos | pass | ✅ pass | — |

**13/13 as expected.**

### 4. Not yet verified (needs GitHub)
| Item | Status |
|---|---|
| `ci` job runs green on GitHub Actions (Linux, Node 20) | See §5 after the branch is pushed |
| Deploy guard: a manual "Run workflow" of `deploy.yml` from a non-main branch skips both jobs | Can only be tested from the GitHub UI; doing so is safe (both jobs are skipped) |
| Branch protection requiring `ci` on `main` | Owner action in GitHub settings |

### 5. GitHub Actions results (recorded 2026-11-14 from the GitHub API)
| Run | Trigger | Commit | Result |
|---|---|---|---|
| [CI #43434439236](https://github.com/AJAYSAHUPHYSICS/ajaysahuphysics-next/actions/runs/43434439236) | push to `phase-1a-ci`, 2026-11-13 13:31 UTC | `f941ea5` | ✅ success |
| [CI #43449278781](https://github.com/AJAYSAHUPHYSICS/ajaysahuphysics-next/actions/runs/43449278781) | pull request #2, 2026-11-13 15:06 UTC | `f941ea5` | ✅ success. Every step ran and passed: install, type-check, lint, unit tests (skipped as designed), build, verify-build |
| [Deploy #43448869673](https://github.com/AJAYSAHUPHYSICS/ajaysahuphysics-next/actions/runs/43448869673) | merge of PR #1 (Phase 0) to `main` | `c7bccf6` | ✅ success |
| [Deploy #43449780054](https://github.com/AJAYSAHUPHYSICS/ajaysahuphysics-next/actions/runs/43449780054) | merge of PR #2 (Phase 1A) to `main` | `def0e85` | ✅ success; `main`'s code is identical to the reviewed `f941ea5` |

After the merges the live site responded normally (`/`, a PYQ page, a notes page, `sitemap.xml`). The owner confirmed a GitHub ruleset on `main` requiring the `ci` check. **Not tested:** a manual "Run workflow" of `deploy.yml` from a non-main branch (that would only show both jobs being skipped).

### Open issues carried forward
- 3 missing Class 12 notes PDFs (P1-4): resolved in `phase-1b-fixes` (`c028683`).
- The `og:image` check: added in `phase-1b-fixes` together with its fix.
