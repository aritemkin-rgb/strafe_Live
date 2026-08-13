import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — STRAFE.LIVE",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-36 sm:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
        MISSION
      </p>
      <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
        COMBAT DRONES FOR CIVILIANS
      </h1>
      <div className="mt-8 space-y-4 text-[#B5B5BB]">
        <p>
          STRAFE.LIVE is a civilian operator platform. It gives private citizens
          remote access to combat drones in active war theaters so they can
          support the side they believe in — in real time.
        </p>
        <p>
          Choose your theater. Choose your allegiance. Request an airframe
          shipped to the battlefield. Deploy through a secure operator account
          and fly from anywhere.
        </p>
        <p>
          The platform is built for remote combat access, live engagement, and
          mission clarity. Your side. Your drone. Your clip.
        </p>
      </div>

      <div className="mt-12 rounded-sm border border-white/10 bg-[#0C0C0D] p-6">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#EF4444]">
          COMPANY
        </p>
        <h2 className="mt-3 font-display text-2xl text-white">
          STRAFE SYSTEMS LLC
        </h2>
        <div className="mt-4 space-y-3 text-sm text-[#B5B5BB]">
          <p>A GENERAL.MANN COMPANY</p>
          <p>
            Founded by Gen. Norman Mann. Headquartered in Austin, Texas, with
            theater logistics worldwide.
          </p>
          <p>
            STRAFE.LIVE is the consumer operator network for private-beta
            civilian access to combat airframes in active theaters.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#theaters"
          className="inline-flex items-center justify-center rounded-sm bg-[#EF4444] px-5 py-3 text-xs tracking-[0.16em] text-white"
        >
          CHOOSE YOUR SIDE
        </Link>
        <Link
          href="/careers"
          className="inline-flex items-center justify-center rounded-sm border border-white/20 px-5 py-3 text-xs tracking-[0.16em] text-white"
        >
          CAREERS
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
