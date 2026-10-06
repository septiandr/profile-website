"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";

// Curated Editorial Words for Animated Kinetic Typography with Rich Agency Colors
const MAGAZINE_WORDS = [
  { text: "DIGITAL CRAFT", style: "bg-blue-600 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded shadow-md not-italic font-display font-black" },
  { text: "FINTECH ENGINES", style: "bg-emerald-600 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded shadow-md not-italic font-display font-black" },
  { text: "INTERACTIVE 3D", style: "bg-purple-600 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded shadow-md not-italic font-display font-black" },
  { text: "ENTERPRISE SAAS", style: "bg-orange-600 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded shadow-md not-italic font-display font-black" },
  { text: "MISSION-CRITICAL APPS", style: "bg-rose-600 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded shadow-md not-italic font-display font-black" },
];

export default function MagazineCoverHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // Animated Rotating Keyword State
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // Interactive Cursor Spotlight for Noir B&W -> Color Reveal
  const [cursorPos, setCursorPos] = useState({ x: 220, y: 280 });
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        ".mag-folio-line",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          ".mag-split-line",
          { y: "115%", opacity: 0 },
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
          ".mag-plate-frame",
          { opacity: 0, scale: 0.95, y: 35 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".mag-footer-folio",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );

      // Visceral OnScroll Kinetic Scrub (Noticeable parallax response)
      gsap.to(".mag-hero-headline", {
        y: -50,
        opacity: 0.75,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".mag-plate-frame", {
        y: 80,
        rotate: 1.8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".mag-deck", {
        y: -25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentWord = MAGAZINE_WORDS[activeWordIndex];

  return (
    <section
      id="mag-cover"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#faf9f6] text-zinc-950 font-sans border-b border-zinc-950/15 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-14 flex flex-col justify-between min-h-[calc(100vh-60px)]">
        
        {/* Top Folio Bar */}
        <div className="mag-folio-line border-b border-zinc-950/15 pb-3 flex items-center justify-between font-sans text-xs tracking-[0.16em] uppercase text-zinc-600 mb-8 sm:mb-12">
          <span className="font-semibold">MONOGRAPH NO. 04 · ESSAY 01</span>
          <span className="hidden sm:inline font-bold text-zinc-950">SEPTIAN RISANGGALIH · ARCHIVE</span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-bold text-[10px]">P. 01 / COVER STORY</span>
        </div>

        {/* Two-Page Feature Spread */}
        <div
          ref={contentRef}
          className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16 my-auto"
        >
          {/* Left Column: Lead Headline & Monograph Statement */}
          <div className="flex-1 w-full max-w-2xl xl:max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left">
            
            <div className="font-sans text-xs tracking-[0.14em] uppercase font-bold mb-4 flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>ENTERPRISE SOFTWARE ARCHITECTURE & DIGITAL CRAFT</span>
              </span>
            </div>

            {/* Massive Editorial Headline with Animated Flipping Colored Ribbon Badge */}
            <h1 className="mag-hero-headline font-display text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.4rem] font-black text-zinc-950 tracking-[-0.035em] leading-[0.92] mb-6 uppercase">
              <div className="overflow-hidden">
                <span className="mag-split-line block">
                  ARCHITECTING
                </span>
              </div>

              {/* Animated Rotating Colored Magazine Word */}
              <div className="overflow-hidden min-h-[1.35em] flex items-center justify-center lg:justify-start my-1 sm:my-2">
                <span
                  key={activeWordIndex}
                  className={`animate-flip-word inline-block ${currentWord.style}`}
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

            {/* Magazine Pull Quote with Electric Blue Accent Bar */}
            <p className="mag-deck font-serif text-lg sm:text-xl md:text-2xl text-zinc-800 italic font-normal leading-relaxed max-w-xl my-4 sm:my-6 border-l-4 border-blue-600 pl-4 sm:pl-5 text-left">
              “A disciplined synthesis of high-throughput software architecture, tactile interaction craft, and mission-critical engineering for enterprise flagships.”
            </p>

            {/* Monograph Narrative & Credentials */}
            <div className="mag-deck font-sans text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-xl mb-8 space-y-3 text-left">
              <p>
                Led by <strong className="text-zinc-950 font-bold">Septian Dwi Risanggalih</strong>, specializing in fintech transactional engines (CIMB Niaga Octo Clicks), live IoT charging ecosystems (Casion EV), and high-concurrency microservices.
              </p>
              <div className="font-sans text-xs tracking-wide flex flex-wrap items-center gap-2 pt-1">
                <span className="px-3 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded-full font-bold shadow-xs">
                  BINUS UNIVERSITY · GPA 3.56
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-950 border border-blue-200 rounded-full font-bold shadow-xs">
                  4+ YEARS LEADERSHIP
                </span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-950 border border-emerald-200 rounded-full font-bold shadow-xs">
                  10+ SHIPPED SYSTEMS
                </span>
              </div>
            </div>

            {/* Editorial Action Buttons */}
            <div className="mag-deck flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
              <button
                onClick={() => scrollTo("mag-works")}
                data-cursor-text="READ"
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-[0_10px_25px_rgba(37,99,235,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer rounded"
              >
                <span>Read Shipped Case Studies</span>
                <ArrowDown className="h-4 w-4" />
              </button>

              <button
                onClick={() => scrollTo("mag-colophon")}
                data-cursor-text="CONTACT"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-zinc-950 bg-white hover:bg-zinc-950 hover:text-white text-zinc-950 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer rounded"
              >
                <span>Commission The Studio</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Large Photographic Cover Plate */}
          <div className="mag-plate-frame relative shrink-0 flex flex-col items-center lg:items-end">
            <div className="relative p-3 sm:p-4 bg-white border border-zinc-950/20 shadow-[0_25px_60px_rgba(0,0,0,0.14)]">
              
              {/* Header plate label with colorful issue pill */}
              <div className="flex items-center justify-between pb-2.5 font-sans text-xs tracking-wider uppercase text-zinc-600 border-b border-zinc-200 mb-3 font-bold">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span>PLATE NO. 01.0</span>
                </span>
                <span className="px-2 py-0.5 bg-yellow-400 text-zinc-950 rounded text-[10px] font-black tracking-wider">
                  COVER STORY
                </span>
              </div>

              {/* Large Image Frame with Interactive Cursor Spotlight */}
              <div
                ref={photoRef}
                data-cursor-text="INSPECT"
                onMouseMove={handlePhotoMouseMove}
                onMouseEnter={() => setIsHoveringPhoto(true)}
                onMouseLeave={() => setIsHoveringPhoto(false)}
                onTouchMove={handlePhotoTouchMove}
                onTouchStart={() => setIsHoveringPhoto(true)}
                onTouchEnd={() => setIsHoveringPhoto(false)}
                className="relative w-64 sm:w-72 md:w-80 lg:w-88 xl:w-96 h-80 sm:h-96 md:h-[440px] lg:h-[480px] xl:h-[540px] overflow-hidden bg-zinc-950 cursor-crosshair group/photo rounded-xs"
              >
                {/* Base Image: Film Noir Monochromatic Tone */}
                <Image
                  src="/profile.jpg"
                  alt="Septian Dwi Risanggalih - Studio Director (Monograph Plate)"
                  fill
                  priority
                  sizes="(max-width: 768px) 320px, 440px"
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
                    sizes="(max-width: 768px) 320px, 440px"
                    className="object-cover object-top contrast-110 saturate-125 select-none pointer-events-none"
                  />
                </div>

                {/* Corner Registration Marks */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/80 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/80 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/80 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/80 pointer-events-none" />
              </div>

              {/* Caption Beneath the Image */}
              <div className="pt-3 font-sans text-xs text-zinc-600 uppercase tracking-wider flex items-center justify-between border-t border-zinc-200 mt-3 font-semibold">
                <span className="font-extrabold text-zinc-900">FIG. 01 — STUDIO DIRECTOR</span>
                <span className="text-zinc-500">JAKARTA, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Folio Index with Colorful Theme Indicators */}
        <div className="mag-footer-folio border-t border-zinc-950/15 pt-5 mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 font-sans text-xs tracking-wider uppercase text-zinc-700">
          <div className="border-l-2 border-emerald-500 pl-3">
            <span className="text-zinc-400 block text-[10px] font-bold tracking-wider">01 / FLAGSHIPS</span>
            <span className="font-extrabold text-zinc-950">CASION EV · OCTO CLICKS</span>
          </div>
          <div className="border-l-2 border-blue-500 pl-3">
            <span className="text-zinc-400 block text-[10px] font-bold tracking-wider">02 / DISCIPLINES</span>
            <span className="font-extrabold text-zinc-950">NEXT.JS · THREE.JS · GO</span>
          </div>
          <div className="border-l-2 border-purple-500 pl-3">
            <span className="text-zinc-400 block text-[10px] font-bold tracking-wider">03 / STANDARDS</span>
            <span className="font-extrabold text-zinc-950">99.9% SLA · PCI-DSS SECURITY</span>
          </div>
          <div className="border-l-2 border-rose-500 pl-3">
            <span className="text-zinc-400 block text-[10px] font-bold tracking-wider">04 / COMMISSIONS</span>
            <span className="font-extrabold text-emerald-600 flex items-center gap-1.5 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>OPEN FOR Q2/Q3 2026</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
