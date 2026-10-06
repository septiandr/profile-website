"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Cpu, 
  Terminal, 
  Database, 
  Smartphone, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Maximize2
} from "lucide-react";

// Creative Studio Capability Pillars with Distinct Chromatic Themes
const CAPABILITY_PILLARS = [
  {
    icon: Terminal,
    id: "frontend",
    shortLabel: "01 FRONTEND",
    verticalLabel: "FRONTEND & 3D INTERACTION",
    category: "FRONTEND & 3D INTERACTION",
    number: "01",
    tagline: "High-Tactile 60fps Reactive Interfaces & WebGL",
    lead: "Modern reactive frontends, WebGL rendering pipelines, and silky 60fps tactile interfaces built with strict micro-interaction discipline.",
    skills: ["React 19", "Next.js 15", "TypeScript", "Three.js", "GSAP", "Tailwind CSS", "Vite", "WebGL"],
    specs: [
      "Sub-second First Input Delay & 60fps WebGL Shaders",
      "Tactile Micro-interactions & Kinetic Typography",
      "WCAG 2.1 AA Accessible & Fluid Responsive Layouts",
    ],
    accentBorder: "border-blue-500",
    barColor: "bg-blue-600",
    badge: "bg-blue-600 text-white",
    badgeBg: "bg-blue-100 text-blue-950 border-blue-300",
    iconColor: "text-blue-600",
    glowColor: "shadow-[0_0_25px_rgba(37,99,235,0.25)]",
    themeColor: "text-blue-600",
    chipHover: "bg-blue-600 text-white border-blue-600",
    chipBase: "bg-blue-50/90 text-blue-950 border-blue-200 hover:border-blue-500",
  },
  {
    icon: Cpu,
    id: "backend",
    shortLabel: "02 BACKEND",
    verticalLabel: "DISTRIBUTED BACKEND & RUNTIMES",
    category: "DISTRIBUTED BACKEND & RUNTIMES",
    number: "02",
    tagline: "Event-Driven Microservices & Low Latency APIs",
    lead: "High-throughput microservices, sub-second API pipelines, and resilient event-driven architectures designed for mission-critical enterprise scale.",
    skills: ["Golang", "Node.js", "Laravel", "REST APIs", "WebSockets", "Docker", "Microservices", "gRPC"],
    specs: [
      "Sub-20ms P99 API Response Latency Under Concurrency",
      "Event-Driven Architecture & Scalable Message Queues",
      "PCI-DSS / ISO27001 Grade API Security & JWT RBAC",
    ],
    accentBorder: "border-emerald-500",
    barColor: "bg-emerald-600",
    badge: "bg-emerald-600 text-white",
    badgeBg: "bg-emerald-100 text-emerald-950 border-emerald-300",
    iconColor: "text-emerald-600",
    glowColor: "shadow-[0_0_25px_rgba(5,150,105,0.25)]",
    themeColor: "text-emerald-600",
    chipHover: "bg-emerald-600 text-white border-emerald-600",
    chipBase: "bg-emerald-50/90 text-emerald-950 border-emerald-200 hover:border-emerald-500",
  },
  {
    icon: Database,
    id: "database",
    shortLabel: "03 DATABASE",
    verticalLabel: "PERSISTENCE & STATE ENGINES",
    category: "PERSISTENCE & STATE ENGINES",
    number: "03",
    tagline: "ACID Relational Storage & Ultra-Fast In-Memory Cache",
    lead: "ACID-compliant relational data modeling, ultra-low-latency in-memory cache layers, and deterministic reactive frontend state management.",
    skills: ["PostgreSQL", "Redis", "MySQL", "Zustand", "Redux Toolkit", "React Query", "Prisma"],
    specs: [
      "ACID Atomic Transactions with Zero Dirty Reads",
      "Redis In-Memory Caching & Sub-Millisecond Keyspaces",
      "Optimistic UI Mutation with Automatic Rollbacks",
    ],
    accentBorder: "border-purple-500",
    barColor: "bg-purple-600",
    badge: "bg-purple-600 text-white",
    badgeBg: "bg-purple-100 text-purple-950 border-purple-300",
    iconColor: "text-purple-600",
    glowColor: "shadow-[0_0_25px_rgba(147,51,234,0.25)]",
    themeColor: "text-purple-600",
    chipHover: "bg-purple-600 text-white border-purple-600",
    chipBase: "bg-purple-50/90 text-purple-950 border-purple-200 hover:border-purple-500",
  },
  {
    icon: Smartphone,
    id: "mobile",
    shortLabel: "04 MOBILE/IOT",
    verticalLabel: "MOBILE RUNTIMES & IOT ECOSYSTEMS",
    category: "MOBILE RUNTIMES & IOT ECOSYSTEMS",
    number: "04",
    tagline: "Native-Bridge Apps & Real-Time Hardware Telemetry",
    lead: "Cross-platform mobile applications, live hardware telemetry websockets, native device bridge modules, and precise geo-fencing engines.",
    skills: ["React Native", "IoT Telemetry", "Maps SDK", "Native Bridge", "Barcode Engine", "BLE", "MQTT"],
    specs: [
      "99.8% Crash-Free User Sessions on iOS & Android",
      "Real-Time MQTT & WebSockets Hardware Telemetry",
      "Offline-First SQLite Cache with Seamless Auto-Sync",
    ],
    accentBorder: "border-orange-500",
    barColor: "bg-orange-500",
    badge: "bg-orange-600 text-white",
    badgeBg: "bg-orange-100 text-orange-950 border-orange-300",
    iconColor: "text-orange-600",
    glowColor: "shadow-[0_0_25px_rgba(234,88,12,0.25)]",
    themeColor: "text-orange-600",
    chipHover: "bg-orange-600 text-white border-orange-600",
    chipBase: "bg-orange-50/90 text-orange-950 border-orange-200 hover:border-orange-500",
  },
];

// Procedural Audio Tick Feedback
function playAudioTick(pitch = 500) {
  try {
    if (typeof window === "undefined") return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Autoplay restrictions
  }
}

export default function MagazineCapabilities() {
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  // Dwell centers corresponding to the 4 pillars in the timeline
  const SNAP_STEPS = [0.10, 0.37, 0.63, 0.89];

  const setColumnActive = (index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
    playAudioTick(420 + index * 80);

    if (scrollTriggerInstanceRef.current) {
      const st = scrollTriggerInstanceRef.current;
      const targetProgress = SNAP_STEPS[index] ?? 0;
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Real GSAP timeline with scrub: 1.0 for genuine physics damping & buttery scroll inertia
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "section-disciplines-accordion-workstation",
          trigger: section,
          start: "top top",
          end: "+=4800", // Generous, relaxed scroll runway so each discipline can be read comfortably
          pin: true,
          scrub: 1.0, // 1.0s momentum smoothing
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const current = activeIndexRef.current;

            // Hysteresis thresholds with generous dwell zones:
            // Prevents flickering at boundaries and gives ample reading time for each discipline
            let nextIndex = current;
            if (p < 0.22) {
              nextIndex = 0;
            } else if (p < 0.26) {
              nextIndex = current === 0 ? 0 : 1;
            } else if (p < 0.48) {
              nextIndex = 1;
            } else if (p < 0.52) {
              nextIndex = current <= 1 ? 1 : 2;
            } else if (p < 0.74) {
              nextIndex = 2;
            } else if (p < 0.78) {
              nextIndex = current <= 2 ? 2 : 3;
            } else {
              nextIndex = 3;
            }

            if (nextIndex !== current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        },
      });

      // Dummy tween spanning the timeline so ScrollTrigger scrub has a real timeline to smooth
      tl.to({}, { duration: 10 });

      scrollTriggerInstanceRef.current = tl.scrollTrigger as ScrollTrigger;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activePillar = CAPABILITY_PILLARS[activeIndex] || CAPABILITY_PILLARS[0];

  return (
    <section
      id="mag-capabilities"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[640px] max-h-screen bg-[#faf9f6] text-zinc-950 font-sans border-b border-zinc-950/15 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. Compact Editorial Header Monograph */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-5 sm:pt-6 pb-3 border-b border-zinc-950/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shrink-0 z-30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-purple-100 text-purple-950 border border-purple-300 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse" />
              <span>SECTION 03 / 04 · THE CREATIVE STUDIO & CORE DISCIPLINES</span>
            </span>
            <span className="text-[10px] font-mono font-extrabold text-purple-700 bg-purple-50/90 border border-purple-200 px-2.5 py-0.5 rounded shadow-2xs">
              COLUMN 0{activeIndex + 1} / 04: {activePillar.category}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight uppercase leading-tight">
            STUDIO DISCIPLINES:{" "}
            <span className="font-serif italic font-normal text-zinc-700 underline decoration-purple-600 decoration-2 underline-offset-4">
              INTERACTIVE ARCHITECTURAL EQUALIZER
            </span>
          </h2>
        </div>

        {/* Console Mode Hint & Controls */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5 bg-white border border-zinc-300/80 p-1 rounded shadow-2xs">
            {CAPABILITY_PILLARS.map((p, idx) => (
              <button
                key={p.number}
                onClick={() => setColumnActive(idx)}
                data-cursor-text={`0${idx + 1}`}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded transition-all cursor-pointer ${
                  activeIndex === idx
                    ? "bg-purple-600 text-white shadow-xs scale-105"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                }`}
              >
                {p.shortLabel}
              </button>
            ))}
          </div>

          {/* Stepper Arrows */}
          <div className="flex items-center gap-1 bg-white border border-zinc-300/80 p-1 rounded shadow-2xs">
            <button
              onClick={() => setColumnActive(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous discipline pillar"
              className="p-1 rounded text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setColumnActive(Math.min(CAPABILITY_PILLARS.length - 1, activeIndex + 1))}
              disabled={activeIndex === CAPABILITY_PILLARS.length - 1}
              aria-label="Next discipline pillar"
              className="p-1 rounded text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Monolithic Architectural Equalizer Console */}
      <div className="relative flex-1 w-full min-h-0 overflow-hidden flex items-center justify-center p-4 sm:p-7">
        <div className="w-full max-w-7xl h-full flex flex-col md:flex-row gap-3 sm:gap-4.5 items-stretch">
          {CAPABILITY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activeIndex === idx;

            return (
              <div
                key={pillar.id}
                onClick={() => setColumnActive(idx)}
                onMouseEnter={() => {
                  if (!isActive) playAudioTick(380 + idx * 60);
                }}
                className={`relative rounded-xl border-2 transition-[flex-grow,flex-basis,background-color,border-color,box-shadow,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex flex-col justify-between cursor-pointer select-none ${
                  isActive
                    ? `md:flex-[4.8] flex-1 bg-white border-zinc-950/40 ${pillar.glowColor} shadow-[0_30px_80px_rgba(0,0,0,0.14)] z-20`
                    : "md:flex-1 h-14 md:h-auto bg-[#f6f4ed] border-zinc-300/70 hover:border-zinc-400 hover:bg-[#efece4] opacity-85 hover:opacity-100 z-10"
                }`}
              >
                {/* Chromatic Top Laser Bar */}
                <div className={`h-2.5 w-full ${pillar.barColor} shrink-0`} />

                {/* Inner Relative Container Hosting Both Views for Zero-Pop Morphing */}
                <div className="relative flex-1 w-full h-full min-h-0 overflow-hidden">
                  {/* 1. COLLAPSED MONOLITHIC SPINE VIEW (Visible when inactive) */}
                  <div
                    className={`absolute inset-0 p-3 sm:p-4 flex md:flex-col flex-row items-center justify-between select-none transition-all duration-400 ease-out ${
                      isActive
                        ? "opacity-0 pointer-events-none scale-95"
                        : "opacity-100 pointer-events-auto scale-100"
                    }`}
                  >
                    {/* Top Spine Identifiers */}
                    <div className="flex md:flex-col flex-row items-center gap-2 md:gap-3">
                      <div className={`p-1.5 rounded bg-white border border-zinc-200 shadow-2xs ${pillar.iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-display font-black text-lg md:text-xl text-zinc-950 tracking-tight">
                        0{pillar.number}
                      </span>
                    </div>

                    {/* Middle: Rotated Monograph Column Spine on Desktop */}
                    <div className="hidden md:flex flex-1 items-center justify-center py-6">
                      <span className="font-mono text-[11px] font-black tracking-widest uppercase text-zinc-500 whitespace-nowrap [writing-mode:vertical-rl] rotate-180 group-hover:text-zinc-950 transition-colors">
                        {pillar.verticalLabel}
                      </span>
                    </div>

                    {/* Mobile Horizontal Category Title */}
                    <span className="md:hidden font-sans text-xs font-extrabold uppercase text-zinc-700 tracking-wider truncate px-2">
                      {pillar.category}
                    </span>

                    {/* Bottom Status / Expand Hint Indicator */}
                    <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-purple-600 transition-colors">
                      <span className="h-2 w-2 rounded-full bg-zinc-300 group-hover:bg-purple-600" />
                      <Maximize2 className="h-3.5 w-3.5 hidden md:block" />
                    </div>
                  </div>

                  {/* 2. EXPANDED RICH DOSSIER VIEW (Visible when active) */}
                  <div
                    className={`absolute inset-0 p-4 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-220px)] md:max-h-none space-y-4 sm:space-y-5 w-full min-w-[320px] sm:min-w-[460px] lg:min-w-[560px] transition-all duration-500 ease-out ${
                      isActive
                        ? "opacity-100 pointer-events-auto translate-y-0 scale-100 delay-150"
                        : "opacity-0 pointer-events-none translate-y-3 scale-[0.98]"
                    }`}
                  >
                    <div>
                      {/* Top Badges & Icon */}
                      <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg bg-white border border-zinc-200 shadow-2xs ${pillar.iconColor}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-mono text-[10px] font-black tracking-widest uppercase text-zinc-500 block">
                              PILLAR 0{pillar.number} // ACTIVE EXPANDED
                            </span>
                            <span className="font-sans text-[11px] font-bold text-zinc-700">
                              {pillar.tagline}
                            </span>
                          </div>
                        </div>

                        <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider border shadow-2xs ${pillar.badgeBg}`}>
                          EXPANDED CONSOLE
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-zinc-950 uppercase tracking-tight mb-2">
                        {pillar.category}
                      </h3>

                      {/* Lead Statement */}
                      <p className="font-serif text-sm sm:text-base text-zinc-700 italic font-normal leading-relaxed mb-5 border-l-3 border-purple-500 pl-4">
                        “{pillar.lead}”
                      </p>

                      {/* Technical Standards */}
                      <div className="space-y-2 pt-3 border-t border-zinc-200/70 mb-5">
                        <div className="font-sans text-[9px] uppercase font-extrabold tracking-widest text-zinc-400">
                          ENGINEERING STANDARDS & GUARANTEES
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {pillar.specs.map((spec, sIdx) => (
                            <div
                              key={sIdx}
                              className="flex items-start gap-2 p-2 bg-zinc-50 rounded border border-zinc-200/80 text-[11px] text-zinc-800 leading-snug"
                            >
                              <CheckCircle2 className={`h-3.5 w-3.5 ${pillar.themeColor} shrink-0 mt-0.5`} />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Active Production Stack Chips */}
                    <div>
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 mb-2.5">
                        <div className="font-sans text-[9px] uppercase font-extrabold tracking-widest text-zinc-500 flex items-center gap-1.5">
                          <Layers className="h-3 w-3 text-purple-600" />
                          <span>ACTIVE PRODUCTION MODULES ({pillar.skills.length})</span>
                        </div>
                        <span className="font-mono text-[9px] font-bold text-zinc-400">
                          HOVER TO INSPECT
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {pillar.skills.map((skill, sIdx) => {
                          const isHovered = activeToken === skill;

                          return (
                            <button
                              key={sIdx}
                              onMouseEnter={() => {
                                setActiveToken(skill);
                                playAudioTick(460 + sIdx * 25);
                              }}
                              onMouseLeave={() => setActiveToken(null)}
                              data-cursor-text="INSPECT"
                              className={`font-sans text-[11px] font-bold px-3 py-1.5 border transition-all duration-200 cursor-pointer rounded-xs shadow-2xs ${
                                isHovered
                                  ? `${pillar.chipHover} scale-105 shadow-xs`
                                  : `${pillar.chipBase}`
                              }`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
