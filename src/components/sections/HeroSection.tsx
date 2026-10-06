"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowDownRight, Terminal, Sparkles, Shield, ChevronDown, Compass } from "lucide-react";
import { profileData } from "@/data/profile";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -20,
        duration: 0.7,
        delay: 0.1,
      })
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 50,
            stagger: 0.12,
            duration: 0.9,
          },
          "-=0.4"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          rightColRef.current,
          {
            opacity: 0,
            scale: 0.92,
            duration: 1.0,
          },
          "-=0.7"
        )
        .from(
          ".hero-stats-item",
          {
            opacity: 0,
            y: 20,
            stagger: 0.08,
            duration: 0.6,
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "EXPERIENCE", val: "4+ YRS", detail: "Senior Engineering" },
    { label: "DELIVERIES", val: "10+", detail: "Enterprise & Web Apps" },
    { label: "DOMAINS", val: "EV & FIN", detail: "Loyalty, EdTech, Food" },
    { label: "ACADEMIC", val: "S.KOM", detail: "BINUS Comp. Sci" },
  ];

  const marqueeItems = [
    "REACT 19",
    "NEXT.JS 15",
    "THREE.JS 3D",
    "GSAP SCROLLTRIGGER",
    "REACT NATIVE",
    "TYPESCRIPT",
    "GOLANG",
    "NODE.JS",
    "HONO",
    "TAILWIND CSS",
    "SOCKET.IO",
    "POSTGRESQL",
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between px-6 pt-32 pb-12 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left Column: Agency Editorial Copy */}
        <div ref={leftColRef} className="lg:col-span-7 space-y-6">
          {/* Header Status Badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-space-900/80 px-4 py-1.5 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f5d4]" />
            <span className="font-mono text-xs tracking-widest text-cyan-300 uppercase">
              AGENCY CLASS // HIGH-PERFORMANCE ARCHITECT
            </span>
          </div>

          {/* Kinetic Giant Typography */}
          <div className="space-y-1">
            <h1 className="font-sans font-black tracking-tighter text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] text-white uppercase leading-[0.92]">
              <span className="hero-title-line block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                SEPTIAN DWI
              </span>
              <span className="hero-title-line block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 text-glow-cyan">
                RISANGGALIH
              </span>
            </h1>
            <p className="font-mono text-xs sm:text-sm tracking-widest text-purple-300 uppercase pt-2">
              SENIOR FRONTEND & FULLSTACK JAVASCRIPT / TYPESCRIPT DEVELOPER
            </p>
          </div>

          {/* Statement */}
          <p className="hero-desc max-w-xl text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Delivering award-winning, fluid digital products. Specializing in{" "}
            <span className="text-white font-medium">React, Next.js, Three.js 3D</span>, and{" "}
            <span className="text-cyan-400 font-medium">React Native</span>, paired with high-throughput{" "}
            <span className="text-purple-400 font-medium">Golang & Node.js</span> cloud microservices.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="group flex items-center gap-2.5 rounded-full bg-cyan-400 px-7 py-3.5 font-mono text-xs md:text-sm font-bold tracking-wider text-space-950 transition-all hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(0,245,212,0.6)]"
            >
              <span>EXPLORE MISSIONS</span>
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-space-900/70 px-6 py-3.5 font-mono text-xs md:text-sm tracking-wider text-slate-200 backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-white/5"
            >
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>TRANSMIT BRIEF</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 max-w-2xl">
            {stats.map((s, idx) => (
              <div key={idx} className="hero-stats-item">
                <div className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
                  {s.label}
                </div>
                <div className="font-sans font-black text-2xl text-white">
                  {s.val}
                </div>
                <div className="text-[11px] text-slate-400 font-light truncate">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Editorial Agency Portrait Card */}
        <div ref={rightColRef} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md group">
            {/* Cyber Corner Crosshairs [+] */}
            <span className="absolute -top-3 -left-3 font-mono text-cyan-400 text-sm select-none z-20">
              +
            </span>
            <span className="absolute -top-3 -right-3 font-mono text-cyan-400 text-sm select-none z-20">
              +
            </span>
            <span className="absolute -bottom-3 -left-3 font-mono text-cyan-400 text-sm select-none z-20">
              +
            </span>
            <span className="absolute -bottom-3 -right-3 font-mono text-cyan-400 text-sm select-none z-20">
              +
            </span>

            {/* Glowing Backdrop Frame */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/10 to-transparent blur-2xl group-hover:from-cyan-500/30 transition-all duration-700" />

            {/* Main Portrait Container */}
            <div className="relative rounded-3xl border border-white/20 bg-space-950/80 p-3 backdrop-blur-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-cyan-400/50">
              {/* Photo Viewport */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-space-900">
                <Image
                  src="/profile.jpg"
                  alt="Septian Dwi Risanggalih - Senior Frontend Architect"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-center filter grayscale contrast-110 brightness-95 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                {/* Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/30 to-transparent opacity-80" />

                {/* Top Telemetry Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono">
                  <span className="rounded-full bg-space-950/80 border border-white/10 px-2.5 py-1 text-cyan-300 backdrop-blur-md">
                    ID // RISANGGALIH
                  </span>
                  <span className="rounded-full bg-space-950/80 border border-white/10 px-2.5 py-1 text-slate-300 backdrop-blur-md">
                    KLATEN, ID
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl border border-white/10 bg-space-950/85 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                    <span>ROLE DIRECTIVE</span>
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                  <div className="font-sans font-extrabold text-base text-white">
                    Senior Frontend / Fullstack
                  </div>
                  <div className="text-[11px] text-slate-400 font-light mt-0.5">
                    CV Technopartner Indonesia • 4+ Yrs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kinetic Marquee Ticker */}
      <div className="relative z-10 mt-12 w-full overflow-hidden border-y border-white/10 py-3 bg-space-950/60 backdrop-blur-md">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 font-mono text-xs tracking-widest text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <span>{item}</span>
              <span className="text-cyan-400/50">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
