"use client";
import React, { useEffect, useRef } from "react";
import { gsapInit, gsap } from "@/lib/gsap";

const skills = [
  "Next.js", "React", "TypeScript", "GSAP", "CSS", "Node.js",
  "Testing", "Accessibility", "Performance", "DX/Tooling",
];

export default function Skills() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      const chips = gsap.utils.toArray<HTMLElement>(".skills .chip");
      g.from(chips, {
        y: 16,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: { each: 0.06, from: "random" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section skills" id="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="chips flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <span key={i} className="chip px-3 py-2 rounded-full border border-[var(--border)] bg-[rgba(255,255,255,.03)] text-[var(--text)] text-sm">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}