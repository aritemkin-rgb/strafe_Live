import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — STRAFE.LIVE",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
        MISSION
      </p>
      <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
        PRIVATE ACCESS FOR CIVILIANS
      </h1>
      <div className="mt-8 space-y-4 text-[#B5B5BB]">
        <p>
          STRAFE.LIVE gives civilians private access to remote drone operations
          so they can support the side they believe in — in real time.
        </p>
        <p>
          Choose your theater. Choose your allegiance. Deploy through a secure
          operator account and stay connected to the feed from anywhere.
        </p>
        <p>
          The platform is built for remote access, live engagement, and mission
          clarity. Your side. Your gear. Your clip.
        </p>
        <p>
          Founded by Gen. Norman Mann, STRAFE is opening private beta to the
          first wave of civilian operators.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#theaters"
          className="inline-flex items-center justify-center rounded-sm bg-[#EF4444] px-5 py-3 text-xs tracking-[0.16em] text-white"
        >
          CHOOSE YOUR SIDE
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-sm border border-white/20 px-5 py-3 text-xs tracking-[0.16em] text-white"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
