"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Drone } from "@/data/drones";
import { DRONES } from "@/data/drones";
import { useSelection } from "@/context/SelectionContext";

export function DroneProfile({ drone }: { drone: Drone }) {
  const { openAccessModal } = useSelection();
  const [activeSpec, setActiveSpec] = useState(0);
  const others = DRONES.filter((d) => d.id !== drone.id);

  return (
    <div className="bg-black pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/gear"
          className="font-mono text-[11px] tracking-[0.18em] text-[#83838A] transition hover:text-white"
        >
          ← ALL AIRFRAMES
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="overflow-hidden rounded-sm border border-white/10 bg-[#0C0C0D]">
            <div className="relative aspect-[5/4] bg-[#111113]">
              <Image
                src={drone.image}
                alt={drone.shortName}
                fill
                priority
                className="object-contain p-6 sm:p-10"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 font-mono text-[10px] tracking-[0.16em] text-[#83838A]">
              <span>{drone.status}</span>
              <span>{drone.sku}</span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
              {drone.sku} · {drone.role}
            </p>
            <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">
              {drone.name}
            </h1>
            <p className="mt-4 text-lg text-[#B5B5BB]">{drone.tagline}</p>
            <p className="mt-6 text-sm leading-relaxed text-[#83838A]">
              {drone.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-6 border-y border-white/10 py-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#83838A]">
                  UNIT PRICE
                </p>
                <p className="mt-1 font-display text-4xl text-white">
                  {drone.priceLabel}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#83838A]">
                  PAYLOAD
                </p>
                <p className="mt-1 font-mono text-sm tracking-[0.08em] text-white">
                  {drone.specs.find((s) => s.label === "PAYLOAD")?.value}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#83838A]">
                  ENDURANCE
                </p>
                <p className="mt-1 font-mono text-sm tracking-[0.08em] text-white">
                  {drone.specs.find((s) => s.label === "ENDURANCE")?.value}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-[#B5B5BB]">{drone.payloadBay}</p>

            <div className="mt-4 rounded-sm border border-[#EF4444]/30 bg-[#EF4444]/5 px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#EF4444]">
                THEATER DELIVERY
              </p>
              <p className="mt-1 text-sm text-[#B5B5BB]">
                We ship this airframe to your desired battlefield after you
                choose a theater and side.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openAccessModal(`drone-${drone.id}`)}
                className="rounded-sm bg-[#EF4444] px-5 py-3 text-[11px] tracking-[0.18em] text-white transition hover:bg-red-500"
              >
                REQUEST ALLOCATION
              </button>
              <Link
                href="/#theaters"
                className="rounded-sm border border-white/15 px-5 py-3 text-center text-[11px] tracking-[0.18em] text-white transition hover:border-white/40"
              >
                CHOOSE THEATER
              </Link>
            </div>

            {drone.id === "s1-scout" ? (
              <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-[#EF4444]">
                INCLUDED FREE WITH COMMANDER · SHIPPED TO YOUR THEATER
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-16">
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#EF4444]">
            SYSTEM SPECIFICATIONS
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {drone.specs.map((spec, index) => (
              <button
                key={spec.label}
                type="button"
                onClick={() => setActiveSpec(index)}
                className={`rounded-sm border p-4 text-left transition ${
                  activeSpec === index
                    ? "border-[#EF4444] bg-[#EF4444]/10"
                    : "border-white/10 bg-[#0C0C0D] hover:border-white/25"
                }`}
              >
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#83838A]">
                  {spec.label}
                </p>
                <p className="mt-2 font-display text-xl text-white">
                  {spec.value}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-sm border border-white/10 bg-[#0C0C0D] px-5 py-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#83838A]">
              SELECTED · {drone.specs[activeSpec]?.label}
            </p>
            <p className="mt-2 text-sm text-[#B5B5BB]">
              {drone.specs[activeSpec]?.value} — part of the {drone.shortName}{" "}
              mission profile for civilian network deployment.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#EF4444]">
              CAPABILITIES
            </p>
            <ul className="mt-6 space-y-0">
              {drone.features.map((feature) => (
                <li
                  key={feature}
                  className="border-t border-white/10 py-3 text-sm text-[#B5B5BB]"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#EF4444]">
              OTHER AIRFRAMES
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/gear/${other.id}`}
                  className="group overflow-hidden rounded-sm border border-white/10 bg-[#0C0C0D] transition hover:border-white/30"
                >
                  <div className="relative aspect-[16/10] bg-[#111113]">
                    <Image
                      src={other.image}
                      alt={other.shortName}
                      fill
                      className="object-contain p-3"
                      sizes="200px"
                    />
                  </div>
                  <div className="border-t border-white/10 px-3 py-3">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-[#EF4444]">
                      {other.sku}
                    </p>
                    <p className="mt-1 font-display text-lg text-white">
                      {other.name}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-[#83838A]">
                      {other.priceLabel}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
