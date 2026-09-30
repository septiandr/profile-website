"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight, Terminal, Sparkles, ChevronDown } from "lucide-react";
import { profileData } from "@/data/profile";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          titleRef.current?.querySelectorAll(".hero-line") || [],
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          statsRef.current?.children || [],
          {
            opacity: 0,
            y: 25,
            stagger: 0.1,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "EXPERIENCE", value: "4+ YRS", sub: "Production Engineering" },
    { label: "PRODUCTS", value: "10+", sub: "Web & Mobile Platforms" },
    { label: "DOMAIN", value: "EV & FIN", sub: "Loyalty, EdTech, Commerce" },
    { label: "EDUCATION", value: "3.56", sub: "BINUS CS Graduate" },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center px-6 pt-32 pb-20 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-4xl z-10">
        {/* Status Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 backdrop-blur-md mb-6">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-mono text-xs tracking-wider text-cyan-300">
            SYS:ACTIVE // SENIOR FRONTEND & FULLSTACK ARCHITECT
          </span>
        </div>

        {/* Main Kinetic Title */}
        <h1
          ref={titleRef}
          className="font-sans font-black tracking-tighter text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.95] mb-6"
        >
          <span className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            SEPTIAN DWI
          </span>
          <span className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 text-glow-cyan">
            RISANGGALIH
          </span>
        </h1>

        {/* Short Statement */}
        <p
          ref={descRef}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-8"
        >
          Crafting scalable, high-performance web & mobile architectures. Specializing in{" "}
          <span className="text-cyan-400 font-medium">React, Next.js, React Native, TypeScript</span>, and fullstack cloud backends with <span className="text-purple-400 font-medium">Golang & Node.js</span>.
        </p>

        {/* Action Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-16">
          <a
            href="#projects"
            className="group flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-mono text-xs md:text-sm font-bold tracking-wider text-space-950 transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,245,212,0.6)]"
          >
            <span>DISCOVER MISSIONS</span>
            <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-space-900/60 px-6 py-3 font-mono text-xs md:text-sm tracking-wider text-slate-200 backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-white/5"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span>COMMENCE CONTACT</span>
          </a>
        </div>

        {/* Telemetry Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-4 border border-white/10 hover:border-cyan-400/40 transition-all group"
            >
              <div className="font-mono text-[10px] text-cyan-400/80 tracking-widest uppercase mb-1">
                {stat.label}
              </div>
              <div className="font-sans font-bold text-2xl sm:text-3xl text-white group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-[11px] text-slate-400 font-light truncate">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="absolute bottom-6 right-6 md:right-12 flex items-center gap-2 text-xs font-mono text-slate-400 animate-bounce">
        <span>SCROLL TO TRAVERSE</span>
        <ChevronDown className="h-4 w-4 text-cyan-400" />
      </div>
    </section>
  );
}
