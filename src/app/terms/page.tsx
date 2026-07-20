import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms — STRAFE.LIVE",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
      <h1 className="font-display text-4xl text-white">Terms</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#B5B5BB]">
        <p>
          STRAFE.LIVE is a satirical artwork and fictional product interface. It
          does not provide real military capability, weapons access, targeting,
          or operational services.
        </p>
        <p>
          Queue positions, viewer counts, rollout status, and telemetry values
          are theatrical interface elements.
        </p>
        <p>
          No real purchases for fictional military services are processed through
          this website.
        </p>
      </div>
    </div>
  );
}
