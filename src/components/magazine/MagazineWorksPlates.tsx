"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Compass, Layers, ShieldCheck } from "lucide-react";
import { EXPERIENCE_WAYPOINTS, ExperienceWaypoint } from "@/journey/types";

interface PlateTheme {
  barColor: string;
  glowColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  btnBg: string;
  btnHover: string;
  btnShadow: string;
  bulletColor: string;
  pillBg: string;
  pillText: string;
  pillBorder: string;
  label: string;
}

function getPlateTheme(domain: string, company: string): PlateTheme {
  const d = (domain || "").toUpperCase();
  const c = (company || "").toUpperCase();

  if (d.includes("EV") || d.includes("CASION")) {
    return {
      barColor: "bg-emerald-500",
      glowColor: "rgba(16, 185, 129, 0.16)",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-950",
      badgeBorder: "border-emerald-300",
      btnBg: "bg-emerald-600",
      btnHover: "hover:bg-emerald-700",
      btnShadow: "shadow-[0_8px_25px_rgba(5,150,105,0.3)]",
      bulletColor: "text-emerald-600",
      pillBg: "bg-emerald-50",
      pillText: "text-emerald-900",
      pillBorder: "border-emerald-200",
      label: "IOT & EV MOBILITY",
    };
  }

  if (d.includes("BANKING") || d.includes("OCTO") || d.includes("FINANCE") || c.includes("INFOSYS")) {
    return {
      barColor: "bg-blue-600",
      glowColor: "rgba(37, 99, 235, 0.16)",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-950",
      badgeBorder: "border-blue-300",
      btnBg: "bg-blue-600",
      btnHover: "hover:bg-blue-700",
      btnShadow: "shadow-[0_8px_25px_rgba(37,99,235,0.3)]",
      bulletColor: "text-blue-600",
      pillBg: "bg-blue-50",
      pillText: "text-blue-900",
      pillBorder: "border-blue-200",
      label: "FINTECH & BANKING",
    };
  }

  if (d.includes("BEHAVE") || d.includes("LOYALTY") || d.includes("REWARDS")) {
    return {
      barColor: "bg-purple-600",
      glowColor: "rgba(147, 51, 234, 0.16)",
      badgeBg: "bg-purple-100",
      badgeText: "text-purple-950",
      badgeBorder: "border-purple-300",
      btnBg: "bg-purple-600",
      btnHover: "hover:bg-purple-700",
      btnShadow: "shadow-[0_8px_25px_rgba(124,58,237,0.3)]",
      bulletColor: "text-purple-600",
      pillBg: "bg-purple-50",
      pillText: "text-purple-900",
      pillBorder: "border-purple-200",
      label: "ENTERPRISE SAAS",
    };
  }

  if (d.includes("FOOD") || d.includes("SHIHLIN") || d.includes("STEAK")) {
    return {
      barColor: "bg-orange-500",
      glowColor: "rgba(249, 115, 22, 0.16)",
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-950",
      badgeBorder: "border-orange-300",
      btnBg: "bg-orange-600",
      btnHover: "hover:bg-orange-700",
      btnShadow: "shadow-[0_8px_25px_rgba(234,88,12,0.3)]",
      bulletColor: "text-orange-600",
      pillBg: "bg-orange-50",
      pillText: "text-orange-900",
      pillBorder: "border-orange-200",
      label: "OMNICHANNEL POS",
    };
  }

  if (d.includes("EDUCATION") || d.includes("LUNA") || c.includes("NATIEVA")) {
    return {
      barColor: "bg-rose-500",
      glowColor: "rgba(225, 29, 72, 0.16)",
      badgeBg: "bg-rose-100",
      badgeText: "text-rose-950",
      badgeBorder: "border-rose-300",
      btnBg: "bg-rose-600",
      btnHover: "hover:bg-rose-700",
      btnShadow: "shadow-[0_8px_25px_rgba(225,29,72,0.3)]",
      bulletColor: "text-rose-600",
      pillBg: "bg-rose-50",
      pillText: "text-rose-900",
      pillBorder: "border-rose-200",
      label: "EDTECH & ENTERPRISE",
    };
  }

  return {
    barColor: "bg-sky-500",
    glowColor: "rgba(2, 132, 199, 0.16)",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-950",
    badgeBorder: "border-sky-300",
    btnBg: "bg-sky-600",
    btnHover: "hover:bg-sky-700",
    btnShadow: "shadow-[0_8px_25px_rgba(2,132,199,0.3)]",
    bulletColor: "text-sky-600",
    pillBg: "bg-sky-50",
    pillText: "text-sky-900",
    pillBorder: "border-sky-200",
    label: "ENGINEERING PLATE",
  };
}

export default function MagazineWorksPlates() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const [activePlateIdx, setActivePlateIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const activePlateIdxRef = useRef<number>(0);

  const filteredWaypoints =
    filterType === "ALL"
      ? EXPERIENCE_WAYPOINTS
      : EXPERIENCE_WAYPOINTS.filter((wp) =>
          filterType === "FEATURED" ? wp.type === "featured-project" : true
        );

  const safeActiveIdx = Math.min(
    Math.max(0, activePlateIdx),
    Math.max(0, filteredWaypoints.length - 1)
  );
  const currentActiveWp = filteredWaypoints[safeActiveIdx] || filteredWaypoints[0];
  const currentTheme = currentActiveWp ? getPlateTheme(currentActiveWp.domain, currentActiveWp.company) : getPlateTheme("", "");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let rafId: number | null = null;
    let cardsCache: HTMLElement[] = [];

    const calculateActivePlate = () => {
      if (cardsCache.length === 0) {
        cardsCache = Array.from(document.querySelectorAll<HTMLElement>(".mag-works-plate-card"));
      }
      if (cardsCache.length === 0) return;

      const focalY = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDistance = Infinity;

      for (let idx = 0; idx < cardsCache.length; idx++) {
        const card = cardsCache[idx];
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.top - focalY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      }

      if (closestIdx !== activePlateIdxRef.current) {
        activePlateIdxRef.current = closestIdx;
        setActivePlateIdx(closestIdx);
      }
    };

    const updateActivePlate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        calculateActivePlate();
      });
    };

    const ctx = gsap.context(() => {
      // Continuous ScrollTrigger on Section 2 to track active focal card smoothly
      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onUpdate: updateActivePlate,
        });
      }

      const plateCards = gsap.utils.toArray<HTMLElement>(".mag-works-plate-card");

      plateCards.forEach((card) => {
        // Individual Plate Entrance & Internal Kinetic Reveals
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // Top accent bar sweep
        const accentBar = card.querySelector(".mag-card-accent-bar");
        if (accentBar) {
          tl.fromTo(
            accentBar,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power3.inOut" }
          );
        }

        // Folio top bar
        const folio = card.querySelector(".mag-card-folio");
        if (folio) {
          tl.fromTo(
            folio,
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
            "-=0.4"
          );
        }

        // Split headline words slide up
        const titleWords = card.querySelectorAll(".mag-card-title-word");
        if (titleWords.length > 0) {
          tl.fromTo(
            titleWords,
            { y: "115%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.6, stagger: 0.04, ease: "power4.out" },
            "-=0.3"
          );
        }

        // Quote
        const quote = card.querySelector(".mag-card-quote");
        if (quote) {
          tl.fromTo(
            quote,
            { x: -16, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
            "-=0.3"
          );
        }

        // Deliverables
        const deliverables = card.querySelectorAll(".mag-card-deliverable");
        if (deliverables.length > 0) {
          tl.fromTo(
            deliverables,
            { x: -12, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" },
            "-=0.25"
          );
        }

        // Tech chips pop
        const techChips = card.querySelectorAll(".mag-card-tech-chip");
        if (techChips.length > 0) {
          tl.fromTo(
            techChips,
            { scale: 0.65, opacity: 0, y: 8 },
            { scale: 1, opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "back.out(2)" },
            "-=0.2"
          );
        }
      });
    }, sectionRef);

    updateActivePlate();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [filterType, filteredWaypoints.length]);

  const scrollToCard = (index: number) => {
    const cards = document.querySelectorAll<HTMLElement>(".mag-works-plate-card");
    const targetCard = cards[index];
    if (!targetCard) return;

    activePlateIdxRef.current = index;
    setActivePlateIdx(index);

    const rect = targetCard.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = scrollTop + rect.top - 90;

    if (typeof window !== "undefined" && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetY, { duration: 1.0, immediate: false });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section
      id="mag-works"
      ref={sectionRef}
      className="relative w-full bg-[#faf9f6] text-zinc-950 font-sans border-b border-zinc-950/15 select-none"
    >
      {/* =========================================================================
          1. STATIONARY / PINNED BACKGROUND CANVAS (Does NOT scroll with cards)
             Houses all architectural technical blueprint ornaments, compass,
             giant watermark typography, corner brackets & chromatic ambient aura
         ========================================================================= */}
      <div
        aria-hidden="true"
        className="sticky top-0 left-0 w-full h-0 overflow-visible pointer-events-none z-0"
      >
        <div className="relative w-full h-screen overflow-hidden pointer-events-none">
          {/* A. Technical Drafting Millimeter Grid Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="arch-millimeter-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="rgba(9, 9, 11, 0.08)"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(9, 9, 11, 0.22)" />
              <path
                d="M 24 21 L 24 27 M 21 24 L 27 24"
                stroke="rgba(9, 9, 11, 0.12)"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-millimeter-grid)" />
        </svg>

        {/* B. Dynamic Chromatic Ambient Glow (Follows active plate theme color) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[900px] h-[720px] sm:h-[900px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ease-out"
          style={{
            backgroundColor: currentTheme.glowColor,
          }}
        />

        {/* C. Architectural Rotating Technical Compass Rose & Celestial Degree Arcs */}
        <div className="absolute top-1/2 right-4 sm:right-16 -translate-y-1/2 w-[380px] sm:w-[560px] h-[380px] sm:h-[560px] pointer-events-none opacity-45">
          <svg viewBox="0 0 500 500" className="w-full h-full animate-[spin_160s_linear_infinite]">
            <circle
              cx="250"
              cy="250"
              r="235"
              fill="none"
              stroke="rgba(9, 9, 11, 0.12)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <circle
              cx="250"
              cy="250"
              r="190"
              fill="none"
              stroke="rgba(9, 9, 11, 0.07)"
              strokeWidth="1"
            />
            <circle
              cx="250"
              cy="250"
              r="130"
              fill="none"
              stroke="rgba(9, 9, 11, 0.14)"
              strokeWidth="1.5"
            />
            <circle
              cx="250"
              cy="250"
              r="65"
              fill="none"
              stroke="rgba(9, 9, 11, 0.09)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            {/* Axis Crosshairs */}
            <line x1="250" y1="8" x2="250" y2="492" stroke="rgba(9, 9, 11, 0.1)" strokeWidth="1" />
            <line x1="8" y1="250" x2="492" y2="250" stroke="rgba(9, 9, 11, 0.1)" strokeWidth="1" />
            {/* Cardinal Degree Labels */}
            <text
              x="250"
              y="28"
              textAnchor="middle"
              fontSize="9"
              fill="rgba(9, 9, 11, 0.4)"
              fontFamily="sans-serif"
              fontWeight="900"
              letterSpacing="1"
            >
              000° NORTH
            </text>
            <text
              x="470"
              y="253"
              textAnchor="middle"
              fontSize="9"
              fill="rgba(9, 9, 11, 0.4)"
              fontFamily="sans-serif"
              fontWeight="900"
              letterSpacing="1"
            >
              090° EAST
            </text>
            <text
              x="250"
              y="480"
              textAnchor="middle"
              fontSize="9"
              fill="rgba(9, 9, 11, 0.4)"
              fontFamily="sans-serif"
              fontWeight="900"
              letterSpacing="1"
            >
              180° SOUTH
            </text>
            <text
              x="30"
              y="253"
              textAnchor="middle"
              fontSize="9"
              fill="rgba(9, 9, 11, 0.4)"
              fontFamily="sans-serif"
              fontWeight="900"
              letterSpacing="1"
            >
              270° WEST
            </text>
          </svg>
        </div>

        {/* D. Giant Editorial Watermark Numeral & Typography */}
        <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-14 pointer-events-none select-none">
          <div className="font-display font-black text-[10rem] sm:text-[16rem] md:text-[20rem] leading-none text-zinc-950/[0.04] tracking-tighter">
            0{safeActiveIdx + 1}
          </div>
          <div className="font-sans font-black text-[11px] sm:text-xs tracking-[0.26em] uppercase text-zinc-950/25 -mt-6 sm:-mt-10 pl-2 sm:pl-3 flex items-center gap-3">
            <span>ARCHITECTURAL DOSSIER</span>
            <span>·</span>
            <span className="font-extrabold text-zinc-950/40">
              {currentActiveWp?.company || "STUDIO ARCHIVE"}
            </span>
          </div>
        </div>

        {/* E. Four Architectural Corner Registration Marks & Telemetry Badges */}
        {/* Top Left */}
        <div className="absolute top-5 left-6 sm:top-8 sm:left-10 flex items-center gap-2.5 font-sans text-[10px] sm:text-[11px] tracking-[0.18em] text-zinc-500 font-bold uppercase">
          <div className="w-3.5 h-3.5 border-t-2 border-l-2 border-zinc-950/35" />
          <span>MONOGRAPH NO. 04 · EXHIBITION PLATES</span>
        </div>

        {/* Top Right */}
        <div className="absolute top-5 right-6 sm:top-8 sm:right-10 flex items-center gap-2.5 font-sans text-[10px] sm:text-[11px] tracking-[0.18em] text-zinc-500 font-bold uppercase">
          <span className="hidden sm:inline">JAKARTA // LAT -6.2088° S · LNG 106.8456° E</span>
          <div className="w-3.5 h-3.5 border-t-2 border-r-2 border-zinc-950/35" />
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-10 flex items-center gap-2.5 font-sans text-[10px] sm:text-[11px] tracking-[0.18em] text-zinc-500 font-bold uppercase">
          <div className="w-3.5 h-3.5 border-b-2 border-l-2 border-zinc-950/35" />
          <span>PRODUCTION INTEGRITY · 60FPS THREE.JS</span>
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-8 right-6 sm:bottom-12 sm:right-10 flex items-center gap-2.5 font-sans text-[10px] sm:text-[11px] tracking-[0.18em] text-zinc-500 font-bold uppercase">
          <span>PLATE 0{safeActiveIdx + 1} / 0{filteredWaypoints.length}</span>
          <div className="w-3.5 h-3.5 border-b-2 border-r-2 border-zinc-950/35" />
        </div>

        {/* F. Floating Vertical Plate Quick-Rail (Desktop right margin) */}
        <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-30 pointer-events-auto">
          {filteredWaypoints.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className="group flex items-center gap-2 cursor-pointer py-1 select-none"
              title={`Jump to Plate 0${i + 1}`}
            >
              <span
                className={`text-[10px] font-sans font-extrabold tracking-wider transition-all ${
                  safeActiveIdx === i ? "text-zinc-950 scale-110" : "text-zinc-400 group-hover:text-zinc-700"
                }`}
              >
                0{i + 1}
              </span>
              <div
                className={`w-1.5 transition-all duration-300 rounded-full ${
                  safeActiveIdx === i ? "h-6 bg-blue-600 shadow-xs" : "h-1.5 bg-zinc-300 group-hover:bg-zinc-500"
                }`}
              />
            </button>
          ))}
        </div>
        </div>
      </div>

      {/* =========================================================================
          2. FOREGROUND CARDS CONTAINER (Scrolls over the stationary background)
             Only the cards move through the viewport, stacking like architectural plates
         ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-16 sm:pt-24">
        
        {/* Section Header Monograph (Pinned or scrolling gracefully above the plates) */}
        <div className="border-b border-zinc-950/20 pb-8 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="font-sans text-xs sm:text-sm tracking-[0.16em] uppercase font-bold mb-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-full flex items-center gap-2 shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>SECTION 02 · SHIPPED DIGITAL PRODUCTS (2022 — 2026)</span>
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-zinc-950 tracking-tight uppercase leading-[0.95]">
                SELECTED WORKS & <br />
                <span className="font-serif italic font-normal text-zinc-800 underline decoration-blue-600 decoration-4 underline-offset-8">
                  ARCHITECTURAL PLATES
                </span>
              </h2>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-2 font-sans text-xs">
              <button
                onClick={() => setFilterType("ALL")}
                className={`px-4 py-2 rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterType === "ALL"
                    ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
                    : "bg-white text-zinc-700 border border-zinc-300 hover:border-zinc-950"
                }`}
              >
                ALL ARCHIVES ({EXPERIENCE_WAYPOINTS.length})
              </button>
              <button
                onClick={() => setFilterType("FEATURED")}
                className={`px-4 py-2 rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterType === "FEATURED"
                    ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
                    : "bg-white text-zinc-700 border border-zinc-300 hover:border-zinc-950"
                }`}
              >
                FLAGSHIP CASES
              </button>
            </div>
          </div>
        </div>

        {/* Stacking Architectural Plates Deck
            Each card docks with sticky positioning; previous cards stay anchored
            and peek out like architectural folder tabs */}
        <div className="space-y-[40vh] sm:space-y-[45vh] pb-[35vh]">
          {filteredWaypoints.map((wp, idx) => {
            const isEven = idx % 2 === 0;
            const theme = getPlateTheme(wp.domain, wp.company);
            const topOffsetPx = 80 + idx * 14;

            return (
              <article
                key={idx}
                style={{
                  top: `${topOffsetPx}px`,
                  zIndex: 10 + idx * 10,
                }}
                className="mag-works-plate-card sticky group border border-zinc-950/20 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.14)] transition-shadow duration-500 overflow-hidden rounded-sm will-change-transform max-w-6xl mx-auto"
              >
                {/* Top Chromatic Color Accent Bar (Visible tab when stacked!) */}
                <div className={`mag-card-accent-bar h-2.5 w-full origin-left ${theme.barColor}`} />

                <div className="p-6 sm:p-10">
                  {/* Plate Folio Top Bar */}
                  <div className="mag-card-folio flex items-center justify-between border-b border-zinc-200 pb-4 mb-6 sm:mb-8 font-sans text-xs tracking-wider uppercase text-zinc-600">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-zinc-950">PLATE 0{idx + 1}.0</span>
                      <span className="text-zinc-300">/</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} font-bold text-[10px]`}
                      >
                        {theme.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-semibold text-xs sm:text-sm">
                      <span>{wp.year}</span>
                      <span className="text-zinc-300">·</span>
                      <span className="font-extrabold text-zinc-950 break-words">{wp.company}</span>
                    </div>
                  </div>

                  {/* Editorial Layout: Clean Monograph Spread */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Role, Headline, Editorial Quote & Tech Stack */}
                    <div className="lg:col-span-7 space-y-5 min-w-0">
                      <div className="space-y-2">
                        <div className="font-sans text-xs text-zinc-500 tracking-wider uppercase font-bold flex items-center gap-2 break-words">
                          <span className={`h-2 w-2 rounded-full ${theme.barColor} shrink-0`} />
                          <span className="break-words">{wp.role}</span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-5xl font-black text-zinc-950 uppercase tracking-tight leading-[1.05] break-words">
                          {wp.domain.split(" ").map((word, wIdx) => (
                            <span key={wIdx} className="overflow-hidden inline-block mr-2 max-w-full align-top">
                              <span className="mag-card-title-word inline-block break-words">{word}</span>
                            </span>
                          ))}
                        </h3>
                      </div>

                      <p className="mag-card-quote font-serif text-lg sm:text-xl text-zinc-800 italic font-normal leading-relaxed border-l-4 border-zinc-950 pl-4 py-0.5">
                        “{wp.description}”
                      </p>

                      {/* Tech Stack Chips */}
                      <div className="pt-2">
                        <div className="font-sans text-[10px] uppercase font-extrabold tracking-widest text-zinc-400 mb-2">
                          TECHNOLOGY STACK
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {wp.tech.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className={`mag-card-tech-chip font-sans text-xs px-3 py-1 ${theme.pillBg} border ${theme.pillBorder} ${theme.pillText} font-bold uppercase rounded-sm shadow-2xs`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Key Deliverables & Architecture Verification */}
                    <div className="lg:col-span-5 bg-zinc-50/80 border border-zinc-200/90 rounded-sm p-6 sm:p-7 space-y-5">
                      <div>
                        <div className="font-sans text-[10px] uppercase font-extrabold tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
                          <Layers className="h-3.5 w-3.5 text-zinc-600" />
                          <span>KEY PRODUCTION DELIVERABLES</span>
                        </div>
                        {wp.deliverables && wp.deliverables.length > 0 && (
                          <div className="space-y-3">
                            {wp.deliverables.map((d, dIdx) => (
                              <div
                                key={dIdx}
                                className="mag-card-deliverable flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 font-normal leading-relaxed"
                              >
                                <CheckCircle2 className={`h-4 w-4 ${theme.bulletColor} shrink-0 mt-0.5`} />
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Architecture Verification Badge */}
                      <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded text-xs font-sans font-bold text-zinc-800 shadow-2xs">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>PRODUCTION SHIPPED</span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-zinc-500 uppercase">
                          VERIFIED SLA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
