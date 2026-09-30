"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Mail, Globe, ExternalLink, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Stage05AboutContact() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      {/* SCENE 13: ABOUT (DOSSIER WITH ROBOT COMPANION) */}
      <section
        id="zone-about"
        className="relative min-h-screen w-full px-6 py-36 flex flex-col justify-center items-center select-none"
      >
        <div className="max-w-2xl mx-auto text-center z-20">
          <div className="font-mono text-[10px] tracking-[0.35em] text-solar-400 uppercase mb-4">
            SECTOR 05 // THE ENGINEER
          </div>

          <h2 className="font-sans font-light text-5xl sm:text-7xl text-white tracking-tighter uppercase mb-8">
            ABOUT
          </h2>

          <p className="font-sans text-xl sm:text-2xl text-zinc-200 font-light leading-relaxed mb-8">
            I build digital products across web, mobile, and backend systems.
          </p>

          {/* Restrained Personnel Dossier Card */}
          <div className="border border-solar-500/30 bg-obsidian-950/80 p-6 rounded-none text-left flex flex-col sm:flex-row items-center gap-6 max-w-lg mx-auto shadow-2xl backdrop-blur-xl">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-solar-400/40 bg-zinc-900 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Image
                src="/profile.jpg"
                alt="Risanggalih"
                fill
                className="object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Septian Dwi Risanggalih
              </div>
              <div className="font-mono text-[11px] text-solar-300 mt-0.5 font-medium">
                Senior Frontend & Fullstack Software Engineer
              </div>
              <div className="font-mono text-[10px] text-zinc-400 mt-2">
                CV TECHNOPARTNER INDONESIA • BINUS CS (GPA 3.56)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 14: CONTACT (CALM CONCLUSION & CELEBRATION) */}
      <section
        id="zone-contact"
        className="relative min-h-[160vh] w-full px-6 py-36 flex flex-col justify-start items-center select-none"
      >
        <div className="sticky top-32 text-center max-w-3xl mx-auto z-20">
          <div className="font-mono text-[10px] tracking-[0.35em] text-solar-400 uppercase mb-6">
            SECTOR 06 // MISSION CONCLUSION
          </div>

          <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95] mb-8">
            LET&apos;S BUILD
            <br />
            <span className="text-solar-400 font-light">SOMETHING</span>
            <br />
            GREAT.
          </h2>

          <div className="font-mono text-xs text-solar-200 tracking-[0.25em] uppercase mb-8">
            GET IN TOUCH WITH RISANGGALIH
          </div>

          {/* Minimal Editorial Links with Warm Solar Theme */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs sm:text-sm">
            <a
              href={`mailto:${profileData.personalInfo.email}`}
              className="flex items-center gap-2 border border-solar-500/50 bg-obsidian-950 px-6 py-3.5 text-solar-200 hover:border-solar-400 hover:text-white hover:bg-solar-500/10 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
            >
              <Mail className="h-4 w-4 text-solar-400" />
              <span>{profileData.personalInfo.email}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-solar-400" />
            </a>

            <a
              href="https://github.com/sdwirisanggalih"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-zinc-800 bg-obsidian-950 px-6 py-3.5 text-zinc-400 hover:border-solar-500/40 hover:text-white transition-all duration-300"
            >
              <Globe className="h-4 w-4 text-zinc-400" />
              <span>GITHUB</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-600" />
            </a>

            <a
              href="https://linkedin.com/in/sdwirisanggalih"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-zinc-800 bg-obsidian-950 px-6 py-3.5 text-zinc-400 hover:border-solar-500/40 hover:text-white transition-all duration-300"
            >
              <Globe className="h-4 w-4 text-zinc-400" />
              <span>LINKEDIN</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-600" />
            </a>
          </div>

          <div className="mt-16 font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
            ROBOT CELEBRATION ENGAGED • SCROLL FOR ARCHIVE ▾
          </div>
        </div>
      </section>
    </div>
  );
}
