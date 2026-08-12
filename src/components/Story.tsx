"use client";
import React, { useEffect, useRef } from "react";
import { gsapInit, gsap } from "@/lib/gsap";

export default function Story() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      const paras = gsap.utils.toArray<HTMLElement>(".story p");
      paras.forEach((p) => {
        g.from(p, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section story" id="story">
      <div className="container">
        <h2 className="section-title">STORY</h2>
        <div className="pixel-card story-content" style={{ display: "grid", gap: 10 }}>
          <p style={{ margin: 0 }}>It began with curiosity — tinkering with the DOM and CSS.</p>
          <p style={{ margin: 0 }}>When performance mattered, I embraced profiling and optimization.</p>
          <p style={{ margin: 0 }}>As products scaled, I learned architecture, DX, and automation.</p>
          <p style={{ margin: 0 }}>Ultimately, small details create big experiences.</p>
        </div>
      </div>
    </section>
  );
}
