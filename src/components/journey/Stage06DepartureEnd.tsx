"use client";

import { useEffect, useRef } from "react";
import { RotateCcw, Bot } from "lucide-react";

interface Stage06Props {
  onRestart?: () => void;
}

export default function Stage06DepartureEnd({ onRestart }: Stage06Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRestartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onRestart?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="zone-end"
      ref={containerRef}
      className="relative min-h-screen w-full px-6 py-32 flex flex-col justify-between items-center text-center select-none bg-obsidian-950 z-30"
    >
      <div className="font-sans text-[11px] sm:text-xs tracking-[0.25em] text-amber-300/90 uppercase flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
        <span>Experience Concluded · Thank You For Visiting</span>
      </div>

      {/* End Screen Credential */}
      <div className="max-w-xl mx-auto space-y-4 my-auto">
        <h2 className="font-display font-medium tracking-tight text-4xl sm:text-6xl text-white uppercase leading-none">
          Septian Dwi <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-amber-200 to-amber-400">Risanggalih</span>
        </h2>

        <div className="font-sans text-xs sm:text-sm text-amber-300/90 tracking-[0.25em] uppercase font-medium">
          Senior Frontend & Fullstack Software Engineer
        </div>

        <p className="font-sans text-xs sm:text-sm text-zinc-400 tracking-[0.18em] uppercase pt-4 leading-relaxed max-w-md mx-auto font-light">
          Engineering Scalable Systems · Designing Elevated Web Experiences
        </p>

        <div className="pt-10">
          <button
            onClick={handleRestartClick}
            className="group inline-flex items-center gap-3 border border-amber-400/40 bg-white/[0.04] px-8 py-4 rounded-full font-sans text-xs tracking-[0.22em] text-amber-200 hover:border-amber-400 hover:text-white hover:bg-amber-400/10 transition-all duration-300 shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
          >
            <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-90 text-amber-300" />
            <span>RETURN TO BEGINNING</span>
          </button>
        </div>
      </div>

      <div className="font-sans text-[11px] text-zinc-600 tracking-widest uppercase">
        © 2026 SEPTIAN DWI RISANGGALIH · ALL RIGHTS RESERVED
      </div>
    </section>
  );
}

