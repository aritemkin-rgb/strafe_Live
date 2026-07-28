"use client";

import { GEAR_TIERS } from "@/data/gearTiers";
import { useSelection } from "@/context/SelectionContext";

export function SubscriptionTiers({
  heading = "SUBSCRIPTION TIERS",
  intro = "Watch other operators for free, fly on shared airframes, or take Commander and get an S-1 Scout shipped to your chosen battlefield.",
}: {
  heading?: string;
  intro?: string;
}) {
  const { openAccessModal } = useSelection();

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
        NETWORK ACCESS
      </p>
      <h3 className="mt-3 font-display text-3xl text-white sm:text-4xl">
        {heading}
      </h3>
      <p className="mt-4 max-w-2xl text-sm text-[#B5B5BB]">{intro}</p>

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
            <h4 className="font-display text-2xl text-white">{tier.name}</h4>
            <p className="mt-2 font-mono text-xs tracking-[0.14em] text-[#B5B5BB]">
              {tier.price}
            </p>
            <p className="mt-3 text-sm text-[#83838A]">{tier.blurb}</p>
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
  );
}
