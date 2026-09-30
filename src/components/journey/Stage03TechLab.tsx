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
      {/* Sticky Environmental HUD */}
      <div className="sticky top-28 z-20 text-center max-w-2xl mx-auto mb-16 pointer-events-none">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-solar-400 uppercase mb-2 border border-solar-500/30 bg-obsidian-950/80 px-4 py-1 rounded-full backdrop-blur-md">
          <Cpu className="h-3 w-3 text-solar-400" />
          <span>SECTOR 03 // ARCHITECTURAL LAB</span>
        </div>
        <h2 className="font-sans font-light text-4xl sm:text-6xl text-white tracking-tight uppercase">
          SYSTEM SCAN <span className="font-extralight text-zinc-500">• NODES</span>
        </h2>
        <p className="font-mono text-xs text-solar-200 tracking-widest uppercase mt-2">
          ROBOT GUIDED ARCHITECTURAL COMPILATION
        </p>
      </div>

      {/* Spatial Environmental Node Grid */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 z-20 pointer-events-auto">
        {categories.map((cat) => {
          const categoryNodes = TECH_NODES.filter((n) => n.category === cat);
          return (
            <div
              key={cat}
              className="border-t border-solar-500/30 pt-4 flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-solar-400 uppercase mb-3 font-semibold flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-solar-400" />
                  <span>// {cat}</span>
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
                            ? "border-solar-400 bg-[#121724] text-white shadow-[0_0_25px_rgba(245,158,11,0.3)] -translate-y-1 scale-[1.02]"
                            : "border-solar-500/20 bg-[#0c0f17]/95 text-zinc-300 hover:border-solar-400/60 hover:bg-[#10141f] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                        } backdrop-blur-xl`}
                      >
                        <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                          <span className="font-bold text-white tracking-wide">{node.name}</span>
                          <span className="text-[10px] font-semibold text-solar-400">ACTIVE</span>
                        </div>
                        <p className="text-xs text-zinc-300 font-light leading-relaxed">
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

      {/* Spatial Portal Notice */}
      <div className="mt-auto mb-16 text-center z-20 pointer-events-none pt-12">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-zinc-500 uppercase">
          <Sparkles className="h-3 w-3 text-solar-400" />
          <span>[ SPATIAL PORTAL EXPEDITION // SCROLL TO ADVANCE TO PROJECTS ]</span>
        </div>
      </div>
    </section>
  );
}
