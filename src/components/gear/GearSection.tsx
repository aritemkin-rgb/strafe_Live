"use client";

import Image from "next/image";
import Link from "next/link";
import { DRONES } from "@/data/drones";
import { GEAR_TIERS } from "@/data/gearTiers";
import { useSelection } from "@/context/SelectionContext";

export function GearSection() {
  const { openAccessModal } = useSelection();

  return (
    <section id="gear" className="scroll-mt-20 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
              AIRFRAMES
            </p>
            <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
              CHOOSE YOUR GEAR
            </h2>
            <p className="mt-4 max-w-xl text-sm text-[#B5B5BB]">
              Civilian operator platforms for sale. Inspect specs, payload, and
              mission role — then request allocation.
            </p>
          </div>
          <Link
            href="/gear"
            className="font-mono text-[11px] tracking-[0.18em] text-[#B5B5BB] transition hover:text-white"
          >
            VIEW FULL CATALOG →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {DRONES.map((drone) => (
            <Link
              key={drone.id}
              href={`/gear/${drone.id}`}
              className="group overflow-hidden rounded-sm border border-white/10 bg-[#0C0C0D] transition hover:border-white/30"
            >
              <div className="relative aspect-[4/3] bg-[#111113]">
                <Image
                  src={drone.image}
                  alt={drone.shortName}
                  fill
                  className="object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="border-t border-white/10 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#EF4444]">
                      {drone.sku} · {drone.role}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-white">
                      {drone.name}
                    </h3>
                  </div>
                  <p className="font-mono text-sm tracking-[0.08em] text-white">
                    {drone.priceLabel}
                  </p>
                </div>
                <p className="mt-3 text-sm text-[#B5B5BB]">{drone.tagline}</p>
                <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-[#83838A] group-hover:text-[#EF4444]">
                  VIEW PROFILE →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20">
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
            NETWORK ACCESS
          </p>
          <h3 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            SUBSCRIPTION TIERS
          </h3>
          <p className="mt-4 max-w-xl text-sm text-[#B5B5BB]">
            Watch other operators for free, fly on shared airframes, or take
            Commander and get an S-1 Scout included.
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
      </div>
    </section>
  );
}
