// ─────────────────────────────────────────────────────────────────
// Store adapters: local storage format ⇄ merge records ⇄ database rows.
//
// Each adapter reads its key's EXISTING format (including the legacy
// revision `number[]` shape) and writes back exactly the current format the
// app itself writes, so nothing outside the sync engine notices a change.
// ─────────────────────────────────────────────────────────────────

export type Storage = { getItem(key: string): string | null; setItem(key: string, value: string): void };
export type Row = Record<string, unknown>;

export type Adapter<T> = {
  key: string;
  table: string;
  /** Local raw JSON → records by key. Malformed data yields no records (never throws). */
  read(raw: string | null): Map<string, T>;
  /**
   * Records → raw JSON in the app's current format. `prevRaw` is the store's
   * current value: anything in it this adapter doesn't sync (malformed or
   * unsyncable entries, unknown keys, unticked items) is kept unchanged.
   */
  write(records: Map<string, T>, prevRaw: string | null): string;
  toRow(record: T): Row;
  /** Database row → record, or null for a tombstone. */
  fromRow(row: Row): T | null;
  /** Key of a database row (also for tombstones). */
  rowKey(row: Row): string;
  /** Row that marks a record deleted in the cloud. */
  tombstone(record: T): Row;
  combine(local: T, remote: T): T;
};

const parse = (raw: string | null): unknown => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
const iso = (ms: number) => new Date(ms).toISOString();
const ms = (v: unknown) => (typeof v === "string" ? Date.parse(v) : typeof v === "number" ? v : NaN);
const isCls = (v: unknown): v is "11" | "12" => v === "11" || v === "12";
const NOW_ISO = () => new Date().toISOString();

// ── bookmarks ─────────────────────────────────────────────────────────
export type BookmarkRec = { id: string; cls: "11" | "12"; slug: string; type: string; chapterName: string; label: string; path: string; bookmarkedAt: number };
export const bookmarksAdapter: Adapter<BookmarkRec> = {
  key: "atlas:bookmarks",
  table: "bookmarks",
  read(raw) {
    const out = new Map<string, BookmarkRec>();
    const v = parse(raw);
    if (!Array.isArray(v)) return out;
    for (const b of v) if (b && typeof b.id === "string" && isCls(b.cls) && typeof b.bookmarkedAt === "number") out.set(b.id, { id: b.id, cls: b.cls, slug: b.slug, type: b.type, chapterName: b.chapterName, label: b.label, path: b.path, bookmarkedAt: b.bookmarkedAt });
    return out;
  },
  write(records, prevRaw) {
    const prev = parse(prevRaw);
    const kept = Array.isArray(prev) ? prev.filter((b) => !bookmarksAdapter.read(JSON.stringify([b])).size) : [];
    return JSON.stringify([...[...records.values()].sort((a, b) => b.bookmarkedAt - a.bookmarkedAt), ...kept]);
  },
  toRow: (b) => ({ bookmark_id: b.id, cls: b.cls, slug: b.slug, type: b.type, chapter_name: b.chapterName, label: b.label, path: b.path, bookmarked_at: iso(b.bookmarkedAt), deleted_at: null }),
  fromRow: (r) => (r.deleted_at ? null : { id: String(r.bookmark_id), cls: r.cls as "11" | "12", slug: String(r.slug), type: String(r.type), chapterName: String(r.chapter_name), label: String(r.label), path: String(r.path), bookmarkedAt: ms(r.bookmarked_at) }),
  rowKey: (r) => String(r.bookmark_id),
  tombstone: (b) => ({ ...bookmarksAdapter.toRow(b), deleted_at: NOW_ISO() }),
  combine: (l, r) => ({ ...r, ...l, bookmarkedAt: Math.min(l.bookmarkedAt, r.bookmarkedAt) }),
};

// ── checklist ─────────────────────────────────────────────────────────
// Local: {"cls:slug": {notes?: boolean, …}}. Synced records are the TRUE
// items; unticking removes the record, which the cloud stores as done=false.
export type ChecklistRec = { cls: "11" | "12"; slug: string; item: string; done: true };
const CHECKLIST_ITEMS = ["notes", "formulaSheet", "dpp", "pyq"];
export const checklistAdapter: Adapter<ChecklistRec> = {
  key: "atlas:checklist",
  table: "checklist_items",
  read(raw) {
    const out = new Map<string, ChecklistRec>();
    const v = parse(raw);
    if (!v || typeof v !== "object" || Array.isArray(v)) return out;
    for (const [chapter, items] of Object.entries(v as Record<string, Record<string, unknown>>)) {
      const [cls, slug] = chapter.split(":");
      if (!isCls(cls) || !slug || !items || typeof items !== "object") continue;
      for (const item of CHECKLIST_ITEMS) if (items[item] === true) out.set(`${cls}:${slug}:${item}`, { cls, slug, item, done: true });
    }
    return out;
  },
  write(records, prevRaw) {
    const prev = parse(prevRaw);
    const map: Record<string, Record<string, unknown>> = prev && typeof prev === "object" && !Array.isArray(prev) ? JSON.parse(JSON.stringify(prev)) : {};
    // Items ticked before but no longer in the merged set were unticked: keep the app's explicit false.
    for (const [chapter, items] of Object.entries(map)) {
      if (!items || typeof items !== "object") continue;
      for (const item of CHECKLIST_ITEMS) if (items[item] === true && !records.has(`${chapter}:${item}`)) items[item] = false;
    }
    for (const r of records.values()) ((map[`${r.cls}:${r.slug}`] ??= {}) as Record<string, unknown>)[r.item] = true;
    return JSON.stringify(map);
  },
  toRow: (r) => ({ cls: r.cls, slug: r.slug, item: r.item, done: true }),
  fromRow: (r) => (r.done === true ? { cls: r.cls as "11" | "12", slug: String(r.slug), item: String(r.item), done: true } : null),
  rowKey: (r) => `${r.cls}:${r.slug}:${r.item}`,
  tombstone: (r) => ({ cls: r.cls, slug: r.slug, item: r.item, done: false }),
  combine: (l) => l, // both ticked
};

// ── revision rounds ───────────────────────────────────────────────────
export type RevisionRec = { cls: "11" | "12"; slug: string; round: 1 | 2 | 3; completedAt: number };
const isRound = (n: unknown): n is 1 | 2 | 3 => n === 1 || n === 2 || n === 3;
export const revisionAdapter: Adapter<RevisionRec> = {
  key: "atlas:revision",
  table: "revision_rounds",
  read(raw) {
    const out = new Map<string, RevisionRec>();
    const v = parse(raw);
    if (!v || typeof v !== "object" || Array.isArray(v)) return out;
    for (const [chapter, entries] of Object.entries(v as Record<string, unknown>)) {
      const [cls, slug] = chapter.split(":");
      if (!isCls(cls) || !slug || !Array.isArray(entries)) continue;
      for (const e of entries) {
        // Same rules as revision.ts: legacy number[] entries have no known date (0).
        const round = isRound(e) ? e : e && typeof e === "object" && isRound((e as RevisionRec).round) ? (e as RevisionRec).round : null;
        if (!round) continue;
        const at = typeof e === "object" && typeof (e as RevisionRec).completedAt === "number" ? (e as RevisionRec).completedAt : 0;
        out.set(`${cls}:${slug}:${round}`, { cls, slug, round, completedAt: at });
      }
    }
    return out;
  },
  write(records, prevRaw) {
    const prev = parse(prevRaw);
    const map: Record<string, unknown> = {};
    // Chapters this adapter can't parse are kept exactly as they were.
    if (prev && typeof prev === "object" && !Array.isArray(prev)) {
      for (const [chapter, entries] of Object.entries(prev as Record<string, unknown>)) {
        const [cls, slug] = chapter.split(":");
        if (!isCls(cls) || !slug || !Array.isArray(entries)) map[chapter] = entries;
      }
    }
    for (const r of [...records.values()].sort((a, b) => a.round - b.round)) ((map[`${r.cls}:${r.slug}`] ??= []) as { round: number; completedAt: number }[]).push({ round: r.round, completedAt: r.completedAt });
    return JSON.stringify(map);
  },
  toRow: (r) => ({ cls: r.cls, slug: r.slug, round: r.round, completed_at: iso(r.completedAt), deleted_at: null }),
  fromRow: (r) => (r.deleted_at || !isRound(Number(r.round)) ? null : { cls: r.cls as "11" | "12", slug: String(r.slug), round: Number(r.round) as 1 | 2 | 3, completedAt: ms(r.completed_at) }),
  rowKey: (r) => `${r.cls}:${r.slug}:${Number(r.round)}`,
  tombstone: (r) => ({ ...revisionAdapter.toRow(r), deleted_at: NOW_ISO() }),
  combine: (l, r) => ({ ...l, completedAt: Math.min(l.completedAt || r.completedAt, r.completedAt || l.completedAt) }),
};

// ── mistakes ──────────────────────────────────────────────────────────
export type MistakeRec = {
  id: string; cls: "11" | "12"; slug: string; chapterName: string; resourceType: "dpp" | "pyq";
  questionId?: string; category?: string; conceptTag: string; difficulty: string; note: string; createdAt: number; resolvedAt: number | null;
};
const CATEGORIES = ["conceptual", "calculation", "formula", "reading", "silly"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Local questionIds made against withheld legacy content are bare positions
 * ("17"). In the cloud they're namespaced so a rebuilt question ("q-…",
 * "pyq-<exam>-<year>-…") can never inherit an old mistake.
 */
export function toQuestionRef(m: Pick<MistakeRec, "questionId" | "resourceType" | "cls" | "slug">): string | null {
  if (m.questionId === undefined || m.questionId === "") return null;
  if (/^\d{1,5}$/.test(m.questionId)) return `legacy:${m.resourceType}:${m.cls}/${m.slug}#${m.questionId}`;
  if (/^(q|pyq)-[a-z0-9-]{1,100}$/.test(m.questionId)) return m.questionId;
  return null; // unknown format: keep it local, never guess a mapping
}
export function fromQuestionRef(ref: unknown): string | undefined {
  if (typeof ref !== "string") return undefined;
  const legacy = /^legacy:(dpp|pyq):(11|12)\/[a-z0-9-]+#(\d{1,5})$/.exec(ref);
  return legacy ? legacy[3] : ref;
}

export const mistakesAdapter: Adapter<MistakeRec> = {
  key: "atlas:mistakes",
  table: "mistakes",
  read(raw) {
    const out = new Map<string, MistakeRec>();
    const v = parse(raw);
    if (!Array.isArray(v)) return out;
    for (const m of v) {
      if (!m || typeof m.id !== "string" || !UUID.test(m.id) || !isCls(m.cls) || typeof m.createdAt !== "number") continue;
      const rec: MistakeRec = { id: m.id, cls: m.cls, slug: m.slug, chapterName: m.chapterName, resourceType: m.resourceType, conceptTag: m.conceptTag ?? "", difficulty: m.difficulty, note: m.note ?? "", createdAt: m.createdAt, resolvedAt: typeof m.resolvedAt === "number" ? m.resolvedAt : null };
      if (typeof m.questionId === "string") rec.questionId = m.questionId;
      if (typeof m.category === "string" && CATEGORIES.includes(m.category)) rec.category = m.category;
      out.set(m.id, rec);
    }
    return out;
  },
  write(records, prevRaw) {
    // Mistakes the cloud can't hold (e.g. a non-UUID id from an old browser) stay on the device.
    const prev = parse(prevRaw);
    const kept = Array.isArray(prev) ? prev.filter((m) => !mistakesAdapter.read(JSON.stringify([m])).size) : [];
    return JSON.stringify([...[...records.values()].sort((a, b) => b.createdAt - a.createdAt), ...kept]);
  },
  toRow: (m) => ({ id: m.id, cls: m.cls, slug: m.slug, chapter_name: m.chapterName, resource_type: m.resourceType, question_ref: toQuestionRef(m), category: m.category ?? null, concept_tag: m.conceptTag, difficulty: m.difficulty, note: m.note, created_at: iso(m.createdAt), resolved_at: m.resolvedAt === null ? null : iso(m.resolvedAt), deleted_at: null }),
  fromRow(r) {
    if (r.deleted_at) return null;
    const rec: MistakeRec = { id: String(r.id), cls: r.cls as "11" | "12", slug: String(r.slug), chapterName: String(r.chapter_name), resourceType: r.resource_type as "dpp" | "pyq", conceptTag: String(r.concept_tag ?? ""), difficulty: String(r.difficulty), note: String(r.note ?? ""), createdAt: ms(r.created_at), resolvedAt: r.resolved_at ? ms(r.resolved_at) : null };
    const q = fromQuestionRef(r.question_ref);
    if (q !== undefined) rec.questionId = q;
    if (typeof r.category === "string") rec.category = r.category;
    return rec;
  },
  rowKey: (r) => String(r.id),
  tombstone: (m) => ({ ...mistakesAdapter.toRow(m), deleted_at: NOW_ISO() }),
  combine(l, r) {
    // Both devices edited the same mistake: keep this device's status and
    // fields, but never drop the other device's note text.
    const notes = l.note === r.note || !r.note ? l.note : !l.note ? r.note : l.note.includes(r.note) ? l.note : r.note.includes(l.note) ? r.note : `${l.note}\n— from another device —\n${r.note}`;
    return { ...r, ...l, note: notes.slice(0, 2000), category: l.category ?? r.category, createdAt: Math.min(l.createdAt, r.createdAt) };
  },
};

// ── goals ─────────────────────────────────────────────────────────────
export type GoalRec = { goalType: string; activatedAt: number };
export const goalsAdapter: Adapter<GoalRec> = {
  key: "atlas:goals",
  table: "goals",
  read(raw) {
    const out = new Map<string, GoalRec>();
    const v = parse(raw);
    if (!v || typeof v !== "object" || Array.isArray(v)) return out;
    for (const [goalType, at] of Object.entries(v as Record<string, unknown>)) if (typeof at === "number" && /^[a-z0-9-]{1,60}$/.test(goalType)) out.set(goalType, { goalType, activatedAt: at });
    return out;
  },
  write(records, prevRaw) {
    const prev = parse(prevRaw);
    const kept = prev && typeof prev === "object" && !Array.isArray(prev) ? Object.fromEntries(Object.entries(prev as Record<string, unknown>).filter(([k, v]) => !(typeof v === "number" && /^[a-z0-9-]{1,60}$/.test(k)))) : {};
    return JSON.stringify({ ...kept, ...Object.fromEntries([...records.values()].map((g) => [g.goalType, g.activatedAt])) });
  },
  toRow: (g) => ({ goal_type: g.goalType, activated_at: iso(g.activatedAt), deleted_at: null }),
  fromRow: (r) => (r.deleted_at ? null : { goalType: String(r.goal_type), activatedAt: ms(r.activated_at) }),
  rowKey: (r) => String(r.goal_type),
  tombstone: (g) => ({ ...goalsAdapter.toRow(g), deleted_at: NOW_ISO() }),
  combine: (l, r) => ({ ...l, activatedAt: Math.min(l.activatedAt, r.activatedAt) }),
};

// ── streak (single record) ────────────────────────────────────────────
export type StreakRec = { current: number; longest: number; lastActiveDate: string | null };
export const streakAdapter: Adapter<StreakRec> = {
  key: "atlas:study-streak",
  table: "streaks",
  read(raw) {
    const out = new Map<string, StreakRec>();
    const v = parse(raw) as Partial<StreakRec> | null;
    if (!v || typeof v !== "object" || typeof v.current !== "number") return out;
    out.set("streak", { current: v.current, longest: typeof v.longest === "number" ? v.longest : v.current, lastActiveDate: typeof v.lastActiveDate === "string" ? v.lastActiveDate : null });
    return out;
  },
  write(records, prevRaw) {
    const s = records.get("streak");
    return s ? JSON.stringify(s) : (prevRaw ?? JSON.stringify({ current: 0, longest: 0, lastActiveDate: null }));
  },
  toRow: (s) => ({ current_days: s.current, longest_days: Math.max(s.longest, s.current), last_active_date: s.lastActiveDate }),
  fromRow: (r) => ({ current: Number(r.current_days), longest: Number(r.longest_days), lastActiveDate: typeof r.last_active_date === "string" ? r.last_active_date.slice(0, 10) : null }),
  rowKey: () => "streak",
  tombstone: (s) => streakAdapter.toRow(s),
  combine(l, r) {
    // The most recently active device knows the current run; the longest is the best of both.
    const recent = (r.lastActiveDate ?? "") > (l.lastActiveDate ?? "") ? r : l;
    return { current: recent.current, longest: Math.max(l.longest, r.longest, l.current, r.current), lastActiveDate: recent.lastActiveDate };
  },
};

export const ADAPTERS = [bookmarksAdapter, checklistAdapter, revisionAdapter, mistakesAdapter, goalsAdapter, streakAdapter] as const;
