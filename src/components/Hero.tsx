"use client";
import React, { useEffect, useRef } from "react";
import { gsapInit, gsap } from "@/lib/gsap";
import Image from "next/image";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      g.from(".hero-line", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });
      g.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
      g.to(".hero-orb", {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: "linear",
      });

      // Magnetic CTA and photo hover parallax
      const cta = document.querySelector<HTMLElement>(".hero-cta .btn.primary");
      const photo = document.querySelector<HTMLElement>(".hero-photo");
      if (cta) {
        const onMove = (e: PointerEvent) => {
          const rect = cta.getBoundingClientRect();
          const mx = e.clientX - rect.left - rect.width / 2;
          const my = e.clientY - rect.top - rect.height / 2;
          g.to(cta, {
            x: mx * 0.15,
            y: my * 0.15,
            scale: 1.03,
            duration: 0.2,
            ease: "power2.out",
          });
        };
        const onLeave = () =>
          g.to(cta, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: "power3.out",
          });
        cta.addEventListener("pointermove", onMove);
        cta.addEventListener("pointerleave", onLeave);
      }
      if (photo) {
        const onMoveP = (e: PointerEvent) => {
          const rect = photo.getBoundingClientRect();
          const mx = e.clientX - rect.left - rect.width / 2;
          const my = e.clientY - rect.top - rect.height / 2;
          g.to(photo, {
            x: mx * 0.05,
            y: my * 0.05,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const onLeaveP = () =>
          g.to(photo, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
          });
        photo.addEventListener("pointermove", onMoveP);
        photo.addEventListener("pointerleave", onLeaveP);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section hero" id="home">
      <div className="hero-bg">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
      </div>
      <div className="container hero-grid grid md:grid-cols-[1.4fr_1fr] gap-7 items-center">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-line">
              Hi, I’m <span className="accent">Risanggalih</span>, a{" "}
              <span className="accent">Web Developer</span>.
            </span>
            <span className="hero-line">I craft web experiences that are </span>
            <span className="hero-line">
              <span className="accent">fast</span>,{" "}
              <span className="accent">smooth</span>, and
              <span className="accent"> meaningful</span>.
            </span>
          </h1>
          <p className="hero-subtitle">
            A narrative portfolio powered by Tailwind & GSAP — explore my work.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn primary">
              Explore portfolio
            </a>
          </div>
        </div>
        <div className="hero-photo" aria-label="Profile photo placeholder">
          <Image
            width={400}
            height={400}
            src="/profile.jpg"
            alt="Profile"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
