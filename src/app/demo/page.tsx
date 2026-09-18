import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "STRAFE OPERATOR demo",
  description:
    "Play the STRAFE OPERATOR console in the browser. Fictional satire — the site disclosure still applies.",
};

export const dynamic = "force-dynamic";

export default function DemoPage() {
  const gamePath = path.join(process.cwd(), "public", "game", "index.html");
  const ready = existsSync(gamePath);

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-black text-white">
      <header className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#070707] px-3 sm:h-12 sm:px-4">
        <Link href="/" className="relative h-7 w-[min(46vw,220px)] shrink-0">
          <Image
            src="/brand/strafe-live-logo.png"
            alt="STRAFE.LIVE"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>
        <p className="truncate font-display text-xs tracking-[0.16em] sm:text-sm">
          STRAFE OPERATOR
          <span className="ml-2 font-mono text-[10px] tracking-[0.2em] text-[#EF4444]">
            DEMO
          </span>
        </p>
        <Link
          href="/disclosure"
          className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-[#83838A] hover:text-white"
        >
          DISCLOSURE
        </Link>
      </header>
      <div className="relative min-h-0 flex-1 bg-black">
        {ready ? (
          <iframe
            src="/game/index.html"
            title="STRAFE OPERATOR"
            className="h-full w-full touch-none border-0 bg-black"
            allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope; pointer-lock"
            allowFullScreen
          />
        ) : (
          <div className="mx-auto flex h-full max-w-xl flex-col justify-center gap-4 px-5">
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#EF4444]">
              EXPORT MISSING
            </p>
            <h1 className="font-display text-2xl">STRAFE OPERATOR demo</h1>
            <p className="text-sm leading-relaxed text-[#B5B5BB]">
              Drop a Godot 4.7 Web export into{" "}
              <code className="font-mono text-[#F7F7F7]">public/game/index.html</code>{" "}
              then reload. Thread support stays off so this route does not need
              SharedArrayBuffer headers.
            </p>
            <pre className="overflow-x-auto rounded-sm border border-white/10 bg-[#0C0C0D] p-3 font-mono text-[11px] leading-relaxed text-[#B5B5BB]">
              {`/Applications/Godot.app/Contents/MacOS/Godot --headless \\
  --path /Users/aritemkin/Desktop/Cursor/Strafe.Game \\
  --export-release Web export/web/index.html
cp -R Strafe.Game/export/web/. Strafe.Live/public/game/`}
            </pre>
            <p className="text-xs text-[#83838A]">
              Or Godot → Project → Export → Web →{" "}
              <code className="font-mono">public/game/index.html</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
