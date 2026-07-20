import Link from "next/link";

export function DisclosureBand() {
  return (
    <section id="disclosure" className="border-y border-white/10 bg-black py-12">
      <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#EF4444]">
          ALL SYSTEMS FICTIONAL
        </p>
        <p className="max-w-4xl text-sm leading-relaxed text-[#B5B5BB]">
          STRAFE.LIVE is a satirical artwork. Geographic maps and national flags
          are used for artistic and editorial purposes. All platform access,
          drone controls, military activity, queue information, operational
          interfaces, livestreams, targeting functionality, and combat services
          shown on this website are fictional. STRAFE.LIVE provides no access to
          real weapons or military systems.
        </p>
        <Link
          href="/disclosure"
          className="inline-flex text-xs tracking-[0.16em] text-white underline-offset-4 hover:underline"
        >
          FULL DISCLOSURE
        </Link>
      </div>
    </section>
  );
}
