"use client";

import dynamic from "next/dynamic";
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
      {/* Pinned 3D Three.js Rig & Starfield */}
      <SpaceCanvas />

      {/* Cyber Grid & Atmospheric Gradients */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cyber-grid opacity-30"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 left-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-1/4 h-[500px] w-[500px] translate-y-1/2 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Foreground Content Sections */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </main>
  );
}
