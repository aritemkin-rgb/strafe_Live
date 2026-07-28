export interface DroneSpec {
  label: string;
  value: string;
}

export interface Drone {
  id: string;
  sku: string;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  price: number;
  priceLabel: string;
  image: string;
  role: string;
  status: string;
  specs: DroneSpec[];
  features: string[];
  payloadBay: string;
}

export const DRONES: Drone[] = [
  {
    id: "s1-scout",
    sku: "S-1",
    name: "SCOUT",
    shortName: "S-1 SCOUT",
    tagline: "Compact ISR for rapid theater entry.",
    summary:
      "A low-signature quadcopter built for first-look reconnaissance. Dual EO/IR optics, encrypted downlink, and a light undercarriage bay for modular mission kits. Allocated units ship to your selected battlefield theater.",
    price: 289,
    priceLabel: "$289",
    image: "/drones/s1-scout.png",
    role: "RECON",
    status: "AVAILABLE — PRIVATE BETA",
    specs: [
      { label: "AIRFRAME", value: "Quadcopter" },
      { label: "MASS", value: "1.4 kg" },
      { label: "ENDURANCE", value: "38 min" },
      { label: "RANGE", value: "8 km LOS" },
      { label: "CRUISE", value: "52 km/h" },
      { label: "PAYLOAD", value: "0.4 kg" },
      { label: "BAY SIZE", value: "90 × 60 × 40 mm" },
      { label: "SENSORS", value: "EO + IR gimbal" },
      { label: "DATALINK", value: "Encrypted C2" },
      { label: "DEPLOY", value: "Hand launch" },
    ],
    features: [
      "Dual-spectrum forward gimbal",
      "Carbon-composite arms",
      "Operator badge sync via STRAFE net",
      "Clip-ready 1080p downlink",
      "Shipped to your chosen battlefield",
      "Included with Commander subscription",
    ],
    payloadBay: "0.4 kg modular bay — micro-relay, marker, or sensor puck.",
  },
  {
    id: "h9-overwatch",
    sku: "H-9",
    name: "OVERWATCH",
    shortName: "H-9 OVERWATCH",
    tagline: "Single-rotor persistence with multi-sensor stare.",
    summary:
      "Helicopter platform for long-dwell observation. Multi-lens nose gimbal, carbon boom, and a mid-class payload bay sized for heavier ISR packages. Allocated units ship to your selected battlefield theater.",
    price: 790,
    priceLabel: "$790",
    image: "/drones/h9-overwatch.png",
    role: "ISR",
    status: "LIMITED ALLOCATION",
    specs: [
      { label: "AIRFRAME", value: "Single-rotor heli" },
      { label: "MASS", value: "4.8 kg" },
      { label: "ENDURANCE", value: "72 min" },
      { label: "RANGE", value: "18 km LOS" },
      { label: "CRUISE", value: "68 km/h" },
      { label: "PAYLOAD", value: "1.2 kg" },
      { label: "BAY SIZE", value: "180 × 110 × 85 mm" },
      { label: "SENSORS", value: "6-lens EO/IR/LRF" },
      { label: "DATALINK", value: "Dual-band mesh" },
      { label: "DEPLOY", value: "Pad / skid" },
    ],
    features: [
      "Multi-spectral stare gimbal",
      "Carbon-fiber boom and fuselage",
      "Stable hover for clip capture",
      "Theater handoff between operators",
      "Shipped to your chosen battlefield",
      "Priority queue on Commander",
    ],
    payloadBay: "1.2 kg centerline bay — extended battery, relay, or ISR pack.",
  },
  {
    id: "x6-interdict",
    sku: "X-6",
    name: "INTERDICT",
    shortName: "X-6 INTERDICT",
    tagline: "Hex-class airframe with dual hardpoint capacity.",
    summary:
      "Aggressive multi-rotor built for heavier mission kits. Dual lateral hardpoints, high-output propulsion, and a reinforced bay for strike-simulation payloads in the STRAFE network. Allocated units ship to your selected battlefield theater.",
    price: 1490,
    priceLabel: "$1,490",
    image: "/drones/x6-interdict.jpg",
    role: "STRIKE",
    status: "APPLICATION QUEUE",
    specs: [
      { label: "AIRFRAME", value: "Hexacopter" },
      { label: "MASS", value: "7.2 kg" },
      { label: "ENDURANCE", value: "28 min (loaded)" },
      { label: "RANGE", value: "12 km LOS" },
      { label: "CRUISE", value: "84 km/h" },
      { label: "PAYLOAD", value: "2.5 kg" },
      { label: "BAY SIZE", value: "240 × 140 × 100 mm" },
      { label: "HARDPOINTS", value: "2 × lateral" },
      { label: "SENSORS", value: "Triple-lens gimbal" },
      { label: "DATALINK", value: "Hardened C2" },
    ],
    features: [
      "Dual modular hardpoints",
      "Carbon spine with jet-fin stabilizers",
      "High-thrust motor set",
      "Mission-kit swap under 90 seconds",
      "Shipped to your chosen battlefield",
      "Restricted to verified operators",
    ],
    payloadBay: "2.5 kg total — dual hardpoints + primary bay for mission kits.",
  },
];

export function getDrone(id: string) {
  return DRONES.find((d) => d.id === id) ?? null;
}
