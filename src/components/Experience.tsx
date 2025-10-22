"use client";
import React, { useEffect, useRef } from "react";
import { gsapInit, gsap, ScrollTrigger } from "@/lib/gsap";
import { experience } from "@/constant/experience";

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      const el = root.current!;
      const stepEls = gsap.utils.toArray<HTMLElement>(".experience .step");

      const tl = g.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${stepEls.length * 600}`,
          pin: true,
          scrub: true,
        },
      });

      stepEls.forEach((step, i) => {
        tl.fromTo(
          step,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          i
        );
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${stepEls.length * 600}`,
        onUpdate: (self) => {
          const w = Math.round(self.progress * 100);
          g.set(".experience-progress .bar", { width: `${w}%` });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section experience" id="experience">
      <div className="container">
        <div className="experience-header flex items-center gap-4">
          <h2 className="section-title">Experience</h2>
          <div className="experience-progress flex-1 h-1.5 bg-[rgba(255,255,255,.06)] rounded-full overflow-hidden"><div className="bar" /></div>
        </div>
        <ul className="steps grid gap-6 mt-7">
          {experience.map((s, i) => (
            <li key={i} className="step p-4 border border-[var(--border)] bg-[var(--surface)] rounded-lg">
              <div className="flex items-start justify-between gap-3">
                <h3 className="step-title text-base sm:text-lg font-semibold">
                  {s.role} <span className="text-white/70">@ {s.company}</span>
                </h3>
                {s.period && (
                  <span className="text-xs text-white/60 shrink-0">{s.period}</span>
                )}
              </div>
              {s.location && (
                <div className="text-[10px] text-white/50 mt-0.5">{s.location}</div>
              )}
              {s.title && (
                <div className="text-[11px] text-white/70 mt-1">{s.title}</div>
              )}
              {s.desc && (
                <p className="step-desc text-[var(--muted)] mt-2">{s.desc}</p>
              )}
              {s.highlights && (
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {s.highlights.map((point, idx) => (
                    <li key={`hl-${i}-${idx}`} className="flex items-start gap-1.5 text-[11px] text-white/80">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/10 text-white/80 text-[10px] shrink-0">✓</span>
                      <span className="line-clamp-1">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.tech && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {s.tech.map((t, idx) => (
                    <span key={`tech-${i}-${idx}`} className="text-[10px] text-white/80 bg-white/5 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}