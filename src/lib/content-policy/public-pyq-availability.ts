import type { PyqExamAvailability } from "./pyq-publication";

// ─────────────────────────────────────────────────────────────────
// Public PYQ availability (lightweight, client-safe)
//
// Per chapter, which exam groups have at least one PUBLISHABLE question
// under the PYQ publication policy. Hub pages and global search use
// this (through `hasPyqFor`) so they never advertise withheld content.
// It holds no question text, so client components can import it
// without pulling in the question bank.
//
// Currently EMPTY: every legacy PYQ is withheld pending official
// verification and rights clearance (Phase 2A). A unit test
// (src/lib/__tests__/pyq-publication.test.ts) recomputes this map from
// the real registry and the policy, and fails if the two disagree. Add
// an entry here in the same change that publishes a chapter's first
// verified question.
// ─────────────────────────────────────────────────────────────────

export const publicPyqAvailability: Readonly<Record<string, PyqExamAvailability>> = {};
