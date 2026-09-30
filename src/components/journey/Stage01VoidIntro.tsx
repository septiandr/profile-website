"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Bot, Sparkles } from "lucide-react";

interface Stage01Props {
  currentAction?: string;
  onSelectAction?: (action: string) => void;
  onEngineHover?: (hovered: boolean) => void;
  onEnterJourney?: () => void;
}

const GESTURE_ACTIONS = [
  { id: "Wave", label: "Wave", icon: "👋" },
  { id: "Dance", label: "Dance", icon: "🕺" },
  { id: "Jump", label: "Jump", icon: "⚡" },
  { id: "ThumbsUp", label: "Thumbs Up", icon: "👍" },
  { id: "Punch", label: "Punch", icon: "🥊" },
  { id: "Yes", label: "Nod Yes", icon: "✨" },
];

export default function Stage01VoidIntro({
  currentAction = "Wave",
  onSelectAction,
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
          end: "75% top",
          scrub: 1.2,
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
          end: "55% top",
          scrub: 1.2,
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
    const nextSection = document.getElementById("zone-hero");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="zone-void"
      ref={containerRef}
      className="relative min-h-[220vh] w-full select-none pointer-events-none"
    >
      {/* Sticky Fullscreen Frame for Discrete Page-like Experience */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
        {/* Ambient Cosmic Halos for Color Vibrancy */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[350px] rounded-full bg-gradient-to-b from-amber-500/20 via-orange-500/10 to-transparent blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-10 w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-10 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none"
        />

        {/* Editorial Headline (Framed above the center robot) */}
        <div
          ref={headlineRef}
          className="text-center max-w-4xl mx-auto z-10 pointer-events-auto"
        >
          <div className="font-sans text-[11px] sm:text-xs tracking-[0.3em] uppercase text-amber-300 font-semibold mb-3 flex items-center justify-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-ping" />
            <span className="bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
              Interactive 3D Portfolio · Page 01: Intro
            </span>
          </div>

          <h1 className="font-display font-medium tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[0.94] mb-3">
            <span className="kinetic-text-line block font-black tracking-tight">
              WELCOME TO THE
            </span>
            <span className="kinetic-text-line block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 via-amber-300 to-cyan-300 drop-shadow-[0_0_35px_rgba(245,158,11,0.3)] mt-1 animate-shimmer">
              Digital Cosmos
            </span>
          </h1>

          <p className="void-sub font-sans text-xs sm:text-sm text-zinc-300 font-light tracking-[0.2em] uppercase">
            3D Autonomous Companion Online · Choose a Stance or Scroll to Meet the Architect
          </p>
        </div>

        {/* Center Stage is Kept Clear for the 3D Protagonist Robot */}
        <div className="flex-1 w-full flex items-center justify-center pointer-events-none" />

        {/* Primary Action Button & Elegant Agency Prompt */}
        <div
          ref={ctaRef}
          className="void-cta-box z-10 pointer-events-auto flex flex-col items-center gap-3.5 max-w-xl w-full"
        >
          {/* Interactive Companion Gesture Selector Dock */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400">
              <Bot className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Companion Stance Control</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl sm:rounded-full bg-zinc-950/70 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
              {GESTURE_ACTIONS.map((gesture) => {
                const isActive = (currentAction || "Wave") === gesture.id;
                return (
                  <button
                    key={gesture.id}
                    onClick={() => onSelectAction?.(gesture.id)}
                    className={`relative group px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500/25 to-amber-400/20 text-amber-200 border border-amber-400/60 shadow-[0_0_16px_rgba(245,158,11,0.35)] scale-105"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border border-transparent hover:border-white/10"
                    }`}
                  >
                    <span className="text-sm select-none transition-transform group-hover:scale-125 duration-200">
                      {gesture.icon}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em]">
                      {gesture.label}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b] animate-pulse ml-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleEnter}
            onMouseEnter={() => onEngineHover?.(true)}
            onMouseLeave={() => onEngineHover?.(false)}
            className="group relative flex items-center gap-3.5 border border-white/15 bg-white/[0.04] backdrop-blur-xl px-9 py-3.5 rounded-full font-sans text-xs tracking-[0.22em] uppercase text-zinc-200 hover:text-white hover:border-amber-400/60 hover:bg-amber-400/10 transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
            <span>Enter Portfolio · Meet The Architect</span>
            <ArrowDown className="h-3.5 w-3.5 text-amber-300 group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="flex items-center gap-2 font-sans text-[11px] text-zinc-400 tracking-[0.18em] uppercase">
            <span>Choose stance or click companion · Scroll down to Hero</span>
          </div>
        </div>
      </div>
    </section>
  );
}
