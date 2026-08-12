"use client";
import React, { useEffect, useRef } from "react";
import { gsapInit, gsap } from "@/lib/gsap";

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      g.from(".gameover-panel", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section contact" id="contact">
      <div className="container">
        <div className="gameover-panel">
          <div className="contact-grid">
            {/* Left: title & CTA */}
            <div>
              <h2 className="go-title pixel">LEVEL COMPLETE!</h2>
              <p className="go-sub">
                Thanks for playing through my quest log. Want to team up on a
                new adventure?
              </p>
              <a
                className="go-hint blink pixel"
                href="mailto:sdwirisanggalih@gmail.com"
                style={{ display: "inline-block" }}
              >
                ▶ PRESS START TO START A NEW GAME
              </a>
              <div className="contact-cta">
                <a
                  className="btn btn-red"
                  href="mailto:sdwirisanggalih@gmail.com"
                  aria-label="Email"
                >
                  EMAIL ME
                </a>
                <a
                  className="btn btn-green"
                  href="https://wa.me/6285646444805"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  WHATSAPP
                </a>
              </div>
            </div>

            {/* Right: link cards */}
            <div className="dark-links">
              <a className="dark-link" href="mailto:sdwirisanggalih@gmail.com" aria-label="Email">
                <span className="link-label pixel">EMAIL</span>
                <span className="link-value">sdwirisanggalih@gmail.com</span>
              </a>
              <a
                className="dark-link"
                href="https://wa.me/6285646444805"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <span className="link-label pixel">WHATSAPP</span>
                <span className="link-value">+62 856-4644-4805</span>
              </a>
              <a
                className="dark-link"
                href="https://www.linkedin.com/in/septiandr/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span className="link-label pixel">LINKEDIN</span>
                <span className="link-value">/in/septiandr</span>
              </a>
              <a
                className="dark-link"
                href="https://github.com/septiandr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <span className="link-label pixel">GITHUB</span>
                <span className="link-value">@septiandr</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
