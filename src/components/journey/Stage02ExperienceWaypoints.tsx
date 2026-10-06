"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE_WAYPOINTS, ExperienceWaypoint } from "@/journey/types";
import { Briefcase, Calendar, ChevronRight, Star, ArrowDown, X, Sparkles, Cpu } from "lucide-react";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";

const WAYPOINT_THEMES = [
  // 0: 2022 CIMB Niaga Digital Banking
  {
    themeColor: "cyan",
    badgeLabel: "FINTECH ENTERPRISE",
    telemetry: "HIGH-SECURITY E-DEBIT",
    bgGradient: "from-[#09253d]/85 via-[#061828]/90 to-[#020b14]/95",
    spotlight: "rgba(6, 182, 212, 0.45)",
    borderGlow: "rgba(6, 182, 212, 0.85)",
    accentText: "text-cyan-300",
    accentBg: "bg-cyan-400/20 border-cyan-400/50 text-cyan-200",
    tagStyle: "text-cyan-200 bg-cyan-950/50 border-cyan-700/50",
    topBeam: "via-cyan-400",
    ambientAura: "radial-gradient(circle, rgba(6,182,212,0.38) 0%, transparent 70%)",
  },
  // 1: 2023 Education / Luna Sinarmas
  {
    themeColor: "indigo",
    badgeLabel: "EDUTECH PLATFORM",
    telemetry: "LIVE LEARNING ENGINE",
    bgGradient: "from-[#141b4d]/85 via-[#0d1233]/90 to-[#06081a]/95",
    spotlight: "rgba(99, 102, 241, 0.45)",
    borderGlow: "rgba(99, 102, 241, 0.85)",
    accentText: "text-indigo-300",
    accentBg: "bg-indigo-400/20 border-indigo-400/50 text-indigo-200",
    tagStyle: "text-indigo-200 bg-indigo-950/50 border-indigo-700/50",
    topBeam: "via-indigo-400",
    ambientAura: "radial-gradient(circle, rgba(99,102,241,0.38) 0%, transparent 70%)",
  },
  // 2: 2024 Casion EV Charging IoT
  {
    themeColor: "emerald",
    badgeLabel: "IOT TELEMETRY",
    telemetry: "LIVE STATION PROTOCOL",
    bgGradient: "from-[#083024]/85 via-[#052119]/90 to-[#02100c]/95",
    spotlight: "rgba(16, 185, 129, 0.45)",
    borderGlow: "rgba(16, 185, 129, 0.85)",
    accentText: "text-emerald-300",
    accentBg: "bg-emerald-400/20 border-emerald-400/50 text-emerald-200",
    tagStyle: "text-emerald-200 bg-emerald-950/50 border-emerald-700/50",
    topBeam: "via-emerald-400",
    ambientAura: "radial-gradient(circle, rgba(16,185,129,0.38) 0%, transparent 70%)",
  },
  // 3: 2024 Loyalty & Rewards (DDT & Zu Point)
  {
    themeColor: "amber",
    badgeLabel: "MULTI-TIER REWARDS",
    telemetry: "ATOMIC REDEMPTION",
    bgGradient: "from-[#332209]/85 via-[#221605]/90 to-[#0d0802]/95",
    spotlight: "rgba(245, 158, 11, 0.45)",
    borderGlow: "rgba(245, 158, 11, 0.85)",
    accentText: "text-amber-300",
    accentBg: "bg-amber-400/20 border-amber-400/50 text-amber-200",
    tagStyle: "text-amber-200 bg-amber-950/50 border-amber-700/50",
    topBeam: "via-amber-400",
    ambientAura: "radial-gradient(circle, rgba(245,158,11,0.38) 0%, transparent 70%)",
  },
  // 4: 2024 Featured Behave.id
  {
    themeColor: "purple",
    badgeLabel: "FLAGSHIP WORK 01",
    telemetry: "ENTERPRISE LOYALTY SAAS",
    bgGradient: "from-[#32104d]/85 via-[#1f0931]/90 to-[#0c0314]/95",
    spotlight: "rgba(168, 85, 247, 0.5)",
    borderGlow: "rgba(168, 85, 247, 0.9)",
    accentText: "text-purple-300",
    accentBg: "bg-purple-400/25 border-purple-400/60 text-purple-200",
    tagStyle: "text-purple-200 bg-purple-950/50 border-purple-700/50",
    topBeam: "via-purple-400",
    ambientAura: "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 70%)",
  },
  // 5: 2025 Food Service Ecosystem
  {
    themeColor: "orange",
    badgeLabel: "WEBSOCKET STREAM",
    telemetry: "ZERO-LATENCY KITCHEN",
    bgGradient: "from-[#38160d]/85 via-[#250d08]/90 to-[#100503]/95",
    spotlight: "rgba(249, 115, 22, 0.45)",
    borderGlow: "rgba(249, 115, 22, 0.85)",
    accentText: "text-orange-300",
    accentBg: "bg-orange-400/20 border-orange-400/50 text-orange-200",
    tagStyle: "text-orange-200 bg-orange-950/50 border-orange-700/50",
    topBeam: "via-orange-400",
    ambientAura: "radial-gradient(circle, rgba(249,115,22,0.38) 0%, transparent 70%)",
  },
  // 6: 2025 Featured Shihlin
  {
    themeColor: "gold",
    badgeLabel: "FLAGSHIP WORK 02",
    telemetry: "OMNICHANNEL 99.99% UPSTREAM",
    bgGradient: "from-[#3d2709]/85 via-[#261805]/90 to-[#100a02]/95",
    spotlight: "rgba(251, 191, 36, 0.5)",
    borderGlow: "rgba(251, 191, 36, 0.9)",
    accentText: "text-amber-300",
    accentBg: "bg-amber-400/25 border-amber-400/60 text-amber-200",
    tagStyle: "text-amber-200 bg-amber-950/50 border-amber-700/50",
    topBeam: "via-amber-400",
    ambientAura: "radial-gradient(circle, rgba(251,191,36,0.45) 0%, transparent 70%)",
  },
  // 7: 2026 Golang Microservices
  {
    themeColor: "cyan",
    badgeLabel: "HIGH CONCURRENCY",
    telemetry: "GOLANG REST PIPELINE",
    bgGradient: "from-[#0a2736]/85 via-[#061923]/90 to-[#020b10]/95",
    spotlight: "rgba(6, 182, 212, 0.45)",
    borderGlow: "rgba(6, 182, 212, 0.85)",
    accentText: "text-cyan-300",
    accentBg: "bg-cyan-400/20 border-cyan-400/50 text-cyan-200",
    tagStyle: "text-cyan-200 bg-cyan-950/50 border-cyan-700/50",
    topBeam: "via-cyan-400",
    ambientAura: "radial-gradient(circle, rgba(6,182,212,0.38) 0%, transparent 70%)",
  },
  // 8: 2026 Featured Game Top-Up
  {
    themeColor: "emerald",
    badgeLabel: "FLAGSHIP WORK 03",
    telemetry: "AUTOMATED WHATSAPP BOT",
    bgGradient: "from-[#083327]/85 via-[#042018]/90 to-[#010e0a]/95",
    spotlight: "rgba(16, 185, 129, 0.5)",
    borderGlow: "rgba(16, 185, 129, 0.9)",
    accentText: "text-emerald-300",
    accentBg: "bg-emerald-400/25 border-emerald-400/60 text-emerald-200",
    tagStyle: "text-emerald-200 bg-emerald-950/50 border-emerald-700/50",
    topBeam: "via-emerald-400",
    ambientAura: "radial-gradient(circle, rgba(16,185,129,0.45) 0%, transparent 70%)",
  },
];

// Robust, aesthetic architectural fallback component for empty or broken images
function WaypointImage({
  src,
  alt,
  theme,
  year,
  domain,
  className = "",
}: {
  src?: string;
  alt: string;
  theme: (typeof WAYPOINT_THEMES)[number];
  year: string;
  domain: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  // If no source provided or failed to load, show a sophisticated architectural schematic fallback
  if (!src || hasError) {
    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#0c0f24] via-[#080a18] to-[#04050d] select-none overflow-hidden ${className}`}
      >
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 bg-cyber-grid opacity-35 pointer-events-none" />

        {/* Ambient Radial Center Glow */}
        <div
          className="absolute w-28 h-28 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ background: theme.spotlight }}
        />

        {/* Blueprint Circuit Lines */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-1.5">
          {/* Animated System Hologram Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg backdrop-blur-md"
            style={{
              borderColor: theme.borderGlow,
              backgroundColor: "rgba(0,0,0,0.6)",
              boxShadow: `0 0 20px ${theme.spotlight}`,
            }}
          >
            <Cpu className="w-5 h-5 text-amber-300" />
          </div>

          {/* Minimal Telemetry Label */}
          <div className="font-mono text-[9px] tracking-[0.2em] text-zinc-300 uppercase font-semibold flex items-center gap-1.5 mt-0.5">
            <span
              className="h-1.5 w-1.5 rounded-full animate-ping"
              style={{ backgroundColor: theme.borderGlow }}
            />
            <span>SYSTEM ARCHITECTURE // {year}</span>
          </div>

          <div className="font-sans text-[11px] text-zinc-400 font-light tracking-wider max-w-[220px] truncate">
            {domain}
          </div>
        </div>

        {/* Corner Reticle Brackets */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-amber-400/60" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-amber-400/60" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-amber-400/60" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-amber-400/60" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-black/60 flex items-center justify-center ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      {/* Corner Reticle Brackets */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-amber-400/70 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-amber-400/70 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-amber-400/70 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-amber-400/70 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

interface Stage02Props {
  activeWaypointIndex?: number;
  onModalOpenChange?: (isOpen: boolean) => void;
}

export default function Stage02ExperienceWaypoints({
  activeWaypointIndex: propActiveIndex,
  onModalOpenChange,
}: Stage02Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [internalIndex, setInternalIndex] = useState(0);
  const [selectedWaypoint, setSelectedWaypoint] = useState<ExperienceWaypoint | null>(null);
  const [isClosingModal, setIsClosingModal] = useState<boolean>(false);

  const activeIndex = propActiveIndex !== undefined ? propActiveIndex : internalIndex;
  const currentWaypoint = EXPERIENCE_WAYPOINTS[activeIndex] || EXPERIENCE_WAYPOINTS[0];

  const openModal = (wp: ExperienceWaypoint) => {
    setSelectedWaypoint(wp);
    setIsClosingModal(false);
    onModalOpenChange?.(true);
  };

  const closeModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setSelectedWaypoint(null);
      setIsClosingModal(false);
      onModalOpenChange?.(false);
    }, 280);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedWaypoint) {
        closeModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedWaypoint]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      const arena = arenaRef.current;
      if (!track || !container || !arena) return;

      // Calculate horizontal translation distance safely
      // Full track scrollable width minus visible arena container width + clearance for end boundary
      const getScrollAmount = () => {
        const overflow = track.scrollWidth - arena.clientWidth + 160;
        return overflow > 0 ? overflow : 0;
      };

      // Continuous 3D Cylindrical Perspective & Focus Dynamics:
      // Dynamically rotates, scales, and translates every card in real-time as it traverses the viewport
      const updateCardDynamics = (velocity = 0) => {
        const arenaRect = arena.getBoundingClientRect();
        const wrappers = track.querySelectorAll<HTMLElement>(".exp-card-wrapper");
        const targetSkew = gsap.utils.clamp(-5.0, 5.0, velocity / -240);

        wrappers.forEach((wrapper) => {
          const rect = wrapper.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const norm = (cardCenter - arenaRect.left) / arenaRect.width;

          // Focal center is around 0.44 (the left arena's visual focus point)
          const focusNorm = 0.44;
          const dist = norm - focusNorm;
          const absDist = Math.abs(dist);

          // 1. Dynamic continuous scale: focused card steps forward heroically (scale 1.04)
          const scale = Math.max(0.86, 1.04 - absDist * 0.22);

          // 2. Dynamic 3D Y-Axis Cylindrical Rotation: curves the cards towards the visitor
          const rotateY = gsap.utils.clamp(-14, 14, dist * -18);

          // 3. Fluid Sinusoidal Wave & Vertical Parallax: floats cards along an orbital curve
          const translateY = Math.sin(norm * Math.PI) * -14 + absDist * 16;

          // 4. Spatial 3D Depth (translateZ)
          const translateZ = Math.max(-80, (1 - absDist * 1.8) * 35);

          // 5. Smooth edge opacity falloff at extreme arena boundaries
          let opacity = 1;
          if (norm > 0.88) {
            opacity = Math.max(0.15, (1.12 - norm) / 0.24);
          } else if (norm < 0.12) {
            opacity = Math.max(0.12, (norm - (-0.08)) / 0.2);
          }

          gsap.set(wrapper, {
            opacity,
            scale,
            rotateY,
            y: translateY,
            z: translateZ,
            skewX: targetSkew,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          });
        });
      };

      // Horizontal pin with extended scroll travel ("buat semua scroll lebih pelan")
      // Multiplying getScrollAmount() by 1.8 makes the user experience 80% slower & smoother!
      ScrollTrigger.create({
        id: "exp-horizontal-pin",
        trigger: container,
        pin: true,
        start: "top top",
        end: () => `+=${Math.round(getScrollAmount() * 1.8)}`,
        scrub: 1.4, // Silky smooth deceleration lag
        invalidateOnRefresh: true,
        anticipatePin: 1,
        animation: gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
        }),
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * EXPERIENCE_WAYPOINTS.length),
            EXPERIENCE_WAYPOINTS.length - 1
          );
          setInternalIndex(idx);

          // Kinetic dynamic motion: velocity skew & floating sinusoidal wave
          const velocity = self.getVelocity();
          const wave = Math.sin(self.progress * Math.PI * 4) * 8;
          gsap.to(track, {
            y: wave,
            duration: 0.35,
            ease: "power1.out",
            overwrite: "auto",
          });

          // Dynamic entrance & exit animations for cards
          updateCardDynamics(velocity);
        },
      });

      // Initial card position setup
      updateCardDynamics(0);

      // Refresh ScrollTrigger calculations after initial mount and layout settlement
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        updateCardDynamics(0);
      }, 200);

      return () => clearTimeout(timer);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="zone-experience"
      ref={containerRef}
      className="relative h-screen w-full select-none bg-transparent overflow-hidden flex flex-col justify-between py-4 sm:py-6 lg:py-7 px-4 sm:px-8 lg:px-12 pointer-events-none"
    >
        {/* 1. Dedicated Floating Time / Era Widget Safely Positioned Below HUD */}
      <div className="absolute top-16 sm:top-20 right-6 sm:right-10 z-30 pointer-events-auto hidden sm:flex flex-col items-end">
        <div className="inline-flex items-center gap-2.5 border border-[#ccff00]/40 bg-gradient-to-r from-[#ccff00]/15 via-[#0d1020]/95 to-[#070914]/98 backdrop-blur-2xl px-4 py-2 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(204,255,0,0.2)]">
          <Calendar className="h-3.5 w-3.5 text-[#ccff00]" />
          <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
            {currentWaypoint.year}
          </span>
          <span className="h-2 w-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00] animate-pulse" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 tracking-[0.2em] uppercase mt-1.5 pr-1">
          <span className="text-[#00f0ff] font-semibold">
            CASE 0{activeIndex + 1}
          </span>
          <span className="text-zinc-600">/</span>
          <span>0{EXPERIENCE_WAYPOINTS.length}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">2022 — 2026</span>
        </div>
      </div>

      {/* 2. Environmental Header & Waypoint Selector */}
      <div className="z-20 text-center max-w-4xl mx-auto pt-0.5 pointer-events-auto">
        <div className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#00f0ff] font-bold mb-1.5 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
          <span>Sector 02 · Flagship Digital Products & Enterprise Case Studies</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-[-0.02em] uppercase leading-tight mb-2">
          SHIPPED{" "}
          <span className="relative inline-block px-3.5 py-0.5 mx-1 text-black font-black bg-[#ccff00] rounded-sm transform -rotate-1 shadow-[0_0_35px_rgba(204,255,0,0.45)]">
            CASE STUDIES
          </span>
        </h2>

        {/* Minimal Waypoint Navigation Pills */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-2.5 flex-wrap max-w-2xl mx-auto">
          {EXPERIENCE_WAYPOINTS.map((wp, idx) => {
            const isFeatured = wp.type === "featured-project";
            return (
              <button
                key={idx}
                onClick={() => {
                  setInternalIndex(idx);
                  const st = ScrollTrigger.getById("exp-horizontal-pin");
                  if (st) {
                    const progress = idx / (EXPERIENCE_WAYPOINTS.length - 1);
                    const targetY = st.start + progress * (st.end - st.start);
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                  }
                }}
                className={`group flex items-center gap-1.5 transition-all duration-300 py-0.5 px-2.5 rounded-full cursor-pointer border ${
                  activeIndex === idx
                    ? isFeatured
                      ? "border-amber-400 bg-amber-400/20 text-white font-bold scale-105 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                      : "border-amber-400/50 bg-amber-400/10 text-amber-200 font-semibold scale-105"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    activeIndex === idx
                      ? "w-3.5 bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                      : "w-1.5 bg-zinc-700 group-hover:bg-zinc-500"
                  }`}
                />
                <span className="font-sans text-[10px] sm:text-[11px] tracking-wider">
                  {isFeatured ? `★ ${wp.year}` : wp.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Stage: Two-Column Staging Layout */}
      <div className="flex items-center w-full my-auto overflow-hidden">
        {/* Left Arena: Horizontal Cards Track with strict overflow-hidden */}
        {/* As cards glide to the left, they remain bounded inside this arena and NEVER enter the robot's right margin! */}
        <div ref={arenaRef} className="flex-1 overflow-hidden pointer-events-auto h-full flex items-center py-2">
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 sm:gap-8 flex-nowrap will-change-transform py-3 pl-4 sm:pl-8 pr-16"
          >
            {EXPERIENCE_WAYPOINTS.map((wp, idx) => {
              const isActive = activeIndex === idx;
              const isFeatured = wp.type === "featured-project";
              const theme = WAYPOINT_THEMES[idx] || WAYPOINT_THEMES[0];

              return (
                <div
                  key={idx}
                  className="exp-card-wrapper shrink-0 will-change-transform h-full flex items-center"
                >
                  <TiltSpotlightCard
                    onClick={() => openModal(wp)}
                    data-cursor-text="EXPLORE"
                    spotlightColor={theme.spotlight}
                    borderColor={theme.borderGlow}
                    accentGlow={theme.ambientAura}
                    className={`exp-card group relative w-[390px] sm:w-[470px] md:w-[510px] lg:w-[550px] xl:w-[590px] h-[560px] sm:h-[590px] lg:h-[620px] xl:h-[650px] shrink-0 border rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 active:scale-95 bg-gradient-to-b ${
                      theme.bgGradient
                    } ${
                      isFeatured
                        ? isActive
                          ? "border-[#ccff00]/80 shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_40px_rgba(204,255,0,0.35)] ring-1 ring-[#ccff00]/40"
                          : "border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#ccff00]/60 hover:shadow-[0_25px_60px_rgba(204,255,0,0.25)]"
                        : isActive
                        ? "border-[#00f0ff]/80 shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.3)] ring-1 ring-[#00f0ff]/40"
                        : "border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-white/30"
                    } backdrop-blur-2xl bg-cyber-grid overflow-hidden cursor-pointer`}
                  >
                    {/* Subtle Top Animated Light Beam */}
                    <div
                      className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent ${theme.topBeam} to-transparent opacity-75 group-hover:opacity-100 group-hover:scale-x-110 transition-all duration-500`}
                    />

                    {/* Card Inner Top Block */}
                    <div>
                      {/* Card Header: Type Badge & Top-Right Time / Year Badge */}
                      <div className="flex items-center justify-between mb-2.5 border-b border-white/[0.08] pb-2.5">
                        <div className="flex items-center gap-2">
                          {isFeatured ? (
                            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-black px-3 py-1 rounded-full border border-[#ccff00]/60 bg-[#ccff00]/20 text-white shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                              <Star className="h-3.5 w-3.5 fill-[#ccff00] text-[#ccff00]" />
                              <span>{theme.badgeLabel}</span>
                            </div>
                          ) : (
                            <div className={`inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm ${theme.accentBg}`}>
                              <Sparkles className="h-3 w-3 text-[#00f0ff] animate-spin [animation-duration:8s]" />
                              <span>CASE · 0{idx + 1}</span>
                              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse ml-0.5" />
                            </div>
                          )}
                        </div>

                        {/* Time / Year Badge */}
                        <div className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-white bg-white/10 border border-white/20 px-3 py-0.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.1)]">
                          <Calendar className="h-3.5 w-3.5 text-[#ccff00]" />
                          <span>{wp.year}</span>
                        </div>
                      </div>

                      {/* 3D Floating Popup Image Showcase ("pastikan gambar besar") */}
                      <div
                        data-cursor-text="VIEW"
                        className="relative w-full h-44 sm:h-52 lg:h-56 xl:h-60 rounded-xl overflow-visible my-2.5 group/img select-none"
                      >
                        {/* Ambient Aura behind the image */}
                        <div
                          className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none"
                          style={{ background: theme.ambientAura }}
                        />

                        {/* 3D Pop-out Container */}
                        <div
                          className="relative w-full h-full rounded-xl overflow-hidden border border-white/20 bg-black/60 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.6)] transform-gpu transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:shadow-[0_25px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(204,255,0,0.25)] group-hover:border-[#ccff00]/60"
                          style={{
                            transformStyle: "preserve-3d",
                            transform: "translateZ(26px)",
                          }}
                        >
                          <WaypointImage
                            src={wp.image}
                            alt={wp.domain}
                            theme={theme}
                            year={wp.year}
                            domain={wp.domain}
                          />
                        </div>
                      </div>

                      {/* Live Telemetry Micro-Badge */}
                      <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-zinc-300 uppercase tracking-widest mb-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
                        <span className="font-bold text-[#00f0ff]">{theme.telemetry}</span>
                      </div>

                      {/* Domain Title with Gradient Hover */}
                      <h3
                        className="font-display font-black text-xl sm:text-2xl lg:text-[1.65rem] tracking-tight uppercase leading-tight mb-2 line-clamp-1 transition-colors text-white group-hover:text-[#ccff00]"
                      >
                        {wp.domain}
                      </h3>

                      {/* Role & Company */}
                      <div className="flex items-center gap-2 font-sans text-xs sm:text-sm text-zinc-300 font-normal mb-3">
                        <Briefcase className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span className="text-zinc-100 font-semibold">{wp.role}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-400 line-clamp-1">{wp.company}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-3 border-l-2 border-white/20 pl-3.5 bg-white/[0.02] py-1.5 rounded-r line-clamp-2 group-hover:border-amber-400/60 transition-colors">
                        {wp.description}
                      </p>

                      {/* Key Deliverables snippet for all cards */}
                      {wp.deliverables && wp.deliverables.length > 0 && (
                        <div className="mb-3 space-y-1.5 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06]">
                          {wp.deliverables.slice(0, 2).map((d, dIdx) => (
                            <div key={dIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                              <span className="text-amber-400 font-bold leading-none mt-0.5">›</span>
                              <span className="line-clamp-1 text-[11px] sm:text-xs text-zinc-200 font-light">{d}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Tags & Interactive Click Prompt */}
                    <div className="pt-3 border-t border-white/[0.08]">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {wp.tech.slice(0, 4).map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className={`font-sans text-xs tracking-wide px-3 py-0.5 rounded-md border ${theme.tagStyle}`}
                          >
                            {t}
                          </span>
                        ))}
                        {wp.tech.length > 4 && (
                          <span className="font-sans text-xs text-zinc-400 px-1 py-0.5">
                            +{wp.tech.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Click Indicator */}
                      <div className="flex items-center justify-between text-zinc-400 group-hover:text-[#ccff00] font-sans text-xs tracking-wider transition-colors pt-0.5">
                        <span className="group-hover:translate-x-1 transition-transform font-bold font-mono">EXPLORE DOSSIER</span>
                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform text-[#ccff00]" />
                      </div>
                    </div>
                  </TiltSpotlightCard>
                </div>
              );
            })}

            {/* 4. High-Tech Architectural End Boundary / Gate ("pembatas di bagian ujung nya") */}
            <div className="shrink-0 flex items-center gap-6 pl-4 pr-16 select-none">
              {/* Vertical Glowing Neon Delimiter Pillar */}
              <div className="relative h-[550px] sm:h-[580px] lg:h-[610px] xl:h-[640px] w-2.5 rounded-full bg-gradient-to-b from-transparent via-[#ccff00] to-transparent shadow-[0_0_25px_#ccff00,0_0_50px_rgba(204,255,0,0.6)] flex items-center justify-center">
                <div className="absolute h-16 w-4 rounded-full bg-white shadow-[0_0_20px_#ffffff] animate-pulse" />
              </div>

              {/* Terminal Checkpoint Card */}
              <TiltSpotlightCard
                spotlightColor="rgba(204, 255, 0, 0.35)"
                borderColor="rgba(204, 255, 0, 0.7)"
                accentGlow="radial-gradient(circle, rgba(204,255,0,0.25) 0%, transparent 70%)"
                className="w-[340px] sm:w-[400px] h-[550px] sm:h-[580px] lg:h-[610px] xl:h-[640px] border border-[#ccff00]/40 bg-gradient-to-b from-[#0e1406]/98 via-[#070b02]/98 to-[#030601]/98 backdrop-blur-2xl rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_35px_rgba(204,255,0,0.2)] bg-cyber-grid text-left"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-5">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-amber-400 uppercase tracking-[0.25em]">
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                      <span>TERMINAL BOUNDARY</span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500">GATEWAY 02</span>
                  </div>

                  <div className="font-mono text-xs text-amber-300/80 tracking-widest uppercase mb-1">
                    WAYPOINT HORIZON
                  </div>
                  <h3 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight mb-4">
                    Sector 02 <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-amber-300 to-amber-400">
                      Completed.
                    </span>
                  </h3>

                  <div className="space-y-3 font-mono text-xs text-zinc-400 border-l-2 border-amber-400/50 pl-3.5 py-1 mb-6">
                    <p className="text-zinc-200 font-light leading-relaxed">
                      All 09 enterprise milestones & featured works inspected.
                    </p>
                    <div className="text-[11px] text-amber-300 font-semibold">
                      Approaching Sector 03: Technical Arsenal
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2 font-mono text-[11px] text-zinc-400">
                    <div className="flex justify-between">
                      <span>STATUS:</span>
                      <span className="text-emerald-400 font-bold">ALL 09 VERIFIED</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TELEMETRY:</span>
                      <span className="text-zinc-200">100% TRAJECTORY</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DEPTH BUFFER:</span>
                      <span className="text-amber-400">3D POPUP ACTIVE</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.08]">
                  <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-200 font-mono text-xs tracking-wider uppercase animate-pulse">
                    <span>CONTINUE SCROLLING</span>
                    <ArrowDown className="h-3.5 w-3.5 text-amber-300" />
                  </div>
                </div>
              </TiltSpotlightCard>
            </div>
          </div>
        </div>

        {/* Dedicated Right Margin Space for 3D Robot (380px - 540px clear corridor on the right!) */}
        <div className="hidden md:block w-[380px] lg:w-[460px] xl:w-[540px] shrink-0 pointer-events-none" />
      </div>

      {/* 4. Footer Hint */}
      <div className="z-20 text-center font-sans text-[11px] sm:text-xs text-zinc-500 tracking-[0.2em] uppercase pb-0.5 pointer-events-auto">
        <span>Scroll vertically to glide through milestones & featured projects · Hover cards to inspect 3D layers</span>
      </div>

      {/* 5. Interactive Click Modal / Case Study Dossier (Restored to Clean Previous Layout) */}
      {selectedWaypoint && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#070814]/80 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${
            isClosingModal ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto border border-white/15 bg-gradient-to-b from-[#13172e] via-[#0d1022] to-[#070814] p-8 sm:p-10 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.15)] text-left transition-all duration-300 ease-out ${
              isClosingModal
                ? "scale-95 opacity-0 translate-y-4"
                : "scale-100 opacity-100 translate-y-0"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close dossier"
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-amber-400/60 text-zinc-400 hover:text-white transition-colors z-20"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 font-sans text-xs text-amber-300 font-medium mb-2 tracking-[0.2em] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              <span>
                {selectedWaypoint.type === "featured-project"
                  ? "Featured Production Work"
                  : "Career Milestone"}{" "}
                · {selectedWaypoint.year}
              </span>
            </div>

            <h3 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight uppercase mb-2">
              {selectedWaypoint.domain}
            </h3>

            <div className="font-sans text-sm text-zinc-300 font-normal mb-6 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-amber-400 shrink-0" />
              <span className="text-amber-200 font-medium">{selectedWaypoint.role}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">{selectedWaypoint.company}</span>
            </div>

            {/* High-Resolution System Architecture / Mockup Hero Banner with Fallback */}
            <div className="w-full h-44 sm:h-52 md:h-60 rounded-xl overflow-hidden border border-white/15 mb-6 bg-black/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
              <WaypointImage
                src={selectedWaypoint.image}
                alt={selectedWaypoint.domain}
                theme={WAYPOINT_THEMES[EXPERIENCE_WAYPOINTS.indexOf(selectedWaypoint)] || WAYPOINT_THEMES[0]}
                year={selectedWaypoint.year}
                domain={selectedWaypoint.domain}
              />
            </div>

            {/* Architectural Overview */}
            <div className="mb-6">
              <div className="font-sans text-xs text-zinc-400 uppercase tracking-[0.15em] mb-2 font-medium">
                Scope & Architectural Execution
              </div>
              <p className="text-sm sm:text-base text-zinc-200 font-light leading-relaxed border-l-2 border-amber-400/60 pl-4 py-1.5 bg-white/[0.02] rounded-r">
                {selectedWaypoint.description}
              </p>
            </div>

            {/* Key Deliverables if present */}
            {selectedWaypoint.deliverables && selectedWaypoint.deliverables.length > 0 && (
              <div className="mb-6">
                <div className="font-sans text-xs text-zinc-400 uppercase tracking-[0.15em] mb-2 font-medium">
                  Key Deliverables & Impact
                </div>
                <ul className="space-y-1.5">
                  {selectedWaypoint.deliverables.map((d, dIdx) => (
                    <li key={dIdx} className="text-xs sm:text-sm text-zinc-300 font-light flex items-start gap-2">
                      <span className="text-amber-400 font-bold">›</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Core Tech Engines */}
            <div className="mb-8">
              <div className="font-sans text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3 font-medium">
                Technologies Used
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedWaypoint.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="font-sans text-xs text-zinc-200 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Close Prompt */}
            <div className="pt-4 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={closeModal}
                className="border border-white/15 bg-white/[0.04] px-6 py-2.5 font-sans text-xs tracking-[0.18em] uppercase text-zinc-300 hover:border-amber-400/60 hover:text-white transition-all rounded-full"
              >
                Close Case
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
