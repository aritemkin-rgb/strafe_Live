import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — STRAFE.LIVE",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
        ABOUT THE PROJECT
      </p>
      <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
        STRAFE.LIVE
      </h1>
      <div className="mt-8 space-y-4 text-[#B5B5BB]">
        <p>
          STRAFE.LIVE is a fictional satirical artwork that presents remote
          warfare as a consumer livestream, gaming, subscription, and
          social-media experience.
        </p>
        <p>
          The project examines how startup culture, platform interfaces,
          gamification, and spectatorship reshape the public experience of
          remote conflict.
        </p>
        <p>
          All systems, missions, queue positions, livestreams, and operational
          controls shown here are fictional. STRAFE.LIVE provides no access to
          real weapons or military systems.
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
