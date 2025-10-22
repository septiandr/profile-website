"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsapInit, gsap, ScrollTrigger } from "@/lib/gsap";

const items = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Portfolio" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      // Header entrance
      g.from(".header-inner", { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" });

      // Scroll progress
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => g.set(".header-progress .bar", { width: `${Math.round(self.progress * 100)}%` }),
      });

      // Active link on section visibility
      items.forEach((item) => {
        const link = document.querySelector<HTMLAnchorElement>(`.nav a[href='#${item.id}']`);
        if (!link) return;
        ScrollTrigger.create({
          trigger: `#${item.id}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => link.classList.add("active"),
          onEnterBack: () => link.classList.add("active"),
          onLeave: () => link.classList.remove("active"),
          onLeaveBack: () => link.classList.remove("active"),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={root} className="header sticky top-0 z-50 backdrop-blur-sm bg-[rgba(9,13,18,.5)] border-b border-[var(--border)]">
      <div className="container header-inner flex items-center justify-between h-16">
        <div className="brand font-semibold tracking-wide">Web Developer</div>
        <nav className="nav flex gap-3">
          {items.map((i) => (
            <Link key={i.id} href={`#${i.id}`} className="px-2.5 py-2 rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[rgba(255,255,255,.06)]">
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="header-progress"><div className="bar" /></div>
    </header>
  );
}