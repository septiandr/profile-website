"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Bot, Sparkles } from "lucide-react";

interface Stage01Props {
  onEngineHover?: (hovered: boolean) => void;
  onEnterJourney?: () => void;
}

export default function Stage01VoidIntro({
  onEngineHover,
  onEnterJourney,
}: Stage01Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Dramatic Reveal Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".void-tag", {
        opacity: 0,
        y: -15,
        duration: 1.2,
        delay: 0.2,
      })
        .from(
          ".kinetic-text-line",
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 1.3,
          },
          "-=0.8"
        )
        .from(
          ".void-sub",
          {
            opacity: 0,
            y: 18,
            duration: 1.0,
          },
          "-=0.7"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            scale: 0.94,
            duration: 0.9,
          },
          "-=0.5"
        );

      // 2. Cinematic Page-Turn Exit Transition on Scroll
      // "ketika scroll seperti pindah halaman"
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1.0,
        },
        opacity: 0,
        y: -90,
        scale: 0.92,
        ease: "power2.inOut",
      });

      gsap.to(ctaRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "45% top",
          scrub: 1.0,
        },
        opacity: 0,
        y: 60,
        scale: 0.88,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    onEnterJourney?.();
    const nextSection = document.getElementById("zone-experience");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="zone-void"
      ref={containerRef}
      className="relative min-h-[160vh] w-full select-none pointer-events-none"
    >
      {/* Sticky Fullscreen Frame for Discrete Page-like Experience */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center px-6 pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
        {/* Editorial Headline (Framed above the center robot) */}
        <div
          ref={headlineRef}
          className="text-center max-w-4xl mx-auto z-10 pointer-events-auto"
        >
          <div className="font-sans text-[11px] sm:text-xs tracking-[0.3em] uppercase text-zinc-400 font-medium mb-3 flex items-center justify-center gap-2.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span>Interactive Portfolio · Software Engineer</span>
          </div>

          <h1 className="font-display font-medium tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-white leading-[0.92] mb-5">
            <span className="kinetic-text-line block font-extrabold tracking-tight">
              SEPTIAN DWI
            </span>
            <span className="kinetic-text-line block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-amber-200 to-amber-400 mt-1">
              Risanggalih
            </span>
          </h1>

          <p className="void-sub font-sans text-xs sm:text-sm text-zinc-400 font-light tracking-[0.2em] uppercase">
            Senior Frontend & Fullstack Systems Developer
          </p>
        </div>

        {/* Center Stage is Kept Clear for the 3D Protagonist Robot */}
        <div className="flex-1 w-full flex items-center justify-center pointer-events-none" />

        {/* Primary Action Button & Elegant Agency Prompt */}
        <div
          ref={ctaRef}
          className="void-cta-box z-10 pointer-events-auto flex flex-col items-center gap-3.5"
        >
          <button
            onClick={handleEnter}
            onMouseEnter={() => onEngineHover?.(true)}
            onMouseLeave={() => onEngineHover?.(false)}
            className="group relative flex items-center gap-3.5 border border-white/15 bg-white/[0.04] backdrop-blur-xl px-9 py-3.5 rounded-full font-sans text-xs tracking-[0.22em] uppercase text-zinc-200 hover:text-white hover:border-amber-400/60 hover:bg-amber-400/10 transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
            <span>Explore Experience</span>
            <ArrowDown className="h-3.5 w-3.5 text-amber-300 group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="flex items-center gap-2 font-sans text-[11px] text-zinc-500 tracking-[0.18em] uppercase">
            <span>Click companion to wave · Scroll to navigate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
