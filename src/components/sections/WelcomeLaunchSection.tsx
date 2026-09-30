"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown, Move3d, Compass, Terminal, Rocket } from "lucide-react";

interface WelcomeProps {
  onNavigate?: (id: string) => void;
}

export default function WelcomeLaunchSection({ onNavigate }: WelcomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".welcome-tag", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.3,
      })
        .from(
          ".welcome-title",
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          ".welcome-sub",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          hintRef.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          menuRef.current?.children || [],
          {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.7,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const navMenuItems = [
    { id: "hero", label: "01 // HERO PROFILE", desc: "Identity & Dossier" },
    { id: "experience", label: "02 // EXPERIENCE", desc: "Production History" },
    { id: "skills", label: "03 // SKILLS", desc: "Engineering Matrix" },
    { id: "contact", label: "04 // CONTACT ME", desc: "Comms & Transmission" },
  ];

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="welcome"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 pt-28 pb-10 overflow-hidden select-none pointer-events-none"
    >
      {/* Top Welcome Telemetry */}
      <div className="text-center z-10 pointer-events-auto">
        <div className="welcome-tag inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-space-950/80 px-4 py-1.5 backdrop-blur-xl mb-4 shadow-[0_0_20px_rgba(0,245,212,0.15)]">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-mono text-xs tracking-widest text-cyan-300 uppercase">
            ORBITAL STAGE // LAUNCH SEQUENCE INITIALIZED
          </span>
        </div>

        <h1 className="welcome-title font-sans font-black tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-[1.05]">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 text-glow-cyan">
            Risanggalih Porto
          </span>
        </h1>

        <p className="welcome-sub font-mono text-xs sm:text-sm md:text-base text-purple-300 tracking-[0.25em] uppercase mt-3">
          SOFTWARE ENGINEER • SENIOR FRONTEND & FULLSTACK ARCHITECT
        </p>
      </div>

      {/* Center 3D Interaction Hint Badge */}
      <div
        ref={hintRef}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-space-950/60 px-4 py-2 backdrop-blur-xl text-slate-300 text-xs font-mono shadow-2xl transition-all hover:border-cyan-400/50 hover:text-cyan-300 my-auto"
      >
        <Move3d className="h-4 w-4 text-cyan-400 animate-pulse" />
        <span className="hidden sm:inline">CLICK & DRAG ANYWHERE TO ROTATE ROCKET VESSEL</span>
        <span className="sm:hidden">DRAG TO ROTATE ROCKET</span>
      </div>

      {/* Bottom Menu Navigation Dock */}
      <div className="w-full max-w-4xl z-10 pointer-events-auto">
        <div
          ref={menuRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {navMenuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(item.id, e)}
              className="glass-panel glass-panel-hover p-4 rounded-2xl border border-white/10 group cursor-pointer text-left transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,245,212,0.2)]"
            >
              <div className="font-mono text-[10px] text-cyan-400/90 tracking-widest uppercase mb-1">
                {item.label}
              </div>
              <div className="font-sans font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                {item.desc}
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center gap-1 group-hover:text-slate-300">
                <span>ENGAGE WARP</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Scroll Prompt */}
        <div className="flex flex-col items-center gap-1.5 text-center text-xs font-mono text-slate-400">
          <span className="tracking-widest uppercase text-cyan-400/90">
            SCROLL TO LAUNCH MISSION
          </span>
          <ChevronDown className="h-4 w-4 text-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
