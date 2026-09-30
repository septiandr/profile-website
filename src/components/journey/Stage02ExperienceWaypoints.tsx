"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE_WAYPOINTS, ExperienceWaypoint } from "@/journey/types";
import { Briefcase, Calendar, ChevronRight, Sparkles, X, Layers } from "lucide-react";

interface Stage02Props {
  activeWaypointIndex?: number;
}

export default function Stage02ExperienceWaypoints({
  activeWaypointIndex: propActiveIndex,
}: Stage02Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [internalIndex, setInternalIndex] = useState(0);
  const [selectedWaypoint, setSelectedWaypoint] = useState<ExperienceWaypoint | null>(null);

  const activeIndex = propActiveIndex !== undefined ? propActiveIndex : internalIndex;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      const frame = frameRef.current;
      if (!track || !container || !frame) return;

      // Calculate horizontal translation distance safely
      const getScrollAmount = () => {
        const overflow = track.scrollWidth - window.innerWidth + 180;
        return overflow > 0 ? overflow : 0;
      };

      // When horizontal scroll happens, vertical scroll stops ("scroll vertical berhenti")
      // pin: frame locks the viewport vertically until all cards have glided across
      ScrollTrigger.create({
        id: "exp-horizontal-pin",
        trigger: container,
        pin: frame,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        scrub: 1.0,
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
        },
      });

      // Smooth entry reveal without locking opacity to 0
      gsap.fromTo(
        ".exp-card",
        { opacity: 0.3, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="zone-experience"
      ref={containerRef}
      className="relative w-full select-none bg-transparent"
    >
      {/* Pinned Fullscreen Frame: Vertical scroll halts while cards glide horizontally */}
      <div
        ref={frameRef}
        className="relative h-screen w-full flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-12 overflow-hidden pointer-events-none"
      >
        {/* Dedicated Floating Time Widget in Top Right Corner ("waktu di experience buat di pojok kanan atas") */}
        <div className="absolute top-20 right-6 sm:top-24 sm:right-12 z-30 pointer-events-auto flex flex-col items-end">
          <div className="inline-flex items-center gap-2.5 border border-amber-400/40 bg-gradient-to-r from-amber-400/15 via-[#0d1020]/95 to-[#070914]/98 backdrop-blur-2xl px-5 py-2.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(245,158,11,0.18)]">
            <Calendar className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-mono text-xs sm:text-sm font-bold text-amber-200 tracking-wider">
              {EXPERIENCE_WAYPOINTS[activeIndex]?.year || "2022 — 2026"}
            </span>
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 tracking-[0.2em] uppercase mt-2 pr-1">
            <span className="text-amber-300 font-semibold">WAYPOINT 0{activeIndex + 1}</span>
            <span className="text-zinc-600">/</span>
            <span>0{EXPERIENCE_WAYPOINTS.length}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-500">2022 — 2026</span>
          </div>
        </div>

        {/* Environmental Header & Timeline Status */}
        <div className="z-20 text-center max-w-3xl mx-auto pt-4 pointer-events-auto">
          <div className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-amber-300/90 font-medium mb-2 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span>Selected Production Milestones · 2022 — 2026</span>
          </div>

          <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            Engineering{" "}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-amber-200 to-amber-400">
              Trajectory
            </span>
          </h2>

          {/* Minimal Waypoint Segment Navigation Bar */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4">
            {EXPERIENCE_WAYPOINTS.map((wp, idx) => (
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
                className={`group flex items-center gap-1.5 transition-all duration-300 py-1 px-2 rounded-full cursor-pointer border ${
                  activeIndex === idx
                    ? "border-amber-400/50 bg-amber-400/10 text-amber-200 font-semibold scale-105"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    activeIndex === idx
                      ? "w-5 bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                      : "w-2 bg-zinc-700 group-hover:bg-zinc-500"
                  }`}
                />
                <span className="font-sans text-xs tracking-wider">
                  {wp.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Card Track: Masked on the left so cards never clip or overlap the waving/walking robot on the far-left margin */}
        <div className="w-full my-auto overflow-visible pointer-events-auto [mask-image:linear-gradient(to_right,transparent_0%,transparent_140px,black_320px,black_100%)]">
          <div
            ref={trackRef}
            className="flex items-stretch gap-7 sm:gap-9 flex-nowrap will-change-transform pl-[280px] sm:pl-[380px] md:pl-[460px] lg:pl-[520px] pr-32 sm:pr-80 py-6"
          >
            {EXPERIENCE_WAYPOINTS.map((wp, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedWaypoint(wp)}
                  className={`exp-card group relative w-[320px] sm:w-[420px] shrink-0 border rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer active:scale-95 ${
                    isActive
                      ? "border-amber-400/60 bg-gradient-to-b from-[#13172c]/95 via-[#0d1020]/95 to-[#070914]/98 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.18)] scale-[1.01]"
                      : "border-white/[0.08] bg-gradient-to-b from-[#0f1326]/90 via-[#0a0d1b]/90 to-[#070813]/95 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:border-amber-400/40 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(245,158,11,0.15)]"
                  } backdrop-blur-2xl`}
                >
                  {/* Subtle Top Accent Highlight */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

                  {/* Card Header: Index & Top-Right Time / Year Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isActive ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "bg-zinc-600"
                          }`}
                        />
                        <span className="font-display text-xs text-amber-300/90 font-bold tracking-widest">
                          0{idx + 1} // CASE
                        </span>
                      </div>

                      {/* Time / Year in Top Right of Card */}
                      <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-amber-200 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.12)]">
                        <Calendar className="h-3 w-3 text-amber-400" />
                        <span>{wp.year}</span>
                      </div>
                    </div>

                    {/* Domain Title */}
                    <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight uppercase leading-tight mb-2 group-hover:text-amber-200 transition-colors">
                      {wp.domain}
                    </h3>

                    {/* Role & Company */}
                    <div className="flex items-center gap-2 font-sans text-xs sm:text-sm text-zinc-300 font-normal mb-4">
                      <Briefcase className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span className="text-amber-200 font-medium">{wp.role}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-zinc-400">{wp.company}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6 border-l-2 border-amber-400/40 pl-3.5 bg-white/[0.02] py-2 rounded-r">
                      {wp.description}
                    </p>
                  </div>

                  {/* Tech Stack Tags & Interactive Click Prompt */}
                  <div className="pt-4 border-t border-white/[0.08]">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {wp.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-sans text-[11px] tracking-wide text-zinc-200 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Click Indicator */}
                    <div className="flex items-center justify-between text-zinc-400 group-hover:text-amber-300 font-sans text-xs tracking-wider transition-colors pt-1">
                      <span>View Case Study Dossier</span>
                      <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform text-amber-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Hint */}
        <div className="z-20 text-center font-sans text-xs text-zinc-500 tracking-[0.2em] uppercase pb-4 pointer-events-auto">
          <span>Scroll horizontally through milestones · Click cards for full details</span>
        </div>
      </div>

      {/* Interactive Click Modal / Case Study Dossier */}
      {selectedWaypoint && (
        <div
          onClick={() => setSelectedWaypoint(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#070814]/85 backdrop-blur-2xl animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl border border-white/15 bg-gradient-to-b from-[#13172e] via-[#0d1022] to-[#070814] p-8 sm:p-10 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.15)] text-left"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedWaypoint(null)}
              aria-label="Close dossier"
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-amber-400/60 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 font-sans text-xs text-amber-300 font-medium mb-2 tracking-[0.2em] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Project Case Study · {selectedWaypoint.year}</span>
            </div>

            <h3 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight uppercase mb-2">
              {selectedWaypoint.domain}
            </h3>

            <div className="font-sans text-sm text-zinc-300 font-normal mb-6">
              <span className="text-amber-200 font-medium">{selectedWaypoint.role}</span> · <span className="text-zinc-400">{selectedWaypoint.company}</span>
            </div>

            {/* Architectural Overview */}
            <div className="mb-6">
              <div className="font-sans text-xs text-zinc-400 uppercase tracking-[0.15em] mb-2 font-medium">
                Scope & Engineering Architecture
              </div>
              <p className="text-sm sm:text-base text-zinc-200 font-light leading-relaxed border-l-2 border-amber-400/60 pl-4 py-1 bg-white/[0.02] rounded-r">
                {selectedWaypoint.description}
              </p>
            </div>

            {/* Core Tech Engines */}
            <div className="mb-8">
              <div className="font-sans text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3 font-medium">
                Core Technologies
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
                onClick={() => setSelectedWaypoint(null)}
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
