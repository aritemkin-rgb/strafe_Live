const SESSION_KEY = "strafe_anonymous_session";

export function getAnonymousSessionId(): string {
  if (typeof window === "undefined") return "server";

  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(SESSION_KEY, id);
  return id;
}
