import type { Metadata } from "next";
import { GearCatalogPage } from "@/components/gear/GearCatalogPage";

export const metadata: Metadata = {
  title: "Gear — STRAFE.LIVE",
  description:
    "STRAFE.LIVE operator airframes — Scout, Overwatch, and Interdict platforms with specs, payload, and subscription access.",
};

export default function GearPage() {
  return <GearCatalogPage />;
}
