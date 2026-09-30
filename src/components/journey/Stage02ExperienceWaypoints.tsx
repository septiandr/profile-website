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
        className="h-screen w-full flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-12 overflow-hidden pointer-events-none"
      >
        {/* Environmental Header & Timeline Status */}
        <div className="z-20 text-center max-w-3xl mx-auto pt-4 pointer-events-auto">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-solar-400 uppercase mb-2 border border-solar-500/30 bg-obsidian-950/80 px-4 py-1 rounded-full backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-solar-400" />
            <span>SECTOR 02 // EXPEDITION MILESTONES (HORIZONTAL ARCHIVE)</span>
          </div>

          <h2 className="font-sans font-light text-4xl sm:text-6xl text-white tracking-tight uppercase">
            5+ <span className="text-zinc-500 font-extralight text-2xl sm:text-3xl">YEARS</span>{" "}
            <span className="font-extralight text-solar-200">• PRODUCTION TIMELINE</span>
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
                className={`group flex items-center gap-1.5 transition-all duration-300 py-1 px-1.5 rounded cursor-pointer ${
                  activeIndex === idx
                    ? "text-solar-400 font-bold scale-105"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    activeIndex === idx
                      ? "w-8 bg-solar-400 shadow-[0_0_12px_#f59e0b]"
                      : "w-3 bg-zinc-800 group-hover:bg-zinc-700"
                  }`}
                />
                <span className="hidden sm:inline font-mono text-[10px] tracking-wider">
                  {wp.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Card Track (Scrolls Horizontally on Vertical Scroll) */}
        <div className="w-full my-auto overflow-visible pointer-events-auto">
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 sm:gap-10 flex-nowrap will-change-transform pl-4 sm:pl-16 pr-32 sm:pr-80 py-6"
          >
            {EXPERIENCE_WAYPOINTS.map((wp, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedWaypoint(wp)}
                  className={`exp-card group relative w-[320px] sm:w-[410px] shrink-0 border rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer active:scale-95 ${
                    isActive
                      ? "border-solar-400/80 bg-[#0d111a]/95 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.25)] scale-[1.01]"
                      : "border-solar-500/25 bg-[#0b0e14]/90 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:border-solar-400/60 hover:bg-[#0f1420]/95 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(245,158,11,0.2)]"
                  } backdrop-blur-2xl`}
                >
                  {/* Glowing Top Accent Line */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-solar-400 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                  {/* Card Header: Year & Beacon */}
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isActive
                              ? "bg-solar-400 animate-ping"
                              : "bg-solar-500/70"
                          }`}
                        />
                        <span className="font-mono text-xs text-solar-400 font-bold tracking-widest">
                          WAYPOINT [0{idx + 1}]
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 bg-obsidian-900 border border-zinc-800 px-2.5 py-0.5 rounded-full">
                        <Calendar className="h-3 w-3 text-solar-400" />
                        <span>{wp.year}</span>
                      </div>
                    </div>

                    {/* Domain Title */}
                    <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase leading-tight mb-2 group-hover:text-solar-200 transition-colors">
                      {wp.domain}
                    </h3>

                    {/* Role & Company */}
                    <div className="flex items-center gap-2 font-mono text-xs text-solar-300 font-medium mb-4">
                      <Briefcase className="h-3.5 w-3.5 text-solar-400 shrink-0" />
                      <span>{wp.role}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-300 font-normal">{wp.company}</span>
                    </div>

                    {/* Description with High-Contrast Background */}
                    <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6 border-l-2 border-solar-500/40 pl-3.5 bg-zinc-950/40 py-2 rounded-r">
                      {wp.description}
                    </p>
                  </div>

                  {/* Tech Stack Tags & Interactive Click Prompt */}
                  <div className="pt-4 border-t border-zinc-800/80">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {wp.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[10px] tracking-wider text-solar-200/90 border border-solar-500/20 bg-solar-500/5 px-2.5 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Click Indicator */}
                    <div className="flex items-center justify-between text-zinc-400 group-hover:text-solar-300 font-mono text-[11px] tracking-wider transition-colors pt-1">
                      <span>INSPECT TELEMETRY</span>
                      <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform text-solar-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Hint */}
        <div className="z-20 text-center font-mono text-[11px] text-zinc-500 tracking-widest uppercase pb-4 pointer-events-auto">
          <span>SCROLL VERTICALLY TO GLIDE HORIZONTALLY • CLICK CARDS TO EXPAND DETAILS</span>
        </div>
      </div>

      {/* Interactive Click Modal / Waypoint Telemetry Dossier */}
      {selectedWaypoint && (
        <div
          onClick={() => setSelectedWaypoint(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-obsidian-950/85 backdrop-blur-xl animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl border border-solar-500/50 bg-[#0d111a] p-8 sm:p-10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.25)] text-left"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedWaypoint(null)}
              aria-label="Close dossier"
              className="absolute top-6 right-6 p-2 rounded-full border border-zinc-800 hover:border-solar-400 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 font-mono text-xs text-solar-400 mb-2">
              <Layers className="h-3.5 w-3.5 text-solar-400" />
              <span className="tracking-widest uppercase font-bold">
                WAYPOINT TELEMETRY // {selectedWaypoint.year}
              </span>
            </div>

            <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight uppercase mb-2">
              {selectedWaypoint.domain}
            </h3>

            <div className="font-mono text-sm text-solar-300 font-medium mb-6">
              {selectedWaypoint.role} • <span className="text-zinc-200">{selectedWaypoint.company}</span>
            </div>

            {/* Mission Overview */}
            <div className="mb-6">
              <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
                MISSION OVERVIEW & ARCHITECTURE:
              </div>
              <p className="text-sm sm:text-base text-zinc-200 font-light leading-relaxed border-l-2 border-solar-400 pl-4 py-1 bg-zinc-950/50 rounded-r">
                {selectedWaypoint.description}
              </p>
            </div>

            {/* Core Tech Engines */}
            <div className="mb-8">
              <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest mb-3 font-semibold">
                DEPLOYED TECHNICAL STACK:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedWaypoint.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-solar-200 bg-solar-500/10 border border-solar-500/30 px-3 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Close Prompt */}
            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedWaypoint(null)}
                className="border border-solar-500/50 bg-obsidian-900 px-6 py-2.5 font-mono text-xs tracking-widest text-solar-300 hover:border-solar-400 hover:text-white transition-all rounded"
              >
                CLOSE TELEMETRY
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
