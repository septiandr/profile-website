"use client";

import { useEffect, useRef, useState } from "react";
import { TECH_NODES, TechNode } from "@/journey/types";

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
      className="relative min-h-[220vh] w-full px-6 py-32 flex flex-col justify-start items-center select-none"
    >
      {/* Sticky Environmental HUD */}
      <div className="sticky top-28 z-20 text-center max-w-2xl mx-auto mb-16 pointer-events-none">
        <div className="font-mono text-[10px] tracking-[0.35em] text-solar-400 uppercase mb-2">
          SECTOR 03 // ARCHITECTURAL LAB
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
              className="border-t border-solar-500/20 pt-4 flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-solar-400 uppercase mb-3 font-semibold">
                  // {cat}
                </div>
                <div className="space-y-3">
                  {categoryNodes.map((node) => {
                    const globalIdx = TECH_NODES.findIndex((n) => n.name === node.name);
                    const isHovered = activeTechNode === globalIdx;
                    return (
                      <div
                        key={node.name}
                        onMouseEnter={() => handleNodeHover(globalIdx, node)}
                        onMouseLeave={handleNodeLeave}
                        className={`p-3.5 border transition-all duration-300 cursor-pointer ${
                          isHovered
                            ? "border-solar-400 bg-obsidian-900 text-white shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                            : "border-zinc-800 bg-obsidian-950/60 text-zinc-300 hover:border-solar-500/40"
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="font-semibold text-white">{node.name}</span>
                          <span className="text-[10px] text-solar-400">ACTIVE</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-light mt-1.5 leading-snug">
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
      <div className="mt-auto mb-16 text-center z-20 pointer-events-none">
        <div className="font-mono text-[11px] tracking-[0.25em] text-zinc-500 uppercase">
          [ SPATIAL PORTAL EXPEDITION // SCROLL TO ADVANCE TO PROJECTS ]
        </div>
      </div>
    </section>
  );
}
