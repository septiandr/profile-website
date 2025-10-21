"use client";
import React, { useEffect, useRef } from "react";
import { gsapInit, gsap } from "@/lib/gsap";

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      g.from(".contact .cta", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section contact" id="contact">
      <div className="container">
        <h2 className="section-title">Let’s Collaborate</h2>
        <p className="muted">I love building products with impactful experiences.</p>
        <div className="cta mt-2">
          <a className="btn" href="mailto:dev@portfolio.example">Email Me</a>
        </div>
      </div>
    </section>
  );
}