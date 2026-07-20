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
            Select a theater. Choose an allegiance directly on the map.
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
          className={`grid gap-6 ${panelOpen ? "lg:grid-cols-[1.25fr_0.75fr]" : "grid-cols-1"}`}
        >
          <motion.div layout>
            <WorldMap
              activeTheater={activeTheater.id}
              hoveredSide={hoveredSide}
              selectedSide={sideId}
              onSelectTheater={onPickTheater}
              focusMode={panelOpen}
            >
              {/* Side selection lives ON the map */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent pt-16 sm:pt-24">
                <div className="pointer-events-auto px-3 pb-3 sm:px-4 sm:pb-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-[#EF4444]">
                      {activeTheater.name.toUpperCase()} · SELECT ALLEGIANCE
                    </p>
                    <p className="hidden font-mono text-[10px] tracking-[0.16em] text-[#83838A] sm:block">
                      TAP A FLAG TO LOCK SIDE
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
                    {activeTheater.factions.map((faction, index) => {
                      const selected = sideId === faction.id;
                      const dimmed =
                        Boolean(hoveredSide || sideId) &&
                        hoveredSide !== faction.id &&
                        sideId !== faction.id;

                      return (
                        <div key={faction.id} className="contents">
                          {index === 1 ? (
                            <div className="hidden items-center justify-center sm:flex">
                              <span className="font-display text-2xl text-white/40">
                                VS
                              </span>
                            </div>
                          ) : null}
                          <button
                            type="button"
                            onMouseEnter={() => setHoveredSide(faction.id)}
                            onMouseLeave={() => setHoveredSide(null)}
                            onClick={() =>
                              onPickSide(faction.id, activeTheater.id)
                            }
                            className={`group flex items-center gap-3 rounded-sm border p-3 text-left backdrop-blur-md transition sm:p-4 ${
                              selected
                                ? "border-[#EF4444] bg-[#EF4444]/20"
                                : "border-white/15 bg-black/55 hover:border-white/40"
                            } ${dimmed ? "opacity-45" : "opacity-100"}`}
                          >
                            <Image
                              src={faction.flagSrc}
                              alt={`${faction.name} flag`}
                              width={72}
                              height={48}
                              className="h-11 w-auto shrink-0 border border-white/15 shadow-lg sm:h-12"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="font-display text-xl text-white sm:text-2xl">
                                  {faction.name.toUpperCase()}
                                </h3>
                                <span className="shrink-0 font-mono text-[9px] tracking-[0.14em] text-[#EF4444]">
                                  {faction.status}
                                </span>
                              </div>
                              <p className="mt-1 truncate font-mono text-[10px] tracking-[0.12em] text-[#B5B5BB]">
                                {faction.activity}
                              </p>
                              <p className="mt-2 text-[10px] tracking-[0.16em] text-white group-hover:text-[#EF4444]">
                                {faction.cta}
                              </p>
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => onPickSide("no-preference", null)}
                    className="mt-2 w-full rounded-sm border border-dashed border-white/20 bg-black/40 px-3 py-2 text-left backdrop-blur-sm transition hover:border-white/40"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.18em] text-[#83838A]">
                          {NO_PREFERENCE.label}
                        </p>
                        <p className="font-display text-sm text-white">
                          {NO_PREFERENCE.name.toUpperCase()}
                        </p>
                      </div>
                      <p className="max-w-md text-[11px] text-[#B5B5BB]">
                        {NO_PREFERENCE.description}
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </WorldMap>
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
