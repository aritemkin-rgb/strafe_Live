"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { SideId, TheaterId } from "@/data/theaters";
import { THEATERS } from "@/data/theaters";

interface WorldMapProps {
  activeTheater: TheaterId | null;
  hoveredSide: SideId | null;
  selectedSide: SideId | null;
  onSelectTheater: (id: TheaterId) => void;
  focusMode?: boolean;
  children?: ReactNode;
}

type CountryProps = { name?: string };

export function WorldMap({
  activeTheater,
  hoveredSide,
  selectedSide,
  onSelectTheater,
  focusMode = false,
  children,
}: WorldMapProps) {
  const [countries, setCountries] = useState<
    FeatureCollection<Geometry, CountryProps> | null
  >(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/maps/countries-110m.json")
      .then((r) => r.json())
      .then((topology: Topology) => {
        if (cancelled) return;
        const geo = feature(
          topology,
          topology.objects.countries as GeometryCollection,
        ) as FeatureCollection<Geometry, CountryProps>;
        setCountries(geo);
      })
      .catch(() => setCountries(null));
    return () => {
      cancelled = true;
    };
  }, []);

  const theater = THEATERS.find((t) => t.id === activeTheater) ?? null;
  const width = 960;
  const height = 520;

  const projection = useMemo(() => {
    const p = geoMercator().precision(0.1);
    if (theater) {
      // Leave room on the right when signup panel is open; leave bottom for faction overlay.
      const tx = focusMode ? width * 0.42 : width * 0.5;
      const ty = height * 0.42;
      return p
        .center(theater.center)
        .scale(120 * theater.zoom)
        .translate([tx, ty]);
    }
    return p.scale(140).translate([width / 2, height / 1.55]);
  }, [theater, focusMode]);

  const path = useMemo(() => geoPath(projection), [projection]);

  const highlightedIds = useMemo(() => {
    const ids = new Set<string>();
    const side = hoveredSide || selectedSide;
    if (!side || side === "no-preference") {
      if (theater) {
        theater.factions.forEach((f) =>
          f.countryIds.forEach((id) => ids.add(id)),
        );
      }
      return ids;
    }
    for (const t of THEATERS) {
      const faction = t.factions.find((f) => f.id === side);
      faction?.countryIds.forEach((id) => ids.add(id));
    }
    return ids;
  }, [hoveredSide, selectedSide, theater]);

  const dimOpponent = Boolean(hoveredSide || selectedSide);

  return (
    <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#050505]">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="relative h-auto w-full"
        role="img"
        aria-label="Interactive world map of STRAFE theaters"
      >
        <rect width={width} height={height} fill="#050505" />
        {countries?.features.map((feat) => {
          const id = String(feat.id ?? "");
          const isHighlight = highlightedIds.has(id);
          const inActiveTheater = theater?.factions.some((f) =>
            f.countryIds.includes(id),
          );
          let fill = "#1a1a1c";
          let opacity = 1;
          if (theater && !inActiveTheater && !isHighlight) opacity = 0.28;
          if (dimOpponent && !isHighlight && inActiveTheater) opacity = 0.45;
          if (isHighlight) fill = "#3f1515";
          return (
            <path
              key={id + (feat.properties?.name ?? "")}
              d={path(feat) ?? undefined}
              fill={fill}
              stroke={isHighlight ? "#EF4444" : "rgba(255,255,255,0.18)"}
              strokeWidth={isHighlight ? 1.2 : 0.4}
              opacity={opacity}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Only show markers for inactive theaters so the active region stays clean for side pickers */}
        {THEATERS.filter((t) => t.id !== activeTheater).map((t) => {
          const [x, y] = projection(t.center) ?? [0, 0];
          if (x < 20 || x > width - 20 || y < 20 || y > height - 20) return null;
          return (
            <g
              key={t.id}
              transform={`translate(${x}, ${y})`}
              className="cursor-pointer"
              onClick={() => onSelectTheater(t.id)}
            >
              <circle r={6} fill="none" stroke="#EF4444" strokeWidth={1.2} />
              <circle r={2.5} fill="#EF4444" />
            </g>
          );
        })}
      </svg>

      {!countries ? (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.2em] text-[#83838A]">
          LOADING GEOGRAPHY…
        </div>
      ) : null}

      {children}
    </div>
  );
}
