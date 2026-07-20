import { HeroSection } from "@/components/hero/HeroSection";
import { ChooseYourSide } from "@/components/selection/ChooseYourSide";
import { LiveStreamPreview } from "@/components/stream/LiveStreamPreview";
import { HowItWorks } from "@/components/platform/HowItWorks";
import { GearSection } from "@/components/gear/GearSection";
import { BetaSection } from "@/components/waitlist/BetaSection";
import { FounderPlaceholder } from "@/components/founder/FounderPlaceholder";
import { AboutTeaser } from "@/components/platform/AboutTeaser";
import { DisclosureBand } from "@/components/platform/DisclosureBand";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ChooseYourSide />
      <LiveStreamPreview />
      <HowItWorks />
      <GearSection />
      <BetaSection />
      <FounderPlaceholder />
      <AboutTeaser />
      <DisclosureBand />
    </>
  );
}
