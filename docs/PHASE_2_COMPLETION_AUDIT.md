# Phase 2 completion audit

Status as of 2026-11-23. `main` is `367d430`, and production serves that build. The release branch is #7 at `9c1b51f` (not merged). The finding-by-finding detail is in [`PHASE_2_TRACKER.md`](PHASE_2_TRACKER.md), and the runbook and rollback in [`PHASE_2_RELEASE.md`](PHASE_2_RELEASE.md).

**Overall: RELEASE-INCOMPLETE.**
- **Done and live:** the seven student tools work, are tested, and are verified in production as **local-first** tools (data stays in the student's browser). M1, H1 and the JEE accessibility fix are fixed and live.
- **Blocked on decisions:**
  - the accounts platform (#7) waits on the F13 owner decision;
  - cloud sync and the production database wait on legal sign-off (F12);
  - the production schema inventory (F10) and the Auth settings (F3) are owner actions.

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
| Privacy and legal status resolved or documented | BLOCKED (documented) | F12 counsel; F13 owner decision |
| Unit tests pass | COMPLETE | `main`: 474 passed, 1 skipped; release branch: 622 passed, 1 skipped |
| Integration tests (PGlite database, staging) pass | COMPLETE | Database suites in the unit run; staging 63/63, 38/38, 15/15 |
| Build passes | COMPLETE | CI and local |
| E2E passes | COMPLETE | 90/90 on `main` and on the release branch |
| Accessibility checks pass | COMPLETE | E2E audit of 18 pages; live audit, 0 issues |
| Mobile and desktop checks pass | COMPLETE | No overflow at 360–1536 px (E2E); live at 360, 390, 768 and 1280 px |
| No known critical production defects | COMPLETE | Live audit: 0 console errors, 0 broken links |
| All required Phase 2 PRs integrated | IN PROGRESS | #7 (the collapsed stack) waits on F13 |
| Documentation updated | COMPLETE | This file, the tracker, the release notes and `supabase/README.md` |
| Production deployment successful; commit matches `main` | COMPLETE for `367d430` | The GitHub Pages deployment SHA equals `main` |
| Post-deployment verification | COMPLETE for `367d430` | Live audit, H1, M1 and seven-tool checks |

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
| **#7 (accounts platform; the whole release)** | **Not merged** | Head `9c1b51f` | — |

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
   - F13: the privacy-notice decision;
   - the 7 manual email checks (E1);
   - approval of the merge of #7.
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

## Next
1. The owner's F13 decision, then merge #7: one squash, which deploys.
2. Then, after F12, F10 and a backup: production migrations, the function and the scheduler, in the staged deletion verification order.
3. Then F3, and a separately approved PR to turn the accounts UI on. Then the 7 email checks.
4. Cloud sync last, after counsel, as its own approval.
