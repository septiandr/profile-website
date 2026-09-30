"use client";

import { useEffect, useState } from "react";
import AudioController from "./AudioController";

export default function HUDHeader() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("welcome");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setTimeStr(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = ["welcome", "hero", "about", "experience", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "welcome", label: "00 // LAUNCH" },
    { id: "hero", label: "01 // HERO" },
    { id: "experience", label: "02 // EXP" },
    { id: "skills", label: "03 // SKILLS" },
    { id: "contact", label: "04 // CONTACT" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-8 md:py-4 pointer-events-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-space-950/70 px-4 py-2.5 backdrop-blur-xl md:px-6 pointer-events-auto">
        {/* Brand / Telemetry */}
        <div className="flex items-center gap-3">
          <a
            href="#welcome"
            className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-slate-100 transition-colors hover:text-cyan-400"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-white">RISANGGALIH</span>
            <span className="text-cyan-400 text-xs font-normal">.PORTO</span>
          </a>

          {/* Location & Time */}
          <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-3 text-xs font-mono text-slate-400">
            <span className="text-slate-500">LOC:</span>
            <span className="text-slate-300">KLATEN, ID (WIB)</span>
            <span className="text-cyan-400 font-semibold">{timeStr}</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-3 py-1 text-xs font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,245,212,0.25)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Audio Controller & CTA */}
        <div className="flex items-center gap-2.5">
          <AudioController />
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-cyan-400 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-space-950 transition-all hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,245,212,0.6)]"
          >
            HIRE ME
          </a>
        </div>
      </div>
    </header>
  );
}
