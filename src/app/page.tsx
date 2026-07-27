import { HeroSection } from "@/components/hero/HeroSection";
import { ChooseYourSide } from "@/components/selection/ChooseYourSide";
import { GearSection } from "@/components/gear/GearSection";
import { BetaSection } from "@/components/waitlist/BetaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ChooseYourSide />
      <GearSection />
      <BetaSection />
    </>
  );
}
