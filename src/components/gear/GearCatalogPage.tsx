"use client";

import Image from "next/image";
import Link from "next/link";
import { DRONES } from "@/data/drones";
import { GEAR_TIERS } from "@/data/gearTiers";
import { useSelection } from "@/context/SelectionContext";

export function GearCatalogPage() {
  const { openAccessModal } = useSelection();

  return (
    <div className="bg-black pb-24 pt-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-sm border border-white/10 bg-[#0C0C0D]">
          <div className="relative aspect-[21/9] min-h-[200px] sm:min-h-[280px]">
            <Image
              src="/drones/lineup-banner.png"
              alt="STRAFE.LIVE airframe lineup"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
                HARDWARE CATALOG
              </p>
              <h1 className="mt-3 font-display text-4xl text-white sm:text-6xl">
                OPERATOR AIRFRAMES
              </h1>
              <p className="mt-3 max-w-xl text-sm text-[#B5B5BB]">
                Select a platform. Review payload, endurance, and sensors.
                Commander subscribers receive an S-1 Scout at no additional
                hardware cost.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
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
                  className="object-contain p-5 transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="border-t border-white/10 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#EF4444]">
                      {drone.sku} · {drone.role}
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-white">
                      {drone.name}
                    </h2>
                  </div>
                  <p className="font-mono text-sm text-white">{drone.priceLabel}</p>
                </div>
                <p className="mt-3 text-sm text-[#B5B5BB]">{drone.tagline}</p>
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 font-mono text-[10px] tracking-[0.12em] text-[#83838A]">
                  <div>
                    <div>PAYLOAD</div>
                    <div className="mt-1 text-white">
                      {drone.specs.find((s) => s.label === "PAYLOAD")?.value}
                    </div>
                  </div>
                  <div>
                    <div>ENDURANCE</div>
                    <div className="mt-1 text-white">
                      {drone.specs.find((s) => s.label === "ENDURANCE")?.value}
                    </div>
                  </div>
                  <div>
                    <div>RANGE</div>
                    <div className="mt-1 text-white">
                      {drone.specs.find((s) => s.label === "RANGE")?.value}
                    </div>
                  </div>
                </div>
                <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-[#83838A] group-hover:text-[#EF4444]">
                  OPEN PROFILE →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div id="access" className="mt-20 scroll-mt-28">
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
            NETWORK ACCESS
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            SUBSCRIPTION TIERS
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-[#B5B5BB]">
            Spectator watches other people fly. Operator uses shared network
            drones. Commander ships with a free S-1 Scout.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {GEAR_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-sm border p-5 ${
                  tier.featured
                    ? "border-[#EF4444] bg-[#EF4444]/5"
                    : "border-white/10 bg-[#0C0C0D]"
                }`}
              >
                <h3 className="font-display text-2xl text-white">{tier.name}</h3>
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
    </div>
  );
}
