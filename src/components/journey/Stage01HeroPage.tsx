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
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface Stage01HeroProps {
  onEngineHover?: (hovered: boolean) => void;
}

// 3 Flagship Shipped Products featured prominently in the Hero
const HERO_FEATURED_PRODUCTS = [
  {
    id: "casion",
    title: "Casion EV Charging Network",
    client: "CV Technopartner",
    category: "IOT MOBILITY ECOSYSTEM",
    metric: "99.8% Crash-Free",
    metricDetail: "Live Telemetry Protocol",
    stack: ["React Native", "IoT WebSockets", "Maps Navigation"],
    image: "/porto/casion.png",
    accentText: "text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50",
    glowColor: "rgba(16, 185, 129, 0.4)",
    borderColor: "border-emerald-400/40 hover:border-emerald-400/90",
    waypointTarget: "zone-experience",
  },
  {
    id: "octo",
    title: "CIMB Niaga Octo Clicks",
    client: "PT Infosys Solusi Terpadu",
    category: "ENTERPRISE FINTECH",
    metric: "PCI-DSS High-Security",
    metricDetail: "E-Debit Transaction Core",
    stack: ["React", "TypeScript", "Redux", "REST APIs"],
    image: "/porto/OC.jpg",
    accentText: "text-cyan-300",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-400/50",
    glowColor: "rgba(6, 182, 212, 0.4)",
    borderColor: "border-cyan-400/40 hover:border-cyan-400/90",
    waypointTarget: "zone-experience",
  },
  {
    id: "behave",
    title: "Behave.id Enterprise SaaS",
    client: "CV Technopartner",
    category: "LOYALTY REWARDS SAAS",
    metric: "Sub-Second Latency",
    metricDetail: "Atomic POS Redemption",
    stack: ["React", "Go Microservices", "Vite", "Tailwind"],
    image: "/milestones/behave-saas.svg",
    accentText: "text-purple-300",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-400/50",
    glowColor: "rgba(168, 85, 247, 0.4)",
    borderColor: "border-purple-400/40 hover:border-purple-400/90",
    waypointTarget: "zone-experience",
  },
];

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
          ".hero-product-card",
          { opacity: 0, x: 25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.5"
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
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-8 lg:px-12 py-8 sm:py-12 overflow-hidden">
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

        {/* Main Stage: Agency Command Console with Featured Products Deck */}
        <div
          ref={contentRef}
          className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between z-20 pointer-events-auto gap-8 lg:gap-10"
        >
          {/* LEFT & CENTER HERO CONTENT AREA */}
          <div className="flex-1 w-full max-w-5xl flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* 1. Top Agency Identity Bar (Bold & Prominent) */}
            <div className="hero-top-badge inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-400/15 via-[#0d1020]/95 to-[#070914]/98 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.18)] mb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981] animate-pulse" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.22em] uppercase text-zinc-200 font-extrabold">
                SEPTIAN STUDIO // DIGITAL PRODUCT & ENGINEERING AGENCY
              </span>
              <span className="text-zinc-600 font-mono hidden sm:inline">|</span>
              <span className="font-mono text-xs sm:text-sm tracking-wider uppercase text-amber-300 font-extrabold hidden sm:flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                SHIPPED PRODUCTION SYSTEMS
              </span>
            </div>

            {/* 2. Agency Core Statement Headline (Massive, Bold Agency Typography) */}
            <div className="mb-5 sm:mb-6">
              <div className="hero-headline-item font-mono text-xs sm:text-sm tracking-[0.3em] text-cyan-300 uppercase font-bold mb-2 flex items-center justify-center lg:justify-start gap-2">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span>Sector 02 · Flagship Digital Products & Scalable Architecture</span>
              </div>

              <h1 className="hero-headline-item font-display text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.2rem] font-black text-white uppercase tracking-tight leading-[0.96] mb-3">
                Engineering{" "}
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-amber-200 via-rose-300 to-cyan-300 drop-shadow-[0_0_40px_rgba(245,158,11,0.4)] animate-shimmer">
                  Digital Products
                </span>{" "}
                & Core Systems
              </h1>

              <div className="hero-headline-item font-sans text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-wide text-zinc-300 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5">
                <span className="text-zinc-400">Agency Directed by</span>
                <strong className="text-amber-300 font-extrabold text-base sm:text-lg md:text-xl">
                  Septian Dwi Risanggalih
                </strong>
                <span className="text-zinc-600 hidden sm:inline">·</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-amber-200 to-rose-300 font-bold">
                  Principal Software Architect & Studio Director
                </span>
              </div>
            </div>

            {/* 3. Center Split: Director Portrait (Left) + Featured Shipped Products Deck (Right) */}
            <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-6 sm:gap-8 mb-6">
              
              {/* Left Column: Studio Director Portrait with Interactive Cursor Colorizer */}
              <div className="hero-avatar-anchor relative group shrink-0 self-center lg:self-auto flex flex-col items-center">
                {/* Dual Celestial Animated Orbital Rings */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[34px] border border-dashed border-cyan-400/25 animate-spin-slow pointer-events-none scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[40px] border border-dotted border-amber-400/25 animate-spin-slow-rev pointer-events-none scale-110"
                />

                {/* Soft Glowing Aura Pulse */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-amber-500/25 via-cyan-500/20 to-purple-500/25 blur-2xl animate-pulse-aura pointer-events-none"
                />

                {/* Satellite Badge 1 (Top-Right): Binus GPA */}
                <div className="hero-satellite-badge absolute -top-3 -right-3 sm:-right-4 z-20 animate-float-badge-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d1020]/95 border border-amber-400/60 shadow-[0_10px_25px_rgba(0,0,0,0.85),0_0_15px_rgba(245,158,11,0.3)] backdrop-blur-xl">
                    <Award className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="font-sans text-[11px] sm:text-xs font-extrabold text-amber-200 tracking-wide">
                      BINUS · GPA 3.56
                    </span>
                  </div>
                </div>

                {/* Satellite Badge 2 (Bottom-Left): CV Technopartner */}
                <div className="hero-satellite-badge absolute -bottom-3 -left-3 sm:-left-4 z-20 animate-float-badge-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d1020]/95 border border-cyan-400/60 shadow-[0_10px_25px_rgba(0,0,0,0.85),0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-xl">
                    <Briefcase className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span className="font-sans text-[11px] sm:text-xs font-bold text-cyan-200 tracking-wide">
                      CV Technopartner
                    </span>
                  </div>
                </div>

                {/* Main Portrait Frame with Dynamic Cursor Colorizer */}
                <div
                  ref={photoRef}
                  onMouseMove={handlePhotoMouseMove}
                  onMouseEnter={() => setIsHoveringPhoto(true)}
                  onMouseLeave={() => setIsHoveringPhoto(false)}
                  onTouchMove={handlePhotoTouchMove}
                  onTouchStart={() => setIsHoveringPhoto(true)}
                  onTouchEnd={() => setIsHoveringPhoto(false)}
                  className="relative w-56 sm:w-64 lg:w-64 h-72 sm:h-80 lg:h-full min-h-[300px] lg:min-h-[350px] rounded-[28px] p-1 bg-gradient-to-b from-amber-400/60 via-cyan-400/40 to-purple-500/50 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.25)] overflow-hidden cursor-crosshair transition-transform duration-500 group-hover:scale-[1.01]"
                >
                  <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-zinc-950">
                    {/* Layer 1: Base Monochrome Noir */}
                    <Image
                      src="/profile.jpg"
                      alt="Septian Dwi Risanggalih - Studio Director (Noir)"
                      fill
                      priority
                      sizes="(max-width: 768px) 256px, 280px"
                      className="object-cover object-top contrast-125 brightness-95 filter grayscale select-none pointer-events-none"
                    />

                    {/* Layer 2: Vibrant Color Revealed by Cursor Lens Mask */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 select-none"
                      style={{
                        opacity: isHoveringPhoto ? 1 : 0,
                        maskImage: `radial-gradient(circle 115px at ${cursorPos.x}px ${cursorPos.y}px, black 35%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(circle 115px at ${cursorPos.x}px ${cursorPos.y}px, black 35%, transparent 100%)`,
                      }}
                    >
                      <Image
                        src="/profile.jpg"
                        alt="Septian Dwi Risanggalih - In Living Color"
                        fill
                        priority
                        sizes="(max-width: 768px) 256px, 280px"
                        className="object-cover object-top contrast-110 brightness-105 saturate-135 select-none"
                      />
                    </div>

                    {/* Layer 3: Interactive Spotlight Ring */}
                    {isHoveringPhoto && (
                      <div
                        className="absolute pointer-events-none rounded-full border border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.5),inset_0_0_12px_rgba(6,182,212,0.3)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
                        style={{
                          left: cursorPos.x,
                          top: cursorPos.y,
                          width: 120,
                          height: 120,
                        }}
                      />
                    )}

                    {/* Glass Specular Highlight Arc */}
                    <div className="absolute top-1 left-2 w-1/2 h-1/3 rounded-full bg-gradient-to-b from-white/30 via-white/10 to-transparent blur-[1px] -rotate-45 pointer-events-none" />

                    {/* Bottom Status Chip */}
                    <div className="absolute bottom-2.5 inset-x-2.5 z-10 flex items-center justify-between pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 border border-white/20 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-cyan-400 animate-pulse" />
                        <span className="font-mono text-[9px] sm:text-[10px] text-zinc-200 font-bold tracking-wider">
                          {isHoveringPhoto ? "COLOR LENS" : "HOVER TO COLORIZE"}
                        </span>
                      </div>
                      <div className="font-mono text-[9px] sm:text-[10px] text-amber-300 font-extrabold px-2.5 py-1 rounded bg-black/85 backdrop-blur-md border border-amber-400/40">
                        DIRECTOR
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: FEATURED SHIPPED PRODUCTS DECK (Products Front and Center) */}
              <div className="flex-1 w-full flex flex-col justify-between">
                
                {/* Section Header: Flagship Products Deck (Bigger & Bolder) */}
                <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-white/10">
                  <div className="font-mono text-xs sm:text-sm md:text-base text-amber-300 tracking-[0.2em] uppercase font-extrabold flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
                    <span>FEATURED PRODUCTS // SHIPPED SYSTEMS</span>
                  </div>
                  <button
                    onClick={() => scrollToSection("zone-experience")}
                    className="group inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-zinc-400 hover:text-cyan-300 transition-colors font-semibold"
                  >
                    <span>View All 9</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* 3 Interactive Product Cards with Bold Agency Typography */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 flex-1">
                  {HERO_FEATURED_PRODUCTS.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => scrollToSection("zone-experience")}
                      className={`hero-product-card group relative p-3.5 rounded-2xl border ${prod.borderColor} bg-gradient-to-b from-[#13172e]/90 via-[#0c1022]/95 to-[#060814]/98 shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer flex flex-col justify-between text-left`}
                    >
                      {/* Top Product Category & Client */}
                      <div>
                        <div className="flex items-center justify-between gap-1.5 mb-2.5">
                          <span className={`px-2.5 py-1 rounded-full border text-[10px] sm:text-xs font-mono font-extrabold tracking-wider uppercase ${prod.badgeColor}`}>
                            {prod.category}
                          </span>
                          <span className="font-mono text-[10px] sm:text-xs text-zinc-400 font-semibold">
                            {prod.client}
                          </span>
                        </div>

                        {/* Product Thumbnail with Subtle Zoom */}
                        <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden bg-zinc-950 mb-2.5 border border-white/10 group-hover:border-white/20 transition-colors">
                          <Image
                            src={prod.image}
                            alt={prod.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 240px"
                            className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                          <div className="absolute bottom-2 left-2.5 font-mono text-[9px] sm:text-[10px] text-white font-bold flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>LIVE IN PRODUCTION</span>
                          </div>
                        </div>

                        {/* Title (Prominent Bold Font) */}
                        <h4 className="font-display font-extrabold text-sm sm:text-base lg:text-lg text-white group-hover:text-amber-200 transition-colors line-clamp-1 mb-1.5">
                          {prod.title}
                        </h4>

                        {/* Metric Highlight */}
                        <div className="font-mono text-[11px] sm:text-xs text-zinc-300 font-semibold mb-2.5 flex items-center gap-1.5">
                          <span className={`font-bold ${prod.accentText}`}>{prod.metric}</span>
                          <span className="text-zinc-500">·</span>
                          <span className="text-zinc-300 text-[10px] sm:text-[11px] truncate">{prod.metricDetail}</span>
                        </div>
                      </div>

                      {/* Stack & Inspect Button */}
                      <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          {prod.stack.slice(0, 2).map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded bg-white/[0.06] text-zinc-200 font-mono text-[9px] sm:text-[10px] font-semibold truncate">
                              {s}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs text-amber-300 group-hover:translate-x-0.5 transition-transform font-bold">
                          <span>Inspect</span>
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Narrative Guarantee Line */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs sm:text-sm text-zinc-300 font-medium">
                  <span className="flex items-center gap-2 text-zinc-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    Rigorous architecture, reactive micro-frontends & zero-latency APIs
                  </span>
                  <span className="text-amber-300 font-bold hidden sm:inline tracking-wider">
                    ALL BUILDS LIVE IN PRODUCTION
                  </span>
                </div>

              </div>
            </div>

            {/* 4. Interactive 4-Card Animated Key Agency Metrics Grid (Bigger Numbers) */}
            <div
              ref={statsRef}
              className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 py-3 px-3.5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md mb-5"
            >
              {/* Metric 1: Experience */}
              <div className="hero-stat-card p-3 sm:p-4 rounded-xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-400/25 hover:border-amber-400/60 transition-all duration-300 text-center sm:text-left group">
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:scale-105 transition-transform leading-none">
                  {statExp}+
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-zinc-300 uppercase tracking-widest mt-1.5 font-bold">
                  Years Enterprise Craft
                </div>
              </div>

              {/* Metric 2: Binus GPA */}
              <div className="hero-stat-card p-3 sm:p-4 rounded-xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-400/25 hover:border-cyan-400/60 transition-all duration-300 text-center sm:text-left group">
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform leading-none">
                  {statGpa}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-zinc-300 uppercase tracking-widest mt-1.5 font-bold">
                  Binus CS Honors (3.56)
                </div>
              </div>

              {/* Metric 3: Uptime SLA */}
              <div className="hero-stat-card p-3 sm:p-4 rounded-xl bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-400/25 hover:border-emerald-400/60 transition-all duration-300 text-center sm:text-left group">
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-105 transition-transform leading-none">
                  {statSla}%
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-zinc-300 uppercase tracking-widest mt-1.5 font-bold">
                  Production SLA Uptime
                </div>
              </div>

              {/* Metric 4: Core Systems */}
              <div className="hero-stat-card p-3 sm:p-4 rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-400/25 hover:border-purple-400/60 transition-all duration-300 text-center sm:text-left group">
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform leading-none">
                  {statSys}+
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-zinc-300 uppercase tracking-widest mt-1.5 font-bold">
                  Shipped Core Systems
                </div>
              </div>
            </div>

            {/* 5. Primary Action Buttons (Bigger, Bolder CTA Buttons) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-1">
              <button
                onClick={() => scrollToSection("zone-experience")}
                onMouseEnter={() => onEngineHover?.(true)}
                onMouseLeave={() => onEngineHover?.(false)}
                className="hero-cta-btn group flex items-center gap-2.5 bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-orange-500/25 border border-amber-400/70 hover:border-amber-300 px-6 sm:px-8 py-3.5 rounded-full font-sans text-xs sm:text-sm tracking-[0.18em] uppercase text-white font-extrabold shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 transition-all duration-300 backdrop-blur-xl"
              >
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] group-hover:scale-125 transition-transform" />
                <span>Explore All 9 Product Dossiers</span>
                <ArrowRight className="h-4 w-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("zone-skills")}
                className="hero-cta-btn group flex items-center gap-2 border border-white/20 bg-white/[0.05] hover:bg-white/[0.1] hover:border-cyan-400/70 px-5 sm:px-6 py-3.5 rounded-full font-sans text-xs sm:text-sm tracking-[0.18em] uppercase text-zinc-100 hover:text-cyan-200 font-bold transition-all duration-300 backdrop-blur-xl hover:scale-105"
              >
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>Production Capability Engines</span>
              </button>

              <button
                onClick={() => scrollToSection("zone-contact")}
                className="hero-cta-btn group flex items-center gap-2 border border-white/20 bg-white/[0.05] hover:bg-white/[0.1] hover:border-purple-400/70 px-5 sm:px-6 py-3.5 rounded-full font-sans text-xs sm:text-sm tracking-[0.18em] uppercase text-zinc-100 hover:text-purple-200 font-bold transition-all duration-300 backdrop-blur-xl hover:scale-105"
              >
                <Mail className="h-4 w-4 text-purple-400" />
                <span>Commission Studio / Contact</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Corridor for 3D Companion Robot */}
          <div className="hidden lg:block w-[280px] xl:w-[340px] shrink-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
