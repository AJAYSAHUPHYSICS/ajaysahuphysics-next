// ─────────────────────────────────────────────────────────────────
// Dependency-free accessibility audit, run inside the page by the
// Chrome DevTools harness (scripts/e2e/*.mjs). It is NOT a full WCAG
// audit (no axe-core: that would be a new dependency). It checks the
// automatable basics that most often regress:
//   - <html lang>, one <h1>, a <main> landmark, no skipped heading levels
//   - images have alt text; links, buttons and form controls have names
//   - ids are unique (labels and aria-* references depend on it)
//   - text colour contrast (WCAG 2.x AA: 4.5:1, or 3:1 for large text),
//     measured only where the background is a flat colour
// Returns a list of problems: [{ rule, detail }].
// ─────────────────────────────────────────────────────────────────

export const A11Y_AUDIT = `(() => {
  const problems = [];
  const add = (rule, el, extra = "") => problems.push({ rule, detail: describe(el) + (extra ? " " + extra : "") });
  const describe = (el) => {
    if (!el || !el.tagName) return "";
    const text = (el.textContent || "").trim().replace(/[ \\n\\t]+/g, " ").slice(0, 40);
    return el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (text ? ' "' + text + '"' : "");
  };
  const visible = (el) => {
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden") return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 || r.height > 0 || el.getClientRects().length > 0;
  };
  const hidden = (el) => !!el.closest("[aria-hidden='true'], [hidden], [inert]");
  const byId = (id) => document.getElementById(id);
  const labelledBy = (el) => (el.getAttribute("aria-labelledby") || "").split(" ").filter(Boolean).map((id) => (byId(id)?.textContent || "").trim()).join(" ");
  const name = (el) => {
    const parts = [el.getAttribute("aria-label"), labelledBy(el), el.getAttribute("title")];
    if (["INPUT", "SELECT", "TEXTAREA"].includes(el.tagName)) {
      if (el.id) for (const l of document.querySelectorAll("label[for='" + CSS.escape(el.id) + "']")) parts.push(l.textContent);
      const wrap = el.closest("label");
      if (wrap) parts.push(wrap.textContent);
      if (el.type === "submit" || el.type === "button") parts.push(el.value);
    } else {
      parts.push(el.textContent);
      for (const img of el.querySelectorAll("img[alt], svg[aria-label]")) parts.push(img.getAttribute("alt") || img.getAttribute("aria-label"));
    }
    return parts.filter(Boolean).join(" ").trim();
  };

  // Document structure
  if (!document.documentElement.getAttribute("lang")) add("html-lang", document.documentElement);
  const h1s = [...document.querySelectorAll("h1")].filter((h) => visible(h) && !hidden(h));
  if (h1s.length !== 1) problems.push({ rule: "one-h1", detail: h1s.length + " visible h1 elements" });
  if (!document.querySelector("main")) problems.push({ rule: "main-landmark", detail: "no <main>" });
  let last = 0;
  for (const h of document.querySelectorAll("main h1, main h2, main h3, main h4, main h5, main h6")) {
    if (!visible(h) || hidden(h)) continue;
    const level = Number(h.tagName[1]);
    if (last && level > last + 1) add("heading-order", h, "h" + last + " then h" + level);
    last = level;
  }

  // Names
  for (const img of document.querySelectorAll("img")) if (!img.hasAttribute("alt") && !hidden(img)) add("img-alt", img, img.getAttribute("src") || "");
  for (const el of document.querySelectorAll("a[href], button, [role='button']")) {
    if (hidden(el) || !visible(el)) continue;
    if (!name(el)) add("control-name", el, el.getAttribute("href") || "");
  }
  for (const el of document.querySelectorAll("input, select, textarea")) {
    if (el.type === "hidden" || hidden(el) || !visible(el)) continue;
    if (!name(el)) add("form-label", el, el.getAttribute("name") || el.type || "");
  }

  // Unique ids
  const seen = new Map();
  for (const el of document.querySelectorAll("[id]")) seen.set(el.id, (seen.get(el.id) || 0) + 1);
  for (const [id, n] of seen) if (n > 1) problems.push({ rule: "duplicate-id", detail: id + " x" + n });

  // Contrast (flat backgrounds only; skips gradients, images, transparency)
  const parse = (c) => { const m = c.match(/rgba?[(]([^)]+)[)]/); if (!m) return null; const p = m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const background = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.backgroundImage && s.backgroundImage !== "none") return null;
      const c = parse(s.backgroundColor);
      if (c && c.a === 1) return c;
      if (c && c.a > 0) return null;
      if (parseFloat(s.opacity) < 1) return null;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };
  const reported = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const el = node.parentElement;
    if (!el || !node.textContent.trim() || hidden(el) || !visible(el) || reported.has(el)) continue;
    if (el.closest(".sr-only, script, style, noscript")) continue;
    const s = getComputedStyle(el);
    const fg = parse(s.color);
    const bg = background(el);
    if (!fg || !bg || fg.a < 1) continue;
    const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a);
    const ratio = (hi + 0.05) / (lo + 0.05);
    const size = parseFloat(s.fontSize);
    const large = size >= 24 || (size >= 18.66 && Number(s.fontWeight) >= 700);
    if (ratio < (large ? 3 : 4.5)) { reported.add(el); add("contrast", el, ratio.toFixed(2) + ":1 at " + size + "px"); }
  }
  return problems;
})()`;
