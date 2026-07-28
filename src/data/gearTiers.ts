export interface GearTier {
  id: string;
  name: string;
  price: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const GEAR_TIERS: GearTier[] = [
  {
    id: "spectator",
    name: "Spectator",
    price: "FREE",
    blurb: "Watch other operators. No airframe required.",
    features: [
      "Spectate live theater feeds",
      "Standard-definition viewing",
      "Watermarked replay",
      "Public chat viewing",
      "No remote control access",
    ],
    cta: "REQUEST ACCESS",
  },
  {
    id: "operator",
    name: "Operator",
    price: "$29.99 / MONTH",
    blurb: "Remote sessions without hardware ownership.",
    features: [
      "Priority stream access",
      "Camera-angle selection",
      "Monthly vertical clip",
      "Operator badge",
      "Low-latency viewing",
      "Shared network airframes",
    ],
    cta: "REQUEST ACCESS",
  },
  {
    id: "commander",
    name: "Commander",
    price: "$149.99 / MONTH",
    blurb:
      "Includes a free S-1 Scout shipped to your chosen battlefield theater.",
    features: [
      "Free S-1 Scout drone included",
      "Shipped to your selected theater",
      "Multi-theater access",
      "Multi-angle replay",
      "Priority deployment queue",
      "Advanced analytics",
      "Custom callsign",
      "Upgrade credit toward H-9 / X-6",
    ],
    cta: "REQUEST ACCESS",
  },
  {
    id: "influencer",
    name: "Influencer",
    price: "APPLICATION ONLY",
    blurb: "Clip factory tools for high-output creators.",
    features: [
      "Automatic captions",
      "Reaction-camera layout",
      "9:16 vertical export",
      "Thumbnail generation",
      "Sponsored-content tools",
      "Engagement forecasting",
    ],
    cta: "REQUEST ACCESS",
  },
];
