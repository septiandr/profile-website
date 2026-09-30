"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Mail, Globe, ExternalLink, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Stage05AboutContact() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      {/* SCENE 13: ABOUT (CREW ASSEMBLED) */}
      <section
        id="zone-about"
        className="relative min-h-screen w-full px-6 py-36 flex flex-col justify-center items-center select-none"
      >
        <div className="max-w-2xl mx-auto text-center z-20">
          <div className="font-mono text-[10px] tracking-[0.35em] text-cyan-400 uppercase mb-4">
            SECTOR 05 // THE ENGINEER
          </div>

          <h2 className="font-sans font-light text-5xl sm:text-7xl text-white tracking-tighter uppercase mb-8">
            ABOUT
          </h2>

          <p className="font-sans text-xl sm:text-2xl text-zinc-300 font-light leading-relaxed mb-8">
            I build digital products across web, mobile, and backend systems.
          </p>

          {/* Restrained Personnel Dossier */}
          <div className="border border-zinc-800 bg-zinc-950/60 p-6 rounded-none text-left flex flex-col sm:flex-row items-center gap-6 max-w-lg mx-auto">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-zinc-700 bg-zinc-900">
              <Image
                src="/profile.jpg"
                alt="Risanggalih"
                fill
                className="object-cover grayscale contrast-125"
              />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Septian Dwi Risanggalih
              </div>
              <div className="font-mono text-[11px] text-zinc-400 mt-0.5">
                Senior Frontend & Fullstack Software Engineer
              </div>
              <div className="font-mono text-[10px] text-cyan-400 mt-2">
                BINUS UNIVERSITY • B.COMP.SC • GPA 3.56
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 14: CONTACT (CALM CONCLUSION) */}
      <section
        id="zone-contact"
        className="relative min-h-[160vh] w-full px-6 py-36 flex flex-col justify-start items-center select-none"
      >
        <div className="sticky top-32 text-center max-w-3xl mx-auto z-20">
          <div className="font-mono text-[10px] tracking-[0.35em] text-cyan-400 uppercase mb-6">
            SECTOR 06 // CONCLUSION
          </div>

          <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95] mb-8">
            LET&apos;S BUILD
            <br />
            <span className="text-zinc-400 font-light">SOMETHING</span>
            <br />
            GREAT.
          </h2>

          <div className="font-mono text-xs text-zinc-400 tracking-[0.25em] uppercase mb-8">
            GET IN TOUCH
          </div>

          {/* Minimal Editorial Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs sm:text-sm">
            <a
              href={`mailto:${profileData.personalInfo.email}`}
              className="flex items-center gap-2 border border-zinc-700 bg-zinc-950 px-5 py-3 text-zinc-300 hover:border-cyan-400 hover:text-white transition-all duration-300"
            >
              <Mail className="h-4 w-4 text-cyan-400" />
              <span>{profileData.personalInfo.email}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
            </a>

            <a
              href="https://github.com/sdwirisanggalih"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-5 py-3 text-zinc-400 hover:border-zinc-500 hover:text-white transition-all duration-300"
            >
              <Globe className="h-4 w-4" />
              <span>GITHUB</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-600" />
            </a>

            <a
              href="https://linkedin.com/in/sdwirisanggalih"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-5 py-3 text-zinc-400 hover:border-zinc-500 hover:text-white transition-all duration-300"
            >
              <Globe className="h-4 w-4" />
              <span>LINKEDIN</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-600" />
            </a>
          </div>

          <div className="mt-16 font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
            SCROLL FOR FINAL DEPARTURE SEQUENCE ▾
          </div>
        </div>
      </section>
    </div>
  );
}
