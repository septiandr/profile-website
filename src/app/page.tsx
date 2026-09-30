"use client";

import dynamic from "next/dynamic";
import WelcomeLaunchSection from "@/components/sections/WelcomeLaunchSection";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

// Dynamically import 3D Space Canvas on client-side only
const SpaceCanvas = dynamic(
  () => import("@/components/canvas/SpaceCanvas"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-space-950 overflow-x-hidden">
      {/* Pinned 3D Interactive Three.js Rig & Starfield */}
      <SpaceCanvas />

      {/* Atmospheric Cyber Gradients & Grid Lines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cyber-grid opacity-25"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 left-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-1/4 h-[500px] w-[500px] translate-y-1/2 rounded-full bg-purple-500/10 blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Sequential Game Journey Sections */}
      <div className="relative z-10">
        {/* Stage 0: Blank Space Launchpad with Interactive Rocket */}
        <WelcomeLaunchSection />

        {/* Stage 1: Identity & Hero Profile */}
        <HeroSection />

        {/* Stage 2: Architectural Dossier & Philosophy */}
        <AboutSection />

        {/* Stage 3: Enterprise Experience Timeline */}
        <ExperienceSection />

        {/* Stage 4: Featured Fullstack Protocols */}
        <ProjectsSection />

        {/* Stage 5: Engineering Capability Matrix */}
        <SkillsSection />

        {/* Stage 6: Final Mission Comms & Direct Transmission */}
        <ContactSection />
      </div>
    </main>
  );
}
