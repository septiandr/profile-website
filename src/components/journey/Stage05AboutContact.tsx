"use client";

import { useRef } from "react";
import { Mail, Globe, ExternalLink, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";

export default function Stage05AboutContact() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      {/* SCENE: CONTACT (CALM CONCLUSION & CELEBRATION WITH DANCING ROBOT) */}
      <section
        id="zone-contact"
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-6 py-20 sm:py-24 overflow-hidden select-none"
      >
        {/* Ambient Cosmic Background Glow Pods with Rich Saturation */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-purple-600/20 blur-3xl pointer-events-none -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none -z-10"
        />

        {/* Top Section: Invitation with Shimmering Gradient */}
        <div className="text-center max-w-4xl mx-auto z-20 pointer-events-auto">
          <div className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#00f0ff] font-bold mb-3 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ccff00] shadow-[0_0_10px_#ccff00] animate-ping" />
            <span className="bg-[#ccff00]/10 px-3.5 py-1 rounded-full border border-[#ccff00]/30 text-white font-mono">
              Commission Studio // Inquiries & Collaborations
            </span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[0.98] mb-4">
            LET&apos;S BUILD <br />
            <span className="relative inline-block px-4 py-1 mx-2 text-black font-black bg-[#ccff00] rounded-sm transform -rotate-1 shadow-[0_0_40px_rgba(204,255,0,0.45)]">
              NEXT-GEN PRODUCTS
            </span>
          </h2>

          <div className="font-mono text-xs sm:text-sm text-zinc-300 tracking-[0.2em] uppercase font-light">
            Available for select enterprise architecture, fractional leadership & high-scale digital flagships
          </div>
        </div>

        {/* Clear Center Stage for 3D Dancing Robot */}
        <div className="flex-1 w-full min-h-[160px] pointer-events-none" />

        {/* Bottom Action Links with 3D Tilt & Vibrant Holographic Glow */}
        <div className="z-20 pointer-events-auto flex flex-col items-center gap-8 pb-4 w-full max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm">
            {/* Email Pod - Radiant Acid Lime */}
            <TiltSpotlightCard
              spotlightColor="rgba(204, 255, 0, 0.45)"
              borderColor="rgba(204, 255, 0, 0.85)"
              className="border border-[#ccff00]/60 bg-gradient-to-r from-[#ccff00]/20 via-[#ccff00]/10 to-[#00f0ff]/15 px-8 py-4 rounded-full shadow-[0_15px_35px_rgba(204,255,0,0.25)] hover:border-[#ccff00] hover:scale-105 transition-all duration-300 backdrop-blur-xl"
            >
              <a
                href={`mailto:${profileData.personalInfo.email}`}
                data-cursor-text="EMAIL"
                className="flex items-center gap-3 text-white hover:text-[#ccff00] font-black tracking-wider"
              >
                <Mail className="h-4 w-4 text-[#ccff00] shrink-0" />
                <span>{profileData.personalInfo.email}</span>
                <ArrowUpRight className="h-4 w-4 text-[#ccff00] shrink-0" />
              </a>
            </TiltSpotlightCard>

            {/* GitHub Pod - Vivid Cyan */}
            <TiltSpotlightCard
              spotlightColor="rgba(0, 240, 255, 0.45)"
              borderColor="rgba(0, 240, 255, 0.8)"
              className="border border-[#00f0ff]/50 bg-gradient-to-r from-[#00f0ff]/20 via-[#00f0ff]/10 to-[#8b5cf6]/15 px-7 py-4 rounded-full shadow-[0_15px_35px_rgba(0,240,255,0.2)] hover:border-[#00f0ff] hover:scale-105 transition-all duration-300 backdrop-blur-xl"
            >
              <a
                href="https://github.com/sdwirisanggalih"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="GITHUB"
                className="flex items-center gap-2.5 text-white hover:text-[#00f0ff] tracking-wider font-bold"
              >
                <Globe className="h-4 w-4 text-[#00f0ff] shrink-0" />
                <span>GITHUB</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#00f0ff] shrink-0" />
              </a>
            </TiltSpotlightCard>

            {/* LinkedIn Pod - Vibrant Purple */}
            <TiltSpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.45)"
              borderColor="rgba(139, 92, 246, 0.8)"
              className="border border-[#8b5cf6]/50 bg-gradient-to-r from-[#8b5cf6]/20 via-[#8b5cf6]/10 to-[#00f0ff]/15 px-7 py-4 rounded-full shadow-[0_15px_35px_rgba(139,92,246,0.2)] hover:border-[#8b5cf6] hover:scale-105 transition-all duration-300 backdrop-blur-xl"
            >
              <a
                href="https://linkedin.com/in/sdwirisanggalih"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="LINKEDIN"
                className="flex items-center gap-2.5 text-white hover:text-[#8b5cf6] tracking-wider font-bold"
              >
                <Globe className="h-4 w-4 text-[#8b5cf6] shrink-0" />
                <span>LINKEDIN</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#8b5cf6] shrink-0" />
              </a>
            </TiltSpotlightCard>
          </div>

          <div className="font-sans text-[11px] text-zinc-400 tracking-[0.25em] uppercase font-light">
            Interactive Portfolio · Engineered with Next.js 15, Three.js & GSAP
          </div>
        </div>
      </section>
    </div>
  );
}
