"use client";

import { GEAR_TIERS } from "@/data/gearTiers";
import { useSelection } from "@/context/SelectionContext";

export function GearSection() {
  const { openAccessModal } = useSelection();

  return (
    <section id="gear" className="scroll-mt-20 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
          CHOOSE YOUR GEAR
        </p>
        <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          SUBSCRIPTION ACCESS
        </h2>
        <p className="mt-4 max-w-xl text-sm text-[#B5B5BB]">
          Select the access tier that matches your operational tempo. Paid plans
          unlock during private beta rollout.
        </p>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 no-scrollbar md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-4">
          {GEAR_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`min-w-[260px] rounded-sm border p-5 md:min-w-0 ${
                tier.featured
                  ? "border-[#EF4444] bg-[#EF4444]/5"
                  : "border-white/10 bg-[#0C0C0D]"
              }`}
            >
              <h3 className="font-display text-2xl text-white">{tier.name}</h3>
              <p className="mt-2 font-mono text-xs tracking-[0.14em] text-[#B5B5BB]">
                {tier.price}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-[#B5B5BB]">
                {tier.features.map((f) => (
                  <li key={f} className="border-t border-white/5 pt-2">
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openAccessModal(`gear-${tier.id}`)}
                className={`mt-8 w-full rounded-sm px-4 py-3 text-[11px] tracking-[0.16em] ${
                  tier.featured
                    ? "bg-[#EF4444] text-white"
                    : "border border-white/15 text-white hover:border-white/40"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
