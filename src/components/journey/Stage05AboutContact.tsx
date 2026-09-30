"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Mail, Globe, ExternalLink, ArrowUpRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { profileData } from "@/data/profile";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";

export default function Stage05AboutContact() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      {/* SCENE 13: ABOUT (HOLOGRAPHIC DOSSIER WITH ROBOT COMPANION ON RIGHT) */}
      <section
        id="zone-about"
        className="relative min-h-[120vh] w-full px-6 sm:px-12 py-28 sm:py-36 flex items-center justify-center select-none"
      >
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between z-20 pointer-events-auto">
          {/* Left Editorial Dossier */}
          <div className="flex-1 w-full max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-300/90 font-medium mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping" />
              <span>The Engineer · Philosophy & Background</span>
            </div>

            <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase mb-4">
              Architectural{" "}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-amber-200 to-amber-400 animate-shimmer">
                Mindset
              </span>
            </h2>

            <p className="font-sans text-base sm:text-xl text-zinc-300 font-light leading-relaxed mb-8 max-w-xl">
              Crafting performant digital experiences where engineering rigor meets refined visual craft.
            </p>

            {/* High-Tech Holographic Personnel Dossier Card */}
            <TiltSpotlightCard
              spotlightColor="rgba(245, 158, 11, 0.35)"
              borderColor="rgba(245, 158, 11, 0.6)"
              accentGlow="radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(168,85,247,0.15) 100%)"
              className="w-full border border-white/15 bg-gradient-to-b from-[#13172e]/98 via-[#0c1024]/98 to-[#060814]/98 p-6 sm:p-8 rounded-2xl text-left shadow-[0_25px_65px_rgba(0,0,0,0.9)] backdrop-blur-2xl bg-cyber-grid group overflow-hidden"
            >
              {/* Top Cyber Security Watermark */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-5 font-mono text-[10px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  <span className="tracking-widest text-amber-300 uppercase">CLEARANCE: LEVEL 04 LEAD ENGINEER</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                  <span>ONLINE · UTC+7</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Avatar with Futuristic Laser Scanline Animation */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-amber-400/50 bg-zinc-950 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                  <Image
                    src="/profile.jpg"
                    alt="Septian Dwi Risanggalih"
                    fill
                    className="object-cover contrast-110 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Holographic Vertical Laser Scanline */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] animate-scanline pointer-events-none"
                  />
                  {/* Corner Target Markers */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-amber-400" />
                  <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-amber-400" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-amber-400" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-amber-400" />
                </div>

                {/* Profile Identity & Credentials */}
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wider flex items-center justify-center sm:justify-start gap-2">
                    <span>Septian Dwi Risanggalih</span>
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  </div>
                  <div className="font-sans text-xs sm:text-sm text-amber-300 font-semibold tracking-wide">
                    Senior Frontend & Fullstack Software Engineer
                  </div>
                  <div className="font-sans text-[11px] text-zinc-300 pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-300">
                      CV TECHNOPARTNER INDONESIA
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 font-medium">
                      ★ BINUS UNIVERSITY (GPA 3.56)
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Live Availability Strip */}
              <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[10px] text-zinc-400">
                <span className="text-zinc-500">RESIDENCY: JAKARTA, ID</span>
                <span className="text-amber-300/90 font-semibold tracking-wider uppercase">
                  OPEN FOR SELECT SENIOR ROLES
                </span>
              </div>
            </TiltSpotlightCard>
          </div>

          {/* Right Column Spacer for 3D Robot (280px - 360px clear area on the right!) */}
          <div className="hidden lg:block w-[280px] xl:w-[360px] shrink-0 pointer-events-none" />
        </div>
      </section>

      {/* SCENE 14: CONTACT (CALM CONCLUSION & CELEBRATION) */}
      <section
        id="zone-contact"
        className="relative min-h-[120vh] w-full px-6 py-24 sm:py-28 flex flex-col justify-between items-center text-center select-none overflow-hidden"
      >
        {/* Ambient Cosmic Background Glow Pods */}
        <div aria-hidden="true" className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none -z-10" />
        <div aria-hidden="true" className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none -z-10" />

        {/* Top Section: Invitation with Shimmering Gradient */}
        <div className="text-center max-w-3xl mx-auto z-20 pointer-events-auto">
          <div className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-300/90 font-medium mb-3 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping" />
            <span>Inquiries · Collaboration · Opportunities</span>
          </div>

          <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.0] mb-3">
            Let&apos;s Build{" "}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-amber-200 via-rose-200 to-amber-400 animate-shimmer">
              Something
            </span>{" "}
            Exceptional.
          </h2>

          <div className="font-sans text-xs sm:text-sm text-zinc-400 tracking-[0.2em] uppercase font-light">
            Available for select senior engineering, architectural consulting & contract roles
          </div>
        </div>

        {/* Clear Center Stage for 3D Dancing Robot */}
        <div className="flex-1 w-full min-h-[160px] pointer-events-none" />

        {/* Bottom Action Links with 3D Tilt & Magnetic Holographic Glow */}
        <div className="z-20 pointer-events-auto flex flex-col items-center gap-8 pb-4 w-full max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-sans text-xs sm:text-sm">
            {/* Email Pod */}
            <TiltSpotlightCard
              spotlightColor="rgba(245, 158, 11, 0.4)"
              borderColor="rgba(245, 158, 11, 0.7)"
              className="border border-amber-400/40 bg-gradient-to-r from-amber-400/20 via-amber-400/10 to-transparent px-7 py-4 rounded-full shadow-[0_15px_35px_rgba(245,158,11,0.2)] hover:border-amber-400 transition-all duration-300 backdrop-blur-xl"
            >
              <a
                href={`mailto:${profileData.personalInfo.email}`}
                className="flex items-center gap-3 text-amber-200 hover:text-white font-medium tracking-wide"
              >
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>{profileData.personalInfo.email}</span>
                <ArrowUpRight className="h-4 w-4 text-amber-300 shrink-0" />
              </a>
            </TiltSpotlightCard>

            {/* GitHub Pod */}
            <TiltSpotlightCard
              spotlightColor="rgba(6, 182, 212, 0.35)"
              borderColor="rgba(6, 182, 212, 0.65)"
              className="border border-white/15 bg-white/[0.05] px-6 py-4 rounded-full shadow-lg hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-xl"
            >
              <a
                href="https://github.com/sdwirisanggalih"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-zinc-200 hover:text-cyan-300 tracking-wide font-medium"
              >
                <Globe className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>GitHub</span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              </a>
            </TiltSpotlightCard>

            {/* LinkedIn Pod */}
            <TiltSpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.35)"
              borderColor="rgba(168, 85, 247, 0.65)"
              className="border border-white/15 bg-white/[0.05] px-6 py-4 rounded-full shadow-lg hover:border-purple-400/60 transition-all duration-300 backdrop-blur-xl"
            >
              <a
                href="https://linkedin.com/in/sdwirisanggalih"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-zinc-200 hover:text-purple-300 tracking-wide font-medium"
              >
                <Globe className="h-4 w-4 text-purple-400 shrink-0" />
                <span>LinkedIn</span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              </a>
            </TiltSpotlightCard>
          </div>

          <div className="font-sans text-[11px] text-zinc-500 tracking-[0.25em] uppercase">
            Interactive Portfolio · Engineered with Next.js & Three.js
          </div>
        </div>
      </section>
    </div>
  );
}

