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
    "the-void": "Prologue · Welcome",
    "take-off": "Studio · Products Overview",
    "experience-waypoints": "Shipped Products & Case Studies",
    "tech-lab": "Capabilities · Production Engines",
    "project-portal": "Enterprise Systems",
    projects: "Shipped Products & Case Studies",
    about: "Studio Philosophy · Leadership",
    contact: "Commission Studio · Inquiries",
    departure: "Epilogue · Mission Success",
    "end-screen": "Archive · Complete",
  };

  const navLinks = [
    { id: "zone-void", label: "Studio" },
    { id: "zone-hero", label: "Overview" },
    { id: "zone-experience", label: "Products" },
    { id: "zone-skills", label: "Capabilities" },
    { id: "zone-contact", label: "Contact" },
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
      <div className="mx-auto flex max-w-7xl items-center justify-between pointer-events-auto border border-white/[0.08] pb-3 pt-3 backdrop-blur-2xl bg-[#070814]/80 px-6 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        {/* Brand & Sector Status */}
        <div className="flex items-center gap-4">
          <a
            href="#zone-void"
            onClick={(e) => scrollToZone("zone-void", e)}
            className="font-mono text-xs tracking-[0.2em] font-black text-white hover:text-[#ccff00] transition-colors flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-[#ccff00] shadow-[0_0_10px_#ccff00] animate-pulse" />
            <span>RISANG STUDIO</span>
          </a>
          <span className="hidden sm:inline text-zinc-700">·</span>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="text-[#00f0ff] font-bold tracking-wide">
              {stageTitles[currentStage]}
            </span>
          </div>
        </div>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToZone(link.id, e)}
              className="font-mono text-xs tracking-wider text-zinc-400 hover:text-[#ccff00] transition-colors font-bold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Clock & Audio */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="text-zinc-500 font-bold">JKT</span>
            <span className="text-[#ccff00] font-black">{timeStr}</span>
          </div>
          <AudioController />
        </div>
      </div>
    </header>
  );
}
