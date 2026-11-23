# Phase 2 completion audit

**A dated snapshot**, as of 2026-11-23 (01:35 UTC). The live status, the owner decisions and the completion criteria are kept only in [`PHASE_2_TRACKER.md`](PHASE_2_TRACKER.md). `main` is `9019a1c`, and production serves that build (GitHub Pages deployment `7988286758`). The finding-by-finding detail is in [`PHASE_2_TRACKER.md`](PHASE_2_TRACKER.md), and the runbook and rollback in [`PHASE_2_RELEASE.md`](PHASE_2_RELEASE.md).

**Overall: RELEASE-INCOMPLETE.**
- **Done and live:**
  - every Phase 2 PR is merged and deployed, including #7, the accounts platform and the whole release stack;
  - the seven student tools work, are tested, and are verified in production as **local-first** tools (data stays in the student's browser);
  - M1, H1 and the JEE accessibility fix are live;
  - the account code is deployed but **dormant**: login is hidden (H1), production has no account database, and deletion is shown as not set up, with the Contact-page fallback.
- **Blocked:**
  - **legal and owner:** legal sign-off (F12), the production schema inventory and backup (F10), and the Auth settings (F3);
  - **separately gated:** production migrations, the function and the scheduler; the 7 email checks (E1); the accounts UI; cloud sync.

No legal compliance is claimed.

## Status legend
| Status | Meaning |
|---|---|
| COMPLETE | Done, with evidence |
| IN PROGRESS | Partly done |
| BLOCKED | Waiting on an owner, legal or other outside action |
| FAILED | Tried, and doesn't work |
| NOT VERIFIED | Not checked, or can't be checked from here |

## Definition of complete
| Requirement | Status | Evidence or blocker |
|---|---|---|
| All seven tools functional | COMPLETE (local-first) | Unit, E2E (90/90) and live production checks (14/14), below |
| All seven have verified persistence | COMPLETE (in the browser, across reloads) · BLOCKED (cloud) | Cloud persistence needs sync, which waits on F12 |
| Authentication works as designed | IN PROGRESS | #7 has PKCE login, generic errors and session restore, verified on staging (15/15). The live site hides login (H1) by owner decision; the accounts UI is turned on only after F3, F12 and F13 |
| Student ownership enforced | COMPLETE on staging · NOT VERIFIED in production | RLS probe 25/25; release check 63/63 (A-versus-B isolation). Production has no account tables |
| RLS validated | COMPLETE on staging and in PGlite · BLOCKED in production | Production migrations wait on F12 and F10 |
| Migrations reviewed and applied where authorised | COMPLETE on staging (4 of 4) · BLOCKED in production | Owner-gated runbook, section 9 C |
| M1 resolved | COMPLETE | #17 `5bc0cd8`; live: no #418 at +1 and +3 days |
| H1 remains functional | COMPLETE | Live check 15/15 after each deploy |
| JEE accessibility fixed | COMPLETE | #14 `21d0d11`; live accessibility audit shows 0 issues |
| Required security review complete | COMPLETE for code · BLOCKED for production configuration | Below |
| Privacy and legal status resolved or documented | BLOCKED (documented) | F12 counsel review outstanding. F13 decided by the owner on 2026-11-23: `/privacy` is published as a labelled draft, noindex and outside the sitemap (live-verified). It is not a final notice |
| Unit tests pass | COMPLETE | On code identical to `main` `9019a1c` (tree `b9beb13`): 622 passed, 1 skipped |
| Integration tests (PGlite database, staging) pass | COMPLETE | Database suites in the unit run; staging 63/63, 38/38, 15/15 |
| Build passes | COMPLETE | CI and local |
| E2E passes | COMPLETE | 90/90 on `main` and on the release branch |
| Accessibility checks pass | COMPLETE | E2E audit of 18 pages; live audit, 0 issues |
| Mobile and desktop checks pass | COMPLETE | No overflow at 360–1536 px (E2E); live at 360, 390, 768 and 1280 px |
| No known critical production defects | COMPLETE | Live audit: 0 console errors, 0 broken links |
| All required Phase 2 PRs integrated | COMPLETE | #7 squash-merged as `9019a1c` on 2026-11-23, at the approved head `dc6e1f1` |
| Documentation updated | IN PROGRESS | This file, the tracker, the release notes and `supabase/README.md`. A later review found stale statements (#7 "not merged", F4 to F6 "not merged", F3 "blocks merging #7"), corrected in #19 |
| Production deployment successful; commit matches `main` | COMPLETE | Pages run #777 (`45095158662`), deployment `7988286758` = `9019a1c` = `main` |
| Post-deployment verification | COMPLETE for the public site and local-first tools · NOT VERIFIED for real accounts | New pages 16/16, seven tools 14/14, H1 15/15, M1 (+1 and +3 days), broad audit; no real account was used |

## The seven student tools
Every tool stores its data in the browser (`atlas:*` keys; frozen formats, tested in `student-data-compat.test.ts`). Each also has a server-side table in #7, which is used only by cloud sync. **Sync is off** (`CLOUD_SYNC_ENABLED = false`, and both `app_config` switches are `'false'`), so no study data leaves the browser.

| Tool | Feature | Tests | Live production check (2026-11-22) | Cloud (#7) |
|---|---|---|---|---|
| Bookmarks | Add and remove from chapter and resource pages; search and filter on `/dashboard/bookmarks/` | Unit; E2E (search, remove, persist) | Add, no duplicate on re-toggle, listed after reload | BLOCKED (F12) |
| Mistake tracking | Record from practice pages; categorise, explain, resolve, reopen; repeated-question flag | Unit; E2E | Categorise and resolve saved | BLOCKED (F12) |
| Revision | Spaced rounds 1–3; due, overdue and completed states; history | Unit; E2E (round 2) | Due chapter listed, round 2 recorded | BLOCKED (F12) |
| Study streaks | Any study action records today in local time; extends from yesterday; no repeat within a day; gaps reset; never back-filled | Unit; E2E (+1 from yesterday, no same-day repeat) | +1 from yesterday, using the local date | BLOCKED (F12) |
| Checklists | Per-chapter notes, formula sheet, practice and PYQ; tick and untick; completion counts | Unit; E2E (tick, persist, untick) | Tick saved, persists across reloads | BLOCKED (F12) |
| Activity log | 30-day, newest-first timeline; 28-day calendar; real actions always logged; repeat chapter visits within 30 min ignored (#18) | Unit (de-duplication); E2E | No duplicate visit on reload; timeline ordered | Device-only by design (never uploaded) |
| Learning goals | Track and stop goals; progress and forecast | Unit; E2E (track, persist, stop) | Tracked goal persists after reload | BLOCKED (F12) |

Also checked: the empty dashboard (5 cards), the populated dashboard at 390 px with no overflow, 0 console errors, and 0 requests to Supabase.

**Not verified:**
- the tools for a signed-in student with cloud copies, which needs sync on (F12);
- multiple devices;
- the server-side rate of duplicate uploads.

The sync engine's design (idempotent upserts, tombstones, conflict merge) was tested on staging on 2026-11-21 only by the retired `npm run test:staging` run.

## PRs integrated
| PR | Merged into | Commit | Deployed |
|---|---|---|---|
| #16 (H1) | `main` | `357b061` | Yes |
| #14 (JEE accessibility) | `main` | `21d0d11` | Yes |
| #17 (M1) | `main` | `5bc0cd8` | Yes |
| #18 (activity de-duplication; tools E2E) | `main` | `367d430` | Yes |
| #15 (deletion gate, rate limits, sweep, H1 for the stack, safe staging check) | #10's branch | `c76349d` | No (feature branch) |
| #10 (staging tooling, release docs) | #7's branch | `fd71d32` | No (feature branch) |
| `main` → #7's branch (merge commit) | #7's branch | `9c1b51f` | No |
| **#7 (accounts platform; the whole release)** | `main` | **`9019a1c`** (approved head `dc6e1f1`; CI run #97) | Yes: run #777, deployment `7988286758` |

## Production verification of `9019a1c` (2026-11-23, read-only)
All checks ran in throwaway browser profiles with synthetic data. Every request to Supabase was intercepted and answered inside the browser; none reached production.

| Check | Result |
|---|---|
| `/privacy`: labelled "Draft notice, pending legal review"; `noindex, follow`; canonical; CSP | PASS |
| `/account`, `/auth/callback`, `/auth/reset-password`: `noindex, nofollow`; CSP | PASS |
| Sitemap (13 URLs) excludes `/privacy`, `/account` and `/auth` | PASS |
| Signed-out browsing makes no Supabase requests | PASS |
| `/account` signed out: no login control; "saved in this browser"; cloud copy "Not available yet" | PASS |
| `/account` with a synthetic session: Log out works; "Account deletion isn't set up… contact us from the Contact page"; delete button disabled with DELETE typed; export hidden | PASS |
| Seven local-first tools, including persistence and the 390 px layout | PASS (14/14) |
| H1: no login or sign-up control on desktop or mobile | PASS (15/15) |
| M1: no #418 with the clock moved +1 and +3 days | PASS |
| Broad audit: 49 pages crawled; 22 in the browser; CSP everywhere; 0 console errors; 0 accessibility issues; no overflow at 360, 390, 768 or 1280 px; navigation | PASS (the expected exception: the old "login dialog opens" journey fails because login is hidden) |
| A real account's login and logout against production Auth | NOT VERIFIED (no real account used; login hidden) |
| A Boards page | NOT APPLICABLE: no such route (`/boards/` is 404); Boards content is reached through `/class-11/` and `/class-12/` |

## Database and migrations
| Migration | Staging | Production |
|---|---|---|
| `20261120000000_student_accounts.sql` | Applied | **Not applied** |
| `20261121000000_service_role_grants.sql` | Applied | **Not applied** |
| `20261122000000_account_deletion_gate.sql` | Applied | **Not applied** |
| `20261122010000_deletion_rate_limit.sql` | Applied | **Not applied** |

**Production is separately gated.** The prerequisites are F12, the F10 inventory and a backup. Then deploy the function first, and apply all four migrations together with the deletion gate off (runbook section 9, C).

## Security review
1. **Technically verified:**
   - **RLS and isolation:** PGlite tests; staging probe 25/25 and release check 63/63.
   - **Consent and sync gate:** enforced in the database.
   - **Deletion gate:** server-side, off by default, failing closed; 38/38.
   - **Rate limits:** exact under parallel calls.
   - **Deletion function:** authentication and CORS; `verify_jwt` pinned in `config.toml`.
   - **CSP:** on every page, 0 violations.
   - **Login code:** PKCE, generic errors, password policy.
   - **H1:** live.
   - **No secrets** in the repository or the build.
   - **Supabase security advisors (staging):** 0 errors.
2. **Requires configuration:**
   - the sweep workflow variables and secret;
   - the optional F7 build switches;
   - interim F8 headers (hosting).
3. **Requires owner action:**
   - F3: production Auth redirect URLs, minimum password length 10, and the email confirmation setting;
   - turning off Supabase Auth API sign-ups (the H1 limitation), or accepting the risk;
   - F10: approval for the inventory, plus a backup;
   - the 7 manual email checks (E1).

   F13 was decided on 2026-11-23 (published as a draft), and the #7 merge was approved and done.
4. **Requires legal review:** F12 (DPDP), including parental consent for under-18s, GA4 for minors, and the privacy notice text.
5. **Not verified:**
   - production Supabase and Auth settings (not read);
   - the logout request of a real production account;
   - production RLS (no tables yet);
   - `npm audit`: 14 advisories in build and dev tooling, 1 moderate in the production tree at build time. Unchanged; no unplanned upgrades.

## Tests
- **CI** (the required `ci` check) passed on every merged head and on #7's head `9c1b51f`.
- **Local runs:**
  - `main` + the release: lint and `tsc` clean; unit 622 passed, 1 skipped; build-output 11 passed, 2 skipped; E2E 90/90; keyboard 22/22.
  - 5 keyboard checks are skipped by design: the login-dialog checks, while H1 is in force.
- **Staging** (synthetic accounts only):

  | Check | Result |
  |---|---|
  | `test:staging:release` | 63/63 |
  | `test:staging:deletion-gate` | 38/38 |
  | Production-configured browser journey (F9) | 15/15 |
  | RLS probe | 25/25 |

  `npm run test:staging` is retired because it enables sync.

## Rollback
- **Site:** revert the squash commit with a PR, which redeploys. Student progress in browsers is unaffected.
- **Order:** #18, #17, #14 and #16 are each independent single commits. **Don't revert #16 on its own** while login must stay hidden.
- **Database:** nothing in production to roll back. For staging, see `supabase/rollback/student_accounts_down.sql` (destructive; owner approval only).

## Remaining gates
Each needs its own explicit owner approval. None has been started.

| Gate | Status | Evidence | Risk if skipped or rushed | Prerequisite | Exact owner action | Separate approval |
|---|---|---|---|---|---|---|
| F12: legal review (privacy, DPDP, minors and parental consent, GA4, cloud sync) | BLOCKED | Draft `/privacy` live, labelled as a draft; no counsel sign-off recorded | Storing student data or finalising the notice without legal basis | None | Commission qualified counsel; record the outcome privately | Yes (counsel, then owner) |
| F10: production schema inventory and verified backup | BLOCKED | Production `public` schema never inspected; no backup recorded | The migration's schema-wide revokes could break unknown objects; no restore point | None | Approve a read-only inventory; take a backup and test that it restores | Yes |
| F3: production Auth (redirect allow-list, password minimum 10, email confirmation, sign-up setting) | BLOCKED (owner) · NOT VERIFIED | Settings never read. Signed-out visitors see no login (H1); API sign-ups stay possible until "Allow new users to sign up" is turned off | Broken email links when the UI is turned on; API sign-ups before F12 | None | In the Supabase dashboard: add `https://ajaysahuphysics.com/auth/callback/` and `/auth/reset-password/`; set the minimum length to 10; decide on email confirmation and sign-ups | Yes |
| E1: the 7 manual email checks | NOT VERIFIED | `supabase/README.md` checklist; no result recorded | Unverified confirmation and reset flows | F3; an inbox you control | Run the checklist on staging and record the results | Part of turning the UI on |
| Production migrations and Edge Function | BLOCKED | 0 of 4 applied in production; 4 of 4 on staging | Applying the first two without the gate migrations; schema conflicts (F10) | F12, F10, backup | Approve runbook section 9 C.2: deploy the function, then all four migrations together, with the gate off | Yes |
| Deletion sweep workflow | BLOCKED (inert) | `deletion-sweep.yml` on `main`; it doesn't run unless `vars.ATLAS_DELETION_SWEEP_ENABLED` is `'true'` | Without it, pending deletions aren't completed | Production migrations and function | Set `vars.ATLAS_SWEEP_URL`, `secrets.ATLAS_DELETION_SWEEP_SECRET`, then the enable switch; test that the alert email arrives | Yes |
| Production deletion gate (staged verification C.3, stages 2–5) | BLOCKED | Staging stage 1 done (38/38) | Promised deletions that never complete | Migrations, function, scheduler | Production gate-off checks, recorded evidence, then the owner's approval to open the gate and run a disposable-account test | Yes |
| Accounts UI activation (`ACCOUNTS_UI_ENABLED = true`) | BLOCKED | Login hidden; switch `false`; guard tests in CI | Sign-ups before legal sign-off and before working Auth settings | F12, F3, E1, and production database work if account features are needed | Approve a PR that flips the switch | Yes |
| Cloud sync (`CLOUD_SYNC_ENABLED` and `app_config` switches) | BLOCKED | `false` in code and on staging; never enabled in production | Student data stored online without legal basis | F12 and every item above; a parental-consent process for minors | Approve a reviewed PR and the switch changes | Yes, separately |

## Next
1. The owner and counsel: F12. In parallel: the F10 inventory and backup, and the F3 settings.
2. Then the production database release in the runbook's order: function, then the four migrations, then the scheduler, then the staged deletion verification.
3. Then turning the accounts UI on (a separate PR), and the 7 email checks.
4. Cloud sync last, as its own approval.
