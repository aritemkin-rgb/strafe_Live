import { HeroSection } from "@/components/hero/HeroSection";
import { CredibilityStrip } from "@/components/platform/CredibilityStrip";
import { ChooseYourSide } from "@/components/selection/ChooseYourSide";
import { GearSection } from "@/components/gear/GearSection";
import { BetaSection } from "@/components/waitlist/BetaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilityStrip />
      <ChooseYourSide />
      <GearSection />
      <BetaSection />
    </>
  );
}
