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
        {/* Editorial Cinematic Headline (Framed above the center robot) */}
        <div
          ref={headlineRef}
          className="text-center max-w-4xl mx-auto z-10 pointer-events-auto"
        >
          <div className="font-mono text-[11px] tracking-[0.35em] text-solar-400 uppercase mb-2 font-medium">
            WELCOME TO
          </div>

          <h1 className="font-sans font-light tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-100 uppercase leading-[0.96] mb-3">
            <span className="kinetic-text-line block font-black tracking-tighter text-white">
              RISANGGALIH
            </span>
            <span className="kinetic-text-line block text-transparent bg-clip-text bg-gradient-to-r from-solar-400 via-solar-300 to-amber-200 font-extralight tracking-widest text-3xl sm:text-5xl md:text-6xl mt-1">
              PORTFOLIO
            </span>
          </h1>

          <p className="void-sub font-mono text-xs sm:text-sm text-zinc-400 tracking-[0.3em] uppercase font-light">
            SOFTWARE ENGINEER
          </p>
        </div>

        {/* Center Stage is Kept Clear for the 3D Protagonist Robot Waving at Visitor */}
        <div className="flex-1 w-full flex items-center justify-center pointer-events-none" />

        {/* Primary Action Button & Mission Prompt */}
        <div
          ref={ctaRef}
          className="void-cta-box z-10 pointer-events-auto flex flex-col items-center gap-3.5"
        >
          <button
            onClick={handleEnter}
            onMouseEnter={() => onEngineHover?.(true)}
            onMouseLeave={() => onEngineHover?.(false)}
            className="group relative flex items-center gap-3 border border-solar-500/50 bg-obsidian-950/80 px-8 py-3.5 font-mono text-xs tracking-[0.25em] text-solar-300 transition-all duration-500 hover:border-solar-400 hover:text-white hover:bg-solar-500/10 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
          >
            <span className="h-2 w-2 rounded-full bg-solar-400 group-hover:animate-ping" />
            <span>ENTER JOURNEY</span>
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
          </button>

          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
            <Sparkles className="h-3 w-3 text-solar-400/80" />
            <span>CLICK ROBOT TO WAVE • SCROLL TO ENTER</span>
          </div>
        </div>
      </div>
    </section>
  );
}
