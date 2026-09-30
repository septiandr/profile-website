"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Cpu, Globe2, Layers, ShieldCheck, GraduationCap, Award, Compass } from "lucide-react";
import { profileData } from "@/data/profile";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(cardsRef.current?.children || [], {
        opacity: 0,
        y: 35,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Layers,
      title: "Scalable Frontend Systems",
      desc: "Architecting modular, maintainable UI systems with React 19, Next.js 15, and typed state managers (Zustand, Redux, Jotai).",
    },
    {
      icon: Cpu,
      title: "Fullstack & Cloud Logic",
      desc: "Constructing robust backends using Golang, Node.js, and Hono with PostgreSQL, Redis, and event-driven architectures.",
    },
    {
      icon: Globe2,
      title: "Real-time & High Concurrency",
      desc: "Deploying low-latency Socket.IO channels, WebSocket protocols, and automated WhatsApp bot transaction workflows.",
    },
    {
      icon: ShieldCheck,
      title: "Production Discipline",
      desc: "End-to-end ownership: requirement decomposition, strict API contracts, GitLab CI/CD, and live bug diagnostics.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full py-32 px-6 md:px-12 lg:px-20 z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Identifier */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
            // 01 ARCHITECTURAL DOSSIER
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>

        {/* Narrative Headline */}
        <h2 className="about-title font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight mb-10 max-w-4xl">
          Translating complex enterprise requirements into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
            fluid, high-octane experiences.
          </span>
        </h2>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Dossier text & Profile Insight */}
          <div className="lg:col-span-7 space-y-6">
            {/* Editorial Agency Bio Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-cyan-400/40 shrink-0">
                  <Image
                    src="/profile.jpg"
                    alt="Septian Dwi Risanggalih"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <div className="font-sans font-extrabold text-lg text-white">
                    Septian Dwi Risanggalih
                  </div>
                  <div className="font-mono text-xs text-cyan-400">
                    Lead Frontend / Fullstack Architect
                  </div>
                </div>
              </div>

              <p className="text-slate-300 font-light text-base sm:text-lg leading-relaxed mb-4">
                With over <strong className="text-cyan-300 font-semibold">4+ years of professional engineering</strong>, I take pride in owning frontend and fullstack delivery across mission-critical domains: electric vehicle charging infrastructures, high-frequency loyalty platforms, digital commerce, and interactive EdTech portals.
              </p>
              <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed">
                Currently driving frontend architecture at <strong className="text-white font-medium">CV Technopartner Indonesia</strong>, shaping production web and React Native mobile codebases. Beyond the client layer, I design Golang microservices and high-throughput real-time systems that keep businesses humming without downtime.
              </p>
            </div>

            {/* Education & Language Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-start gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 shrink-0">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Degree & Academic</div>
                  <div className="text-sm font-bold text-white">BINUS UNIVERSITY</div>
                  <div className="text-xs text-cyan-300 font-mono mt-0.5">B.Comp.Sc (2022–2025) • GPA 3.56</div>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-start gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400 shrink-0">
                  <Globe2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Communication</div>
                  <div className="text-sm font-bold text-white">Bilingual Engineering</div>
                  <div className="text-xs text-purple-300 font-mono mt-0.5">Indonesian (Native) • English (Prof.)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars List */}
          <div ref={cardsRef} className="lg:col-span-5 grid grid-cols-1 gap-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="glass-panel glass-panel-hover p-5 rounded-2xl border border-white/10 group cursor-default"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 group-hover:scale-110 transition-transform">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-sans font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-12 font-light">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
