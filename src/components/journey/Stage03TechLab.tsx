"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH_NODES, TechNode } from "@/journey/types";
import { Cpu, Sparkles, Layers, Server, Database, Smartphone, Activity } from "lucide-react";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";

interface Stage03Props {
  onHoverTechNode?: (index: number | null) => void;
  activeTechNode?: number | null;
}

const CATEGORY_CONFIG: Record<
  string,
  {
    icon: typeof Layers;
    telemetry: string;
    bgGradient: string;
    spotlight: string;
    borderGlow: string;
    accentText: string;
    accentBg: string;
    nodeGlow: string;
    ambientAura: string;
  }
> = {
  Frontend: {
    icon: Layers,
    telemetry: "FAST-REFRESH · 100 LIGHTHOUSE · APP ROUTER",
    bgGradient: "from-[#071f30]/98 via-[#041421]/98 to-[#020a10]/98",
    spotlight: "rgba(6, 182, 212, 0.32)",
    borderGlow: "rgba(6, 182, 212, 0.65)",
    accentText: "text-cyan-300",
    accentBg: "bg-cyan-400/15 border-cyan-400/35 text-cyan-200",
    nodeGlow: "border-cyan-500/30 bg-cyan-950/25 hover:border-cyan-400/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    ambientAura: "radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 70%)",
  },
  Backend: {
    icon: Server,
    telemetry: "CONCURRENCY 25K RPS · EVENT-DRIVEN · RESILIENT",
    bgGradient: "from-[#291a07]/98 via-[#1b1003]/98 to-[#0c0701]/98",
    spotlight: "rgba(245, 158, 11, 0.32)",
    borderGlow: "rgba(245, 158, 11, 0.65)",
    accentText: "text-amber-300",
    accentBg: "bg-amber-400/15 border-amber-400/35 text-amber-200",
    nodeGlow: "border-amber-500/30 bg-amber-950/25 hover:border-amber-400/70 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    ambientAura: "radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 70%)",
  },
  Database: {
    icon: Database,
    telemetry: "CACHE HIT 99.4% · ACID COMPLIANT · REPLICATION",
    bgGradient: "from-[#06261a]/98 via-[#041911]/98 to-[#020d08]/98",
    spotlight: "rgba(16, 185, 129, 0.32)",
    borderGlow: "rgba(16, 185, 129, 0.65)",
    accentText: "text-emerald-300",
    accentBg: "bg-emerald-400/15 border-emerald-400/35 text-emerald-200",
    nodeGlow: "border-emerald-500/30 bg-emerald-950/25 hover:border-emerald-400/70 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    ambientAura: "radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)",
  },
  Mobile: {
    icon: Smartphone,
    telemetry: "60 FPS NATIVE · BRIDGELESS FABRIC · MULTI-OS",
    bgGradient: "from-[#240c38]/98 via-[#170724]/98 to-[#0a0310]/98",
    spotlight: "rgba(168, 85, 247, 0.35)",
    borderGlow: "rgba(168, 85, 247, 0.65)",
    accentText: "text-purple-300",
    accentBg: "bg-purple-400/15 border-purple-400/35 text-purple-200",
    nodeGlow: "border-purple-500/30 bg-purple-950/25 hover:border-purple-400/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]",
    ambientAura: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
  },
};

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
      className="relative min-h-screen w-full px-6 sm:px-12 py-24 sm:py-32 flex flex-col justify-center items-center select-none overflow-hidden"
    >
      {/* Two-Column Staging Layout: Dedicated Right Space for 3D Robot */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-start justify-between z-20 pointer-events-auto">
        {/* Left Skills Showcase Container (Cards live on the left, clear of robot on right) */}
        <div className="flex-1 w-full max-w-4xl">
          {/* Environmental Header */}
          <div className="mb-10 text-center lg:text-left pointer-events-none">
            <div className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-300/90 font-medium mb-2 flex items-center justify-center lg:justify-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping" />
              <span>Technical Capabilities · Systems & Engines</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              Technical{" "}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-amber-200 to-amber-400">
                Skills
              </span>
            </h2>
            <p className="font-sans text-xs text-zinc-400 tracking-[0.18em] uppercase mt-2 font-light">
              Distributed Web · Real-Time Applications · Mobile Architecture
            </p>
          </div>

          {/* Spacious 2-Column Responsive Grid with High-Tech Chromatic Modules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {categories.map((cat) => {
              const categoryNodes = TECH_NODES.filter((n) => n.category === cat);
              const config = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.Frontend;
              const IconComponent = config.icon;

              return (
                <TiltSpotlightCard
                  key={cat}
                  spotlightColor={config.spotlight}
                  borderColor={config.borderGlow}
                  accentGlow={config.ambientAura}
                  className={`border border-white/10 bg-gradient-to-b ${config.bgGradient} backdrop-blur-2xl p-5 sm:p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between bg-cyber-grid group overflow-hidden`}
                >
                  <div>
                    {/* Module Header with Live Icon and Telemetry Readout */}
                    <div className="border-b border-white/[0.08] pb-3 mb-4">
                      <div className="flex items-center justify-between font-display text-xs uppercase mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg border ${config.accentBg}`}>
                            <IconComponent className="h-3.5 w-3.5 text-current" />
                          </div>
                          <span className="font-bold text-white tracking-wider text-sm">{cat} Architecture</span>
                        </div>
                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${config.accentBg}`}>
                          ONLINE
                        </span>
                      </div>

                      {/* Live Module Telemetry Readout */}
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                        <Activity className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span className={`line-clamp-1 ${config.accentText}`}>{config.telemetry}</span>
                      </div>
                    </div>

                    {/* Node Cards */}
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
                            className={`tech-card p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer active:scale-95 ${
                              isHovered
                                ? `border-white/30 bg-white/[0.08] text-white shadow-lg -translate-y-1 scale-[1.02]`
                                : `border-white/[0.06] bg-black/30 text-zinc-300 hover:border-white/20 hover:-translate-y-0.5`
                            }`}
                          >
                            <div className="flex items-center justify-between font-display text-xs mb-1.5">
                              <span className="font-bold text-white tracking-wide text-sm">{node.name}</span>
                              <span className={`text-[10px] font-sans font-semibold uppercase tracking-widest px-2 py-0.5 rounded ${config.accentBg}`}>
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
                </TiltSpotlightCard>
              );
            })}
          </div>
        </div>

        {/* Right Column Spacer for 3D Robot (280px - 360px clear area on the right!) */}
        <div className="hidden lg:block w-[280px] xl:w-[360px] shrink-0 pointer-events-none" />
      </div>

      {/* Subtle Navigation Prompt */}
      <div className="mt-12 sm:mt-16 text-center z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 font-sans text-xs text-zinc-500 tracking-[0.2em] uppercase">
          <span>Scroll to explore architectural mindset & contact</span>
        </div>
      </div>
    </section>
  );
}
