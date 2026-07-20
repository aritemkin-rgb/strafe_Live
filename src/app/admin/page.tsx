"use client";

import { FormEvent, useEffect, useState } from "react";

interface Stats {
  totalWaitlist: number;
  totalSelections: number;
  sideCounts: Record<string, number>;
  theaterCounts: Record<string, number>;
  signupBySide: Record<string, number>;
  signupsByDay: Record<string, number>;
  storage: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [authed, setAuthed] = useState(false);

  const loadStats = async () => {
    const res = await fetch("/api/admin/stats");
    if (res.status === 401) {
      setAuthed(false);
      setStats(null);
      return;
    }
    if (!res.ok) {
      setError("Failed to load stats");
      return;
    }
    setStats((await res.json()) as Stats);
    setAuthed(true);
  };

  useEffect(() => {
    void loadStats();
  }, []);

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Unauthorized");
      return;
    }
    await loadStats();
  };

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 pt-24">
        <h1 className="font-display text-3xl text-white">Admin</h1>
        <p className="mt-2 text-sm text-[#83838A]">
          Protected analytics. Not linked publicly.
        </p>
        <form onSubmit={onLogin} className="mt-8 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="ADMIN_PASSWORD"
            className="w-full rounded-sm border border-white/15 bg-black px-3 py-3 text-sm text-white outline-none"
          />
          {error ? <p className="text-xs text-[#EF4444]">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-sm bg-[#EF4444] px-4 py-3 text-xs tracking-[0.16em] text-white"
          >
            ENTER
          </button>
        </form>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="px-4 pt-28 text-center text-[#83838A]">Loading…</div>
    );
  }

  const cards = [
    { label: "TOTAL WAITLIST SIGNUPS", value: stats.totalWaitlist },
    { label: "TOTAL SIDE SELECTIONS", value: stats.totalSelections },
    { label: "UKRAINE", value: stats.sideCounts.ukraine ?? 0 },
    { label: "RUSSIA", value: stats.sideCounts.russia ?? 0 },
    { label: "ISRAEL", value: stats.sideCounts.israel ?? 0 },
    { label: "PALESTINE", value: stats.sideCounts.palestine ?? 0 },
    { label: "SAF", value: stats.sideCounts.saf ?? 0 },
    { label: "RSF", value: stats.sideCounts.rsf ?? 0 },
    { label: "JUNTA", value: stats.sideCounts.junta ?? 0 },
    { label: "RESISTANCE", value: stats.sideCounts.resistance ?? 0 },
    {
      label: "NO PREFERENCE",
      value: stats.sideCounts["no-preference"] ?? 0,
    },
    {
      label: "EASTERN EUROPE TOTAL",
      value: stats.theaterCounts["eastern-europe"] ?? 0,
    },
    { label: "LEVANT TOTAL", value: stats.theaterCounts.levant ?? 0 },
    { label: "SUDAN TOTAL", value: stats.theaterCounts.sudan ?? 0 },
    { label: "MYANMAR TOTAL", value: stats.theaterCounts.myanmar ?? 0 },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-white">Analytics</h1>
          <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-[#83838A]">
            STORAGE: {stats.storage.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-sm border border-white/10 bg-[#0C0C0D] p-5"
          >
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#83838A]">
              {card.label}
            </p>
            <p className="mt-3 font-display text-3xl text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-sm border border-white/10 bg-[#0C0C0D] p-5">
          <h2 className="font-mono text-[11px] tracking-[0.18em] text-[#B5B5BB]">
            SIGNUP CONVERSION BY SIDE
          </h2>
          <div className="mt-4 space-y-2">
            {Object.entries(stats.signupBySide).map(([side, count]) => (
              <div
                key={side}
                className="flex justify-between border-t border-white/10 pt-2 text-sm"
              >
                <span className="uppercase text-[#B5B5BB]">{side}</span>
                <span className="text-white">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-sm border border-white/10 bg-[#0C0C0D] p-5">
          <h2 className="font-mono text-[11px] tracking-[0.18em] text-[#B5B5BB]">
            SIGNUPS BY DAY
          </h2>
          <div className="mt-4 space-y-2">
            {Object.keys(stats.signupsByDay).length === 0 ? (
              <p className="text-sm text-[#83838A]">No signups yet.</p>
            ) : (
              Object.entries(stats.signupsByDay)
                .sort(([a], [b]) => (a < b ? 1 : -1))
                .map(([day, count]) => (
                  <div
                    key={day}
                    className="flex justify-between border-t border-white/10 pt-2 text-sm"
                  >
                    <span className="text-[#B5B5BB]">{day}</span>
                    <span className="text-white">{count}</span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <p className="mt-8 text-xs text-[#83838A]">
        Email addresses are intentionally hidden on this dashboard.
      </p>
    </div>
  );
}
