"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Mail, Globe, ExternalLink, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Stage05AboutContact() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      {/* SCENE 13: ABOUT (DOSSIER WITH ROBOT COMPANION ON LEFT) */}
      <section
        id="zone-about"
        className="relative min-h-screen w-full px-6 py-36 flex items-center justify-center select-none"
      >
        {/* Left Column Spacer for 3D Robot (340px - 380px) */}
        <div className="hidden lg:block w-[320px] xl:w-[380px] shrink-0 pointer-events-none" />

        <div className="flex-1 max-w-2xl text-center z-20 pr-0 lg:pr-12">
          <div className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-amber-300/90 font-medium mb-3 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span>The Engineer · Philosophy & Background</span>
          </div>

          <h2 className="font-display font-light text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase mb-6">
            Architectural{" "}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-amber-200 to-amber-400">
              Mindset
            </span>
          </h2>

          <p className="font-sans text-lg sm:text-2xl text-zinc-300 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Crafting performant digital experiences where engineering rigor meets refined visual craft.
          </p>

          {/* Agency Personnel Dossier Card */}
          <div className="border border-white/[0.1] bg-gradient-to-b from-[#13172c]/90 via-[#0d1020]/90 to-[#070914]/95 p-7 sm:p-8 rounded-2xl text-left flex flex-col sm:flex-row items-center gap-6 max-w-lg mx-auto shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-amber-400/40 bg-zinc-900 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Image
                src="/profile.jpg"
                alt="Risanggalih"
                fill
                className="object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div>
              <div className="font-display text-base font-bold text-white uppercase tracking-wider">
                Septian Dwi Risanggalih
              </div>
              <div className="font-sans text-xs text-amber-300/90 mt-1 font-medium">
                Senior Frontend & Fullstack Software Engineer
              </div>
              <div className="font-sans text-[11px] text-zinc-400 mt-2">
                CV TECHNOPARTNER INDONESIA · BINUS UNIVERSITY (GPA 3.56)
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
          <div className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-amber-300/90 font-medium mb-4 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span>Inquiries · Collaboration · Opportunities</span>
          </div>

          <h2 className="font-display font-medium text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-[0.95] mb-6">
            Let&apos;s Build{" "}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-amber-200 to-amber-400">
              Something
            </span>
            <br />
            Exceptional.
          </h2>

          <div className="font-sans text-xs sm:text-sm text-zinc-400 tracking-[0.2em] uppercase mb-10">
            Available for select senior engineering & contract roles
          </div>

          {/* Minimal Editorial Links with Warm Amber Glow */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-sans text-xs sm:text-sm">
            <a
              href={`mailto:${profileData.personalInfo.email}`}
              className="group flex items-center gap-2.5 border border-amber-400/40 bg-gradient-to-r from-amber-400/15 via-amber-400/5 to-transparent px-7 py-3.5 rounded-full text-amber-200 hover:border-amber-400 hover:text-white hover:bg-amber-400/20 transition-all duration-300 shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
            >
              <Mail className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{profileData.personalInfo.email}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://github.com/sdwirisanggalih"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 border border-white/10 bg-white/[0.04] px-6 py-3.5 rounded-full text-zinc-300 hover:border-amber-400/40 hover:text-white transition-all duration-300 backdrop-blur-md"
            >
              <Globe className="h-4 w-4 text-zinc-400 group-hover:text-amber-300 transition-colors" />
              <span>GitHub</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
            </a>

            <a
              href="https://linkedin.com/in/sdwirisanggalih"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 border border-white/10 bg-white/[0.04] px-6 py-3.5 rounded-full text-zinc-300 hover:border-amber-400/40 hover:text-white transition-all duration-300 backdrop-blur-md"
            >
              <Globe className="h-4 w-4 text-zinc-400 group-hover:text-amber-300 transition-colors" />
              <span>LinkedIn</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
            </a>
          </div>

          <div className="mt-16 font-sans text-[11px] text-zinc-500 tracking-[0.2em] uppercase">
            Interactive Portfolio · Engineered with Next.js & Three.js
          </div>
        </div>
      </section>
    </div>
  );
}

