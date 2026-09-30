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
        <div className="text-center max-w-3xl mx-auto z-20 pointer-events-auto">
          <div className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-300 font-semibold mb-3 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-ping" />
            <span className="bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
              Inquiries · Collaboration · Opportunities
            </span>
          </div>

          <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] mb-3">
            Let&apos;s Build{" "}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-amber-200 via-rose-300 via-cyan-300 to-amber-400 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)] animate-shimmer">
              Something
            </span>{" "}
            Exceptional.
          </h2>

          <div className="font-sans text-xs sm:text-sm text-zinc-300 tracking-[0.2em] uppercase font-light">
            Available for select senior engineering, architectural consulting & contract leadership
          </div>
        </div>

        {/* Clear Center Stage for 3D Dancing Robot */}
        <div className="flex-1 w-full min-h-[160px] pointer-events-none" />

        {/* Bottom Action Links with 3D Tilt & Vibrant Holographic Glow */}
        <div className="z-20 pointer-events-auto flex flex-col items-center gap-8 pb-4 w-full max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-sans text-xs sm:text-sm">
            {/* Email Pod - Radiant Amber */}
            <TiltSpotlightCard
              spotlightColor="rgba(245, 158, 11, 0.5)"
              borderColor="rgba(245, 158, 11, 0.85)"
              className="border border-amber-400/60 bg-gradient-to-r from-amber-500/25 via-amber-400/15 to-orange-500/25 px-7 py-4 rounded-full shadow-[0_15px_35px_rgba(245,158,11,0.3)] hover:border-amber-300 hover:scale-105 transition-all duration-300 backdrop-blur-xl"
            >
              <a
                href={`mailto:${profileData.personalInfo.email}`}
                className="flex items-center gap-3 text-amber-100 hover:text-white font-semibold tracking-wide"
              >
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>{profileData.personalInfo.email}</span>
                <ArrowUpRight className="h-4 w-4 text-amber-300 shrink-0" />
              </a>
            </TiltSpotlightCard>

            {/* GitHub Pod - Vivid Cyan */}
            <TiltSpotlightCard
              spotlightColor="rgba(6, 182, 212, 0.45)"
              borderColor="rgba(6, 182, 212, 0.8)"
              className="border border-cyan-400/50 bg-gradient-to-r from-cyan-500/25 via-sky-500/15 to-blue-500/25 px-6 py-4 rounded-full shadow-[0_15px_35px_rgba(6,182,212,0.25)] hover:border-cyan-300 hover:scale-105 transition-all duration-300 backdrop-blur-xl"
            >
              <a
                href="https://github.com/sdwirisanggalih"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cyan-100 hover:text-white tracking-wide font-medium"
              >
                <Globe className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>GitHub</span>
                <ExternalLink className="h-3.5 w-3.5 text-cyan-300 shrink-0" />
              </a>
            </TiltSpotlightCard>

            {/* LinkedIn Pod - Vibrant Purple */}
            <TiltSpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.45)"
              borderColor="rgba(168, 85, 247, 0.8)"
              className="border border-purple-400/50 bg-gradient-to-r from-purple-500/25 via-indigo-500/15 to-violet-500/25 px-6 py-4 rounded-full shadow-[0_15px_35px_rgba(168,85,247,0.25)] hover:border-purple-300 hover:scale-105 transition-all duration-300 backdrop-blur-xl"
            >
              <a
                href="https://linkedin.com/in/sdwirisanggalih"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-purple-100 hover:text-white tracking-wide font-medium"
              >
                <Globe className="h-4 w-4 text-purple-400 shrink-0" />
                <span>LinkedIn</span>
                <ExternalLink className="h-3.5 w-3.5 text-purple-300 shrink-0" />
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
