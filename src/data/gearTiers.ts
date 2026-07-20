export interface GearTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const GEAR_TIERS: GearTier[] = [
  {
    id: "spectator",
    name: "Spectator",
    price: "FREE",
    features: [
      "Selected observation feeds",
      "Standard-definition viewing",
      "Watermarked replay",
      "Public chat viewing",
      "Limited availability",
    ],
    cta: "WATCH DEMO",
  },
  {
    id: "operator",
    name: "Operator",
    price: "$19.99 / MONTH",
    features: [
      "Priority stream access",
      "Camera-angle selection",
      "Monthly vertical clip",
      "Operator badge",
      "Low-latency viewing",
      "Basic analytics",
    ],
    cta: "JOIN WAITLIST",
    featured: true,
  },
  {
    id: "commander",
    name: "Commander",
    price: "$79.99 / MONTH",
    features: [
      "Multi-theater access",
      "Multi-angle replay",
      "Automated session recap",
      "Priority queue",
      "Advanced analytics",
      "Custom callsign",
    ],
    cta: "REQUEST ACCESS",
  },
  {
    id: "influencer",
    name: "Influencer",
    price: "APPLICATION ONLY",
    features: [
      "Automatic captions",
      "Reaction-camera layout",
      "9:16 vertical export",
      "Thumbnail generation",
      "Sponsored-content tools",
      "Engagement forecasting",
    ],
    cta: "APPLY FOR ACCESS",
  },
];
