import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — STRAFE.LIVE",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
      <h1 className="font-display text-4xl text-white">Privacy</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#B5B5BB]">
        <p>
          If you join the waitlist, we store the email address and optional
          callsign you submit so we can contact you about fictional private-beta
          access for this artwork.
        </p>
        <p>
          Side-selection analytics are stored as anonymous aggregate events. We
          do not intentionally store IP addresses, precise location, or browser
          fingerprints for those events.
        </p>
        <p>
          Configure a real privacy contact email before public launch if you
          collect personal data.
        </p>
      </div>
    </div>
  );
}
