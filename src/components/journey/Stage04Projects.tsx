"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { JOURNEY_PROJECTS, JourneyProject } from "@/journey/types";

interface Stage04Props {
  activeProjectIndex: number;
}

export default function Stage04Projects({ activeProjectIndex }: Stage04Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="zone-projects"
      ref={containerRef}
      className="relative min-h-[300vh] w-full px-6 py-32 flex flex-col justify-start items-center select-none"
    >
      {/* Sticky Environmental Header */}
      <div className="sticky top-28 z-20 text-center max-w-xl mx-auto mb-16 pointer-events-none">
        <div className="font-mono text-[10px] tracking-[0.35em] text-solar-400 uppercase mb-2">
          SECTOR 04 // PROJECT DESTINATIONS
        </div>
        <div className="font-sans font-light text-sm tracking-[0.25em] text-zinc-300 uppercase">
          DESTINATION [0{activeProjectIndex + 1} / 03]
        </div>

        {/* Minimal Destination Indicator */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {JOURNEY_PROJECTS.map((p, idx) => (
            <span
              key={p.id}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeProjectIndex === idx
                  ? "w-8 bg-solar-400 shadow-[0_0_10px_#f59e0b]"
                  : "w-2.5 bg-zinc-800"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Sequential Project Destinations */}
      <div className="w-full max-w-3xl mx-auto space-y-[60vh] z-20 relative">
        {JOURNEY_PROJECTS.map((proj, idx) => {
          const isActive = activeProjectIndex === idx;
          return (
            <div
              key={proj.id}
              className={`transition-all duration-700 p-8 sm:p-12 border backdrop-blur-xl ${
                isActive
                  ? "opacity-100 translate-y-0 border-solar-500/40 bg-obsidian-950/80 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                  : "opacity-20 translate-y-8 border-zinc-900 bg-obsidian-950/20 pointer-events-none"
              }`}
            >
              {/* Destination Code */}
              <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-6 border-b border-zinc-800 pb-3">
                <span className="text-solar-400 tracking-widest font-semibold">
                  DESTINATION {proj.number} // ORBIT PATROL
                </span>
                <span className="text-zinc-400">ENTERPRISE SYSTEM</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-sans font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-none mb-2">
                {proj.name}
              </h3>

              <div className="font-mono text-xs text-solar-300 tracking-[0.25em] uppercase mb-6 font-medium">
                {proj.subtitle}
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-8 max-w-2xl">
                {proj.description}
              </p>

              {/* Role & Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1">
                    ROLE
                  </div>
                  <div className="font-sans font-bold text-sm text-white">
                    {proj.role}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-2">
                    STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="font-mono text-[11px] text-solar-200 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Deliverables Bulletins */}
              <div className="mt-6 pt-6 border-t border-zinc-800/80">
                <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-3">
                  DELIVERABLES
                </div>
                <ul className="space-y-1.5">
                  {proj.deliverables.map((d, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs text-zinc-400 font-light flex items-start gap-2"
                    >
                      <span className="text-solar-400 font-mono">›</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

