import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { SelectionProvider } from "@/context/SelectionContext";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HashScroll } from "@/components/layout/HashScroll";
import { BootSequence } from "@/components/hero/BootSequence";
import { AccessModal } from "@/components/waitlist/AccessModal";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STRAFE.LIVE — Civilian Combat Drone Access",
  description:
    "STRAFE.LIVE lets civilians operate combat drones in active war theaters. Choose a side, get an airframe, fly remotely.",
  openGraph: {
    title: "JOIN THE FIGHT",
    description:
      "Civilian access to combat drones in active war theaters. Choose your side. Deploy your airframe. Fly from anywhere.",
    url: "https://strafe.live",
    siteName: "STRAFE.LIVE",
    type: "website",
  },
  metadataBase: new URL("https://strafe.live"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${geistSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <SelectionProvider>
          <HashScroll />
          <BootSequence />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <AccessModal />
        </SelectionProvider>
      </body>
    </html>
  );
}
