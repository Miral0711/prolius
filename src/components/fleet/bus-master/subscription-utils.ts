/** Parse DD/MM/YY or DD/MM/YYYY into local Date (start of day). */
export function parseDdMmYy(value: string): Date | null {
  const p = value.split('/');
  if (p.length !== 3) return null;
  const d = parseInt(p[0], 10);
  const m = parseInt(p[1], 10);
  let y = parseInt(p[2], 10);
  if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y)) return null;
  if (y < 100) y += 2000;
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** ISO-style range for display (DD/MM input). */
export function subscriptionRangeDisplay(start: string, end: string): string {
  const norm = (x: string) => {
    const dt = parseDdMmYy(x);
    if (!dt) return x;
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  return `${norm(start)} → ${norm(end)}`;
}

export type SubscriptionExpiryTone = 'ok' | 'warn' | 'expired' | 'neutral';

export function subscriptionExpiryContext(
  endDdMmYy: string,
  now: Date = new Date(),
): { line: string; tone: SubscriptionExpiryTone } {
  const end = parseDdMmYy(endDdMmYy);
  if (!end) return { line: '', tone: 'neutral' };
  const today = startOfDay(now);
  const endDay = startOfDay(end);
  const ms = endDay.getTime() - today.getTime();
  const days = Math.round(ms / 86400000);
  if (days < 0) return { line: `Expired · ${Math.abs(days)}d ago`, tone: 'expired' };
  if (days === 0) return { line: 'Expires today', tone: 'warn' };
  if (days <= 14) return { line: `${days}d left on contract`, tone: 'warn' };
  if (days <= 90) return { line: `${days}d remaining`, tone: 'ok' };
  return { line: `${days}d remaining`, tone: 'neutral' };
}
