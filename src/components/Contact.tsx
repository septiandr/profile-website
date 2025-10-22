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
        <div className="contact-card group relative mt-2 p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[rgba(var(--primary-rgb),0.08)] blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[rgba(255,255,255,0.04)] blur-2xl pointer-events-none" />

          <h2 className="section-title">Let’s Collaborate</h2>
          <p className="muted">I love building products with impactful experiences.</p>
          <div className="cta mt-3 flex gap-2 flex-wrap">
            <a className="btn hover:scale-105 transition-transform" href="mailto:sdwirisanggalih@gmail.com" aria-label="Email">
              Email
            </a>
            <a
              className="btn hover:scale-105 transition-transform"
              href="https://wa.me/6285646444805"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
            <a
              className="btn hover:scale-105 transition-transform"
              href="https://www.linkedin.com/in/septiandr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              className="btn hover:scale-105 transition-transform"
              href="https://github.com/septiandr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
            >
              Github
            </a>
          </div>

          {/* Hover border highlight */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--primary)] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}