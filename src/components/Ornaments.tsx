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
        const ampY = isMobile() ? 120 : 260;
        const ampX = isMobile() ? 70 : 140;
        g.to(o, {
          y: () => (i % 2 === 0 ? ampY : -ampY),
          x: () => (i % 3 === 0 ? -ampX : ampX),
          rotate: () => (i % 2 === 0 ? 30 : -30),
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
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