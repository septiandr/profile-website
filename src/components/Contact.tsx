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
        <div className="contact-panel glass group relative mt-2 p-6 rounded-xl border overflow-hidden">
          {/* Decorative glow */}
          <span className="abs-glow g1" />
          <span className="abs-glow g2" />
          <span className="abs-glow g3" />

          <div className="contact-grid">
            {/* Left: Title & CTA */}
            <div>
              <h2 className="section-title">Let’s Collaborate</h2>
              <p className="muted">I love building products with impactful experiences.</p>
              <div className="cta mt-3 flex gap-2 flex-wrap">
                <a className="btn primary" href="mailto:sdwirisanggalih@gmail.com" aria-label="Email">
                  Email Me
                </a>
                <a
                  className="btn"
                  href="https://wa.me/6285646444805"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right: Link cards */}
            <div className="contact-links">
              <a
                className="link-card glass"
                href="mailto:sdwirisanggalih@gmail.com"
                aria-label="Email"
              >
                <span className="link-label">Email</span>
                <span className="link-value">sdwirisanggalih@gmail.com</span>
              </a>
              <a
                className="link-card glass"
                href="https://wa.me/6285646444805"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <span className="link-label">WhatsApp</span>
                <span className="link-value">+62 856-4644-4805</span>
              </a>
              <a
                className="link-card glass"
                href="https://www.linkedin.com/in/septiandr/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span className="link-label">LinkedIn</span>
                <span className="link-value">/in/septiandr</span>
              </a>
              <a
                className="link-card glass"
                href="https://github.com/septiandr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <span className="link-label">GitHub</span>
                <span className="link-value">@septiandr</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}