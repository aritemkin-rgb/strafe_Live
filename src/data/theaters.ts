export type TheaterId = "eastern-europe" | "levant" | "sudan" | "myanmar";
export type SideId =
  | "ukraine"
  | "russia"
  | "israel"
  | "palestine"
  | "saf"
  | "rsf"
  | "junta"
  | "resistance"
  | "no-preference";

export interface Faction {
  id: SideId;
  name: string;
  flagSrc: string;
  countryIds: string[];
  status: string;
  activity: string;
  cta: string;
}

export interface Theater {
  id: TheaterId;
  name: string;
  center: [number, number];
  zoom: number;
  factions: Faction[];
}

export const THEATERS: Theater[] = [
  {
    id: "eastern-europe",
    name: "Eastern Europe",
    center: [32, 49],
    zoom: 4.2,
    factions: [
      {
        id: "ukraine",
        name: "Ukraine",
        flagSrc: "/flags/ua.svg",
        countryIds: ["804"],
        status: "HIGH DEMAND",
        activity: "HIGH VIEWER ACTIVITY",
        cta: "SELECT UKRAINE",
      },
      {
        id: "russia",
        name: "Russia",
        flagSrc: "/flags/ru.svg",
        countryIds: ["643"],
        status: "LIMITED BETA",
        activity: "TRENDING",
        cta: "SELECT RUSSIA",
      },
    ],
  },
  {
    id: "levant",
    name: "Levant",
    center: [35.2, 31.8],
    zoom: 7.5,
    factions: [
      {
        id: "israel",
        name: "Israel",
        flagSrc: "/flags/il.svg",
        countryIds: ["376"],
        status: "WAITLIST OPEN",
        activity: "HIGH DEMAND",
        cta: "SELECT ISRAEL",
      },
      {
        id: "palestine",
        name: "Palestine",
        flagSrc: "/flags/ps.svg",
        countryIds: ["275"],
        status: "ACCESS DEPLOYING",
        activity: "TRENDING",
        cta: "SELECT PALESTINE",
      },
    ],
  },
  {
    id: "sudan",
    name: "Sudan",
    center: [30.2, 15.5],
    zoom: 5.2,
    factions: [
      {
        id: "saf",
        name: "SAF",
        flagSrc: "/flags/sd.svg",
        countryIds: ["729"],
        status: "HIGH DEMAND",
        activity: "SUDANESE ARMED FORCES",
        cta: "SELECT SAF",
      },
      {
        id: "rsf",
        name: "RSF",
        flagSrc: "/flags/sd.svg",
        countryIds: ["729"],
        status: "TRENDING",
        activity: "RAPID SUPPORT FORCES",
        cta: "SELECT RSF",
      },
    ],
  },
  {
    id: "myanmar",
    name: "Myanmar",
    center: [96.1, 21.9],
    zoom: 5.4,
    factions: [
      {
        id: "junta",
        name: "Junta",
        flagSrc: "/flags/mm.svg",
        countryIds: ["104"],
        status: "LIMITED BETA",
        activity: "MILITARY JUNTA",
        cta: "SELECT JUNTA",
      },
      {
        id: "resistance",
        name: "Resistance",
        flagSrc: "/flags/mm.svg",
        countryIds: ["104"],
        status: "HIGH DEMAND",
        activity: "PEOPLE'S DEFENSE FORCES",
        cta: "SELECT RESISTANCE",
      },
    ],
  },
];

export const NO_PREFERENCE = {
  id: "no-preference" as const,
  name: "No Preference",
  label: "OPTIMIZE FOR ENGAGEMENT",
  description:
    "Let STRAFE assign the position with the highest projected audience engagement.",
};

export function getFaction(sideId: SideId | null) {
  if (!sideId || sideId === "no-preference") return null;
  for (const theater of THEATERS) {
    const faction = theater.factions.find((f) => f.id === sideId);
    if (faction) return { theater, faction };
  }
  return null;
}

export function getTheater(theaterId: TheaterId | null) {
  return THEATERS.find((t) => t.id === theaterId) ?? null;
}
