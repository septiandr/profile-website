"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Terminal, Flame, Zap, Smartphone, Server } from "lucide-react";
import { profileData } from "@/data/profile";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fullstackProjects = profileData.selectedFullstackProjects;
  const icons = [Flame, Zap, Smartphone];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full py-32 px-6 md:px-12 lg:px-20 z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
            // 03 FEATURED FULLSTACK PROTOCOLS
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Selected Engineered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                Architectures.
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-light">
              High-concurrency fullstack platforms, real-time event socket engines, and cross-platform native products.
            </p>
          </div>
          <div className="font-mono text-xs text-cyan-300 border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 rounded-full self-start md:self-auto">
            STATUS: 100% PRODUCTION READY
          </div>
        </div>

        {/* Project Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {fullstackProjects.map((project, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="project-card glass-panel glass-panel-hover flex flex-col justify-between rounded-3xl p-6 sm:p-7 border border-white/10 group relative overflow-hidden"
              >
                {/* Subtle top glow bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,245,212,0.15)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 font-semibold">
                      [0{idx + 1}]
                    </span>
                  </div>

                  <div className="font-mono text-xs text-purple-400 uppercase tracking-wider mb-1">
                    {project.role}
                  </div>
                  <h3 className="font-sans font-extrabold text-xl text-white group-hover:text-cyan-300 transition-colors mb-4">
                    {project.name}
                  </h3>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {project.highlights.slice(0, 4).map((hl, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-300 font-light flex items-start gap-2">
                        <span className="text-cyan-400 font-mono mt-0.5">›</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Pills at bottom */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-cyan-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Specialized Projects (Hono, Node.js, Express) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Server className="h-4 w-4 text-cyan-400" />
            <h4 className="font-mono text-xs text-slate-300 tracking-wider uppercase">
              ADDITIONAL BACKEND & MICROSERVICE STACKS
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profileData.additionalProjectExperience.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-white/5 bg-space-950/50 hover:border-cyan-400/30 transition-all"
              >
                <div className="font-mono font-bold text-sm text-cyan-400 mb-1">
                  {item.name}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
