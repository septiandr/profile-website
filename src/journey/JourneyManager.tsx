"use client";

import dynamic from "next/dynamic";

import MagazineHeader from "@/components/magazine/MagazineHeader";
import MagazineCoverHero from "@/components/magazine/MagazineCoverHero";
import MagazineAgencyTicker from "@/components/magazine/MagazineAgencyTicker";
import MagazineWorksPlates from "@/components/magazine/MagazineWorksPlates";
import MagazineServicesOfferings from "@/components/magazine/MagazineServicesOfferings";
import MagazineCapabilities from "@/components/magazine/MagazineCapabilities";
import MagazineTimelineDossier from "@/components/magazine/MagazineTimelineDossier";
import MagazineColophonContact from "@/components/magazine/MagazineColophonContact";

import ErrorBoundary from "@/components/ui/ErrorBoundary";

const MagazineWalkingRobot = dynamic(
  () => import("@/components/magazine/MagazineWalkingRobot"),
  { ssr: false }
);

export default function JourneyManager() {

  return (
    <div className="relative min-h-screen bg-[#faf9f6] text-zinc-950 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Masthead & Monograph Navigation Bar */}
      <MagazineHeader />

      {/* 2. Main Magazine Publication Spread */}
      <main className="relative z-10 w-full pb-28">
        {/* Cover / Feature Essay 01 */}
        <MagazineCoverHero />

        {/* Dynamic Agency Ticker Marquee Ribbon */}
        <MagazineAgencyTicker />

        {/* Section 02: Selected Shipped Digital Products */}
        <MagazineWorksPlates />

        {/* Dynamic Agency Ticker Marquee Ribbon */}
        <MagazineAgencyTicker />

        {/* Section 03: Commercial Services & Engineering (System, Website, App & Bot) */}
        <MagazineServicesOfferings />

        {/* Section 04: Technical Capabilities & Creative Disciplines */}
        <MagazineCapabilities />

        {/* Section 05: Career Chronology & Service Record */}
        <MagazineTimelineDossier />

        {/* Section 06: Colophon & Inquiries / Back Cover */}
        <MagazineColophonContact />
      </main>

      {/* 4. Interactive 3D Robot Mascot Walking Back and Forth across Bottom */}
      <ErrorBoundary fallback={null}>
        <MagazineWalkingRobot />
      </ErrorBoundary>
    </div>
  );
}
