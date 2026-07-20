"use client";

import { motion } from "framer-motion";

const STEPS = [
  { n: "01", title: "CHOOSE YOUR THEATER" },
  { n: "02", title: "CHOOSE YOUR SIDE" },
  { n: "03", title: "CHOOSE YOUR GEAR" },
  { n: "04", title: "GET THE CLIP" },
];

export function HowItWorks() {
  return (
    <section id="platform" className="scroll-mt-20 bg-[#0C0C0D] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
          THE CIVILIAN OPERATOR PLATFORM
        </p>
        <h2 className="mt-3 font-display text-4xl text-white sm:text-6xl">
          WAR, ON DEMAND.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.08 }}
              className="min-h-[180px] rounded-sm border border-white/10 bg-black p-6"
            >
              <p className="font-mono text-[11px] tracking-[0.22em] text-[#83838A]">
                {step.n}
              </p>
              <h3 className="mt-8 font-display text-2xl text-white">
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
