"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EXPERIENCE_WAYPOINTS } from "@/journey/types";

interface Stage02Props {
  activeWaypointIndex: number;
}

export default function Stage02ExperienceWaypoints({
  activeWaypointIndex,
}: Stage02Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="zone-experience"
      ref={containerRef}
      className="relative min-h-[300vh] w-full px-6 py-32 flex flex-col justify-start items-center select-none"
    >
      {/* Sticky Environmental Header */}
      <div className="sticky top-28 z-20 text-center max-w-2xl mx-auto mb-20 pointer-events-none">
        <div className="font-mono text-[10px] tracking-[0.35em] text-solar-400 uppercase mb-2">
          SECTOR 02 // EXPEDITION MILESTONES
        </div>
        <div className="font-sans font-light text-5xl sm:text-7xl text-white tracking-tighter">
          5+ <span className="text-zinc-500 font-extralight text-3xl sm:text-4xl">YEARS</span>
        </div>
        <div className="font-mono text-xs sm:text-sm text-solar-200 tracking-[0.25em] uppercase mt-1">
          BUILDING DIGITAL PRODUCTS
        </div>

        {/* Minimal Timeline Breadcrumb */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 font-mono text-[11px] text-zinc-500">
          <span className="text-zinc-400">2022</span>
          <span className="h-px w-6 sm:w-12 bg-zinc-800" />
          <span className="text-solar-300 font-medium">
            {EXPERIENCE_WAYPOINTS[activeWaypointIndex]?.domain || "BANKING"}
          </span>
          <span className="h-px w-6 sm:w-12 bg-zinc-800" />
          <span className="text-zinc-400">2026</span>
        </div>
      </div>

      {/* Spatial Physical Waypoints with Parallax & Kinetic Text Reveals */}
      <div className="w-full max-w-4xl mx-auto space-y-[45vh] relative z-20">
        {EXPERIENCE_WAYPOINTS.map((wp, idx) => {
          const isActive = activeWaypointIndex === idx;
          return (
            <div
              key={idx}
              className={`transition-all duration-700 max-w-lg ${
                idx % 2 === 0 ? "mr-auto text-left" : "ml-auto text-left"
              } ${
                isActive
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-25 translate-y-8 scale-95 pointer-events-none"
              }`}
            >
              {/* Waypoint Coordinates & Status */}
              <div className="flex items-center gap-2.5 font-mono text-[11px] text-solar-400 mb-2">
                <span className="h-2 w-2 rounded-full bg-solar-400 shadow-[0_0_8px_#f59e0b]" />
                <span className="tracking-widest font-semibold">
                  WAYPOINT [0{idx + 1}] // {wp.year}
                </span>
              </div>

              {/* Waypoint Domain Title */}
              <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase mb-1">
                {wp.domain}
              </h3>

              <div className="font-mono text-xs text-solar-200/80 mb-3">
                {wp.role} • <span className="text-white font-medium">{wp.company}</span>
              </div>

              {/* Waypoint Description */}
              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4 border-l-2 border-solar-500/40 pl-3">
                {wp.description}
              </p>

              {/* Tech Stack Markers */}
              <div className="flex flex-wrap gap-2">
                {wp.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-[10px] tracking-wider text-zinc-300 border border-zinc-800 bg-obsidian-950/70 px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

