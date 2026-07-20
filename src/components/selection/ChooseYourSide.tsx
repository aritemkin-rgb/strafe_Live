"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  NO_PREFERENCE,
  THEATERS,
  type Faction,
  type SideId,
  type TheaterId,
} from "@/data/theaters";
import { useSelection } from "@/context/SelectionContext";
import { WorldMap } from "@/components/map/WorldMap";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

function FactionPicker({
  theaterName,
  factions,
  sideId,
  hoveredSide,
  setHoveredSide,
  onPickSide,
  theaterId,
  compact = false,
}: {
  theaterName: string;
  factions: Faction[];
  sideId: SideId | null;
  hoveredSide: SideId | null;
  setHoveredSide: (id: SideId | null) => void;
  onPickSide: (side: SideId, theater: TheaterId | null) => void;
  theaterId: TheaterId;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.22em] text-[#EF4444]">
          {theaterName.toUpperCase()} · SELECT ALLEGIANCE
        </p>
        <p className="hidden font-mono text-[10px] tracking-[0.16em] text-[#83838A] md:block">
          TAP A FLAG TO LOCK SIDE
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {factions.map((faction) => {
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
              onClick={() => onPickSide(faction.id, theaterId)}
              className={`group flex items-center gap-3 rounded-sm border p-3 text-left transition ${
                selected
                  ? "border-[#EF4444] bg-[#EF4444]/20"
                  : "border-white/15 bg-black/70 hover:border-white/40"
              } ${dimmed ? "opacity-45" : "opacity-100"} ${
                compact ? "" : "backdrop-blur-md sm:p-4"
              }`}
            >
              <Image
                src={faction.flagSrc}
                alt={`${faction.name} flag`}
                width={72}
                height={48}
                className="h-10 w-auto shrink-0 border border-white/15 shadow-lg sm:h-12"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg text-white sm:text-2xl">
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
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPickSide("no-preference", null)}
        className="w-full rounded-sm border border-dashed border-white/20 bg-black/50 px-3 py-2.5 text-left transition hover:border-white/40"
      >
        <p className="font-mono text-[9px] tracking-[0.18em] text-[#83838A]">
          {NO_PREFERENCE.label}
        </p>
        <p className="font-display text-sm text-white">
          {NO_PREFERENCE.name.toUpperCase()}
        </p>
        <p className="mt-1 text-[11px] text-[#B5B5BB]">
          {NO_PREFERENCE.description}
        </p>
      </button>
    </div>
  );
}

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
    <section id="theaters" className="scroll-mt-24 bg-[#070707] py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
            ACTIVE THEATERS
          </p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-6xl">
            CHOOSE YOUR SIDE
          </h2>
          <p className="mt-4 text-[#B5B5BB]">
            <span className="md:hidden">
              Select a theater, then choose your allegiance below the map.
            </span>
            <span className="hidden md:inline">
              Select a theater. Choose an allegiance directly on the map.
            </span>
          </p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-6 sm:flex sm:flex-wrap">
          {THEATERS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onPickTheater(t.id)}
              className={`rounded-sm border px-3 py-3 text-center text-[11px] tracking-[0.14em] transition sm:px-4 sm:py-2 sm:text-left ${
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
          <motion.div layout className="space-y-3">
            {/* Map stays fully visible on phones */}
            <div className="min-h-[220px] overflow-hidden rounded-sm border border-white/10 sm:min-h-0">
              <WorldMap
                activeTheater={activeTheater.id}
                hoveredSide={hoveredSide}
                selectedSide={sideId}
                onSelectTheater={onPickTheater}
                focusMode={panelOpen}
              >
                {/* Desktop/tablet: side pickers overlaid on map */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black via-black/85 to-transparent pt-24 md:block">
                  <div className="pointer-events-auto px-4 pb-4">
                    <FactionPicker
                      theaterName={activeTheater.name}
                      factions={activeTheater.factions}
                      sideId={sideId}
                      hoveredSide={hoveredSide}
                      setHoveredSide={setHoveredSide}
                      onPickSide={onPickSide}
                      theaterId={activeTheater.id}
                    />
                  </div>
                </div>
              </WorldMap>
            </div>

            {/* Mobile: side pickers BELOW the map so geography stays visible */}
            <div className="rounded-sm border border-white/10 bg-[#0C0C0D] p-3 md:hidden">
              <FactionPicker
                theaterName={activeTheater.name}
                factions={activeTheater.factions}
                sideId={sideId}
                hoveredSide={hoveredSide}
                setHoveredSide={setHoveredSide}
                onPickSide={onPickSide}
                theaterId={activeTheater.id}
                compact
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {panelOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
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
