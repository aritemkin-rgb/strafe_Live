import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclosure — STRAFE.LIVE",
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
        ALL SYSTEMS FICTIONAL
      </p>
      <h1 className="mt-3 font-display text-4xl text-white">Disclosure</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#B5B5BB]">
        <p>STRAFE.LIVE is a satirical artwork.</p>
        <p>
          Geographic maps and national flags are used for artistic and editorial
          purposes. All platform access, drone controls, military activity,
          queue information, operational interfaces, livestreams, targeting
          functionality, and combat services shown on this website are
          fictional.
        </p>
        <p>
          STRAFE.LIVE provides no access to real weapons or military systems.
        </p>
      </div>
      <Link
        href="/"
        className="mt-10 inline-flex text-xs tracking-[0.16em] text-white underline-offset-4 hover:underline"
      >
        RETURN HOME
      </Link>
    </div>
  );
}
