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

      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

      // Hitung panjang animasi berdasarkan jumlah item (paling stabil)
      const perItem = isMobile ? 350 : 580;
      const endLen = stepEls.length * perItem;

      // ==== Per-card ScrollTrigger: tampil 3+ card di viewport, tanpa timeline global ====
      stepEls.forEach((step) => {
        g.fromTo(
          step,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              toggleActions: "play none none none",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // ==== Progress bar berdasarkan progres section ====
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          g.set(".experience-progress .bar", { scaleX: self.progress });
        },
      });
    }, root);

    // Fix layout shift / hydration Next.js
    setTimeout(() => ScrollTrigger.refresh(), 50);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section experience" id="experience">
      <div className="container">
        <div className="experience-header">
          <h2 className="section-title">Experience</h2>
          <div className="experience-progress">
            <div className="bar" />
          </div>
        </div>

        <ul className="steps">
          {experience.map((s, i) => (
            <li key={i} className="step">
              <div className="flex items-start justify-between gap-3">
                <h3 className="step-title">
                  {s.role} <span className="text-[var(--muted)]">@ {s.company}</span>
                </h3>
                {s.period && (
                  <span className="text-xs text-[var(--muted)] shrink-0">
                    {s.period}
                  </span>
                )}
              </div>

              {s.location && (
                <div className="text-[10px] text-[var(--muted)] mt-0.5">
                  {s.location}
                </div>
              )}

              {s.title && (
                <div className="text-[11px] text-[var(--text)] mt-1">{s.title}</div>
              )}

              {s.desc && (
                <p className="step-desc text-[var(--muted)] mt-2">{s.desc}</p>
              )}

              {s.highlights && (
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {s.highlights.map((point, idx) => (
                    <li
                      key={`hl-${i}-${idx}`}
                      className="flex items-start gap-1.5 text-[11px] text-[var(--text)]"
                    >
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full badge text-[10px] shrink-0">
                        ✓
                      </span>
                      <span className="line-clamp-1">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {s.tech && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {s.tech.map((t, idx) => (
                    <span
                      key={`tech-${i}-${idx}`}
                      className="chip text-[10px] px-1.5 py-0.5"
                    >
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