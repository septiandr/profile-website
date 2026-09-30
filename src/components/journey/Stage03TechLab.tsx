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
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);

  const categories = ["Frontend", "Backend", "Database", "Mobile"] as const;

  const handleNodeHover = (index: number, node: TechNode) => {
    setSelectedNode(node);
    onHoverTechNode?.(index);
  };

  const handleNodeLeave = () => {
    setSelectedNode(null);
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
        <div className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 uppercase mb-2">
          SECTOR 03 // TECHNOLOGY LAB
        </div>
        <h2 className="font-sans font-light text-4xl sm:text-6xl text-white tracking-tight uppercase">
          SYSTEM SCAN <span className="font-extralight text-zinc-500">• NODES</span>
        </h2>
        <p className="font-mono text-xs text-zinc-400 tracking-widest uppercase mt-2">
          AUTOMATION & SYSTEM ARCHITECTURE
        </p>
      </div>

      {/* Spatial Environmental Node Grid (Subtle HUD Overlay synced with 3D nodes) */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 z-20 pointer-events-auto">
        {categories.map((cat) => {
          const categoryNodes = TECH_NODES.filter((n) => n.category === cat);
          return (
            <div
              key={cat}
              className="border-t border-zinc-800 pt-4 flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-400 uppercase mb-3">
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
                        className={`p-3 border transition-all duration-300 cursor-pointer ${
                          isHovered
                            ? "border-cyan-400 bg-zinc-900/80 text-white"
                            : "border-zinc-800/80 bg-zinc-950/40 text-zinc-300 hover:border-zinc-600"
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="font-semibold">{node.name}</span>
                          <span className="text-[10px] text-zinc-500">ACTIVE</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-light mt-1 leading-snug">
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

      {/* Portal Emergence Notice */}
      <div className="mt-auto mb-16 text-center z-20 pointer-events-none">
        <div className="font-mono text-[11px] tracking-[0.25em] text-zinc-500 uppercase">
          [ SPATIAL PORTAL FORMING // SCROLL TO PASS THROUGH ]
        </div>
      </div>
    </section>
  );
}
