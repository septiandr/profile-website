"use client";
import React, { useEffect, useRef } from "react";
import { gsapInit, gsap, ScrollTrigger } from "@/lib/gsap";

const steps = [
  {
    title: "The Early Days",
    desc: "Experimenting with HTML/CSS, learning UX foundations and accessibility.",
  },
  {
    title: "First Client",
    desc: "Turning needs into real products, version discipline and QA.",
  },
  {
    title: "Craft Deeper",
    desc: "Performance, state management, animation, and architecture patterns.",
  },
  {
    title: "Collaboration & Mentoring",
    desc: "Code reviews, documentation, design systems, and team culture.",
  },
  {
    title: "Continuous Learning",
    desc: "Staying curious: tooling, DX, automation, and best practices.",
  },
];

export default function Journey() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      const el = root.current!;
      const stepEls = gsap.utils.toArray<HTMLElement>(".journey .step");

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
          g.set(".journey-progress .bar", { width: `${w}%` });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section journey" id="journey">
      <div className="container">
        <div className="journey-header flex items-center gap-4">
          <h2 className="section-title">Journey</h2>
          <div className="journey-progress flex-1 h-1.5 bg-[rgba(255,255,255,.06)] rounded-full overflow-hidden"><div className="bar" /></div>
        </div>
        <ul className="steps grid gap-6 mt-7">
          {steps.map((s, i) => (
            <li key={i} className="step p-4 border border-[var(--border)] bg-[var(--surface)] rounded-lg">
              <h3 className="step-title text-lg font-semibold mb-1">{s.title}</h3>
              <p className="step-desc text-[var(--muted)]">{s.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}