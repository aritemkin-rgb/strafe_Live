"use client";

import Image from "next/image";
import { DRONES } from "@/data/drones";
import { DroneCard } from "@/components/gear/DroneCard";
import { SubscriptionTiers } from "@/components/gear/SubscriptionTiers";

export function GearCatalogPage() {
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
                Select a platform. We ship it to your desired battlefield.
                Commander subscribers receive an S-1 Scout at no additional
                hardware cost.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-sm border border-white/10 bg-[#0C0C0D] px-5 py-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#EF4444]">
            THEATER DELIVERY
          </p>
          <p className="mt-2 text-sm text-[#B5B5BB]">
            Every allocated airframe ships to the battlefield theater you
            select — Eastern Europe, Levant, Africa, or Asia. Choose your side
            on the map, then request your platform.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {DRONES.map((drone) => (
            <DroneCard key={drone.id} drone={drone} showSpecs />
          ))}
        </div>

        <div id="access" className="mt-20 scroll-mt-28">
          <SubscriptionTiers
            intro="Spectator watches other people fly. Operator uses shared network drones. Commander ships with a free S-1 Scout to your chosen theater."
          />
        </div>
      </div>
    </div>
  );
}
