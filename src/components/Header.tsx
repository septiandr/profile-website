"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { music } from "@/lib/sound";
import { gsapInit, gsap, ScrollTrigger } from "@/lib/gsap";

const items = [
  { id: "home", label: "HOME" },
  { id: "projects", label: "GAMES" },
  { id: "experience", label: "QUESTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACT" },
];

export default function Header() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [night, setNight] = useState(false);

  // Sync the theme button with the attribute set by the layout's pre-paint
  // script. Server and client render the same initial state (no hydration
  // mismatch), then this effect updates the label after mount.
  useEffect(() => {
    setNight(document.documentElement.getAttribute("data-theme") === "night");
  }, []);

  const toggleTheme = () => {
    const next = !night;
    setNight(next);
    document.documentElement.setAttribute("data-theme", next ? "night" : "day");
    try {
      localStorage.setItem("pixel-theme", next ? "night" : "day");
    } catch {
      /* storage unavailable */
    }
  };

  // Sync the HUD with the saved music preference once mounted, then keep
  // listening — the music engine broadcasts state changes (e.g. it may be
  // started by the first user gesture via Sfx).
  useEffect(() => {
    const sync = () => {
      setMusicOn(music.isEnabled());
      setMusicPlaying(music.isPlaying());
    };
    sync();
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ enabled: boolean; playing: boolean }>).detail;
      setMusicOn(detail.enabled);
      setMusicPlaying(detail.playing);
    };
    window.addEventListener("pixel:music", onChange);
    return () => window.removeEventListener("pixel:music", onChange);
  }, []);

  const toggleMusic = () => {
    const on = music.toggle();
    setMusicOn(on);
    setMusicPlaying(music.isPlaying());
  };

  useEffect(() => {
    const g = gsapInit();

    const ctx = gsap.context(() => {
      // Header entrance
      g.from(".header-inner", { y: -16, opacity: 0, duration: 0.4, ease: "power3.out" });

      // Scroll progress (pixel HUD bar)
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) =>
          g.set(".header-progress .bar", { width: `${Math.round(self.progress * 100)}%` }),
      });

      // Active link on section visibility
      items.forEach((item) => {
        const link = document.querySelector<HTMLAnchorElement>(`.nav a[href='#${item.id}']`);
        const target = document.querySelector<HTMLElement>(`#${item.id}`);
        if (!link || !target) return;
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header ref={root} className="header sticky top-0 z-50">
      <div className="container header-inner">
        <div className="brand">★ SEPTIANDR</div>
        <nav className="nav hidden md:flex">
          {items.map((i) => (
            <Link key={i.id} href={`#${i.id}`}>
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className={`theme-toggle ${night ? "is-night" : "is-day"}`}
            aria-pressed={night}
            aria-label={night ? "Switch to day mode" : "Switch to night mode"}
            onClick={toggleTheme}
          >
            <span className="theme-icon" aria-hidden>
              {night ? "🌙" : "☀️"}
            </span>
            <span className="theme-label">{night ? "NIGHT" : "DAY"}</span>
          </button>
          <button
            type="button"
            className={`music-toggle ${musicOn ? "is-on" : "is-off"}`}
            aria-pressed={musicOn}
            aria-label={musicOn ? "Turn background music off" : "Turn background music on"}
            onClick={toggleMusic}
          >
            <span className={`note ${musicOn && musicPlaying ? "playing" : ""}`} aria-hidden>
              ♪
            </span>
            <span className="music-label">{musicOn ? "ON" : "OFF"}</span>
          </button>
          <div className="header-coin hidden md:block">COINS 99</div>
        </div>
        <button
          className="menu-toggle md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          ☰ MENU
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div id="mobile-nav" className="mobile-nav md:hidden">
          <button
            type="button"
            className="mobile-backdrop"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <nav className="container">
            {items.map((i) => (
              <Link
                key={`m-${i.id}`}
                href={`#${i.id}`}
                onClick={() => setOpen(false)}
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <div className="header-progress">
        <div className="bar" />
      </div>
    </header>
  );
}
