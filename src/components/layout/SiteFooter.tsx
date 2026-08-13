import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/#theaters", label: "THEATERS" },
  { href: "/gear", label: "GEAR" },
  { href: "/about", label: "ABOUT" },
  { href: "/careers", label: "CAREERS" },
  { href: "/disclosure", label: "DISCLOSURE" },
  { href: "/privacy", label: "PRIVACY" },
  { href: "/terms", label: "TERMS" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070707]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <div className="relative h-12 w-[min(80vw,360px)] sm:h-14 sm:w-[420px]">
              <Image
                src="/brand/strafe-live-logo.png"
                alt="STRAFE.LIVE"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm tracking-wide text-[#B5B5BB]">
              THE BATTLEFIELD IS NO LONGER SOMEWHERE ELSE.
            </p>
            <div className="space-y-1 text-xs leading-relaxed text-[#83838A]">
              <p className="font-mono tracking-[0.14em] text-[#B5B5BB]">
                STRAFE SYSTEMS LLC
              </p>
              <p>A GENERAL.MANN COMPANY</p>
              <p>Registered operator platform · Private beta</p>
              <p>HQ — Austin, TX · Theater logistics worldwide</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.16em] text-[#83838A] transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] tracking-[0.14em] text-[#83838A] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 STRAFE SYSTEMS LLC</span>
          <span>STRAFE.LIVE</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}
