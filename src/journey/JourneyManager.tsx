"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ExperienceWaypoint } from "@/journey/types";

import MagazineHeader from "@/components/magazine/MagazineHeader";
import MagazineCoverHero from "@/components/magazine/MagazineCoverHero";
import MagazineAgencyTicker from "@/components/magazine/MagazineAgencyTicker";
import MagazineMetricsStrip from "@/components/magazine/MagazineMetricsStrip";
import MagazineWorksPlates from "@/components/magazine/MagazineWorksPlates";
import MagazineCapabilities from "@/components/magazine/MagazineCapabilities";
import MagazineTimelineDossier from "@/components/magazine/MagazineTimelineDossier";
import MagazineColophonContact from "@/components/magazine/MagazineColophonContact";
import MagazineCaseModal from "@/components/magazine/MagazineCaseModal";

import ErrorBoundary from "@/components/ui/ErrorBoundary";

const MagazineWalkingRobot = dynamic(
  () => import("@/components/magazine/MagazineWalkingRobot"),
  { ssr: false }
);

export default function JourneyManager() {
  const [selectedWaypoint, setSelectedWaypoint] = useState<ExperienceWaypoint | null>(null);

  const handleOpenCaseModal = (waypoint: ExperienceWaypoint) => {
    setSelectedWaypoint(waypoint);
  };

  const handleCloseCaseModal = () => {
    setSelectedWaypoint(null);
  };

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

        {/* Agency Benchmarks & Audited Metrics Strip */}
        <MagazineMetricsStrip />

        {/* Section 02: Selected Shipped Digital Products */}
        <MagazineWorksPlates onOpenCaseModal={handleOpenCaseModal} />

        {/* Dynamic Agency Ticker Marquee Ribbon */}
        <MagazineAgencyTicker />

        {/* Section 03: Technical Capabilities & Creative Disciplines */}
        <MagazineCapabilities />

        {/* Section 04: Career Chronology & Service Record */}
        <MagazineTimelineDossier />

        {/* Section 05: Colophon & Inquiries / Back Cover */}
        <MagazineColophonContact />
      </main>

      {/* 3. Deep-Dive Case Study Dossier Modal */}
      <MagazineCaseModal
        waypoint={selectedWaypoint}
        onClose={handleCloseCaseModal}
      />

      {/* 4. Interactive 3D Robot Mascot Walking Back and Forth across Bottom */}
      <ErrorBoundary fallback={null}>
        <MagazineWalkingRobot />
      </ErrorBoundary>
    </div>
  );
}
