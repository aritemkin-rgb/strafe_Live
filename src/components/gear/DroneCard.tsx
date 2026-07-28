import Image from "next/image";
import Link from "next/link";
import type { Drone } from "@/data/drones";

export function DroneCard({
  drone,
  showSpecs = false,
}: {
  drone: Drone;
  showSpecs?: boolean;
}) {
  return (
    <Link
      href={`/gear/${drone.id}`}
      className="group overflow-hidden rounded-sm border border-white/10 bg-[#0C0C0D] transition hover:border-white/30"
    >
      <div className="relative aspect-[4/3] bg-[#111113]">
        <Image
          src={drone.image}
          alt={drone.shortName}
          fill
          className="object-contain p-4 transition duration-500 group-hover:scale-[1.03] sm:p-5"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="border-t border-white/10 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#EF4444]">
              {drone.sku} · {drone.role}
            </p>
            <h3 className="mt-2 font-display text-2xl text-white sm:text-3xl">
              {drone.name}
            </h3>
          </div>
          <p className="font-mono text-sm tracking-[0.08em] text-white">
            {drone.priceLabel}
          </p>
        </div>
        <p className="mt-3 text-sm text-[#B5B5BB]">{drone.tagline}</p>
        {showSpecs ? (
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 font-mono text-[10px] tracking-[0.12em] text-[#83838A]">
            <div>
              <div>PAYLOAD</div>
              <div className="mt-1 text-white">
                {drone.specs.find((s) => s.label === "PAYLOAD")?.value}
              </div>
            </div>
            <div>
              <div>ENDURANCE</div>
              <div className="mt-1 text-white">
                {drone.specs.find((s) => s.label === "ENDURANCE")?.value}
              </div>
            </div>
            <div>
              <div>RANGE</div>
              <div className="mt-1 text-white">
                {drone.specs.find((s) => s.label === "RANGE")?.value}
              </div>
            </div>
          </div>
        ) : null}
        <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-[#83838A] group-hover:text-[#EF4444]">
          {showSpecs ? "OPEN PROFILE →" : "VIEW PROFILE →"}
        </p>
      </div>
    </Link>
  );
}
