import Link from "next/link";

export function AboutTeaser() {
  return (
    <section id="about" className="scroll-mt-20 bg-[#070707] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
          ABOUT STRAFE
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl text-white sm:text-4xl">
          STRAFE.LIVE is a fictional platform examining how startup culture,
          livestream interfaces, gamification, and social-media systems reshape
          the public experience of remote conflict.
        </h2>
        <Link
          href="/about"
          className="mt-8 inline-flex rounded-sm border border-white/20 px-5 py-3 text-xs tracking-[0.16em] text-white transition hover:border-white/50"
        >
          ABOUT THE PROJECT
        </Link>
      </div>
    </section>
  );
}
