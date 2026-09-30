"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH_NODES, TechNode } from "@/journey/types";
import {
  Layers,
  Server,
  Database,
  Smartphone,
  Activity,
  Zap,
  Sparkles,
  CheckCircle2,
  Cpu,
  Radio,
  Sliders,
} from "lucide-react";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";

interface Stage03Props {
  onHoverTechNode?: (index: number | null) => void;
  activeTechNode?: number | null;
}

interface NodeMetric {
  benchmark: number;
  metricLabel: string;
  badge: string;
  frequency: string;
}

const NODE_METRICS: Record<string, NodeMetric> = {
  "React 19": {
    benchmark: 99,
    metricLabel: "CONCURRENT / RSC ENGINE",
    badge: "Production Ready",
    frequency: "120 FPS",
  },
  "Next.js 15": {
    benchmark: 98,
    metricLabel: "TURBOPACK / SSR LATENCY",
    badge: "100 Lighthouse",
    frequency: "0.2ms",
  },
  TypeScript: {
    benchmark: 100,
    metricLabel: "STRICT CONTRACT SYSTEM",
    badge: "Zero Any Policy",
    frequency: "Strict",
  },
  Golang: {
    benchmark: 99,
    metricLabel: "GOROUTINES / 25K RPS",
    badge: "p99: 1.2ms",
    frequency: "High Concurrency",
  },
  "Node.js": {
    benchmark: 96,
    metricLabel: "ASYNC EVENT PIPELINE",
    badge: "Non-blocking",
    frequency: "Event Bus",
  },
  Laravel: {
    benchmark: 94,
    metricLabel: "ENTERPRISE MVC / REST",
    badge: "Clean Architecture",
    frequency: "Queued Jobs",
  },
  PostgreSQL: {
    benchmark: 98,
    metricLabel: "ACID TRANSACTIONS / POOL",
    badge: "Zero Data Loss",
    frequency: "B-Tree Index",
  },
  Redis: {
    benchmark: 99,
    metricLabel: "IN-MEMORY CACHE / PUB-SUB",
    badge: "99.4% Hit Rate",
    frequency: "< 0.5ms",
  },
  "React Native": {
    benchmark: 98,
    metricLabel: "BRIDGELESS FABRIC CORE",
    badge: "60 FPS Native",
    frequency: "JSI Engine",
  },
  Expo: {
    benchmark: 96,
    metricLabel: "EAS BUILD / OTA UPDATES",
    badge: "Cross-Platform",
    frequency: "Instant Sync",
  },
};

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
    barGradient: string;
    nodeGlow: string;
    ambientAura: string;
    topBeam: string;
    circuitColor: string;
  }
> = {
  Frontend: {
    icon: Layers,
    telemetry: "CONCURRENT 120FPS · 100 LIGHTHOUSE · APP ROUTER",
    bgGradient: "from-[#071f30]/98 via-[#041421]/98 to-[#020a10]/98",
    spotlight: "rgba(6, 182, 212, 0.32)",
    borderGlow: "rgba(6, 182, 212, 0.65)",
    accentText: "text-cyan-300",
    accentBg: "bg-cyan-400/15 border-cyan-400/40 text-cyan-200",
    barGradient: "from-cyan-500 via-sky-400 to-cyan-200",
    nodeGlow: "border-cyan-500/30 bg-cyan-950/25 hover:border-cyan-400/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    ambientAura: "radial-gradient(circle, rgba(6,182,212,0.28) 0%, transparent 70%)",
    topBeam: "via-cyan-400",
    circuitColor: "#06b6d4",
  },
  Backend: {
    icon: Server,
    telemetry: "CONCURRENCY 25K RPS · EVENT-DRIVEN · RESILIENT",
    bgGradient: "from-[#291a07]/98 via-[#1b1003]/98 to-[#0c0701]/98",
    spotlight: "rgba(245, 158, 11, 0.32)",
    borderGlow: "rgba(245, 158, 11, 0.65)",
    accentText: "text-amber-300",
    accentBg: "bg-amber-400/15 border-amber-400/40 text-amber-200",
    barGradient: "from-amber-500 via-yellow-400 to-amber-200",
    nodeGlow: "border-amber-500/30 bg-amber-950/25 hover:border-amber-400/70 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    ambientAura: "radial-gradient(circle, rgba(245,158,11,0.28) 0%, transparent 70%)",
    topBeam: "via-amber-400",
    circuitColor: "#f59e0b",
  },
  Database: {
    icon: Database,
    telemetry: "CACHE HIT 99.4% · ACID COMPLIANT · REPLICATION",
    bgGradient: "from-[#06261a]/98 via-[#041911]/98 to-[#020d08]/98",
    spotlight: "rgba(16, 185, 129, 0.32)",
    borderGlow: "rgba(16, 185, 129, 0.65)",
    accentText: "text-emerald-300",
    accentBg: "bg-emerald-400/15 border-emerald-400/40 text-emerald-200",
    barGradient: "from-emerald-500 via-teal-400 to-emerald-200",
    nodeGlow: "border-emerald-500/30 bg-emerald-950/25 hover:border-emerald-400/70 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    ambientAura: "radial-gradient(circle, rgba(16,185,129,0.28) 0%, transparent 70%)",
    topBeam: "via-emerald-400",
    circuitColor: "#10b981",
  },
  Mobile: {
    icon: Smartphone,
    telemetry: "60 FPS NATIVE · BRIDGELESS FABRIC · MULTI-OS",
    bgGradient: "from-[#240c38]/98 via-[#170724]/98 to-[#0a0310]/98",
    spotlight: "rgba(168, 85, 247, 0.35)",
    borderGlow: "rgba(168, 85, 247, 0.65)",
    accentText: "text-purple-300",
    accentBg: "bg-purple-400/15 border-purple-400/40 text-purple-200",
    barGradient: "from-purple-500 via-fuchsia-400 to-purple-200",
    nodeGlow: "border-purple-500/30 bg-purple-950/25 hover:border-purple-400/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]",
    ambientAura: "radial-gradient(circle, rgba(168,85,247,0.30) 0%, transparent 70%)",
    topBeam: "via-purple-400",
    circuitColor: "#a855f7",
  },
};

export default function Stage03TechLab({
  onHoverTechNode,
  activeTechNode,
}: Stage03Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [barsAnimated, setBarsAnimated] = useState<boolean>(false);
  const [clickedNode, setClickedNode] = useState<string | null>(null);

  const categories = ["Frontend", "Backend", "Database", "Mobile"] as const;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Kinetic Staggered 3D Cascade for Tech Pods
      gsap.fromTo(
        ".tech-pod",
        {
          opacity: 0,
          y: 55,
          rotateX: 14,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
            onEnter: () => setBarsAnimated(true),
          },
        }
      );

      // 2. Stagger reveal for inside items
      gsap.fromTo(
        ".tech-card-item",
        {
          opacity: 0,
          x: -18,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNodeClick = (index: number, node: TechNode) => {
    setClickedNode(clickedNode === node.name ? null : node.name);
    onHoverTechNode?.(index);
  };

  const handleNodeHover = (index: number, node: TechNode) => {
    onHoverTechNode?.(index);
  };

  const handleNodeLeave = () => {
    if (!clickedNode) {
      onHoverTechNode?.(null);
    }
  };

  const filteredCategories =
    selectedFilter === "ALL"
      ? categories
      : categories.filter((c) => c.toUpperCase() === selectedFilter);

  return (
    <section
      id="zone-skills"
      ref={containerRef}
      className="relative min-h-[125vh] w-full px-6 sm:px-12 py-28 sm:py-36 flex flex-col justify-center items-center select-none overflow-hidden"
    >
      {/* Dynamic Background Telemetry Circuit Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"
      />

      {/* Two-Column Staging Layout: Dedicated Right Space for 3D Robot */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-start justify-between z-20 pointer-events-auto">
        {/* Left Skills Showcase Container (Cards live on the left, clear of robot on right) */}
        <div className="flex-1 w-full max-w-4xl">
          {/* Environmental Header */}
          <div className="mb-8 text-center lg:text-left pointer-events-none">
            <div className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-300/90 font-medium mb-2 flex items-center justify-center lg:justify-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping" />
              <span>Technical Capabilities · Systems & Engines</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              Technical{" "}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-amber-200 to-amber-400">
                Arsenal
              </span>
            </h2>
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-2 flex-wrap">
              <p className="font-sans text-xs text-zinc-400 tracking-[0.18em] uppercase font-light">
                Distributed Web · Real-Time Pipelines · Cross-Platform Core
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 font-mono text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>10/10 PRODUCTION VALIDATED</span>
              </div>
            </div>
          </div>

          {/* High-Tech Architecture Domain Filter Tabs */}
          <div className="flex items-center gap-2 mb-7 flex-wrap justify-center lg:justify-start">
            {["ALL", "FRONTEND", "BACKEND", "DATABASE", "MOBILE"].map((filter) => {
              const isActive = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wider transition-all duration-300 border ${
                    isActive
                      ? "border-amber-400/80 bg-amber-400/20 text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-105"
                      : "border-white/10 bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:border-white/25"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-amber-400 shadow-[0_0_6px_#f59e0b] scale-125"
                        : "bg-zinc-600 group-hover:bg-zinc-400"
                    }`}
                  />
                  <span>{filter === "ALL" ? "ALL SYSTEMS" : filter}</span>
                </button>
              );
            })}
          </div>

          {/* Spacious 2-Column Responsive Grid with High-Tech Kinetic Pods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {filteredCategories.map((cat) => {
              const categoryNodes = TECH_NODES.filter((n) => n.category === cat);
              const config = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.Frontend;
              const IconComponent = config.icon;

              return (
                <div key={cat} className="tech-pod will-change-transform">
                  <TiltSpotlightCard
                    spotlightColor={config.spotlight}
                    borderColor={config.borderGlow}
                    accentGlow={config.ambientAura}
                    className={`relative border border-white/10 bg-gradient-to-b ${config.bgGradient} backdrop-blur-2xl p-5 sm:p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between bg-cyber-grid group overflow-hidden`}
                  >
                    {/* Top Animated Laser Beam */}
                    <div
                      className={`absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent ${config.topBeam} to-transparent opacity-75 group-hover:opacity-100 group-hover:scale-x-110 transition-all duration-500`}
                    />

                    <div>
                      {/* Module Header with Live Icon and Audio Frequency Equalizer */}
                      <div className="border-b border-white/[0.08] pb-3 mb-4">
                        <div className="flex items-center justify-between font-display text-xs uppercase mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg border ${config.accentBg} group-hover:scale-110 transition-transform`}>
                              <IconComponent className="h-4 w-4 text-current" />
                            </div>
                            <span className="font-bold text-white tracking-wider text-sm sm:text-base">
                              {cat} Architecture
                            </span>
                          </div>

                          {/* Live Dynamic Equalizer Bars */}
                          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                            <div className="flex items-end gap-0.5 h-3">
                              <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-1.5" />
                              <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-3" />
                              <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-1" />
                              <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5" />
                              <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-2" />
                            </div>
                            <span className="font-mono text-[9px] text-emerald-300 font-bold">ONLINE</span>
                          </div>
                        </div>

                        {/* Live Module Telemetry Readout */}
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                          <Activity className="h-3 w-3 text-emerald-400 shrink-0 animate-pulse" />
                          <span className={`line-clamp-1 ${config.accentText}`}>{config.telemetry}</span>
                        </div>
                      </div>

                      {/* Interactive Node Cards */}
                      <div className="space-y-3">
                        {categoryNodes.map((node) => {
                          const globalIdx = TECH_NODES.findIndex((n) => n.name === node.name);
                          const isHovered = activeTechNode === globalIdx;
                          const isClicked = clickedNode === node.name;
                          const metric = NODE_METRICS[node.name] || {
                            benchmark: 95,
                            metricLabel: "PRODUCTION PIPELINE",
                            badge: "Verified",
                            frequency: "High",
                          };

                          return (
                            <div
                              key={node.name}
                              onClick={() => handleNodeClick(globalIdx, node)}
                              onMouseEnter={() => handleNodeHover(globalIdx, node)}
                              onMouseLeave={handleNodeLeave}
                              className={`tech-card-item group/item relative p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                                isClicked || isHovered
                                  ? `border-white/40 bg-white/[0.09] text-white shadow-[0_10px_25px_rgba(0,0,0,0.6)] -translate-y-1 scale-[1.02]`
                                  : `border-white/[0.06] bg-black/40 text-zinc-300 hover:border-white/25 hover:bg-black/60 hover:-translate-y-0.5`
                              }`}
                            >
                              {/* Laser Scanline Beam on Hover */}
                              <div
                                aria-hidden="true"
                                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-y-full group-hover/item:translate-y-16 transition-transform duration-700 pointer-events-none"
                              />

                              {/* Corner Reticle Brackets on Active / Hover */}
                              {(isHovered || isClicked) && (
                                <>
                                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-amber-400" />
                                  <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-amber-400" />
                                  <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-amber-400" />
                                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-amber-400" />
                                </>
                              )}

                              {/* Card Header */}
                              <div className="flex items-center justify-between font-display text-xs mb-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white tracking-wide text-sm sm:text-base group-hover/item:text-amber-200 transition-colors">
                                    {node.name}
                                  </span>
                                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                                    {metric.frequency}
                                  </span>
                                </div>
                                <span className={`text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${config.accentBg}`}>
                                  {metric.badge}
                                </span>
                              </div>

                              {/* Node Detail */}
                              <p className="font-sans text-xs text-zinc-300 font-light leading-relaxed mb-2.5">
                                {node.detail}
                              </p>

                              {/* Animated Benchmark Meter Bar */}
                              <div className="pt-2 border-t border-white/[0.06]">
                                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 mb-1">
                                  <span className={`font-semibold tracking-wider ${config.accentText}`}>
                                    {metric.metricLabel}
                                  </span>
                                  <span className="font-bold text-white">
                                    {metric.benchmark}%
                                  </span>
                                </div>
                                <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden p-0.5">
                                  <div
                                    className={`h-full rounded-full bg-gradient-to-r ${config.barGradient} transition-all duration-1000 ease-out shadow-[0_0_8px_currentColor]`}
                                    style={{
                                      width: barsAnimated ? `${metric.benchmark}%` : "0%",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </TiltSpotlightCard>
                </div>
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
          <span>Click skills to inspect live telemetry · Scroll to explore personnel dossier</span>
        </div>
      </div>
    </section>
  );
}
