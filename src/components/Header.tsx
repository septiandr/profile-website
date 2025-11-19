"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const g = gsapInit();
    // Theme init
    try {
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      const initial = stored ?? (prefersLight ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', initial);
      setTheme(initial);
    } catch {}

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
        const target = document.querySelector<HTMLElement>(`#${item.id}`);
        if (!link || !target) {
          console.warn(`Element not found: #${item.id}`);
          return;
        }
        ScrollTrigger.create({
          trigger: target,
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

  function applyTheme(next: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
    setTheme(next);
  }

  function toggleTheme() {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <header ref={root} className="header sticky top-0 z-50 backdrop-blur-sm bg-[rgba(9,13,18,.5)] border-b border-[var(--border)]">
      <div className="container header-inner flex items-center justify-between h-16">
        <div className="brand font-semibold tracking-wide">Software Engineer</div>
        <nav className="nav hidden md:flex gap-3 items-center">
          {items.map((i) => (
            <Link key={i.id} href={`#${i.id}`} className="px-2.5 py-2 rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[rgba(255,255,255,.06)]">
              {i.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="px-2.5 py-2 rounded-md border border-[var(--border)] text-[var(--text)] bg-[rgba(255,255,255,.04)] hover:bg-[rgba(255,255,255,.08)]"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
        <button
          className="menu-toggle md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[var(--border)] text-[var(--text)] bg-[rgba(255,255,255,.04)]"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>
      {/* Mobile nav */}
      <div id="mobile-nav" className={`mobile-nav ${open ? "block" : "hidden"} md:hidden`}>
        <nav className="container px-3 py-3 border-t border-[var(--border)] bg-[rgba(9,13,18,.7)] backdrop-blur-sm rounded-b-xl">
          {items.map((i) => (
            <Link
              key={`m-${i.id}`}
              href={`#${i.id}`}
              className="block px-2.5 py-2 rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[rgba(255,255,255,.06)]"
              onClick={() => setOpen(false)}
            >
              {i.label}
            </Link>
          ))}
          <button
            onClick={() => { toggleTheme(); setOpen(false); }}
            aria-label="Toggle theme"
            className="mt-2 w-full px-2.5 py-2 rounded-md border border-[var(--border)] text-[var(--text)] bg-[rgba(255,255,255,.04)] hover:bg-[rgba(255,255,255,.08)]"
          >
            {theme === 'light' ? '🌙 Mode Malam' : '☀️ Mode Siang'}
          </button>
        </nav>
      </div>
      <div className="header-progress"><div className="bar" /></div>
    </header>
  );
}