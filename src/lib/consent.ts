/**
 * The storage notice, remembered as one small record.
 *
 * Audit 2026-09-29: the site sets no cookies and loads no analytics,
 * advertising or third-party tracking. What the browser keeps is limited to
 * what features the visitor uses need (this record, the sound choice, the
 * questionnaire draft, the intro flag on older routes), which falls under
 * the exemption for strictly necessary storage. So the notice informs and
 * can be closed; it does not offer a choice about technology that does not
 * exist. If optional technology is ever added, it must stay blocked until a
 * real, equally easy yes/no, and this file must grow that choice first.
 *
 * The record is asked again after 180 days. That period is a house choice,
 * not a legal deadline. If storage is blocked, the closing holds in memory
 * for the rest of the visit and the notice returns on the next one.
 */
export interface NoticeRecord {
  v: 2;
  at: string;
}

export const NOTICE_KEY = "nurea-consent";
export const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
/** Clock skew tolerated before a timestamp counts as "from the future". */
const SKEW_MS = 5 * 60 * 1000;
export const OPEN_EVENT = "nurea:cookies";

let memory: NoticeRecord | null = null;

/** Validates a stored record. Anything malformed, from an older version, dated in the future or too old is no record. */
export function parseNotice(raw: string | null, now: number): NoticeRecord | null {
  if (!raw) return null;
  let c: unknown;
  try {
    c = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!c || typeof c !== "object") return null;
  const r = c as Partial<NoticeRecord>;
  if (r.v !== 2 || typeof r.at !== "string") return null;
  const at = Date.parse(r.at);
  if (!Number.isFinite(at)) return null;
  if (at - now > SKEW_MS) return null;
  if (now - at > MAX_AGE_MS) return null;
  return { v: 2, at: r.at };
}

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readNotice(now = Date.now()): NoticeRecord | null {
  let stored: NoticeRecord | null = null;
  try {
    stored = parseNotice(storage()?.getItem(NOTICE_KEY) ?? null, now);
  } catch {
    stored = null;
  }
  return stored ?? parseNotice(memory ? JSON.stringify(memory) : null, now);
}

export function dismissNotice(now = Date.now()): NoticeRecord {
  const c: NoticeRecord = { v: 2, at: new Date(now).toISOString() };
  memory = c;
  try {
    storage()?.setItem(NOTICE_KEY, JSON.stringify(c));
  } catch {
    /* storage blocked: the in-memory record holds for this visit */
  }
  return c;
}

/** Reopens the notice from anywhere (the footer link). */
export function openCookieNotice(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
