import { FIELD_NOTES, STRATEGIC_PARTNERS } from "@/data/telemetry";

export function CredibilityStrip() {
  return (
    <section
      id="network"
      className="scroll-mt-24 border-y border-white/10 bg-[#0C0C0D] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
          STRATEGIC PARTNERS
        </p>
        <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
          NETWORK & SUPPLY
        </h2>
        <p className="mt-4 max-w-xl text-sm text-[#B5B5BB]">
          Integrated with leading defense and autonomy partners across theater
          logistics, sensing, and secure command links.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
          {STRATEGIC_PARTNERS.map((name) => (
            <div
              key={name}
              className="flex min-h-[88px] items-center justify-center bg-[#0C0C0D] px-3 py-6 text-center"
            >
              <p className="font-mono text-[10px] tracking-[0.16em] text-[#B5B5BB] sm:text-[11px]">
                {name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {FIELD_NOTES.map((note) => (
            <div
              key={note.source}
              className="rounded-sm border border-white/10 bg-black px-5 py-5"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#EF4444]">
                FIELD NOTE · {note.source}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#B5B5BB]">
                “{note.line}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
