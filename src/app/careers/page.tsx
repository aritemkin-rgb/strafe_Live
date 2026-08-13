import type { Metadata } from "next";
import { CareersContent } from "@/components/careers/CareersContent";

export const metadata: Metadata = {
  title: "Careers — STRAFE.LIVE",
  description:
    "Join STRAFE SYSTEMS. Open roles in operator success, theater logistics, airframe integration, and creator partnerships.",
};

export default function CareersPage() {
  return <CareersContent />;
}
