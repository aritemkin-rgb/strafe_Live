"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelection } from "@/context/SelectionContext";

const LINKS = [
  { href: "#platform", label: "PLATFORM" },
  { href: "#theaters", label: "THEATERS" },
  { href: "#gear", label: "GEAR" },
  { href: "#live", label: "LIVE" },
  { href: "#commander", label: "COMMANDER" },
  { href: "#about", label: "ABOUT" },
];

export function SiteHeader() {
  const { openAccessModal } = useSelection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative h-8 w-[140px] shrink-0 sm:h-9 sm:w-[180px]">
          <Image
            src="/brand/strafe-live-logo.png"
            alt="STRAFE.LIVE"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.18em] text-[#B5B5BB] transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-white">
            <span className="live-dot" />
            LIVE
          </div>
          <button
            type="button"
            onClick={() => openAccessModal("nav")}
            className="hidden rounded-sm bg-[#EF4444] px-3 py-2 text-[11px] font-medium tracking-[0.14em] text-white transition hover:bg-red-500 sm:inline-flex"
          >
            REQUEST ACCESS
          </button>
          <button
            type="button"
            className="inline-flex rounded-sm border border-white/15 p-2 text-white lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 lg:hidden">
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="/brand/strafe-emblem.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs tracking-[0.2em] text-[#B5B5BB]">
              CIVILIAN NETWORK
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.16em] text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openAccessModal("mobile-nav");
              }}
              className="mt-2 rounded-sm bg-[#EF4444] px-3 py-3 text-xs tracking-[0.16em] text-white"
            >
              REQUEST ACCESS
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
