"use client";

import { useEffect, useState } from "react";

export default function MagazineHeader() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }).format(now)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = window.scrollY / totalScroll;
        setScrollProgress(Math.min(1, Math.max(0, current)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf9f6]/95 backdrop-blur-md border-b border-zinc-950/15 text-zinc-950 select-none transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between font-sans text-xs">
        {/* Left: Publication Monograph Title */}
        <div className="flex items-center gap-3">
          <a
            href="#mag-cover"
            onClick={(e) => scrollTo("mag-cover", e)}
            className="font-extrabold tracking-[0.18em] uppercase text-zinc-950 hover:text-blue-600 transition-colors flex items-center gap-2.5"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
            <span>RISANGGALIH · MONOGRAPH</span>
          </a>
          <span className="text-zinc-300 hidden sm:inline">/</span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold text-[10px] tracking-wider uppercase">
            VOL. IV · NO. 2026
          </span>
        </div>

        {/* Center: Editorial Navigation Index */}
        <nav className="hidden md:flex items-center gap-7 tracking-[0.18em] uppercase font-bold text-[11px] text-zinc-600">
          <a
            href="#mag-cover"
            onClick={(e) => scrollTo("mag-cover", e)}
            className="hover:text-blue-600 transition-colors"
          >
            01. COVER
          </a>
          <a
            href="#mag-works"
            onClick={(e) => scrollTo("mag-works", e)}
            className="hover:text-emerald-600 transition-colors"
          >
            02. WORKS
          </a>
          <a
            href="#mag-services"
            onClick={(e) => scrollTo("mag-services", e)}
            className="hover:text-blue-600 transition-colors"
          >
            03. SERVICES
          </a>
          <a
            href="#mag-capabilities"
            onClick={(e) => scrollTo("mag-capabilities", e)}
            className="hover:text-purple-600 transition-colors"
          >
            04. SKILLS
          </a>
          <a
            href="#mag-dossier"
            onClick={(e) => scrollTo("mag-dossier", e)}
            className="hover:text-orange-600 transition-colors"
          >
            05. RECORD
          </a>
          <a
            href="#mag-colophon"
            onClick={(e) => scrollTo("mag-colophon", e)}
            className="hover:text-rose-600 transition-colors"
          >
            06. ORDER & CONTACT
          </a>
        </nav>

        {/* Right: Location & Status */}
        <div className="flex items-center gap-4 text-zinc-600">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-950 font-bold tracking-wider text-[11px]">JAKARTA</span>
            <span className="text-emerald-700 text-[11px] font-medium">{timeStr}</span>
          </div>

          <a
            href="#mag-colophon"
            onClick={(e) => scrollTo("mag-colophon", e)}
            className="hidden sm:inline-flex items-center px-4 py-1.5 bg-blue-600 text-white text-[11px] tracking-wider uppercase font-bold hover:bg-blue-700 rounded shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all"
          >
            COMMISSION
          </a>
        </div>
      </div>

      {/* Kinetic Reading Scroll Progress Bar */}
      <div className="w-full h-[3px] bg-zinc-200/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-emerald-500 via-purple-600 via-orange-500 to-rose-600 origin-left transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(37,99,235,0.5)]"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </header>
  );
}
