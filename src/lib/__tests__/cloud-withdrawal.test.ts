import { describe, expect, it } from "vitest";
import { CLOUD_COPY_TABLES, CONSENT_LIMIT_NOTICE, FRESH_CONSENT_NOTICE, confirmedDeletion, isConsentLimitError, isWithdrawnError, reactivationNotice, withdrawCloudCopy, withdrawalNotice, withdrawalOutcome, type WithdrawalClient } from "@/lib/account/cloud-withdrawal";
import { ADAPTERS } from "@/lib/sync/adapters";
import { SYNC_META_KEY } from "@/lib/sync/policy";

// Withdrawing cloud-copy consent (decision J, option B): the client side.
// The database side (withdraw_cloud_copies()) is in db-withdraw-cloud-copies.test.ts.

const DELETED = { withdrawn: true, withdrawal_recorded: true, deleted: { bookmarks: 2, checklist_items: 1, revision_rounds: 0, mistakes: 3, goals: 1, streaks: 1 } };

/** A browser's storage holding progress in every study store, plus a sync record. */
function browser() {
  const items = new Map<string, string>();
  for (const a of ADAPTERS) items.set(a.key, JSON.stringify({ marker: `progress in ${a.key}` }));
  items.set("unrelated:setting", "keep");
  items.set(SYNC_META_KEY, JSON.stringify({ version: 1, accountId: "u1", lastSyncedAt: 1, base: { x: { k: "f" } } }));
  const before = new Map(items);
  const storage = {
    getItem: (k: string) => items.get(k) ?? null,
    setItem: (k: string, v: string) => void items.set(k, v),
    removeItem: (k: string) => void items.delete(k),
  };
  return { storage, items, before };
}

/** A fake server: each function returns what's given, or throws. Records the calls in order. */
function server(answers: Partial<Record<"begin_cloud_withdrawal" | "withdraw_cloud_copies", { data?: unknown; error?: unknown } | "throw">>) {
  const calls: string[] = [];
  const client: WithdrawalClient = {
    rpc(fn) {
      calls.push(fn);
      const a = answers[fn];
      if (a === "throw") return Promise.reject(new Error("network down"));
      return Promise.resolve({ data: a?.data ?? null, error: a?.error ?? null });
    },
  };
  return { client, calls };
}

const studyKeysUnchanged = (b: ReturnType<typeof browser>) => {
  for (const a of ADAPTERS) expect(b.items.get(a.key), a.key).toBe(b.before.get(a.key));
  expect(b.items.get("unrelated:setting")).toBe("keep");
};

describe("withdrawCloudCopy", () => {
  it("turns uploads off and sets the durable withdrawal marker first (begin_cloud_withdrawal), then asks the server to delete the copy", async () => {
    const s = server({ withdraw_cloud_copies: { data: DELETED } });
    await withdrawCloudCopy(s.client, browser().storage);
    expect(s.calls).toEqual(["begin_cloud_withdrawal", "withdraw_cloud_copies"]);
  });

  it("on the server's confirmation: reports the counts, clears only this device's sync record, keeps every study store", async () => {
    const b = browser();
    const r = await withdrawCloudCopy(server({ withdraw_cloud_copies: { data: DELETED } }).client, b.storage);
    expect(r).toEqual({ status: "deleted", deleted: DELETED.deleted, recorded: true, recordError: null });
    expect(b.items.has(SYNC_META_KEY)).toBe(false); // a re-enable starts fresh, not "cloud-incomplete"
    studyKeysUnchanged(b);
  });

  it("if the deletion fails: no deletion is claimed, the browser is untouched (sync record included), uploads are reported off", async () => {
    for (const failure of [{ error: { message: "boom" } }, "throw" as const]) {
      const b = browser();
      const r = await withdrawCloudCopy(server({ withdraw_cloud_copies: failure }).client, b.storage);
      expect(r).toEqual({ status: "uploads-off-not-deleted", recordError: null });
      expect(b.items.get(SYNC_META_KEY)).toBe(b.before.get(SYNC_META_KEY));
      studyKeysUnchanged(b);
    }
  });

  it("if neither step is confirmed (offline): says so, and changes nothing in the browser", async () => {
    const b = browser();
    const r = await withdrawCloudCopy(server({ begin_cloud_withdrawal: "throw", withdraw_cloud_copies: "throw" }).client, b.storage);
    expect(r).toEqual({ status: "not-confirmed", recordError: null });
    expect(b.items).toEqual(b.before);
  });

  it("the deletion alone is enough: withdraw_cloud_copies() turns sync off and sets the marker itself", async () => {
    const r = await withdrawCloudCopy(server({ begin_cloud_withdrawal: { error: { message: "x" } }, withdraw_cloud_copies: { data: DELETED } }).client, browser().storage);
    expect(r.status).toBe("deleted");
  });

  it("anything but the documented confirmation is not a confirmation", async () => {
    const bad: unknown[] = [
      null, true, "ok", {}, { withdrawn: true }, { withdrawn: false, withdrawal_recorded: true, deleted: DELETED.deleted },
      { ...DELETED, withdrawal_recorded: "yes" },
      { ...DELETED, deleted: { ...DELETED.deleted, streaks: undefined } },
      { ...DELETED, deleted: { ...DELETED.deleted, mistakes: -1 } },
      { ...DELETED, deleted: { ...DELETED.deleted, goals: 1.5 } },
    ];
    for (const data of bad) {
      expect(confirmedDeletion(data), JSON.stringify(data)).toBeNull();
      const b = browser();
      expect((await withdrawCloudCopy(server({ withdraw_cloud_copies: { data } }).client, b.storage)).status).toBe("uploads-off-not-deleted");
      expect(b.items).toEqual(b.before);
    }
  });

  it("with the page's consent rows: begin_cloud_withdrawal() FIRST, then the rows, then the deletion", async () => {
    const s = server({ withdraw_cloud_copies: { data: DELETED } });
    const record = () => { s.calls.push("insert consents"); return Promise.resolve({ error: null }); };
    const r = await withdrawCloudCopy(s.client, browser().storage, record);
    expect(s.calls).toEqual(["begin_cloud_withdrawal", "insert consents", "withdraw_cloud_copies"]);
    expect(r).toMatchObject({ status: "deleted", recordError: null });
  });

  it("the rows are still recorded if step 1 failed, and the deletion still runs if recording failed", async () => {
    for (const recordFails of ["error", "throw"] as const) {
      const s = server({ begin_cloud_withdrawal: "throw", withdraw_cloud_copies: { data: DELETED } });
      const record = () => {
        s.calls.push("insert consents");
        return recordFails === "throw" ? Promise.reject(new Error("offline")) : Promise.resolve({ error: { code: "54000" } });
      };
      const b = browser();
      const r = await withdrawCloudCopy(s.client, b.storage, record);
      expect(s.calls).toEqual(["begin_cloud_withdrawal", "insert consents", "withdraw_cloud_copies"]);
      expect(r.status).toBe("deleted");
      expect(r.recordError).toBeTruthy();
      studyKeysUnchanged(b);
    }
  });

  it("covers exactly the six cloud-copy tables", () => {
    expect([...CLOUD_COPY_TABLES]).toEqual(["bookmarks", "checklist_items", "revision_rounds", "mistakes", "goals", "streaks"]);
  });
});

describe("withdrawalNotice", () => {
  it("claims deletion only for a confirmed result, and says the browser's progress is unchanged", () => {
    expect(withdrawalNotice({ status: "deleted", deleted: DELETED.deleted, recorded: true })).toBe(
      "Cloud copies are off, and the copy stored with your account is deleted (8 records). Your progress in this browser hasn't changed.",
    );
    const one = { bookmarks: 1, checklist_items: 0, revision_rounds: 0, mistakes: 0, goals: 0, streaks: 0 };
    expect(withdrawalNotice({ status: "deleted", deleted: one, recorded: true })).toContain("(1 record)");
  });

  it("when the withdrawal couldn't be added to the consent history, says so", () => {
    const capped = withdrawalNotice({ status: "deleted", deleted: DELETED.deleted, recorded: false });
    expect(capped).toMatch(/We couldn't add this withdrawal to your consent history, so please contact us\./);
    expect(capped).toMatch(/Cloud copies stay off for this account until a new consent is recorded\./);
  });

  it("a failed deletion gives an accurate retry message and never says the copy is deleted", () => {
    for (const status of ["uploads-off-not-deleted", "not-confirmed"] as const) {
      const n = withdrawalNotice({ status });
      expect(n, status).toMatch(/Use “Delete my cloud copy” to try again\./);
      expect(n, status).toMatch(/Nothing in this browser was changed\./);
      expect(n, status).not.toMatch(/is deleted|was deleted|have been deleted/);
    }
    expect(withdrawalNotice({ status: "uploads-off-not-deleted" })).toMatch(/^Cloud copies are off, so nothing more is uploaded, but we couldn't delete/);
    expect(withdrawalNotice({ status: "not-confirmed" })).toMatch(/^We couldn't confirm that cloud copies are off, and we couldn't delete the copy stored with your account\./);
  });
});

describe("the four states the account page distinguishes (owner review, task 4)", () => {
  it("withdrawal completed / completed but not in the consent history / deletion failed, retry", () => {
    expect(withdrawalOutcome({ status: "deleted", deleted: DELETED.deleted, recorded: true })).toBe("completed");
    expect(withdrawalOutcome({ status: "deleted", deleted: DELETED.deleted, recorded: false })).toBe("completed-history-not-recorded");
    expect(withdrawalOutcome({ status: "uploads-off-not-deleted" })).toBe("deletion-failed-retry");
    expect(withdrawalOutcome({ status: "not-confirmed" })).toBe("deletion-failed-retry");
    // Each state has its own message; only the first two say the copy is deleted.
    const texts = new Set([
      withdrawalNotice({ status: "deleted", deleted: DELETED.deleted, recorded: true }),
      withdrawalNotice({ status: "deleted", deleted: DELETED.deleted, recorded: false }),
      withdrawalNotice({ status: "uploads-off-not-deleted" }),
      FRESH_CONSENT_NOTICE,
    ]);
    expect(texts.size).toBe(4);
  });

  it("a server answer that isn't the documented confirmation is always 'deletion failed, retry', never success", async () => {
    for (const data of [null, { withdrawn: true }, { ...DELETED, withdrawn: "true" }, { ...DELETED, withdrawal_recorded: "yes" }]) {
      const b = browser();
      const r = await withdrawCloudCopy(server({ begin_cloud_withdrawal: { data: true }, withdraw_cloud_copies: { data } }).client, b.storage);
      expect(withdrawalOutcome(r), JSON.stringify(data)).toBe("deletion-failed-retry");
      expect(withdrawalNotice(r)).not.toMatch(/is deleted/);
    }
  });

  it("fresh consent required: the database's withdrawn refusal, or 'consent-required' after a withdrawal", () => {
    const withdrawn = { code: "42501", message: "cloud-copy-withdrawn", hint: "A new cloud-copy consent is needed first." };
    expect(isWithdrawnError(withdrawn)).toBe(true);
    expect(reactivationNotice({ data: null, error: withdrawn }, true)).toBe(FRESH_CONSENT_NOTICE);
    expect(reactivationNotice({ data: "consent-required", error: null }, false)).toBe(FRESH_CONSENT_NOTICE);
    // Not this state: never consented (null), other refusals, other errors, success.
    expect(reactivationNotice({ data: "consent-required", error: null }, null)).toBeNull();
    expect(reactivationNotice({ data: "not-available-yet", error: null }, false)).toBeNull();
    expect(reactivationNotice({ data: "enabled", error: null }, true)).toBeNull();
    for (const e of [{ code: "42501", message: "permission denied" }, { code: "P0001", message: "cloud-copy-withdrawn" }, new Error("network"), null]) {
      expect(isWithdrawnError(e), JSON.stringify(e)).toBe(false);
      if (e) expect(reactivationNotice({ data: null, error: e }, false)).toBeNull();
    }
    expect(FRESH_CONSENT_NOTICE).not.toMatch(/are on|turned on\b/);
  });

  it("a consent change refused by the daily allowance has its own message; nothing else matches", () => {
    expect(isConsentLimitError({ code: "54000", message: "row limit 200 reached for consents" })).toBe(true);
    for (const e of [{ code: "42501" }, null, new Error("x")]) expect(isConsentLimitError(e)).toBe(false);
    // Owner-approved wording (2026-11-28): the window rolls (no "tomorrow"), and turning consent off is never limited.
    expect(CONSENT_LIMIT_NOTICE).toBe("You've changed your cloud-copy choices many times in the last 24 hours, so we can't record another consent yet. Please try again later. Turning consent off is always recorded.");
    expect(CONSENT_LIMIT_NOTICE).not.toMatch(/tomorrow/);
  });
});
