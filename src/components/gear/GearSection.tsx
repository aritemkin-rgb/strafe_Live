"use client";

import Link from "next/link";
import { DRONES } from "@/data/drones";
import { DroneCard } from "@/components/gear/DroneCard";
import { SubscriptionTiers } from "@/components/gear/SubscriptionTiers";

export function GearSection() {
  return (
    <section id="gear" className="scroll-mt-36 bg-black py-20 sm:py-28">
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
              Select an airframe, then we ship it to your desired battlefield
              theater. Inspect specs, payload, and mission role — then request
              allocation.
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
            <DroneCard key={drone.id} drone={drone} />
          ))}
        </div>

        <div className="mt-20">
          <SubscriptionTiers />
        </div>
      </div>
    </section>
  );
}
