"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, GraduationCap, Calendar } from "lucide-react";

const CAREER_CHRONOLOGY = [
  {
    period: "2024 — PRESENT",
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
  },
  {
    period: "2023 — 2024",
    role: "IT Programmer",
    company: "PT Natieva Global International",
    domain: "EdTech, Live Video Learning & Certification Platforms",
    summary:
      "Spearheaded full-stack development for enterprise certification platforms (Luna by MSIG Life) and student learning management systems.",
    achievements: [
      "Built real-time video classroom schedule sync with Zustand state cache for MSIG Life corporate learners.",
      "Developed full-stack LMS dashboards, mobile learning app, and CMS platforms for Natieva & Natieva Kids.",
      "Reduced client bundle payload by 42% through lazy-loaded module federation.",
    ],
  },
  {
    period: "2022 — 2023",
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
  },
];

export default function MagazineTimelineDossier() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Kinetic Scrub on Section Title
      if (titleRef.current && sectionRef.current) {
        gsap.fromTo(
          titleRef.current,
          { x: -40 },
          {
            x: 40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Progressive Entrance for Career Timeline Cards & Bullet Stagger
      const items = gsap.utils.toArray<HTMLElement>(".mag-timeline-item");
      items.forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          item,
          { x: -40, opacity: 0.2 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );

        const node = item.querySelector(".mag-timeline-node");
        if (node) {
          tl.fromTo(
            node,
            { scale: 0 },
            { scale: 1, duration: 0.4, ease: "back.out(2)" },
            "-=0.5"
          );
        }

        const period = item.querySelector(".mag-timeline-period");
        if (period) {
          tl.fromTo(
            period,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" },
            "-=0.35"
          );
        }

        const role = item.querySelector(".mag-timeline-role");
        if (role) {
          tl.fromTo(
            role,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
            "-=0.3"
          );
        }

        const meta = item.querySelector(".mag-timeline-meta");
        if (meta) {
          tl.fromTo(
            meta,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.3"
          );
        }

        const summary = item.querySelector(".mag-timeline-summary");
        if (summary) {
          tl.fromTo(
            summary,
            { x: -15, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
            "-=0.3"
          );
        }

        const achievements = item.querySelectorAll(".mag-timeline-ach");
        if (achievements.length > 0) {
          tl.fromTo(
            achievements,
            { x: -16, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" },
            "-=0.25"
          );
        }
      });

      // 3. Right Column Accolades Entrance
      const rightCards = gsap.utils.toArray<HTMLElement>(".mag-dossier-right-card");
      rightCards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0.2, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mag-dossier"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#faf9f6] text-zinc-950 font-sans border-b border-zinc-950/15 py-16 sm:py-24 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header Monograph */}
        <div className="border-b border-zinc-950/20 pb-8 mb-12 sm:mb-16">
          <div className="font-sans text-xs sm:text-sm tracking-[0.16em] uppercase font-bold mb-3 flex items-center gap-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-950 border border-orange-300 rounded-full flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span>SECTION 04 · CAREER CHRONOLOGY & PRODUCTION RECORD</span>
            </span>
          </div>

          <h2
            ref={titleRef}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-zinc-950 tracking-tight uppercase leading-[0.95] will-change-transform"
          >
            CAREER CHRONOLOGY & <br />
            <span className="font-serif italic font-normal text-zinc-800 underline decoration-orange-500 decoration-4 underline-offset-8">
              PRODUCTION RECORD
            </span>
          </h2>
        </div>

        {/* Two-Column Editorial Spread: Timeline (Left) + Education & Accolades (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Chronological Experience Cards (8 cols) */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {CAREER_CHRONOLOGY.map((item, idx) => {
              const colors = [
                {
                  border: "border-emerald-500",
                  dot: "bg-emerald-600 ring-emerald-100",
                  badge: "bg-emerald-100 text-emerald-950 border-emerald-300",
                  arrow: "text-emerald-600",
                },
                {
                  border: "border-blue-500",
                  dot: "bg-blue-600 ring-blue-100",
                  badge: "bg-blue-100 text-blue-950 border-blue-200",
                  arrow: "text-blue-600",
                },
                {
                  border: "border-purple-500",
                  dot: "bg-purple-600 ring-purple-100",
                  badge: "bg-purple-100 text-purple-950 border-purple-200",
                  arrow: "text-purple-600",
                },
              ][idx % 3];

              return (
                <div
                  key={idx}
                  className={`mag-timeline-item border-l-4 ${colors.border} pl-6 sm:pl-8 relative group will-change-transform`}
                >
                  {/* Node bullet */}
                  <div className={`mag-timeline-node absolute -left-[9px] top-1.5 w-4 h-4 ${colors.dot} rounded-full ring-4 will-change-transform`} />

                  <div className="flex items-center gap-2.5 font-sans text-xs font-bold uppercase tracking-wider mb-2">
                    <span className={`mag-timeline-period px-3 py-1 rounded-full border ${colors.badge} flex items-center gap-1.5`}>
                      <Calendar className="h-3 w-3" />
                      <span>{item.period}</span>
                    </span>
                  </div>

                  <h3 className="mag-timeline-role font-display font-black text-2xl sm:text-3xl text-zinc-950 uppercase tracking-tight leading-tight mt-1">
                    {item.role}
                  </h3>

                  <div className="mag-timeline-meta font-sans text-xs sm:text-sm text-zinc-700 font-bold uppercase tracking-wide mb-4">
                    {item.company} · <span className="text-zinc-500 font-normal">{item.domain}</span>
                  </div>

                  <p className="mag-timeline-summary font-serif text-base sm:text-lg text-zinc-800 italic font-normal leading-relaxed mb-4">
                    “{item.summary}”
                  </p>

                  <div className="space-y-2.5 bg-white p-5 border border-zinc-200 shadow-2xs rounded-xs">
                    {item.achievements.map((ach, aIdx) => (
                      <div
                        key={aIdx}
                        className="mag-timeline-ach flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 leading-relaxed font-normal"
                      >
                        <span className={`font-black ${colors.arrow} leading-none mt-0.5 text-base`}>›</span>
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Academic Credential & Accolades Plate (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Education Plate */}
            <div className="mag-dossier-right-card border border-zinc-950/15 bg-white shadow-sm overflow-hidden rounded-xs will-change-transform">
              <div className="h-2 w-full bg-amber-400" />
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-5 font-sans text-xs uppercase text-zinc-600 tracking-wider">
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-950 border border-amber-300 font-extrabold rounded text-[10px]">
                    ACADEMIC RECORD
                  </span>
                  <GraduationCap className="h-4 w-4 text-amber-600" />
                </div>

                <div className="space-y-3 font-sans">
                  <div className="text-xs text-zinc-500 tracking-wider font-semibold">
                    2018 — 2022 · DEGREE CONFERRED
                  </div>

                  <h4 className="font-display font-black text-xl sm:text-2xl text-zinc-950 uppercase tracking-tight">
                    Bina Nusantara University
                  </h4>

                  <p className="font-serif italic text-base text-zinc-700">
                    Bachelor of Computer Science (S.Kom)
                  </p>

                  <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                    <span className="text-xs uppercase text-zinc-600 font-bold">GRADE POINT AVERAGE</span>
                    <span className="text-sm font-black text-zinc-950 px-3 py-1 bg-amber-400 rounded shadow-2xs">
                      3.56 / 4.00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Production Metrics Plate */}
            <div className="mag-dossier-right-card border border-zinc-950/15 bg-white shadow-sm overflow-hidden rounded-xs will-change-transform">
              <div className="h-2 w-full bg-blue-600" />
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-5 font-sans text-xs uppercase text-zinc-600 tracking-wider">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-950 border border-blue-200 font-extrabold rounded text-[10px]">
                    PRODUCTION CAPACITY
                  </span>
                  <Award className="h-4 w-4 text-blue-600" />
                </div>

                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <span className="text-zinc-500 block font-semibold mb-0.5">TOTAL SHIPPED PLATFORMS</span>
                    <span className="text-2xl font-black text-blue-600">10+ ENTERPRISE SYSTEMS</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block font-semibold mb-0.5">PRIMARY DOMAINS</span>
                    <span className="text-sm font-bold text-zinc-950">FINTECH · IOT · SAAS · LMS</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block font-semibold mb-0.5">CODE INTEGRITY</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold rounded-full text-xs mt-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>PRODUCTION VERIFIED</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
