"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Terminal, Database, Smartphone, GitBranch, Layers, Radio, Sparkles } from "lucide-react";
import { profileData } from "@/data/profile";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".skill-badge", {
        opacity: 0,
        scale: 0.85,
        stagger: 0.02,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = profileData.technicalSkills;

  const categories = [
    { id: "all", label: "ALL MATRIX", icon: Sparkles },
    { id: "core", label: "CORE & LANGUAGES", icon: Terminal, items: skills.coreTechnologies },
    { id: "frontend", label: "FRONTEND STACK", icon: Layers, items: skills.frontendDevelopment },
    { id: "engineering", label: "UI ARCHITECTURE", icon: Cpu, items: skills.frontendEngineering },
    { id: "backend", label: "BACKEND & APIs", icon: Terminal, items: skills.backendDevelopment },
    { id: "database", label: "DATABASES", icon: Database, items: skills.database },
    { id: "realtime", label: "REAL-TIME & BOTS", icon: Radio, items: skills.realTimeAndIntegrations },
    { id: "mobile", label: "MOBILE (NATIVE)", icon: Smartphone, items: skills.mobileDevelopment },
    { id: "devops", label: "TOOLS & DEVOPS", icon: GitBranch, items: skills.developmentAndDevopsTools },
    { id: "practices", label: "ENGINEERING DISCIPLINE", icon: Cpu, items: skills.engineeringPractices },
  ];

  const allCategoriesWithItems = categories.filter((c) => c.id !== "all");

  const displayedCategories =
    activeTab === "all"
      ? allCategoriesWithItems
      : allCategoriesWithItems.filter((c) => c.id === activeTab);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full py-32 px-6 md:px-12 lg:px-20 z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Identifier */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
            // 04 TECHNICAL CAPABILITIES & TELEMETRY
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>

        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-8">
          Full-Spectrum{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
            Engineering Matrix.
          </span>
        </h2>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                  isActive
                    ? "bg-cyan-400 text-space-950 font-bold shadow-[0_0_20px_rgba(0,245,212,0.4)]"
                    : "glass-panel text-slate-300 hover:text-white hover:border-cyan-400/40"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.id}
                className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4 border-b border-white/10 pb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-mono text-xs font-bold text-slate-200 tracking-wider">
                      {group.label}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items?.map((item, i) => (
                      <span
                        key={i}
                        className="skill-badge rounded-lg border border-white/10 bg-space-950/60 px-3 py-1.5 font-mono text-xs text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(0,245,212,0.2)] transition-all cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>TELEMETRY VERIFIED</span>
                  <span className="text-cyan-400">{group.items?.length} MODULES</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
