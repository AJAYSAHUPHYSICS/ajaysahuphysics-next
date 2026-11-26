# Privacy notice: proposed wording after the age-limit decision

> **DRAFT PROPOSAL, PENDING LEGAL REVIEW. Not applied to the site.**
> This is engineering's proposal for the owner to decide. It isn't legal advice, it hasn't been reviewed by counsel, and it doesn't claim that the notice, or the product, complies with any law.

| | |
|---|---|
| **Prepared** | 2026-11-26 |
| **Trigger** | Owner decision P (2026-11-26): "There will be NO AGE LIMIT on this website." No age rule applies to website access, accounts or cloud-copy eligibility |
| **Page** | `/privacy` (`src/app/privacy/page.tsx`), live as a labelled draft, `noindex`, outside the sitemap |
| **Tracker** | T-24 (notice and consent screens), T-06 (legal review, after launch by decision I) |

## 1. What in the current notice conflicts with decision P
The live notice was checked line by line on 2026-11-26 (`main` at `b9527e2`). **One statement conflicts:**

| Line | Current text | Why it conflicts |
|---|---|---|
| `page.tsx:42` | "If it is offered in future, it will be off until you turn it on, it will need your consent **(and, for students under 18, verified consent from a parent or guardian)**, and these would never be copied: …" | Decision P removes the parental-consent process. Migration 7 (#25) drops `parental_consent_verified()` and refuses new parental consents, so the product will never ask for them |

**Nothing else in the notice mentions age, children, parents or guardians.** The banner ("Draft notice, pending legal review"), local storage, analytics, choices and contact sections don't depend on age.

**Not age-related, but needed before accounts or sync go live (T-24):**
- **Verified email:** the notice doesn't say a cloud copy needs a verified email address (decision K, #25).
- **Profile and consent records:** "If you create an account" lists only the email address, a hashed password and sign-in records. With #30 active, an account could also hold an optional display name, class and exam targets, and dated consent records.

These are outside this proposal's scope. They're listed so the T-24 update covers them.

## 2. Proposed replacement for `page.tsx:42`
**Current:**
> A cloud copy of study progress isn't available yet. If it is offered in future, it will be off until you turn it on, it will need your consent (and, for students under 18, verified consent from a parent or guardian), and these would never be copied: activity history, searches, reading position and recently viewed pages.

**Proposed:**
> A cloud copy of study progress isn't available yet. If it is offered in future, it will be off until you turn it on, and it will need a verified email address and your consent, which you can withdraw at any time. These would never be copied: activity history, searches, reading position and recently viewed pages.

**What changes:**
- The parental-consent clause is removed.
- "A verified email address" and "withdraw at any time" are added. Both describe what #25 and #30 implement; they aren't new commitments.
- Nothing else on the page changes. The draft banner, title, `noindex` and sitemap exclusion stay.

**Deliberately not proposed:**
- **No sentence about who may use the site or at what age.** Whether, and how, the notice should address children's use is a legal question. It's left to counsel instead of being invented here.
- **No statement that the site complies with the DPDP Act 2023** or any other law.

## 3. Questions for counsel (T-06)
Record the answers privately (`docs/phase-2/`, never committed).
1. **The age decision itself.** India's Digital Personal Data Protection Act 2023 has specific rules for children's personal data, including verifiable parental consent. With no age limit and no parental-consent process, may the site process under-18 students' data? This covers account email addresses (already collected when someone signs up) and, if launched, cloud copies of study progress.
2. **Should the notice say anything about age,** and if so, what?
3. **GA4 for under-18 visitors:** this is still open (tracker F7 and F12). Decision P doesn't settle it.
4. **Existing records:** `profiles.age_band` values and any historical `terms` or `parental` consent rows are kept, not deleted. Is that appropriate, or should they be erased?

## 4. Options for the owner
| Option | What happens | Trade-off |
|---|---|---|
| **A. Apply the replacement in a reviewed PR before accounts or sync are activated** (recommended) | One sentence changes; the page stays a labelled draft | The notice matches the product. The legal question stays open until counsel answers (decision I) |
| B. Keep the current sentence until counsel reviews | No change now | The notice keeps describing a parental-consent step the product no longer has. It has no live effect while sync is off, but it **must** change before activation |
| C. Ask counsel first, then decide the wording | Wait for counsel | Delays T-24. Decision I places counsel after launch, so this would change that decision |

**If option A is chosen, the PR should:**
- edit only `src/app/privacy/page.tsx:42`;
- add `expect(text).not.toMatch(/parent or guardian/)` and a check for the verified-email wording to `src/lib/__tests__/privacy-notice-accuracy.test.ts`;
- keep the draft banner, title and `noindex` tests passing.

Merging it deploys the site, so it needs the owner's approval.
