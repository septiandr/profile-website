"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";

interface Stage01HeroProps {
  onEngineHover?: (hovered: boolean) => void;
}

// Curated Editorial Words for Animated Kinetic Typography
const MAGAZINE_WORDS = [
  { text: "DIGITAL CRAFT", style: "font-serif italic font-normal text-zinc-950" },
  { text: "FINTECH ENGINES", style: "font-serif italic font-normal text-zinc-950" },
  { text: "INTERACTIVE 3D", style: "font-serif italic font-normal text-zinc-950" },
  { text: "ENTERPRISE SAAS", style: "font-serif italic font-normal text-zinc-950" },
  { text: "MISSION-CRITICAL APPS", style: "font-serif italic font-normal text-zinc-950" },
];

export default function Stage01HeroPage({ onEngineHover }: Stage01HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // Animated Rotating Keyword State
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // Interactive Cursor Spotlight for Noir B&W -> Color Reveal
  const [cursorPos, setCursorPos] = useState({ x: 210, y: 260 });
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);

  // Animate rotating magazine word every 2.4s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % MAGAZINE_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

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
      // 1. Editorial Staggered Entrance Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        ".mag-folio-bar",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          ".mag-split-line",
          { y: "120%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".mag-deck",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".mag-plate-container",
          { opacity: 0, scale: 0.94, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".mag-footer-folio",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );

      // 2. Cinematic Page-Turn Exit on Scroll
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "65% top",
          end: "bottom top",
          scrub: 1.2,
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

  const currentWord = MAGAZINE_WORDS[activeWordIndex];

  return (
    <section
      id="zone-hero"
      ref={containerRef}
      className="relative min-h-[140vh] w-full select-none bg-[#faf9f6] text-zinc-950 font-sans"
    >
      {/* Sticky Fullscreen Editorial Magazine Spread */}
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-between items-center px-6 sm:px-10 lg:px-16 py-6 sm:py-8 overflow-hidden bg-[#faf9f6]">
        
        {/* Subtle Paper Texture / Fine Editorial Grid Lines */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        />

        {/* 1. TOP EDITORIAL MASTHEAD / FOLIO BAR */}
        <div className="mag-folio-bar w-full max-w-7xl border-y border-zinc-900/15 py-2.5 px-2 flex flex-wrap items-center justify-between font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-zinc-600 z-20 pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="font-bold text-zinc-950">VOL. IV · NO. 2026</span>
            <span className="text-zinc-300 hidden sm:inline">|</span>
            <span className="hidden sm:inline">THE STUDIO MONOGRAPH</span>
          </div>

          <div className="font-bold text-zinc-950 tracking-[0.25em] text-center hidden md:block">
            SEPTIAN DWI RISANGGALIH — PRINCIPAL ARCHITECT
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-zinc-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              JAKARTA, ID
            </span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-500">P. 01 / COVER</span>
          </div>
        </div>

        {/* 2. MAIN EDITORIAL TWO-PAGE SPREAD (CLEAN, EXPANSIVE, NO CLUTTER) */}
        <div
          ref={contentRef}
          className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-start justify-between z-20 pointer-events-auto gap-8 sm:gap-12 lg:gap-16 my-auto pt-4 sm:pt-6"
        >
          {/* LEFT PAGE: Lead Headline & Monograph Statement */}
          <div className="flex-1 w-full max-w-2xl xl:max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Kicker / Article Category */}
            <div className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-zinc-500 font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-zinc-400 hidden lg:inline-block" />
              <span>FEATURE ESSAY 01 · PRODUCTION SOFTWARE ARCHITECTURE</span>
            </div>

            {/* Massive Magazine Headline with Animated Flipping Italic Serif Word */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.4rem] font-black text-zinc-950 tracking-[-0.035em] leading-[0.92] mb-5 uppercase">
              <div className="overflow-hidden">
                <span className="mag-split-line block">
                  ARCHITECTING
                </span>
              </div>

              {/* Animated Rotating Magazine Word (Kinetic Typography) */}
              <div className="overflow-hidden min-h-[1.25em] flex items-center justify-center lg:justify-start my-1 sm:my-1.5">
                <span
                  key={activeWordIndex}
                  className={`animate-flip-word block ${currentWord.style} underline decoration-zinc-900/30 decoration-2 underline-offset-8`}
                >
                  {currentWord.text}
                </span>
              </div>

              <div className="overflow-hidden">
                <span className="mag-split-line block text-zinc-900">
                  AT GLOBAL SCALE.
                </span>
              </div>
            </h1>

            {/* Magazine Deck / Pull Quote */}
            <p className="mag-deck font-serif text-lg sm:text-xl md:text-2xl text-zinc-700 italic font-normal leading-relaxed max-w-xl my-4 sm:my-5 border-l-2 border-zinc-950/20 pl-4 sm:pl-5 text-left">
              “A disciplined synthesis of high-throughput software architecture, tactile interaction craft, and mission-critical engineering for enterprise flagships.”
            </p>

            {/* Monograph Lead Paragraph & Author Credentials */}
            <div className="mag-deck font-sans text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-xl mb-7 space-y-2 text-left">
              <p>
                Led by <strong className="text-zinc-950 font-bold">Septian Dwi Risanggalih</strong>, specializing in fintech transactional engines (CIMB Niaga Octo Clicks), live IoT charging ecosystems (Casion EV), and high-concurrency microservices.
              </p>
              <div className="font-mono text-xs text-zinc-500 tracking-wider flex flex-wrap items-center gap-2 pt-1">
                <span className="text-zinc-900 font-semibold">BINUS UNIVERSITY · GPA 3.56</span>
                <span>·</span>
                <span>4+ YEARS PRODUCTION LEADERSHIP</span>
                <span>·</span>
                <span>10+ SHIPPED SYSTEMS</span>
              </div>
            </div>

            {/* Editorial Navigation & Commission Action */}
            <div className="mag-deck flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full pt-1">
              <button
                onClick={() => scrollToSection("zone-experience")}
                data-cursor-text="READ"
                onMouseEnter={() => onEngineHover?.(true)}
                onMouseLeave={() => onEngineHover?.(false)}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-950 text-white hover:bg-black font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] shadow-[0_10px_25px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Read Shipped Case Studies</span>
                <ArrowDown className="h-4 w-4 transform group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("zone-contact")}
                data-cursor-text="CONTACT"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-zinc-900/30 bg-white hover:bg-zinc-100 text-zinc-950 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Commission The Studio</span>
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT PAGE: The Large Editorial Photographic Plate (Big Image, Clean Framing) */}
          <div className="mag-plate-container relative shrink-0 flex flex-col items-center lg:items-end">
            
            {/* White Paper Frame with Fine Hairline Border */}
            <div className="relative p-3 sm:p-4 bg-white border border-zinc-900/20 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              
              {/* Corner Editorial Notation */}
              <div className="flex items-center justify-between pb-2.5 font-mono text-[10px] tracking-widest uppercase text-zinc-500 border-b border-zinc-200 mb-2.5">
                <span>PLATE NO. 01.0</span>
                <span>PORTRAIT MONOGRAPH</span>
              </div>

              {/* Main Large Photographic Image Frame */}
              <div
                ref={photoRef}
                data-cursor-text="INSPECT"
                onMouseMove={handlePhotoMouseMove}
                onMouseEnter={() => setIsHoveringPhoto(true)}
                onMouseLeave={() => setIsHoveringPhoto(false)}
                onTouchMove={handlePhotoTouchMove}
                onTouchStart={() => setIsHoveringPhoto(true)}
                onTouchEnd={() => setIsHoveringPhoto(false)}
                className="relative w-64 sm:w-72 md:w-80 lg:w-88 xl:w-96 h-80 sm:h-96 md:h-[420px] lg:h-[460px] xl:h-[510px] overflow-hidden bg-zinc-950 cursor-crosshair group/photo"
              >
                {/* Base Image: Film Noir Monochromatic Tone */}
                <Image
                  src="/profile.jpg"
                  alt="Septian Dwi Risanggalih - Studio Director (Monograph Plate)"
                  fill
                  priority
                  sizes="(max-width: 768px) 320px, 420px"
                  className="object-cover object-top contrast-125 brightness-95 filter grayscale select-none pointer-events-none transition-transform duration-700 ease-out group-hover/photo:scale-105"
                />

                {/* Layer 2: Vibrant Color Revealed by Cursor Spotlight Lens */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 select-none"
                  style={{
                    opacity: isHoveringPhoto ? 1 : 0.08,
                    maskImage: isHoveringPhoto
                      ? `radial-gradient(circle 140px at ${cursorPos.x}px ${cursorPos.y}px, black 35%, transparent 75%)`
                      : "none",
                    WebkitMaskImage: isHoveringPhoto
                      ? `radial-gradient(circle 140px at ${cursorPos.x}px ${cursorPos.y}px, black 35%, transparent 75%)`
                      : "none",
                  }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Septian Dwi Risanggalih - Studio Director (Color Spotlight)"
                    fill
                    sizes="(max-width: 768px) 320px, 420px"
                    className="object-cover object-top contrast-110 saturate-125 select-none pointer-events-none"
                  />
                </div>

                {/* Minimalist Optical Reticle Crosshairs */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/60 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/60 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/60 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/60 pointer-events-none" />
              </div>

              {/* Magazine Caption Beneath the Image */}
              <div className="pt-3 font-mono text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest flex items-center justify-between border-t border-zinc-200 mt-2.5">
                <span className="font-bold text-zinc-900">FIG. 01 — STUDIO DIRECTOR</span>
                <span>JAKARTA, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. FOOTER FOLIO / EDITORIAL INDEX ROW */}
        <div className="mag-footer-folio w-full max-w-7xl border-t border-zinc-900/15 pt-3 pb-1 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-zinc-600 z-20 pointer-events-auto">
          <div>
            <span className="text-zinc-400 block text-[9px] tracking-[0.2em]">01 / FLAGSHIPS</span>
            <span className="font-bold text-zinc-950">CASION EV · OCTO CLICKS</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[9px] tracking-[0.2em]">02 / DISCIPLINES</span>
            <span className="font-bold text-zinc-950">NEXT.JS · THREE.JS · GO</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[9px] tracking-[0.2em]">03 / STANDARDS</span>
            <span className="font-bold text-zinc-950">99.9% SLA · PCI-DSS SECURITY</span>
          </div>
          <div className="text-left md:text-right">
            <span className="text-zinc-400 block text-[9px] tracking-[0.2em]">04 / COMMISSIONS</span>
            <span className="font-bold text-emerald-600">● AVAILABLE FOR Q2/Q3 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
