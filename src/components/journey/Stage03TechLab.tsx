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
  floatType: "slow" | "rev" | "diagonal";
  floatDelay: string;
  floatDuration: string;
  marginTop?: string;
  marginBottom?: string;
}

// 12 Core Production Skills with organic scattered offsets
const SKILL_BUBBLES: SkillBubbleItem[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    size: "lg",
    floatType: "slow",
    floatDelay: "0s",
    floatDuration: "9.5s",
    marginTop: "0px",
  },
  {
    id: "golang",
    name: "Golang",
    category: "Backend",
    size: "lg",
    floatType: "rev",
    floatDelay: "0.8s",
    floatDuration: "11.0s",
    marginTop: "32px",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    size: "lg",
    floatType: "diagonal",
    floatDelay: "1.6s",
    floatDuration: "12.5s",
    marginTop: "-24px",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Database",
    size: "lg",
    floatType: "slow",
    floatDelay: "0.5s",
    floatDuration: "10.0s",
    marginTop: "20px",
  },
  {
    id: "hono",
    name: "Hono",
    category: "Backend",
    size: "lg",
    floatType: "rev",
    floatDelay: "2.2s",
    floatDuration: "9.2s",
    marginTop: "-16px",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    size: "md",
    floatType: "diagonal",
    floatDelay: "1.1s",
    floatDuration: "11.8s",
    marginTop: "36px",
  },
  {
    id: "react-native",
    name: "React Native",
    category: "Mobile",
    size: "lg",
    floatType: "slow",
    floatDelay: "1.9s",
    floatDuration: "10.5s",
    marginTop: "8px",
  },
  {
    id: "redis",
    name: "Redis",
    category: "Database",
    size: "md",
    floatType: "rev",
    floatDelay: "2.7s",
    floatDuration: "11.4s",
    marginTop: "-28px",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    size: "md",
    floatType: "diagonal",
    floatDelay: "0.7s",
    floatDuration: "12.0s",
    marginTop: "16px",
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "Backend",
    size: "md",
    floatType: "slow",
    floatDelay: "2.0s",
    floatDuration: "9.8s",
    marginTop: "-18px",
  },
  {
    id: "expo",
    name: "Expo",
    category: "Mobile",
    size: "md",
    floatType: "rev",
    floatDelay: "3.1s",
    floatDuration: "10.8s",
    marginTop: "26px",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    size: "sm",
    floatType: "diagonal",
    floatDelay: "1.4s",
    floatDuration: "11.2s",
    marginTop: "-10px",
  },
];

const CATEGORY_STYLES = {
  Frontend: {
    color: "#06b6d4",
    name: "Frontend",
    border: "border-cyan-400/40 hover:border-cyan-300",
    bg: "radial-gradient(circle at 32% 28%, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.04) 55%, rgba(0,0,0,0.10) 90%)",
    shadow: "0 0 25px rgba(6,182,212,0.15), inset 0 0 22px rgba(6,182,212,0.18), inset 0 1px 2px rgba(255,255,255,0.4)",
    hoverShadow: "0 0 45px rgba(6,182,212,0.5), inset 0 0 30px rgba(6,182,212,0.35), inset 0 1px 3px rgba(255,255,255,0.6)",
    text: "text-white font-extrabold tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_0_16px_rgba(6,182,212,0.8)]",
    badge: "bg-cyan-500/20 text-cyan-200 border-cyan-400/40",
  },
  Backend: {
    color: "#f59e0b",
    name: "Backend",
    border: "border-amber-400/40 hover:border-amber-300",
    bg: "radial-gradient(circle at 32% 28%, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.04) 55%, rgba(0,0,0,0.10) 90%)",
    shadow: "0 0 25px rgba(245,158,11,0.15), inset 0 0 22px rgba(245,158,11,0.18), inset 0 1px 2px rgba(255,255,255,0.4)",
    hoverShadow: "0 0 45px rgba(245,158,11,0.5), inset 0 0 30px rgba(245,158,11,0.35), inset 0 1px 3px rgba(255,255,255,0.6)",
    text: "text-white font-extrabold tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_0_16px_rgba(245,158,11,0.8)]",
    badge: "bg-amber-500/20 text-amber-200 border-amber-400/40",
  },
  Database: {
    color: "#10b981",
    name: "Database",
    border: "border-emerald-400/40 hover:border-emerald-300",
    bg: "radial-gradient(circle at 32% 28%, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.04) 55%, rgba(0,0,0,0.10) 90%)",
    shadow: "0 0 25px rgba(16,185,129,0.15), inset 0 0 22px rgba(16,185,129,0.18), inset 0 1px 2px rgba(255,255,255,0.4)",
    hoverShadow: "0 0 45px rgba(16,185,129,0.5), inset 0 0 30px rgba(16,185,129,0.35), inset 0 1px 3px rgba(255,255,255,0.6)",
    text: "text-white font-extrabold tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_0_16px_rgba(16,185,129,0.8)]",
    badge: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
  },
  Mobile: {
    color: "#a855f7",
    name: "Mobile",
    border: "border-purple-400/40 hover:border-purple-300",
    bg: "radial-gradient(circle at 32% 28%, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.04) 55%, rgba(0,0,0,0.10) 90%)",
    shadow: "0 0 25px rgba(168,85,247,0.15), inset 0 0 22px rgba(168,85,247,0.18), inset 0 1px 2px rgba(255,255,255,0.4)",
    hoverShadow: "0 0 45px rgba(168,85,247,0.5), inset 0 0 30px rgba(168,85,247,0.35), inset 0 1px 3px rgba(255,255,255,0.6)",
    text: "text-white font-extrabold tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_0_16px_rgba(168,85,247,0.8)]",
    badge: "bg-purple-500/20 text-purple-200 border-purple-400/40",
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
      // 1. Muncul satu persatu onScroll (Entrance)
      // 2. Mengambang perlahan (Plateau where visitor reads & interacts)
      // 3. Pergi satu persatu setelah terlewat section nya (Exit)
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "tech-bubbles-scroll",
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=2600", // Extended scroll space for slow, smooth pacing
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
            each: 0.16,
            from: "start",
          },
          duration: 1.6,
          ease: "back.out(2.0)",
        }
      );

      // 2. Plateau: Semua gelembung melayang perlahan di viewport (pengunjung membaca)
      tl.to({}, { duration: 1.4 });

      // 3. Pergi satu persatu setelah terlewat section nya (Exit: Y 0 -> -90 & Scale 1 -> 0)
      tl.to(".skill-bubble-slot", {
        scale: 0,
        opacity: 0,
        y: -95,
        stagger: {
          each: 0.15,
          from: "start",
        },
        duration: 1.6,
        ease: "power2.in",
      });

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
            <div className="mb-6 text-center lg:text-left">
              <div className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase text-amber-300 font-semibold mb-2 flex items-center justify-center lg:justify-start gap-2.5">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b] animate-ping" />
                <span className="bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-amber-400" />
                  Sector 03 · Technical Arsenal
                </span>
              </div>

              <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.05] mb-2">
                Technical{" "}
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-amber-300 to-purple-400 drop-shadow-[0_0_35px_rgba(245,158,11,0.35)] animate-shimmer">
                  Arsenal
                </span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-zinc-300 tracking-[0.16em] uppercase font-light max-w-2xl mb-5">
                Floating skill cosmos. Gelembung bergerak perlahan, muncul & pergi satu persatu onScroll.
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
            {/* FLOATING ORGANIC BUBBLE FIELD (Tidak terbungkus, bergerak perlahan)        */}
            {/* ========================================================================= */}
            <div className="relative w-full py-4 min-h-[460px] sm:min-h-[500px] flex flex-wrap items-center justify-center gap-5 sm:gap-7 md:gap-9">
              {SKILL_BUBBLES.map((skill, idx) => {
                const style = CATEGORY_STYLES[skill.category];
                const isWobbling = wobbleId === skill.id;
                const isSelected = activeBubbleId === skill.id;
                const isDimmed =
                  selectedFilter !== "ALL" && skill.category.toUpperCase() !== selectedFilter;

                const sizeClasses =
                  skill.size === "lg"
                    ? "w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 text-base sm:text-lg md:text-xl font-bold"
                    : skill.size === "md"
                    ? "w-26 h-26 sm:w-30 sm:h-30 md:w-34 md:h-34 text-sm sm:text-base md:text-lg font-semibold"
                    : "w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 text-xs sm:text-sm md:text-base font-semibold";

                // Ultra-slow, silky organic floating drift ("bergerak perlahan")
                const driftClass =
                  skill.floatType === "slow"
                    ? "animate-drift-slow"
                    : skill.floatType === "rev"
                    ? "animate-drift-rev"
                    : "animate-drift-diagonal";

                return (
                  // Outer wrapper: Targeted by GSAP ScrollTrigger for staggered entrance & exit onScroll
                  <div
                    key={skill.id}
                    className="skill-bubble-slot transform-gpu will-change-transform"
                    style={{
                      marginTop: skill.marginTop || "0px",
                      marginBottom: skill.marginBottom || "0px",
                    }}
                  >
                    {/* Inner Sphere: Ultra-slow zero-gravity continuous floating drift */}
                    <div
                      onClick={() => handleBubbleClick(skill, idx)}
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
                        className={`font-display font-extrabold uppercase transition-all duration-300 px-3 leading-tight select-none ${style.text}`}
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
