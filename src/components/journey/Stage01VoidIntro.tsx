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
          <div className="font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#00f0ff] font-bold mb-3 flex items-center justify-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_10px_#ccff00] animate-ping" />
            <span className="bg-[#ccff00]/10 px-3.5 py-1 rounded-full border border-[#ccff00]/30 text-white font-mono">
              Studio Prologue // Creative Engineering · 2026
            </span>
          </div>

          <h1 className="font-display font-black tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[0.92] mb-4 uppercase">
            <span className="kinetic-text-line block tracking-tight">
              THE CREATIVE
            </span>
            <span className="kinetic-text-line block mt-1">
              <span className="relative inline-block px-4 py-0.5 text-black font-black bg-[#ccff00] rounded-sm transform -rotate-1 shadow-[0_0_35px_rgba(204,255,0,0.45)]">
                ENGINEERING STUDIO
              </span>
            </span>
          </h1>

          <p className="void-sub font-mono text-xs sm:text-sm text-zinc-300 font-light tracking-[0.2em] uppercase">
            3D Autonomous Companion Online · Choose a Stance or Scroll Down to Studio Command
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
              <Bot className="w-3.5 h-3.5 text-[#ccff00] animate-pulse" />
              <span>Companion Stance Control</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_6px_#ccff00]" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl sm:rounded-full bg-zinc-950/70 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
              {GESTURE_ACTIONS.map((gesture) => {
                const isActive = (currentAction || "Wave") === gesture.id;
                return (
                  <button
                    key={gesture.id}
                    onClick={() => onSelectAction?.(gesture.id)}
                    data-cursor-text="STANCE"
                    className={`relative group px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#ccff00] text-black font-black border border-white shadow-[0_0_16px_rgba(204,255,0,0.5)] scale-105"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/10"
                    }`}
                  >
                    <span className="text-sm select-none transition-transform group-hover:scale-125 duration-200">
                      {gesture.icon}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em]">
                      {gesture.label}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-black ml-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleEnter}
            data-cursor-text="ENTER"
            onMouseEnter={() => onEngineHover?.(true)}
            onMouseLeave={() => onEngineHover?.(false)}
            className="group relative flex items-center gap-3.5 border border-[#ccff00]/40 bg-[#ccff00]/10 hover:bg-[#ccff00] hover:text-black backdrop-blur-xl px-9 py-3.5 rounded-full font-mono text-xs tracking-[0.22em] uppercase text-white font-black transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(204,255,0,0.25)] hover:scale-105 active:scale-95"
          >
            <span className="h-2 w-2 rounded-full bg-[#ccff00] group-hover:bg-black transition-colors" />
            <span>Enter Studio · Command Console</span>
            <ArrowDown className="h-4 w-4 transform group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
            <span>Scroll Down to Inspect Shipped Products</span>
          </div>
        </div>
      </div>
    </section>
  );
}
