"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH_NODES, TechNode } from "@/journey/types";
import { Cpu, Sparkles } from "lucide-react";

interface Stage03Props {
  onHoverTechNode?: (index: number | null) => void;
  activeTechNode?: number | null;
}

export default function Stage03TechLab({
  onHoverTechNode,
  activeTechNode,
}: Stage03Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ["Frontend", "Backend", "Database", "Mobile"] as const;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entry reveal animation for tech cards without disappearing risk
      gsap.fromTo(
        ".tech-card",
        { opacity: 0.35, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNodeHover = (index: number, node: TechNode) => {
    onHoverTechNode?.(index);
  };

  const handleNodeLeave = () => {
    onHoverTechNode?.(null);
  };

  return (
    <section
      id="zone-skills"
      ref={containerRef}
      className="relative min-h-[200vh] w-full px-6 py-32 flex flex-col justify-start items-center select-none"
    >
      {/* Environmental Header (Pushed right to balance with robot on the left) */}
      <div className="sticky top-28 z-20 text-center max-w-2xl mx-auto lg:ml-auto lg:mr-16 mb-16 pointer-events-none">
        <div className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-amber-300/90 font-medium mb-2 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          <span>Technical Capabilities · Systems & Engines</span>
        </div>
        <h2 className="font-display font-light text-4xl sm:text-6xl text-white tracking-tight uppercase">
          Technical{" "}
          <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-amber-200 to-amber-400">
            Arsenal
          </span>
        </h2>
        <p className="font-sans text-xs text-zinc-400 tracking-[0.18em] uppercase mt-2 font-light">
          Distributed Web · Real-Time Applications · Mobile Architecture
        </p>
      </div>

      {/* Two-Column Staging Layout: Dedicated Left Space for 3D Robot */}
      <div className="w-full flex items-start justify-center z-20 pointer-events-auto">
        {/* Left Column Spacer for 3D Robot (340px - 380px clear area) */}
        <div className="hidden lg:block w-[320px] xl:w-[380px] shrink-0 pointer-events-none" />

        {/* Right Skills Grid Arena (Cards live here and NEVER overlap the robot) */}
        <div className="flex-1 max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pr-0 lg:pr-8">
          {categories.map((cat) => {
            const categoryNodes = TECH_NODES.filter((n) => n.category === cat);
            return (
              <div
                key={cat}
                className="pt-2 flex flex-col justify-between"
              >
                <div>
                  <div className="font-display text-xs tracking-[0.2em] text-amber-300 font-semibold uppercase mb-4 flex items-center gap-2 border-b border-white/[0.08] pb-2.5">
                    <span className="h-1 w-3 bg-amber-400 rounded-full" />
                    <span>{cat}</span>
                  </div>

                  <div className="space-y-3">
                    {categoryNodes.map((node) => {
                      const globalIdx = TECH_NODES.findIndex((n) => n.name === node.name);
                      const isHovered = activeTechNode === globalIdx;
                      return (
                        <div
                          key={node.name}
                          onClick={() => handleNodeHover(globalIdx, node)}
                          onMouseEnter={() => handleNodeHover(globalIdx, node)}
                          onMouseLeave={handleNodeLeave}
                          className={`tech-card p-4 rounded-xl border transition-all duration-300 cursor-pointer active:scale-95 ${
                            isHovered
                              ? "border-amber-400/70 bg-gradient-to-b from-[#171c36] via-[#101429] to-[#0a0d1d] text-white shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.2)] -translate-y-1 scale-[1.02]"
                              : "border-white/[0.08] bg-gradient-to-b from-[#101426]/90 via-[#0b0e1b]/95 to-[#070912]/98 text-zinc-300 hover:border-amber-400/40 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                          } backdrop-blur-xl`}
                        >
                          <div className="flex items-center justify-between font-display text-xs mb-1.5">
                            <span className="font-bold text-white tracking-wide">{node.name}</span>
                            <span className="text-[10px] font-sans font-medium text-amber-300/80 uppercase tracking-widest">
                              Production
                            </span>
                          </div>
                          <p className="font-sans text-xs text-zinc-300 font-light leading-relaxed">
                            {node.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Navigation Prompt */}
      <div className="mt-auto mb-16 text-center z-20 pointer-events-none pt-16">
        <div className="inline-flex items-center gap-2 font-sans text-xs text-zinc-500 tracking-[0.2em] uppercase">
          <span>Scroll to explore architectural mindset & contact</span>
        </div>
      </div>
    </section>
  );
}
