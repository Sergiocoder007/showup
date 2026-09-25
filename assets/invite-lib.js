// Pure helpers for the invite landing page (unit-tested in tests/web).

const CODE_RE = /^[A-HJ-KM-NP-Z2-9]{12}$/;

/** ("/showup/j/abcd-efgh-jkmn", "/showup/") -> "ABCDEFGHJKMN", or null if it isn't an invite path. */
export function parseInviteCode(pathname, base = '/') {
  const prefix = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = new RegExp(`^${prefix}j/([^/?#]+)/?$`).exec(pathname || '');
  if (!m) return null;
  let raw;
  try {
    raw = decodeURIComponent(m[1]);
  } catch {
    return null;
  }
  const code = raw.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return CODE_RE.test(code) ? code : null;
}

/** "ABCDEFGHJKMN" -> "ABCD EFGH JKMN" for display. */
export const formatInviteCode = (code) => code.replace(/(.{4})(?=.)/g, '$1 ');

export function platformOf(userAgent) {
  if (/iPhone|iPad|iPod/i.test(userAgent || '')) return 'ios';
  if (/Android/i.test(userAgent || '')) return 'android';
  return 'other';
}
