import { HeroSection } from "@/components/hero/HeroSection";
import { ChooseYourSide } from "@/components/selection/ChooseYourSide";
import { LiveStreamPreview } from "@/components/stream/LiveStreamPreview";
import { HowItWorks } from "@/components/platform/HowItWorks";
import { GearSection } from "@/components/gear/GearSection";
import { BetaSection } from "@/components/waitlist/BetaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ChooseYourSide />
      <LiveStreamPreview />
      <HowItWorks />
      <GearSection />
      <BetaSection />
    </>
  );
}
