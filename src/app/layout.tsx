import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  Space_Grotesk,
} from "next/font/google";
import { SelectionProvider } from "@/context/SelectionContext";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
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

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STRAFE.LIVE — A Satirical Platform Artwork",
  description:
    "STRAFE.LIVE is a fictional platform examining the gamification, platformization, and spectatorship of remote warfare.",
  openGraph: {
    title: "JOIN THE FIGHT",
    description:
      "STRAFE.LIVE is a fictional platform examining the gamification, platformization, and spectatorship of remote warfare.",
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
        className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <SelectionProvider>
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
