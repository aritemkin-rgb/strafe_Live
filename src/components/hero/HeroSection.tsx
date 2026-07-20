"use client";

import { HERO_TELEMETRY } from "@/data/telemetry";
import { useSelection } from "@/context/SelectionContext";

export function HeroSection() {
  const { openAccessModal } = useSelection();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_35%] sm:object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/brand/strafe-emblem.png"
        aria-label="STRAFE drone promotional orbit"
      >
        <source src="/video/strafe-hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:justify-center lg:px-8 lg:pb-24">
        <div className="max-w-2xl space-y-6">
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
            PRIVATE BETA // CIVILIAN ACCESS
          </p>
          <h1 className="font-display text-5xl leading-[0.95] text-white sm:text-7xl lg:text-8xl">
            JOIN THE FIGHT
          </h1>
          <div className="space-y-2 text-lg text-[#F7F7F7] sm:text-xl">
            <p>Choose your side.</p>
            <p>Choose your gear.</p>
            <p>Get the clip.</p>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#B5B5BB] sm:text-base">
            Remote access. Real-time engagement.
            <br />
            The battlefield is no longer somewhere else.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href="#theaters"
              className="inline-flex items-center justify-center rounded-sm bg-[#EF4444] px-6 py-3 text-xs tracking-[0.18em] text-white transition hover:bg-red-500"
            >
              CHOOSE YOUR SIDE
            </a>
            <button
              type="button"
              onClick={() => openAccessModal("hero")}
              className="inline-flex items-center justify-center rounded-sm border border-white/25 bg-black/30 px-6 py-3 text-xs tracking-[0.18em] text-white backdrop-blur-sm transition hover:border-white/50"
            >
              REQUEST ACCESS
            </button>
          </div>
        </div>

        <div className="mt-12 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
          {HERO_TELEMETRY.map((item) => (
            <div
              key={item.label}
              className="corner-frame border border-white/10 bg-black/40 p-3 backdrop-blur-sm"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#83838A]">
                {item.label}
              </p>
              <p className="mt-1 font-mono text-xs tracking-[0.08em] text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-[#83838A]">
          SIMULATED PLATFORM ENVIRONMENT
        </p>
      </div>
    </section>
  );
}
