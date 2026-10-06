"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Award, 
  GraduationCap, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Bookmark, 
  Sparkles,
  ShieldCheck,
  Building2
} from "lucide-react";

interface ChronologyItem {
  period: string;
  year: string;
  role: string;
  company: string;
  domain: string;
  summary: string;
  achievements: string[];
  themeColor: string;
  badgeBg: string;
  accentBar: string;
  accentBorder: string;
  pageNo: string;
}

const CAREER_CHRONOLOGY: ChronologyItem[] = [
  {
    period: "2024 — PRESENT",
    year: "2024",
    role: "Senior Frontend Developer",
    company: "CV Technopartner Indonesia",
    domain: "EV IoT Telemetry, Loyalty SaaS & Omnichannel POS",
    summary:
      "Directing core frontend engineering across critical production applications including the Casion EV charging network, Behave.id multi-tier rewards platform, and Shihlin POS ecosystem.",
    achievements: [
      "Architected Casion EV React Native application maintaining 99.8% crash-free stability across nationwide charging stations.",
      "Engineered real-time WebSocket telemetry for live kWh data, charging speed calculation, and geo-fenced reservation.",
      "Constructed sub-second POS atomic redemption interfaces and Golang microservice client pipelines.",
    ],
    themeColor: "text-emerald-600",
    badgeBg: "bg-emerald-100 text-emerald-950 border-emerald-300",
    accentBar: "bg-emerald-600",
    accentBorder: "border-emerald-300",
    pageNo: "FOLIO 24",
  },
  {
    period: "2023 — 2024",
    year: "2023",
    role: "IT Programmer",
    company: "PT Natieva Global International",
    domain: "EdTech, Live Video Learning & Certification Platforms",
    summary:
      "Spearheaded full-stack development for enterprise certification platforms (Luna by MSIG Life) and student learning management systems.",
    achievements: [
      "Built real-time video classroom schedule sync with Zustand state cache for MSIG Life corporate learners.",
      "Developed full-stack LMS dashboards, mobile learning app, and CMS platforms for Natieva & Natieva Kids.",
      "Reduced client bundle payload by 42% through lazy-loaded module federation and caching.",
    ],
    themeColor: "text-blue-600",
    badgeBg: "bg-blue-100 text-blue-950 border-blue-300",
    accentBar: "bg-blue-600",
    accentBorder: "border-blue-300",
    pageNo: "FOLIO 25",
  },
  {
    period: "2022 — 2023",
    year: "2022",
    role: "Frontend Developer",
    company: "PT Infosys Solusi Terpadu",
    domain: "Enterprise Banking & E-Debit Transaction Security",
    summary:
      "Engineered high-security corporate internet banking interfaces and e-debit payment flows for PT Bank CIMB Niaga Tbk (Octo Clicks).",
    achievements: [
      "Engineered secure cryptographic e-debit & OTP transaction flows compliant with strict banking audit protocols.",
      "Implemented PCI-DSS security audit checks across mission-critical financial user journeys.",
      "Refactored legacy portal architectures to componentized React, slashing core interface latency.",
    ],
    themeColor: "text-purple-600",
    badgeBg: "bg-purple-100 text-purple-950 border-purple-300",
    accentBar: "bg-purple-600",
    accentBorder: "border-purple-300",
    pageNo: "FOLIO 26",
  },
];

// Procedural Paper Flip Sound Effect
function playPageFlipAudio() {
  try {
    if (typeof window === "undefined") return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch {
    // Autoplay restrictions
  }
}

export default function MagazineTimelineDossier() {
  const [activeSpread, setActiveSpread] = useState<number>(0);
  const activeSpreadRef = useRef<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const leaf1Ref = useRef<HTMLDivElement>(null);
  const leaf2Ref = useRef<HTMLDivElement>(null);
  const shadow1FrontRef = useRef<HTMLDivElement>(null);
  const shadow1BackRef = useRef<HTMLDivElement>(null);
  const shadow2FrontRef = useRef<HTMLDivElement>(null);
  const shadow2BackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  // Exact coordinates for Spread 01 (0.0), Spread 02 (0.5), Spread 03 (1.0)
  const SNAP_SPREADS = [0.0, 0.5, 1.0];

  const scrollToSpread = (index: number) => {
    if (!scrollTriggerInstanceRef.current) return;
    const st = scrollTriggerInstanceRef.current;
    const targetProgress = SNAP_SPREADS[index] ?? 0;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;

    activeSpreadRef.current = index;
    setActiveSpread(index);

    if (leaf1Ref.current && leaf2Ref.current) {
      if (index === 2) {
        leaf1Ref.current.style.visibility = "hidden";
        leaf2Ref.current.style.zIndex = "30";
      } else {
        leaf1Ref.current.style.visibility = "visible";
        leaf2Ref.current.style.zIndex = "10";
      }
    }

    if (typeof window !== "undefined" && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetScroll, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const leaf1 = leaf1Ref.current;
      const leaf2 = leaf2Ref.current;
      const shadow1Front = shadow1FrontRef.current;
      const shadow1Back = shadow1BackRef.current;
      const shadow2Front = shadow2FrontRef.current;
      const shadow2Back = shadow2BackRef.current;

      if (!section || !leaf1 || !leaf2) return;

      // Initial state: leaves are closed flat on the right side
      gsap.set(leaf1, { rotateY: 0, zIndex: 20, transformOrigin: "left center" });
      gsap.set(leaf2, { rotateY: 0, zIndex: 10, transformOrigin: "left center" });

      if (shadow1Front) gsap.set(shadow1Front, { opacity: 0 });
      if (shadow1Back) gsap.set(shadow1Back, { opacity: 0 });
      if (shadow2Front) gsap.set(shadow2Front, { opacity: 0 });
      if (shadow2Back) gsap.set(shadow2Back, { opacity: 0 });

      // Smooth, responsive 3D Magazine Page Flip Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "section04-magazine-page-turner",
          trigger: section,
          start: "top top",
          end: "+=3200",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Dynamically manage leaf stacking so Spread 03 Left (Infosys) is on top of leaf 1
            if (leaf1 && leaf2) {
              if (p > 0.62) {
                leaf1.style.visibility = "hidden";
                leaf2.style.zIndex = "30";
              } else {
                leaf1.style.visibility = "visible";
                leaf2.style.zIndex = "10";
              }
            }

            let nextSpread = 0;
            if (p < 0.25) {
              nextSpread = 0;
            } else if (p < 0.75) {
              nextSpread = 1;
            } else {
              nextSpread = 2;
            }
            if (nextSpread !== activeSpreadRef.current) {
              activeSpreadRef.current = nextSpread;
              setActiveSpread(nextSpread);
            }
          },
        },
      });

      scrollTriggerInstanceRef.current = tl.scrollTrigger as ScrollTrigger;

      // SPREAD 01 DWELL HOLD (Longer, comfortable read)
      tl.to({}, { duration: 0.7 });

      // PAGE TURN 01: Leaf 1 flips from 0deg to -180deg
      tl.to(
        leaf1,
        {
          rotateY: -180,
          duration: 1.5,
          ease: "power2.inOut",
          onStart: () => playPageFlipAudio(),
        },
        "turn1"
      );

      // Realistic Dynamic Paper Crease Lighting & Shadows for Turn 1
      if (shadow1Front) {
        tl.to(shadow1Front, { opacity: 0.35, duration: 0.75, ease: "power1.in" }, "turn1");
        tl.to(shadow1Front, { opacity: 0, duration: 0.75, ease: "power1.out" }, "turn1+=0.75");
      }
      if (shadow1Back) {
        tl.fromTo(shadow1Back, { opacity: 0.35 }, { opacity: 0, duration: 0.75, ease: "power1.out" }, "turn1+=0.75");
      }

      // SPREAD 02 DWELL HOLD (Longer, comfortable read)
      tl.to({}, { duration: 0.7 });

      // PAGE TURN 02: Leaf 2 flips from 0deg to -180deg
      tl.to(
        leaf2,
        {
          rotateY: -180,
          duration: 1.5,
          ease: "power2.inOut",
          onStart: () => playPageFlipAudio(),
        },
        "turn2"
      );

      // Halfway through turn 2 (crossing the spine), raise leaf2 zIndex to 30 and tuck leaf1 away so Spread 03 Left (Infosys) is 100% visible!
      tl.set(leaf2, { zIndex: 30 }, "turn2+=0.75");
      tl.set(leaf1, { autoAlpha: 0 }, "turn2+=0.85");

      // Realistic Dynamic Paper Crease Lighting & Shadows for Turn 2
      if (shadow2Front) {
        tl.to(shadow2Front, { opacity: 0.35, duration: 0.75, ease: "power1.in" }, "turn2");
        tl.to(shadow2Front, { opacity: 0, duration: 0.75, ease: "power1.out" }, "turn2+=0.75");
      }
      if (shadow2Back) {
        tl.fromTo(shadow2Back, { opacity: 0.35 }, { opacity: 0, duration: 0.75, ease: "power1.out" }, "turn2+=0.75");
      }

      // SPREAD 03 DWELL HOLD
      tl.to({}, { duration: 1.2 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Helper renderers for Left Page (Company & Role Overview)
  const renderSpreadLeft = (item: ChronologyItem, index: number) => {
    return (
      <div className="w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-[#faf8f4] text-zinc-950 font-sans select-none overflow-y-auto sm:overflow-hidden">
        <div>
          {/* Page Top Monograph Header */}
          <div className="flex items-center justify-between border-b border-zinc-950/15 pb-2.5 mb-3 sm:mb-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
            <span className="flex items-center gap-1.5 text-zinc-900">
              <Bookmark className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-600" />
              <span>{item.pageNo} · ARCHIVE</span>
            </span>
            <span className="px-2 py-0.5 bg-zinc-200/80 rounded text-zinc-700 font-extrabold text-[9px] sm:text-[10px]">
              0{index + 1} / 03
            </span>
          </div>

          {/* Period Pill & Company Identity */}
          <div className="mb-3 sm:mb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full border shadow-2xs mb-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Calendar className="h-3 w-3 text-orange-600" />
              <span className="font-extrabold text-zinc-900">{item.period}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase text-zinc-600 tracking-wider mb-1">
              <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-400 shrink-0" />
              <span className="font-extrabold text-zinc-950 break-words">{item.company}</span>
            </div>

            <h3 className="font-display font-black text-base sm:text-xl lg:text-2xl xl:text-3xl text-zinc-950 uppercase tracking-tight leading-tight break-words">
              {item.role}
            </h3>
          </div>

          {/* Domain Category */}
          <div className="font-sans text-[10px] sm:text-xs font-bold uppercase text-orange-700 tracking-wide mb-2 sm:mb-4 break-words">
            {item.domain}
          </div>

          {/* Narrative Pull-Quote */}
          <p className="font-serif text-xs sm:text-sm lg:text-base text-zinc-800 italic font-normal leading-relaxed border-l-2 sm:border-l-3 border-orange-500 pl-2.5 sm:pl-3.5 mb-3 sm:mb-4">
            “{item.summary}”
          </p>
        </div>

        {/* Bottom Folio & Production Guarantee Stamp */}
        <div className="pt-2.5 border-t border-zinc-950/15 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5 font-bold text-emerald-700">
            <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-600" />
            <span className="hidden sm:inline">AUDITED PRODUCTION RECORD</span>
            <span className="sm:hidden">VERIFIED</span>
          </span>
          <span className="text-zinc-400">JAKARTA</span>
        </div>
      </div>
    );
  };

  // Helper renderers for Right Page (Deliverables & Technical Deep-Dive)
  const renderSpreadRight = (item: ChronologyItem, index: number) => {
    return (
      <div className="w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-white text-zinc-950 font-sans select-none overflow-y-auto sm:overflow-hidden">
        <div>
          {/* Page Top Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5 mb-3 sm:mb-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
            <span className="text-orange-600 font-extrabold truncate">TECHNICAL SPECIFICATIONS</span>
            <span className="text-zinc-400 shrink-0">FOLIO 2{index + 4}.2</span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="font-sans text-[9px] sm:text-[10px] uppercase font-extrabold tracking-widest text-zinc-400">
              CORE DELIVERABLES & ARCHITECTURAL IMPACT
            </div>

            {/* Bullet Points Plate */}
            <div className="space-y-2 sm:space-y-3">
              {item.achievements.map((ach, aIdx) => (
                <div
                  key={aIdx}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-zinc-50/90 rounded border border-zinc-200/80 shadow-2xs text-[11px] sm:text-xs lg:text-sm text-zinc-800 leading-snug sm:leading-relaxed"
                >
                  <CheckCircle2 className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${item.themeColor} shrink-0 mt-0.5`} />
                  <span className="font-normal">{ach}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page Bottom Bar */}
        <div className="pt-2.5 border-t border-zinc-200 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-zinc-400">
          <span className="font-bold text-zinc-600 uppercase truncate">SEPTIAN RISANGGALIH · ARCHIVE</span>
          <span className="text-orange-600 font-extrabold shrink-0">PAGE 0{index * 2 + 2} / 06</span>
        </div>
      </div>
    );
  };

  // Dedicated renderer for Spread 03 Right: CIMB Niaga Architecture & Academic Foundation
  const renderSpreadRightEra3 = (item: ChronologyItem) => {
    return (
      <div className="w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-white text-zinc-950 font-sans select-none overflow-y-auto sm:overflow-hidden">
        <div className="space-y-3 sm:space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
            <span className="text-purple-600 font-extrabold flex items-center gap-1.5 truncate">
              <span className="h-2 w-2 rounded-full bg-purple-600 shrink-0" />
              <span>TECHNICAL SPECIFICATIONS</span>
            </span>
            <span className="text-zinc-400 shrink-0">FOLIO 26.2</span>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="font-sans text-[8px] sm:text-[9px] uppercase font-extrabold tracking-widest text-zinc-500 flex items-center justify-between">
              <span>CIMB NIAGA OCTO CLICKS ARCHITECTURE</span>
              <span className="text-purple-700 font-mono font-bold">2022 — 2023</span>
            </div>
            {item.achievements.map((ach, aIdx) => (
              <div
                key={aIdx}
                className="flex items-start gap-2 p-1.5 sm:p-2 bg-zinc-50/80 rounded border border-zinc-200 text-[10px] sm:text-xs text-zinc-800 leading-snug"
              >
                <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span>{ach}</span>
              </div>
            ))}
          </div>

          {/* Academic Degree Plate */}
          <div className="p-2 sm:p-3 bg-amber-50/70 border border-amber-200/90 rounded space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-amber-900 font-extrabold uppercase">
              <span className="flex items-center gap-1.5 truncate">
                <GraduationCap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-700 shrink-0" />
                <span className="truncate">BINUS UNIVERSITY</span>
              </span>
              <span className="px-1.5 py-0.5 bg-amber-200/80 text-amber-950 rounded text-[8px] sm:text-[9px] shrink-0 font-bold">
                GRADUATE
              </span>
            </div>
            <div className="font-display font-black text-xs sm:text-sm text-zinc-950 uppercase tracking-tight">
              Bachelor of Computer Science (S.Kom)
            </div>
            <div className="text-[9px] sm:text-[10px] font-serif italic text-zinc-600 leading-snug">
              Specialized in Software Architecture & Intelligent Systems.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2.5 border-t border-zinc-200 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-zinc-400">
          <span className="font-bold text-zinc-600 uppercase truncate">SEPTIAN RISANGGALIH · ARCHIVE</span>
          <span className="text-purple-600 font-extrabold shrink-0">PAGE 06 / 06</span>
        </div>
      </div>
    );
  };

  const activeItem = CAREER_CHRONOLOGY[activeSpread] || CAREER_CHRONOLOGY[0];

  return (
    <section
      id="mag-dossier"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[640px] max-h-screen bg-[#faf9f6] text-zinc-950 font-sans border-b border-zinc-950/15 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. Compact Editorial Header Monograph with Quick Spread Navigation */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-5 sm:pt-6 pb-3 border-b border-zinc-950/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shrink-0 z-30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-orange-100 text-orange-950 border border-orange-300 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-600 animate-pulse" />
              <span>CAREER CHRONOLOGY & PRODUCTION RECORD</span>
            </span>
            <span className="text-[10px] font-mono font-extrabold text-orange-700 bg-orange-50/90 border border-orange-200 px-2.5 py-0.5 rounded shadow-2xs truncate max-w-[280px] sm:max-w-none">
              SPREAD 0{activeSpread + 1} / 03: {activeItem.company} ({activeItem.period})
            </span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 tracking-tight uppercase leading-tight break-words">
            ARCHIVAL DOSSIER:{" "}
            <span className="font-serif italic font-normal text-zinc-700 underline decoration-orange-500 decoration-2 underline-offset-4">
              3D TACTILE MAGAZINE PAGE TURNER
            </span>
          </h2>
        </div>

        {/* Quick Spread Buttons for Zero-Effort Page Flipping */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5 bg-white border border-zinc-300/80 p-1 rounded shadow-2xs">
            {CAREER_CHRONOLOGY.map((c, idx) => (
              <button
                key={c.period}
                onClick={() => scrollToSpread(idx)}
                data-cursor-text={`P.0${idx + 1}`}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded transition-all cursor-pointer ${
                  activeSpread === idx
                    ? "bg-orange-600 text-white shadow-xs scale-105"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                }`}
              >
                SPREAD 0{idx + 1} · {c.year} ({idx === 0 ? "Technopartner" : idx === 1 ? "Natieva" : "Infosys"})
              </button>
            ))}
          </div>

          {/* Prev / Next Page Turn Jumpers */}
          <div className="flex items-center gap-1 bg-white border border-zinc-300/80 p-1 rounded shadow-2xs">
            <button
              onClick={() => scrollToSpread(Math.max(0, activeSpread - 1))}
              disabled={activeSpread === 0}
              aria-label="Previous magazine spread"
              className="p-1 rounded text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => scrollToSpread(Math.min(CAREER_CHRONOLOGY.length - 1, activeSpread + 1))}
              disabled={activeSpread === CAREER_CHRONOLOGY.length - 1}
              aria-label="Next magazine spread"
              className="p-1 rounded text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Pinned 3D Open Magazine Stage with Real 3D Turning Leaves */}
      <div className="relative flex-1 w-full min-h-0 overflow-hidden flex items-center justify-center p-4 sm:p-7">
        
        {/* The 3D Book Container with 2200px Perspective */}
        <div className="relative w-full max-w-[1160px] h-[480px] sm:h-[530px] lg:h-[570px] [perspective:2400px] select-none">
          
          {/* Outer Book Cover Dropshadow & Luxurious Bound Edge */}
          <div className="absolute inset-0 bg-[#e7e3d8] rounded-xl shadow-[0_35px_100px_rgba(0,0,0,0.22)] -m-2 sm:-m-3 border border-zinc-400/40 pointer-events-none" />

          {/* Realistic Center Spine Binding Seam with Deep Gradient Crease Shadow */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-zinc-400/60 z-30 pointer-events-none shadow-[0_0_12px_rgba(0,0,0,0.35)]">
            <div className="absolute top-0 bottom-0 -left-8 w-16 bg-gradient-to-r from-black/20 via-black/35 to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 -right-8 w-16 bg-gradient-to-l from-black/20 via-black/35 to-transparent pointer-events-none" />
          </div>

          {/* Book Interior Container Holding Base Pages & 3D Flipping Leaves */}
          <div className="relative w-full h-full bg-[#fcfbf9] rounded-lg overflow-hidden flex [transform-style:preserve-3d]">
            
            {/* 1. BASE LEFT PAGE: Displays Spread 01 Left (Technopartner 2024) or Spread 03 Left (Infosys 2022) */}
            <div className="relative w-1/2 h-full border-r border-zinc-300/80 overflow-hidden">
              {renderSpreadLeft(
                CAREER_CHRONOLOGY[activeSpread === 2 ? 2 : 0],
                activeSpread === 2 ? 2 : 0
              )}
            </div>

            {/* 2. BASE RIGHT PAGE: Displays Spread 03 Right (Infosys 2022 + Binus University Degree) */}
            <div className="relative w-1/2 h-full border-l border-zinc-300/80 overflow-hidden">
              {renderSpreadRightEra3(CAREER_CHRONOLOGY[2])}
            </div>

            {/* 3. FLIPPING LEAF 02 (Between Spread 02 & 03) */}
            <div
              ref={leaf2Ref}
              className="absolute left-1/2 top-0 w-1/2 h-full [transform-origin:left_center] [transform-style:preserve-3d] will-change-transform z-10"
            >
              {/* Leaf 2 Front Face: Spread 02 Right (Natieva MSIG Life Achievements) */}
              <div className="absolute inset-0 [backface-visibility:hidden] bg-[#fcfbf9] border-l border-zinc-300/80 overflow-hidden shadow-2xl">
                {renderSpreadRight(CAREER_CHRONOLOGY[1], 1)}
                {/* Dynamic paper lighting shadow overlay */}
                <div ref={shadow2FrontRef} className="absolute inset-0 bg-black/0 pointer-events-none transition-colors" />
              </div>

              {/* Leaf 2 Back Face: Spread 03 Left (Infosys CIMB Niaga Company & Role) */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#faf8f4] border-r border-zinc-300/80 overflow-hidden shadow-2xl">
                {renderSpreadLeft(CAREER_CHRONOLOGY[2], 2)}
                {/* Dynamic paper lighting shadow overlay */}
                <div ref={shadow2BackRef} className="absolute inset-0 bg-black/0 pointer-events-none transition-colors" />
              </div>
            </div>

            {/* 4. FLIPPING LEAF 01 (Between Spread 01 & 02) */}
            <div
              ref={leaf1Ref}
              className="absolute left-1/2 top-0 w-1/2 h-full [transform-origin:left_center] [transform-style:preserve-3d] will-change-transform z-20"
            >
              {/* Leaf 1 Front Face: Spread 01 Right (Technopartner Casion EV Achievements) */}
              <div className="absolute inset-0 [backface-visibility:hidden] bg-[#fcfbf9] border-l border-zinc-300/80 overflow-hidden shadow-2xl">
                {renderSpreadRight(CAREER_CHRONOLOGY[0], 0)}
                {/* Dynamic paper lighting shadow overlay */}
                <div ref={shadow1FrontRef} className="absolute inset-0 bg-black/0 pointer-events-none transition-colors" />
              </div>

              {/* Leaf 1 Back Face: Spread 02 Left (Natieva Global Company & Role) */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#faf8f4] border-r border-zinc-300/80 overflow-hidden shadow-2xl">
                {renderSpreadLeft(CAREER_CHRONOLOGY[1], 1)}
                {/* Dynamic paper lighting shadow overlay */}
                <div ref={shadow1BackRef} className="absolute inset-0 bg-black/0 pointer-events-none transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
