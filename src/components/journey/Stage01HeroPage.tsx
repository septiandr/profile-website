"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Terminal,
  Award,
  Briefcase,
  Layers,
  Mail,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";

interface Stage01HeroProps {
  onEngineHover?: (hovered: boolean) => void;
}

export default function Stage01HeroPage({ onEngineHover }: Stage01HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // Interactive Cursor Spotlight for B&W -> Color Reveal
  const [cursorPos, setCursorPos] = useState({ x: 160, y: 200 });
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);

  // Animated Counter States
  const [statExp, setStatExp] = useState(0);
  const [statGpa, setStatGpa] = useState("0.00");
  const [statSla, setStatSla] = useState("0.0");
  const [statSys, setStatSys] = useState(0);

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHoveringPhoto(true);
  };

  const handlePhotoTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;
    const rect = photoRef.current.getBoundingClientRect();
    setCursorPos({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
    setIsHoveringPhoto(true);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Staggered Entrance Animation Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.fromTo(
        ".hero-top-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          ".hero-headline-item",
          { opacity: 0, y: 35, skewY: 1.5 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .fromTo(
          ".hero-avatar-anchor",
          { opacity: 0, scale: 0.88, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "back.out(1.5)" },
          "-=0.6"
        )
        .fromTo(
          ".hero-satellite-badge",
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(2.2)",
          },
          "-=0.5"
        )
        .fromTo(
          ".hero-bio-item",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-tech-pill",
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".hero-stat-card",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .fromTo(
          ".hero-cta-btn",
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // 2. Animated Counting Numbers for Key Metrics
      const counterTarget = { exp: 0, gpa: 0, sla: 0, sys: 0 };
      gsap.to(counterTarget, {
        exp: 5,
        gpa: 3.56,
        sla: 99.9,
        sys: 10,
        duration: 2.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          setStatExp(Math.floor(counterTarget.exp));
          setStatGpa(counterTarget.gpa.toFixed(2));
          setStatSla(counterTarget.sla.toFixed(1));
          setStatSys(Math.floor(counterTarget.sys));
        },
      });

      // 3. Cinematic Exit Transition when scrolling into Experience
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "70% top",
          end: "bottom top",
          scrub: 1.0,
        },
        opacity: 0,
        y: -60,
        scale: 0.96,
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
      className="relative min-h-[140vh] w-full select-none"
    >
      {/* Sticky Fullscreen Frame for Discrete Page-like Experience */}
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-10 lg:px-12 py-10 sm:py-14 overflow-hidden">
        {/* Ambient Cosmic Halos for Color Vibrancy */}
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent blur-3xl pointer-events-none -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-10 left-10 w-[550px] h-[550px] rounded-full bg-cyan-500/15 blur-3xl pointer-events-none -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-3xl pointer-events-none -z-10"
        />

        {/* Main Stage: Completely Unboxed, Animated High-Impact Editorial Command Center */}
        <div
          ref={contentRef}
          className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between z-20 pointer-events-auto gap-8 lg:gap-12"
        >
          {/* LEFT & CENTER HERO CONTENT AREA */}
          <div className="flex-1 w-full max-w-5xl flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* 1. Top Status & Clearance Pill */}
            <div className="hero-top-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-400/15 via-[#0d1020]/95 to-[#070914]/98 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.18)] mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-zinc-300">
                ONLINE · JAKARTA (UTC+7)
              </span>
              <span className="text-zinc-600 font-mono">|</span>
              <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-amber-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-amber-400" />
                AVAILABLE FOR SENIOR ROLES
              </span>
            </div>

            {/* 2. Grand Headline & Role (Commanding across top) */}
            <div className="mb-5 sm:mb-6">
              <div className="hero-headline-item font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-cyan-300 uppercase font-semibold mb-1 flex items-center justify-center lg:justify-start gap-2">
                <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                <span>Sector 02 · Lead Software Architect</span>
              </div>

              <h1 className="hero-headline-item font-display text-4xl sm:text-5xl lg:text-[3.8rem] font-black text-white uppercase tracking-tight leading-[0.98] mb-2">
                Septian Dwi{" "}
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-amber-200 via-rose-300 to-cyan-300 drop-shadow-[0_0_35px_rgba(245,158,11,0.35)] animate-shimmer">
                  Risanggalih
                </span>
              </h1>

              <div className="hero-headline-item font-sans text-sm sm:text-base md:text-lg font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300">
                Senior Frontend & Fullstack Software Engineer
              </div>
            </div>

            {/* 3. Center Section: Large Interactive Photo (Left) + Architectural Brief (Right) */}
            <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10 lg:gap-12 mb-6">
              {/* Left Column: Enlarged Portrait with Cursor Color Reveal */}
              <div className="hero-avatar-anchor relative group shrink-0 pt-2 pb-4 px-2">
                {/* Dual Celestial Animated Orbital Rings */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[38px] border border-dashed border-cyan-400/25 animate-spin-slow pointer-events-none scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[44px] border border-dotted border-amber-400/25 animate-spin-slow-rev pointer-events-none scale-110"
                />

                {/* Soft Glowing Aura Pulse */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[36px] bg-gradient-to-tr from-amber-500/25 via-cyan-500/20 to-purple-500/25 blur-2xl animate-pulse-aura pointer-events-none"
                />

                {/* Floating Satellite Badge 1 (Top-Left): 5+ Yrs Prod Craft */}
                <div className="hero-satellite-badge absolute -top-3 -left-3 sm:-left-5 z-20 animate-float-badge-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d1020]/95 border border-emerald-400/50 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(16,185,129,0.25)] backdrop-blur-xl">
                    <Zap className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-emerald-300">
                      5+ YRS PROD
                    </span>
                  </div>
                </div>

                {/* Floating Satellite Badge 2 (Top-Right): Binus GPA */}
                <div className="hero-satellite-badge absolute -top-3 -right-3 sm:-right-5 z-20 animate-float-badge-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d1020]/95 border border-amber-400/50 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(245,158,11,0.25)] backdrop-blur-xl">
                    <Award className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="font-sans text-[10px] sm:text-[11px] font-bold text-amber-200 tracking-wide">
                      BINUS · GPA 3.56
                    </span>
                  </div>
                </div>

                {/* Floating Satellite Badge 3 (Bottom-Left): CV Technopartner */}
                <div className="hero-satellite-badge absolute -bottom-3 -left-3 sm:-left-5 z-20 animate-float-badge-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d1020]/95 border border-cyan-400/50 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(6,182,212,0.25)] backdrop-blur-xl">
                    <Briefcase className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span className="font-sans text-[10px] sm:text-[11px] font-semibold text-cyan-200 tracking-wide">
                      CV Technopartner
                    </span>
                  </div>
                </div>

                {/* Main Enlarged Portrait Frame with Dynamic Cursor Colorizer */}
                <div
                  ref={photoRef}
                  onMouseMove={handlePhotoMouseMove}
                  onMouseEnter={() => setIsHoveringPhoto(true)}
                  onMouseLeave={() => setIsHoveringPhoto(false)}
                  onTouchMove={handlePhotoTouchMove}
                  onTouchStart={() => setIsHoveringPhoto(true)}
                  onTouchEnd={() => setIsHoveringPhoto(false)}
                  className="relative w-64 sm:w-72 md:w-80 lg:w-[320px] h-80 sm:h-92 md:h-[400px] lg:h-[420px] rounded-[32px] p-1.5 bg-gradient-to-b from-amber-400/60 via-cyan-400/40 to-purple-500/50 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.25)] overflow-hidden cursor-crosshair transition-transform duration-500 group-hover:scale-[1.02]"
                >
                  <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-zinc-950">
                    {/* Layer 1: Base Layer - High-Contrast Noir Black & White */}
                    <Image
                      src="/profile.jpg"
                      alt="Septian Dwi Risanggalih - Lead Software Architect (Monochrome)"
                      fill
                      priority
                      sizes="(max-width: 768px) 300px, 350px"
                      className="object-cover object-top contrast-125 brightness-95 filter grayscale select-none pointer-events-none"
                    />

                    {/* Layer 2: Top Layer - Vibrant Living Color Revealed by Cursor Spotlight Mask */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 select-none"
                      style={{
                        opacity: isHoveringPhoto ? 1 : 0,
                        maskImage: `radial-gradient(circle 125px at ${cursorPos.x}px ${cursorPos.y}px, black 35%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(circle 125px at ${cursorPos.x}px ${cursorPos.y}px, black 35%, transparent 100%)`,
                      }}
                    >
                      <Image
                        src="/profile.jpg"
                        alt="Septian Dwi Risanggalih - In Full Living Color"
                        fill
                        priority
                        sizes="(max-width: 768px) 300px, 350px"
                        className="object-cover object-top contrast-110 brightness-105 saturate-135 select-none"
                      />
                    </div>

                    {/* Layer 3: Interactive Spotlight Ring following Cursor */}
                    {isHoveringPhoto && (
                      <div
                        className="absolute pointer-events-none rounded-full border border-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.5),inset_0_0_15px_rgba(6,182,212,0.3)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
                        style={{
                          left: cursorPos.x,
                          top: cursorPos.y,
                          width: 130,
                          height: 130,
                        }}
                      />
                    )}

                    {/* Glass Specular Highlight Arc */}
                    <div className="absolute top-1 left-2 w-1/2 h-1/3 rounded-full bg-gradient-to-b from-white/30 via-white/10 to-transparent blur-[1px] -rotate-45 pointer-events-none" />

                    {/* Bottom Status Chip & Interactive Hint */}
                    <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 to-cyan-400 animate-pulse" />
                        <span className="font-mono text-[9px] text-zinc-300 font-semibold tracking-wider">
                          {isHoveringPhoto ? "COLOR LENS ACTIVE" : "CURSOR TO COLORIZE"}
                        </span>
                      </div>
                      <div className="font-mono text-[9px] text-amber-300 font-bold px-2 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/40 shadow-md">
                        SDR // ARCHITECT
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative Statement & Tech Arsenal */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left justify-center">
                {/* Narrative Statement */}
                <p className="hero-bio-item font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-xl mb-4">
                  Engineering high-concurrency enterprise web platforms, reactive
                  micro-frontends, and luxury 3D interactive interfaces where rigorous
                  architecture meets aesthetic excellence.
                </p>

                {/* Interactive Tech Arsenal Pills */}
                <div className="flex items-center gap-1.5 flex-wrap justify-center md:justify-start font-mono text-[10px] text-zinc-300 mb-5">
                  <span className="hero-tech-pill text-zinc-500 uppercase tracking-widest font-semibold mr-1 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-cyan-400" />
                    STACK:
                  </span>
                  {[
                    "Next.js 15",
                    "React 19",
                    "TypeScript",
                    "Golang",
                    "Hono",
                    "Three.js",
                    "PostgreSQL",
                    "Tailwind",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="hero-tech-pill px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-200 hover:border-amber-400/50 hover:text-amber-200 hover:bg-amber-500/10 hover:scale-105 transition-all duration-300 shadow-sm cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 4. Interactive 4-Card Animated Key Metrics Grid */}
                <div
                  ref={statsRef}
                  className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 py-3 px-3 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md mb-6"
                >
                  {/* Metric 1: Experience */}
                  <div className="hero-stat-card p-3 rounded-xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-400/25 hover:border-amber-400/60 transition-all duration-300 text-center sm:text-left group">
                    <div className="font-display text-2xl sm:text-3xl font-black text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)] group-hover:scale-105 transition-transform">
                      {statExp}+
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">
                      Years Craft
                    </div>
                  </div>

                  {/* Metric 2: Binus GPA */}
                  <div className="hero-stat-card p-3 rounded-xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-400/25 hover:border-cyan-400/60 transition-all duration-300 text-center sm:text-left group">
                    <div className="font-display text-2xl sm:text-3xl font-black text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform">
                      {statGpa}
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">
                      Binus GPA
                    </div>
                  </div>

                  {/* Metric 3: Uptime SLA */}
                  <div className="hero-stat-card p-3 rounded-xl bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-400/25 hover:border-emerald-400/60 transition-all duration-300 text-center sm:text-left group">
                    <div className="font-display text-2xl sm:text-3xl font-black text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] group-hover:scale-105 transition-transform">
                      {statSla}%
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">
                      Uptime SLA
                    </div>
                  </div>

                  {/* Metric 4: Core Systems */}
                  <div className="hero-stat-card p-3 rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-400/25 hover:border-purple-400/60 transition-all duration-300 text-center sm:text-left group">
                    <div className="font-display text-2xl sm:text-3xl font-black text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform">
                      {statSys}+
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">
                      Core Systems
                    </div>
                  </div>
                </div>

                {/* 5. Primary Action Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <button
                    onClick={() => scrollToSection("zone-experience")}
                    onMouseEnter={() => onEngineHover?.(true)}
                    onMouseLeave={() => onEngineHover?.(false)}
                    className="hero-cta-btn group flex items-center gap-2.5 bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-orange-500/25 border border-amber-400/70 hover:border-amber-300 px-6 py-3 rounded-full font-sans text-xs tracking-[0.18em] uppercase text-white font-bold shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 transition-all duration-300 backdrop-blur-xl"
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] group-hover:scale-125 transition-transform" />
                    <span>Explore Experience</span>
                    <ArrowRight className="h-4 w-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => scrollToSection("zone-skills")}
                    className="hero-cta-btn group flex items-center gap-2 border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-cyan-400/60 px-5 py-3 rounded-full font-sans text-xs tracking-[0.18em] uppercase text-zinc-200 hover:text-cyan-200 transition-all duration-300 backdrop-blur-xl hover:scale-105"
                  >
                    <Layers className="h-4 w-4 text-cyan-400" />
                    <span>Technical Arsenal</span>
                  </button>

                  <button
                    onClick={() => scrollToSection("zone-contact")}
                    className="hero-cta-btn group flex items-center gap-2 border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-purple-400/60 px-5 py-3 rounded-full font-sans text-xs tracking-[0.18em] uppercase text-zinc-200 hover:text-purple-200 transition-all duration-300 backdrop-blur-xl hover:scale-105"
                  >
                    <Mail className="h-4 w-4 text-purple-400" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Corridor for 3D Companion Robot */}
          <div className="hidden lg:block w-[300px] xl:w-[380px] shrink-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
