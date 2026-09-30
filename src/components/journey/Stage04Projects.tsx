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
      gsap.fromTo(
        ".project-card",
        { opacity: 0.4, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
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
        <div className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-amber-300/90 font-medium mb-2 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          <span>Selected Production Works · Client & Enterprise</span>
        </div>
        <h2 className="font-display font-light text-4xl sm:text-6xl text-white tracking-tight uppercase">
          Featured{" "}
          <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-amber-200 to-amber-400">
            Projects
          </span>
        </h2>
        <div className="font-sans text-xs text-zinc-400 tracking-[0.2em] uppercase mt-2">
          Case 0{activeProjectIndex + 1} · 03 Production Systems
        </div>

        {/* Minimal Destination Indicator */}
        <div className="flex items-center justify-center gap-2.5 mt-4">
          {JOURNEY_PROJECTS.map((p, idx) => (
            <span
              key={p.id}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeProjectIndex === idx
                  ? "w-8 bg-amber-400 shadow-[0_0_12px_#f59e0b]"
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
                  ? "opacity-100 translate-y-0 scale-100 border-amber-400/60 bg-gradient-to-b from-[#13172c]/95 via-[#0d1020]/95 to-[#070914]/98 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.2)]"
                  : "opacity-90 translate-y-2 scale-[0.98] border-white/[0.08] bg-gradient-to-b from-[#0f1326]/90 via-[#0a0d1b]/90 to-[#070813]/95 hover:border-amber-400/40 hover:opacity-100 shadow-xl"
              }`}
            >
              {/* Top Glowing Ambient Line */}
              <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Destination Code */}
              <div className="flex items-center justify-between font-sans text-xs text-zinc-400 mb-6 border-b border-white/[0.08] pb-3">
                <span className="text-amber-300 tracking-wider font-medium flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                  <span className="font-display uppercase font-bold text-xs">Production Case {proj.number}</span>
                </span>
                <span className="text-zinc-500 text-[11px] tracking-widest uppercase hidden sm:inline">
                  {isExpanded ? "Click to condense" : "Click to view deliverables"}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-2 group-hover:text-amber-200 transition-colors">
                {proj.name}
              </h3>

              <div className="font-sans text-xs sm:text-sm text-amber-300/90 tracking-[0.2em] uppercase mb-6 font-medium">
                {proj.subtitle}
              </div>

              {/* Description with solid background block */}
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-8 max-w-2xl border-l-2 border-amber-400/40 pl-4 py-2 bg-white/[0.02] rounded-r">
                {proj.description}
              </p>

              {/* Role & Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/[0.08]">
                <div>
                  <div className="font-sans text-[10px] tracking-widest text-zinc-500 uppercase mb-1 font-semibold">
                    ROLE
                  </div>
                  <div className="font-sans font-medium text-sm text-white">
                    {proj.role}
                  </div>
                </div>

                <div>
                  <div className="font-sans text-[10px] tracking-widest text-zinc-500 uppercase mb-2 font-semibold">
                    TECHNOLOGIES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="font-sans text-[11px] text-amber-200 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Deliverables Bulletins */}
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <div className="font-sans text-[10px] tracking-widest text-zinc-500 uppercase mb-3 font-semibold">
                  ENGINEERING DELIVERABLES & IMPACT
                </div>
                <ul className="space-y-2.5">
                  {proj.deliverables.map((d, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs sm:text-sm text-zinc-300 font-light flex items-start gap-2.5"
                    >
                      <span className="text-amber-400 font-bold mt-0.5">›</span>
                      <span className="leading-relaxed">{d}</span>
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
