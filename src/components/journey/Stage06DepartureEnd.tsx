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
      <div className="font-mono text-[10px] tracking-[0.35em] text-solar-400 uppercase flex items-center gap-2">
        <Bot className="h-3 w-3 text-solar-400" />
        <span>JOURNEY LOG // TRANSMISSION COMPLETE</span>
      </div>

      {/* End Screen Credential */}
      <div className="max-w-xl mx-auto space-y-4 my-auto">
        <h2 className="font-sans font-light tracking-tight text-3xl sm:text-5xl text-white uppercase leading-none">
          RISANGGALIH
        </h2>

        <div className="font-mono text-xs sm:text-sm text-solar-400 tracking-[0.25em] uppercase font-semibold">
          SOFTWARE ENGINEER
        </div>

        <p className="font-mono text-xs text-zinc-400 tracking-widest uppercase pt-4 leading-relaxed max-w-md mx-auto">
          BUILDING DIGITAL EXPERIENCES
          <br />
          THROUGH CODE.
        </p>

        <div className="pt-10">
          <button
            onClick={handleRestartClick}
            className="group inline-flex items-center gap-2.5 border border-solar-500/50 bg-obsidian-900/90 px-8 py-4 font-mono text-xs tracking-[0.25em] text-solar-300 hover:border-solar-400 hover:text-white hover:bg-solar-500/10 transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.2)]"
          >
            <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-90 text-solar-400" />
            <span>RESTART JOURNEY</span>
          </button>
        </div>
      </div>

      <div className="font-mono text-[11px] text-zinc-600 tracking-widest uppercase">
        © 2026 SEPTIAN DWI RISANGGALIH. CRAFTED WITH THREE.JS & GSAP.
      </div>
    </section>
  );
}

