/** Deterministic theatrical queue number from email. Not a real subscriber total. */
export function queueNumberFromEmail(email: string): number {
  const normalized = email.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < normalized.length; i += 1) {
    hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0;
  }
  return 12000 + (hash % 88000);
}

export function formatQueuePosition(n: number): string {
  return `#${n.toLocaleString("en-US")}`;
}
