export function FounderPlaceholder() {
  return (
    <section id="commander" className="scroll-mt-20 bg-black py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="flex aspect-[4/5] items-center justify-center rounded-sm border border-white/10 bg-[#0C0C0D]">
          <div className="px-6 text-center">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#83838A]">
              FOUNDER PORTRAIT COMING SOON
            </p>
            <p className="mt-2 text-xs text-[#83838A]">
              /public/images/gen-norman-mann.jpg
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
            MEET OUR COMMANDER
          </p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            GEN. NORMAN MANN
          </h2>
          <p className="mt-3 text-sm tracking-[0.12em] text-[#B5B5BB]">
            FOUNDER & CHIEF EXECUTIVE COMMANDER
          </p>
          <p className="mt-2 font-mono text-xs tracking-[0.16em] text-[#83838A]">
            @GENERAL.MANN
          </p>
          <blockquote className="mt-8 border-l border-[#EF4444] pl-4 text-xl text-white sm:text-2xl">
            THE FUTURE OF WARFARE IS PARTICIPATORY.
          </blockquote>
          <div className="mt-10 rounded-sm border border-dashed border-white/15 p-5">
            <p className="font-mono text-[11px] tracking-[0.18em] text-[#83838A]">
              FOUNDER BRIEFING COMING SOON
            </p>
            <p className="mt-2 text-xs text-[#83838A]">
              /public/video/general-mann-introduction.mp4
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
