"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Maximize2,
  Share2,
  Scissors,
  Volume2,
  MessageSquare,
} from "lucide-react";
import { CHAT_MESSAGES } from "@/data/chatMessages";
import { STREAM_TELEMETRY } from "@/data/telemetry";
import { getFaction } from "@/data/theaters";
import { useSelection } from "@/context/SelectionContext";

export function LiveStreamPreview() {
  const { sideId, openAccessModal } = useSelection();
  const match = getFaction(sideId);
  const [chatOpen, setChatOpen] = useState(true);
  const [clipOpen, setClipOpen] = useState(false);

  return (
    <section id="live" className="scroll-mt-20 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-[#EF4444]">
              STRAFE LIVE
            </p>
            <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
              OPERATOR SPECTATOR MODE
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#B5B5BB]">
            Simulated livestream interface. Feed personalizes after you choose a
            side.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_0.7fr]">
          <div className="overflow-hidden rounded-sm border border-white/10 bg-[#0C0C0D]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="live-dot" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {match
                      ? `${match.theater.name.toUpperCase()} OPERATIONS`
                      : "STRAFE PRODUCT DEMONSTRATION"}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.14em] text-[#83838A]">
                    {match
                      ? `ALLEGIANCE: ${match.faction.name.toUpperCase()} · OPERATOR: STRAFE_00418`
                      : "SELECT A SIDE TO PERSONALIZE FEED"}
                  </p>
                </div>
              </div>
              {match ? (
                <Image
                  src={match.faction.flagSrc}
                  alt=""
                  width={36}
                  height={24}
                  className="h-6 w-auto border border-white/10"
                />
              ) : null}
            </div>

            <div className="relative aspect-video bg-[#111113]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <div className="relative h-14 w-14 opacity-80">
                  <Image
                    src="/brand/strafe-emblem.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-mono text-[11px] tracking-[0.22em] text-[#EF4444]">
                  LIVE PLATFORM FEED
                </p>
                <p className="text-sm text-[#B5B5BB]">
                  VIDEO ASSET COMING SOON
                </p>
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#83838A]">
                  /public/video/strafe-stream-loop.mp4
                </p>
              </div>
              <div className="absolute left-3 top-3 rounded-sm bg-black/60 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-white backdrop-blur">
                LIVE · {STREAM_TELEMETRY.viewers} VIEWERS
              </div>
              <div className="absolute bottom-3 right-3 opacity-50">
                <div className="relative h-8 w-8">
                  <Image
                    src="/brand/strafe-emblem.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-3 py-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-[11px] tracking-[0.14em] text-[#B5B5BB]"
              >
                <Volume2 size={14} /> VOLUME
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-[11px] tracking-[0.14em] text-[#B5B5BB]"
              >
                QUALITY 1080P
              </button>
              <button
                type="button"
                onClick={() => setClipOpen(true)}
                className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-[11px] tracking-[0.14em] text-white hover:border-[#EF4444]"
              >
                <Scissors size={14} /> CLIP
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-[11px] tracking-[0.14em] text-[#B5B5BB]"
              >
                <Share2 size={14} /> SHARE
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-[11px] tracking-[0.14em] text-[#B5B5BB]"
              >
                <Maximize2 size={14} /> FULLSCREEN
              </button>
              <div className="ml-auto hidden gap-3 font-mono text-[10px] tracking-[0.14em] text-[#83838A] sm:flex">
                <span>LATENCY {STREAM_TELEMETRY.latency}</span>
                <span>SIGNAL {STREAM_TELEMETRY.signal}</span>
                <span>{STREAM_TELEMETRY.session}</span>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-[11px] tracking-[0.14em] text-white lg:hidden"
                onClick={() => setChatOpen((v) => !v)}
              >
                <MessageSquare size={14} /> CHAT
              </button>
            </div>
          </div>

          {chatOpen ? (
            <div className="flex min-h-[320px] flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0C0C0D]">
              <div className="border-b border-white/10 px-4 py-3 font-mono text-[11px] tracking-[0.18em] text-[#B5B5BB]">
                OPERATOR CHAT
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {CHAT_MESSAGES.map((msg) => (
                  <div key={msg.user + msg.text} className="text-sm">
                    <span
                      className={`font-mono text-[11px] tracking-[0.08em] ${msg.accent ? "text-[#EF4444]" : "text-[#83838A]"}`}
                    >
                      {msg.user}:
                    </span>{" "}
                    <span className="text-[#F7F7F7]">{msg.text}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 px-4 py-3 text-xs text-[#83838A]">
                CHAT AVAILABLE TO VERIFIED OPERATORS
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {clipOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4">
          <div className="w-full max-w-md rounded-sm border border-white/10 bg-[#0C0C0D] p-6">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#EF4444]">
              CLIPPING IS RESERVED FOR ACTIVE OPERATORS
            </p>
            <p className="mt-3 text-sm text-[#B5B5BB]">
              Join the private beta to unlock operator tools and social exports.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setClipOpen(false);
                  openAccessModal("clip");
                }}
                className="rounded-sm bg-[#EF4444] px-4 py-3 text-xs tracking-[0.16em] text-white"
              >
                REQUEST ACCESS
              </button>
              <button
                type="button"
                onClick={() => setClipOpen(false)}
                className="rounded-sm border border-white/15 px-4 py-3 text-xs tracking-[0.16em] text-white"
              >
                CONTINUE WATCHING
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
