"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, ChevronRight, CheckCircle2 } from "lucide-react";
import { profileData, ExperienceItem } from "@/data/profile";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedExp, setSelectedExp] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".exp-card", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = profileData.professionalExperience;
  const activeItem: ExperienceItem = experiences[selectedExp];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen w-full py-32 px-6 md:px-12 lg:px-20 z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Identifier */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
            // 02 MISSION TIMELINE & PRODUCTION ROLES
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>

        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-12">
          Enterprise Deployments &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Proven Track Records.
          </span>
        </h2>

        {/* Interactive Master-Detail HUD View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Company Selector Column */}
          <div className="lg:col-span-4 space-y-3">
            {experiences.map((exp, idx) => {
              const isSelected = selectedExp === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedExp(idx)}
                  className={`exp-card w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? "glass-panel border-cyan-400/60 shadow-[0_0_25px_rgba(0,245,212,0.15)] bg-space-850/90"
                      : "border-white/10 hover:border-white/30 bg-space-950/50 hover:bg-space-900/60"
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-500 shadow-[0_0_10px_#00f5d4]" />
                  )}

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Calendar className="h-3 w-3" />
                      {exp.period}
                    </span>
                    <span className="font-semibold text-slate-500 group-hover:text-slate-300">
                      [0{idx + 1}]
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {exp.company}
                  </h3>

                  <div className="text-xs text-purple-300 font-mono mt-0.5 font-medium">
                    {exp.role}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 font-light">
                    {exp.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Detail Telemetry Panel */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="font-mono text-xs text-cyan-400 tracking-wider">
                  MISSION LOG // ACTIVE NODE
                </span>
                <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white">
                  {activeItem.role}
                </h3>
                <div className="text-base text-purple-300 font-mono mt-0.5">
                  @ {activeItem.company}
                </div>
              </div>
              <div className="rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3.5 py-1.5 font-mono text-xs text-cyan-300">
                {activeItem.period}
              </div>
            </div>

            {/* Key Responsibilities / Contributions */}
            <div className="mb-8">
              <h4 className="font-mono text-xs text-slate-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
                <span>CORE DIRECTIVES & ARCHITECTURAL IMPACT</span>
              </h4>
              <ul className="space-y-2.5">
                {(activeItem.keyResponsibilities || activeItem.keyContributions || []).map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Production Modules / Projects Delivered */}
            <div>
              <h4 className="font-mono text-xs text-slate-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-purple-400" />
                <span>PRODUCTION PRODUCTS SHIPPED ({activeItem.projects.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeItem.projects.map((proj, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 rounded-xl border border-white/10 bg-space-950/60 hover:border-cyan-400/40 transition-all group"
                  >
                    <div className="font-sans font-bold text-sm text-white group-hover:text-cyan-300 mb-2">
                      {proj.name}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-cyan-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-1">
                      {proj.highlights.slice(0, 3).map((h, hIdx) => (
                        <li key={hIdx} className="text-[11px] text-slate-400 list-disc list-inside line-clamp-2">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
