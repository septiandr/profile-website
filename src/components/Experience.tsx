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
      const steps = gsap.utils.toArray<HTMLElement>(".quest");

      steps.forEach((step) => {
        g.fromTo(
          step,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Quest progress bar (scoped to this section)
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          g.set(".experience .section-progress .bar", { scaleX: self.progress });
        },
      });
    }, root);

    setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section experience" id="experience">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">QUESTS</h2>
          <div className="section-progress">
            <div className="bar" />
          </div>
        </div>
        <p className="muted" style={{ marginTop: -18 }}>
          QUEST LOG — completed missions from my career journey.
        </p>

        <ul className="quests" style={{ marginTop: 22 }}>
          {experience.map((s, i) => (
            <li key={i} className="quest">
              <div className="quest-head">
                <span className="quest-icon">⭐</span>
                <div style={{ minWidth: 0 }}>
                  <h3 className="quest-role">
                    {s.role} <span style={{ color: "var(--muted)" }}>@ {s.company}</span>
                  </h3>
                  {s.title && <p className="quest-company">{s.title}</p>}
                </div>
                <span className="quest-no">QUEST {String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="quest-meta">
                <span>📅 {s.period}</span>
                {s.location && <span>📍 {s.location}</span>}
              </div>

              {s.desc && <p className="quest-desc">{s.desc}</p>}

              {s.highlights && (
                <div className="quest-rewards">
                  <span className="reward-label pixel">REWARDS</span>
                  <ul>
                    {s.highlights.map((point, idx) => (
                      <li key={`hl-${i}-${idx}`}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {s.tech && (
                <div className="quest-stack">
                  {s.tech.map((t, idx) => (
                    <span key={`tech-${i}-${idx}`} className="chip">
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
