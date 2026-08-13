"use client";

import Link from "next/link";
import { useState } from "react";
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";

const ROLES = [
  {
    title: "Operator Success",
    location: "Remote / Austin",
    type: "Full-time",
    summary:
      "Guide civilian operators from theater selection through first deployment and clip delivery.",
  },
  {
    title: "Theater Logistics",
    location: "Hybrid",
    type: "Full-time",
    summary:
      "Coordinate airframe shipping, theater staging, and recovery across active regions.",
  },
  {
    title: "Airframe Integration",
    location: "Austin, TX",
    type: "Full-time",
    summary:
      "Validate S-1, H-9, and X-6 configurations for network allocation and payload kits.",
  },
  {
    title: "Creator Partnerships",
    location: "Remote",
    type: "Contract",
    summary:
      "Build influencer and clip-distribution pipelines for high-output civilian operators.",
  },
];

export function CareersContent() {
  const [activeRole, setActiveRole] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-36 sm:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
        CAREERS
      </p>
      <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
        BUILD THE CIVILIAN FRONT
      </h1>
      <p className="mt-4 max-w-2xl text-[#B5B5BB]">
        STRAFE SYSTEMS is hiring across operator experience, theater logistics,
        and airframe programs. Private beta teams move fast.
      </p>

      <div className="mt-12 space-y-3">
        {ROLES.map((role) => (
          <div
            key={role.title}
            className="rounded-sm border border-white/10 bg-[#0C0C0D] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl text-white">{role.title}</h2>
                <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-[#83838A]">
                  {role.location} · {role.type}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setActiveRole((current) =>
                    current === role.title ? null : role.title,
                  )
                }
                className="rounded-sm border border-white/15 px-4 py-2 text-[11px] tracking-[0.16em] text-white transition hover:border-white/40"
              >
                {activeRole === role.title ? "CLOSE" : "APPLY"}
              </button>
            </div>
            <p className="mt-4 text-sm text-[#B5B5BB]">{role.summary}</p>
            {activeRole === role.title ? (
              <CareerApplicationForm
                role={role.title}
                onClose={() => setActiveRole(null)}
              />
            ) : null}
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-[#83838A]">
        Prefer email? Reach talent at{" "}
        <a
          href="mailto:talent@strafe.live"
          className="text-[#B5B5BB] underline-offset-4 hover:text-white hover:underline"
        >
          talent@strafe.live
        </a>
        .
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex text-[11px] tracking-[0.16em] text-[#83838A] transition hover:text-white"
      >
        ← RETURN HOME
      </Link>
    </div>
  );
}
