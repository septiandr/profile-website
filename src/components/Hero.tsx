"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsapInit, gsap } from "@/lib/gsap";

const LETTER_COLORS = [
  "#e52521", // R
  "#fbd000", // I
  "#3aa43a", // S
  "#2456d0", // A
  "#e52521", // N
  "#fbd000", // G
  "#3aa43a", // A
  "#2456d0", // L
  "#e52521", // I
  "#fbd000", // H
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      g.from(".hero-line", {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.15,
      });
      g.from(".hero-avatar-wrap", {
        scale: 0.7,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
        delay: 0.25,
      });
      g.from(".press-start", {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        delay: 0.9,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero" id="home">
      <div className="container hero-inner">
        <div>
          <p className="hero-tag hero-line pixel">★ 8-BIT WEB DEVELOPER ★</p>

          <h1 className="hero-title">
            {"RISANGALIH".split("").map((ch, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{
                  color: LETTER_COLORS[i % LETTER_COLORS.length],
                  animationDelay: `${(i % 5) * 0.12}s`,
                }}
              >
                {ch}
              </span>
            ))}
          </h1>

          <p className="hero-sub hero-line pixel">
            HI! I’M SEPTIAN D RISANGALIH — I CRAFT <span className="hl">WEB EXPERIENCES</span>
            <br />
            THAT ARE <span className="hl">FAST</span> · <span className="hl">SMOOTH</span> ·{" "}
            <span className="hl">MEANINGFUL</span>
          </p>

          <div className="hero-info hero-line pixel">
            <span>1UP 000000</span>
            <span>HI-SCORE 000100</span>
            <span className="coin-text">COINS 99</span>
          </div>

          <a href="#projects" className="btn press-start">
            <span className="blink">▶ PRESS START</span>
          </a>
        </div>

        <div className="hero-avatar-wrap">
          <div className="hero-avatar nes-frame">
            <Image
              src="/profile.jpg"
              alt="Pixel portrait of Risanggalih"
              width={96}
              height={96}
              priority
            />
          </div>
          <span className="avatar-label pixel">PLAYER 1</span>
        </div>
      </div>

      <div className="ground-strip" aria-hidden />
    </section>
  );
}
