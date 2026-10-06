"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MagazineAgencyTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (track1Ref.current && track2Ref.current && containerRef.current) {
        gsap.to(track1Ref.current, {
          x: -120,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(track2Ref.current, {
          x: 120,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const tickerPrimary = [
    "★ INDEPENDENT DIGITAL STUDIO",
    "⚡ 99.8% PRODUCTION SLA",
    "🚀 REACT 19 · NEXT.JS 15 · THREE.JS · GOLANG",
    "🏆 BINUS UNIVERSITY COMPUTER SCIENCE",
    "💼 10+ ENTERPRISE PLATFORMS SHIPPED",
    "💎 FINTECH · IOT · SAAS · OMNICHANNEL POS",
  ];

  const tickerSecondary = [
    "★ TACTILE 60FPS INTERACTION DESIGN",
    "⚡ REAL-TIME WEBSOCKET TELEMETRY",
    "🔒 BANKING-GRADE PCI-DSS COMPLIANT",
    "📱 CROSS-PLATFORM REACT NATIVE",
    "🎨 EDITORIAL HIGH-DENSITY TYPOGRAPHY",
    "🚀 MISSION-CRITICAL ARCHITECTURE",
  ];

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden border-y border-zinc-950/20 select-none shadow-sm divide-y divide-zinc-950/20"
    >
      {/* Ribbon 1: Electric High-Visibility Yellow (Scrolls Left) */}
      <div className="bg-yellow-300 text-zinc-950 py-2.5 overflow-hidden">
        <div ref={track1Ref} className="will-change-transform">
          <div className="flex w-max animate-marquee-agency hover:[animation-play-state:paused]">
            {[...tickerPrimary, ...tickerPrimary, ...tickerPrimary].map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-6 px-6 font-display font-black text-xs sm:text-sm tracking-wider uppercase"
              >
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ribbon 2: Obsidian Black with Neon Emerald Accent (Scrolls Right) */}
      <div className="bg-zinc-950 text-emerald-400 py-2 overflow-hidden">
        <div ref={track2Ref} className="will-change-transform">
          <div className="flex w-max animate-marquee-agency-reverse hover:[animation-play-state:paused]">
            {[...tickerSecondary, ...tickerSecondary, ...tickerSecondary].map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-6 px-6 font-display font-extrabold text-[11px] sm:text-xs tracking-widest uppercase"
              >
                <span className="text-white">●</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

