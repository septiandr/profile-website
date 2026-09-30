"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Award,
  Briefcase,
  MapPin,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Mail,
} from "lucide-react";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";

interface Stage01HeroProps {
  onEngineHover?: (hovered: boolean) => void;
}

export default function Stage01HeroPage({ onEngineHover }: Stage01HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrance animation when scrolling into Hero
      gsap.fromTo(
        ".hero-element",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // 2. Cinematic exit transition when scrolling to Experience
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: 1.2,
        },
        opacity: 0,
        y: -60,
        scale: 0.95,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="zone-hero"
      ref={containerRef}
      className="relative min-h-[180vh] w-full select-none"
    >
      {/* Sticky Fullscreen Frame for Discrete Page-like Experience */}
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-10 lg:px-12 py-16 sm:py-20 overflow-hidden">
        {/* Ambient Cosmic Halos for Color Vibrancy */}
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-3xl pointer-events-none"
        />

        {/* Main Stage: Hero Editorial Card with Large Portrait & Reserved 3D Robot Corridor */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-start justify-between z-20 pointer-events-auto gap-8">
          {/* Left Column: Hero Content with Photo and Credentials */}
          <div
            ref={contentRef}
            className="flex-1 w-full max-w-4xl text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Top Clearance Tag */}
            <div className="hero-element font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-300 font-semibold mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-ping" />
              <span className="bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-amber-400" />
                Page 02 · Lead Software Architect
              </span>
            </div>

            {/* High-Tech Holographic Hero Dossier Card */}
            <TiltSpotlightCard
              spotlightColor="rgba(245, 158, 11, 0.4)"
              borderColor="rgba(245, 158, 11, 0.75)"
              accentGlow="radial-gradient(circle at 30% 20%, rgba(245,158,11,0.25) 0%, rgba(6,182,212,0.18) 50%, rgba(168,85,247,0.15) 100%)"
              className="hero-element w-full border border-white/20 bg-gradient-to-b from-[#141b3a]/92 via-[#0c1228]/94 to-[#060815]/96 p-5 sm:p-8 rounded-3xl text-left shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-2xl bg-cyber-grid group overflow-hidden"
            >
              {/* Top Cyber Security Watermark Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.12] pb-3 mb-5 font-mono text-[10px] sm:text-[11px] text-zinc-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="tracking-widest text-amber-300 font-semibold uppercase">
                    CLEARANCE: LEVEL 04 LEAD ARCHITECT
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
                  <span className="tracking-wider">ONLINE · UTC+7 (JAKARTA)</span>
                </div>
              </div>

              {/* Responsive Hero Layout: Large Photo on Left, Information on Right */}
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 sm:gap-8">
                {/* Large Cybernetic Portrait Frame */}
                <div className="relative group/avatar w-60 sm:w-64 md:w-72 h-72 sm:h-80 md:h-[370px] shrink-0 rounded-2xl p-1 bg-gradient-to-b from-amber-400/80 via-cyan-400/60 to-purple-500/70 shadow-[0_0_35px_rgba(245,158,11,0.35),0_0_60px_rgba(6,182,212,0.2)]">
                  {/* Inner Image Container */}
                  <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-zinc-950">
                    <Image
                      src="/profile.jpg"
                      alt="Septian Dwi Risanggalih - Senior Frontend & Fullstack Software Engineer"
                      fill
                      priority
                      sizes="(max-width: 768px) 256px, 288px"
                      className="object-cover object-top contrast-110 brightness-105 group-hover/avatar:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* High-Tech Holographic Laser Scanline */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_#22d3ee] animate-scanline pointer-events-none z-10"
                    />

                    {/* Corner Target Reticles */}
                    <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-400 z-10 shadow-[0_0_8px_#f59e0b]" />
                    <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400 z-10 shadow-[0_0_8px_#f59e0b]" />
                    <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 z-10 shadow-[0_0_8px_#06b6d4]" />
                    <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 z-10 shadow-[0_0_8px_#06b6d4]" />

                    {/* Live Cam Watermark (Top Left) */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[9px] text-cyan-300 font-semibold tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
                      <span>REC ● LIVE</span>
                    </div>

                    {/* Biometric ID Badge (Bottom Overlay) */}
                    <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/95 via-black/75 to-transparent pt-10 pb-3 px-3 flex flex-col gap-0.5">
                      <div className="font-mono text-[9px] text-cyan-300/90 tracking-widest uppercase">
                        BIOMETRIC ID: SDR-7729 // VERIFIED
                      </div>
                      <div className="font-display text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
                        Septian Dwi Risanggalih
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Hero Information & Credentials */}
                <div className="flex-1 flex flex-col justify-between text-center md:text-left space-y-3.5">
                  <div>
                    {/* Full Name & Verification */}
                    <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight flex items-center justify-center md:justify-start gap-2 mb-1">
                      <span>Septian Dwi</span>
                      <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 via-amber-300 to-cyan-300 animate-shimmer">
                        Risanggalih
                      </span>
                      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400 shrink-0 drop-shadow-[0_0_8px_#f59e0b]" />
                    </div>

                    {/* Role Title */}
                    <div className="font-sans text-xs sm:text-sm font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 mb-2.5">
                      Senior Frontend & Fullstack Software Engineer
                    </div>

                    {/* Professional Narrative Statement */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-3.5">
                      Engineering high-concurrency enterprise web platforms, reactive micro-frontends, and luxury 3D interactive interfaces where rigorous architecture meets aesthetic excellence.
                    </p>

                    {/* Rich Glowing Credential Badges */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/50 text-cyan-200 text-[11px] font-medium tracking-wide shadow-[0_0_10px_rgba(6,182,212,0.2)] flex items-center gap-1.5">
                        <Briefcase className="h-3 w-3 text-cyan-400" />
                        CV TECHNOPARTNER INDONESIA
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-200 text-[11px] font-semibold tracking-wide shadow-[0_0_10px_rgba(245,158,11,0.2)] flex items-center gap-1.5">
                        <Award className="h-3 w-3 text-amber-400" />
                        BINUS UNIVERSITY (GPA 3.56)
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-200 text-[11px] font-medium tracking-wide shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-1.5">
                        <Terminal className="h-3 w-3 text-emerald-400" />
                        5+ YEARS PROD CRAFT
                      </span>
                    </div>

                    {/* Core Tech Stack Badges */}
                    <div className="flex items-center gap-1.5 mb-3 flex-wrap justify-center md:justify-start font-mono text-[10px] text-zinc-400">
                      <span className="text-zinc-500 uppercase tracking-widest font-semibold mr-1">
                        STACK:
                      </span>
                      {["Next.js 15", "React 19", "TypeScript", "Hono", "Golang", "Three.js", "PostgreSQL"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-zinc-200 hover:border-amber-400/50 hover:text-amber-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 4-Box Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-center">
                      <div className="font-display text-lg sm:text-xl font-black text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                        5+
                      </div>
                      <div className="font-mono text-[9px] text-zinc-400 tracking-wider uppercase mt-0.5">
                        Years Exp
                      </div>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-center">
                      <div className="font-display text-lg sm:text-xl font-black text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                        3.56
                      </div>
                      <div className="font-mono text-[9px] text-zinc-400 tracking-wider uppercase mt-0.5">
                        Binus GPA
                      </div>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-center">
                      <div className="font-display text-lg sm:text-xl font-black text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                        99.9%
                      </div>
                      <div className="font-mono text-[9px] text-zinc-400 tracking-wider uppercase mt-0.5">
                        Uptime SLA
                      </div>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-purple-500/10 border border-purple-400/30 text-center">
                      <div className="font-display text-lg sm:text-xl font-black text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                        10+
                      </div>
                      <div className="font-mono text-[9px] text-zinc-400 tracking-wider uppercase mt-0.5">
                        Core Systems
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                    <button
                      onClick={() => scrollToSection("zone-experience")}
                      onMouseEnter={() => onEngineHover?.(true)}
                      onMouseLeave={() => onEngineHover?.(false)}
                      className="group flex items-center gap-2.5 bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-orange-500/25 border border-amber-400/70 hover:border-amber-300 px-5 py-2.5 rounded-full font-sans text-xs tracking-[0.16em] uppercase text-white font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-all duration-300 backdrop-blur-xl"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] group-hover:scale-125 transition-transform" />
                      <span>Explore Experience</span>
                      <ArrowRight className="h-3.5 w-3.5 text-amber-300 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => scrollToSection("zone-skills")}
                      className="group flex items-center gap-2 border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-cyan-400/60 px-4 py-2.5 rounded-full font-sans text-xs tracking-[0.16em] uppercase text-zinc-200 hover:text-cyan-200 transition-all duration-300 backdrop-blur-xl"
                    >
                      <Layers className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Technical Arsenal</span>
                    </button>

                    <button
                      onClick={() => scrollToSection("zone-contact")}
                      className="group flex items-center gap-2 border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-purple-400/60 px-4 py-2.5 rounded-full font-sans text-xs tracking-[0.16em] uppercase text-zinc-200 hover:text-purple-200 transition-all duration-300 backdrop-blur-xl"
                    >
                      <Mail className="h-3.5 w-3.5 text-purple-400" />
                      <span>Contact</span>
                    </button>
                  </div>

                  {/* Bottom Live Availability Strip */}
                  <div className="pt-2 border-t border-white/[0.1] flex flex-col sm:flex-row items-center justify-between font-mono text-[9px] text-zinc-400 gap-1">
                    <span className="text-zinc-400">RESIDENCY: JAKARTA, ID</span>
                    <span className="text-amber-300 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                      AVAILABLE FOR SELECT SENIOR ROLES
                    </span>
                  </div>
                </div>
              </div>
            </TiltSpotlightCard>
          </div>

          {/* Right Column Spacer for 3D Robot Companion (Kept 280px - 360px clear on desktop) */}
          <div className="hidden lg:block w-[280px] xl:w-[360px] shrink-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
