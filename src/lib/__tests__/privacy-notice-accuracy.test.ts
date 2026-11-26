import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The draft privacy notice must describe what the site actually does
// (legal review F12, question L-16). These checks fail when the code starts
// sending a new analytics event that the notice doesn't mention, or when the
// notice stops being a clearly labelled, unindexed draft.
const ROOT = path.resolve(__dirname, "..", "..", "..");
const notice = readFileSync(path.join(ROOT, "src", "app", "privacy", "page.tsx"), "utf8");
const text = notice.replace(/&apos;/g, "'");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) return name === "__tests__" ? [] : sourceFiles(p);
    return /\.tsx?$/.test(name) ? [p] : [];
  });
}

// Every GA4 event the code sends, and the notice wording that discloses it.
const DISCLOSED: Record<string, RegExp> = {
  page_view: /the pages you visit/,
  search: /which chapter a search led to[\s\S]*never the words you typed/,
  select_content: /clicks on resource links/,
  whatsapp_click: /clicks on the WhatsApp button/,
};

describe("privacy notice matches the site's behaviour", () => {
  it("names every analytics event the code sends", () => {
    const sent = new Set<string>();
    for (const f of sourceFiles(path.join(ROOT, "src"))) {
      for (const m of readFileSync(f, "utf8").matchAll(/trackEvent\(\s*["']([a-z_]+)["']/g)) sent.add(m[1]);
    }
    expect(sent.size).toBeGreaterThan(0);
    for (const event of sent) {
      expect(DISCLOSED[event], `analytics event "${event}" is sent but not described in /privacy`).toBeDefined();
      expect(text, `/privacy doesn't describe the "${event}" event`).toMatch(DISCLOSED[event]);
    }
  });

  it("says the typed search words and saved progress are never sent to analytics", () => {
    expect(text).toMatch(/never the words you typed/);
    expect(text).toMatch(/don't send it your saved progress or your email address/);
  });

  it("doesn't claim account deletion from the account page, and points to the contact page", () => {
    expect(text).not.toMatch(/Delete your account from your account page/);
    expect(text).toMatch(/To delete your account, ask us through the/);
  });

  it("describes cloud copies as the product builds them: verified email and consent, no parental step (decision P)", () => {
    expect(text).not.toMatch(/parent or guardian/);
    expect(text).not.toMatch(/under 18/i);
    expect(text).toMatch(/it will need a verified email address and your consent, which you can withdraw at any time/);
    expect(text).toMatch(/These would never be copied: activity history, searches, reading position and recently viewed pages/);
  });

  it("stays a clearly labelled draft and is not indexed (owner decision F13)", () => {
    expect(text).toMatch(/Draft notice, pending legal review/);
    expect(text).toMatch(/title: "Privacy notice \(draft\)"/);
    expect(text).toMatch(/robots: \{ index: false/);
    expect(readFileSync(path.join(ROOT, "src", "app", "sitemap.ts"), "utf8")).not.toMatch(/privacy/);
  });
});
