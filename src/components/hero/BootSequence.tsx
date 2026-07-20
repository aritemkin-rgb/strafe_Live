"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "strafe_boot_seen";

export function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(SESSION_KEY) === "1") {
      return;
    }
    setVisible(true);
    const t1 = window.setTimeout(() => setPhase(1), 450);
    const t2 = window.setTimeout(() => setPhase(2), 900);
    const t3 = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
    }, 1400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20">
              <Image
                src="/brand/strafe-emblem.png"
                alt="STRAFE emblem"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="space-y-2 font-mono text-[11px] tracking-[0.28em] text-[#B5B5BB]">
              <p>STRAFE CIVILIAN NETWORK</p>
              <p className={phase >= 1 ? "text-white" : "text-[#83838A]"}>
                {phase < 2 ? "INITIALIZING PLATFORM" : "SYSTEM ONLINE"}
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
