"use client";

import { useEffect, useState } from "react";
import AudioController from "../ui/AudioController";
import { JourneyStage } from "@/journey/types";

interface HUDMissionControlProps {
  currentStage: JourneyStage;
}

export default function HUDMissionControl({ currentStage }: HUDMissionControlProps) {
  const [timeStr, setTimeStr] = useState<string>("");
  const [scrolledPastVoid, setScrolledPastVoid] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show menu bar only when user has scrolled past the intro screen
      setScrolledPastVoid(window.scrollY > window.innerHeight * 0.35);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(now)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isVisible = scrolledPastVoid && currentStage !== "the-void";

  const stageTitles: Record<JourneyStage, string> = {
    "the-void": "SECTOR 01 // ORBITAL VOID",
    "take-off": "SECTOR 01 // WARP CRUISE",
    "experience-waypoints": "SECTOR 02 // EXPEDITION WAYPOINTS",
    "tech-lab": "SECTOR 03 // ARCHITECTURAL LAB",
    "project-portal": "SECTOR 03 // PORTAL ACTIVATION",
    projects: "SECTOR 04 // PROJECT DESTINATIONS",
    about: "SECTOR 05 // PERSONNEL DOSSIER",
    contact: "SECTOR 06 // MISSION CONTROL COMMS",
    departure: "SECTOR 07 // CELEBRATION DANCE",
    "end-screen": "MISSION LOG // ARCHIVED",
  };

  const navLinks = [
    { id: "zone-void", label: "00 // INTRO" },
    { id: "zone-experience", label: "01 // EXP" },
    { id: "zone-skills", label: "02 // SKILLS" },
    { id: "zone-projects", label: "03 // PROJECTS" },
    { id: "zone-about", label: "04 // ABOUT" },
    { id: "zone-contact", label: "05 // CONTACT" },
  ];

  const scrollToZone = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none select-none transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between pointer-events-auto border-b border-solar-500/20 pb-3 backdrop-blur-xl bg-obsidian-950/70 px-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        {/* Brand & Sector Status */}
        <div className="flex items-center gap-4">
          <a
            href="#zone-void"
            onClick={(e) => scrollToZone("zone-void", e)}
            className="font-mono text-xs tracking-[0.25em] font-bold text-zinc-100 hover:text-solar-400 transition-colors flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-solar-400 shadow-[0_0_8px_#f59e0b]" />
            <span>RISANGGALIH</span>
            <span className="text-solar-400 text-[10px] font-normal">.PORTO</span>
          </a>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <span className="text-solar-300 font-medium tracking-wider">
              {stageTitles[currentStage]}
            </span>
          </div>
        </div>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToZone(link.id, e)}
              className="font-mono text-[11px] tracking-widest text-zinc-400 hover:text-solar-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Clock & Audio */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-zinc-500">
            <span className="text-zinc-600">KLATEN (WIB)</span>
            <span className="text-solar-300 font-semibold">{timeStr}</span>
          </div>
          <AudioController />
        </div>
      </div>
    </header>
  );
}
