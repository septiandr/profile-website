"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Terminal, Database, Smartphone } from "lucide-react";

// Creative Studio Capability Pillars with Distinct Chromatic Themes
const CAPABILITY_PILLARS = [
  {
    icon: Terminal,
    category: "FRONTEND & 3D INTERACTION",
    number: "01",
    lead: "Modern reactive frontends, WebGL rendering pipelines, and silky 60fps tactile interfaces.",
    skills: ["React", "Next.js 15", "TypeScript", "Three.js", "GSAP", "Tailwind CSS", "Vite", "WebGL"],
    cardBg: "bg-blue-50/80 border-blue-200 hover:border-blue-400",
    badge: "bg-blue-600 text-white",
    iconColor: "text-blue-600",
    chipHover: "bg-blue-600 text-white border-blue-600",
    chipBase: "bg-white text-blue-950 border-blue-200 hover:border-blue-500",
  },
  {
    icon: Cpu,
    category: "DISTRIBUTED BACKEND & RUNTIMES",
    number: "02",
    lead: "High-throughput microservices, sub-second API pipelines, and event-driven architectures.",
    skills: ["Golang", "Node.js", "Laravel", "REST APIs", "WebSockets", "Docker", "Microservices"],
    cardBg: "bg-emerald-50/80 border-emerald-200 hover:border-emerald-400",
    badge: "bg-emerald-600 text-white",
    iconColor: "text-emerald-600",
    chipHover: "bg-emerald-600 text-white border-emerald-600",
    chipBase: "bg-white text-emerald-950 border-emerald-200 hover:border-emerald-500",
  },
  {
    icon: Database,
    category: "PERSISTENCE & STATE ENGINES",
    number: "03",
    lead: "ACID-compliant relational storage, ultra-low-latency in-memory cache, and reactive stores.",
    skills: ["PostgreSQL", "Redis", "MySQL", "Zustand", "Redux Toolkit", "React Query"],
    cardBg: "bg-purple-50/80 border-purple-200 hover:border-purple-400",
    badge: "bg-purple-600 text-white",
    iconColor: "text-purple-600",
    chipHover: "bg-purple-600 text-white border-purple-600",
    chipBase: "bg-white text-purple-950 border-purple-200 hover:border-purple-500",
  },
  {
    icon: Smartphone,
    category: "MOBILE RUNTIMES & IOT ECOSYSTEMS",
    number: "04",
    lead: "Cross-platform mobile applications, live hardware telemetry websockets, and map geo-fencing.",
    skills: ["React Native", "IoT Telemetry", "Maps SDK", "Native Bridge", "Barcode Engine"],
    cardBg: "bg-orange-50/80 border-orange-200 hover:border-orange-400",
    badge: "bg-orange-600 text-white",
    iconColor: "text-orange-600",
    chipHover: "bg-orange-600 text-white border-orange-600",
    chipBase: "bg-white text-orange-950 border-orange-200 hover:border-orange-500",
  },
];

// Procedural Web Audio Beep Sound
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
    // Ignore audio autoplay restrictions
  }
}

export default function MagazineCapabilities() {
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Kinetic Scrub on Section Title
      if (titleRef.current && sectionRef.current) {
        gsap.fromTo(
          titleRef.current,
          { x: -40 },
          {
            x: 40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Manifesto Quote entrance
      if (manifestoRef.current) {
        gsap.fromTo(
          manifestoRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 3. Staggered Capability Cards & Chip Cascade entrance
      const capCards = gsap.utils.toArray<HTMLElement>(".mag-cap-card");
      capCards.forEach((card, idx) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { y: 70, opacity: 0.15, scale: 0.95, rotateX: 3 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.75,
            delay: idx * 0.08,
            ease: "power3.out",
          }
        );

        const badge = card.querySelector(".mag-cap-badge");
        if (badge) {
          tl.fromTo(
            badge,
            { scale: 0.6, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" },
            "-=0.4"
          );
        }

        const capTitle = card.querySelector(".mag-cap-title");
        if (capTitle) {
          tl.fromTo(
            capTitle,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
            "-=0.3"
          );
        }

        const capLead = card.querySelector(".mag-cap-lead");
        if (capLead) {
          tl.fromTo(
            capLead,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.3"
          );
        }

        const chips = card.querySelectorAll(".mag-cap-chip");
        if (chips.length > 0) {
          tl.fromTo(
            chips,
            { scale: 0.7, opacity: 0, y: 8 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.025,
              ease: "back.out(2)",
            },
            "-=0.25"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mag-capabilities"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#faf9f6] text-zinc-950 font-sans border-b border-zinc-950/15 py-16 sm:py-24 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Monograph Header */}
        <div className="border-b border-zinc-950/20 pb-8 mb-12 sm:mb-16">
          <div className="font-sans text-xs sm:text-sm tracking-[0.16em] uppercase font-bold mb-3 flex items-center gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-950 border border-purple-300 rounded-full flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-600" />
              <span>SECTION 03 · THE CREATIVE STUDIO & CORE DISCIPLINES</span>
            </span>
          </div>

          <h2
            ref={titleRef}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-zinc-950 tracking-tight uppercase leading-[0.95] will-change-transform"
          >
            STUDIO DISCIPLINES & <br />
            <span className="font-serif italic font-normal text-zinc-800 underline decoration-purple-600 decoration-4 underline-offset-8">
              PRODUCTION CAPABILITIES
            </span>
          </h2>
        </div>

        {/* Magazine Pull Manifesto with Vibrant Accent */}
        <div className="max-w-3xl mb-14">
          <p
            ref={manifestoRef}
            className="font-serif text-xl sm:text-2xl lg:text-3xl text-zinc-800 italic font-normal leading-relaxed border-l-4 border-purple-600 pl-5"
          >
            “True digital craftsmanship is not measured merely by libraries, but by architectural resilience under load, tactile precision, and zero-latency human interaction.”
          </p>
        </div>

        {/* 4-Pillar Vibrant Chromatic Editorial Grid */}
        <div className="mag-cap-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CAPABILITY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <div
                key={idx}
                className={`mag-cap-card border p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-sm will-change-transform ${pillar.cardBg}`}
              >
                <div>
                  {/* Card Top Folio */}
                  <div className="flex items-center justify-between border-b border-zinc-950/10 pb-3 mb-5 font-sans text-xs">
                    <span className={`mag-cap-badge px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${pillar.badge}`}>
                      PART {pillar.number}
                    </span>
                    <Icon className={`h-4 w-4 ${pillar.iconColor}`} />
                  </div>

                  <h3 className="mag-cap-title font-display font-black text-lg sm:text-xl text-zinc-950 uppercase tracking-tight mb-3">
                    {pillar.category}
                  </h3>

                  <p className="mag-cap-lead font-sans text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed mb-6">
                    {pillar.lead}
                  </p>
                </div>

                {/* Skill Token Chips */}
                <div>
                  <div className="font-sans text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-2">
                    ACTIVE PRODUCTION STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.skills.map((skill, sIdx) => {
                      const isHovered = activeToken === skill;

                      return (
                        <span
                          key={sIdx}
                          onMouseEnter={() => {
                            setActiveToken(skill);
                            playAudioTick(480 + sIdx * 30);
                          }}
                          onMouseLeave={() => setActiveToken(null)}
                          data-cursor-text="INSPECT"
                          className={`mag-cap-chip font-sans text-[11px] font-semibold px-2.5 py-1 border transition-all duration-200 cursor-pointer rounded-xs will-change-transform ${
                            isHovered
                              ? `${pillar.chipHover} scale-105 shadow-sm`
                              : `${pillar.chipBase}`
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
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
