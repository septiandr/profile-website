"use client";

import { useEffect, useState } from "react";
import AudioController from "../ui/AudioController";
import { JourneyStage } from "@/journey/types";

interface HUDMissionControlProps {
  currentStage: JourneyStage;
}

export default function HUDMissionControl({ currentStage }: HUDMissionControlProps) {
  const [timeStr, setTimeStr] = useState<string>("");

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

  const stageTitles: Record<JourneyStage, string> = {
    "the-void": "SECTOR 01 // THE VOID",
    "take-off": "SECTOR 01 // TAKE OFF SEQUENCE",
    "experience-waypoints": "SECTOR 02 // EXPEDITION WAYPOINTS",
    "tech-lab": "SECTOR 03 // TECHNOLOGY LAB",
    "project-portal": "SECTOR 03 // PROJECT PORTAL",
    projects: "SECTOR 04 // PROJECT DESTINATIONS",
    about: "SECTOR 05 // PERSONNEL DOSSIER",
    contact: "SECTOR 06 // MISSION CONTROL COMMS",
    departure: "SECTOR 07 // FINAL DEPARTURE",
    "end-screen": "MISSION LOG // ARCHIVED",
  };

  const navLinks = [
    { id: "zone-void", label: "INTRO" },
    { id: "zone-experience", label: "EXPERIENCE" },
    { id: "zone-skills", label: "SKILLS" },
    { id: "zone-projects", label: "PROJECTS" },
    { id: "zone-about", label: "ABOUT" },
    { id: "zone-contact", label: "CONTACT" },
  ];

  const scrollToZone = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none select-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between pointer-events-auto border-b border-zinc-800/80 pb-3 backdrop-blur-md bg-zinc-950/40 px-4 rounded-xl">
        {/* Left: Mission Brand & Active Sector */}
        <div className="flex items-center gap-4">
          <a
            href="#zone-void"
            onClick={(e) => scrollToZone("zone-void", e)}
            className="font-mono text-xs tracking-[0.2em] font-semibold text-zinc-200 hover:text-white transition-colors"
          >
            RISANGGALIH
          </a>
          <span className="hidden sm:inline text-zinc-700">/</span>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-zinc-300 font-medium">{stageTitles[currentStage]}</span>
          </div>
        </div>

        {/* Center: Restrained Nav HUD */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToZone(link.id, e)}
              className="font-mono text-[11px] tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Timestamp & Audio */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-zinc-500">
            <span>UTC+7</span>
            <span className="text-zinc-300">{timeStr}</span>
          </div>
          <AudioController />
        </div>
      </div>
    </header>
  );
}
