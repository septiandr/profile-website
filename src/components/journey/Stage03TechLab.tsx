"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu } from "lucide-react";

interface Stage03Props {
  onHoverTechNode?: (index: number | null) => void;
  activeTechNode?: number | null;
}

interface SkillBubbleItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Mobile";
  size: "lg" | "md" | "sm";
  floatType: "slow" | "rev" | "diagonal" | "pulse";
  floatDelay: string;
  floatDuration: string;
  pos: {
    desktop: { left: string; top: string };
    mobile: { left: string; top: string };
  };
}

// 12 Core Production Skills scattered across an expansive zero-gravity constellation
// Distances between nearest neighbors are generous (180px - 270px) to prevent clustering
const SKILL_BUBBLES: SkillBubbleItem[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    size: "lg",
    floatType: "slow",
    floatDelay: "0s",
    floatDuration: "5.2s",
    pos: {
      desktop: { left: "4%", top: "4%" },
      mobile: { left: "4%", top: "2%" },
    },
  },
  {
    id: "golang",
    name: "Golang",
    category: "Backend",
    size: "lg",
    floatType: "rev",
    floatDelay: "0.6s",
    floatDuration: "5.6s",
    pos: {
      desktop: { left: "38%", top: "1%" },
      mobile: { left: "54%", top: "8%" },
    },
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    size: "lg",
    floatType: "diagonal",
    floatDelay: "1.2s",
    floatDuration: "6.2s",
    pos: {
      desktop: { left: "73%", top: "6%" },
      mobile: { left: "7%", top: "18%" },
    },
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Database",
    size: "lg",
    floatType: "pulse",
    floatDelay: "0.4s",
    floatDuration: "4.8s",
    pos: {
      desktop: { left: "15%", top: "28%" },
      mobile: { left: "52%", top: "24%" },
    },
  },
  {
    id: "hono",
    name: "Hono",
    category: "Backend",
    size: "lg",
    floatType: "slow",
    floatDelay: "1.8s",
    floatDuration: "5.5s",
    pos: {
      desktop: { left: "53%", top: "24%" },
      mobile: { left: "3%", top: "35%" },
    },
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    size: "md",
    floatType: "rev",
    floatDelay: "0.9s",
    floatDuration: "5.9s",
    pos: {
      desktop: { left: "86%", top: "32%" },
      mobile: { left: "55%", top: "41%" },
    },
  },
  {
    id: "react-native",
    name: "React Native",
    category: "Mobile",
    size: "lg",
    floatType: "diagonal",
    floatDelay: "1.5s",
    floatDuration: "6.4s",
    pos: {
      desktop: { left: "2%", top: "56%" },
      mobile: { left: "6%", top: "52%" },
    },
  },
  {
    id: "redis",
    name: "Redis",
    category: "Database",
    size: "md",
    floatType: "pulse",
    floatDelay: "2.1s",
    floatDuration: "5.1s",
    pos: {
      desktop: { left: "34%", top: "50%" },
      mobile: { left: "52%", top: "58%" },
    },
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    size: "md",
    floatType: "slow",
    floatDelay: "0.7s",
    floatDuration: "5.3s",
    pos: {
      desktop: { left: "68%", top: "52%" },
      mobile: { left: "3%", top: "68%" },
    },
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "Backend",
    size: "md",
    floatType: "rev",
    floatDelay: "1.7s",
    floatDuration: "5.7s",
    pos: {
      desktop: { left: "17%", top: "82%" },
      mobile: { left: "54%", top: "74%" },
    },
  },
  {
    id: "expo",
    name: "Expo",
    category: "Mobile",
    size: "md",
    floatType: "pulse",
    floatDelay: "2.5s",
    floatDuration: "4.9s",
    pos: {
      desktop: { left: "49%", top: "76%" },
      mobile: { left: "7%", top: "84%" },
    },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    size: "sm",
    floatType: "diagonal",
    floatDelay: "1.1s",
    floatDuration: "6.1s",
    pos: {
      desktop: { left: "81%", top: "78%" },
      mobile: { left: "53%", top: "90%" },
    },
  },
];

const CATEGORY_STYLES = {
  Frontend: {
    color: "#00f0ff",
    name: "Frontend",
    border: "border-[#00f0ff]/50 hover:border-[#00f0ff]",
    bg: "radial-gradient(circle at 32% 28%, rgba(0,240,255,0.22) 0%, rgba(0,240,255,0.05) 55%, rgba(0,0,0,0.12) 90%)",
    shadow: "0 0 25px rgba(0,240,255,0.2), inset 0 0 22px rgba(0,240,255,0.25), inset 0 1px 2px rgba(255,255,255,0.5)",
    hoverShadow: "0 0 50px rgba(0,240,255,0.65), inset 0 0 30px rgba(0,240,255,0.45), inset 0 1px 3px rgba(255,255,255,0.8)",
    text: "text-white font-black tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_0_16px_rgba(0,240,255,0.9)]",
    badge: "bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/50",
  },
  Backend: {
    color: "#ccff00",
    name: "Backend",
    border: "border-[#ccff00]/50 hover:border-[#ccff00]",
    bg: "radial-gradient(circle at 32% 28%, rgba(204,255,0,0.22) 0%, rgba(204,255,0,0.05) 55%, rgba(0,0,0,0.12) 90%)",
    shadow: "0 0 25px rgba(204,255,0,0.2), inset 0 0 22px rgba(204,255,0,0.25), inset 0 1px 2px rgba(255,255,255,0.5)",
    hoverShadow: "0 0 50px rgba(204,255,0,0.65), inset 0 0 30px rgba(204,255,0,0.45), inset 0 1px 3px rgba(255,255,255,0.8)",
    text: "text-white font-black tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_0_16px_rgba(204,255,0,0.9)]",
    badge: "bg-[#ccff00]/20 text-[#ccff00] border-[#ccff00]/50",
  },
  Database: {
    color: "#10b981",
    name: "Database",
    border: "border-emerald-400/50 hover:border-emerald-300",
    bg: "radial-gradient(circle at 32% 28%, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.05) 55%, rgba(0,0,0,0.12) 90%)",
    shadow: "0 0 25px rgba(16,185,129,0.2), inset 0 0 22px rgba(16,185,129,0.25), inset 0 1px 2px rgba(255,255,255,0.5)",
    hoverShadow: "0 0 50px rgba(16,185,129,0.65), inset 0 0 30px rgba(16,185,129,0.45), inset 0 1px 3px rgba(255,255,255,0.8)",
    text: "text-white font-black tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_0_16px_rgba(16,185,129,0.9)]",
    badge: "bg-emerald-500/20 text-emerald-200 border-emerald-400/50",
  },
  Mobile: {
    color: "#8b5cf6",
    name: "Mobile",
    border: "border-[#8b5cf6]/50 hover:border-[#8b5cf6]",
    bg: "radial-gradient(circle at 32% 28%, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.05) 55%, rgba(0,0,0,0.12) 90%)",
    shadow: "0 0 25px rgba(139,92,246,0.2), inset 0 0 22px rgba(139,92,246,0.25), inset 0 1px 2px rgba(255,255,255,0.5)",
    hoverShadow: "0 0 50px rgba(139,92,246,0.65), inset 0 0 30px rgba(139,92,246,0.45), inset 0 1px 3px rgba(255,255,255,0.8)",
    text: "text-white font-black tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_0_16px_rgba(139,92,246,0.9)]",
    badge: "bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]/50",
  },
};

// Procedural Web Audio Bubble Pop Sound
function playBubblePopSound(freq = 440) {
  try {
    if (typeof window === "undefined") return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq * 0.7, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 2.2, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.9, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  } catch {}
}

export default function Stage03TechLab({
  onHoverTechNode,
  activeTechNode,
}: Stage03Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [activeBubbleId, setActiveBubbleId] = useState<string | null>(null);
  const [wobbleId, setWobbleId] = useState<string | null>(null);

  const categories = ["Frontend", "Backend", "Database", "Mobile"] as const;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Master ScrollTrigger timeline for:
      // 1. Muncul satu persatu onScroll (Entrance - extended scroll pacing)
      // 2. Mengambang perlahan (Plateau where visitor reads & interacts)
      // 3. Pergi satu persatu setelah terlewat section nya (Exit)
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "tech-bubbles-scroll",
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=3800", // Generous scroll space for deliberate, satisfying bubble revelations
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Muncul satu persatu onScroll (Entrance: Scale 0 -> 1 & Y 80 -> 0)
      tl.fromTo(
        ".skill-bubble-slot",
        {
          scale: 0,
          opacity: 0,
          y: 80,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: {
            each: 0.35,
            from: "start",
          },
          duration: 3.2,
          ease: "back.out(2.0)",
        }
      );

      // 2. Plateau: Semua gelembung melayang perlahan di viewport (pengunjung membaca)
      tl.to({}, { duration: 2.2 });

      // 3. Pergi satu persatu setelah terlewat section nya (Exit: Y 0 -> -95 & Scale 1 -> 0)
      tl.to(".skill-bubble-slot", {
        scale: 0,
        opacity: 0,
        y: -95,
        stagger: {
          each: 0.16,
          from: "start",
        },
        duration: 1.8,
        ease: "power2.in",
      });

      // 4. Header & Filter fade out concurrently with bubble exit
      tl.to(
        ".skills-header-block",
        {
          opacity: 0,
          y: -50,
          scale: 0.95,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "<"
      );

      // Ambient Cosmic Halos Parallax Drift on Scroll
      gsap.to(".skills-halo-cyan", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
        x: 80,
        y: -50,
        scale: 1.2,
        ease: "none",
      });

      gsap.to(".skills-halo-amber", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
        x: -70,
        y: 45,
        scale: 1.25,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBubbleClick = (skill: SkillBubbleItem, idx: number) => {
    setActiveBubbleId(skill.id);
    setWobbleId(skill.id);
    onHoverTechNode?.(idx);

    const pitch =
      skill.category === "Frontend"
        ? 520
        : skill.category === "Backend"
        ? 440
        : skill.category === "Database"
        ? 380
        : 600;
    playBubblePopSound(pitch);

    setTimeout(() => {
      setWobbleId(null);
    }, 600);
  };

  return (
    <section
      id="zone-skills"
      ref={containerRef}
      className="relative h-screen w-full select-none overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Background Ambient Cosmic Halos */}
      <div
        aria-hidden="true"
        className="skills-halo-cyan absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full bg-cyan-500/15 blur-[160px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="skills-halo-amber absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-amber-500/15 blur-[160px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-1/4 w-[550px] h-[550px] rounded-full bg-purple-500/15 blur-[160px] pointer-events-none -z-10"
      />

      {/* Main Expansive Container */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center items-center">
        {/* Staging Layout: Bubbles Field on Left, 3D Robot Lane Clear on Right */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between z-20 pointer-events-auto gap-6">
          <div className="flex-1 w-full max-w-5xl xl:max-w-6xl">
            {/* Minimal Environmental Header */}
            <div className="mb-6 text-center lg:text-left skills-header-block">
              <div className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#00f0ff] font-bold mb-2 flex items-center justify-center lg:justify-start gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#ccff00] shadow-[0_0_12px_#ccff00] animate-pulse" />
                <span className="bg-[#ccff00]/10 px-3.5 py-1 rounded-full border border-[#ccff00]/30 flex items-center gap-2 text-white">
                  <Cpu className="h-4 w-4 text-[#ccff00]" />
                  Sector 03 · Production Capability Engines
                </span>
              </div>

              <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white tracking-[-0.03em] uppercase leading-[0.95] mb-3">
                CAPABILITY{" "}
                <span className="relative inline-block px-3.5 py-0.5 mx-1.5 text-black font-black bg-[#00f0ff] rounded-sm transform rotate-1 shadow-[0_0_35px_rgba(0,240,255,0.45)]">
                  ENGINES
                </span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-2xl mb-5">
                The core architectural frameworks, language runtimes & client engineering engines deployed in high-concurrency production.
              </p>

              {/* Minimal Category Color Legend & Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedFilter("ALL")}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 ${
                    selectedFilter === "ALL"
                      ? "border-white/50 bg-white/15 text-white font-bold shadow-md scale-105"
                      : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  <span>ALL ({SKILL_BUBBLES.length})</span>
                </button>

                {categories.map((cat) => {
                  const style = CATEGORY_STYLES[cat];
                  const isActive = selectedFilter === cat.toUpperCase();
                  const count = SKILL_BUBBLES.filter((s) => s.category === cat).length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedFilter(cat.toUpperCase())}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 ${
                        isActive
                          ? `${style.badge} font-bold shadow-lg scale-105`
                          : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: style.color }}
                      />
                      <span>{cat.toUpperCase()}</span>
                      <span className="text-[10px] opacity-75 font-semibold">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* FLOATING ORGANIC BUBBLE FIELD (Random scattered constellation, wide space) */}
            {/* ========================================================================= */}
            <div className="relative w-full h-[540px] sm:h-[580px] lg:h-[600px] my-1 select-none">
              {SKILL_BUBBLES.map((skill, idx) => {
                const style = CATEGORY_STYLES[skill.category];
                const isWobbling = wobbleId === skill.id;
                const isSelected = activeBubbleId === skill.id;
                const isDimmed =
                  selectedFilter !== "ALL" && skill.category.toUpperCase() !== selectedFilter;

                const sizeClasses =
                  skill.size === "lg"
                    ? "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 text-xs sm:text-base md:text-lg font-bold"
                    : skill.size === "md"
                    ? "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 text-[11px] sm:text-sm md:text-base font-semibold"
                    : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-[10px] sm:text-xs md:text-sm font-semibold";

                // Living, pronounced zero-gravity floating drift ("gerakan lebih terlihat")
                const driftClass =
                  skill.floatType === "slow"
                    ? "animate-drift-slow"
                    : skill.floatType === "rev"
                    ? "animate-drift-rev"
                    : skill.floatType === "pulse"
                    ? "animate-drift-pulse"
                    : "animate-drift-diagonal";

                return (
                  // Outer wrapper: Targeted by GSAP ScrollTrigger for staggered entrance & exit onScroll
                  <div
                    key={skill.id}
                    className="skill-bubble-slot absolute transform-gpu will-change-transform left-[var(--m-left)] top-[var(--m-top)] sm:left-[var(--d-left)] sm:top-[var(--d-top)]"
                    style={
                      {
                        "--m-left": skill.pos.mobile.left,
                        "--m-top": skill.pos.mobile.top,
                        "--d-left": skill.pos.desktop.left,
                        "--d-top": skill.pos.desktop.top,
                      } as React.CSSProperties
                    }
                  >
                    {/* Inner Sphere: Pronounced zero-gravity continuous floating drift */}
                    <div
                      onClick={() => handleBubbleClick(skill, idx)}
                      data-cursor-text="INSPECT"
                      onMouseEnter={() => {
                        onHoverTechNode?.(idx);
                        playBubblePopSound(
                          skill.category === "Frontend"
                            ? 520
                            : skill.category === "Backend"
                            ? 440
                            : skill.category === "Database"
                            ? 380
                            : 600
                        );
                      }}
                      onMouseLeave={() => onHoverTechNode?.(null)}
                      className={`relative rounded-full aspect-square flex items-center justify-center text-center select-none cursor-pointer backdrop-blur-[2px] border ${style.border} transition-all duration-500 group/orb transform-gpu hover:scale-125 hover:z-30 active:scale-95 ${sizeClasses} ${driftClass} ${
                        isWobbling ? "animate-wobble" : ""
                      } ${isDimmed ? "opacity-15 scale-90 blur-[1px]" : "opacity-100 scale-100"}`}
                      style={{
                        background: style.bg,
                        boxShadow: isSelected ? style.hoverShadow : style.shadow,
                        animationDelay: skill.floatDelay,
                        animationDuration: skill.floatDuration,
                      }}
                    >
                      {/* Glass Specular Highlight Arc (top-left glass sheen) */}
                      <div className="absolute top-2 left-3 w-1/3 h-1/4 rounded-full bg-gradient-to-b from-white/70 via-white/15 to-transparent blur-[0.6px] -rotate-45 pointer-events-none" />

                      {/* Secondary Rim Bounce Highlight (bottom-right) */}
                      <div className="absolute bottom-2.5 right-4 w-1/4 h-1/6 rounded-full bg-gradient-to-t from-white/35 to-transparent blur-[0.6px] pointer-events-none" />

                      {/* Click Shockwave Ripple */}
                      {isWobbling && (
                        <div
                          className="absolute inset-0 rounded-full border-2 animate-shockwave pointer-events-none"
                          style={{ borderColor: style.color }}
                        />
                      )}

                      {/* Pure Skill Text Typography - Crystal transparent bubble & razor-sharp text */}
                      <span
                        className={`font-display font-extrabold uppercase transition-all duration-300 px-2 leading-tight select-none ${style.text}`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column Spacer for 3D Robot Companion (kept 280px - 360px clear on desktop) */}
          <div className="hidden lg:block w-[280px] xl:w-[360px] shrink-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
