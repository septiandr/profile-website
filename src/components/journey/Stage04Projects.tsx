"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY_PROJECTS } from "@/journey/types";
import { Sparkles, ExternalLink, Layers } from "lucide-react";

interface Stage04Props {
  activeProjectIndex: number;
}

export default function Stage04Projects({ activeProjectIndex }: Stage04Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 25%",
          scrub: 0.8,
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="zone-projects"
      ref={containerRef}
      className="relative min-h-[300vh] w-full px-6 py-32 flex flex-col justify-start items-center select-none"
    >
      {/* Sticky Environmental Header */}
      <div className="sticky top-28 z-20 text-center max-w-xl mx-auto mb-16 pointer-events-none">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-solar-400 uppercase mb-2 border border-solar-500/30 bg-obsidian-950/80 px-4 py-1 rounded-full backdrop-blur-md">
          <Layers className="h-3 w-3 text-solar-400" />
          <span>SECTOR 04 // PROJECT DESTINATIONS</span>
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
                  ? "w-8 bg-solar-400 shadow-[0_0_12px_#f59e0b]"
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
          const isExpanded = expandedProjectId === proj.id;

          return (
            <div
              key={proj.id}
              onClick={() => setExpandedProjectId(isExpanded ? null : proj.id)}
              className={`project-card group relative transition-all duration-500 p-8 sm:p-12 border rounded-2xl backdrop-blur-2xl cursor-pointer active:scale-[0.99] ${
                isActive
                  ? "opacity-100 translate-y-0 scale-100 border-solar-400/70 bg-[#0c0f17]/95 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.2)]"
                  : "opacity-40 translate-y-6 scale-[0.97] border-zinc-800 bg-[#0c0f17]/85 hover:opacity-80 hover:border-solar-500/40"
              }`}
            >
              {/* Top Glowing Ambient Line */}
              <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-solar-400 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Destination Code */}
              <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-6 border-b border-zinc-800 pb-3">
                <span className="text-solar-400 tracking-widest font-semibold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-solar-400 shadow-[0_0_8px_#f59e0b]" />
                  <span>DESTINATION {proj.number} // ORBIT PATROL</span>
                </span>
                <span className="text-zinc-400 hidden sm:inline">CLICK TO TOGGLE DETAILS</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-sans font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-none mb-2 group-hover:text-solar-200 transition-colors">
                {proj.name}
              </h3>

              <div className="font-mono text-xs sm:text-sm text-solar-300 tracking-[0.25em] uppercase mb-6 font-medium">
                {proj.subtitle}
              </div>

              {/* Description with solid background block */}
              <p className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed mb-8 max-w-2xl border-l-2 border-solar-500/40 pl-4 py-2 bg-zinc-950/40 rounded-r">
                {proj.description}
              </p>

              {/* Role & Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1 font-semibold">
                    ROLE
                  </div>
                  <div className="font-sans font-bold text-sm text-white">
                    {proj.role}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-2 font-semibold">
                    TECH STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="font-mono text-[11px] text-solar-200 bg-solar-500/10 border border-solar-500/25 px-2.5 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Deliverables Bulletins */}
              <div className="mt-6 pt-6 border-t border-zinc-800/80">
                <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-3 font-semibold">
                  DELIVERABLES & ARCHITECTURAL IMPACT
                </div>
                <ul className="space-y-2">
                  {proj.deliverables.map((d, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs sm:text-sm text-zinc-300 font-light flex items-start gap-2.5"
                    >
                      <span className="text-solar-400 font-mono font-bold">›</span>
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
