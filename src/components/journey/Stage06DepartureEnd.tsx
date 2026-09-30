"use client";

import { useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";

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
      className="relative min-h-screen w-full px-6 py-32 flex flex-col justify-between items-center text-center select-none bg-zinc-950 z-30"
    >
      <div className="font-mono text-[10px] tracking-[0.35em] text-zinc-600 uppercase">
        JOURNEY STATUS // CONCLUDED
      </div>

      {/* End Screen Credential */}
      <div className="max-w-xl mx-auto space-y-4 my-auto">
        <h2 className="font-sans font-light tracking-tight text-3xl sm:text-5xl text-white uppercase leading-none">
          RISANGGALIH
        </h2>

        <div className="font-mono text-xs sm:text-sm text-cyan-400 tracking-[0.25em] uppercase">
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
            className="group inline-flex items-center gap-2.5 border border-zinc-700 bg-zinc-900/60 px-6 py-3.5 font-mono text-xs tracking-[0.2em] text-zinc-200 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
          >
            <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-90" />
            <span>RESTART JOURNEY</span>
          </button>
        </div>
      </div>

      <div className="font-mono text-[11px] text-zinc-700 tracking-widest uppercase">
        © 2026 RISANGGALIH. ALL MISSION LOGS ARCHIVED.
      </div>
    </section>
  );
}
