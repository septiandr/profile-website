"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { music } from "@/lib/sound";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

const items = [
  { id: "home", label: "HOME" },
  { id: "projects", label: "GAMES" },
  { id: "experience", label: "QUESTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACT" },
];

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [night, setNight] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 });

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
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".nav a").forEach((link) => link.classList.remove("active"));
          document.querySelector(`.nav a[href='#${entry.target.id}']`)?.classList.add("active");
        }
      }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
    <motion.header ref={root} className="header sticky top-0 z-50" initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
      <motion.div className="container header-inner">
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
      </motion.div>

      {/* Mobile nav */}
      <AnimatePresence>
      {open && (
        <motion.div id="mobile-nav" className="mobile-nav md:hidden" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
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
        </motion.div>
      )}
      </AnimatePresence>

      <div className="header-progress">
        <motion.div className="bar" style={{ scaleX: progress, transformOrigin: "left" }} />
      </div>
    </motion.header>
  );
}
