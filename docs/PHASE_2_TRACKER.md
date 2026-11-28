# Phase 2 release tracker

**This is the single authoritative Phase 2 tracker.**
- [`PHASE_2_COMPLETION_AUDIT.md`](PHASE_2_COMPLETION_AUDIT.md) is a dated snapshot (2026-11-23, 01:35 UTC).
- The release notes, runbook and rollback are in [`PHASE_2_RELEASE.md`](PHASE_2_RELEASE.md).

- The whole-project view, with evidence for every claim, is the master audit in #28 (a dated snapshot of 2026-11-25; it adds `docs/ATLAS_MASTER_PROJECT_AUDIT.md` once merged).

Last updated 2026-11-28. No legal approval, production database change or production readiness is claimed anywhere in this file.

## Live status (2026-11-25)
**Overall: RELEASE-INCOMPLETE.** Phase 2 is the complete scope: student accounts, verified email, account management, cloud sync, security, privacy and deletion (owner decision H, reaffirmed 2026-11-25).
- **Deployment:** `main` = production = `b3f7168` (#26, this tracker's reconciliation, squash-merged 2026-11-25 07:45 UTC; deploy run `45570635616`, success, with both its `build` and `deploy` jobs). Before it: `b18b62e` (#27; deploy run `45378204301`, 2026-11-24).
  - #27 changed only the staging guard, its script and tests; #26 changed only `README.md` and two files in `docs/`. So no page changed in either.
  - The live journeys were last run after `0244587` (2026-11-23): seven tools 14/14, hidden login 15/15, 0 console errors, and no Supabase request reached production.
  - After #27 and #26, only the site's reachability was re-checked (HTTP 200 on `/`, `/privacy/` and `/dashboard/`, 2026-11-25). **That's not a live-journey check.**
- **Live behaviour:** login is hidden (H1), account deletion shows as not set up, and cloud sync is off (`CLOUD_SYNC_ENABLED = false`).
- **Supabase projects:**

  | Project | Ref | Role | Phase 2 schema |
  |---|---|---|---|
  | Staging | `wtuifivaxnhdnfwjsayk` | Rehearsal, synthetic data only | Migrations 1–5 applied; migration 6 not applied (its dry run on 2026-11-24 listed only it) |
  | Current production | `dykhwagloqxawgfkmjmc` | The project the live site's build points at | **None.** The owner's read-only inventory (2026-11-24) found an older legacy schema that isn't in git, with no application rows and no Storage objects. It has existing Auth accounts from before 2026-11-22; public sign-ups stay on (decision B) |
  | **New production** | `fuznyurpfqgjricivopd` | Destination for the Phase 2 database | **None.** The owner's read-only inventory (2026-11-24) found only the platform function `public.rls_auto_enable()` |

  **Fresh start (owner decision, 2026-11-24):** the Phase 2 schema is created in the new project from the repository migrations. **No old Auth account and no data is copied** (there's no application data to copy), so existing account holders register again. The site then switches projects by changing its two Supabase GitHub secrets (the cutover, T-30). The current project is only read until its retirement, which needs its own approval; it must never be deleted otherwise.
- **Privacy notice:** `/privacy` is a labelled draft, `noindex`, outside the sitemap.

Statuses: COMPLETED · IN PROGRESS · BLOCKED · AWAITING OWNER APPROVAL · POST-LAUNCH · NOT STARTED. COMPLETED means done and verified with the evidence shown. Work that is only prepared, documented or merged is not COMPLETED.

| ID | Workstream | Status | Owner | Dependency | Evidence | Next action |
|---|---|---|---|---|---|---|
| T-01 | Release baseline: `main` = deployed | COMPLETED | — | — | `b3f7168` (#26) = deploy run `45570635616` (success, 2026-11-25); site reachable 2026-11-25. Before it: `b18b62e` (#27) = run `45378204301`; `0244587` = deployment `7995693613` | Re-check after every merge |
| T-02 | Seven student tools, local-first | COMPLETED | — | — | Live 14/14 after the `0244587` deploy (2026-11-23); #27 and #26 changed no page. E2E 90/90 in Chrome, Edge, Firefox and WebKit on the combined tree of #19–#24 (2026-11-23) | — |
| T-03 | Seven tools: browsers beyond Chrome | COMPLETED (engine level) | — | — | #23 merged (`86e3d59`). Firefox 157 and WebKit 27.2 at E2E 90/90; keyboard 22/22 and 15/15 (12 skipped: 5 H1, 7 Tab-to-link). Non-required `e2e-firefox` and `e2e-webkit` CI on every PR. **Not covered:** real Safari on macOS or iOS | — |
| T-04 | Documentation reconciled with the release | IN PROGRESS | Owner (merge #28, this correction; #25 for `supabase/README.md`) | — | #19 merged (`0244587`). This tracker, `PHASE_2_RELEASE.md` and `README.md` were reconciled in #26, **merged** 2026-11-25 as `b3f7168`. Their status lines then still described #26 as open; this correction fixes that. **Still unmerged:** `supabase/README.md` (#25), the master audit (#28) and this correction | Merge them; COMPLETED only once merged |
| T-05 | Privacy notice: accurate statements | COMPLETED | — | — | #20 merged (`b238489`); live `/privacy` shows both corrected sentences, still a labelled draft, `noindex`, outside the sitemap | Update it for accounts and cloud sync before activation (T-24) |
| T-06 | Legal review (F12) | POST-LAUNCH | Owner, counsel | — | Owner decision I: formal counsel review after launch. A dispatch-ready question set (L-1 to L-20) is held privately. **Not legally approved**; a known, owner-accepted risk | Engage counsel after launch |
| T-07 | F10: read-only inventory tooling and procedure | COMPLETED | — | — | #21 merged (`6d39449`): `schema_inventory.sql` (10 tests); runbook 9, C.1a–C.1d. Read-only first line verified on staging | — |
| T-08 | Production read-only inventories (both projects) | COMPLETED | — | — | Decision C. Run by the owner on 2026-11-24 in each project's dashboard SQL editor, read-only, with the ref typed in; results reviewed privately. Current production: a legacy schema, 0 application rows, 0 Storage objects. New production: only `rls_auto_enable()`. The comparison found 0 blockers and 0 conflicts for a fresh start | Re-run the new project's inventory immediately before the first migration (runbook 9) |
| T-09 | Production backup | NOT STARTED (optional, at retirement) | Owner | Retirement of the current project | Decision D predates the fresh start. With nothing to copy, the migration needs no backup. A backup of the current project is an optional safeguard before its retirement, decided then. Any connection method that creates a temporary production role still needs its own approval | Decide at retirement |
| T-09b | Restore rehearsal | POST-LAUNCH | Owner (separate approval) | T-09 | Owner decision E | — |
| T-10 | F3: the **new production project's** Auth settings ("Confirm email" on; redirect URLs, Site URL, password minimum 10) | AWAITING OWNER APPROVAL | Owner | — | Decision K makes verification mandatory. **"Confirm email" must be on before #25 is merged and before any production migration**: while it's off, Supabase confirms new users automatically at sign-up, so "verified" wouldn't prove the address for new accounts. Changing the setting needs explicit authorisation | Authorise the F3 checklist (runbook 9, A.1); then read the setting back to verify it |
| T-11 | Public sign-ups | COMPLETED (kept on, current project) | — | — | Owner decision B: keep public sign-ups enabled on the current project; no change made. The new project's sign-up setting is part of T-10 | — |
| T-12 | `delete-account` function in the new project, with the gate off | AWAITING OWNER APPROVAL | Owner | T-10 | Not in the approval register: the Edge Function deployment, and the `ATLAS_DELETION_SWEEP_SECRET` secret. Neither production project has any Edge Function today. It must come **before** the migrations | Approve the deployment and the secret |
| T-13 | Migrations in the new project: nine, each separately approved (below) | AWAITING OWNER APPROVAL (each) | Owner | T-10, T-12; #30 merged for the eighth and ninth | 0 of 9 in either production project. Staging: 7 of 9 (see "Staging verification (2026-11-27)"); the eighth and ninth (#30) aren't applied anywhere. A private approval package exists (it predates migrations 7–9) | Approve each, then run them consecutively in one window |
| T-14 | Least privilege on `deletion_log_id_seq` | COMPLETED on staging · production in T-13 | — | — | #22 merged (`561cb22`). **Applied to staging 2026-11-23** (decision F): fresh dry run listed only it; only that grant changed; `nextval` as a student denied (42501); the deletion log is still written; consent inserts work; `test:staging:release` 63/63; staging left with 0 users and every switch `'false'` | Production with T-13 |
| T-15 | Deletion sweep workflow configured | NOT STARTED | Owner (variables, secret) | T-13 | `deletion-sweep.yml` inert; 0 repository variables | Runbook 9, C.2.5 |
| T-16 | Deletion verification: staging, gate open (stage 1) | COMPLETED | — | — | `test:staging:deletion-gate` 38/38 on 2026-11-22 | — |
| T-17 | Deletion verification: production stages 2–5 | BLOCKED | Owner (approval at each stage) | T-15 | None | Runbook 9, C.3 |
| T-18 | Export pending deletions before a database rollback | COMPLETED | — | — | #24 merged (`bc9a960`): read-only export with a content-integrity ack; the rollback locks both tables and refuses unless the ack matches; 17 tests; staging, guard-only, synthetic data | — |
| T-19 | F7: analytics and CAPTCHA build switches | AWAITING OWNER APPROVAL | Owner | — | Switches work in code; not wired into `deploy.yml` | Approve a workflow PR |
| T-20 | F8: frame protection and security headers | AWAITING OWNER APPROVAL | Owner (hosting) | — | GitHub Pages sends only HSTS | Hosting decision, or the interim in-page guard |
| T-21 | Accounts UI activation | BLOCKED | Engineering, then launch | T-10, T-13, T-22, T-24 | Decision H keeps it in scope; decision L authorises launch once the technical gates pass. `ACCOUNTS_UI_ENABLED = false` | Activate after the gates |
| T-22 | E1: the 7 email checks | BLOCKED | Engineering (inbox) | T-10 | None recorded | Run on staging, then on production |
| T-23 | Cloud sync for adults | BLOCKED | Engineering, then launch | T-10 ("Confirm email" on), T-13 (all nine migrations, including #25's and #30's), T-21 | Decision H. `CLOUD_SYNC_ENABLED = false`; switches `'false'`. Activation needs the `adult_sync_permitted` switch, a production database write. **Not blocked by T-23b** | Activate after these gates |
| T-23b | **Cloud sync for under-18s** | **BLOCKED** (separately) | Owner (decision), engineering | A verified parental-consent process | `minor_sync_permitted` also requires `parental_consent_verified()`, which only a verified server process can satisfy, and **no such process exists**. Under-18 students aren't silently excluded: they keep their account, device progress, export and deletion, and `enable_sync()` tells them cloud copies aren't available for under-18s yet. **It doesn't block adult sync** (owner decision O) | A parental-consent proposal for owner decision |
| T-24 | Privacy notice and consent screens for accounts and sync | IN PROGRESS | Engineering | — | Decision J: approved before launch. The live notice is an accurate draft for the dormant platform; it doesn't yet describe live accounts and sync. #30 (open): the cloud-copy label and the `/privacy` paragraph say what is copied and what a withdrawal does; the owner approved that wording on 2026-11-28. It's owner-reviewed wording, not legal approval (T-06) | Update the notice; check the consent flow on staging |
| T-25 | Production target and access | COMPLETED (target decided) · access NOT VERIFIED | Owner | — | 2026-11-23: the owner confirmed the project the live site uses. **Superseded 2026-11-24:** the Phase 2 database goes to the new project `fuznyurpfqgjricivopd` (fresh start; Live status). The CLI's access to the new project hasn't been checked. Nothing has been run against either production project except the owner's read-only inventories | Verify CLI access to the new project, read-only, when its first approved step comes |
| T-26 | Verified email required for cloud sync (decision K), and the M1 sync fix | AWAITING OWNER APPROVAL | Owner (merge #25, after T-10) | T-10 | #25 (open), migration `20261124000000`. **Unverified accounts can neither read nor write** cloud-sync rows: the SELECT policies require `email_verified()`; the INSERT and UPDATE policies call `sync_allowed()`, which requires it. Export and deletion stay available. `db-verified-email.test.ts`: 15 tests. **M1** (`2f2a9d9`): hidden or missing cloud rows never delete device data. The engine proceeds only on an explicit `sync_allowed() = true`, and stops with `cloud-incomplete` when an agreed record is missing; 9 regression tests, 8 of which fail without the fix. **The M1 fix isn't on `main`, so sync must not be enabled from `main` as it stands.** Staging: not applied. **Known limitation (owner decision M):** existing Auth accounts are trusted as they stand | Turn "Confirm email" on in the target project (T-10), then merge #25; then the sixth migration in T-13 |
| T-27 | Staging guard: allow only the staging project | COMPLETED | — | — | #27 merged (`b18b62e`): `guard.mjs` is an allow-list; both production refs are refused by name, even when "confirmed". `staging-guard.test.ts`, `staging-env.test.ts` | — (the CLI path is outside the guard: check the linked ref by hand) |
| T-28 | Staging: function ownership and rollback prerequisites | **NOT VERIFIED** | Owner (runs a read-only query) | — | The one attempt (2026-11-24) returned no usable result. A read-only query (revision 4) is prepared, not run. It checks the owners, `search_path`, EXECUTE grants, the six `_own_select` policies and the rollback's needs | Owner runs it in the **staging** SQL editor and shares the result |
| T-29 | Migration 6 on staging, and a `test:staging:verified-email` check | NOT STARTED | Owner (approvals), engineering | T-28; staging "Confirm email" read back | The staging dry run (2026-11-24) listed only migration 6. The check doesn't exist yet; it must never enable sync | Approve the check's PR, then the staging apply |
| T-30 | Cutover: point the site at the new project | NOT STARTED | Owner (approval) | T-13 verified | Change `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (record the current values privately first), redeploy, check the live site | Approve the cutover |
| T-31 | Decision J: withdrawal deletes the cloud copy; consent cap; lock order; cloud generation | AWAITING OWNER APPROVAL | Owner (merge #30) | `main` merged into #30 (done locally, not yet committed) | Migrations `20261126100000` and `20261127000000` and their rollbacks; the full rollback procedure covers all nine. Local results only, on #30 with `main` merged in (`db-withdraw-concurrency.test.ts` runs against a disposable local PostgreSQL 17). **Staging: not applied. Production: not applied** | Commit and push #30 (approval), then the staging dry run and apply (separate approvals) |

### Production migrations (T-13): nine, in filename order
| # | Migration | Purpose | `main` | Staging | Production |
|---|---|---|---|---|---|
| 1 | `20261120000000_student_accounts.sql` | Tables, RLS, consent gate, export, two-step deletion; schema-wide client revokes | Yes | Applied | Not applied |
| 2 | `20261121000000_service_role_grants.sql` | Server-role least privilege | Yes | Applied | Not applied |
| 3 | `20261122000000_account_deletion_gate.sql` | Deletion gate (off, fails closed) | Yes | Applied | Not applied |
| 4 | `20261122010000_deletion_rate_limit.sql` | Deletion rate limits | Yes | Applied | Not applied |
| 5 | `20261123000000_deletion_log_sequence_privilege.sql` | T-14 | Yes | **Applied 2026-11-23** | Not applied |
| 6 | `20261124000000_require_verified_email_for_sync.sql` | Decision K | Yes (#25, merged as `328e87a`) | **Applied 2026-11-27** (staging only; evidence: "Staging verification (2026-11-27)" below, and `supabase/README.md`, staging record, 2026-11-26 dry run and 2026-11-27 apply) | Not applied |
| 7 | `20261126000000_remove_age_restrictions.sql` | No age limit (decision P) | Yes (#25, merged as `328e87a`) | **Applied 2026-11-27** (staging only; evidence: "Staging verification (2026-11-27)" below, and `supabase/README.md`, staging record, 2026-11-26 dry run and 2026-11-27 apply) | Not applied |
| 8 | `20261126100000_consent_recorded_at_server_only.sql` | Students can't set `consents.recorded_at` | No (#30 open) | Not applied | Not applied |
| 9 | `20261127000000_withdraw_cloud_copies.sql` | Decision J: withdrawal deletes the cloud copy | No (#30 open) | Not applied | Not applied |

"Production" means the **new** project `fuznyurpfqgjricivopd`. None of the nine is applied in either production project.

**Each needs its own approval.**
- **Run them consecutively in one maintenance window.** Migration 1 alone would leave `request_account_deletion()` without its gate until migration 3, while public sign-ups are on.
- **The function deployment (T-12) comes first.**

### Current release procedure (authoritative)
This is the only current procedure. `PHASE_2_RELEASE.md` section 9 gives the same order with each step's details. Where any older text disagrees, this one applies. Every step targets the **new** project `fuznyurpfqgjricivopd` unless it says otherwise; confirm the ref in the dashboard address bar each time.
1. **Staging rehearsal of migration 6** (T-28, T-29): the read-only ownership check, staging "Confirm email" read back, then the approved staging apply and the `test:staging:verified-email` check.
2. **The new project's Auth settings, with "Confirm email" on** (T-10, separate approval), then read back. This **must precede steps 3 and 6**: #25's check is only meaningful for new accounts once Supabase stops auto-confirming.
3. **Merge #25** (owner approval), so the sixth migration and the M1 sync fix are on `main`.
4. **Re-run the new project's read-only inventory and the preflight** (T-08): still empty apart from `rls_auto_enable()`, with an empty migration history.
5. **`delete-account` function and its secret** (T-12, separate approvals).
6. **The nine migrations** (T-13), **each separately approved**, applied consecutively in one window. Then verify: the inventory, `schema_inventory.sql`, RLS on every table, no `anon` or PUBLIC grants, and the function owners.
7. **Cutover** (T-30, approval): record the two current GitHub secret values privately, switch them to the new project, redeploy, check the live site.
8. **Deletion sweep workflow** (T-15) and the production deletion stages (T-17), each approved.
9. **Privacy notice and consent screens** (T-24), then the 7 email checks (T-22).
10. **Activation** (decision L, once every technical gate passes):
    - accounts UI (T-21);
    - adult cloud sync (T-23).
11. **Retirement of the current project** `dykhwagloqxawgfkmjmc`, only with its own approval after an observation period. Decide then on a backup or erasure (T-09).

    Under-18 sync is separate. It's offered only after a verified parental-consent process exists (T-23b), and it doesn't hold back the adult activation.

**Legal review isn't a gate for these steps.** Owner decision I moved formal counsel review to after launch. The privacy notice stays labelled a draft, and no legal approval is claimed (T-06).

**Superseded instructions, kept as historical:**
- **`PHASE_2_RELEASE.md`:** reconciled in #26. The legal-sign-off gate is removed (decision I), the order matches this procedure, there are six migrations in the new project, and the earlier merge-and-audit material is labelled historical.
- **The 2026-11-23 version of this procedure** (CLI access to the current project, then its inventory and backup) is superseded by the fresh start of 2026-11-24.
- **This file's "Release dependencies" and "Merge readiness" sections below** are the 2026-11-22 plan: legal sign-off first, four migrations.

### Phase 2 completion criteria (2026-11-25)
| # | Criterion | Status |
|---|---|---|
| 1 | All agreed functionality implemented | IN PROGRESS: code built; T-26 open (#25); under-18 verification not built (T-23b) |
| 2 | Seven tools verified | COMPLETED at engine level; real Safari devices not tested |
| 3 | Tests pass on the release SHA | COMPLETED for `b3f7168`: `ci` (runs `45566799220`, `45566809431`), `e2e-firefox` and `e2e-webkit` (run `45566809426`) passed on #26's head `3e0c93b`, whose tree is identical to `b3f7168`. Before it: `b18b62e`, via #27's head `7a47353` |
| 4 | Production deployment verified | PARTIAL: COMPLETED for the public site and local tools; the accounts and sync in scope aren't active |
| 5 | Legal approval | POST-LAUNCH (decision I) |
| 6 | Production schema verified | NOT STARTED: the new project's read-only inventory is done (T-08); no migration applied (T-13). Under the fresh start a backup is only an optional retirement safeguard (T-09) |
| 7 | Auth configuration verified | AWAITING OWNER APPROVAL (T-10) |
| 8 | Deletion safely tested | Staging COMPLETED; production BLOCKED |
| 9 | Security and RLS verified | Staging and PGlite COMPLETED; production BLOCKED |
| 10 | Accounts UI live and verified | BLOCKED (T-21) |
| 11 | Cloud sync live and verified | BLOCKED (T-23, T-23b) |
| 12 | Documentation matches the release | IN PROGRESS: this tracker, `PHASE_2_RELEASE.md` and `README.md` were reconciled in #26, merged 2026-11-25 as `b3f7168`. Still unmerged: `supabase/README.md` (#25), the master audit (#28) and this correction. `PHASE_2_COMPLETION_AUDIT.md` is a dated snapshot |
| 13 | Tracker reflects the actual state | IN PROGRESS: #26 merged, but its status lines still described #26 as open (master audit D-13). Correct once this correction is merged |
| 14 | No critical or high unresolved technical security issue | **NOT MET for activation.** It holds only for the current dormant deployment: login hidden; `CLOUD_SYNC_ENABLED = false`; no Phase 2 schema in either production project; no known critical or high issue in what is live. **Open, and blocking activation:** T-26 (#25, unmerged: the verified-email gate, and the M1 fix that stops hidden cloud rows deleting device data; it relies on "Confirm email" being on, T-10); production RLS and permissions can't be verified until the schema is deployed (T-13); function ownership on staging NOT VERIFIED (T-28). **Accepted limitation:** existing Auth accounts are trusted as they stand (decision M). Under-18 sync stays separately blocked (T-23b); that isn't an adult-sync blocker |

**Met: 2 of 14** (criteria 2 and 3). Criterion 4 is partial: met for the public site only, which is how the 2026-11-23 version of this table reached 3 of 14. Criteria 13 and 14 were counted as met in `main`'s 2026-11-23 version (4 of 14) and no longer hold. The **6 of 14** in #26's first commit (`8deef97`: criteria 2, 3, 4, 12, 13 and 14) was withdrawn by the owner's review corrections (`df57534`): 12 and 13 can't be met while the documentation is unmerged, and 14 holds only while the platform is dormant. The #26 merge doesn't change the count: 12 and 13 still wait for #25, #28 and this correction. Staging-only results (criteria 8 and 9) don't count, because staging doesn't prove production readiness.

### Merged PRs (2026-11-23)
All six were merged in the authorised order:
- each branch was updated with `main`, and its head verified as the approved head plus `main` only;
- `ci` was green on that head;
- each was squash-merged, pinned with `--match-head-commit`;
- each deploy and the live site were checked before the next merge.

| Order | PR | Approved head | Squash commit | Deployment | Visitor-visible change |
|---|---|---|---|---|---|
| 1 | #20 | `516f1db` | `b238489` | `7994820790` | `/privacy` text only, as intended |
| 2 | #22 | `52ef94d` | `561cb22` | `7994983071` | None |
| 3 | #24 | `751980f` | `bc9a960` | `7995154361` | None |
| 4 | #21 | `98e385e` | `6d39449` | `7995316599` | None |
| 5 | #23 | `2426f82` | `86e3d59` | `7995490927` | None |
| 6 | #19 | `acf1dd2` | `0244587` | `7995693613` | None |

**Combined verification before merging** (the six exact heads, in this order):
- unit 659 passed, 1 skipped;
- build, `verify-build` and build-output 11 passed, 2 skipped;
- E2E 90/90 in Chrome, Edge, Firefox and WebKit; keyboard 22/22 (WebKit 15/15, 12 skipped);
- of 228 built pages, only `/privacy` changed in visible text.

**Since then:**

| PR | Approved head | Squash commit | Deploy run | Merged | Visitor-visible change |
|---|---|---|---|---|---|
| #27 (staging guard allow-list) | `7a47353` | `b18b62e` | `45378204301` (success) | 2026-11-24 | None |
| #26 (tracker, release doc and README reconciliation) | `3e0c93b` | `b3f7168` | `45570635616` (success; `build` and `deploy`) | 2026-11-25 07:45 UTC | None |

#26 was merged on the owner's explicit authorisation. Before merging: up to date with `main`, all four checks green on `3e0c93b`, no reviews or open threads. It was squash-merged pinned with `--match-head-commit`, and the merged tree equals the approved head's.

**Open:** #25 (T-26), #28 (the master audit), and this tracker correction.

### Owner approval register (2026-11-25)
| ID | Decision | Effect here |
|---|---|---|
| A | The six PR merges | Done (table above) |
| B | Keep Supabase public sign-ups enabled (current project) | T-11; no change |
| C | Read-only production inventory | Done for both projects, 2026-11-24 (T-08) |
| D | Secured production backup, no restore | Superseded by the fresh start: optional, at retirement (T-09) |
| E | Restore rehearsal after launch, with separate approval | T-09b |
| F | T-14 on staging | Done (T-14) |
| G | Prepare the production migrations; **each needs its own approval** to run | T-13 |
| H | Keep accounts and cloud sync in Phase 2 | T-21, T-23 |
| I | Formal legal review after launch; the notice is not to be described as approved | T-06 |
| J | Privacy notice, consent, export and deletion screens before launch | T-24 |
| K | Mandatory email verification; no sync for unverified accounts | T-10, T-26 |
| L | Phase 2 launch once the technical gates pass; individual migration approvals still required | T-21, T-23 |
| — | Production project identity confirmed by the owner (2026-11-23): the project the live site uses | T-25 (CLI access still pending) |
| M | Existing Supabase Auth accounts are trusted as they stand; no re-verification migration (2026-11-23) | T-26 (accepted limitation) |
| N | Unverified accounts blocked from both reading and writing cloud-sync records; export and deletion preserved (2026-11-23) | T-26 (#25) |
| O | Under-18 sync stays separately blocked until a verified parental-consent process exists; it doesn't silently exclude minors or block adult sync (2026-11-23) | T-23b, T-23 |
| — | Fresh start: the Phase 2 database goes to the new project `fuznyurpfqgjricivopd`; no old Auth account or data is migrated (2026-11-24) | T-08, T-09, T-25, T-30 |
| — | Merge #27, the staging guard allow-list (2026-11-24) | T-27 (done) |
| — | Merge #26, the documentation reconciliation (2026-11-25) | T-04 (done: `b3f7168`) |
| — | Phase 2 is the complete scope; keep a GitHub master audit (#28) and a separate management dashboard (2026-11-25) | Decision H; T-04 |
| — | Decision J, option B (2026-11-27): withdrawing cloud-copy consent deletes the cloud copy; the browser's progress stays | T-24, T-31 |
| — | Consent cap, Option A (2026-11-28): past 200 rows, 20 genuine changes per rolling 24 hours; a genuine withdrawal is always recorded; repeats are skipped | T-31 |
| — | First refusal (2026-11-28): always recorded for the current notice version only, never widened to other versions | T-31 |
| — | Wording (2026-11-28): the cloud-copy label, the `/privacy` paragraph and the consent-limit message in #30 | T-24 |

**Not covered by any approval yet:**
- the staging ownership check's run, the staging apply of migration 6, and the `test:staging:verified-email` check (T-28, T-29);
- the new project's Auth settings (T-10);
- merging #25 (after "Confirm email" is on), #28 and this correction;
- the Edge Function deployment and its secret (T-12);
- each of the six migrations in the new project (T-13);
- the cutover (T-30), and later the current project's retirement;
- a decision on under-18 sync (T-23b);
- committing and pushing #30, and merging it (T-31);
- the staging dry run and apply of migrations 8 and 9, and a staging check of the withdrawal flow that never enables sync (T-31).

### Staging verification (2026-11-27)
**For staging only, this supersedes the older staging entries above** (the Live status table, T-13, T-26, T-29 and the migration table still say staging has migrations 1–5). Evidence: `supabase/README.md`, "Staging verification record".
- **Migrations 1–7 applied to staging** (`wtuifivaxnhdnfwjsayk`). The dry run from #25 (`7847cda`) on 2026-11-26 listed exactly `20261124000000` and `20261126000000`; they were applied on 2026-11-27 with the owner's approval, and the history was read back. **Production: none applied.**
- **`npm run test:staging:release`: 63/63** on `7847cda`, with migration 7.
- **`npm run test:staging:verified-email`: 38/38** (the T-29 check, added in #25). An unconfirmed account can't sign in; a confirmed account is trusted as recorded and still gets "not-available-yet"; every bypass attempt is refused.
- **Local validation** on the same tree: `npm test` 734 passed, 1 skipped; `tsc` and lint exit 0; the new check's source rules caught 21/21 mutations.
- **After both runs, read back independently:** all three launch switches `'false'`; synthetic accounts removed (0 Auth users); 0 rows in the 10 application tables; `deletion_log` gained 3 and then 2 PII-free rows, as expected.
- **Not verified:** an authenticated unverified account's study-table reads on staging (no such session exists while "Confirm email" is on; `db-verified-email.test.ts` covers the policy). Staging "Confirm email" relies on the owner's confirmation; the refused sign-in is consistent with it. T-28 was reviewed by the owner; its result isn't recorded here.
- **Still incomplete:** T-10, T-12, T-13 and T-30 in production, merging #25, #30 and #28, and activation. **Phase 2 stays RELEASE-INCOMPLETE; no production deployment, release or readiness is claimed.**

## Audit record (2026-11-21 to 2026-11-23)

**Historical record.** It's kept as evidence of what was found and done. Where it conflicts with the live status or the current release procedure above, those apply.

**Safeguards (2026-11-22):**
- `CLOUD_SYNC_ENABLED = false`.
- On staging, `adult_sync_permitted`, `minor_sync_permitted` and the deletion gate are `'false'`.
  - `minor_sync_permitted` has never been enabled.
  - `adult_sync_permitted` was enabled once on staging, temporarily, by the 2026-11-21 `test:staging` run, and restored.
  - The deletion gate is opened only by `test:staging:deletion-gate`, during its own run.
  - In production, none of these objects exists yet. (That was the position on 2026-11-22. It hasn't been confirmed by an inventory; see T-08.)
- No production Supabase or Auth change.
- The safe staging check is `npm run test:staging:release` (63/63). The check makes one deliberate authenticated student-side UPDATE attempt against `app_config`. The server must deny it. No successful `app_config` modification occurs, and the script's server key never writes to `app_config`. `npm run test:staging` is not used, because it enables sync.

The audit was **read-only**: no merges, deploys, Supabase changes or production data access. File references are on this branch (`phase-2b-staging-verification`, PR #10) unless marked `(#6)`, `(#8)` or `(main)`, which means that PR's branch or `main`. The audit evidence for F4, F5, F6 and F11 describes the code **before** the deletion-gate fix (#15), so its references are at commit `3f1029b`; references marked `(main)` describe `main` before #7 was merged, at `2734e98`; the progress notes under each finding describe the fix.

## How to read this
| Priority | Meaning |
|---|---|
| P0 | Blocks a merge or a production step until it's done |
| P1 | Do before the step it depends on |
| P2 | Hardening; doesn't block the release |

| Status | Meaning |
|---|---|
| OPEN | Action not started |
| VERIFIED | Checked against the code or a live setting; no action needed beyond what's listed |
| DOCUMENTED | The safeguard is written into `PHASE_2_RELEASE.md`; nothing else to build |
| NOT VERIFIED | Couldn't be checked (no access, or not tested) |
| OWNER DECISION | Needs the owner's choice or approval |
| BLOCKED | Waiting on someone outside engineering (counsel) |

## Summary
| ID | Severity | Priority | Status | Blocks | Owner |
|---|---|---|---|---|---|
| F1 | High | P0 | RESOLVED · #12 closed · stack collapsed (#15 → `c76349d`, #10 → `fd71d32`) · #7 squash-merged into `main` as `9019a1c` (2026-11-23) | Nothing | — |
| F2 | Medium | P0 | VERIFIED: every merge since 2026-11-22 (#16, #14, #17, #18) had fresh CI on an up-to-date head; #7's head `9c1b51f` is 0 behind `main` with green CI | Nothing | — |
| F3 | High | P0 | OPEN · NOT VERIFIED. #7 merged with login hidden (H1), so F3 now gates turning the accounts UI on (T-10, T-11) | Turning the accounts UI on | Owner (production Auth settings) |
| F4 | Medium | P1 | RESOLVED: fixed in #15, merged with #7 (`9019a1c`) and deployed · live-verified: delete button disabled with DELETE typed | Nothing | — |
| F5 | High | P0 | Gate, rate limits and scheduler merged with #7 (`9019a1c`) · staging stage 1 VERIFIED (38/38) · scheduler NOT CONFIGURED · production stages OPEN (T-15, T-17) | Enabling account deletion in production | Owner (scheduler settings, staged production steps) |
| F6 | Low | P2 | RESOLVED: gaps 1, 2 and 3 fixed in #15, merged with #7 (`9019a1c`) · staging VERIFIED | Nothing | — |
| F7 | Medium | P1 | OPEN · OWNER DECISION | Switching analytics off; CAPTCHA | Engineering (PR), owner (approval) |
| F8 | Medium | P2 | OPEN · OWNER DECISION (hosting) | Nothing | Engineering (interim), owner (hosting) |
| F9 | Medium | P0 | VERIFIED on staging (production-configured build of `main` + #10) · after #7: CSP on every live page, 0 violations · a live login is NOT VERIFIED (login hidden, H1) | Turning the accounts UI on (live login check) | Engineering |
| F10 | High | P0 | Tooling ready in #21 (read-only inventory, 10 tests, staging-validated) · production run OWNER DECISION (T-08, T-09) | Production database | Owner (approve the read-only inventory) |
| F11 | Medium | P1 | DOCUMENTED · pending-deletion step OPEN | Any rollback | Owner |
| F12 | Critical | P0 | POST-LAUNCH (owner decision I, 2026-11-23): formal counsel review after launch. It no longer gates production steps; the notice stays a labelled draft | Nothing before launch; post-launch notice updates | Counsel, then owner |
| F13 | Low | P2 | OWNER DECIDED (2026-11-23): publish `/privacy` as a labelled draft pending legal review, noindex, outside the sitemap · LIVE-VERIFIED · the final notice still needs counsel (F12) | Finalising the notice | Counsel (F12) |
| H1 | High | P0 | UI gate DEPLOYED (#16, `357b061`) and LIVE-VERIFIED (no login control on desktop or mobile; Log out works with a simulated session) · the same switch is in #7 · Auth API sign-ups still possible (dashboard setting, OPEN) | Nothing | Owner (dashboard setting) |
| M1 | Medium | P1 | FIXED and DEPLOYED (#17, `5bc0cd8`) · LIVE-VERIFIED: no #418 with the clock at +1 and +3 days | Nothing | — |
| T1 | Low | P2 | Duplicate chapter-visit entries in the activity log: FIXED and DEPLOYED (#18, `367d430`) · LIVE-VERIFIED · E2E now covers checklists, streaks and goals | Nothing | — |
| E1 | Medium | P1 | 7 manual inbox checks NOT VERIFIED | Turning the accounts UI on | Owner (needs an inbox) |

### H1 · Production sign-up was open before legal sign-off
- **Evidence:**
  - `main`'s `AuthModal.tsx` calls `signUp`, and production builds include the Supabase keys, so the live navbar offered "Login / Sign Up" and created accounts before F12 and F13.
  - Owner decision on 2026-11-22: hide login and sign-up until the release.
- **Done:**
  - #16 (`phase-2-5-hide-login`, onto `main`) and #15 (the stack) add `ACCOUNTS_UI_ENABLED = false` (`src/lib/auth/accounts-ui.ts`).
  - Signed-out visitors see no login or sign-up control (desktop, mobile menu, account page); signed-in visitors keep "Log out".
  - Guards:
    - `accounts-ui.test.ts`: every opener of the login dialog goes through the switch, and only `AuthModal` calls `signUp`;
    - the keyboard E2E: no login control is visible or reachable.

    Both fail on the previous code.
- **Limitation:** Supabase Auth still accepts sign-ups through its API. Disabling that is a dashboard setting, and an owner decision.
- **Done when:** #16 is deployed (and the stack keeps the switch), and the owner has decided on the dashboard setting.

### M1 · Hydration error on /dashboard/activity/
- **Evidence:** the live site on 2026-11-22 (the build was 2026-11-21): React error #418, six times. `ActivityClient` read `Date.now()` at prerender time, so the build day's dates were in the HTML. `RevisionClient` had the same pattern, without a visible error.
- **Done:** #17 (`phase-2-5-activity-hydration`, onto `main`): `useClientNow()` is `null` until hydration ends; same-size placeholders.
- **Tests:**
  - the server HTML is identical across build days;
  - E2E with the browser clock 3 days past the build.

  The previous code fails both, with #418.
- **Done when:** #17 is deployed and the live page shows no #418.

## Findings

### F1 · Stacked PRs don't reach `main` on their own
- **Severity:** High. **Priority:** P0. **Status:** OPEN.
- **Evidence:**
  - From the GitHub API: #12 is `phase-2b-dashboard-focus → phase-2b-study-tools`, and #10 is `phase-2b-staging-verification → phase-2b-accounts-platform`.
  - The repository has `delete_branch_on_merge: false`, so GitHub doesn't retarget either PR when its base merges.
  - The `main` ruleset allows merge, squash and rebase merges.
- **Risk:** merged as-is, #12 and #10 land in their feature branches. Nothing deploys and nothing warns. Squashing #8 or #7 would also leave #12 or #10 with conflicts or duplicated history.
- **Action:**
  - Merge #8 and #7 with a merge commit.
  - Then run `gh pr edit 12 --base main` and `gh pr edit 10 --base main`, and wait for green CI on each before merging.
- **Depends on:** #8 merged (for #12); #7 merged (for #10).
- **Done when:** both PRs show base `main` with green CI before they are merged.
- **Update (2026-11-21, after the merges):** #9, #11, #6, #8 and #13 were **squash-merged**, not merged with merge commits. #12's change was rebased onto `main` as #13 and is deployed; #12 is superseded and can be closed (owner's call). #10 is still stacked on #7's branch. Because squash is the method in use, the safe path is: squash-merge #7, then rebase #10 onto `main` (as was done for #12 → #13), wait for green CI, then merge.

### F2 · No intermediate `main` state has been built in CI
- **Severity:** Medium. **Priority:** P0. **Status:** OPEN.
- **Evidence:**
  - The `main` ruleset's required check is `ci` with `strict_required_status_checks_policy: false`.
  - All seven PRs' CI ran against `main` at `9c0d09e`. The full combined release was tested only locally, on an unpushed detached HEAD.
- **Risk:** each merge deploys a combination CI has never built.
- **Action:** before every merge, click "Update branch" and wait for green CI on the updated head. Optionally, turn on "require branches to be up to date" in the ruleset (an owner setting).
- **Depends on:** nothing.
- **Done when:** each merged PR's last CI run was on a head that included the then-current `main`.
- **Update (2026-11-21):** `main` at `2734e98` (after #9, #11, #6, #8, #13): all five deploy runs succeeded; locally, lint and `tsc` clean, unit 461 passed and 1 skipped, build-output 11 passed and 2 skipped, E2E 69/69, keyboard 17/17 (5 skipped). `main` + #10 (which contains #7), merged locally without conflicts: lint and `tsc` clean, unit 550 passed and 1 skipped, build-output 11 passed and 2 skipped, E2E 69/69, keyboard 24/24. #7 and #10 are 5 commits behind `main`, so their CI hasn't run on that combination: update both branches before merging.

### F3 · #7 changes the live auth flow; production redirect URLs come first
- **Severity:** High. **Priority:** P0. **Status:** OPEN · NOT VERIFIED (no access to production Auth settings).
- **Evidence:**
  - Today's live flow uses the implicit default and sends no redirect URL: `src/components/AuthModal.tsx:27-28` (main), `src/lib/supabase-client.ts:14-15` (main).
  - Production builds have auth on: both Supabase repository secrets are set, and `.github/workflows/deploy.yml:37-41` passes them to the build.
  - #7 switches to PKCE with `detectSessionInUrl: false`: `src/lib/supabase-client.ts:20-25`.
  - Sign-up sends its link to `/auth/callback/` (`src/components/AuthModal.tsx:89`). Password reset sends its link to `/auth/reset-password/` (`src/components/AuthModal.tsx:94`). Both paths come from `authRedirect` in `src/lib/auth/auth-policy.ts:9-15`.
- **Risk:**
  - If those URLs aren't on production's redirect allow-list, Supabase sends the student to the Site URL, where nothing completes sign-in.
  - Confirmation still succeeds on Supabase's side, but **password reset can't be finished**.
  - The 10-character minimum is enforced only in the browser until Supabase's own setting matches.
  - Confirmation emails sent before the merge use `#access_token` links, which the new client no longer reads. The email is still confirmed.
- **Action:**
  - Before merging #7, add `https://ajaysahuphysics.com/auth/callback/` and `https://ajaysahuphysics.com/auth/reset-password/` to production's redirect URLs.
  - Check the Site URL, and set the minimum password length to 10.
  - After the deploy, test sign-up, login and reset with a test account.
- **Depends on:** owner access to the production Auth settings.
- **Done when:** the settings are confirmed and the live checks pass.
- **Update (2026-11-23):** #7 was merged at `9019a1c` **before** these settings were confirmed, with login hidden (H1, owner-approved). No student can start a sign-up or a reset from the site, so the UI can't produce a broken email link. F3 now gates **turning the accounts UI on**, not a merge. The full settings checklist and the API sign-up options are in `PHASE_2_RELEASE.md` section 9, A.1 (#21).

### F4 · Account features without the production database; delete button enabled before the check finishes
- **Severity:** Medium. **Priority:** P1. **Status:** OPEN (code fix and test required). The handling of a missing database is VERIFIED.
- **Evidence:**
  - The account page calls the `sync_allowed` RPC (`src/app/account/AccountClient.tsx:54-63`) and treats any error as "not set up". After that, account export is hidden (`src/app/account/AccountClient.tsx:175`).
  - Deletion is disabled with a pointer to the Contact page (`src/app/account/AccountClient.tsx:198-200`), and cloud copies show as not available (`src/app/account/AccountClient.tsx:153`).
  - The sync engine returns `disabled` (`src/lib/sync/engine.ts:68-69`) while `CLOUD_SYNC_ENABLED = false` (`src/lib/sync/policy.ts:15`).
- **Defect:**
  - The delete button is disabled only for `cloudReady === false` (`src/app/account/AccountClient.tsx:198`). While the check is still running (`cloudReady === null`), the button is **enabled**.
  - `cloudReady === null` means "not yet known" and must be recorded and handled as a **disabled** state. A deletion control must never be usable before the environment has been confirmed ready.
  - Also, each visit logs a 404 for the RPC in the console (cosmetic).
- **Action:**
  - Code fix (a separate change, not part of this documentation update): enable the button only when `cloudReady === true`, so `null` and `false` both mean disabled.
  - Add a test that the button is disabled while the check is in flight, and when it fails.
- **Depends on:** nothing. It is required before account deletion is enabled (F5).
- **Done when:** the fix and its test are merged, and the test passes in CI.
- **Update (2026-11-23):** DONE. The fix is in #15, merged with #7 (`9019a1c`). Live-verified with a synthetic session: the delete button stays disabled with DELETE typed.

### F5 · No sweep scheduler and no deletion gate; deletions can be left unfinished
- **Severity:** High. **Priority:** P0 for the production database. **Status:** OPEN (deletion gate and scheduler not started).
- **Requirement:** account deletion **must remain disabled (gate off) in production** until all of the following are true:
  - the staged verification in `PHASE_2_RELEASE.md` section 9, C.3 is complete;
  - its evidence is recorded;
  - the owner has explicitly approved opening the gate.

  The staged verification covers three parts: the migrations, the `delete-account` function with its secrets, and the scheduled sweep. Until the gate opens, students are pointed to the Contact page for deletion.
- **Gate requirements:**
  - **Enforced server-side.** Disabling the button in the page isn't enough. While the gate is off, the server-side function that starts a deletion (`request_account_deletion()`) and the `delete-account` function must both reject requests, including direct calls that bypass the page.
  - **No exemptions.** The gate applies to every account and every deletion-related request: starting a deletion, the function's user path, and the scheduled sweep. There is no test-account exemption and no bypass, in staging or in production.
  - **Off by default.** The gate starts off, and only a deliberate owner-approved change opens it.
  - **Fails closed.** If the gate's configuration is missing, unreadable or unavailable, both `request_account_deletion()` and the function treat it as off and reject the request.
- **Evidence:**
  - If `request_account_deletion` succeeds (`src/app/account/AccountClient.tsx:107`) but the function call fails, the student is told "We'll finish deleting your account" (`src/app/account/AccountClient.tsx:118`).
  - Only the sweep can then finish it. The sweep is "optional for staging" (`supabase/README.md:87`), and the repository has no scheduler: no `pg_cron` migration, no workflow and no `supabase/config.toml`.
  - Nothing in code enforces the requirement. The account page enables deletion as soon as the `sync_allowed` RPC answers (`src/app/account/AccountClient.tsx:54-63`; `src/app/account/AccountClient.tsx:198`), that is, as soon as the migrations are applied, whether or not the function and the sweep work.
- **Risk:** in production, a deletion the student was promised never completes. This is a privacy and legal exposure.
- **Action:**
  - Add an explicit server-side deletion gate that meets the gate requirements above, for example an `app_config` switch defaulting to off, checked by both `request_account_deletion()` and the function. A build flag or a UI-only check doesn't qualify. This is a separate change, with tests. It must be deployed **before** the production migrations are applied.
  - Deploy the function with its secrets **before** applying the migrations (runbook section 9, C.2).
  - Build the scheduler: `pg_cron` + `pg_net` with the secret kept in Vault, or a scheduled GitHub Actions job using a repository secret. Test it on staging.
  - Add an alert for `deletion_requests` rows older than a threshold.
  - Follow the staged verification in `PHASE_2_RELEASE.md` section 9, C.3:
    1. **Staging, gate open:** full end-to-end deletion test covering request initiation, function execution, the scheduled sweep, failure handling and alerting.
    2. **Production, gate off:** non-destructive infrastructure and configuration checks covering migrations, function deployment, secrets, scheduler configuration, permissions and alerting. Then confirm that deletion requests are rejected while the gate is off.
    3. **Evidence and approval:** record the evidence and obtain the owner's explicit approval.
    4. **After approval:** open the gate, then run a controlled end-to-end production test with a dedicated disposable account that is subject to the same gate. Monitor the workflow and the alerts.
    5. **If it fails:** close the gate immediately and investigate. Every deletion request accepted while the gate was open remains an obligation. An authorized operator completes it through a documented, auditable procedure, verifies the account and its data are gone, confirms the deletion log, and records the outcome with no secrets or personal data.
- **Depends on:** F4 fix; owner choice of scheduler; staging test; F10 (inventory) before the production migrations. (F12 was a prerequisite here until owner decision I, 2026-11-23.)
- **Done when:**
  - the server-side gate is merged, with tests proving that while it is off:
    - a direct call to `request_account_deletion()` by a signed-in student is rejected, and no deletion request is recorded;
    - a direct request to the `delete-account` function with a valid user token is rejected, and nothing is purged or deleted;
    - a sweep request with a valid sweep secret is rejected, and nothing is purged or deleted;
    - with the gate's configuration missing or unreadable, both paths reject the request (fail closed);
    - the gate's default, as created by the migrations, is off;
  - and that, once the gate is open, the same requests succeed;
  - with no exemption for any account, including test accounts;
  - **staging (gate open):** the complete deletion workflow has passed, with evidence recorded:
    - request initiation;
    - function execution;
    - a scheduled sweep completing a planted pending request;
    - failure handling;
    - the alert firing on an old row;
  - **production (gate off), infrastructure and configuration only:** the non-destructive checks have passed and are recorded. They cover migrations, function deployment, secrets, scheduler configuration, permissions and alerting, and they confirm that deletion requests are rejected while the gate is off. **This is not evidence that production deletion works end to end**;
  - the owner's explicit approval to open the gate is recorded;
  - **production (gate open), end to end:** the controlled test with the dedicated disposable account has passed while the workflow and alerts were monitored, and the result is recorded. Only from this point may production deletion be described as tested end to end. If the test fails, the gate is closed immediately and the investigation is recorded. Every request accepted while the gate was open is then completed by an authorized operator through a documented, auditable procedure, with deletion of the account and its data verified, the deletion log confirmed, and the outcome recorded without secrets or personal data.

  **Progress (2026-11-22), in PR #15 (`phase-2b-deletion-gate`, stacked on #10). Merged with #7 as `9019a1c` on 2026-11-23:**
  - **Built:** migration `20261122000000` (gate, created `'false'`, fails closed); gated `request_account_deletion()`; function user path and sweep gated (403 off, 503 unreadable); the hourly `deletion-sweep.yml` workflow, inert until `vars.ATLAS_DELETION_SWEEP_ENABLED` is `'true'`, with the alert as its exit code.
  - **Tests:** PGlite gate tests, 10 (all fail without the migration); handler tests, 13 (9 fail with the old handler); availability and sweep tests. On `main` + the branch: unit 583 passed and 1 skipped, E2E 69/69, keyboard 24/24.
  - **Staging, gate open (stage 1):** `npm run test:staging:deletion-gate` 30/30, covering rejection while off, deletion with a log row, a planted request swept by the real script, the alert firing with the gate closed while a request is outstanding, and the operator procedure. Account page: 8/8 with the gate off, browser journey 15/15 with it open. Staging was left with the gate off, sync off, and 0 users.
  - **Rate limits (F6 gap 3), added 2026-11-22:** migration `20261122010000`; per verified user, 5 requests per hour and 6 function calls per 10 minutes; the sweep and the operator procedure are not limited. Staging 38/38, with exact limits under parallel calls.
  - **Still open:**
    - ~~the owner's PR review and merge~~ (done with #7, 2026-11-23);
    - the scheduler variables and secret;
    - running the sweep from the scheduled workflow itself (on staging it was run by hand);
    - production stages 2 to 5.

    Production deletion has **not** been tested.

### F6 · Deletion function: correct authentication, three small gaps
- **Severity:** Low. **Priority:** P2. **Status:** VERIFIED (authentication and CORS) · 3 fixes OPEN.
- **Evidence (correct):**
  - The user token is checked with the Auth server (`supabase/functions/delete-account/index.ts:35-38`).
  - A recorded deletion request is required first (`supabase/functions/delete-account/handler.ts:44`).
  - The sweep secret is compared in constant time (`supabase/functions/delete-account/index.ts:27-32`), and the sweep is refused when the secret is unset (`supabase/functions/delete-account/handler.ts:49`).
  - The new secret key is preferred, with the legacy key as fallback (`supabase/functions/delete-account/runtime-config.ts:22-35`).
  - CORS allows the production origin plus validated extra origins (`supabase/functions/delete-account/runtime-config.ts:38-53`). The production origin is the canonical host: `www` returns a 301 to `https://ajaysahuphysics.com/`, and that is the Pages custom domain.
- **Gaps:**
  1. The sweep hides database errors: `pendingBefore` returns an empty list when the query fails (`supabase/functions/delete-account/index.ts:43-46`), so a broken sweep reports "processed: 0".
  2. No `supabase/config.toml` pins `verify_jwt = false`. A deploy that forgets the flag can block the sweep. It fails closed, but the sweep stops working.
  3. The public endpoint has no rate limiting.
- **Action:** return 500 when a query fails; add `[functions.delete-account] verify_jwt = false`; watch invocation counts after launch.
- **Depends on:** nothing.
- **Done when:** gaps 1 and 2 are fixed, with tests.
- **Update (2026-11-23):** RESOLVED. All three gaps are fixed in #15 and merged with #7 (`9019a1c`): query errors now return 500 or 503, `supabase/config.toml` pins `verify_jwt = false`, and the rate limits are in migration `20261122010000`.

### F7 · The analytics and CAPTCHA switches aren't wired into the deploy
- **Severity:** Medium. **Priority:** P1. **Status:** OPEN · OWNER DECISION (workflow change).
- **Evidence:**
  - The switch works in code:
    - `src/lib/analytics-config.ts:15-19` (#6) and `src/components/Analytics.tsx:11` (#6) remove GA;
    - `scripts/inject-csp.mjs:43` (#6) and `scripts/inject-csp.mjs:53-56` (#6) remove the Google origins from the CSP.
  - The deploy build passes only the two Supabase variables (`.github/workflows/deploy.yml:37-41`), and the repository has no Actions variables.
- **Risk:**
  - Production analytics is always on, and switching it off (for example, on counsel's advice about under-18 visitors) needs a workflow PR and a deploy.
  - CAPTCHA can't be turned on. Enabling Supabase bot protection without the site key would make every login and sign-up fail.
- **Action:** in a reviewed PR, add `NEXT_PUBLIC_ANALYTICS: ${{ vars.NEXT_PUBLIC_ANALYTICS }}` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY: ${{ vars.NEXT_PUBLIC_TURNSTILE_SITE_KEY }}` to the build step of `.github/workflows/deploy.yml`.
- **Depends on:** #6 merged (it adds the switch); owner approval of the workflow change.
- **Done when:** setting the repository variable to `off` produces a deploy with no GA and no Google origins in the CSP.

### F8 · GitHub Pages sends no security headers beyond HSTS
- **Severity:** Medium. **Priority:** P2. **Status:** OPEN · OWNER DECISION (hosting).
- **Evidence:**
  - `curl -I https://ajaysahuphysics.com/` returns only `Strict-Transport-Security`: no CSP header, `X-Frame-Options`, `X-Content-Type-Options` or `Referrer-Policy`.
  - A meta-tag CSP ignores `frame-ancestors` (`scripts/inject-csp.mjs:13-15` (#6); `SECURITY_REVIEW.md:98` (#6); `SECURITY_REVIEW.md:109` (#6)).
  - The source has no frame-busting code and no referrer meta tag.
- **Risk:**
  - **Clickjacking:** after #7, `/account` can be framed. "Remove this device's progress" takes two clicks, so a hidden frame could wipe a student's local progress. Account deletion needs DELETE typed in, which mitigates it.
  - **`nosniff`:** missing, but low risk: the site serves only its own static files.
  - **Referrer:** browser defaults (`strict-origin-when-cross-origin`) are acceptable.
  - **Low, not verified:** GA might record the one-time `?code=` on `/auth/callback/` before it is removed from the address bar (`src/lib/auth/exchange-code.ts:18-22`). The code is useless without the browser's verifier.
- **Action:**
  - Interim: on `/account`, hide or disable the actions when `window.top !== window.self`; skip GA on `/auth/*`.
  - Long term: a host that sends headers. Cloudflare Pages is assessed but not authorised.
- **Depends on:** the owner's hosting decision (long term).
- **Done when:** the interim guards ship with tests, or the site moves to a host that sends `frame-ancestors` and `nosniff`.

### F9 · No browser test of a production-configured build
- **Severity:** Medium. **Priority:** P0 for #6 and #7. **Status:** VERIFIED on staging (see Result) · live login check after #7 OPEN.
- **Evidence:**
  - CI builds with auth off on purpose (`.github/workflows/ci.yml:52-56`), so its E2E run (`.github/workflows/ci.yml:73-79` (#8)) never sees accounts switched on, and its CSP falls back to `*.supabase.co`.
  - Staging browser journeys ran on `npm run dev`, which doesn't inject the CSP.
  - No record was found of a static build with Supabase configured and the exact-origin CSP being tested in a browser. That combination is what #6 deploys for today's live login, and what #7 deploys.
- **Action:**
  - Build locally with the **staging** URL and publishable key, serve `out/`, and run the login and account journey under the CSP, checking for console errors.
  - Do this on #6 and again on #7. After each deploy, test login live.
- **Depends on:** the staging project (available).
- **Done when:** both runs pass with 0 CSP violations, and the result is recorded here.
- **Result (2026-11-21):**
  - #6 was merged before a separate #6 run. Instead, the live site at `2734e98` was audited read-only: 23 pages, with the CSP meta tag on every page, 0 CSP violations and 0 console errors, and the login dialog opens. The live CSP's `connect-src` names the production Supabase origin. No live sign-in was attempted.
  - `main` + #10 (contains #7) was built with `next build` and the **staging** URL and publishable key. The CSP was injected on 228 pages with `connect-src` set to the staging origin, and no production ref appears in the output. The build was served locally like GitHub Pages and never deployed.
  - The staging browser journey ran against that build with CSP reporting added: **15/15 passed**, 0 CSP violations, CSP meta on every navigation, 0 console errors, 0 failed requests. It covers a wrong password, login, session restore, the account page, export, sync shown unavailable, logout keeping device progress, deletion from the UI with the server user gone, and phone width.
  - Remaining: a live login check straight after #7 deploys.

### F10 · Schema-wide revokes against an unknown production schema
- **Severity:** High. **Priority:** P0 for the production database. **Status:** OPEN · OWNER DECISION.
- **Evidence:** `supabase/migrations/20261120000000_student_accounts.sql:400-402` revokes all table, sequence and function privileges across the whole `public` schema. It was safe on an empty staging project; production's `public` schema has not been inventoried.
- **Risk:** any existing production table, view or function in `public`, for example one created in the dashboard, loses its access.
- **Action:** with the owner's approval, run a read-only inventory of production's `public` schema (object names, owners, grants, no row data). If anything is there, scope the revokes to the Atlas objects.
- **Depends on:** owner approval. (Legal sign-off, F12, was a prerequisite until owner decision I, 2026-11-23.)
- **Done when:** the inventory is recorded and the migration is confirmed safe for it.
- **Update (2026-11-23):** the inventory script is in #21 (`schema_inventory.sql`). It reports table, function **and index-name** collisions; every other `public` object, selected by kind; sequences and their grants; client grants from `pg_class.relacl`; and default privileges. It's validated read-only on staging. The production run is an owner decision (T-08). New low finding: T-14.

### F11 · Rollback for partly completed releases
- **Severity:** Medium. **Priority:** P1. **Status:** DOCUMENTED (`PHASE_2_RELEASE.md` section 10) · pending-deletion step OPEN.
- **Evidence:**
  - #10 contains #7's commits, so the two can't be reverted independently.
  - `supabase/rollback/student_accounts_down.sql:27-29` drops `deletion_requests` and `deletion_log` with the other tables.
  - The script uses `IF EXISTS` throughout.
  - Whether the CLI wraps each migration file in its own transaction has not been verified.
- **Risk:**
  - Reverting #7 alone breaks #10's code.
  - Re-merging after a revert brings nothing back without a revert of the revert.
  - A database rollback loses pending deletion requests and the record of completed deletions.
- **Action:**
  - Revert in reverse order.
  - Before any database rollback, finish or export pending deletions and export `deletion_log`.
  - Optionally, add an export step to the rollback script itself.
- **Depends on:** nothing.
- **Done when:** the pending-deletion export is scripted or added to the rollback steps and checked on staging.

### F12 · Legal sign-off
- **Severity:** Critical (production database and sync). **Priority:** P0. **Status:** BLOCKED (counsel).
- **Evidence:**
  - Counsel hasn't reviewed DPDP compliance, verified parental consent for under-18s, the retention period, or GA4 for under-18 visitors.
  - Cloud sync is off in code (`src/lib/sync/policy.ts:15`) and in the database switches.
- **Action:** counsel review. No production database change, sweep or sync launch happens before sign-off. The retention job, the parental-consent process and the incident runbook depend on counsel's answers.
- **Depends on:** counsel.
- **Done when:** written sign-off exists and the owner authorises each production step.
- **Update (2026-11-23), superseding the Action and Done-when above:** owner decision I moved formal counsel review to **after launch**.
  - Production database steps no longer wait for counsel sign-off; they wait for their own individual approvals (T-13).
  - The notice stays labelled "Draft notice, pending legal review", and no legal approval or compliance is claimed.
  - Tracked as T-06 (POST-LAUNCH). This is an owner-accepted legal and privacy risk.

### F13 · Draft privacy notice and a dependency advisory
- **Severity:** Low. **Priority:** P2. **Status:** OWNER DECISION (checklist below).
- **Evidence:**
  - #7 publishes `/privacy`, marked as a draft and not indexed (`src/app/privacy/page.tsx:5-10`; `src/app/privacy/page.tsx:26`).
  - Its statement that searches aren't sent to GA holds: no search terms are put in page URLs.
  - `npm audit --omit=dev` reports 1 moderate advisory, in a build-time tool.
- **Update (2026-11-23):** decided: Option B (labelled draft, `noindex`, outside the sitemap); #7 merged. #20 corrects two statements that didn't match the live site (deletion and the GA4 events).
- **Action (original):** the owner works through the decision checklist below before #7 merges. Recheck the advisory at each dependency update.
- **Depends on:** owner and counsel.
- **Done when:** the checklist is completed and the decision is recorded here.

#### Owner decision checklist: privacy notice
Choose **one** option:
- [ ] **Option A: publish as the final notice.** Requires every item in "Before publishing" below.
- [ ] **Option B: keep it as a draft and not indexed** (as #7 currently ships it). Requires every item in "Before keeping it as a draft" below.
- [ ] **Option C: hold the page back.** Remove `/privacy` from #7, or don't merge #7, until counsel approves the wording.

Before publishing (Option A):
- [ ] Counsel has reviewed and approved the wording in writing (F12).
- [ ] Every statement matches the site's behaviour on the day it ships:
  - progress is kept in the browser only;
  - accounts hold an email address, a hashed password and sign-in records;
  - no cloud copies of study data;
  - GA4 is in use.
- [ ] The GA4 statement matches the decision on analytics for under-18 visitors (F7, F12).
- [ ] The account-deletion statement matches what is live. While deletion is gated off (F5), the notice must point to the Contact page rather than a self-service button.
- [ ] The Contact route for data requests works, and someone is assigned to answer it.
- [ ] The "Draft notice, pending legal review" banner is removed, an effective date and version are added, and indexing is switched on (`robots: { index: true }`). These are code changes, in a reviewed PR.
- [ ] The page is linked from the site footer, and the version is recorded for consent records.

Before keeping it as a draft (Option B):
- [ ] The owner accepts that the draft notice stays **publicly accessible** at `/privacy` without counsel review, although it is marked as a draft and excluded from search-engine indexing.
- [ ] `robots: { index: false }` stays in place, and the page isn't listed in the sitemap.
- [ ] No consent is collected against the draft. Cloud sync stays off (`CLOUD_SYNC_ENABLED = false`).
- [ ] The deletion and contact statements are accurate for what is live (see F5).
- [ ] A review date is set for replacing the draft with a reviewed notice.

Record:
- [ ] Decision (A, B or C): ______
- [ ] Decided by: ______. Date: ______.
- [ ] Counsel review reference, if any: ______.

## Release dependencies (historical, 2026-11-22)
**Superseded** by "Current release procedure" in the live status above. It predates owner decision I (legal review after launch) and the fifth and sixth migrations. Kept for the record.

1. **Done:** #9, #11, #6, #8 and #13 are merged and deployed (squash). #12 is closed, superseded by #13.
2. **Independent PRs onto `main`**, each after an updated branch and green CI: #14 (accessibility), #16 (H1) and #17 (M1). **#16 must be merged before the release stack** (its keyboard check expects no login control).
3. **The release stack, #7 → #10 → #15. DONE: squash-merged as `9019a1c` on 2026-11-23 with login hidden; F3 moved to the accounts-UI step:**
   - **Before merging:** the production Auth redirect URLs, the Site URL check and the password length (F3); the F13 decision; F7 is optional.
   - **Recommended:** merge #15 into #10's branch and #10 into #7's branch (no deploys), update #7 with `main` (keep the stack's `AuthButton.tsx`), wait for green CI, then squash-merge #7 once.
   - **The alternative** (squash #7, then `rebase --onto` #10 and #15) is in `PHASE_2_RELEASE.md` section 1. Don't use GitHub's "Update branch" on #10 or #15.
   - F9 has passed on staging.
4. **Production database:** in this order:
   1. F12 (legal), then F10 (inventory) and a backup;
   2. the release stack merged and deployed (it has the F4 fix and follows the gate);
   3. the function deployed before the migrations;
   4. **all four** migrations together, in this order:
      1. `20261120000000_student_accounts.sql`: tables and functions;
      2. `20261121000000_service_role_grants.sql`: grants on those tables;
      3. `20261122000000_account_deletion_gate.sql`: the gate, which replaces `request_account_deletion()`;
      4. `20261122010000_deletion_rate_limit.sql`: rate limits, which replace it again.

      Never apply the first two without the last two;
   5. the scheduler configured (`vars.ATLAS_SWEEP_URL`, `secrets.ATLAS_DELETION_SWEEP_SECRET`, `vars.ATLAS_DELETION_SWEEP_ENABLED`).
5. **Opening the deletion gate:** only after the staged verification in `PHASE_2_RELEASE.md` section 9, C.3:
   1. a full staging test with the gate open;
   2. non-destructive production checks with the gate off, including rejection of deletion requests;
   3. recorded evidence;
   4. the owner's explicit approval.

   The controlled production end-to-end test follows, and the gate is closed immediately if it fails (F5).
6. **Cloud sync:** after F12 and the owner's separate authorisation (`PHASE_2_RELEASE.md` section 9, D). Opening the deletion gate doesn't enable cloud sync.
7. **Turning the accounts UI on (ending H1):** a separate, owner-approved PR, after F3, F12 and F13. Then the live login, sign-up and reset checks, and the 7 manual inbox checks (E1).

## Merge readiness (historical)
All the PRs below are merged or closed. The later merges are recorded under "Merged PRs" above.

| PR | Ready? | Waiting on |
|---|---|---|
| #9 | Merged (squash), deployed | — |
| #11 | Merged (squash), deployed | — |
| #6 | Merged (squash), deployed | — |
| #8 | Merged (squash), deployed | — |
| #13 (replaces #12) | Merged (squash), deployed `2734e98` | — |
| #12 | Closed, superseded by #13 | — |
| #16 | Merged (squash) `357b061`, deployed, live-verified | — |
| #14 | Merged (squash) `21d0d11`, deployed, live-verified | — |
| #17 | Merged (squash) `5bc0cd8`, deployed, live-verified | — |
| #18 | Merged (squash) `367d430`, deployed, live-verified | — |
| #15 | Merged (squash) into #10's branch, `c76349d` | — |
| #10 | Merged (squash) into #7's branch, `fd71d32` | — |
| #7 | Merged (squash) `9019a1c` at the approved head `dc6e1f1` (CI run #97); deployed (Pages run #777, deployment `7988286758`); live-verified | — (F3 is still needed before the accounts UI is turned on) |

## Post-deploy verification (2026-11-21)
Read-only checks of the live site after #13 deployed, plus local gates and a staging run. No production database access; staging used synthetic accounts only.

| Check | Result |
|---|---|
| Deploy | "Deploy to GitHub Pages" succeeded for `2734e98`; the live site serves that build |
| Live crawl | 49 pages and 36 external links; 0 broken internal links. One Instagram link couldn't be checked from the audit machine (its TLS chain is intercepted locally), so it is unverified, not broken |
| Live browser | 23 pages: 0 console errors, 0 CSP violations, no horizontal overflow at 360, 390, 768 or 1280 px |
| Live journeys | 14/14: the mobile menu opens and closes with Escape and navigates; the dashboard and its 5 cards render with empty and seeded synthetic storage; all 6 dashboard routes; a chapter bookmark; the login dialog opens (not submitted) |
| Accessibility | 1 defect: on `/jee/`, the JEE Main / JEE Advanced picker had headings inside buttons and skipped from h1 to h3. Fixed in PR #14 (`phase-2-5-jee-picker-a11y`, not merged); the audit now covers `/jee/` and `/neet/`, and fails without the fix |
| Staging RLS probe | 25/25: anonymous reads denied on all 11 tables; A versus B read, update, insert-as and delete blocked; students can't switch sync on, upload study data or change `app_config`. The sync switches were `'false'` before, during and after; staging ended with 0 users and 0 rows |
| Not run | `npm run test:staging` (23 checks) switches `adult_sync_permitted` on in staging for its run, so it was not run, to keep sync off throughout. Its last result is 23/23 (`supabase/README.md`). **Replaced on 2026-11-22** by `npm run test:staging:release` (never enables sync): 63/63 |
| Live audit, 2026-11-22 | The same checks again: 14/14 journeys, 0 broken links, 0 overflow. **New defect M1:** React error #418 (×6) on `/dashboard/activity/` the day after the build; fix in #17. `/jee/` still pending #14 |
| Manual inbox checks | **NOT VERIFIED.** The 7 inbox checks in `supabase/README.md` (confirmation, reset, link reuse) have no recorded result (E1) |
| Dependencies | `npm audit`: 14 advisories (5 high, 9 moderate), all in build or dev tooling; production tree: 1 moderate (`baseline-browser-mapping`, build time only). No upgrades made |

Every merge deploys and needs the owner's explicit approval.
