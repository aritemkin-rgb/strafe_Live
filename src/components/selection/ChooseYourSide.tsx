"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  NO_PREFERENCE,
  THEATERS,
  type SideId,
  type TheaterId,
} from "@/data/theaters";
import { useSelection } from "@/context/SelectionContext";
import { WorldMap } from "@/components/map/WorldMap";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

export function ChooseYourSide() {
  const { theaterId, sideId, setTheater, selectSide, clearSelection } =
    useSelection();
  const [hoveredSide, setHoveredSide] = useState<SideId | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const activeTheater =
    THEATERS.find((t) => t.id === (theaterId ?? "eastern-europe")) ??
    THEATERS[0];

  const onPickTheater = (id: TheaterId) => {
    setTheater(id);
    // Clear a side that doesn't belong to the newly selected theater.
    const next = THEATERS.find((t) => t.id === id);
    if (sideId && sideId !== "no-preference") {
      const stillValid = next?.factions.some((f) => f.id === sideId);
      if (!stillValid) {
        clearSelection();
        setPanelOpen(false);
      }
    }
  };

  const onPickSide = async (side: SideId, theater: TheaterId | null) => {
    await selectSide(side, theater);
    setPanelOpen(true);
  };

  return (
    <section id="theaters" className="scroll-mt-20 bg-[#070707] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
            ACTIVE THEATERS
          </p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-6xl">
            CHOOSE YOUR SIDE
          </h2>
          <p className="mt-4 text-[#B5B5BB]">
            Select a theater. Choose an allegiance. Join the first wave.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {THEATERS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onPickTheater(t.id)}
              className={`rounded-sm border px-4 py-2 text-[11px] tracking-[0.16em] transition ${
                activeTheater.id === t.id
                  ? "border-[#EF4444] bg-[#EF4444]/10 text-white"
                  : "border-white/15 text-[#B5B5BB] hover:border-white/40 hover:text-white"
              }`}
            >
              {t.name.toUpperCase()}
            </button>
          ))}
        </div>

        <div
          className={`grid gap-6 ${panelOpen ? "lg:grid-cols-[1.2fr_0.8fr]" : "grid-cols-1"}`}
        >
          <motion.div layout className="space-y-6">
            <WorldMap
              activeTheater={activeTheater.id}
              hoveredSide={hoveredSide}
              selectedSide={sideId}
              onSelectTheater={onPickTheater}
              focusMode={panelOpen}
            />

            <div className="grid gap-4 md:grid-cols-2">
              {activeTheater.factions.map((faction) => {
                const selected = sideId === faction.id;
                const dimmed =
                  Boolean(hoveredSide || sideId) &&
                  hoveredSide !== faction.id &&
                  sideId !== faction.id;
                return (
                  <button
                    key={faction.id}
                    type="button"
                    onMouseEnter={() => setHoveredSide(faction.id)}
                    onMouseLeave={() => setHoveredSide(null)}
                    onClick={() => onPickSide(faction.id, activeTheater.id)}
                    className={`group rounded-sm border p-4 text-left transition ${
                      selected
                        ? "border-[#EF4444] bg-[#EF4444]/10"
                        : "border-white/10 bg-[#0C0C0D] hover:border-white/30"
                    } ${dimmed ? "opacity-45" : "opacity-100"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Image
                        src={faction.flagSrc}
                        alt={`${faction.name} flag`}
                        width={64}
                        height={42}
                        className="h-10 w-auto border border-white/10 shadow-lg"
                      />
                      <span className="font-mono text-[10px] tracking-[0.16em] text-[#EF4444]">
                        {faction.status}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl text-white">
                      {faction.name.toUpperCase()}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-[#83838A]">
                      {faction.activity}
                    </p>
                    <p className="mt-4 text-xs tracking-[0.18em] text-white group-hover:text-[#EF4444]">
                      {faction.cta}
                    </p>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => onPickSide("no-preference", null)}
              className="w-full rounded-sm border border-dashed border-white/20 bg-transparent p-4 text-left transition hover:border-white/40"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#83838A]">
                {NO_PREFERENCE.label}
              </p>
              <h3 className="mt-2 font-display text-xl text-white">
                {NO_PREFERENCE.name.toUpperCase()}
              </h3>
              <p className="mt-2 max-w-xl text-sm text-[#B5B5BB]">
                {NO_PREFERENCE.description}
              </p>
            </button>
          </motion.div>

          <AnimatePresence>
            {panelOpen ? (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <WaitlistForm
                  showSideContext
                  source="choose-your-side"
                  onChangeSide={() => {
                    clearSelection();
                    setPanelOpen(false);
                  }}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
