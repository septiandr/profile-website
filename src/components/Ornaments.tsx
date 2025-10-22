"use client";
import React, { useEffect, useRef } from "react";
import { gsapInit, gsap } from "@/lib/gsap";

export default function Ornaments() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      const orns = gsap.utils.toArray<HTMLElement>(".orn");
      const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
      orns.forEach((o, i) => {
        // Hapus parallax ScrollTrigger: gerak harus mandiri tanpa trigger
        // Continuous micro motion (always moving)
        // Float Y (px)
        g.to(o, {
          y: `+=${gsap.utils.random(isMobile() ? 20 : 26, isMobile() ? 32 : 42)}`,
          duration: gsap.utils.random(2.4, 3.6),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          repeatRefresh: true,
          overwrite: false,
          force3D: true,
        });
        // Float X (px)
        g.to(o, {
          x: `+=${gsap.utils.random(isMobile() ? 16 : 18, isMobile() ? 24 : 32)}`,
          duration: gsap.utils.random(3.2, 4.8),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          repeatRefresh: true,
          overwrite: false,
          force3D: true,
        });
        // Slow rotation
        g.to(o, {
          rotate: i % 2 === 0 ? "+=24" : "-=24",
          duration: gsap.utils.random(36, 54),
          ease: "none",
          repeat: -1,
          overwrite: false,
          force3D: true,
        });
        // Gentle pulsing
        g.to(o, {
          scale: () => gsap.utils.random(0.96, 1.1),
          duration: gsap.utils.random(4.5, 7.0),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          repeatRefresh: true,
          overwrite: false,
          force3D: true,
        });
        g.to(o, {
          opacity: () => gsap.utils.random(0.28, 0.42),
          duration: gsap.utils.random(4.5, 7.0),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          repeatRefresh: true,
          overwrite: false,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="ornaments" aria-hidden>
      <span className="orn o1" />
      <span className="orn o2" />
      <span className="orn o3" />
      <span className="orn o4" />
      <span className="orn o5" />
    </div>
  );
}