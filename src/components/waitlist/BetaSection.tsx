"use client";

import { ROLLOUT_STATUS } from "@/data/telemetry";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

export function BetaSection() {
  return (
    <section id="waitlist" className="scroll-mt-20 bg-[#070707] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
            PRIVATE BETA
          </p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            JOIN THE FIRST WAVE
          </h2>
          <p className="mt-4 max-w-md text-[#B5B5BB]">
            STRAFE.LIVE is rolling out slowly to a limited group of founding
            operators. Request access to reserve your place in the rollout.
          </p>

          <div className="mt-10 rounded-sm border border-white/10 bg-[#0C0C0D] p-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#83838A]">
              GLOBAL ROLLOUT
            </p>
            <div className="mt-4 space-y-3">
              {ROLLOUT_STATUS.map((row) => (
                <div
                  key={row.region}
                  className="flex items-center justify-between gap-4 border-t border-white/10 pt-3"
                >
                  <span className="text-sm text-white">{row.region}</span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-[#EF4444]">
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-[#83838A]">
              Status updates in real time as capacity expands.
            </p>
          </div>
        </div>
        <WaitlistForm source="beta-section" heading="REQUEST EARLY ACCESS" />
      </div>
    </section>
  );
}
